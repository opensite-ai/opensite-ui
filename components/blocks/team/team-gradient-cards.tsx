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
export interface TeamGradientCardsSocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamGradientCards
 */
export interface TeamGradientCardsMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  social?: TeamGradientCardsSocialLinks;
}

/**
 * Props for TeamGradientCards component
 */
export interface TeamGradientCardsProps {
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
  members?: TeamGradientCardsMember[];
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
 * TeamGradientCards - Team grid with gradient background cards and hover effects
 *
 * A visually striking team section featuring cards with gradient backgrounds that
 * animate on hover. Each card displays an avatar with a gradient ring effect,
 * member name, role, and social media links. The cards have a subtle scale and
 * shadow animation on hover for an engaging user experience.
 *
 * @example
 * ```tsx
 * <TeamGradientCards
 *   heading="Our Leadership"
 *   description="Meet the visionaries driving our company forward"
 *   members={[
 *     {
 *       id: "1",
 *       name: "Alex Smith",
 *       role: "Founder",
 *       avatar: "/avatars/alex.jpg",
 *       social: { linkedin: "https://linkedin.com/in/alex" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamGradientCards({
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
}: TeamGradientCardsProps): React.JSX.Element {
  const renderMembers = React.useMemo(() => {
    if (membersSlot) return membersSlot;
    if (!members || members.length === 0) return null;

    return members.map((member) => (
      <div
        key={member.id}
        className={cn(
          "group relative overflow-hidden rounded-xl bg-linear-to-br from-primary/5 via-transparent to-secondary/5 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
          memberCardClassName,
        )}
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="absolute -inset-1 rounded-full bg-linear-to-r from-primary to-secondary opacity-0 blur transition-opacity duration-300 group-hover:opacity-75" />
            <Avatar
              className={cn(
                "relative size-24 border-2 border-background",
                avatarClassName,
              )}
            >
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-linear-to-br from-primary/20 to-secondary/20 text-xl font-bold">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
          <h3 className={cn("text-lg font-semibold", memberNameClassName)}>
            {member.name}
          </h3>
          <p
            className={cn("text-sm text-muted-foreground", memberRoleClassName)}
          >
            {member.role}
          </p>
          {member.social && (
            <div
              className={cn(
                "mt-4 flex gap-3 text-muted-foreground",
                socialLinksClassName,
              )}
            >
              {member.social.github && (
                <Pressable
                  href={member.social.github}
                  className="hover:text-foreground transition-colors"
                  aria-label={`${member.name}'s GitHub`}
                >
                  <DynamicIcon name="lucide/github" size={18} />
                </Pressable>
              )}
              {member.social.twitter && (
                <Pressable
                  href={member.social.twitter}
                  className="hover:text-foreground transition-colors"
                  aria-label={`${member.name}'s Twitter`}
                >
                  <DynamicIcon name="lucide/twitter" size={18} />
                </Pressable>
              )}
              {member.social.linkedin && (
                <Pressable
                  href={member.social.linkedin}
                  className="hover:text-foreground transition-colors"
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
                "mb-8 max-w-3xl text-muted-foreground lg:text-xl",
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
          "mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {renderMembers}
      </div>
    </Section>
  );
}
