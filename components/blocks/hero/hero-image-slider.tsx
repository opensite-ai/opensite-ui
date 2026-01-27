"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { ImageSlider, type ImageSliderImage } from "../../ui/image-slider";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface HeroImageSliderProps {
  /**
   * Eyebrow label above the heading
   */
  eyebrow?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Supporting description text
   */
  description?: React.ReactNode;
  /**
   * Action button configurations
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Custom content slot for the hero copy area
   */
  contentSlot?: React.ReactNode;
  /**
   * Image slider items
   */
  images?: ImageSliderImage[];
  /**
   * Enable autoplay rotation
   */
  autoplay?: boolean;
  /**
   * Autoplay interval in milliseconds
   */
  autoplayIntervalMs?: number;
  /**
   * Slide direction for transitions
   */
  direction?: "up" | "down";
  /**
   * Enable the overlay gradient
   */
  overlay?: boolean;
  /**
   * Custom overlay slot (overrides default overlay)
   */
  overlaySlot?: React.ReactNode;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  verticalSpacing?: SectionSpacing;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the slider wrapper
   */
  sliderClassName?: string;
  /**
   * Additional CSS classes for the hero content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the eyebrow
   */
  eyebrowClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the image element
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the overlay layer
   */
  overlayClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * HeroImageSlider - A hero layout that layers headline content over
 * a rotating image slider, ideal for immersive visual storytelling.
 */
export function HeroImageSlider({
  eyebrow,
  heading,
  description,
  actions,
  actionsSlot,
  contentSlot,
  images,
  autoplay = true,
  autoplayIntervalMs = 6000,
  direction = "up",
  overlay = true,
  overlaySlot,
  background,
  verticalSpacing,
  className,
  sliderClassName,
  contentClassName,
  eyebrowClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageClassName,
  overlayClassName,
  optixFlowConfig,
}: HeroImageSliderProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const {
        label,
        icon,
        iconAfter,
        children,
        className: actionClassName,
        asButton,
        ...pressableProps
      } = action;

      return (
        <Pressable
          key={index}
          asButton={asButton ?? true}
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

  const renderContent = () => {
    if (contentSlot) return contentSlot;

    return (
      <div className={cn("mx-auto flex max-w-3xl flex-col items-center", contentClassName)}>
        {eyebrow ? (
          typeof eyebrow === "string" ? (
            <p
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/80",
                eyebrowClassName
              )}
            >
              {eyebrow}
            </p>
          ) : (
            eyebrow
          )
        ) : null}
        {heading ? (
          typeof heading === "string" ? (
            <h1
              className={cn(
                "mt-5 text-4xl font-semibold tracking-tight text-balance md:text-6xl",
                headingClassName
              )}
            >
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )
        ) : null}
        {description ? (
          typeof description === "string" ? (
            <p
              className={cn(
                "mt-6 text-base text-primary-foreground/80 md:text-lg",
                descriptionClassName
              )}
            >
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        ) : null}
        {actionsSlot || (actions && actions.length > 0) ? (
          <div
            className={cn(
              "mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row",
              actionsClassName
            )}
          >
            {renderActions()}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={verticalSpacing}
      className={cn("overflow-hidden", className)}
    >
      <ImageSlider
        images={images && images.length ? images : []}
        autoplay={autoplay}
        autoplayIntervalMs={autoplayIntervalMs}
        direction={direction}
        overlay={overlay}
        overlaySlot={overlaySlot}
        overlayClassName={overlayClassName}
        className={cn("min-h-[520px] md:min-h-[680px]", sliderClassName)}
        imageClassName={cn("scale-[1.02]", imageClassName)}
        optixFlowConfig={optixFlowConfig}
      >
        {renderContent()}
      </ImageSlider>
    </Section>
  );
}
