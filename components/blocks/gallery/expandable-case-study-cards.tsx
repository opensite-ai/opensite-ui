"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
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
   * Company logo source URL
   */
  logo: string;
  /**
   * Alt text for the logo
   */
  logoAlt?: string;
  /**
   * Company name
   */
  company: string;
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
  pattern?: PatternName | string;
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
 * while others shrink to 20%. Each card shows a background image, company logo,
 * badges, and a title with an arrow icon. Ideal for showcasing portfolio items,
 * case studies, or featured projects with visual emphasis on the selected item.
 *
 * @example
 * ```tsx
 * <ExpandableCaseStudyCards
 *   items={[
 *     {
 *       id: "1",
 *       title: "E-commerce Platform Redesign",
 *       href: "/case-studies/ecommerce",
 *       image: "/images/case-1.jpg",
 *       logo: "/logos/client-1.svg",
 *       company: "TechCorp",
 *       badges: ["E-commerce", "UX Design"]
 *     }
 *   ]}
 * />
 * ```
 */
export function ExpandableCaseStudyCards({
  items,
  itemsSlot,
  className,
  containerClassName,
  cardClassName,
  imageClassName,
  logoClassName,
  badgesClassName,
  badgeClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: ExpandableCaseStudyCardsProps): React.JSX.Element {
  const [selection, setSelection] = useState(items?.[0]?.id);

  const renderItems = () => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return items.map((item) => (
      <div
        key={item.id}
        data-state={selection === item.id ? "open" : "closed"}
        className={cn(
          'group max-lg:w-full max-lg:flex-1 max-md:h-[200px] md:max-lg:aspect-1336/420 lg:transform-gpu lg:transition-all lg:data-[state="closed"]:w-[20%] lg:data-[state="closed"]:duration-500 lg:data-[state="open"]:w-[60%] lg:data-[state="open"]:duration-400',
          item.className,
          cardClassName
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
                  alt={typeof item.title === "string" ? item.title : (item.imageAlt || "Case study image")}
                  className={cn("h-full w-full object-cover object-center", imageClassName)}
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </div>
            <div className="absolute inset-y-[25%] left-[50%] flex aspect-389/420 h-[50%] items-center justify-center max-lg:hidden">
              <Img
                src={item.logo}
                alt={item.logoAlt || item.company}
                className={cn("h-8 invert", logoClassName)}
                loading="lazy"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
            <div className="absolute top-[50%] left-[50%] flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent max-lg:hidden">
              <DynamicIcon
                name="lucide/plus"
                size={32}
                className="text-accent-foreground"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 hidden h-[50%] bg-linear-to-t from-primary from-50% to-transparent lg:block"></div>
          </div>
          <div className="relative flex flex-col justify-between gap-4 md:absolute md:inset-0 md:max-lg:inset-x-[50%] md:max-lg:w-[50%]">
            <div className={cn('flex h-20 items-center gap-2 p-4 transition-opacity delay-200 duration-500 lg:group-data-[state="closed"]:opacity-0', badgesClassName)}>
              {item.badges?.map((badge, idx) => (
                <Badge key={idx} variant="secondary" className={badgeClassName}>
                  {badge}
                </Badge>
              ))}
            </div>
            <div className='flex flex-col gap-2 p-4 transition-all delay-200 duration-500 lg:group-data-[state="closed"]:translate-y-4 lg:group-data-[state="closed"]:opacity-0'>
              <div className="lg:hidden">
                <Img
                  src={item.logo}
                  alt={item.logoAlt || item.company}
                  className={cn("h-5 invert lg:h-6", logoClassName)}
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="text-base font-medium lg:text-lg">
                  {item.title}
                </div>
                <div className="flex size-8 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 lg:size-10">
                  <DynamicIcon name="lucide/arrow-up-right" size={20} />
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={cn("flex flex-col gap-5 lg:aspect-1336/420 lg:flex-row", containerClassName)}>
        {renderItems()}
      </div>
    </Section>
  );
}
