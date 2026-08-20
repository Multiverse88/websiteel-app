import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../middleware/auth';

const router = Router();

// GET all domains
router.get('/', requireAuth, async (req, res) => {
  try {
    const domains = await prisma.domain.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json({ data: domains });
  } catch (error: any) {
    console.error('Error fetching domains:', error);
    res.status(500).json({ error: 'Failed to fetch domains' });
  }
});

// GET single domain
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const domain = await prisma.domain.findUnique({
      where: { id: req.params.id as string }
    });
    if (!domain) {
      return res.status(404).json({ error: 'Domain not found' });
    }
    res.json({ data: domain });
  } catch (error: any) {
    console.error('Error fetching domain:', error);
    res.status(500).json({ error: 'Failed to fetch domain' });
  }
});

// POST create domain
router.post('/', requireAuth, async (req, res) => {
  try {
    const { id, name, hostname, description } = req.body;
    if (!id || !name || !hostname) {
      return res.status(400).json({ error: 'id, name, and hostname are required' });
    }

    const newDomain = await prisma.domain.create({
      data: {
        id,
        name,
        hostname,
        description,
        updatedAt: new Date()
      }
    });
    res.status(201).json({ data: newDomain });
  } catch (error: any) {
    console.error('Error creating domain:', error);
    res.status(500).json({ error: 'Failed to create domain' });
  }
});

// PUT update domain
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { name, hostname, description } = req.body;
    
    const updatedDomain = await prisma.domain.update({
      where: { id: req.params.id as string },
      data: {
        ...(name && { name }),
        ...(hostname && { hostname }),
        ...(description !== undefined && { description }),
        updatedAt: new Date()
      }
    });
    res.json({ data: updatedDomain });
  } catch (error: any) {
    console.error('Error updating domain:', error);
    res.status(500).json({ error: 'Failed to update domain' });
  }
});

// DELETE delete domain
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await prisma.domain.delete({
      where: { id: req.params.id as string }
    });
    res.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting domain:', error);
    res.status(500).json({ error: 'Failed to delete domain' });
  }
});

export default router;
