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

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:3000', 'https://easylegal.my.id', 'https://admin.easylegal.my.id'], // Allow Next.js as well
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
