import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import {
  buildPageTrafficWorkbook,
  getAnalyticsOverview,
  getAnalyticsDetail,
  parsePageTrafficQuery,
} from "../modules/analytics/analytics-service";

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

router.get("/page-traffic/export", requireAuth, async (req, res) => {
  try {
    const query = parsePageTrafficQuery(req.query as Record<string, string | undefined>);
    const workbook = await buildPageTrafficWorkbook(query);
    const rawBuffer = await workbook.xlsx.writeBuffer();
    const filename = `traffic-halaman-${query.year}-${String(query.month).padStart(2, "0")}-${query.domain}.xlsx`;
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(Buffer.from(rawBuffer));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gagal export traffic halaman";
    const invalidQuery = /^(Bulan|Tahun|Domain)/.test(message);
    console.error("Error exporting GA4 page traffic:", message);
    res.status(invalidQuery ? 400 : 500).json({ error: message });
  }
});

export default router;
