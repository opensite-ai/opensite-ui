"use client";

import * as React from "react";
import { useMemo } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, ImageItem, FeatureItem, LogoItem, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

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
   * Primary action configuration (schedule chat button)
   */
  primaryAction?: ActionConfig;
  /**
   * Avatar image for primary action button
   */
  primaryActionAvatar?: string;
  /**
   * Secondary action configuration (portfolio button)
   */
  secondaryAction?: ActionConfig;
  /**
   * Custom slot for actions (overrides action props)
   */
  actionsSlot?: React.ReactNode;
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
}

export function HeroDesignCarouselPortfolio({
  logo,
  logoSlot,
  features,
  featuresSlot,
  heading,
  description,
  primaryAction,
  primaryActionAvatar,
  secondaryAction,
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
  headingClassName,
  descriptionClassName,
  featuresClassName,
  carouselClassName,
  optixFlowConfig,
}: HeroDesignCarouselPortfolioProps): React.JSX.Element {
  const renderLogo = useMemo(() => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    const logoSrc = typeof logo.src === "string" ? logo.src : logo.src.light;
    return (
      <Img
        src={logoSrc}
        className={cn("h-12 lg:h-16", logo.className)}
        alt={logo.alt}
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [logoSlot, logo, optixFlowConfig]);

  const renderFeatures = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div className={cn("hidden items-center gap-6 lg:flex", featuresClassName)}>
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-1.5 ">
            {feature.icon ?? <DynamicIcon name={feature.iconName || "lucide/check-circle"} size={24} />}
            <span>{feature.title}</span>
          </div>
        ))}
      </div>
    );
  }, [featuresSlot, features, featuresClassName]);

  const renderPrimaryAction = useMemo(() => {
    if (actionsSlot) return null;
    if (!primaryAction) return null;

    const { label, className: actionClassName, ...pressableProps } = primaryAction;
    return (
      <Pressable
        asButton
        className={actionClassName}
        {...pressableProps}
      >
        <Img
          src={primaryActionAvatar}
          alt=""
          className="size-9 rounded-full object-cover lg:size-11"
          optixFlowConfig={optixFlowConfig}
        />
        <span>{label}</span>
      </Pressable>
    );
  }, [actionsSlot, primaryAction, primaryActionAvatar, optixFlowConfig]);

  const renderSecondaryAction = useMemo(() => {
    if (actionsSlot) return null;
    if (!secondaryAction) return null;

    const { label, iconAfter, className: actionClassName, ...pressableProps } = secondaryAction;
    return (
      <Pressable
        asButton
        className={actionClassName}
        {...pressableProps}
      >
        <span>{label}</span>
        {iconAfter}
      </Pressable>
    );
  }, [actionsSlot, secondaryAction]);

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
        className={cn("relative mx-auto w-full max-w-full overflow-hidden from-white to-transparent before:absolute before:top-0 before:left-0 before:z-10 before:h-full before:w-[20%] before:bg-linear-to-r before:content-[''] after:absolute after:top-0 after:right-0 after:z-10 after:h-full after:w-[20%] after:bg-linear-to-l after:from-white after:to-transparent after:content-['']", carouselClassName)}
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
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("relative", className)}
    >
      <div className={cn("relative z-10 container mx-auto", containerClassName)}>
        <div className="py-8">
          {renderLogo}
        </div>
        <div className={cn("flex flex-col gap-10 py-10 lg:py-28", contentClassName)}>
          {renderFeatures}
          <div className="flex">
            <div className="flex flex-1 flex-col gap-4">
              {heading && (
                typeof heading === "string" ? (
                  <h1 className={cn("max-w-6xl text-4xl tracking-tighter lg:text-7xl xl:text-9xl", headingClassName)}>
                    {heading}
                  </h1>
                ) : (
                  <h1 className={cn("max-w-6xl text-4xl tracking-tighter lg:text-7xl xl:text-9xl", headingClassName)}>
                    {heading}
                  </h1>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("text-lg lg:text-2xl", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <p className={cn("text-lg lg:text-2xl", descriptionClassName)}>
                    {description}
                  </p>
                )
              )}
            </div>
          </div>
          {actionsSlot || renderPrimaryAction}
        </div>
      </div>
      <div className="relative flex flex-col">
        {renderCarousel}
      </div>
      {actionsSlot || renderSecondaryAction}
    </Section>
  );
}
