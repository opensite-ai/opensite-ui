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
export interface TeamLargeImagesSocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamLargeImages
 */
export interface TeamLargeImagesMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: TeamLargeImagesSocialLinks;
}

/**
 * Props for TeamLargeImages component
 */
export interface TeamLargeImagesProps {
  /**
   * Section heading
   * @default "Our leadership"
   */
  heading?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Array of team members to display
   */
  members?: TeamLargeImagesMember[];
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

const defaultMembers: TeamLargeImagesMember[] = [
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
];

/**
 * TeamLargeImages - Team grid with large 4:3 images and bios
 *
 * A visually impactful team section featuring large 4:3 aspect ratio images
 * in a 3-column grid. Each member entry shows a prominent image, name, role,
 * biographical text, and social media links. Ideal for leadership pages or
 * smaller teams where you want to give each member significant visual presence.
 *
 * @example
 * ```tsx
 * <TeamLargeImages
 *   heading="Our Leadership"
 *   description="The talented people behind the scenes"
 *   members={[
 *     {
 *       name: "Jane Doe",
 *       role: "CEO",
 *       bio: "20 years of industry experience",
 *       image: "/team/jane.jpg",
 *       social: { linkedin: "https://linkedin.com/in/jane" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamLargeImages({
  heading = "Our leadership",
  description = "The talented people behind the scenes",
  members = defaultMembers,
  background = "white",
  verticalMargin = "lg",
  className,
  optixFlowConfig,
}: TeamLargeImagesProps): React.JSX.Element {
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div key={member.name} className="flex flex-col">
              <Img
                className="aspect-4/3 rounded-xl object-cover"
                src={member.image}
                alt={member.name}
                width={320}
                height={240}
                optixFlowConfig={optixFlowConfig}
              />
              <div className="mt-4">
                <h3 className="text-lg font-medium">{member.name}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {member.role}
                </p>
                <p className="text-muted-foreground mt-3 text-sm">
                  {member.bio}
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
