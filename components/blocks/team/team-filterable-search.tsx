"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
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
export interface TeamFilterableSearchSocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamFilterableSearch
 */
export interface TeamFilterableSearchMember {
  id: string;
  name: string;
  role: string;
  department: string;
  description: string;
  avatar: string;
  social?: TeamFilterableSearchSocialLinks;
}

/**
 * Props for TeamFilterableSearch component
 */
export interface TeamFilterableSearchProps {
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
   * Search placeholder text
   * @default "Search team members..."
   */
  searchPlaceholder?: string;
  /**
   * Array of team members to display
   */
  members?: TeamFilterableSearchMember[];
  /**
   * Custom slot for rendering members (overrides members array)
   */
  membersSlot?: React.ReactNode;
  /**
   * Custom slot for rendering filter controls
   */
  filtersSlot?: React.ReactNode;
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
   * Additional CSS classes for the filters container
   */
  filtersClassName?: string;
  /**
   * Additional CSS classes for the search input
   */
  searchInputClassName?: string;
  /**
   * Additional CSS classes for the department filter buttons
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
   * Additional CSS classes for the department badge
   */
  departmentBadgeClassName?: string;
  /**
   * Additional CSS classes for the member description
   */
  memberDescriptionClassName?: string;
  /**
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
  /**
   * Additional CSS classes for the empty state
   */
  emptyStateClassName?: string;
  /**
   * Empty state message
   */
  emptyStateMessage?: React.ReactNode;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultMembers: TeamFilterableSearchMember[] = [
  {
    id: "person-1",
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    department: "Leadership",
    description:
      "Former Google PM with 10+ years building products that millions use daily.",
    avatar: blockBrandedIconsAndPlaceholders.avatar1,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "person-2",
    name: "Marcus Rodriguez",
    role: "CTO & Co-founder",
    department: "Engineering",
    description:
      "Ex-Meta engineer who led teams building infrastructure that served billions.",
    avatar: blockBrandedIconsAndPlaceholders.avatar2,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "person-3",
    name: "Priya Patel",
    role: "Head of Design",
    department: "Design",
    description: "Design leader with experience at Airbnb and Figma.",
    avatar: blockBrandedIconsAndPlaceholders.avatar3,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "person-4",
    name: "David Kim",
    role: "VP of Engineering",
    department: "Engineering",
    description: "Built and scaled engineering teams at Stripe and Uber.",
    avatar: blockBrandedIconsAndPlaceholders.avatar4,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "person-5",
    name: "Emma Thompson",
    role: "Head of Marketing",
    department: "Marketing",
    description:
      "Marketing strategist who grew multiple startups from 0 to millions.",
    avatar: blockBrandedIconsAndPlaceholders.avatar5,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "person-6",
    name: "Alex Johnson",
    role: "Head of Sales",
    department: "Sales",
    description:
      "Sales leader with a track record of building high-performing teams.",
    avatar: blockBrandedIconsAndPlaceholders.avatar6,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
];

/**
 * TeamFilterableSearch - Searchable team grid with department tabs
 *
 * An interactive team section with a search input and department filter tabs.
 * Users can search by name, role, or description, and filter by department.
 * Each member card displays an avatar, name, role, department badge, description,
 * and social links. Perfect for larger organizations where users need to find
 * specific team members quickly.
 *
 * @example
 * ```tsx
 * <TeamFilterableSearch
 *   heading="Find Your Team"
 *   description="Search and filter to find the right person"
 *   searchPlaceholder="Search by name or role..."
 *   members={[
 *     {
 *       id: "1",
 *       name: "Jane Doe",
 *       role: "Engineer",
 *       department: "Engineering",
 *       description: "Full-stack developer",
 *       avatar: "/avatars/jane.jpg",
 *       social: { github: "https://github.com/jane" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamFilterableSearch({
  heading = "Team",
  description = "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
  searchPlaceholder = "Search team members...",
  members = defaultMembers,
  membersSlot,
  filtersSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  filtersClassName,
  searchInputClassName,
  filterButtonClassName,
  gridClassName,
  memberCardClassName,
  avatarClassName,
  memberNameClassName,
  memberRoleClassName,
  departmentBadgeClassName,
  memberDescriptionClassName,
  socialLinksClassName,
  emptyStateClassName,
  emptyStateMessage = "No team members found matching your criteria.",
}: TeamFilterableSearchProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDepartment, setSelectedDepartment] = React.useState("All");

  const departments = React.useMemo(() => {
    const depts = new Set(members.map((m) => m.department));
    return ["All", ...Array.from(depts)];
  }, [members]);

  const filteredMembers = React.useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        searchQuery === "" ||
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        selectedDepartment === "All" ||
        member.department === selectedDepartment;

      return matchesSearch && matchesDepartment;
    });
  }, [members, searchQuery, selectedDepartment]);

  const renderFilters = () => {
    if (filtersSlot) return filtersSlot;

    return (
      <div
        className={cn(
          "mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
          filtersClassName
        )}
      >
        <div className="relative max-w-md flex-1">
          <DynamicIcon
            name="lucide/search"
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn("pl-10", searchInputClassName)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <Pressable
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              variant={selectedDepartment === dept ? "default" : "outline"}
              size="sm"
              asButton
              className={filterButtonClassName}
            >
              {dept}
            </Pressable>
          ))}
        </div>
      </div>
    );
  };

  const renderMembers = () => {
    if (membersSlot) return membersSlot;

    return filteredMembers.map((member) => (
      <div
        key={member.id}
        className={cn(
          "group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg",
          memberCardClassName
        )}
      >
        <div className="flex items-start gap-4">
          <Avatar className={cn("size-16 shrink-0", avatarClassName)}>
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="text-lg font-bold">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={cn("font-semibold", memberNameClassName)}>
                {member.name}
              </h3>
              <Badge
                variant="secondary"
                className={cn("text-xs", departmentBadgeClassName)}
              >
                {member.department}
              </Badge>
            </div>
            <p className={cn("text-sm font-medium text-primary", memberRoleClassName)}>
              {member.role}
            </p>
            <p
              className={cn(
                "mt-2 text-sm text-muted-foreground line-clamp-2",
                memberDescriptionClassName
              )}
            >
              {member.description}
            </p>
            {member.social && (
              <div className={cn("mt-3 flex gap-2 text-muted-foreground", socialLinksClassName)}>
                {member.social.github && (
                  <Pressable
                    href={member.social.github}
                    className="hover:text-foreground transition-colors"
                    aria-label={`${member.name}'s GitHub`}
                  >
                    <DynamicIcon name="lucide/github" size={16} />
                  </Pressable>
                )}
                {member.social.twitter && (
                  <Pressable
                    href={member.social.twitter}
                    className="hover:text-foreground transition-colors"
                    aria-label={`${member.name}'s Twitter`}
                  >
                    <DynamicIcon name="lucide/twitter" size={16} />
                  </Pressable>
                )}
                {member.social.linkedin && (
                  <Pressable
                    href={member.social.linkedin}
                    className="hover:text-foreground transition-colors"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    <DynamicIcon name="lucide/linkedin" size={16} />
                  </Pressable>
                )}
              </div>
            )}
          </div>
        </div>
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
      <div className={cn("mb-12 text-center", headerClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h2
              className={cn(
                "mb-6 text-4xl font-bold tracking-tight lg:text-5xl",
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
                "mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground",
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

      {renderFilters()}

      <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", gridClassName)}>
        {renderMembers()}
      </div>

      {filteredMembers.length === 0 && !membersSlot && (
        <div className={cn("py-12 text-center text-muted-foreground", emptyStateClassName)}>
          {emptyStateMessage}
        </div>
      )}
    </Section>
  );
}
