"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface AboutMissionFeaturesProps {
  className?: string;
  title?: string;
  description?: string;
  missionLabel?: string;
  missionText?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  missionBackgroundImage?: {
    src: string;
    alt: string;
  };
  featuresTitle?: string;
  featuresDescription?: string;
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultFeatures = [
  {
    icon: "lucide/files",
    title: "Being radically open",
    description:
      "We believe there's no room for big egos and there's always time to help each other. We strive to give and receive feedback, ideas, perspectives",
  },
  {
    icon: "lucide/circle-arrow-right",
    title: "Moving the needle",
    description:
      "Boldly, bravely and with clear aims. We seek out the big opportunities and double down on the most important things to work on.",
  },
  {
    icon: "lucide/settings",
    title: "Optimizing for empowerment",
    description:
      "We believe that everyone should be empowered to do whatever they think is in the company's best interests.",
  },
];

const defaultProps: Partial<AboutMissionFeaturesProps> = {
  title: "About Us",
  description:
    "Opensite AI makes it easy to build customer portals, CRMs, internal tools, and other business applications for your team. In minutes, not months.",
  missionLabel: "OUR MISSION",
  missionText:
    "We believe that building software should be insanely easy. That everyone should have the freedom to create the tools they need, without any developers, designers or drama.",
  featuresTitle: "We make creating software easy.",
  featuresDescription:
    "We aim to help empower 1,000,000 teams to create their own software. Here is how we plan on doing it.",
  features: defaultFeatures,
};

export function AboutMissionFeatures({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  missionLabel = defaultProps.missionLabel,
  missionText = defaultProps.missionText,
  mainImage,
  missionBackgroundImage,
  featuresTitle = defaultProps.featuresTitle,
  featuresDescription = defaultProps.featuresDescription,
  features = defaultProps.features,
  optixFlowConfig,
}: AboutMissionFeaturesProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col gap-16 lg:gap-28">
        <div className="flex flex-col gap-4 lg:gap-8">
          <h1 className="text-4xl font-semibold tracking-tighter lg:text-7xl">
            {title}
          </h1>
          <p className="max-w-xl text-xl">{description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {mainImage && (
            <Img
              src={mainImage.src}
              alt={mainImage.alt}
              className="size-full max-h-96 rounded-2xl object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          )}
          <div
            className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10"
            style={
              missionBackgroundImage
                ? {
                    backgroundImage: `url(${missionBackgroundImage.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          >
            <p className="text-sm font-semibold text-white">{missionLabel}</p>
            <p className="text-lg font-medium text-white">{missionText}</p>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-20">
          <div className="max-w-xl">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight md:text-5xl">
              {featuresTitle}
            </h2>
            <p className="text-lg text-muted-foreground">
              {featuresDescription}
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {features?.map((feature, idx) => (
              <div className="flex flex-col" key={idx}>
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
                  <DynamicIcon name={feature.icon} size={20} />
                </div>
                <h3 className="mt-2 mb-3 text-lg font-semibold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
