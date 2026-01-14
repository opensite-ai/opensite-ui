import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import type { OptixFlowConfig } from "../../../src/types";

/**
 * Option card configuration for image comparison
 */
export interface OptionCard {
  /**
   * Image source URL
   */
  image: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Card title
   */
  title: string;
  /**
   * Card description
   */
  description: string;
  /**
   * CTA button text
   */
  ctaText?: string;
  /**
   * CTA button URL
   */
  ctaHref?: string;
}

export interface ComparisonImageCardsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * First option card configuration
   */
  optionA?: OptionCard;
  /**
   * Second option card configuration
   */
  optionB?: OptionCard;
  /**
   * Text displayed in the divider between cards
   */
  dividerText?: React.ReactNode;
  /**
   * Custom slot for rendering cards (overrides optionA/optionB)
   */
  cardsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the cards grid
   */
  cardsGridClassName?: string;
  /**
   * Additional CSS classes for individual cards
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the divider
   */
  dividerClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * ComparisonImageCards - Two image cards with "OR" divider
 *
 * Displays two large image cards side by side with a centered "OR" badge
 * divider. Each card features a full-bleed background image with a gradient
 * overlay at the bottom containing the title, description, and CTA button.
 * The layout creates a visual choice between two distinct options.
 *
 * Best for: Service tier selection, build vs buy decisions, path selection,
 * two-option comparisons with strong visual differentiation.
 */
export function ComparisonImageCards({
  heading = "Old vs New",
  description = "Compare the difference between the original and the new way of doing things.",
  optionA,
  optionB,
  dividerText = "OR",
  cardsSlot,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  cardsGridClassName,
  cardClassName,
  dividerClassName,
  optixFlowConfig,
}: ComparisonImageCardsProps): React.JSX.Element {
  const renderCard = (option: OptionCard) => (
    <div className={cn("relative h-full", cardClassName)}>
      <div className="relative aspect-4/5 min-h-[400px] overflow-hidden rounded-2xl bg-accent sm:aspect-[0.9] sm:min-h-[480px] sm:rounded-3xl md:min-h-[520px]">
        <Img
          src={option.image}
          alt={option.imageAlt || option.title}
          className="h-full w-full object-cover"
          optixFlowConfig={optixFlowConfig}
        />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-linear-to-t from-black via-black/50 to-transparent backdrop-blur-[2px] sm:h-[45%] md:h-[50%]" />
        <div className="absolute bottom-0 w-full space-y-4 p-4 sm:p-6 lg:p-8 xl:p-10">
          <h3 className="text-xl font-semibold text-white sm:text-2xl lg:text-3xl">
            {option.title}
          </h3>
          <p className="mt-2 text-sm text-white/80 sm:text-base">
            {option.description}
          </p>
          {option.ctaText && option.ctaHref && (
            <Pressable
              href={option.ctaHref}
              variant="outline"
              asButton
            >
              {option.ctaText}
            </Pressable>
          )}
        </div>
      </div>
    </div>
  );

  const renderCards = () => {
    if (cardsSlot) return cardsSlot;
    if (!optionA || !optionB) return null;

    return (
      <>
        {renderCard(optionA)}
        {renderCard(optionB)}
        <span className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background px-4 py-2 text-sm font-bold shadow-lg sm:px-6 sm:py-4 sm:text-base lg:px-8 lg:py-6", dividerClassName)}>
          {dividerText}
        </span>
      </>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="text-center">
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("text-3xl font-medium sm:text-4xl md:text-5xl lg:text-6xl", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mx-auto mt-4 max-w-3xl text-lg text-muted-foreground sm:mt-6 sm:text-xl", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>
        <div className={cn("relative mt-8 grid gap-6 sm:mt-10 md:mt-12 lg:grid-cols-2 lg:gap-10 xl:gap-14", cardsGridClassName)}>
          {renderCards()}
        </div>
      </div>
    </section>
  );
}
