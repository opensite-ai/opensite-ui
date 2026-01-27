"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface SidebarLinkItem {
  label: React.ReactNode;
  value: string;
}

export interface TeamMemberItem {
  name?: React.ReactNode;
  role?: React.ReactNode;
  avatar?: {
    src: string;
    alt: string;
  };
  socialLinks?: Array<{
    icon?: React.ReactNode;
    url: string;
    label: string;
  }>;
}

export interface AboutStartupTeamProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Main title
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Main description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Array of sidebar navigation links
   */
  sidebarLinks?: SidebarLinkItem[];
  /**
   * Custom slot for rendering sidebar (overrides sidebarLinks array)
   */
  sidebarSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Team section title
   */
  teamTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the team title
   */
  teamTitleClassName?: string;
  /**
   * Array of team members
   */
  teamMembers?: TeamMemberItem[];
  /**
   * Custom slot for rendering team members (overrides teamMembers array)
   */
  teamMembersSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the team members container
   */
  teamMembersClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Section background variant
   */
  background?: SectionBackground;
  /**
   * Section spacing variant
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern
   */
  pattern?: PatternName;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Default active tab value
   */
  defaultActiveTab?: string;
  /**
   * Callback when tab changes
   */
  onTabChange?: (value: string) => void;
}

export function AboutStartupTeam({
  className,
  containerClassName,
  title,
  titleClassName,
  description,
  descriptionClassName,
  sidebarLinks,
  sidebarSlot,
  sidebarClassName,
  teamTitle,
  teamTitleClassName,
  teamMembers,
  teamMembersSlot,
  teamMembersClassName,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
  defaultActiveTab,
  onTabChange,
}: AboutStartupTeamProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveTab || (sidebarLinks && sidebarLinks.length > 0 ? sidebarLinks[0].value : "")
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange?.(value);
  };

  const sidebarContent = useMemo(() => {
    if (sidebarSlot) return sidebarSlot;
    if (!sidebarLinks || sidebarLinks.length === 0) return null;

    return (
      <nav className="space-y-1">
        {sidebarLinks.map((link, idx) => (
          <Pressable
            key={idx}
            componentType="button"
            onClick={() => handleTabChange(link.value)}
            className={cn(
              "block w-full text-left rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              activeTab === link.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {link.label}
          </Pressable>
        ))}
      </nav>
    );
  }, [sidebarSlot, sidebarLinks, activeTab]);

  const teamMembersContent = useMemo(() => {
    if (teamMembersSlot) return teamMembersSlot;
    if (!teamMembers || teamMembers.length === 0) return null;

    return (
      <div className={cn("mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3", teamMembersClassName)}>
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="rounded-xl border bg-card p-6 text-center"
          >
            {member.avatar ? (
              <Img
                src={member.avatar.src}
                alt={member.avatar.alt}
                className="mx-auto h-24 w-24 rounded-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            ) : (
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <DynamicIcon
                  name="lucide/user"
                  size={40}
                  className="text-muted-foreground"
                />
              </div>
            )}
            {member.name && (
              typeof member.name === "string" ? (
                <h3 className="mt-4 font-semibold">{member.name}</h3>
              ) : (
                <div className="mt-4">{member.name}</div>
              )
            )}
            {member.role && (
              typeof member.role === "string" ? (
                <p className="text-sm text-muted-foreground">{member.role}</p>
              ) : (
                <div className="text-sm">{member.role}</div>
              )
            )}
            {member.socialLinks && member.socialLinks.length > 0 && (
              <div className="mt-4 flex justify-center gap-3">
                {member.socialLinks.map((link, linkIdx) => (
                  <Pressable
                    key={linkIdx}
                    href={link.url}
                    aria-label={link.label}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.icon}
                  </Pressable>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }, [teamMembersSlot, teamMembers, teamMembersClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn(containerClassName)}>
        <div className="grid gap-12 lg:grid-cols-4">
          <aside className={cn("lg:sticky lg:top-24 lg:self-start", sidebarClassName)}>
            {sidebarContent}
          </aside>

          <div className="lg:col-span-3">
            {title && (
              typeof title === "string" ? (
                <h1 className={cn("text-4xl font-bold tracking-tight md:text-5xl", titleClassName)}>
                  {title}
                </h1>
              ) : (
                <div className={titleClassName}>{title}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("mt-6 text-lg text-muted-foreground whitespace-pre-line", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={cn("mt-6", descriptionClassName)}>{description}</div>
              )
            )}

            <div className="mt-16">
              {teamTitle && (
                typeof teamTitle === "string" ? (
                  <h2 className={cn("text-2xl font-bold", teamTitleClassName)}>{teamTitle}</h2>
                ) : (
                  <div className={teamTitleClassName}>{teamTitle}</div>
                )
              )}
              {teamMembersContent}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
