"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getTextColor } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
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
}

export function HeroUiLibraryShowcase({
  logo,
  logoSlot,
  heading,
  description,
  actions,
  actionsSlot,
  image,
  imageSlot,
  background,
  spacing = "pt-28 pb-8 md:pt-32 md:pb-32",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headerClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
}: HeroUiLibraryShowcaseProps): React.JSX.Element {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const {
        label,
        icon,
        iconAfter,
        children,
        className: actionClassName,
        ...pressableProps
      } = action;
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
  }, [actionsSlot, actions]);

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
      <div className="w-full overflow-hidden rounded-lg">
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
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div
        className={cn("flex flex-col gap-10 md:items-center", headerClassName)}
      >
        {renderLogo}
        <div className="flex max-w-[880px] flex-col items-center gap-6">
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-4xl tracking-tighter capitalize md:text-5xl lg:text-6xl",
                  headingClassName,
                )}
              >
                <p>{heading}</p>
              </h1>
            ) : (
              <h1
                className={cn(
                  "text-4xl tracking-tighter capitalize md:text-5xl lg:text-6xl",
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
                  "text-xl",
                  getTextColor(background, "muted"),
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>
        {renderActions}
      </div>
      {renderImage}
    </Section>
  );
}
