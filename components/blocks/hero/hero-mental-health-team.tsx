"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import type {
  ImageItem,
  OptixFlowConfig,
  TestimonialItem,
  SectionBackground,
  SectionSpacing,
  ActionConfig,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { BlockActions } from "@/components/ui/block-actions";

export interface HeroMentalHealthTeamProps {
  /**
   * Subtitle text above heading
   */
  subtitle?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of 2 small images (expects 2 images)
   */
  smallImages?: ImageItem[];
  /**
   * Custom slot for small images (overrides smallImage array)
   */
  smallImagesSlot?: React.ReactNode;
  /**
   * Testimonial configuration
   */
  testimonial?: TestimonialItem & { avatarSrc?: string };
  /**
   * Custom slot for testimonial (overrides testimonial prop)
   */
  testimonialSlot?: React.ReactNode;
  /**
   * Large feature image
   */
  featureImage?: ImageItem;
  /**
   * Custom slot for feature image (overrides featureImage prop)
   */
  featureImageSlot?: React.ReactNode; /**
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
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroMentalHealthTeam({
  sectionId = "hero-mental-health-team",
  description,
  descriptionClassName,
  actions,
  actionsSlot,
  actionsClassName,
  heading,
  smallImages,
  smallImagesSlot,
  testimonial,
  testimonialSlot,
  featureImage,
  featureImageSlot,
  background,
  pattern,
  patternOpacity,
  className,
  spacing = "hero",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headerClassName,
  headingClassName,
  gridClassName,
  optixFlowConfig,
}: HeroMentalHealthTeamProps): React.JSX.Element {
  const renderSmallImages = useMemo(() => {
    if (smallImagesSlot) return smallImagesSlot;
    if (!smallImages || smallImages.length === 0) return null;

    return (
      <>
        {smallImages[0] && (
          <div className="col-[1/2] row-[1/2] w-full">
            <div className="h-full max-h-77.5 w-full overflow-hidden rounded-2xl">
              <Img
                src={smallImages[0].src}
                alt={smallImages[0].alt}
                className={cn(
                  "block h-full w-full object-cover object-center",
                  smallImages[0].className,
                )}
                optixFlowConfig={optixFlowConfig}
                loading="eager"
              />
            </div>
          </div>
        )}
        {smallImages[1] && (
          <div className="col-[2/3] row-[1/2] w-full md:col-[2/3] md:row-[1/2]">
            <div className="h-full max-h-77.5 w-full overflow-hidden rounded-2xl">
              <Img
                src={smallImages[1].src}
                alt={smallImages[1].alt}
                className={cn(
                  "block h-full w-full object-cover object-center",
                  smallImages[1].className,
                )}
                optixFlowConfig={optixFlowConfig}
                loading="eager"
              />
            </div>
          </div>
        )}
      </>
    );
  }, [smallImagesSlot, smallImages, optixFlowConfig]);

  const renderTestimonial = useMemo(() => {
    if (testimonialSlot) return testimonialSlot;
    if (!testimonial) return null;

    const avatarSrc = testimonial.avatarSrc ?? testimonial.avatar?.src;
    return (
      <div className="col-[1/3] row-[3/4] w-full md:col-[1/3] md:row-[2/3]">
        <div
          className={cn(
            "flex h-full min-h-37.5 flex-col gap-3 overflow-hidden rounded-3xl p-5 px-5 md:flex-row md:items-center md:gap-7 md:py-8 bg-muted",
          )}
        >
          {avatarSrc && (
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl md:h-30 md:w-30">
              <Img
                src={avatarSrc}
                alt={testimonial.avatar?.alt ?? ""}
                className="h-full w-full object-cover object-center"
                optixFlowConfig={optixFlowConfig}
                loading="eager"
              />
            </div>
          )}
          <div className="flex h-full w-full flex-col justify-between gap-2 opacity-70">
            <p className="text-lg font-medium">
              &quot;{testimonial.quote}&quot;
            </p>
            <p className="text-sm">{testimonial.author}</p>
          </div>
        </div>
      </div>
    );
  }, [testimonialSlot, testimonial, optixFlowConfig]);

  const renderFeatureImage = useMemo(() => {
    if (featureImageSlot) return featureImageSlot;
    if (!featureImage) return null;

    return (
      <div className="col-[1/3] row-[2/3] h-100 w-full md:col-[3/5] md:row-[1/3] md:h-auto">
        <div className="h-full max-h-130.5 w-full overflow-hidden rounded-2xl">
          <Img
            src={featureImage.src}
            alt={featureImage.alt}
            className={cn(
              "block h-full w-full object-cover object-center",
              featureImage.className,
            )}
            optixFlowConfig={optixFlowConfig}
            loading="eager"
          />
        </div>
      </div>
    );
  }, [featureImageSlot, featureImage, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
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
            "mx-auto mb-16 flex max-w-[900px] flex-col items-center gap-6",
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
              heading
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "text-center text-lg md:text-xl text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              description
            ))}
          <BlockActions
            actions={actions}
            actionsSlot={actionsSlot}
            actionsClassName={actionsClassName}
          />
        </div>
        <div
          className={cn(
            "grid w-full max-w-332.5 auto-cols-auto grid-cols-2 grid-rows-[auto_auto] justify-center gap-5 md:grid-cols-[repeat(4,1fr)]",
            gridClassName,
          )}
        >
          {renderSmallImages}
          {renderTestimonial}
          {renderFeatureImage}
        </div>
      </div>
    </Section>
  );
}
