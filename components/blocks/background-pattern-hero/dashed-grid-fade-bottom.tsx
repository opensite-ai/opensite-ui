"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { PatternBackground } from "../../ui/pattern-background";

export interface DashedGridFadeBottomProps {
  className?: string;
  children?: React.ReactNode;
  patternOpacity?: number;
}

export function DashedGridFadeBottom({
  className,
  children,
  patternOpacity = 1,
}: DashedGridFadeBottomProps) {
  return (
    <section className={cn("relative flex min-h-screen w-full items-center justify-center", className)}>
      <PatternBackground pattern="dashedGridFadeBottom" opacity={patternOpacity} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
