"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ShowcaseImageItem {
  src: string;
  alt: string;
}

export interface ShowcaseStatItem {
  value?: React.ReactNode;
  label?: React.ReactNode;
}

export interface ShowcaseLogoItem {
  src: string;
  alt: string;
  name?: React.ReactNode;
}

export interface ShowcaseBenefitItem {
  image?: {
    src: string;
    alt: string;
  };
  stat?: {
    value?: React.ReactNode;
    label?: React.ReactNode;
    description?: React.ReactNode;
  };
  testimonial?: {
    logo?: {
      src: string;
      alt: string;
    };
    company?: React.ReactNode;
    quote?: React.ReactNode;
    author?: React.ReactNode;
    role?: React.ReactNode;
  };
}

export interface AboutStatsShowcaseProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Main title
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Main description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Array of images
   */
  images?: ShowcaseImageItem[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * Stats section title
   */
  statsTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the stats title
   */
  statsTitleClassName?: string;
  /**
   * Array of stats
   */
  stats?: ShowcaseStatItem[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the stats container
   */
  statsClassName?: string;
  /**
   * Logos section title
   */
  logosTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the logos title
   */
  logosTitleClassName?: string;
  /**
   * Array of logos
   */
  logos?: ShowcaseLogoItem[];
  /**
   * Custom slot for rendering logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logos container
   */
  logosClassName?: string;
  /**
   * Benefits section title
   */
  benefitsTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the benefits title
   */
  benefitsTitleClassName?: string;
  /**
   * Array of benefits
   */
  benefits?: ShowcaseBenefitItem[];
  /**
   * Custom slot for rendering benefits (overrides benefits array)
   */
  benefitsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the benefits container
   */
  benefitsClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Section background variant
   */
  background?: SectionBackground;
  /**
   * Section spacing variant
   */
  spacing?: SectionSpacing;
  /**
   * Pattern background key or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /** Optional Section ID */
  sectionId?: string;
}

export function AboutStatsShowcase({
  sectionId = "about-stats-showcase",
  className,
  title,
  titleClassName,
  description,
  descriptionClassName,
  images,
  imagesSlot,
  imagesClassName,
  statsTitle,
  statsTitleClassName,
  stats,
  statsSlot,
  statsClassName,
  logosTitle,
  logosTitleClassName,
  logos,
  logosSlot,
  logosClassName,
  benefitsTitle,
  benefitsTitleClassName,
  benefits,
  benefitsSlot,
  benefitsClassName,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-32 md:py-32",
  pattern,
  patternOpacity,
}: AboutStatsShowcaseProps): React.JSX.Element {
  const imagesContent = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div
        className={cn(
          "grid w-full grid-cols-1 gap-6",
          images.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1",
          imagesClassName,
        )}
      >
        {images.map((image, idx) => (
          <div
            key={idx}
            className="aspect-video w-full overflow-hidden rounded-xl shadow-lg"
          >
            <Img
              src={image.src}
              alt={image.alt}
              className="block h-full w-full object-cover object-center"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        ))}
      </div>
    );
  }, [imagesSlot, images, imagesClassName, optixFlowConfig]);

  const statsContent = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-3",
          "gap-6 md:gap-16",
          statsClassName,
        )}
      >
        {stats.map((stat, idx) => (
          <div className="flex flex-col gap-6" key={idx}>
            {stat.value &&
              (typeof stat.value === "string" ? (
                <p className="text-4xl font-medium md:text-5xl">{stat.value}</p>
              ) : (
                stat.value
              ))}
            {stat.label &&
              (typeof stat.label === "string" ? (
                <p className="text-base">{stat.label}</p>
              ) : (
                stat.label
              ))}
          </div>
        ))}
      </div>
    );
  }, [statsSlot, stats, statsClassName]);

  const logosContent = useMemo(() => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return (
      <div
        className={cn(
          "px-6 md:px-8 py-8 md:py-24",
          "bg-transparent border rounded-xl shadow-lg",
        )}
      >
        <div className="flex flex-col items-center gap-11">
          {logosTitle &&
            (typeof logosTitle === "string" ? (
              <p
                className={cn(
                  "text-center text-xl font-medium",
                  logosTitleClassName,
                )}
              >
                {logosTitle}
              </p>
            ) : (
              logosTitle
            ))}
          <div
            className={cn(
              "flex flex-col md:flex-row",
              "justify-center items-center flex-wrap",
              "gap-6 md:gap-12 opacity-50",
              logosClassName,
            )}
          >
            {logos.map((logo, idx) => (
              <div className="flex items-center justify-center" key={idx}>
                <Img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 object-contain w-auto md:h-10 max-h-10"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }, [
    logosSlot,
    logos,
    logosTitle,
    logosTitleClassName,
    logosClassName,
    optixFlowConfig,
  ]);

  const benefitsContent = useMemo(() => {
    if (benefitsSlot) return benefitsSlot;
    if (!benefits || benefits.length === 0) return null;

    return (
      <div className="container flex flex-col items-center gap-14">
        {benefitsTitle &&
          (typeof benefitsTitle === "string" ? (
            <h2
              className={cn(
                "text-center font-semibold text-2xl md:text-3xl",
                benefitsTitleClassName,
              )}
            >
              {benefitsTitle}
            </h2>
          ) : (
            benefitsTitle
          ))}
        <div
          className={cn(
            "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
            benefitsClassName,
          )}
        >
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              {benefit.image && (
                <Img
                  src={benefit.image.src}
                  alt={benefit.image.alt}
                  className="max-h-96 w-full rounded-xl object-cover shadow-lg"
                  optixFlowConfig={optixFlowConfig}
                />
              )}
              {benefit.stat && (
                <div
                  className={cn(
                    "flex flex-col justify-center",
                    "p-6 md:p-8",
                    "bg-muted text-muted-foreground rounded-xl",
                  )}
                >
                  {benefit.stat.value &&
                    (typeof benefit.stat.value === "string" ? (
                      <p className="mb-2 text-4xl font-medium">
                        {benefit.stat.value}
                      </p>
                    ) : (
                      benefit.stat.value
                    ))}
                  {benefit.stat.label &&
                    (typeof benefit.stat.label === "string" ? (
                      <p className="mb-6 font-semibold">{benefit.stat.label}</p>
                    ) : (
                      benefit.stat.label
                    ))}
                  {benefit.stat.description &&
                    (typeof benefit.stat.description === "string" ? (
                      <p className="relative">{benefit.stat.description}</p>
                    ) : (
                      benefit.stat.description
                    ))}
                </div>
              )}
              {benefit.testimonial && (
                <div className="p-4">
                  <div className="mb-4 flex items-center gap-2">
                    {benefit.testimonial.logo && (
                      <Img
                        src={benefit.testimonial.logo.src}
                        alt={benefit.testimonial.logo.alt}
                        className="h-7 w-auto"
                        optixFlowConfig={optixFlowConfig}
                      />
                    )}
                    {benefit.testimonial.company &&
                      (typeof benefit.testimonial.company === "string" ? (
                        <span className="text-lg font-semibold">
                          {benefit.testimonial.company}
                        </span>
                      ) : (
                        benefit.testimonial.company
                      ))}
                  </div>
                  {benefit.testimonial.quote &&
                    (typeof benefit.testimonial.quote === "string" ? (
                      <p className="mb-6 text-sm">
                        {benefit.testimonial.quote}
                      </p>
                    ) : (
                      benefit.testimonial.quote
                    ))}
                  <div className="flex items-baseline gap-1">
                    {benefit.testimonial.author &&
                      (typeof benefit.testimonial.author === "string" ? (
                        <span className="font-medium">
                          {benefit.testimonial.author},
                        </span>
                      ) : (
                        benefit.testimonial.author
                      ))}
                    {benefit.testimonial.role &&
                      (typeof benefit.testimonial.role === "string" ? (
                        <span className="text-sm">
                          {benefit.testimonial.role}
                        </span>
                      ) : (
                        benefit.testimonial.role
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }, [
    benefitsSlot,
    benefits,
    benefitsTitle,
    benefitsTitleClassName,
    benefitsClassName,
    optixFlowConfig,
  ]);

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
      <div className="flex flex-col gap-10 md:gap-24">
        <div className="flex flex-col gap-10 text-center md:gap-24 mb-4 md:mb-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {title &&
              (typeof title === "string" ? (
                <h1
                  className={cn(
                    "text-4xl font-medium md:text-6xl text-balance",
                    titleClassName,
                  )}
                >
                  {title}
                </h1>
              ) : (
                title
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn(
                    "text-lg md:text-xl text-balance",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                description
              ))}
          </div>
          {imagesContent}
        </div>
        <div className="container flex flex-col gap-16">
          {statsTitle &&
            (typeof statsTitle === "string" ? (
              <h2
                className={cn(
                  "max-w-3xl font-medium text-2xl md:text-3xl",
                  statsTitleClassName,
                )}
              >
                {statsTitle}
              </h2>
            ) : (
              statsTitle
            ))}
          {statsContent}
        </div>
        {logosContent}
        {benefitsContent}
      </div>
    </Section>
  );
}
