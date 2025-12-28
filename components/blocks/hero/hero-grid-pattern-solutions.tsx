"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroGridPatternSolutionsProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroGridPatternSolutions({
  className,
  optixFlowConfig,
}: HeroGridPatternSolutionsProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 -top-1 -left-1 -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_100%_at_50%_50%,transparent_60%,#000_100%)] bg-size-[92px_92px] opacity-15"></div>
          <div className="mx-auto max-w-4xl">
            <Pressable
              href="#"
              className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm"
            >
              How to create superior products
              <DynamicIcon name="lucide/arrow-right" size={16} />
            </Pressable>
            <h1 className="my-4 mb-6 text-center text-3xl font-semibold lg:text-8xl">
              Create effective solutions for diverse needs.
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-muted-foreground lg:text-xl">
              Access all necessary resources for managing tasks and enhancing
              efficiency. Additionally, scale your capabilities across various
              projects.
            </p>
            <div className="flex flex-col justify-center gap-x-2 gap-y-3 sm:flex-row">
              <Pressable href="#" asButton variant="default">
                Get Started
                <DynamicIcon
                  name="lucide/chevron-right"
                  size={16}
                  className="ml-2"
                />
              </Pressable>
              <Pressable href="#" asButton variant="secondary">
                Discover Our Platform
                <DynamicIcon
                  name="lucide/chevron-right"
                  size={16}
                  className="ml-2"
                />
              </Pressable>
            </div>
          </div>
        </div>
        <div className="mt-20 grid gap-6 md:grid-cols-10">
          <Img
            src={imagePlaceholders[61]}
            alt="placeholder"
            className="h-full max-h-[500px] w-full rounded-xl object-cover md:col-span-3"
            optixFlowConfig={optixFlowConfig}
          />
          <Img
            src={imagePlaceholders[62]}
            alt="placeholder"
            className="h-full max-h-[500px] w-full rounded-xl object-cover md:col-span-2"
            optixFlowConfig={optixFlowConfig}
          />
          <Img
            src={imagePlaceholders[63]}
            alt="placeholder"
            className="h-full max-h-[500px] w-full rounded-xl object-cover md:col-span-5"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    </section>
  );
}
