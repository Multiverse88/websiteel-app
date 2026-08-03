import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import articleRoutes from './routes/articles';
import landingPageRoutes from './routes/landing-pages';
import contactRoutes from './routes/contacts';
import redirectRoutes from './routes/redirects';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:3000'], // Allow Next.js as well
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
