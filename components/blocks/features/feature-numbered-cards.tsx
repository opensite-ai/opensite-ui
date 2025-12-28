"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface FeatureNumberedCardsItem {
  /**
   * Feature title
   */
  title: string;
  /**
   * Feature description
   */
  description: string;
  /**
   * Image source URL
   */
  image: string;
  /**
   * Checklist items
   */
  checklistItems?: string[];
}

export interface FeatureNumberedCardsProps {
  /**
   * Array of numbered feature cards
   */
  features?: FeatureNumberedCardsItem[];
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
 * Feature Numbered Cards - Stacked feature cards with numbered badges and
 * images, featuring checklists.
 *
 * Layout: Vertical stack of bordered cards with numbered badges and side images.
 * Key features: Numbered badges, checklist items, alternating image positions.
 * Best for: Payment features, security highlights, step-by-step processes.
 *
 * @example
 * ```tsx
 * <FeatureNumberedCards
 *   features={[
 *     {
 *       title: "Secure Payments",
 *       description: "Process payments securely with our gateway.",
 *       image: "/payments.jpg",
 *       checklistItems: ["SSL encryption", "Stripe integration"]
 *     },
 *   ]}
 * />
 * ```
 */
export function FeatureNumberedCards({
  features = [
    {
      title: "Secure Payments",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur modi et recusandae ducimus eligendi eveniet soluta reprehenderit nostrum expedita omnis.",
      image: blockBrandedIconsAndPlaceholders.placeholder1,
      checklistItems: [
        "Secure payment gateway integration with Stripe",
        "SSL encryption for secure transactions",
      ],
    },
    {
      title: "Automated Invoicing",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur modi et recusandae ducimus eligendi eveniet soluta reprehenderit nostrum expedita omnis.",
      image: blockBrandedIconsAndPlaceholders.placeholderDark1,
      checklistItems: ["Automated invoicing for easy billing"],
    },
  ],
  className,
  optixFlowConfig,
}: FeatureNumberedCardsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="space-y-10 rounded-lg border py-10 md:px-4">
          {features.map((feature, index) => (
            <div key={index} className="grid rounded-lg border md:grid-cols-2">
              <div className="flex flex-col px-6 py-8 lg:px-8 lg:py-12 xl:px-12 xl:py-20">
                <h3 className="mb-3 text-2xl font-medium sm:mb-5 md:text-3xl lg:text-4xl">
                  {feature.title}
                </h3>
                <div className="mb-8 text-sm text-muted-foreground sm:mb-10 md:text-base">
                  {feature.description}
                </div>
                {feature.checklistItems && feature.checklistItems.length > 0 && (
                  <ul className="mt-auto space-y-2 sm:space-y-3">
                    {feature.checklistItems.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex gap-x-3">
                        <DynamicIcon
                          name="lucide/check-circle"
                          size={16}
                          className="mt-0.5 shrink-0 sm:mt-1"
                        />
                        <p className="text-sm md:text-base">{item}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="relative order-first max-h-80 md:order-last md:max-h-[500px]">
                <Img
                  src={feature.image}
                  alt={feature.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
                <span className="absolute top-5 left-5 flex size-6 items-center justify-center rounded-sm bg-primary font-mono text-xs text-primary-foreground md:top-10 md:left-10">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
