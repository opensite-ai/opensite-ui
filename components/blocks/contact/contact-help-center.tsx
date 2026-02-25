"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface ContactHelpCenterItem {
  /**
   * Card title
   */
  title: string;
  /**
   * Supporting description text
   */
  subtitle?: string;
  /*
   * Icon name for the card
   */
  icon: string;
  /**
   * Optional link destination
   */
  href?: string;
}

export interface ContactHelpCenterProps {
  /**
   * Eyebrow label above the heading
   */
  eyebrow?: React.ReactNode;
  /**
   * Heading text for the left column
   */
  heading?: React.ReactNode;
  /**
   * Description text for the left column
   */
  description?: React.ReactNode;
  /**
   * Title for the contact card list
   */
  /**
   * Background style variant for the section
   * @default "white"
   */
  background?: SectionBackground;
  /**
   * Vertical spacing/margin variant
   * @default "lg"
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
   * Additional CSS classes for the heading
   */
  cardTitle?: React.ReactNode;
  /**
   * Contact items to display
   */
  contactItems?: ContactHelpCenterItem[];
  /**
   * Custom slot for rendering contact items (overrides contactItems array)
   */
  contactItemsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the left column
   */
  leftColumnClassName?: string;
  /**
   * Additional CSS classes for the eyebrow text
   */
  eyebrowClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the card panel
   */
  cardPanelClassName?: string;
  /**
   * Additional CSS classes for the card title
   */
  cardTitleClassName?: string;
  /**
   * Additional CSS classes for the contact items container
   */
  contactItemsClassName?: string;
}

/**
 * ContactHelpCenter - Split layout with help copy on the left and
 * a contact card stack on the right. Works well for service centers,
 * support hubs, and onboarding touchpoints.
 */
export function ContactHelpCenter({
  eyebrow,
  heading,
  description,
  cardTitle,
  contactItems,
  background,
  pattern,
  patternOpacity,
  className,
  contactItemsSlot,
  spacing = "py-16 md:py-322",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  contentClassName,
  leftColumnClassName,
  eyebrowClassName,
  headingClassName,
  descriptionClassName,
  cardPanelClassName,
  cardTitleClassName,
  contactItemsClassName,
}: ContactHelpCenterProps): React.JSX.Element {
  const renderContactItems = () => {
    if (contactItemsSlot) return contactItemsSlot;
    if (!contactItems || contactItems.length === 0) return null;
    return contactItems.map((item, idx) => (
      <Pressable
        key={`${item.title}-${idx}`}
        href={item.href}
        className="flex items-start gap-4"
      >
        <div className="flex size-12 shrink-0 items-center justify-center">
          <DynamicIcon name={item.icon} size={20} />
        </div>
        <div className="flex flex-col items-start gap-1">
          <p className="font-semibold">{item.title}</p>
          {item.subtitle ? <p className="text-sm">{item.subtitle}</p> : null}
        </div>
      </Pressable>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className={cn("relative", contentClassName)}>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className={cn("space-y-5", leftColumnClassName)}>
              {eyebrow &&
                (typeof eyebrow === "string" ? (
                  <p
                    className={cn(
                      "text-sm font-semibold uppercase tracking-[0.2em]",
                      eyebrowClassName,
                    )}
                  >
                    {eyebrow}
                  </p>
                ) : (
                  <div className={eyebrowClassName}>{eyebrow}</div>
                ))}
              {heading &&
                (typeof heading === "string" ? (
                  <h2
                    className={cn(
                      "text-3xl font-bold md:text-4xl text-pretty",
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

            <div
              className={cn(
                "rounded-2xl bg-card text-card-foreground py-8 px-4 md:px-8 shadow-lg",
                cardPanelClassName,
              )}
            >
              {cardTitle ? (
                typeof cardTitle === "string" ? (
                  <h3 className={cn("text-xl font-bold", cardTitleClassName)}>
                    {cardTitle}
                  </h3>
                ) : (
                  cardTitle
                )
              ) : null}

              <div className={cn("mt-6 space-y-4", contactItemsClassName)}>
                {renderContactItems()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
