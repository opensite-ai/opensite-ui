"use client";

import { startTransition, useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import type { CarouselApi } from "../../ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

export interface CarouselGradientTextItem {
  image: string;
  title: string;
  description: string;
}

export interface CarouselGradientTextProps {
  heading?: string;
  subheading?: string;
  items?: CarouselGradientTextItem[];
  className?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultItems: CarouselGradientTextItem[] = [
  {
    image: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
    title: "Responsive",
    description:
      "Our templates are built with a mobile-first approach, ensuring your website looks stunning on all devices and screen sizes.",
  },
  {
    image: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
    title: "Clean Code",
    description:
      "Each template is crafted with clean, well-structured code following best practices to make customization and maintenance simple.",
  },
  {
    image: "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
    title: "Copy & Paste",
    description:
      "Our templates are designed for easy copy and paste functionality, allowing you to quickly implement components and features into your projects.",
  },
  {
    image: "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
    title: "Easy Updates",
    description:
      "Regular updates and maintenance ensure your template stays current with the latest web standards and security practices.",
  },
  {
    image: "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
    title: "Modern Stack",
    description:
      "Built with the latest technologies including React, Tailwind CSS and shadcn/ui for a modern development experience.",
  },
];

/**
 * CarouselGradientText displays cards with gradient overlay text and expanding indicators.
 *
 * Features a two-column layout with heading/subheading and navigation on the left,
 * and a carousel of portrait cards on the right. Each card has a gradient overlay
 * from primary color with title and description text. Below the carousel are
 * expanding pill indicators that show the active slide title. Ideal for showcasing
 * features, benefits, or product highlights with strong visual hierarchy.
 *
 * @example
 * ```tsx
 * <CarouselGradientText
 *   heading="Code less."
 *   subheading="Build faster."
 *   items={[
 *     {
 *       image: "/images/feature-1.jpg",
 *       title: "Responsive",
 *       description: "Mobile-first design approach"
 *     }
 *   ]}
 * />
 * ```
 */
export function CarouselGradientText({
  heading = "Code less.",
  subheading = "Build faster.",
  items = defaultItems,
  className,
  optixFlowConfig,
}: CarouselGradientTextProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    startTransition(() => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("select", () => {
      startTransition(() => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    });
  }, [api]);

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <Carousel setApi={setApi}>
          <div className="grid gap-8 md:gap-4 lg:grid-cols-2 [&>div[data-slot=carousel-content]]:overflow-visible [&>div[data-slot=carousel-content]]:[clip-path:inset(-100vw_-100vw_-100vw_0)]">
            <div>
              <h2 className="text-4xl font-semibold md:text-6xl">
                {heading} <br />{" "}
                <span className="text-primary/40">{subheading}</span>
              </h2>
              <p className="mt-8 text-xl text-primary">
                Start with our templates, customize to your needs.
              </p>
              <div className="mt-8 hidden items-center gap-4 md:flex">
                <CarouselPrevious className="static size-12 translate-x-0 translate-y-0" />
                <CarouselNext className="static size-12 translate-x-0 translate-y-0" />
              </div>
            </div>

            <CarouselContent className="max-w-[400px] select-none">
              {items.map((item, idx) => (
                <CarouselItem className="w-fit" key={idx}>
                  <div className="relative aspect-[4/5] max-h-[500px] rounded-2xl">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary to-transparent to-40% dark:from-background" />
                    <Img
                      src={item.image}
                      alt={item.title}
                      className="size-full rounded-2xl bg-cover object-cover"
                      loading="lazy"
                      optixFlowConfig={optixFlowConfig}
                    />
                    <div className="absolute inset-0 p-8">
                      <p className="text-sm font-semibold text-background/50 dark:text-foreground/50">
                        <span className="mr-1 text-background dark:text-foreground">
                          {item.title}.
                        </span>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
        <div className="mt-8 flex items-center lg:ml-[50%]">
          {Array.from({ length: items.length }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "flex h-8 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-muted-foreground/15 text-xs font-semibold whitespace-nowrap transition-all duration-300",
                index + 1 === current ? "w-32" : "m-4 size-4",
              )}
              onClick={() => api && api.scrollTo(index)}
            >
              <span
                className={cn(
                  "inline-block transition-all duration-300",
                  index + 1 === current
                    ? "translate-x-0 opacity-100"
                    : "translate-x-6 opacity-0",
                )}
              >
                {items[index].title}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
