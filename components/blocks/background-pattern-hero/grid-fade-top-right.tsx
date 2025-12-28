"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { PatternBackground } from "../../ui/pattern-background";

export interface GridFadeTopRightProps {
  className?: string;
  children?: React.ReactNode;
  patternOpacity?: number;
}

export function GridFadeTopRight({
  className,
  children,
  patternOpacity = 1,
}: GridFadeTopRightProps) {
  return (
    <section className={cn("relative min-h-screen w-full", className)}>
      <PatternBackground pattern="gridFadeTopRight" opacity={patternOpacity} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
