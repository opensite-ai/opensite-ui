"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, LogoItem, ImageItem, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface HeroDesignShowcaseLogosProps {
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
   * Text above logos section
   */
  logosLabel?: React.ReactNode;
  /**
   * Array of logo items
   */
  logos?: LogoItem[];
  /**
   * Custom slot for logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
  /**
   * Showcase image configuration
   */
  showcaseImage?: ImageItem;
  /**
   * Custom slot for showcase image (overrides showcaseImage prop)
   */
  showcaseSlot?: React.ReactNode;
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
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
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
   * Additional CSS classes for the logos container
   */
  logosClassName?: string;
  /**
   * Additional CSS classes for the showcase container
   */
  showcaseClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroDesignShowcaseLogos({
  heading,
  description,
  actions,
  actionsSlot,
  logosLabel = "Trusted by design teams at",
  logos,
  logosSlot,
  showcaseImage,
  showcaseSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  logosClassName,
  showcaseClassName,
  optixFlowConfig,
}: HeroDesignShowcaseLogosProps): React.JSX.Element {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("mt-3 flex items-center justify-center gap-3", actionsClassName)}>
        {actions.map((action, index) => {
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
                  {label && <div>{label}</div>}
                  {iconAfter}
                </>
              )}
            </Pressable>
          );
        })}
      </div>
    );
  }, [actionsSlot, actions, actionsClassName]);

  const renderLogos = useMemo(() => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return (
      <div className="py-10 md:py-16">
        {logosLabel && (
          typeof logosLabel === "string" ? (
            <p className="text-center text-sm text-foreground/60">
              {logosLabel}
            </p>
          ) : (
            <div className="text-center text-sm text-foreground/60">{logosLabel}</div>
          )
        )}
        <div className={cn("mt-8 flex flex-wrap items-center justify-center gap-5 sm:flex-nowrap", logosClassName)}>
          {logos.map((logo, index) => {
            const logoSrc = typeof logo.src === "string" ? logo.src : logo.src.light;
            return (
              <Img
                key={index}
                src={logoSrc}
                alt={logo.alt}
                className={cn("block h-3.5 w-auto opacity-50 md:h-5", logo.className)}
                optixFlowConfig={optixFlowConfig}
              />
            );
          })}
        </div>
      </div>
    );
  }, [logosSlot, logos, logosLabel, logosClassName, optixFlowConfig]);

  const renderShowcase = useMemo(() => {
    if (showcaseSlot) return showcaseSlot;
    if (!showcaseImage) return null;

    return (
      <div className={cn("w-full xl:px-8", showcaseClassName)}>
        <div className="relative mx-auto aspect-[1.259253731/1] w-full max-w-384 overflow-hidden bg-zinc-950 xl:aspect-[1.896296296/1] xl:rounded-3xl">
          <div className="absolute -bottom-1 left-[56%] aspect-[1.151758794/-1] w-full -translate-x-1/2 overflow-hidden rounded-tl-2xl bg-background xl:left-1/2 xl:aspect-[1.933988764/1] xl:w-[87.5%] xl:rounded-tr-2xl">
            <Img
              src={showcaseImage.src}
              alt={showcaseImage.alt}
              className={cn("w-full object-cover object-top-left", showcaseImage.className)}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </div>
    );
  }, [showcaseSlot, showcaseImage, showcaseClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("flex flex-col items-center gap-8", contentClassName)}>
          <div className="flex max-w-[920px] flex-col items-center gap-6">
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("mb-6 text-center text-[2.75rem] leading-tight font-semibold text-foreground md:text-[3.5rem] lg:text-[4.375rem]", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <h1 className={cn("mb-6 text-center text-[2.75rem] leading-tight font-semibold text-foreground md:text-[3.5rem] lg:text-[4.375rem]", headingClassName)}>
                  {heading}
                </h1>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-center text-xl text-muted-foreground", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
          </div>
          <div>
            {renderActions}
          </div>
          <div>
            {renderLogos}
          </div>
        </div>
      </div>
      {renderShowcase}
    </Section>
  );
}
