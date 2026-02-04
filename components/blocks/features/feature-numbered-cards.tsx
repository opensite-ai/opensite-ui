"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Pressable } from "@/src";

export interface FeatureNumberedCardsChecklistItem {
  /**
   * Checklist item content
   */
  content?: React.ReactNode;
  /**
   * Icon element (overrides default check icon)
   */
  icon?: React.ReactNode;
  /**
   * Icon name for dynamic icon loading
   */
  iconName?: string;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
}

export interface FeatureNumberedCardsItem {
  /**
   * Feature title content
   */
  title?: React.ReactNode;
  /**
   * Feature description content
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
   * Image element or ReactNode (overrides image)
   */
  imageSlot?: React.ReactNode;
  /**
   * Checklist items (can be strings or FeatureNumberedCardsChecklistItem objects)
   */
  checklistItems?: (string | FeatureNumberedCardsChecklistItem)[];
  /**
   * Custom slot for checklist (overrides checklistItems)
   */
  checklistSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the image wrapper
   */
  imageWrapperClassName?: string;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
}

export interface FeatureNumberedCardsProps {
  /**
   * Feature title content
   */
  title?: React.ReactNode;
  /**
   * Feature description content
   */
  description?: React.ReactNode;
  /**
   * Array of numbered feature cards
   */
  features?: FeatureNumberedCardsItem[];
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
   * Additional CSS classes for the cards wrapper
   */
  cardsWrapperClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the checklist
   */
  checklistClassName?: string;
  /**
   * Additional CSS classes for the number badge
   */
  badgeClassName?: string;
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
 * Feature Numbered Cards - Stacked feature cards with numbered badges and
 * images, featuring checklists.
 *
 * Layout: Vertical stack of bordered cards with numbered badges and side images.
 * Key features: Numbered badges, checklist items, alternating image positions.
 * Best for: Payment features, security highlights, step-by-step processes.
 *
 * @example
 * ```tsx
 * <FeatureNumberedCards
 *   features={[
 *     {
 *       title: "Secure Payments",
 *       description: "Process payments securely with our gateway.",
 *       image: "/payments.jpg",
 *       checklistItems: ["SSL encryption", "Stripe integration"]
 *     },
 *   ]}
 * />
 * ```
 */
export function FeatureNumberedCards({
  title,
  description,
  features,
  featuresSlot,
  className,
  containerClassName = "px-6 sm:px-6 md:px-6 lg:px-8",
  cardsWrapperClassName,
  cardClassName,
  titleClassName,
  descriptionClassName,
  checklistClassName,
  badgeClassName,
  optixFlowConfig,
  background,
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureNumberedCardsProps): React.JSX.Element {
  const renderChecklistItems = useCallback(
    (feature: FeatureNumberedCardsItem) => {
      if (feature.checklistSlot) return feature.checklistSlot;
      if (!feature.checklistItems || feature.checklistItems.length === 0)
        return null;

      return feature.checklistItems.map((item, itemIndex) => {
        const isString = typeof item === "string";
        const content = isString ? item : item.content;
        const iconElement = isString ? (
          <DynamicIcon
            name="lucide/check-circle"
            size={16}
            className="mt-0.5 shrink-0 sm:mt-1"
          />
        ) : (
          (item.icon ??
          (item.iconName ? (
            <DynamicIcon
              name={item.iconName}
              size={16}
              className="mt-0.5 shrink-0 sm:mt-1"
            />
          ) : (
            <DynamicIcon
              name="lucide/check-circle"
              size={16}
              className="mt-0.5 shrink-0 sm:mt-1"
            />
          )))
        );
        const itemClassName = isString ? undefined : item.className;

        return (
          <li key={itemIndex} className={cn("flex gap-x-3", itemClassName)}>
            {iconElement}
            <p className="text-sm md:text-base">{content}</p>
          </li>
        );
      });
    },
    [],
  );

  const actionsContent = useCallback(
    (args: { actions?: ActionConfig[]; actionsSlot?: React.ReactNode }) => {
      if (args?.actionsSlot) return args.actionsSlot;
      if (!args?.actions || args.actions.length === 0) return null;

      return args.actions.map((action, index) => {
        const {
          label,
          icon,
          iconAfter,
          children,
          className: actionClassName,
          ...pressableProps
        } = action;
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
                {label}
                {iconAfter}
              </>
            )}
          </Pressable>
        );
      });
    },
    [],
  );

  const cardImg = useCallback((feature: FeatureNumberedCardsItem) => {
    if (!feature.image && !feature.imageSlot) return null;

    if (feature.imageSlot) return feature.imageSlot;

    const imageAlt =
      feature.imageAlt ||
      (typeof feature.title === "string" ? feature.title : "Feature image");

    return (
      <div className="overflow-hidden h-full w-full rounded-t-lg rounded-b-none md:rounded-t-none md:rounded-l-none md:rounded-r-lg">
        <Img
          src={feature.image}
          alt={imageAlt}
          className="h-full w-full object-cover"
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    );
  }, []);

  const featuresContent = useMemo(() => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return features.map((feature, index) => {
      return (
        <div
          key={index}
          className={cn(
            "grid rounded-lg border md:grid-cols-2 bg-background text-foreground",
            cardClassName,
            feature.className,
          )}
        >
          <div
            className={cn(
              "flex flex-col px-4 py-4 lg:px-8 lg:py-12 xl:px-12 xl:py-20",
              feature.contentClassName,
            )}
          >
            {feature.title &&
              (typeof feature.title === "string" ? (
                <h3
                  className={cn(
                    "mb-3 text-lg font-medium sm:mb-5 md:text-xl lg:text-2xl",
                    titleClassName,
                  )}
                >
                  {feature.title}
                </h3>
              ) : (
                <div
                  className={cn(
                    "mb-3 text-lg font-medium sm:mb-5 md:text-xl lg:text-2xl",
                    titleClassName,
                  )}
                >
                  {feature.title}
                </div>
              ))}
            {feature.description &&
              (typeof feature.description === "string" ? (
                <div
                  className={cn(
                    "mb-8 text-sm sm:mb-10 md:text-base",
                    descriptionClassName,
                  )}
                >
                  {feature.description}
                </div>
              ) : (
                <div
                  className={cn(
                    "mb-8 text-sm sm:mb-10 md:text-base",
                    descriptionClassName,
                  )}
                >
                  {feature.description}
                </div>
              ))}
            {(feature.checklistItems && feature.checklistItems.length > 0) ||
            feature.checklistSlot ? (
              <ul
                className={cn(
                  "mt-auto space-y-2 sm:space-y-3",
                  checklistClassName,
                )}
              >
                {renderChecklistItems(feature)}
              </ul>
            ) : null}

            {actionsContent({
              actions: feature.actions,
              actionsSlot: feature.actionsSlot,
            }) && (
              <div className="flex items-center flex-wrap gap-4 md:gap-2">
                {actionsContent({
                  actions: feature.actions,
                  actionsSlot: feature.actionsSlot,
                })}
              </div>
            )}
          </div>
          <div
            className={cn(
              "relative order-first max-h-80 md:order-last md:max-h-[500px]",
              feature.imageWrapperClassName,
            )}
          >
            {cardImg(feature)}
            <span
              className={cn(
                "absolute top-5 left-5 flex size-6 items-center justify-center rounded-sm bg-primary font-mono text-xs text-primary-foreground md:top-10 md:left-10",
                badgeClassName,
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
      );
    });
  }, [
    featuresSlot,
    features,
    cardClassName,
    titleClassName,
    descriptionClassName,
    checklistClassName,
    badgeClassName,
    optixFlowConfig,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="flex flex-col space-y-6 md:space-y-16">
        {title || description ? (
          <div className="flex flex-col gap-4">
            {title &&
              (typeof title === "string" ? (
                <h2
                  className={cn(
                    "text-xl font-medium tracking-tight md:text-2xl lg:text-3xl text-balance",
                    titleClassName,
                  )}
                >
                  {title}
                </h2>
              ) : (
                <div className={titleClassName}>{title}</div>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p
                  className={cn("max-w-lg text-balance", descriptionClassName)}
                >
                  {description}
                </p>
              ) : (
                <div
                  className={cn("max-w-lg text-balance", descriptionClassName)}
                >
                  {description}
                </div>
              ))}
          </div>
        ) : null}

        <div
          className={cn(
            "space-y-4 md:space-y-10 rounded-lg border-none md:border p-0 md:p-10",
            cardsWrapperClassName,
          )}
        >
          {featuresContent}
        </div>
      </div>
    </Section>
  );
}
