import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, LocateFixed, MessageCircle, Minus, Send } from "lucide-react";

export type AICompanionGuidance = {
  targetId: string;
  label: string;
  message: string;
  severity: "suggestion" | "warning" | "critical";
};

type Position = { left: number; top: number };

const DOCK_WIDTH = 420;
const COMPANION_IMAGE = `${import.meta.env.BASE_URL}ai/el-companion.png`;

function dockPosition(): Position {
  if (typeof window === "undefined") return { left: 24, top: 100 };
  return {
    left: Math.max(12, window.innerWidth - DOCK_WIDTH - 24),
    top: Math.max(72, window.innerHeight - 405),
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
  const [isMinimized, setIsMinimized] = useState(false);
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

      const maxLeft = Math.max(12, window.innerWidth - DOCK_WIDTH - 12);
      const maxTop = Math.max(72, window.innerHeight - 400);
      setIsWalking(true);
      setPosition({
        left: Math.min(Math.max(12, rect.right + 14), maxLeft),
        top: Math.min(Math.max(72, rect.top - 80), maxTop),
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
    : activeItem?.message || "Halo! Saya EL. Mulai tulis artikel dan saya akan menunjukkan bagian yang bisa diperkuat.";

  if (isMinimized) {
    return (
      <button
        type="button"
        onClick={() => setIsMinimized(false)}
        className="fixed right-5 bottom-5 z-[45] group flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#900000] to-[#D20B18] pl-2 pr-4 py-2 text-white shadow-[0_16px_38px_rgba(153,2,2,.32)] hover:-translate-y-1 transition-transform"
        aria-label="Buka AI Companion"
      >
        <span className="w-11 h-11 rounded-full bg-white border-2 border-white overflow-hidden flex items-center justify-center">
          <img src={COMPANION_IMAGE} alt="" className="w-[54px] h-[54px] object-contain object-top scale-[1.55] translate-y-2" />
        </span>
        <span className="text-[14px] font-extrabold">Tanya EL</span>
        {items.length > 0 && <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white text-[#990202] text-[11px] font-black flex items-center justify-center border border-red-100">{items.length}</span>}
      </button>
    );
  }

  return (
    <>
      <aside
        className={`ai-companion-guide fixed z-[45] flex items-end pointer-events-none ${isWalking ? "is-walking" : ""}`}
        style={{ left: position.left, top: position.top }}
        aria-live="polite"
      >
        <section className="ai-chat-panel pointer-events-auto flex-1 min-w-0 bg-white rounded-[22px] border border-gray-200 shadow-[0_24px_60px_rgba(33,0,0,.2)] overflow-hidden">
          <header className="h-[78px] px-4 flex items-center gap-3 bg-gradient-to-br from-[#920000] via-[#B70710] to-[#D31520] text-white">
            <span className="relative w-12 h-12 rounded-full bg-white border-[3px] border-white/80 overflow-hidden flex-shrink-0 shadow-inner">
              <img src={COMPANION_IMAGE} alt="EL" className="w-[58px] h-[58px] object-contain object-top scale-[1.5] translate-y-2" />
            </span>
            <span className="min-w-0 flex-1">
              <strong className="block text-[16px] font-extrabold leading-tight">EL Assistant</strong>
              <span className="mt-1 flex items-center gap-1.5 text-[12px] text-white/85">
                <i className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,.17)]" />
                {isThinking ? "Sedang membaca..." : "Online · memantau otomatis"}
              </span>
            </span>
            <button type="button" onClick={() => setIsMinimized(true)} className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10" aria-label="Minimalkan AI Companion">
              <Minus size={18} />
            </button>
          </header>

          <div className="px-3.5 py-4 bg-[#FCFCFD] min-h-[170px] max-h-[240px] overflow-y-auto">
            <div className="flex items-start gap-2.5">
              <span className="w-9 h-9 rounded-full bg-white border border-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                <img src={COMPANION_IMAGE} alt="" className="w-11 h-11 object-contain object-top scale-[1.55] translate-y-1.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="rounded-2xl rounded-tl-md bg-[#F0F1F3] px-3.5 py-3 text-[13px] leading-relaxed font-medium text-gray-750">
                  {message}
                </div>
                {activeItem && !isThinking && (
                  <span className={`inline-flex mt-2 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${activeItem.severity === "critical" ? "bg-red-100 text-red-700" : activeItem.severity === "warning" ? "bg-amber-100 text-amber-700" : "bg-blue-50 text-blue-700"}`}>
                    {activeItem.label}
                  </span>
                )}
              </div>
            </div>

            {activeItem && !isThinking && (
              <button type="button" onClick={() => walkToTarget(activeItem.targetId, true)} className="ml-[46px] mt-3 w-[calc(100%-46px)] rounded-full border border-[#C80B14] px-3 py-2 text-[12px] font-extrabold text-[#B2070F] hover:bg-red-50 active:scale-[0.98] transition">
                Tunjukkan letak perbaikannya
              </button>
            )}
          </div>

          <div className="px-3.5 py-3 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-2">
              <div className="h-10 min-w-0 flex-1 rounded-full bg-gray-50 border border-gray-200 px-3.5 flex items-center gap-2 text-[11px] font-medium text-gray-400">
                <MessageCircle size={15} />
                <span className="truncate">AI memantau tulisan Anda...</span>
              </div>
              <button type="button" onClick={() => activeItem && walkToTarget(activeItem.targetId, true)} disabled={!activeItem || isThinking} className="w-10 h-10 rounded-full bg-[#C70712] text-white flex items-center justify-center hover:bg-[#990202] disabled:opacity-40" aria-label="Tunjukkan saran aktif">
                {isThinking ? <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" /> : <Send size={16} />}
              </button>
            </div>
            {activeItem && !isThinking && (
              <div className="mt-2.5 flex items-center justify-center gap-2">
                <button type="button" onClick={() => changeItem(-1)} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#990202]" aria-label="Saran sebelumnya"><ChevronLeft size={15} /></button>
                <span className="text-[11px] font-bold text-gray-400">Saran {activeIndex + 1} dari {items.length}</span>
                <button type="button" onClick={() => changeItem(1)} className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#990202]" aria-label="Saran berikutnya"><ChevronRight size={15} /></button>
              </div>
            )}
          </div>
        </section>

        <div className="el-mascot relative w-[126px] h-[190px] -ml-4 flex-shrink-0" aria-hidden="true">
          <img src={COMPANION_IMAGE} alt="" className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-[0_14px_16px_rgba(40,0,0,.24)]" />
          <span className="absolute left-1 top-[78px] w-3 h-1.5 rounded-full bg-[#D20B18] rotate-[-16deg]" />
          <span className="absolute left-0 top-[65px] w-2 h-1.5 rounded-full bg-[#D20B18] rotate-[12deg]" />
        </div>
      </aside>

      <style>{`
        .ai-companion-guide {
          width: min(${DOCK_WIDTH}px, calc(100vw - 24px));
          transition: left 900ms cubic-bezier(.22,.9,.26,1), top 900ms cubic-bezier(.22,.9,.26,1);
        }
        .ai-companion-guide.is-walking .el-mascot {
          animation: el-walk 280ms ease-in-out infinite alternate;
        }
        .ai-companion-guide:not(.is-walking) .el-mascot {
          animation: el-idle 2.4s ease-in-out infinite;
        }
        .ai-companion-target {
          outline: 3px solid rgba(153, 2, 2, .4) !important;
          outline-offset: 4px !important;
          box-shadow: 0 0 0 10px rgba(153, 2, 2, .08) !important;
          transition: outline-color 220ms ease, box-shadow 220ms ease !important;
        }
        @keyframes el-walk {
          from { transform: translateY(1px) rotate(-2deg); }
          to { transform: translateY(-5px) rotate(2deg); }
        }
        @keyframes el-idle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @media (max-width: 639px) {
          .ai-companion-guide { width: calc(100vw - 24px); }
          .ai-chat-panel { width: 100%; }
          .el-mascot { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ai-companion-guide { transition-duration: 1ms; }
          .ai-companion-guide * { animation: none !important; }
        }
      `}</style>
    </>
  );
}
