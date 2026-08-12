import { Router, Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { minioClient, BUCKET_NAME, CDN_BASE_URL } from '../lib/minio';
import path from 'path';
import { requireAuth } from '../middleware/auth';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB input limit before compression
});

// Every route here is CMS/admin-only (list/upload/delete media assets) —
// no public use case, and POST /upload especially must never be open.
router.use(requireAuth);

// Fallback preset assets if MinIO is empty or offline (all pointing to CDN)
const FALLBACK_ASSETS = [
  { name: 'iphone-mockup.png', size: 2612102, category: 'promo' },
  { name: 'transaksi-shopee.png', size: 10686978, category: 'promo' },
  { name: 'shopee.svg', size: 3671, category: 'promo' },
  { name: 'peta-indonesia.png', size: 219578, category: 'promo' },
  { name: 'promo-rups.png', size: 121537, category: 'promo' },
  { name: 'hero/hero-badan-usaha-v2.jpg', size: 1792575, category: 'hero' },
  { name: 'hero/hero-merek-v2.jpg', size: 1904714, category: 'hero' },
  { name: 'hero/hero-nib-v2.jpg', size: 1331338, category: 'hero' },
  { name: 'hero/hero-iso-v2.jpg', size: 1998279, category: 'hero' },
  { name: 'home/tentang-kami-hero.png', size: 14756358, category: 'hero' },
  { name: 'home/promo-bule2.png', size: 15788937, category: 'promo' },
  { name: 'home/promo-bule3.png', size: 15937870, category: 'promo' },
  { name: 'badges/pse-terdaftar.png', size: 858598, category: 'badges' },
  { name: 'badges/iso-sertifikat.png', size: 426167, category: 'badges' },
  { name: 'badges/promo-50.png', size: 46121, category: 'badges' },
  { name: 'badges/promo-20.png', size: 46281, category: 'badges' },
  { name: 'layanan/pt-1.jpg', size: 1602239, category: 'layanan' },
  { name: 'layanan/pt-perorangan-1.jpg', size: 2212603, category: 'layanan' },
  { name: 'layanan/cv-1.jpg', size: 1551185, category: 'layanan' },
  { name: 'layanan/merek-1.jpg', size: 1904714, category: 'layanan' },
  { name: 'layanan/nib-1.jpg', size: 1331338, category: 'layanan' },
  { name: 'layanan/kontrak-bisnis-1.jpg', size: 1685637, category: 'layanan' },
  { name: 'layanan/pkp-1.jpg', size: 1601215, category: 'layanan' },
  { name: 'layanan/visa-kitas-1.jpg', size: 3453927, category: 'layanan' },
  { name: 'logo.svg', size: 8127, category: 'general' },
  { name: 'logo-putih.png', size: 284407, category: 'general' },
  { name: 'rups-meeting.jpg', size: 804501, category: 'general' },
  { name: 'home/tentang-kami-cerita.jpg', size: 1818514, category: 'general' }
];

/**
 * GET /api/v1/media
 * Fetch all objects from MinIO bucket
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const timeoutCheck = new Promise<boolean>((_, reject) => 
      setTimeout(() => reject(new Error('MinIO connection timeout')), 2000)
    );
    const bucketExists = await Promise.race([
      minioClient.bucketExists(BUCKET_NAME),
      timeoutCheck
    ]).catch(() => false);
    
    if (!bucketExists) {
      const formatted = FALLBACK_ASSETS.map((item, idx) => ({
        id: `fb-${idx}`,
        name: path.basename(item.name),
        fullKey: item.name,
        size: item.size,
        lastModified: new Date().toISOString(),
        url: `${CDN_BASE_URL}/${item.name}`,
        cdnUrl: `${CDN_BASE_URL}/${item.name}`,
        category: item.category
      }));
      return res.json({ success: true, source: 'fallback', data: formatted });
    }

    const stream = minioClient.listObjectsV2(BUCKET_NAME, '', true);
    const objects: any[] = [];

    stream.on('data', (item) => {
      if (item && item.name) {
        const key = item.name.replace(/^images\//, ''); // Normalize prefix
        const cat = key.startsWith('hero/') ? 'hero'
                  : key.startsWith('badges/') ? 'badges'
                  : key.startsWith('layanan/') ? 'layanan'
                  : (key.includes('promo') || key.includes('shopee')) ? 'promo'
                  : 'general';

        const cdnFull = `${CDN_BASE_URL}/${key}`;
        objects.push({
          id: item.etag || item.name,
          name: path.basename(key),
          fullKey: key,
          size: item.size,
          lastModified: item.lastModified,
          url: cdnFull,
          cdnUrl: cdnFull,
          category: cat
        });
      }
    });

    stream.on('end', () => {
      if (objects.length === 0) {
        const formatted = FALLBACK_ASSETS.map((item, idx) => ({
          id: `fb-${idx}`,
          name: path.basename(item.name),
          fullKey: item.name,
          size: item.size,
          lastModified: new Date().toISOString(),
          url: `${CDN_BASE_URL}/${item.name}`,
          cdnUrl: `${CDN_BASE_URL}/${item.name}`,
          category: item.category
        }));
        return res.json({ success: true, source: 'preset', data: formatted });
      }
      return res.json({ success: true, source: 'minio', data: objects });
    });

    stream.on('error', (err) => {
      console.warn('MinIO stream error, serving fallback:', err.message);
      const formatted = FALLBACK_ASSETS.map((item, idx) => ({
        id: `fb-${idx}`,
        name: path.basename(item.name),
        fullKey: item.name,
        size: item.size,
        lastModified: new Date().toISOString(),
        url: `${CDN_BASE_URL}/${item.name}`,
        cdnUrl: `${CDN_BASE_URL}/${item.name}`,
        category: item.category
      }));
      return res.json({ success: true, source: 'fallback', data: formatted });
    });
  } catch (error: any) {
    console.error('Failed to list media:', error);
    const formatted = FALLBACK_ASSETS.map((item, idx) => ({
      id: `fb-${idx}`,
      name: path.basename(item.name),
      fullKey: item.name,
      size: item.size,
      lastModified: new Date().toISOString(),
      url: `${CDN_BASE_URL}/${item.name}`,
      cdnUrl: `${CDN_BASE_URL}/${item.name}`,
      category: item.category
    }));
    res.json({ success: true, source: 'fallback', data: formatted });
  }
});

/**
 * POST /api/v1/media/upload
 * Compresses image with sharp (webp conversion & resize) and uploads directly to MinIO
 */
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Tidak ada file yang diunggah' });
    }

    const originalExt = path.extname(file.originalname).toLowerCase();
    const rawBaseName = path.basename(file.originalname, originalExt).replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
    
    let uploadBuffer = file.buffer;
    let finalMimeType = file.mimetype;
    let finalExt = originalExt;

    // Perform compression to WebP (unless SVG)
    if (file.mimetype !== 'image/svg+xml') {
      try {
        uploadBuffer = await sharp(file.buffer)
          .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 82, effort: 4 })
          .toBuffer();
        finalMimeType = 'image/webp';
        finalExt = '.webp';
      } catch (compressionErr: any) {
        console.warn('Sharp compression fallback:', compressionErr.message);
        uploadBuffer = file.buffer;
      }
    }

    const safeName = `${Date.now()}-${rawBaseName}${finalExt}`;
    const objectKey = `uploads/${safeName}`;

    // Ensure bucket exists
    const exists = await minioClient.bucketExists(BUCKET_NAME).catch(() => false);
    if (!exists) {
      await minioClient.makeBucket(BUCKET_NAME, 'us-east-1');
    }

    await minioClient.putObject(
      BUCKET_NAME,
      objectKey,
      uploadBuffer,
      uploadBuffer.length,
      { 'Content-Type': finalMimeType }
    );

    const fullUrl = `${CDN_BASE_URL}/${objectKey}`;
    const savingsPercent = Math.max(0, Math.round(((file.size - uploadBuffer.length) / file.size) * 100));

    return res.status(201).json({
      success: true,
      data: {
        id: safeName,
        name: `${rawBaseName}${finalExt}`,
        fullKey: objectKey,
        size: uploadBuffer.length,
        originalSize: file.size,
        savings: `${savingsPercent}%`,
        url: fullUrl,
        cdnUrl: fullUrl,
        category: 'general'
      }
    });
  } catch (error: any) {
    console.error('Upload to MinIO failed:', error);
    return res.status(500).json({ error: 'Gagal mengunggah & kompres gambar ke MinIO CDN: ' + error.message });
  }
});

/**
 * DELETE /api/v1/media/:name
 */
router.delete('/:name', async (req: Request, res: Response) => {
  try {
    const objectKey = Array.isArray(req.params.name) ? req.params.name.join('/') : String(req.params.name || '');
    await minioClient.removeObject(BUCKET_NAME, objectKey);
    return res.json({ success: true, message: 'File berhasil dihapus dari MinIO' });
  } catch (error: any) {
    console.error('Delete from MinIO failed:', error);
    return res.status(500).json({ error: 'Gagal menghapus file: ' + error.message });
  }
});

export default router;
