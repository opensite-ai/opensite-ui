"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

export interface FeatureChecklistItem {
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
}

const defaultActions: ActionConfig[] = [
  {
    label: "Learn more",
    href: "#",
    variant: "outline",
    iconAfter: <DynamicIcon name="lucide/chevron-right" size={16} className="ml-2" />,
  },
];

const defaultChecklistItems: (string | FeatureChecklistItem)[] = [
  "Quality",
  "Multi-purpose",
  "Easy to use",
  "Fast",
];

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
  title = "Built with the latest technology stack",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum alias unde et doloremque dignissimos error temporibus quisquam porro ducimus esse quod, a officiis.",
  imageSrc = blockBrandedIconsAndPlaceholders.placeholder1,
  imageAlt = "Feature illustration",
  imageSlot,
  actions = defaultActions,
  actionsSlot,
  checklistItems = defaultChecklistItems,
  checklistSlot,
  className,
  containerClassName,
  contentWrapperClassName,
  imageClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  checklistClassName,
  optixFlowConfig,
}: FeatureChecklistImageProps): React.JSX.Element {
  const renderActions = () => {
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
            className={cn("mt-6", action.className)}
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
          className={cn("mt-6", action.className)}
          aria-label={action["aria-label"]}
          asButton
        >
          {action.icon}
          {action.label}
          {action.iconAfter}
        </Pressable>
      );
    });
  };

  const renderImage = () => {
    if (imageSlot) return imageSlot;

    return (
      <Img
        src={imageSrc}
        alt={imageAlt}
        className={cn("max-h-96 w-full rounded-lg object-cover md:max-h-[500px] md:w-1/2", imageClassName)}
        loading="lazy"
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  const renderChecklist = () => {
    if (checklistSlot) return checklistSlot;
    if (!checklistItems || checklistItems.length === 0) return null;

    return checklistItems.map((item, index) => {
      const isString = typeof item === "string";
      const content = isString ? item : item.content;
      const iconElement = isString ? (
        <DynamicIcon name="lucide/circle-check-big" size={16} />
      ) : (
        item.icon ?? (item.iconName ? <DynamicIcon name={item.iconName} size={16} /> : <DynamicIcon name="lucide/circle-check-big" size={16} />)
      );
      const itemClassName = isString ? undefined : item.className;

      return (
        <li key={index} className={cn("flex items-center gap-3", itemClassName)}>
          {iconElement}
          {content}
        </li>
      );
    });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container max-w-6xl", containerClassName)}>
        <div className={cn("flex flex-col gap-12 md:flex-row", contentWrapperClassName)}>
          {renderImage()}
          <div className={cn("lg:p-10", contentClassName)}>
            {title && (
              typeof title === "string" ? (
                <h2 className={cn("text-3xl font-medium text-balance md:text-5xl", titleClassName)}>
                  {title}
                </h2>
              ) : (
                <div className={cn("text-3xl font-medium text-balance md:text-5xl", titleClassName)}>
                  {title}
                </div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("mt-1 text-muted-foreground md:mt-6", descriptionClassName)}>{description}</p>
              ) : (
                <div className={cn("mt-1 text-muted-foreground md:mt-6", descriptionClassName)}>{description}</div>
              )
            )}
            <div className={actionsClassName}>
              {renderActions()}
            </div>
            <ul className={cn("mt-10 flex-wrap items-center gap-6 space-y-6 md:flex md:space-y-0", checklistClassName)}>
              {renderChecklist()}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
