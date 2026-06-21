import * as Sentry from "@sentry/nextjs";

export function trackMetric(name: string, value: number = 1, attributes?: Record<string, string>) {
  try {
    if (process.env.NODE_ENV !== "production") return;
    Sentry.metrics.count(name, value, { attributes });
  } catch {}
}

export function trackDistribution(name: string, value: number, attributes?: Record<string, string>) {
  try {
    if (process.env.NODE_ENV !== "production") return;
    Sentry.metrics.distribution(name, value, { attributes });
  } catch {}
}
