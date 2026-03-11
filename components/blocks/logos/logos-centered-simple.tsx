"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface LogosCenteredSimpleLogoItem {
  /**
   * Company/partner name
   */
  name: string;
  /**
   * Logo image URL
   */
  logo: string;
  /**
   * Additional CSS classes for the logo wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the logo image
   */
  imgClassName?: string;
}

export interface LogosCenteredSimpleProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Main title/heading
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Subtitle/description text
   */
  subtitle?: React.ReactNode;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Additional CSS classes for the header container
   */
  headerClassName?: string;
  /**
   * Array of logo configurations
   */
  logos?: LogosCenteredSimpleLogoItem[];
  /**
   * Custom slot for rendering logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logos container
   */
  logosClassName?: string;
  /**
   * Additional CSS classes for each logo wrapper
   */
  logoWrapperClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * LogosCenteredSimple - A centered logo grid with title and subtitle.
 * Features grayscale logos with hover effects for color reveal.
 */
export function LogosCenteredSimple({
  sectionId = "logos-centered-simple",
  className,
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
  headerClassName,
  logos,
  logosSlot,
  logosClassName,
  logoWrapperClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: LogosCenteredSimpleProps): React.JSX.Element {
  const renderLogos = useMemo(() => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return logos.map((logo, index) => (
      <div
        key={index}
        className={cn(
          "flex items-center justify-center opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0",
          logoWrapperClassName,
          logo.className,
        )}
      >
        <Img
          src={logo.logo}
          alt={`${logo.name} logo`}
          width={120}
          height={48}
          className={cn("h-12 w-auto object-contain", logo.imgClassName)}
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    ));
  }, [logos, logosSlot, logoWrapperClassName, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      {(title || subtitle) && (
        <div className={cn("mb-12 text-center", headerClassName)}>
          {title &&
            (typeof title === "string" ? (
              <h2
                className={cn(
                  "mb-3 text-2xl font-semibold md:text-3xl",
                  titleClassName,
                )}
              >
                {title}
              </h2>
            ) : (
              <div className={titleClassName}>{title}</div>
            ))}
          {subtitle &&
            (typeof subtitle === "string" ? (
              <p className={cn("text-muted-foreground", subtitleClassName)}>
                {subtitle}
              </p>
            ) : (
              <div className={subtitleClassName}>{subtitle}</div>
            ))}
        </div>
      )}
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-x-12 gap-y-8",
          logosClassName,
        )}
      >
        {renderLogos}
      </div>
    </Section>
  );
}
