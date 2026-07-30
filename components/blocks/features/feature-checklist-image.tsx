"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
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

export interface FeatureChecklistItem {
  /**
   * Checklist item content
   */
  content?: React.ReactNode;
  /**
   * Text content alias used by some generated payloads
   */
  text?: React.ReactNode;
  /**
   * Label content alias used by some generated payloads
   */
  label?: React.ReactNode;
  /**
   * Checklist item title
   */
  title?: React.ReactNode;
  /**
   * Checklist item description
   */
  description?: React.ReactNode;
  /**
   * Icon element (overrides default check icon)
   */
  icon?: React.ReactNode | string;
  /**
   * Icon name for dynamic icon loading
   */
  iconName?: string;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
}

export interface FeatureChecklistImageProps {
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text for accessibility
   */
  imageAlt?: string;
  /**
   * Image element or ReactNode (overrides imageSrc)
   */
  imageSlot?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of checklist items (can be strings or FeatureChecklistItem objects)
   */
  checklistItems?: (string | FeatureChecklistItem)[];
  /**
   * Alias for checklistItems used by registry examples and builder payloads
   */
  benefits?: (string | FeatureChecklistItem)[];
  /**
   * Custom slot for rendering checklist (overrides checklistItems array)
   */
  checklistSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentWrapperClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the checklist
   */
  checklistClassName?: string;
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
  /** Optional Section ID */
  sectionId?: string;
}

function isRenderableNode(value: React.ReactNode): boolean {
  return (
    value !== null &&
    value !== undefined &&
    typeof value !== "boolean" &&
    !(typeof value === "string" && value.trim().length === 0)
  );
}

function firstRenderableNode(
  ...values: React.ReactNode[]
): React.ReactNode | undefined {
  return values.find(isRenderableNode);
}

/**
 * Feature Checklist Image - Two-column layout with large image and text content
 * featuring a checklist of benefits.
 *
 * Layout: Split layout with image on left, content with checklist on right.
 * Key features: Large rounded image, checklist with check icons, CTA button.
 * Best for: Technology stack highlights, feature benefits, product capabilities.
 *
 * @example
 * ```tsx
 * <FeatureChecklistImage
 *   title="Built with the latest technology stack"
 *   description="Modern tools and frameworks for optimal performance."
 *   imageSrc="/tech-stack.jpg"
 *   checklistItems={["Quality", "Multi-purpose", "Easy to use", "Fast"]}
 *   actions={[{ label: "Learn more", href: "/features", variant: "outline" }]}
 * />
 * ```
 */
export function FeatureChecklistImage({
  sectionId = "feature-checklist-image",
  title,
  description,
  titleClassName,
  descriptionClassName,
  imageSrc,
  imageAlt,
  imageSlot,
  actions,
  actionsSlot,
  checklistItems,
  benefits,
  checklistSlot,
  className,
  containerClassName = "max-w-screen-2xl px-6 sm:px-6 md:px-6 lg:px-8",
  contentWrapperClassName,
  imageClassName,
  contentClassName,
  actionsClassName,
  checklistClassName,
  optixFlowConfig,
  background,
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureChecklistImageProps): React.JSX.Element {
  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      if (action.children) {
        return (
          <Pressable
            key={index}
            href={action.href}
            onClick={action.onClick}
            variant={action.variant}
            size={action.size}
            className={cn("", action.className)}
            aria-label={action["aria-label"]}
            asButton
          >
            {action.children}
          </Pressable>
        );
      }

      return (
        <Pressable
          key={index}
          href={action.href}
          onClick={action.onClick}
          variant={action.variant}
          size={action.size}
          className={cn("", action.className)}
          aria-label={action["aria-label"]}
          asButton
        >
          {action.icon === "" ? null : <DynamicIcon name={action.icon} />}
          {action.label}
          {action.iconAfter === "" ? null : (
            <DynamicIcon name={action.iconAfter} />
          )}
        </Pressable>
      );
    });
  }, [actionsSlot, actions]);

  const imageContent = useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!imageSrc) return null;

    return (
      <div
        className={cn(
          "relative aspect-[3/2] w-full overflow-hidden rounded-lg shadow-xl",
          imageClassName,
        )}
      >
        <Img
          src={imageSrc}
          alt={imageAlt || "Feature illustration"}
          className={cn(
            "block h-full w-full object-cover object-center",
            imageClassName,
          )}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    );
  }, [imageSlot, imageSrc, imageAlt, imageClassName, optixFlowConfig]);

  const checklistContent = useMemo(() => {
    if (checklistSlot) return checklistSlot;
    const items = checklistItems ?? benefits;
    if (!items || items.length === 0) return null;

    const renderedItems: React.ReactNode[] = [];

    items.forEach((item, index) => {
      const isString = typeof item === "string";
      const content = isString
        ? item
        : firstRenderableNode(item.content, item.text, item.label);
      const title = isString ? undefined : item.title;
      const description = isString ? undefined : item.description;

      if (
        !isRenderableNode(content) &&
        !isRenderableNode(title) &&
        !isRenderableNode(description)
      ) {
        return;
      }

      const iconValue = isString
        ? "lucide/circle-check-big"
        : (item.icon ?? item.iconName ?? "lucide/circle-check-big");
      const iconElement =
        iconValue === "" ? null : (
          <DynamicIcon
            name={iconValue}
            size={20}
            className="h-5 w-5"
          />
        );
      const itemClassName = isString ? undefined : item.className;

      renderedItems.push(
        <li key={index} className={cn("flex items-start gap-3", itemClassName)}>
          <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center">
            {iconElement}
          </div>
          {isRenderableNode(content) ? (
            typeof content === "string" ? (
              <span className="text-base font-medium leading-relaxed md:text-lg">
                {content}
              </span>
            ) : (
              <div className="min-w-0 text-base font-medium leading-relaxed md:text-lg">
                {content}
              </div>
            )
          ) : (
            <div className="min-w-0">
              {isRenderableNode(title) &&
                (typeof title === "string" ? (
                  <h3 className="text-base font-semibold leading-snug md:text-lg">
                    {title}
                  </h3>
                ) : (
                  <div className="text-base font-semibold leading-snug md:text-lg">
                    {title}
                  </div>
                ))}
              {isRenderableNode(description) &&
                (typeof description === "string" ? (
                  <p className="mt-1 text-sm leading-relaxed text-current/75 md:text-base">
                    {description}
                  </p>
                ) : (
                  <div className="mt-1 text-sm leading-relaxed text-current/75 md:text-base">
                    {description}
                  </div>
                ))}
            </div>
          )}
        </li>,
      );
    });

    return renderedItems.length > 0 ? renderedItems : null;
  }, [checklistSlot, checklistItems, benefits]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div
        className={cn(
          "grid gap-8 md:gap-12 lg:items-center",
          imageContent ? "lg:grid-cols-2" : "lg:grid-cols-1",
          contentWrapperClassName,
        )}
      >
        {imageContent}
        <div
          className={cn(
            "flex min-w-0 flex-col gap-6 py-2 md:gap-8 md:py-0 lg:gap-10",
            imageContent && "lg:pl-8",
            contentClassName,
          )}
        >
          {title &&
            (typeof title === "string" ? (
              <h2
                className={cn(
                  "text-2xl font-semibold text-balance sm:text-3xl lg:text-4xl",
                  titleClassName,
                )}
              >
                {title}
              </h2>
            ) : (
              <div
                className={cn(
                  "text-2xl font-semibold text-balance sm:text-3xl lg:text-4xl",
                  titleClassName,
                )}
              >
                {title}
              </div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "relative text-base leading-relaxed md:text-lg",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div
                className={cn(
                  "relative text-base leading-relaxed md:text-lg",
                  descriptionClassName,
                )}
              >
                {description}
              </div>
            ))}
          {actionsContent && (
            <div
              className={cn(
                "flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center",
                actionsClassName,
              )}
            >
              {actionsContent}
            </div>
          )}
          {checklistContent && (
            <ul
              className={cn(
                "flex flex-col space-y-3 md:space-y-4",
                checklistClassName,
              )}
            >
              {checklistContent}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
