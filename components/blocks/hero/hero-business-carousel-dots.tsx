"use client";

import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { cn, getNestedCardBg, getTextColor } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Img } from "@page-speed/img";
import type { CarouselApi } from "../../ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, ImageItem, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface HeroBusinessCarouselDotsProps {
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Badge variant
   */
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of carousel images
   */
  carouselImages?: ImageItem[];
  /**
   * Custom slot for carousel content (overrides carouselImages)
   */
  carouselSlot?: React.ReactNode;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the carousel container
   */
  carouselClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroBusinessCarouselDots({
  badge,
  badgeVariant = "outline",
  heading,
  description,
  actions,
  actionsSlot,
  carouselImages,
  carouselSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  carouselClassName,
  optixFlowConfig,
}: HeroBusinessCarouselDotsProps): React.JSX.Element {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    updateCurrent();
    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={actionClassName}
          {...pressableProps}
        >
          {children ?? (
            <>
              {icon}
              {label}
              {iconAfter}
            </>
          )}
        </Pressable>
      );
    });
  }, [actionsSlot, actions]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("overflow-hidden", className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto max-w-5xl text-center", contentClassName)}>
          {badge && (
            <Badge variant={badgeVariant} className={badgeClassName}>
              {badge}
            </Badge>
          )}
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("mt-6 text-4xl font-bold md:text-6xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mt-5 text-lg md:text-xl lg:px-32", getTextColor(background, "muted"), descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {(actionsSlot || (actions && actions.length > 0)) && (
            <div className={cn("mt-8 flex justify-center gap-2", actionsClassName)}>
              {renderActions}
            </div>
          )}
        </div>
        <div className={cn("relative mx-10 mt-16 hidden md:block", carouselClassName)}>
          <div className="absolute top-0 -right-20 -left-20 z-10 h-px bg-[linear-gradient(to_right,transparent,hsl(var(--border))_4%,hsl(var(--border))_96%,transparent)]"></div>
          <div className="absolute bottom-0 -right-20 -left-20 z-10 h-px bg-[linear-gradient(to_right,transparent,hsl(var(--border))_4%,hsl(var(--border))_96%,transparent)]"></div>
          <div className="absolute -top-20 left-0 z-10 h-[calc(100%+160px)] w-px bg-[linear-gradient(to_bottom,transparent,hsl(var(--border))_4%,hsl(var(--border))_96%,transparent)]"></div>
          <div className="absolute -top-20 right-0 z-10 h-[calc(100%+160px)] w-px bg-[linear-gradient(to_bottom,transparent,hsl(var(--border))_4%,hsl(var(--border))_96%,transparent)]"></div>
          {carouselSlot ? carouselSlot : (carouselImages && carouselImages.length > 0) ? (
            <>
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                  {carouselImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <Img
                        src={image.src}
                        alt={image.alt}
                        className={cn("aspect-video w-full rounded-lg object-cover", image.className)}
                        optixFlowConfig={optixFlowConfig}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              <div className="mt-4 flex justify-center gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors",
                      current === index + 1 ? "bg-primary" : getNestedCardBg(background)
                    )}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
