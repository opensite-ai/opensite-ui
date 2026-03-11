"use client";

import * as React from "react";
import { cn, getTextColor, getAccentColor } from "../../../lib/utils";
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
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

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
  heading?: React.ReactNode;
  /**
   * Heading highlight text (displayed in muted color)
   * @default "building the future"
   */
  headingHighlight?: React.ReactNode;
  /**
   * Section description
   */
  description?: React.ReactNode;
  /**
   * Array of team members to display
   */
  members?: TeamCarouselExperienceMember[];
  /**
   * Custom slot for rendering members (overrides members array)
   */
  membersSlot?: React.ReactNode;
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
  pattern?: PatternName | undefined;
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
   * Additional CSS classes for the heading highlight
   */
  headingHighlightClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the carousel container
   */
  carouselClassName?: string;
  /**
   * Additional CSS classes for each member card
   */
  memberCardClassName?: string;
  /**
   * Additional CSS classes for the member image
   */
  memberImageClassName?: string;
  /**
   * Additional CSS classes for the member name
   */
  memberNameClassName?: string;
  /**
   * Additional CSS classes for the member role
   */
  memberRoleClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

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
  sectionId = "team-carousel-experience",
  heading,
  headingHighlight,
  description,
  members,
  membersSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  headingClassName,
  headingHighlightClassName,
  descriptionClassName,
  carouselClassName,
  memberCardClassName,
  memberImageClassName,
  memberNameClassName,
  memberRoleClassName,
  optixFlowConfig,
}: TeamCarouselExperienceProps): React.JSX.Element {
  const renderMembers = React.useMemo(() => {
    if (membersSlot) return membersSlot;
    if (!members || members.length === 0) return null;

    return members.map((member, idx) => (
      <CarouselItem key={idx} className="max-w-72">
        <div
          className={cn(
            "rounded-2xl border border-border bg-background p-7 text-center",
            memberCardClassName,
          )}
        >
          <Img
            src={member.image}
            alt={member.name}
            className={cn(
              "mx-auto size-20 rounded-full border border-border",
              memberImageClassName,
            )}
            optixFlowConfig={optixFlowConfig}
          />
          <div className="mt-6 flex flex-col justify-center">
            <p
              className={cn(
                "text-lg font-medium",
                getAccentColor(background),
                memberNameClassName,
              )}
            >
              {member.name}
            </p>
            <p
              className={cn(
                "text-sm",
                getTextColor(background, "muted"),
                memberRoleClassName,
              )}
            >
              {member.role}
            </p>
          </div>
          <Separator className="my-6 bg-linear-to-r from-background via-border to-background" />
          <p className={cn("text-sm", getTextColor(background, "muted"))}>
            {member.yearsOfExperience}+ years of experience
          </p>
        </div>
      </CarouselItem>
    ));
  }, [membersSlot, members, memberCardClassName, memberImageClassName, optixFlowConfig, memberNameClassName, memberRoleClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("overflow-hidden", className)}
    >
      {heading &&
        (typeof heading === "string" ? (
          <h2
            className={cn("text-5xl font-medium md:text-6xl", headingClassName)}
          >
            {heading} <br />
            {headingHighlight &&
              (typeof headingHighlight === "string" ? (
                <span
                  className={cn(`${getAccentColor(background)}/50`, headingHighlightClassName)}
                >
                  {headingHighlight}
                </span>
              ) : (
                <span className={headingHighlightClassName}>
                  {headingHighlight}
                </span>
              ))}
          </h2>
        ) : (
          <div className={headingClassName}>{heading}</div>
        ))}
      {description &&
        (typeof description === "string" ? (
          <p
            className={cn(
              "mt-6 max-w-md",
              getTextColor(background, "muted"),
              descriptionClassName,
            )}
          >
            {description}
          </p>
        ) : (
          <div className={descriptionClassName}>{description}</div>
        ))}
      <Carousel className={carouselClassName}>
        <div className="mt-4 hidden items-center justify-end gap-4 md:flex">
          <CarouselPrevious className="static size-11 translate-x-0 translate-y-0" />
          <CarouselNext className="static size-11 translate-x-0 translate-y-0" />
        </div>
        <div className="mt-16 [&>div[data-slot=carousel-content]]:overflow-visible">
          <CarouselContent className="max-w-[min(calc(100vw-4rem),24rem)] select-none">
            {renderMembers}
          </CarouselContent>
        </div>
      </Carousel>
    </Section>
  );
}
