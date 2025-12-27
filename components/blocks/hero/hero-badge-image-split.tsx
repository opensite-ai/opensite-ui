"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroBadgeImageSplitProps {
  badge?: string;
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  image?: {
    src: string;
    alt: string;
  };
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroBadgeImageSplit({
  badge = "Your Website Builder",
  heading = "Blocks Built With React & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  buttons = {
    primary: {
      text: "Discover all components",
      url: "#",
    },
    secondary: {
      text: "View on GitHub",
      url: "#",
    },
  },
  image = {
    src: imagePlaceholders[0],
    alt: "Hero section demo image showing interface components",
  },
  className,
  optixFlowConfig,
}: HeroBadgeImageSplitProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="outline">
                {badge}
                <DynamicIcon name="lucide/arrow-up-right" size={16} className="ml-2" />
              </Badge>
            )}
            <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
              {heading}
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              {description}
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Pressable href={buttons.primary.url} asButton variant="default" className="w-full sm:w-auto">
                  {buttons.primary.text}
                </Pressable>
              )}
              {buttons.secondary && (
                <Pressable href={buttons.secondary.url} asButton variant="outline" className="w-full sm:w-auto">
                  {buttons.secondary.text}
                  <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
                </Pressable>
              )}
            </div>
          </div>
          <Img
            src={image.src}
            alt={image.alt}
            className="max-h-96 w-full rounded-md object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    </section>
  );
}
