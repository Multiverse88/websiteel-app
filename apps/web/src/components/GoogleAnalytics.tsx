import Script from "next/script";

// GA4 Measurement ID for this property. Installed manually per Google's
// own "Install manually" instructions (gtag.js), separate from the GTM
// container in GoogleTagManager.tsx — this is its own direct tag, not
// something configured inside GTM.
const GA_MEASUREMENT_ID = "G-02KE12HWY1";

export function GoogleAnalytics() {
  return (
    <>
      <Script
        id="ga4-gtag-src"
        strategy="beforeInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="ga4-gtag-init" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
    </>
  );
}
