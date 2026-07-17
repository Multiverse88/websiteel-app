import { useRef, MouseEvent, useCallback } from "react";

export function useDraggableScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const stop = useCallback(() => {
    drag.current.active = false;
    if (ref.current) {
      ref.current.style.cursor = "auto";
      ref.current.style.userSelect = "auto";
    }
  }, []);

  const onMouseDown = useCallback((e: MouseEvent<T>) => {
    if (!ref.current) return;
    drag.current = {
      active: true,
      startX: e.pageX - ref.current.offsetLeft,
      scrollLeft: ref.current.scrollLeft,
    };
    ref.current.style.cursor = "grabbing";
    ref.current.style.userSelect = "none";
  }, []);

  const onMouseMove = useCallback((e: MouseEvent<T>) => {
    if (!drag.current.active || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - drag.current.startX) * 2; // Scroll-fast multiplier
    ref.current.scrollLeft = drag.current.scrollLeft - walk;
  }, []);

  return {
    ref,
    onMouseDown,
    onMouseLeave: stop,
    onMouseUp: stop,
    onMouseMove,
  };
}
