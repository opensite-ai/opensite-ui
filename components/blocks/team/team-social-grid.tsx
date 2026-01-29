"use client";

import * as React from "react";
import { cn, getTextColor } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
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
export interface TeamSocialGridSocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamSocialGrid
 */
export interface TeamSocialGridMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  social?: TeamSocialGridSocialLinks;
}

/**
 * Props for TeamSocialGrid component
 */
export interface TeamSocialGridProps {
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
  members?: TeamSocialGridMember[];
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
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * TeamSocialGrid - Team grid with social media links
 *
 * A team section displaying members in a responsive grid with social media icons.
 * Each member card shows an avatar, name, role, and links to their GitHub, Twitter,
 * and LinkedIn profiles. Perfect for tech teams or companies that want to highlight
 * their team's online presence.
 *
 * @example
 * ```tsx
 * <TeamSocialGrid
 *   heading="Meet Our Team"
 *   description="The talented people behind our product"
 *   members={[
 *     {
 *       id: "1",
 *       name: "Jane Doe",
 *       role: "Lead Developer",
 *       avatar: "/avatars/jane.jpg",
 *       social: { github: "https://github.com/jane", twitter: "https://twitter.com/jane" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamSocialGrid({
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
  socialLinksClassName,
}: TeamSocialGridProps): React.JSX.Element {
  const renderMembers = React.useMemo(() => {
    if (membersSlot) return membersSlot;
    if (!members || members.length === 0) return null;

    return members.map((member) => (
      <div
        key={member.id}
        className={cn("flex flex-col items-center", memberCardClassName)}
      >
        <Avatar
          className={cn(
            "mb-4 size-20 border md:mb-5 lg:size-24",
            avatarClassName,
          )}
        >
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback>
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <p className={cn("text-center font-medium", memberNameClassName)}>
          {member.name}
        </p>
        <p
          className={cn(
            "text-center",
            getTextColor(background, "muted"),
            memberRoleClassName,
          )}
        >
          {member.role}
        </p>
        {member.social && (
          <div
            className={cn(
              "mt-2 flex gap-2",
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
                <DynamicIcon name="lucide/github" size={20} />
              </Pressable>
            )}
            {member.social.twitter && (
              <Pressable
                href={member.social.twitter}
                className="transition-colors"
                aria-label={`${member.name}'s Twitter`}
              >
                <DynamicIcon name="lucide/twitter" size={20} />
              </Pressable>
            )}
            {member.social.linkedin && (
              <Pressable
                href={member.social.linkedin}
                className="transition-colors"
                aria-label={`${member.name}'s LinkedIn`}
              >
                <DynamicIcon name="lucide/linkedin" size={20} />
              </Pressable>
            )}
          </div>
        )}
      </div>
    ));
  }, [membersSlot, members, memberCardClassName, avatarClassName, memberNameClassName, memberRoleClassName, socialLinksClassName]);

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
      <div
        className={cn(
          "mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {renderMembers}
      </div>
    </Section>
  );
}
