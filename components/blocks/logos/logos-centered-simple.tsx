"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

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

const defaultLogos: LogosCenteredSimpleLogoItem[] = [
  {
    name: "Company 1",
    logo: "https://cdn.ing/assets/files/record/286222/4w39lhwei0pa97up2wjnay3j96gh",
  },
  {
    name: "Company 2",
    logo: "https://cdn.ing/assets/files/record/286252/xd7hyzbpkjwsauxm5j9yn9v44min",
  },
  {
    name: "Company 3",
    logo: "https://cdn.ing/assets/files/record/286216/bw4zypgflisdtapxy0n4nbmsmtum",
  },
  {
    name: "Company 4",
    logo: "https://cdn.ing/assets/files/record/286284/cz20wf2l2tjokrxu563pcml7pkmu",
  },
  {
    name: "Company 5",
    logo: "https://cdn.ing/assets/files/record/286215/6wwi6yh2ax2nuo2vqa5gn9vozrgq",
  },
  {
    name: "Company 6",
    logo: "https://cdn.ing/assets/files/record/286249/ff7m4wdw0zefj7d96v4ajmljuifc",
  },
];

/**
 * LogosCenteredSimple - A centered logo grid with title and subtitle.
 * Features grayscale logos with hover effects for color reveal.
 */
export function LogosCenteredSimple({
  className,
  title = "Trusted by innovative companies",
  titleClassName,
  subtitle = "Join thousands of businesses that rely on our platform",
  subtitleClassName,
  headerClassName,
  logos = defaultLogos,
  logosSlot,
  logosClassName,
  logoWrapperClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: LogosCenteredSimpleProps): React.JSX.Element {
  const renderLogos = () => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return logos.map((logo, index) => (
      <div
        key={index}
        className={cn(
          "flex items-center justify-center opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0",
          logoWrapperClassName,
          logo.className
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
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      {(title || subtitle) && (
        <div className={cn("mb-12 text-center", headerClassName)}>
          {title && (
            typeof title === "string" ? (
              <h2 className={cn("mb-3 text-2xl font-semibold md:text-3xl", titleClassName)}>
                {title}
              </h2>
            ) : (
              <div className={titleClassName}>{title}</div>
            )
          )}
          {subtitle && (
            typeof subtitle === "string" ? (
              <p className={cn("text-muted-foreground", subtitleClassName)}>
                {subtitle}
              </p>
            ) : (
              <div className={subtitleClassName}>{subtitle}</div>
            )
          )}
        </div>
      )}
      <div className={cn("flex flex-wrap items-center justify-center gap-x-12 gap-y-8", logosClassName)}>
        {renderLogos()}
      </div>
    </Section>
  );
}
