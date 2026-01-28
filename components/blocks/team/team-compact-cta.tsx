"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Pressable } from "../../../lib/Pressable";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

/**
 * Individual team member for TeamCompactCta
 */
export interface TeamCompactCtaMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

/**
 * Props for TeamCompactCta component
 */
export interface TeamCompactCtaProps {
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
  members?: TeamCompactCtaMember[];
  /**
   * Custom slot for rendering members (overrides members array)
   */
  membersSlot?: React.ReactNode;
  /**
   * CTA button text
   * @default "Join Our Team"
   */
  ctaButtonText?: React.ReactNode;
  /**
   * CTA button URL
   * @default "#"
   */
  ctaButtonUrl?: string;
  /**
   * Custom slot for rendering CTA (overrides ctaButtonText and ctaButtonUrl)
   */
  ctaSlot?: React.ReactNode;
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
   * Additional CSS classes for the CTA container
   */
  ctaClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * TeamCompactCta - Minimal team grid with prominent careers CTA
 *
 * A compact team section with a clean 4-column grid and a prominent call-to-action
 * button for career opportunities. Each member displays a simple avatar, name,
 * and role. The CTA button is positioned prominently below the team grid.
 * Ideal for landing pages where you want to showcase key team members while
 * driving recruitment.
 *
 * @example
 * ```tsx
 * <TeamCompactCta
 *   heading="Our Leadership"
 *   description="Meet the team driving our vision"
 *   ctaButtonText="View Open Positions"
 *   ctaButtonUrl="/careers"
 *   members={[
 *     { id: "1", name: "John Doe", role: "CEO", avatar: "/avatars/john.jpg" }
 *   ]}
 * />
 * ```
 */
export function TeamCompactCta({
  heading,
  description,
  members,
  membersSlot,
  ctaButtonText,
  ctaButtonUrl,
  ctaSlot,
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
  ctaClassName,
}: TeamCompactCtaProps): React.JSX.Element {
  const renderMembers = React.useMemo(() => {
    if (membersSlot) return membersSlot;
    if (!members || members.length === 0) return null;

    return members.map((member) => (
      <div
        key={member.id}
        className={cn(
          "flex flex-col items-center text-center",
          memberCardClassName,
        )}
      >
        <Avatar
          className={cn("mb-4 size-20 border lg:size-24", avatarClassName)}
        >
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback className="text-xl font-bold">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <h3 className={cn("font-semibold", memberNameClassName)}>
          {member.name}
        </h3>
        <p className={cn("text-sm text-muted-foreground", memberRoleClassName)}>
          {member.role}
        </p>
      </div>
    ));
  }, [membersSlot, members, memberCardClassName, avatarClassName, memberNameClassName, memberRoleClassName]);

  const renderCta = React.useMemo(() => {
    if (ctaSlot) return ctaSlot;

    return (
      <Pressable
        href={ctaButtonUrl}
        variant="default"
        size="lg"
        asButton
        className="px-8"
      >
        {ctaButtonText}
      </Pressable>
    );
  }, [ctaSlot, ctaButtonUrl, ctaButtonText]);

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
          "mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4",
          gridClassName,
        )}
      >
        {renderMembers}
      </div>
      <div className={cn("mt-12 text-center", ctaClassName)}>{renderCta}</div>
    </Section>
  );
}
