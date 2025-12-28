"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
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
export interface TeamHoverOverlaySocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamHoverOverlay
 */
export interface TeamHoverOverlayMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: TeamHoverOverlaySocialLinks;
}

/**
 * Props for TeamHoverOverlay component
 */
export interface TeamHoverOverlayProps {
  /**
   * Section heading
   * @default "Meet our team"
   */
  heading?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Array of team members to display
   */
  members?: TeamHoverOverlayMember[];
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

const defaultMembers: TeamHoverOverlayMember[] = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    bio: "I am an ambitious workaholic, but apart from that, pretty simple person.",
    image: blockBrandedIconsAndPlaceholders.avatar1,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    bio: "I am an ambitious workaholic, but apart from that, pretty simple person.",
    image: blockBrandedIconsAndPlaceholders.avatar2,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Priya Patel",
    role: "Head of Design",
    bio: "I am an ambitious workaholic, but apart from that, pretty simple person.",
    image: blockBrandedIconsAndPlaceholders.avatar3,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "David Kim",
    role: "VP of Engineering",
    bio: "I am an ambitious workaholic, but apart from that, pretty simple person.",
    image: blockBrandedIconsAndPlaceholders.avatar4,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
];

/**
 * TeamHoverOverlay - Portrait cards with hover-reveal bio and social links
 *
 * A visually striking team section featuring portrait-style cards (3:4 aspect ratio)
 * with a gradient overlay that reveals bio text and social links on hover. Each card
 * shows a full-bleed image with name and role at the bottom, and on hover displays
 * additional biographical information and social media links with a smooth animation.
 *
 * @example
 * ```tsx
 * <TeamHoverOverlay
 *   heading="Our Team"
 *   description="The amazing people behind the scenes"
 *   members={[
 *     {
 *       name: "Jane Doe",
 *       role: "Designer",
 *       bio: "Passionate about creating beautiful experiences",
 *       image: "/team/jane.jpg",
 *       social: { linkedin: "https://linkedin.com/in/jane" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamHoverOverlay({
  heading = "Meet our team",
  description = "The amazing people behind the scenes",
  members = defaultMembers,
  background = "white",
  verticalMargin = "lg",
  className,
  optixFlowConfig,
}: TeamHoverOverlayProps): React.JSX.Element {
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
            <Card
              key={member.name}
              className="group relative overflow-hidden p-0 transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-0!">
                <div className="relative">
                  <Img
                    className="aspect-3/4 w-full object-cover"
                    src={member.image}
                    alt={member.name}
                    width={320}
                    height={420}
                    optixFlowConfig={optixFlowConfig}
                  />
                  <div className="from-background/80 to-background/0 absolute inset-0 bg-linear-to-t opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute right-0 bottom-0 left-0 translate-y-4 p-4 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm">{member.bio}</p>
                    {member.social && (
                      <div className="mt-3 flex gap-1">
                        {member.social.twitter && (
                          <Pressable
                            href={member.social.twitter}
                            variant="secondary"
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
                            variant="secondary"
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
                            variant="secondary"
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
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {member.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
