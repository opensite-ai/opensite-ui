"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getTextColor, getAccentColor } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Card } from "../../ui/card";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface HeroSplitIconCardsItem {
  /**
   * Card title
   */
  title: string;
  /**
   * Card supporting text
   */
  subtitle?: string;
  /**
   * Icon name for the card
   */
  icon: string;
  /**
   * Optional link destination
   */
  href?: string;
}

export interface HeroSplitIconCardsProps {
  /**
   * Eyebrow label above the heading
   */
  eyebrow?: React.ReactNode;
  /**
   * Hero heading text
   */
  heading?: React.ReactNode;
  /**
   * Supporting description text
   */
  description?: React.ReactNode;
  /**
   * Primary call-to-action configuration
   */
  primaryCta?: {
    label: string;
    href: string;
  };
  /**
   * Secondary call-to-action configuration
   */
  secondaryCta?: {
    label: string;
    href: string;
  };
  /**
   * Custom slot for actions (overrides primaryCta and secondaryCta)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Optional custom content for the left column
   */
  children?: React.ReactNode;
  /**
   * Icon card items for the right column
   */
  cardItems?: HeroSplitIconCardsItem[];
  /**
   * Custom slot for cards (overrides cardItems array)
   */
  cardsSlot?: React.ReactNode;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  verticalSpacing?: SectionSpacing;
  /**
   * Background pattern
   */
  pattern?: PatternName;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
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
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * HeroSplitIconCards - Two-column hero layout with text content on the left and
 * a stacked list of icon cards on the right. Ideal for service pages that need
 * an explanatory hero plus quick benefit callouts.
 */
export function HeroSplitIconCards({
  sectionId = "hero-split-icon-cards",
  eyebrow,
  heading,
  description,
  primaryCta,
  secondaryCta,
  actionsSlot,
  children,
  cardItems,
  cardsSlot,
  background,
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  verticalSpacing,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "pt-32 pb-8 md:pt-32 md:pb-32",
}: HeroSplitIconCardsProps): React.JSX.Element {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!primaryCta && !secondaryCta) return null;

    return (
      <div className="flex flex-wrap gap-4">
        {primaryCta && (
          <Pressable href={primaryCta.href} size="lg" variant="default">
            {primaryCta.label}
          </Pressable>
        )}
        {secondaryCta && (
          <Pressable href={secondaryCta.href} size="lg" variant="outline">
            {secondaryCta.label}
          </Pressable>
        )}
      </div>
    );
  }, [actionsSlot, primaryCta, secondaryCta]);

  const renderCards = useMemo(() => {
    if (cardsSlot) return cardsSlot;
    if (!cardItems || cardItems.length === 0) return null;

    return (
      <div className="grid grid-cols-1 gap-4">
        {cardItems.map((item, idx) => {
          const card = (
            <Card className="h-full border-border/60 px-0 py-0">
              <div className="flex items-start gap-4 p-6">
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-xl",
                    `${getAccentColor(background)}/10`,
                    getAccentColor(background),
                  )}
                >
                  <DynamicIcon name={item.icon} size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold ">{item.title}</h3>
                  {item.subtitle ? (
                    <p
                      className={cn(
                        "mt-2 text-sm",
                        getTextColor(background, "muted"),
                      )}
                    >
                      {item.subtitle}
                    </p>
                  ) : null}
                </div>
              </div>
            </Card>
          );

          return item.href ? (
            <Pressable href={item.href} key={idx} className="block">
              {card}
            </Pressable>
          ) : (
            <div key={idx}>{card}</div>
          );
        })}
      </div>
    );
  }, [cardsSlot, cardItems]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={verticalSpacing || spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("overflow-hidden", className)}
      containerClassName={containerClassName}
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div className={cn("space-y-6", contentClassName)}>
          {children ? (
            children
          ) : (
            <>
              {eyebrow &&
                (typeof eyebrow === "string" ? (
                  <p
                    className={cn(
                      "text-xs font-semibold uppercase tracking-[0.25em]",
                      getAccentColor(background),
                    )}
                  >
                    {eyebrow}
                  </p>
                ) : (
                  eyebrow
                ))}
              {heading &&
                (typeof heading === "string" ? (
                  <h2
                    className={cn(
                      "text-3xl font-bold md:text-4xl",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h2>
                ) : (
                  <h2
                    className={cn(
                      "text-3xl font-bold md:text-4xl",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h2>
                ))}
              {description &&
                (typeof description === "string" ? (
                  <p
                    className={cn(
                      "text-lg",
                      getTextColor(background, "muted"),
                      descriptionClassName,
                    )}
                  >
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                ))}
              {renderActions}
            </>
          )}
        </div>

        {renderCards}
      </div>
    </Section>
  );
}
