"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroStatsSocialProofProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroStatsSocialProof({
  className,
  optixFlowConfig,
}: HeroStatsSocialProofProps): React.JSX.Element {
  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <DynamicIcon name="lucide/trending-up" size={16} />
              <span>Growing fast</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Trusted by thousands of teams worldwide
            </h1>
            <p className="text-lg text-muted-foreground">
              Join the companies that are already using our platform to build
              better products and deliver exceptional experiences.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Pressable
                href="#"
                asButton
                variant="default"
                size="lg"
              >
                Start building
                <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
              </Pressable>
              <Pressable
                href="#"
                asButton
                variant="ghost"
                size="lg"
              >
                Talk to sales
              </Pressable>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Active users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime SLA</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
              <Img
                src={imagePlaceholders[86]}
                alt="Platform dashboard"
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-background p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <DynamicIcon name="lucide/check" size={24} className="text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">All systems operational</div>
                  <div className="text-sm text-muted-foreground">Last checked 2 min ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
