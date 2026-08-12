import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAuth } from "../middleware/auth";

const router = Router();

// GET /api/v1/redirects
router.get("/", requireAuth, async (req, res) => {
  try {
    const redirects = await prisma.redirect.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json({ data: redirects });
  } catch (error) {
    console.error("Error fetching redirects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/v1/redirects/:slug
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    
    const redirect = await prisma.redirect.findUnique({
      where: { slug },
      select: { destination: true },
    });

    if (redirect) {
      // Fire-and-forget click count (won't block response)
      prisma.redirect
        .update({ where: { slug }, data: { clicks: { increment: 1 } } })
        .catch(() => {});

      return res.json({ data: redirect });
    }

    res.status(404).json({ error: "Redirect not found" });
  } catch (error) {
    console.error("Error fetching redirect by slug:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/v1/redirects
router.post("/", requireAuth, async (req, res) => {
  try {
    const { slug, destination } = req.body;

    if (!slug || !destination) {
      return res.status(400).json({ error: "Slug dan destination wajib diisi" });
    }

    const redirect = await prisma.redirect.create({
      data: { slug, destination },
    });

    res.status(201).json({ data: redirect });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Slug sudah digunakan" });
    }
    console.error("Failed to create redirect:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /api/v1/redirects/:id
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, destination } = req.body;

    const existing = await prisma.redirect.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Redirect tidak ditemukan" });
    }

    const redirect = await prisma.redirect.update({
      where: { id },
      data: {
        slug: slug || existing.slug,
        destination: destination || existing.destination,
      },
    });

    res.json({ data: redirect });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Slug sudah digunakan" });
    }
    console.error("Failed to update redirect:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/v1/redirects/:id
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.redirect.delete({ where: { id } });
    res.json({ success: true, message: "Redirect deleted" });
  } catch (error) {
    console.error("Failed to delete redirect:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
