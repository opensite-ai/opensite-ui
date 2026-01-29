"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Card } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface FeatureUtilityCardsGridItem {
  /**
   * Utility title content
   */
  title?: React.ReactNode;
  /**
   * Utility description content
   */
  description?: React.ReactNode;
  /**
   * Image source URL
   */
  image?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Custom slot for image (overrides image)
   */
  imageSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface FeatureUtilityCardsGridProps {
  /**
   * Section label content
   */
  label?: React.ReactNode;
  /**
   * Icon element for label (overrides iconName)
   */
  labelIcon?: React.ReactNode;
  /**
   * Icon name for label in format: prefix/name
   */
  labelIconName?: string;
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Learn more action configuration
   */
  learnMoreAction?: ActionConfig;
  /**
   * Custom slot for learn more link (overrides learnMoreAction)
   */
  learnMoreSlot?: React.ReactNode;
  /**
   * Array of utility items
   */
  utilities?: FeatureUtilityCardsGridItem[];
  /**
   * Custom slot for rendering utilities (overrides utilities array)
   */
  utilitiesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the label
   */
  labelClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
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
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
}

/**
 * Feature Utility Cards Grid - Six-card grid showcasing utilities with images
 * and descriptions.
 *
 * Layout: Header with separator, two-column intro, three-column card grid.
 * Key features: Icon label, separator line, image cards, hover effects.
 * Best for: Utility showcases, integration highlights, tool collections.
 *
 * @example
 * ```tsx
 * <FeatureUtilityCardsGrid
 *   label="Utilities"
 *   title="What you can do with our utilities?"
 *   utilities={[
 *     { title: "Integrations", description: "Connect your tools", image: "/integrations.jpg" },
 *   ]}
 * />
 * ```
 */
export function FeatureUtilityCardsGrid({
  label,
  labelIcon,
  labelIconName,
  title,
  description,
  learnMoreAction,
  learnMoreSlot,
  utilities,
  utilitiesSlot,
  className,
  containerClassName,
  headerClassName,
  labelClassName,
  titleClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  optixFlowConfig,
  background,
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureUtilityCardsGridProps): React.JSX.Element {
  const renderLabelIcon = useMemo(() => {
    if (labelIcon) return labelIcon;
    if (labelIconName)
      return (
        <DynamicIcon name={labelIconName} size={20} className="text-primary" />
      );
    return null;
  }, [labelIcon, labelIconName]);

  const learnMoreContent = useMemo(() => {
    if (learnMoreSlot) return learnMoreSlot;
    if (!learnMoreAction) return null;

    if (learnMoreAction.children) {
      return (
        <Pressable
          href={learnMoreAction.href}
          onClick={learnMoreAction.onClick}
          className={cn(
            "hover:text-primary hover:underline",
            learnMoreAction.className,
          )}
          aria-label={learnMoreAction["aria-label"]}
        >
          {learnMoreAction.children}
        </Pressable>
      );
    }

    return (
      <Pressable
        href={learnMoreAction.href}
        onClick={learnMoreAction.onClick}
        className={cn(learnMoreAction.className)}
        aria-label={learnMoreAction["aria-label"]}
      >
        {learnMoreAction.icon}
        {learnMoreAction.label}
        {learnMoreAction.iconAfter}
      </Pressable>
    );
  }, [learnMoreSlot, learnMoreAction]);

  const renderUtilityImage = React.useCallback(
    (utility: FeatureUtilityCardsGridItem) => {
      if (utility.imageSlot) return utility.imageSlot;
      if (utility.image) {
        return (
          <Img
            src={utility.image}
            alt={
              utility.imageAlt ||
              (typeof utility.title === "string"
                ? utility.title
                : "Utility image")
            }
            className={cn(
              "aspect-video w-full object-cover",
              utility.imageClassName,
            )}
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
        );
      }
      return null;
    },
    [optixFlowConfig],
  );

  const utilitiesContent = useMemo(() => {
    if (utilitiesSlot) return utilitiesSlot;
    if (!utilities || utilities.length === 0) return null;

    return utilities.map((utility, index) => (
      <Card
        key={index}
        className={cn("overflow-hidden pt-0", cardClassName, utility.className)}
      >
        {renderUtilityImage(utility)}
        <div className="p-5">
          {utility.title &&
            (typeof utility.title === "string" ? (
              <p className={cn("mb-1 font-medium", utility.titleClassName)}>
                {utility.title}
              </p>
            ) : (
              <div className={cn("mb-1 font-medium", utility.titleClassName)}>
                {utility.title}
              </div>
            ))}
          {utility.description &&
            (typeof utility.description === "string" ? (
              <p className={cn("", utility.descriptionClassName)}>
                {utility.description}
              </p>
            ) : (
              <div className={cn("", utility.descriptionClassName)}>
                {utility.description}
              </div>
            ))}
        </div>
      </Card>
    ));
  }, [utilitiesSlot, utilities, cardClassName, renderUtilityImage]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={cn("max-w-7xl", containerClassName)}
    >
      {(label ||
        labelIcon ||
        labelIconName ||
        learnMoreSlot ||
        learnMoreAction) && (
        <>
          <div
            className={cn(
              "flex items-center justify-between text-sm",
              headerClassName,
            )}
          >
            {(label || labelIcon || labelIconName) && (
              <div className={cn("flex items-center gap-1 ", labelClassName)}>
                {renderLabelIcon}
                {label &&
                  (typeof label === "string" ? (
                    <p>{label}</p>
                  ) : (
                    <div>{label}</div>
                  ))}
              </div>
            )}
            {learnMoreContent}
          </div>
          <Separator className="mt-3 mb-8" />
        </>
      )}
      {(title || description) && (
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          {title &&
            (typeof title === "string" ? (
              <h2
                className={cn("text-3xl font-medium md:w-1/2", titleClassName)}
              >
                {title}
              </h2>
            ) : (
              <div
                className={cn("text-3xl font-medium md:w-1/2", titleClassName)}
              >
                {title}
              </div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p className={cn("md:w-1/2", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={cn("md:w-1/2", descriptionClassName)}>
                {description}
              </div>
            ))}
        </div>
      )}
      {(utilitiesSlot || (utilities && utilities.length > 0)) && (
        <div
          className={cn(
            "mt-11 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
            gridClassName,
          )}
        >
          {utilitiesContent}
        </div>
      )}
    </Section>
  );
}
