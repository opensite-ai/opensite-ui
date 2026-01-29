"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  FeatureItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface AboutMissionFeaturesProps {
  /**
   * Main heading/title
   */
  title?: React.ReactNode;
  /**
   * Main description text
   */
  description?: React.ReactNode;
  /**
   * Mission section label
   */
  missionLabel?: React.ReactNode;
  /**
   * Mission section text
   */
  missionText?: React.ReactNode;
  /**
   * Main image configuration
   */
  mainImage?: {
    src: string;
    alt: string;
  };
  /**
   * Mission background image configuration
   */
  missionBackgroundImage?: {
    src: string;
    alt: string;
  };
  /**
   * Features section title
   */
  featuresTitle?: React.ReactNode;
  /**
   * Features section description
   */
  featuresDescription?: React.ReactNode;
  /**
   * Array of feature configurations
   */
  features?: FeatureItem[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the mission label
   */
  missionLabelClassName?: string;
  /**
   * Additional CSS classes for the mission text
   */
  missionTextClassName?: string;
  /**
   * Additional CSS classes for the main image
   */
  mainImageClassName?: string;
  /**
   * Additional CSS classes for the mission section
   */
  missionSectionClassName?: string;
  /**
   * Additional CSS classes for the features title
   */
  featuresTitleClassName?: string;
  /**
   * Additional CSS classes for the features description
   */
  featuresDescriptionClassName?: string;
  /**
   * Additional CSS classes for the features container
   */
  featuresClassName?: string;
  /**
   * OptixFlow image optimization configuration
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
   * Optional background pattern
   */
  pattern?: PatternName;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
}

export function AboutMissionFeatures({
  title,
  description,
  missionLabel,
  missionText,
  mainImage,
  missionBackgroundImage,
  featuresTitle,
  featuresDescription,
  features,
  featuresSlot,
  className,
  containerClassName,
  titleClassName,
  descriptionClassName,
  missionLabelClassName,
  missionTextClassName,
  mainImageClassName,
  missionSectionClassName,
  featuresTitleClassName,
  featuresDescriptionClassName,
  featuresClassName,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
}: AboutMissionFeaturesProps): React.JSX.Element {
  const featuresContent = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, idx) => (
      <div className="flex flex-col" key={idx}>
        <div
          className={cn(
            "mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground",
            feature.iconBgClass,
          )}
        >
          {feature.icon}
        </div>
        {feature.title &&
          (typeof feature.title === "string" ? (
            <h3 className="mt-2 mb-3 text-lg font-semibold">{feature.title}</h3>
          ) : (
            feature.title
          ))}
        {feature.description &&
          (typeof feature.description === "string" ? (
            <p className="text-muted-foreground">{feature.description}</p>
          ) : (
            feature.description
          ))}
      </div>
    ));
  }, [featuresSlot, features]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("flex flex-col gap-8 lg:gap-16", containerClassName)}>
        <div className="flex flex-col gap-4 lg:gap-8">
          {title &&
            (typeof title === "string" ? (
              <h1
                className={cn(
                  "text-4xl font-semibold tracking-tighter lg:text-7xl",
                  titleClassName,
                )}
              >
                {title}
              </h1>
            ) : (
              <div className={titleClassName}>{title}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p className={cn("max-w-xl text-xl", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {mainImage && (
            <Img
              src={mainImage.src}
              alt={mainImage.alt}
              className={cn(
                "size-full max-h-96 rounded-2xl object-cover",
                mainImageClassName,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          )}
          <div
            className={cn(
              "relative flex flex-col justify-between gap-10 overflow-hidden rounded-2xl p-10",
              getNestedCardBg(background),
              getNestedCardTextColor(background),
              missionSectionClassName,
            )}
          >
            {missionBackgroundImage && (
              <>
                <Img
                  src={missionBackgroundImage.src}
                  alt={missionBackgroundImage.alt}
                  className="absolute inset-0 size-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
                <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/50 to-foreground/30" />
              </>
            )}
            <div className="relative z-10">
              {missionLabel &&
                (typeof missionLabel === "string" ? (
                  <p
                    className={cn(
                      "text-sm font-semibold text-background",
                      missionLabelClassName,
                    )}
                  >
                    {missionLabel}
                  </p>
                ) : (
                  <div className={missionLabelClassName}>{missionLabel}</div>
                ))}
            </div>
            <div className="relative z-10">
              {missionText &&
                (typeof missionText === "string" ? (
                  <p
                    className={cn(
                      "text-lg font-medium text-background",
                      missionTextClassName,
                    )}
                  >
                    {missionText}
                  </p>
                ) : (
                  <div className={missionTextClassName}>{missionText}</div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:gap-12">
          <div className="max-w-xl">
            {featuresTitle &&
              (typeof featuresTitle === "string" ? (
                <h2
                  className={cn(
                    "mb-4 text-2xl font-semibold tracking-tight md:text-4xl",
                    featuresTitleClassName,
                  )}
                >
                  {featuresTitle}
                </h2>
              ) : (
                <div className={featuresTitleClassName}>{featuresTitle}</div>
              ))}
            {featuresDescription &&
              (typeof featuresDescription === "string" ? (
                <p
                  className={cn(
                    "text-lg text-muted-foreground",
                    featuresDescriptionClassName,
                  )}
                >
                  {featuresDescription}
                </p>
              ) : (
                <div className={featuresDescriptionClassName}>
                  {featuresDescription}
                </div>
              ))}
          </div>
          <div className={cn("grid gap-10 md:grid-cols-3", featuresClassName)}>
            {featuresContent}
          </div>
        </div>
      </div>
    </Section>
  );
}
