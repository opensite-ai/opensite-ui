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

export interface LogosMinimalCarouselLogoItem {
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

export interface LogosMinimalCarouselProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Array of logo configurations
   */
  logos?: LogosMinimalCarouselLogoItem[];
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
   * Additional CSS classes for the border container
   */
  borderContainerClassName?: string;
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
 * LogosMinimalCarousel - A minimal logo carousel with bordered container.
 * Features grayscale logos with hover effects in a clean, bordered design.
 */
export function LogosMinimalCarousel({
  sectionId = "logos-minimal-carousel",
  className,
  logos,
  logosSlot,
  logosClassName,
  carouselClassName,
  carouselItemClassName,
  logoWrapperClassName,
  borderContainerClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: LogosMinimalCarouselProps): React.JSX.Element {
  const renderLogos = useMemo(() => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return (
      <Carousel
        opts={{ loop: true }}
        plugins={[AutoScroll({ playOnInit: true, speed: 0.5 })]}
        className={carouselClassName}
      >
        <CarouselContent className="ml-0 py-8">
          {[...logos, ...logos].map((logo, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "flex basis-1/3 justify-center border-r border-border pl-0 last:border-r-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6",
                carouselItemClassName,
              )}
            >
              <div
                className={cn(
                  "flex shrink-0 items-center justify-center px-8",
                  logoWrapperClassName,
                )}
              >
                <Img
                  src={logo.logo}
                  alt={`${logo.name} logo`}
                  width={100}
                  height={32}
                  className={cn(
                    "h-8 w-auto object-contain opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0",
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
      <div
        className={cn(
          "relative border-y border-border",
          borderContainerClassName,
          logosClassName,
        )}
      >
        {renderLogos}
      </div>
    </Section>
  );
}
