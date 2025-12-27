"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroDesignShowcaseLogosProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroDesignShowcaseLogos({
  className,
  optixFlowConfig,
}: HeroDesignShowcaseLogosProps): React.JSX.Element {
  return (
    <section className={cn("bg-background py-12 md:py-20", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-8">
          <div className="flex max-w-[920px] flex-col items-center gap-6">
            <h1 className="mb-6 text-center text-[2.75rem] leading-tight font-semibold text-foreground md:text-[3.5rem] lg:text-[4.375rem]">
              Unveil great design from the real world.
            </h1>
            <p className="text-center text-xl text-muted-foreground">
              Showcasing more than 500,000 screens and 2,000 iOS, Android, and
              Web apps — fresh content added every week.
            </p>
          </div>
          <div>
            <div className="mt-3 flex items-center justify-center gap-3">
              <Pressable
                href="#"
                asButton
                variant="default"
                className="h-fit rounded-full border border-primary px-4 py-3 text-base font-semibold"
              >
                Join for free
              </Pressable>
              <Pressable
                href="#"
                asButton
                variant="outline"
                className="flex h-fit items-center justify-center gap-2 rounded-full px-4 py-3 text-base font-semibold"
              >
                <div>See our plans</div>
                <span className="flex h-6 w-6 rounded-full bg-zinc-100">
                  <DynamicIcon name="lucide/arrow-right" size={16} className="m-auto" />
                </span>
              </Pressable>
            </div>
          </div>
          <div>
            <div className="py-10 md:py-16">
              <p className="text-center text-sm text-foreground/60">
                Trusted by design teams at
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:flex-nowrap">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <Img
                    key={idx}
                    src={logoPlaceholders.darkHorizontalLogo}
                    alt=""
                    className="block h-3.5 w-auto opacity-50 md:h-5"
                    optixFlowConfig={optixFlowConfig}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full xl:px-8">
        <div className="relative mx-auto aspect-[1.259253731/1] w-full max-w-[96rem] overflow-hidden bg-zinc-950 xl:aspect-[1.896296296/1] xl:rounded-3xl">
          <div className="absolute -bottom-1 left-[56%] aspect-[1.151758794/-1] w-[100%] -translate-x-1/2 overflow-hidden rounded-tl-2xl bg-background xl:left-1/2 xl:aspect-[1.933988764/1] xl:w-[87.5%] xl:rounded-tr-2xl">
            <Img
              src={imagePlaceholders[83]}
              alt=""
              className="w-full object-cover object-top-left"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
