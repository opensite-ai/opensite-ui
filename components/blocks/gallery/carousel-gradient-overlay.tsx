"use client";

import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import type { CarouselApi } from "../../ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";

export interface CarouselGradientOverlayItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface CarouselGradientOverlayProps {
  title?: string;
  description?: string;
  items?: CarouselGradientOverlayItem[];
  className?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultItems: CarouselGradientOverlayItem[] = [
  {
    id: "shadcn-ui",
    title: "Building a Modern Component Library",
    description:
      "Explore how modern component libraries revolutionized React development by providing a unique approach to component distribution and customization.",
    href: "#",
    image: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
  },
  {
    id: "tailwind",
    title: "The Utility-First Revolution",
    description:
      "Discover how utility-first CSS transformed the way developers style their applications, offering a new approach that speeds up development.",
    href: "#",
    image: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
  },
  {
    id: "astro",
    title: "The All-in-One Web Framework",
    description:
      "Learn how innovative architecture and zero-JS-by-default approach is helping developers build faster websites while maintaining rich interactivity.",
    href: "#",
    image: "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
  },
  {
    id: "react",
    title: "Pioneering Component-Based UI",
    description:
      "See how React continues to shape modern web development with its component-based architecture, enabling developers to build complex user interfaces.",
    href: "#",
    image: "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
  },
  {
    id: "nextjs",
    title: "The React Framework for Production",
    description:
      "Explore how Next.js has become the go-to framework for building full-stack React applications, offering features like server components and file-based routing.",
    href: "#",
    image: "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
  },
];

/**
 * CarouselGradientOverlay displays cards with gradient overlay and dot indicators.
 *
 * Each card features a full-bleed background image with a gradient overlay from
 * primary color, title, description, and "Read more" link. Includes dot navigation
 * indicators at the bottom and arrow buttons in the header. Ideal for showcasing
 * case studies, portfolio items, or featured content with strong visual impact.
 *
 * @example
 * ```tsx
 * <CarouselGradientOverlay
 *   title="Case Studies"
 *   description="Discover how leading companies leverage modern web technologies."
 *   items={[
 *     {
 *       id: "1",
 *       title: "E-commerce Platform",
 *       description: "A complete redesign of the shopping experience",
 *       href: "/case-studies/ecommerce",
 *       image: "/images/case-1.jpg"
 *     }
 *   ]}
 * />
 * ```
 */
export function CarouselGradientOverlay({
  title = "Case Studies",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences.",
  items = defaultItems,
  className,
  optixFlowConfig,
}: CarouselGradientOverlayProps) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
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
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="max-w-lg text-muted-foreground">{description}</p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
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
          <CarouselContent className="ml-0 2xl:mr-[max(0rem,calc(50vw-700px))] 2xl:ml-[max(8rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <a href={item.href} className="group rounded-xl">
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9]">
                    <Img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      optixFlowConfig={optixFlowConfig}
                    />
                    <div className="absolute inset-0 h-full bg-gradient-to-t from-primary from-20% to-transparent mix-blend-multiply" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 text-primary-foreground md:p-8">
                      <div className="mb-2 pt-4 text-xl font-semibold md:mb-3 md:pt-4 lg:pt-4">
                        {item.title}
                      </div>
                      <div className="mb-8 line-clamp-2 md:mb-12 lg:mb-9">
                        {item.description}
                      </div>
                      <div className="flex items-center text-sm">
                        Read more{" "}
                        <DynamicIcon name="lucide/arrow-right" size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-primary/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
