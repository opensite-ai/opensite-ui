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
export interface TeamAvatarSocialSocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamAvatarSocial
 */
export interface TeamAvatarSocialMember {
  name: string;
  role: string;
  image: string;
  social?: TeamAvatarSocialSocialLinks;
}

/**
 * Props for TeamAvatarSocial component
 */
export interface TeamAvatarSocialProps {
  /**
   * Section heading
   * @default "Meet the crew"
   */
  heading?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Array of team members to display
   */
  members?: TeamAvatarSocialMember[];
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

const defaultMembers: TeamAvatarSocialMember[] = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    image: blockBrandedIconsAndPlaceholders.avatar1,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    image: blockBrandedIconsAndPlaceholders.avatar2,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Priya Patel",
    role: "Head of Design",
    image: blockBrandedIconsAndPlaceholders.avatar3,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "David Kim",
    role: "VP of Engineering",
    image: blockBrandedIconsAndPlaceholders.avatar4,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
];

/**
 * TeamAvatarSocial - Clean avatar grid with centered social links
 *
 * A simple, elegant team section featuring a 4-column grid of circular avatars
 * with names, roles, and social media links centered below each member. Uses
 * the Avatar component for consistent styling. Ideal for showcasing a small
 * to medium-sized team with a clean, professional appearance.
 *
 * @example
 * ```tsx
 * <TeamAvatarSocial
 *   heading="Our Team"
 *   description="The creative minds behind our success"
 *   members={[
 *     {
 *       name: "John Doe",
 *       role: "Designer",
 *       image: "/avatars/john.jpg",
 *       social: { twitter: "https://twitter.com/john" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamAvatarSocial({
  heading = "Meet the crew",
  description = "Creative people",
  members = defaultMembers,
  background = "white",
  verticalMargin = "lg",
  className,
}: TeamAvatarSocialProps): React.JSX.Element {
  return (
    <Section
      background={background}
      spacing={verticalMargin}
      className={className}
    >
      <Container>
        <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
          <h2 className="text-3xl font-bold md:text-4xl md:leading-tight">
            {heading}
          </h2>
          {description && (
            <p className="text-muted-foreground mt-1 text-lg">{description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <div key={member.name} className="flex flex-col items-center">
              <Avatar className="size-20">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback>
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="mt-4 text-center">
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {member.role}
                </p>
              </div>
              {member.social && (
                <div className="mt-3 flex gap-2">
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
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
