"use client";

import React from "react";

const FALLBACK = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fit=crop&w=800&h=500&q=80";

export default function ArticleImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={(e) => {
        e.currentTarget.src = FALLBACK;
      }}
    />
  );
}
