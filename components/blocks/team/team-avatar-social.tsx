"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
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
export interface TeamAvatarSocialSocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamAvatarSocial
 */
export interface TeamAvatarSocialMember {
  name: string;
  role: string;
  image: string;
  social?: TeamAvatarSocialSocialLinks;
}

/**
 * Props for TeamAvatarSocial component
 */
export interface TeamAvatarSocialProps {
  /**
   * Section heading
   * @default "Meet the crew"
   */
  heading?: React.ReactNode;
  /**
   * Section description
   */
  description?: React.ReactNode;
  /**
   * Array of team members to display
   */
  members?: TeamAvatarSocialMember[];
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
 * TeamAvatarSocial - Clean avatar grid with centered social links
 *
 * A simple, elegant team section featuring a 4-column grid of circular avatars
 * with names, roles, and social media links centered below each member. Uses
 * the Avatar component for consistent styling. Ideal for showcasing a small
 * to medium-sized team with a clean, professional appearance.
 *
 * @example
 * ```tsx
 * <TeamAvatarSocial
 *   heading="Our Team"
 *   description="The creative minds behind our success"
 *   members={[
 *     {
 *       name: "John Doe",
 *       role: "Designer",
 *       image: "/avatars/john.jpg",
 *       social: { twitter: "https://twitter.com/john" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamAvatarSocial({
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
}: TeamAvatarSocialProps): React.JSX.Element {
  const renderMembers = React.useMemo(() => {
    if (membersSlot) return membersSlot;
    if (!members || members.length === 0) return null;

    return members.map((member) => (
      <div
        key={member.name}
        className={cn("flex flex-col items-center", memberCardClassName)}
      >
        <Avatar className={cn("size-20", avatarClassName)}>
          <AvatarImage src={member.image} alt={member.name} />
          <AvatarFallback>
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="mt-4 text-center">
          <h3 className={cn("font-medium", memberNameClassName)}>
            {member.name}
          </h3>
          <p
            className={cn(
              "text-muted-foreground mt-1 text-sm",
              memberRoleClassName,
            )}
          >
            {member.role}
          </p>
        </div>
        {member.social && (
          <div className={cn("mt-3 flex gap-2", socialLinksClassName)}>
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
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
          gridClassName,
        )}
      >
        {renderMembers}
      </div>
    </Section>
  );
}
