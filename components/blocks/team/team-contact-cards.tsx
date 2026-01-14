"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Card, CardContent } from "../../ui/card";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

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
  heading?: React.ReactNode;
  /**
   * Section description
   */
  description?: React.ReactNode;
  /**
   * Array of team members to display
   */
  members?: TeamContactCardsMember[];
  /**
   * Custom slot for rendering members (overrides members array)
   */
  membersSlot?: React.ReactNode;
  /**
   * Background style variant for the section
   * @default "white"
   */
  background?: SectionBackground;
  /**
   * Vertical spacing/margin variant
   * @default "lg"
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the grid container
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each member card
   */
  memberCardClassName?: string;
  /**
   * Additional CSS classes for the member image
   */
  memberImageClassName?: string;
  /**
   * Additional CSS classes for the member name
   */
  memberNameClassName?: string;
  /**
   * Additional CSS classes for the member role
   */
  memberRoleClassName?: string;
  /**
   * Additional CSS classes for the member bio
   */
  memberBioClassName?: string;
  /**
   * Additional CSS classes for the contact info container
   */
  contactClassName?: string;
  /**
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

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
  members,
  membersSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  memberCardClassName,
  memberImageClassName,
  memberNameClassName,
  memberRoleClassName,
  memberBioClassName,
  contactClassName,
  socialLinksClassName,
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

  const renderMembers = () => {
    if (membersSlot) return membersSlot;
    if (!members || members.length === 0) return null;

    return members.map((member) => (
      <Card key={member.name} className={cn("p-0", memberCardClassName)}>
        <CardContent className="p-6!">
          <div className="flex gap-6">
            <div className="relative shrink-0">
              <Img
                className={cn("size-24 rounded-xl object-cover", memberImageClassName)}
                src={member.image}
                alt={member.name}
                width={96}
                height={96}
                optixFlowConfig={optixFlowConfig}
              />
              <span
                className={cn(
                  "border-background absolute -top-2 -right-2 size-4 rounded-full border-2",
                  getStatusColor(member.status),
                )}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-4">
                <h3 className={cn("truncate text-lg font-medium", memberNameClassName)}>
                  {member.name}
                </h3>
                <p className={cn("text-muted-foreground text-sm", memberRoleClassName)}>
                  {member.role}
                </p>
              </div>
              <div className="space-y-2">
                <p className={cn("text-muted-foreground text-sm", memberBioClassName)}>
                  {member.bio}
                </p>
                <p className="text-sm font-medium">
                  {member.availability}
                </p>
              </div>
            </div>
          </div>

          <div className={cn("mt-6 space-y-3 border-t pt-6", contactClassName)}>
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
            <div className={cn("mt-6 flex gap-2", socialLinksClassName)}>
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
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("mx-auto mb-10 max-w-2xl text-center lg:mb-14", headerClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h2
              className={cn(
                "text-3xl font-bold md:text-4xl md:leading-tight",
                headingClassName
              )}
            >
              {heading}
            </h2>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p
              className={cn(
                "text-muted-foreground mt-1 text-lg",
                descriptionClassName
              )}
            >
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
      </div>

      <div className={cn("grid grid-cols-1 gap-8 md:grid-cols-2", gridClassName)}>
        {renderMembers()}
      </div>
    </Section>
  );
}
