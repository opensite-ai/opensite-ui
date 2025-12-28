"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface IndustryContractor {
  id: string;
  category: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  learnMoreUrl: string;
}

export interface IndustriesExpandableShowcaseProps {
  /**
   * Main heading text
   * @default "Powering Renewable Industries"
   */
  heading?: string;
  /**
   * Array of industry contractors/categories to display
   */
  contractors?: IndustryContractor[];
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
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
  className,
  heading = "Powering Renewable Industries",
  contractors = [
    {
      id: "hydro-power",
      category: "Hydro",
      title:
        "Revolutionizing Hydroelectric Power Generation Through Smart Dam Management",
      imageSrc: imagePlaceholders[0],
      imageAlt: "Hydroelectricity operations site",
      learnMoreUrl: "#",
    },
    {
      id: "wind-power",
      category: "Wind",
      title:
        "Maximizing Wind Farm Efficiency with AI-Powered Turbine Optimization",
      imageSrc: imagePlaceholders[1],
      imageAlt: "Wind power generation",
      learnMoreUrl: "#",
    },
    {
      id: "solar-power",
      category: "Solar",
      title:
        "Scaling Solar Infrastructure with Advanced Photovoltaic Grid Integration",
      imageSrc: imagePlaceholders[2],
      imageAlt: "Solar power generation",
      learnMoreUrl: "#",
    },
  ],
  optixFlowConfig,
}: IndustriesExpandableShowcaseProps) {
  const [activeContractor, setActiveContractor] = React.useState(
    contractors[0]?.id || ""
  );

  const handleContractorHover = (contractorId: string) => {
    setActiveContractor(contractorId);
  };

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl">{heading}</h2>
        </div>

        {/* Mobile Contractor Showcase */}
        <div className="space-y-6 lg:hidden">
          {contractors.map((contractor) => (
            <Pressable
              key={contractor.id}
              href={contractor.learnMoreUrl}
              className="block overflow-hidden rounded-lg border border-border"
            >
              {/* Image */}
              <div className="relative aspect-video w-full">
                <Img
                  src={contractor.imageSrc}
                  alt={contractor.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>

              {/* Content */}
              <div className="space-y-4 p-6">
                <div className="flex items-center">
                  <span className="text-xl font-semibold">
                    {contractor.category}
                  </span>
                </div>
                <h3 className="text-lg leading-tight text-muted-foreground">
                  {contractor.title}
                </h3>
                <span className="inline-flex items-center p-0 text-sm font-medium text-primary hover:text-primary/80">
                  <DynamicIcon
                    name="lucide/corner-down-right"
                    size={12}
                    className="mr-1"
                  />
                  Learn more
                </span>
              </div>
            </Pressable>
          ))}
        </div>

        {/* Desktop Contractor Showcase */}
        <div className="hidden h-128 overflow-hidden border border-border lg:flex">
          {contractors.map((contractor) => (
            <Pressable
              key={contractor.id}
              href={contractor.learnMoreUrl}
              className={cn(
                "flex h-full cursor-pointer gap-6 overflow-hidden border-l border-border first:border-l-0",
                activeContractor === contractor.id ? "flex-1" : "w-48"
              )}
              onMouseEnter={() => handleContractorHover(contractor.id)}
            >
              <div className="flex h-full min-w-0 flex-col justify-between gap-8 p-6">
                {/* Category Label */}
                <div className="flex h-14 w-32 items-center">
                  <span className="text-xl font-semibold">
                    {contractor.category}
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-8">
                  {/* Expanded Content */}
                  <AnimatePresence>
                    {activeContractor === contractor.id && (
                      <motion.div
                        key={`content-${contractor.id}`}
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <h3 className="text-lg leading-tight text-muted-foreground">
                          {contractor.title}
                        </h3>
                        <span className="inline-flex items-center p-0 text-sm font-medium text-primary hover:text-primary/80">
                          <DynamicIcon
                            name="lucide/corner-down-right"
                            size={12}
                            className="mr-1"
                          />
                          Learn more
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Image */}
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
                        : "flex-1"
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
      </div>
    </section>
  );
}
