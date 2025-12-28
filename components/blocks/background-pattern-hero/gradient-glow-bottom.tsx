"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface GradientGlowBottomProps {
  className?: string;
  children?: React.ReactNode;
}

export function GradientGlowBottom({ className, children }: GradientGlowBottomProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -bottom-1/4 left-1/2 z-0 aspect-square w-3/4 -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
