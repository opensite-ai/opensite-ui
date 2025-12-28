"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { PatternBackground } from "../../ui/pattern-background";

export interface GradientGlowTopProps {
  className?: string;
  children?: React.ReactNode;
  patternOpacity?: number;
}

export function GradientGlowTop({
  className,
  children,
  patternOpacity = 1,
}: GradientGlowTopProps) {
  return (
    <section className={cn("relative flex min-h-screen w-full items-center justify-center overflow-hidden", className)}>
      <PatternBackground pattern="gradientGlowTop" opacity={patternOpacity} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
