"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface SpotlightLeftProps {
  className?: string;
  children?: React.ReactNode;
}

export function SpotlightLeft({ className, children }: SpotlightLeftProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -left-1/4 top-1/2 z-0 aspect-square w-3/4 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
