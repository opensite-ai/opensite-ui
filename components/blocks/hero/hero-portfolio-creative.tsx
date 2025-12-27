"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroPortfolioCreativeProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroPortfolioCreative({
  className,
  optixFlowConfig,
}: HeroPortfolioCreativeProps): React.JSX.Element {
  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-full">
                <Img
                  src={imagePlaceholders[28]}
                  alt="Profile"
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Alex Johnson</h2>
                <p className="text-sm text-muted-foreground">Creative Director & Designer</p>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Crafting digital experiences that inspire
            </h1>
            <p className="text-lg text-muted-foreground">
              I help brands tell their stories through thoughtful design and
              strategic thinking. With 10+ years of experience, I&apos;ve worked
              with startups and Fortune 500 companies alike.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Pressable
                href="#"
                asButton
                variant="default"
                size="lg"
              >
                View my work
                <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
              </Pressable>
              <Pressable
                href="#"
                asButton
                variant="outline"
                size="lg"
              >
                Get in touch
              </Pressable>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <Pressable href="#" className="text-muted-foreground hover:text-foreground">
                <DynamicIcon name="lucide/dribbble" size={20} />
              </Pressable>
              <Pressable href="#" className="text-muted-foreground hover:text-foreground">
                <DynamicIcon name="lucide/twitter" size={20} />
              </Pressable>
              <Pressable href="#" className="text-muted-foreground hover:text-foreground">
                <DynamicIcon name="lucide/linkedin" size={20} />
              </Pressable>
              <Pressable href="#" className="text-muted-foreground hover:text-foreground">
                <DynamicIcon name="lucide/instagram" size={20} />
              </Pressable>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl">
                  <Img
                    src={imagePlaceholders[29]}
                    alt="Project 1"
                    className="aspect-[3/4] w-full object-cover transition-transform hover:scale-105"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <Img
                    src={imagePlaceholders[30]}
                    alt="Project 2"
                    className="aspect-square w-full object-cover transition-transform hover:scale-105"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="overflow-hidden rounded-2xl">
                  <Img
                    src={imagePlaceholders[31]}
                    alt="Project 3"
                    className="aspect-square w-full object-cover transition-transform hover:scale-105"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <Img
                    src={imagePlaceholders[32]}
                    alt="Project 4"
                    className="aspect-[3/4] w-full object-cover transition-transform hover:scale-105"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
