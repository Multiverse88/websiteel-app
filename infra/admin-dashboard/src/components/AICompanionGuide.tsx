import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, LocateFixed, Sparkles } from "lucide-react";

export type AICompanionGuidance = {
  targetId: string;
  label: string;
  message: string;
  severity: "suggestion" | "warning" | "critical";
};

type Position = { left: number; top: number };

const DOCK_WIDTH = 336;

function dockPosition(): Position {
  if (typeof window === "undefined") return { left: 24, top: 120 };
  return {
    left: Math.max(12, window.innerWidth - DOCK_WIDTH - 24),
    top: Math.max(100, window.innerHeight - 210),
  };
}

export default function AICompanionGuide({
  items,
  isThinking,
}: {
  items: AICompanionGuidance[];
  isThinking: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState<Position>(dockPosition);
  const [isWalking, setIsWalking] = useState(false);
  const walkTimerRef = useRef<number | null>(null);
  const activeItem = items[activeIndex] || null;
  const itemsKey = useMemo(() => items.map((item) => `${item.targetId}:${item.message}`).join("|"), [items]);

  const clearTargetHighlight = useCallback(() => {
    document.querySelectorAll(".ai-companion-target").forEach((element) => {
      element.classList.remove("ai-companion-target");
    });
  }, []);

  const walkToTarget = useCallback((targetId?: string, scrollIntoView = false) => {
    clearTargetHighlight();

    if (!targetId) {
      setPosition(dockPosition());
      return;
    }

    const target = document.getElementById(targetId);
    if (!target) {
      setPosition(dockPosition());
      return;
    }

    if (scrollIntoView) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const placeCompanion = () => {
      const rect = target.getBoundingClientRect();
      const isVisible = rect.bottom > 80 && rect.top < window.innerHeight - 60;

      if (!isVisible && !scrollIntoView) {
        setPosition(dockPosition());
        return;
      }

      const desiredLeft = rect.right + 16;
      const desiredTop = rect.top + Math.min(rect.height / 2, 90) - 75;
      setIsWalking(true);
      setPosition({
        left: Math.min(Math.max(12, desiredLeft), Math.max(12, window.innerWidth - DOCK_WIDTH - 12)),
        top: Math.min(Math.max(84, desiredTop), Math.max(84, window.innerHeight - 220)),
      });
      target.classList.add("ai-companion-target");

      if (walkTimerRef.current) window.clearTimeout(walkTimerRef.current);
      walkTimerRef.current = window.setTimeout(() => setIsWalking(false), 950);
    };

    window.setTimeout(placeCompanion, scrollIntoView ? 520 : 20);
  }, [clearTargetHighlight]);

  useEffect(() => {
    setActiveIndex(0);
  }, [itemsKey]);

  useEffect(() => {
    walkToTarget(activeItem?.targetId);
  }, [activeIndex, activeItem?.targetId, itemsKey, walkToTarget]);

  useEffect(() => {
    const handleResize = () => walkToTarget(activeItem?.targetId);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeItem?.targetId, walkToTarget]);

  useEffect(() => () => {
    clearTargetHighlight();
    if (walkTimerRef.current) window.clearTimeout(walkTimerRef.current);
  }, [clearTargetHighlight]);

  const changeItem = (direction: number) => {
    if (items.length < 2) return;
    setActiveIndex((current) => (current + direction + items.length) % items.length);
  };

  const message = isThinking
    ? "Sebentar, saya sedang membaca perubahan terbaru Anda."
    : activeItem?.message || "Mulai tulis judul dan isi artikel. Saya akan menemani dan menunjukkan bagian yang bisa diperkuat.";

  return (
    <>
      <aside
        className={`ai-companion-guide fixed z-[45] flex items-end gap-2 pointer-events-none ${isWalking ? "is-walking" : ""}`}
        style={{ left: position.left, top: position.top }}
        aria-live="polite"
      >
        <div className="ai-companion-bubble pointer-events-auto flex-1 min-w-0 bg-white border border-red-100 rounded-2xl rounded-br-md shadow-[0_18px_45px_rgba(80,0,0,0.16)] overflow-hidden">
          <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 bg-red-50/70 border-b border-red-100">
            <span className="flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#990202]">
              <Sparkles size={13} /> AI Companion
            </span>
            {activeItem && (
              <span className="text-[11px] font-bold text-gray-500 truncate">{activeItem.label}</span>
            )}
          </div>
          <p className="px-3.5 pt-3 text-[13px] leading-relaxed font-medium text-gray-700">{message}</p>
          {activeItem && !isThinking && (
            <div className="flex items-center justify-between gap-2 px-3 py-2.5 mt-2 border-t border-gray-100">
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => changeItem(-1)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#990202] hover:border-red-200" aria-label="Saran sebelumnya">
                  <ChevronLeft size={15} />
                </button>
                <span className="min-w-10 text-center text-[11px] font-bold text-gray-400">{activeIndex + 1}/{items.length}</span>
                <button type="button" onClick={() => changeItem(1)} className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#990202] hover:border-red-200" aria-label="Saran berikutnya">
                  <ChevronRight size={15} />
                </button>
              </div>
              <button type="button" onClick={() => walkToTarget(activeItem.targetId, true)} className="h-7 px-2.5 rounded-lg bg-[#990202] text-white text-[11px] font-extrabold flex items-center gap-1.5 hover:bg-[#7a0101] active:scale-[0.98]">
                <LocateFixed size={13} /> Tunjukkan
              </button>
            </div>
          )}
        </div>

        <div className="ai-character relative w-[72px] h-[112px] flex-shrink-0" aria-hidden="true">
          <span className="ai-antenna absolute left-[35px] top-0 w-[3px] h-[13px] bg-[#990202] rounded-full" />
          <span className="absolute left-[31px] top-0 w-[11px] h-[11px] bg-[#D62828] border-[3px] border-white rounded-full shadow-sm" />
          <div className="ai-head absolute left-[15px] top-[10px] w-[45px] h-[39px] bg-white border-[3px] border-[#990202] rounded-[18px] shadow-sm">
            <span className="absolute left-[10px] top-[13px] w-[6px] h-[8px] bg-gray-900 rounded-full" />
            <span className="absolute right-[10px] top-[13px] w-[6px] h-[8px] bg-gray-900 rounded-full" />
            <span className="absolute left-[18px] bottom-[6px] w-[9px] h-[4px] border-b-2 border-[#990202] rounded-full" />
          </div>
          <div className="absolute left-[19px] top-[49px] w-[38px] h-[42px] bg-[#990202] rounded-[12px] border-[3px] border-white shadow-md">
            <span className="absolute left-[14px] top-[5px] w-[5px] h-[22px] bg-white rounded-b-full" />
            <span className="absolute left-[12px] top-[5px] w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#D62828]" />
          </div>
          <span className="ai-pointing-arm absolute left-[2px] top-[56px] w-[27px] h-[7px] bg-[#990202] rounded-full origin-right" />
          <span className="absolute left-0 top-[53px] w-[9px] h-[9px] bg-white border-2 border-[#990202] rounded-full" />
          <span className="ai-leg ai-leg-left absolute left-[24px] top-[88px] w-[7px] h-[21px] bg-gray-800 rounded-full origin-top" />
          <span className="ai-leg ai-leg-right absolute left-[45px] top-[88px] w-[7px] h-[21px] bg-gray-800 rounded-full origin-top" />
        </div>
      </aside>

      <style>{`
        .ai-companion-guide {
          width: min(${DOCK_WIDTH}px, calc(100vw - 24px));
          transition: left 900ms cubic-bezier(.22,.9,.26,1), top 900ms cubic-bezier(.22,.9,.26,1);
        }
        .ai-companion-guide.is-walking .ai-head { animation: ai-head-bob 280ms ease-in-out infinite alternate; }
        .ai-companion-guide.is-walking .ai-leg-left { animation: ai-walk-left 260ms ease-in-out infinite alternate; }
        .ai-companion-guide.is-walking .ai-leg-right { animation: ai-walk-right 260ms ease-in-out infinite alternate; }
        .ai-companion-guide:not(.is-walking) .ai-antenna { animation: ai-antenna 1.8s ease-in-out infinite; }
        .ai-companion-target {
          outline: 3px solid rgba(153, 2, 2, .36) !important;
          outline-offset: 4px !important;
          box-shadow: 0 0 0 9px rgba(153, 2, 2, .08) !important;
          transition: outline-color 220ms ease, box-shadow 220ms ease !important;
        }
        @keyframes ai-walk-left { from { transform: rotate(18deg); } to { transform: rotate(-20deg); } }
        @keyframes ai-walk-right { from { transform: rotate(-20deg); } to { transform: rotate(18deg); } }
        @keyframes ai-head-bob { from { transform: translateY(0); } to { transform: translateY(-3px); } }
        @keyframes ai-antenna { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(7deg); } }
        @media (prefers-reduced-motion: reduce) {
          .ai-companion-guide { transition-duration: 1ms; }
          .ai-companion-guide * { animation: none !important; }
        }
      `}</style>
    </>
  );
}
