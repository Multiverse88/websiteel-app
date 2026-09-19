import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import articleRoutes from './routes/articles';
import landingPageRoutes from './routes/landing-pages';
import contactRoutes from './routes/contacts';
import redirectRoutes from './routes/redirects';
import newsletterRoutes from './routes/newsletter';
import emailBlastRoutes from './routes/email-blast';
import trackingRoutes from './routes/tracking';
import cronRoutes from './routes/cron';
import mediaRoutes from './routes/media';
import domainRoutes from './routes/domains';
import settingsRoutes from './routes/settings';
import whatsappRoutes from './routes/whatsapp';
import campaignLeadRoutes from './routes/campaign-leads';
import analyticsRoutes from './routes/analytics';
import path from 'path';

const app = express();
// Di belakang Traefik (satu reverse proxy). Tanpa ini, req.ip selalu IP
// container Traefik, bukan IP klien asli — bikin rate limit & dedup
// berbasis IP di rotator WhatsApp (routes/whatsapp.ts) tidak berguna.
app.set("trust proxy", 1);
const PORT = process.env.PORT || 4000;

// Origin yang diizinkan. Daftar bawaan di-UNION dengan CORS_ORIGINS dari
// env — bukan diganti — supaya satu domain yang ketinggalan di env tidak
// membuat seluruh origin bawaan ikut terblokir (penyebab "Not allowed by
// CORS" 2026-09-13/14). Varian www wajib ikut karena Traefik app publik juga
// serve Host(`www.easylegal.*`) (lihat docker-compose.dokploy.yml).
const baseOrigins = [
  'https://easylegal.my.id',
  'https://www.easylegal.my.id',
  'https://admin.easylegal.my.id',
  'https://easylegal.biz.id',
  'https://www.easylegal.biz.id',
  // Multi-tenant public site also serves easylegal.co.id (see
  // apps/web/src/lib/domains.ts) — missing here caused client-side
  // fetches from that origin (e.g. BottomPromoSection) to fail CORS
  // and break page interactivity, including the navbar.
  'https://easylegal.co.id',
  'https://www.easylegal.co.id',
  'https://easylegal.id',
  'https://www.easylegal.id',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
];

const allowedOrigins: string[] = [
  ...baseOrigins,
  ...(process.env.CORS_ORIGINS?.split(',') ?? [])
]
  .map((o) => o.trim().replace(/\/+$/, ''))
  .filter((o): o is string => Boolean(o));

app.use(cors({
  origin: (origin, callback) => {
    const normalized = origin ? origin.replace(/\/+$/, '') : '';
    if (!origin || allowedOrigins.includes(normalized)) {
      callback(null, true);
    } else {
      // Tolak sunyi: browser tetap diblokir (tanpa header CORS), tapi Express
      // tidak menumpuk stack trace Error ke log container.
      console.warn(`[cors] origin ditolak: ${origin}`);
      callback(null, false);
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Serve static images and uploads from public folder
const publicDir = path.resolve(__dirname, '../../../public');
app.use('/images', express.static(path.join(publicDir, 'images')));
app.use('/uploads', express.static(path.join(publicDir, 'uploads')));
app.use(express.static(publicDir));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/v1/articles', articleRoutes);
app.use('/api/v1/landing-pages', landingPageRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/redirects', redirectRoutes);
app.use('/api/v1/newsletter', newsletterRoutes);
app.use('/api/v1/email-blast', emailBlastRoutes);
app.use('/api/v1/tracking', trackingRoutes);
app.use('/api/v1/cron', cronRoutes);
app.use('/api/v1/media', mediaRoutes);
app.use('/api/v1/domains', domainRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/wa', whatsappRoutes);
app.use('/api/v1/campaign-leads', campaignLeadRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// Glossary telah dihapus permanen — respon HTTP 410 Gone untuk setiap request
app.use(['/glossary', '/api/v1/glossary'], (_req, res) => {
  res.status(410).json({
    error: "Gone",
    code: 410,
    message: "Kamus legal / glossary telah dihapus secara permanen dari EasyLegal (status 410 Gone)",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
