"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroWelcomeAsymmetricImagesProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroWelcomeAsymmetricImages({
  className,
  optixFlowConfig,
}: HeroWelcomeAsymmetricImagesProps): React.JSX.Element {
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row xl:gap-20">
          <div className="flex w-full flex-col items-start text-left">
            <h1 className="mb-8 text-4xl font-normal text-pretty md:text-7xl">
              Welcome to Our Website
            </h1>
            <p className="mb-12 max-w-[70%] text-xl font-normal text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              necessitatibus dolorum.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Pressable href="#" asButton variant="default" size="lg">
                Get Started
                <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
              </Pressable>
              <Pressable href="#" asButton variant="outline" size="lg">
                Learn More
              </Pressable>
            </div>
          </div>
          <div className="relative flex w-full items-center justify-end gap-4">
            <div className="flex flex-col gap-4">
              <Img
                src={imagePlaceholders[124]}
                alt=""
                className="h-48 w-64 rounded-lg object-cover"
                optixFlowConfig={optixFlowConfig}
              />
              <Img
                src={imagePlaceholders[125]}
                alt=""
                className="h-64 w-64 rounded-lg object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Img
                src={imagePlaceholders[0]}
                alt=""
                className="h-64 w-64 rounded-lg object-cover"
                optixFlowConfig={optixFlowConfig}
              />
              <Img
                src={imagePlaceholders[1]}
                alt=""
                className="h-48 w-64 rounded-lg object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
