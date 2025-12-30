"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { AnimatedDialog } from "../../ui/animated-dialog";
import { Section } from "../../ui/section";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Service item for expandable card
 */
export interface ServicesListExpandableCardsService {
  /**
   * Unique identifier for the service
   */
  id: string;
  /**
   * Service category/tag
   */
  category: string;
  /**
   * Service title
   */
  title: string;
  /**
   * Service image
   */
  image: {
    src: string;
    alt: string;
  };
  /**
   * Image positioning styles (for card view)
   */
  imageStyles?: {
    top?: number;
    bottom?: number;
    width?: string;
    left?: number;
  };
  /**
   * Theme variant for card
   * @default "light"
   */
  theme?: "light" | "dark";
  /**
   * Full content to display in the expanded dialog
   */
  content?: React.ReactNode;
}

/**
 * Props for ServicesListExpandableCards component
 */
export interface ServicesListExpandableCardsProps {
  /**
   * Section title
   */
  title?: string;
  /**
   * Section subtitle/eyebrow text
   */
  subtitle?: string;
  /**
   * Array of service items
   */
  services?: ServicesListExpandableCardsService[];
  /**
   * OptixFlow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Enable layout animations for shared element transitions
   * @default true
   */
  enableLayoutAnimations?: boolean;
  /**
   * Background style for the section
   * @default "white"
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   * @default "lg"
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern
   */
  pattern?: PatternName | string;
  /**
   * Pattern opacity
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the card grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for individual cards
   */
  cardClassName?: string;
}

const defaultServices: ServicesListExpandableCardsService[] = [
  {
    id: "travel",
    category: "Travel",
    title: "5 Inspiring Apps for Your Next Trip",
    image: {
      src: imagePlaceholders[0],
      alt: "Travel services",
    },
    imageStyles: {
      top: -300,
    },
    content: (
      <>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          Love to travel? So do the makers of these five subscription apps. For
          a small monthly fee, they'll help you find the best deals on flights,
          hotels, and some other stuff we turn a blind eye to.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          Plan your perfect itinerary with intelligent recommendations based on
          your interests, time, and credit history.
        </p>
      </>
    ),
  },
  {
    id: "mindfulness",
    category: "How to",
    title: "Contemplate the Meaning of Life Twice a Day",
    image: {
      src: imagePlaceholders[1],
      alt: "Mindfulness services",
    },
    imageStyles: {
      bottom: -50,
      width: "110%",
      left: -20,
    },
    theme: "dark",
    content: (
      <>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          What is life? You can't spell "life" without "i". You also can't
          spell "life" without "l", "f", and "e". Worth thinking about.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          The only way to find out more about life is to think about it. And
          the only way to think about it is twice daily using an app.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          Apps? We got 'em. Therefore we got the meaning of life.
        </p>
      </>
    ),
  },
  {
    id: "exploration",
    category: "Steps",
    title: "Urban Exploration Apps for the Vertically-Inclined",
    image: {
      src: imagePlaceholders[2],
      alt: "Urban exploration services",
    },
    imageStyles: {
      width: "200%",
      left: -100,
    },
    theme: "dark",
    content: (
      <>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          Get off the beaten path. Find the best views, skywalks, and elevated
          gardens in your city.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          Locked door? No problem! This app crowdsources the access code to
          every door in your city.
        </p>
      </>
    ),
  },
  {
    id: "lifestyle",
    category: "Hats",
    title: "Take Control of Your Hat Life With This Stunning New App",
    image: {
      src: imagePlaceholders[3],
      alt: "Lifestyle services",
    },
    imageStyles: {
      bottom: -100,
    },
    content: (
      <>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          Whether you're serious hat enthusiast, or just a filthy casual, this
          new app revolutionizes how you organize, care for, and expand your
          hat collection.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          Stay up to date with the latest hat trends, get personalized hat care
          reminders, and use predictive analytics to discover the last place
          you left your hat.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          Why follow the crowd when you can be the crowd?
        </p>
      </>
    ),
  },
];

/**
 * ServicesListExpandableCards - An interactive service list featuring expandable
 * cards with media backgrounds. Cards expand into a compact dialog with full details.
 * Perfect for showcasing services, features, or content collections in an engaging way.
 *
 * @example
 * ```tsx
 * <ServicesListExpandableCards
 *   title="Our Services"
 *   subtitle="What We Offer"
 *   services={serviceItems}
 *   enableLayoutAnimations={true}
 * />
 * ```
 */
export function ServicesListExpandableCards({
  title = "Featured Services",
  subtitle,
  services = defaultServices,
  optixFlowConfig,
  enableLayoutAnimations = true,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  gridClassName,
  cardClassName,
}: ServicesListExpandableCardsProps): React.JSX.Element {
  const [openServiceId, setOpenServiceId] = React.useState<string | null>(null);

  const openService = (id: string) => {
    setOpenServiceId(id);
  };

  const closeService = () => {
    setOpenServiceId(null);
  };

  const openServiceData = services.find(
    (service) => service.id === openServiceId
  );

  return (
    <Section
      title={title}
      subtitle={subtitle}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      {/* Card Grid */}
      <ul
        className={cn(
          "flex flex-wrap gap-4 md:gap-5",
          gridClassName
        )}
      >
        {services.map((service, index) => {
          const isWide =
            index % 4 === 0 || index % 4 === 3;

          return (
            <motion.li
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1 * index,
                ease: "easeOut",
              }}
              className={cn(
                "relative h-[280px] flex-[0_0_calc(50%-0.5rem)] overflow-hidden rounded-3xl md:h-[420px] md:flex-[0_0_40%]",
                isWide && "md:flex-[0_0_calc(60%-1.25rem)]",
                cardClassName
              )}
            >
              <Pressable
                onClick={() => openService(service.id)}
                asButton
                className="h-full w-full"
              >
                <motion.div
                  className={cn(
                    "relative h-full w-full overflow-hidden rounded-3xl bg-gray-900",
                    service.theme === "dark" ? "bg-gray-100" : "bg-gray-900"
                  )}
                  layoutId={
                    enableLayoutAnimations
                      ? `card-container-${service.id}`
                      : undefined
                  }
                >
                  {/* Image Container */}
                  <motion.div
                    className="relative flex h-full flex-col justify-stretch overflow-hidden"
                    layoutId={
                      enableLayoutAnimations
                        ? `card-image-container-${service.id}`
                        : undefined
                    }
                  >
                    <Img
                      src={service.image.src}
                      alt={service.image.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{
                        top: service.imageStyles?.top
                          ? `${service.imageStyles.top}px`
                          : undefined,
                        bottom: service.imageStyles?.bottom
                          ? `${service.imageStyles.bottom}px`
                          : undefined,
                        width: service.imageStyles?.width || "100%",
                        left: service.imageStyles?.left
                          ? `${service.imageStyles.left}px`
                          : undefined,
                      }}
                      optixFlowConfig={optixFlowConfig}
                    />
                  </motion.div>

                  {/* Title Container - Overlaid on image */}
                  <motion.div
                    className="absolute left-4 top-4 max-w-xs md:left-4 md:top-4"
                    layoutId={
                      enableLayoutAnimations
                        ? `title-container-${service.id}`
                        : undefined
                    }
                    layout={enableLayoutAnimations ? "position" : false}
                  >
                    <span
                      className={cn(
                        "text-sm font-medium uppercase md:text-base",
                        service.theme === "dark"
                          ? "text-gray-900"
                          : "text-white"
                      )}
                    >
                      {service.category}
                    </span>
                    <h3
                      className={cn(
                        "mt-2 text-balance font-sans text-xl font-semibold md:text-3xl",
                        service.theme === "dark"
                          ? "text-gray-900"
                          : "text-white"
                      )}
                    >
                      {service.title}
                    </h3>
                  </motion.div>
                </motion.div>
              </Pressable>
            </motion.li>
          );
        })}
      </ul>

      {/* Expanded Dialog */}
      {openServiceData && (
        <AnimatedDialog
          open={!!openServiceId}
          onOpenChange={(open) => {
            if (!open) closeService();
          }}
          size="compact"
          featuredMediaHeader={
            <motion.div
              className="relative h-[280px] w-full overflow-hidden md:h-[420px]"
              layoutId={
                enableLayoutAnimations
                  ? `card-image-container-${openServiceData.id}`
                  : undefined
              }
            >
              <Img
                src={openServiceData.image.src}
                alt={openServiceData.image.alt}
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  top: openServiceData.imageStyles?.top
                    ? `${openServiceData.imageStyles.top}px`
                    : undefined,
                  bottom: openServiceData.imageStyles?.bottom
                    ? `${openServiceData.imageStyles.bottom}px`
                    : undefined,
                  width: openServiceData.imageStyles?.width || "100%",
                  left: openServiceData.imageStyles?.left
                    ? `${openServiceData.imageStyles.left}px`
                    : undefined,
                }}
                optixFlowConfig={optixFlowConfig}
              />
              {/* Title overlaid on image in dialog */}
              <motion.div
                className="absolute left-6 top-6 z-10 max-w-xs md:left-8 md:top-8"
                layoutId={
                  enableLayoutAnimations
                    ? `title-container-${openServiceData.id}`
                    : undefined
                }
                layout={enableLayoutAnimations ? "position" : false}
              >
                <span
                  className={cn(
                    "text-sm font-medium uppercase md:text-base",
                    openServiceData.theme === "dark"
                      ? "text-gray-900"
                      : "text-white"
                  )}
                >
                  {openServiceData.category}
                </span>
                <h2
                  className={cn(
                    "mt-2 text-balance font-sans text-2xl font-semibold md:text-4xl",
                    openServiceData.theme === "dark"
                      ? "text-gray-900"
                      : "text-white"
                  )}
                >
                  {openServiceData.title}
                </h2>
              </motion.div>
            </motion.div>
          }
        >
          {openServiceData.content}
        </AnimatedDialog>
      )}
    </Section>
  );
}
