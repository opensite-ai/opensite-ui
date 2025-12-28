"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface CtaFeatureItem {
  /**
   * Icon name for the feature (e.g., "lucide/check")
   */
  icon?: string;
  /**
   * Feature text
   */
  text?: string;
}

export interface CtaFeatureListProps {
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Primary button text
   */
  primaryButtonText?: string;
  /**
   * Primary button URL
   */
  primaryButtonUrl?: string;
  /**
   * Secondary button text
   */
  secondaryButtonText?: string;
  /**
   * Secondary button URL
   */
  secondaryButtonUrl?: string;
  /**
   * Array of feature items to display
   */
  features?: CtaFeatureItem[];
  /**
   * Background image URL
   */
  backgroundImage?: string;
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

const defaultFeatures: CtaFeatureItem[] = [
  { icon: "lucide/check", text: "Easy Integration" },
  { icon: "lucide/check", text: "24/7 Support" },
  { icon: "lucide/check", text: "Customizable Design" },
  { icon: "lucide/check", text: "Scalable Performance" },
];

/**
 * CtaFeatureList - A CTA section featuring a heading, description, action buttons,
 * and a vertical list of features with icons. Includes a decorative background image.
 * Perfect for highlighting key selling points alongside a call to action.
 *
 * @example
 * ```tsx
 * <CtaFeatureList
 *   heading="Start Building Today"
 *   description="Get access to all features with our starter plan."
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   features={[
 *     { icon: "lucide/check", text: "Easy Integration" },
 *     { icon: "lucide/check", text: "24/7 Support" }
 *   ]}
 * />
 * ```
 */
export function CtaFeatureList({
  heading = "Call to Action",
  description = "Build faster with our collection of pre-built components. Speed up your development and ship features in record time.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Learn More",
  secondaryButtonUrl = "#",
  features = defaultFeatures,
  backgroundImage = imagePlaceholders[1],
  className,
  optixFlowConfig,
}: CtaFeatureListProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative rounded-xl border border-border bg-accent px-6 py-8 2xl:grid 2xl:grid-cols-2 2xl:px-14 2xl:py-10">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <Img
              src={backgroundImage}
              alt=""
              className="pointer-events-none absolute -top-1/4 right-0 hidden h-full w-1/2 object-cover opacity-90 2xl:block"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
              }}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
          <div className="relative z-10">
            <h3 className="mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {heading}
            </h3>
            <p className="mb-6 text-muted-foreground lg:text-lg">{description}</p>
            <ul className="mb-8 flex flex-col gap-2">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {feature.icon && (
                    <DynamicIcon
                      name={feature.icon}
                      size={20}
                      className="text-primary"
                    />
                  )}
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Pressable href={primaryButtonUrl} variant="default" asButton>
                {primaryButtonText}
              </Pressable>
              <Pressable href={secondaryButtonUrl} variant="outline" asButton>
                {secondaryButtonText}
              </Pressable>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
