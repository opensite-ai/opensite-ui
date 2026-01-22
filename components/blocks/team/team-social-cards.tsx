"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
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
 * Social links for team member
 */
export interface TeamSocialCardsSocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamSocialCards
 */
export interface TeamSocialCardsMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social?: TeamSocialCardsSocialLinks;
}

/**
 * Props for TeamSocialCards component
 */
export interface TeamSocialCardsProps {
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
  members?: TeamSocialCardsMember[];
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
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * TeamSocialCards - Card-based team grid with bios and social links
 *
 * A professional team section featuring bordered cards with member photos,
 * biographical text, and social media links. Each card displays a circular
 * avatar, name, role, short bio, and social icons. Cards have a subtle hover
 * shadow effect. Ideal for showcasing key team members with context about
 * their background.
 *
 * @example
 * ```tsx
 * <TeamSocialCards
 *   heading="Our Leadership"
 *   description="Meet the people driving our vision"
 *   members={[
 *     {
 *       id: "1",
 *       name: "John Smith",
 *       role: "CEO",
 *       bio: "20 years of industry experience",
 *       avatar: "/avatars/john.jpg",
 *       social: { linkedin: "https://linkedin.com/in/john" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamSocialCards({
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
  socialLinksClassName,
  optixFlowConfig,
}: TeamSocialCardsProps): React.JSX.Element {
  const renderMembers = () => {
    if (membersSlot) return membersSlot;
    if (!members || members.length === 0) return null;

    return members.map((member) => (
      <Card
        key={member.id}
        className={cn(
          "transition-shadow duration-300 hover:shadow-lg",
          memberCardClassName,
        )}
      >
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Img
              src={member.avatar}
              alt={member.name}
              width={80}
              height={80}
              className={cn(
                "size-20 shrink-0 rounded-full object-cover",
                memberImageClassName,
              )}
              optixFlowConfig={optixFlowConfig}
            />
            <div className="flex flex-col">
              <h3 className={cn("text-lg font-semibold", memberNameClassName)}>
                {member.name}
              </h3>
              <p
                className={cn(
                  "text-sm font-medium text-primary",
                  memberRoleClassName,
                )}
              >
                {member.role}
              </p>
              <p
                className={cn(
                  "mt-2 text-sm text-muted-foreground",
                  memberBioClassName,
                )}
              >
                {member.bio}
              </p>
              {member.social && (
                <div
                  className={cn(
                    "mt-3 flex gap-3 text-muted-foreground",
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
      <div className={cn("mt-12 grid gap-6 md:grid-cols-2", gridClassName)}>
        {renderMembers()}
      </div>
    </Section>
  );
}
