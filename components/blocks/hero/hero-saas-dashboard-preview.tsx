"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor, getTextColor, getAccentColor } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Input } from "../../ui/input";
import type {ActionConfig, ImageItem, OptixFlowConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface EmailFormConfig {
  /**
   * Input placeholder text
   */
  placeholder?: string;
  /**
   * Submit button action
   */
  action?: ActionConfig;
  /**
   * Helper text below form
   */
  helperText?: React.ReactNode;
}

export interface BrowserPreviewConfig {
  /**
   * URL displayed in browser bar
   */
  url?: string;
  /**
   * Dashboard preview image
   */
  image?: ImageItem;
}

export interface HeroSaasDashboardPreviewProps {
  /**
   * Badge text with icon
   */
  badgeText?: React.ReactNode;
  /**
   * Badge icon name
   */
  badgeIcon?: string;
  /**
   * Custom slot for badge (overrides badge props)
   */
  badgeSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Email form configuration
   */
  emailForm?: EmailFormConfig;
  /**
   * Custom slot for email form (overrides emailForm prop)
   */
  emailFormSlot?: React.ReactNode;
  /**
   * Browser preview configuration
   */
  browserPreview?: BrowserPreviewConfig;
  /**
   * Custom slot for browser preview (overrides browserPreview prop)
   */
  browserPreviewSlot?: React.ReactNode;  /**
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
   * Additional CSS classes for the preview area
   */
  previewClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroSaasDashboardPreview({
  badgeText,
  badgeIcon,
  badgeSlot,
  heading,
  description,
  emailForm,
  emailFormSlot,
  browserPreview,
  browserPreviewSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  previewClassName,
  optixFlowConfig,
}: HeroSaasDashboardPreviewProps): React.JSX.Element {
  const renderBadge = useMemo(() => {
    if (badgeSlot) return badgeSlot;

    return (
      <div className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm",
        getNestedCardBg(background, 'muted'),
        getNestedCardTextColor(background)
      )}>
        {badgeIcon && (
          <DynamicIcon
            name={badgeIcon}
            size={16}
            className={getAccentColor(background)}
          />
        )}
        {badgeText && <span>{badgeText}</span>}
      </div>
    );
  }, [badgeSlot, badgeIcon, badgeText]);

  const renderEmailForm = useMemo(() => {
    if (emailFormSlot) return emailFormSlot;
    if (!emailForm) return null;

    return (
      <>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <div className="flex w-full max-w-md items-center gap-2">
            <Input
              type="email"
              placeholder={emailForm.placeholder}
              className="h-12 flex-1"
            />
            {emailForm.action && (
              <Pressable
                href={emailForm.action.href}
                asButton
                variant={emailForm.action.variant}
                className={emailForm.action.className}
              >
                {emailForm.action.label}
              </Pressable>
            )}
          </div>
        </div>
        {emailForm.helperText && (
          typeof emailForm.helperText === "string" ? (
            <p className={cn("mt-4 text-sm", getTextColor(background, "muted"))}>
              {emailForm.helperText}
            </p>
          ) : (
            emailForm.helperText
          )
        )}
      </>
    );
  }, [emailFormSlot, emailForm]);

  const renderBrowserPreview = useMemo(() => {
    if (browserPreviewSlot) return browserPreviewSlot;
    if (!browserPreview) return null;

    return (
      <div className={cn("relative mt-20", previewClassName)}>
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10 pointer-events-none"></div>
        <div className={cn(
          "overflow-hidden rounded-xl border border-border shadow-2xl",
          getNestedCardBg(background, 'muted')
        )}>
          <div className={cn(
            "flex items-center gap-2 border-b border-border px-4 py-3",
            getNestedCardBg(background, 'muted')
          )}>
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-destructive"></div>
              <div className="h-3 w-3 rounded-full bg-accent"></div>
              <div className="h-3 w-3 rounded-full bg-success"></div>
            </div>
            {browserPreview.url && (
              <div className={cn("flex-1 text-center text-sm", getTextColor(background, "muted"))}>
                {browserPreview.url}
              </div>
            )}
          </div>
          {browserPreview.image && (
            <Img
              src={browserPreview.image.src}
              alt={browserPreview.image.alt}
              className={cn("w-full", browserPreview.image.className)}
              optixFlowConfig={optixFlowConfig}
            />
          )}
        </div>
      </div>
    );
  }, [browserPreviewSlot, browserPreview, previewClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto max-w-4xl text-center", headerClassName)}>
          {renderBadge}
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("mt-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <h1 className={cn("mt-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl", headingClassName)}>
                {heading}
              </h1>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mt-6 text-lg md:text-xl", getTextColor(background, "muted"), descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {renderEmailForm}
        </div>
        {renderBrowserPreview}
      </div>
    </Section>
  );
}
