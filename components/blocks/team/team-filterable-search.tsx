"use client";

import * as React from "react";
import { Container } from "../../ui/container";
import { Section } from "../../ui/section";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
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
  heading?: string;
  /**
   * Section description
   */
  description?: string;
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
  background = "white",
  verticalMargin = "lg",
  className,
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

  return (
    <Section
      background={background}
      spacing={verticalMargin}
      className={className}
    >
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
            {heading}
          </h2>
          {description && (
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              className="pl-10"
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
              >
                {dept}
              </Pressable>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <Avatar className="size-16 shrink-0">
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
                    <h3 className="font-semibold">{member.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {member.department}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-primary">
                    {member.role}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {member.description}
                  </p>
                  {member.social && (
                    <div className="mt-3 flex gap-2 text-muted-foreground">
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
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            No team members found matching your criteria.
          </div>
        )}
      </Container>
    </Section>
  );
}
