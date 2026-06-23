import { S3Client, PutObjectCommand, HeadBucketCommand } from "@aws-sdk/client-s3";

const endpoint = process.env.MINIO_ENDPOINT;
const accessKeyId = process.env.MINIO_ACCESS_KEY;
const secretAccessKey = process.env.MINIO_SECRET_KEY;
const bucketName = process.env.MINIO_BUCKET || "images";
const publicUrl = process.env.MINIO_PUBLIC_URL || `http://${endpoint}/${bucketName}`;

let s3Client: S3Client | null = null;
let bucketReady = false;

export function isMinioConfigured(): boolean {
  return !!(endpoint && accessKeyId && secretAccessKey);
}

if (isMinioConfigured()) {
  s3Client = new S3Client({
    endpoint: endpoint?.includes("://") ? endpoint : `https://${endpoint}`,
    credentials: {
      accessKeyId: accessKeyId!,
      secretAccessKey: secretAccessKey!,
    },
    region: "us-east-1",
    forcePathStyle: true,
    requestHandler: { requestTimeout: 10_000 },
  });
}

export async function ensureBucket(): Promise<void> {
  if (!s3Client || bucketReady) return;
  try {
    await s3Client.send(new HeadBucketCommand({ Bucket: bucketName }));
    bucketReady = true;
  } catch {
    console.warn(`Bucket "${bucketName}" not accessible — uploads may fail`);
  }
}

export async function uploadToMinio(
  buffer: Buffer,
  filename: string,
  contentType: string,
  folder: string
): Promise<string> {
  if (!s3Client) {
    throw new Error("MinIO/S3 Client is not configured. Please set the environment variables.");
  }

  const cleanFolder = folder.replace(/^\/+|\/+$/g, "");
  const key = `${cleanFolder}/${filename}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  const cleanPublicUrl = publicUrl.replace(/\/+$/, "");
  return `${cleanPublicUrl}/${key}`;
}
