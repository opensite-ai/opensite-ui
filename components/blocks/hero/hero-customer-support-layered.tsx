"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { AspectRatio } from "../../ui/aspect-ratio";

export interface HeroCustomerSupportLayeredProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroCustomerSupportLayered({
  className,
  optixFlowConfig,
}: HeroCustomerSupportLayeredProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "relative border-b border-muted bg-background pt-10",
        className
      )}
    >
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-2 md:gap-4 lg:grid-cols-2">
          <div className="flex w-full max-w-125 flex-col gap-9 lg:max-w-150 lg:py-[20%] xl:py-[26%]">
            <p className="font-mono text-[clamp(0.875rem,0.875vw,1rem)] text-muted-foreground">
              Customer Support
            </p>
            <h1 className="text-[clamp(3.5rem,calc(6.5vw+2.3rem),9.5rem)] leading-[0.85] tracking-[-0.03em] text-foreground">
              Change
              <br />
              their life
            </h1>
            <p className="text-[clamp(1.125rem,1.125vw,1.4rem)] leading-normal text-muted-foreground">
              Customer challenges and team missteps can cause chaos. Simplify
              delivering exceptional support with a platform designed for
              customer-focused teams like yours.
            </p>
          </div>
          <div>
            <div className="relative ml-8 aspect-square w-full max-w-225 overflow-hidden lg:absolute lg:right-0 lg:bottom-0 lg:w-1/2">
              <div className="absolute right-0 bottom-0 w-[85%] overflow-hidden rounded-lg">
                <AspectRatio ratio={0.918918919 / 1}>
                  <Img
                    src={imagePlaceholders[11]}
                    alt=""
                    className="block size-full object-cover object-top-left"
                    optixFlowConfig={optixFlowConfig}
                  />
                </AspectRatio>
              </div>
              <div className="absolute bottom-0 left-[0%] w-[70%] overflow-hidden rounded-tl-lg">
                <AspectRatio ratio={1.9 / 1}>
                  <Img
                    src={imagePlaceholders[12]}
                    alt=""
                    className="block h-full w-full object-cover object-center"
                    optixFlowConfig={optixFlowConfig}
                  />
                </AspectRatio>
              </div>
              <div className="absolute right-[5%] bottom-0 w-[40%] overflow-hidden rounded-tl-lg rounded-tr-lg shadow-md">
                <AspectRatio ratio={0.776119403 / 1}>
                  <Img
                    src={imagePlaceholders[13]}
                    alt=""
                    className="block h-full w-full object-cover object-top"
                    optixFlowConfig={optixFlowConfig}
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
