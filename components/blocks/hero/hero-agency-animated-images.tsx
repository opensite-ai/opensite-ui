"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { AspectRatio } from "../../ui/aspect-ratio";

export interface HeroAgencyAnimatedImagesProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroAgencyAnimatedImages({
  className,
  optixFlowConfig,
}: HeroAgencyAnimatedImagesProps): React.JSX.Element {
  return (
    <section className={cn("bg-background py-12 md:py-20", className)}>
      <div className="container max-w-[111rem]">
        <div className="grid w-full grid-cols-1 items-center justify-between gap-14 lg:grid-cols-2">
          <div className="flex w-full max-w-[31.25rem] flex-col gap-8 md:gap-14 lg:max-w-full">
            <h1 className="font-serif text-5xl text-foreground md:text-6xl lg:text-7xl xl:text-[5rem]">
              Revolutionize your business operations
            </h1>
            <p className="font-montserrat text-2xl leading-snug text-foreground lg:text-3xl xl:text-4xl">
              The ultimate platform to unlock your agency&apos;s capabilities.
            </p>
            <Pressable
              href="#"
              asButton
              variant="default"
              className="block h-fit w-fit rounded-lg px-7 py-3.5 text-lg font-medium transition-all duration-300 hover:-translate-y-1"
            >
              Book a Demo
            </Pressable>
          </div>
          <div className="mx-auto w-full max-w-[52.875rem] lg:mx-0">
            <AspectRatio ratio={1.049627792 / 1}>
              <div className="grid w-full grid-cols-2 items-center justify-center gap-4">
                <div className="flex flex-col items-end justify-center gap-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <Img
                      src={imagePlaceholders[120]}
                      alt=""
                      className="block h-full w-full object-cover object-center"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-lg">
                    <Img
                      src={imagePlaceholders[121]}
                      alt=""
                      className="block h-full w-full object-cover object-center"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-4">
                  <div className="relative overflow-hidden rounded-lg">
                    <Img
                      src={imagePlaceholders[122]}
                      alt=""
                      className="block h-full w-full object-cover object-center"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-lg">
                    <Img
                      src={imagePlaceholders[123]}
                      alt=""
                      className="block h-full w-full object-cover object-center"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
}
