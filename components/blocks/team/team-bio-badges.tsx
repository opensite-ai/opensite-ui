"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Container } from "../../ui/container";
import { Section } from "../../ui/section";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
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
export interface TeamBioBadgesSocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamBioBadges
 */
export interface TeamBioBadgesMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  avatar: string;
  social?: TeamBioBadgesSocialLinks;
}

/**
 * Props for TeamBioBadges component
 */
export interface TeamBioBadgesProps {
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
  members?: TeamBioBadgesMember[];
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

const defaultMembers: TeamBioBadgesMember[] = [
  {
    id: "member-1",
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    department: "Leadership",
    bio: "Former Google PM with 10+ years building products that millions use daily. Passionate about creating meaningful impact through technology.",
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
    role: "CTO & Co-founder",
    department: "Engineering",
    bio: "Ex-Meta engineer who led teams building infrastructure that served billions of users. Loves solving complex technical challenges.",
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
    department: "Design",
    bio: "Design leader with experience at Airbnb and Figma. Believes great design should be invisible and solve real user problems.",
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
    department: "Engineering",
    bio: "Built and scaled engineering teams at Stripe and Uber. Focuses on creating high-performing teams and robust systems.",
    avatar: blockBrandedIconsAndPlaceholders.avatar4,
    social: {
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
];

/**
 * TeamBioBadges - Team grid with bios, department badges, and social links
 *
 * A comprehensive team section featuring member cards with detailed bios and
 * department badges. Each card displays an avatar, name, role, department badge,
 * biographical text, and social media links. Ideal for showcasing leadership teams
 * or key personnel where background information adds credibility.
 *
 * @example
 * ```tsx
 * <TeamBioBadges
 *   heading="Leadership Team"
 *   description="The visionaries guiding our company"
 *   members={[
 *     {
 *       id: "1",
 *       name: "Jane Smith",
 *       role: "CEO",
 *       department: "Executive",
 *       bio: "20 years of industry experience...",
 *       avatar: "/avatars/jane.jpg",
 *       social: { linkedin: "https://linkedin.com/in/jane" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamBioBadges({
  heading = "Team",
  description = "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
  members = defaultMembers,
  background = "white",
  verticalMargin = "lg",
  className,
}: TeamBioBadgesProps): React.JSX.Element {
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
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row"
            >
              <Avatar className="size-24 shrink-0 border">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="text-xl font-bold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <Badge variant="secondary">{member.department}</Badge>
                </div>
                <p className="text-sm font-medium text-primary">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                {member.social && (
                  <div className="mt-4 flex gap-3 text-muted-foreground">
                    {member.social.github && (
                      <Pressable
                        href={member.social.github}
                        className="hover:text-foreground transition-colors"
                        aria-label={`${member.name}'s GitHub`}
                      >
                        <DynamicIcon name="lucide/github" size={18} />
                      </Pressable>
                    )}
                    {member.social.twitter && (
                      <Pressable
                        href={member.social.twitter}
                        className="hover:text-foreground transition-colors"
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <DynamicIcon name="lucide/twitter" size={18} />
                      </Pressable>
                    )}
                    {member.social.linkedin && (
                      <Pressable
                        href={member.social.linkedin}
                        className="hover:text-foreground transition-colors"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <DynamicIcon name="lucide/linkedin" size={18} />
                      </Pressable>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
