"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SocialLinkItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";
import { Badge } from "@/components/ui/badge";
import { SocialLinkIcon } from "@/components/ui/social-link-icon";

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
  /**
   * Section background variant
   */
  background?: SectionBackground;
  /**
   * Section spacing variant
   */
  spacing?: SectionSpacing;
  /**
   * Pattern background key or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /** Optional Section ID */
  sectionId?: string;
}

export function AboutDeveloperProfile({
  sectionId = "about-developer-profile",
  name,
  role,
  bio,
  avatar,
  skills,
  skillsSlot,
  skillsTitle,
  socialLinks,
  socialLinksSlot,
  actions,
  actionsSlot,
  className,
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
  background,
  spacing = "lg",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  pattern,
  patternOpacity,
}: AboutDeveloperProfileProps): React.JSX.Element {
  const socialLinksContent = useMemo(() => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div
        className={cn(
          "flex justify-center gap-2 md:justify-start items-center flex-wrap",
          socialLinksClassName,
        )}
      >
        {socialLinks.map((link, idx) => (
          <SocialLinkIcon
            key={idx}
            {...link}
            size="icon-lg"
            variant="outline"
            asButton
          />
        ))}
      </div>
    );
  }, [socialLinksSlot, socialLinks, background]);

  const skillsContent = useMemo(() => {
    if (skillsSlot) return skillsSlot;
    if (!skills || skills.length === 0) return null;

    return skills.map((skill, idx) => (
      <Badge key={idx} className={cn("px-4", skillTagClassName)}>
        {skill}
      </Badge>
    ));
  }, [skillsSlot, skills, skillTagClassName, background]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div
        className={cn(
          "mx-auto max-w-full md:max-w-md bg-muted",
          "py-8 px-6 md:py-12 md:px-12 text-muted-foreground",
          "rounded-2xl shadow-xl",
          "flex flex-col items-center md:items-start gap-8",
          contentClassName,
        )}
      >
        <div className="flex flex-col gap-8 md:flex-row items-start">
          {avatar && (
            <Img
              src={avatar.src}
              alt={avatar.alt}
              className={cn(
                "h-48 w-full md:w-48 rounded-xl object-cover shadow-xl",
                avatarClassName,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          )}
          <div className="text-left flex flex-col items-start gap-4">
            <div className="text-left flex flex-col items-start gap-0">
              {name &&
                (typeof name === "string" ? (
                  <h2
                    className={cn(
                      "text-3xl md:text-4xl font-bold",
                      nameClassName,
                    )}
                  >
                    {name}
                  </h2>
                ) : (
                  name
                ))}
              {role &&
                (typeof role === "string" ? (
                  <p
                    className={cn(
                      "text-lg md:text-xl opacity-60",
                      roleClassName,
                    )}
                  >
                    {role}
                  </p>
                ) : (
                  role
                ))}
            </div>
            {socialLinksContent}
          </div>
        </div>

        {bio && (
          <div className="relative">
            {typeof bio === "string" ? (
              <p className={cn("text-lg", bioClassName)}>{bio}</p>
            ) : (
              bio
            )}
          </div>
        )}

        {(skillsSlot || (skills && skills.length > 0)) && (
          <div className={cn("relative", skillsClassName)}>
            {skillsTitle &&
              (typeof skillsTitle === "string" ? (
                <h3 className="text-lg opacity-60">{skillsTitle}</h3>
              ) : (
                skillsTitle
              ))}
            <div className="mt-3 flex flex-wrap gap-2">{skillsContent}</div>
          </div>
        )}

        <BlockActions
          actions={actions}
          actionsSlot={actionsSlot}
          actionsClassName={actionsClassName}
        />
      </div>
    </Section>
  );
}
