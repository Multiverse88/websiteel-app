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

import path from 'path';

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(o => o.trim())
  : ['https://easylegal.my.id', 'https://admin.easylegal.my.id', 'https://easylegal.biz.id'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
