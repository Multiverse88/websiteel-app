import PageWrapper from "@/components/home/PageWrapper";
import {
  getLocalBusinessJsonLd,
  getWebsiteJsonLd,
} from "@/lib/structured-data";

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
      <PageWrapper />
    </>
  );
}
