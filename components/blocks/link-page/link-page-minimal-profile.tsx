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
import { SocialLinkIcon } from "../../ui/social-link-icon";
import { BrandLogo } from "../../ui/brand-logo";
import type { BrandLogoAspect } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";
import {
  LINK_PAGE_BANNER_BREAKOUT_CLASSES,
  LINK_PAGE_LOGO_BANNER_ASPECT_CLASSES,
  LINK_PAGE_LOGO_BANNER_IMG_CLASSES,
  LINK_PAGE_LOGO_BOX_CLASSES_A,
  LINK_PAGE_LOGO_IMG_CLASSES_A,
  resolveLinkPageBannerOptixFlowConfig,
} from "./logo-aspect";
import type {
  LinkPageLogoAspect,
  LinkPageLogoBannerAspect,
} from "./logo-aspect";

/**
 * Link item for the minimal profile link page
 */
export interface MinimalProfileLink extends ActionConfig {
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
   * Optional LogoConfig for BrandLogo rendering (takes priority over avatar)
   */
  logo?: LogoConfig;
  /**
   * Custom slot for the logo/avatar (takes priority over logo and avatar)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo WRAPPER (not the image). Has no effect on
   * live client sites (not harvested for compiled CSS) — never use it for logo
   * sizing; use logoAspect.
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
   * src and descriptive alt text. The image is never cropped — it renders
   * full-width at its natural aspect ratio, so artwork carrying text or labels
   * stays fully visible. On mobile the banner is full-bleed edge-to-edge; on
   * desktop it renders at the content column's width, flush with the top.
   */
  logoBannerImage?: ImageItem;
  /**
   * Aspect ratio of the full-bleed banner band: "standard" (~16:7 reserved band,
   * max 60vh), "wide" (3:1, max 50vh), "ultrawide" (4:1, max 40vh). The reserved
   * shape only holds until the image loads — the banner image always renders
   * full-width at its natural aspect ratio and is NEVER cropped, so artwork with
   * text or labels stays fully visible; the max height caps the band
   * (letterboxing, not cropping, when it binds). The reserved shape applies on
   * mobile only — at md+ the band's height comes from the artwork itself.
   * On mobile the banner is full-bleed edge-to-edge; on desktop it renders at
   * the content column's width, flush with the top.
   * @default "standard"
   */
  logoBannerAspect?: LinkPageLogoBannerAspect;
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
  socialLinks?: SocialLinkItem[];
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
  /** Optional Section ID */
  sectionId?: string;
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
  sectionId = "link-page-minimal-profile",
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
  // Banner mode requires a real src: a stored `{"alt":…,"src":null}` banner must
  // degrade to the legacy horizontal medallion rather than render an empty band.
  const isBannerMode = logoAspect === "banner" && Boolean(logoBannerImage?.src);
  // Stored payloads are untyped JSON, so anything can arrive here. Only the two
  // enlarged ladders are honored explicitly; every other value ("banner",
  // undefined, or an out-of-contract string like "portrait") collapses to the
  // legacy horizontal ladder. This narrowing is what guarantees the class-table
  // lookups below can never miss and emit a box/img with no size classes.
  const resolvedLogoAspect: BrandLogoAspect =
    logoAspect === "square" || logoAspect === "vertical"
      ? logoAspect
      : "horizontal";

  const renderProfile = useMemo(() => {
    if (profileSlot) return profileSlot;
    const resolvedAvatar =
      avatar?.src
        ? avatar
        : avatarUrl
          ? {
              src: avatarUrl,
              alt: typeof name === "string" ? name : "Profile avatar",
            }
          : undefined;

    return (
      <div
        className={cn(
          "flex flex-col items-center space-y-4 text-center",
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
            {/*
              Guard on logo.src, not on the logo OBJECT: BrandLogo returns null
              for a src-less logo, so testing the object would emit an empty
              medallion box and swallow a usable logoSlot/avatar. The stored
              shape `{"alt":"…","src":null}` is common (octane's brand-mark
              stripper produces it).
            */}
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
    logo,
    logoSlot,
    logoClassName,
    isBannerMode,
    resolvedLogoAspect,
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
            icon ? (
              <DynamicIcon
                name={icon}
                size={18}
                className={linkIconClassName}
              />
            ) : iconName ? (
              <DynamicIcon
                name={iconName}
                size={18}
                className={linkIconClassName}
              />
            ) : null;

          if (children) {
            return (
              <Pressable
                key={link.id ?? index}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-4 py-3",
                  "bg-card text-card-foreground border shadow-lg",
                  "transition-all duration-500 hover:opacity-80",
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
                "flex w-full items-center gap-3 rounded-lg px-4 py-3",
                "bg-card text-card-foreground border shadow-lg",
                "transition-all duration-500 hover:opacity-80",
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
        {socialLinks.map((social, index) => (
          <SocialLinkIcon
            key={social.href || index}
            href={social.href}
            label={
              social["aria-label"] ||
              (typeof social.label === "string" ? social.label : undefined)
            }
            className={cn(socialLinkClassName, social.className)}
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
            {icon == null
              ? defaultIcon
              : icon !== "" && <DynamicIcon name={icon} />}
            {label}
            {iconAfter !== "" && <DynamicIcon name={iconAfter} />}
          </>
        )}
      </Pressable>
    );
  }, [footerSlot, footerAction, footerClassName]);

  // Banner mode keeps the consumer's `spacing` verbatim (raw strings AND Section
  // presets alike) and layers a flush-top override on top of it: Section emits
  // `className` AFTER the spacing classes, so the literal `pt-0 md:pt-0` beats
  // any preset's top padding by CSS order (the hero-fullscreen idiom).
  // `overflow-x-clip` contains the banner's `w-screen` breakout — w-screen spans
  // the viewport INCLUDING a classic scrollbar gutter, so without the clip the
  // overhang gives the page a horizontal scrollbar (Section itself only sets
  // overflow-hidden when a pattern is present). The ternary keeps the non-banner
  // className byte-identical: no cn() wrapper, no injected tokens.
  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={
        isBannerMode ? cn("overflow-x-clip pt-0 md:pt-0", className) : className
      }
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
    >
      {/*
        Full-bleed banner: FIRST child inside the Section — immediately BEFORE the
        inner layout div, never inside it — so it sits flush at the top once the
        section's top padding is zeroed by the pt-0/md:pt-0 override above. This
        block merges containerClassName onto that inner layout div (not the Section
        Container), so the breakout must be self-contained. The inner div's py-16
        supplies the gap below the banner — no extra bottom margin.
      */}
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
            // Desktop width cap = THIS block's content/button column, which is
            // the "w-full max-w-sm space-y-8" div below. Literal, never
            // computed, so the safelist extractor can harvest it.
            "md:max-w-sm",
          )}
        >
          <Img
            src={logoBannerImage.src}
            alt={logoBannerImage.alt}
            // Natural-ratio, full-width, capped by the tier's max-h — never
            // cropped. Same out-of-contract hardening as the box lookup above.
            className={
              LINK_PAGE_LOGO_BANNER_IMG_CLASSES[
                logoBannerAspect ?? "standard"
              ] ?? LINK_PAGE_LOGO_BANNER_IMG_CLASSES.standard
            }
            // Forces fit=contain on the CDN transform too: without it the
            // site-wide OptixFlow global (apiKey, no objectFit) wins outright
            // and the fetched asset arrives ALREADY cover-cropped.
            optixFlowConfig={resolveLinkPageBannerOptixFlowConfig(
              optixFlowConfig,
            )}
            loading="eager"
          />
        </div>
      ) : null}
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
