# Design Spec: Animation Performance Strategy

**Date:** 2026-06-21
**Status:** Approved

## Overview
Add performant animations to EasyLegal website using a hybrid approach: expressive GSAP animations on the homepage (most important landing page), lightweight CSS/View Transitions everywhere else.

## Architecture & Package Setup

### Dependencies to Install
1. `next-view-transitions` — Native page transitions via CSS View Transition API. ~1KB.
2. `gsap` + `@gsap/react` — Expressive timeline/scroll animations for homepage only.

### Bundle Strategy
- **Homepage (`/`):** Loads GSAP via dynamic imports or tree-shaking. Zero GSAP code on other routes.
- **Other Pages (`/artikel/*`, `/layanan/*`, `/dashboard/*`, etc.):** No GSAP. Use CSS-only animations + `next-view-transitions`.

## Section 1: Home Page Animations (Interactive)

### Hero Intro Sequence
- GSAP timeline on mount.
- Staggered entry: Badge → Heading → Subtitle → CTA Buttons → Hero Image.
- Animation: `y: 30 → 0`, `opacity: 0 → 1`, duration ~0.8s, `ease: "power3.out"`.

### Scroll Reveals (Homepage Sections)
- Use `gsap.context()` + `ScrollTrigger` for complex sections:
  - **Layanan Kami:** Cards stagger fade-up.
  - **Testimonials:** Slide-in from sides.
  - **Cara Kerja:** Dashboard image transitions on step change.
- Cleanup: `ctx.revert()` on unmount.

### Cara Kerja Step Transitions
- GSAP timeline for active step change.
- Previous content fades out + slides left; new content slides in from right.
- Duration: 0.45s, `ease: "power2.inOut"`.

## Section 2: Page Transitions (Global)

### Implementation
- Wrap root layout with `<ViewTransitions>` from `next-view-transitions`.
- Enables cross-document view transitions on route change.
- No JS bundle cost beyond the tiny wrapper.

### Fallback
- Browsers without View Transition API gracefully degrade to instant navigation.

## Section 3: Global Lightweight Animations

### ScrollReveal Component
```tsx
// src/components/ui/ScrollReveal.tsx
"use client";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export function ScrollReveal({ children, className = "", delay = 0 }) {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref, { rootMargin: "-50px" });
  
  return (
    <div
      ref={ref}
      className={`animate-scroll-reveal ${isVisible ? "revealed" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
```

### Hook: `useIntersectionObserver`
- Single `IntersectionObserver` instance per component (or shared context).
- Triggers `.revealed` class on element.
- Uses existing CSS keyframes in `globals.css` (`.animate-scroll-reveal`, `.animate-scroll-reveal-fade`).

### Micro-interactions
- Pure Tailwind CSS:
  - Buttons: `hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150`
  - Cards: `hover:shadow-lg hover:-translate-y-1 transition-all duration-300`
  - Links: `hover:text-primary transition-colors`
- All use `transform` / `opacity` — GPU accelerated, no layout thrashing.

## Performance Rules

| Rule | Implementation |
|------|----------------|
| Animate only `transform`, `opacity`, `filter` | All CSS keyframes & Tailwind transitions use these properties. |
| `will-change` sparingly | Apply only to elements actively animating (e.g., hero image). |
| `prefers-reduced-motion` | Already in `globals.css` — disables all animations for sensitive users. |
| IntersectionObserver over scroll listeners | `useIntersectionObserver` hook avoids main-thread scroll events. |
| GSAP scoped via `gsap.context()` | Auto cleanup, prevents memory leaks. |

## File Structure Changes

```
/src
├── app/
│   └── layout.tsx           # Add <ViewTransitions> wrapper
├── components/
│   ├── home/
│   │   ├── Hero.tsx         # GSAP intro timeline
│   │   └── CaraKerjaSection.tsx  # GSAP step transitions
│   └── ui/
│       └── ScrollReveal.tsx # Reusable scroll reveal component
├── hooks/
│   └── useIntersectionObserver.ts
└── globals.css              # Existing animations (keep), add reduced-motion if missing
```

## Testing & Verification

1. **Bundle Analysis:** `npm run build && npx @next/bundle-analyzer` → Verify GSAP only in homepage chunk.
2. **Lighthouse:** Performance score ≥ 90 on mobile.
3. **Manual QA:** Homepage loads smoothly; page transitions visible; scroll reveals trigger correctly; reduced-motion works.