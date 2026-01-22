"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface HeroDigitalAgencyFullscreenProps {
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
   * Footer label (e.g., "Global Headquarters")
   */
  footerLabel?: React.ReactNode;
  /**
   * Footer sublabel (e.g., location)
   */
  footerSublabel?: React.ReactNode;
  /**
   * Footer scroll action configuration
   */
  footerAction?: ActionConfig;
  /**
   * Custom slot for footer (overrides footer props)
   */
  footerSlot?: React.ReactNode;
  /**
   * Background image URL
   */
  backgroundImage?: string;
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
   * Additional CSS classes for the footer
   */
  footerClassName?: string;
}

export function HeroDigitalAgencyFullscreen({
  heading,
  description,
  actions,
  actionsSlot,
  footerLabel = "Global Headquarters",
  footerSublabel = "San Francisco, California",
  footerAction,
  footerSlot,
  backgroundImage,
  background = "dark",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  footerClassName,
}: HeroDigitalAgencyFullscreenProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("mt-8 flex flex-wrap items-center justify-center gap-4", actionsClassName)}>
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
                  {label}
                  {iconAfter}
                </>
              )}
            </Pressable>
          );
        })}
      </div>
    );
  };

  const renderFooter = () => {
    if (footerSlot) return footerSlot;
    if (!footerAction) return null;

    const { className: footerActionClassName, ...footerActionProps } = footerAction;
    return (
      <div className={cn("flex items-center justify-between gap-4 rounded-lg bg-black/20 px-6 py-4 backdrop-blur-sm", footerClassName)}>
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-primary"></div>
          <div className="text-sm font-medium text-muted-foreground">
            {typeof footerLabel === "string" ? (
              <p className="text-primary">{footerLabel}</p>
            ) : (
              footerLabel
            )}
            {typeof footerSublabel === "string" ? (
              <p>{footerSublabel}</p>
            ) : (
              footerSublabel
            )}
          </div>
        </div>
        <Pressable
          asButton
          className={footerActionClassName}
          {...footerActionProps}
        >
          <DynamicIcon
            name="lucide/arrow-down"
            size={20}
            className="m-auto stroke-primary"
          />
        </Pressable>
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(
        "font-dm_sans dark relative h-svh max-h-[1400px] min-h-[600px] w-full bg-cover bg-center bg-no-repeat after:absolute after:inset-0 after:block after:size-full after:bg-zinc-950/50 after:content-['']",
        className
      )}
      style={{ backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined }}
    >
      <div className={cn("relative z-10 mx-auto flex size-full max-w-500 px-4 py-9", containerClassName)}>
        <div className="flex w-full flex-col justify-between gap-10">
          <div className={cn("mx-auto flex max-w-125 flex-1 flex-col items-center justify-center gap-7 sm:max-w-150 md:max-w-200", contentClassName)}>
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
                <p className={cn("text-center text-lg text-balance text-foreground md:text-2xl", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            {renderActions()}
          </div>
          {renderFooter()}
        </div>
      </div>
    </Section>
  );
}
