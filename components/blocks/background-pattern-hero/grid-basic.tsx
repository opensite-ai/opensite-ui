"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface GridBasicProps {
  className?: string;
  children?: React.ReactNode;
}

export function GridBasic({ className, children }: GridBasicProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center",
        className
      )}
    >
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,_hsl(var(--muted))_1px,_transparent_1px),linear-gradient(to_bottom,_hsl(var(--muted))_1px,_transparent_1px)] bg-[length:40px_40px]" />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
