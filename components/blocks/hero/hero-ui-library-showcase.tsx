"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";
import { AspectRatio } from "../../ui/aspect-ratio";

export interface HeroUiLibraryShowcaseProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroUiLibraryShowcase({
  className,
  optixFlowConfig,
}: HeroUiLibraryShowcaseProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "container mx-auto mt-32 flex flex-col items-center gap-20 bg-background md:gap-40 md:text-center",
        className,
      )}
    >
      <div className="flex flex-col gap-10 md:items-center">
        <Img
          src={logoPlaceholders.logoMark}
          alt=""
          className="h-11 w-fit"
          optixFlowConfig={optixFlowConfig}
        />
        <div className="flex max-w-[880px] flex-col items-center gap-6">
          <h1 className="text-4xl tracking-tighter text-foreground capitalize md:text-5xl lg:text-6xl">
            <p>The continuously growing UI library for Opensite AI</p>
          </h1>
          <div className="text-xl text-muted-foreground">
            <p>
              Create quicker, more efficiently, and boost your design expertise.
            </p>
            <p>Transform into an elite designer instantly</p>
          </div>
        </div>
        <Pressable href="#" asButton variant="default" className="h-fit self-center rounded-full px-6 py-3">
          Download Now
        </Pressable>
      </div>
      <div className="w-full overflow-hidden rounded-lg">
        <AspectRatio ratio={1.916786227 / 1}>
          <Img
            src={imagePlaceholders[32]}
            alt=""
            className="size-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </AspectRatio>
      </div>
    </section>
  );
}
