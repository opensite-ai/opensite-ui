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
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { OptixFlowConfig } from "../../../src/types";

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
}

export function CarouselScrollingFeatureShowcase({
  heading,
  subheading,
  features,
  featuresSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  subheadingClassName,
  contentClassName,
  imageClassName,
  featuresClassName,
  numberBadgeClassName,
  optixFlowConfig,
}: CarouselScrollingFeatureShowcaseProps): React.JSX.Element {
  const [activeFeature, setActiveFeature] = React.useState<string>(
    features?.[0]?.id ?? ""
  );
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Intersection observer for feature sections
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];

    features?.forEach((feature) => {
      const element = document.getElementById(feature.id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveFeature(feature.id);
              }
            });
          },
          { threshold: 0.5 }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [features]);

  const activeFeatureData = features?.find((f) => f.id === activeFeature);

  return (
    <section ref={containerRef} className={cn("relative", className)}>
      <div className={cn("container mx-auto px-4", containerClassName)}>
        {/* Header */}
        <div className={cn("py-16 text-center", headerClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("text-3xl font-bold tracking-tight md:text-4xl", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {subheading && (
            typeof subheading === "string" ? (
              <p className={cn("mt-4 text-lg text-muted-foreground", subheadingClassName)}>{subheading}</p>
            ) : (
              <div className={cn("mt-4", subheadingClassName)}>{subheading}</div>
            )
          )}
        </div>

        {/* Scrolling content */}
        <div className={cn("grid gap-8 lg:grid-cols-2", contentClassName)}>
          {/* Sticky image panel */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <motion.div
                style={{ opacity: imageOpacity }}
                className={cn("aspect-video overflow-hidden rounded-xl", imageClassName)}
              >
                {activeFeatureData && (
                  <Img
                    src={activeFeatureData.image}
                    alt={typeof activeFeatureData.title === "string" ? activeFeatureData.title : `Feature ${activeFeatureData.id}`}
                    className={cn("h-full w-full object-cover transition-all duration-500", activeFeatureData.imageClassName)}
                    optixFlowConfig={optixFlowConfig}
                  />
                )}
              </motion.div>
            </div>
          </div>

          {/* Feature descriptions */}
          <div className={cn("space-y-32 py-16", featuresClassName)}>
            {featuresSlot ? (
              featuresSlot
            ) : (
              features?.map((feature, index) => (
                <div
                  key={feature.id}
                  id={feature.id}
                  className={cn(
                    "min-h-[50vh] transition-opacity duration-300",
                    activeFeature === feature.id
                      ? "opacity-100"
                      : "opacity-50",
                    feature.className
                  )}
                >
                  {/* Mobile image */}
                  <div className="mb-6 lg:hidden">
                    <div className="aspect-video overflow-hidden rounded-lg">
                      <Img
                        src={feature.image}
                        alt={typeof feature.title === "string" ? feature.title : `Feature ${feature.id}`}
                        className={cn("h-full w-full object-cover", feature.imageClassName)}
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground", numberBadgeClassName)}>
                      {index + 1}
                    </div>
                    <div>
                      {feature.title && (
                        typeof feature.title === "string" ? (
                          <h3 className="text-2xl font-semibold">{feature.title}</h3>
                        ) : (
                          <div>{feature.title}</div>
                        )
                      )}
                      {feature.description && (
                        typeof feature.description === "string" ? (
                          <p className="mt-4 text-lg text-muted-foreground">
                            {feature.description}
                          </p>
                        ) : (
                          <div className="mt-4">{feature.description}</div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

