"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface AboutStreamlineTeamProps {
  className?: string;
  title?: string;
  description?: string;
  primaryImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  teamTitle?: string;
  teamDescription?: string;
  teamCta?: {
    text: string;
    url: string;
  };
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
    icon: "lucide/zap",
    title: "Lightning Fast",
    description: "Build and deploy in minutes, not months.",
  },
  {
    icon: "lucide/shield",
    title: "Enterprise Security",
    description: "Bank-grade security for all your data.",
  },
  {
    icon: "lucide/users",
    title: "Team Collaboration",
    description: "Work together seamlessly across teams.",
  },
];

const defaultProps: Partial<AboutStreamlineTeamProps> = {
  title: "Streamline Your Workflow",
  description:
    "Our platform helps teams work smarter, not harder. With intuitive tools and powerful automation, you can focus on what matters most.",
  teamTitle: "Meet Our Team",
  teamDescription:
    "We're a diverse group of thinkers, builders, and dreamers united by a common goal: making software development accessible to everyone.",
  teamCta: {
    text: "Join Our Team",
    url: "#",
  },
  features: defaultFeatures,
};

export function AboutStreamlineTeam({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  primaryImage,
  secondaryImage,
  teamTitle = defaultProps.teamTitle,
  teamDescription = defaultProps.teamDescription,
  teamCta = defaultProps.teamCta,
  features = defaultProps.features,
  optixFlowConfig,
}: AboutStreamlineTeamProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            {primaryImage && (
              <Img
                src={primaryImage.src}
                alt={primaryImage.alt}
                className="rounded-2xl object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            )}
            {secondaryImage && (
              <Img
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                className="absolute -bottom-8 -right-8 h-48 w-48 rounded-xl border-4 border-background object-cover shadow-lg"
                optixFlowConfig={optixFlowConfig}
              />
            )}
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">{description}</p>
            {features && features.length > 0 && (
              <div className="mt-10 space-y-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <DynamicIcon
                        name={feature.icon}
                        size={24}
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-32 rounded-2xl bg-muted p-8 md:p-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold md:text-4xl">{teamTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {teamDescription}
            </p>
            {teamCta && (
              <Pressable
                href={teamCta.url}
                size="lg"
                variant="default"
                asButton
                className="mt-8"
              >
                {teamCta.text}
                <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
              </Pressable>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
