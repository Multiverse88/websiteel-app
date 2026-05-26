"use client";

import { useEffect } from "react";
import { incrementView } from "./actions";

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    incrementView(slug);
  }, [slug]);

  return null;
}
