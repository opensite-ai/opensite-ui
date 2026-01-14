"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

export interface VisionGalleryImageItem {
  src: string;
  alt: string;
}

export interface AboutVisionGalleryProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Main title
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Subtitle text
   */
  subtitle?: React.ReactNode;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Array of gallery images
   */
  images?: VisionGalleryImageItem[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * Vision section title
   */
  visionTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the vision title
   */
  visionTitleClassName?: string;
  /**
   * Vision section content
   */
  visionContent?: React.ReactNode;
  /**
   * Additional CSS classes for the vision content
   */
  visionContentClassName?: string;
  /**
   * Creators section title
   */
  creatorsTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the creators title
   */
  creatorsTitleClassName?: string;
  /**
   * Creators section content
   */
  creatorsContent?: React.ReactNode;
  /**
   * Additional CSS classes for the creators content
   */
  creatorsContentClassName?: string;
  /**
   * Creators link text
   */
  creatorsLinkText?: React.ReactNode;
  /**
   * Creators link URL
   */
  creatorsLinkUrl?: string;
  /**
   * CTA section title
   */
  ctaTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the CTA title
   */
  ctaTitleClassName?: string;
  /**
   * CTA action configuration
   */
  ctaAction?: ActionConfig;
  /**
   * Custom slot for rendering CTA (overrides ctaAction)
   */
  ctaSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the CTA section
   */
  ctaClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function AboutVisionGallery({
  className,
  containerClassName,
  title = "About Us",
  titleClassName,
  subtitle = "Meet our team, discover our values, and learn how we balance work, life, and everything in between.",
  subtitleClassName,
  images,
  imagesSlot,
  imagesClassName,
  visionTitle = "Our Vision",
  visionTitleClassName,
  visionContent = `For years, the process of building custom software has remained challenging. Today, visual builders exist, but tailored solutions still require technical expertise and a lot of time. This is a problem for businesses and individuals alike.

What if you could create custom software without writing a single line of code? What if you could build your own tools.

With our platform, you can! Our tools let you design layouts and create functionality—all without needing to code.

We believe that everyone should be able to build their own solutions, regardless of their technical background.`,
  visionContentClassName,
  creatorsTitle = "Our Creators",
  creatorsTitleClassName,
  creatorsContent = `has been building web tools for over a decade, focusing on efficiency and user control in every project. We know that the best solutions are the ones that you can create yourself.

We initially developed these solutions for our own team, and now everyone can benefit from them too. We are proud to offer a platform that is accessible to all, regardless of technical expertise.

Our team is made up of talented individuals who are passionate about creating tools that empower users to build their own solutions with ease. We are dedicated to helping you achieve your goals, and we can't wait to see what you create!`,
  creatorsContentClassName,
  creatorsLinkText = "Our Company",
  creatorsLinkUrl = "#",
  ctaTitle = "Part of Our Global Team",
  ctaTitleClassName,
  ctaAction,
  ctaSlot,
  ctaClassName,
  optixFlowConfig,
}: AboutVisionGalleryProps): React.JSX.Element {
  const renderImages = () => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div className={cn("grid gap-3 md:grid-cols-2 lg:grid-cols-3", imagesClassName)}>
        {images.map((image, idx) => (
          <Img
            key={idx}
            src={image.src}
            alt={image.alt}
            className="max-h-80 w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        ))}
      </div>
    );
  };

  const renderCta = () => {
    if (ctaSlot) return ctaSlot;
    if (!ctaAction) return null;

    return (
      <Pressable
        href={ctaAction.href}
        onClick={ctaAction.onClick}
        size={ctaAction.size || "lg"}
        variant={ctaAction.variant || "default"}
        asButton
      >
        {ctaAction.label}
      </Pressable>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="mx-auto flex max-w-3xl flex-col gap-8 pb-28 text-center">
          {title && (
            typeof title === "string" ? (
              <h1 className={cn("text-4xl font-semibold md:text-7xl", titleClassName)}>{title}</h1>
            ) : (
              <div className={titleClassName}>{title}</div>
            )
          )}
          {subtitle && (
            typeof subtitle === "string" ? (
              <p className={cn("text-xl font-medium text-muted-foreground", subtitleClassName)}>
                {subtitle}
              </p>
            ) : (
              <div className={subtitleClassName}>{subtitle}</div>
            )
          )}
        </div>
        {renderImages()}
        <div className="mx-auto grid max-w-5xl gap-28 py-28 md:grid-cols-2">
          <div>
            {visionTitle && (
              typeof visionTitle === "string" ? (
                <h2 className={cn("mb-5 text-4xl font-semibold", visionTitleClassName)}>{visionTitle}</h2>
              ) : (
                <div className={cn("mb-5", visionTitleClassName)}>{visionTitle}</div>
              )
            )}
            {visionContent && (
              typeof visionContent === "string" ? (
                <p className={cn("text-xl leading-8 font-medium text-muted-foreground whitespace-pre-line", visionContentClassName)}>
                  {visionContent}
                </p>
              ) : (
                <div className={visionContentClassName}>{visionContent}</div>
              )
            )}
          </div>
          <div>
            {creatorsTitle && (
              typeof creatorsTitle === "string" ? (
                <h2 className={cn("mb-5 text-4xl font-semibold", creatorsTitleClassName)}>{creatorsTitle}</h2>
              ) : (
                <div className={cn("mb-5", creatorsTitleClassName)}>{creatorsTitle}</div>
              )
            )}
            <p className={cn("text-xl leading-8 font-medium text-muted-foreground", creatorsContentClassName)}>
              {creatorsLinkText && creatorsLinkUrl && (
                <Pressable href={creatorsLinkUrl} className="mr-1 underline">
                  {creatorsLinkText}
                </Pressable>
              )}
              {creatorsContent}
            </p>
          </div>
        </div>
        <div className={cn("mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 rounded-2xl bg-muted/50 p-14 text-center md:flex-row md:text-left", ctaClassName)}>
          {ctaTitle && (
            typeof ctaTitle === "string" ? (
              <h3 className={cn("text-3xl font-semibold whitespace-pre-line", ctaTitleClassName)}>
                {ctaTitle}
              </h3>
            ) : (
              <div className={ctaTitleClassName}>{ctaTitle}</div>
            )
          )}
          {renderCta()}
        </div>
      </div>
    </section>
  );
}
