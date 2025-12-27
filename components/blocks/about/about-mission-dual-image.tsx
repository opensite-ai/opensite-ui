"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface AboutMissionDualImageProps {
  className?: string;
  missionTitle?: string;
  missionContent?: string;
  visionTitle?: string;
  visionContent?: string;
  primaryImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  cta?: {
    text: string;
    url: string;
  };
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultProps: Partial<AboutMissionDualImageProps> = {
  missionTitle: "Our Mission",
  missionContent:
    "To democratize software development by providing intuitive tools that empower anyone to build professional applications. We believe that the ability to create software should not be limited to those with technical expertise.",
  visionTitle: "Our Vision",
  visionContent:
    "A world where every idea can become reality. We envision a future where the barrier between imagination and implementation is eliminated, enabling unprecedented innovation and creativity.",
  cta: {
    text: "Join Our Journey",
    url: "#",
  },
};

export function AboutMissionDualImage({
  className,
  missionTitle = defaultProps.missionTitle,
  missionContent = defaultProps.missionContent,
  visionTitle = defaultProps.visionTitle,
  visionContent = defaultProps.visionContent,
  primaryImage,
  secondaryImage,
  cta = defaultProps.cta,
  optixFlowConfig,
}: AboutMissionDualImageProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {missionTitle}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {missionContent}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                {visionTitle}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                {visionContent}
              </p>
            </div>
            {cta && (
              <Pressable
                href={cta.url}
                size="lg"
                variant="default"
                asButton
                className="mt-8 w-fit"
              >
                {cta.text}
                <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
              </Pressable>
            )}
          </div>

          <div className="relative grid grid-cols-2 gap-4">
            {primaryImage && (
              <Img
                src={primaryImage.src}
                alt={primaryImage.alt}
                className="h-full rounded-2xl object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            )}
            {secondaryImage && (
              <Img
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                className="mt-12 h-full rounded-2xl object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
