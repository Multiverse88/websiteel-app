const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

// Simple environment variables loader for local testing (production loads via docker env)
function loadEnv(envPath) {
  if (fs.existsSync(envPath)) {
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
}

// Load env files
loadEnv(path.join(__dirname, '../.env.production'));
loadEnv(path.join(__dirname, '../.env'));

const endpoint = process.env.MINIO_ENDPOINT;
const accessKeyId = process.env.MINIO_ACCESS_KEY;
const secretAccessKey = process.env.MINIO_SECRET_KEY;
const bucketName = process.env.MINIO_BUCKET || "images";

if (!endpoint || !accessKeyId || !secretAccessKey) {
  console.log("⚠️ MinIO credentials not fully configured. Skipping CDN sync.");
  process.exit(0);
}

const s3Client = new S3Client({
  endpoint: endpoint.includes("://") ? endpoint : `https://${endpoint}`,
  credentials: { accessKeyId, secretAccessKey },
  region: "us-east-1",
  forcePathStyle: true,
});

const publicDir = path.join(__dirname, '../public');

// Helper to get mime type
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
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json'
  };
  return mimes[ext] || 'application/octet-stream';
}

// Recursive directory walk
function getFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, fileList);
    } else {
      fileList.push(name);
    }
  }
  return fileList;
}

async function sync() {
  console.log("🚀 Starting MinIO CDN static images sync...");
  try {
    const files = getFiles(publicDir);
    for (const filePath of files) {
      const relPath = path.relative(publicDir, filePath);
      
      // Skip gitkeep files
      if (path.basename(filePath) === '.gitkeep') continue;

      const buffer = fs.readFileSync(filePath);
      const contentType = getMimeType(filePath);

      console.log(`Uploading ${relPath} (${contentType})...`);
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: relPath,
          Body: buffer,
          ContentType: contentType,
        })
      );
    }
    console.log("✅ MinIO CDN static images sync completed successfully!");
  } catch (err) {
    console.error("❌ Error during MinIO CDN sync:", err);
  }
}

sync();
