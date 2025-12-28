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
import { patternSvgs } from "../../../lib/patternSvgs";

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
export interface TeamAlternatingBiosSocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamAlternatingBios
 */
export interface TeamAlternatingBiosMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social?: TeamAlternatingBiosSocialLinks;
}

/**
 * Props for TeamAlternatingBios component
 */
export interface TeamAlternatingBiosProps {
  /**
   * Section heading
   * @default "Leadership team"
   */
  heading?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Array of team members to display
   */
  members?: TeamAlternatingBiosMember[];
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

const defaultMembers: TeamAlternatingBiosMember[] = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    bio: "Sarah has been in the tech industry for over 12 years, founding multiple successful startups. Her vision and leadership have been instrumental in our growth.",
    image: blockBrandedIconsAndPlaceholders.avatar1,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    bio: "With a background in distributed systems and AI, Marcus brings a unique perspective to our product development process, ensuring our solutions are both innovative and scalable.",
    image: blockBrandedIconsAndPlaceholders.avatar2,
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
];

/**
 * TeamAlternatingBios - Alternating layout with large images and detailed bios
 *
 * A premium team section featuring alternating left/right layouts for each member.
 * Each entry displays a large 4:3 aspect ratio image, name, role, detailed bio,
 * and social media links. Includes a decorative dot pattern background element.
 * Ideal for showcasing key leadership with in-depth biographical information.
 *
 * @example
 * ```tsx
 * <TeamAlternatingBios
 *   heading="Our Leadership"
 *   description="Meet the visionaries behind our success"
 *   members={[
 *     {
 *       name: "Jane Smith",
 *       role: "CEO",
 *       bio: "20 years of industry experience leading innovative companies...",
 *       image: "/team/jane.jpg",
 *       social: { linkedin: "https://linkedin.com/in/jane" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamAlternatingBios({
  heading = "Leadership team",
  description = "Meet the people shaping our future",
  members = defaultMembers,
  background = "white",
  verticalMargin = "lg",
  className,
  optixFlowConfig,
}: TeamAlternatingBiosProps): React.JSX.Element {
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

        <div className="space-y-24">
          {members.map((member, index) => (
            <div
              key={member.name}
              className="grid items-center gap-8 md:grid-cols-2 lg:gap-12"
            >
              <div
                className={cn(
                  "relative",
                  index % 2 === 1 ? "md:order-last" : ""
                )}
              >
                <div className="relative aspect-[4/3]">
                  <Img
                    className="rounded-xl object-cover w-full h-full"
                    src={member.image}
                    alt={member.name}
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                <div
                  className={cn(
                    "absolute -z-10 size-48 opacity-30",
                    index % 2 === 1 ? "-bottom-6 -left-6" : "-right-6 -bottom-6"
                  )}
                  style={{
                    backgroundImage: `url(${patternSvgs.dotPattern})`,
                    backgroundSize: "16px 16px",
                  }}
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold">{member.name}</h3>
                  <p className="text-muted-foreground mt-1 text-lg">
                    {member.role}
                  </p>
                </div>

                <p className="text-muted-foreground">{member.bio}</p>

                {member.social && (
                  <div className="flex gap-2">
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
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
