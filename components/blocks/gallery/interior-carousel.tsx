"use client";

import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

export interface InteriorCarouselProps {
  heading?: string;
  description?: string;
  images?: string[];
  className?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultImages = [
  "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
  "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
  "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
  "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
  "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
  "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
  "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
];

/**
 * InteriorCarousel displays images in a looping two-up carousel layout.
 *
 * Features a centered header with title and multi-line description, followed
 * by a carousel showing two portrait images side-by-side. Navigation arrows
 * are overlaid on the carousel with semi-transparent dark backgrounds. The
 * carousel loops infinitely and uses a tall aspect ratio (3.8:5) for images.
 * Ideal for interior design portfolios, real estate galleries, or any visual
 * content showcasing spaces and environments.
 *
 * @example
 * ```tsx
 * <InteriorCarousel
 *   heading="Beautiful Interiors."
 *   description="Explore our curated collection of stunning interior designs."
 *   images={["/images/interior-1.jpg", "/images/interior-2.jpg"]}
 * />
 * ```
 */
export function InteriorCarousel({
  heading = "Beautiful Interiors.",
  description = "Explore our curated collection of stunning interior designs.\nEach space tells a unique story through thoughtful design and attention to detail.",
  images = defaultImages,
  className,
  optixFlowConfig,
}: InteriorCarouselProps) {
  const descriptionLines = description.split("\n");

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="mb-4 text-center text-4xl font-semibold">
          {heading}
        </h2>
        <p className="text-center text-sm text-muted-foreground">
          {descriptionLines.map((line, index) => (
            <span key={index}>
              {line}
              {index < descriptionLines.length - 1 && <br />}
            </span>
          ))}
        </p>
        <div className="mt-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="mx-auto w-full max-w-6xl"
          >
            <CarouselContent
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              {images.map((image, index) => (
                <CarouselItem key={index} className="basis-1/2">
                  <Img
                    src={image}
                    alt="Interior design"
                    className="aspect-[3.8/5] w-full rounded-xl object-cover"
                    loading="lazy"
                    optixFlowConfig={optixFlowConfig}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-5 scale-120 border-none bg-black/30 text-white hover:bg-black/50 hover:text-white dark:bg-black/30 dark:hover:bg-black/50" />
            <CarouselNext className="right-5 scale-120 border-none bg-black/30 text-white hover:bg-black/50 hover:text-white dark:bg-black/30 dark:hover:bg-black/50" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
