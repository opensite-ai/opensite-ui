"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ImageItem,
  SocialLinkItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Link item for the minimal profile link page
 */
export interface MinimalProfileLink extends ActionConfig {
  id?: string;
  iconName?: string;
}

/**
 * Social link for the minimal profile link page
 */
export interface MinimalProfileSocialLink extends SocialLinkItem {
  id?: string;
  iconName?: string;
}

/**
 * Props for the LinkPageMinimalProfile component
 */
export interface LinkPageMinimalProfileProps {
  /**
   * Profile name displayed at the top
   */
  name?: React.ReactNode;
  /**
   * Optional bio or description
   */
  bio?: React.ReactNode;
  /**
   * Avatar image configuration
   */
  avatar?: ImageItem;
  /**
   * Avatar image URL (legacy)
   */
  avatarUrl?: string;
  /**
   * Custom slot for profile header content
   */
  profileSlot?: React.ReactNode;
  /**
   * Array of links to display
   */
  links?: MinimalProfileLink[];
  /**
   * Custom slot for rendering links (overrides links array)
   */
  linksSlot?: React.ReactNode;
  /**
   * Array of social media links
   */
  socialLinks?: MinimalProfileSocialLink[];
  /**
   * Custom slot for rendering social links (overrides socialLinks array)
   */
  socialLinksSlot?: React.ReactNode;
  /**
   * Footer action configuration
   */
  footerAction?: ActionConfig;
  /**
   * Custom slot for rendering footer content
   */
  footerSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the outer wrapper
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the inner content container
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the profile header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the avatar wrapper
   */
  avatarClassName?: string;
  /**
   * Additional CSS classes for the name
   */
  nameClassName?: string;
  /**
   * Additional CSS classes for the bio
   */
  bioClassName?: string;
  /**
   * Additional CSS classes for the links container
   */
  linksClassName?: string;
  /**
   * Additional CSS classes for each link
   */
  linkClassName?: string;
  /**
   * Additional CSS classes for link icons
   */
  linkIconClassName?: string;
  /**
   * Additional CSS classes for link labels
   */
  linkLabelClassName?: string;
  /**
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
  /**
   * Additional CSS classes for each social link
   */
  socialLinkClassName?: string;
  /**
   * Additional CSS classes for social icons
   */
  socialIconClassName?: string;
  /**
   * Additional CSS classes for the footer
   */
  footerClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
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
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * LinkPageMinimalProfile - A clean, minimal link page focused on simplicity.
 *
 * This component provides a streamlined link page with:
 * - Clean avatar and name display
 * - Optional bio text
 * - Simple link list with subtle hover effects
 * - Social icons at the bottom
 * - Light and dark theme support
 *
 * Ideal for professionals, developers, and anyone who prefers a minimalist aesthetic.
 *
 * @example
 * ```tsx
 * <LinkPageMinimalProfile
 *   name="Alex Johnson"
 *   bio="Software Engineer & Open Source Contributor"
 *   avatarUrl="/avatar.jpg"
 *   links={[
 *     { id: "1", label: "Portfolio", href: "https://example.com", iconName: "lucide/briefcase" }
 *   ]}
 * />
 * ```
 */
export function LinkPageMinimalProfile({
  name,
  bio,
  avatar,
  avatarUrl,
  profileSlot,
  links,
  linksSlot,
  socialLinks,
  socialLinksSlot,
  footerAction,
  footerSlot,
  className,
  contentClassName,
  headerClassName,
  avatarClassName,
  nameClassName,
  bioClassName,
  linksClassName,
  linkClassName,
  linkIconClassName,
  linkLabelClassName,
  socialLinksClassName,
  socialLinkClassName,
  socialIconClassName,
  footerClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-12 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: LinkPageMinimalProfileProps): React.JSX.Element {
  const renderProfile = useMemo(() => {
    if (profileSlot) return profileSlot;
    const resolvedAvatar =
      avatar ||
      (avatarUrl
        ? {
            src: avatarUrl,
            alt: typeof name === "string" ? name : "Profile avatar",
          }
        : undefined);

    return (
      <div
        className={cn(
          "flex flex-col items-center space-y-4 text-center",
          headerClassName,
        )}
      >
        {resolvedAvatar && (
          <div
            className={cn(
              "h-20 w-20 overflow-hidden rounded-full",
              avatarClassName,
            )}
          >
            <Img
              src={resolvedAvatar.src}
              alt={resolvedAvatar.alt}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        )}

        <div className="space-y-1">
          {name &&
            (typeof name === "string" ? (
              <h1 className={cn("text-xl font-semibold", nameClassName)}>
                {name}
              </h1>
            ) : (
              <div className={nameClassName}>{name}</div>
            ))}
          {bio &&
            (typeof bio === "string" ? (
              <p className={cn("text-sm", bioClassName)}>{bio}</p>
            ) : (
              <div className={bioClassName}>{bio}</div>
            ))}
        </div>
      </div>
    );
  }, [
    avatar,
    avatarUrl,
    profileSlot,
    avatarClassName,
    optixFlowConfig,
    name,
    nameClassName,
    bio,
    bioClassName,
    headerClassName,
  ]);

  const renderLinks = useMemo(() => {
    if (linksSlot) return linksSlot;
    if (!links || links.length === 0) return null;

    return (
      <div className={cn("space-y-2", linksClassName)}>
        {links.map((link, index) => {
          const {
            label,
            icon,
            children,
            className: linkItemClassName,
            iconName,
            ...pressableProps
          } = link;
          const iconElement =
            icon ||
            (iconName ? (
              <DynamicIcon
                name={iconName}
                size={18}
                className={linkIconClassName}
              />
            ) : null);

          if (children) {
            return (
              <Pressable
                key={link.id ?? index}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                  "hover:opacity-80",
                  linkClassName,
                  linkItemClassName,
                )}
                {...pressableProps}
              >
                {children}
              </Pressable>
            );
          }

          return (
            <Pressable
              key={link.id ?? index}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                "hover:opacity-80",
                linkClassName,
                linkItemClassName,
              )}
              {...pressableProps}
            >
              {iconElement}
              {label &&
                (typeof label === "string" ? (
                  <span
                    className={cn("text-sm font-medium", linkLabelClassName)}
                  >
                    {label}
                  </span>
                ) : (
                  <div className={linkLabelClassName}>{label}</div>
                ))}
            </Pressable>
          );
        })}
      </div>
    );
  }, [
    linksSlot,
    links,
    linksClassName,
    linkIconClassName,
    linkClassName,
    linkLabelClassName,
  ]);

  const renderSocialLinks = useMemo(() => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div
        className={cn(
          "flex items-center justify-center gap-4 pt-4",
          socialLinksClassName,
        )}
      >
        {socialLinks.map((social, index) => {
          const { iconName: socialIconName, ...socialRest } = social;
          const icon =
            social.icon ||
            (socialIconName ? (
              <DynamicIcon
                name={socialIconName}
                size={20}
                className={socialIconClassName}
              />
            ) : null);
          const ariaLabel =
            social["aria-label"] ||
            (typeof social.label === "string" ? social.label : undefined) ||
            social.platform;

          return (
            <Pressable
              key={social.id ?? index}
              href={social.href}
              aria-label={ariaLabel}
              className={cn(
                "rounded-full p-2 transition-colors",
                "hover:opacity-80",
                socialLinkClassName,
                social.className,
              )}
            >
              {icon}
            </Pressable>
          );
        })}
      </div>
    );
  }, [
    socialLinksSlot,
    socialLinks,
    socialLinksClassName,
    socialIconClassName,
    socialLinkClassName,
  ]);

  const renderFooter = useMemo(() => {
    if (footerSlot) return footerSlot;

    if (!footerAction) return null;
    const resolvedFooterAction = footerAction;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = resolvedFooterAction;

    const defaultIcon =
      footerAction === undefined ? (
        <DynamicIcon name="lucide/link" size={12} />
      ) : null;

    return (
      <Pressable
        className={cn(
          "flex items-center justify-center gap-1.5 text-xs transition-opacity hover:opacity-80",
          footerClassName,
          actionClassName,
        )}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon ?? defaultIcon}
            {label}
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  }, [footerSlot, footerAction, footerClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
    >
      <div
        className={cn(
          "flex min-h-screen w-full items-start justify-center py-16",
          containerClassName,
        )}
      >
        <div className={cn("w-full max-w-sm space-y-8", contentClassName)}>
          {renderProfile}
          {renderLinks}
          {renderSocialLinks}
          <div className="pt-8">{renderFooter}</div>
        </div>
      </div>
    </Section>
  );
}
