"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function ChatwootWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Hanya muat Chatwoot setelah ada interaksi (scroll/click/mousemove) 
    // atau setelah 3 detik untuk mengurangi beban main thread saat awal load
    const handleInteraction = () => setShouldLoad(true);
    
    window.addEventListener("scroll", handleInteraction, { once: true, passive: true });
    window.addEventListener("mousemove", handleInteraction, { once: true, passive: true });
    window.addEventListener("touchstart", handleInteraction, { once: true, passive: true });
    
    const timeoutId = setTimeout(() => setShouldLoad(true), 3000);

    return () => {
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!shouldLoad) return null;

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
