"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ImageItem,
  StatItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Badge } from "@/src";
import { BlockActions } from "@/components/ui/block-actions";
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

export interface HeroEcommerceProductShowcaseProps {
  /**
   * Badge text content
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
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of stat items
   */
  stats?: StatItem[];
  /**
   * Custom slot for stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Array of product images (expects 4 images)
   */
  images?: ImageItem[];
  /**
   * Custom slot for images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
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
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the stats container
   */
  statsClassName?: string;
  /**
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Brand logo configuration. LOGO MEDIA ONLY — do not use photos or hero images.
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroEcommerceProductShowcase({
  sectionId = "hero-ecommerce-product-showcase",
  badgeText,
  badgeIcon,
  badgeSlot,
  heading,
  description,
  actions,
  actionsSlot,
  stats,
  statsSlot,
  images,
  imagesSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  statsClassName,
  imagesClassName,
  optixFlowConfig,
  logo,
  logoSlot,
  logoClassName,
}: HeroEcommerceProductShowcaseProps): React.JSX.Element {
  const renderBadge = useMemo(() => {
    if (badgeSlot) return badgeSlot;

    return (
      <Badge className={cn("px-4 py-2")}>
        {badgeIcon && <DynamicIcon name={badgeIcon} size={16} />}
        <span>{badgeText}</span>
      </Badge>
    );
  }, [badgeSlot, badgeIcon, badgeText]);

  const renderStats = useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div
        className={cn(
          "flex flex-col md:flex-row items-center gap-4 md:gap-6 pt-8 md:pt-12",
          statsClassName,
        )}
      >
        {stats.map((stat, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div className="h-12 w-px bg-border hidden md:flex"></div>
            )}
            <div className="flex items-center gap-2 justify-between flex-row md:flex-col text-left md:text-center w-full md:w-fit border md:border-none rounded-xl md:rounded-none p-4 md:p-0">
              <div
                className={cn(
                  "flex items-center gap-2 w-fit md:w-full",
                  stat.icon ? "justify-between" : "justify-center",
                )}
              >
                <DynamicIcon name={stat.icon} />
                <div
                  className={cn(
                    "font-bold ",
                    stat.icon ? "text-xl" : "text-2xl",
                  )}
                >
                  {stat.value}
                </div>
              </div>
              <div className={cn("text-sm")}>{stat.label}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }, [statsSlot, stats, statsClassName]);

  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;
    const imgClassWrapper =
      "overflow-hidden rounded-3xl ring-4 ring-primary shadow-2xl";

    return (
      <div className={cn("grid grid-cols-2 gap-4 md:gap-8", imagesClassName)}>
        <div className="space-y-4 md:space-y-8">
          {images[0] && (
            <div className={imgClassWrapper}>
              <Img
                src={images[0].src}
                alt={images[0].alt}
                className={cn(
                  "aspect-3/4 w-full object-cover",
                  images[0].className,
                )}
                optixFlowConfig={optixFlowConfig}
                loading="eager"
              />
            </div>
          )}
          {images[1] && (
            <div className={imgClassWrapper}>
              <Img
                src={images[1].src}
                alt={images[1].alt}
                className={cn(
                  "aspect-square w-full object-cover",
                  images[1].className,
                )}
                optixFlowConfig={optixFlowConfig}
                loading="eager"
              />
            </div>
          )}
        </div>
        <div className="space-y-4 md:space-y-8 pt-12">
          {images[2] && (
            <div className={imgClassWrapper}>
              <Img
                src={images[2].src}
                alt={images[2].alt}
                className={cn(
                  "aspect-square w-full object-cover",
                  images[2].className,
                )}
                optixFlowConfig={optixFlowConfig}
                loading="eager"
              />
            </div>
          )}
          {images[3] && (
            <div className={imgClassWrapper}>
              <Img
                src={images[3].src}
                alt={images[3].alt}
                className={cn(
                  "aspect-3/4 w-full object-cover",
                  images[3].className,
                )}
                optixFlowConfig={optixFlowConfig}
                loading="eager"
              />
            </div>
          )}
        </div>
      </div>
    );
  }, [imagesSlot, images, imagesClassName, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="pt-8 md:pt-0">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 md:order-1">{renderImages}</div>
          <div
            className={cn(
              "flex flex-col gap-4 md:gap-6 order-1 md:order-2",
              contentClassName,
            )}
          >
            {renderBadge}
            {(logo || logoSlot) && (
              <div className={cn("mb-4", logoClassName)}>
                <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />
              </div>
            )}

            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                heading
              ))}
            {description &&
              (typeof description === "string" ? (
                <p className={cn("text-lg text-balance", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                description
              ))}
            <BlockActions
              actions={actions}
              actionsSlot={actionsSlot}
              actionsClassName={actionsClassName}
            />
            {renderStats}
          </div>
        </div>
      </div>
    </Section>
  );
}
