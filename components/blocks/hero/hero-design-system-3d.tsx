"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroDesignSystem3dProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroDesignSystem3d({
  className,
  optixFlowConfig,
}: HeroDesignSystem3dProps): React.JSX.Element {
  return (
    <section className={cn("bg-muted pt-12 font-sans md:pt-20", className)}>
      <div className="mx-auto max-w-[99rem] px-0 sm:px-8">
        <div className="container px-4">
          <div className="mx-auto flex max-w-[25rem] flex-col items-center gap-6 sm:max-w-[31.25rem] lg:max-w-[40rem]">
            <div className="flex items-center justify-center gap-2">
              <DynamicIcon name="lucide/star" size={20} className="fill-black stroke-black" />
              <p className="text-sm text-nowrap">
                Trusted by over 7,000 customers
              </p>
            </div>
            <div className="mb-2">
              <h1 className="text-center text-[2.8125rem] leading-none font-bold sm:text-[3.9375rem] lg:text-[5.3125rem]">
                Design system that delivers
              </h1>
            </div>
            <p className="text-center text-base leading-snug text-balance text-muted-foreground sm:text-2xl">
              Create, prototype, and personalize any design—clean and
              effortless, in just minutes.
            </p>
            <div className="flex w-full flex-wrap items-center gap-4 md:w-fit">
              <Pressable
                href="#"
                asButton
                variant="secondary"
                className="group flex h-fit min-w-[11.25rem] flex-1 items-center justify-center gap-1 rounded-[5rem] border-2 border-black px-4 py-3 text-base font-semibold md:min-w-fit md:flex-none"
              >
                <Img
                  src={logoPlaceholders.logoMark}
                  alt=""
                  className="block size-6 shrink-0"
                  optixFlowConfig={optixFlowConfig}
                />
                <p className="text-nowrap transition-all duration-300 ease-in-out group-hover:text-primary">
                  Preview
                </p>
                <DynamicIcon name="lucide/move-up-right" size={24} className="shrink-0 stroke-black transition-all duration-300 ease-in-out group-hover:stroke-primary" />
              </Pressable>
              <Pressable
                href="#"
                asButton
                variant="default"
                className="group flex h-fit min-w-[11.25rem] flex-1 items-center justify-center gap-1 rounded-[5rem] border-2 border-primary bg-primary px-4 py-3 text-base font-semibold text-nowrap text-white md:min-w-fit md:flex-none"
              >
                Get Module
              </Pressable>
            </div>
          </div>
        </div>
        <div className="relative mt-16 aspect-[1.2/1] overflow-hidden sm:-right-[10%] sm:right-auto sm:mt-28 sm:aspect-[2.788990826/1]">
          <div className="absolute top-[11%] left-[8%] z-10 aspect-[0.7/1] w-[80%] sm:left-[4%] sm:w-[45%]">
            <div className="size-full [transform:rotateY(-30deg)_rotateX(-18deg)_rotate(-4deg)]">
              <Img
                src={imagePlaceholders[94]}
                alt=""
                className="block size-full object-cover object-center"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
          <div className="absolute top-0 left-[70%] z-20 aspect-[0.7/1] w-[73%] -translate-x-1/2 sm:left-1/2 sm:w-[38%]">
            <div className="size-full [transform:rotateY(-30deg)_rotateX(-18deg)_rotate(-4deg)] shadow-[-25px_0px_20px_0px_rgba(0,0,0,.04)]">
              <Img
                src={imagePlaceholders[95]}
                alt=""
                className="block size-full object-cover object-center"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
          <div className="absolute top-[3%] -right-[45%] z-30 aspect-[0.7/1] w-[85%] sm:-right-[2%] sm:w-[50%]">
            <div className="size-full [transform:rotateY(-30deg)_rotateX(-18deg)_rotate(-4deg)] shadow-[-25px_0px_20px_0px_rgba(0,0,0,.04)]">
              <Img
                src={imagePlaceholders[96]}
                alt=""
                className="block size-full object-cover object-center"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
