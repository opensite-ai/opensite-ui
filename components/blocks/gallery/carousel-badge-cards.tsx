"use client";

import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import type { CarouselApi } from "../../ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";

export interface CarouselBadgeCardItem {
  id: string;
  title: string;
  description: string;
  label: string;
  href: string;
  image: string;
}

export interface CarouselBadgeCardsProps {
  heading?: string;
  items?: CarouselBadgeCardItem[];
  className?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultItems: CarouselBadgeCardItem[] = [
  {
    id: "feature-1",
    title: "Smart AI Assistant",
    description:
      "Powered by advanced language models to handle complex queries, automate tasks, and provide intelligent responses with high accuracy.",
    label: "Core AI",
    href: "#",
    image: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
  },
  {
    id: "feature-2",
    title: "Data Analytics",
    description:
      "Transform raw data into actionable insights using machine learning algorithms and predictive analytics for informed decision-making.",
    label: "Analytics",
    href: "#",
    image: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
  },
  {
    id: "feature-3",
    title: "Process Automation",
    description:
      "Streamline workflows and automate repetitive tasks with intelligent process automation, increasing efficiency and reducing errors.",
    label: "Automation",
    href: "#",
    image: "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
  },
  {
    id: "feature-4",
    title: "Knowledge Base",
    description:
      "Access and manage comprehensive information with our AI-powered knowledge base that learns and improves from each interaction.",
    label: "Learning",
    href: "#",
    image: "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
  },
  {
    id: "feature-5",
    title: "API Integration",
    description:
      "Seamlessly integrate with existing systems through our robust API framework, enabling smooth data exchange and functionality extension.",
    label: "Integration",
    href: "#",
    image: "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
  },
];

/**
 * CarouselBadgeCards displays feature cards in a horizontal carousel with badge labels.
 *
 * Each card features an image with hover zoom effect, a category badge, title,
 * description, and a "Read more" link with arrow. Navigation is controlled via
 * arrow buttons in the header. Ideal for showcasing case studies, features,
 * blog posts, or any content that benefits from categorized card presentation.
 *
 * @example
 * ```tsx
 * <CarouselBadgeCards
 *   heading="Our Features"
 *   items={[
 *     {
 *       id: "1",
 *       title: "AI-Powered Analytics",
 *       description: "Transform your data into insights",
 *       label: "Analytics",
 *       href: "/features/analytics",
 *       image: "/images/analytics.jpg"
 *     }
 *   ]}
 * />
 * ```
 */
export function CarouselBadgeCards({
  heading = "Case Studies",
  items = defaultItems,
  className,
  optixFlowConfig,
}: CarouselBadgeCardsProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <div className="shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
            >
              <DynamicIcon name="lucide/arrow-left" size={20} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
            >
              <DynamicIcon name="lucide/arrow-right" size={20} />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="mr-[20px] ml-[20px] 2xl:mr-[calc(50vw-700px+20px)] 2xl:ml-[calc(50vw-700px+20px)]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <a
                  href={item.href}
                  className="group flex flex-col justify-between rounded-xl bg-muted p-6"
                >
                  <div>
                    <div className="flex aspect-[3/2] overflow-clip rounded-xl">
                      <div className="flex-1">
                        <div className="relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105">
                          <Img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover object-center"
                            loading="lazy"
                            optixFlowConfig={optixFlowConfig}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Badge>{item.label}</Badge>
                  </div>
                  <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl">
                    {item.title}
                  </div>
                  <div className="mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9">
                    {item.description}
                  </div>
                  <div className="flex items-center text-sm">
                    Read more{" "}
                    <DynamicIcon name="lucide/arrow-right" size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
