"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Input } from "../../ui/input";

export interface HeroSaasDashboardPreviewProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroSaasDashboardPreview({
  className,
  optixFlowConfig,
}: HeroSaasDashboardPreviewProps): React.JSX.Element {
  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
            <DynamicIcon
              name="lucide/sparkles"
              size={16}
              className="text-primary"
            />
            <span>AI-powered analytics</span>
          </div>
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Understand your data like never before
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Get actionable insights from your data with our AI-powered analytics
            platform. No data science degree required.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <div className="flex w-full max-w-md items-center gap-2">
              <Input
                type="email"
                placeholder="Enter your work email"
                className="h-12 flex-1"
              />
              <Pressable
                href="#"
                asButton
                variant="default"
                className="h-12 px-6"
              >
                Get started
              </Pressable>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Free 14-day trial. No credit card required.
          </p>
        </div>
        <div className="relative mt-20">
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10 pointer-events-none"></div>
          <div className="overflow-hidden rounded-xl border border-border bg-muted/30 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center text-sm text-muted-foreground">
                dashboard.example.com
              </div>
            </div>
            <Img
              src={imagePlaceholders[106]}
              alt="Dashboard preview"
              className="w-full"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
