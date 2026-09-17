import type { Metadata } from "next";
import Script from "next/script";
import ThankYouClient from "./ThankYouClient";

// Thank-you page for the /layanan-easylegal-metaads Meta Ads campaign — base
// URL preserved exactly as the original standalone Nuxt build (see
// LP-Layanan-EL/thankyoupage-konsultasi-jasa-penyesuaian-kbli-metaads).
// GTM (GTM-TVHZW45Q) is already loaded site-wide by the root layout, so it
// is intentionally NOT repeated here to avoid a duplicate container load.
export const metadata: Metadata = {
  title: "Terimakasih — EasyLegal",
  description:
    "PT Perorangan siap pakai — KBLI dipilihkan, NIB aktif, rekening bisnis langsung jalan. 12 jam selesai. DP 0%, bayar setelah dokumen terbit.",
  robots: { index: false, follow: false },
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

      {/* Meta (Facebook) Pixel — not loaded site-wide, only on this campaign's thank-you page. */}
      <Script id="meta-pixel-init" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){
            if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
            fbq('track', 'Lead');`}
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
      <noscript>
        <img
          height={1}
          width={1}
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=Lead&noscript=1`}
          alt=""
        />
      </noscript>

      <ThankYouClient />
    </>
  );
}
