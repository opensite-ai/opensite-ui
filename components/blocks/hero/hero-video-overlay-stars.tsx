"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { videoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroVideoOverlayStarsProps {
  className?: string;
  videoSrc?: string;
}

export function HeroVideoOverlayStars({
  className,
  videoSrc = videoPlaceholders[0],
}: HeroVideoOverlayStarsProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "dark relative h-svh max-h-[1400px] min-h-[600px] w-full overflow-hidden bg-background px-5 font-sans",
        className,
      )}
    >
      <div className="relative z-10 flex size-full">
        <div className="m-auto flex max-w-[25rem] flex-col items-center gap-9 sm:max-w-[31.25rem] md:max-w-[50rem]">
          <h1 className="bg-linear-to-br from-neutral-100 to-neutral-600 bg-clip-text text-center text-4xl leading-tight font-semibold text-transparent sm:text-5xl md:text-[4rem]">
            Liberate yourself from phone interruptions
          </h1>
          <Pressable
            href="#"
            asButton
            variant="default"
            className="flex h-fit w-fit items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium shadow-[0_0_5px_5px_rgba(255,255,255,.3)] transition-all duration-500 hover:bg-neutral-200 hover:shadow-[0_0_10px_5px_rgba(255,255,255,.5)]"
          >
            <p>Buy Here</p>
            <DynamicIcon name="lucide/chevron-right" size={20} />
          </Pressable>
          <div>
            <div className="flex items-center justify-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <DynamicIcon key={i} name="lucide/star" size={12} className="fill-muted2-foreground" />
              ))}
            </div>
            <p className="mt-1.5 max-w-40 text-center text-xs leading-snug font-medium text-foreground/60">
              Trusted by 2,000+ high performing individuals
            </p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 size-full before:absolute before:inset-0 before:bg-background/85 before:content-['']">
        <video
          src={videoSrc}
          muted
          autoPlay
          loop
          controls={false}
          className="size-full object-cover object-center"
        />
      </div>
    </section>
  );
}
