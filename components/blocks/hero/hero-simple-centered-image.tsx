"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroSimpleCenteredImageProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroSimpleCenteredImage({
  className,
  optixFlowConfig,
}: HeroSimpleCenteredImageProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col items-center text-center">
        <h1 className="my-3 text-3xl font-bold text-pretty sm:text-4xl md:my-6 lg:text-6xl">
          Welcome to Our Website
        </h1>
        <p className="mb-6 max-w-xl text-muted-foreground lg:mb-12 lg:text-2xl">
          Elig doloremque mollitia fugiat omnis! Porro facilis quo animi
          consequatur.
        </p>
        <div className="mb-6 flex gap-2 lg:mb-12">
          <Pressable href="#" asButton variant="default">Primary</Pressable>
          <Pressable href="#" asButton variant="outline">Secondary</Pressable>
        </div>
      </div>
      <div className="container">
        <div className="aspect-video [mask-image:linear-gradient(#000_80%,transparent_100%)]">
          <Img
            src={imagePlaceholders[6]}
            alt="placeholder hero"
            className="h-full w-full rounded-md object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    </section>
  );
}
