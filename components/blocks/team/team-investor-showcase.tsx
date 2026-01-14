"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Img } from "@page-speed/img";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

/**
 * Individual investor for TeamInvestorShowcase
 */
export interface TeamInvestorShowcaseMember {
  name: string;
  company: string;
  image: string;
}

/**
 * Props for TeamInvestorShowcase component
 */
export interface TeamInvestorShowcaseProps {
  /**
   * Section heading
   * @default "Our investors"
   */
  heading?: React.ReactNode;
  /**
   * Array of investors to display
   */
  investors?: TeamInvestorShowcaseMember[];
  /**
   * Custom slot for rendering investors (overrides investors array)
   */
  investorsSlot?: React.ReactNode;
  /**
   * Background style variant for the section
   * @default "white"
   */
  background?: SectionBackground;
  /**
   * Vertical spacing/margin variant
   * @default "lg"
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
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the grid container
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each investor card
   */
  investorCardClassName?: string;
  /**
   * Additional CSS classes for the investor image
   */
  investorImageClassName?: string;
  /**
   * Additional CSS classes for the investor name
   */
  investorNameClassName?: string;
  /**
   * Additional CSS classes for the investor company
   */
  investorCompanyClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * TeamInvestorShowcase - Investor/advisor grid with company affiliations
 *
 * A clean, horizontal grid layout for showcasing investors, advisors, or board
 * members. Each entry displays a circular photo, name, and company/firm affiliation.
 * Features a prominent heading with primary color styling. Perfect for startup
 * pages highlighting their backers or advisory board.
 *
 * @example
 * ```tsx
 * <TeamInvestorShowcase
 *   heading="Our Investors"
 *   investors={[
 *     {
 *       name: "John Smith",
 *       company: "Acme Ventures",
 *       image: "/investors/john.jpg"
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamInvestorShowcase({
  heading,
  investors,
  investorsSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  headingClassName,
  gridClassName,
  investorCardClassName,
  investorImageClassName,
  investorNameClassName,
  investorCompanyClassName,
  optixFlowConfig,
}: TeamInvestorShowcaseProps): React.JSX.Element {
  const renderInvestors = () => {
    if (investorsSlot) return investorsSlot;
    if (!investors || investors.length === 0) return null;

    return investors.map((investor) => (
      <div key={investor.name} className={investorCardClassName}>
        <Img
          src={investor.image}
          alt={investor.name}
          width={120}
          height={120}
          className={cn("rounded-full object-cover", investorImageClassName)}
          optixFlowConfig={optixFlowConfig}
        />
        <h3 className={cn("mt-3 font-semibold", investorNameClassName)}>
          {investor.name}
        </h3>
        <p className={cn("text-muted-foreground", investorCompanyClassName)}>
          {investor.company}
        </p>
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
      {heading && (
        typeof heading === "string" ? (
          <h2
            className={cn(
              "text-4xl font-medium tracking-wide text-primary",
              headingClassName
            )}
          >
            {heading}
          </h2>
        ) : (
          <div className={headingClassName}>{heading}</div>
        )
      )}
      <div
        className={cn(
          "mt-8 grid grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
          gridClassName
        )}
      >
        {renderInvestors()}
      </div>
    </Section>
  );
}
