"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface AboutStartupTeamProps {
  className?: string;
  title?: string;
  description?: string;
  sidebarLinks?: Array<{
    label: string;
    href: string;
    isActive?: boolean;
  }>;
  teamTitle?: string;
  teamMembers?: Array<{
    name: string;
    role: string;
    avatar?: {
      src: string;
      alt: string;
    };
    socialLinks?: Array<{
      icon: string;
      url: string;
      label: string;
    }>;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSidebarLinks = [
  { label: "About Us", href: "#about", isActive: true },
  { label: "Our Mission", href: "#mission" },
  { label: "Our Team", href: "#team" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

const defaultTeamMembers = [
  {
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    socialLinks: [
      { icon: "lucide/linkedin", url: "#", label: "LinkedIn" },
      { icon: "lucide/twitter", url: "#", label: "Twitter" },
    ],
  },
  {
    name: "Michael Park",
    role: "CTO & Co-Founder",
    socialLinks: [
      { icon: "lucide/linkedin", url: "#", label: "LinkedIn" },
      { icon: "lucide/github", url: "#", label: "GitHub" },
    ],
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Design",
    socialLinks: [
      { icon: "lucide/linkedin", url: "#", label: "LinkedIn" },
      { icon: "lucide/dribbble", url: "#", label: "Dribbble" },
    ],
  },
];

const defaultProps: Partial<AboutStartupTeamProps> = {
  title: "Building the Future of Software Development",
  description: `We're a team of passionate builders who believe that creating software should be accessible to everyone. Our platform empowers teams to build, deploy, and scale applications without the traditional barriers.

Founded in 2020, we've grown from a small startup to a platform trusted by thousands of companies worldwide. Our mission is simple: democratize software development and help teams bring their ideas to life faster than ever before.`,
  sidebarLinks: defaultSidebarLinks,
  teamTitle: "Meet Our Leadership",
  teamMembers: defaultTeamMembers,
};

export function AboutStartupTeam({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  sidebarLinks = defaultProps.sidebarLinks,
  teamTitle = defaultProps.teamTitle,
  teamMembers = defaultProps.teamMembers,
  optixFlowConfig,
}: AboutStartupTeamProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-4">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav className="space-y-1">
              {sidebarLinks?.map((link, idx) => (
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
          </aside>

          <div className="lg:col-span-3">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground whitespace-pre-line">
              {description}
            </p>

            <div className="mt-16">
              <h2 className="text-2xl font-bold">{teamTitle}</h2>
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {teamMembers?.map((member, idx) => (
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
                    <h3 className="mt-4 font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                    {member.socialLinks && member.socialLinks.length > 0 && (
                      <div className="mt-4 flex justify-center gap-3">
                        {member.socialLinks.map((link, linkIdx) => (
                          <Pressable
                            key={linkIdx}
                            href={link.url}
                            aria-label={link.label}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <DynamicIcon name={link.icon} size={18} />
                          </Pressable>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
