"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";

export interface AboutStoryHeroProps {
  className?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  heroImage?: {
    src: string;
    alt: string;
  };
  teamInfo?: {
    title: string;
    description: string;
  };
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultProps: Partial<AboutStoryHeroProps> = {
  title: "Our Story",
  subtitle: "Building the future, one line of code at a time",
  content: `We started with a bold idea: what if anyone could build professional software without years of training? This question drove us to create a platform that bridges the gap between imagination and implementation.

Our team combines decades of experience in software engineering, design, and user experience. We've worked at companies like Google, Meta, and Stripe, and we've brought that expertise to bear on solving one of technology's most persistent challenges.

The result is a platform that's powerful enough for professional developers yet accessible enough for anyone with an idea. We're not just building tools—we're democratizing software development.`,
  teamInfo: {
    title: "50+ Team Members",
    description: "Working across 12 countries to bring you the best tools",
  },
};

export function AboutStoryHero({
  className,
  title = defaultProps.title,
  subtitle = defaultProps.subtitle,
  content = defaultProps.content,
  heroImage,
  teamInfo = defaultProps.teamInfo,
  optixFlowConfig,
}: AboutStoryHeroProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {subtitle}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground whitespace-pre-line">
              {content}
            </p>
            {teamInfo && (
              <div className="mt-8 rounded-xl bg-muted p-6">
                <p className="text-2xl font-bold">{teamInfo.title}</p>
                <p className="mt-1 text-muted-foreground">
                  {teamInfo.description}
                </p>
              </div>
            )}
          </div>
          {heroImage && (
            <Img
              src={heroImage.src}
              alt={heroImage.alt}
              className="rounded-2xl object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          )}
        </div>
      </div>
    </section>
  );
}
