const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');

/**
 * Simple environment variables loader
 */
function loadEnv(envPath) {
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const match = line.match(/^\s*([^#=]+)\s*=\s*(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      process.env[key] = val;
    }
  }
}

loadEnv(path.join(__dirname, '../.env.production'));
loadEnv(path.join(__dirname, '../.env'));

const endpoint = process.env.MINIO_ENDPOINT;
const accessKeyId = process.env.MINIO_ACCESS_KEY;
const secretAccessKey = process.env.MINIO_SECRET_KEY;
const bucketName = process.env.MINIO_BUCKET || "images";

if (!endpoint || !accessKeyId || !secretAccessKey) {
  console.log("\u26a0\ufe0f MinIO credentials not configured. Skipping CDN sync.");
  process.exit(0);
}

const s3Client = new S3Client({
  endpoint: endpoint.includes("://") ? endpoint : `https://${endpoint}`,
  credentials: { accessKeyId, secretAccessKey },
  region: "us-east-1",
  forcePathStyle: true,
  requestHandler: { requestTimeout: 10_000 },
});

const publicDir = path.join(__dirname, '../public');

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimes = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.avif': 'image/avif',
  };
  return mimes[ext] || 'application/octet-stream';
}

function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  for (const file of fs.readdirSync(dir)) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, fileList);
    } else {
      fileList.push(name);
    }
  }
  return fileList;
}

/**
 * Convert relative path to MinIO object key.
 * Since bucket is already named "images", strip the leading "images/" prefix
 * so the URL becomes clean: cdn.easylegal.my.id/images/hero/hero.jpg
 */
function relPathToKey(relPath) {
  // Normalize path separators to forward slash for S3
  let key = relPath.split(path.sep).join('/');

  // Strip leading "images/" when bucket name is "images" (avoid double images/)
  // e.g., "images/hero/hero.jpg" → "hero/hero.jpg"
  if (bucketName === 'images' && key.startsWith('images/')) {
    key = key.slice('images/'.length);
  }

  return key;
}

async function fileExists(key) {
  try {
    await s3Client.send(new HeadObjectCommand({ Bucket: bucketName, Key: key }));
    return true;
  } catch {
    return false;
  }
}

async function sync() {
  console.log("\ud83d\ude80 Syncing static files to MinIO (bucket: " + bucketName + ")...");
  console.log("    Endpoint: " + endpoint);

  const allFiles = getFiles(publicDir);
  const imageFiles = allFiles.filter(f => getMimeType(f) !== 'application/octet-stream');

  if (imageFiles.length === 0) {
    console.log("  No image files found in public/. Skipping.");
    return;
  }

  let uploaded = 0;
  let skipped = 0;
  let errors = 0;

  for (const filePath of imageFiles) {
    const relPath = path.relative(publicDir, filePath);
    if (path.basename(filePath) === '.gitkeep') continue;

    const key = relPathToKey(relPath);

    // Skip if already exists (check via HEAD)
    if (await fileExists(key)) {
      skipped++;
      continue;
    }

    try {
      const buffer = fs.readFileSync(filePath);
      const contentType = getMimeType(filePath);

      await s3Client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        CacheControl: 'public, max-age=31536000, immutable',
      }));

      console.log(`  \u2713 ${relPath} \u2192 ${key}`);
      uploaded++;
    } catch (err) {
      console.error(`  \u2717 ${relPath} \u2192 ${key}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\nDone: ${uploaded} uploaded, ${skipped} skipped, ${errors} errors`);
  if (errors > 0) process.exit(1);
}

sync();
