"use client";

import * as React from "react";
import { useState } from "react";

import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

/**
 * Props for the BannerSurveyIncentive component
 */
export interface BannerSurveyIncentiveProps {
  /**
   * Main message title
   * @default "Help us improve!"
   */
  title?: string;
  /**
   * Description with incentive offer
   * @default "Take our 2-minute survey and get 20% off your next purchase."
   */
  description?: string;
  /**
   * CTA button text
   * @default "Take Survey"
   */
  buttonText?: string;
  /**
   * CTA button link
   * @default "#"
   */
  buttonLink?: string;
  /**
   * Callback when banner is dismissed
   */
  onDismiss?: () => void;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * BannerSurveyIncentive - A survey invitation banner with shopping bag icon and incentive offer.
 *
 * Features a clean background with border-bottom styling, containing a shopping bag icon,
 * message with incentive offer, action button, and dismiss button. The layout is responsive
 * with the icon hidden on mobile. Ideal for customer feedback collection, survey invitations,
 * and engagement campaigns with discount incentives.
 *
 * @example
 * ```tsx
 * <BannerSurveyIncentive
 *   title="Share your feedback!"
 *   description="Complete our quick survey and receive a 15% discount code."
 *   buttonText="Start Survey"
 *   buttonLink="/survey"
 *   onDismiss={() => console.log('Dismissed')}
 * />
 * ```
 */
export function BannerSurveyIncentive({
  title = "Help us improve!",
  description = "Take our 2-minute survey and get 20% off your next purchase.",
  buttonText = "Take Survey",
  buttonLink = "#",
  onDismiss,
  className,
}: BannerSurveyIncentiveProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn("bg-background border-b text-sm", className)}>
      <div className="flex md:items-center justify-between max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2">
          <DynamicIcon
            name="mynaui/shopping-bag"
            size={20}
            className="shrink-0 hidden md:block"
          />
          <div className="flex flex-col md:flex-row gap-1">
            <span className="font-medium">{title}</span>
            <span className="text-muted-foreground">{description}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Pressable href={buttonLink} size="sm" asButton>
            {buttonText}
          </Pressable>
          <Pressable
            onClick={handleDismiss}
            variant="outline"
            size="icon"
            asButton
            className="size-8"
          >
            <DynamicIcon name="mynaui/x" size={16} />
            <span className="sr-only">Dismiss banner</span>
          </Pressable>
        </div>
      </div>
    </div>
  );
}
