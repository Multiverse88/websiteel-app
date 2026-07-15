import { Suspense } from "react";
import HomeGadsPage from "@/components/home/HomeGadsPage";
import HomePageSkeleton from "@/components/home/HomePageSkeleton";
import { LatestInsightsServer } from "@/components/home/LatestInsightsServer";
import {
  getLocalBusinessJsonLd,
  getWebsiteJsonLd,
  getOrganizationJsonLd,
} from "@/lib/structured-data";

async function HomeWithData() {
  const articles = await LatestInsightsServer();
  return <HomeGadsPage articles={articles} />;
}

export const revalidate = 300; // Revalidate every 5 minutes instead of on every request

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getLocalBusinessJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getWebsiteJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getOrganizationJsonLd()),
        }}
      />
      <Suspense fallback={<HomePageSkeleton />}>
        <HomeWithData />
      </Suspense>
    </>
  );
}
