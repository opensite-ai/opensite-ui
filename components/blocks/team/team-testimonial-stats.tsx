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
 * Stats for team member
 */
export interface TeamTestimonialStatsStats {
  years?: string;
  projects?: string;
  clients?: string;
  awards?: string;
}

/**
 * Social links for team member
 */
export interface TeamTestimonialStatsSocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamTestimonialStats
 */
export interface TeamTestimonialStatsMember {
  name: string;
  role: string;
  testimonial: string;
  image: string;
  stats: TeamTestimonialStatsStats;
  social?: TeamTestimonialStatsSocialLinks;
}

/**
 * Props for TeamTestimonialStats component
 */
export interface TeamTestimonialStatsProps {
  /**
   * Section heading
   * @default "Meet our leadership"
   */
  heading?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Array of team members to display
   */
  members?: TeamTestimonialStatsMember[];
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

const defaultMembers: TeamTestimonialStatsMember[] = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    testimonial: "Building great products with an amazing team is what drives me every day.",
    image: blockBrandedIconsAndPlaceholders.avatar1,
    stats: {
      years: "12+",
      projects: "140+",
      clients: "50+",
    },
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    testimonial: "Design is not just what it looks like, it's how it works. I strive to make both perfect.",
    image: blockBrandedIconsAndPlaceholders.avatar2,
    stats: {
      years: "8+",
      projects: "200+",
      awards: "15",
    },
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
];

/**
 * TeamTestimonialStats - Split cards with testimonials and achievement stats
 *
 * A premium team section featuring horizontal cards split between a large image
 * and content area. Each card displays a full-height member photo on one side,
 * with name, role, achievement stats (years, projects, clients, awards), a
 * testimonial quote with quote icon, and social links on the other side.
 * Ideal for showcasing leadership with credibility-building metrics.
 *
 * @example
 * ```tsx
 * <TeamTestimonialStats
 *   heading="Our Leadership"
 *   description="The talented individuals guiding our vision"
 *   members={[
 *     {
 *       name: "Jane Doe",
 *       role: "CEO",
 *       testimonial: "Building the future of technology",
 *       image: "/team/jane.jpg",
 *       stats: { years: "15+", projects: "100+", clients: "50+" },
 *       social: { linkedin: "https://linkedin.com/in/jane" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamTestimonialStats({
  heading = "Meet our leadership",
  description = "The talented individuals guiding our vision",
  members = defaultMembers,
  background = "white",
  verticalMargin = "lg",
  className,
  optixFlowConfig,
}: TeamTestimonialStatsProps): React.JSX.Element {
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

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {members.map((member) => (
            <Card key={member.name} className="overflow-hidden p-0">
              <CardContent className="!p-0">
                <div className="grid sm:grid-cols-2">
                  <div className="relative h-full min-h-[200px]">
                    <Img
                      className="absolute inset-0 h-full w-full object-cover"
                      src={member.image}
                      alt={member.name}
                      width={320}
                      height={420}
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex h-full flex-col">
                      <div>
                        <h3 className="text-lg font-medium">{member.name}</h3>
                        <p className="text-muted-foreground mt-1 text-sm">
                          {member.role}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 py-6">
                        {Object.entries(member.stats).map(([key, value]) => (
                          <div key={key}>
                            <p className="text-2xl font-semibold">{value}</p>
                            <p className="text-muted-foreground mt-1 text-xs capitalize">
                              {key}
                            </p>
                          </div>
                        ))}
                      </div>

                      <blockquote className="text-muted-foreground mt-4 border-l-2 pl-4 italic">
                        <DynamicIcon
                          name="lucide/quote"
                          size={16}
                          className="text-primary mb-2"
                        />
                        {member.testimonial}
                      </blockquote>

                      {member.social && (
                        <div className="mt-6 flex gap-2">
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
