"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  FeatureItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";
import { Pressable } from "@/src";

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
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
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
  titleClassName,
  descriptionClassName,
  missionLabelClassName,
  missionTextClassName,
  mainImageClassName,
  missionSectionClassName,
  featuresTitleClassName,
  featuresDescriptionClassName,
  featuresClassName,
  headerClassName,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
}: AboutMissionFeaturesProps): React.JSX.Element {
  const featuresContent = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, idx) => (
      <Pressable
        className={cn(
          "flex flex-col items-start gap-4",
          "p-6 md:p-8",
          "transition-all duration-500",
          "bg-card text-card-foreground hover:bg-primary hover:text-primary-foreground",
          "border-dashed",
          idx === features.length - 1
            ? "border-b-0 md:border-r-0"
            : "border-r-0 md:border-r border-b md:border-b-0",
          feature.href ? "cursor-pointer" : "",
        )}
        href={feature.href}
        key={idx}
      >
        {feature.icon ? (
          <div
            className={cn(
              "flex items-center justify-center",
              "size-12 rounded-lg shadow-lg mb-2",
              "bg-primary text-primary-foreground",
              feature.iconBgClass,
            )}
          >
            {feature.icon}
          </div>
        ) : null}
        {feature.title &&
          (typeof feature.title === "string" ? (
            <h3 className="text-lg font-semibold">{feature.title}</h3>
          ) : (
            feature.title
          ))}
        {feature.description &&
          (typeof feature.description === "string" ? (
            <p className="text-sm md:text-base">{feature.description}</p>
          ) : (
            feature.description
          ))}
      </Pressable>
    ));
  }, [featuresSlot, features, background]);

  const contentItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (title) {
      if (typeof title === "string") {
        items.push({
          _type: "text",
          as: "h1",
          className: cn(
            "text-4xl font-semibold tracking-tighter lg:text-7xl",
            titleClassName,
          ),
          children: title,
        });
      } else {
        items.push(title);
      }
    }

    if (description) {
      if (typeof description === "string") {
        items.push({
          _type: "text",
          as: "p",
          className: cn(
            "text-xl max-w-full md:max-w-md text-balance",
            descriptionClassName,
          ),
          children: description,
        });
      } else {
        items.push(description);
      }
    }

    return items;
  }, [title, titleClassName, description, descriptionClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="flex flex-col items-ceenter gap-6 lg:gap-20">
        <ContentGroup
          items={contentItems}
          className={cn("flex flex-col gap-0 lg:gap-2", headerClassName)}
        />

        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
          {mainImage && (
            <Img
              src={mainImage.src}
              alt={mainImage.alt}
              className={cn(
                "size-full max-h-96 rounded-md object-cover shadow-lg",
                mainImageClassName,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          )}
          <div
            className={cn(
              "relative flex flex-col justify-between gap-10",
              "overflow-hidden p-4 md:p-6 lg:p-10",
              "text-white text-shadow-lg",
              "rounded-md shadow-lg",
              missionSectionClassName,
            )}
          >
            {missionBackgroundImage && (
              <>
                <Img
                  src={missionBackgroundImage.src}
                  alt={missionBackgroundImage.alt}
                  className="absolute inset-0 size-full object-cover brightness-50"
                  optixFlowConfig={optixFlowConfig}
                />
              </>
            )}
            <div className="relative z-10">
              {missionLabel &&
                (typeof missionLabel === "string" ? (
                  <p
                    className={cn(
                      "text-xl font-semibold",
                      missionLabelClassName,
                    )}
                  >
                    {missionLabel}
                  </p>
                ) : (
                  missionLabel
                ))}
            </div>
            <div className="relative z-10">
              {missionText &&
                (typeof missionText === "string" ? (
                  <p
                    className={cn("text-lg font-normal", missionTextClassName)}
                  >
                    {missionText}
                  </p>
                ) : (
                  missionText
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col border border-dashed bg-card text-card-foreground">
          <div className="flex flex-col gap-0 lg:gap-2 p-6">
            {featuresTitle &&
              (typeof featuresTitle === "string" ? (
                <h2
                  className={cn(
                    "text-2xl font-semibold tracking-tight md:text-4xl",
                    featuresTitleClassName,
                  )}
                >
                  {featuresTitle}
                </h2>
              ) : (
                featuresTitle
              ))}
            {featuresDescription &&
              (typeof featuresDescription === "string" ? (
                <p className={cn("text-lg", featuresDescriptionClassName)}>
                  {featuresDescription}
                </p>
              ) : (
                featuresDescription
              ))}
          </div>
          <div
            className={cn(
              "grid md:grid-cols-3 border-t border-dashed",
              featuresClassName,
            )}
          >
            {featuresContent}
          </div>
        </div>
      </div>
    </Section>
  );
}
