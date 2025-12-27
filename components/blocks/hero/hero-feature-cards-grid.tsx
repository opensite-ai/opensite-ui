"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface HeroFeatureCardsGridProps {
  className?: string;
}

export function HeroFeatureCardsGrid({
  className,
}: HeroFeatureCardsGridProps): React.JSX.Element {
  const features = [
    {
      icon: "lucide/zap",
      title: "Lightning Fast",
      description: "Optimized for speed and performance",
    },
    {
      icon: "lucide/shield",
      title: "Secure by Default",
      description: "Enterprise-grade security built in",
    },
    {
      icon: "lucide/code",
      title: "Developer First",
      description: "APIs and SDKs for every platform",
    },
    {
      icon: "lucide/globe",
      title: "Global Scale",
      description: "Deploy anywhere in the world",
    },
  ];

  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Everything you need to build modern apps
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            A complete platform with all the tools and features you need to
            create, deploy, and scale your applications.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Pressable
              href="#"
              asButton
              variant="default"
              size="lg"
            >
              Get started
              <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
            </Pressable>
            <Pressable
              href="#"
              asButton
              variant="outline"
              size="lg"
            >
              View documentation
            </Pressable>
          </div>
        </div>
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <DynamicIcon name={feature.icon} size={24} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
