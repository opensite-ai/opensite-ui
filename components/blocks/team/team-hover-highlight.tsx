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
export interface TeamHoverHighlightSocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamHoverHighlight
 */
export interface TeamHoverHighlightMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: TeamHoverHighlightSocialLinks;
}

/**
 * Props for TeamHoverHighlight component
 */
export interface TeamHoverHighlightProps {
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
  members?: TeamHoverHighlightMember[];
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
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * TeamHoverHighlight - Team grid with hover-activated highlight effect
 *
 * A visually engaging team section where hovering over a member card highlights
 * it while dimming others. Each card features a circular image, name, role, and
 * social links that appear on hover. The hover effect creates focus on the
 * selected member while maintaining context of the full team.
 *
 * @example
 * ```tsx
 * <TeamHoverHighlight
 *   heading="Meet Our Team"
 *   description="The talented individuals behind our success"
 *   members={[
 *     {
 *       id: "1",
 *       name: "Jane Doe",
 *       role: "Designer",
 *       image: "/team/jane.jpg",
 *       social: { linkedin: "https://linkedin.com/in/jane" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamHoverHighlight({
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
  socialLinksClassName,
  optixFlowConfig,
}: TeamHoverHighlightProps): React.JSX.Element {
  const renderMembers = React.useMemo(() => {
    if (membersSlot) return membersSlot;
    if (!members || members.length === 0) return null;

    return members.map((member) => (
      <div
        key={member.id}
        className={cn(
          "relative flex flex-col items-center rounded-xl p-6 transition-all duration-300 group-hover:opacity-50 hover:opacity-100! hover:bg-muted/50",
          memberCardClassName,
        )}
      >
        <div className="relative mb-4 overflow-hidden rounded-full">
          <Img
            src={member.image}
            alt={member.name}
            width={120}
            height={120}
            className={cn(
              "size-28 rounded-full object-cover transition-transform duration-300 hover:scale-110",
              memberImageClassName,
            )}
            optixFlowConfig={optixFlowConfig}
          />
        </div>
        <h3 className={cn("text-lg font-semibold", memberNameClassName)}>
          {member.name}
        </h3>
        <p className={cn("text-sm text-muted-foreground", memberRoleClassName)}>
          {member.role}
        </p>
        {member.social && (
          <div
            className={cn(
              "mt-4 flex gap-3 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100",
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
    ));
  }, [membersSlot, members, memberCardClassName, memberImageClassName, optixFlowConfig, memberNameClassName, memberRoleClassName, socialLinksClassName]);

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
          "group mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {renderMembers}
      </div>
    </Section>
  );
}
