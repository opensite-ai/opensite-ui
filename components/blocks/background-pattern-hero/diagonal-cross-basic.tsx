"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { PatternBackground } from "../../ui/pattern-background";

export interface DiagonalCrossBasicProps {
  className?: string;
  children?: React.ReactNode;
  patternOpacity?: number;
}

export function DiagonalCrossBasic({
  className,
  children,
  patternOpacity = 1,
}: DiagonalCrossBasicProps) {
  return (
    <section className={cn("relative flex min-h-screen w-full items-center justify-center", className)}>
      <PatternBackground pattern="diagonalCrossBasic" opacity={patternOpacity} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
