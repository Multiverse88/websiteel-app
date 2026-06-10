"use client";

import React from "react";
import Image from "next/image";

const FALLBACK = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fit=crop&w=800&h=500&q=80";

export default function ArticleImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover"
    />
  );
}
