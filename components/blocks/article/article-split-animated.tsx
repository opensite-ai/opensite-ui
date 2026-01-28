"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { OptixFlowConfig, ActionConfig, SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface ArticleSplitAnimatedProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the image container
   */
  imageContainerClassName?: string;
  /**
   * Additional CSS classes for the content container
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the author info
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the category badge
   */
  categoryClassName?: string;
  /**
   * Additional CSS classes for the meta info (date, read time)
   */
  metaClassName?: string;
  /**
   * Additional CSS classes for the CTA section
   */
  ctaClassName?: string;
  /**
   * Article title
   */
  title?: React.ReactNode;
  /**
   * Article description
   */
  description?: React.ReactNode;
  /**
   * Hero image source URL
   */
  image?: string;
  /**
   * Hero image alt text
   */
  imageAlt?: string;
  /**
   * Custom slot for hero media (overrides image)
   */
  heroMediaSlot?: React.ReactNode;
  /**
   * Author name
   */
  authorName?: string;
  /**
   * Author image URL
   */
  authorImage?: string;
  /**
   * Author role/title
   */
  authorRole?: React.ReactNode;
  /**
   * Author profile href
   */
  authorHref?: string;
  /**
   * Custom slot for author info (overrides author props)
   */
  authorSlot?: React.ReactNode;
  /**
   * Publish date string
   */
  publishDate?: React.ReactNode;
  /**
   * Read time string
   */
  readTime?: React.ReactNode;
  /**
   * Category text
   */
  category?: React.ReactNode;
  /**
   * Category link href
   */
  categoryHref?: string;
  /**
   * Custom slot for category badge (overrides category)
   */
  categorySlot?: React.ReactNode;
  /**
   * CTA actions
   */
  ctaActions?: ActionConfig[];
  /**
   * @deprecated Use ctaActions instead
   * CTA button text (backward compatibility)
   */
  ctaText?: string;
  /**
   * @deprecated Use ctaActions instead
   * CTA button href (backward compatibility)
   */
  ctaHref?: string;
  /**
   * Custom slot for CTA section (overrides ctaActions)
   */
  ctaSlot?: React.ReactNode;
  /**
   * Enable entrance animations
   * @default true
   */
  enableAnimations?: boolean;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Background pattern
   */
  pattern?: PatternName;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
}

export function ArticleSplitAnimatedComponent({
  className,
  containerClassName,
  imageContainerClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  authorClassName,
  categoryClassName,
  metaClassName,
  ctaClassName,
  title,
  description,
  image,
  imageAlt,
  heroMediaSlot,
  authorName,
  authorImage,
  authorRole,
  authorHref,
  authorSlot,
  publishDate,
  readTime,
  category,
  categoryHref,
  categorySlot,
  ctaActions: ctaActionsProp,
  ctaText,
  ctaHref,
  ctaSlot,
  enableAnimations = true,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
}: ArticleSplitAnimatedProps) {
  const ctaActions = ctaActionsProp ?? (ctaText ? [{ label: ctaText, href: ctaHref || "#", variant: "default" as const, size: "lg" as const }] : []);

  const MotionWrapper = enableAnimations ? motion.div : "div";

  const categoryContent = React.useMemo(() => {
    if (categorySlot) return categorySlot;
    if (!category) return null;

    return (
      <Pressable
        href={categoryHref}
        className={cn(
          "inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30",
          categoryClassName
        )}
      >
        {category}
      </Pressable>
    );
  }, [categorySlot, category, categoryHref, categoryClassName]);

  const heroMediaContent = React.useMemo(() => {
    if (heroMediaSlot) return heroMediaSlot;
    if (!image) return null;

    return (
      <Img
        src={image}
        alt={imageAlt || (typeof title === "string" ? title : "Article image")}
        className="h-full w-full object-cover"
        optixFlowConfig={optixFlowConfig}
      />
    );
  }, [heroMediaSlot, image, imageAlt, title, optixFlowConfig]);

  const authorContent = React.useMemo(() => {
    if (authorSlot) return authorSlot;
    if (!authorName) return null;

    return (
      <div className={cn("mt-8 flex items-center gap-4", authorClassName)}>
        <Avatar className="h-12 w-12">
          <AvatarImage src={authorImage} />
          <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          {authorHref ? (
            <Pressable href={authorHref} className="font-medium hover:underline">
              {authorName}
            </Pressable>
          ) : (
            <p className="font-medium">{authorName}</p>
          )}
          {authorRole && (
            <p className="text-sm text-muted-foreground">{authorRole}</p>
          )}
        </div>
      </div>
    );
  }, [authorSlot, authorName, authorImage, authorHref, authorRole, authorClassName]);

  const ctaContent = React.useMemo(() => {
    if (ctaSlot) return ctaSlot;
    if (!ctaActions || ctaActions.length === 0) return null;

    return (
      <div className={cn("mt-8 flex flex-wrap gap-3", ctaClassName)}>
        {ctaActions.map((action, index) => {
          const { label, icon, iconAfter, children: actionChildren, className: actionClassName, ...pressableProps } = action;
          return (
            <Pressable
              key={index}
              asButton
              className={actionClassName}
              {...pressableProps}
            >
              {actionChildren ?? (
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
  }, [ctaSlot, ctaActions, ctaClassName]);

  const imageAnimationProps = enableAnimations
    ? {
        initial: { opacity: 0, x: -20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      }
    : {};

  const contentAnimationProps = enableAnimations
    ? {
        initial: { opacity: 0, x: 20 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: 0.1 },
      }
    : {};

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("container", containerClassName)}>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <MotionWrapper
            {...imageAnimationProps}
            className={cn(
              "relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-auto lg:h-full",
              imageContainerClassName
            )}
          >
            {heroMediaContent}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              {categoryContent}
            </div>
          </MotionWrapper>

          <MotionWrapper
            {...contentAnimationProps}
            className={cn("flex flex-col justify-center", contentClassName)}
          >
            {(publishDate || readTime) && (
              <div className={cn("flex items-center gap-4 text-sm text-muted-foreground", metaClassName)}>
                {publishDate && <span>{publishDate}</span>}
                {publishDate && readTime && <Separator orientation="vertical" className="h-4" />}
                {readTime && <span>{readTime}</span>}
              </div>
            )}

            {title && (
              typeof title === "string" ? (
                <h2 className={cn("mt-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl", titleClassName)}>
                  {title}
                </h2>
              ) : (
                <div className={cn("mt-4", titleClassName)}>{title}</div>
              )
            )}

            {description && (
              typeof description === "string" ? (
                <p className={cn("mt-4 text-lg text-muted-foreground", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={cn("mt-4", descriptionClassName)}>{description}</div>
              )
            )}

            {authorContent}
            {ctaContent}
          </MotionWrapper>
        </div>
      </div>
    </Section>
  );
}

export { ArticleSplitAnimatedComponent as ArticleSplitAnimated };
