"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Container } from "../../ui/container";
import { Section } from "../../ui/section";
import { Img } from "@page-speed/img";
import { Separator } from "../../ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
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
 * Individual team member for TeamCarouselExperience
 */
export interface TeamCarouselExperienceMember {
  name: string;
  image: string;
  role: string;
  yearsOfExperience: number;
}

/**
 * Props for TeamCarouselExperience component
 */
export interface TeamCarouselExperienceProps {
  /**
   * Section heading
   * @default "Tech Pioneers"
   */
  heading?: string;
  /**
   * Heading highlight text (displayed in muted color)
   * @default "building the future"
   */
  headingHighlight?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Array of team members to display
   */
  members?: TeamCarouselExperienceMember[];
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

const defaultMembers: TeamCarouselExperienceMember[] = [
  {
    name: "John Smith",
    image: blockBrandedIconsAndPlaceholders.avatar1,
    role: "CEO",
    yearsOfExperience: 15,
  },
  {
    name: "Sarah Johnson",
    image: blockBrandedIconsAndPlaceholders.avatar2,
    role: "Lead Designer",
    yearsOfExperience: 8,
  },
  {
    name: "Michael Chen",
    image: blockBrandedIconsAndPlaceholders.avatar3,
    role: "Senior Engineer",
    yearsOfExperience: 10,
  },
  {
    name: "Emily Brown",
    image: blockBrandedIconsAndPlaceholders.avatar4,
    role: "Marketing Director",
    yearsOfExperience: 12,
  },
  {
    name: "David Wilson",
    image: blockBrandedIconsAndPlaceholders.avatar5,
    role: "Sales Manager",
    yearsOfExperience: 7,
  },
  {
    name: "Jessica Lee",
    image: blockBrandedIconsAndPlaceholders.avatar6,
    role: "Customer Success Lead",
    yearsOfExperience: 5,
  },
  {
    name: "Robert Taylor",
    image: blockBrandedIconsAndPlaceholders.avatar7,
    role: "CTO",
    yearsOfExperience: 20,
  },
  {
    name: "Amanda Martinez",
    image: blockBrandedIconsAndPlaceholders.avatar8,
    role: "Product Designer",
    yearsOfExperience: 6,
  },
];

/**
 * TeamCarouselExperience - Horizontal carousel with experience indicators
 *
 * A dynamic team section featuring a horizontal carousel of member cards.
 * Each card displays a photo, name, role, and years of experience with a
 * gradient separator. Includes navigation arrows for browsing through team
 * members. Ideal for larger teams where you want an interactive browsing
 * experience without overwhelming the page.
 *
 * @example
 * ```tsx
 * <TeamCarouselExperience
 *   heading="Our Team"
 *   headingHighlight="of experts"
 *   description="Meet the talented individuals driving our success"
 *   members={[
 *     {
 *       name: "Jane Doe",
 *       image: "/team/jane.jpg",
 *       role: "CEO",
 *       yearsOfExperience: 15
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamCarouselExperience({
  heading = "Tech Pioneers",
  headingHighlight = "building the future",
  description = "We bring together brilliant developers, engineers, and tech innovators to create groundbreaking digital solutions.",
  members = defaultMembers,
  background = "white",
  verticalMargin = "lg",
  className,
  optixFlowConfig,
}: TeamCarouselExperienceProps): React.JSX.Element {
  return (
    <Section
      background={background}
      spacing={verticalMargin}
      className={cn("overflow-hidden", className)}
    >
      <Container>
        <h2 className="text-5xl font-medium md:text-6xl">
          {heading} <br />
          <span className="text-primary/50">{headingHighlight}</span>
        </h2>
        {description && (
          <p className="mt-6 max-w-md text-muted-foreground">{description}</p>
        )}
        <Carousel>
          <div className="mt-4 hidden items-center justify-end gap-4 md:flex">
            <CarouselPrevious className="static size-11 translate-x-0 translate-y-0" />
            <CarouselNext className="static size-11 translate-x-0 translate-y-0" />
          </div>
          <div className="mt-16 [&>div[data-slot=carousel-content]]:overflow-visible">
            <CarouselContent className="max-w-[min(calc(100vw-4rem),24rem)] select-none">
              {members.map((member, idx) => (
                <CarouselItem key={idx} className="max-w-72">
                  <div className="rounded-2xl border border-border bg-background p-7 text-center">
                    <Img
                      src={member.image}
                      alt={member.name}
                      className="mx-auto size-20 rounded-full border border-border"
                      optixFlowConfig={optixFlowConfig}
                    />
                    <div className="mt-6 flex flex-col justify-center">
                      <p className="text-lg font-medium text-primary">
                        {member.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                    <Separator className="my-6 bg-gradient-to-r from-background via-border to-background" />
                    <p className="text-sm text-muted-foreground">
                      {member.yearsOfExperience}+ years of experience
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </div>
        </Carousel>
      </Container>
    </Section>
  );
}
