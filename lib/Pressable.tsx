"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "./utils";
import { useNavigation } from "./useNavigation";
import { buttonVariants } from "./button-variants";

type FallbackComponentType = "span" | "div" | "button";

interface PressableBaseProps {
  /**
   * Content inside the Pressable component
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * URL to navigate to (can be internal path, external URL, mailto:, tel:, or email/phone string)
   * Examples:
   * - "/about" - internal link
   * - "https://google.com" - external link
   * - "mailto:hello@example.com" or "hello@example.com" - email link
   * - "tel:+14322386131" or "(432) 238-6131" - phone link
   * - "https://mysite.com/blog" - will be converted to "/blog" if on mysite.com
   */
  href?: string;

  /**
   * Click handler
   */
  onClick?: React.MouseEventHandler<HTMLElement>;

  /**
   * The component type to render when there's no href or onClick
   * @default "span"
   */
  fallbackComponentType?: FallbackComponentType;

  /**
   * Explicit component type to render (overrides automatic selection)
   * Note: Internal links will ALWAYS render as <a> tags for SEO, even if componentType="button"
   */
  componentType?: "a" | "button" | FallbackComponentType;

  /**
   * Whether to render as a button styled link (uses ShadCN button styles)
   * When true, will apply button variant classes even when rendering an <a> tag
   * @default false
   */
  asButton?: boolean;

  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;

  /**
   * ARIA describedby for accessibility
   */
  "aria-describedby"?: string;

  /**
   * ID attribute
   */
  id?: string;

  /**
   * Data attributes
   */
  [key: `data-${string}`]: any;
}

// Combine Pressable props with button variants
export interface PressableProps
  extends PressableBaseProps,
    VariantProps<typeof buttonVariants> {}

// Type for link-specific props
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

// Type for button-specific props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * Universal link/button component with automatic URL detection and normalization.
 *
 * Features:
 * - Automatic link type detection (internal, external, mailto, tel)
 * - Phone number normalization (various formats to tel:)
 * - Email normalization to mailto:
 * - Internal URL normalization (full URLs to relative paths)
 * - Proper SEO attributes (always uses <a> for links, even when styled as buttons)
 * - ShadCN button variants and sizes
 * - Flexible layout support (icon+label or custom children)
 * - React Router-style internal navigation
 *
 * @example
 * Simple link
 * ```tsx
 * <Pressable href="/about">About Us</Pressable>
 * ```
 *
 * @example
 * Button-styled link with icon
 * ```tsx
 * <Pressable href="/quotes" variant="default" size="lg" asButton>
 *   <DynamicIcon name="lucide/calculator" size={20} />
 *   Get a Free Quote
 * </Pressable>
 * ```
 *
 * @example
 * External link (automatically gets target="_blank" and rel="noopener noreferrer")
 * ```tsx
 * <Pressable href="https://google.com">Visit Google</Pressable>
 * ```
 *
 * @example
 * Phone link (automatically normalized to tel: format)
 * ```tsx
 * <Pressable href="(432) 238-6131">Call Us</Pressable>
 * // Renders: <a href="tel:+14322386131">
 * ```
 *
 * @example
 * Custom layout with full children control
 * ```tsx
 * <Pressable href="/services" className="custom-card">
 *   <div className="card-header">
 *     <DynamicIcon name="service-icon" />
 *     <h3>Our Services</h3>
 *   </div>
 *   <p>Learn more about what we offer</p>
 * </Pressable>
 * ```
 *
 * @example
 * Button with onClick (no href)
 * ```tsx
 * <Pressable onClick={() => alert("Clicked")} variant="default" size="md" asButton>
 *   Click Me
 * </Pressable>
 * ```
 */
export const Pressable = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement,
  PressableProps & Partial<LinkProps> & Partial<ButtonProps>
>(
  (
    {
      children,
      className,
      href,
      onClick,
      variant,
      size,
      asButton = false,
      fallbackComponentType = "span",
      componentType,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      id,
      ...props
    },
    ref
  ) => {
    const navigation = useNavigation({ href, onClick });
    const {
      normalizedHref,
      target,
      rel,
      linkType,
      isInternal,
      isExternal,
      handleClick,
    } = navigation;

    // Determine what component to render
    const shouldRenderLink = normalizedHref && linkType !== "none";
    const shouldRenderButton = !shouldRenderLink && onClick;
    const shouldRenderFallback = !shouldRenderLink && !shouldRenderButton;

    // Force <a> tag for internal links for SEO (even if componentType="button")
    const effectiveComponentType = componentType || (
      shouldRenderLink
        ? "a"
        : shouldRenderButton
          ? "button"
          : fallbackComponentType
    );

    // Override for SEO: internal links must be <a> tags
    const finalComponentType = isInternal && shouldRenderLink
      ? "a"
      : effectiveComponentType;

    // Determine if we should apply button styles
    const shouldApplyButtonStyles = asButton || variant || size;

    // Build className
    const combinedClassName = cn(
      shouldApplyButtonStyles && buttonVariants({ variant, size }),
      className
    );

    const dataProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => key.startsWith("data-"))
    );
    const buttonDataAttributes = shouldApplyButtonStyles
      ? {
          "data-slot": "button",
          "data-variant": variant ?? "default",
          "data-size": size ?? "default",
        }
      : {};

    // Build common props
    const commonProps = {
      className: combinedClassName,
      onClick: handleClick,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedby,
      id,
      ...dataProps,
      ...buttonDataAttributes,
    };

    // Render link
    if (finalComponentType === "a" && shouldRenderLink) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={normalizedHref}
          target={target}
          rel={rel}
          {...commonProps}
          {...(props as LinkProps)}
        >
          {children}
        </a>
      );
    }

    // Render button
    if (finalComponentType === "button") {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type={(props as ButtonProps).type || "button"}
          {...commonProps}
          {...(props as ButtonProps)}
        >
          {children}
        </button>
      );
    }

    // Render fallback (span or div)
    if (finalComponentType === "div") {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          {...commonProps}
        >
          {children}
        </div>
      );
    }

    // Default to span
    return (
      <span
        ref={ref as React.Ref<HTMLSpanElement>}
        {...commonProps}
      >
        {children}
      </span>
    );
  }
);

Pressable.displayName = "Pressable";
