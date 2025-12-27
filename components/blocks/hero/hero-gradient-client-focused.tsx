"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroGradientClientFocusedProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroGradientClientFocused({
  className,
  optixFlowConfig,
}: HeroGradientClientFocusedProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "bg-[linear-gradient(#fbf7ec,#e2f1ee)] py-20 text-center",
        className,
      )}
    >
      <div className="container flex flex-col items-center gap-5">
        <h1 className="max-w-2xl text-7xl font-medium text-foreground max-lg:text-5xl">
          Stay front and center with your clients.
        </h1>
        <p className="max-w-2xl text-muted-foreground max-lg:text-sm">
          We enhance client relationships by providing personalized solutions,
          fostering trust, and driving growth.{" "}
        </p>
        <div className="flex items-center gap-2.5 text-lg max-lg:flex-col max-lg:text-base">
          <Pressable href="#" asButton variant="default" className="w-fit rounded-md border px-8 py-1">Meet Us</Pressable>
          <Pressable
            href="#"
            asButton
            variant="secondary"
            className="w-fit rounded-md border px-8 py-1"
          >
            Schedule a Demo
          </Pressable>
        </div>
        <Img
          className="mt-10 w-[50%] rounded-xl shadow-[rgba(50,50,105,0.15)_0px_2px_5px_0px,rgba(0,0,0,0.05)_0px_1px_1px_0px] max-lg:w-full"
          src={imagePlaceholders[25]}
          alt=""
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    </section>
  );
}
