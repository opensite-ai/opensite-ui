"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroStartupLaunchCtaProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroStartupLaunchCta({
  className,
  optixFlowConfig,
}: HeroStartupLaunchCtaProps): React.JSX.Element {
  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
              <DynamicIcon name="lucide/rocket" size={16} />
              <span>Now launching</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Launch your startup in weeks, not months
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to go from idea to launch. Our platform
              provides the tools, templates, and guidance to build your MVP
              fast.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Pressable
                href="#"
                asButton
                variant="default"
                size="lg"
              >
                Start building free
                <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
              </Pressable>
              <Pressable
                href="#"
                asButton
                variant="outline"
                size="lg"
              >
                See success stories
              </Pressable>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[2, 3, 4, 5].map((idx) => (
                  <Img
                    key={idx}
                    src={imagePlaceholders[idx]}
                    alt=""
                    className="h-10 w-10 rounded-full border-2 border-background object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                ))}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-foreground">500+</span>
                <span className="text-muted-foreground"> startups launched</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-blue-50 p-8">
              <Img
                src={imagePlaceholders[6]}
                alt="Startup dashboard"
                className="w-full rounded-lg shadow-xl"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
            <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-xl bg-background p-4 shadow-lg">
              <Img
                src={logoPlaceholders.logoMark}
                alt=""
                className="h-10 w-10"
                optixFlowConfig={optixFlowConfig}
              />
              <div>
                <div className="font-semibold text-foreground">YC Backed</div>
                <div className="text-sm text-muted-foreground">W24 Batch</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
