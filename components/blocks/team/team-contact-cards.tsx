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
 * Contact information for team member
 */
export interface TeamContactCardsContact {
  email: string;
  phone: string;
  location: string;
}

/**
 * Social links for team member
 */
export interface TeamContactCardsSocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Individual team member for TeamContactCards
 */
export interface TeamContactCardsMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  contact: TeamContactCardsContact;
  availability: string;
  status: "active" | "busy" | "away";
  social?: TeamContactCardsSocialLinks;
}

/**
 * Props for TeamContactCards component
 */
export interface TeamContactCardsProps {
  /**
   * Section heading
   * @default "Get in touch"
   */
  heading?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Array of team members to display
   */
  members?: TeamContactCardsMember[];
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

const defaultMembers: TeamContactCardsMember[] = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    bio: "Available for strategic partnerships and speaking engagements.",
    image: blockBrandedIconsAndPlaceholders.avatar1,
    contact: {
      email: "sarah@opensite.ai",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
    },
    availability: "Available for meetings",
    status: "active",
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
  {
    name: "Marcus Rodriguez",
    role: "CTO",
    bio: "Open to technical discussions and consulting.",
    image: blockBrandedIconsAndPlaceholders.avatar2,
    contact: {
      email: "marcus@opensite.ai",
      phone: "+1 (555) 234-5678",
      location: "New York, NY",
    },
    availability: "Available next month",
    status: "busy",
    social: { twitter: "#", github: "#", linkedin: "#" },
  },
];

/**
 * TeamContactCards - Contact-focused team cards with availability status
 *
 * A comprehensive team section designed for contact and networking purposes.
 * Each card displays a member photo with availability status indicator, name,
 * role, bio, contact information (email, phone, location), availability text,
 * and social links. Status indicators show green for active, yellow for busy,
 * and gray for away. Ideal for sales teams, consultants, or any team where
 * direct contact is important.
 *
 * @example
 * ```tsx
 * <TeamContactCards
 *   heading="Contact Our Team"
 *   description="Reach out to the right person"
 *   members={[
 *     {
 *       name: "John Doe",
 *       role: "Sales Director",
 *       bio: "Available for enterprise discussions",
 *       image: "/avatars/john.jpg",
 *       contact: { email: "john@example.com", phone: "+1 555-0123", location: "NYC" },
 *       availability: "Available now",
 *       status: "active",
 *       social: { linkedin: "https://linkedin.com/in/john" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamContactCards({
  heading = "Get in touch",
  description = "Connect with our team members",
  members = defaultMembers,
  background = "white",
  verticalMargin = "lg",
  className,
  optixFlowConfig,
}: TeamContactCardsProps): React.JSX.Element {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "busy":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {members.map((member) => (
            <Card key={member.name} className="p-0">
              <CardContent className="!p-6">
                <div className="flex gap-6">
                  <div className="relative shrink-0">
                    <Img
                      className="size-24 rounded-xl object-cover"
                      src={member.image}
                      alt={member.name}
                      width={96}
                      height={96}
                      optixFlowConfig={optixFlowConfig}
                    />
                    <span
                      className={cn(
                        "border-background absolute -top-2 -right-2 size-4 rounded-full border-2",
                        getStatusColor(member.status)
                      )}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-4">
                      <h3 className="truncate text-lg font-medium">
                        {member.name}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {member.role}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-muted-foreground text-sm">
                        {member.bio}
                      </p>
                      <p className="text-sm font-medium">{member.availability}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3 border-t pt-6">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <DynamicIcon name="lucide/mail" size={16} />
                    {member.contact.email}
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <DynamicIcon name="lucide/phone" size={16} />
                    {member.contact.phone}
                  </div>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <DynamicIcon name="lucide/map-pin" size={16} />
                    {member.contact.location}
                  </div>
                </div>

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
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
