"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface AboutDeveloperStoryProps {
  className?: string;
  title?: string;
  description?: string;
  primaryCta?: {
    text: string;
    url: string;
  };
  secondaryCta?: {
    text: string;
    url: string;
  };
  logos?: Array<{
    src: string;
    alt: string;
  }>;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  storyTitle?: string;
  storyContent?: string;
  storyImage?: {
    src: string;
    alt: string;
  };
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultStats = [
  { value: "200+", label: "Projects Completed" },
  { value: "50+", label: "Happy Clients" },
  { value: "10+", label: "Years Experience" },
];

const defaultProps: Partial<AboutDeveloperStoryProps> = {
  title: "Developer-Focused Solutions for Modern Teams",
  description:
    "We build tools that developers love. Our platform provides the flexibility and power you need to create exceptional applications.",
  primaryCta: {
    text: "Get Started",
    url: "#",
  },
  secondaryCta: {
    text: "Learn More",
    url: "#",
  },
  stats: defaultStats,
  storyTitle: "Our Story",
  storyContent: `We started with a simple idea: make development easier for everyone. Over the years, we've grown into a team of passionate developers who understand the challenges you face.

Our platform is built by developers, for developers. We know what it takes to build great software, and we've created tools that help you do it faster and better.

Today, we serve thousands of developers worldwide, helping them build everything from simple websites to complex enterprise applications.`,
};

export function AboutDeveloperStory({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  primaryCta = defaultProps.primaryCta,
  secondaryCta = defaultProps.secondaryCta,
  logos,
  stats = defaultProps.stats,
  storyTitle = defaultProps.storyTitle,
  storyContent = defaultProps.storyContent,
  storyImage,
  optixFlowConfig,
}: AboutDeveloperStoryProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            {title}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground md:text-xl">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {primaryCta && (
              <Pressable href={primaryCta.url} size="lg" variant="default" asButton>
                {primaryCta.text}
              </Pressable>
            )}
            {secondaryCta && (
              <Pressable href={secondaryCta.url} size="lg" variant="outline" asButton>
                {secondaryCta.text}
                <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
              </Pressable>
            )}
          </div>
        </div>

        {logos && logos.length > 0 && (
          <div className="mt-20 flex flex-wrap items-center justify-center gap-8 opacity-60">
            {logos.map((logo, idx) => (
              <Img
                key={idx}
                src={logo.src}
                alt={logo.alt}
                className="h-8 w-auto grayscale"
                optixFlowConfig={optixFlowConfig}
              />
            ))}
          </div>
        )}

        {stats && stats.length > 0 && (
          <div className="mt-20 grid grid-cols-1 gap-8 border-y py-12 md:grid-cols-3">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl font-bold">{stat.value}</p>
                <p className="mt-2 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">{storyTitle}</h2>
            <p className="mt-6 text-lg text-muted-foreground whitespace-pre-line">
              {storyContent}
            </p>
          </div>
          {storyImage && (
            <Img
              src={storyImage.src}
              alt={storyImage.alt}
              className="rounded-2xl object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          )}
        </div>
      </div>
    </section>
  );
}
