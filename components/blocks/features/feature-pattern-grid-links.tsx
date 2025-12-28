"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { patternSvgs } from "../../../lib/patternSvgs";

export interface FeaturePatternGridLinksItem {
  /**
   * Icon name in format: prefix/name (e.g., "lucide/zoom-in")
   */
  icon: string;
  /**
   * Feature title
   */
  title: string;
  /**
   * Feature description
   */
  description: string;
  /**
   * Link URL
   */
  link: string;
}

export interface FeaturePatternGridLinksProps {
  /**
   * Array of feature items
   */
  features?: FeaturePatternGridLinksItem[];
  /**
   * Background pattern URL
   */
  patternUrl?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * Feature Pattern Grid Links - Six-feature grid with pattern background and
 * "Learn more" links on each card.
 *
 * Layout: Pattern background section with six bordered cards in a grid.
 * Key features: Pattern background, bordered cards, learn more links with arrows.
 * Best for: Feature showcases, capability grids, service offerings.
 *
 * @example
 * ```tsx
 * <FeaturePatternGridLinks
 *   features={[
 *     { icon: "lucide/zoom-in", title: "Quality", description: "Built with care", link: "/quality" },
 *   ]}
 * />
 * ```
 */
export function FeaturePatternGridLinks({
  features = [
    {
      icon: "lucide/zoom-in",
      title: "Quality",
      description:
        "Our UI blocks are designed with quality in mind. We make sure that every block is pixel perfect and visually appealing.",
      link: "#",
    },
    {
      icon: "lucide/blocks",
      title: "Customizable",
      description:
        "You can easily customize our UI blocks to fit your needs. Change colors, fonts, and more with our easy-to-use interface.",
      link: "#",
    },
    {
      icon: "lucide/laptop",
      title: "Responsive",
      description:
        "Our UI blocks are fully responsive and look great on any device. No matter the screen size, your website will look amazing.",
      link: "#",
    },
    {
      icon: "lucide/list-end",
      title: "Easy to Use",
      description:
        "Our UI blocks are easy to use and require no coding knowledge. Simply drag and drop the blocks you want and you are good to go.",
      link: "#",
    },
    {
      icon: "lucide/zap",
      title: "Fast",
      description:
        "Our UI blocks are optimized for speed and performance. Your website will load fast and provide a great user experience.",
      link: "#",
    },
    {
      icon: "lucide/infinity",
      title: "Modern",
      description:
        "Our UI blocks are designed with modern trends in mind. Your website will look fresh and up-to-date with our blocks.",
      link: "#",
    },
  ],
  patternUrl = patternSvgs.dotPattern,
  className,
}: FeaturePatternGridLinksProps) {
  return (
    <section
      className={cn(
        "py-32 bg-muted/30",
        className
      )}
      style={{
        backgroundImage: `url(${patternUrl})`,
        backgroundRepeat: "repeat",
      }}
    >
      <div className="container">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col gap-10 rounded-lg border bg-background p-8"
            >
              <div>
                <DynamicIcon name={feature.icon} size={24} />
                <h3 className="mt-6 mb-2 font-medium">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              <Pressable
                href={feature.link}
                className="flex items-center gap-2 text-sm font-medium"
              >
                Learn more
                <DynamicIcon name="lucide/chevron-right" size={16} />
              </Pressable>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
