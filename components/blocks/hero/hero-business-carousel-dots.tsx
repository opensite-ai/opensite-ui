"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";

const fadeVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 1, ease: [0.4, 0, 0.2, 1] as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 1, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export interface HeroBusinessCarouselDotsProps {
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Badge variant
   */
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of carousel images
   */
  carouselImages?: ImageItem[];
  /**
   * Custom slot for carousel content (overrides carouselImages)
   */
  carouselSlot?: React.ReactNode;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the carousel container
   */
  carouselClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroBusinessCarouselDots({
  sectionId = "hero-business-carousel-dots",
  badge,
  badgeVariant,
  heading,
  description,
  actions,
  actionsSlot,
  carouselImages,
  carouselSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  contentClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  carouselClassName,
  optixFlowConfig,
}: HeroBusinessCarouselDotsProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const imageCount = carouselImages?.length ?? 0;

  const startTimer = useCallback(() => {
    if (imageCount <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imageCount);
    }, 7000);
  }, [imageCount]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const activeImage =
    carouselImages && carouselImages.length > 0
      ? carouselImages[currentIndex]
      : null;

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={cn("overflow-hidden", className)}
      containerClassName={containerClassName}
    >
      <div className="pt-8 md:pt-0">
        <div
          className={cn(
            "mx-auto max-w-full md:max-w-5xl text-center flex flex-col items-center px-4",
            contentClassName,
          )}
        >
          {badge && (
            <Badge variant={badgeVariant} className={badgeClassName}>
              {badge}
            </Badge>
          )}
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "mt-6 text-4xl font-bold md:text-6xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              heading
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mt-5 text-lg md:text-xl lg:px-32 text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              description
            ))}
          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={actionsClassName}
            mobileConfig={{ width: "full", position: "center" }}
          />
        </div>
        <div
          className={cn(
            "relative mx-4 mt-18 md:mx-10 md:mt-32",
            carouselClassName,
          )}
        >
          <div className="absolute top-0 -right-4 -left-4 z-10 h-px bg-[linear-gradient(to_right,transparent,hsl(var(--border))_4%,hsl(var(--border))_96%,transparent)] md:-right-20 md:-left-20"></div>
          <div className="absolute bottom-0 -right-4 -left-4 z-10 h-px bg-[linear-gradient(to_right,transparent,hsl(var(--border))_4%,hsl(var(--border))_96%,transparent)] md:-right-20 md:-left-20"></div>
          <div className="absolute -top-10 left-0 z-10 h-[calc(100%+80px)] w-px bg-[linear-gradient(to_bottom,transparent,hsl(var(--border))_4%,hsl(var(--border))_96%,transparent)] md:-top-20 md:h-[calc(100%+160px)]"></div>
          <div className="absolute -top-10 right-0 z-10 h-[calc(100%+80px)] w-px bg-[linear-gradient(to_bottom,transparent,hsl(var(--border))_4%,hsl(var(--border))_96%,transparent)] md:-top-20 md:h-[calc(100%+160px)]"></div>
          {carouselSlot ? (
            carouselSlot
          ) : activeImage ? (
            <div className="relative aspect-video w-full overflow-hidden ">
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentIndex}
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Img
                    src={activeImage.src}
                    alt={activeImage.alt}
                    className={cn(
                      "h-full w-full object-cover",
                      activeImage.className,
                    )}
                    optixFlowConfig={optixFlowConfig}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
