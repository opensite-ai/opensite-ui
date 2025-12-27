"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroPlatformFeaturesGridProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroPlatformFeaturesGrid({
  className,
  optixFlowConfig,
}: HeroPlatformFeaturesGridProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="text-center">
          <Img
            src={logoPlaceholders.logoMark}
            alt="placeholder"
            className="mx-auto mb-5 w-16 md:mb-6 md:w-24 lg:mb-7 lg:w-28"
            optixFlowConfig={optixFlowConfig}
          />
          <span className="mb-3 text-sm tracking-widest text-muted-foreground md:text-base">
            PLATFORM
          </span>
          <h1 className="mt-4 text-4xl font-semibold text-balance lg:text-6xl">
            Develop, launch, and grow your service with our platform
          </h1>
          <Pressable href="#" asButton variant="default" className="mt-8" size="lg">
            Start now for free
            <DynamicIcon name="lucide/move-right" size={20} className="ml-2" />
          </Pressable>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border bg-input md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3 bg-background p-5 md:gap-6">
            <DynamicIcon name="lucide/globe" size={24} />
            <div>
              <h2 className="text-sm font-semibold md:text-base">
                Robust Infrastructure
              </h2>
              <p className="text-sm text-muted-foreground md:text-base">
                Reliable and scalable infrastructure, easy to manage.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 bg-background p-5 md:gap-6">
            <DynamicIcon name="lucide/rocket" size={24} />
            <div>
              <h2 className="text-sm font-semibold md:text-base">Easy Setup</h2>
              <p className="text-sm text-muted-foreground md:text-base">
                Quick and simple configuration for any use case.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 bg-background p-5 md:gap-6">
            <DynamicIcon name="lucide/expand" size={24} />
            <div>
              <h2 className="text-sm font-semibold md:text-base">
                Effortless Scaling
              </h2>
              <p className="text-sm text-muted-foreground md:text-base">
                Built to handle increased demand with ease.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 bg-background p-5 md:gap-6">
            <DynamicIcon name="lucide/wrench" size={24} />
            <div>
              <h2 className="text-sm font-semibold md:text-base">
                Low Maintenance
              </h2>
              <p className="text-sm text-muted-foreground md:text-base">
                Focus on building, not on maintenance tasks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
