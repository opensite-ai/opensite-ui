"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { videoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroProductivityLauncherVideoProps {
  className?: string;
  videoSrc?: string;
}

export function HeroProductivityLauncherVideo({
  className,
  videoSrc = videoPlaceholders[1] || videoPlaceholders[0],
}: HeroProductivityLauncherVideoProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "dark relative overflow-hidden bg-background py-12 font-sans md:py-20",
        className
      )}
    >
      <div className="relative z-20 container max-w-[51.125rem]">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-8 px-4 pt-52 pb-32 md:pb-52">
            <div className="max-w-100 sm:max-w-[33.75rem]">
              <h1 className="text-center text-4xl leading-tight font-semibold text-foreground [text-shadow:0_4px_4px_rgba(0,0,0,0.15)] sm:text-5xl md:text-[4rem]">
                Your fast track to everything.
              </h1>
            </div>
            <div className="max-w-[22.5rem] md:max-w-full">
              <p className="text-center text-sm leading-normal tracking-tight text-balance text-muted-foreground [text-shadow:0_4px_4px_rgba(0,0,0,0.25)] md:text-lg">
                A suite of robust productivity tools packed into an adaptable
                launcher—quick, intuitive, and dependable.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Pressable
                href="#"
                asButton
                variant="default"
                className="inline-flex h-fit w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm leading-snug font-medium tracking-tight text-nowrap sm:w-fit"
              >
                <DynamicIcon name="lucide/apple" size={20} />
                <p>Download for Mac</p>
              </Pressable>
              <Pressable
                href="#"
                asButton
                variant="outline"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-linear-to-b from-white/5 to-white/15 px-3 py-2 text-sm leading-snug font-medium tracking-tight text-nowrap text-white transition-colors hover:border-white/40 sm:w-fit"
              >
                <DynamicIcon name="lucide/monitor" size={20} />
                <p>Join Windows waitlist</p>
              </Pressable>
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <span>v1.87.5</span>
              <span className="relative before:absolute before:-left-3 before:content-['|']">
                macOS 12+
              </span>
              <span className="relative before:absolute before:-left-3 before:content-['|']">
                <button>Install via homebrew</button>
              </span>
            </div>
          </div>
          <Pressable
            href="#"
            className="group relative mt-10 flex h-8 items-center gap-3 overflow-hidden rounded-full border border-border/50 bg-background px-3 py-1 text-sm font-medium text-white"
          >
            <span>Download on iOS</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <span>Join waitlist</span>
              <DynamicIcon
                name="lucide/arrow-right"
                size={16}
                className="stroke-muted-foreground"
              />
            </span>
          </Pressable>
        </div>
      </div>
      <div className="absolute -top-24 z-10 h-full w-full before:absolute before:inset-0 before:size-full before:bg-[radial-gradient(circle_at_center,rgba(10,10,10,.3)_15%,rgba(10,10,10,1)_45%)] before:content-['']">
        <video
          src={videoSrc}
          loop
          muted
          autoPlay
          controls={false}
          className="block size-full object-cover object-center bg-blend-saturation"
        />
      </div>
    </section>
  );
}
