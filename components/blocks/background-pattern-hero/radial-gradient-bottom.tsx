"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface RadialGradientBottomProps {
  className?: string;
  children?: React.ReactNode;
}

export function RadialGradientBottom({ className, children }: RadialGradientBottomProps) {
  return (
    <section className={cn("relative min-h-screen w-full", className)}>
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 90%, var(--background) 40%, var(--primary) 100%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
