"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroImageLeftContentProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroImageLeftContent({
  className,
  optixFlowConfig,
}: HeroImageLeftContentProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="flex justify-end bg-muted">
            <Img
              src={imagePlaceholders[1]}
              alt="placeholder hero"
              className="max-h-[600px] w-full rounded-md object-cover lg:max-h-[800px]"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
          <div className="flex flex-col items-center text-center lg:max-w-3xl lg:items-start lg:text-left">
            <Badge variant="secondary">
              New Release
              <DynamicIcon name="lucide/arrow-down-right" size={16} className="ml-2" />
            </Badge>
            <h1 className="my-6 text-4xl font-bold text-pretty md:text-5xl">
              Blocks built with Shadcn & Tailwind
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
              doloremque mollitia fugiat omnis! Porro facilis quo animi
              consequatur. Explicabo.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Pressable href="#" asButton variant="default" className="w-full sm:w-auto">
                Primary Button
              </Pressable>
              <Pressable href="#" asButton variant="outline" className="w-full sm:w-auto">
                Secondary Button
                <DynamicIcon name="lucide/arrow-down-right" size={16} className="ml-2" />
              </Pressable>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
