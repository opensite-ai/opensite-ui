"use client";

import * as React from "react";
import { cn, getTextColor, getNestedCardBg } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Img } from "@page-speed/img";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

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
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Optional children to render above the grid (e.g., section header content)
   */
  children?: React.ReactNode;
  /**
   * Eyebrow text displayed above the grid
   */
  listEyebrow?: React.ReactNode;
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
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
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
   * Additional CSS classes for the eyebrow text
   */
  eyebrowClassName?: string;
  /**
   * Additional CSS classes for the member name
   */
  memberNameClassName?: string;
  /**
   * Additional CSS classes for the member role
   */
  memberRoleClassName?: string;
  /**
   * Additional CSS classes for the action container
   */
  actionClassName?: string;
  /**
   * Optional Optix Flow configuration for @page-speed/img
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * Props for TeamMemberBackgroundImageCard component
 */
interface TeamMemberBackgroundImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
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
  /**
   * Background style variant for dynamic color utilities
   */
  background?: SectionBackground;
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
>(
  (
    { className, imageUrl, imageAlt, children, optixFlowConfig, background, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          getNestedCardBg(background, "card"),
          "group h-[400px] relative w-full max-w-sm overflow-hidden rounded-xl border border-border shadow-lg",
          "transition-all duration-300 ease-in-out",
          className,
        )}
        {...props}
      >
        <Img
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          optixFlowConfig={optixFlowConfig}
        />

        <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-foreground/20 to-transparent"></div>

        {children}
      </div>
    );
  },
);
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
  itemsSlot,
  children,
  listEyebrow,
  background,
  spacing,
  pattern,
  patternOpacity,
  gridClassName,
  className,
  eyebrowClassName,
  memberNameClassName,
  memberRoleClassName,
  actionClassName,
  optixFlowConfig,
}: TeamMediaShowcaseProps): React.JSX.Element {
  const renderItems = React.useMemo(() => {
    if (itemsSlot) return itemsSlot;

    return items.map((member, idx) => {
      const imageAlt =
        member.imageAlt ||
        (member.name &&
        typeof member.name === "string" &&
        member.name.trim() !== ""
          ? member.name
          : `member-${idx}`);

      return (
        <TeamMemberBackgroundImageCard
          key={idx}
          imageUrl={member.imageSrc}
          imageAlt={imageAlt}
          className={member.cardClassName}
          optixFlowConfig={optixFlowConfig}
          background={background}
        >
          <div className="relative flex h-full flex-col justify-end p-6 text-card-foreground">
            <div className="space-y-4 transition-transform duration-500 ease-in-out md:group-hover:-translate-y-12">
              <div>
                {member.name &&
                  typeof member.name === "string" &&
                  member.name.trim() !== "" && (
                    <h4
                      className={cn(
                        "text-3xl font-bold text-background",
                        memberNameClassName,
                      )}
                    >
                      {member.name}
                    </h4>
                  )}
                {member.role &&
                  typeof member.role === "string" &&
                  member.role.trim() !== "" && (
                    <p
                      className={cn(
                        "text-sm text-background/80",
                        memberRoleClassName,
                      )}
                    >
                      {member.role}
                    </p>
                  )}
              </div>
            </div>

            {member.action ? (
              <div
                className={cn(
                  "mt-4 w-full md:absolute md:-bottom-20 md:left-0 md:mt-0 md:p-6 md:pt-2 md:opacity-0 md:transition-all md:duration-500 md:ease-in-out md:group-hover:bottom-0 md:group-hover:opacity-100",
                  actionClassName,
                )}
              >
                {member.action}
              </div>
            ) : null}
          </div>
        </TeamMemberBackgroundImageCard>
      );
    });
  }, [itemsSlot, items, optixFlowConfig, memberNameClassName, memberRoleClassName, actionClassName, background]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      {children}

      <div className="space-y-12">
        <div className="space-y-6">
          {listEyebrow &&
            (typeof listEyebrow === "string" && listEyebrow.trim() !== "" ? (
              <div
                className={cn(
                  getTextColor(background, "muted"),
                  "text-md pt-8 uppercase tracking-[0.2em] font-semibold",
                  eyebrowClassName,
                )}
              >
                {listEyebrow}
              </div>
            ) : (
              <div className={eyebrowClassName}>{listEyebrow}</div>
            ))}
          <div className={gridClassName}>{renderItems}</div>
        </div>
      </div>
    </Section>
  );
}

export { TeamMemberBackgroundImageCard };
