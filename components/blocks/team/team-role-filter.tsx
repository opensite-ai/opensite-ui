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
export interface TeamRoleFilterSocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamRoleFilter
 */
export interface TeamRoleFilterMember {
  name: string;
  role: string;
  position: string;
  image: string;
  social?: TeamRoleFilterSocialLinks;
}

/**
 * Props for TeamRoleFilter component
 */
export interface TeamRoleFilterProps {
  /**
   * Section heading
   * @default "Our team"
   */
  heading?: React.ReactNode;
  /**
   * Section description
   */
  description?: React.ReactNode;
  /**
   * Array of team members to display
   */
  members?: TeamRoleFilterMember[];
  /**
   * Custom slot for rendering members (overrides members array)
   */
  membersSlot?: React.ReactNode;
  /**
   * Available role filters
   */
  roles?: string[];
  /**
   * Custom slot for rendering role filter buttons
   */
  rolesSlot?: React.ReactNode;
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
   * Additional CSS classes for the filter buttons container
   */
  filtersClassName?: string;
  /**
   * Additional CSS classes for each filter button
   */
  filterButtonClassName?: string;
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
   * Additional CSS classes for the member position
   */
  memberPositionClassName?: string;
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
 * TeamRoleFilter - Team grid with role-based filter buttons
 *
 * An interactive team section with filter buttons to show members by role/department.
 * Features a row of filter buttons at the top that filter the team grid below.
 * Each member card shows a circular avatar, name, position, and social links.
 * Ideal for organizations wanting to let users explore team members by department.
 *
 * @example
 * ```tsx
 * <TeamRoleFilter
 *   heading="Our Team"
 *   description="Filter by department"
 *   roles={["All", "Engineering", "Design", "Marketing"]}
 *   members={[
 *     {
 *       name: "Jane Doe",
 *       role: "Engineering",
 *       position: "Senior Engineer",
 *       image: "/avatars/jane.jpg",
 *       social: { github: "https://github.com/jane" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamRoleFilter({
  heading,
  description,
  members,
  membersSlot,
  roles,
  rolesSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  filtersClassName,
  filterButtonClassName,
  gridClassName,
  memberCardClassName,
  memberImageClassName,
  memberNameClassName,
  memberPositionClassName,
  socialLinksClassName,
  optixFlowConfig,
}: TeamRoleFilterProps): React.JSX.Element {
  const [selectedRole, setSelectedRole] = React.useState("All");

  const filteredMembers = React.useMemo(() => {
    return members.filter((member) =>
      selectedRole === "All" ? true : member.role === selectedRole,
    );
  }, [members, selectedRole]);

  const renderRoles = () => {
    if (rolesSlot) return rolesSlot;

    return (
      <div className={cn("mb-10 flex flex-wrap justify-center gap-2", filtersClassName)}>
        {roles.map((role) => (
          <Pressable
            key={role}
            onClick={() => setSelectedRole(role)}
            variant={selectedRole === role ? "default" : "outline"}
            asButton
            className={filterButtonClassName}
          >
            {role}
          </Pressable>
        ))}
      </div>
    );
  };

  const renderMembers = () => {
    if (membersSlot) return membersSlot;

    return filteredMembers.map((member) => (
      <Card key={member.name} className={cn("pt-0 text-center", memberCardClassName)}>
        <CardContent className="pt-6">
          <div className="relative inline-block">
            <Img
              className={cn("size-24 rounded-full object-cover", memberImageClassName)}
              src={member.image}
              alt={member.name}
              width={96}
              height={96}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
          <div className="mt-4">
            <h3 className={cn("font-medium", memberNameClassName)}>{member.name}</h3>
            <p className={cn("text-muted-foreground mt-1 text-sm", memberPositionClassName)}>
              {member.position}
            </p>
          </div>
          {member.social && (
            <div className={cn("mt-3 flex justify-center gap-2", socialLinksClassName)}>
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
      <div className={cn("mx-auto mb-10 max-w-2xl text-center", headerClassName)}>
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
            <p className={cn("text-muted-foreground mt-1 text-lg", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
      </div>

      {renderRoles()}

      <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4", gridClassName)}>
        {renderMembers()}
      </div>
    </Section>
  );
}
