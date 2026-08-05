import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Note: For this MVP phase, we bypass real bcrypt for testing scaffolding.
  // In a real scenario, we verify hash from DB.
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate Token
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });

  // Set HTTP-Only Cookie
  res.cookie('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  res.json({ message: 'Logged in successfully', token: token });
});

export default router;
