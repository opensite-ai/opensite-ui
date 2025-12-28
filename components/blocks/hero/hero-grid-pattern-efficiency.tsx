"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface HeroGridPatternEfficiencyProps {
  className?: string;
}

export function HeroGridPatternEfficiency({
  className,
}: HeroGridPatternEfficiencyProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative max-w-5xl">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted))_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_100%_at_50%_50%,#000_60%,transparent_100%)] bg-size-[64px_64px]"></div>
          <h1 className="text-5xl leading-tight font-extrabold lg:text-8xl lg:leading-snug">
            Less complexity. <span className="mr-6">More</span>
            <span className="relative inline-block before:absolute before:top-0 before:-right-2 before:-bottom-2 before:-left-4 before:-z-10 before:rounded-lg before:bg-muted-foreground/15">
              efficiency.
            </span>
          </h1>
          <p className="mt-7 text-xl font-light lg:text-3xl">
            A powerful tool to streamline workflows, manage tasks, and deliver
            results efficiently.
          </p>
          <div className="mt-12 flex w-fit flex-col gap-2.5 text-center">
            <Pressable href="#" asButton size="lg" variant="default">
              Start Now for free
              <DynamicIcon
                name="lucide/chevron-right"
                size={16}
                className="ml-2"
              />
            </Pressable>
            <p className="text-sm text-muted-foreground">
              No credit card required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
