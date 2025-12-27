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

export interface CarouselScaleFocusImage {
  src: string;
  alt: string;
}

export interface CarouselScaleFocusProps {
  images?: CarouselScaleFocusImage[];
  className?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultImages: CarouselScaleFocusImage[] = [
  { src: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn", alt: "Gallery image 1" },
  { src: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t", alt: "Gallery image 2" },
  { src: "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j", alt: "Gallery image 3" },
  { src: "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson", alt: "Gallery image 4" },
  { src: "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg", alt: "Gallery image 5" },
  { src: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn", alt: "Gallery image 6" },
  { src: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t", alt: "Gallery image 7" },
  { src: "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j", alt: "Gallery image 8" },
  { src: "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson", alt: "Gallery image 9" },
  { src: "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg", alt: "Gallery image 10" },
];

/**
 * CarouselScaleFocus displays images with a scale and opacity focus effect.
 *
 * Features a centered carousel where the active slide is displayed at full
 * scale and opacity, while adjacent slides are scaled down to 70% and faded
 * to 40% opacity. Large navigation arrows are positioned outside the carousel
 * area, and dot indicators below allow direct slide selection. Ideal for
 * hero image galleries, product showcases, or any content requiring visual
 * emphasis on the current selection.
 *
 * @example
 * ```tsx
 * <CarouselScaleFocus
 *   images={[
 *     { src: "/images/hero-1.jpg", alt: "Hero image 1" },
 *     { src: "/images/hero-2.jpg", alt: "Hero image 2" }
 *   ]}
 * />
 * ```
 */
export function CarouselScaleFocus({
  images = defaultImages,
  className,
  optixFlowConfig,
}: CarouselScaleFocusProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    startTransition(() => {
      setCount(api.scrollSnapList().length);
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
      <div className="container md:px-45">
        <Carousel
          className="mx-auto w-full max-w-[50rem] [&>div:nth-child(1)]:md:overflow-visible"
          setApi={setApi}
          opts={{
            startIndex: 1,
          }}
        >
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={`carousel-img-${index}`}>
                <div
                  className={cn(
                    "aspect-[4/3] max-w-[50rem] overflow-hidden rounded-[0.75rem] transition-all duration-300",
                    current === index + 1
                      ? "scale-100 opacity-100"
                      : "scale-70 opacity-40"
                  )}
                >
                  <Img
                    className="block size-full object-cover object-center"
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 hidden md:block">
            <CarouselPrevious
              className="size-10 max-[767px]:static max-[767px]:translate-y-0 md:left-[-6.25rem] md:size-14 lg:left-[-9.9375rem] lg:size-14 [&>svg]:!size-6"
              variant="default"
            />
            <CarouselNext
              className="size-10 max-[767px]:static max-[767px]:translate-y-0 md:right-[-6.25rem] md:size-14 lg:right-[-9.9375rem] lg:size-14 [&>svg]:!size-6"
              variant="default"
            />
          </div>
        </Carousel>
        <div className="mx-auto mt-10 flex w-full max-w-[33.9375rem] items-center justify-center">
          {Array.from({ length: count }).map((_, index) => (
            <button
              aria-label={`Go to slide ${index + 1}`}
              key={`carousel-dot-btn-${index}`}
              className="p-2"
              onClick={() => {
                api?.scrollTo(index);
              }}
            >
              <div
                className={cn(
                  "size-3 rounded-full",
                  current === index + 1 ? "bg-primary" : "bg-primary/10"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
