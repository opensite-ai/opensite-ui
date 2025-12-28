"use client";

/**
 * CarouselFeatureBadge
 *
 * A two-column feature section with a badge label, headline, description text,
 * and an interactive carousel showcasing platform screenshots or feature images.
 * Includes previous/next navigation controls for browsing through carousel items.
 *
 * Use cases:
 * - Product feature showcases with visual demonstrations
 * - Platform overview sections with screenshot galleries
 * - Marketing landing pages highlighting key capabilities
 */

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface CarouselFeatureBadgeProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  badgeText?: string;
  heading?: string;
  description?: string;
  items?: Array<{
    src: string;
    alt: string;
  }>;
}

export function CarouselFeatureBadge({
  className,
  optixFlowConfig,
  badgeText = "Platform",
  heading = "This is the start of something new",
  description = "Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever.",
  items,
}: CarouselFeatureBadgeProps): React.JSX.Element {
  const defaultItems = React.useMemo(
    () =>
      Array.from({ length: 5 }).map((_, index) => ({
        src: imagePlaceholders[index % imagePlaceholders.length],
        alt: `Platform Screenshot ${index + 1}`,
      })),
    []
  );

  const carouselItems = items || defaultItems;

  return (
    <section className={cn("w-full py-20 lg:py-40", className)}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-end justify-end gap-10 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-4">
            <div>
              <Badge>{badgeText}</Badge>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-left text-xl font-normal tracking-tighter md:text-3xl lg:max-w-xl lg:text-5xl">
                {heading}
              </h2>
              <p className="max-w-xl text-left text-lg leading-relaxed tracking-tight text-muted-foreground lg:max-w-sm">
                {description}
              </p>
            </div>
          </div>
          <div className="w-full max-w-full px-6">
            <Carousel>
              <CarouselContent>
                {carouselItems.map((item, index) => (
                  <CarouselItem key={index}>
                    <div className="flex aspect-video items-center justify-center overflow-hidden rounded-md bg-muted p-6">
                      <Img
                        src={item.src}
                        alt={item.alt}
                        className="h-full w-full object-cover"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

