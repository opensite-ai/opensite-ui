"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Card } from "../../ui/card";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface CtaHeroFeatureCard {
  /**
   * Icon name for the card
   */
  icon?: string;
  /**
   * Title of the card
   */
  title?: string;
  /**
   * Description of the card
   */
  description?: string;
  /**
   * Link URL for the card
   */
  href?: string;
}

export interface CtaHeroFeatureCardsProps {
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
   * Hero image URL
   */
  heroImage?: string;
  /**
   * Hero image alt text
   */
  heroImageAlt?: string;
  /**
   * Array of feature cards to display below
   */
  featureCards?: CtaHeroFeatureCard[];
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

const defaultFeatureCards: CtaHeroFeatureCard[] = [
  {
    icon: "lucide/zap",
    title: "Instant Setup",
    description: "Get started in minutes with our easy setup process.",
    href: "#",
  },
  {
    icon: "lucide/book-open",
    title: "Documentation",
    description: "Comprehensive guides and API references.",
    href: "#",
  },
];

/**
 * CtaHeroFeatureCards - A CTA section with a hero image and centered content,
 * plus feature cards below for instant setup and documentation. Great for
 * product launches.
 *
 * @example
 * ```tsx
 * <CtaHeroFeatureCards
 *   heading="Build Something Amazing"
 *   description="Start building with our powerful tools."
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   heroImage="/hero.jpg"
 *   featureCards={[
 *     { icon: "lucide/zap", title: "Fast", description: "Lightning fast", href: "/docs" }
 *   ]}
 * />
 * ```
 */
export function CtaHeroFeatureCards({
  heading = "Build Something Amazing",
  description = "Start building with our powerful tools and comprehensive documentation. Ship faster and scale with confidence.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Learn More",
  secondaryButtonUrl = "#",
  heroImage = imagePlaceholders[9],
  heroImageAlt = "Hero image",
  featureCards = defaultFeatureCards,
  className,
  optixFlowConfig,
}: CtaHeroFeatureCardsProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative mb-12 overflow-hidden rounded-2xl">
          <Img
            src={heroImage}
            alt={heroImageAlt}
            className="h-[400px] w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="max-w-2xl p-8 text-center text-white">
              <h2 className="mb-4 text-3xl font-bold md:text-5xl">{heading}</h2>
              <p className="mb-8 text-lg opacity-90">{description}</p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
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
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                  asButton
                >
                  {secondaryButtonText}
                </Pressable>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featureCards.map((card, index) => (
            <Pressable key={index} href={card.href}>
              <Card className="flex items-start gap-4 p-6 transition-colors hover:bg-accent">
                {card.icon && (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <DynamicIcon
                      name={card.icon}
                      size={24}
                      className="text-primary"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="mb-2 font-semibold">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </div>
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={20}
                  className="shrink-0 text-muted-foreground"
                />
              </Card>
            </Pressable>
          ))}
        </div>
      </div>
    </section>
  );
}
