"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface LogosPartnerGridSidebarYearSection {
  /**
   * Year label
   */
  year: string;
  /**
   * Description for the year milestone
   */
  description: string;
  /**
   * Additional CSS classes for the year section
   */
  className?: string;
}

export interface LogosPartnerGridSidebarPartnerItem {
  /**
   * Partner/company name
   */
  name: string;
  /**
   * Logo image URL
   */
  logo: string;
  /**
   * Additional CSS classes for the partner card
   */
  className?: string;
  /**
   * Additional CSS classes for the logo image
   */
  imgClassName?: string;
}

export interface LogosPartnerGridSidebarProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Sidebar title/heading
   */
  sidebarTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the sidebar title
   */
  sidebarTitleClassName?: string;
  /**
   * Sidebar description text
   */
  sidebarDescription?: React.ReactNode;
  /**
   * Additional CSS classes for the sidebar description
   */
  sidebarDescriptionClassName?: string;
  /**
   * Additional CSS classes for the sidebar container
   */
  sidebarClassName?: string;
  /**
   * Array of year milestone sections
   */
  yearSections?: LogosPartnerGridSidebarYearSection[];
  /**
   * Custom slot for rendering year sections (overrides yearSections array)
   */
  yearSectionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the year sections container
   */
  yearSectionsClassName?: string;
  /**
   * Additional CSS classes for each year section item
   */
  yearSectionItemClassName?: string;
  /**
   * Array of partner configurations
   */
  partners?: LogosPartnerGridSidebarPartnerItem[];
  /**
   * Custom slot for rendering partners (overrides partners array)
   */
  partnersSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the partners grid container
   */
  partnersClassName?: string;
  /**
   * Additional CSS classes for each partner card
   */
  partnerCardClassName?: string;
  /**
   * Additional CSS classes for the main grid layout
   */
  gridClassName?: string;
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

const defaultYearSections: LogosPartnerGridSidebarYearSection[] = [
  {
    year: "2020",
    description: "Started with 10 founding partners who believed in our vision.",
  },
  {
    year: "2022",
    description: "Expanded to 50+ partners across multiple industries.",
  },
  {
    year: "2024",
    description: "Now serving 200+ partners globally with enterprise solutions.",
  },
];

const defaultPartners: LogosPartnerGridSidebarPartnerItem[] = [
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
  {
    name: "Partner 6",
    logo: "https://cdn.ing/assets/files/record/286249/ff7m4wdw0zefj7d96v4ajmljuifc",
  },
  {
    name: "Partner 7",
    logo: "https://cdn.ing/assets/files/record/286220/t34kymqu5g9xr85o89cji3kfuypb",
  },
  {
    name: "Partner 8",
    logo: "https://cdn.ing/assets/files/record/286251/c64yb2c255uig6vpe4gdlnten7rv",
  },
  {
    name: "Partner 9",
    logo: "https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb",
  },
  {
    name: "Partner 10",
    logo: "https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5",
  },
  {
    name: "Partner 11",
    logo: "https://cdn.ing/assets/files/record/286214/pn9v9zz0de8jgz2mf8o1c11k8gxh",
  },
  {
    name: "Partner 12",
    logo: "https://cdn.ing/assets/files/record/286235/x4po9fpjkd6cdxnfxaqya6emwvea",
  },
];

/**
 * LogosPartnerGridSidebar - A partner grid with sticky sidebar timeline.
 * Features a sticky sidebar with year milestones and a responsive partner logo grid.
 */
export function LogosPartnerGridSidebar({
  className,
  sidebarTitle = "Our Partners",
  sidebarTitleClassName,
  sidebarDescription = "We've partnered with industry leaders to deliver exceptional value to our customers.",
  sidebarDescriptionClassName,
  sidebarClassName,
  yearSections = defaultYearSections,
  yearSectionsSlot,
  yearSectionsClassName,
  yearSectionItemClassName,
  partners = defaultPartners,
  partnersSlot,
  partnersClassName,
  partnerCardClassName,
  gridClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: LogosPartnerGridSidebarProps): React.JSX.Element {
  const renderYearSections = () => {
    if (yearSectionsSlot) return yearSectionsSlot;
    if (!yearSections || yearSections.length === 0) return null;

    return (
      <div className={cn("space-y-6", yearSectionsClassName)}>
        {yearSections.map((section, index) => (
          <div
            key={index}
            className={cn(
              "border-l-2 border-primary pl-4",
              yearSectionItemClassName,
              section.className
            )}
          >
            <p className="font-semibold text-primary">{section.year}</p>
            <p className="text-sm text-muted-foreground">
              {section.description}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderPartners = () => {
    if (partnersSlot) return partnersSlot;
    if (!partners || partners.length === 0) return null;

    return partners.map((partner, index) => (
      <div
        key={index}
        className={cn(
          "flex items-center justify-center rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent",
          partnerCardClassName,
          partner.className
        )}
      >
        <Img
          src={partner.logo}
          alt={`${partner.name} logo`}
          width={80}
          height={40}
          className={cn(
            "h-10 w-auto object-contain grayscale transition-all hover:grayscale-0",
            partner.imgClassName
          )}
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
      <div className={cn("grid gap-12 lg:grid-cols-3 lg:gap-16", gridClassName)}>
        <div className={cn("lg:sticky lg:top-32 lg:self-start", sidebarClassName)}>
          {sidebarTitle && (
            typeof sidebarTitle === "string" ? (
              <h2 className={cn("mb-4 text-3xl font-bold md:text-4xl", sidebarTitleClassName)}>
                {sidebarTitle}
              </h2>
            ) : (
              <div className={sidebarTitleClassName}>{sidebarTitle}</div>
            )
          )}
          {sidebarDescription && (
            typeof sidebarDescription === "string" ? (
              <p className={cn("mb-8 text-lg text-muted-foreground", sidebarDescriptionClassName)}>
                {sidebarDescription}
              </p>
            ) : (
              <div className={sidebarDescriptionClassName}>{sidebarDescription}</div>
            )
          )}
          {renderYearSections()}
        </div>
        <div className="lg:col-span-2">
          <div className={cn("grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4", partnersClassName)}>
            {renderPartners()}
          </div>
        </div>
      </div>
    </Section>
  );
}
