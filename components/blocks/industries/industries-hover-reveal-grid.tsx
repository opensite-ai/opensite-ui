"use client";

import * as React from "react";
import { motion, type Easing } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

const easeTransition: Easing = [0.25, 0.1, 0.25, 1];

export interface IndustryItem {
  /**
   * Industry name
   */
  name: React.ReactNode;
  /**
   * Industry description shown on hover
   */
  description: React.ReactNode;
  /**
   * Image source URL
   */
  image: string;
  /**
   * Alt text for the image
   */
  imageAlt: string;
  /**
   * URL for the industry link
   */
  url: string;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
}

export interface IndustriesHoverRevealGridProps {
  /**
   * Section heading displayed above the grid
   */
  heading?: React.ReactNode;
  /**
   * Custom slot for heading (overrides heading prop)
   */
  headingSlot?: React.ReactNode;
  /**
   * Label shown before description on hover
   */
  industryLabel?: React.ReactNode;
  /**
   * Array of industry items to display in the grid
   */
  industries?: IndustryItem[];
  /**
   * Custom slot for industries (overrides industries array)
   */
  industriesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the grid container
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for individual items
   */
  itemClassName?: string;
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
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * IndustriesHoverRevealGrid displays a responsive grid of industry cards with animated hover effects.
 *
 * Features a 1-2-4 column responsive grid layout where each card shows an industry image with
 * the industry name overlaid. On hover, a black overlay slides up from the bottom revealing
 * a detailed description, while a plus icon rotates 90 degrees. Ideal for showcasing multiple
 * industry sectors, service categories, or portfolio items with engaging hover interactions.
 *
 * @example
 * ```tsx
 * <IndustriesHoverRevealGrid
 *   heading="Our Industries"
 *   industryLabel="Overview"
 *   industries={[
 *     {
 *       name: "Healthcare",
 *       description: "Revolutionary medical solutions...",
 *       image: "/healthcare.jpg",
 *       imageAlt: "Healthcare technology",
 *       url: "/industries/healthcare"
 *     }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function IndustriesHoverRevealGrid({
  heading,
  headingSlot,
  industryLabel = "Overview",
  industries,
  industriesSlot,
  className,
  containerClassName,
  headingClassName,
  gridClassName,
  itemClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: IndustriesHoverRevealGridProps): React.JSX.Element {
  const renderHeading = () => {
    if (headingSlot) return headingSlot;
    if (!heading) return null;

    return typeof heading === "string" ? (
      <h2
        className={cn(
          "mb-8 text-3xl font-medium text-foreground",
          headingClassName,
        )}
      >
        {heading}
      </h2>
    ) : (
      <div className={cn("mb-8", headingClassName)}>{heading}</div>
    );
  };

  const renderIndustries = () => {
    if (industriesSlot) return industriesSlot;
    if (!industries || industries.length === 0) return null;

    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-1 lg:grid-cols-2 xl:grid-cols-4",
          gridClassName,
        )}
      >
        {industries.map((industry, index) => (
          <Pressable
            href={industry.url}
            key={index}
            className={cn("block", itemClassName, industry.className)}
          >
            <motion.div
              className="group relative overflow-hidden bg-muted"
              whileHover="hover"
              initial="initial"
            >
              <motion.div
                variants={{
                  initial: {
                    opacity: 1,
                    pointerEvents: "auto",
                    clipPath: "inset(0% 0% 0% 0%)",
                  },
                  hover: {
                    opacity: 0,
                    pointerEvents: "none",
                    clipPath: "inset(0% 0% 100% 0%)",
                  },
                }}
                transition={{ duration: 0.4, ease: easeTransition }}
                className="relative z-0 flex h-full min-h-120 flex-col items-center justify-center lg:min-h-144 xl:min-h-112"
              >
                <div className="flex h-full justify-center">
                  <Img
                    src={industry.image}
                    alt={industry.imageAlt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                <h3 className="absolute bottom-10 text-lg font-medium text-foreground">
                  {industry.name}
                </h3>
              </motion.div>
              <motion.div
                className="absolute inset-0 z-10 bg-black"
                variants={{
                  initial: { y: "100%" },
                  hover: { y: "0%" },
                }}
                transition={{ duration: 0.4, ease: easeTransition }}
                style={{ willChange: "transform" }}
              />
              <motion.div
                variants={{
                  initial: { opacity: 0, y: 20 },
                  hover: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: easeTransition }}
                className="absolute inset-0 z-20 flex min-h-120 items-center justify-center p-8 text-white lg:min-h-144 xl:min-h-112"
              >
                <div className="space-y-3">
                  <p className="font-medium opacity-90">{industryLabel}:</p>
                  <p>{industry.description}</p>
                </div>
              </motion.div>
              <motion.div
                className="absolute top-4 right-4 z-30"
                variants={{
                  initial: { opacity: 0.7, rotate: 0 },
                  hover: { opacity: 1, rotate: 90 },
                }}
                transition={{ duration: 0.4, ease: easeTransition }}
              >
                <div className="relative rounded-full p-2">
                  <div className="absolute inset-0 rounded-full bg-muted-foreground/20" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-muted-foreground"
                    variants={{
                      initial: { opacity: 0 },
                      hover: { opacity: 1 },
                    }}
                    transition={{ duration: 0.4, ease: easeTransition }}
                  />
                  <DynamicIcon
                    name="lucide/plus"
                    size={16}
                    className="relative z-10"
                  />
                </div>
              </motion.div>
            </motion.div>
          </Pressable>
        ))}
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
    >
      <div className={containerClassName}>
        {renderHeading()}
        {renderIndustries()}
      </div>
    </Section>
  );
}
