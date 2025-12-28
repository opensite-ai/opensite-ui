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

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface CarouselScrollingFeatureShowcaseProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  features?: FeatureItem[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export function CarouselScrollingFeatureShowcase({
  className,
  optixFlowConfig,
  features,
  sectionTitle = "Powerful Features",
  sectionSubtitle = "Discover what makes our platform unique",
}: CarouselScrollingFeatureShowcaseProps): React.JSX.Element {
  const defaultFeatures: FeatureItem[] = React.useMemo(
    () =>
      Array.from({ length: 4 }).map((_, index) => ({
        id: `feature-${index}`,
        title: `Feature ${index + 1}`,
        description: `This is a detailed description of feature ${index + 1}. It explains the benefits and capabilities that users can expect when using this feature.`,
        image: imagePlaceholders[index % imagePlaceholders.length],
      })),
    []
  );

  const featureItems = features || defaultFeatures;
  const [activeFeature, setActiveFeature] = React.useState<string>(
    featureItems[0].id
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

    featureItems.forEach((feature) => {
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
  }, [featureItems]);

  const activeFeatureData = featureItems.find((f) => f.id === activeFeature);

  return (
    <section ref={containerRef} className={cn("relative", className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="py-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {sectionTitle}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{sectionSubtitle}</p>
        </div>

        {/* Scrolling content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Sticky image panel */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <motion.div
                style={{ opacity: imageOpacity }}
                className="aspect-video overflow-hidden rounded-xl"
              >
                {activeFeatureData && (
                  <Img
                    src={activeFeatureData.image}
                    alt={activeFeatureData.title}
                    className="h-full w-full object-cover transition-all duration-500"
                    optixFlowConfig={optixFlowConfig}
                  />
                )}
              </motion.div>
            </div>
          </div>

          {/* Feature descriptions */}
          <div className="space-y-32 py-16">
            {featureItems.map((feature, index) => (
              <div
                key={feature.id}
                id={feature.id}
                className={cn(
                  "min-h-[50vh] transition-opacity duration-300",
                  activeFeature === feature.id
                    ? "opacity-100"
                    : "opacity-50"
                )}
              >
                {/* Mobile image */}
                <div className="mb-6 lg:hidden">
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <Img
                      src={feature.image}
                      alt={feature.title}
                      className="h-full w-full object-cover"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">{feature.title}</h3>
                    <p className="mt-4 text-lg text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

