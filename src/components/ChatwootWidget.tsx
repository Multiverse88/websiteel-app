"use client";

import Script from "next/script";

export default function ChatwootWidget() {
  return (
    <Script
      src="https://chatwoot.easylegal.my.id/packs/js/sdk.js"
      strategy="lazyOnload"
      onLoad={() => {
        // @ts-expect-error chatwootSDK global
        window?.chatwootSDK?.run({
          websiteToken: "JSCtebHsqNj2LNdFf4kxAXcK",
          baseUrl: "https://chatwoot.easylegal.my.id",
        });
      }}
    />
  );
}
