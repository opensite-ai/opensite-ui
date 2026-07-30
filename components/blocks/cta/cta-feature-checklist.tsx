"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";

export interface ChecklistItem {
  /**
   * Text content of the checklist item
   */
  text: string;
  /**
   * Optional icon name (defaults to lucide/check)
   */
  iconName?: string;
  /**
   * Optional custom icon element
   */
  icon?: React.ReactNode | string;
}

export interface CtaFeatureChecklistProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content below the heading
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
   * Array of checklist items to display
   */
  items?: (string | ChecklistItem)[];
  /**
   * Custom slot for rendering checklist (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the card wrapper
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
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
   * Additional CSS classes for the checklist wrapper
   */
  checklistClassName?: string;
  /**
   * Additional CSS classes for each checklist item
   */
  checklistItemClassName?: string;
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
  pattern?: PatternName;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * CtaFeatureChecklist - A CTA section with heading, description, action button,
 * and a checklist of key features displayed in a muted background card layout.
 * Ideal for highlighting product benefits alongside a call to action.
 *
 * @example
 * ```tsx
 * <CtaFeatureChecklist
 *   heading="Start Building Today"
 *   description="Get access to all features with our starter plan."
 *   actions={[{ label: "Get Started", href: "/signup", variant: "default" }]}
 *   items={["Easy Integration", "24/7 Support", "Scalable Performance"]}
 * />
 * ```
 */
export function CtaFeatureChecklist({
  sectionId = "cta-feature-checklist",
  heading,
  description,
  actions,
  actionsSlot,
  items,
  itemsSlot,
  className,
  cardClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  checklistClassName,
  checklistItemClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-32 md:py-32",
  pattern,
  patternOpacity,
}: CtaFeatureChecklistProps): React.JSX.Element {
  const checklistContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <ul
        className={cn(
          "flex flex-col space-y-2 text-sm font-medium",
          checklistClassName,
        )}
      >
        {items.map((item, idx) => {
          const isString = typeof item === "string";
          const text = isString ? item : item.text;
          const iconName = isString
            ? "lucide/check"
            : item.iconName || "lucide/check";
          const icon = isString ? null : item.icon;

          return (
            <li
              className={cn("flex items-center", checklistItemClassName)}
              key={idx}
            >
              {icon === "" ? null : icon != null ? (
                <DynamicIcon
                  name={icon}
                  size={16}
                  className="mr-4 shrink-0"
                />
              ) : (
                <DynamicIcon
                  name={iconName}
                  size={16}
                  className="mr-4 shrink-0"
                />
              )}
              {text}
            </li>
          );
        })}
      </ul>
    );
  }, [itemsSlot, items, checklistClassName, checklistItemClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className="flex justify-center">
          <div className="max-w-5xl">
            <div
              className={cn(
                "flex flex-col items-start justify-between gap-8 rounded-lg px-6 py-10 md:flex-row lg:px-20 lg:py-16",
                cardClassName,
              )}
            >
              <div className={cn("md:w-1/2", contentClassName)}>
                {heading &&
                  (typeof heading === "string" ? (
                    <h4
                      className={cn(
                        "mb-1 text-2xl font-bold md:text-3xl",
                        headingClassName,
                      )}
                    >
                      {heading}
                    </h4>
                  ) : (
                    heading
                  ))}
                {description &&
                  (typeof description === "string" ? (
                    <p className={cn(descriptionClassName)}>{description}</p>
                  ) : (
                    description
                  ))}
                <BlockActions
                  actions={actions}
                  actionsClassName={actionsClassName}
                  actionsSlot={actionsSlot}
                />
              </div>
              <div className="md:w-1/3">{checklistContent}</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
