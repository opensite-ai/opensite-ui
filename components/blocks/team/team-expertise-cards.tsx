"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { Pressable } from "../../../lib/Pressable";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

/**
 * Individual team member for TeamExpertiseCards
 */
export interface TeamExpertiseCardsMember {
  id: string;
  name: string;
  role: string;
  department: string;
  description: string;
  expertise: string[];
  avatar: string;
}

/**
 * Props for TeamExpertiseCards component
 */
export interface TeamExpertiseCardsProps {
  /**
   * Section heading
   * @default "Team"
   */
  heading?: React.ReactNode;
  /**
   * Section description
   */
  description?: React.ReactNode;
  /**
   * Array of team members to display
   */
  members?: TeamExpertiseCardsMember[];
  /**
   * Custom slot for rendering members (overrides members array)
   */
  membersSlot?: React.ReactNode;
  /**
   * CTA section heading
   */
  ctaHeading?: React.ReactNode;
  /**
   * CTA section description
   */
  ctaDescription?: React.ReactNode;
  /**
   * CTA button text
   */
  ctaButtonText?: React.ReactNode;
  /**
   * CTA button URL
   */
  ctaButtonUrl?: string;
  /**
   * Custom slot for rendering CTA (overrides CTA props)
   */
  ctaSlot?: React.ReactNode;
  /**
   * Background style variant for the section
   * @default "gray"
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
  pattern?: PatternName | undefined;
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
   * Additional CSS classes for the avatar
   */
  avatarClassName?: string;
  /**
   * Additional CSS classes for the member name
   */
  memberNameClassName?: string;
  /**
   * Additional CSS classes for the member role
   */
  memberRoleClassName?: string;
  /**
   * Additional CSS classes for the department badge
   */
  departmentBadgeClassName?: string;
  /**
   * Additional CSS classes for the member description
   */
  memberDescriptionClassName?: string;
  /**
   * Additional CSS classes for the expertise badges container
   */
  expertiseClassName?: string;
  /**
   * Additional CSS classes for the CTA section
   */
  ctaSectionClassName?: string;
  /**
   * Additional CSS classes for the CTA heading
   */
  ctaHeadingClassName?: string;
  /**
   * Additional CSS classes for the CTA description
   */
  ctaDescriptionClassName?: string;
  /**
   * Additional CSS classes for the CTA button
   */
  ctaButtonClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * TeamExpertiseCards - Team cards with expertise tags and careers CTA
 *
 * A professional team section featuring glassmorphism-style cards with member
 * details and expertise tags. Each card displays an avatar, name, role, department
 * badge, description, and skill/expertise badges. Includes a bottom CTA section
 * for career opportunities. Perfect for companies wanting to highlight team
 * expertise and recruit new talent.
 *
 * @example
 * ```tsx
 * <TeamExpertiseCards
 *   heading="Our Experts"
 *   description="Meet the talented team behind our success"
 *   ctaHeading="Join Our Team"
 *   ctaButtonText="View Open Positions"
 *   ctaButtonUrl="/careers"
 *   members={[
 *     {
 *       id: "1",
 *       name: "John Doe",
 *       role: "Senior Engineer",
 *       department: "Engineering",
 *       description: "Full-stack developer with 8 years experience",
 *       expertise: ["React", "Node.js", "AWS"],
 *       avatar: "/avatars/john.jpg"
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamExpertiseCards({
  heading,
  description,
  members,
  membersSlot,
  ctaHeading,
  ctaDescription,
  ctaButtonText,
  ctaButtonUrl = "#",
  ctaSlot,
  background = "gray",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  memberCardClassName,
  avatarClassName,
  memberNameClassName,
  memberRoleClassName,
  departmentBadgeClassName,
  memberDescriptionClassName,
  expertiseClassName,
  ctaSectionClassName,
  ctaHeadingClassName,
  ctaDescriptionClassName,
  ctaButtonClassName,
}: TeamExpertiseCardsProps): React.JSX.Element {
  const renderMembers = () => {
    if (membersSlot) return membersSlot;
    if (!members || members.length === 0) return null;

    return members.map((member) => (
      <Card
        key={member.id}
        className={cn(
          "group border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg",
          memberCardClassName,
        )}
      >
        <CardContent className="p-6">
          <div className="relative mb-6">
            <Avatar className={cn("mx-auto h-20 w-20", avatarClassName)}>
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="bg-linear-to-br from-primary/20 to-secondary/20 text-2xl font-bold text-primary">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="mb-4 text-center">
            <h3
              className={cn(
                "mb-1 text-lg font-semibold transition-colors group-hover:text-primary",
                memberNameClassName,
              )}
            >
              {member.name}
            </h3>
            <p
              className={cn(
                "mb-2 text-sm font-medium text-primary",
                memberRoleClassName,
              )}
            >
              {member.role}
            </p>
            <Badge
              variant="outline"
              className={cn("text-xs", departmentBadgeClassName)}
            >
              {member.department}
            </Badge>
          </div>

          <p
            className={cn(
              "mb-4 text-sm leading-relaxed text-muted-foreground",
              memberDescriptionClassName,
            )}
          >
            {member.description}
          </p>

          <div className={cn("flex flex-wrap gap-1", expertiseClassName)}>
            {member.expertise.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-muted/50 px-2 py-1 text-xs"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    ));
  };

  const renderCta = () => {
    if (ctaSlot) return ctaSlot;

    return (
      <div
        className={cn("mt-16 border-t pt-16 text-center", ctaSectionClassName)}
      >
        {ctaHeading &&
          (typeof ctaHeading === "string" ? (
            <h3
              className={cn("mb-4 text-2xl font-semibold", ctaHeadingClassName)}
            >
              {ctaHeading}
            </h3>
          ) : (
            <div className={ctaHeadingClassName}>{ctaHeading}</div>
          ))}
        {ctaDescription &&
          (typeof ctaDescription === "string" ? (
            <p
              className={cn(
                "mx-auto mb-6 max-w-2xl text-muted-foreground",
                ctaDescriptionClassName,
              )}
            >
              {ctaDescription}
            </p>
          ) : (
            <div className={ctaDescriptionClassName}>{ctaDescription}</div>
          ))}
        <Pressable
          href={ctaButtonUrl}
          variant="default"
          size="lg"
          asButton
          className={cn("px-8", ctaButtonClassName)}
        >
          {ctaButtonText}
        </Pressable>
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("mb-16 text-center", headerClassName)}>
        {heading &&
          (typeof heading === "string" ? (
            <h2
              className={cn(
                "mb-6 text-4xl font-bold tracking-tight lg:text-5xl",
                headingClassName,
              )}
            >
              {heading}
            </h2>
          ) : (
            <div className={headingClassName}>{heading}</div>
          ))}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn(
                "mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          ))}
      </div>

      <div
        className={cn(
          "grid gap-8 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {renderMembers()}
      </div>

      {renderCta()}
    </Section>
  );
}
