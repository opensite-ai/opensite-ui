"use client";

import * as React from "react";
import { useMemo } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { BrandLogo } from "../../ui/brand-logo";
import { Img } from "@page-speed/img";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ImageItem,
  FeatureItem,
  LogoItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";

export interface HeroDesignCarouselPortfolioProps {
  /**
   * Logo configuration
   */
  logo?: LogoItem;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Array of feature highlights
   */
  features?: Array<FeatureItem & { iconName?: string }>;
  /**
   * Custom slot for features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
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
   * Custom slot for actions (overrides action props)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Array of carousel images
   */
  carouselImages?: ImageItem[];
  /**
   * Custom slot for carousel (overrides carouselImages array)
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
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the features container
   */
  featuresClassName?: string;
  /**
   * Additional CSS classes for the carousel container
   */
  carouselClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroDesignCarouselPortfolio({
  sectionId = "hero-design-carousel-portfolio",
  logo,
  logoSlot,
  features,
  featuresSlot,
  heading,
  description,
  actions,
  actionsSlot,
  actionsClassName,
  carouselImages,
  carouselSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  featuresClassName,
  carouselClassName,
  optixFlowConfig,
}: HeroDesignCarouselPortfolioProps): React.JSX.Element {
  const renderLogo = useMemo(() => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    const logoConfig = {
      src: typeof logo.src === "string" ? logo.src : logo.src.light,
      alt: logo.alt,
      className: logo.className,
      url: logo.href,
    };

    return (
      <BrandLogo
        logo={logoConfig}
        size="xl"
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [logoSlot, logo, optixFlowConfig]);

  const renderFeatures = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div
        className={cn("hidden items-center gap-6 lg:flex", featuresClassName)}
      >
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-1.5 ">
            {feature.icon ?? (
              <DynamicIcon
                name={feature.iconName || "lucide/check-circle"}
                size={24}
              />
            )}
            <span>{feature.title}</span>
          </div>
        ))}
      </div>
    );
  }, [featuresSlot, features, featuresClassName]);

  const renderCarousel = useMemo(() => {
    if (carouselSlot) return carouselSlot;
    if (!carouselImages || carouselImages.length === 0) return null;

    return (
      <Carousel
        opts={{
          loop: true,
          align: "center",
        }}
        plugins={[
          AutoScroll({
            speed: 1,
          }),
          Autoplay({
            playOnInit: true,
            delay: 1000,
          }),
        ]}
        className={cn(
          "relative mx-auto w-full max-w-full overflow-hidden from-white to-transparent before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-[20%] before:bg-linear-to-r before:content-[''] after:absolute after:top-0 after:right-0 after:z-10 after:h-full after:w-[20%] after:bg-linear-to-l after:from-white after:to-transparent after:content-['']",
          carouselClassName,
        )}
      >
        <CarouselContent className="ml-5 flex gap-5 pl-4">
          {carouselImages.map((image, index) => (
            <CarouselItem key={index} className="basis-[496px] bg-background">
              <div className="h-[380px] basis-[480px] overflow-hidden rounded-lg">
                <Img
                  src={image.src}
                  alt={image.alt}
                  className={cn("size-full object-cover", image.className)}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }, [carouselSlot, carouselImages, carouselClassName, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("relative", className)}
      containerClassName={containerClassName}
    >
      <div className="relative">
        {renderLogo ? <div className="pb-8">{renderLogo}</div> : null}

        <div
          className={cn(
            "flex flex-col gap-10 pt-12 pb-8 lg:pt-24 lg:pb-12",
            contentClassName,
          )}
        >
          {renderFeatures}
          <div className="flex">
            <div className="flex flex-1 flex-col gap-4">
              {heading &&
                (typeof heading === "string" ? (
                  <h1
                    className={cn(
                      "max-w-6xl text-4xl tracking-tighter lg:text-7xl xl:text-9xl font-semibold",
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
                      "text-lg lg:text-2xl text-balance",
                      descriptionClassName,
                    )}
                  >
                    {description}
                  </p>
                ) : (
                  description
                ))}
            </div>
          </div>

          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={actionsClassName}
          />
        </div>
      </div>
      <div className="relative flex flex-col">{renderCarousel}</div>
    </Section>
  );
}
