import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { getAnalyticsOverview, getAnalyticsDetail } from "../modules/analytics/analytics-service";

const router = Router();

// GET /api/v1/analytics/overview — admin only: full-funnel multi-domain analytics
router.get("/overview", requireAuth, async (req, res) => {
  try {
    const { domain, from, to, groupBy, excludeBot } = req.query as Record<string, string>;

    const data = await getAnalyticsOverview({
      domain: domain || "all",
      from,
      to,
      groupBy: (groupBy as "day" | "week" | "month") || "day",
      excludeBot: excludeBot !== "0", // default true unless explicitly passed '0'
    });

    res.json({ data });
  } catch (error: any) {
    console.error("Error generating analytics overview:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/v1/analytics/detail — admin only: deep-dive charts & multi-dimension analysis
router.get("/detail", requireAuth, async (req, res) => {
  try {
    const { domain, from, to, groupBy, excludeBot } = req.query as Record<string, string>;

    const data = await getAnalyticsDetail({
      domain: domain || "all",
      from,
      to,
      groupBy: (groupBy as "day" | "week" | "month") || "day",
      excludeBot: excludeBot !== "0",
    });

    res.json({ data });
  } catch (error: any) {
    console.error("Error generating analytics detail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
