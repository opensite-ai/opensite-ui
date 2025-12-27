"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Container } from "../../ui/container";
import { Section } from "../../ui/section";
import { Img } from "@page-speed/img";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

/**
 * Configuration for Optix Flow image optimization
 */
export interface OptixFlowConfig {
  /**
   * API key for Optix Flow service
   */
  apiKey: string;
  /**
   * Compression level (0-100)
   */
  compression?: number;
}

/**
 * Individual team member item for TeamMediaShowcase
 */
export interface TeamMediaShowcaseItem {
  /**
   * Image source URL for the team member (required)
   */
  imageSrc: string;
  /**
   * Team member's name (optional)
   */
  name?: string;
  /**
   * Team member's role/title (optional)
   */
  role?: string;
  /**
   * Custom action element to display on hover (optional)
   * Can be a button, link, or any React node
   */
  action?: React.ReactNode;
  /**
   * Alt text for the image (defaults to name or generic text)
   */
  imageAlt?: string;
  /**
   * Additional CSS classes for the card
   */
  cardClassName?: string;
}

/**
 * Props for TeamMediaShowcase component
 */
export interface TeamMediaShowcaseProps {
  /**
   * Array of team member items to display (required)
   * Each item must have at least an imageSrc
   */
  items: TeamMediaShowcaseItem[];
  /**
   * Optional children to render above the grid (e.g., section header content)
   */
  children?: React.ReactNode;
  /**
   * Eyebrow text displayed above the grid
   */
  listEyebrow?: string;
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
   * Custom grid CSS classes
   * @default "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for @page-speed/img
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * Props for TeamMemberBackgroundImageCard component
 */
interface TeamMemberBackgroundImageCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Image URL for the background
   */
  imageUrl: string;
  /**
   * Alt text for the image
   */
  imageAlt: string;
  /**
   * Card content (overlaid on the image)
   */
  children?: React.ReactNode;
  /**
   * Optional Optix Flow configuration for @page-speed/img
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * TeamMemberBackgroundImageCard - Individual card with background image and hover effects
 *
 * Displays a team member with a full-bleed background image that zooms on hover,
 * with a gradient overlay for text readability.
 */
const TeamMemberBackgroundImageCard = React.forwardRef<
  HTMLDivElement,
  TeamMemberBackgroundImageCardProps
>(({ className, imageUrl, imageAlt, children, optixFlowConfig, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "group h-[400px] relative w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card shadow-lg",
        "transition-all duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      <Img
        src={imageUrl}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        optixFlowConfig={optixFlowConfig}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

      {children}
    </div>
  );
});
TeamMemberBackgroundImageCard.displayName = "TeamMemberBackgroundImageCard";

/**
 * TeamMediaShowcase - Display team members in a grid with background images
 *
 * A responsive grid of team member cards featuring full-bleed background images
 * with hover effects. Each card shows the member's name and role with an optional
 * action element that appears on hover.
 *
 * @example
 * ```tsx
 * <TeamMediaShowcase
 *   listEyebrow="Our Team"
 *   items={[
 *     {
 *       imageSrc: "/team/john.jpg",
 *       name: "John Doe",
 *       role: "CEO",
 *       action: <Pressable href="/team/john" variant="default" asButton>View Profile</Pressable>
 *     },
 *     {
 *       imageSrc: "/team/jane.jpg",
 *       name: "Jane Smith",
 *       role: "CTO"
 *     }
 *   ]}
 * />
 * ```
 */
export function TeamMediaShowcase({
  items,
  children,
  listEyebrow,
  background = "white",
  verticalMargin = "lg",
  gridClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  className,
  optixFlowConfig,
}: TeamMediaShowcaseProps): React.JSX.Element {
  return (
    <Section background={background} spacing={verticalMargin} className={className}>
      <Container>
        {children}

        <div className="space-y-12">
          <div className="space-y-6">
            {listEyebrow && typeof listEyebrow === "string" && listEyebrow.trim() !== "" && (
              <div className="text-md pt-8 uppercase text-dark-charcoal/70 tracking-[0.2em] font-semibold">
                {listEyebrow}
              </div>
            )}
            <div className={gridClassName}>
              {items.map((member, idx) => {
                const imageAlt =
                  member.imageAlt ||
                  (member.name && typeof member.name === "string" && member.name.trim() !== ""
                    ? member.name
                    : `member-${idx}`);

                return (
                  <TeamMemberBackgroundImageCard
                    key={idx}
                    imageUrl={member.imageSrc}
                    imageAlt={imageAlt}
                    className={member.cardClassName}
                    optixFlowConfig={optixFlowConfig}
                  >
                    <div className="relative flex h-full flex-col justify-end p-6 text-card-foreground">
                      <div className="space-y-4 transition-transform duration-500 ease-in-out group-hover:-translate-y-12">
                        <div>
                          {member.name &&
                            typeof member.name === "string" &&
                            member.name.trim() !== "" && (
                              <h4 className="text-3xl font-bold text-white">
                                {member.name}
                              </h4>
                            )}
                          {member.role &&
                            typeof member.role === "string" &&
                            member.role.trim() !== "" && (
                              <p className="text-sm text-white/80">{member.role}</p>
                            )}
                        </div>
                      </div>

                      {member.action ? (
                        <div className="absolute -bottom-20 left-0 w-full pt-2 p-6 opacity-0 transition-all duration-500 ease-in-out group-hover:bottom-0 group-hover:opacity-100">
                          {member.action}
                        </div>
                      ) : null}
                    </div>
                  </TeamMemberBackgroundImageCard>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export { TeamMemberBackgroundImageCard };
