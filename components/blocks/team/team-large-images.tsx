"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
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
export interface TeamLargeImagesSocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamLargeImages
 */
export interface TeamLargeImagesMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: TeamLargeImagesSocialLinks;
}

/**
 * Props for TeamLargeImages component
 */
export interface TeamLargeImagesProps {
  /**
   * Section heading
   * @default "Our leadership"
   */
  heading?: React.ReactNode;
  /**
   * Section description
   */
  description?: React.ReactNode;
  /**
   * Array of team members to display
   */
  members?: TeamLargeImagesMember[];
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
  pattern?: PatternName | string;
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

const defaultMembers: TeamLargeImagesMember[] = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    bio: "I am an ambitious workaholic, but apart from that, pretty simple person.",
    image: blockBrandedIconsAndPlaceholders.avatar1,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    bio: "I am an ambitious workaholic, but apart from that, pretty simple person.",
    image: blockBrandedIconsAndPlaceholders.avatar2,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Priya Patel",
    role: "Head of Design",
    bio: "I am an ambitious workaholic, but apart from that, pretty simple person.",
    image: blockBrandedIconsAndPlaceholders.avatar3,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
];

/**
 * TeamLargeImages - Team grid with large 4:3 images and bios
 *
 * A visually impactful team section featuring large 4:3 aspect ratio images
 * in a 3-column grid. Each member entry shows a prominent image, name, role,
 * biographical text, and social media links. Ideal for leadership pages or
 * smaller teams where you want to give each member significant visual presence.
 *
 * @example
 * ```tsx
 * <TeamLargeImages
 *   heading="Our Leadership"
 *   description="The talented people behind the scenes"
 *   members={[
 *     {
 *       name: "Jane Doe",
 *       role: "CEO",
 *       bio: "20 years of industry experience",
 *       image: "/team/jane.jpg",
 *       social: { linkedin: "https://linkedin.com/in/jane" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamLargeImages({
  heading = "Our leadership",
  description = "The talented people behind the scenes",
  members = defaultMembers,
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
}: TeamLargeImagesProps): React.JSX.Element {
  const renderMembers = () => {
    if (membersSlot) return membersSlot;
    if (!members || members.length === 0) return null;

    return members.map((member) => (
      <div
        key={member.name}
        className={cn("flex flex-col", memberCardClassName)}
      >
        <Img
          className={cn("aspect-4/3 rounded-xl object-cover", memberImageClassName)}
          src={member.image}
          alt={member.name}
          width={320}
          height={240}
          optixFlowConfig={optixFlowConfig}
        />
        <div className="mt-4">
          <h3 className={cn("text-lg font-medium", memberNameClassName)}>
            {member.name}
          </h3>
          <p className={cn("text-muted-foreground mt-1 text-sm", memberRoleClassName)}>
            {member.role}
          </p>
          <p className={cn("text-muted-foreground mt-3 text-sm", memberBioClassName)}>
            {member.bio}
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
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("mx-auto mb-10 max-w-2xl text-center lg:mb-14", headerClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h2
              className={cn(
                "text-3xl font-bold md:text-4xl md:leading-tight",
                headingClassName
              )}
            >
              {heading}
            </h2>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p
              className={cn(
                "text-muted-foreground mt-1 text-lg",
                descriptionClassName
              )}
            >
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
      </div>

      <div
        className={cn(
          "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
          gridClassName
        )}
      >
        {renderMembers()}
      </div>
    </Section>
  );
}
