"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import type {ActionConfig, ImageItem, OptixFlowConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface TestimonialConfig {
  /**
   * Testimonial quote text
   */
  quote: string;
  /**
   * Author name
   */
  author: string;
  /**
   * Author avatar image
   */
  avatar?: ImageItem;
}

export interface HeroTherapyTestimonialGridProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of grid images (expects 4 images)
   */
  images?: ImageItem[];
  /**
   * Custom slot for images grid (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Testimonial configuration
   */
  testimonial?: TestimonialConfig;
  /**
   * Custom slot for testimonial (overrides testimonial prop)
   */
  testimonialSlot?: React.ReactNode;  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;

  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header area
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroTherapyTestimonialGrid({
  heading,
  description,
  actions,
  actionsSlot,
  images,
  imagesSlot,
  testimonial,
  testimonialSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  optixFlowConfig,
}: HeroTherapyTestimonialGridProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={actionClassName}
          {...pressableProps}
        >
          {children ?? (
            <>
              {icon}
              {label}
              {iconAfter}
            </>
          )}
        </Pressable>
      );
    });
  };

  const renderTestimonial = () => {
    if (testimonialSlot) return testimonialSlot;
    if (!testimonial) return null;

    return (
      <div className="col-[1/2] row-[3/4] md:col-[1/2] md:row-[2/3]">
        <div className="flex h-full min-h-37.5 flex-col gap-3 overflow-hidden rounded-3xl bg-muted p-5 px-5 md:flex-row md:items-center md:gap-7 md:py-8">
          {testimonial.avatar && (
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl md:h-30 md:w-30">
              <Img
                src={testimonial.avatar.src}
                alt={testimonial.avatar.alt}
                className={cn("h-full w-full object-cover object-center", testimonial.avatar.className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          )}
          <div className="flex h-full w-full flex-col justify-between gap-2">
            <p className="text-lg font-medium text-foreground">
              &quot;{testimonial.quote}&quot;
            </p>
            <p className="text-foreground">{testimonial.author}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderImagesGrid = () => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length < 3) return null;

    return (
      <>
        <div className="col-[1/2] row-[1/2] w-full">
          <div className="h-full max-h-100 w-full overflow-hidden rounded-2xl">
            <Img
              src={images[0].src}
              alt={images[0].alt}
              className={cn("block h-full w-full object-cover object-center", images[0].className)}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
        <div className="col-[1/2] row-[2/3] md:col-[2/3] md:row-[1/2]">
          <div className="h-full max-h-100 w-full overflow-hidden rounded-2xl">
            <Img
              src={images[1].src}
              alt={images[1].alt}
              className={cn("block h-full w-full object-cover object-center", images[1].className)}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
        {renderTestimonial()}
        <div className="row-[4/5] md:col-[2/3] md:row-[2/3]">
          <div className="h-full w-full overflow-hidden rounded-2xl bg-muted">
            <Img
              src={images[2].src}
              alt={images[2].alt}
              className={cn("h-full w-full object-cover object-center", images[2].className)}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <Section
      className={cn("bg-background py-12 font-sans md:py-20", className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto mb-16 flex max-w-[900px] flex-col items-center gap-6", headerClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("text-center text-4xl leading-tight font-medium text-foreground sm:text-5xl md:text-6xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <h1 className={cn("text-center text-4xl leading-tight font-medium text-foreground sm:text-5xl md:text-6xl", headingClassName)}>
                {heading}
              </h1>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("text-center text-lg text-muted-foreground md:text-xl", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {renderActions()}
        </div>
        <div className="grid w-full auto-cols-auto grid-cols-1 grid-rows-[auto_auto_auto] justify-center gap-5 md:grid-cols-2">
          {renderImagesGrid()}
        </div>
      </div>
    </Section>
  );
}
