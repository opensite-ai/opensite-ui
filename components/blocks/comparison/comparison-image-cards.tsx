import React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";

interface OptionCard {
  image: string;
  imageAlt?: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface ComparisonImageCardsProps {
  className?: string;
  title?: string;
  subtitle?: string;
  optionA?: OptionCard;
  optionB?: OptionCard;
  dividerText?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultOptionA: OptionCard = {
  image: "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
  imageAlt: "Option 1",
  title: "Option 1",
  description: "Let our expert team handle everything for you. We'll manage the entire development process from start to finish, delivering a polished solution tailored to your exact specifications.",
  ctaText: "Get Started",
  ctaHref: "#",
};

const defaultOptionB: OptionCard = {
  image: "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
  imageAlt: "Option 2",
  title: "Option 2",
  description: "Take control of your project with our comprehensive self-service platform. Access powerful tools and resources to build your solution at your own pace with expert guidance when needed.",
  ctaText: "Get Started",
  ctaHref: "#",
};

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
  className,
  title = "Old vs New",
  subtitle = "Compare the difference between the original and the new way of doing things.",
  optionA = defaultOptionA,
  optionB = defaultOptionB,
  dividerText = "OR",
  optixFlowConfig,
}: ComparisonImageCardsProps) {
  const renderCard = (option: OptionCard) => (
    <div className="relative h-full">
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

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-medium sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground sm:mt-6 sm:text-xl">
            {subtitle}
          </p>
        </div>
        <div className="relative mt-8 grid gap-6 sm:mt-10 md:mt-12 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          {renderCard(optionA)}
          {renderCard(optionB)}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background px-4 py-2 text-sm font-bold shadow-lg sm:px-6 sm:py-4 sm:text-base lg:px-8 lg:py-6">
            {dividerText}
          </span>
        </div>
      </div>
    </section>
  );
}
