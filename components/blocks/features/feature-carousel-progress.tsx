"use client";

import * as React from "react";
import { useEffect, useState, useMemo, useCallback } from "react";
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
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface FeatureCarouselProgressItem {
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/code")
   */
  iconName?: string;
  /**
   * Feature title content
   */
  title?: React.ReactNode;
  /**
   * Feature description content
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the slide
   */
  className?: string;
  /**
   * Additional CSS classes for the icon wrapper
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
}

export interface FeatureCarouselProgressProps {
  /**
   * Badge content displayed above the heading
   */
  badge?: React.ReactNode;
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Label for the carousel section
   */
  carouselLabel?: React.ReactNode;
  /**
   * Array of feature slides
   */
  slides?: FeatureCarouselProgressItem[];
  /**
   * Custom slot for rendering slides (overrides slides array)
   */
  slidesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the carousel
   */
  carouselClassName?: string;
  /**
   * Additional CSS classes for the carousel controls
   */
  controlsClassName?: string;
  /**
   * Additional CSS classes for the progress bar
   */
  progressClassName?: string;
  /**
   * Additional CSS classes for each slide card
   */
  cardClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
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
 *     { iconName: "lucide/code", title: "Integrations", description: "Connect with your tools" },
 *     { iconName: "lucide/zap", title: "Automation", description: "Streamline workflows" },
 *   ]}
 * />
 * ```
 */
export function FeatureCarouselProgress({
  badge,
  title,
  carouselLabel,
  slides,
  slidesSlot,
  className,
  containerClassName,
  headerClassName,
  badgeClassName,
  titleClassName,
  carouselClassName,
  controlsClassName,
  progressClassName,
  cardClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureCarouselProgressProps): React.JSX.Element {
  const [api, setApi] = useState<CarouselApi>();
  const slidesLength = slides?.length || 1;
  const [progress, setProgress] = useState(Math.floor(100 / slidesLength));

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("scroll", ({ scrollProgress }) => {
      setProgress(
        Math.max(1 / slidesLength, Math.min(1, scrollProgress())) * 100
      );
    });
  }, [api, slidesLength]);

  const renderSlideIcon = useCallback((slide: FeatureCarouselProgressItem) => {
    if (slide.icon) return slide.icon;
    if (slide.iconName) return <DynamicIcon name={slide.iconName} size={16} />;
    return null;
  }, []);

  const slidesContent = useMemo(() => {
    if (slidesSlot) return slidesSlot;
    if (!slides || slides.length === 0) return null;

    return slides.map((slide, index) => (
      <CarouselItem
        key={index}
        className="basis-full md:basis-1/2 lg:basis-1/3"
      >
        <div className="p-1">
          <Card className={cn(cardClassName, slide.className)}>
            <CardContent className="flex flex-col justify-center p-6">
              <div>
                {(slide.icon || slide.iconName) && (
                  <span className={cn("mb-5 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground lg:size-10", slide.iconClassName)}>
                    {renderSlideIcon(slide)}
                  </span>
                )}
                {slide.title && (
                  typeof slide.title === "string" ? (
                    <p className={cn("text-xl font-semibold md:text-2xl lg:text-2xl", slide.titleClassName)}>
                      {slide.title}
                    </p>
                  ) : (
                    <div className={cn("text-xl font-semibold md:text-2xl lg:text-2xl", slide.titleClassName)}>
                      {slide.title}
                    </div>
                  )
                )}
                {slide.description && (
                  typeof slide.description === "string" ? (
                    <p className={cn("pt-2 text-muted-foreground", slide.descriptionClassName)}>
                      {slide.description}
                    </p>
                  ) : (
                    <div className={cn("pt-2 text-muted-foreground", slide.descriptionClassName)}>
                      {slide.description}
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
    ));
  }, [slidesSlot, slides, cardClassName, renderSlideIcon]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={cn("max-w-7xl", containerClassName)}
    >
      <div className={cn("mb-10 flex flex-col items-center gap-6 md:mb-20", headerClassName)}>
        {badge && <Badge variant="outline" className={badgeClassName}>{badge}</Badge>}
        {title && (
          typeof title === "string" ? (
            <h2 className={cn("mb-2 text-center text-3xl font-semibold lg:text-5xl", titleClassName)}>
              {title}
            </h2>
          ) : (
            <div className={cn("mb-2 text-center text-3xl font-semibold lg:text-5xl", titleClassName)}>
              {title}
            </div>
          )
        )}
      </div>
      <Carousel className={cn("w-full", carouselClassName)} setApi={setApi}>
        <div className={cn("mb-4 flex justify-between px-1 md:mb-5", controlsClassName)}>
          {carouselLabel && (
            typeof carouselLabel === "string" ? (
              <p className="font-medium">{carouselLabel}</p>
            ) : (
              <div className="font-medium">{carouselLabel}</div>
            )
          )}
          <div className="flex items-center space-x-2">
            <div className="mr-2 hidden items-center gap-3 text-xs text-muted-foreground md:flex">
              <span>01</span>
              <Progress value={progress} className={cn("h-0.5 w-52", progressClassName)} />
              <span>0{slidesLength}</span>
            </div>
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </div>
        <CarouselContent>
          {slidesContent}
        </CarouselContent>
      </Carousel>
    </Section>
  );
}
