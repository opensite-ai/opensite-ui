"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import type { CarouselApi } from "../../ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Progress } from "../../ui/progress";

export interface FeatureCarouselProgressItem {
  /**
   * Icon name in format: prefix/name (e.g., "lucide/code")
   */
  icon: string;
  /**
   * Feature title
   */
  title: string;
  /**
   * Feature description
   */
  description: string;
}

export interface FeatureCarouselProgressProps {
  /**
   * Badge text displayed above the heading
   */
  badge?: string;
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Label for the carousel section
   */
  carouselLabel?: string;
  /**
   * Array of feature slides
   */
  slides?: FeatureCarouselProgressItem[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * Feature Carousel Progress - Carousel-based feature display with progress indicator
 * and navigation controls.
 *
 * Layout: Centered heading with badge, horizontal carousel with progress bar.
 * Key features: Progress indicator, carousel navigation, icon badges, responsive cards.
 * Best for: Feature tours, capability showcases, multi-step explanations.
 *
 * @example
 * ```tsx
 * <FeatureCarouselProgress
 *   badge="Features"
 *   title="This is where your features go"
 *   slides={[
 *     { icon: "lucide/code", title: "Integrations", description: "Connect with your tools" },
 *     { icon: "lucide/zap", title: "Automation", description: "Streamline workflows" },
 *   ]}
 * />
 * ```
 */
export function FeatureCarouselProgress({
  badge = "Badge",
  title = "This is where your features go",
  carouselLabel = "Rules",
  slides = [
    {
      icon: "lucide/code",
      title: "Integrations",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    },
    {
      icon: "lucide/arrow-up-down",
      title: "Automation",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    },
    {
      icon: "lucide/redo",
      title: "Customization",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    },
    {
      icon: "lucide/arrow-down-to-line",
      title: "Collaboration",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    },
    {
      icon: "lucide/repeat",
      title: "Security",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    },
    {
      icon: "lucide/scan",
      title: "Performance",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    },
    {
      icon: "lucide/scaling",
      title: "Scalability",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    },
  ],
  className,
}: FeatureCarouselProgressProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [progress, setProgress] = useState(Math.floor(100 / slides.length));

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("scroll", ({ scrollProgress }) => {
      setProgress(
        Math.max(1 / slides.length, Math.min(1, scrollProgress())) * 100
      );
    });
  }, [api, slides.length]);

  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-7xl">
        <div className="mb-10 flex flex-col items-center gap-6 md:mb-20">
          {badge && <Badge variant="outline">{badge}</Badge>}
          {title && (
            <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
              {title}
            </h2>
          )}
        </div>
        <Carousel className="w-full" setApi={setApi}>
          <div className="mb-4 flex justify-between px-1 md:mb-5">
            <p className="font-medium">{carouselLabel}</p>
            <div className="flex items-center space-x-2">
              <div className="mr-2 hidden items-center gap-3 text-xs text-muted-foreground md:flex">
                <span>01</span>
                <Progress value={progress} className="h-[2px] w-52" />
                <span>0{slides.length}</span>
              </div>
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem
                key={index}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col justify-center p-6">
                      <div>
                        <span className="mb-5 flex size-8 items-center justify-center rounded-full bg-accent lg:size-10">
                          <DynamicIcon name={slide.icon} size={16} />
                        </span>
                        <p className="text-xl font-semibold md:text-2xl lg:text-2xl">
                          {slide.title}
                        </p>
                        <p className="pt-2 text-muted-foreground">
                          {slide.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
