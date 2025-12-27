"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import { buttonVariants } from "../../../lib/button-variants";

export interface HeroPatternLogoTechStackProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroPatternLogoTechStack({
  className,
  optixFlowConfig,
}: HeroPatternLogoTechStackProps): React.JSX.Element {
  return (
    <section className={cn("relative overflow-hidden py-32", className)}>
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <Img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
          optixFlowConfig={optixFlowConfig}
        />
      </div>
      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <Img
                src={logoPlaceholders.logoMark}
                alt="logo"
                className="h-16"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">
                Build your next project with{" "}
                <span className="text-primary">Blocks</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
                doloremque mollitia fugiat omnis! Porro facilis quo animi
                consequatur. Explicabo.
              </p>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <Pressable href="#" asButton variant="default" className="shadow-sm transition-shadow hover:shadow">
                Get Started
              </Pressable>
              <Pressable href="#" asButton variant="outline" className="group">
                Learn more{" "}
                <DynamicIcon name="lucide/external-link" size={16} className="ml-2 transition-transform group-hover:translate-x-0.5" />
              </Pressable>
            </div>
            <div className="mt-20 flex flex-col items-center gap-5">
              <p className="font-medium text-muted-foreground lg:text-left">
                Built with open-source technologies
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Pressable
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Img
                    src={logoPlaceholders.logoMark}
                    alt="technology logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                    optixFlowConfig={optixFlowConfig}
                  />
                </Pressable>
                <Pressable
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Img
                    src={logoPlaceholders.logoMark}
                    alt="technology logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                    optixFlowConfig={optixFlowConfig}
                  />
                </Pressable>
                <Pressable
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Img
                    src={logoPlaceholders.logoMark}
                    alt="technology logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                    optixFlowConfig={optixFlowConfig}
                  />
                </Pressable>
                <Pressable
                  href="#"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group flex aspect-square h-12 items-center justify-center p-0",
                  )}
                >
                  <Img
                    src={logoPlaceholders.logoMark}
                    alt="technology logo"
                    className="h-6 saturate-0 transition-all group-hover:saturate-100"
                    optixFlowConfig={optixFlowConfig}
                  />
                </Pressable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
