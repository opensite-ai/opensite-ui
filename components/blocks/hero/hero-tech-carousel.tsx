"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import { BlockActions } from "@/components/ui/block-actions";
import { ImageSlider, type ImageSliderImage } from "../../ui/image-slider";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import BrandLogo from "@/components/ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

/**
 * Maximum number of panels supported by the hero block.
 */
export const HERO_TECH_CAROUSEL_MAX_ITEMS = 4;

/**
 * Configuration for a single panel in the {@link HeroTechCarousel} block.
 *
 * Each panel renders as a full-height column on desktop and as a stacked,
 * content-fit row on mobile. Every visual element is optional so panels can
 * range from purely visual (background only) to fully populated (logo +
 * title + content + actions).
 *
 * @example
 * ```tsx
 * const item: HeroPanelItem = {
 *   logo: { src: "/logo.svg", alt: "Brand" },
 *   title: "Item title",
 *   content: "Short supporting copy",
 *   actions: [{ label: "Get Started", href: "/start" }],
 *   backgroundMedia: [
 *     { src: "/bg-1.jpg", alt: "" },
 *     { src: "/bg-2.jpg", alt: "" },
 *   ],
 * };
 * ```
 */
export interface HeroPanelItem {
  /**
   * Brand logo configuration — renders above the announcement badge.
   * LOGO MEDIA ONLY. Do not use photos, hero images, or video assets.
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;
  /**
   * Optional panel title.
   */
  title?: React.ReactNode | string;
  /**
   * Optional supporting content rendered below the title.
   */
  content?: React.ReactNode | string;
  /**
   * Optional action buttons / links rendered at the bottom of the panel.
   */
  actions?: ActionConfig[];
  /**
   * Optional background media for the panel.
   *
   * - `0` items → no background, panel renders on the section background.
   * - `1` item  → static background image.
   * - `2+` items → autoplaying image carousel via {@link ImageSlider}.
   */
  backgroundMedia?: ImageSliderImage[];
  /**
   * Autoplay interval (ms) for this panel's background carousel.
   * Falls back to the block-level `backgroundAutoplayIntervalMs` when omitted.
   */
  backgroundAutoplayIntervalMs?: number;
  /**
   * Optional id for the panel element (for anchor links / analytics).
   */
  id?: string;
  /**
   * Additional CSS classes for this panel's outer wrapper.
   */
  className?: string;
  /**
   * Additional CSS classes for the panel's content layer (above the background).
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the panel's title element.
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the panel's content paragraph.
   */
  textClassName?: string;
  /**
   * Additional CSS classes for the panel's actions wrapper.
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes applied to the panel's background overlay.
   * Useful for tuning legibility per-panel (e.g. `bg-black/60`).
   */
  overlayClassName?: string;
  /**
   * Per-panel OptixFlow override. Falls back to the block-level config.
   */
  optixFlowConfig?: OptixFlowConfig;
}

export interface HeroTechCarouselProps {
  /**
   * Panels rendered side-by-side on desktop and stacked on mobile.
   * Capped at {@link HERO_TECH_CAROUSEL_MAX_ITEMS} (4) — additional entries are ignored.
   */
  items?: HeroPanelItem[];
  /**
   * Default autoplay interval (ms) used when a panel has 2+ background media
   * items and does not specify its own `backgroundAutoplayIntervalMs`.
   * @default 5000
   */
  backgroundAutoplayIntervalMs?: number;
  /**
   * Background style for the section.
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section. Defaults to `none` so panels can fill
   * the full viewport on desktop without padding.
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name applied to the section.
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1).
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section.
   */
  className?: string;
  /**
   * Additional CSS classes for the section container.
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the panels wrapper (the flex/grid track).
   */
  panelsClassName?: string;
  /**
   * Default classes shared by every panel content layer (title/content/actions).
   * Per-panel `contentClassName` is appended after this.
   */
  panelContentClassName?: string;
  /**
   * Block-level OptixFlow image optimization configuration. Applies to all
   * panels unless a panel provides its own `optixFlowConfig`.
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

interface PanelProps {
  item: HeroPanelItem;
  defaultAutoplayIntervalMs: number;
  optixFlowConfig?: OptixFlowConfig;
  panelContentClassName?: string;
}

function HeroPanel({
  item,
  defaultAutoplayIntervalMs,
  optixFlowConfig,
  panelContentClassName,
}: PanelProps): React.JSX.Element {
  const {
    logo,
    logoSlot,
    logoClassName,
    title,
    content,
    actions,
    backgroundMedia,
    backgroundAutoplayIntervalMs,
    id,
    className,
    contentClassName,
    titleClassName,
    textClassName,
    actionsClassName,
    overlayClassName,
    optixFlowConfig: itemOptixFlowConfig,
  } = item;

  const resolvedOptixFlow = itemOptixFlowConfig ?? optixFlowConfig;

  const renderBackground = useMemo(() => {
    if (!backgroundMedia || backgroundMedia.length === 0) return null;

    // Single background image — render as a static cover.
    if (backgroundMedia.length === 1) {
      const image = backgroundMedia[0];
      if (!image?.src) return null;
      return (
        <div className="absolute inset-0 z-0">
          <Img
            src={image.src}
            alt={image.alt ?? ""}
            className={cn(
              "h-full w-full object-cover object-center",
              image.className,
            )}
            optixFlowConfig={image.optixFlowConfig ?? resolvedOptixFlow}
            loading="eager"
          />
          <div
            className={cn(
              "absolute inset-0 bg-linear-to-b from-black/55 via-black/45 to-black/65",
              overlayClassName,
            )}
          />
        </div>
      );
    }

    // Multiple background images — autoplay carousel.
    return (
      <div className="absolute inset-0 z-0">
        <ImageSlider
          images={backgroundMedia}
          className="h-full w-full rounded-none border-0 shadow-none"
          imageClassName="object-cover object-center"
          transition="fade"
          autoplay
          autoplayIntervalMs={
            backgroundAutoplayIntervalMs ?? defaultAutoplayIntervalMs
          }
          enableKeyboard={false}
          overlay={false}
          optixFlowConfig={resolvedOptixFlow}
        />
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-b from-black/55 via-black/45 to-black/65",
            overlayClassName,
          )}
        />
      </div>
    );
  }, [
    backgroundMedia,
    backgroundAutoplayIntervalMs,
    defaultAutoplayIntervalMs,
    resolvedOptixFlow,
    overlayClassName,
  ]);

  const hasBackground = !!backgroundMedia && backgroundMedia.length > 0;

  const renderLogo = useMemo(() => {
    if (!logoSlot && !logo?.src) return null;

    return (
      <div className={cn("flex justify-center", logoClassName)}>
        <BrandLogo
          logo={logo}
          logoSlot={logoSlot}
          size="md"
          optixFlowConfig={resolvedOptixFlow}
        />
      </div>
    );
  }, [logoSlot, logo, logoClassName, resolvedOptixFlow]);

  const hasLogo = !!renderLogo;

  const renderTitle = useMemo(() => {
    if (title === undefined || title === null || title === "") return null;
    if (typeof title === "string") {
      return (
        <h2
          className={cn(
            "font-semibold text-balance",
            hasLogo ? "text-lg lg:text-xl" : "text-xl md:text-2xl lg:text-3xl",
            hasBackground && "text-white text-shadow-lg",
            titleClassName,
          )}
        >
          {title}
        </h2>
      );
    }
    return <div className={titleClassName}>{title}</div>;
  }, [title, titleClassName, hasBackground, hasLogo]);

  const renderContent = useMemo(() => {
    if (content === undefined || content === null || content === "")
      return null;
    if (typeof content === "string") {
      return (
        <p
          className={cn(
            "text-sm md:text-base leading-snug text-balance",
            hasBackground ? "text-white text-shadow-lg" : "",
            textClassName,
          )}
        >
          {content}
        </p>
      );
    }
    return <div className={textClassName}>{content}</div>;
  }, [content, textClassName, hasBackground]);

  return (
    <div
      id={id}
      data-slot="hero-tech-carousel-panel"
      className={cn(
        // Mobile: stack vertically with content-fit height + padding.
        "relative w-full overflow-hidden",
        // Desktop: flex children share the row equally and fill height.
        "md:h-full md:flex-1 md:basis-0 md:min-w-0",
        // Provide a default panel background when no media is supplied so
        // separators between panels remain visible.
        !hasBackground && "bg-muted/30",
        className,
      )}
    >
      {renderBackground}

      <div
        className={cn(
          "relative z-10 flex h-full w-full flex-col items-center justify-center gap-4",
          // Mobile padding keeps content readable when stacked.
          "px-6 py-12 md:px-8 md:py-12 lg:px-10",
          // Center content vertically; on desktop columns can be quite tall.
          "text-center",
          panelContentClassName,
          contentClassName,
        )}
      >
        {renderLogo}
        {renderTitle}
        {renderContent}
        <BlockActions
          actions={actions}
          actionsClassName={actionsClassName}
          verticalSpacing="mt-2 md:mt-4"
          mobileConfig={{ width: "fit", position: "center" }}
        />
      </div>
    </div>
  );
}

/**
 * Hero block that renders 1–4 side-by-side panels on desktop and stacks them
 * vertically on mobile. Each panel can include a logo, title, supporting copy,
 * actions, and an optional background image or autoplaying image carousel.
 *
 * - Desktop: full-bleed `100vw` width, `100dvh` height, panels share the row equally.
 * - Mobile: panels stack vertically with content-fit height and modern padding.
 *
 * @example
 * ```tsx
 * <HeroTechCarousel
 *   items={[
 *     {
 *       logo: { src: "/logos/insurance.svg", alt: "InsuranceSite" },
 *       title: "InsuranceSite",
 *       content: "Built for modern brokers",
 *       actions: [{ label: "Get Started", href: "/insurance" }],
 *       backgroundMedia: [
 *         { src: "/img/insurance-1.jpg", alt: "" },
 *         { src: "/img/insurance-2.jpg", alt: "" },
 *       ],
 *     },
 *     // ... up to 4 items
 *   ]}
 * />
 * ```
 */
export function HeroTechCarousel({
  sectionId = "hero-tech-carousel",
  items,
  backgroundAutoplayIntervalMs = 5000,
  background,
  spacing = "none",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-0 sm:px-0 lg:px-0 max-w-full relative z-10 h-auto md:h-dvh w-screen flex items-stretch",
  panelsClassName,
  panelContentClassName,
  optixFlowConfig,
}: HeroTechCarouselProps): React.JSX.Element {
  const visibleItems = useMemo(() => {
    if (!items || items.length === 0) return [] as HeroPanelItem[];
    return items.slice(0, HERO_TECH_CAROUSEL_MAX_ITEMS);
  }, [items]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(
        "relative w-screen overflow-hidden",
        // Desktop fills the viewport; on mobile content drives the height.
        "h-auto md:h-dvh",
        "px-0 pt-0 pb-0",
        className,
      )}
      containerClassName={containerClassName}
    >
      {visibleItems.length === 0 ? null : (
        <div
          data-slot="hero-tech-carousel-panels"
          className={cn(
            // Mobile: vertical stack with auto height per panel.
            "flex w-full flex-col",
            // Desktop: equal-width row that fills section height.
            "md:h-full md:flex-row md:items-stretch",
            panelsClassName,
          )}
        >
          {visibleItems.map((item, idx) => (
            <HeroPanel
              key={item.id ?? idx}
              item={item}
              defaultAutoplayIntervalMs={backgroundAutoplayIntervalMs}
              optixFlowConfig={optixFlowConfig}
              panelContentClassName={panelContentClassName}
            />
          ))}
        </div>
      )}
    </Section>
  );
}
