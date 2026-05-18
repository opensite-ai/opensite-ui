"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

export interface HeroCrmStreamlinedProps {
  /**
   * Tagline text above heading
   */
  tagline?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Action configuration for CTA button
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for action (overrides action)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Main image configuration
   */
  image?: ImageItem;
  /**
   * Custom slot for image (overrides image)
   */
  imageSlot?: React.ReactNode;
  /**
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
   * Additional CSS classes for the content column
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the tagline
   */
  taglineClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the image container
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Brand logo configuration. LOGO MEDIA ONLY — do not use photos or hero images.
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroCrmStreamlined({
  sectionId = "hero-crm-streamlined",
  tagline,
  heading,
  description,
  actions,
  actionsSlot,
  actionsClassName,
  image,
  imageSlot,
  background,
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "hero",
  contentClassName,
  taglineClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
  logo,
  logoSlot,
  logoClassName,
}: HeroCrmStreamlinedProps): React.JSX.Element {
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
      <div className="relative">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className={cn("basis-2/4", contentClassName)}>
            <div className="mt-14 md:mt-0 flex flex-col gap-2">
              {tagline &&
                (typeof tagline === "string" ? (
                  <p
                    className={cn(
                      "text-base font-medium tracking-wider opacity-70 pb-6 uppercase",
                      taglineClassName,
                    )}
                  >
                    {tagline}
                  </p>
                ) : (
                  <div className={taglineClassName}>{tagline}</div>
                ))}
              {(logo || logoSlot) && (
                <div className={cn("mb-2 mt-4", logoClassName)}>
                  <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />
                </div>
              )}

              {heading &&
                (typeof heading === "string" ? (
                  <h1
                    className={cn(
                      "mb-2 text-4xl font-semibold text-pretty lg:text-5xl",
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
                      "mb-2 text-lg opacity-80 text-balance",
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
          </div>
          <div
            className={cn("relative basis-[42%] py-2 md:py-16", imageClassName)}
          >
            {imageSlot ? (
              imageSlot
            ) : image ? (
              <div className="aspect-square w-full overflow-hidden rounded-xl shadow-xl">
                <Img
                  src={image.src}
                  alt={image.alt}
                  className={cn(
                    "relative z-20 h-full w-full object-cover object-center",
                    image.className,
                  )}
                  optixFlowConfig={optixFlowConfig}
                  loading="eager"
                />
                <div
                  className={cn(
                    "absolute top-0 left-25 z-10 hidden bg-muted aspect-[1.378254211/1] h-full w-225 rounded-xl md:block",
                  )}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
