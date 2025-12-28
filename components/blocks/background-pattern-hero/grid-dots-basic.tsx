"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface GridDotsBasicProps {
  className?: string;
  children?: React.ReactNode;
}

export function GridDotsBasic({ className, children }: GridDotsBasicProps) {
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
      >
        <defs>
          <pattern
            id="grid-dots-basic"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 20h40M20 0v40"
              stroke="hsl(var(--muted))"
              strokeWidth="0.5"
              fill="none"
            />
            <circle cx="20" cy="20" r="2" fill="hsl(var(--muted))" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-dots-basic)" />
      </svg>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
