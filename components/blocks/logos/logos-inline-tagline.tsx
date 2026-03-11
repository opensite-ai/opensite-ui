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

export interface LogosInlineTaglinePartnerItem {
  /**
   * Partner/company name
   */
  name: string;
  /**
   * Logo image URL
   */
  logo: string;
  /**
   * Additional CSS classes for the logo image
   */
  imgClassName?: string;
}

export interface LogosInlineTaglineProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  containerClassName?: string;
  /**
   * Tagline text displayed on the left
   */
  tagline?: React.ReactNode;
  /**
   * Additional CSS classes for the tagline
   */
  taglineClassName?: string;
  /**
   * Array of partner/logo configurations
   */
  partners?: LogosInlineTaglinePartnerItem[];
  /**
   * Custom slot for rendering partners (overrides partners array)
   */
  partnersSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the partners container
   */
  partnersClassName?: string;
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
 * LogosInlineTagline - An inline layout with tagline on the left and logos on the right.
 * Features grayscale logos with a prominent tagline for social proof.
 */
export function LogosInlineTagline({
  sectionId = "logos-inline-tagline",
  className,
  containerClassName,
  tagline,
  taglineClassName,
  partners,
  partnersSlot,
  partnersClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: LogosInlineTaglineProps): React.JSX.Element {
  const renderPartners = useMemo(() => {
    if (partnersSlot) return partnersSlot;
    if (!partners || partners.length === 0) return null;

    return partners.map((partner, index) => (
      <Img
        key={index}
        src={partner.logo}
        alt={`${partner.name} logo`}
        width={109}
        height={48}
        className={cn("object-contain", partner.imgClassName)}
        optixFlowConfig={optixFlowConfig}
      />
    ));
  }, [partners, partnersSlot, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-12",
          containerClassName,
        )}
      >
        {tagline &&
          (typeof tagline === "string" ? (
            <p
              className={cn(
                "text-lg leading-[140%] tracking-[-0.32px] text-primary",
                taglineClassName,
              )}
            >
              {tagline}
            </p>
          ) : (
            <div className={taglineClassName}>{tagline}</div>
          ))}
        <div
          className={cn(
            "flex flex-wrap items-center gap-x-8 gap-y-6 opacity-70 grayscale lg:gap-[60px]",
            partnersClassName,
          )}
        >
          {renderPartners}
        </div>
      </div>
    </Section>
  );
}
