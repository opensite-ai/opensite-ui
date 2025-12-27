"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Input } from "../../ui/input";

export interface HeroSplitImageNewsletterProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroSplitImageNewsletter({
  className,
  optixFlowConfig,
}: HeroSplitImageNewsletterProps): React.JSX.Element {
  return (
    <section
      className={cn(
        "relative flex min-h-screen items-center justify-center bg-background py-14 font-sans",
        className,
      )}
    >
      <div className="container flex flex-col items-center gap-10 lg:flex-row lg:gap-20">
        <div className="flex flex-col gap-8 lg:w-1/2">
          <h1 className="text-5xl font-bold text-foreground md:text-6xl lg:text-7xl">
            Discover the future of design
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Join our newsletter and stay updated with the latest trends,
            tutorials, and resources in the design world.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12 flex-1 rounded-full px-6"
            />
            <Pressable
              href="#"
              asButton
              variant="default"
              className="h-12 rounded-full px-8 font-semibold"
            >
              Subscribe
              <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
            </Pressable>
          </div>
          <p className="text-sm text-muted-foreground">
            No spam, unsubscribe at any time.
          </p>
        </div>
        <div className="relative lg:w-1/2">
          <Img
            src={imagePlaceholders[85]}
            alt="Design showcase"
            className="w-full rounded-2xl object-cover shadow-2xl"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    </section>
  );
}
