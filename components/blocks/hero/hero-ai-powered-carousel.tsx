"use client";

import * as React from "react";
import { useMemo } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn, getTextColor } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, ImageItem, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface HeroAiPoweredCarouselProps {
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Badge tagline text
   */
  badgeTagline?: React.ReactNode;
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
   * Images for mobile carousel (first row)
   */
  mobileCarouselImages1?: ImageItem[];
  /**
   * Images for mobile carousel (second row)
   */
  mobileCarouselImages2?: ImageItem[];
  /**
   * Images for desktop carousel (first column)
   */
  desktopCarouselImages1?: ImageItem[];
  /**
   * Images for desktop carousel (second column)
   */
  desktopCarouselImages2?: ImageItem[];
  /**
   * Custom slot for carousel content (overrides all carousel images)
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
   * Additional CSS classes for the content column
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the badge container
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroAiPoweredCarousel({
  badge,
  badgeTagline,
  heading,
  description,
  actions,
  actionsSlot,
  mobileCarouselImages1,
  mobileCarouselImages2,
  desktopCarouselImages1,
  desktopCarouselImages2,
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
  optixFlowConfig,
}: HeroAiPoweredCarouselProps): React.JSX.Element {
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
      className={className}
    >
      <div className={cn("container", containerClassName)}>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className={cn("mx-auto", contentClassName)}>
            {(badge || badgeTagline) && (
              <div className={cn("flex w-fit items-center gap-2 rounded-full border px-2.5 py-1.5 text-xs font-medium", badgeClassName)}>
                {badge && <Badge>{badge}</Badge>}
                {badgeTagline}
              </div>
            )}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("mt-10 mb-4 text-3xl font-semibold lg:text-5xl", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("mx-auto lg:text-lg", getTextColor(background, "muted"), descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            {(actionsSlot || (actions && actions.length > 0)) && (
              <div className={cn("mt-10 flex flex-col gap-2 sm:flex-row", actionsClassName)}>
                {renderActions}
              </div>
            )}
          </div>
          {carouselSlot ? carouselSlot : (
            <>
              <div className="flex flex-col gap-8 lg:hidden">
                {mobileCarouselImages1 && mobileCarouselImages1.length > 0 && (
                  <Carousel
                    opts={{
                      loop: true,
                    }}
                    plugins={[
                      AutoScroll({
                        speed: 0.8,
                      }),
                    ]}
                    className="-mx-7"
                  >
                    <CarouselContent className="max-h-[350px]">
                      {mobileCarouselImages1.map((image, index) => (
                        <CarouselItem key={index} className="max-w-96">
                          <Img
                            src={image.src}
                            alt={image.alt}
                            className={image.className}
                            optixFlowConfig={optixFlowConfig}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                )}
                {mobileCarouselImages2 && mobileCarouselImages2.length > 0 && (
                  <Carousel
                    opts={{
                      loop: true,
                    }}
                    plugins={[
                      AutoScroll({
                        speed: 0.8,
                        direction: "backward",
                      }),
                    ]}
                    className="-mx-7"
                  >
                    <CarouselContent className="max-h-[350px]">
                      {mobileCarouselImages2.map((image, index) => (
                        <CarouselItem key={index} className="max-w-96">
                          <Img
                            src={image.src}
                            alt={image.alt}
                            className={image.className}
                            optixFlowConfig={optixFlowConfig}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                )}
              </div>
              <div className="hidden grid-cols-2 gap-8 lg:grid">
                {desktopCarouselImages1 && desktopCarouselImages1.length > 0 && (
                  <Carousel
                    opts={{
                      loop: true,
                    }}
                    plugins={[
                      AutoScroll({
                        speed: 0.8,
                      }),
                    ]}
                    orientation="vertical"
                  >
                    <CarouselContent className="max-h-[600px]">
                      {desktopCarouselImages1.map((image, index) => (
                        <CarouselItem key={index}>
                          <Img
                            src={image.src}
                            alt={image.alt}
                            className={image.className}
                            optixFlowConfig={optixFlowConfig}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                )}
                {desktopCarouselImages2 && desktopCarouselImages2.length > 0 && (
                  <Carousel
                    opts={{
                      loop: true,
                    }}
                    plugins={[
                      AutoScroll({
                        speed: 0.8,
                        direction: "backward",
                      }),
                    ]}
                    orientation="vertical"
                  >
                    <CarouselContent className="max-h-[600px]">
                      {desktopCarouselImages2.map((image, index) => (
                        <CarouselItem key={index}>
                          <Img
                            src={image.src}
                            alt={image.alt}
                            className={image.className}
                            optixFlowConfig={optixFlowConfig}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
