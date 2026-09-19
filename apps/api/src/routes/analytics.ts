import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { getAnalyticsOverview } from "../modules/analytics/analytics-service";

const router = Router();

// GET /api/v1/analytics/overview — admin only: full-funnel multi-domain analytics
router.get("/overview", requireAuth, async (req, res) => {
  try {
    const { domain, from, to, excludeBot } = req.query as Record<string, string>;

    const data = await getAnalyticsOverview({
      domain: domain || "all",
      from,
      to,
      excludeBot: excludeBot !== "0", // default true unless explicitly passed '0'
    });

    res.json({ data });
  } catch (error: any) {
    console.error("Error generating analytics overview:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
