"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroMarketplaceScatteredImagesProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroMarketplaceScatteredImages({
  className,
  optixFlowConfig,
}: HeroMarketplaceScatteredImagesProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="">
        <div className="relative container mx-auto max-w-xl py-10 text-center">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted))_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_100%_at_50%_50%,#000_60%,transparent_100%)] bg-[size:64px_64px]"></div>
          <h1 className="mb-3 text-4xl lg:text-7xl">
            Explore a World of Digital Assets
          </h1>
          <p className="mb-5 text-sm text-muted-foreground md:text-base">
            Discover the future of asset management, tokenization, and liquidity
            with our comprehensive marketplace.
          </p>
          <Pressable href="#" asButton variant="default">Marketplace</Pressable>
          <div className="mt-7 flex items-start justify-center gap-2 font-medium md:text-xl">
            <DynamicIcon name="lucide/globe" size={20} className="mt-0.5" />
            Global Partnerships and Innovation
          </div>
        </div>
        <div className="mx-auto mt-14 max-w-7xl overflow-hidden py-8">
          <div className="relative w-full">
            <Img
              src={imagePlaceholders[10]}
              alt="placeholder"
              className="relative left-1/2 mx-auto max-h-[480px] w-full rounded-xl object-cover shadow-md lg:static lg:max-w-[60vw] xl:max-w-3xl"
              optixFlowConfig={optixFlowConfig}
            />
            <Img
              src={imagePlaceholders[11]}
              alt="placeholder"
              className="absolute top-0 right-20 -z-10 hidden max-h-60 -rotate-12 rounded-xl object-cover shadow-md lg:block"
              optixFlowConfig={optixFlowConfig}
            />
            <Img
              src={imagePlaceholders[12]}
              alt="placeholder"
              className="absolute right-20 bottom-0 hidden rotate-12 rounded-xl object-cover shadow-md md:max-h-60 lg:block"
              optixFlowConfig={optixFlowConfig}
            />
            <Img
              src={imagePlaceholders[13]}
              alt="placeholder"
              className="absolute top-0 left-1/4 -z-10 max-h-44 -rotate-12 rounded-xl object-cover shadow-md min-[450px]:max-h-52 sm:left-1/3 md:max-h-60 lg:left-20"
              optixFlowConfig={optixFlowConfig}
            />
            <Img
              src={imagePlaceholders[14]}
              alt="placeholder"
              className="absolute bottom-0 left-1/4 max-h-44 rotate-12 rounded-xl object-cover shadow-md min-[450px]:max-h-52 sm:left-1/3 md:max-h-60 lg:left-20"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
