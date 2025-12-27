"use client";

import { startTransition, useEffect, useState, type ReactNode } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
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

export interface CarouselIconTabItem {
  img: string;
  title: string;
  text: string;
  icon: string;
}

export interface CarouselIconTabsProps {
  heading?: string;
  badge?: string;
  sections?: CarouselIconTabItem[];
  className?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSections: CarouselIconTabItem[] = [
  {
    img: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
    title: "Design",
    text: "Create beautiful, responsive designs with our intuitive tools and templates.",
    icon: "lucide/code",
  },
  {
    img: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
    title: "Develop",
    text: "Build robust applications with modern frameworks and best practices.",
    icon: "lucide/git-branch",
  },
  {
    img: "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
    title: "Ship",
    text: "Deploy your projects with confidence using our streamlined workflow.",
    icon: "lucide/sparkles",
  },
];

/**
 * CarouselIconTabs displays a carousel with icon-based tab navigation.
 *
 * Features a centered heading with badge, a full-width image carousel, and
 * clickable tab sections below showing icon, title, and description. The
 * active tab is highlighted with different text opacity. Navigation arrows
 * and slide counter are shown at the bottom. Ideal for showcasing workflow
 * steps, product features, or process stages with visual representation.
 *
 * @example
 * ```tsx
 * <CarouselIconTabs
 *   heading="Cut the time it takes to close your books"
 *   badge="Streamline your workflow"
 *   sections={[
 *     {
 *       img: "/images/design.jpg",
 *       title: "Design",
 *       text: "Create beautiful interfaces",
 *       icon: "lucide/palette"
 *     }
 *   ]}
 * />
 * ```
 */
export function CarouselIconTabs({
  heading = "Cut the time it takes to close your books",
  badge = "Lorem ipsum dolor sit amet consectetur.",
  sections = defaultSections,
  className,
  optixFlowConfig,
}: CarouselIconTabsProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCurrent = () => {
      startTransition(() => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    };

    startTransition(() => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    api.on("select", updateCurrent);

    return () => {
      api.off("select", updateCurrent);
    };
  }, [api]);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-20 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl">{heading}</h1>

          <Badge
            variant="secondary"
            className="px-5 py-2 text-base font-normal"
          >
            {badge}
          </Badge>
        </div>
        <Carousel setApi={setApi} className="flex flex-col gap-10">
          <CarouselContent>
            {sections.map((item, index) => (
              <CarouselItem className="h-full w-full" key={index}>
                <Img
                  src={item.img}
                  alt={item.title}
                  className="aspect-square h-full w-full object-cover md:aspect-2/1"
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
                <div className="mt-8 flex cursor-pointer flex-col gap-2 md:hidden">
                  <div>
                    <DynamicIcon name={item.icon} size={20} />
                  </div>
                  <div className="text-lg font-medium">{item.title}</div>
                  <div className="text-lg text-muted-foreground">
                    {item.text}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mb-8 hidden justify-between gap-8 md:flex">
            {sections.map((section, index) => (
              <div
                key={index}
                onClick={() => api?.scrollTo(index)}
                className="flex cursor-pointer flex-col gap-2"
              >
                <div>
                  <DynamicIcon name={section.icon} size={20} />
                </div>
                <div className="text-lg font-medium">{section.title}</div>
                <div
                  className={cn(
                    "text-lg hover:text-muted-foreground",
                    index + 1 === current
                      ? "text-muted-foreground"
                      : "text-muted-foreground/50"
                  )}
                >
                  {section.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-8">
            <div>
              {current} / {sections.length}
            </div>
            <div className="flex items-center justify-start gap-2">
              <CarouselPrevious
                className="static translate-y-0"
                disabled={false}
              />
              <CarouselNext className="static translate-y-0" disabled={false} />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
