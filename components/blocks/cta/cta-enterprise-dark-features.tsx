"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface CtaEnterpriseDarkFeature {
  /**
   * Icon name for the feature
   */
  icon?: string;
  /**
   * Feature text
   */
  text?: string;
}

export interface CtaEnterpriseDarkFeaturesProps {
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
   * Array of features to display
   */
  features?: CtaEnterpriseDarkFeature[];
  /**
   * Decorative images
   */
  decorativeImages?: string[];
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

const defaultFeatures: CtaEnterpriseDarkFeature[] = [
  { icon: "lucide/shield-check", text: "Enterprise-grade security" },
  { icon: "lucide/users", text: "Unlimited team members" },
  { icon: "lucide/headphones", text: "24/7 dedicated support" },
  { icon: "lucide/server", text: "99.99% uptime SLA" },
];

const defaultDecorativeImages = [
  imagePlaceholders[10],
  imagePlaceholders[11],
  imagePlaceholders[12],
];

/**
 * CtaEnterpriseDarkFeatures - A dark-themed enterprise CTA with serif heading,
 * feature list with icons, and layered decorative images. Sophisticated design
 * for enterprise solutions.
 *
 * @example
 * ```tsx
 * <CtaEnterpriseDarkFeatures
 *   heading="Enterprise Solutions"
 *   description="Built for scale with enterprise-grade features."
 *   primaryButtonText="Contact Sales"
 *   primaryButtonUrl="/contact"
 *   features={[
 *     { icon: "lucide/shield-check", text: "Enterprise security" }
 *   ]}
 * />
 * ```
 */
export function CtaEnterpriseDarkFeatures({
  heading = "Enterprise Solutions",
  description = "Built for scale with enterprise-grade security, compliance, and support. Trusted by Fortune 500 companies worldwide.",
  primaryButtonText = "Contact Sales",
  primaryButtonUrl = "#",
  secondaryButtonText = "View Pricing",
  secondaryButtonUrl = "#",
  features = defaultFeatures,
  decorativeImages = defaultDecorativeImages,
  className,
  optixFlowConfig,
}: CtaEnterpriseDarkFeaturesProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-8 text-white md:p-12 lg:p-16">
          <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
                {heading}
              </h2>
              <p className="mb-8 text-lg text-slate-300">{description}</p>
              <ul className="mb-8 space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    {feature.icon && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                        <DynamicIcon
                          name={feature.icon}
                          size={16}
                          className="text-white"
                        />
                      </div>
                    )}
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Pressable
                  href={primaryButtonUrl}
                  variant="secondary"
                  size="lg"
                  asButton
                >
                  {primaryButtonText}
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="ml-2"
                  />
                </Pressable>
                <Pressable
                  href={secondaryButtonUrl}
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                  asButton
                >
                  {secondaryButtonText}
                </Pressable>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute -right-8 -top-8 h-64 w-48 rotate-6 overflow-hidden rounded-xl shadow-2xl">
                <Img
                  src={decorativeImages[0]}
                  alt=""
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <div className="absolute right-16 top-24 h-48 w-36 -rotate-3 overflow-hidden rounded-xl shadow-2xl">
                <Img
                  src={decorativeImages[1]}
                  alt=""
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <div className="absolute -bottom-4 right-8 h-56 w-44 rotate-12 overflow-hidden rounded-xl shadow-2xl">
                <Img
                  src={decorativeImages[2]}
                  alt=""
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
