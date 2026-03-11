"use client";

import * as React from "react";
import { useMemo } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface LogosMarqueeMutedLogoItem {
  /**
   * Company/partner name
   */
  name: string;
  /**
   * Logo image URL
   */
  logo: string;
  /**
   * Additional CSS classes for the logo image
   */
  imgClassName?: string;
}

export interface LogosMarqueeMutedProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Heading text above the logo carousel
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Array of logo configurations
   */
  logos?: LogosMarqueeMutedLogoItem[];
  /**
   * Custom slot for rendering logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logos container
   */
  logosClassName?: string;
  /**
   * Additional CSS classes for the carousel wrapper
   */
  carouselClassName?: string;
  /**
   * Additional CSS classes for each carousel item
   */
  carouselItemClassName?: string;
  /**
   * Additional CSS classes for the logo wrapper
   */
  logoWrapperClassName?: string;
  /**
   * Additional CSS classes for the left fade gradient
   */
  leftFadeClassName?: string;
  /**
   * Additional CSS classes for the right fade gradient
   */
  rightFadeClassName?: string;
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * LogosMarqueeMuted - A muted logo carousel with auto-scrolling animation.
 * Features grayscale logos on a muted background with fade gradients on edges.
 */
export function LogosMarqueeMuted({
  sectionId = "logos-marquee-muted",
  className,
  heading,
  headingClassName,
  logos,
  logosSlot,
  logosClassName,
  carouselClassName,
  carouselItemClassName,
  logoWrapperClassName,
  leftFadeClassName,
  rightFadeClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: LogosMarqueeMutedProps): React.JSX.Element {
  const renderLogos = useMemo(() => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return (
      <Carousel
        opts={{ loop: true }}
        plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
        className={carouselClassName}
      >
        <CarouselContent className="ml-0">
          {[...logos, ...logos].map((logo, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6",
                carouselItemClassName,
              )}
            >
              <div
                className={cn(
                  "mx-8 flex shrink-0 items-center justify-center",
                  logoWrapperClassName,
                )}
              >
                <Img
                  src={logo.logo}
                  alt={`${logo.name} logo`}
                  width={120}
                  height={40}
                  className={cn(
                    "h-8 w-auto object-contain opacity-60 grayscale",
                    logo.imgClassName,
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }, [logos, logosSlot, carouselClassName, carouselItemClassName, logoWrapperClassName, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      {heading && (
        <div className="container mb-12">
          {typeof heading === "string" ? (
            <p
              className={cn(
                "text-center text-lg font-medium text-muted-foreground",
                headingClassName,
              )}
            >
              {heading}
            </p>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )}
        </div>
      )}
      <div className={cn("relative", logosClassName)}>
        {renderLogos}
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-muted to-transparent",
            leftFadeClassName,
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-muted to-transparent",
            rightFadeClassName,
          )}
        />
      </div>
    </Section>
  );
}
