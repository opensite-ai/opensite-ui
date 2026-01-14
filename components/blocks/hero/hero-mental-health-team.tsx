"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ImageItem, OptixFlowConfig, TestimonialItem } from "../../../src/types";

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
   * Array of team member images (expects 2 images)
   */
  teamImages?: ImageItem[];
  /**
   * Custom slot for team images (overrides teamImages array)
   */
  teamImagesSlot?: React.ReactNode;
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
  featureImageSlot?: React.ReactNode;
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
}

export function HeroMentalHealthTeam({
  subtitle,
  heading,
  teamImages,
  teamImagesSlot,
  testimonial,
  testimonialSlot,
  featureImage,
  featureImageSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  gridClassName,
  optixFlowConfig,
}: HeroMentalHealthTeamProps): React.JSX.Element {
  const renderTeamImages = () => {
    if (teamImagesSlot) return teamImagesSlot;
    if (!teamImages || teamImages.length === 0) return null;

    return (
      <>
        {teamImages[0] && (
          <div className="col-[1/2] row-[1/2] w-full">
            <div className="h-full max-h-77.5 w-full overflow-hidden rounded-2xl">
              <Img
                src={teamImages[0].src}
                alt={teamImages[0].alt}
                className={cn("block h-full w-full object-cover object-center", teamImages[0].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        )}
        {teamImages[1] && (
          <div className="col-[2/3] row-[1/2] w-full md:col-[2/3] md:row-[1/2]">
            <div className="h-full max-h-77.5 w-full overflow-hidden rounded-2xl">
              <Img
                src={teamImages[1].src}
                alt={teamImages[1].alt}
                className={cn("block h-full w-full object-cover object-center", teamImages[1].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </div>
        )}
      </>
    );
  };

  const renderTestimonial = () => {
    if (testimonialSlot) return testimonialSlot;
    if (!testimonial) return null;

    const avatarSrc = testimonial.avatarSrc ?? (testimonial.avatar?.src);
    return (
      <div className="col-[1/3] row-[3/4] w-full md:col-[1/3] md:row-[2/3]">
        <div className="flex h-full min-h-37.5 flex-col gap-3 overflow-hidden rounded-3xl bg-muted p-5 px-5 md:flex-row md:items-center md:gap-7 md:py-8">
          {avatarSrc && (
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl md:h-30 md:w-30">
              <Img
                src={avatarSrc}
                alt={testimonial.avatar?.alt ?? ""}
                className="h-full w-full object-cover object-center"
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

  const renderFeatureImage = () => {
    if (featureImageSlot) return featureImageSlot;
    if (!featureImage) return null;

    return (
      <div className="col-[1/3] row-[2/3] h-100 w-full md:col-[3/5] md:row-[1/3] md:h-auto">
        <div className="h-full max-h-130.5 w-full overflow-hidden rounded-2xl">
          <Img
            src={featureImage.src}
            alt={featureImage.alt}
            className={cn("block h-full w-full object-cover object-center", featureImage.className)}
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    );
  };

  return (
    <section
      className={cn("dark bg-background py-12 font-sans md:py-20", className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto mb-24 flex max-w-[900px] flex-col items-center gap-3", headerClassName)}>
          {subtitle && (
            typeof subtitle === "string" ? (
              <p className="text-center text-foreground">{subtitle}</p>
            ) : (
              subtitle
            )
          )}
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
        </div>
        <div className={cn("grid w-full max-w-332.5 auto-cols-auto grid-cols-2 grid-rows-[auto_auto] justify-center gap-5 md:grid-cols-[repeat(4,1fr)]", gridClassName)}>
          {renderTeamImages()}
          {renderTestimonial()}
          {renderFeatureImage()}
        </div>
      </div>
    </section>
  );
}
