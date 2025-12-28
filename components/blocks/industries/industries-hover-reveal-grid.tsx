"use client";

import * as React from "react";
import { motion, type Easing } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

const easeTransition: Easing = [0.25, 0.1, 0.25, 1];

export interface IndustryItem {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  url: string;
}

export interface IndustriesHoverRevealGridProps {
  /**
   * Section title displayed above the grid
   * @default "Industries"
   */
  title?: string;
  /**
   * Label shown before description on hover
   * @default "Overview"
   */
  industryLabel?: string;
  /**
   * Array of industry items to display in the grid
   */
  industries?: IndustryItem[];
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
 *   title="Our Industries"
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
 * />
 * ```
 */
export function IndustriesHoverRevealGrid({
  className,
  title = "Industries",
  industryLabel = "Overview",
  industries = [
    {
      name: "Healthcare",
      description:
        "Revolutionary medical solutions and digital health platforms that improve patient outcomes and streamline healthcare delivery.",
      image: imagePlaceholders[0],
      imageAlt: "Healthcare technology illustration",
      url: "#",
    },
    {
      name: "Fintech",
      description:
        "Cutting-edge financial technology solutions that transform banking, payments, and investment management for the digital age.",
      image: imagePlaceholders[1],
      imageAlt: "Financial technology illustration",
      url: "#",
    },
    {
      name: "E-commerce",
      description:
        "Comprehensive online retail platforms and marketplace solutions that drive sales and enhance customer experiences.",
      image: imagePlaceholders[2],
      imageAlt: "E-commerce platform illustration",
      url: "#",
    },
    {
      name: "Education",
      description:
        "Innovative learning management systems and educational technology that empower students and educators worldwide.",
      image: imagePlaceholders[3],
      imageAlt: "Educational technology illustration",
      url: "#",
    },
  ],
  optixFlowConfig,
}: IndustriesHoverRevealGridProps) {
  return (
    <section className={cn("py-16", className)}>
      <div className="container">
        <h2 className="mb-8 text-3xl font-medium text-foreground">{title}</h2>
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry, index) => (
            <Pressable href={industry.url} key={index} className="block">
              <motion.div
                className="group relative overflow-hidden bg-muted"
                whileHover="hover"
                initial="initial"
              >
                {/* Default state: Image and heading */}
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

                {/* Black overlay - slides up from bottom */}
                <motion.div
                  className="absolute inset-0 z-10 bg-black"
                  variants={{
                    initial: { y: "100%" },
                    hover: { y: "0%" },
                  }}
                  transition={{ duration: 0.4, ease: easeTransition }}
                  style={{ willChange: "transform" }}
                />

                {/* Hover state: Description */}
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

                {/* Plus button */}
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
      </div>
    </section>
  );
}
