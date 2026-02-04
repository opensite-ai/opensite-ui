"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { DynamicIcon } from "./dynamic-icon";

/**
 * Props for the NavbarMobileMenu component
 */
export interface NavbarMobileMenuProps {
  /** Whether the mobile menu is open */
  open: boolean;
  /** Callback to close the mobile menu */
  onClose: () => void;
  /** The content to render inside the mobile menu */
  children: React.ReactNode;
  /** Additional CSS classes for the container */
  className?: string;
  /** Additional CSS classes for the content wrapper */
  contentClassName?: string;
  /** Optional CSS classes for the close container wrapper */
  closeContainerClassName?: string;
  /** Optional CSS classes for the close icon */
  closeIconClassName?: string;
  /** Title for accessibility (screen readers only) */
  title?: string;
}

/**
 * NavbarMobileMenu - A mobile menu overlay that doesn't use portals
 *
 * This component renders a full-screen mobile menu overlay that stays within
 * its container context (unlike Sheet which uses portals). Perfect for navbar
 * mobile menus that need to work in iframe previews and contained environments.
 *
 * Key features:
 * - No portal rendering (stays in React tree)
 * - Fixed positioning relative to nearest positioned ancestor
 * - Smooth slide-in animation from top
 * - Accessible close button
 * - Scrollable content area
 */
export const NavbarMobileMenu = ({
  open,
  onClose,
  children,
  className,
  contentClassName,
  closeContainerClassName,
  closeIconClassName,
  title = "Mobile Navigation",
}: NavbarMobileMenuProps) => {
  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-998 flex flex-col bg-background",
        "animate-in slide-in-from-top duration-300",
        "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top data-[state=closed]:duration-300",
        className,
      )}
      data-state={open ? "open" : "closed"}
    >
      {/* Accessibility title (visually hidden) */}
      <div className="sr-only">
        <h2>{title}</h2>
      </div>

      {/* Close button */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 p-4 bg-background flex justify-end items-center z-10 w-screen",
          closeContainerClassName,
        )}
      >
        <button
          onClick={onClose}
          className={cn(
            "flex size-10 items-center justify-center rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none",
            closeIconClassName,
          )}
          aria-label="Close mobile menu"
        >
          <DynamicIcon name="lucide/x" className="size-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>

      {/* Scrollable content area */}
      <div
        className={cn(
          "h-full overflow-y-auto pt-20 pb-8 px-4 sm:px-6",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
};
