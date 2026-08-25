import React from "react";
import { cn } from "../../lib/utils";
import { Container } from "./container";
import { PatternBackground } from "./pattern-background";
import type { SectionProps } from "../../src/types";

/**
 * Background style variants
 * Uses standard Tailwind/shadcn CSS variables for theming
 */

/**
 * On dark backgrounds the `link` button variant must follow the section's
 * text color (its default `--primary` fill can be invisible on dark/primary
 * fills). `currentColor` resolves to the section's inherited text color at the
 * button. Link is the ONLY variant that adapts this way — pill/filled variants
 * keep their own colors (see @page-speed/pressable button-variants).
 */
const darkLinkAdaptation =
  "[--button-link-fg:currentColor] [--button-link-hover-fg:currentColor]";

const backgroundStyles = {
  default: "bg-background text-foreground",
  white: "bg-white text-dark",
  gray: "bg-muted/30 text-foreground",
  dark: `bg-foreground text-background ${darkLinkAdaptation}`,
  transparent: "bg-transparent text-foreground",
  gradient: `bg-linear-to-br from-primary via-primary/90 to-foreground text-primary-foreground ${darkLinkAdaptation}`,
  primary: `bg-primary text-primary-foreground ${darkLinkAdaptation}`,
  secondary: `bg-secondary text-secondary-foreground ${darkLinkAdaptation}`,
  muted: "bg-muted text-muted-foreground",
};

/**
 * Vertical spacing variants
 */
const spacingStyles = {
  none: "py-0 md:py-0",
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
  xl: "py-24 md:py-40",
  hero: "pt-32 pb-12 md:pt-40 md:pb-40",
};

/**
 * Predefined spacing keys for type checking
 */
const predefinedSpacings = ["none", "sm", "md", "lg", "xl", "hero"] as const;

/**
 * Check if a spacing value is a predefined variant
 */
const isPredefinedSpacing = (
  spacing: string,
): spacing is keyof typeof spacingStyles =>
  predefinedSpacings.includes(spacing as (typeof predefinedSpacings)[number]);

/**
 * Section component for consistent page sections with optional title, subtitle, and background
 *
 * @example
 * ```tsx
 * <Section
 *   title="Our Services"
 *   subtitle="What we offer"
 *   background="gray"
 *   spacing="lg"
 * >
 *   <div>Section content goes here</div>
 * </Section>
 * ```
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      title,
      subtitle,
      children,
      className,
      style,
      background = "default",
      spacing = "lg",
      pattern,
      patternOpacity,
      patternClassName,
      containerClassName,
      containerMaxWidth = "xl",
      ...props
    },
    ref,
  ) => {
    // Smart default for patternOpacity:
    // - If patternOpacity is explicitly provided, use it
    // - If pattern is provided but patternOpacity is not, default to 1
    // - If no pattern is provided, default to 0
    const effectivePatternOpacity =
      patternOpacity !== undefined ? patternOpacity : pattern ? 1 : 0;

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative",
          pattern ? "overflow-hidden" : null,
          backgroundStyles[background],
          isPredefinedSpacing(spacing) ? spacingStyles[spacing] : spacing,
          className,
        )}
        style={style}
        {...props}
      >
        <PatternBackground
          pattern={pattern}
          opacity={effectivePatternOpacity}
          className={patternClassName}
        />
        <Container
          maxWidth={containerMaxWidth}
          className={cn("relative z-10", containerClassName)}
        >
          {(title || subtitle) && (
            <div className="mb-6 text-center md:mb-16">
              {subtitle && (
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-balance">
                  {subtitle}
                </p>
              )}
              {title && (
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  {title}
                </h2>
              )}
            </div>
          )}
          {children}
        </Container>
      </section>
    );
  },
);

Section.displayName = "Section";
