"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaBackgroundIconBadgeProps {
  /**
   * Icon name for the badge (e.g., "lucide/zap")
   */
  badgeIconName?: string;
  /**
   * Custom badge icon element
   */
  badgeIcon?: React.ReactNode;
  /**
   * Badge text next to the icon
   */
  badgeText?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the card wrapper
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

/**
 * CtaBackgroundIconBadge - A full-width CTA with background image, icon badge,
 * heading, and action buttons. The icon badge adds visual emphasis to the key message.
 * Perfect for impactful hero-style CTAs.
 *
 * @example
 * ```tsx
 * <CtaBackgroundIconBadge
 *   badgeIconName="lucide/zap"
 *   badgeText="Faster"
 *   heading="Build your website faster"
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "secondary", size: "lg" },
 *     { label: "Learn More", href: "/learn", variant: "outline", size: "lg" }
 *   ]}
 *   backgroundImage="/hero-bg.jpg"
 * />
 * ```
 */
export function CtaBackgroundIconBadge({
  badgeIconName,
  badgeIcon,
  badgeText,
  heading,
  actions,
  actionsSlot,
  backgroundImage = imagePlaceholders[5],
  className,
  containerClassName,
  cardClassName,
  contentClassName,
  badgeClassName,
  headingClassName,
  actionsClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: CtaBackgroundIconBadgeProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "flex flex-col justify-center gap-2 sm:flex-row",
          actionsClassName,
        )}
      >
        {actions.map((action, index) => {
          const isOutlineOnDark =
            action.variant === "outline" && !action.className;
          return (
            <Pressable
              key={index}
              href={action.href}
              onClick={action.onClick}
              variant={action.variant}
              size={action.size}
              className={cn(
                isOutlineOnDark &&
                  "border-0 bg-background/20 backdrop-blur-sm hover:bg-background/30 hover:text-primary-foreground",
                action.className,
              )}
              aria-label={action["aria-label"]}
              asButton
            >
              {action.icon}
              {action.children ?? action.label}
              {action.iconAfter}
            </Pressable>
          );
        })}
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div
        className={cn(
          "flex h-[620px] items-center justify-center bg-cover bg-center",
          cardClassName,
        )}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)), url('${backgroundImage}')`,
        }}
      >
        <div className={cn("container", containerClassName)}>
          <div
            className={cn(
              "flex flex-col gap-8 p-4 text-center text-primary-foreground",
              contentClassName,
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center gap-2 text-2xl font-medium",
                badgeClassName,
              )}
            >
              {badgeIcon ??
                (badgeIconName && (
                  <DynamicIcon
                    name={badgeIconName}
                    size={28}
                    className="h-full"
                  />
                ))}
              {badgeText}
            </div>
            <h2 className={cn("text-5xl font-bold", headingClassName)}>
              {heading}
            </h2>
            {renderActions()}
          </div>
        </div>
      </div>
    </Section>
  );
}
