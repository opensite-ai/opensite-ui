"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroCenteredImageGridProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroCenteredImageGrid({
  className,
  optixFlowConfig,
}: HeroCenteredImageGridProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="z-10 flex flex-col items-center gap-8 text-center">
            <div className="max-w-3xl">
              <h1 className="mb-4 text-4xl font-semibold text-pretty lg:text-6xl">
                Build your next project with Blocks
              </h1>
              <p className="text-muted-foreground lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur. Explicabo.
              </p>
            </div>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
              <Pressable href="#" asButton variant="default">
                Get started now
                <DynamicIcon name="lucide/chevron-right" size={16} className="ml-1" />
              </Pressable>
              <Pressable href="#" asButton variant="ghost">
                Learn more
                <DynamicIcon name="lucide/chevron-right" size={16} className="ml-1" />
              </Pressable>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-7xl gap-px bg-border p-px md:grid-cols-5">
          <Img
            src={imagePlaceholders[2]}
            alt="placeholder"
            className="h-full max-h-[500px] w-full object-cover md:col-span-3 dark:invert"
            optixFlowConfig={optixFlowConfig}
          />
          <div className="relative md:col-span-2">
            <Img
              src={imagePlaceholders[3]}
              alt="placeholder"
              className="h-full max-h-[500px] w-full object-cover dark:invert"
              optixFlowConfig={optixFlowConfig}
            />
            <Pressable href="#" asButton variant="outline" className="absolute right-5 bottom-5">
              Learn more
              <DynamicIcon name="lucide/chevron-right" size={16} className="ml-1" />
            </Pressable>
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 place-items-center gap-6 md:grid-cols-4">
          <Img
            src={logoPlaceholders.darkHorizontalLogo}
            alt="logo"
            className="h-5 sm:h-7 dark:invert"
            optixFlowConfig={optixFlowConfig}
          />
          <Img
            src={logoPlaceholders.darkHorizontalLogo}
            alt="logo"
            className="h-9 sm:h-11 dark:invert"
            optixFlowConfig={optixFlowConfig}
          />
          <Img
            src={logoPlaceholders.darkHorizontalLogo}
            alt="logo"
            className="h-4 sm:h-6 dark:hidden"
            optixFlowConfig={optixFlowConfig}
          />
          <Img
            src={logoPlaceholders.lightHorizontalLogo}
            alt="logo"
            className="hidden h-4 sm:h-6 dark:block"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    </section>
  );
}
