"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { PatternBackground } from "../../ui/pattern-background";

export interface CircuitBoardFadeTopProps {
  className?: string;
  children?: React.ReactNode;
  patternOpacity?: number;
}

export function CircuitBoardFadeTop({
  className,
  children,
  patternOpacity = 1,
}: CircuitBoardFadeTopProps) {
  return (
    <section className={cn("relative flex min-h-screen w-full items-center justify-center", className)}>
      <PatternBackground pattern="circuitBoardFadeTop" opacity={patternOpacity} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
