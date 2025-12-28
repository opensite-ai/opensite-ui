"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { videoPlaceholders } from "../../../lib/mediaPlaceholders";

export interface CtaVideoBackgroundHeroProps {
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Primary button text
   */
  primaryButtonText?: string;
  /**
   * Primary button URL
   */
  primaryButtonUrl?: string;
  /**
   * Secondary button text (for video modal)
   */
  secondaryButtonText?: string;
  /**
   * Video URL for the modal
   */
  modalVideoUrl?: string;
  /**
   * Background video URL
   */
  backgroundVideoUrl?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

/**
 * CtaVideoBackgroundHero - A hero CTA with looping video background, gradient
 * overlay, heading, description, and buttons including a video modal trigger.
 * High-impact visual design.
 *
 * @example
 * ```tsx
 * <CtaVideoBackgroundHero
 *   heading="Experience the Future"
 *   description="See how our platform transforms your workflow."
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   secondaryButtonText="Watch Demo"
 *   backgroundVideoUrl="/background.mp4"
 * />
 * ```
 */
export function CtaVideoBackgroundHero({
  heading = "Experience the Future",
  description = "See how our platform transforms your workflow. Join thousands of teams already building amazing products.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Watch Demo",
  modalVideoUrl = videoPlaceholders[0],
  backgroundVideoUrl = videoPlaceholders[1],
  className,
}: CtaVideoBackgroundHeroProps): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative h-[600px] overflow-hidden rounded-2xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={backgroundVideoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="max-w-2xl p-8 text-center text-white">
              <h2 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
                {heading}
              </h2>
              <p className="mb-8 text-lg opacity-90 md:text-xl">{description}</p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Pressable
                  href={primaryButtonUrl}
                  variant="secondary"
                  size="lg"
                  asButton
                >
                  {primaryButtonText}
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="ml-2"
                  />
                </Pressable>
                <Pressable
                  href="#"
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                  asButton
                  onClick={(e) => {
                    e.preventDefault();
                    setIsModalOpen(true);
                  }}
                >
                  <DynamicIcon name="lucide/play" size={16} className="mr-2" />
                  {secondaryButtonText}
                </Pressable>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -right-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg transition-colors hover:bg-gray-100"
            >
              <DynamicIcon name="lucide/x" size={20} />
            </button>
            <video
              controls
              autoPlay
              className="w-full rounded-lg"
            >
              <source src={modalVideoUrl} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
