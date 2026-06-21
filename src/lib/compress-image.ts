const COMPRESS_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: "image/jpeg" as const,
};

export async function compressImageFile(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;

  try {
    const { default: imageCompression } = await import("browser-image-compression");
    const compressed = await imageCompression(file, COMPRESS_OPTIONS);
    return compressed;
  } catch {
    return file;
  }
}
