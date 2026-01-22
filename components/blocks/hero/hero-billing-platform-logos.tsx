"use client";

import * as React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, LogoItem, ImageItem, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface HeroBillingPlatformLogosProps {
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
   * Main hero image
   */
  mainImage?: ImageItem;
  /**
   * Floating overlay images
   */
  overlayImages?: ImageItem[];
  /**
   * Custom slot for images (overrides mainImage and overlayImages)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Logos tagline text
   */
  logosTagline?: React.ReactNode;
  /**
   * Array of logo items for the carousel
   */
  logos?: LogoItem[];
  /**
   * Custom slot for logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
  /**
   * Background noise texture URL
   */
  backgroundNoiseUrl?: string;
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
   * Additional CSS classes for the logos section
   */
  logosClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroBillingPlatformLogos({
  heading,
  description,
  actions,
  actionsSlot,
  mainImage,
  overlayImages,
  imagesSlot,
  logosTagline,
  logos,
  logosSlot,
  backgroundNoiseUrl = "https://cdn.ing/assets/i/r/286188/zrqcp9hynh3j7p2laihwzfbujgrl/noise.png",
  background = "dark",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  logosClassName,
  optixFlowConfig,
}: HeroBillingPlatformLogosProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      
      // Special handling for the second action (guide link)
      if (index === 1) {
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
                <p className="font-mono text-sm font-medium text-foreground uppercase">
                  {label}
                </p>
                {iconAfter}
              </>
            )}
          </Pressable>
        );
      }
      
      return (
        <div key={index} className="shrink-0">
          <Pressable
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
        </div>
      );
    });
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(
        "dark font-sans",
        className
      )}
      style={{ backgroundImage: backgroundNoiseUrl ? `url('${backgroundNoiseUrl}')` : undefined }}
    >
      <div className={cn("container", containerClassName)}>
        <div className="grid grid-cols-1 items-center justify-center gap-12 lg:grid-cols-[minmax(33.75rem,1fr)_1.5fr] lg:gap-8">
          <div className={contentClassName}>
            <div className="flex flex-col gap-3">
              {heading && (
                typeof heading === "string" ? (
                  <h1 className={cn("text-4xl leading-tight text-foreground md:text-5xl lg:text-[3.5rem]", headingClassName)}>
                    {heading}
                  </h1>
                ) : (
                  <div className={headingClassName}>{heading}</div>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("mb-5 text-lg text-foreground", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                )
              )}
              {(actionsSlot || (actions && actions.length > 0)) && (
                <div>
                  <div className={cn("flex flex-col items-center gap-4 lg:flex-row", actionsClassName)}>
                    {renderActions()}
                  </div>
                </div>
              )}
            </div>
          </div>
          {imagesSlot ? imagesSlot : mainImage ? (
            <div>
              <div className="relative mr-auto ml-auto aspect-[1.28581291/1] w-full max-w-149 lg:mr-0 lg:ml-auto">
                <div className="relative mx-auto aspect-[1.020365896/1] h-full w-[79.35%] max-w-118.25 overflow-hidden rounded-3xl">
                  <Img
                    src={mainImage.src}
                    alt={mainImage.alt}
                    className={cn("relative z-10 w-full object-cover", mainImage.className)}
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                {overlayImages?.[0] && (
                  <div className="absolute top-[19.84%] -left-[-2%] z-30 aspect-[1.765043789/1] w-[30.49%] max-w-47.5 overflow-hidden rounded-lg shadow-lg">
                    <Img
                      src={overlayImages[0].src}
                      alt={overlayImages[0].alt}
                      className={cn("size-full object-cover", overlayImages[0].className)}
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                )}
                {overlayImages?.[1] && (
                  <div className="absolute top-[55%] left-[0%] z-30 aspect-[1.776555024/1] w-[43.6%] max-w-65.5 overflow-hidden rounded-lg shadow-lg">
                    <Img
                      src={overlayImages[1].src}
                      alt={overlayImages[1].alt}
                      className={cn("size-full object-cover", overlayImages[1].className)}
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                )}
                {overlayImages?.[2] && (
                  <div className="absolute top-[40%] right-[0%] z-30 aspect-[1.170212766/1] w-[26.48%] max-w-41.25 overflow-hidden rounded-lg shadow-lg">
                    <Img
                      src={overlayImages[2].src}
                      alt={overlayImages[2].alt}
                      className={cn("size-full object-cover", overlayImages[2].className)}
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className={cn("flex flex-col items-center justify-center gap-8 pt-28", logosClassName)}>
        {logosTagline && (
          typeof logosTagline === "string" ? (
            <p className="px-5 text-center font-mono text-sm font-medium text-foreground uppercase">
              {logosTagline}
            </p>
          ) : (
            <div>{logosTagline}</div>
          )
        )}
        {logosSlot ? logosSlot : logos && logos.length > 0 ? (
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
            className="relative w-full max-w-(--breakpoint-2xl) overflow-hidden"
          >
            <CarouselContent className="items-center">
              {logos.map((logo, index) => (
                <CarouselItem key={index} className="w-fit basis-auto px-7">
                  <Img
                    src={typeof logo.src === "string" ? logo.src : logo.src.light}
                    alt={logo.alt}
                    className={cn("h-8 w-full object-fill", logo.imgClassName)}
                    optixFlowConfig={optixFlowConfig}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : null}
      </div>
    </Section>
  );
}
