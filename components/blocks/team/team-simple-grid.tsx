"use client";

import * as React from "react";
import { cn, getTextColor } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

/**
 * Individual team member for TeamSimpleGrid
 */
export interface TeamSimpleGridMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

/**
 * Props for TeamSimpleGrid component
 */
export interface TeamSimpleGridProps {
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
  members?: TeamSimpleGridMember[];
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
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * TeamSimpleGrid - Clean, minimal team grid with avatars
 *
 * A straightforward team section displaying members in a responsive grid layout.
 * Each member card shows a circular avatar, name, and role. Ideal for showcasing
 * team members with a clean, professional appearance without social links or
 * additional details.
 *
 * @example
 * ```tsx
 * <TeamSimpleGrid
 *   heading="Our Team"
 *   description="Meet the people behind our success"
 *   members={[
 *     { id: "1", name: "John Doe", role: "CEO", avatar: "/avatars/john.jpg" }
 *   ]}
 * />
 * ```
 */
export function TeamSimpleGrid({
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
}: TeamSimpleGridProps): React.JSX.Element {
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
            getTextColor(background, "muted"),
            "text-center",
            memberRoleClassName,
          )}
        >
          {member.role}
        </p>
      </div>
    ));
  }, [membersSlot, members, memberCardClassName, avatarClassName, memberNameClassName, memberRoleClassName, background]);

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
                getTextColor(background, "muted"),
                "mb-8 max-w-3xl lg:text-xl",
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
