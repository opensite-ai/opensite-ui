"use client";

import { Fragment } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

export interface CarouselSidebarResource {
  title: string;
  category: string;
  link: string;
  image: string;
}

export interface CarouselSidebarResourcesProps {
  heading?: string;
  resources?: CarouselSidebarResource[];
  viewAllText?: string;
  viewAllHref?: string;
  className?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultResources: CarouselSidebarResource[] = [
  {
    title: "Getting Started with Templates",
    category: "guide",
    link: "#",
    image: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
  },
  {
    title: "Template Pricing & Plans",
    category: "pricing",
    link: "#",
    image: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
  },
  {
    title: "Introducing Our New Template Builder",
    category: "news",
    link: "#",
    image: "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
  },
  {
    title: "Modern Design Patterns: Creating Responsive Templates for 2025",
    category: "tutorial",
    link: "#",
    image: "https://toastability-production.s3.amazonaws.com/63aotyt2pb4gqpccej2kkw8reson",
  },
  {
    title: "The Ultimate Guide to Template Customization",
    category: "ebook",
    link: "#",
    image: "https://toastability-production.s3.amazonaws.com/pjgb223h1bjywdk15i3zi7pjhutg",
  },
  {
    title: "Template Success Stories: Year in Review",
    category: "blog",
    link: "#",
    image: "https://toastability-production.s3.amazonaws.com/3qlr5qlwmqxlqvlmxqfhqvqvqvqv",
  },
];

/**
 * CarouselSidebarResources displays a carousel with a sidebar resource list.
 *
 * Features a three-column layout with a sidebar showing the first 3 resources
 * as a categorized list with separators, a main carousel area showing cards
 * with images and titles, and navigation controls. The sidebar includes a
 * "View all resources" link. Ideal for resource centers, documentation hubs,
 * or content libraries with categorized materials.
 *
 * @example
 * ```tsx
 * <CarouselSidebarResources
 *   heading="Start building with our template collection"
 *   resources={[
 *     {
 *       title: "Getting Started Guide",
 *       category: "guide",
 *       link: "/docs/getting-started",
 *       image: "/images/guide.jpg"
 *     }
 *   ]}
 *   viewAllText="View all resources"
 *   viewAllHref="/resources"
 * />
 * ```
 */
export function CarouselSidebarResources({
  heading = "Start building with our template collection",
  resources = defaultResources,
  viewAllText = "View all resources",
  viewAllHref = "#",
  className,
  optixFlowConfig,
}: CarouselSidebarResourcesProps) {
  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className="container">
        <h2 className="text-2xl font-bold text-pretty">
          {heading}
        </h2>
        <Carousel>
          <div className="mt-6 grid gap-x-14 gap-y-10 lg:mt-16 lg:grid-cols-3">
            <div className="order-3 flex flex-col gap-6 lg:order-none">
              {resources.slice(0, 3).map((resource, idx) => (
                <Fragment key={idx}>
                  <div className="flex flex-col gap-1">
                    <div className="font-mono text-sm text-muted-foreground uppercase">
                      {resource.category}
                    </div>
                    <a
                      href={resource.link}
                      className="group flex items-center gap-2 font-semibold"
                    >
                      {resource.title}
                      <DynamicIcon name="lucide/move-right" size={20} className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                  <div className="h-px w-full bg-border" />
                </Fragment>
              ))}
              <a
                href={viewAllHref}
                className="group flex items-center gap-2 font-semibold"
              >
                {viewAllText}
                <DynamicIcon name="lucide/move-right" size={20} className="mt-0.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
            <div className="order-1 lg:order-none lg:col-span-2 [&>div[data-slot=carousel-content]]:overflow-visible [&>div[data-slot=carousel-content]]:[clip-path:inset(-100vw_-100vw_-100vw_0)]">
              <CarouselContent className="ml-0 max-w-[min(calc(100vw-4rem),24rem)] select-none sm:max-w-96">
                {resources.map((item, idx) => (
                  <CarouselItem
                    className={cn(
                      "w-fit border-y border-l border-border pl-0 transition-colors duration-300 hover:bg-muted/50",
                      idx === resources.length - 1 && "border-r",
                    )}
                    key={idx}
                  >
                    <a href={item.link} className="block h-full">
                      <Img
                        src={item.image}
                        alt={item.title}
                        className="aspect-video object-cover"
                        loading="lazy"
                        optixFlowConfig={optixFlowConfig}
                      />
                      <div className="px-6 py-8">
                        <div className="text-sm text-muted-foreground uppercase">
                          {item.category}
                        </div>
                        <h3 className="mt-2 text-xl font-semibold lg:text-2xl">
                          {item.title}
                        </h3>
                      </div>
                    </a>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
            <div className="order-2 flex items-center gap-4 lg:order-none lg:col-start-2">
              <CarouselPrevious className="static size-12 translate-x-0 translate-y-0" />
              <CarouselNext className="static size-12 translate-x-0 translate-y-0" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
