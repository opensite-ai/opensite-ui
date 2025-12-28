"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Input } from "../../ui/input";
import type { ActionConfig, ImageItem, OptixFlowConfig } from "../../../src/types";

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
  browserPreviewSlot?: React.ReactNode;
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

const defaultEmailForm: EmailFormConfig = {
  placeholder: "Enter your work email",
  action: { label: "Get started", href: "#", variant: "default", className: "h-12 px-6" },
  helperText: "Free 14-day trial. No credit card required.",
};

const defaultBrowserPreview: BrowserPreviewConfig = {
  url: "dashboard.example.com",
  image: { src: imagePlaceholders[106], alt: "Dashboard preview" },
};

export function HeroSaasDashboardPreview({
  badgeText = "AI-powered analytics",
  badgeIcon = "lucide/sparkles",
  badgeSlot,
  heading = "Understand your data like never before",
  description = "Get actionable insights from your data with our AI-powered analytics platform. No data science degree required.",
  emailForm = defaultEmailForm,
  emailFormSlot,
  browserPreview = defaultBrowserPreview,
  browserPreviewSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  previewClassName,
  optixFlowConfig,
}: HeroSaasDashboardPreviewProps): React.JSX.Element {
  const renderBadge = () => {
    if (badgeSlot) return badgeSlot;

    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
        {badgeIcon && (
          <DynamicIcon
            name={badgeIcon}
            size={16}
            className="text-primary"
          />
        )}
        {badgeText && <span>{badgeText}</span>}
      </div>
    );
  };

  const renderEmailForm = () => {
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
            <p className="mt-4 text-sm text-muted-foreground">
              {emailForm.helperText}
            </p>
          ) : (
            emailForm.helperText
          )
        )}
      </>
    );
  };

  const renderBrowserPreview = () => {
    if (browserPreviewSlot) return browserPreviewSlot;
    if (!browserPreview) return null;

    return (
      <div className={cn("relative mt-20", previewClassName)}>
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10 pointer-events-none"></div>
        <div className="overflow-hidden rounded-xl border border-border bg-muted/30 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            {browserPreview.url && (
              <div className="flex-1 text-center text-sm text-muted-foreground">
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
  };

  return (
    <section className={cn("bg-background py-20 md:py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto max-w-4xl text-center", headerClassName)}>
          {renderBadge()}
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("mt-8 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <h1 className={cn("mt-8 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", headingClassName)}>
                {heading}
              </h1>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mt-6 text-lg text-muted-foreground md:text-xl", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {renderEmailForm()}
        </div>
        {renderBrowserPreview()}
      </div>
    </section>
  );
}
