"use client";

import React, { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { useOnClickOutside } from "@opensite/hooks/useOnClickOutside";
import type { AnimatedDialogProps } from "../../src/types";

/**
 * Size variants for the dialog
 */
const sizeStyles = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
  full: "max-w-7xl",
  compact: "max-w-[700px]",
};

/**
 * Animation transition configuration
 */
const dialogTransition = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1] as const,
};

/**
 * Animated dialog component with framer-motion animations
 *
 * @example
 * ```tsx
 * const [open, setOpen] = useState(false);
 *
 * <AnimatedDialog
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Dialog Title"
 *   description="Dialog description"
 * >
 *   <div>Dialog content</div>
 * </AnimatedDialog>
 * ```
 */
export function AnimatedDialog({
  open,
  onOpenChange,
  title,
  eyebrow,
  description,
  children,
  header,
  footer,
  size = "lg",
  className,
  contentClassName,
  featuredMediaHeader,
}: AnimatedDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const containerRef = useRef<HTMLDivElement>(null!);

  useOnClickOutside(containerRef, () => {
    if (open) {
      onOpenChange(false);
    }
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 h-screen overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: dialogTransition }}
            exit={{ opacity: 0, transition: dialogTransition }}
            className="fixed inset-0 h-full w-full bg-foreground/80 backdrop-blur-lg"
          />

          {/* Dialog container */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: dialogTransition,
            }}
            exit={{
              opacity: 0,
              y: 12,
              scale: 0.98,
              transition: dialogTransition,
            }}
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-describedby={description ? descriptionId : undefined}
            className={cn(
              "relative z-60 mx-auto my-12 flex w-[92vw] max-h-[85vh] flex-col overflow-hidden rounded-3xl bg-background shadow-2xl ring-1 ring-border/10",
              size === "compact" ? "p-0 md:my-20" : "p-6 md:my-20 md:p-12",
              sizeStyles[size],
              className,
            )}
          >
            {/* Featured Media Header (for compact size with media card style) */}
            {featuredMediaHeader ? (
              <div className="relative overflow-hidden">
                {featuredMediaHeader}
                {/* Close button positioned absolutely over featured media */}
                <button
                  type="button"
                  aria-label="Close dialog"
                  className="absolute right-4 top-4 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground/90 text-background backdrop-blur-sm transition hover:bg-foreground md:h-11 md:w-11"
                  onClick={() => onOpenChange(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : null}

            {/* Header section (with padding when not using featured media) */}
            <div
              className={cn(
                "flex items-start justify-between gap-8",
                size === "compact" && featuredMediaHeader ? "px-6 pt-6 md:px-8 md:pt-8" : "",
                !featuredMediaHeader ? "" : ""
              )}
            >
              {header ? (
                header
              ) : (
                <div className="space-y-3">
                  {eyebrow ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                      {eyebrow}
                    </p>
                  ) : null}
                  {title ? (
                    <h2
                      id={titleId}
                      className="text-2xl font-semibold text-foreground md:text-4xl"
                    >
                      {title}
                    </h2>
                  ) : null}
                  {description ? (
                    <p
                      id={descriptionId}
                      className="text-sm text-muted-foreground md:text-base"
                    >
                      {description}
                    </p>
                  ) : null}
                </div>
              )}

              {/* Close button (only show when not using featured media) */}
              {!featuredMediaHeader ? (
                <button
                  type="button"
                  aria-label="Close dialog"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition hover:bg-foreground/80 md:h-11 md:w-11"
                  onClick={() => onOpenChange(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  </svg>
                </button>
              ) : null}
            </div>

            {/* Content */}
            {children ? (
              <div
                className={cn(
                  "flex-1 min-h-0 overflow-y-auto",
                  size === "compact" && featuredMediaHeader
                    ? "mt-6 px-6 pb-6 md:mt-8 md:px-8 md:pb-8"
                    : "mt-8 pr-2 md:mt-10",
                  contentClassName,
                )}
              >
                {children}
              </div>
            ) : null}

            {/* Footer */}
            {footer ? (
              <div
                className={cn(
                  size === "compact" && featuredMediaHeader
                    ? "px-6 pb-6 md:px-8 md:pb-8"
                    : "mt-8 md:mt-10"
                )}
              >
                {footer}
              </div>
            ) : null}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
