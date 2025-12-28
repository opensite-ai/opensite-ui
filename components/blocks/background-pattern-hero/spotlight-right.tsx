"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { PatternBackground } from "../../ui/pattern-background";

export interface SpotlightRightProps {
  className?: string;
  children?: React.ReactNode;
  patternOpacity?: number;
}

export function SpotlightRight({
  className,
  children,
  patternOpacity = 1,
}: SpotlightRightProps) {
  return (
    <section className={cn("relative flex min-h-screen w-full items-center justify-center overflow-hidden", className)}>
      <PatternBackground pattern="spotlightRight" opacity={patternOpacity} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
