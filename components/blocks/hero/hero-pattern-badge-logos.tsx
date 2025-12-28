"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroPatternBadgeLogosProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroPatternBadgeLogos({
  className,
  optixFlowConfig,
}: HeroPatternBadgeLogosProps): React.JSX.Element {
  return (
    <section className={cn("relative p-0", className)}>
      <div className="absolute h-full w-full bg-[url('https://cdn.ing/assets/files/record/286186/nbdflpgp4ostrno079hygibsflp3')] mask-[linear-gradient(to_right,var(--color-border),transparent,transparent,var(--color-border))] bg-contain bg-repeat opacity-100 lg:block"></div>
      <div className="container py-28 md:py-32">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
            <Badge
              variant="outline"
              className="transition-colors hover:bg-secondary/20"
            >
              New Release
            </Badge>
            <div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-pretty md:text-5xl lg:text-7xl">
                This is a heading for your new project
              </h1>
              <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Pressable href="#" asButton variant="default">
                Get Started
              </Pressable>
              <Pressable href="#" asButton variant="outline">
                Learn More
              </Pressable>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 lg:mt-16">
              <p className="text-center text-sm text-muted-foreground">
                Powering the next generation of digital products
              </p>
              <div className="grid grid-cols-2 place-items-center items-center justify-center gap-6 opacity-80 sm:grid-cols-4 sm:gap-4">
                <Img
                  src={logoPlaceholders.darkHorizontalLogo}
                  alt="Opensite AI"
                  className="h-6 dark:invert"
                  optixFlowConfig={optixFlowConfig}
                />
                <Img
                  src={logoPlaceholders.darkHorizontalLogo}
                  alt="Partner"
                  className="h-5 dark:invert"
                  optixFlowConfig={optixFlowConfig}
                />
                <Img
                  src={logoPlaceholders.darkHorizontalLogo}
                  alt="Partner"
                  className="h-6 dark:hidden"
                  optixFlowConfig={optixFlowConfig}
                />
                <Img
                  src={logoPlaceholders.lightHorizontalLogo}
                  alt="Partner"
                  className="hidden h-6 dark:block"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
