"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  LogoItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface HeroPatternBadgeLogosProps {
  /**
   * Badge/eyebrow content above heading
   */
  badge?: React.ReactNode;
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
   * Array of logo configurations
   */
  logos?: LogoItem[];
  /**
   * Custom slot for rendering logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
  /**
   * Tagline text above logos
   */
  logosTagline?: React.ReactNode;
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
   * Additional CSS classes for the content wrapper
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
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the logos container
   */
  logosClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroPatternBadgeLogos({
  sectionId = "hero-pattern-badge-logos",
  badge,
  heading,
  description,
  actions,
  actionsSlot,
  logos,
  logosSlot,
  logosTagline,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-12 md:py-32",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  badgeClassName,
  actionsClassName,
  logosClassName,
  optixFlowConfig,
}: HeroPatternBadgeLogosProps): React.JSX.Element {
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

  const renderLogos = useMemo(() => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return logos.map((logo, index) => {
      const { src, alt, href, className: logoClassName, imgClassName } = logo;
      const isVariantSrc = typeof src === "object";

      const imgElement = isVariantSrc ? (
        <>
          <Img
            src={src.light}
            alt={alt}
            className={cn(
              imgClassName,
              "w-full h-10 object-contain dark:hidden",
            )}
            optixFlowConfig={optixFlowConfig}
          />
          {src.dark && (
            <Img
              src={src.dark}
              alt={alt}
              className={cn(
                imgClassName,
                "w-full h-10 object-contain hidden dark:block",
              )}
              optixFlowConfig={optixFlowConfig}
            />
          )}
        </>
      ) : (
        <Img
          src={src}
          alt={alt}
          className={cn("w-full h-10 object-contain", imgClassName)}
          optixFlowConfig={optixFlowConfig}
        />
      );

      if (href) {
        return (
          <Pressable key={index} href={href} className={logoClassName}>
            {imgElement}
          </Pressable>
        );
      }

      return (
        <div
          key={index}
          className={cn(
            "w-auto max-h-10 h-10 flex items-center justify-center",
            logoClassName,
          )}
        >
          {imgElement}
        </div>
      );
    });
  }, [logosSlot, logos, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className="relative">
          <div
            className={cn(
              "p-6 flex w-full flex-col items-center gap-6 text-center",
              contentClassName,
            )}
          >
            {badge && (
              <div className={badgeClassName}>
                {typeof badge === "string" ? (
                  <Badge variant="default">{badge}</Badge>
                ) : (
                  badge
                )}
              </div>
            )}
            <div>
              {heading &&
                (typeof heading === "string" ? (
                  <h1
                    className={cn(
                      "mb-6 text-4xl font-bold tracking-tight text-balance md:text-5xl lg:text-7xl",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h1>
                ) : (
                  <div className={headingClassName}>{heading}</div>
                ))}
              {description &&
                (typeof description === "string" ? (
                  <p
                    className={cn(
                      "mx-auto max-w-2xl md:text-lg lg:text-xl text-balance",
                      descriptionClassName,
                    )}
                  >
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                ))}
            </div>

            {(actionsSlot || (actions && actions.length > 0)) && (
              <div
                className={cn(
                  "mt-6 flex items-center justify-center gap-4 flex-col md:flex-row w-full",
                  actionsClassName,
                )}
              >
                {renderActions}
              </div>
            )}

            {(logosSlot || (logos && logos.length > 0) || logosTagline) && (
              <div
                className={cn(
                  "mt-6 flex flex-col items-center gap-4 lg:mt-16 w-full",
                  logosClassName,
                )}
              >
                {logosTagline &&
                  (typeof logosTagline === "string" ? (
                    <p className={cn("text-center text-sm")}>{logosTagline}</p>
                  ) : (
                    logosTagline
                  ))}
                <div className="flex items-center justify-center flex-wrap gap-12">
                  {renderLogos}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
