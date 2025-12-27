"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroEventRegistrationProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroEventRegistration({
  className,
  optixFlowConfig,
}: HeroEventRegistrationProps): React.JSX.Element {
  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <Badge variant="outline" className="w-fit">
              <DynamicIcon name="lucide/calendar" size={14} className="mr-1" />
              March 15-17, 2025
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              The Future of Tech Conference 2025
            </h1>
            <p className="text-lg text-muted-foreground">
              Join 5,000+ developers, designers, and entrepreneurs for three
              days of inspiring talks, hands-on workshops, and networking
              opportunities.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Pressable
                href="#"
                asButton
                variant="default"
                size="lg"
              >
                Register now
                <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
              </Pressable>
              <Pressable
                href="#"
                asButton
                variant="outline"
                size="lg"
              >
                View schedule
              </Pressable>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Speakers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">30+</div>
                <div className="text-sm text-muted-foreground">Workshops</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">3</div>
                <div className="text-sm text-muted-foreground">Days</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <Img
                src={imagePlaceholders[27]}
                alt="Conference venue"
                className="aspect-[4/3] w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-background p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <DynamicIcon name="lucide/map-pin" size={24} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">San Francisco, CA</div>
                  <div className="text-sm text-muted-foreground">Moscone Center</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
