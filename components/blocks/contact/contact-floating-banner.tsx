"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { type ActionConfig } from "../../../src/types/blocks";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ContactFloatingBannerProps {
  /**
   * Badge text before the main message
   */
  badgeText?: React.ReactNode;
  /**
   * Main message text
   */
  message?: React.ReactNode;
  /**
   * Button text
   */
  buttonText?: string;
  /**
   * Button icon name or ReactNode
   */
  buttonIcon?: React.ReactNode;
  /**
   * Button href
   */
  buttonHref?: string;
  /**
   * Array of action configurations for custom buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the banner container
   */
  bannerClassName?: string;
  /**
   * Additional CSS classes for the banner inner content
   */
  bannerContentClassName?: string;
  /**
   * Additional CSS classes for the message text
   */
  messageClassName?: string;
  /**
   * Additional CSS classes for the badge text
   */
  badgeClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

/**
 * ContactFloatingBanner - A fixed floating banner at the bottom of the page
 * with a promotional message and call-to-action button. Perfect for limited-time
 * offers, announcements, or important contact prompts.
 *
 * @example
 * ```tsx
 * <ContactFloatingBanner
 *   badgeText="Limited time offer"
 *   message="Get 50% off for your first month"
 *   buttonText="Get started"
 *   buttonIcon="lucide/arrow-right"
 *   buttonHref="/signup"
 * />
 * ```
 */
export function ContactFloatingBanner({
  badgeText,
  message,
  buttonText,
  buttonIcon,
  buttonHref,
  actions,
  actionsSlot,
  className,
  bannerClassName,
  bannerContentClassName,
  messageClassName,
  badgeClassName,
  background,
  spacing = "py-8 md:py-32",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
}: ContactFloatingBannerProps): React.JSX.Element {
  const actionsContent = React.useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (actions && actions.length > 0) {
      return actions.map((action, index) => {
        const {
          label,
          icon,
          iconAfter,
          children,
          className: actionClassName,
          ...pressableProps
        } = action;
        return (
          <Pressable
            key={index}
            asButton
            className={actionClassName}
            {...pressableProps}
          >
            {children ?? (
              <>
                {icon}
                {label}
                {iconAfter}
              </>
            )}
          </Pressable>
        );
      });
    }
    return null;
  }, [actionsSlot, actions]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      {/* Floating Banner */}
      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-0 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8",
          bannerClassName,
        )}
      >
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-x-6 bg-primary px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5",
            bannerContentClassName,
          )}
        >
          <p
            className={cn(
              "text-sm leading-6 text-primary-foreground",
              messageClassName,
            )}
          >
            <strong className={cn("font-semibold", badgeClassName)}>
              {badgeText}
            </strong>
            <svg
              viewBox="0 0 2 2"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
              aria-hidden="true"
            >
              <circle cx={1} cy={1} r={1} />
            </svg>
            {message}
          </p>
          {actionsSlot || actions ? (
            actionsContent
          ) : (
            <Pressable
              href={buttonHref}
              variant="secondary"
              size="sm"
              className="flex items-center gap-x-1"
              asButton
            >
              {buttonText}
              {typeof buttonIcon === "string" ? (
                <DynamicIcon name={buttonIcon} size={16} />
              ) : (
                buttonIcon
              )}
            </Pressable>
          )}
        </div>
      </div>
      {/* End of Floating Banner */}
    </Section>
  );
}
