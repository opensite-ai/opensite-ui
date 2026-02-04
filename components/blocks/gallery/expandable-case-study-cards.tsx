"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import {
  cn,
  getNestedCardBg,
  getNestedCardTextColor,
} from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Item configuration for expandable case study cards.
 */
export interface ExpandableCaseStudyItem {
  /**
   * Unique identifier for the item
   */
  id: string;
  /**
   * Title of the case study
   */
  title: React.ReactNode;
  /**
   * Optional description for the case study
   */
  description?: React.ReactNode;
  /**
   * Link URL for the case study
   */
  href: string;
  /**
   * Background image source URL
   */
  image: string;
  /**
   * Alt text for the background image
   */
  imageAlt?: string;
  /**
   * Company logo source URL (optional)
   */
  logo?: string;
  /**
   * Alt text for the logo
   */
  logoAlt?: string;
  /**
   * Company name
   */
  company?: string;
  /**
   * Array of badge labels
   */
  badges?: React.ReactNode[];
  /**
   * Additional CSS classes for the item
   */
  className?: string;
}

export interface ExpandableCaseStudyCardsProps {
  /**
   * Section title (displayed above cards)
   */
  title?: string;
  /**
   * Section description/subtitle (displayed above cards)
   */
  description?: string;
  /**
   * Array of case study items to display
   */
  items?: ExpandableCaseStudyItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the cards container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for each image
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for each logo
   */
  logoClassName?: string;
  /**
   * Additional CSS classes for the badges container
   */
  badgesClassName?: string;
  /**
   * Additional CSS classes for each badge
   */
  badgeClassName?: string;
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
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * ExpandableCaseStudyCards displays case study cards that expand on hover.
 *
 * Features a horizontal row of cards where the hovered card expands to 60% width
 * while others shrink to 20%. Each card shows a background image, title with optional
 * description, badges, and an arrow icon. Ideal for showcasing portfolio items,
 * case studies, or featured projects with visual emphasis on the selected item.
 *
 * @example
 * ```tsx
 * <ExpandableCaseStudyCards
 *   title="Our Work"
 *   description="Featured case studies"
 *   items={[
 *     {
 *       id: "1",
 *       title: "E-commerce Platform Redesign",
 *       description: "A complete overhaul of the shopping experience",
 *       href: "/case-studies/ecommerce",
 *       image: "/images/case-1.jpg",
 *       badges: ["E-commerce", "UX Design"]
 *     },
 *     {
 *       id: "2",
 *       title: "Mobile App Launch",
 *       description: "Cross-platform development for iOS and Android",
 *       href: "/case-studies/mobile-app",
 *       image: "/images/case-2.jpg",
 *       logo: "/logos/client-2.svg",
 *       company: "TechCorp",
 *       badges: ["Mobile", "React Native"]
 *     }
 *   ]}
 *   background="gray"
 *   spacing="lg"
 * />
 * ```
 */
export function ExpandableCaseStudyCards({
  title,
  description,
  items,
  itemsSlot,
  className,
  containerClassName,
  cardClassName,
  imageClassName,
  logoClassName,
  badgesClassName,
  badgeClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: ExpandableCaseStudyCardsProps): React.JSX.Element {
  const [selection, setSelection] = useState(items?.[0]?.id);

  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item, itemIndex) => (
      <div
        key={item.id}
        data-state={selection === item.id ? "open" : "closed"}
        className={cn(
          'group max-lg:w-full max-lg:flex-1 max-md:h-[200px] md:max-lg:aspect-1336/420 lg:transform-gpu lg:transition-all lg:data-[state="closed"]:w-[20%] lg:data-[state="closed"]:duration-500 lg:data-[state="open"]:w-[60%] lg:data-[state="open"]:duration-400',
          item.className,
          cardClassName,
        )}
        onMouseEnter={() => {
          setSelection(item.id);
        }}
      >
        <a
          href={item.href}
          className="relative block h-full w-full overflow-hidden rounded-xl bg-primary text-primary-foreground dark:bg-card"
        >
          <div className='absolute -inset-[50%] hidden h-[200%] w-[200%] md:block lg:group-data-[state="closed"]:blur-sm'>
            <div className="absolute top-[calc(25%+40px)] aspect-square h-[calc(50%+40px)] max-lg:right-[calc(50%+40px)] lg:right-[50%]">
              <div className="h-full w-full overflow-clip rounded-xl">
                <Img
                  src={item.image}
                  alt={
                    typeof item.title === "string"
                      ? item.title
                      : item.imageAlt || "Case study image"
                  }
                  className={cn(
                    "h-full w-full object-cover object-center",
                    imageClassName,
                  )}
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </div>

            <div
              className={cn(
                "absolute top-[50%] left-[50%] flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full max-lg:hidden",
                getNestedCardBg(background, "accent"),
                getNestedCardTextColor(background),
              )}
            >
              <DynamicIcon name="lucide/plus" size={32} />
            </div>
            <div className="absolute inset-x-0 bottom-0 hidden h-[50%] bg-linear-to-t from-primary from-50% to-transparent lg:block"></div>
          </div>
          <div className="relative flex flex-col justify-between gap-4 md:absolute md:inset-0 md:max-lg:inset-x-[50%] md:max-lg:w-[50%]">
            <div className='flex flex-col gap-3 p-4 pt-6 transition-all delay-200 duration-500 lg:group-data-[state="closed"]:opacity-0'>
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-2">
                  {item.logo && (
                    <div className="mb-1">
                      <Img
                        src={item.logo}
                        alt={item.logoAlt || item.company || "Logo"}
                        className={cn("h-6 max-w-[120px] object-contain object-left lg:h-8 lg:max-w-[150px]", logoClassName)}
                        loading="lazy"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                  )}
                  <div className="text-base font-medium lg:text-lg">
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="text-sm text-primary-foreground/70">
                      {item.description}
                    </div>
                  )}
                </div>
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 lg:size-10",
                    getNestedCardBg(background, "card"),
                  )}
                >
                  <DynamicIcon name="lucide/arrow-up-right" size={20} />
                </div>
              </div>
            </div>
            <div
              className={cn(
                'flex h-20 items-center gap-2 px-4 pb-4 transition-opacity delay-200 duration-500 lg:group-data-[state="closed"]:opacity-0',
                badgesClassName,
              )}
            >
              {item.badges?.map((badge, idx) => (
                <Badge key={idx} variant="secondary" className={badgeClassName}>
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </a>
      </div>
    ));
  }, [
    itemsSlot,
    items,
    selection,
    cardClassName,
    imageClassName,
    logoClassName,
    badgesClassName,
    badgeClassName,
    optixFlowConfig,
    background,
  ]);

  return (
    <Section
      title={title}
      subtitle={description}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div
        className={cn(
          "flex flex-col gap-5 lg:aspect-1336/420 lg:flex-row",
          containerClassName,
        )}
      >
        {itemsContent}
      </div>
    </Section>
  );
}
