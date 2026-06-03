"use client";

/**
 * CarouselScrollingFeatureShowcase
 *
 * A scroll-driven feature showcase with a sticky image panel that updates
 * as users scroll through feature descriptions. Features smooth transitions
 * between feature images with intersection observer-based activation.
 *
 * Use cases:
 * - Product feature deep-dives with visual context
 * - Long-form content with synchronized imagery
 * - Documentation pages with visual examples
 * - Marketing pages with scroll-based storytelling
 */

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface FeatureItem {
  /**
   * Unique identifier for the feature
   */
  id: string;
  /**
   * Feature title
   */
  title?: React.ReactNode;
  /**
   * Feature description
   */
  description?: React.ReactNode;
  /**
   * Image source URL
   */
  image: string;
  /**
   * Additional CSS classes for the feature
   */
  className?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface CarouselScrollingFeatureShowcaseProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading/description text
   */
  subheading?: React.ReactNode;
  /**
   * Array of feature items
   */
  features?: FeatureItem[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
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
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the subheading
   */
  subheadingClassName?: string;
  /**
   * Additional CSS classes for the content grid
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the sticky image panel
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the feature descriptions area
   */
  featuresClassName?: string;
  /**
   * Additional CSS classes for the feature number badge
   */
  numberBadgeClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
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
  /** Optional Section ID */
  sectionId?: string;
}

export function CarouselScrollingFeatureShowcase({
  sectionId = "carousel-scrolling-feature-showcase",
  heading,
  subheading,
  features,
  featuresSlot,
  className,
  headerClassName,
  headingClassName,
  subheadingClassName,
  contentClassName,
  imageClassName,
  featuresClassName,
  numberBadgeClassName,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
}: CarouselScrollingFeatureShowcaseProps): React.JSX.Element {
  const [activeFeature, setActiveFeature] = React.useState<string>(
    features?.[0]?.id ?? "",
  );
  const featureRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());

  React.useEffect(() => {
    if (!features || features.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const featureId = entry.target.getAttribute("data-feature-id");
          if (featureId) {
            setActiveFeature(featureId);
          }
        }
      });
    }, observerOptions);

    featureRefs.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [features]);

  const activeFeatureData = features?.find((f) => f.id === activeFeature);

  const setFeatureRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) {
      featureRefs.current.set(id, el);
    } else {
      featureRefs.current.delete(id);
    }
  };

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={cn(pattern && "overflow-visible", className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      containerClassName={containerClassName}
    >
      <div className="relative">
        {/* Header */}
        <div className={cn("mb-12 text-center", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-bold tracking-tight md:text-4xl text-pretty",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              heading
            ))}
          {subheading &&
            (typeof subheading === "string" ? (
              <p
                className={cn("mt-4 text-lg text-balance", subheadingClassName)}
              >
                {subheading}
              </p>
            ) : (
              subheading
            ))}
        </div>

        {/* Scrolling content */}
        <div
          className={cn(
            "grid gap-8 lg:grid-cols-2 lg:gap-12",
            contentClassName,
          )}
        >
          {/* Sticky image panel */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div
                className={cn(
                  "aspect-square overflow-hidden rounded-xl shadow-xl",
                  imageClassName,
                )}
              >
                <AnimatePresence mode="wait">
                  {activeFeatureData && (
                    <motion.div
                      key={activeFeatureData.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full"
                    >
                      <Img
                        src={activeFeatureData.image}
                        alt={
                          typeof activeFeatureData.title === "string"
                            ? activeFeatureData.title
                            : `Feature ${activeFeatureData.id}`
                        }
                        className={cn(
                          "h-full w-full object-cover",
                          activeFeatureData.imageClassName,
                        )}
                        optixFlowConfig={optixFlowConfig}
                        loading="eager"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Feature descriptions */}
          <div
            className={cn(
              "space-y-12 lg:space-y-32 lg:pb-[60vh]",
              featuresClassName,
            )}
          >
            {featuresSlot
              ? featuresSlot
              : features?.map((feature, index) => (
                  <div
                    key={feature.id}
                    ref={setFeatureRef(feature.id)}
                    data-feature-id={feature.id}
                    className={cn(
                      "scroll-mt-24 transition-opacity duration-300",
                      activeFeature === feature.id
                        ? "opacity-100"
                        : "opacity-50",
                      feature.className,
                    )}
                  >
                    {/* Mobile image */}
                    <div className="mb-6 lg:hidden">
                      <div className="aspect-video overflow-hidden rounded-xl shadow-xl">
                        <Img
                          src={feature.image}
                          alt={
                            typeof feature.title === "string"
                              ? feature.title
                              : `Feature ${feature.id}`
                          }
                          className={cn(
                            "h-full w-full object-cover",
                            feature.imageClassName,
                          )}
                          optixFlowConfig={optixFlowConfig}
                          loading="eager"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",
                          numberBadgeClassName,
                        )}
                      >
                        {index + 1}
                      </div>
                      <div>
                        {feature.title &&
                          (typeof feature.title === "string" ? (
                            <h3 className="text-xl md:text-2xl font-semibold">
                              {feature.title}
                            </h3>
                          ) : (
                            feature.title
                          ))}
                        {feature.description &&
                          (typeof feature.description === "string" ? (
                            <p className="mt-4 text-base md:text-lg">
                              {feature.description}
                            </p>
                          ) : (
                            feature.description
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
