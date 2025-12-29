"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaSimpleCenteredProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content below the heading
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
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
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

const defaultActions: ActionConfig[] = [
  { label: "Get Started", href: "#", variant: "default", size: "lg" },
  { label: "Learn More", href: "#", variant: "outline", size: "lg" },
];

/**
 * CtaSimpleCentered - A minimal centered CTA section with heading, description,
 * and primary/secondary action buttons. Perfect for straightforward conversion-focused
 * sections.
 *
 * @example
 * ```tsx
 * <CtaSimpleCentered
 *   heading="Ready to get started?"
 *   description="Join thousands of satisfied customers today."
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "default" },
 *     { label: "Learn More", href: "/about", variant: "outline" }
 *   ]}
 * />
 * ```
 */
export function CtaSimpleCentered({
  heading = "Ready to get started?",
  description = "Join thousands of satisfied customers and start building amazing products today. No credit card required.",
  actions = defaultActions,
  actionsSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: CtaSimpleCenteredProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "flex flex-col justify-center gap-3 sm:flex-row",
          actionsClassName
        )}
      >
        {actions.map((action, index) => (
          <Pressable
            key={index}
            href={action.href}
            onClick={action.onClick}
            variant={action.variant}
            size={action.size}
            className={action.className}
            aria-label={action["aria-label"]}
            asButton
          >
            {action.icon}
            {action.children ?? action.label}
            {action.iconAfter}
            {index === 0 && !action.iconAfter && (
              <DynamicIcon
                name="lucide/arrow-right"
                size={16}
                className="ml-2"
              />
            )}
          </Pressable>
        ))}
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
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto max-w-2xl text-center", contentClassName)}>
          <h2
            className={cn(
              "mb-4 text-3xl font-bold md:text-4xl lg:text-5xl",
              headingClassName
            )}
          >
            {heading}
          </h2>
          <p
            className={cn(
              "mb-8 text-lg text-muted-foreground",
              descriptionClassName
            )}
          >
            {description}
          </p>
          {renderActions()}
        </div>
      </div>
    </Section>
  );
}
