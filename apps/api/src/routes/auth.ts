import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { requireAuth, AuthedRequest } from '../middleware/auth';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET env var is required');
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Compare against a dummy hash even when the user doesn't exist, so the
  // response time doesn't leak whether an email is registered.
  const hashToCompare = user?.password ?? '$2a$12$invalidinvalidinvalidinvalidinvalidinva';
  const passwordMatches = await bcrypt.compare(password, hashToCompare);

  if (!user || !passwordMatches) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate Token
  const token = jwt.sign({ userId: user.id }, JWT_SECRET as string, { expiresIn: '1d' });

  // Set HTTP-Only Cookie
  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  res.json({ message: 'Logged in successfully', token: token, userId: user.id });
});

router.post('/logout', (_req, res) => {
  res.clearCookie('admin_token');
  res.json({ message: 'Logged out successfully' });
});

router.post('/plugin-token', requireAuth, (req: AuthedRequest, res) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // Generate a non-expiring token for the plugin
  const token = jwt.sign({ userId: req.userId, isPlugin: true }, JWT_SECRET as string);
  res.json({ message: 'Plugin token generated successfully', token });
});

router.get('/me', requireAuth, async (req: AuthedRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, email: true, name: true, avatar: true, role: true },
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ data: user });
});

router.get('/create-admin', async (req, res) => {
  try {
    const existing = await prisma.user.findUnique({ where: { email: 'admin@easylegal.my.id' } });
    if (existing) {
      return res.json({ message: 'Admin already exists', user: existing });
    }
    const hash = await bcrypt.hash('admin123', 10);
    const user = await prisma.user.create({
      data: {
        email: 'admin@easylegal.my.id',
        password: hash,
        name: 'Admin',
        role: 'ADMIN'
      }
    });
    res.json({ message: 'Admin created successfully! Use admin@easylegal.my.id and admin123', user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
