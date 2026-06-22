import { Suspense } from "react";
import HomePage from "@/components/home/HomePage";
import HomePageSkeleton from "@/components/home/HomePageSkeleton";
import { LatestInsightsServer } from "@/components/home/LatestInsightsServer";
import {
  getLocalBusinessJsonLd,
  getWebsiteJsonLd,
} from "@/lib/structured-data";

async function HomeWithData() {
  const articles = await LatestInsightsServer();
  return <HomePage articles={articles} />;
}

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
      <Suspense fallback={<HomePageSkeleton />}>
        <HomeWithData />
      </Suspense>
    </>
  );
}
