"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface GridFadeTopRightProps {
  className?: string;
  children?: React.ReactNode;
}

export function GridFadeTopRight({ className, children }: GridFadeTopRightProps) {
  return (
    <section className={cn("relative min-h-screen w-full", className)}>
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,_var(--muted)_1px,_transparent_1px),linear-gradient(to_bottom,_var(--muted)_1px,_transparent_1px)] bg-[length:32px_32px]"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
