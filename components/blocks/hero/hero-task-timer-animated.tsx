"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { AspectRatio } from "../../ui/aspect-ratio";

export interface HeroTaskTimerAnimatedProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroTaskTimerAnimated({
  className,
  optixFlowConfig,
}: HeroTaskTimerAnimatedProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "container flex flex-col gap-10 bg-background py-20 sm:gap-20",
        className,
      )}
    >
      <div className="flex flex-col gap-10 lg:w-[80%] lg:self-center">
        <h1 className="max-w-2xl text-6xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
          A simple task timer to power your goals
        </h1>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <Pressable href="#" asButton variant="default" className="group h-fit rounded-xl p-4 text-xl font-semibold shadow-xl">
            <div className="size-full overflow-hidden">
              <div className="flex items-center transition-all group-hover:-translate-x-5">
                <DynamicIcon name="lucide/apple" size={20} className="mr-2" />
                <span>Download for Mac</span>
                <DynamicIcon name="lucide/arrow-right" size={20} className="ml-2 opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
          </Pressable>
          <Pressable href="#" asButton variant="link" className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <span>Download for Windows</span>
            <DynamicIcon name="lucide/arrow-right" size={20} />
          </Pressable>
        </div>
      </div>
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex flex-col gap-10 lg:w-[60%]">
          <div className="overflow-hidden rounded-lg">
            <AspectRatio ratio={1.916786227 / 1}>
              <Img
                src={imagePlaceholders[42]}
                alt=""
                className="block size-full object-cover object-top-left"
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:w-[40%]">
          <div className="overflow-hidden rounded-lg">
            <AspectRatio ratio={1.916786227 / 1}>
              <Img
                src={imagePlaceholders[43]}
                alt=""
                className="block size-full object-cover object-top-left"
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
}
