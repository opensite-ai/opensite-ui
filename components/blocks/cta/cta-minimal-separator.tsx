"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Separator } from "../../ui/separator";

export interface CtaMinimalSeparatorProps {
  /**
   * Main text content
   */
  text?: string;
  /**
   * Button text
   */
  buttonText?: string;
  /**
   * Button URL
   */
  buttonUrl?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * CtaMinimalSeparator - A minimal CTA section with centered text and a single
 * button flanked by horizontal separators. Ultra-clean design for subtle
 * conversion prompts.
 *
 * @example
 * ```tsx
 * <CtaMinimalSeparator
 *   text="Ready to get started?"
 *   buttonText="Sign Up"
 *   buttonUrl="/signup"
 * />
 * ```
 */
export function CtaMinimalSeparator({
  text = "Ready to get started? Sign up for a free trial today.",
  buttonText = "Get Started",
  buttonUrl = "#",
  className,
}: CtaMinimalSeparatorProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-8">
          <Separator className="w-full" />
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:gap-8">
            <p className="text-lg text-muted-foreground">{text}</p>
            <Pressable href={buttonUrl} variant="default" asButton>
              {buttonText}
            </Pressable>
          </div>
          <Separator className="w-full" />
        </div>
      </div>
    </section>
  );
}
