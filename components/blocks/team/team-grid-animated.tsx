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
 * Social link for team member
 */
export interface TeamGridAnimatedSocialLink {
  icon: string;
  href: string;
}

/**
 * Individual team member for TeamGridAnimated
 */
export interface TeamGridAnimatedMember {
  name: string;
  designation: string;
  imageSrc: string;
  socialLinks?: TeamGridAnimatedSocialLink[];
}

/**
 * Props for TeamGridAnimated component
 */
export interface TeamGridAnimatedProps {
  /**
   * Section title
   * @default "TEAM"
   */
  title?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Array of team members to display
   */
  members?: TeamGridAnimatedMember[];
  /**
   * Register link URL
   */
  registerLink?: string;
  /**
   * Logo element or URL
   */
  logo?: React.ReactNode;
  /**
   * Main social links for the company/section
   */
  socialLinksMain?: TeamGridAnimatedSocialLink[];
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

const defaultMembers: TeamGridAnimatedMember[] = [
  {
    name: "Sarah Chen",
    designation: "CEO & Founder",
    imageSrc: blockBrandedIconsAndPlaceholders.avatar1,
    socialLinks: [
      { icon: "lucide/twitter", href: "#" },
      { icon: "lucide/linkedin", href: "#" },
    ],
  },
  {
    name: "Marcus Rodriguez",
    designation: "CTO",
    imageSrc: blockBrandedIconsAndPlaceholders.avatar2,
    socialLinks: [
      { icon: "lucide/github", href: "#" },
      { icon: "lucide/linkedin", href: "#" },
    ],
  },
  {
    name: "Priya Patel",
    designation: "Head of Design",
    imageSrc: blockBrandedIconsAndPlaceholders.avatar3,
    socialLinks: [
      { icon: "lucide/twitter", href: "#" },
      { icon: "lucide/linkedin", href: "#" },
    ],
  },
];

const defaultSocialLinksMain: TeamGridAnimatedSocialLink[] = [
  { icon: "lucide/twitter", href: "#" },
  { icon: "lucide/linkedin", href: "#" },
  { icon: "lucide/github", href: "#" },
];

/**
 * TeamGridAnimated - Team grid with animated hover effects and background pattern
 *
 * A visually rich team section featuring a grid background pattern, animated
 * member cards with wave effects on hover, and optional company social links.
 * Each member card has a colored background that varies by position, circular
 * avatar with border animation, and social links that appear on hover. Includes
 * an optional register CTA button and company logo placement.
 *
 * @example
 * ```tsx
 * <TeamGridAnimated
 *   title="TEAM"
 *   description="Meet the talented individuals driving our vision"
 *   registerLink="/register"
 *   members={[
 *     {
 *       name: "Jane Doe",
 *       designation: "CEO",
 *       imageSrc: "/team/jane.jpg",
 *       socialLinks: [{ icon: "lucide/linkedin", href: "https://linkedin.com/in/jane" }]
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamGridAnimated({
  title = "TEAM",
  description = "Meet the talented individuals guiding our vision and driving innovation.",
  members = defaultMembers,
  registerLink,
  logo,
  socialLinksMain = defaultSocialLinksMain,
  background = "white",
  verticalMargin = "lg",
  className,
  optixFlowConfig,
}: TeamGridAnimatedProps): React.JSX.Element {
  const cardColors = [
    "hsl(var(--destructive)/0.1)",
    "hsl(var(--muted))",
    "hsl(var(--warning)/0.2)",
  ];

  return (
    <Section
      background={background}
      spacing={verticalMargin}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url(${patternSvgs.grid1})`,
          backgroundSize: "20px 20px",
        }}
      />

      <Container className="relative z-10">
        <div className="grid items-center justify-center gap-8 text-center">
          <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:items-start md:text-left lg:gap-8">
            <div className="grid gap-2 text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-muted-foreground">
                <span className="text-primary block text-xl sm:text-2xl md:text-3xl font-medium">
                  O U R
                </span>
                {title}
              </h1>
              {description && (
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {description}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center gap-4 md:items-end">
              {logo && <div className="text-2xl font-bold">{logo}</div>}
              {registerLink && (
                <Pressable
                  href={registerLink}
                  variant="default"
                  size="default"
                  asButton
                >
                  REGISTER NOW
                </Pressable>
              )}
            </div>
          </div>

          {socialLinksMain && socialLinksMain.length > 0 && (
            <div className="flex w-full items-center justify-center gap-4 py-4 md:justify-center">
              {socialLinksMain.map((link, index) => (
                <Pressable
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <DynamicIcon name={link.icon} size={24} />
                </Pressable>
              ))}
              <span className="text-muted-foreground text-sm">
                www.opensite.ai
              </span>
            </div>
          )}

          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
            {members.map((member, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center justify-end overflow-hidden rounded-xl p-6 text-center shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  backgroundColor: cardColors[index % cardColors.length],
                  color: "hsl(var(--foreground))",
                }}
              >
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/2 origin-bottom scale-y-0 transform rounded-t-full bg-linear-to-t from-primary/20 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
                  style={{ transitionDelay: `${index * 50}ms` }}
                />

                <div
                  className="relative z-10 h-36 w-36 overflow-hidden rounded-full border-4 border-transparent bg-background/20 transition-all duration-500 ease-out group-hover:border-primary group-hover:scale-105"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Img
                    src={member.imageSrc}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>

                <h3 className="relative z-10 mt-4 text-xl font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="relative z-10 text-sm text-muted-foreground">
                  {member.designation}
                </p>

                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="relative z-10 mt-4 flex gap-3 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    {member.socialLinks.map((link, linkIndex) => (
                      <Pressable
                        key={linkIndex}
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <DynamicIcon name={link.icon} size={20} />
                      </Pressable>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
