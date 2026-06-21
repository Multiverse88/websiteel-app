# Design Spec: Website Performance Optimization (Lighthouse 90+ Target)

**Date:** 2026-06-21  
**Target:** Improve Homepage Lighthouse performance score from **52** to **90+** (LCP: 17.3s → < 2s).  
**Constraint:** No visual/design changes.

---

## 1. Current Bottlenecks & Analysis

1. **Large JS Bundle (537KB Chunk):**
   - GSAP, ScrollTrigger, ScrollToPlugin, Sentry, and Lucide React icons are bundled into a large monolithic entry chunk (`2m-vkfofc00l8.js`).
   - This blocks the main thread during hydration, delaying the Largest Contentful Paint (LCP) and causing high Time to Interactive.

2. **Eager GSAP & ScrollManager Execution:**
   - `ScrollManager.tsx` in the root layout eagerly loads GSAP on all routes.
   - Initial layout/renders are waiting for GSAP hydration, delaying the browser from painting the first frame.

3. **Multi-Font Overhead:**
   - Loading three separate google web fonts: `DM Sans`, `Plus Jakarta Sans`, and `Inter` via Next.js Google Fonts. Each font adds network requests and CSS layout evaluation.

4. **External Unoptimized Hero Images:**
   - Hero images are loaded from external URLs (Pexels, Unsplash) and wait for domain lookup / TCP handshakes.
   - First slide is marked as `priority`, but external network fetches drag down LCP.

5. **Sentry Client Bundle & Chatwoot Widget:**
   - Sentry adds initial bundle weight.
   - Chatwoot is loaded but user confirmed it is no longer used and can be deleted.

---

## 2. Proposed Design (Approach 1 - Aggressive & Clean)

### A. Remove Chatwoot Widget
- **Action:** Delete `src/components/ChatwootWidget.tsx` and references in `src/app/layout.tsx`.
- **Reason:** No longer used. Zero bytes shipped.

### B. Consolidate Fonts (3 → 1)
- **Action:** 
  - Standardize all styling on `DM Sans`.
  - Modify `src/app/layout.tsx` to remove `Plus_Jakarta_Sans` and `Inter` Google Fonts.
  - Modify `src/app/globals.css` to map all font vars to `DM Sans` / system fallback.
- **Reason:** Reduces HTTP requests and minimizes font layout shifts.

### C. Remove GSAP animations, replace with CSS Transitions & IntersectionObserver
- **Action:**
  - Standardize animations to use CSS `@keyframes` and tailwind utility classes.
  - Re-use the existing `.animate-scroll-reveal` logic (`IntersectionObserver` adding `.revealed`) for scroll-based reveals.
  - Keep GSAP *only* if required for complex custom transitions, otherwise transition `ScrollManager.tsx` to browser-native `scrollTo` with `behavior: 'smooth'`.
  - If we must keep `ScrollToPlugin`, load it dynamically.
- **Reason:** Significantly reduces JS bundle size (~500KB → <100KB) and removes CPU blocking work.

### D. Optimize Hero Images (Self-Host & Preload)
- **Action:**
  - Download current Pexels/Unsplash hero images into public directory.
  - Serve them locally using Next.js `Image` component.
  - Explicitly configure `priority` on the first slide image and add `<link rel="preload">` in the root layout header for that image if necessary.
- **Reason:** Eliminates external DNS/TCP connection latency on critical render path.

### E. Defer/Lazy-load Sentry Client
- **Action:** Configure Sentry client configuration to load asynchronously or dynamically hook into Sentry client-side.
- **Reason:** Keeps initial bundle size light.

---

## 3. Detailed File Implementation Plan

### 1. `src/app/layout.tsx`
- Remove `ChatwootWidget` import and usage.
- Remove `Plus_Jakarta_Sans` and `Inter` declarations.
- Update `html` class to use only `dmSans.variable` and fallback.

### 2. `src/app/globals.css`
- Point `--font-inter` and other theme font variables to `'DM Sans', system-ui, -apple-system, sans-serif`.
- Ensure CSS animation classes are defined (like `animate-fade-in-up`, etc.).

### 3. `src/components/home/HomePage.tsx`
- Refactor animations from `useGSAP` hooks to pure Tailwind transitions or class-toggled states via `IntersectionObserver`.
- Retain exact visuals: opacity shifts, translate values, and durations.

### 4. `src/components/ScrollManager.tsx`
- Rewrite hash/anchor scroll handling to use browser `window.scrollTo({ top, behavior: 'smooth' })`.
- Remove GSAP import.

### 5. `package.json`
- Uninstall `gsap` and `@gsap/react` if fully eliminated.
- Uninstall `framer-motion` (already verified not used).

---

## 4. Verification & Testing

- **Build Analysis:** Run `npm run build` and inspect chunk sizes. Verify no chunk exceeds 100KB.
- **Visual Parity:** Manual checks on desktop/mobile to confirm animations work identically to GSAP transitions.
- **Type-Check & Lint:** Run `npx tsc --noEmit` and `npm run lint` to ensure zero compilation regressions.
- **Smoke Tests:** Execute `npm test` (Playwright) to verify redirect rules, page loads, and basic user flows remain intact.
