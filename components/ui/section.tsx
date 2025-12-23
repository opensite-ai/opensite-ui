import React from "react";
import { cn } from "../../lib/utils";
import { Container } from "./container";
import type { SectionProps } from "../../src/types";

/**
 * Background style variants
 * Uses standard Tailwind/shadcn CSS variables for theming
 */
const backgroundStyles = {
  white: "bg-background text-foreground",
  gray: "bg-muted/30 text-foreground",
  dark: "bg-foreground text-background",
  gradient: "bg-gradient-to-br from-primary via-primary/90 to-foreground text-primary-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  muted: "bg-muted text-muted-foreground",
};

/**
 * Vertical spacing variants
 */
const spacingStyles = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
  xl: "py-24 md:py-40",
};

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
      background = "white",
      spacing = "lg",
      ...props
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          backgroundStyles[background],
          spacingStyles[spacing],
          className
        )}
        style={style}
        {...props}
      >
        <Container>
          {(title || subtitle) && (
            <div className="text-center mb-12 md:mb-16">
              {subtitle && (
                <p className="text-sm font-semibold uppercase tracking-wider mb-2 text-primary">
                  {subtitle}
                </p>
              )}
              {title && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  {title}
                </h2>
              )}
            </div>
          )}
          {children}
        </Container>
      </section>
    );
  }
);

Section.displayName = "Section";
