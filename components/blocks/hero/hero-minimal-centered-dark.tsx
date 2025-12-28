"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface HeroMinimalCenteredDarkProps {
  className?: string;
}

export function HeroMinimalCenteredDark({
  className,
}: HeroMinimalCenteredDarkProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "dark relative min-h-screen bg-background py-32",
        className
      )}
    >
      <div className="container flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-4 py-2 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          <span>Now available in beta</span>
        </div>
        <h1 className="mt-8 max-w-4xl text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          The future of{" "}
          <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            collaboration
          </span>{" "}
          is here
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Work together seamlessly with your team. Real-time editing,
          intelligent suggestions, and powerful integrations.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Pressable
            href="#"
            asButton
            variant="default"
            size="lg"
            className="rounded-full px-8"
          >
            Get early access
            <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
          </Pressable>
          <Pressable
            href="#"
            asButton
            variant="outline"
            size="lg"
            className="rounded-full border-border/50 px-8"
          >
            Learn more
          </Pressable>
        </div>
        <div className="mt-16 flex items-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <DynamicIcon name="lucide/users" size={16} />
            <span>10K+ teams</span>
          </div>
          <div className="flex items-center gap-2">
            <DynamicIcon name="lucide/star" size={16} />
            <span>4.9/5 rating</span>
          </div>
          <div className="flex items-center gap-2">
            <DynamicIcon name="lucide/shield-check" size={16} />
            <span>SOC 2 certified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
