"use client";

import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import type { CarouselApi } from "../../ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";

export interface TestimonialCarouselItem {
  id: string;
  username: string;
  quote: string;
  author: string;
  image: string;
  bgColor: string;
}

export interface TestimonialCarouselCardsProps {
  heading?: string;
  description?: string;
  items?: TestimonialCarouselItem[];
  className?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultItems: TestimonialCarouselItem[] = [
  {
    id: "item-1",
    username: "@techinnovator",
    quote:
      "Their team transformed our vision into a seamless, user-friendly app. The attention to detail and commitment to quality is unmatched!",
    author: "Sarah",
    image:
      "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
    bgColor: "bg-green-300",
  },
  {
    id: "item-2",
    username: "@startupfounder",
    quote:
      "From ideation to deployment, they delivered a robust solution that scaled with our business. Truly a partner in our growth journey.",
    author: "James",
    image:
      "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
    bgColor: "bg-orange-300",
  },
  {
    id: "item-3",
    username: "@enterpriseleader",
    quote:
      "Their expertise in cloud solutions helped us optimize our operations and reduce costs significantly. Highly recommend their services!",
    author: "Emily",
    image:
      "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
    bgColor: "bg-purple-300",
  },
  {
    id: "item-4",
    username: "@productmanager",
    quote:
      "The team's ability to understand complex requirements and deliver on time is exceptional. They made the development process stress-free.",
    author: "Michael",
    image:
      "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
    bgColor: "bg-green-300",
  },
  {
    id: "item-5",
    username: "@cto",
    quote:
      "Their innovative approach to software development has been a game-changer for our organization. We couldn't be happier with the results!",
    author: "Laura",
    image:
      "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
    bgColor: "bg-orange-300",
  },
];

/**
 * TestimonialCarouselCards displays testimonials in a two-panel carousel format.
 *
 * Features a left sidebar with heading, description, and navigation buttons,
 * alongside a carousel of testimonial cards. Each card shows an image paired
 * with a colored quote panel containing username badge, quote, and author name.
 * Includes a progress bar indicator at the bottom. Ideal for showcasing client
 * testimonials, reviews, or success stories with visual impact.
 *
 * @example
 * ```tsx
 * <TestimonialCarouselCards
 *   heading="Building the Future, One Line of Code at a Time"
 *   description="From startups to enterprises, we empower businesses with cutting-edge solutions."
 *   items={[
 *     {
 *       id: "1",
 *       username: "@happyclient",
 *       quote: "Amazing service and results!",
 *       author: "John Doe",
 *       image: "/images/client-1.jpg",
 *       bgColor: "bg-blue-300"
 *     }
 *   ]}
 * />
 * ```
 */
export function TestimonialCarouselCards({
  heading = "Building the Future, One Line of Code at a Time",
  description = "From startups to enterprises, we empower businesses with cutting-edge software solutions. Hear from our satisfied clients.",
  items = defaultItems,
  className,
  optixFlowConfig,
}: TestimonialCarouselCardsProps) {
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
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 px-4 lg:flex-row lg:px-10">
          <div className="flex flex-col justify-between lg:h-[460px] lg:w-[445px] lg:pr-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-semibold lg:text-4xl">{heading}</h2>
              <p className="text-lg text-muted-foreground">{description}</p>
            </div>

            <div className="hidden justify-start gap-4 lg:flex">
              <Pressable
                size="icon"
                className="rounded-full"
                variant="outline"
                onClick={() => carouselApi?.scrollPrev()}
                disabled={!canScrollPrev}
                asButton
              >
                <DynamicIcon name="lucide/arrow-left" size={16} />
              </Pressable>
              <Pressable
                size="icon"
                variant="outline"
                className="rounded-full"
                onClick={() => carouselApi?.scrollNext()}
                disabled={!canScrollNext}
                asButton
              >
                <DynamicIcon name="lucide/arrow-right" size={16} />
              </Pressable>
            </div>
          </div>

          <div className="relative w-full overflow-hidden pb-12 lg:flex-1">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "start",
                dragFree: true,
              }}
            >
              <CarouselContent>
                {items.map((testimonial) => (
                  <CarouselItem
                    key={testimonial.id}
                    className="min-w-[800px] flex-1"
                  >
                    <div className="flex gap-2">
                      <div className="h-[460px] w-[400px]">
                        <Img
                          src={testimonial.image}
                          alt={testimonial.username}
                          className="aspect-square h-full w-full rounded-2xl object-cover"
                          loading="lazy"
                          optixFlowConfig={optixFlowConfig}
                        />
                      </div>

                      <div
                        className={`relative flex h-[460px] w-[400px] flex-col items-start justify-end rounded-2xl p-8 ${testimonial.bgColor}`}
                      >
                        <Badge className="mb-auto bg-background px-4 py-2 text-black">
                          {testimonial.username}
                        </Badge>
                        <span className="-rotate-[4deg] text-7xl leading-none">
                          &quot;
                        </span>
                        <p className="text-xl font-semibold">
                          {testimonial.quote}
                        </p>
                        <p className="mt-4 text-lg font-medium">
                          {testimonial.author}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            <div className="absolute bottom-4 left-1/2 h-0.5 w-60 -translate-x-1/2 rounded bg-gray-200">
              <div
                className="h-0.5 rounded bg-primary transition-transform duration-300 ease-out"
                style={{
                  width: `${progressIndicatorWidth}px`,
                  transform: `translateX(${progressOffset}px)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
