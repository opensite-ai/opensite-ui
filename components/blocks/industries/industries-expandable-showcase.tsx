"use client";

import * as React from "react";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

export interface IndustryContractor {
  /**
   * Unique identifier for the contractor
   */
  id: string;
  /**
   * Category label (e.g., "Hydro", "Wind", "Solar")
   */
  category: React.ReactNode;
  /**
   * Title/description for the contractor
   */
  title: React.ReactNode;
  /**
   * Image source URL
   */
  imageSrc: string;
  /**
   * Alt text for the image
   */
  imageAlt: string;
  /**
   * URL for the "Learn more" link
   */
  learnMoreUrl: string;
  /**
   * Custom label for the learn more link
   */
  learnMoreLabel?: React.ReactNode;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
}

export interface IndustriesExpandableShowcaseProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Custom slot for heading (overrides heading prop)
   */
  headingSlot?: React.ReactNode;
  /**
   * Array of industry contractors/categories to display
   */
  contractors?: IndustryContractor[];
  /**
   * Custom slot for contractors (overrides contractors array)
   */
  contractorsSlot?: React.ReactNode;
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
   * Additional CSS classes for the heading wrapper
   */
  headingWrapperClassName?: string;
  /**
   * Additional CSS classes for the mobile showcase container
   */
  mobileClassName?: string;
  /**
   * Additional CSS classes for the desktop showcase container
   */
  desktopClassName?: string;
  /**
   * Additional CSS classes for individual contractor items
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
 * IndustriesExpandableShowcase displays an interactive expandable showcase for industry categories.
 *
 * Features a large heading followed by an accordion-style panel layout on desktop where hovering
 * expands a panel to reveal its image and details. On mobile, displays stacked cards with images.
 * Each panel shows a category name, title description, and "Learn more" link. Ideal for showcasing
 * industry verticals, service categories, or portfolio sections with engaging hover interactions.
 *
 * @example
 * ```tsx
 * <IndustriesExpandableShowcase
 *   heading="Powering Renewable Industries"
 *   contractors={[
 *     {
 *       id: "hydro",
 *       category: "Hydro",
 *       title: "Revolutionizing Hydroelectric Power Generation",
 *       imageSrc: "/hydro.jpg",
 *       imageAlt: "Hydroelectric operations",
 *       learnMoreUrl: "/industries/hydro"
 *     }
 *   ]}
 * />
 * ```
 */
export function IndustriesExpandableShowcase({
  heading,
  headingSlot,
  contractors,
  contractorsSlot,
  className,
  containerClassName,
  headingClassName,
  headingWrapperClassName,
  mobileClassName,
  desktopClassName,
  itemClassName,
  background,
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: IndustriesExpandableShowcaseProps): React.JSX.Element {
  const [activeContractor, setActiveContractor] = React.useState(
    contractors?.[0]?.id || "",
  );

  const handleContractorHover = (contractorId: string) => {
    setActiveContractor(contractorId);
  };

  const renderHeading = useMemo(() => {
    if (headingSlot) return headingSlot;
    if (!heading) return null;

    return typeof heading === "string" ? (
      <h2 className={cn("text-4xl md:text-5xl lg:text-6xl", headingClassName)}>
        {heading}
      </h2>
    ) : (
      <div className={headingClassName}>{heading}</div>
    );
  }, [headingSlot, heading, headingClassName]);

  const renderContractors = useMemo(() => {
    if (contractorsSlot) return contractorsSlot;
    if (!contractors || contractors.length === 0) return null;

    return (
      <>
        {/* Mobile Contractor Showcase */}
        <div className={cn("space-y-6 lg:hidden", mobileClassName)}>
          {contractors.map((contractor) => (
            <Pressable
              key={contractor.id}
              href={contractor.learnMoreUrl}
              className={cn(
                "block overflow-hidden rounded-lg border border-border",
                itemClassName,
                contractor.className,
              )}
            >
              <div className="relative aspect-video w-full">
                <Img
                  src={contractor.imageSrc}
                  alt={contractor.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center">
                  <span className="text-xl font-semibold">
                    {contractor.category}
                  </span>
                </div>
                <h3 className="text-lg leading-tight ">{contractor.title}</h3>
                <span className="inline-flex items-center p-0 text-sm font-medium ">
                  <DynamicIcon
                    name="lucide/corner-down-right"
                    size={12}
                    className="mr-1"
                  />
                  {contractor.learnMoreLabel ?? "Learn more"}
                </span>
              </div>
            </Pressable>
          ))}
        </div>

        {/* Desktop Contractor Showcase */}
        <div
          className={cn(
            "hidden h-128 overflow-hidden border border-border lg:flex",
            desktopClassName,
          )}
        >
          {contractors.map((contractor) => (
            <Pressable
              key={contractor.id}
              href={contractor.learnMoreUrl}
              className={cn(
                "flex h-full cursor-pointer gap-6 overflow-hidden border-l border-border first:border-l-0",
                activeContractor === contractor.id ? "flex-1" : "w-48",
                itemClassName,
                contractor.className,
              )}
              onMouseEnter={() => handleContractorHover(contractor.id)}
            >
              <div className="flex h-full min-w-0 flex-col justify-between gap-8 p-6">
                <div className="flex h-14 w-32 items-center">
                  <span className="text-xl font-semibold">
                    {contractor.category}
                  </span>
                </div>
                <div className="flex flex-col justify-between gap-8">
                  <AnimatePresence>
                    {activeContractor === contractor.id && (
                      <motion.div
                        key={`content-${contractor.id}`}
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <h3 className="text-lg leading-tight ">
                          {contractor.title}
                        </h3>
                        <span className="inline-flex items-center p-0 text-sm font-medium ">
                          <DynamicIcon
                            name="lucide/corner-down-right"
                            size={12}
                            className="mr-1"
                          />
                          {contractor.learnMoreLabel ?? "Learn more"}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <AnimatePresence>
                {activeContractor === contractor.id && (
                  <motion.div
                    key={contractor.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={cn(
                      "relative h-full min-w-0",
                      contractor.id === contractors[0]?.id
                        ? "w-96 shrink-0"
                        : "flex-1",
                    )}
                  >
                    <Img
                      src={contractor.imageSrc}
                      alt={contractor.imageAlt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Pressable>
          ))}
        </div>
      </>
    );
  }, [
    contractorsSlot,
    contractors,
    mobileClassName,
    desktopClassName,
    itemClassName,
    activeContractor,
    optixFlowConfig,
  ]);

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
        {(headingSlot || heading) && (
          <div className={cn("mb-6 md:mb-12", headingWrapperClassName)}>
            {renderHeading}
          </div>
        )}
        {renderContractors}
      </div>
    </Section>
  );
}
