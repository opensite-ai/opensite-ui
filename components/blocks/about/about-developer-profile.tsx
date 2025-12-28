"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig, SocialLinkItem, OptixFlowConfig } from "../../../src/types";

export interface AboutDeveloperProfileProps {
  /**
   * Developer name
   */
  name?: React.ReactNode;
  /**
   * Developer role/title
   */
  role?: React.ReactNode;
  /**
   * Developer bio/description
   */
  bio?: React.ReactNode;
  /**
   * Avatar image configuration
   */
  avatar?: {
    src: string;
    alt: string;
  };
  /**
   * Array of skill tags
   */
  skills?: string[];
  /**
   * Custom slot for rendering skills (overrides skills array)
   */
  skillsSlot?: React.ReactNode;
  /**
   * Skills section title
   */
  skillsTitle?: React.ReactNode;
  /**
   * Array of social link configurations
   */
  socialLinks?: SocialLinkItem[];
  /**
   * Custom slot for rendering social links (overrides socialLinks array)
   */
  socialLinksSlot?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the name heading
   */
  nameClassName?: string;
  /**
   * Additional CSS classes for the role text
   */
  roleClassName?: string;
  /**
   * Additional CSS classes for the bio text
   */
  bioClassName?: string;
  /**
   * Additional CSS classes for the avatar image
   */
  avatarClassName?: string;
  /**
   * Additional CSS classes for the skills container
   */
  skillsClassName?: string;
  /**
   * Additional CSS classes for individual skill tags
   */
  skillTagClassName?: string;
  /**
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultSkills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "AWS",
  "Docker",
];

const defaultSocialLinks: SocialLinkItem[] = [
  { icon: <DynamicIcon name="lucide/github" size={24} />, href: "#", "aria-label": "GitHub" },
  { icon: <DynamicIcon name="lucide/linkedin" size={24} />, href: "#", "aria-label": "LinkedIn" },
  { icon: <DynamicIcon name="lucide/twitter" size={24} />, href: "#", "aria-label": "Twitter" },
];

const defaultActions: ActionConfig[] = [
  {
    label: "Get in Touch",
    href: "#",
    size: "lg",
    variant: "default",
    iconAfter: <DynamicIcon name="lucide/mail" size={16} className="ml-2" />,
  },
];

export function AboutDeveloperProfile({
  name = "Alex Johnson",
  role = "Full-Stack Developer",
  bio = `I'm a passionate full-stack developer with over 8 years of experience building web applications. I specialize in React, TypeScript, and Node.js, with a strong focus on creating performant and accessible user experiences.

When I'm not coding, you can find me contributing to open-source projects, writing technical blog posts, or exploring new technologies. I believe in continuous learning and sharing knowledge with the developer community.`,
  avatar,
  skills = defaultSkills,
  skillsSlot,
  skillsTitle = "Skills & Technologies",
  socialLinks = defaultSocialLinks,
  socialLinksSlot,
  actions = defaultActions,
  actionsSlot,
  className,
  containerClassName,
  contentClassName,
  nameClassName,
  roleClassName,
  bioClassName,
  avatarClassName,
  skillsClassName,
  skillTagClassName,
  socialLinksClassName,
  actionsClassName,
  optixFlowConfig,
}: AboutDeveloperProfileProps): React.JSX.Element {
  const renderSocialLinks = () => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((link, idx) => (
      <Pressable
        key={idx}
        href={link.href}
        aria-label={link["aria-label"]}
        className={cn("text-muted-foreground hover:text-foreground", link.className)}
      >
        {link.icon}
      </Pressable>
    ));
  };

  const renderSkills = () => {
    if (skillsSlot) return skillsSlot;
    if (!skills || skills.length === 0) return null;

    return skills.map((skill, idx) => (
      <span
        key={idx}
        className={cn("rounded-full bg-muted px-4 py-2 text-sm font-medium", skillTagClassName)}
      >
        {skill}
      </span>
    ));
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={actionClassName}
          {...pressableProps}
        >
          {children ?? (
            <>
              {icon}
              {label}
              {iconAfter}
            </>
          )}
        </Pressable>
      );
    });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto max-w-4xl", contentClassName)}>
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            {avatar && (
              <Img
                src={avatar.src}
                alt={avatar.alt}
                className={cn("h-48 w-48 rounded-full object-cover", avatarClassName)}
                optixFlowConfig={optixFlowConfig}
              />
            )}
            <div className="text-center md:text-left">
              {name && (
                typeof name === "string" ? (
                  <h1 className={cn("text-4xl font-bold", nameClassName)}>{name}</h1>
                ) : (
                  <div className={nameClassName}>{name}</div>
                )
              )}
              {role && (
                typeof role === "string" ? (
                  <p className={cn("mt-2 text-xl text-primary", roleClassName)}>{role}</p>
                ) : (
                  <div className={cn("mt-2", roleClassName)}>{role}</div>
                )
              )}
              {(socialLinksSlot || (socialLinks && socialLinks.length > 0)) && (
                <div className={cn("mt-4 flex justify-center gap-4 md:justify-start", socialLinksClassName)}>
                  {renderSocialLinks()}
                </div>
              )}
            </div>
          </div>

          {bio && (
            <div className="mt-12">
              {typeof bio === "string" ? (
                <p className={cn("text-lg text-muted-foreground whitespace-pre-line", bioClassName)}>
                  {bio}
                </p>
              ) : (
                <div className={bioClassName}>{bio}</div>
              )}
            </div>
          )}

          {(skillsSlot || (skills && skills.length > 0)) && (
            <div className={cn("mt-12", skillsClassName)}>
              {skillsTitle && (
                typeof skillsTitle === "string" ? (
                  <h2 className="text-xl font-semibold">{skillsTitle}</h2>
                ) : (
                  skillsTitle
                )
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {renderSkills()}
              </div>
            </div>
          )}

          {(actionsSlot || (actions && actions.length > 0)) && (
            <div className={cn("mt-12 text-center md:text-left", actionsClassName)}>
              {renderActions()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
