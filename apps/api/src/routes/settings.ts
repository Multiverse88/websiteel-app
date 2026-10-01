import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Whitelisted keys accessible without authentication
const PUBLIC_SETTINGS_KEYS = new Set(['article_header', 'article_footer', 'PROMOS']);

// Get a setting by key (public keys are open, all other keys require admin authentication)
router.get('/:key', (req: Request, res: Response, next) => {
  const { key } = req.params as { key: string };
  if (PUBLIC_SETTINGS_KEYS.has(key)) {
    return next();
  }
  return requireAuth(req, res, next);
}, async (req: Request, res: Response) => {
  try {
    const { key } = req.params as { key: string };
    const setting = await prisma.systemSetting.findUnique({
      where: { key }
    });

    if (!setting) {
      return res.status(404).json({ success: false, error: 'Setting not found' });
    }

    let parsedValue;
    try {
      parsedValue = JSON.parse(setting.value);
    } catch {
      parsedValue = setting.value;
    }

    res.json({ success: true, data: parsedValue });
  } catch (error: any) {
    console.error('Error fetching setting:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update or create a setting by key (admin only)
router.put('/:key', requireAuth, async (req: Request, res: Response) => {
  try {
    const { key } = req.params as { key: string };
    const { value } = req.body;

    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

    const setting = await prisma.systemSetting.upsert({
      where: { key },
      update: { value: stringValue },
      create: { key, value: stringValue }
    });

    let parsedValue;
    try {
      parsedValue = JSON.parse(setting.value);
    } catch {
      parsedValue = setting.value;
    }

    res.json({ success: true, data: parsedValue });
  } catch (error: any) {
    console.error('Error updating setting:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
