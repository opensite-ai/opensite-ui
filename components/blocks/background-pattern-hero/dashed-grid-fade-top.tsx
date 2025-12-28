"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface DashedGridFadeTopProps {
  className?: string;
  children?: React.ReactNode;
}

export function DashedGridFadeTop({ className, children }: DashedGridFadeTopProps) {
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
            linear-gradient(to right, hsl(var(--muted)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--muted)) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
