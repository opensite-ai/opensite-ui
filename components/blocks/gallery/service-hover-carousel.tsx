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

export interface ServiceHoverCarouselItem {
  id: string;
  title: string;
  price: string;
  image: string;
  hoverImage: string;
  tag: string;
}

export interface ServiceHoverCarouselProps {
  heading?: string;
  items?: ServiceHoverCarouselItem[];
  className?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultItems: ServiceHoverCarouselItem[] = [
  {
    id: "1",
    title: "Custom Web Development",
    price: "$1,500",
    image: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
    hoverImage: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
    tag: "Tailored Solutions",
  },
  {
    id: "2",
    title: "Mobile App Development",
    price: "$2,000",
    image: "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
    hoverImage: "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
    tag: "iOS & Android",
  },
  {
    id: "3",
    title: "Cloud Solutions",
    price: "$3,000",
    image: "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
    hoverImage: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
    tag: "Scalable Infrastructure",
  },
  {
    id: "4",
    title: "UI/UX Design",
    price: "$1,200",
    image: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
    hoverImage: "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
    tag: "User-Centric Design",
  },
  {
    id: "5",
    title: "E-Commerce Platforms",
    price: "$2,500",
    image: "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
    hoverImage: "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
    tag: "Seamless Shopping",
  },
  {
    id: "6",
    title: "AI & Machine Learning",
    price: "$5,000",
    image: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
    hoverImage: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
    tag: "Smart Automation",
  },
  {
    id: "7",
    title: "DevOps Services",
    price: "$2,800",
    image: "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
    hoverImage: "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
    tag: "Efficient Workflows",
  },
  {
    id: "8",
    title: "Cybersecurity Solutions",
    price: "$4,000",
    image: "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
    hoverImage: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
    tag: "Secure Systems",
  },
];

/**
 * ServiceHoverCarousel displays service cards with hover image swap effect.
 *
 * Features a header with title and navigation buttons, followed by a carousel
 * of portrait cards. Each card shows a primary image that swaps to a secondary
 * image on hover, with a badge tag overlay and title/price below. Includes a
 * progress bar indicator at the bottom. Ideal for showcasing services, products,
 * or portfolio items with before/after or alternate view imagery.
 *
 * @example
 * ```tsx
 * <ServiceHoverCarousel
 *   heading="Our Services"
 *   items={[
 *     {
 *       id: "1",
 *       title: "Web Development",
 *       price: "$1,500",
 *       image: "/images/service-1.jpg",
 *       hoverImage: "/images/service-1-hover.jpg",
 *       tag: "Custom Solutions"
 *     }
 *   ]}
 * />
 * ```
 */
export function ServiceHoverCarousel({
  heading = "Our Services",
  items = defaultItems,
  className,
  optixFlowConfig,
}: ServiceHoverCarouselProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentIndex(carouselApi.selectedScrollSnap());
    };

    updateSelection();
    carouselApi.on("select", updateSelection);

    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  const progressWidth = 240;
  const progressIndicatorWidth = progressWidth / items.length;
  const progressOffset = currentIndex * progressIndicatorWidth;

  return (
    <section className={cn("py-32", className)}>
      <div className="px-4 lg:px-10">
        <div className="mb-6 flex flex-col justify-between md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-semibold md:text-4xl">{heading}</h2>
          </div>
          <div className="mt-8 flex shrink-0 items-center justify-start gap-2">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="rounded-full"
            >
              <DynamicIcon name="lucide/arrow-left" size={20} />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="rounded-full"
            >
              <DynamicIcon name="lucide/arrow-right" size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="px-4 pb-10 lg:px-10">
            {items.map((product) => (
              <CarouselItem key={product.id} className="min-w-[334px] flex-1">
                <a
                  href={`/services/${product.id}`}
                  className="group relative flex h-full flex-col items-start justify-start gap-2"
                >
                  <div className="w-full">
                    <div className="group relative z-10 overflow-hidden rounded-2xl">
                      <Img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                        style={{ aspectRatio: "3/4" }}
                        loading="lazy"
                        optixFlowConfig={optixFlowConfig}
                      />
                      <Img
                        src={product.hoverImage}
                        alt={product.title}
                        className="absolute top-0 left-0 z-10 h-full w-full rounded-2xl object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ aspectRatio: "3/4" }}
                        loading="lazy"
                        optixFlowConfig={optixFlowConfig}
                      />

                      <Badge
                        className="absolute top-4 left-4 bg-background px-4 py-2"
                        variant="outline"
                      >
                        {product.tag}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3>{product.title}</h3>
                    <span>
                      Starting at <span>{product.price}</span>
                    </span>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="absolute bottom-0 left-1/2 h-[2px] w-[240px] -translate-x-1/2 rounded bg-gray-200">
          <div
            className="h-[2px] rounded bg-black transition-transform duration-300 ease-out"
            style={{
              width: `${progressIndicatorWidth}px`,
              transform: `translateX(${progressOffset}px)`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
