"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
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
   * Theme variation: "light" or "dark"
   */
  theme?: "light" | "dark";
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
  pattern?: PatternName | string;
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

const defaultLinks: MinimalProfileLink[] = [
  {
    id: "1",
    label: "Portfolio",
    href: "https://example.com",
    iconName: "lucide/briefcase",
  },
  {
    id: "2",
    label: "Blog",
    href: "https://example.com/blog",
    iconName: "lucide/pen-line",
  },
  {
    id: "3",
    label: "Contact",
    href: "mailto:hello@example.com",
    iconName: "lucide/mail",
  },
];

const defaultSocialLinks: MinimalProfileSocialLink[] = [
  {
    id: "s1",
    platform: "Twitter",
    href: "https://twitter.com",
    iconName: "simple-icons/x",
  },
  {
    id: "s2",
    platform: "GitHub",
    href: "https://github.com",
    iconName: "simple-icons/github",
  },
  {
    id: "s3",
    platform: "LinkedIn",
    href: "https://linkedin.com",
    iconName: "simple-icons/linkedin",
  },
];

const defaultFooterAction: ActionConfig = {
  label: "Powered by OpenSite",
  href: "/",
};

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
  name = "Alex Johnson",
  bio = "Software Engineer & Open Source Contributor",
  avatar,
  avatarUrl = blockBrandedIconsAndPlaceholders.avatar2,
  profileSlot,
  links = defaultLinks,
  linksSlot,
  socialLinks = defaultSocialLinks,
  socialLinksSlot,
  footerAction,
  footerSlot,
  className,
  containerClassName,
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
  theme = "light",
  background,
  spacing = "none",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: LinkPageMinimalProfileProps): React.JSX.Element {
  const isDark = theme === "dark";
  const resolvedBackground = background ?? (isDark ? "dark" : "white");

  const resolvedAvatar: ImageItem | undefined =
    avatar ||
    (avatarUrl
      ? {
          src: avatarUrl,
          alt: typeof name === "string" ? name : "Profile avatar",
        }
      : undefined);

  const renderProfile = () => {
    if (profileSlot) return profileSlot;

    return (
      <div
        className={cn(
          "flex flex-col items-center space-y-4 text-center",
          headerClassName
        )}
      >
        {resolvedAvatar && (
          <div
            className={cn(
              "h-20 w-20 overflow-hidden rounded-full bg-muted",
              avatarClassName
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
              <h1
                className={cn(
                  "text-xl font-semibold",
                  isDark ? "text-white" : "text-foreground",
                  nameClassName
                )}
              >
                {name}
              </h1>
            ) : (
              <div className={nameClassName}>{name}</div>
            ))}
          {bio &&
            (typeof bio === "string" ? (
              <p
                className={cn(
                  "text-sm",
                  isDark ? "text-neutral-400" : "text-muted-foreground",
                  bioClassName
                )}
              >
                {bio}
              </p>
            ) : (
              <div className={bioClassName}>{bio}</div>
            ))}
        </div>
      </div>
    );
  };

  const renderLinks = () => {
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
            ...pressableProps
          } = link;
          const iconElement =
            icon ||
            (link.iconName ? (
              <DynamicIcon
                name={link.iconName}
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
                  isDark
                    ? "bg-neutral-800 text-white hover:bg-neutral-700"
                    : "bg-neutral-100 text-foreground hover:bg-neutral-200",
                  linkClassName,
                  linkItemClassName
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
                isDark
                  ? "bg-neutral-800 text-white hover:bg-neutral-700"
                  : "bg-neutral-100 text-foreground hover:bg-neutral-200",
                linkClassName,
                linkItemClassName
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
  };

  const renderSocialLinks = () => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div
        className={cn(
          "flex items-center justify-center gap-4 pt-4",
          socialLinksClassName
        )}
      >
        {socialLinks.map((social, index) => {
          const icon =
            social.icon ||
            (social.iconName ? (
              <DynamicIcon
                name={social.iconName}
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
                isDark
                  ? "text-neutral-400 hover:text-white hover:bg-neutral-800"
                  : "text-muted-foreground hover:text-foreground hover:bg-neutral-100",
                socialLinkClassName,
                social.className
              )}
            >
              {icon}
            </Pressable>
          );
        })}
      </div>
    );
  };

  const renderFooter = () => {
    if (footerSlot) return footerSlot;

    const resolvedFooterAction = footerAction ?? defaultFooterAction;
    if (!resolvedFooterAction) return null;

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
          isDark ? "text-neutral-600" : "text-muted-foreground/50",
          footerClassName,
          actionClassName
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
  };

  return (
    <Section
      background={resolvedBackground}
      spacing={spacing}
      className={cn(
        isDark ? "bg-neutral-900" : "bg-white",
        className
      )}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
    >
      <div
        className={cn(
          "flex min-h-screen w-full items-start justify-center py-16",
          containerClassName
        )}
      >
        <div className={cn("w-full max-w-sm space-y-8", contentClassName)}>
          {renderProfile()}
          {renderLinks()}
          {renderSocialLinks()}
          <div className="pt-8">{renderFooter()}</div>
        </div>
      </div>
    </Section>
  );
}
