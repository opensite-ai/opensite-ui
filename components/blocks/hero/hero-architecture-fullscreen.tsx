"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroArchitectureFullscreenProps {
  className?: string;
  backgroundImage?: string;
}

export function HeroArchitectureFullscreen({
  className,
  backgroundImage = imagePlaceholders[97],
}: HeroArchitectureFullscreenProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "dark relative h-svh max-h-[1400px] w-full overflow-hidden bg-cover bg-center bg-no-repeat py-12 font-poppins after:absolute after:top-0 after:left-0 after:block after:h-full after:w-full after:bg-black/65 after:content-[''] md:py-20",
        className
      )}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="relative z-20 container h-full w-full max-w-340">
        <div className="flex h-full w-full flex-col justify-end gap-12">
          <div className="flex max-w-245.5 flex-col gap-1">
            <p className="text-sm leading-none text-muted-foreground uppercase">
              #WORLDS NUMBER ONE
            </p>
            <h1 className="text-3xl leading-snug! text-foreground md:text-4xl lg:text-6xl">
              Designing Distinctive Spaces with Cutting-Edge Architectural
              Innovations
            </h1>
          </div>
          <div className="flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <p className="max-w-81 border-l border-muted-foreground pl-6 text-base text-muted-foreground">
              Harnessing the power of architecture to reshape lives and uplift
              communities.
            </p>
            <div className="shrink-0">
              <Pressable
                href="#"
                asButton
                variant="outline"
                className="group flex h-fit w-fit items-center gap-3 rounded-full border border-muted-foreground/40 bg-transparent px-6 py-4 text-sm text-foreground uppercase hover:bg-transparent"
              >
                <p className="group-hover:underline">Our projects</p>
                <DynamicIcon
                  name="lucide/move-up-right"
                  size={16}
                  className="fill-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Pressable>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
