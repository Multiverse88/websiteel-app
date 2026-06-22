import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const endpoint = process.env.MINIO_ENDPOINT;
const accessKeyId = process.env.MINIO_ACCESS_KEY;
const secretAccessKey = process.env.MINIO_SECRET_KEY;
const bucketName = process.env.MINIO_BUCKET || "images";
const publicUrl = process.env.MINIO_PUBLIC_URL || `http://${endpoint}/${bucketName}`;

export function isMinioConfigured(): boolean {
  return !!(endpoint && accessKeyId && secretAccessKey);
}

let s3Client: S3Client | null = null;

if (isMinioConfigured()) {
  s3Client = new S3Client({
    endpoint: endpoint?.includes("://") ? endpoint : `https://${endpoint}`,
    credentials: {
      accessKeyId: accessKeyId!,
      secretAccessKey: secretAccessKey!,
    },
    region: "us-east-1",
    forcePathStyle: true,
  });
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
    })
  );

  const cleanPublicUrl = publicUrl.replace(/\/+$/, "");
  return `${cleanPublicUrl}/${key}`;
}
