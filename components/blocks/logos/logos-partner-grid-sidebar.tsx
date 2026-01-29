"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

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
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * LogosPartnerGridSidebar - A partner grid with sticky sidebar timeline.
 * Features a sticky sidebar with year milestones and a responsive partner logo grid.
 */
export function LogosPartnerGridSidebar({
  className,
  sidebarTitle,
  sidebarTitleClassName,
  sidebarDescription,
  sidebarDescriptionClassName,
  sidebarClassName,
  yearSections,
  yearSectionsSlot,
  yearSectionsClassName,
  yearSectionItemClassName,
  partners,
  partnersSlot,
  partnersClassName,
  partnerCardClassName,
  gridClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: LogosPartnerGridSidebarProps): React.JSX.Element {
  const renderYearSections = useMemo(() => {
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
              section.className,
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
  }, [yearSections, yearSectionsSlot, yearSectionsClassName, yearSectionItemClassName]);

  const renderPartners = useMemo(() => {
    if (partnersSlot) return partnersSlot;
    if (!partners || partners.length === 0) return null;

    return partners.map((partner, index) => (
      <div
        key={index}
        className={cn(
          "flex items-center justify-center rounded-lg border border-border p-6 transition-colors hover:bg-accent",
          getNestedCardBg(background, 'card'),
          getNestedCardTextColor(background),
          partnerCardClassName,
          partner.className,
        )}
      >
        <Img
          src={partner.logo}
          alt={`${partner.name} logo`}
          width={80}
          height={40}
          className={cn(
            "h-10 w-auto object-contain grayscale transition-all hover:grayscale-0",
            partner.imgClassName,
          )}
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    ));
  }, [partners, partnersSlot, partnerCardClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div
        className={cn("grid gap-12 lg:grid-cols-3 lg:gap-16", gridClassName)}
      >
        <div
          className={cn("lg:sticky lg:top-32 lg:self-start", sidebarClassName)}
        >
          {sidebarTitle &&
            (typeof sidebarTitle === "string" ? (
              <h2
                className={cn(
                  "mb-4 text-3xl font-bold md:text-4xl",
                  sidebarTitleClassName,
                )}
              >
                {sidebarTitle}
              </h2>
            ) : (
              <div className={sidebarTitleClassName}>{sidebarTitle}</div>
            ))}
          {sidebarDescription &&
            (typeof sidebarDescription === "string" ? (
              <p
                className={cn(
                  "mb-8 text-lg text-muted-foreground",
                  sidebarDescriptionClassName,
                )}
              >
                {sidebarDescription}
              </p>
            ) : (
              <div className={sidebarDescriptionClassName}>
                {sidebarDescription}
              </div>
            ))}
          {renderYearSections}
        </div>
        <div className="lg:col-span-2">
          <div
            className={cn(
              "grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4",
              partnersClassName,
            )}
          >
            {renderPartners}
          </div>
        </div>
      </div>
    </Section>
  );
}
