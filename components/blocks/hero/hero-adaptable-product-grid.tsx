"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroAdaptableProductGridProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroAdaptableProductGrid({
  className,
  optixFlowConfig,
}: HeroAdaptableProductGridProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="text-5xl lg:text-7xl">
          The Perfectly Adaptable Product for Your Business
        </h1>
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-lg text-muted-foreground lg:text-xl">
              It delivers unique and customizable products designed for your
              business. Say farewell to rigid options, lengthy launch times, and
              branding limitations. Embrace a product that evolves with your
              needs and fuels your innovation. Highnote is the adaptable
              solution for your business.
            </p>
            <Pressable href="#" asButton size="lg" variant="default" className="mt-12">
              Consult with an Expert
              <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
            </Pressable>
          </div>
          <div className="relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 -top-1 -z-10 mx-auto h-full w-full max-w-3xl bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_100%_at_50%_50%,#000_60%,transparent_100%)] bg-[size:56px_56px] opacity-15"></div>
            <Img
              src={logoPlaceholders.logoMark}
              alt="placeholder"
              className="max-h-[400px]"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
