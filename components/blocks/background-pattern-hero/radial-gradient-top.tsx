"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { PatternBackground } from "../../ui/pattern-background";

export interface RadialGradientTopProps {
  className?: string;
  children?: React.ReactNode;
  patternOpacity?: number;
}

export function RadialGradientTop({
  className,
  children,
  patternOpacity = 1,
}: RadialGradientTopProps) {
  return (
    <section className={cn("relative min-h-screen w-full", className)}>
      <PatternBackground pattern="radialGradientTop" opacity={patternOpacity} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
