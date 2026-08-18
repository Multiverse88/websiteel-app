import React from 'react';

export function posStyle(positions: Record<string, any> | undefined, element: string): React.CSSProperties {
  if (!positions?.[element]) return {};
  const p = positions[element];
  const s: React.CSSProperties = {};
  if (p.tx !== undefined || p.ty !== undefined) s.transform = `translate(${p.tx || 0}px, ${p.ty || 0}px)`;
  if (p.w) s.width = p.w;
  if (p.h) s.height = p.h;
  return s;
}

export function sectionScale(styles: Record<string, any> | undefined): number {
  const sh = styles?.sectionHeight ? parseInt(styles.sectionHeight) : 0;
  const oh = styles?.originalHeight ? parseInt(styles.originalHeight) : 0;
  if (sh && oh && sh !== oh) return sh / oh;
  return 1;
}
