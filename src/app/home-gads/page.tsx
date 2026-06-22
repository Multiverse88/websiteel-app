import { Suspense } from "react";
import HomePage from "@/components/home/HomePage";
import HomePageSkeleton from "@/components/home/HomePageSkeleton";
import { LatestInsightsServer } from "@/components/home/LatestInsightsServer";

async function HomeWithData() {
  const articles = await LatestInsightsServer();
  return <HomePage articles={articles} />;
}

export default function Page() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomeWithData />
    </Suspense>
  );
}
