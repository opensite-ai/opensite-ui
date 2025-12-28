"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface FeatureChecklistImageProps {
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text for accessibility
   */
  imageAlt?: string;
  /**
   * Button configuration
   */
  button?: {
    text: string;
    href: string;
  };
  /**
   * Array of checklist items
   */
  checklistItems?: string[];
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
 * Feature Checklist Image - Two-column layout with large image and text content
 * featuring a checklist of benefits.
 *
 * Layout: Split layout with image on left, content with checklist on right.
 * Key features: Large rounded image, checklist with check icons, CTA button.
 * Best for: Technology stack highlights, feature benefits, product capabilities.
 *
 * @example
 * ```tsx
 * <FeatureChecklistImage
 *   title="Built with the latest technology stack"
 *   description="Modern tools and frameworks for optimal performance."
 *   imageSrc="/tech-stack.jpg"
 *   checklistItems={["Quality", "Multi-purpose", "Easy to use", "Fast"]}
 *   button={{ text: "Learn more", href: "/features" }}
 * />
 * ```
 */
export function FeatureChecklistImage({
  title = "Built with the latest technology stack",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum alias unde et doloremque dignissimos error temporibus quisquam porro ducimus esse quod, a officiis.",
  imageSrc = blockBrandedIconsAndPlaceholders.placeholder1,
  imageAlt = "Feature illustration",
  button = {
    text: "Learn more",
    href: "#",
  },
  checklistItems = ["Quality", "Multi-purpose", "Easy to use", "Fast"],
  className,
  optixFlowConfig,
}: FeatureChecklistImageProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row">
          <Img
            src={imageSrc}
            alt={imageAlt}
            className="max-h-96 w-full rounded-lg object-cover md:max-h-[500px] md:w-1/2"
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
          <div className="lg:p-10">
            <h2 className="text-3xl font-medium text-balance md:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="mt-1 text-muted-foreground md:mt-6">{description}</p>
            )}
            {button && (
              <Pressable
                href={button.href}
                variant="outline"
                asButton
                className="mt-6"
              >
                {button.text}
                <DynamicIcon name="lucide/chevron-right" size={16} className="ml-2" />
              </Pressable>
            )}
            <ul className="mt-10 flex-wrap items-center gap-6 space-y-6 md:flex md:space-y-0">
              {checklistItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <DynamicIcon name="lucide/circle-check-big" size={16} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
