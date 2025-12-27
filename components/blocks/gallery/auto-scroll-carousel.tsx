"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../ui/carousel";

export interface AutoScrollCarouselProps {
  heading?: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
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
  "https://toastability-production.s3.amazonaws.com/3qlr5qlwmqxlqvlmxqfhqvqvqvqv",
  "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
  "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
  "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
  "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
  "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
  "https://toastability-production.s3.amazonaws.com/3qlr5qlwmqxlqvlmxqfhqvqvqvqv",
];

/**
 * AutoScrollCarousel displays images in a continuously auto-scrolling carousel.
 *
 * Features a header section with heading, description, and a link, followed by
 * an infinite-loop carousel that auto-scrolls horizontally. Images are displayed
 * in a staggered pattern with alternating vertical offsets for visual interest.
 * Ideal for showcasing team photos, product images, or portfolio work in an
 * engaging, hands-free presentation.
 *
 * @example
 * ```tsx
 * <AutoScrollCarousel
 *   heading="Bringing your data to life with AI"
 *   description="Our team transforms complex data into actionable insights."
 *   linkText="Explore our solutions"
 *   linkHref="/solutions"
 *   images={["/images/team-1.jpg", "/images/team-2.jpg"]}
 * />
 * ```
 */
export function AutoScrollCarousel({
  heading = "Bringing your data to life with the power of AI",
  description = "We thrive on the power of AI. Our team is made up of some of the most talented people in the world, and we're looking for new ways to push the boundaries of what's possible. We're a team of data scientists.",
  linkText = "Explore our solutions",
  linkHref = "#",
  images = defaultImages,
  className,
  optixFlowConfig,
}: AutoScrollCarouselProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-12 grid grid-cols-1 gap-x-12 gap-y-6 md:mb-16 md:grid-cols-2 md:gap-x-24">
          <div className="flex flex-col gap-8 md:gap-12">
            <h1 className="text-3xl font-bold md:text-4xl">
              {heading}
            </h1>
          </div>
          <p>
            {description}
          </p>
          <a href={linkHref} className="font-medium hover:underline">
            {linkText} <DynamicIcon name="lucide/move-right" size={20} className="ml-2 inline" />
          </a>
        </div>
      </div>
      <div className="w-full">
        <div className="max-w-[100vw] overflow-x-hidden">
          <Carousel
            opts={{
              loop: true,
            }}
            plugins={[
              AutoScroll({
                speed: 0.9,
              }),
            ]}
            className="pointer-events-none"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="basis-auto">
                  <div className="max-h-80 max-w-60">
                    <Img
                      src={image}
                      alt="Gallery image"
                      className={cn(
                        "mt-7 h-full w-full rounded-md object-cover",
                        index % 2 === 0 && "mt-16",
                      )}
                      loading="lazy"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
