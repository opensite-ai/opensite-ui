"use client";

import * as React from "react";
import { cn, getTextColor, getAccentColor } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Card, CardContent } from "../../ui/card";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

/**
 * Stats for team member
 */
export interface TeamTestimonialStatsStats {
  years?: string;
  projects?: string;
  clients?: string;
  awards?: string;
}

/**
 * Social links for team member
 */
export interface TeamTestimonialStatsSocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamTestimonialStats
 */
export interface TeamTestimonialStatsMember {
  name: string;
  role: string;
  testimonial: string;
  image: string;
  stats: TeamTestimonialStatsStats;
  social?: TeamTestimonialStatsSocialLinks;
}

/**
 * Props for TeamTestimonialStats component
 */
export interface TeamTestimonialStatsProps {
  /**
   * Section heading
   * @default "Meet our leadership"
   */
  heading?: React.ReactNode;
  /**
   * Section description
   */
  description?: React.ReactNode;
  /**
   * Array of team members to display
   */
  members?: TeamTestimonialStatsMember[];
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
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the grid container
   */
  gridClassName?: string;
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
   * Additional CSS classes for the stats container
   */
  statsClassName?: string;
  /**
   * Additional CSS classes for the testimonial
   */
  testimonialClassName?: string;
  /**
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * TeamTestimonialStats - Split cards with testimonials and achievement stats
 *
 * A premium team section featuring horizontal cards split between a large image
 * and content area. Each card displays a full-height member photo on one side,
 * with name, role, achievement stats (years, projects, clients, awards), a
 * testimonial quote with quote icon, and social links on the other side.
 * Ideal for showcasing leadership with credibility-building metrics.
 *
 * @example
 * ```tsx
 * <TeamTestimonialStats
 *   heading="Our Leadership"
 *   description="The talented individuals guiding our vision"
 *   members={[
 *     {
 *       name: "Jane Doe",
 *       role: "CEO",
 *       testimonial: "Building the future of technology",
 *       image: "/team/jane.jpg",
 *       stats: { years: "15+", projects: "100+", clients: "50+" },
 *       social: { linkedin: "https://linkedin.com/in/jane" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamTestimonialStats({
  sectionId = "team-testimonial-stats",
  heading,
  description,
  members,
  membersSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  memberCardClassName,
  memberImageClassName,
  memberNameClassName,
  memberRoleClassName,
  statsClassName,
  testimonialClassName,
  socialLinksClassName,
  optixFlowConfig,
}: TeamTestimonialStatsProps): React.JSX.Element {
  const renderMembers = React.useMemo(() => {
    if (membersSlot) return membersSlot;
    if (!members || members.length === 0) return null;

    return members.map((member) => (
      <Card
        key={member.name}
        className={cn("overflow-hidden p-0", memberCardClassName)}
      >
        <CardContent className="p-0!">
          <div className="grid sm:grid-cols-2">
            <div className="relative h-full min-h-[200px]">
              <Img
                className={cn(
                  "absolute inset-0 h-full w-full object-cover",
                  memberImageClassName,
                )}
                src={member.image}
                alt={member.name}
                width={320}
                height={420}
                optixFlowConfig={optixFlowConfig}
              />
            </div>
            <div className="p-6">
              <div className="flex h-full flex-col">
                <div>
                  <h3
                    className={cn("text-lg font-medium", memberNameClassName)}
                  >
                    {member.name}
                  </h3>
                  <p
                    className={cn(
                      getTextColor(background, "muted"),
                      "mt-1 text-sm",
                      memberRoleClassName,
                    )}
                  >
                    {member.role}
                  </p>
                </div>

                <div
                  className={cn("grid grid-cols-3 gap-4 py-6", statsClassName)}
                >
                  {Object.entries(member.stats).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-2xl font-semibold">{value}</p>
                      <p className={cn(getTextColor(background, "muted"), "mt-1 text-xs capitalize")}>
                        {key}
                      </p>
                    </div>
                  ))}
                </div>

                <blockquote
                  className={cn(
                    getTextColor(background, "muted"),
                    "mt-4 border-l-2 pl-4 italic",
                    testimonialClassName,
                  )}
                >
                  <DynamicIcon
                    name="lucide/quote"
                    size={16}
                    className={cn(getAccentColor(background), "mb-2")}
                  />
                  {member.testimonial}
                </blockquote>

                {member.social && (
                  <div className={cn("mt-6 flex gap-2", socialLinksClassName)}>
                    {member.social.twitter && (
                      <Pressable
                        href={member.social.twitter}
                        variant="ghost"
                        size="icon"
                        asButton
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <DynamicIcon name="lucide/twitter" size={16} />
                      </Pressable>
                    )}
                    {member.social.github && (
                      <Pressable
                        href={member.social.github}
                        variant="ghost"
                        size="icon"
                        asButton
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <DynamicIcon name="lucide/github" size={16} />
                      </Pressable>
                    )}
                    {member.social.linkedin && (
                      <Pressable
                        href={member.social.linkedin}
                        variant="ghost"
                        size="icon"
                        asButton
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <DynamicIcon name="lucide/linkedin" size={16} />
                      </Pressable>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  }, [
    membersSlot,
    members,
    memberCardClassName,
    memberImageClassName,
    optixFlowConfig,
    memberNameClassName,
    memberRoleClassName,
    statsClassName,
    testimonialClassName,
    socialLinksClassName,
  ]);

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
          "mx-auto mb-10 max-w-2xl text-center lg:mb-14",
          headerClassName,
        )}
      >
        {heading &&
          (typeof heading === "string" ? (
            <h2
              className={cn(
                "text-3xl font-bold md:text-4xl md:leading-tight",
                headingClassName,
              )}
            >
              {heading}
            </h2>
          ) : (
            <div className={headingClassName}>{heading}</div>
          ))}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn(
                getTextColor(background, "muted"),
                "mt-1 text-lg",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          ))}
      </div>

      <div
        className={cn("grid grid-cols-1 gap-8 lg:grid-cols-2", gridClassName)}
      >
        {renderMembers}
      </div>
    </Section>
  );
}
