"use client";

import React, { useEffect, useRef, useState } from "react";


interface Heading {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const initializedRef = useRef(false);

  useEffect(() => {
    if (headings.length === 0) return;

    if (!initializedRef.current) {
      initializedRef.current = true;
      setActiveId(headings[0].id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find intersecting headings
        const visibleHeadings = entries.filter((entry) => entry.isIntersecting);
        if (visibleHeadings.length > 0) {
          // Set active to the first visible heading in view
          setActiveId(visibleHeadings[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -70% 0px", // Trigger when heading is near the top
        threshold: 0.1,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => {
      headings.forEach((heading) => {
        const el = document.getElementById(heading.id);
        if (el) observer.unobserve(el);
      });
    };
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - 88;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
      // Update URL hash without causing page jump
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="bg-[#FAFAFA] border border-gray-200/65 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.01)]">
      <div className="flex items-center gap-2 mb-4 text-[11px] font-black uppercase text-gray-400 tracking-wider">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        <span>Daftar Isi</span>
      </div>

      <nav className="flex flex-col space-y-1">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          
          // Determine if it is a sub-heading to indent it
          // Indent if text has standard indicator (e.g. em-dash, starts with sub-numbers or ISO names)
          const isSubheading =
            heading.text.includes("—") || 
            heading.text.startsWith("ISO ") || 
            heading.text.startsWith("1. ") ||
            heading.text.startsWith("2. ") ||
            heading.text.startsWith("3. ") ||
            heading.text.startsWith("4. ") ||
            heading.text.startsWith("5. ");

          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`transition-all duration-200 text-[13.5px] py-1.5 px-3 rounded-lg flex items-center leading-snug border-l-2 ${
                isSubheading ? "ml-4 pl-3" : ""
              } ${
                isActive
                  ? "bg-white text-[#990202] border-[#990202] font-bold shadow-sm"
                  : "text-gray-500 hover:text-[#990202] border-transparent font-medium"
              }`}
            >
              <span className="truncate">{heading.text}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
