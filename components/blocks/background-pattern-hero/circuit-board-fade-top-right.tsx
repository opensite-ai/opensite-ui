"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface CircuitBoardFadeTopRightProps {
  className?: string;
  children?: React.ReactNode;
}

export function CircuitBoardFadeTopRight({ className, children }: CircuitBoardFadeTopRightProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className
      )}
    >
      <svg
        className="absolute inset-0 z-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)",
        }}
      >
        <defs>
          <pattern
            id="circuit-board-fade-top-right"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 50h40M60 50h40M50 0v40M50 60v40"
              stroke="hsl(var(--muted))"
              strokeWidth="1"
              fill="none"
            />
            <circle cx="50" cy="50" r="3" fill="hsl(var(--muted))" />
            <circle cx="0" cy="50" r="2" fill="hsl(var(--muted))" />
            <circle cx="100" cy="50" r="2" fill="hsl(var(--muted))" />
            <circle cx="50" cy="0" r="2" fill="hsl(var(--muted))" />
            <circle cx="50" cy="100" r="2" fill="hsl(var(--muted))" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-board-fade-top-right)" />
      </svg>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
