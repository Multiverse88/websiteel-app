import { prisma } from "../../lib/prisma";
import { wibDateStart } from "../leads/daily-rotator-fairness";

export interface AnalyticsQuery {
  domain?: string;
  from?: string;
  to?: string;
  excludeBot?: boolean;
}

export interface AnalyticsFunnel {
  totalClicks: number;
  organicLeads: number;
  botFiltered: number;
  contacted: number;
  won: number;
  totalRevenue: number;
  closingRate: number;
}

export interface AnalyticsTimelineItem {
  date: string; // YYYY-MM-DD
  total: number;
  id: number;
  biz: number;
  co: number;
}

export interface AnalyticsChannelItem {
  channel: string;
  label: string;
  count: number;
  percentage: number;
}

export interface AnalyticsTopPageItem {
  path: string;
  domain: string;
  totalLeads: number;
  wonCount: number;
  revenue: number;
  closingRate: number;
}

export interface AnalyticsTopArticleItem {
  slug: string;
  title: string;
  site: string;
  viewCount: number;
  leadsGenerated: number;
}

export interface AnalyticsOverview {
  funnel: AnalyticsFunnel;
  timeline: AnalyticsTimelineItem[];
  channels: AnalyticsChannelItem[];
  topPages: AnalyticsTopPageItem[];
  topArticles: AnalyticsTopArticleItem[];
}

const CHANNEL_LABELS: Record<string, string> = {
  ORGANIC_SEARCH: "Google SEO Organik",
  GOOGLE_ADS: "Google Ads",
  META_ADS: "Meta Ads (IG/FB)",
  DIRECT: "Langsung (Direct)",
  REFERRAL: "Referral Partner",
  OTHER: "Lainnya",
  UNKNOWN: "Tidak Teridentifikasi",
};

export function calculateClosingRate(won: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((won / total) * 1000) / 10;
}

export async function getAnalyticsOverview(query: AnalyticsQuery = {}): Promise<AnalyticsOverview> {
  const { domain, from, to, excludeBot = true } = query;

  // Build WHERE conditions for raw queries
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (domain && domain !== "all") {
    params.push(domain);
    conditions.push(`"domain" = $${params.length}`);
  }

  if (from) {
    const fromDate = wibDateStart(from);
    if (fromDate) {
      params.push(fromDate);
      conditions.push(`"createdAt" >= $${params.length}`);
    }
  }

  if (to) {
    const toDate = wibDateStart(to);
    if (toDate) {
      const endExclusive = new Date(toDate.getTime() + 24 * 60 * 60 * 1000);
      params.push(endExclusive);
      conditions.push(`"createdAt" < $${params.length}`);
    }
  }

  const baseWhereSql = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  // 1. Funnel KPIs
  const [funnelRaw] = await prisma.$queryRawUnsafe<any[]>(
    `SELECT
      COUNT(*)::bigint as total_clicks,
      COUNT(*) FILTER (WHERE NOT "isSuspectedBot")::bigint as organic_leads,
      COUNT(*) FILTER (WHERE "isSuspectedBot")::bigint as bot_filtered,
      COUNT(*) FILTER (WHERE NOT "isSuspectedBot" AND "status" != 'NEW')::bigint as contacted,
      COUNT(*) FILTER (WHERE NOT "isSuspectedBot" AND "status" = 'WON')::bigint as won,
      COALESCE(SUM("orderValue") FILTER (WHERE NOT "isSuspectedBot" AND "status" = 'WON'), 0)::bigint as total_revenue
     FROM "WhatsAppClick"
     ${baseWhereSql}`,
    ...params,
  );

  const totalClicks = Number(funnelRaw?.total_clicks || 0);
  const organicLeads = Number(funnelRaw?.organic_leads || 0);
  const botFiltered = Number(funnelRaw?.bot_filtered || 0);
  const contacted = Number(funnelRaw?.contacted || 0);
  const won = Number(funnelRaw?.won || 0);
  const totalRevenue = Number(funnelRaw?.total_revenue || 0);
  const closingRate = calculateClosingRate(won, organicLeads);

  const funnel: AnalyticsFunnel = {
    totalClicks,
    organicLeads,
    botFiltered,
    contacted,
    won,
    totalRevenue,
    closingRate,
  };

  // Add excludeBot filter to subsequent breakdowns if requested
  const breakdownConditions = [...conditions];
  const breakdownParams = [...params];
  if (excludeBot) {
    breakdownConditions.push(`"isSuspectedBot" = false`);
  }
  const breakdownWhereSql = breakdownConditions.length ? `WHERE ${breakdownConditions.join(" AND ")}` : "";

  // 2. Timeline (bucketed per WIB calendar day)
  const timelineRows = await prisma.$queryRawUnsafe<any[]>(
    `SELECT
      TO_CHAR("createdAt" + interval '7 hours', 'YYYY-MM-DD') as day,
      COUNT(*)::bigint as total,
      COUNT(*) FILTER (WHERE "domain" = 'easylegal.id')::bigint as count_id,
      COUNT(*) FILTER (WHERE "domain" = 'easylegal.biz.id')::bigint as count_biz,
      COUNT(*) FILTER (WHERE "domain" = 'easylegal.co.id')::bigint as count_co
     FROM "WhatsAppClick"
     ${breakdownWhereSql}
     GROUP BY day
     ORDER BY day ASC
     LIMIT 90`,
    ...breakdownParams,
  );

  const timeline: AnalyticsTimelineItem[] = timelineRows.map((r) => ({
    date: r.day,
    total: Number(r.total || 0),
    id: Number(r.count_id || 0),
    biz: Number(r.count_biz || 0),
    co: Number(r.count_co || 0),
  }));

  // 3. Acquisition Channels
  const channelRows = await prisma.$queryRawUnsafe<any[]>(
    `SELECT
      COALESCE(NULLIF("channel"::text, ''), 'UNKNOWN') as channel,
      COUNT(*)::bigint as count
     FROM "WhatsAppClick"
     ${breakdownWhereSql}
     GROUP BY channel
     ORDER BY count DESC`,
    ...breakdownParams,
  );

  const totalChannelLeads = channelRows.reduce((acc, r) => acc + Number(r.count || 0), 0);
  const channels: AnalyticsChannelItem[] = channelRows.map((r) => {
    const count = Number(r.count || 0);
    const channelKey = String(r.channel);
    return {
      channel: channelKey,
      label: CHANNEL_LABELS[channelKey] || channelKey,
      count,
      percentage: totalChannelLeads > 0 ? Math.round((count / totalChannelLeads) * 1000) / 10 : 0,
    };
  });

  // 4. Top Converting Pages
  const pageRows = await prisma.$queryRawUnsafe<any[]>(
    `SELECT
      COALESCE(NULLIF("product", ''), '/ (Beranda)') as path,
      COALESCE(NULLIF("domain", ''), 'easylegal.id') as domain,
      COUNT(*)::bigint as total_leads,
      COUNT(*) FILTER (WHERE "status" = 'WON')::bigint as won_count,
      COALESCE(SUM("orderValue") FILTER (WHERE "status" = 'WON'), 0)::bigint as revenue
     FROM "WhatsAppClick"
     ${breakdownWhereSql}
     GROUP BY path, domain
     ORDER BY total_leads DESC
     LIMIT 20`,
    ...breakdownParams,
  );

  const topPages: AnalyticsTopPageItem[] = pageRows.map((r) => {
    const totalLeads = Number(r.total_leads || 0);
    const wonCount = Number(r.won_count || 0);
    const revenue = Number(r.revenue || 0);
    return {
      path: r.path,
      domain: r.domain,
      totalLeads,
      wonCount,
      revenue,
      closingRate: calculateClosingRate(wonCount, totalLeads),
    };
  });

  // 5. Top Articles
  const articleSiteFilter = domain && domain !== "all" ? { site: domain } : {};
  const articles = await prisma.article.findMany({
    where: {
      status: "published",
      ...articleSiteFilter,
    },
    select: {
      slug: true,
      title: true,
      site: true,
      viewCount: true,
    },
    orderBy: { viewCount: "desc" },
    take: 10,
  });

  // Find leads generated by each article
  const topArticles: AnalyticsTopArticleItem[] = await Promise.all(
    articles.map(async (a) => {
      const leadsCount = await prisma.whatsAppClick.count({
        where: {
          product: { contains: a.slug },
          ...(excludeBot ? { isSuspectedBot: false } : {}),
        },
      });
      return {
        slug: a.slug,
        title: a.title,
        site: a.site,
        viewCount: a.viewCount,
        leadsGenerated: leadsCount,
      };
    }),
  );

  return {
    funnel,
    timeline,
    channels,
    topPages,
    topArticles,
  };
}
