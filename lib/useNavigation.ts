"use client";

import * as React from "react";

export type LinkType = "internal" | "external" | "mailto" | "tel" | "unknown" | "none";

export interface UseNavigationArgs {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export interface UseNavigationReturn {
  linkType: LinkType;
  normalizedHref: string | undefined;
  target: "_blank" | "_self" | undefined;
  rel: string | undefined;
  isExternal: boolean;
  isInternal: boolean;
  shouldUseRouter: boolean;
  handleClick: React.MouseEventHandler<HTMLElement>;
}

/**
 * Normalizes phone numbers to tel: format
 * Handles formats like:
 * - "+14322386131"
 * - "(432) 238-6131"
 * - "512-232-2212x123"
 * - "tel:+14322386131"
 */
function normalizePhoneNumber(input: string): string {
  const trimmed = input.trim();

  // Already has tel: prefix
  if (trimmed.toLowerCase().startsWith("tel:")) {
    return trimmed;
  }

  // Extract digits and extension
  const match = trimmed.match(/^[\s\+\-\(\)]*(\d[\d\s\-\(\)\.]*\d)[\s\-]*(x|ext\.?|extension)?[\s\-]*(\d+)?$/i);

  if (match) {
    // Clean the main number (remove spaces, dashes, dots, parentheses)
    const mainNumber = match[1].replace(/[\s\-\(\)\.]/g, "");
    const extension = match[3];

    // Add + prefix if not already there and number looks international (10+ digits)
    const normalized = mainNumber.length >= 10 && !trimmed.startsWith("+")
      ? `+${mainNumber}`
      : mainNumber;

    // Add extension if present
    const withExtension = extension ? `${normalized};ext=${extension}` : normalized;

    return `tel:${withExtension}`;
  }

  // Fallback: just clean and prefix
  const cleaned = trimmed.replace(/[\s\-\(\)\.]/g, "");
  return `tel:${cleaned}`;
}

/**
 * Normalizes email addresses to mailto: format
 */
function normalizeEmail(input: string): string {
  const trimmed = input.trim();

  // Already has mailto: prefix
  if (trimmed.toLowerCase().startsWith("mailto:")) {
    return trimmed;
  }

  return `mailto:${trimmed}`;
}

/**
 * Detects if a string is an email address
 */
function isEmail(input: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input.trim());
}

/**
 * Detects if a string is a phone number
 */
function isPhoneNumber(input: string): boolean {
  const trimmed = input.trim();

  // Already has tel: prefix
  if (trimmed.toLowerCase().startsWith("tel:")) {
    return true;
  }

  // Match various phone formats
  const phoneRegex = /^[\s\+\-\(\)]*\d[\d\s\-\(\)\.]*\d[\s\-]*(x|ext\.?|extension)?[\s\-]*\d*$/i;
  return phoneRegex.test(trimmed);
}

/**
 * Detects if a URL is internal to the current site
 * Handles cases like:
 * - "/blog-123"
 * - "https://jordansite.com/blog-123"
 * - "https://www.jordansite.com/blog-123"
 */
function isInternalUrl(href: string): boolean {
  if (typeof window === "undefined") {
    // SSR fallback: assume relative paths are internal
    return href.startsWith("/") && !href.startsWith("//");
  }

  const trimmed = href.trim();

  // Relative paths are internal
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return true;
  }

  // Check if full URL matches current origin
  try {
    const url = new URL(trimmed, window.location.href);
    const currentOrigin = window.location.origin;

    // Normalize both origins (remove www. for comparison)
    const normalizeOrigin = (origin: string) =>
      origin.replace(/^(https?:\/\/)(www\.)?/, "$1");

    return normalizeOrigin(url.origin) === normalizeOrigin(currentOrigin);
  } catch {
    return false;
  }
}

/**
 * Converts a full URL to a relative path if it's internal
 */
function toRelativePath(href: string): string {
  if (typeof window === "undefined") {
    return href;
  }

  const trimmed = href.trim();

  // Already relative
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed, window.location.href);
    const currentOrigin = window.location.origin;

    // Normalize both origins for comparison
    const normalizeOrigin = (origin: string) =>
      origin.replace(/^(https?:\/\/)(www\.)?/, "$1");

    if (normalizeOrigin(url.origin) === normalizeOrigin(currentOrigin)) {
      // Return pathname + search + hash
      return url.pathname + url.search + url.hash;
    }
  } catch {
    // Invalid URL, return as-is
  }

  return trimmed;
}

/**
 * Hook for handling navigation with automatic link type detection,
 * URL normalization, and proper attributes for SEO and accessibility.
 *
 * Features:
 * - Detects link types: internal, external, mailto, tel
 * - Normalizes phone numbers (various formats to tel:)
 * - Normalizes email addresses to mailto:
 * - Converts full URLs matching current origin to relative paths
 * - Determines proper target and rel attributes
 * - Handles React Router-style internal navigation
 *
 * @example
 * ```tsx
 * const nav = useNavigation({ href: "/about" });
 * // nav.linkType === "internal"
 * // nav.normalizedHref === "/about"
 * // nav.target === "_self"
 *
 * const nav2 = useNavigation({ href: "(432) 238-6131" });
 * // nav2.linkType === "tel"
 * // nav2.normalizedHref === "tel:+14322386131"
 *
 * const nav3 = useNavigation({ href: "https://google.com" });
 * // nav3.linkType === "external"
 * // nav3.target === "_blank"
 * // nav3.rel === "noopener noreferrer"
 * ```
 */
export function useNavigation({
  href,
  onClick
}: UseNavigationArgs = {}): UseNavigationReturn {
  const linkType = React.useMemo((): LinkType => {
    if (!href || href.trim() === "") {
      return onClick ? "none" : "none";
    }

    const trimmed = href.trim();

    // Check for mailto
    if (trimmed.toLowerCase().startsWith("mailto:") || isEmail(trimmed)) {
      return "mailto";
    }

    // Check for tel
    if (trimmed.toLowerCase().startsWith("tel:") || isPhoneNumber(trimmed)) {
      return "tel";
    }

    // Check for internal vs external
    if (isInternalUrl(trimmed)) {
      return "internal";
    }

    // Check if it's a valid URL
    try {
      new URL(trimmed, typeof window !== "undefined" ? window.location.href : "http://localhost");
      return "external";
    } catch {
      // Not a valid URL, treat as internal path
      return "internal";
    }
  }, [href, onClick]);

  const normalizedHref = React.useMemo((): string | undefined => {
    if (!href || href.trim() === "") {
      return undefined;
    }

    const trimmed = href.trim();

    switch (linkType) {
      case "tel":
        return normalizePhoneNumber(trimmed);
      case "mailto":
        return normalizeEmail(trimmed);
      case "internal":
        return toRelativePath(trimmed);
      case "external":
        return trimmed;
      default:
        return trimmed;
    }
  }, [href, linkType]);

  const target = React.useMemo((): "_blank" | "_self" | undefined => {
    switch (linkType) {
      case "external":
        return "_blank";
      case "internal":
        return "_self";
      case "mailto":
      case "tel":
        // Let browser handle default behavior
        return undefined;
      default:
        return undefined;
    }
  }, [linkType]);

  const rel = React.useMemo((): string | undefined => {
    if (linkType === "external") {
      return "noopener noreferrer";
    }
    return undefined;
  }, [linkType]);

  const isExternal = linkType === "external";
  const isInternal = linkType === "internal";
  const shouldUseRouter = isInternal && typeof normalizedHref === "string" && normalizedHref.startsWith("/");

  const handleClick = React.useCallback<React.MouseEventHandler<HTMLElement>>(
    (event) => {
      // Call user's onClick first
      if (onClick) {
        try {
          onClick(event);
        } catch (error) {
          console.error("Error in user onClick handler:", error);
        }
      }

      // If event was prevented, don't do anything else
      if (event.defaultPrevented) {
        return;
      }

      // Only handle internal navigation for left-clicks without modifiers
      if (
        shouldUseRouter &&
        normalizedHref &&
        event.button === 0 && // left-click only
        !event.metaKey &&
        !event.altKey &&
        !event.ctrlKey &&
        !event.shiftKey
      ) {
        // Check if there's a navigation handler (from opensite-blocks or similar)
        if (typeof window !== "undefined") {
          const handler = (window as any).__opensiteNavigationHandler;
          if (typeof handler === "function") {
            try {
              const handled = handler(normalizedHref, event.nativeEvent || event);
              if (handled !== false) {
                event.preventDefault();
              }
            } catch (error) {
              console.error("Error in navigation handler:", error);
            }
          }
        }
      }
    },
    [onClick, shouldUseRouter, normalizedHref]
  );

  return {
    linkType,
    normalizedHref,
    target,
    rel,
    isExternal,
    isInternal,
    shouldUseRouter,
    handleClick,
  };
}
