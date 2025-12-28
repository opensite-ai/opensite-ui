"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Container } from "../../ui/container";
import { Section } from "../../ui/section";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
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
 * Individual team member for TeamCompactGrid
 */
export interface TeamCompactGridMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
}

/**
 * Props for TeamCompactGrid component
 */
export interface TeamCompactGridProps {
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
   * Array of team members to display
   */
  members?: TeamCompactGridMember[];
  /**
   * CTA section heading
   */
  ctaHeading?: string;
  /**
   * CTA section description
   */
  ctaDescription?: string;
  /**
   * CTA button text
   */
  ctaButtonText?: string;
  /**
   * CTA button URL
   */
  ctaButtonUrl?: string;
  /**
   * Background style variant for the section
   * @default "gray"
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

const defaultMembers: TeamCompactGridMember[] = [
  {
    id: "person-1",
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    department: "Leadership",
    avatar: blockBrandedIconsAndPlaceholders.avatar1,
  },
  {
    id: "person-2",
    name: "Marcus Rodriguez",
    role: "CTO & Co-founder",
    department: "Engineering",
    avatar: blockBrandedIconsAndPlaceholders.avatar2,
  },
  {
    id: "person-3",
    name: "Priya Patel",
    role: "Head of Design",
    department: "Design",
    avatar: blockBrandedIconsAndPlaceholders.avatar3,
  },
  {
    id: "person-4",
    name: "David Kim",
    role: "VP of Engineering",
    department: "Engineering",
    avatar: blockBrandedIconsAndPlaceholders.avatar4,
  },
  {
    id: "person-5",
    name: "Emma Thompson",
    role: "Head of Marketing",
    department: "Marketing",
    avatar: blockBrandedIconsAndPlaceholders.avatar5,
  },
  {
    id: "person-6",
    name: "Alex Johnson",
    role: "Head of Sales",
    department: "Sales",
    avatar: blockBrandedIconsAndPlaceholders.avatar6,
  },
  {
    id: "person-7",
    name: "Lisa Wang",
    role: "Product Manager",
    department: "Product",
    avatar: blockBrandedIconsAndPlaceholders.avatar7,
  },
  {
    id: "person-8",
    name: "Michael Brown",
    role: "Senior Engineer",
    department: "Engineering",
    avatar: blockBrandedIconsAndPlaceholders.avatar8,
  },
];

/**
 * TeamCompactGrid - Compact 4-column team grid with department badges
 *
 * A space-efficient team section displaying members in a dense 4-column grid.
 * Each card shows an avatar, name, role, and department badge with a subtle
 * hover effect. Includes a bottom CTA section for career opportunities.
 * Ideal for larger teams where you want to show many members without
 * overwhelming the page.
 *
 * @example
 * ```tsx
 * <TeamCompactGrid
 *   heading="Our Team"
 *   description="Meet the people making it happen"
 *   ctaButtonText="Join Us"
 *   ctaButtonUrl="/careers"
 *   members={[
 *     {
 *       id: "1",
 *       name: "Jane Doe",
 *       role: "Designer",
 *       department: "Design",
 *       avatar: "/avatars/jane.jpg"
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamCompactGrid({
  heading = "Team",
  description = "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
  members = defaultMembers,
  ctaHeading = "Ready to build the future with us?",
  ctaDescription = "We're always looking for talented individuals who share our passion for innovation and making a difference. Check out our current openings.",
  ctaButtonText = "Explore Careers",
  ctaButtonUrl = "#",
  background = "gray",
  verticalMargin = "lg",
  className,
}: TeamCompactGridProps): React.JSX.Element {
  return (
    <Section
      background={background}
      spacing={verticalMargin}
      className={className}
    >
      <Container>
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
            {heading}
          </h2>
          {description && (
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="group rounded-lg border border-muted bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-muted"
            >
              <div className="relative mb-6">
                <Avatar className="mx-auto h-20 w-20">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="bg-linear-to-br from-primary/20 to-secondary/20 text-2xl font-bold text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="text-center">
                <h3 className="mb-1 text-lg font-semibold transition-colors group-hover:text-primary">
                  {member.name}
                </h3>
                <p className="mb-2 text-sm font-medium text-primary">
                  {member.role}
                </p>
                <Badge variant="outline" className="text-xs">
                  {member.department}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t pt-16 text-center">
          <h3 className="mb-4 text-2xl font-semibold">{ctaHeading}</h3>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            {ctaDescription}
          </p>
          <Pressable
            href={ctaButtonUrl}
            variant="default"
            size="lg"
            asButton
            className="px-8"
          >
            {ctaButtonText}
          </Pressable>
        </div>
      </Container>
    </Section>
  );
}
