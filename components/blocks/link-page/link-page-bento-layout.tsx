"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ImageItem,
  SocialLinkItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BrandLogo } from "../../ui/brand-logo";
import type { BrandLogoAspect } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";
import {
  LINK_PAGE_BANNER_BREAKOUT_CLASSES,
  LINK_PAGE_LOGO_BANNER_ASPECT_CLASSES,
  LINK_PAGE_LOGO_BOX_CLASSES_A,
  LINK_PAGE_LOGO_IMG_CLASSES_A,
} from "./logo-aspect";
import type {
  LinkPageLogoAspect,
  LinkPageLogoBannerAspect,
} from "./logo-aspect";

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
   * Optional LogoConfig for BrandLogo rendering (takes priority over avatar)
   */
  logo?: LogoConfig;
  /**
   * Custom slot for the logo/avatar (takes priority over logo and avatar)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo WRAPPER (not the image). Has no effect
   * on live client sites (not harvested for compiled CSS) — never use it for
   * logo sizing; use logoAspect.
   */
  logoClassName?: string;
  /**
   * Placement and shape mode for the brand mark at the top of the page.
   * "horizontal" (default) keeps the legacy modest wordmark bar. "square" renders a
   * roughly 1:1 mark LARGE and centered (about half the column width). "vertical"
   * renders a stacked/portrait lockup tall and centered. "banner" renders
   * logoBannerImage as a full-bleed edge-to-edge band at the very top of the page
   * and hides the centered logo. Logo sizing is controlled ONLY by this prop —
   * never by logoClassName or any className prop.
   * @default "horizontal"
   */
  logoAspect?: LinkPageLogoAspect;
  /**
   * Full-bleed banner image rendered edge-to-edge (100vw) at the very top of the
   * page. Only rendered when logoAspect is "banner". Requires an absolute https
   * src and descriptive alt text.
   */
  logoBannerImage?: ImageItem;
  /**
   * Aspect ratio of the full-bleed banner band: "standard" (~16:7, default),
   * "wide" (3:1), or "ultrawide" (4:1).
   * @default "standard"
   */
  logoBannerAspect?: LinkPageLogoBannerAspect;
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
  /** Optional Section ID */
  sectionId?: string;
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
  sectionId = "link-page-bento-layout",
  name,
  bio,
  avatar,
  avatarUrl,
  logo,
  logoSlot,
  logoClassName,
  logoAspect,
  logoBannerImage,
  logoBannerAspect,
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
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-12 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: LinkPageBentoLayoutProps): React.JSX.Element {
  // Stored payloads very commonly carry `{"alt":"…","src":null}` (octane's
  // brand-mark stripper nulls avatar-shaped keys), so the guard checks `.src`
  // truthiness rather than object presence — otherwise the ladder falls into the
  // Img branch and emits `<img src={null}>`.
  const resolvedAvatar: ImageItem | undefined = avatar?.src
    ? avatar
    : avatarUrl
      ? {
          src: avatarUrl,
          alt: typeof name === "string" ? name : "Profile avatar",
        }
      : undefined;

  // "banner" only takes effect with a usable banner src; otherwise the block
  // behaves exactly as "horizontal" (legacy output).
  const isBannerMode = logoAspect === "banner" && Boolean(logoBannerImage?.src);
  // Stored payloads are untyped JSON, so anything can arrive here. Only the two
  // enlarged ladders are honored explicitly; every other value ("banner",
  // undefined, or an out-of-contract string like "portrait") collapses to the
  // legacy horizontal ladder, so the class-table lookups below can never miss
  // and emit a box/img with no size classes.
  const resolvedLogoAspect: BrandLogoAspect =
    logoAspect === "square" || logoAspect === "vertical"
      ? logoAspect
      : "horizontal";
  // Banner mode keeps the caller's spacing (preset key or class string) and
  // layers the flush-top override on the Section className instead: `className`
  // is emitted after the spacing classes, so `pt-0 md:pt-0` wins by CSS order
  // for ANY spacing value (the hero-fullscreen idiom) — a sentinel comparison
  // against the block default would silently keep top padding for every preset
  // key ("lg", "hero", …) and every custom class string. `overflow-x-clip`
  // clips the banner's 100vw breakout: on classic-scrollbar browsers 100vw
  // includes the scrollbar gutter, which otherwise adds horizontal page scroll
  // (Section only sets overflow-hidden when a pattern is present).
  const sectionClassName = isBannerMode
    ? cn("overflow-x-clip pt-0 md:pt-0", className)
    : className;

  const featuredLinks = (links ?? []).filter((link) => link.featured);
  const regularLinks = (links ?? []).filter((link) => !link.featured);

  const renderSocialLinks = useMemo(() => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div className={cn("flex items-center gap-2 pt-1", socialLinksClassName)}>
        {socialLinks.map((social, index) => (
          <SocialLinkIcon
            key={social.id ?? social.href ?? index}
            href={social.href}
            label={
              social["aria-label"] ||
              (typeof social.label === "string" ? social.label : undefined)
            }
            className={cn(
              "rounded-full p-2 transition-all duration-200",
              "hover:scale-110 active:scale-95",
              "hover:opacity-80",
              socialLinkClassName,
              social.className,
            )}
            iconClassName={socialIconClassName}
          />
        ))}
      </div>
    );
  }, [
    socialLinksSlot,
    socialLinks,
    socialLinksClassName,
    socialIconClassName,
    socialLinkClassName,
  ]);

  const renderFeaturedLinks = useMemo(() => {
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
        iconName,
        ...pressableProps
      } = link;
      const imageSource = link.image?.src ?? link.imageUrl;
      const imageAlt =
        link.image?.alt || (typeof label === "string" ? label : "");
      const iconElement = icon ? (
        <DynamicIcon
          name={icon}
          size={18}
          className={featuredLinkIconClassName}
        />
      ) : iconName ? (
          <DynamicIcon
            name={iconName}
            size={18}
            className={featuredLinkIconClassName}
          />
        ) : null;

      if (children) {
        return (
          <Pressable
            key={link.id ?? index}
            className={cn(
              "group relative aspect-4/3 overflow-hidden rounded-xl",
              featuredLinkClassName,
              linkClassName,
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
            "group relative aspect-4/3 overflow-hidden rounded-xl",
            featuredLinkClassName,
            linkClassName,
          )}
          {...pressableProps}
        >
          {imageSource && (
            <Img
              src={imageSource}
              alt={imageAlt}
              className={cn(
                "absolute inset-0 h-full w-full object-cover",
                featuredLinkImageClassName,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          )}
          <div
            className={cn(
              "absolute inset-0 transition-opacity",
              imageSource
                ? "bg-linear-to-t from-black/80 via-black/40 to-transparent text-white"
                : "bg-primary text-primary-foreground",
              featuredLinkOverlayClassName,
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
                      featuredLinkLabelClassName,
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
                    featuredLinkDescriptionClassName,
                  )}
                >
                  {description}
                </span>
              ) : (
                description
              ))}
          </div>
        </Pressable>
      );
    });
  }, [
    featuredLinksSlot,
    featuredLinks,
    featuredLinkClassName,
    featuredLinkImageClassName,
    optixFlowConfig,
    featuredLinkOverlayClassName,
    featuredLinkIconClassName,
    featuredLinkLabelClassName,
    featuredLinkDescriptionClassName,
  ]);

  const renderRegularLinks = useMemo(() => {
    if (regularLinksSlot) return regularLinksSlot;
    if (!regularLinks || regularLinks.length === 0) return null;

    return regularLinks.map((link, index) => {
      const {
        label,
        icon,
        children,
        className: linkClassName,
        iconName,
        ...pressableProps
      } = link;
      const iconElement = icon ? (
        <DynamicIcon
          name={icon}
          size={20}
          className={regularLinkIconClassName}
        />
      ) : iconName ? (
          <DynamicIcon
            name={iconName}
            size={20}
            className={regularLinkIconClassName}
          />
        ) : null;

      if (children) {
        return (
          <Pressable
            key={link.id ?? index}
            className={cn(
              "group flex items-center gap-3 rounded-xl p-3",
              regularLinkClassName,
              linkClassName,
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
            "group flex items-center gap-3 rounded-xl p-3",
            "bg-card text-card-foreground",
            regularLinkClassName,
            linkClassName,
          )}
          {...pressableProps}
        >
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              regularLinkIconWrapperClassName,
            )}
          >
            {iconElement}
          </div>
          {label &&
            (typeof label === "string" ? (
              <span
                className={cn(
                  "truncate text-sm font-medium",
                  regularLinkLabelClassName,
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
  }, [
    regularLinksSlot,
    regularLinks,
    regularLinkClassName,
    regularLinkIconWrapperClassName,
    regularLinkIconClassName,
    regularLinkLabelClassName,
  ]);

  const renderLinks = useMemo(() => {
    if (linksSlot) return linksSlot;
    if (!links || links.length === 0) return null;

    const hasFeatured = Boolean(featuredLinksSlot) || featuredLinks.length > 0;
    const hasRegular = Boolean(regularLinksSlot) || regularLinks.length > 0;

    return (
      <div className={cn("space-y-3 md:space-y-6", linksClassName)}>
        {hasFeatured && (
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6",
              featuredLinksClassName,
            )}
          >
            {renderFeaturedLinks}
          </div>
        )}
        {hasRegular && (
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6",
              regularLinksClassName,
            )}
          >
            {renderRegularLinks}
          </div>
        )}
      </div>
    );
  }, [
    linksSlot,
    links,
    linksClassName,
    featuredLinksSlot,
    featuredLinks,
    featuredLinksClassName,
    renderFeaturedLinks,
    regularLinksSlot,
    regularLinks,
    regularLinksClassName,
    renderRegularLinks,
  ]);

  const renderProfile = useMemo(() => {
    if (profileSlot) return profileSlot;

    return (
      <div
        className={cn(
          "flex flex-col items-center space-y-3 text-center",
          headerClassName,
        )}
      >
        {isBannerMode ? null : (
          <div
            className={cn(
              LINK_PAGE_LOGO_BOX_CLASSES_A[resolvedLogoAspect],
              avatarClassName,
            )}
          >
            {/* `.src` truthiness, not object presence: BrandLogo returns null
                for a src-less logo, so a stored `{"alt":"…","src":null}` logo
                would render an EMPTY medallion box and swallow the usable
                logoSlot/avatar below. */}
            {logo?.src ? (
              <BrandLogo
                logo={logo}
                logoSlot={logoSlot}
                size="xl"
                aspect={resolvedLogoAspect}
                logoClassName={cn("mb-2", logoClassName)}
                optixFlowConfig={optixFlowConfig}
              />
            ) : logoSlot ? (
              logoSlot
            ) : resolvedAvatar ? (
              <Img
                src={resolvedAvatar.src}
                alt={resolvedAvatar.alt}
                className={LINK_PAGE_LOGO_IMG_CLASSES_A[resolvedLogoAspect]}
                optixFlowConfig={optixFlowConfig}
              />
            ) : null}
          </div>
        )}

        <div className="space-y-1">
          {name &&
            (typeof name === "string" ? (
              <h1 className={cn("text-xl font-bold", nameClassName)}>{name}</h1>
            ) : (
              name
            ))}
          {bio &&
            (typeof bio === "string" ? (
              <p className={cn("max-w-xs text-sm text-balance", bioClassName)}>
                {bio}
              </p>
            ) : (
              bio
            ))}
        </div>

        {renderSocialLinks}
      </div>
    );
  }, [
    profileSlot,
    logo,
    logoSlot,
    logoClassName,
    isBannerMode,
    resolvedLogoAspect,
    resolvedAvatar,
    avatarClassName,
    optixFlowConfig,
    name,
    nameClassName,
    bio,
    bioClassName,
    renderSocialLinks,
    headerClassName,
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
          "opacity-50",
          footerClassName,
          actionClassName,
        )}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon !== "" &&
              (icon == null ? defaultIcon : <DynamicIcon name={icon} />)}
            {label}
            {iconAfter !== "" && <DynamicIcon name={iconAfter} />}
          </>
        )}
      </Pressable>
    );
  }, [footerSlot, footerAction, footerClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={sectionClassName}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      containerClassName={containerClassName}
    >
      {isBannerMode && logoBannerImage ? (
        <div
          data-slot="link-page-banner"
          className={cn(
            LINK_PAGE_BANNER_BREAKOUT_CLASSES,
            // An out-of-contract stored value (e.g. "16:9") must not collapse
            // the band to zero height — fall back to the standard ratio.
            LINK_PAGE_LOGO_BANNER_ASPECT_CLASSES[
              logoBannerAspect ?? "standard"
            ] ?? LINK_PAGE_LOGO_BANNER_ASPECT_CLASSES.standard,
            // This block has no vertical rhythm between the Section's first
            // child and the profile header, so the gap is carried here.
            "mb-8 sm:mb-10",
          )}
        >
          <Img
            src={logoBannerImage.src}
            alt={logoBannerImage.alt}
            className="size-full object-cover"
            optixFlowConfig={optixFlowConfig}
            loading="eager"
          />
        </div>
      ) : null}
      <div className="flex flex-col items-center">
        <div className={cn("w-full space-y-6", contentClassName)}>
          {renderProfile}
          {renderLinks}
          <div className="pt-4">{renderFooter}</div>
        </div>
      </div>
    </Section>
  );
}
