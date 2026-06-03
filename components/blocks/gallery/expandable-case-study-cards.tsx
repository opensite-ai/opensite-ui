"use client";

import * as React from "react";
import { useState, useMemo } from "react";
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
  /** Optional Section ID */
  sectionId?: string;
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
  sectionId = "expandable-case-study-cards",
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
          "group h-[280px] w-full lg:h-auto lg:w-auto lg:transform-gpu lg:transition-all lg:data-[state=closed]:w-[20%] lg:data-[state=closed]:duration-500 lg:data-[state=open]:w-[60%] lg:data-[state=open]:duration-400",
          item.className,
          cardClassName,
        )}
        onMouseEnter={() => {
          setSelection(item.id);
        }}
      >
        <a
          href={item.href}
          className="relative block h-full w-full overflow-hidden rounded-xl"
        >
          {/* Full-bleed background image */}
          <div className="absolute inset-0 lg:group-data-[state=closed]:blur-xs lg:transition-[filter] lg:duration-500">
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
          {/* Black gradient from bottom for text readability */}
          <div className="absolute inset-x-0 bottom-0 h-[70%] bg-linear-to-t from-black/90 from-30% to-transparent"></div>
          {/* Content area - positioned at bottom, always visible on mobile */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 pb-5 lg:transition-opacity lg:delay-200 lg:duration-500 lg:group-data-[state=closed]:opacity-0">
            {/* Badges - above content */}
            {item.badges && item.badges.length > 0 && (
              <div
                className={cn(
                  "mb-3 flex flex-wrap items-center gap-2",
                  badgesClassName,
                )}
              >
                {item.badges.map((badge, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className={badgeClassName}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
            {/* Logo, title, description, and arrow */}
            <div className="flex items-end justify-between gap-3">
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                {item.logo && (
                  <div className="mb-1 flex items-center">
                    <Img
                      src={item.logo}
                      alt={item.logoAlt || item.company || "Logo"}
                      className={cn(
                        "block h-6 max-h-6 w-auto max-w-none object-contain invert lg:h-8 lg:max-h-8",
                        logoClassName,
                      )}
                      loading="lazy"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                )}
                <div className="text-base font-medium text-white lg:text-lg">
                  {item.title}
                </div>
                {item.description && (
                  <div className="text-sm text-white/80">
                    {item.description}
                  </div>
                )}
              </div>
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 lg:size-10">
                <DynamicIcon name="lucide/arrow-up-right" size={20} />
              </div>
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
      id={sectionId}
      title={title}
      subtitle={description}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName="px-6 sm:px-6 md:px-6 lg:px-8"
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
