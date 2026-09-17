import type { Metadata } from "next";
import Script from "next/script";
import LandingClient from "./LandingClient";

// Campaign landing page for Meta Ads — base URL preserved exactly as the
// original standalone Nuxt build (see LP-Layanan-EL/easylegal-nuxt).
// GTM (GTM-TVHZW45Q) is already loaded site-wide by the root layout, so it
// is intentionally NOT repeated here to avoid a duplicate container load.
export const metadata: Metadata = {
  title: "Jasa Legalitas Usaha All-In-One — EasyLegal",
  description:
    "PT Perorangan, Pendirian PT/CV, Pendaftaran Merek, Jasa NIB, sampai PT PMA. Ditangani Personal Legal Assistant bergelar Sarjana Hukum. Biaya transparan, mulai dari Rp499.000.",
  openGraph: {
    title: "Jasa Legalitas Usaha All-In-One — EasyLegal",
    description: "PT Perorangan, PT/CV, Merek, NIB, PT PMA. Biaya transparan, mulai dari Rp499.000. Konsultasi gratis.",
  },
};

const META_PIXEL_ID = "1596118281187567";

export default function Page() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />

      {/* Meta (Facebook) Pixel — not loaded site-wide, only on this campaign page. */}
      <Script id="meta-pixel-init" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        <img
          height={1}
          width={1}
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      <LandingClient />
    </>
  );
}
