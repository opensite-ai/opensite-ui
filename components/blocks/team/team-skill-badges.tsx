"use client";

import * as React from "react";
import { Container } from "../../ui/container";
import { Section } from "../../ui/section";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
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
export interface TeamSkillBadgesSocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamSkillBadges
 */
export interface TeamSkillBadgesMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  social?: TeamSkillBadgesSocialLinks;
}

/**
 * Props for TeamSkillBadges component
 */
export interface TeamSkillBadgesProps {
  /**
   * Section heading
   * @default "Meet our experts"
   */
  heading?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Array of team members to display
   */
  members?: TeamSkillBadgesMember[];
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

const defaultMembers: TeamSkillBadgesMember[] = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    bio: "Leading innovation and strategic growth initiatives.",
    image: blockBrandedIconsAndPlaceholders.avatar1,
    skills: ["Leadership", "Strategy", "Innovation", "Product Vision"],
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    bio: "Creating beautiful and intuitive user experiences.",
    image: blockBrandedIconsAndPlaceholders.avatar2,
    skills: ["System Architecture", "AI/ML", "Scalability", "DevOps"],
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Priya Patel",
    role: "Head of Design",
    bio: "Building scalable and maintainable applications.",
    image: blockBrandedIconsAndPlaceholders.avatar3,
    skills: ["UI Design", "UX Research", "Prototyping", "Design Systems"],
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
];

/**
 * TeamSkillBadges - Team cards with skill/expertise badges
 *
 * A professional team section featuring cards with circular avatars, member
 * details, and skill badges. Each card displays a centered avatar with a
 * decorative ring, name, role, bio, skill badges, and social links. The skill
 * badges highlight each member's areas of expertise. Ideal for showcasing
 * technical teams or consultants where skills are important differentiators.
 *
 * @example
 * ```tsx
 * <TeamSkillBadges
 *   heading="Our Experts"
 *   description="The skilled professionals behind our success"
 *   members={[
 *     {
 *       name: "John Doe",
 *       role: "Senior Engineer",
 *       bio: "Full-stack developer with 10 years experience",
 *       image: "/avatars/john.jpg",
 *       skills: ["React", "Node.js", "AWS", "TypeScript"],
 *       social: { github: "https://github.com/john" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamSkillBadges({
  heading = "Meet our experts",
  description = "The skilled professionals behind our success",
  members = defaultMembers,
  background = "white",
  verticalMargin = "lg",
  className,
  optixFlowConfig,
}: TeamSkillBadgesProps): React.JSX.Element {
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <Card key={member.name} className="group relative pt-0">
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="border-background ring-primary/10 size-32 rounded-full border-4 ring-4">
                      <Img
                        className="rounded-full"
                        src={member.image}
                        alt={member.name}
                        width={128}
                        height={128}
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <h3 className="text-lg font-medium">{member.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {member.role}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {member.bio}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  {member.social && (
                    <div className="mt-6 flex justify-center gap-2">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
