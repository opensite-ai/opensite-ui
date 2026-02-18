"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { BlockActions } from "@/components/ui/block-actions";

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
  testimonialSlot?: React.ReactNode; /**
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
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
}

export function HeroTherapyTestimonialGrid({
  heading,
  description,
  actions,
  actionsSlot,
  actionsClassName,
  images,
  imagesSlot,
  testimonial,
  testimonialSlot,
  background,
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headerClassName,
  headingClassName,
  descriptionClassName,
  optixFlowConfig,
}: HeroTherapyTestimonialGridProps): React.JSX.Element {
  const renderTestimonial = useMemo(() => {
    if (testimonialSlot) return testimonialSlot;
    if (!testimonial) return null;

    return (
      <div className="col-[1/2] row-[3/4] md:col-[1/2] md:row-[2/3]">
        <div className="flex h-full min-h-37.5 flex-col gap-3 overflow-hidden rounded-3xl bg-card p-6 md:p-8 md:flex-row md:items-start md:gap-7">
          {testimonial.avatar && (
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl md:h-30 md:w-30">
              <Img
                src={testimonial.avatar.src}
                alt={testimonial.avatar.alt}
                className={cn(
                  "h-full w-full object-cover object-center",
                  testimonial.avatar.className,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          )}
          <div className="flex h-full w-full flex-col gap-2 justify-start">
            <p className="text-lg font-medium ">
              &quot;{testimonial.quote}&quot;
            </p>
            <p className="">{testimonial.author}</p>
          </div>
        </div>
      </div>
    );
  }, [testimonialSlot, testimonial, optixFlowConfig]);

  const renderImagesGrid = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length < 3) return null;

    return (
      <>
        <div className="col-[1/2] row-[1/2] w-full">
          <div className="h-full max-h-100 w-full overflow-hidden rounded-2xl">
            <Img
              src={images[0].src}
              alt={images[0].alt}
              className={cn(
                "block h-full w-full object-cover object-center",
                images[0].className,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
        <div className="col-[1/2] row-[2/3] md:col-[2/3] md:row-[1/2]">
          <div className="h-full max-h-100 w-full overflow-hidden rounded-2xl">
            <Img
              src={images[1].src}
              alt={images[1].alt}
              className={cn(
                "block h-full w-full object-cover object-center",
                images[1].className,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
        {renderTestimonial}
        <div className="row-[4/5] md:col-[2/3] md:row-[2/3]">
          <div className="h-full w-full overflow-hidden rounded-2xl bg-card">
            <Img
              src={images[2].src}
              alt={images[2].alt}
              className={cn(
                "h-full w-full object-cover object-center",
                images[2].className,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </>
    );
  }, [imagesSlot, images, optixFlowConfig, renderTestimonial]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="pt-10 md:pt-0">
        <div
          className={cn(
            "mx-auto mb-8 md:mb-12 flex max-w-[900px] flex-col items-center gap-3",
            headerClassName,
          )}
        >
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-center text-4xl leading-tight font-medium sm:text-5xl md:text-6xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              <h1
                className={cn(
                  "text-center text-4xl leading-tight font-medium sm:text-5xl md:text-6xl text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "text-center text-lg md:text-xl",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={actionsClassName}
          />
        </div>
        <div className="grid w-full auto-cols-auto grid-cols-1 grid-rows-[auto_auto_auto] justify-center gap-5 md:grid-cols-2">
          {renderImagesGrid}
        </div>
      </div>
    </Section>
  );
}
