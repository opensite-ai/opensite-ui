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
   * stays fully visible.
   */
  logoBannerImage?: ImageItem;
  /**
   * Aspect ratio of the full-bleed banner band: "standard" (~16:7 reserved band,
   * max 60vh), "wide" (3:1, max 50vh), "ultrawide" (4:1, max 40vh). The reserved
   * shape only holds until the image loads — the banner image always renders
   * full-width at its natural aspect ratio and is NEVER cropped, so artwork with
   * text or labels stays fully visible; the max height caps the band
   * (letterboxing, not cropping, when it binds).
   * @default "standard"
   */
  logoBannerAspect?: LinkPageLogoBannerAspect;
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
  sectionId = "link-page-grid-cards",
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
  columns = 2,
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
  gridClassName,
  cardClassName,
  cardIconWrapperClassName,
  cardIconClassName,
  cardLabelClassName,
  cardDescriptionClassName,
  footerClassName,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-12 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
  optixFlowConfig,
}: LinkPageGridCardsProps): React.JSX.Element {
  // Banner mode requires an actual src: stored payloads routinely carry
  // {"alt": "...", "src": null}, and those must fall back to legacy behavior.
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

  const renderProfile = useMemo(() => {
    if (profileSlot) return profileSlot;

    const resolvedAvatar: ImageItem | undefined = avatar?.src
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
            {/* `logo?.src`, not `logo`: BrandLogo returns null for a src-less
                logo, so a stored {"alt": "...", "src": null} object would
                otherwise win the ladder and leave an EMPTY medallion box
                instead of falling through to logoSlot / the avatar. */}
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
              <h1 className={cn("text-2xl font-bold", nameClassName)}>
                {name}
              </h1>
            ) : (
              <div className={nameClassName}>{name}</div>
            ))}
          {bio &&
            (typeof bio === "string" ? (
              <p className={cn("text-sm", bioClassName)}>{bio}</p>
            ) : (
              bio
            ))}
        </div>
      </div>
    );
  }, [
    profileSlot,
    logo,
    logoSlot,
    logoClassName,
    isBannerMode,
    resolvedLogoAspect,
    avatar,
    avatarUrl,
    avatarClassName,
    optixFlowConfig,
    name,
    nameClassName,
    bio,
    bioClassName,
    headerClassName,
  ]);

  const renderSocialLinks = useMemo(() => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div
        className={cn(
          "flex items-center justify-center gap-2",
          socialLinksClassName,
        )}
      >
        {socialLinks.map((social, index) => (
          <SocialLinkIcon
            key={social.id ?? social.href ?? index}
            href={social.href}
            label={
              social["aria-label"] ||
              (typeof social.label === "string" ? social.label : undefined)
            }
            className={cn(
              "rounded-lg p-2 transition-all duration-200",
              "bg-card text-card-foreground hover:opacity-80",
              "size-12 flex items-center justify-center",
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

  const renderLinks = useMemo(() => {
    if (linksSlot) return linksSlot;
    if (!links || links.length === 0) return null;

    return (
      <div
        className={cn(
          "grid gap-3",
          columns === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2",
          gridClassName,
        )}
      >
        {links.map((link, index) => {
          const {
            label,
            description,
            icon,
            children,
            className: linkClassName,
            iconName,
            ...pressableProps
          } = link;
          const iconElement = icon ? (
            <DynamicIcon
              name={icon}
              size={24}
              className={cardIconClassName}
            />
          ) : iconName ? (
              <DynamicIcon
                name={iconName}
                size={24}
                className={cardIconClassName}
              />
            ) : null;

          if (children) {
            return (
              <Pressable
                key={link.id ?? index}
                className={cn(
                  "group flex flex-col items-center gap-2 rounded-xl p-4",
                  "transition-all duration-200 shadow-md",
                  "border border-border hover:shadow-xl",
                  "text-card-foreground bg-card",
                  cardClassName,
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
                "group flex flex-col items-center gap-2 rounded-xl",
                "hover:scale-[1.03] active:scale-[0.97]",
                "transition-all duration-200 p-4",
                "bg-card text-card-foreground shadow-sm hover:shadow-md",
                "border border-border",
                cardClassName,
                linkClassName,
              )}
              {...pressableProps}
            >
              <div
                className={cn(
                  "flex size-12 items-center justify-center",
                  "rounded-xl transition-colors",
                  "group-hover:opacity-80",
                  cardIconWrapperClassName,
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
                        cardLabelClassName,
                      )}
                    >
                      {label}
                    </span>
                  ) : (
                    label
                  ))}
                {description &&
                  (typeof description === "string" ? (
                    <span
                      className={cn("block text-sm", cardDescriptionClassName)}
                    >
                      {description}
                    </span>
                  ) : (
                    description
                  ))}
              </div>
            </Pressable>
          );
        })}
      </div>
    );
  }, [
    linksSlot,
    links,
    columns,
    gridClassName,
    cardIconClassName,
    cardClassName,
    cardIconWrapperClassName,
    cardLabelClassName,
    cardDescriptionClassName,
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
          "flex items-center justify-center",
          "text-xs transition-opacity hover:opacity-80",
          "opacity-50 gap-1.5",
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
      // Banner mode only: `pt-0 md:pt-0` override whatever top padding the
      // spacing preset resolved to (later padding utilities win by CSS order —
      // the hero-fullscreen idiom), so the band sits flush at the very top
      // without rewriting the consumer's spacing. `overflow-x-clip` clips the
      // w-screen breakout's half-scrollbar overhang, which otherwise causes
      // horizontal page scroll on classic-scrollbar browsers (Section only adds
      // overflow-hidden when a pattern is set). Non-banner renders pass
      // `className` through untouched → byte-identical legacy output.
      className={
        isBannerMode ? cn("overflow-x-clip pt-0 md:pt-0", className) : className
      }
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
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
          "flex min-h-screen w-full items-start justify-center py-12",
          containerClassName,
        )}
      >
        <div className={cn("w-full max-w-lg space-y-8", contentClassName)}>
          {renderProfile}
          {renderSocialLinks}
          {renderLinks}
          <div className="pt-4">{renderFooter}</div>
        </div>
      </div>
    </Section>
  );
}
