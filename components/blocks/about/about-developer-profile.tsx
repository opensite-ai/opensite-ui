"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface AboutDeveloperProfileProps {
  className?: string;
  name?: string;
  role?: string;
  bio?: string;
  avatar?: {
    src: string;
    alt: string;
  };
  skills?: string[];
  socialLinks?: Array<{
    icon: string;
    url: string;
    label: string;
  }>;
  ctaText?: string;
  ctaUrl?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSkills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "AWS",
  "Docker",
];

const defaultSocialLinks = [
  { icon: "lucide/github", url: "#", label: "GitHub" },
  { icon: "lucide/linkedin", url: "#", label: "LinkedIn" },
  { icon: "lucide/twitter", url: "#", label: "Twitter" },
];

const defaultProps: Partial<AboutDeveloperProfileProps> = {
  name: "Alex Johnson",
  role: "Full-Stack Developer",
  bio: `I'm a passionate full-stack developer with over 8 years of experience building web applications. I specialize in React, TypeScript, and Node.js, with a strong focus on creating performant and accessible user experiences.

When I'm not coding, you can find me contributing to open-source projects, writing technical blog posts, or exploring new technologies. I believe in continuous learning and sharing knowledge with the developer community.`,
  skills: defaultSkills,
  socialLinks: defaultSocialLinks,
  ctaText: "Get in Touch",
  ctaUrl: "#",
};

export function AboutDeveloperProfile({
  className,
  name = defaultProps.name,
  role = defaultProps.role,
  bio = defaultProps.bio,
  avatar,
  skills = defaultProps.skills,
  socialLinks = defaultProps.socialLinks,
  ctaText = defaultProps.ctaText,
  ctaUrl = defaultProps.ctaUrl,
  optixFlowConfig,
}: AboutDeveloperProfileProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            {avatar && (
              <Img
                src={avatar.src}
                alt={avatar.alt}
                className="h-48 w-48 rounded-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            )}
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold">{name}</h1>
              <p className="mt-2 text-xl text-primary">{role}</p>
              {socialLinks && socialLinks.length > 0 && (
                <div className="mt-4 flex justify-center gap-4 md:justify-start">
                  {socialLinks.map((link, idx) => (
                    <Pressable
                      key={idx}
                      href={link.url}
                      aria-label={link.label}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <DynamicIcon name={link.icon} size={24} />
                    </Pressable>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-12">
            <p className="text-lg text-muted-foreground whitespace-pre-line">
              {bio}
            </p>
          </div>

          {skills && skills.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold">Skills & Technologies</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="rounded-full bg-muted px-4 py-2 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {ctaText && ctaUrl && (
            <div className="mt-12 text-center md:text-left">
              <Pressable href={ctaUrl} size="lg" variant="default" asButton>
                {ctaText}
                <DynamicIcon name="lucide/mail" size={16} className="ml-2" />
              </Pressable>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
