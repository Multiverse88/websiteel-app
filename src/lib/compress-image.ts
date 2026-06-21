import { trackDistribution } from "@/lib/metrics";

const COMPRESS_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: "image/jpeg" as const,
};

export async function compressImageFile(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;

  const originalSizeKB = Math.round(file.size / 1024);

  try {
    const { default: imageCompression } = await import("browser-image-compression");
    const compressed = await imageCompression(file, COMPRESS_OPTIONS);
    const compressedSizeKB = Math.round(compressed.size / 1024);
    const ratio = Math.round((1 - compressed.size / file.size) * 100);
    trackDistribution("image_compress_original_kb", originalSizeKB);
    trackDistribution("image_compress_result_kb", compressedSizeKB);
    trackDistribution("image_compress_ratio_pct", ratio);
    return compressed;
  } catch {
    return file;
  }
}
