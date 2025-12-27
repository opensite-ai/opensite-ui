"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroCenteredScreenshotProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroCenteredScreenshot({
  className,
  optixFlowConfig,
}: HeroCenteredScreenshotProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="overflow-hidden border-b border-muted">
        <div className="container">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <div className="z-10 items-center text-center">
              <h1 className="mb-8 text-4xl font-semibold text-pretty lg:text-7xl">
                Build faster with Opensite AI
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur. Explicabo.
              </p>
              <div className="mt-12 flex w-full flex-col justify-center gap-2 sm:flex-row">
                <Pressable href="#" asButton variant="default">
                  Get started now
                  <DynamicIcon name="lucide/chevron-right" size={16} className="ml-2" />
                </Pressable>
                <Pressable href="#" asButton variant="ghost">
                  Learn more
                  <DynamicIcon name="lucide/chevron-right" size={16} className="ml-2" />
                </Pressable>
              </div>
            </div>
          </div>
          <Img
            src={imagePlaceholders[4]}
            alt="placeholder"
            className="mx-auto mt-24 max-h-[700px] w-full max-w-7xl rounded-t-lg object-cover shadow-lg"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    </section>
  );
}
