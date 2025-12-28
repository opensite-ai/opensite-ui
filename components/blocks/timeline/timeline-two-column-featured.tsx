"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface TimelineFeature {
  image: string;
  title: string;
  description: string;
}

export interface TimelineTwoColumnFeaturedProps {
  className?: string;
  heading?: string;
  description?: string;
  buttons?: {
    primary: {
      text: string;
      url: string;
    };
    secondary: {
      text: string;
      url: string;
    };
  };
  features?: TimelineFeature[];
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultFeatures: TimelineFeature[] = [
  {
    image: blockBrandedIconsAndPlaceholders.placeholder4,
    title: "Dedicated Support",
    description:
      "Expanded operations to 5 new countries, reaching millions of new users.",
  },
  {
    image: blockBrandedIconsAndPlaceholders.placeholder5,
    title: "Series B Funding",
    description:
      "Secured $50M in Series B funding to accelerate product development.",
  },
  {
    image: blockBrandedIconsAndPlaceholders.placeholder5,
    title: "Product Launch",
    description: "Successfully launched our flagship product to market.",
  },
  {
    image: blockBrandedIconsAndPlaceholders.placeholder5,
    title: "Company Founded",
    description: "Started with a vision to revolutionize the industry.",
  },
];

const defaultButtons = {
  primary: {
    text: "Start Now",
    url: "#",
  },
  secondary: {
    text: "Book a demo",
    url: "#",
  },
};

export function TimelineTwoColumnFeatured({
  className,
  heading = "Experience the difference with us",
  description = "We believe in creating lasting partnerships with our clients, focusing on long-term success through collaborative innovation and dedicated support.",
  buttons = defaultButtons,
  features = defaultFeatures,
  optixFlowConfig,
}: TimelineTwoColumnFeaturedProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-6xl">
        <div className="relative grid gap-16 md:grid-cols-2">
          <div className="top-40 h-fit md:sticky">
            <h2 className="mt-4 mb-6 text-4xl font-semibold md:text-5xl">
              {heading}
            </h2>
            <p className="font-medium text-muted-foreground md:text-xl">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-4 lg:flex-row">
              <Pressable
                href={buttons.primary.url}
                variant="default"
                size="lg"
                asButton
              >
                {buttons.primary.text}
              </Pressable>
              <Pressable
                href={buttons.secondary.url}
                variant="outline"
                size="lg"
                asButton
              >
                {buttons.secondary.text}
              </Pressable>
            </div>
          </div>
          <div className="flex flex-col gap-12 md:gap-20">
            {features.map((feature, index) => (
              <div key={index} className="rounded-xl border p-2">
                <Img
                  src={feature.image}
                  alt={feature.title}
                  className="aspect-video w-full rounded-xl border border-dashed object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
                <div className="p-6">
                  <h3 className="mb-1 text-2xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
