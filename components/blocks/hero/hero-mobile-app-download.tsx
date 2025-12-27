"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface HeroMobileAppDownloadProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

export function HeroMobileAppDownload({
  className,
  optixFlowConfig,
}: HeroMobileAppDownloadProps): React.JSX.Element {
  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">
              <DynamicIcon name="lucide/smartphone" size={16} />
              <span>Mobile App</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Your pocket companion for productivity
            </h1>
            <p className="text-lg text-muted-foreground">
              Take your work anywhere with our powerful mobile app. Stay
              connected, collaborate on the go, and never miss an update.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Pressable
                href="#"
                asButton
                variant="default"
                size="lg"
                className="flex items-center gap-2"
              >
                <DynamicIcon name="lucide/apple" size={20} />
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </Pressable>
              <Pressable
                href="#"
                asButton
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <DynamicIcon name="lucide/play" size={20} />
                <div className="text-left">
                  <div className="text-xs opacity-80">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </Pressable>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <DynamicIcon key={i} name="lucide/star" size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                4.9 rating from 50K+ reviews
              </span>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative">
              <Img
                src={imagePlaceholders[26]}
                alt="Mobile app screenshot"
                className="w-64 rounded-3xl shadow-2xl"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="absolute -right-8 top-1/4 w-48 rounded-2xl bg-background p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <DynamicIcon name="lucide/check" size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Task completed</div>
                    <div className="text-xs text-muted-foreground">Just now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
