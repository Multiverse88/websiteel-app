import { prisma } from "../../lib/prisma";
import { wibDateStart } from "../leads/daily-rotator-fairness";

export interface AnalyticsQuery {
  domain?: string;
  from?: string;
  to?: string;
  groupBy?: "day" | "week" | "month";
  excludeBot?: boolean;
}

export interface AnalyticsFunnel {
  totalClicks: number;
  organicLeads: number;
  botFiltered: number;
  todayLeads: number;
  organicSeoLeads: number;
  organicSeoPercent: number;
  topPageName: string;
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
  sharePercent: number;
  topSource: string;
  todayLeads: number;
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

export interface AnalyticsDetailQuery extends AnalyticsQuery {
  groupBy?: "day" | "week" | "month";
}

export interface AnalyticsDetailHourlyItem {
  hour: number;
  label: string;
  leads: number;
}

export interface AnalyticsDetailDayOfWeekItem {
  dayIndex: number;
  dayName: string;
  leads: number;
}

export interface AnalyticsDetailTrendItem {
  bucket: string;
  total: number;
  id: number;
  biz: number;
  co: number;
  bot: number;
}

export interface AnalyticsDetailServiceItem {
  serviceName: string;
  leads: number;
  percentage: number;
}

export interface AnalyticsDetailCsItem {
  numberId: string;
  label: string;
  number: string;
  leads: number;
  percentage: number;
}

export interface AnalyticsDetailOverview {
  hourly: AnalyticsDetailHourlyItem[];
  dayOfWeek: AnalyticsDetailDayOfWeekItem[];
  trend: AnalyticsDetailTrendItem[];
  services: AnalyticsDetailServiceItem[];
  csNumbers: AnalyticsDetailCsItem[];
  allPages: AnalyticsTopPageItem[];
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
const SOURCE_CODE_LABELS: Record<string, string> = {
  googleseo: "Google SEO",
  gads: "Google Ads",
  metaads: "Meta Ads",
  instagram: "Instagram",
  tiktok: "TikTok",
  direct: "Direct",
  referral: "Referral",
  unknown: "Organik",
};

export function calculateSharePercent(value: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((value / total) * 1000) / 10;
}
export async function getAnalyticsOverview(query: AnalyticsQuery = {}): Promise<AnalyticsOverview> {
  const { domain, from, to, groupBy = "day", excludeBot = true } = query;

  const validGroupBy = ["day", "week", "month"].includes(groupBy) ? groupBy : "day";
  const formatPattern = validGroupBy === "month" ? "YYYY-MM" : "YYYY-MM-DD";
  // Build WHERE conditions
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
      COUNT(*) FILTER (WHERE NOT "isSuspectedBot" AND "createdAt" + interval '7 hours' >= CURRENT_DATE)::bigint as today_leads,
      COUNT(*) FILTER (WHERE NOT "isSuspectedBot" AND "channel" = 'ORGANIC_SEARCH')::bigint as organic_seo_leads
     FROM "WhatsAppClick"
     ${baseWhereSql}`,
    ...params,
  );

  const totalClicks = Number(funnelRaw?.total_clicks || 0);
  const organicLeads = Number(funnelRaw?.organic_leads || 0);
  const botFiltered = Number(funnelRaw?.bot_filtered || 0);
  const todayLeads = Number(funnelRaw?.today_leads || 0);
  const organicSeoLeads = Number(funnelRaw?.organic_seo_leads || 0);
  const organicSeoPercent = calculateSharePercent(organicSeoLeads, organicLeads);

  // Add excludeBot filter to subsequent breakdowns if requested
  const breakdownConditions = [...conditions];
  const breakdownParams = [...params];
  if (excludeBot) {
    breakdownConditions.push(`"isSuspectedBot" = false`);
  }
  const breakdownWhereSql = breakdownConditions.length ? `WHERE ${breakdownConditions.join(" AND ")}` : "";

  // 2. Timeline (bucketed per WIB calendar day / week / month)
  const timelineRows = await prisma.$queryRawUnsafe<any[]>(
    `SELECT
      TO_CHAR(date_trunc('${validGroupBy}', "createdAt" + interval '7 hours'), '${formatPattern}') as day,
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
      MODE() WITHIN GROUP (ORDER BY "sourceCode") as top_source_code,
      COUNT(*) FILTER (WHERE "createdAt" + interval '7 hours' >= CURRENT_DATE)::bigint as today_leads
     FROM "WhatsAppClick"
     ${breakdownWhereSql}
     GROUP BY path, domain
     ORDER BY total_leads DESC
     LIMIT 20`,
    ...breakdownParams,
  );

  const topPages: AnalyticsTopPageItem[] = pageRows.map((r) => {
    const totalLeads = Number(r.total_leads || 0);
    const sourceCode = String(r.top_source_code || "unknown").toLowerCase();
    const topSource = SOURCE_CODE_LABELS[sourceCode] || sourceCode;
    const todayLeads = Number(r.today_leads || 0);
    return {
      path: r.path,
      domain: r.domain,
      totalLeads,
      sharePercent: calculateSharePercent(totalLeads, organicLeads),
      topSource,
      todayLeads,
    };
  });

  const topPageName = topPages[0]?.path || "-";

  const funnel: AnalyticsFunnel = {
    totalClicks,
    organicLeads,
    botFiltered,
    todayLeads,
    organicSeoLeads,
    organicSeoPercent,
    topPageName,
  };

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
export async function getAnalyticsDetail(query: AnalyticsDetailQuery = {}): Promise<AnalyticsDetailOverview> {
  const { domain, from, to, groupBy = "day", excludeBot = true } = query;

  // Validate groupBy
  const validGroupBy = ["day", "week", "month"].includes(groupBy) ? groupBy : "day";
  const truncUnit = validGroupBy;
  const formatPattern = validGroupBy === "month" ? "YYYY-MM" : "YYYY-MM-DD";

  // Build WHERE conditions
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

  // Conditions for clean traffic queries
  const breakdownConditions = [...conditions];
  const breakdownParams = [...params];
  if (excludeBot) {
    breakdownConditions.push(`"isSuspectedBot" = false`);
  }
  const breakdownWhereSql = breakdownConditions.length ? `WHERE ${breakdownConditions.join(" AND ")}` : "";

  // 1. Hourly Distribution (00:00 - 23:00 WIB)
  const hourlyRows = await prisma.$queryRawUnsafe<any[]>(
    `SELECT
      EXTRACT(HOUR FROM "createdAt" + interval '7 hours')::int as hour,
      COUNT(*)::bigint as leads
     FROM "WhatsAppClick"
     ${breakdownWhereSql}
     GROUP BY hour
     ORDER BY hour ASC`,
    ...breakdownParams,
  );
  const hourMap = new Map(hourlyRows.map((r) => [Number(r.hour), Number(r.leads || 0)]));
  const hourly: AnalyticsDetailHourlyItem[] = Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    label: `${String(h).padStart(2, "0")}:00`,
    leads: hourMap.get(h) || 0,
  }));

  // 2. Day of Week Distribution (1: Senin - 7: Minggu)
  const dayRows = await prisma.$queryRawUnsafe<any[]>(
    `SELECT
      EXTRACT(ISODOW FROM "createdAt" + interval '7 hours')::int as day_index,
      COUNT(*)::bigint as leads
     FROM "WhatsAppClick"
     ${breakdownWhereSql}
     GROUP BY day_index
     ORDER BY day_index ASC`,
    ...breakdownParams,
  );
  const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const dayMap = new Map(dayRows.map((r) => [Number(r.day_index), Number(r.leads || 0)]));
  const dayOfWeek: AnalyticsDetailDayOfWeekItem[] = DAYS.map((dayName, idx) => ({
    dayIndex: idx + 1,
    dayName,
    leads: dayMap.get(idx + 1) || 0,
  }));

  // 3. Trend Grouped by day / week / month
  const trendRows = await prisma.$queryRawUnsafe<any[]>(
    `SELECT
      TO_CHAR(date_trunc('${truncUnit}', "createdAt" + interval '7 hours'), '${formatPattern}') as bucket,
      COUNT(*) FILTER (WHERE NOT "isSuspectedBot")::bigint as total,
      COUNT(*) FILTER (WHERE NOT "isSuspectedBot" AND "domain" = 'easylegal.id')::bigint as count_id,
      COUNT(*) FILTER (WHERE NOT "isSuspectedBot" AND "domain" = 'easylegal.biz.id')::bigint as count_biz,
      COUNT(*) FILTER (WHERE NOT "isSuspectedBot" AND "domain" = 'easylegal.co.id')::bigint as count_co,
      COUNT(*) FILTER (WHERE "isSuspectedBot")::bigint as count_bot
     FROM "WhatsAppClick"
     ${baseWhereSql}
     GROUP BY bucket
     ORDER BY bucket ASC
     LIMIT 120`,
    ...params,
  );
  const trend: AnalyticsDetailTrendItem[] = trendRows.map((r) => ({
    bucket: r.bucket,
    total: Number(r.total || 0),
    id: Number(r.count_id || 0),
    biz: Number(r.count_biz || 0),
    co: Number(r.count_co || 0),
    bot: Number(r.count_bot || 0),
  }));

  // 4. Service Categories
  const serviceRows = await prisma.$queryRawUnsafe<any[]>(
    `SELECT
      CASE
        -- 1. Badan Usaha & Korporasi
        WHEN product ILIKE '%pt-pma%' THEN 'PT PMA'
        WHEN product ILIKE '%pt-perorangan%' THEN 'PT Perorangan'
        WHEN product ILIKE '%-pt%' OR product ILIKE '%/pt%' OR product ILIKE '%perseroan-terbatas%' OR product ILIKE '%pendirian-pt%' THEN 'Pendirian PT'
        WHEN product ILIKE '%-cv%' OR product ILIKE '%/cv%' OR product ILIKE '%pendirian-cv%' THEN 'Pendirian CV'
        WHEN product ILIKE '%yayasan%' THEN 'Yayasan'
        WHEN product ILIKE '%koperasi%' THEN 'Koperasi'
        WHEN product ILIKE '%firma%' THEN 'Firma'
        WHEN product ILIKE '%perkumpulan%' THEN 'Perkumpulan'
        WHEN product ILIKE '%pendirian-badan-usaha%' THEN 'Pendirian Badan Usaha'

        -- 2. Izin Operasional & Legalitas
        WHEN product ILIKE '%nib%' OR product ILIKE '%oss%' THEN 'NIB & OSS'
        WHEN product ILIKE '%merek%' OR product ILIKE '%haki%' THEN 'Merek & HAKI'
        WHEN product ILIKE '%iso%' THEN 'Sertifikasi ISO'
        WHEN product ILIKE '%pkp%' THEN 'Pengajuan PKP'
        WHEN product ILIKE '%pse%' THEN 'Pendaftaran PSE'
        WHEN product ILIKE '%pkkpr%' THEN 'Kesesuaian PKKPR'
        WHEN product ILIKE '%kbli%' THEN 'Penyesuaian KBLI'

        -- 3. Layanan Khusus & Kepatuhan
        WHEN product ILIKE '%pembubaran%' THEN 'Pembubaran Perusahaan'
        WHEN product ILIKE '%apostille%' THEN 'Legalisasi Apostille'
        WHEN product ILIKE '%lkpm%' THEN 'Pelaporan LKPM'
        WHEN product ILIKE '%perkawinan%' OR product ILIKE '%prenup%' THEN 'Perjanjian Perkawinan'
        WHEN product ILIKE '%visa%' OR product ILIKE '%kitas%' THEN 'Visa & KITAS'
        WHEN product ILIKE '%rups%' THEN 'Pelaporan RUPS'
        WHEN product ILIKE '%akta%' THEN 'Perubahan Akta'
        WHEN product ILIKE '%virtual-office%' THEN 'Virtual Office'
        WHEN product ILIKE '%press-release%' OR product ILIKE '%pr-media%' THEN 'Press Release Media'
        WHEN product ILIKE '%kontrak%' THEN 'Kontrak Bisnis'

        -- 4. Kampanye Iklan, Sosmed & Tools
        WHEN product ILIKE '%konsultasi-ig%' OR product ILIKE '%threads%' OR product ILIKE '%tiktok%' THEN 'Link Bio & Media Sosial'
        WHEN product ILIKE '%metaads%' OR product ILIKE '%-gads%' OR product ILIKE '%home-gads%' THEN 'Landing Page Iklan'
        WHEN product ILIKE '%cek-nama%' OR product ILIKE '%cek-kbli%' THEN 'Fitur Cek Nama & KBLI'
        WHEN product ILIKE '%kontak%' OR product ILIKE '%tentang-kami%' OR product ILIKE '%testimoni%' OR product ILIKE '%kerjasama%' OR product ILIKE '%referral%' THEN 'Profil & Kemitraan'
        WHEN product = '' OR product = '/' OR product ILIKE '%beranda%' OR product ILIKE '%home%' THEN 'Beranda (Home)'
        WHEN product ILIKE '%artikel%' THEN 'Artikel Edukasi'
        ELSE 'Layanan Lainnya'
      END as service_name,
      COUNT(*)::bigint as leads
     FROM "WhatsAppClick"
     ${breakdownWhereSql}
     GROUP BY service_name
     ORDER BY leads DESC
     LIMIT 25`,
  );
  const totalServiceLeads = serviceRows.reduce((acc, r) => acc + Number(r.leads || 0), 0);
  const services: AnalyticsDetailServiceItem[] = serviceRows.map((r) => {
    const leads = Number(r.leads || 0);
    return {
      serviceName: String(r.service_name || "Lainnya"),
      leads,
      percentage: totalServiceLeads > 0 ? Math.round((leads / totalServiceLeads) * 1000) / 10 : 0,
    };
  });

  // 5. CS WhatsApp Numbers Distribution
  const csConditionSql = breakdownConditions.length
    ? `WHERE ${breakdownConditions.map((c) => c.replace(/"([^"]+)"/g, 'c."$1"')).join(" AND ")}`
    : "";
  const csRows = await prisma.$queryRawUnsafe<any[]>(
    `SELECT
      c."numberId",
      n."number",
      COALESCE(n."label", n."number", c."numberId") as label,
      COUNT(*)::bigint as leads
     FROM "WhatsAppClick" c
     LEFT JOIN "WhatsAppNumber" n ON c."numberId" = n."id"
     ${csConditionSql}
     GROUP BY c."numberId", n."number", n."label"
     ORDER BY leads DESC`,
    ...breakdownParams,
  );
  const totalCsLeads = csRows.reduce((acc, r) => acc + Number(r.leads || 0), 0);
  const csNumbers: AnalyticsDetailCsItem[] = csRows.map((r) => {
    const leads = Number(r.leads || 0);
    return {
      numberId: String(r.numberId || ""),
      number: String(r.number || "-"),
      label: String(r.label || r.number || "Admin CS"),
      leads,
      percentage: totalCsLeads > 0 ? Math.round((leads / totalCsLeads) * 1000) / 10 : 0,
    };
  });

  // 6. All Pages (up to 500 pages)
  const allPageRows = await prisma.$queryRawUnsafe<any[]>(
    `SELECT
      COALESCE(NULLIF("product", ''), '/ (Beranda)') as path,
      COALESCE(NULLIF("domain", ''), 'easylegal.id') as domain,
      COUNT(*)::bigint as total_leads,
      MODE() WITHIN GROUP (ORDER BY "sourceCode") as top_source_code,
      COUNT(*) FILTER (WHERE "createdAt" + interval '7 hours' >= CURRENT_DATE)::bigint as today_leads
     FROM "WhatsAppClick"
     ${breakdownWhereSql}
     GROUP BY path, domain
     ORDER BY total_leads DESC
     LIMIT 500`,
    ...breakdownParams,
  );
  const totalOrganicLeads = allPageRows.reduce((acc, r) => acc + Number(r.total_leads || 0), 0);
  const allPages: AnalyticsTopPageItem[] = allPageRows.map((r) => {
    const totalLeads = Number(r.total_leads || 0);
    const sourceCode = String(r.top_source_code || "unknown").toLowerCase();
    const topSource = SOURCE_CODE_LABELS[sourceCode] || sourceCode;
    const todayLeads = Number(r.today_leads || 0);
    return {
      path: r.path,
      domain: r.domain,
      totalLeads,
      sharePercent: calculateSharePercent(totalLeads, totalOrganicLeads),
      topSource,
      todayLeads,
    };
  });

  return {
    hourly,
    dayOfWeek,
    trend,
    services,
    csNumbers,
    allPages,
  };
}
