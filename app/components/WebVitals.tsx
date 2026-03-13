"use client";

/**
 * @satisfies CAF-01-01-AC-01 Landing page loads in under 2 seconds on mobile 3G
 *
 * Reports Core Web Vitals (LCP, FID, CLS, FCP, TTFB) to the console in
 * development and to an analytics endpoint in production.
 *
 * To wire up a real analytics service (e.g. Firebase Analytics, Vercel
 * Analytics), replace the console.log below with the relevant send call.
 */
import { useReportWebVitals } from "next/web-vitals";

export default function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[WebVitals] ${metric.name}`, metric);
    }
    // TODO: forward to analytics in production
    // e.g. logEvent(analytics, metric.name, { value: metric.value });
  });

  return null;
}
