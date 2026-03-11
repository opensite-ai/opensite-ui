"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card } from "../../ui/card";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Feature item configuration for spotlight display
 */
export interface ServicesListFeatureSpotlightItem {
  /**
   * Unique identifier for the feature
   */
  id?: string;
  /**
   * Feature title
   */
  title?: React.ReactNode;
  /**
   * Feature description
   */
  description?: React.ReactNode;
  /**
   * Eyebrow label for the feature
   */
  eyebrow?: React.ReactNode;
  /**
   * Badge labels for the feature
   */
  badges?: [React.ReactNode, React.ReactNode];
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/shield-check")
   */
  iconName?: string;
  /**
   * Feature image
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * Additional CSS classes for the feature item
   */
  className?: string;
}

export interface ServicesListFeatureSpotlightProps {
  /**
   * Section heading
   */
  heading?: React.ReactNode;
  /**
   * Section subheading/eyebrow
   */
  subheading?: React.ReactNode;
  /**
   * Features list
   */
  features?: ServicesListFeatureSpotlightItem[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
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
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the subheading
   */
  subheadingClassName?: string;
  /**
   * Additional CSS classes for the features container
   */
  featuresClassName?: string;
  /**
   * Additional CSS classes for each feature card
   */
  cardClassName?: string;
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
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ServicesListFeatureSpotlight - Alternating image and card layout that
 * highlights key service differentiators with badges and icons. Works well
 * for service pages needing rich storytelling and visual variety.
 *
 * @example
 * ```tsx
 * <ServicesListFeatureSpotlight
 *   heading="Service advantages built for modern teams"
 *   subheading="The OpenSite AI approach"
 *   features={[
 *     { id: "1", title: "Feature", description: "Description", iconName: "lucide/star", image: { src: "/img.jpg", alt: "Feature" } }
 *   ]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListFeatureSpotlight({
  sectionId = "services-list-feature-spotlight",
  heading,
  subheading,
  features,
  featuresSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  subheadingClassName,
  featuresClassName,
  cardClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ServicesListFeatureSpotlightProps): React.JSX.Element {
  const renderFeatureIcon = (feature: ServicesListFeatureSpotlightItem) => {
    if (feature.icon) return feature.icon;
    if (feature.iconName)
      return <DynamicIcon name={feature.iconName} size={24} />;
    return null;
  };

  const renderFeatures = () => {
    if (featuresSlot) return featuresSlot;
    if (!features || features.length === 0) return null;

    return (
      <div className={cn("space-y-12", featuresClassName)}>
        {features.map((feature, idx) => {
          const imageFirst = idx % 2 === 0;
          return (
            <motion.div
              key={feature.id || `feature-${idx}`}
              className={cn(
                "grid grid-cols-1 items-center gap-8 lg:grid-cols-2",
                feature.className,
              )}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
            >
              <div className={imageFirst ? "order-1" : "order-2 lg:order-1"}>
                {feature.image && (
                  <div className="relative overflow-hidden rounded-3xl border border-border/30 shadow-xl">
                    <Img
                      src={feature.image.src}
                      alt={feature.image.alt}
                      className="h-full w-full object-cover"
                      optixFlowConfig={optixFlowConfig}
                    />
                    <div className="absolute inset-0 bg-linear-to-tr from-foreground/40 via-transparent to-transparent" />
                  </div>
                )}
              </div>

              <Card
                className={cn(
                  "border-border/60 shadow-lg",
                  imageFirst ? "order-2" : "order-1 lg:order-2",
                  cardClassName,
                )}
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {renderFeatureIcon(feature)}
                    </div>
                    <div>
                      {feature.eyebrow &&
                        (typeof feature.eyebrow === "string" ? (
                          <p className="text-xs uppercase tracking-[0.2em] text-primary">
                            {feature.eyebrow}
                          </p>
                        ) : (
                          <div className="text-xs uppercase tracking-[0.2em] text-primary">
                            {feature.eyebrow}
                          </div>
                        ))}
                      {feature.title &&
                        (typeof feature.title === "string" ? (
                          <h3 className="mt-1 text-2xl font-bold">
                            {feature.title}
                          </h3>
                        ) : (
                          <div className="mt-1 text-2xl font-bold">
                            {feature.title}
                          </div>
                        ))}
                    </div>
                  </div>
                  {feature.description &&
                    (typeof feature.description === "string" ? (
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    ) : (
                      <div className="text-muted-foreground">
                        {feature.description}
                      </div>
                    ))}
                  {feature.badges && (
                    <div className="flex flex-wrap gap-2">
                      <span className={cn(
                        "rounded-full px-3 py-1 text-xs",
                        getNestedCardBg(background),
                        getNestedCardTextColor(background),
                      )}>
                        {feature.badges[0]}
                      </span>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                        {feature.badges[1]}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={containerClassName}>
        <div className={cn("mb-12 text-center", headerClassName)}>
          {subheading &&
            (typeof subheading === "string" ? (
              <p
                className={cn(
                  "text-sm font-semibold uppercase tracking-[0.2em] text-primary",
                  subheadingClassName,
                )}
              >
                {subheading}
              </p>
            ) : (
              <div className={subheadingClassName}>{subheading}</div>
            ))}
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mt-3 text-3xl font-bold md:text-4xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
        </div>
        {renderFeatures()}
      </div>
    </Section>
  );
}
