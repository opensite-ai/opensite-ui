"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { AspectRatio } from "../../ui/aspect-ratio";

export interface HeroInnovationImageGridProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroInnovationImageGrid({
  className,
  optixFlowConfig,
}: HeroInnovationImageGridProps): React.JSX.Element {
  return (
    <section className={cn("bg-primary/5 py-12 font-sans md:py-20", className)}>
      <div className="container max-w-350">
        <div className="grid grid-cols-1 gap-22.5 lg:grid-cols-2">
          <div>
            <div className="flex flex-col gap-12">
              <div>
                <h1 className="mb-3 text-4xl font-bold md:text-5xl lg:text-6xl">
                  Uncover our vision for a more innovative, better future
                </h1>
                <p className="text-lg text-muted-foreground">
                  Be part of our journey to innovate and develop solutions that
                  enrich lives and fuel progress.
                </p>
              </div>
              <Pressable
                href="#"
                asButton
                variant="default"
                className="group flex h-fit w-fit items-center gap-2 rounded-full px-8 py-3"
              >
                <div className="font-medium text-white">Started for free</div>
                <div className="relative h-6 w-7 overflow-hidden">
                  <div className="absolute top-0 left-0 flex -translate-x-1/2 items-center transition-all duration-500 group-hover:translate-x-0">
                    <DynamicIcon
                      name="lucide/move-right"
                      size={24}
                      className="fill-white px-1"
                    />
                    <DynamicIcon
                      name="lucide/move-right"
                      size={24}
                      className="fill-white px-1"
                    />
                  </div>
                </div>
              </Pressable>
            </div>
          </div>
          <div>
            <AspectRatio ratio={1.390658174 / 1}>
              <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-5 lg:max-w-155.75 lg:gap-8">
                <div className="col-[1/2] row-[1/3]">
                  <Img
                    src={imagePlaceholders[98]}
                    alt=""
                    className="size-full rounded-lg object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                <div className="col-[2/3] row-[1/2]">
                  <Img
                    src={imagePlaceholders[99]}
                    alt=""
                    className="size-full rounded-lg object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                <div className="col-[2/3] row-[2/3]">
                  <Img
                    src={imagePlaceholders[100]}
                    alt=""
                    className="size-full rounded-lg object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
}
