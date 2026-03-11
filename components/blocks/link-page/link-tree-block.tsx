"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import { SocialLinkIcon } from "../../ui/social-link-icon";
import { Lightbox, type LightboxItem } from "@page-speed/lightbox";
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
 * Link item for the link tree
 */
export interface LinkTreeLink extends ActionConfig {
  id?: string;
  description?: React.ReactNode;
  featured?: boolean;
  badge?: React.ReactNode;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  iconName?: string;
}

/**
 * Social link for the link tree
 */
export interface SocialLink extends SocialLinkItem {
  id?: string;
  iconName?: string;
}

/**
 * Media gallery item for the link tree
 */
export interface MediaGalleryItem {
  id?: string;
  type: "image" | "video";
  src: string;
  alt?: string;
  href?: string;
  poster?: string;
  className?: string;
  mediaClassName?: string;
}

/**
 * Props for the LinkTreeBlock component
 */
export interface LinkTreeBlockProps {
  /**
   * Brand/profile name displayed at the top
   */
  brandName?: React.ReactNode;
  /**
   * Optional tagline or bio displayed below the name
   */
  brandTagline?: React.ReactNode;
  /**
   * Optional logo image (used if no avatar is provided)
   */
  brandLogo?: ImageItem | string;
  /**
   * Optional avatar image (takes precedence over logo)
   */
  brandAvatar?: ImageItem | string;
  /**
   * Whether to show a verified badge next to the name
   */
  brandVerified?: boolean;
  /**
   * Custom verified icon
   */
  verifiedIcon?: React.ReactNode;
  /**
   * Custom slot for rendering brand header
   */
  brandSlot?: React.ReactNode;
  /**
   * Array of links to display
   */
  links?: LinkTreeLink[];
  /**
   * Custom slot for rendering links (overrides links array)
   */
  linksSlot?: React.ReactNode;
  /**
   * Array of social media links
   */
  socialLinks?: SocialLink[];
  /**
   * Custom slot for rendering social links (overrides socialLinks array)
   */
  socialLinksSlot?: React.ReactNode;
  /**
   * Array of media items for the gallery section
   */
  mediaGallery?: MediaGalleryItem[];
  /**
   * Custom slot for rendering media gallery (overrides mediaGallery array)
   */
  mediaGallerySlot?: React.ReactNode;
  /**
   * Title for the media gallery section
   */
  mediaGalleryTitle?: React.ReactNode;
  /**
   * Maximum number of media items to show
   */
  mediaGalleryLimit?: number;
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
   * Additional CSS classes for the brand header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the avatar wrapper
   */
  avatarClassName?: string;
  /**
   * Additional CSS classes for the brand name
   */
  nameClassName?: string;
  /**
   * Additional CSS classes for the brand tagline
   */
  taglineClassName?: string;
  /**
   * Additional CSS classes for the verified badge container
   */
  verifiedBadgeClassName?: string;
  /**
   * Additional CSS classes for the verified icon
   */
  verifiedIconClassName?: string;
  /**
   * Additional CSS classes for the links container
   */
  linksClassName?: string;
  /**
   * Additional CSS classes for link items
   */
  linkClassName?: string;
  /**
   * Additional CSS classes for featured link items
   */
  featuredLinkClassName?: string;
  /**
   * Additional CSS classes for link icons
   */
  linkIconClassName?: string;
  /**
   * Additional CSS classes for link labels
   */
  linkLabelClassName?: string;
  /**
   * Additional CSS classes for link descriptions
   */
  linkDescriptionClassName?: string;
  /**
   * Additional CSS classes for link badges
   */
  linkBadgeClassName?: string;
  /**
   * Additional CSS classes for link chevron icon
   */
  linkChevronClassName?: string;
  /**
   * Additional CSS classes for the media gallery section
   */
  mediaGalleryClassName?: string;
  /**
   * Additional CSS classes for the media gallery title
   */
  mediaGalleryTitleClassName?: string;
  /**
   * Additional CSS classes for the media gallery grid
   */
  mediaGalleryGridClassName?: string;
  /**
   * Additional CSS classes for media gallery items
   */
  mediaGalleryItemClassName?: string;
  /**
   * Additional CSS classes for media elements
   */
  mediaGalleryMediaClassName?: string;
  /**
   * Additional CSS classes for media overlay
   */
  mediaGalleryOverlayClassName?: string;
  /**
   * Additional CSS classes for media play icon
   */
  mediaGalleryPlayIconClassName?: string;
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
   * Background pattern URL (legacy)
   */
  backgroundPattern?: PatternName | undefined;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * LinkTreeBlock - A customizable link-in-bio style page component with three theme variations.
 *
 * This component provides a complete link page solution with:
 * - Brand header with avatar, name, tagline, and optional verified badge
 * - Customizable link list with icons, descriptions, badges, and featured states
 * - Media gallery section for showcasing images and videos
 * - Social media links section
 * - Three theme variations: light, dark, and glass (glassmorphism)
 * - Background pattern customization using patternSvgs
 *
 * @example
 * ```tsx
 * // Light theme (default)
 * <LinkTreeBlock
 *   brandName="Sarah Chen"
 *   brandTagline="Digital creator & photographer"
 *   links={[
 *     { id: "1", label: "My Website", href: "https://example.com", iconName: "lucide/globe" }
 *   ]}
 * />
 *
 * // Dark theme with pattern background
 * <LinkTreeBlock
 *   brandName="Sarah Chen"
 *   theme="dark"
 *   backgroundPattern={patternSvgs.dots}
 * />
 *
 * // Glass theme with gradient background
 * <LinkTreeBlock
 *   brandName="Sarah Chen"
 *   theme="glass"
 * />
 * ```
 */
export function LinkTreeBlock({
  sectionId = "link-tree-block",
  brandName,
  brandTagline,
  brandLogo,
  brandAvatar,
  brandVerified = false,
  verifiedIcon,
  brandSlot,
  links,
  linksSlot,
  socialLinks,
  socialLinksSlot,
  mediaGallery,
  mediaGallerySlot,
  mediaGalleryTitle,
  mediaGalleryLimit = 6,
  footerAction,
  footerSlot,
  className,
  contentClassName,
  headerClassName,
  avatarClassName,
  nameClassName,
  taglineClassName,
  verifiedBadgeClassName,
  verifiedIconClassName,
  linksClassName,
  linkClassName,
  featuredLinkClassName,
  linkIconClassName,
  linkLabelClassName,
  linkDescriptionClassName,
  linkBadgeClassName,
  linkChevronClassName,
  mediaGalleryClassName,
  mediaGalleryTitleClassName,
  mediaGalleryGridClassName,
  mediaGalleryItemClassName,
  mediaGalleryMediaClassName,
  mediaGalleryOverlayClassName,
  mediaGalleryPlayIconClassName,
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
  backgroundPattern,
  optixFlowConfig,
}: LinkTreeBlockProps): React.JSX.Element {
  const resolvedBackground = background;
  const resolvedPattern = pattern ?? backgroundPattern;

  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  const lightboxItems: LightboxItem[] = React.useMemo(() => {
    if (!mediaGallery || mediaGallery.length === 0) return [];
    return mediaGallery.slice(0, mediaGalleryLimit).map((item, index) => ({
      id: item.id ?? `media-${index}`,
      type: item.type as "image" | "video",
      src: item.src,
      alt: item.alt,
      thumbnail: item.poster || item.src,
      download: item.type === "image",
      share: true,
    }));
  }, [mediaGallery, mediaGalleryLimit]);

  const handleMediaClick = React.useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleLightboxClose = React.useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const resolveImage = (
    value?: ImageItem | string,
    fallbackAlt?: string,
  ): ImageItem | undefined => {
    if (!value) return undefined;
    if (typeof value === "string") {
      return { src: value, alt: fallbackAlt ?? "" };
    }
    return value;
  };

  const nameForAlt = typeof brandName === "string" ? brandName : "Brand avatar";
  const resolvedAvatar = resolveImage(brandAvatar || brandLogo, nameForAlt);

  const renderBrandHeader = React.useMemo(() => {
    if (brandSlot) return brandSlot;

    return (
      <div
        className={cn(
          "flex flex-col items-center gap-4 text-center",
          headerClassName,
        )}
      >
        <div className="relative">
          <div
            className={cn(
              "h-24 w-24 overflow-hidden rounded-full border-4 border-background bg-muted shadow-xl",
              avatarClassName,
            )}
          >
            {resolvedAvatar && (
              <Img
                src={resolvedAvatar.src}
                alt={resolvedAvatar.alt}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            )}
          </div>
          {brandVerified && (
            <div
              className={cn(
                "absolute -bottom-1 -right-1 rounded-full bg-primary text-primary-foreground p-1",
                verifiedBadgeClassName,
              )}
            >
              {verifiedIcon ?? (
                <DynamicIcon
                  name="lucide/check"
                  size={14}
                  className={cn("", verifiedIconClassName)}
                />
              )}
            </div>
          )}
        </div>

        <div className="space-y-1">
          {brandName &&
            (typeof brandName === "string" ? (
              <h1
                className={cn(
                  "text-2xl font-bold tracking-tight",
                  nameClassName,
                )}
              >
                {brandName}
              </h1>
            ) : (
              <div className={nameClassName}>{brandName}</div>
            ))}
          {brandTagline &&
            (typeof brandTagline === "string" ? (
              <p
                className={cn(
                  "max-w-xs text-balance text-sm",
                  taglineClassName,
                )}
              >
                {brandTagline}
              </p>
            ) : (
              <div className={taglineClassName}>{brandTagline}</div>
            ))}
        </div>
      </div>
    );
  }, [
    brandSlot,
    headerClassName,
    avatarClassName,
    resolvedAvatar,
    optixFlowConfig,
    brandVerified,
    verifiedBadgeClassName,
    verifiedIcon,
    verifiedIconClassName,
    brandName,
    nameClassName,
    brandTagline,
    taglineClassName,
  ]);

  const renderLinks = React.useMemo(() => {
    if (linksSlot) return linksSlot;
    if (!links || links.length === 0) return null;

    return (
      <div className={cn("space-y-3", linksClassName)}>
        {links.map((link, index) => {
          const isFeatured = link.featured;
          const {
            label,
            description,
            icon,
            iconName,
            children,
            className: linkItemClassName,
            featured: _featured, // Destructure to prevent passing to DOM
            ...pressableProps
          } = link;
          const iconElement =
            icon ||
            (iconName ? (
              <DynamicIcon
                name={iconName}
                size={20}
                className={linkIconClassName}
              />
            ) : null);

          const badgeVariant =
            link.badgeVariant ?? (isFeatured ? "secondary" : "default");

          if (children) {
            return (
              <Pressable
                key={link.id ?? index}
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-200",
                  "border border-border",
                  isFeatured
                    ? "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
                    : "bg-card text-card-foreground hover:bg-primary hover:text-primary-foreground",
                  linkClassName,
                  isFeatured ? featuredLinkClassName : null,
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
                "group relative flex w-full items-center gap-3 rounded-xl px-4 py-3.5 transition-all duration-200",
                "border border-border",
                isFeatured
                  ? "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
                  : "bg-card text-card-foreground hover:bg-primary hover:text-primary-foreground",
                linkClassName,
                isFeatured ? featuredLinkClassName : null,
                linkItemClassName,
              )}
              {...pressableProps}
            >
              {iconElement}

              <div className="min-w-0 flex-1 text-left">
                {label &&
                  (typeof label === "string" ? (
                    <span
                      className={cn(
                        "block truncate text-sm font-medium",
                        linkLabelClassName,
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
                      className={cn(
                        "mt-0.5 block truncate text-xs",
                        linkDescriptionClassName,
                      )}
                    >
                      {description}
                    </span>
                  ) : (
                    description
                  ))}
              </div>

              {link.badge && (
                <Badge
                  variant={badgeVariant}
                  className={cn("shrink-0 text-xs", linkBadgeClassName)}
                >
                  {link.badge}
                </Badge>
              )}

              <DynamicIcon
                name="lucide/chevron-right"
                size={16}
                className={cn(
                  "shrink-0 transition-transform group-hover:translate-x-0.5",
                  isFeatured ? "text-primary-foreground" : "",
                  linkChevronClassName,
                )}
              />
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
    featuredLinkClassName,
    linkLabelClassName,
    linkDescriptionClassName,
    linkBadgeClassName,
    linkChevronClassName,
  ]);

  const renderMediaGallery = React.useMemo(() => {
    if (mediaGallerySlot) return mediaGallerySlot;
    if (!mediaGallery || mediaGallery.length === 0) return null;

    const items = mediaGallery.slice(0, mediaGalleryLimit);

    return (
      <div className={cn("space-y-3", mediaGalleryClassName)}>
        {mediaGalleryTitle &&
          (typeof mediaGalleryTitle === "string" ? (
            <h3
              className={cn(
                "text-center text-sm font-medium ",
                mediaGalleryTitleClassName,
              )}
            >
              {mediaGalleryTitle}
            </h3>
          ) : (
            mediaGalleryTitle
          ))}

        <div
          className={cn("grid grid-cols-3 gap-2", mediaGalleryGridClassName)}
        >
          {items.map((item, index) => (
            <div
              key={item.id ?? index}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-lg cursor-pointer",
                "ring-1",
                mediaGalleryItemClassName,
                item.className,
              )}
              onClick={() => handleMediaClick(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleMediaClick(index);
                }
              }}
              aria-label={`View ${item.alt || item.type} in lightbox`}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  poster={item.poster}
                  className={cn(
                    "h-full w-full object-cover",
                    mediaGalleryMediaClassName,
                    item.mediaClassName,
                  )}
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                />
              ) : (
                <Img
                  src={item.src}
                  alt={item.alt || ""}
                  className={cn(
                    "h-full w-full object-cover transition-transform duration-300",
                    mediaGalleryMediaClassName,
                    item.mediaClassName,
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
              )}

              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200",
                  mediaGalleryOverlayClassName,
                )}
              >
                {item.type === "video" && (
                  <DynamicIcon
                    name="lucide/play"
                    size={24}
                    className={cn(
                      " opacity-0 transition-opacity group-hover:opacity-100",
                      mediaGalleryPlayIconClassName,
                    )}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }, [
    mediaGallerySlot,
    mediaGallery,
    mediaGalleryLimit,
    mediaGalleryClassName,
    mediaGalleryTitle,
    mediaGalleryTitleClassName,
    mediaGalleryGridClassName,
    mediaGalleryItemClassName,
    handleMediaClick,
    mediaGalleryMediaClassName,
    optixFlowConfig,
    mediaGalleryOverlayClassName,
    mediaGalleryPlayIconClassName,
  ]);

  const renderSocialLinks = React.useMemo(() => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-2",
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
              "flex h-12 w-12 items-center justify-center rounded-full p-2.5 transition-all duration-200",
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

  const renderFooter = React.useMemo(() => {
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
      id={sectionId}
      background={resolvedBackground}
      spacing={spacing}
      className={className}
      pattern={resolvedPattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      containerClassName={containerClassName}
    >
      <div className="flex min-h-screen w-full items-start justify-center py-12">
        <div className={cn("w-full max-w-md space-y-6", contentClassName)}>
          {renderBrandHeader}
          {renderLinks}
          {renderMediaGallery}
          {renderSocialLinks}
          <div className="pt-4">{renderFooter}</div>
        </div>
      </div>

      {lightboxOpen && lightboxItems.length > 0 && (
        <Lightbox
          items={lightboxItems}
          initialIndex={lightboxIndex}
          layout="horizontal"
          controls={{
            navigation: true,
            thumbnails: true,
            download: true,
            share: true,
            fullscreen: true,
            captions: true,
            counter: true,
          }}
          onClose={handleLightboxClose}
          enableKeyboardShortcuts={true}
          closeOnEscape={true}
          closeOnBackdropClick={true}
        />
      )}
    </Section>
  );
}
