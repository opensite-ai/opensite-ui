"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { PatternBackground } from "../../ui/pattern-background";

export interface GridFadeTopLeftProps {
  className?: string;
  children?: React.ReactNode;
  patternOpacity?: number;
}

export function GridFadeTopLeft({
  className,
  children,
  patternOpacity = 1,
}: GridFadeTopLeftProps) {
  return (
    <section className={cn("relative min-h-screen w-full", className)}>
      <PatternBackground pattern="gridFadeTopLeft" opacity={patternOpacity} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
