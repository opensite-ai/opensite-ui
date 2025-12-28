"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface DiagonalCrossBasicProps {
  className?: string;
  children?: React.ReactNode;
}

export function DiagonalCrossBasic({ className, children }: DiagonalCrossBasicProps) {
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
        }}
      />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
