"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Container } from "../../ui/container";
import { Section } from "../../ui/section";
import { Card, CardContent } from "../../ui/card";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

/**
 * Configuration for Optix Flow image optimization
 */
export interface OptixFlowConfig {
  apiKey: string;
  compression?: number;
}

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
  heading?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Array of team members to display
   */
  members?: TeamRoleFilterMember[];
  /**
   * Available role filters
   */
  roles?: string[];
  /**
   * Background style variant for the section
   * @default "white"
   */
  background?: SectionBackground;
  /**
   * Vertical spacing/margin variant
   * @default "lg"
   */
  verticalMargin?: SectionSpacing;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultMembers: TeamRoleFilterMember[] = [
  {
    name: "Sarah Chen",
    role: "Leadership",
    position: "CEO & Founder",
    image: blockBrandedIconsAndPlaceholders.avatar1,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Marcus Rodriguez",
    role: "Leadership",
    position: "CTO",
    image: blockBrandedIconsAndPlaceholders.avatar2,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Priya Patel",
    role: "Design",
    position: "Head of Design",
    image: blockBrandedIconsAndPlaceholders.avatar3,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "David Kim",
    role: "Support",
    position: "Support Lead",
    image: blockBrandedIconsAndPlaceholders.avatar4,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
];

const defaultRoles = ["All", "Leadership", "Design", "Support"];

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
  heading = "Our team",
  description = "The people behind the scenes",
  members = defaultMembers,
  roles = defaultRoles,
  background = "white",
  verticalMargin = "lg",
  className,
  optixFlowConfig,
}: TeamRoleFilterProps): React.JSX.Element {
  const [selectedRole, setSelectedRole] = React.useState("All");

  const filteredMembers = React.useMemo(() => {
    return members.filter((member) =>
      selectedRole === "All" ? true : member.role === selectedRole
    );
  }, [members, selectedRole]);

  return (
    <Section
      background={background}
      spacing={verticalMargin}
      className={className}
    >
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
            {heading}
          </h2>
          {description && (
            <p className="text-muted-foreground mt-1 text-lg">{description}</p>
          )}
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {roles.map((role) => (
            <Pressable
              key={role}
              onClick={() => setSelectedRole(role)}
              variant={selectedRole === role ? "default" : "outline"}
              asButton
            >
              {role}
            </Pressable>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredMembers.map((member) => (
            <Card key={member.name} className="pt-0 text-center">
              <CardContent className="pt-6">
                <div className="relative inline-block">
                  <Img
                    className="size-24 rounded-full object-cover"
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {member.position}
                  </p>
                </div>
                {member.social && (
                  <div className="mt-3 flex justify-center gap-2">
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
          ))}
        </div>
      </Container>
    </Section>
  );
}
