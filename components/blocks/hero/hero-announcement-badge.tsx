"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface HeroAnnouncementBadgeProps {
  className?: string;
}

export function HeroAnnouncementBadge({
  className,
}: HeroAnnouncementBadgeProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Badge
          variant="outline"
          className="mb-4 max-w-full text-sm font-normal lg:mb-10 lg:py-2 lg:pr-5 lg:pl-2"
        >
          <span className="mr-2 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent">
            <DynamicIcon name="lucide/bell" size={16} />
          </span>
          <p className="truncate whitespace-nowrap">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
            eaque distinctio iusto voluptas voluptatum sed!
          </p>
        </Badge>
        <h1 className="mb-6 text-4xl leading-none font-bold tracking-tighter md:text-[7vw] lg:text-8xl">
          Streamline your workflow experience.
        </h1>
        <p className="max-w-2xl text-muted-foreground md:text-[2vw] lg:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum dolor
          assumenda voluptatem nemo magni a maiores aspernatur.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:mt-10">
          <Pressable href="#" asButton size="lg" variant="default" className="w-full md:w-auto">
            Get a demo
          </Pressable>
          <Pressable href="#" asButton size="lg" variant="outline" className="w-full md:w-auto">
            <DynamicIcon name="lucide/play-circle" size={16} className="mr-2" />
            Watch video
          </Pressable>
        </div>
      </div>
    </section>
  );
}
