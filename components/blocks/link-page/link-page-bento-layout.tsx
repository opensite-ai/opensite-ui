"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
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
 * Bento link item for the bento layout link page
 */
export interface BentoLink extends ActionConfig {
  id?: string;
  description?: React.ReactNode;
  featured?: boolean;
  image?: ImageItem;
  imageUrl?: string;
  iconName?: string;
}

/**
 * Social link for the bento layout link page
 */
export interface BentoSocialLink extends SocialLinkItem {
  id?: string;
  iconName?: string;
}

/**
 * Props for the LinkPageBentoLayout component
 */
export interface LinkPageBentoLayoutProps {
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
   * Array of links to display in bento grid
   */
  links?: BentoLink[];
  /**
   * Custom slot for rendering all links (overrides links array)
   */
  linksSlot?: React.ReactNode;
  /**
   * Custom slot for rendering featured links (overrides featured links array)
   */
  featuredLinksSlot?: React.ReactNode;
  /**
   * Custom slot for rendering regular links (overrides regular links array)
   */
  regularLinksSlot?: React.ReactNode;
  /**
   * Array of social media links
   */
  socialLinks?: BentoSocialLink[];
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
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
  /**
   * Additional CSS classes for each social link
   */
  socialLinkClassName?: string;
  /**
   * Additional CSS classes for social link icons
   */
  socialIconClassName?: string;
  /**
   * Additional CSS classes for the links container
   */
  linksClassName?: string;
  /**
   * Additional CSS classes for the featured links grid
   */
  featuredLinksClassName?: string;
  /**
   * Additional CSS classes for a featured link item
   */
  featuredLinkClassName?: string;
  /**
   * Additional CSS classes for the featured link overlay
   */
  featuredLinkOverlayClassName?: string;
  /**
   * Additional CSS classes for the featured link image
   */
  featuredLinkImageClassName?: string;
  /**
   * Additional CSS classes for featured link icons
   */
  featuredLinkIconClassName?: string;
  /**
   * Additional CSS classes for featured link labels
   */
  featuredLinkLabelClassName?: string;
  /**
   * Additional CSS classes for featured link descriptions
   */
  featuredLinkDescriptionClassName?: string;
  /**
   * Additional CSS classes for the regular links grid
   */
  regularLinksClassName?: string;
  /**
   * Additional CSS classes for a regular link item
   */
  regularLinkClassName?: string;
  /**
   * Additional CSS classes for the regular link icon wrapper
   */
  regularLinkIconWrapperClassName?: string;
  /**
   * Additional CSS classes for the regular link icon
   */
  regularLinkIconClassName?: string;
  /**
   * Additional CSS classes for the regular link label
   */
  regularLinkLabelClassName?: string;
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
 * LinkPageBentoLayout - A modern bento grid style link page.
 *
 * This component provides a visually striking link page with:
 * - Profile header with avatar, name, and bio
 * - Bento grid layout with featured links in larger cells
 * - Featured links can include background images
 * - Regular links in smaller cells
 * - Social media links section
 * - Light and dark theme support
 *
 * The bento layout creates visual hierarchy by making featured links
 * more prominent with larger cells and optional background images.
 *
 * @example
 * ```tsx
 * <LinkPageBentoLayout
 *   name="Digital Creator"
 *   bio="Content creator & entrepreneur"
 *   links={[
 *     {
 *       id: "1",
 *       label: "Latest Video",
 *       href: "https://youtube.com",
 *       iconName: "simple-icons/youtube",
 *       featured: true,
 *       image: { src: "/video-thumbnail.jpg", alt: "Video" }
 *     },
 *     { id: "2", label: "Blog", href: "/blog", iconName: "lucide/pen-line" }
 *   ]}
 * />
 * ```
 */
export function LinkPageBentoLayout({
  name = "Digital Creator",
  bio = "Content creator, entrepreneur & coffee enthusiast",
  avatar,
  avatarUrl = blockBrandedIconsAndPlaceholders.avatar5,
  profileSlot,
  links,
  linksSlot,
  featuredLinksSlot,
  regularLinksSlot,
  socialLinks,
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
  socialLinksClassName,
  socialLinkClassName,
  socialIconClassName,
  linksClassName,
  featuredLinksClassName,
  featuredLinkClassName,
  featuredLinkOverlayClassName,
  featuredLinkImageClassName,
  featuredLinkIconClassName,
  featuredLinkLabelClassName,
  featuredLinkDescriptionClassName,
  regularLinksClassName,
  regularLinkClassName,
  regularLinkIconWrapperClassName,
  regularLinkIconClassName,
  regularLinkLabelClassName,
  footerClassName,
  theme = "light",
  background,
  spacing = "none",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: LinkPageBentoLayoutProps): React.JSX.Element {
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

  const featuredLinks = links.filter((link) => link.featured);
  const regularLinks = links.filter((link) => !link.featured);

  const renderSocialLinks = () => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div className={cn("flex items-center gap-2 pt-1", socialLinksClassName)}>
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
                "rounded-full p-2 transition-all duration-200",
                "hover:scale-110 active:scale-95",
                isDark
                  ? "text-neutral-500 hover:text-white hover:bg-white/10"
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

  const renderFeaturedLinks = () => {
    if (featuredLinksSlot) return featuredLinksSlot;
    if (!featuredLinks || featuredLinks.length === 0) return null;

    return featuredLinks.map((link, index) => {
      const {
        label,
        description,
        icon,
        children,
        className: linkClassName,
        featured: _featured, // Destructure to prevent passing to DOM
        ...pressableProps
      } = link;
      const imageSource = link.image?.src ?? link.imageUrl;
      const imageAlt =
        link.image?.alt || (typeof label === "string" ? label : "");
      const iconElement =
        icon ||
        (link.iconName ? (
          <DynamicIcon
            name={link.iconName}
            size={18}
            className={featuredLinkIconClassName}
          />
        ) : null);

      if (children) {
        return (
          <Pressable
            key={link.id ?? index}
            className={cn(
              "group relative aspect-4/3 overflow-hidden rounded-2xl transition-all duration-200",
              "hover:scale-[1.02] active:scale-[0.98]",
              isDark
                ? "border border-white/10 bg-white/5"
                : "border border-neutral-200 bg-neutral-100",
              featuredLinkClassName,
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
            "group relative aspect-4/3 overflow-hidden rounded-2xl transition-all duration-200",
            "hover:scale-[1.02] active:scale-[0.98]",
            isDark
              ? "border border-white/10 bg-white/5"
              : "border border-neutral-200 bg-neutral-100",
            featuredLinkClassName,
            linkClassName
          )}
          {...pressableProps}
        >
          {imageSource && (
            <Img
              src={imageSource}
              alt={imageAlt}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105",
                featuredLinkImageClassName
              )}
              optixFlowConfig={optixFlowConfig}
            />
          )}
          <div
            className={cn(
              "absolute inset-0 transition-opacity",
              imageSource
                ? "bg-linear-to-t from-black/80 via-black/40 to-transparent"
                : isDark
                ? "bg-linear-to-t from-white/10 to-transparent"
                : "bg-linear-to-t from-neutral-200/50 to-transparent",
              featuredLinkOverlayClassName
            )}
          />
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            <div className="flex items-center gap-2">
              {iconElement}
              {label &&
                (typeof label === "string" ? (
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      imageSource
                        ? "text-white"
                        : isDark
                        ? "text-white"
                        : "text-foreground",
                      featuredLinkLabelClassName
                    )}
                  >
                    {label}
                  </span>
                ) : (
                  <div className={featuredLinkLabelClassName}>{label}</div>
                ))}
            </div>
            {description &&
              (typeof description === "string" ? (
                <span
                  className={cn(
                    "mt-0.5 text-xs",
                    imageSource
                      ? "text-white/70"
                      : isDark
                      ? "text-neutral-400"
                      : "text-muted-foreground",
                    featuredLinkDescriptionClassName
                  )}
                >
                  {description}
                </span>
              ) : (
                <div className={featuredLinkDescriptionClassName}>
                  {description}
                </div>
              ))}
          </div>
        </Pressable>
      );
    });
  };

  const renderRegularLinks = () => {
    if (regularLinksSlot) return regularLinksSlot;
    if (!regularLinks || regularLinks.length === 0) return null;

    return regularLinks.map((link, index) => {
      const {
        label,
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
            size={20}
            className={regularLinkIconClassName}
          />
        ) : null);

      if (children) {
        return (
          <Pressable
            key={link.id ?? index}
            className={cn(
              "group flex items-center gap-3 rounded-xl p-3 transition-all duration-200",
              "hover:scale-[1.02] active:scale-[0.98]",
              isDark
                ? "border border-white/10 bg-white/5 hover:bg-white/10"
                : "border border-neutral-200 bg-neutral-50 hover:bg-neutral-100",
              regularLinkClassName,
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
            "group flex items-center gap-3 rounded-xl p-3 transition-all duration-200",
            "hover:scale-[1.02] active:scale-[0.98]",
            isDark
              ? "border border-white/10 bg-white/5 hover:bg-white/10"
              : "border border-neutral-200 bg-neutral-50 hover:bg-neutral-100",
            regularLinkClassName,
            linkClassName
          )}
          {...pressableProps}
        >
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              isDark ? "bg-white/10" : "bg-white",
              regularLinkIconWrapperClassName
            )}
          >
            {iconElement}
          </div>
          {label &&
            (typeof label === "string" ? (
              <span
                className={cn(
                  "truncate text-sm font-medium",
                  isDark ? "text-white" : "text-foreground",
                  regularLinkLabelClassName
                )}
              >
                {label}
              </span>
            ) : (
              <div className={regularLinkLabelClassName}>{label}</div>
            ))}
        </Pressable>
      );
    });
  };

  const renderLinks = () => {
    if (linksSlot) return linksSlot;
    if (!links || links.length === 0) return null;

    const hasFeatured = Boolean(featuredLinksSlot) || featuredLinks.length > 0;
    const hasRegular = Boolean(regularLinksSlot) || regularLinks.length > 0;

    return (
      <div className={cn("space-y-3", linksClassName)}>
        {hasFeatured && (
          <div className={cn("grid grid-cols-2 gap-3", featuredLinksClassName)}>
            {renderFeaturedLinks()}
          </div>
        )}
        {hasRegular && (
          <div className={cn("grid grid-cols-2 gap-3", regularLinksClassName)}>
            {renderRegularLinks()}
          </div>
        )}
      </div>
    );
  };

  const renderProfile = () => {
    if (profileSlot) return profileSlot;

    return (
      <div
        className={cn(
          "flex flex-col items-center space-y-3 text-center",
          headerClassName
        )}
      >
        {resolvedAvatar && (
          <div
            className={cn(
              "h-20 w-20 overflow-hidden rounded-full",
              isDark ? "ring-2 ring-white/20" : "ring-2 ring-neutral-200",
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
                  "text-xl font-bold",
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
                  "max-w-xs text-sm",
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

        {renderSocialLinks()}
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
        isDark ? "bg-neutral-950" : "bg-white",
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
        <div className={cn("w-full max-w-lg space-y-6", contentClassName)}>
          {renderProfile()}
          {renderLinks()}
          <div className="pt-4">{renderFooter()}</div>
        </div>
      </div>
    </Section>
  );
}
