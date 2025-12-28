"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroDigitalAgencyFullscreenProps {
  className?: string;
  backgroundImage?: string;
}

export function HeroDigitalAgencyFullscreen({
  className,
  backgroundImage = imagePlaceholders[10],
}: HeroDigitalAgencyFullscreenProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "font-dm_sans dark relative h-svh max-h-[1400px] min-h-[600px] w-full bg-cover bg-center bg-no-repeat after:absolute after:inset-0 after:block after:size-full after:bg-zinc-950/50 after:content-['']",
        className
      )}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="relative z-10 mx-auto flex size-full max-w-500 px-4 py-9">
        <div className="flex w-full flex-col justify-between gap-10">
          <div className="mx-auto flex max-w-125 flex-1 flex-col items-center justify-center gap-7 sm:max-w-150 md:max-w-200">
            <h1 className="text-center text-4xl leading-tight font-medium text-foreground sm:text-5xl md:text-6xl">
              Transform Your Vision Into Digital Reality
            </h1>
            <p className="text-center text-lg text-balance text-foreground md:text-2xl">
              We craft exceptional digital solutions that help brands stand out
              and make a lasting impact in the digital landscape.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Pressable
                href="#"
                asButton
                variant="default"
                className="block h-fit w-fit rounded-sm px-6 py-3.5 text-sm font-semibold tracking-wider text-nowrap uppercase"
              >
                Explore Projects
              </Pressable>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-lg bg-black/20 px-6 py-4 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-primary"></div>
              <div className="text-sm font-medium text-muted-foreground">
                <p className="text-primary">Global Headquarters</p>
                <p>San Francisco, California</p>
              </div>
            </div>
            <Pressable
              href="#"
              asButton
              variant="outline"
              size="icon"
              className="flex size-10 rounded-full border-2 border-primary transition-colors hover:bg-primary/20"
            >
              <DynamicIcon
                name="lucide/arrow-down"
                size={20}
                className="m-auto stroke-primary"
              />
            </Pressable>
          </div>
        </div>
      </div>
    </section>
  );
}
