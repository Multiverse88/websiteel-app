import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { quickTools } from "./data";

export default function QuickTools() {
  return (
    <div className="relative z-20 -mt-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#EAEAEA] rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {quickTools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-start gap-5 p-8 transition-colors duration-300 hover:bg-neutral-50/40 border-b last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 border-[#F0F0F0]"
                >
                  <div className="w-12 h-12 rounded-[14px] bg-[#FFF5F5] text-[#8B1E1E] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <Icon className="w-5.5 h-5.5" strokeWidth={2} />
                  </div>
                  <div className="flex flex-col flex-grow min-w-0">
                    <span className="text-[10px] font-black text-[#9B1C1C] tracking-[0.1em] mb-1.5 uppercase block">
                      {tool.tag}
                    </span>
                    <h3 className="text-[15.5px] font-bold text-[#1A1A1A] group-hover:text-[#D62828] transition-colors leading-tight">
                      {tool.title}
                    </h3>
                    <p className="text-[13px] text-[#666666] leading-relaxed mt-2">
                      {tool.desc}
                    </p>
                    <div className="mt-4">
                      {tool.external ? (
                        <a
                          href={tool.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[13px] font-bold text-[#9B1C1C] hover:text-[#8B0000] space-x-1 group/link"
                        >
                          <span>{tool.cta}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" strokeWidth={2.5} />
                        </a>
                      ) : (
                        <Link
                          href={tool.href}
                          className="inline-flex items-center text-[13px] font-bold text-[#9B1C1C] hover:text-[#8B0000] space-x-1 group/link"
                        >
                          <span>{tool.cta}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" strokeWidth={2.5} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
