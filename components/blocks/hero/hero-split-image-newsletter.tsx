"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Input } from "../../ui/input";
import type { ActionConfig, ImageItem, OptixFlowConfig } from "../../../src/types";

export interface NewsletterFormConfig {
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

export interface HeroSplitImageNewsletterProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Newsletter form configuration
   */
  newsletterForm?: NewsletterFormConfig;
  /**
   * Custom slot for newsletter form (overrides newsletterForm prop)
   */
  newsletterFormSlot?: React.ReactNode;
  /**
   * Feature image on the right side
   */
  image?: ImageItem;
  /**
   * Custom slot for image (overrides image prop)
   */
  imageSlot?: React.ReactNode;
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

export function HeroSplitImageNewsletter({
  heading,
  description,
  newsletterForm,
  newsletterFormSlot,
  image,
  imageSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
}: HeroSplitImageNewsletterProps): React.JSX.Element {
  const renderNewsletterForm = () => {
    if (newsletterFormSlot) return newsletterFormSlot;
    if (!newsletterForm) return null;

    return (
      <>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input
            type="email"
            placeholder={newsletterForm.placeholder}
            className="h-12 flex-1 rounded-full px-6"
          />
          {newsletterForm.action && (
            <Pressable
              href={newsletterForm.action.href}
              asButton
              variant={newsletterForm.action.variant}
              className={newsletterForm.action.className}
            >
              {newsletterForm.action.label}
              {newsletterForm.action.iconAfter}
            </Pressable>
          )}
        </div>
        {newsletterForm.helperText && (
          typeof newsletterForm.helperText === "string" ? (
            <p className="text-sm text-muted-foreground">
              {newsletterForm.helperText}
            </p>
          ) : (
            newsletterForm.helperText
          )
        )}
      </>
    );
  };

  const renderImage = () => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <div className="relative lg:w-1/2">
        <Img
          src={image.src}
          alt={image.alt}
          className={cn("w-full rounded-2xl object-cover shadow-2xl", imageClassName, image.className)}
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    );
  };

  return (
    <section
      className={cn(
        "relative flex min-h-screen items-center justify-center bg-background py-14 font-sans",
        className,
      )}
    >
      <div className={cn("container flex flex-col items-center gap-10 lg:flex-row lg:gap-20", containerClassName)}>
        <div className={cn("flex flex-col gap-8 lg:w-1/2", contentClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("text-5xl font-bold text-foreground md:text-6xl lg:text-7xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <h1 className={cn("text-5xl font-bold text-foreground md:text-6xl lg:text-7xl", headingClassName)}>
                {heading}
              </h1>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("text-lg text-muted-foreground md:text-xl", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          {renderNewsletterForm()}
        </div>
        {renderImage()}
      </div>
    </section>
  );
}
