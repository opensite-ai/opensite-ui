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

export interface LogosNumberedCarouselLogoItem {
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

export interface LogosNumberedCarouselProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Main headline text
   */
  headline?: React.ReactNode;
  /**
   * Additional CSS classes for the headline
   */
  headlineClassName?: string;
  /**
   * Additional CSS classes for the header container
   */
  headerClassName?: string;
  /**
   * Counter suffix text (e.g., "companies trust us")
   */
  counterSuffix?: React.ReactNode;
  /**
   * Additional CSS classes for the counter container
   */
  counterClassName?: string;
  /**
   * Array of logo configurations
   */
  logos?: LogosNumberedCarouselLogoItem[];
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
 * LogosNumberedCarousel - A numbered logo carousel with headline and company count.
 * Features grayscale logos with hover effects and numbered indicators.
 */
export function LogosNumberedCarousel({
  sectionId = "logos-numbered-carousel",
  className,
  headline,
  headlineClassName,
  headerClassName,
  counterSuffix,
  counterClassName,
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
}: LogosNumberedCarouselProps): React.JSX.Element {
  const renderLogos = useMemo(() => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return (
      <Carousel
        opts={{ loop: true }}
        plugins={[AutoScroll({ playOnInit: true, speed: 0.8 })]}
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
                  "group relative mx-6 flex shrink-0 items-center justify-center",
                  logoWrapperClassName,
                )}
              >
                <span className="absolute -top-4 left-0 text-xs font-medium text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  {((index % logos.length) + 1).toString().padStart(2, "0")}
                </span>
                <Img
                  src={logo.logo}
                  alt={`${logo.name} logo`}
                  width={120}
                  height={40}
                  className={cn(
                    "h-10 w-auto object-contain opacity-60 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0",
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
      className={cn("overflow-hidden", className)}
    >
      <div className="container mb-12">
        <div
          className={cn(
            "flex flex-col items-center justify-between gap-6 md:flex-row",
            headerClassName,
          )}
        >
          {headline &&
            (typeof headline === "string" ? (
              <h2
                className={cn(
                  "text-2xl font-bold md:text-3xl lg:text-4xl",
                  headlineClassName,
                )}
              >
                {headline}
              </h2>
            ) : (
              <div className={headlineClassName}>{headline}</div>
            ))}
          {counterSuffix && (
            <div
              className={cn(
                "flex items-center gap-2 text-sm text-muted-foreground",
                counterClassName,
              )}
            >
              <span className="font-semibold text-foreground">
                {(logos?.length ?? 0).toString().padStart(2, "0")}
              </span>
              {typeof counterSuffix === "string" ? (
                <span>{counterSuffix}</span>
              ) : (
                counterSuffix
              )}
            </div>
          )}
        </div>
      </div>
      <div className={cn("relative", logosClassName)}>
        {renderLogos}
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-32 bg-linear-to-r from-background to-transparent",
            leftFadeClassName,
          )}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 w-32 bg-linear-to-l from-background to-transparent",
            rightFadeClassName,
          )}
        />
      </div>
    </Section>
  );
}
