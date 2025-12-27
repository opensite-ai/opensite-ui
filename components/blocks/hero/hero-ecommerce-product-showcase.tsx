"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroEcommerceProductShowcaseProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroEcommerceProductShowcase({
  className,
  optixFlowConfig,
}: HeroEcommerceProductShowcaseProps): React.JSX.Element {
  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl bg-muted">
                  <Img
                    src={imagePlaceholders[22]}
                    alt="Product 1"
                    className="aspect-[3/4] w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                <div className="overflow-hidden rounded-2xl bg-muted">
                  <Img
                    src={imagePlaceholders[23]}
                    alt="Product 2"
                    className="aspect-square w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="overflow-hidden rounded-2xl bg-muted">
                  <Img
                    src={imagePlaceholders[24]}
                    alt="Product 3"
                    className="aspect-square w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                <div className="overflow-hidden rounded-2xl bg-muted">
                  <Img
                    src={imagePlaceholders[25]}
                    alt="Product 4"
                    className="aspect-[3/4] w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 flex flex-col gap-8 lg:order-2">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
              <DynamicIcon name="lucide/sparkles" size={16} />
              <span>New Collection</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Discover our latest arrivals
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our curated collection of premium products designed to
              elevate your everyday experience. Quality craftsmanship meets
              modern design.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Pressable
                href="#"
                asButton
                variant="default"
                size="lg"
              >
                Shop now
                <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
              </Pressable>
              <Pressable
                href="#"
                asButton
                variant="outline"
                size="lg"
              >
                View catalog
              </Pressable>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50K+</div>
                <div className="text-sm text-muted-foreground">Happy customers</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">4.9</div>
                <div className="text-sm text-muted-foreground">Average rating</div>
              </div>
              <div className="h-12 w-px bg-border"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">Free</div>
                <div className="text-sm text-muted-foreground">Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
