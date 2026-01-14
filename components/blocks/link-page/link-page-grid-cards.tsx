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
 * Link card item for the grid cards link page
 */
export interface GridCardLink extends ActionConfig {
  id?: string;
  description?: React.ReactNode;
  iconName?: string;
}

/**
 * Social link for the grid cards link page
 */
export interface GridCardSocialLink extends SocialLinkItem {
  id?: string;
  iconName?: string;
}

/**
 * Props for the LinkPageGridCards component
 */
export interface LinkPageGridCardsProps {
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
   * Array of links to display as cards
   */
  links?: GridCardLink[];
  /**
   * Custom slot for rendering links (overrides links array)
   */
  linksSlot?: React.ReactNode;
  /**
   * Array of social media links
   */
  socialLinks?: GridCardSocialLink[];
  /**
   * Custom slot for rendering social links (overrides socialLinks array)
   */
  socialLinksSlot?: React.ReactNode;
  /**
   * Number of columns in the grid (2 or 3)
   */
  columns?: 2 | 3;
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
   * Additional CSS classes for the links grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for card icon wrapper
   */
  cardIconWrapperClassName?: string;
  /**
   * Additional CSS classes for card icons
   */
  cardIconClassName?: string;
  /**
   * Additional CSS classes for card labels
   */
  cardLabelClassName?: string;
  /**
   * Additional CSS classes for card descriptions
   */
  cardDescriptionClassName?: string;
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

/**
 * LinkPageGridCards - A link page displaying links as a grid of cards.
 *
 * This component provides a visually rich link page with:
 * - Profile header with avatar, name, and bio
 * - Links displayed as a responsive grid of cards
 * - Each card has an icon, label, and optional description
 * - Hover effects with scale and shadow transitions
 * - Social media links section
 * - Configurable 2 or 3 column layout
 * - Light and dark theme support
 *
 * Ideal for creators, businesses, and anyone who wants a more visual link page.
 *
 * @example
 * ```tsx
 * <LinkPageGridCards
 *   name="Creative Studio"
 *   bio="Design, Development & Strategy"
 *   columns={3}
 *   links={[
 *     { id: "1", label: "Portfolio", href: "/work", iconName: "lucide/briefcase", description: "View our work" }
 *   ]}
 * />
 * ```
 */
export function LinkPageGridCards({
  name = "Creative Studio",
  bio = "Design, Development & Strategy",
  avatar,
  avatarUrl = blockBrandedIconsAndPlaceholders.avatar4,
  profileSlot,
  links,
  linksSlot,
  socialLinks,
  socialLinksSlot,
  columns = 2,
  footerAction,
  footerSlot,
  className,
  containerClassName,
  contentClassName,
  headerClassName,
  avatarClassName,
  nameClassName,
  bioClassName,
  socialLinksClassName,
  socialLinkClassName,
  socialIconClassName,
  gridClassName,
  cardClassName,
  cardIconWrapperClassName,
  cardIconClassName,
  cardLabelClassName,
  cardDescriptionClassName,
  footerClassName,
  theme = "light",
  background,
  spacing = "none",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: LinkPageGridCardsProps): React.JSX.Element {
  const isDark = theme === "dark";
  const resolvedBackground = background ?? (isDark ? "dark" : "gray");

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
              "h-20 w-20 overflow-hidden rounded-2xl shadow-lg",
              isDark ? "ring-2 ring-white/10" : "ring-2 ring-neutral-200",
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
                  "text-2xl font-bold",
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

  const renderSocialLinks = () => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div
        className={cn(
          "flex items-center justify-center gap-2",
          socialLinksClassName
        )}
      >
        {socialLinks.map((social, index) => {
          const icon =
            social.icon ||
            (social.iconName ? (
              <DynamicIcon
                name={social.iconName}
                size={18}
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
                "rounded-lg p-2 transition-all duration-200",
                "hover:scale-110 active:scale-95",
                isDark
                  ? "bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                  : "bg-white text-muted-foreground hover:bg-neutral-100 hover:text-foreground",
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

  const renderLinks = () => {
    if (linksSlot) return linksSlot;
    if (!links || links.length === 0) return null;

    return (
      <div
        className={cn(
          "grid gap-3",
          columns === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2",
          gridClassName
        )}
      >
        {links.map((link, index) => {
          const {
            label,
            description,
            icon,
            children,
            className: linkClassName,
            ...pressableProps
          } = link;
          const iconElement =
            icon ||
            (link.iconName ? (
              <DynamicIcon
                name={link.iconName}
                size={24}
                className={cardIconClassName}
              />
            ) : null);

          if (children) {
            return (
              <Pressable
                key={link.id ?? index}
                className={cn(
                  "group flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-200",
                  "hover:scale-[1.03] active:scale-[0.97]",
                  isDark
                    ? "border border-white/10 bg-white/5 hover:bg-white/10"
                    : "border border-neutral-200 bg-white shadow-sm hover:bg-white hover:shadow-md",
                  cardClassName,
                  linkClassName
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
                "group flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-200",
                "hover:scale-[1.03] active:scale-[0.97]",
                isDark
                  ? "border border-white/10 bg-white/5 hover:bg-white/10"
                  : "border border-neutral-200 bg-white shadow-sm hover:bg-white hover:shadow-md",
                cardClassName,
                linkClassName
              )}
              {...pressableProps}
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                  isDark
                    ? "bg-white/10 group-hover:bg-white/20"
                    : "bg-neutral-100 group-hover:bg-neutral-200",
                  cardIconWrapperClassName
                )}
              >
                {iconElement}
              </div>
              <div className="space-y-0.5 text-center">
                {label &&
                  (typeof label === "string" ? (
                    <span
                      className={cn(
                        "block text-sm font-medium",
                        isDark ? "text-white" : "text-foreground",
                        cardLabelClassName
                      )}
                    >
                      {label}
                    </span>
                  ) : (
                    <div className={cardLabelClassName}>{label}</div>
                  ))}
                {description &&
                  (typeof description === "string" ? (
                    <span
                      className={cn(
                        "block text-xs",
                        isDark ? "text-neutral-500" : "text-muted-foreground",
                        cardDescriptionClassName
                      )}
                    >
                      {description}
                    </span>
                  ) : (
                    <div className={cardDescriptionClassName}>
                      {description}
                    </div>
                  ))}
              </div>
            </Pressable>
          );
        })}
      </div>
    );
  };

  const renderFooter = () => {
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
        isDark ? "bg-neutral-950" : "bg-neutral-50",
        className
      )}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
    >
      <div
        className={cn(
          "flex min-h-screen w-full items-start justify-center py-12",
          containerClassName
        )}
      >
        <div className={cn("w-full max-w-lg space-y-8", contentClassName)}>
          {renderProfile()}
          {renderSocialLinks()}
          {renderLinks()}
          <div className="pt-4">{renderFooter()}</div>
        </div>
      </div>
    </Section>
  );
}
