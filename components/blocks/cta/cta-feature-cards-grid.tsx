"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card } from "../../ui/card";

export interface CtaFeatureCard {
  /**
   * Icon name for the feature card
   */
  icon?: string;
  /**
   * Title of the feature
   */
  title?: string;
  /**
   * Description of the feature
   */
  description?: string;
}

export interface CtaFeatureCardsGridProps {
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
   * Array of feature cards to display
   */
  features?: CtaFeatureCard[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

const defaultFeatures: CtaFeatureCard[] = [
  {
    icon: "lucide/zap",
    title: "Lightning Fast",
    description: "Optimized for speed and performance.",
  },
  {
    icon: "lucide/shield",
    title: "Secure",
    description: "Enterprise-grade security built-in.",
  },
  {
    icon: "lucide/settings",
    title: "Customizable",
    description: "Fully customizable to your needs.",
  },
  {
    icon: "lucide/users",
    title: "Collaborative",
    description: "Built for teams of all sizes.",
  },
];

/**
 * CtaFeatureCardsGrid - A CTA section with heading, description, action buttons,
 * and a grid of feature cards with icons and descriptions. Ideal for showcasing
 * multiple benefits alongside a call to action.
 *
 * @example
 * ```tsx
 * <CtaFeatureCardsGrid
 *   heading="Everything you need"
 *   description="All the tools to build amazing products."
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   features={[
 *     { icon: "lucide/zap", title: "Fast", description: "Lightning fast performance" }
 *   ]}
 * />
 * ```
 */
export function CtaFeatureCardsGrid({
  heading = "Everything you need to build",
  description = "Build faster with our collection of pre-built components. Speed up your development and ship features in record time.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Learn More",
  secondaryButtonUrl = "#",
  features = defaultFeatures,
  className,
}: CtaFeatureCardsGridProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">{heading}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            {description}
          </p>
          <div className="mb-12 flex flex-col justify-center gap-2 sm:flex-row">
            <Pressable
              href={primaryButtonUrl}
              variant="default"
              size="lg"
              asButton
            >
              {primaryButtonText}
            </Pressable>
            <Pressable
              href={secondaryButtonUrl}
              variant="outline"
              size="lg"
              asButton
            >
              {secondaryButtonText}
            </Pressable>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 text-center">
              {feature.icon && (
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <DynamicIcon
                    name={feature.icon}
                    size={24}
                    className="text-primary"
                  />
                </div>
              )}
              <h3 className="mb-2 font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
