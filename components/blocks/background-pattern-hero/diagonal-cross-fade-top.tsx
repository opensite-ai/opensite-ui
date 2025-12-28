"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface DiagonalCrossFadeTopProps {
  className?: string;
  children?: React.ReactNode;
}

export function DiagonalCrossFadeTop({ className, children }: DiagonalCrossFadeTopProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className
      )}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 32px, hsl(var(--muted)) 32px, hsl(var(--muted)) 33px),
            repeating-linear-gradient(135deg, transparent, transparent 32px, hsl(var(--muted)) 32px, hsl(var(--muted)) 33px)
          `,
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
