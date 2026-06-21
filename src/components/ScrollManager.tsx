"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";


export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Find the closest anchor tag
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (!anchor) return;

      // Ensure the link is internal to our site
      if (anchor.host !== window.location.host) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Skip non-HTTP links like tel:, mailto:, javascript:
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
        return;
      }

      const currentPath = window.location.pathname;
      
      // Target path info
      let targetPath = anchor.pathname;
      // Normalize trailing slash if any
      if (targetPath.length > 1 && targetPath.endsWith("/")) {
        targetPath = targetPath.slice(0, -1);
      }
      
      let normalizedCurrentPath = currentPath;
      if (normalizedCurrentPath.length > 1 && normalizedCurrentPath.endsWith("/")) {
        normalizedCurrentPath = normalizedCurrentPath.slice(0, -1);
      }

      // Normalize home paths (functional equivalence for homepage)
      const isCurrentHome = normalizedCurrentPath === "" || normalizedCurrentPath === "/" || normalizedCurrentPath === "/home-gads";
      const isTargetHome = targetPath === "" || targetPath === "/" || targetPath === "/home-gads";

      const isSamePage = (isCurrentHome && isTargetHome) || (normalizedCurrentPath === targetPath);

      // Case 1: Clicking a link that goes to the current page itself without hash (e.g. Logo or active page in Navbar)
      if (isSamePage && !anchor.hash) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      // Case 2: In-page hash link clicks (e.g. href="#paket-harga" or href="/layanan/virtual-office#paket-harga" on current page)
      if (anchor.hash && isSamePage) {
        const hash = anchor.hash.substring(1);
        const targetEl = document.getElementById(hash);
        if (targetEl) {
          e.preventDefault();
          
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - 88;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Update URL hash without browser jump
          window.history.pushState(null, "", `#${hash}`);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [pathname]);

  // Handle scrolling when page loads or when pathname changes with a hash in URL
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashScroll = () => {
      const hash = window.location.hash.substring(1);
      if (!hash) return;

      const targetEl = document.getElementById(hash);
      if (targetEl) {
        // Jeda singkat untuk memastikan proses rendering Next.js & hidrasi DOM selesai
        const timer = setTimeout(() => {
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - 88;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 150);
        return () => clearTimeout(timer);
      }
    };

    // Jalankan pada load awal dan route changes
    handleHashScroll();
    
    // Dengarkan event hashchange untuk hash manual pada halaman yang sama
    window.addEventListener("hashchange", handleHashScroll);
    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, [pathname]);

  return null;
}
