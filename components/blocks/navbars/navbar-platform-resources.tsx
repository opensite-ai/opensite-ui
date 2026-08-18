"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import { NavbarLogo } from "../../ui/navbar-logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import { NavbarMobileMenu } from "../../ui/navbar-mobile-menu";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import {
  type LogoConfig,
  type ILinkItem,
  type IMenuLinkGroup,
  type NavbarLayoutVariant,
  getLinkUrl,
} from "./types";
import { getNavbarLayoutClasses } from "./layout-variant-utils";

// Re-export imported types for backward compatibility
export type { LogoConfig, ILinkItem, IMenuLinkGroup };

/**
 * Layout types for dropdown menus
 *
 * LAYOUT OPTIONS FOR AI PAGE BUILDER:
 *
 * 1. "simple-list"
 *    - Visual: Single column vertical list of items with icons and descriptions
 *    - Behavior: Clean, straightforward list with hover effects
 *    - Best for: Basic navigation, simple feature lists, straightforward menus
 *    - Required data: dropdownItems[] with title, description, href, icon
 *    - Example use case: Simple "Products" menu with 3-5 product links
 *
 * 2. "featured-grid"
 *    - Visual: Large featured item on left (with image), grid of smaller items on right
 *    - Behavior: Featured item draws attention, grid items are secondary
 *    - Best for: Highlighting a primary offering while showing related options
 *    - Required data: featuredItem with title, description, href, imgUrl, badge (optional)
 *                     dropdownItems[] for grid items
 *    - Example use case: "Platform" menu featuring main product with related tools
 *
 * 3. "two-column-cta"
 *    - Visual: Two-column grid of items with a prominent CTA card at the bottom
 *    - Behavior: Grid layout with call-to-action emphasis
 *    - Best for: Feature showcases with conversion goal, product listings with trial CTA
 *    - Required data: dropdownItems[] for grid items
 *                     ctaCard with title, description, href, imgUrl, badge (optional)
 *    - Example use case: "Use Cases" menu with CTA for "Start Free Trial"
 *
 * 4. "list-showcase"
 *    - Visual: Left column has vertical list, right column has showcase/highlight cards
 *    - Behavior: Balanced layout showing main items and special highlights
 *    - Best for: Developer tools with featured integrations, resources with highlights
 *    - Required data: dropdownItems[] for main list
 *                     showcaseItems[] with title, description, href, imgUrl, badge (optional)
 *    - Example use case: "Developers" menu with API docs list and featured SDKs
 *
 * 5. "multi-section"
 *    - Visual: Multiple labeled sections with grouped items, plus optional CTA card
 *    - Behavior: Organized sections for complex navigation hierarchies
 *    - Best for: Resource hubs, documentation, content-heavy navigation
 *    - Required data: sections[] with label and items[]
 *                     ctaCard (optional) for promotional content
 *    - Example use case: "Resources" menu with sections for Blog, News, Case Studies, Customers
 */
export type DropdownLayout =
  | "simple-list" // Simple vertical list with icons and descriptions
  | "list-with-icons" // Multi-column boxed icon links
  | "featured-grid" // Featured item (left) + grid of items (right)
  | "two-column-cta" // Two-column grid + featured CTA card
  | "list-showcase" // Vertical list + showcase/highlight cards
  | "multi-section"; // Multi-section layout with different groupings

/**
 * Menu link configuration with layout-based dropdown options
 */
export interface IMenuLink {
  label: React.ReactNode;
  href?: string;
  layout?: DropdownLayout;
  // Unified links array - used by all layouts
  links?: ILinkItem[];
  // Optional grouped links for more complex layouts
  dropdownGroups?: IMenuLinkGroup[];
}

/**
 * Props for the NavbarPlatformResources component
 */
export interface NavbarPlatformResourcesProps {
  /**
   * Logo configuration
   */
  logo?: LogoConfig;
  /**
   * Navigation menu links with optional dropdown groups
   */
  menuLinks?: IMenuLink[];
  /**
   * Actions rendered on the right side (desktop) and bottom (mobile)
   */
  actions?: ActionConfig[];
}

export interface NavbarPlatformResourcesRuntimeProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the navigation menu
   */
  navigationMenuClassName?: string;
  /**
   * Additional CSS classes for the navigation menu list
   */
  navigationMenuListClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the logo
   */
  logoClassName?: string;
  /**
   * Additional CSS classes for the mobile menu
   */
  mobileMenuClassName?: string;
  /**
   * Logo configuration
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo object)
   */
  logoSlot?: React.ReactNode;
  /**
   * Navigation menu links with optional dropdown groups
   */
  menuLinks?: IMenuLink[];
  /**
   * Actions rendered on the right side (desktop) and bottom (mobile)
   */
  actions?: ActionConfig[];
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Layout variant for the navbar
   */
  layoutVariant?: NavbarLayoutVariant;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * NavbarPlatformResources - A navigation bar with flexible dropdown menus and action buttons.
 *
 * Supports grouped dropdowns or simple links via menuLinks, with dropdown items that can
 * display icons or images. Mobile view uses a full-screen overlay with accordion navigation.
 * Ideal for platforms that need configurable navigation and supporting resources.
 */
export const NavbarPlatformResources = ({
  sectionId = "navbar-platform-resources",
  className,
  containerClassName,
  navigationMenuClassName,
  navigationMenuListClassName,
  actionsClassName,
  logoClassName,
  mobileMenuClassName,
  logo,
  logoSlot,
  menuLinks,
  actions,
  layoutVariant = "fullScreenContainerizedLinks",
  background = "white",
  spacing = "none",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarPlatformResourcesRuntimeProps) => {
  const [open, setOpen] = useState(false);

  const hasDropdownItems = (link: IMenuLink) =>
    Boolean(link.links?.length || link.dropdownGroups?.length);

  const renderDropdownContent = (link: IMenuLink) => {
    const layout = link.layout || "simple-list";

    // Multi-column boxed icon links layout
    if (layout === "list-with-icons") {
      return (
        <NavigationMenuContent className="md:left-1/2 md:-translate-x-1/2 !w-[900px] max-w-[calc(100vw-2rem)] overflow-y-auto p-4 md:!w-[900px]">
          <div className="grid w-full grid-cols-3 gap-4">
            {link.links?.map((item, itemIndex) => (
              <NavigationMenuLink
                key={`${typeof item.label === "string" ? item.label : "item"}-${itemIndex}`}
                href={getLinkUrl(item)}
                className="!flex h-full min-h-20 !w-full min-w-0 flex-row items-center gap-4 rounded-lg border border-input bg-background p-4 hover:bg-accent hover:text-accent-foreground"
              >
                {item.image && (
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border">
                    <Img
                      src={item.image}
                      alt={
                        typeof item.label === "string"
                          ? item.label
                          : "Menu item"
                      }
                      className="h-full w-full object-cover object-center"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                )}
                {!item.image && (item.icon || item.iconName) && (
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
                    <DynamicIcon
                      name={item.icon || item.iconName}
                      size={18}
                      className="shrink-0"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1 overflow-hidden">
                  <div className="text-sm font-medium truncate">
                    {item.label}
                  </div>
                  {item.description && (
                    <div className="truncate text-sm font-normal text-muted-foreground">
                      {item.description}
                    </div>
                  )}
                </div>
              </NavigationMenuLink>
            ))}
          </div>
        </NavigationMenuContent>
      );
    }

    // Simple list layout (default)
    if (layout === "simple-list") {
      return (
        <NavigationMenuContent className="md:left-1/2 md:-translate-x-1/2 !w-[400px] max-w-[calc(100vw-2rem)] p-3 md:!w-[400px]">
          <ul className="w-full space-y-1">
            {link.links?.map((item, itemIndex) => (
              <li
                className="w-full"
                key={`${typeof item.label === "string" ? item.label : "item"}-${itemIndex}`}
              >
                <NavigationMenuLink
                  href={getLinkUrl(item)}
                  className="group/link !flex !w-full min-w-0 flex-row items-center gap-2 rounded-md px-3 py-2 transition-colors duration-200"
                >
                  <div className="flex size-8 shrink-0 rounded-lg border duration-400 fade-in group-hover/link:bg-background">
                    <DynamicIcon
                      name={item.icon || item.iconName}
                      size={16}
                      className="m-auto group-hover/link:stroke-black"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="text-sm font-medium truncate">
                      {item.label}
                    </div>
                    {item.description && (
                      <div className="truncate text-xs text-muted-foreground group-hover/link:text-foreground">
                        {item.description}
                      </div>
                    )}
                  </div>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      );
    }

    // Featured item + grid layout
    if (layout === "featured-grid" && link.links && link.links.length > 0) {
      const featuredItem = link.links[0];
      const gridItems = link.links.slice(1);

      return (
        <NavigationMenuContent className="md:left-1/2 md:-translate-x-1/2 !w-[900px] max-w-[calc(100vw-2rem)] p-6 md:!w-[900px]">
          <div className="grid grid-cols-[minmax(260px,0.8fr)_minmax(0,1.2fr)] gap-8">
            <NavigationMenuLink
              href={getLinkUrl(featuredItem)}
              className="group block h-full min-w-0 p-0 hover:bg-transparent"
            >
              <div className="overflow-clip rounded-lg border border-input bg-background">
                <div>
                  <Img
                    src={featuredItem.image || ""}
                    alt={
                      typeof featuredItem.label === "string"
                        ? featuredItem.label
                        : "Featured item"
                    }
                    className="aspect-[4/3] object-cover object-center"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                <div className="p-5 xl:p-8">
                  <div className="mb-2 text-base truncate">
                    {featuredItem.label}
                  </div>
                  {featuredItem.description && (
                    <div className="truncate text-sm font-normal text-muted-foreground">
                      {featuredItem.description}
                    </div>
                  )}
                </div>
              </div>
            </NavigationMenuLink>
            <div className="min-w-0">
              {link.dropdownGroups && link.dropdownGroups[0] && (
                <div className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
                  {link.dropdownGroups[0].label}
                </div>
              )}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                {gridItems.map((item, itemIndex) => (
                  <NavigationMenuLink
                    key={`${typeof item.label === "string" ? item.label : "item"}-${itemIndex}`}
                    href={getLinkUrl(item)}
                    className="group block h-full w-full min-w-0 rounded-md p-4"
                  >
                    {(item.icon || item.iconName) && (
                      <div className="mb-5 group-hover:opacity-60">
                        <DynamicIcon
                          name={item.icon || item.iconName}
                          size={20}
                        />
                      </div>
                    )}
                    <div className="mb-1 truncate text-base">{item.label}</div>
                    {item.description && (
                      <div className="truncate text-sm font-normal text-muted-foreground">
                        {item.description}
                      </div>
                    )}
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          </div>
        </NavigationMenuContent>
      );
    }

    // Two-column grid + CTA card layout
    if (
      layout === "two-column-cta" &&
      link.dropdownGroups &&
      link.dropdownGroups.length > 0
    ) {
      const ctaItem =
        link.links && link.links.length > 0
          ? link.links[link.links.length - 1]
          : null;

      return (
        <NavigationMenuContent className="md:left-1/2 md:-translate-x-1/2 !w-[900px] max-w-[calc(100vw-2rem)] p-6 md:!w-[900px]">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4">
            <div className="min-w-0">
              {link.dropdownGroups[0] && (
                <>
                  <div className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
                    {link.dropdownGroups[0].label}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {link.dropdownGroups[0].links.map((item, itemIndex) => (
                      <NavigationMenuLink
                        key={`${typeof item.label === "string" ? item.label : "item"}-${itemIndex}`}
                        href={getLinkUrl(item)}
                        className="group !flex !w-full min-w-0 flex-row items-center gap-5 rounded-md p-2"
                      >
                        {(item.icon || item.iconName) && (
                          <div className="group-hover:opacity-60">
                            <DynamicIcon
                              name={item.icon || item.iconName}
                              size={16}
                            />
                          </div>
                        )}
                        <div className="min-w-0 truncate text-base">
                          {item.label}
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </>
              )}
            </div>
            {ctaItem && (
              <NavigationMenuLink
                href={getLinkUrl(ctaItem)}
                className="group min-w-0 p-0 hover:bg-transparent"
              >
                <div className="flex h-full rounded-lg border border-input bg-background p-0 hover:bg-transparent">
                  {ctaItem.image && (
                    <div className="w-2/5 max-w-[310px] shrink-0 overflow-clip rounded-tl-lg rounded-bl-lg">
                      <Img
                        src={ctaItem.image}
                        alt={
                          typeof ctaItem.label === "string"
                            ? ctaItem.label
                            : "CTA item"
                        }
                        className="h-full w-full object-cover object-center"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                  )}
                  <div className="flex min-w-0 flex-col p-5 xl:p-8">
                    {ctaItem.background && (
                      <div className="mb-8 text-xs tracking-widest text-muted-foreground uppercase">
                        {ctaItem.background}
                      </div>
                    )}
                    <div className="mt-auto">
                      <div className="mb-4 truncate text-xl">
                        {ctaItem.label}
                      </div>
                      {ctaItem.description && (
                        <div className="truncate text-sm font-normal text-muted-foreground">
                          {ctaItem.description}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </NavigationMenuLink>
            )}
          </div>
        </NavigationMenuContent>
      );
    }

    // List + showcase cards layout
    if (
      layout === "list-showcase" &&
      link.dropdownGroups &&
      link.dropdownGroups.length > 0
    ) {
      const listItems = link.dropdownGroups[0].links;
      const showcaseItems = link.links || [];

      return (
        <NavigationMenuContent className="md:left-1/2 md:-translate-x-1/2 !w-[900px] max-w-[calc(100vw-2rem)] p-6 md:!w-[900px]">
          <div className="grid grid-cols-[minmax(260px,0.7fr)_minmax(0,1.3fr)] gap-8">
            <div className="min-w-0">
              <>
                <div className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">
                  {link.dropdownGroups[0].label}
                </div>
                {link.dropdownGroups[0].description && (
                  <div className="mb-6 text-sm font-normal text-muted-foreground">
                    {link.dropdownGroups[0].description}
                  </div>
                )}
                <div className="-ml-2.5 space-y-2.5">
                  {listItems.map((item, itemIndex) => (
                    <NavigationMenuLink
                      key={`${typeof item.label === "string" ? item.label : "item"}-${itemIndex}`}
                      href={getLinkUrl(item)}
                      className="group !flex !w-full min-w-0 flex-row items-center gap-2.5 rounded-md p-2.5 focus:text-accent-foreground"
                    >
                      {(item.icon || item.iconName) && (
                        <DynamicIcon
                          name={item.icon || item.iconName}
                          size={16}
                        />
                      )}
                      <div className="min-w-0 truncate text-base">
                        {item.label}
                      </div>
                    </NavigationMenuLink>
                  ))}
                </div>
              </>
            </div>
            <div className="min-w-0 space-y-6">
              {showcaseItems.map((showcase, showcaseIndex) => (
                <NavigationMenuLink
                  key={`showcase-${showcaseIndex}`}
                  href={getLinkUrl(showcase)}
                  className="!flex !w-full min-w-0 flex-row items-center overflow-clip rounded-lg border border-input bg-background p-0 hover:bg-transparent"
                >
                  <div className="min-w-0 flex-1 p-5 xl:p-8">
                    <div className="mb-2 truncate text-base">
                      {showcase.label}
                    </div>
                    {showcase.description && (
                      <div className="truncate text-sm font-normal text-muted-foreground">
                        {showcase.description}
                      </div>
                    )}
                  </div>
                  <div className="h-[154px] max-w-[264px] shrink-0">
                    <Img
                      src={showcase.image || ""}
                      alt={
                        typeof showcase.label === "string"
                          ? showcase.label
                          : "Showcase item"
                      }
                      className="h-full w-full object-cover object-center"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                </NavigationMenuLink>
              ))}
            </div>
          </div>
        </NavigationMenuContent>
      );
    }

    // Multi-section layout
    if (layout === "multi-section" && link.dropdownGroups) {
      const ctaItem =
        link.links && link.links.length > 0
          ? link.links[link.links.length - 1]
          : null;

      return (
        <NavigationMenuContent className="md:left-1/2 md:-translate-x-1/2 !w-[900px] max-w-[calc(100vw-2rem)] p-8 md:!w-[900px]">
          <div className="grid grid-cols-2 gap-8">
            {link.dropdownGroups.map((group, groupIndex) => (
              <div
                key={`section-${groupIndex}`}
                className="flex flex-1 flex-col"
              >
                <div className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
                  {group.label}
                </div>
                <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
                  {group.links.map((item, itemIndex) => (
                    <NavigationMenuLink
                      key={`${typeof item.label === "string" ? item.label : "item"}-${itemIndex}`}
                      href={getLinkUrl(item)}
                      className="!flex h-full w-full min-w-0 flex-col overflow-clip rounded-lg border border-input bg-background p-5 hover:bg-accent hover:text-accent-foreground xl:p-8"
                    >
                      <div className="mt-auto">
                        <div className="mb-2 truncate text-base">
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="truncate text-sm font-normal text-muted-foreground">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
            ))}
            {ctaItem && (
              <div className="col-span-1">
                <NavigationMenuLink
                  href={getLinkUrl(ctaItem)}
                  className="mb-6 !flex !w-full min-w-0 flex-row overflow-clip rounded-lg border border-input bg-background p-0 hover:bg-transparent"
                >
                  <div className="min-w-0 flex-1 p-5 xl:p-8">
                    <div className="mb-2 truncate text-base">
                      {ctaItem.label}
                    </div>
                    {ctaItem.description && (
                      <div className="truncate text-sm font-normal text-muted-foreground">
                        {ctaItem.description}
                      </div>
                    )}
                  </div>
                  {ctaItem.image && (
                    <div className="w-1/3 max-w-[130px] shrink-0">
                      <Img
                        src={ctaItem.image}
                        alt={
                          typeof ctaItem.label === "string"
                            ? ctaItem.label
                            : "CTA item"
                        }
                        className="h-full w-full object-cover object-center"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                  )}
                </NavigationMenuLink>
                {ctaItem.background && (
                  <div className="flex flex-row items-center gap-3 rounded-lg bg-secondary/30 p-3 hover:bg-secondary/80 focus:bg-secondary/80">
                    <span className="rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
                      {ctaItem.background}
                    </span>
                    {ctaItem.description && (
                      <span className="truncate text-sm text-secondary-foreground">
                        {ctaItem.description}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </NavigationMenuContent>
      );
    }

    // Fallback to simple list
    return (
      <NavigationMenuContent className="md:left-1/2 md:-translate-x-1/2 !w-[900px] max-w-[calc(100vw-2rem)] p-4 md:!w-[900px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {link.links?.map((item, itemIndex) => (
            <NavigationMenuLink
              key={`${typeof item.label === "string" ? item.label : "item"}-${itemIndex}`}
              href={getLinkUrl(item)}
              className="!flex !w-full min-w-0 flex-row items-center gap-4 rounded-lg border border-input bg-background p-4 hover:bg-accent hover:text-accent-foreground"
            >
              {item.image && (
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border">
                  <Img
                    src={item.image}
                    alt={
                      typeof item.label === "string" ? item.label : "Menu item"
                    }
                    className="h-full w-full object-cover object-center"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              )}
              {!item.image && (item.icon || item.iconName) && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
                  <DynamicIcon name={item.icon || item.iconName} size={18} />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-foreground">
                  {item.label}
                </div>
                {item.description && (
                  <div className="truncate text-sm font-normal text-muted-foreground">
                    {item.description}
                  </div>
                )}
              </div>
            </NavigationMenuLink>
          ))}
        </div>
      </NavigationMenuContent>
    );
  };

  const renderActions = useMemo(() => {
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const {
        label,
        icon,
        iconAfter,
        children,
        className: actionClassName,
        ...pressableProps
      } = action;
      return (
        <Pressable key={index} className={actionClassName} {...pressableProps}>
          {children ?? (
            <>
              <DynamicIcon name={icon} size={16} className="shrink-0" />
              {label}
              <DynamicIcon name={iconAfter} size={16} className="shrink-0" />
            </>
          )}
        </Pressable>
      );
    });
  }, [actions]);

  // Get layout classes based on variant
  const {
    sectionClasses,
    containerWrapperClasses,
    innerContainerClasses,
    navWrapperClasses,
    sectionContainerClassName,
    sectionContainerMaxWidth,
    spacingOverride,
  } = getNavbarLayoutClasses(layoutVariant, { className, containerClassName });

  // --- Top-bar overflow guard -----------------------------------------------
  //
  // What matters here is the CONTAINER width, not the viewport width. This block
  // renders inside `container px-4 sm:px-6 lg:px-8`, and Tailwind's `container`
  // pins its max-width at 80rem from the `xl` breakpoint all the way to 1535px —
  // so a 1280px viewport and a 1440px viewport both give the row the *same*
  // ~1216px of content box. The next step up is `2xl` (96rem, ~1472px usable).
  //
  // A measured 7-item payload needs logo 198.1px + actions ~121px + list
  // min-content ~910px + the row gaps ≈ 1325px. That does NOT fit the 80rem pin,
  // so at both 1280 and 1440 the list wrapped to a second line and pushed the
  // row to ~124px, escaping the fixed `h-16` bar by ~30px onto page content.
  // Only 2xl fits. Past 5 items we therefore hold the mobile menu until 2xl.
  //
  // The `min-w-0` wrapper and the list's `flex-wrap` below stay as inert
  // residual safety — with the breakpoint correct they never engage.
  //
  // Both branches are complete literal class strings so the Tailwind JIT scanner
  // sees every utility.
  const isHighItemCount = (menuLinks?.length ?? 0) > 5;
  const desktopListVisibility = isHighItemCount
    ? "hidden 2xl:flex"
    : "hidden lg:flex";
  const desktopActionsVisibility = isHighItemCount
    ? "hidden items-center gap-4 2xl:flex"
    : "hidden items-center gap-4 lg:flex";
  const mobileClusterVisibility = isHighItemCount
    ? "flex items-center gap-4 2xl:hidden"
    : "flex items-center gap-4 lg:hidden";

  return (
    <Section
      id="navbar-platform-resources"
      background={background}
      spacing={spacingOverride ?? spacing}
      className={sectionClasses}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={sectionContainerClassName}
      containerMaxWidth={sectionContainerMaxWidth}
    >
      <div className={containerWrapperClasses}>
        <div className={navWrapperClasses}>
          <div className={innerContainerClasses}>
            <NavigationMenu
              viewport={false}
              className={cn(
                // `max-w-full` merges away the shared primitive's `max-w-max`,
                // which otherwise lets this row grow past the viewport. Scoped
                // here — navigation-menu.tsx is shared by 19 other navbars.
                "min-w-full max-w-full",
                navigationMenuClassName,
              )}
            >
              <div className="flex w-full min-w-0 items-center justify-between gap-6 py-4 2xl:gap-12">
                <NavbarLogo
                  logo={logo}
                  logoSlot={logoSlot}
                  logoClassName={cn("shrink-0", logoClassName)}
                  optixFlowConfig={optixFlowConfig}
                />
                {/*
                  Containment point for the desktop menu region.

                  Radix's `NavigationMenu.List` puts the caller's className on
                  the inner `<ul>` and wraps that ul in an UNCLASSED
                  indicator-track `<div>` (a `Primitive.div` carrying only
                  `style={{ position: "relative" }}` — see `NavigationMenuList`
                  in @radix-ui/react-navigation-menu). That track div, not the
                  ul, is the flex child of the `justify-between` row above, so a
                  `min-w-0` handed to `NavigationMenuList` lands one level too
                  deep and can never bind. This component-owned wrapper becomes
                  the flex child instead and carries both the responsive
                  visibility and the width guard.

                  `flex-wrap` on the ul is what lets the guard resolve without
                  clipping: it drops the list's min-content from "sum of every
                  w-max item" to "widest single item", so a squeezed region
                  reflows onto a second line instead of shoving the CTA past the
                  container edge. With the breakpoint ladder above corrected this
                  is residual safety only — both utilities are inert while the
                  items fit on one line, so a fitting bar is pixel-identical.

                  Deliberately NOT `overflow-hidden`/`overflow-x-clip`: this
                  block renders with `viewport={false}`, so every dropdown panel
                  is an in-place absolutely positioned sibling of its trigger
                  INSIDE this ul, and any overflow clamp at or above the ul
                  would clip the panels.
                */}
                <div className={cn(desktopListVisibility, "min-w-0")}>
                  <NavigationMenuList
                    className={cn("flex-wrap", navigationMenuListClassName)}
                  >
                    {menuLinks?.map((link, index) => {
                      if (hasDropdownItems(link)) {
                        return (
                          <NavigationMenuItem
                            key={`${typeof link.label === "string" ? link.label : "menu"}-${index}`}
                          >
                            <NavigationMenuTrigger className="h-auto bg-transparent px-4 py-2 font-normal hover:bg-muted focus:bg-transparent data-[state=open]:bg-transparent">
                              {link.label}
                            </NavigationMenuTrigger>
                            {renderDropdownContent(link)}
                          </NavigationMenuItem>
                        );
                      }

                      if (!link.href) {
                        return null;
                      }

                      return (
                        <NavigationMenuItem
                          key={`${typeof link.label === "string" ? link.label : "menu"}-${index}`}
                        >
                          <NavigationMenuLink
                            href={link.href}
                            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                          >
                            {link.label}
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      );
                    })}
                  </NavigationMenuList>
                </div>
                <div
                  className={cn(
                    desktopActionsVisibility,
                    "shrink-0",
                    actionsClassName,
                  )}
                >
                  {renderActions}
                </div>
                <div className={cn(mobileClusterVisibility, "shrink-0")}>
                  <Pressable
                    variant="outline"
                    size="icon"
                    asButton
                    aria-label="Main Menu"
                    onClick={() => setOpen(!open)}
                  >
                    {!open && <DynamicIcon name="lucide/menu" size={16} />}
                    {open && <DynamicIcon name="lucide/x" size={16} />}
                  </Pressable>
                </div>
              </div>

              <NavbarMobileMenu
                open={open}
                onClose={() => setOpen(false)}
                title="Mobile Navigation"
              >
                <div className="max-w-screen-sm mx-auto">
                  <Accordion type="multiple" className="w-full">
                    {menuLinks?.map((link, index) => {
                      if (hasDropdownItems(link)) {
                        return (
                          <AccordionItem
                            key={`${typeof link.label === "string" ? link.label : "menu"}-${index}`}
                            value={`menu-${index}`}
                            className="border-b-0"
                          >
                            <AccordionTrigger className="h-15 items-center text-base font-normal text-foreground hover:no-underline">
                              {link.label}
                            </AccordionTrigger>
                            <AccordionContent className="overflow-x-none space-y-4">
                              {link.links?.map((item, itemIndex) => (
                                <Pressable
                                  key={`${typeof item.label === "string" ? item.label : "item"}-${itemIndex}`}
                                  href={getLinkUrl(item)}
                                  className="flex items-center gap-2 pl-4 text-sm text-muted-foreground hover:text-foreground"
                                >
                                  {(item.icon || item.iconName) && (
                                    <DynamicIcon
                                      name={item.icon || item.iconName}
                                      size={14}
                                    />
                                  )}
                                  {item.label}
                                </Pressable>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        );
                      }

                      if (!link.href) {
                        return null;
                      }

                      return (
                        <Pressable
                          key={`${typeof link.label === "string" ? link.label : "menu"}-${index}`}
                          href={link.href}
                          className="flex h-15 items-center text-base font-normal text-foreground"
                        >
                          {link.label}
                        </Pressable>
                      );
                    })}
                  </Accordion>

                  <div
                    className={cn("mt-6 flex flex-col gap-4", actionsClassName)}
                  >
                    {renderActions}
                  </div>
                </div>
              </NavbarMobileMenu>
            </NavigationMenu>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NavbarPlatformResources;
