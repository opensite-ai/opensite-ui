"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface LogosTwoRowGridCompanyItem {
  /**
   * Company/partner name
   */
  name: string;
  /**
   * Logo image URL
   */
  logo: string;
  /**
   * Optional link URL for the logo
   */
  url?: string;
  /**
   * Additional CSS classes for the logo wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the logo image
   */
  imgClassName?: string;
}

export interface LogosTwoRowGridProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Heading text above the logos
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Array of company/logo configurations
   */
  companies?: LogosTwoRowGridCompanyItem[];
  /**
   * Custom slot for rendering companies (overrides companies array)
   */
  companiesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logos container
   */
  logosClassName?: string;
  /**
   * Additional CSS classes for each row
   */
  rowClassName?: string;
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

const defaultCompanies: LogosTwoRowGridCompanyItem[] = [
  {
    name: "Company 1",
    logo: "https://cdn.ing/assets/files/record/286222/4w39lhwei0pa97up2wjnay3j96gh",
    url: "#",
  },
  {
    name: "Company 2",
    logo: "https://cdn.ing/assets/files/record/286252/xd7hyzbpkjwsauxm5j9yn9v44min",
    url: "#",
  },
  {
    name: "Company 3",
    logo: "https://cdn.ing/assets/files/record/286216/bw4zypgflisdtapxy0n4nbmsmtum",
    url: "#",
  },
  {
    name: "Company 4",
    logo: "https://cdn.ing/assets/files/record/286284/cz20wf2l2tjokrxu563pcml7pkmu",
    url: "#",
  },
  {
    name: "Company 5",
    logo: "https://cdn.ing/assets/files/record/286215/6wwi6yh2ax2nuo2vqa5gn9vozrgq",
    url: "#",
  },
  {
    name: "Company 6",
    logo: "https://cdn.ing/assets/files/record/286249/ff7m4wdw0zefj7d96v4ajmljuifc",
    url: "#",
  },
  {
    name: "Company 7",
    logo: "https://cdn.ing/assets/files/record/286220/t34kymqu5g9xr85o89cji3kfuypb",
    url: "#",
  },
  {
    name: "Company 8",
    logo: "https://cdn.ing/assets/files/record/286251/c64yb2c255uig6vpe4gdlnten7rv",
    url: "#",
  },
  {
    name: "Company 9",
    logo: "https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb",
    url: "#",
  },
  {
    name: "Company 10",
    logo: "https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5",
    url: "#",
  },
];

/**
 * LogosTwoRowGrid - A two-row logo grid with heading.
 * Features grayscale logos with hover effects arranged in two centered rows.
 */
export function LogosTwoRowGrid({
  className,
  heading = "Trusted by leading companies worldwide",
  headingClassName,
  companies = defaultCompanies,
  companiesSlot,
  logosClassName,
  rowClassName,
  logoWrapperClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: LogosTwoRowGridProps): React.JSX.Element {
  const firstRow = companies.slice(0, Math.ceil(companies.length / 2));
  const secondRow = companies.slice(Math.ceil(companies.length / 2));

  const renderCompanyLogo = (company: LogosTwoRowGridCompanyItem, index: number) => (
    <Pressable
      key={index}
      href={company.url}
      className={cn(
        "opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0",
        logoWrapperClassName,
        company.className
      )}
    >
      <Img
        src={company.logo}
        alt={`${company.name} logo`}
        width={120}
        height={40}
        className={cn("h-10 w-auto object-contain", company.imgClassName)}
        optixFlowConfig={optixFlowConfig}
      />
    </Pressable>
  );

  const renderCompanies = () => {
    if (companiesSlot) return companiesSlot;
    if (!companies || companies.length === 0) return null;

    return (
      <div className={cn("space-y-8", logosClassName)}>
        <div className={cn("flex flex-wrap items-center justify-center gap-x-12 gap-y-8", rowClassName)}>
          {firstRow.map((company, index) => renderCompanyLogo(company, index))}
        </div>
        <div className={cn("flex flex-wrap items-center justify-center gap-x-12 gap-y-8", rowClassName)}>
          {secondRow.map((company, index) => renderCompanyLogo(company, index + firstRow.length))}
        </div>
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      {heading && (
        typeof heading === "string" ? (
          <p className={cn("mb-12 text-center text-lg text-muted-foreground", headingClassName)}>
            {heading}
          </p>
        ) : (
          <div className={headingClassName}>{heading}</div>
        )
      )}
      {renderCompanies()}
    </Section>
  );
}
