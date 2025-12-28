"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Container } from "../../ui/container";
import { Section } from "../../ui/section";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
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
  heading?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Array of team members to display
   */
  members?: TeamCompactCtaMember[];
  /**
   * CTA button text
   * @default "Join Our Team"
   */
  ctaButtonText?: string;
  /**
   * CTA button URL
   * @default "#"
   */
  ctaButtonUrl?: string;
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

const defaultMembers: TeamCompactCtaMember[] = [
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
];

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
  heading = "Team",
  description = "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
  members = defaultMembers,
  ctaButtonText = "Join Our Team",
  ctaButtonUrl = "#",
  background = "white",
  verticalMargin = "lg",
  className,
}: TeamCompactCtaProps): React.JSX.Element {
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
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <div key={member.id} className="flex flex-col items-center text-center">
              <Avatar className="mb-4 size-20 border lg:size-24">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xl font-bold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
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
