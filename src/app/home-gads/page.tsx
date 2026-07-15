import { Suspense } from "react";
import HomeGadsPage from "@/components/home/HomeGadsPage";
import HomePageSkeleton from "@/components/home/HomePageSkeleton";
import { LatestInsightsServer } from "@/components/home/LatestInsightsServer";

async function HomeWithData() {
  const articles = await LatestInsightsServer();
  return <HomeGadsPage articles={articles} />;
}

export default function Page() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomeWithData />
    </Suspense>
  );
}
