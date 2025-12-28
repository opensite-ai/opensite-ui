"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface CtaImageOverlayArrowProps {
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Button text
   */
  buttonText?: string;
  /**
   * Button URL
   */
  buttonUrl?: string;
  /**
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * CtaImageOverlayArrow - A CTA section with a background image, centered heading,
 * and a prominent button with arrow icon. Creates visual impact with minimal content.
 * Perfect for impactful hero-style CTAs.
 *
 * @example
 * ```tsx
 * <CtaImageOverlayArrow
 *   heading="Start Your Journey"
 *   buttonText="Get Started"
 *   buttonUrl="/signup"
 *   backgroundImage="/hero-bg.jpg"
 * />
 * ```
 */
export function CtaImageOverlayArrow({
  heading = "Start Your Journey Today",
  buttonText = "Get Started",
  buttonUrl = "#",
  backgroundImage = imagePlaceholders[7],
  className,
}: CtaImageOverlayArrowProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div
          className="flex h-[500px] items-center justify-center overflow-hidden rounded-2xl bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('${backgroundImage}')`,
          }}
        >
          <div className="flex flex-col items-center gap-8 p-4 text-center">
            <h2 className="max-w-3xl text-4xl font-bold text-primary-foreground md:text-6xl">
              {heading}
            </h2>
            <Pressable
              href={buttonUrl}
              variant="secondary"
              size="lg"
              className="group"
              asButton
            >
              {buttonText}
              <DynamicIcon
                name="lucide/arrow-right"
                size={20}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Pressable>
          </div>
        </div>
      </div>
    </section>
  );
}
