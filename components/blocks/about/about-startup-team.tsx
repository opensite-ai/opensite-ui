"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { OptixFlowConfig } from "../../../src/types";

export interface SidebarLinkItem {
  label: React.ReactNode;
  href: string;
  isActive?: boolean;
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
}

export function AboutStartupTeam({
  className,
  containerClassName,
  title = "Building the Future of Software Development",
  titleClassName,
  description = `We're a team of passionate builders who believe that creating software should be accessible to everyone. Our platform empowers teams to build, deploy, and scale applications without the traditional barriers.

Founded in 2020, we've grown from a small startup to a platform trusted by thousands of companies worldwide. Our mission is simple: democratize software development and help teams bring their ideas to life faster than ever before.`,
  descriptionClassName,
  sidebarLinks,
  sidebarSlot,
  sidebarClassName,
  teamTitle = "Meet Our Leadership",
  teamTitleClassName,
  teamMembers,
  teamMembersSlot,
  teamMembersClassName,
  optixFlowConfig,
}: AboutStartupTeamProps): React.JSX.Element {
  const renderSidebar = () => {
    if (sidebarSlot) return sidebarSlot;
    if (!sidebarLinks || sidebarLinks.length === 0) return null;

    return (
      <nav className="space-y-1">
        {sidebarLinks.map((link, idx) => (
          <Pressable
            key={idx}
            href={link.href}
            className={cn(
              "block rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              link.isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {link.label}
          </Pressable>
        ))}
      </nav>
    );
  };

  const renderTeamMembers = () => {
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
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="grid gap-12 lg:grid-cols-4">
          <aside className={cn("lg:sticky lg:top-24 lg:self-start", sidebarClassName)}>
            {renderSidebar()}
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
              {renderTeamMembers()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
