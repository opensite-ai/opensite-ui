"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroFullscreenBackgroundImageProps {
  className?: string;
  backgroundImage?: string;
}

export function HeroFullscreenBackgroundImage({
  className,
  backgroundImage = imagePlaceholders[33],
}: HeroFullscreenBackgroundImageProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "dark relative flex h-svh max-h-[1400px] w-svw overflow-hidden bg-cover bg-center bg-no-repeat font-sans after:absolute after:top-0 after:left-0 after:z-10 after:h-full after:w-full after:bg-black/20 after:content-[''] md:h-svh",
        className
      )}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="relative z-30 m-auto flex max-w-185 flex-col items-center justify-center gap-6 px-5">
        <h1 className="text-center font-serif text-4xl leading-tight text-foreground md:text-6xl xl:text-[4.4rem]">
          Explore the wonders of science.
        </h1>
        <p className="text-center text-base text-foreground">
          From stunning skyscrapers to intricate bridges and innovative
          architectural marvels, each photo invites you to explore the
          artificial wonders of the world.
        </p>
        <Pressable
          href="#"
          asButton
          variant="default"
          className="h-fit w-fit rounded-full px-7 py-4 text-sm leading-tight font-medium"
        >
          See all photos
        </Pressable>
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-[url('https://cdn.ing/assets/i/r/286188/zrqcp9hynh3j7p2laihwzfbujgrl/noise.png')] bg-repeat opacity-15" />
    </section>
  );
}
