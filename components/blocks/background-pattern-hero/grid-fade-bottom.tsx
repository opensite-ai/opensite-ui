"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { PatternBackground } from "../../ui/pattern-background";

export interface GridFadeBottomProps {
  className?: string;
  children?: React.ReactNode;
  patternOpacity?: number;
}

export function GridFadeBottom({
  className,
  children,
  patternOpacity = 1,
}: GridFadeBottomProps) {
  return (
    <section className={cn("relative flex min-h-screen w-full items-center justify-center", className)}>
      <PatternBackground pattern="gridFadeBottom" opacity={patternOpacity} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
