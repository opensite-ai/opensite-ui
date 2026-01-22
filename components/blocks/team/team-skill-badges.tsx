"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
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
 * Social links for team member
 */
export interface TeamSkillBadgesSocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamSkillBadges
 */
export interface TeamSkillBadgesMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  social?: TeamSkillBadgesSocialLinks;
}

/**
 * Props for TeamSkillBadges component
 */
export interface TeamSkillBadgesProps {
  /**
   * Section heading
   * @default "Meet our experts"
   */
  heading?: React.ReactNode;
  /**
   * Section description
   */
  description?: React.ReactNode;
  /**
   * Array of team members to display
   */
  members?: TeamSkillBadgesMember[];
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
   * Additional CSS classes for the member bio
   */
  memberBioClassName?: string;
  /**
   * Additional CSS classes for the skills container
   */
  skillsClassName?: string;
  /**
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * TeamSkillBadges - Team cards with skill/expertise badges
 *
 * A professional team section featuring cards with circular avatars, member
 * details, and skill badges. Each card displays a centered avatar with a
 * decorative ring, name, role, bio, skill badges, and social links. The skill
 * badges highlight each member's areas of expertise. Ideal for showcasing
 * technical teams or consultants where skills are important differentiators.
 *
 * @example
 * ```tsx
 * <TeamSkillBadges
 *   heading="Our Experts"
 *   description="The skilled professionals behind our success"
 *   members={[
 *     {
 *       name: "John Doe",
 *       role: "Senior Engineer",
 *       bio: "Full-stack developer with 10 years experience",
 *       image: "/avatars/john.jpg",
 *       skills: ["React", "Node.js", "AWS", "TypeScript"],
 *       social: { github: "https://github.com/john" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamSkillBadges({
  heading,
  description,
  members,
  membersSlot,
  background = "white",
  spacing = "lg",
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
  memberBioClassName,
  skillsClassName,
  socialLinksClassName,
  optixFlowConfig,
}: TeamSkillBadgesProps): React.JSX.Element {
  const renderMembers = () => {
    if (membersSlot) return membersSlot;
    if (!members || members.length === 0) return null;

    return members.map((member) => (
      <Card
        key={member.name}
        className={cn("group relative pt-0", memberCardClassName)}
      >
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="relative inline-block">
              <div
                className={cn(
                  "border-background ring-primary/10 size-32 rounded-full border-4 ring-4",
                  memberImageClassName,
                )}
              >
                <Img
                  className="rounded-full"
                  src={member.image}
                  alt={member.name}
                  width={128}
                  height={128}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className={cn("text-lg font-medium", memberNameClassName)}>
                {member.name}
              </h3>
              <p
                className={cn(
                  "text-muted-foreground text-sm",
                  memberRoleClassName,
                )}
              >
                {member.role}
              </p>
              <p
                className={cn(
                  "text-muted-foreground text-sm",
                  memberBioClassName,
                )}
              >
                {member.bio}
              </p>
            </div>
            <div
              className={cn(
                "mt-6 flex flex-wrap justify-center gap-2",
                skillsClassName,
              )}
            >
              {member.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
            {member.social && (
              <div
                className={cn(
                  "mt-6 flex justify-center gap-2",
                  socialLinksClassName,
                )}
              >
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
        </CardContent>
      </Card>
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
                "text-muted-foreground mt-1 text-lg",
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
        className={cn(
          "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {renderMembers()}
      </div>
    </Section>
  );
}
