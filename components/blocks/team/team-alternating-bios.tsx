"use client";

import * as React from "react";
import { cn, getTextColor } from "../../../lib/utils";
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
import { patternSvgs } from "../../../lib/patternSvgs";

/**
 * Social links for team member
 */
export interface TeamAlternatingBiosSocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamAlternatingBios
 */
export interface TeamAlternatingBiosMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: TeamAlternatingBiosSocialLinks;
}

/**
 * Props for TeamAlternatingBios component
 */
export interface TeamAlternatingBiosProps {
  /**
   * Section heading
   * @default "Leadership team"
   */
  heading?: React.ReactNode;
  /**
   * Section description
   */
  description?: React.ReactNode;
  /**
   * Array of team members to display
   */
  members?: TeamAlternatingBiosMember[];
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
   * Additional CSS classes for the members container
   */
  membersContainerClassName?: string;
  /**
   * Additional CSS classes for each member row
   */
  memberRowClassName?: string;
  /**
   * Additional CSS classes for the member image container
   */
  memberImageContainerClassName?: string;
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
 * TeamAlternatingBios - Alternating layout with large images and detailed bios
 *
 * A premium team section featuring alternating left/right layouts for each member.
 * Each entry displays a large 4:3 aspect ratio image, name, role, detailed bio,
 * and social media links. Includes a decorative dot pattern background element.
 * Ideal for showcasing key leadership with in-depth biographical information.
 *
 * @example
 * ```tsx
 * <TeamAlternatingBios
 *   heading="Our Leadership"
 *   description="Meet the visionaries behind our success"
 *   members={[
 *     {
 *       name: "Jane Smith",
 *       role: "CEO",
 *       bio: "20 years of industry experience leading innovative companies...",
 *       image: "/team/jane.jpg",
 *       social: { linkedin: "https://linkedin.com/in/jane" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamAlternatingBios({
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
  membersContainerClassName,
  memberRowClassName,
  memberImageContainerClassName,
  memberImageClassName,
  memberNameClassName,
  memberRoleClassName,
  memberBioClassName,
  socialLinksClassName,
  optixFlowConfig,
}: TeamAlternatingBiosProps): React.JSX.Element {
  const renderMembers = React.useMemo(() => {
    if (membersSlot) return membersSlot;
    if (!members || members.length === 0) return null;

    return members.map((member, index) => (
      <div
        key={member.name}
        className={cn(
          "grid items-center gap-8 md:grid-cols-2 lg:gap-12",
          memberRowClassName,
        )}
      >
        <div
          className={cn(
            "relative",
            index % 2 === 1 ? "md:order-last" : "",
            memberImageContainerClassName,
          )}
        >
          <div className="relative aspect-4/3">
            <Img
              className={cn(
                "rounded-xl object-cover w-full h-full",
                memberImageClassName,
              )}
              src={member.image}
              alt={member.name}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
          <div
            className={cn(
              "absolute -z-10 size-48 opacity-30",
              index % 2 === 1 ? "-bottom-6 -left-6" : "-right-6 -bottom-6",
            )}
            style={{
              backgroundImage: `url(${patternSvgs.dotPattern})`,
              backgroundSize: "16px 16px",
            }}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className={cn("text-2xl font-bold", memberNameClassName)}>
              {member.name}
            </h3>
            <p
              className={cn(
                getTextColor(background, "muted"),
                "mt-1 text-lg",
                memberRoleClassName,
              )}
            >
              {member.role}
            </p>
          </div>

          <p className={cn(getTextColor(background, "muted"), memberBioClassName)}>
            {member.bio}
          </p>

          {member.social && (
            <div className={cn("flex gap-2", socialLinksClassName)}>
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
    ));
  }, [
    membersSlot,
    members,
    memberRowClassName,
    memberImageContainerClassName,
    memberImageClassName,
    optixFlowConfig,
    memberNameClassName,
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

      <div className={cn("space-y-24", membersContainerClassName)}>
        {renderMembers}
      </div>
    </Section>
  );
}
