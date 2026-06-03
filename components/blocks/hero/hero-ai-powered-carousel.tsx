"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Img } from "@page-speed/img";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

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
   * Images for carousel 1
   */
  carouselImages1?: ImageItem[];
  /**
   * Images for carousel 2
   */
  carouselImages2?: ImageItem[];
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
  /**
   * Brand logo configuration. LOGO MEDIA ONLY — do not use photos or hero images.
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroAiPoweredCarousel({
  sectionId = "hero-ai-powered-carousel",
  badge,
  badgeTagline,
  heading,
  description,
  actions,
  actionsSlot,
  carouselImages1,
  carouselImages2,
  carouselSlot,
  background,
  spacing = "xl",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  optixFlowConfig,
  logo,
  logoSlot,
  logoClassName,
}: HeroAiPoweredCarouselProps): React.JSX.Element {
  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div
            className={cn(
              "mx-auto flex flex-col gap-4 md:gap-8",
              contentClassName,
            )}
          >
            {(badge || badgeTagline) && (
              <div
                className={cn(
                  "flex w-fit items-center gap-2 rounded-full border pl-2.5 pr-4 py-1.5 text-xs font-medium",
                  badgeClassName,
                )}
              >
                {badge && <Badge>{badge}</Badge>}
                {badgeTagline}
              </div>
            )}
            {(logo || logoSlot) && (
              <div className={cn("mt-8 flex justify-start", logoClassName)}>
                <BrandLogo logo={logo} logoSlot={logoSlot} size="md" />
              </div>
            )}

            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-3xl font-semibold lg:text-5xl text-balance",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                heading
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "mx-auto text-base lg:text-lg text-balance",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                description
              ))}
            <BlockActions
              actions={actions}
              actionsSlot={actionsSlot}
              actionsClassName={actionsClassName}
            />
          </div>
          {carouselSlot ? (
            carouselSlot
          ) : (
            <>
              <div className="flex flex-col gap-8 lg:hidden">
                {carouselImages1 && carouselImages1.length > 0 && (
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
                      {carouselImages1.map((image, index) => (
                        <CarouselItem key={index} className="max-w-96">
                          <Img
                            src={image.src}
                            alt={image.alt}
                            className={cn(
                              "rounded-lg shadow-lg",
                              image.className,
                            )}
                            optixFlowConfig={optixFlowConfig}
                            loading="eager"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                )}
                {carouselImages2 && carouselImages2.length > 0 && (
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
                      {carouselImages2.map((image, index) => (
                        <CarouselItem key={index} className="max-w-96">
                          <Img
                            src={image.src}
                            alt={image.alt}
                            className={cn(
                              "rounded-lg shadow-lg",
                              image.className,
                            )}
                            optixFlowConfig={optixFlowConfig}
                            loading="eager"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                )}
              </div>
              <div className="hidden grid-cols-2 gap-8 lg:grid">
                {carouselImages1 && carouselImages1.length > 0 && (
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
                      {carouselImages1.map((image, index) => (
                        <CarouselItem key={index}>
                          <Img
                            src={image.src}
                            alt={image.alt}
                            className={cn(
                              "rounded-lg shadow-lg",
                              image.className,
                            )}
                            optixFlowConfig={optixFlowConfig}
                            loading="eager"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                )}
                {carouselImages2 && carouselImages2.length > 0 && (
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
                      {carouselImages2.map((image, index) => (
                        <CarouselItem key={index}>
                          <Img
                            src={image.src}
                            alt={image.alt}
                            className={cn(
                              "rounded-lg shadow-lg",
                              image.className,
                            )}
                            optixFlowConfig={optixFlowConfig}
                            loading="eager"
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
