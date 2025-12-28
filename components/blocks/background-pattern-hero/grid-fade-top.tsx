"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { PatternBackground } from "../../ui/pattern-background";

export interface GridFadeTopProps {
  className?: string;
  children?: React.ReactNode;
  patternOpacity?: number;
}

export function GridFadeTop({
  className,
  children,
  patternOpacity = 1,
}: GridFadeTopProps) {
  return (
    <section className={cn("relative min-h-screen w-full", className)}>
      <PatternBackground pattern="gridFadeTop" opacity={patternOpacity} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
