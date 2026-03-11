"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { AspectRatio } from "../../ui/aspect-ratio";
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

export interface HeroUiLibraryShowcaseProps {
  /**
   * Logo image configuration
   */
  logo?: ImageItem;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Showcase image configuration
   */
  image?: ImageItem;
  /**
   * Custom slot for image (overrides image prop)
   */
  imageSlot?: React.ReactNode; /**
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
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroUiLibraryShowcase({
  sectionId = "hero-ui-library-showcase",
  logo,
  logoSlot,
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
  spacing = "xl",
  headerClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
}: HeroUiLibraryShowcaseProps): React.JSX.Element {
  const renderLogo = useMemo(() => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    return (
      <Img
        src={logo.src}
        alt={logo.alt}
        className={cn("h-11 w-fit", logo.className)}
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [logoSlot, logo, optixFlowConfig]);

  const renderImage = useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <div className="w-full overflow-hidden rounded-2xl shadow-xl mt-12 md:mt-20">
        <AspectRatio ratio={1.916786227 / 1}>
          <Img
            src={image.src}
            alt={image.alt}
            className={cn(
              "size-full object-cover",
              imageClassName,
              image.className,
            )}
            optixFlowConfig={optixFlowConfig}
          />
        </AspectRatio>
      </div>
    );
  }, [imageSlot, image, imageClassName, optixFlowConfig]);

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
      <div
        className={cn(
          "flex flex-col gap-4 items-start pt-6 md:pt-0",
          headerClassName,
        )}
      >
        {renderLogo}
        <div className="flex max-w-[880px] flex-col items-center gap-6">
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-5xl md:text-6xl lg:text-7xl font-semibold text-balance",
                  headingClassName,
                )}
              >
                <p>{heading}</p>
              </h1>
            ) : (
              <h1
                className={cn(
                  "text-5xl md:text-6xl lg:text-7xl font-semibold text-balance",
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
                  "text-xl text-balance font-medium",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>

        <BlockActions
          actions={actions}
          actionsSlot={actionsSlot}
          actionsClassName={actionsClassName}
        />
      </div>
      {renderImage}
    </Section>
  );
}
