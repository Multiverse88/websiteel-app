import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

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

export default router;
