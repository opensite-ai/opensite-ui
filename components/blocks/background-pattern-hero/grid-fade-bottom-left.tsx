"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface GridFadeBottomLeftProps {
  className?: string;
  children?: React.ReactNode;
}

export function GridFadeBottomLeft({ className, children }: GridFadeBottomLeftProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className
      )}
    >
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,_hsl(var(--muted))_1px,_transparent_1px),linear-gradient(to_bottom,_hsl(var(--muted))_1px,_transparent_1px)] bg-[length:32px_32px]"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 0% 100%, #000 50%, transparent 90%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
