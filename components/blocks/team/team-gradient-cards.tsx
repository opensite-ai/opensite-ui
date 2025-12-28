"use client";

import * as React from "react";
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
export interface TeamGradientCardsSocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamGradientCards
 */
export interface TeamGradientCardsMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  social?: TeamGradientCardsSocialLinks;
}

/**
 * Props for TeamGradientCards component
 */
export interface TeamGradientCardsProps {
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
  members?: TeamGradientCardsMember[];
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

const defaultMembers: TeamGradientCardsMember[] = [
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
 * TeamGradientCards - Team grid with gradient background cards and hover effects
 *
 * A visually striking team section featuring cards with gradient backgrounds that
 * animate on hover. Each card displays an avatar with a gradient ring effect,
 * member name, role, and social media links. The cards have a subtle scale and
 * shadow animation on hover for an engaging user experience.
 *
 * @example
 * ```tsx
 * <TeamGradientCards
 *   heading="Our Leadership"
 *   description="Meet the visionaries driving our company forward"
 *   members={[
 *     {
 *       id: "1",
 *       name: "Alex Smith",
 *       role: "Founder",
 *       avatar: "/avatars/alex.jpg",
 *       social: { linkedin: "https://linkedin.com/in/alex" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamGradientCards({
  heading = "Team",
  description = "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
  members = defaultMembers,
  background = "white",
  verticalMargin = "lg",
  className,
}: TeamGradientCardsProps): React.JSX.Element {
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
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="group relative overflow-hidden rounded-xl bg-linear-to-br from-primary/5 via-transparent to-secondary/5 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="absolute -inset-1 rounded-full bg-linear-to-r from-primary to-secondary opacity-0 blur transition-opacity duration-300 group-hover:opacity-75" />
                  <Avatar className="relative size-24 border-2 border-background">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-linear-to-br from-primary/20 to-secondary/20 text-xl font-bold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
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
