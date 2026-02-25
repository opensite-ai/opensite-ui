"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";
import { Badge } from "@/src";

export interface AboutExpandableValueItem {
  /**
   * Unique identifier for the value
   */
  id: string;
  /**
   * Icon element or icon name
   */
  icon?: React.ReactNode;
  /**
   * Value title
   */
  title?: React.ReactNode;
  /**
   * Short description shown when collapsed
   */
  shortDescription?: React.ReactNode;
  /**
   * Long description shown when expanded
   */
  longDescription?: React.ReactNode;
  /**
   * Examples of how the value is practiced
   */
  examples?: React.ReactNode[];
}

export interface AboutExpandableValuesProps {
  /**
   * Badge/label text
   */
  badgeText?: React.ReactNode;
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Supporting description text
   */
  description?: React.ReactNode;
  /**
   * Array of value items
   */
  values?: AboutExpandableValueItem[];
  /**
   * Custom slot for rendering values (overrides values array)
   */
  valuesSlot?: React.ReactNode;
  /**
   * Bottom CTA heading
   */
  ctaHeading?: React.ReactNode;
  /**
   * Bottom CTA description
   */
  ctaDescription?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
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
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the values grid
   */
  valuesClassName?: string;
  /**
   * Additional CSS classes for the CTA section
   */
  ctaClassName?: string;
  /**
   * Additional CSS classes for the CTA heading
   */
  ctaHeadingClassName?: string;
  /**
   * Additional CSS classes for the CTA description
   */
  ctaDescriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
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
}

/**
 * About Expandable Values - An interactive values section with expandable cards
 * that reveal detailed descriptions and examples when clicked.
 *
 * Layout: Responsive grid of value cards that expand to full width when active.
 * Key features: Expandable cards, icon integration, example lists, CTA banner.
 * Best for: Company values pages, culture showcases, brand identity sections.
 *
 * @example
 * ```tsx
 * <AboutExpandableValues
 *   badgeText="Our Core Values"
 *   heading="The Principles That Guide Us"
 *   values={[
 *     {
 *       id: "integrity",
 *       icon: "lucide/shield",
 *       title: "Integrity",
 *       shortDescription: "Doing what's right.",
 *       longDescription: "We believe in honesty...",
 *       examples: ["Transparent pricing", "Honest communication"],
 *     },
 *   ]}
 * />
 * ```
 */
export function AboutExpandableValues({
  badgeText,
  heading,
  description,
  values,
  valuesSlot,
  ctaHeading,
  ctaDescription,
  actions,
  actionsSlot,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  valuesClassName,
  ctaClassName,
  ctaHeadingClassName,
  ctaDescriptionClassName,
  actionsClassName,
  background,
  spacing = "xl",
  pattern,
  patternOpacity,
}: AboutExpandableValuesProps): React.JSX.Element {
  const [expandedValue, setExpandedValue] = React.useState<string | null>(null);

  const toggleExpand = useCallback((id: string) => {
    setExpandedValue((prev) => (prev === id ? null : id));
  }, []);

  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={actionsClassName}>
        {actions.map((action, idx) => (
          <Pressable
            key={idx}
            href={action.href}
            onClick={action.onClick}
            variant={action.variant || "default"}
            size={action.size}
            asButton
          >
            {action.label}
          </Pressable>
        ))}
      </div>
    );
  }, [actionsSlot, actions, actionsClassName]);

  const valuesContent = useMemo(() => {
    if (valuesSlot) return valuesSlot;
    if (!values || values.length === 0) return null;

    return (
      <div className={cn("grid grid-cols-1 gap-6 mt-8", valuesClassName)}>
        {values.map((value) => (
          <div
            key={value.id}
            className={cn(
              "group overflow-hidden rounded-xl border transition-all duration-300 col-span-1",
              expandedValue === value.id ? "shadow-xl" : "shadow-md",
            )}
          >
            <button
              onClick={() => toggleExpand(value.id)}
              className="flex w-full items-start justify-between p-6 text-left"
              type="button"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 size-12 flex items-center justify-center rounded-md bg-primary text-primary-foreground shadow-lg">
                  {value.icon}
                </div>
                <div>
                  {value.title &&
                    (typeof value.title === "string" ? (
                      <h3 className="text-lg font-bold">{value.title}</h3>
                    ) : (
                      value.title
                    ))}
                  {value.shortDescription &&
                    (typeof value.shortDescription === "string" ? (
                      <p className={cn("mt-1 text-sm")}>
                        {value.shortDescription}
                      </p>
                    ) : (
                      <div className="mt-1">{value.shortDescription}</div>
                    ))}
                </div>
              </div>
              <DynamicIcon
                name="lucide/chevron-down"
                size={20}
                className={cn(
                  "mt-1 shrink-0 transition-transform duration-300",
                  expandedValue === value.id ? "rotate-180" : "",
                )}
              />
            </button>

            {expandedValue === value.id && (
              <div className="space-y-6 px-6 pb-6">
                {value.longDescription && (
                  <div
                    className={cn(
                      "rounded-lg p-4 shadow-md",
                      "bg-muted text-muted-foreground",
                    )}
                  >
                    {typeof value.longDescription === "string" ? (
                      <p className="relative">{value.longDescription}</p>
                    ) : (
                      value.longDescription
                    )}
                  </div>
                )}

                {value.examples && value.examples.length > 0 && (
                  <div>
                    <h4 className={cn("mb-2 text-sm font-semibold")}>
                      How we put this into practice:
                    </h4>
                    <ul className="space-y-2">
                      {value.examples.map((example, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div
                            className={cn(
                              "mt-1 flex size-5 shrink-0 items-center justify-center rounded-full",
                            )}
                          >
                            <DynamicIcon name="lucide/check" size={12} />
                          </div>
                          {typeof example === "string" ? (
                            <span className="text-sm pt-2">{example}</span>
                          ) : (
                            example
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }, [valuesSlot, values, valuesClassName, expandedValue, toggleExpand]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div
        className={cn(
          "mx-auto max-w-3xl space-y-4 text-center",
          headerClassName,
        )}
      >
        {badgeText &&
          (typeof badgeText === "string" ? (
            <Badge className={cn("px-3", badgeClassName)}>{badgeText}</Badge>
          ) : (
            badgeText
          ))}
        {heading &&
          (typeof heading === "string" ? (
            <h2
              className={cn(
                "text-3xl font-bold tracking-tight text-balance",
                headingClassName,
              )}
            >
              {heading}
            </h2>
          ) : (
            heading
          ))}
        {description &&
          (typeof description === "string" ? (
            <p className={cn("text-balance", descriptionClassName)}>
              {description}
            </p>
          ) : (
            description
          ))}
      </div>

      {valuesContent}

      <div
        className={cn(
          "relative mt-8 rounded-lg p-8 bg-muted text-muted-foreground",
          ctaClassName,
        )}
      >
        <div className="mx-auto max-w-3xl space-y-6 text-center flex flex-col items-center gap-6">
          {ctaHeading &&
            (typeof ctaHeading === "string" ? (
              <h3 className={cn("text-2xl font-bold", ctaHeadingClassName)}>
                {ctaHeading}
              </h3>
            ) : (
              ctaHeading
            ))}
          {ctaDescription &&
            (typeof ctaDescription === "string" ? (
              <p className={cn(ctaDescriptionClassName)}>{ctaDescription}</p>
            ) : (
              ctaDescription
            ))}
          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={actionsClassName}
          />
        </div>
      </div>
    </Section>
  );
}
