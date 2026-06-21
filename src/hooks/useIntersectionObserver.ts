"use client";

import { useEffect, useState, RefObject } from "react";

export function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once visible, stop observing if we only want to trigger once
        observer.unobserve(element);
      }
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, options]);

  return isVisible;
}
