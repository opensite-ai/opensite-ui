"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroLogoCenteredScreenshotProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroLogoCenteredScreenshot({
  className,
  optixFlowConfig,
}: HeroLogoCenteredScreenshotProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="border-b">
        <div className="container max-w-7xl">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="z-10 flex flex-col items-center gap-6 text-center">
              <Img
                src={logoPlaceholders.logoMark}
                alt="logo"
                className="h-10 md:h-16"
                optixFlowConfig={optixFlowConfig}
              />
              <div>
                <h1 className="mb-4 text-3xl font-medium text-pretty lg:text-5xl">
                  Build your next project with Blocks
                </h1>
                <p className="max-w-3xl text-muted-foreground lg:text-xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                  doloremque mollitia fugiat omnis! Porro facilis quo animi
                  consequatur. Explicabo.
                </p>
              </div>
              <Pressable href="#" asButton variant="default">
                Get Started
                <DynamicIcon name="lucide/chevron-right" size={16} className="ml-1" />
              </Pressable>
            </div>
          </div>
          <Img
            src={imagePlaceholders[5]}
            alt="placeholder"
            className="mt-20 aspect-video w-full rounded-t-lg object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    </section>
  );
}
