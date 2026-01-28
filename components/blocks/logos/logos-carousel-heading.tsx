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

export interface LogosCarouselHeadingLogoItem {
  /**
   * Unique identifier for the logo
   */
  id: string;
  /**
   * Description/alt text for the logo
   */
  description: string;
  /**
   * Logo image URL
   */
  image: string;
  /**
   * Additional CSS classes for the logo image
   */
  className?: string;
}

export interface LogosCarouselHeadingProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the header container
   */
  headerClassName?: string;
  /**
   * Array of logo configurations
   */
  logos?: LogosCarouselHeadingLogoItem[];
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
}

/**
 * LogosCarouselHeading - A logo carousel with a prominent centered heading.
 * Features auto-scrolling logos with fade gradients on edges.
 */
export function LogosCarouselHeading({
  className,
  heading,
  headingClassName,
  headerClassName,
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
}: LogosCarouselHeadingProps): React.JSX.Element {
  const renderLogos = useMemo(() => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return (
      <Carousel
        opts={{ loop: true }}
        plugins={[AutoScroll({ playOnInit: true })]}
        className={carouselClassName}
      >
        <CarouselContent className="ml-0">
          {logos.map((logo) => (
            <CarouselItem
              key={logo.id}
              className={cn(
                "flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6",
                carouselItemClassName,
              )}
            >
              <div
                className={cn(
                  "mx-10 flex shrink-0 items-center justify-center",
                  logoWrapperClassName,
                )}
              >
                <div>
                  <Img
                    src={logo.image}
                    alt={logo.description}
                    className={logo.className}
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }, [logos, logosSlot, carouselClassName, carouselItemClassName, logoWrapperClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      {heading && (
        <div
          className={cn(
            "container flex flex-col items-center text-center",
            headerClassName,
          )}
        >
          {typeof heading === "string" ? (
            <h1
              className={cn(
                "my-6 text-2xl font-bold text-pretty lg:text-4xl",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )}
        </div>
      )}
      <div className="pt-10 md:pt-16 lg:pt-20">
        <div
          className={cn(
            "relative mx-auto flex items-center justify-center lg:max-w-5xl",
            logosClassName,
          )}
        >
          {renderLogos}
          <div
            className={cn(
              "absolute inset-y-0 left-0 w-12 bg-linear-to-r from-background to-transparent",
              leftFadeClassName,
            )}
          />
          <div
            className={cn(
              "absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background to-transparent",
              rightFadeClassName,
            )}
          />
        </div>
      </div>
    </Section>
  );
}
