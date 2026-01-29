"use client";

import * as React from "react";
import { cn, getNestedCardBg, getNestedCardTextColor, getTextColor, getAccentColor } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
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
export interface TeamBioBadgesSocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamBioBadges
 */
export interface TeamBioBadgesMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  avatar: string;
  social?: TeamBioBadgesSocialLinks;
}

/**
 * Props for TeamBioBadges component
 */
export interface TeamBioBadgesProps {
  /**
   * Section heading
   * @default "Team"
   */
  heading?: React.ReactNode;
  /**
   * Section description
   */
  description?: React.ReactNode;
  /**
   * Array of team members to display
   */
  members?: TeamBioBadgesMember[];
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
   * Additional CSS classes for the avatar
   */
  avatarClassName?: string;
  /**
   * Additional CSS classes for the member name
   */
  memberNameClassName?: string;
  /**
   * Additional CSS classes for the member role
   */
  memberRoleClassName?: string;
  /**
   * Additional CSS classes for the department badge
   */
  departmentBadgeClassName?: string;
  /**
   * Additional CSS classes for the member bio
   */
  memberBioClassName?: string;
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
 * TeamBioBadges - Team grid with bios, department badges, and social links
 *
 * A comprehensive team section featuring member cards with detailed bios and
 * department badges. Each card displays an avatar, name, role, department badge,
 * biographical text, and social media links. Ideal for showcasing leadership teams
 * or key personnel where background information adds credibility.
 *
 * @example
 * ```tsx
 * <TeamBioBadges
 *   heading="Leadership Team"
 *   description="The visionaries guiding our company"
 *   members={[
 *     {
 *       id: "1",
 *       name: "Jane Smith",
 *       role: "CEO",
 *       department: "Executive",
 *       bio: "20 years of industry experience...",
 *       avatar: "/avatars/jane.jpg",
 *       social: { linkedin: "https://linkedin.com/in/jane" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamBioBadges({
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
  avatarClassName,
  memberNameClassName,
  memberRoleClassName,
  departmentBadgeClassName,
  memberBioClassName,
  socialLinksClassName,
}: TeamBioBadgesProps): React.JSX.Element {
  const renderMembers = React.useMemo(() => {
    if (membersSlot) return membersSlot;
    if (!members || members.length === 0) return null;

    return members.map((member) => (
      <div
        key={member.id}
        className={cn(
          "flex flex-col gap-4 rounded-xl border border-border p-6 sm:flex-row",
          getNestedCardBg(background, 'card'),
          getNestedCardTextColor(background),
          memberCardClassName,
        )}
      >
        <Avatar className={cn("size-24 shrink-0 border", avatarClassName)}>
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback className="text-xl font-bold">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className={cn("text-lg font-semibold", memberNameClassName)}>
              {member.name}
            </h3>
            <Badge variant="secondary" className={departmentBadgeClassName}>
              {member.department}
            </Badge>
          </div>
          <p
            className={cn(
              "text-sm font-medium",
              getAccentColor(background),
              memberRoleClassName,
            )}
          >
            {member.role}
          </p>
          <p
            className={cn(
              "mt-2 text-sm",
              getTextColor(background, "muted"),
              memberBioClassName,
            )}
          >
            {member.bio}
          </p>
          {member.social && (
            <div
              className={cn(
                "mt-4 flex gap-3",
                getTextColor(background, "muted"),
                socialLinksClassName,
              )}
            >
              {member.social.github && (
                <Pressable
                  href={member.social.github}
                  className="transition-colors"
                  aria-label={`${member.name}'s GitHub`}
                >
                  <DynamicIcon name="lucide/github" size={18} />
                </Pressable>
              )}
              {member.social.twitter && (
                <Pressable
                  href={member.social.twitter}
                  className="transition-colors"
                  aria-label={`${member.name}'s Twitter`}
                >
                  <DynamicIcon name="lucide/twitter" size={18} />
                </Pressable>
              )}
              {member.social.linkedin && (
                <Pressable
                  href={member.social.linkedin}
                  className="transition-colors"
                  aria-label={`${member.name}'s LinkedIn`}
                >
                  <DynamicIcon name="lucide/linkedin" size={18} />
                </Pressable>
              )}
            </div>
          )}
        </div>
      </div>
    ));
  }, [
    membersSlot,
    members,
    background,
    memberCardClassName,
    avatarClassName,
    memberNameClassName,
    departmentBadgeClassName,
    memberRoleClassName,
    memberBioClassName,
    socialLinksClassName,
  ]);

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
          "flex flex-col items-center text-center",
          headerClassName,
        )}
      >
        {heading &&
          (typeof heading === "string" ? (
            <h2
              className={cn(
                "my-6 text-2xl font-bold text-pretty lg:text-4xl",
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
                "mb-8 max-w-3xl lg:text-xl",
                getTextColor(background, "muted"),
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          ))}
      </div>
      <div className={cn("mt-16 grid gap-8 md:grid-cols-2", gridClassName)}>
        {renderMembers}
      </div>
    </Section>
  );
}
