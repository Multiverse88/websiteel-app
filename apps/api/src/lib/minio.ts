import { Client as MinioClient } from "minio";

const rawEndpoint = process.env.MINIO_ENDPOINT || "157.10.252.77:9000";
const cleanEndpoint = rawEndpoint.replace(/^https?:\/\//, "");
const [host, portStr] = cleanEndpoint.split(":");
const port = portStr ? parseInt(portStr, 10) : parseInt(process.env.MINIO_PORT || "9000", 10);
const useSSL = process.env.MINIO_USE_SSL === "true";
const accessKey = process.env.MINIO_ACCESS_KEY || "minioadmin";
const secretKey = process.env.MINIO_SECRET_KEY || "minioadmin";

export const BUCKET_NAME = process.env.MINIO_BUCKET || "images";
export const CDN_BASE_URL = (process.env.MINIO_PUBLIC_URL || "https://cdn.easylegal.my.id/images").replace(/\/$/, "");

export const minioClient = new MinioClient({
  endPoint: host || "157.10.252.77",
  port: port || 9000,
  useSSL: useSSL,
  accessKey: accessKey,
  secretKey: secretKey,
});
