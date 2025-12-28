"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Container } from "../../ui/container";
import { Section } from "../../ui/section";
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
export interface TeamHoverHighlightSocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamHoverHighlight
 */
export interface TeamHoverHighlightMember {
  id: string;
  name: string;
  role: string;
  image: string;
  social?: TeamHoverHighlightSocialLinks;
}

/**
 * Props for TeamHoverHighlight component
 */
export interface TeamHoverHighlightProps {
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
  members?: TeamHoverHighlightMember[];
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

const defaultMembers: TeamHoverHighlightMember[] = [
  {
    id: "member-1",
    name: "Sarah Chen",
    role: "CEO & Founder",
    image: blockBrandedIconsAndPlaceholders.avatar1,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "member-2",
    name: "Marcus Rodriguez",
    role: "CTO",
    image: blockBrandedIconsAndPlaceholders.avatar2,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "member-3",
    name: "Priya Patel",
    role: "Head of Design",
    image: blockBrandedIconsAndPlaceholders.avatar3,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "member-4",
    name: "David Kim",
    role: "VP of Engineering",
    image: blockBrandedIconsAndPlaceholders.avatar4,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "member-5",
    name: "Emma Thompson",
    role: "Head of Marketing",
    image: blockBrandedIconsAndPlaceholders.avatar5,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
  {
    id: "member-6",
    name: "Alex Johnson",
    role: "Head of Sales",
    image: blockBrandedIconsAndPlaceholders.avatar6,
    social: { github: "#", twitter: "#", linkedin: "#" },
  },
];

/**
 * TeamHoverHighlight - Team grid with hover-activated highlight effect
 *
 * A visually engaging team section where hovering over a member card highlights
 * it while dimming others. Each card features a circular image, name, role, and
 * social links that appear on hover. The hover effect creates focus on the
 * selected member while maintaining context of the full team.
 *
 * @example
 * ```tsx
 * <TeamHoverHighlight
 *   heading="Meet Our Team"
 *   description="The talented individuals behind our success"
 *   members={[
 *     {
 *       id: "1",
 *       name: "Jane Doe",
 *       role: "Designer",
 *       image: "/team/jane.jpg",
 *       social: { linkedin: "https://linkedin.com/in/jane" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamHoverHighlight({
  heading = "Team",
  description = "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
  members = defaultMembers,
  background = "white",
  verticalMargin = "lg",
  className,
  optixFlowConfig,
}: TeamHoverHighlightProps): React.JSX.Element {
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
        <div className="group mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="relative flex flex-col items-center rounded-xl p-6 transition-all duration-300 group-hover:opacity-50 hover:opacity-100! hover:bg-muted/50"
            >
              <div className="relative mb-4 overflow-hidden rounded-full">
                <Img
                  src={member.image}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="size-28 rounded-full object-cover transition-transform duration-300 hover:scale-110"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              {member.social && (
                <div className="mt-4 flex gap-3 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
          ))}
        </div>
      </Container>
    </Section>
  );
}
