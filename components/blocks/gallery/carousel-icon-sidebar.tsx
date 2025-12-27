"use client";

import { startTransition, useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import type { CarouselApi } from "../../ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

export interface CarouselIconSidebarItem {
  src: string;
  title: string;
  description: string;
  icon: string;
}

export interface CarouselIconSidebarProps {
  items?: CarouselIconSidebarItem[];
  className?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultItems: CarouselIconSidebarItem[] = [
  {
    src: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
    title: "Elegant Design",
    description:
      "Discover our beautifully crafted designs that blend style and functionality.",
    icon: "lucide/palette",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
    title: "Premium Quality",
    description:
      "Experience the finest materials and craftsmanship in every piece.",
    icon: "lucide/star",
  },
  {
    src: "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
    title: "Modern Aesthetics",
    description:
      "Stay ahead of the curve with our contemporary and trendy collections.",
    icon: "lucide/sparkles",
  },
];

/**
 * CarouselIconSidebar displays a carousel with a dynamic icon sidebar panel.
 *
 * Features a two-column layout with a muted sidebar panel showing the active
 * slide's icon, title, description, and navigation arrows, alongside a larger
 * image carousel. The sidebar content updates dynamically based on the current
 * slide. Ideal for showcasing product features, service offerings, or portfolio
 * items with detailed descriptions.
 *
 * @example
 * ```tsx
 * <CarouselIconSidebar
 *   items={[
 *     {
 *       src: "/images/design.jpg",
 *       title: "Elegant Design",
 *       description: "Beautiful interfaces that users love",
 *       icon: "lucide/palette"
 *     }
 *   ]}
 * />
 * ```
 */
export function CarouselIconSidebar({
  items = defaultItems,
  className,
  optixFlowConfig,
}: CarouselIconSidebarProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    startTransition(() => {
      setActiveIndex(api.selectedScrollSnap());
    });
    api.on("select", () => {
      startTransition(() => {
        setActiveIndex(api.selectedScrollSnap());
      });
    });
  }, [api]);

  const activeItem = items[activeIndex];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Carousel setApi={setApi} className="w-full">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="flex h-full flex-col gap-8 rounded-lg bg-muted px-8 py-16">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background shadow-lg ring-1 ring-gray-200">
                  <DynamicIcon name={activeItem.icon} size={24} />
                </div>
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-medium">
                    {activeItem.title}
                  </h2>
                  <p className="mb-4 text-base text-muted-foreground">
                    {activeItem.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <CarouselPrevious className="relative top-0 right-0 left-0 translate-x-0 translate-y-0 p-5 transition-all duration-200 hover:bg-black hover:text-white" />
                    <CarouselNext className="relative top-0 right-0 left-0 translate-x-0 translate-y-0 p-5 transition-all duration-200 hover:bg-black hover:text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="h-full md:col-span-3">
              <CarouselContent>
                {items.map((image, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="aspect-[2/1] h-full w-full">
                      <Img
                        src={image.src}
                        alt={image.title}
                        className="h-full w-full rounded-lg object-cover"
                        loading="lazy"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
