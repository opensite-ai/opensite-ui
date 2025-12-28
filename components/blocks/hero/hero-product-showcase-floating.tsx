"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroProductShowcaseFloatingProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroProductShowcaseFloating({
  className,
  optixFlowConfig,
}: HeroProductShowcaseFloatingProps): React.JSX.Element {
  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-4/3 overflow-hidden rounded-2xl bg-linear-to-br from-primary/20 to-purple-500/20 p-8">
                <Img
                  src={imagePlaceholders[102]}
                  alt="Product interface"
                  className="h-full w-full rounded-lg object-cover shadow-2xl"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <div className="absolute -top-4 -right-4 rounded-xl bg-background p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <DynamicIcon
                      name="lucide/trending-up"
                      size={20}
                      className="text-green-600"
                    />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      +127%
                    </div>
                    <div className="text-xs text-muted-foreground">Growth</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-background p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[103, 104, 105].map((idx) => (
                      <Img
                        key={idx}
                        src={imagePlaceholders[idx]}
                        alt=""
                        className="h-8 w-8 rounded-full border-2 border-background object-cover"
                        optixFlowConfig={optixFlowConfig}
                      />
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-foreground">2.5K+</div>
                    <div className="text-muted-foreground">Active users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 flex flex-col gap-8 lg:order-2">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <DynamicIcon name="lucide/rocket" size={16} />
              <span>Launch faster</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Ship products your customers will love
            </h1>
            <p className="text-lg text-muted-foreground">
              From idea to launch in record time. Our platform gives you
              everything you need to build, test, and deploy amazing products.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Pressable href="#" asButton variant="default" size="lg">
                Start building
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={16}
                  className="ml-2"
                />
              </Pressable>
              <Pressable href="#" asButton variant="outline" size="lg">
                See examples
              </Pressable>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
