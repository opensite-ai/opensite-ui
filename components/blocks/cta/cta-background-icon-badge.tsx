"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface CtaBackgroundIconBadgeProps {
  /**
   * Icon name for the badge (e.g., "lucide/zap")
   */
  badgeIcon?: string;
  /**
   * Badge text next to the icon
   */
  badgeText?: string;
  /**
   * Main heading text
   */
  heading?: string;
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
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * CtaBackgroundIconBadge - A full-width CTA with background image, icon badge,
 * heading, and action buttons. The icon badge adds visual emphasis to the key message.
 * Perfect for impactful hero-style CTAs.
 *
 * @example
 * ```tsx
 * <CtaBackgroundIconBadge
 *   badgeIcon="lucide/zap"
 *   badgeText="Faster"
 *   heading="Build your website faster"
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   backgroundImage="/hero-bg.jpg"
 * />
 * ```
 */
export function CtaBackgroundIconBadge({
  badgeIcon = "lucide/zap",
  badgeText = "Faster",
  heading = "Build your website faster.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Learn More",
  secondaryButtonUrl = "#",
  backgroundImage = imagePlaceholders[5],
  className,
}: CtaBackgroundIconBadgeProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div
        className="flex h-[620px] items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)), url('${backgroundImage}')`,
        }}
      >
        <div className="container">
          <div className="flex flex-col gap-8 p-4 text-center text-primary-foreground">
            <div className="flex items-center justify-center gap-2 text-2xl font-medium">
              <DynamicIcon name={badgeIcon} size={28} className="h-full" />
              {badgeText}
            </div>
            <h2 className="text-5xl font-bold">{heading}</h2>
            <div className="flex flex-col justify-center gap-2 sm:flex-row">
              <Pressable
                href={primaryButtonUrl}
                variant="secondary"
                size="lg"
                asButton
              >
                {primaryButtonText}
              </Pressable>
              <Pressable
                href={secondaryButtonUrl}
                variant="outline"
                size="lg"
                className="border-0 bg-background/20 backdrop-blur-sm hover:bg-background/30 hover:text-primary-foreground"
                asButton
              >
                {secondaryButtonText}
              </Pressable>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
