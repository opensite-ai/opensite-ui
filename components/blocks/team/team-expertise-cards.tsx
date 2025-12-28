"use client";

import * as React from "react";
import { Container } from "../../ui/container";
import { Section } from "../../ui/section";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
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
  heading?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Array of team members to display
   */
  members?: TeamExpertiseCardsMember[];
  /**
   * CTA section heading
   */
  ctaHeading?: string;
  /**
   * CTA section description
   */
  ctaDescription?: string;
  /**
   * CTA button text
   */
  ctaButtonText?: string;
  /**
   * CTA button URL
   */
  ctaButtonUrl?: string;
  /**
   * Background style variant for the section
   * @default "gray"
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

const defaultMembers: TeamExpertiseCardsMember[] = [
  {
    id: "person-1",
    name: "Sarah Chen",
    role: "CEO & Co-founder",
    department: "Leadership",
    description:
      "Former Google PM with 10+ years building products that millions use daily. Passionate about creating meaningful impact through technology.",
    expertise: ["Product Strategy", "Team Leadership", "Growth"],
    avatar: blockBrandedIconsAndPlaceholders.avatar1,
  },
  {
    id: "person-2",
    name: "Marcus Rodriguez",
    role: "CTO & Co-founder",
    department: "Engineering",
    description:
      "Ex-Meta engineer who led teams building infrastructure that served billions of users. Loves solving complex technical challenges.",
    expertise: ["System Architecture", "AI/ML", "Scalability"],
    avatar: blockBrandedIconsAndPlaceholders.avatar2,
  },
  {
    id: "person-3",
    name: "Priya Patel",
    role: "Head of Design",
    department: "Design",
    description:
      "Design leader with experience at Airbnb and Figma. Believes great design should be invisible and solve real user problems.",
    expertise: ["UX Design", "Design Systems", "User Research"],
    avatar: blockBrandedIconsAndPlaceholders.avatar3,
  },
  {
    id: "person-4",
    name: "David Kim",
    role: "VP of Engineering",
    department: "Engineering",
    description:
      "Built and scaled engineering teams at Stripe and Uber. Focuses on creating high-performing teams and robust systems.",
    expertise: ["Team Building", "Backend Systems", "DevOps"],
    avatar: blockBrandedIconsAndPlaceholders.avatar4,
  },
  {
    id: "person-5",
    name: "Emma Thompson",
    role: "Head of Marketing",
    department: "Marketing",
    description:
      "Marketing strategist who grew multiple startups from 0 to millions in revenue. Expert in growth marketing and brand building.",
    expertise: ["Growth Marketing", "Brand Strategy", "Content"],
    avatar: blockBrandedIconsAndPlaceholders.avatar5,
  },
  {
    id: "person-6",
    name: "Alex Johnson",
    role: "Head of Sales",
    department: "Sales",
    description:
      "Sales leader with a track record of building high-performing teams and exceeding revenue targets in competitive markets.",
    expertise: ["Enterprise Sales", "Team Management", "Customer Success"],
    avatar: blockBrandedIconsAndPlaceholders.avatar6,
  },
];

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
  heading = "Team",
  description = "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
  members = defaultMembers,
  ctaHeading = "Ready to build the future with us?",
  ctaDescription = "We're always looking for talented individuals who share our passion for innovation and making a difference. Check out our current openings.",
  ctaButtonText = "Explore Careers",
  ctaButtonUrl = "#",
  background = "gray",
  verticalMargin = "lg",
  className,
}: TeamExpertiseCardsProps): React.JSX.Element {
  return (
    <Section
      background={background}
      spacing={verticalMargin}
      className={className}
    >
      <Container>
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight lg:text-5xl">
            {heading}
          </h2>
          {description && (
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <Card
              key={member.id}
              className="group border-0 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <Avatar className="mx-auto h-20 w-20">
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
                  <h3 className="mb-1 text-lg font-semibold transition-colors group-hover:text-primary">
                    {member.name}
                  </h3>
                  <p className="mb-2 text-sm font-medium text-primary">
                    {member.role}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {member.department}
                  </Badge>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {member.description}
                </p>

                <div className="flex flex-wrap gap-1">
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
          ))}
        </div>

        <div className="mt-16 border-t pt-16 text-center">
          <h3 className="mb-4 text-2xl font-semibold">{ctaHeading}</h3>
          <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
            {ctaDescription}
          </p>
          <Pressable
            href={ctaButtonUrl}
            variant="default"
            size="lg"
            asButton
            className="px-8"
          >
            {ctaButtonText}
          </Pressable>
        </div>
      </Container>
    </Section>
  );
}
