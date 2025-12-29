"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultPartners: LogosInlineTaglinePartnerItem[] = [
  {
    name: "Partner 1",
    logo: "https://cdn.ing/assets/files/record/286222/4w39lhwei0pa97up2wjnay3j96gh",
  },
  {
    name: "Partner 2",
    logo: "https://cdn.ing/assets/files/record/286252/xd7hyzbpkjwsauxm5j9yn9v44min",
  },
  {
    name: "Partner 3",
    logo: "https://cdn.ing/assets/files/record/286216/bw4zypgflisdtapxy0n4nbmsmtum",
  },
  {
    name: "Partner 4",
    logo: "https://cdn.ing/assets/files/record/286284/cz20wf2l2tjokrxu563pcml7pkmu",
  },
  {
    name: "Partner 5",
    logo: "https://cdn.ing/assets/files/record/286215/6wwi6yh2ax2nuo2vqa5gn9vozrgq",
  },
];

/**
 * LogosInlineTagline - An inline layout with tagline on the left and logos on the right.
 * Features grayscale logos with a prominent tagline for social proof.
 */
export function LogosInlineTagline({
  className,
  containerClassName,
  tagline = "Used by the world's leading companies",
  taglineClassName,
  partners = defaultPartners,
  partnersSlot,
  partnersClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: LogosInlineTaglineProps): React.JSX.Element {
  const renderPartners = () => {
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
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("flex flex-wrap items-center justify-between gap-12", containerClassName)}>
        {tagline && (
          typeof tagline === "string" ? (
            <p className={cn("text-lg leading-[140%] tracking-[-0.32px] text-primary", taglineClassName)}>
              {tagline}
            </p>
          ) : (
            <div className={taglineClassName}>{tagline}</div>
          )
        )}
        <div className={cn("flex flex-wrap items-center gap-x-8 gap-y-6 opacity-70 grayscale lg:gap-[60px]", partnersClassName)}>
          {renderPartners()}
        </div>
      </div>
    </Section>
  );
}
