"use client";

import * as React from "react";
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
export interface TeamSocialCardsSocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamSocialCards
 */
export interface TeamSocialCardsMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social?: TeamSocialCardsSocialLinks;
}

/**
 * Props for TeamSocialCards component
 */
export interface TeamSocialCardsProps {
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
  members?: TeamSocialCardsMember[];
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

const defaultMembers: TeamSocialCardsMember[] = [
  {
    id: "member-1",
    name: "Sarah Chen",
    role: "CEO & Founder",
    bio: "Former Google PM with 10+ years building products that millions use daily.",
    avatar: blockBrandedIconsAndPlaceholders.avatar1,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "member-2",
    name: "Marcus Rodriguez",
    role: "CTO",
    bio: "Ex-Meta engineer who led teams building infrastructure that served billions.",
    avatar: blockBrandedIconsAndPlaceholders.avatar2,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "member-3",
    name: "Priya Patel",
    role: "Head of Design",
    bio: "Design leader with experience at Airbnb and Figma.",
    avatar: blockBrandedIconsAndPlaceholders.avatar3,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "member-4",
    name: "David Kim",
    role: "VP of Engineering",
    bio: "Built and scaled engineering teams at Stripe and Uber.",
    avatar: blockBrandedIconsAndPlaceholders.avatar4,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
];

/**
 * TeamSocialCards - Card-based team grid with bios and social links
 *
 * A professional team section featuring bordered cards with member photos,
 * biographical text, and social media links. Each card displays a circular
 * avatar, name, role, short bio, and social icons. Cards have a subtle hover
 * shadow effect. Ideal for showcasing key team members with context about
 * their background.
 *
 * @example
 * ```tsx
 * <TeamSocialCards
 *   heading="Our Leadership"
 *   description="Meet the people driving our vision"
 *   members={[
 *     {
 *       id: "1",
 *       name: "John Smith",
 *       role: "CEO",
 *       bio: "20 years of industry experience",
 *       avatar: "/avatars/john.jpg",
 *       social: { linkedin: "https://linkedin.com/in/john" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamSocialCards({
  heading = "Team",
  description = "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
  members = defaultMembers,
  background = "white",
  verticalMargin = "lg",
  className,
  optixFlowConfig,
}: TeamSocialCardsProps): React.JSX.Element {
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
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {members.map((member) => (
            <Card
              key={member.id}
              className="transition-shadow duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Img
                    src={member.avatar}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="size-20 shrink-0 rounded-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm font-medium text-primary">
                      {member.role}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                    {member.social && (
                      <div className="mt-3 flex gap-3 text-muted-foreground">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
