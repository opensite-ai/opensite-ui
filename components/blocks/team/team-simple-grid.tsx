"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Container } from "../../ui/container";
import { Section } from "../../ui/section";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
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
  heading?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Array of team members to display
   */
  members?: TeamSimpleGridMember[];
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

const defaultMembers: TeamSimpleGridMember[] = [
  {
    id: "member-1",
    name: "Sarah Chen",
    role: "CEO & Founder",
    avatar: blockBrandedIconsAndPlaceholders.avatar1,
  },
  {
    id: "member-2",
    name: "Marcus Rodriguez",
    role: "CTO",
    avatar: blockBrandedIconsAndPlaceholders.avatar2,
  },
  {
    id: "member-3",
    name: "Priya Patel",
    role: "Head of Design",
    avatar: blockBrandedIconsAndPlaceholders.avatar3,
  },
  {
    id: "member-4",
    name: "David Kim",
    role: "VP of Engineering",
    avatar: blockBrandedIconsAndPlaceholders.avatar4,
  },
  {
    id: "member-5",
    name: "Emma Thompson",
    role: "Head of Marketing",
    avatar: blockBrandedIconsAndPlaceholders.avatar5,
  },
  {
    id: "member-6",
    name: "Alex Johnson",
    role: "Head of Sales",
    avatar: blockBrandedIconsAndPlaceholders.avatar6,
  },
];

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
  heading = "Team",
  description = "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
  members = defaultMembers,
  background = "white",
  verticalMargin = "lg",
  className,
}: TeamSimpleGridProps): React.JSX.Element {
  return (
    <Section
      background={background}
      spacing={verticalMargin}
      className={className}
    >
      <Container>
        <div className="flex flex-col items-center text-center">
          <h2 className="my-6 text-2xl font-bold text-pretty lg:text-4xl">
            {heading}
          </h2>
          {description && (
            <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">
              {description}
            </p>
          )}
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div key={member.id} className="flex flex-col items-center">
              <Avatar className="mb-4 size-20 border md:mb-5 lg:size-24">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <p className="text-center font-medium">{member.name}</p>
              <p className="text-center text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
