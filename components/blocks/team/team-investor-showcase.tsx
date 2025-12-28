"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Container } from "../../ui/container";
import { Section } from "../../ui/section";
import { Img } from "@page-speed/img";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

/**
 * Configuration for Optix Flow image optimization
 */
export interface OptixFlowConfig {
  apiKey: string;
  compression?: number;
}

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
  heading?: string;
  /**
   * Array of investors to display
   */
  investors?: TeamInvestorShowcaseMember[];
  /**
   * Background style variant for the section
   * @default "white"
   */
  background?: SectionBackground;
  /**
   * Vertical spacing/margin variant
   * @default "lg"
   */
  verticalMargin?: SectionSpacing;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultInvestors: TeamInvestorShowcaseMember[] = [
  {
    name: "Dennis Bouvard",
    company: "Blackbird Ventures",
    image: blockBrandedIconsAndPlaceholders.avatar1,
  },
  {
    name: "Renatus Gerard",
    company: "Center Studies",
    image: blockBrandedIconsAndPlaceholders.avatar2,
  },
  {
    name: "Leslie Alexander",
    company: "TechNexus",
    image: blockBrandedIconsAndPlaceholders.avatar3,
  },
  {
    name: "Matthew Stephens",
    company: "Etymol Cap",
    image: blockBrandedIconsAndPlaceholders.avatar4,
  },
  {
    name: "Josephine Newman",
    company: "Vandenberg",
    image: blockBrandedIconsAndPlaceholders.avatar5,
  },
];

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
  heading = "Our investors",
  investors = defaultInvestors,
  background = "white",
  verticalMargin = "lg",
  className,
  optixFlowConfig,
}: TeamInvestorShowcaseProps): React.JSX.Element {
  return (
    <Section
      background={background}
      spacing={verticalMargin}
      className={className}
    >
      <Container>
        <h2 className="text-4xl font-medium tracking-wide text-primary">
          {heading}
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {investors.map((investor) => (
            <div key={investor.name}>
              <Img
                src={investor.image}
                alt={investor.name}
                width={120}
                height={120}
                className="rounded-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
              <h3 className="mt-3 font-semibold">{investor.name}</h3>
              <p className="text-muted-foreground">{investor.company}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
