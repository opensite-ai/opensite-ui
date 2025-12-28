"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Container } from "../../ui/container";
import { Section } from "../../ui/section";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
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
export interface TeamSocialGridSocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamSocialGrid
 */
export interface TeamSocialGridMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  social?: TeamSocialGridSocialLinks;
}

/**
 * Props for TeamSocialGrid component
 */
export interface TeamSocialGridProps {
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
  members?: TeamSocialGridMember[];
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

const defaultMembers: TeamSocialGridMember[] = [
  {
    id: "member-1",
    name: "Sarah Chen",
    role: "CEO & Founder",
    avatar: blockBrandedIconsAndPlaceholders.avatar1,
    social: {
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: "member-2",
    name: "Marcus Rodriguez",
    role: "CTO",
    avatar: blockBrandedIconsAndPlaceholders.avatar2,
    social: {
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: "member-3",
    name: "Priya Patel",
    role: "Head of Design",
    avatar: blockBrandedIconsAndPlaceholders.avatar3,
    social: {
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: "member-4",
    name: "David Kim",
    role: "VP of Engineering",
    avatar: blockBrandedIconsAndPlaceholders.avatar4,
    social: {
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: "member-5",
    name: "Emma Thompson",
    role: "Head of Marketing",
    avatar: blockBrandedIconsAndPlaceholders.avatar5,
    social: {
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    id: "member-6",
    name: "Alex Johnson",
    role: "Head of Sales",
    avatar: blockBrandedIconsAndPlaceholders.avatar6,
    social: {
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
];

/**
 * TeamSocialGrid - Team grid with social media links
 *
 * A team section displaying members in a responsive grid with social media icons.
 * Each member card shows an avatar, name, role, and links to their GitHub, Twitter,
 * and LinkedIn profiles. Perfect for tech teams or companies that want to highlight
 * their team's online presence.
 *
 * @example
 * ```tsx
 * <TeamSocialGrid
 *   heading="Meet Our Team"
 *   description="The talented people behind our product"
 *   members={[
 *     {
 *       id: "1",
 *       name: "Jane Doe",
 *       role: "Lead Developer",
 *       avatar: "/avatars/jane.jpg",
 *       social: { github: "https://github.com/jane", twitter: "https://twitter.com/jane" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamSocialGrid({
  heading = "Team",
  description = "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
  members = defaultMembers,
  background = "white",
  verticalMargin = "lg",
  className,
}: TeamSocialGridProps): React.JSX.Element {
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
              {member.social && (
                <div className="mt-2 flex gap-2 text-muted-foreground">
                  {member.social.github && (
                    <Pressable
                      href={member.social.github}
                      className="hover:text-foreground transition-colors"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <DynamicIcon name="lucide/github" size={20} />
                    </Pressable>
                  )}
                  {member.social.twitter && (
                    <Pressable
                      href={member.social.twitter}
                      className="hover:text-foreground transition-colors"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <DynamicIcon name="lucide/twitter" size={20} />
                    </Pressable>
                  )}
                  {member.social.linkedin && (
                    <Pressable
                      href={member.social.linkedin}
                      className="hover:text-foreground transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <DynamicIcon name="lucide/linkedin" size={20} />
                    </Pressable>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
