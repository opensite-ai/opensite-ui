"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface FeatureTabbedContentImageSlide {
  /**
   * Unique identifier
   */
  id: number;
  /**
   * Tab name
   */
  tabName: string;
  /**
   * Slide title
   */
  title: string;
  /**
   * Slide description
   */
  description: string;
  /**
   * Array of feature bullet points
   */
  features: string[];
  /**
   * Link URL
   */
  link: string;
  /**
   * Image source URL
   */
  image: string;
}

export interface FeatureTabbedContentImageProps {
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Array of tab slides
   */
  slides?: FeatureTabbedContentImageSlide[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * Feature Tabbed Content Image - Tabbed interface with content and images
 * that change based on selected tab.
 *
 * Layout: Centered header, horizontal tabs, two-column content with image.
 * Key features: Tab navigation, checklist features, CTA button per tab, responsive images.
 * Best for: Product/service categories, multi-section content, portfolio showcases.
 *
 * @example
 * ```tsx
 * <FeatureTabbedContentImage
 *   title="Building Better Digital Experiences"
 *   slides={[
 *     {
 *       id: 1,
 *       tabName: "Products",
 *       title: "Pre-built Components",
 *       description: "Accelerate your workflow.",
 *       features: ["Cross-platform", "Responsive"],
 *       link: "/products",
 *       image: "/products.jpg"
 *     },
 *   ]}
 * />
 * ```
 */
export function FeatureTabbedContentImage({
  title = "Building Better Digital Experiences",
  description = "Discover how our platform empowers developers and businesses to create exceptional web applications with less code and more creativity.",
  slides = [
    {
      id: 1,
      tabName: "Products",
      title: "Pre-built Components for Rapid Development",
      description:
        "Accelerate your workflow with our library of ready-to-use, fully customizable UI components designed for modern web applications.",
      features: [
        "Cross-platform Integrations",
        "Responsive Components",
        "Accessible Blocks",
        "Customizable Templates",
      ],
      link: "#",
      image: blockBrandedIconsAndPlaceholders.placeholder1,
    },
    {
      id: 2,
      tabName: "Services",
      title: "Expert Solutions for Every Challenge",
      description:
        "Our comprehensive services help you build, scale, and optimize your digital presence with expert guidance every step of the way.",
      features: [
        "Technical Consulting",
        "Implementation Support",
        "Performance Optimization",
        "Ongoing Maintenance",
      ],
      link: "#",
      image: blockBrandedIconsAndPlaceholders.placeholderDark1,
    },
    {
      id: 3,
      tabName: "Company",
      title: "We Build the Future of Web Development",
      description:
        "Founded by industry experts, we're committed to creating tools that empower developers to build better digital experiences faster.",
      features: [
        "Remote-first Culture",
        "Open Source Contributors",
        "Community-driven",
        "Continuous Innovation",
      ],
      link: "#",
      image: blockBrandedIconsAndPlaceholders.placeholder3,
    },
    {
      id: 4,
      tabName: "Portfolio",
      title: "Showcasing Client Success Stories",
      description:
        "Explore our diverse portfolio of successful implementations across industries, from startups to enterprise-level organizations.",
      features: [
        "Case Studies",
        "Implementation Examples",
        "Success Metrics",
        "Client Testimonials",
      ],
      link: "#",
      image: blockBrandedIconsAndPlaceholders.placeholder4,
    },
    {
      id: 5,
      tabName: "Resources",
      title: "Knowledge to Power Your Development",
      description:
        "Access our comprehensive collection of tutorials, guides, and best practices to help you get the most from our platform.",
      features: [
        "Developer Guides",
        "Video Tutorials",
        "API Documentation",
        "Community Forums",
      ],
      link: "#",
      image: blockBrandedIconsAndPlaceholders.placeholder5,
    },
  ],
  className,
  optixFlowConfig,
}: FeatureTabbedContentImageProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
          {title && (
            <h2 className="text-center text-3xl font-semibold lg:text-5xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-center text-balance text-muted-foreground lg:text-xl">
              {description}
            </p>
          )}
        </div>
        <div className="mt-12">
          <Tabs
            defaultValue="1"
            className="mx-auto flex w-fit flex-col items-center gap-8 md:gap-12"
          >
            <TabsList className="flex h-auto gap-x-2 p-2">
              {slides.map((slide) => (
                <TabsTrigger
                  key={slide.id}
                  value={slide.id.toString()}
                  className="text-sm hover:bg-background md:text-base"
                >
                  {slide.tabName}
                </TabsTrigger>
              ))}
            </TabsList>
            {slides.map((slide) => (
              <TabsContent
                value={slide.id.toString()}
                key={slide.id}
                className="max-w-5xl"
              >
                <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
                  <div>
                    <h2 className="mb-4 text-2xl font-semibold lg:text-4xl">
                      {slide.title}
                    </h2>
                    <p className="text-muted-foreground lg:text-xl">
                      {slide.description}
                    </p>
                    <ul className="mt-8 grid grid-cols-1 gap-2 lg:grid-cols-2">
                      {slide.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <DynamicIcon name="lucide/check-circle-2" size={16} />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Pressable
                      href={slide.link}
                      variant="outline"
                      size="sm"
                      asButton
                      className="mt-8"
                    >
                      Explore {slide.tabName}
                      <DynamicIcon name="lucide/arrow-right" size={16} />
                    </Pressable>
                  </div>
                  <Img
                    src={slide.image}
                    alt={slide.title}
                    className="order-first max-h-[400px] w-full rounded-lg object-cover md:order-last"
                    loading="lazy"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
