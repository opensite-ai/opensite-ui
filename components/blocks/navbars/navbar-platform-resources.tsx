"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
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
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Base dropdown item interface
 */
export interface IDropdownItem {
  title: string;
  description?: string;
  href: string;
  icon?: string;
  imgUrl?: string;
}

/**
 * Featured item with image (used in featured layouts)
 */
export interface IFeaturedItem {
  title: string;
  description?: string;
  href: string;
  imgUrl: string;
  label?: string;
}

/**
 * Showcase card item (horizontal card with image)
 */
export interface IShowcaseItem {
  title: string;
  description?: string;
  href: string;
  imgUrl: string;
}

/**
 * CTA card item (call-to-action card with optional image)
 */
export interface ICtaCard {
  title: string;
  description?: string;
  href: string;
  label?: string;
  imgUrl?: string;
  badge?: string;
}

/**
 * Grouped section of dropdown items
 */
export interface IDropdownSection {
  label: string;
  items: IDropdownItem[];
}

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
  | "featured-grid" // Featured item (left) + grid of items (right)
  | "two-column-cta" // Two-column grid + featured CTA card
  | "list-showcase" // Vertical list + showcase/highlight cards
  | "multi-section"; // Multi-section layout with different groupings

/**
 * Menu link with flexible dropdown configuration
 */
export interface IMenuLink {
  title: string;
  href?: string;
  dropdownItems?: IDropdownItem[];
  layout?: DropdownLayout;
  featuredItem?: IFeaturedItem;
  showcaseItems?: IShowcaseItem[];
  ctaCard?: ICtaCard;
  sections?: IDropdownSection[];
}

/**
 * Logo configuration interface
 */
export interface LogoConfig {
  url?: string;
  src?: string;
  alt?: string;
  title?: React.ReactNode;
  className?: string;
}

/**
 * Props for the NavbarPlatformResources component
 */
export interface NavbarPlatformResourcesProps {
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * NavbarPlatformResources - A navigation bar with flexible dropdown menus and action buttons.
 *
 * Supports grouped dropdowns or simple links via menuLinks, with dropdown items that can
 * display icons or images. Mobile view uses a full-screen overlay with accordion navigation.
 * Ideal for platforms that need configurable navigation and supporting resources.
 */
export const NavbarPlatformResources = ({
  className,
  containerClassName,
  navigationMenuClassName,
  navigationMenuListClassName,
  actionsClassName,
  logoClassName,
  mobileMenuClassName,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
  },
  logoSlot,
  menuLinks,
  actions,
  background = "white",
  spacing = "none",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarPlatformResourcesProps) => {
  const [open, setOpen] = useState(false);

  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    return (
      <Pressable
        href={logo.url || "/"}
        className={cn("flex items-center gap-2", logoClassName)}
      >
        {logo.src && (
          <Img
            src={logo.src}
            className={cn("max-h-8", logo.className)}
            alt={logo.alt || "Logo"}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        {logo.title &&
          (typeof logo.title === "string" ? (
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          ) : (
            logo.title
          ))}
      </Pressable>
    );
  };

  const hasDropdownItems = (link: IMenuLink) =>
    Boolean(
      link.dropdownItems?.length ||
        link.featuredItem ||
        link.showcaseItems?.length ||
        link.ctaCard ||
        link.sections?.length,
    );

  const renderDropdownContent = (link: IMenuLink) => {
    const layout = link.layout || "simple-list";

    // Simple list layout (default)
    if (layout === "simple-list") {
      return (
        <NavigationMenuContent className="min-w-[640px] p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {link.dropdownItems?.map((item, itemIndex) => (
              <NavigationMenuLink
                key={`${item.title}-${itemIndex}`}
                href={item.href}
                className="flex flex-row items-start gap-4 rounded-lg border border-input bg-background p-4 hover:bg-accent hover:text-accent-foreground"
              >
                {item.imgUrl && (
                  <div className="h-12 w-12 overflow-hidden rounded-md border border-border">
                    <Img
                      src={item.imgUrl}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                )}
                {!item.imgUrl && item.icon && (
                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
                    <DynamicIcon name={item.icon} size={18} />
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {item.title}
                  </div>
                  {item.description && (
                    <div className="text-sm font-normal text-muted-foreground">
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

    // Featured item + grid layout
    if (layout === "featured-grid" && link.featuredItem) {
      return (
        <NavigationMenuContent className="min-w-[900px] p-6">
          <div className="flex justify-between gap-8">
            <NavigationMenuLink
              href={link.featuredItem.href}
              className="group w-1/3 p-0 hover:bg-transparent"
            >
              <div className="overflow-clip rounded-lg border border-input bg-background">
                <div>
                  <Img
                    src={link.featuredItem.imgUrl}
                    alt={link.featuredItem.title}
                    className="aspect-[4/3] object-cover object-center"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                <div className="p-5 xl:p-8">
                  <div className="mb-2 text-base">{link.featuredItem.title}</div>
                  {link.featuredItem.description && (
                    <div className="text-sm font-normal text-muted-foreground">
                      {link.featuredItem.description}
                    </div>
                  )}
                </div>
              </div>
            </NavigationMenuLink>
            <div className="max-w-[760px] flex-1">
              {link.featuredItem.label && (
                <div className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
                  {link.featuredItem.label}
                </div>
              )}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                {link.dropdownItems?.map((item, itemIndex) => (
                  <NavigationMenuLink
                    key={`${item.title}-${itemIndex}`}
                    href={item.href}
                    className="group block p-4"
                  >
                    {item.icon && (
                      <div className="mb-5 group-hover:opacity-60">
                        <DynamicIcon name={item.icon} size={20} />
                      </div>
                    )}
                    <div className="mb-1 text-base">{item.title}</div>
                    {item.description && (
                      <div className="text-sm font-normal text-muted-foreground">
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
    if (layout === "two-column-cta" && link.ctaCard) {
      return (
        <NavigationMenuContent className="min-w-[900px] p-6">
          <div className="flex justify-between gap-4">
            <div className="w-1/2 max-w-[510px]">
              {link.sections && link.sections[0] && (
                <>
                  <div className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
                    {link.sections[0].label}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {link.sections[0].items.map((item, itemIndex) => (
                      <NavigationMenuLink
                        key={`${item.title}-${itemIndex}`}
                        href={item.href}
                        className="group flex flex-row items-center gap-5"
                      >
                        {item.icon && (
                          <div className="group-hover:opacity-60">
                            <DynamicIcon name={item.icon} size={16} />
                          </div>
                        )}
                        <div className="text-base">{item.title}</div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </>
              )}
            </div>
            <NavigationMenuLink
              href={link.ctaCard.href}
              className="group flex-1 p-0 hover:bg-transparent"
            >
              <div className="flex h-full rounded-lg border border-input bg-background p-0 hover:bg-transparent">
                {link.ctaCard.imgUrl && (
                  <div className="w-2/5 max-w-[310px] shrink-0 overflow-clip rounded-tl-lg rounded-bl-lg">
                    <Img
                      src={link.ctaCard.imgUrl}
                      alt={link.ctaCard.title}
                      className="h-full w-full object-cover object-center"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                )}
                <div className="flex flex-col p-5 xl:p-8">
                  {link.ctaCard.label && (
                    <div className="mb-8 text-xs tracking-widest text-muted-foreground uppercase">
                      {link.ctaCard.label}
                    </div>
                  )}
                  <div className="mt-auto">
                    <div className="mb-4 text-xl">{link.ctaCard.title}</div>
                    {link.ctaCard.description && (
                      <div className="text-sm font-normal text-muted-foreground">
                        {link.ctaCard.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </NavigationMenuLink>
          </div>
        </NavigationMenuContent>
      );
    }

    // List + showcase cards layout
    if (layout === "list-showcase" && link.showcaseItems) {
      return (
        <NavigationMenuContent className="min-w-[900px] p-6">
          <div className="flex justify-between gap-8">
            <div className="w-1/3 max-w-[404px]">
              {link.sections && link.sections[0] && (
                <>
                  <div className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">
                    {link.sections[0].label}
                  </div>
                  {link.sections[0].items[0]?.description && (
                    <div className="mb-6 text-sm font-normal text-muted-foreground">
                      {link.sections[0].items[0].description}
                    </div>
                  )}
                  <div className="-ml-2.5 space-y-2.5">
                    {link.dropdownItems?.map((item, itemIndex) => (
                      <NavigationMenuLink
                        key={`${item.title}-${itemIndex}`}
                        href={item.href}
                        className="group flex flex-row items-center gap-2.5 rounded-md p-2.5 focus:text-accent-foreground"
                      >
                        {item.icon && <DynamicIcon name={item.icon} size={16} />}
                        <div className="text-base">{item.title}</div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="max-w-[716px] flex-1 space-y-6">
              {link.showcaseItems.map((showcase, showcaseIndex) => (
                <NavigationMenuLink
                  key={`showcase-${showcaseIndex}`}
                  href={showcase.href}
                  className="flex flex-row items-center overflow-clip rounded-lg border border-input bg-background p-0 hover:bg-transparent"
                >
                  <div className="flex-1 p-5 xl:p-8">
                    <div className="mb-2 text-base">{showcase.title}</div>
                    {showcase.description && (
                      <div className="text-sm font-normal text-muted-foreground">
                        {showcase.description}
                      </div>
                    )}
                  </div>
                  <div className="h-[154px] max-w-[264px] shrink-0">
                    <Img
                      src={showcase.imgUrl}
                      alt={showcase.title}
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
    if (layout === "multi-section" && link.sections) {
      return (
        <NavigationMenuContent className="min-w-[900px] p-8">
          <div className="grid grid-cols-2 gap-8">
            {link.sections.map((section, sectionIndex) => (
              <div key={`section-${sectionIndex}`} className="flex flex-1 flex-col">
                <div className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
                  {section.label}
                </div>
                <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
                  {section.items.map((item, itemIndex) => (
                    <NavigationMenuLink
                      key={`${item.title}-${itemIndex}`}
                      href={item.href}
                      className="flex h-full flex-col overflow-clip rounded-lg border border-input bg-background p-5 hover:bg-accent hover:text-accent-foreground xl:p-8"
                    >
                      <div className="mt-auto">
                        <div className="mb-2 text-base">{item.title}</div>
                        {item.description && (
                          <div className="text-sm font-normal text-muted-foreground">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
            ))}
            {link.ctaCard && (
              <div className="col-span-1">
                <NavigationMenuLink
                  href={link.ctaCard.href}
                  className="mb-6 flex flex-row overflow-clip rounded-lg border border-input bg-background p-0 hover:bg-transparent"
                >
                  <div className="flex-1 p-5 xl:p-8">
                    <div className="mb-2 text-base">{link.ctaCard.title}</div>
                    {link.ctaCard.description && (
                      <div className="text-sm font-normal text-muted-foreground">
                        {link.ctaCard.description}
                      </div>
                    )}
                  </div>
                  {link.ctaCard.imgUrl && (
                    <div className="w-1/3 max-w-[130px] shrink-0">
                      <Img
                        src={link.ctaCard.imgUrl}
                        alt={link.ctaCard.title}
                        className="h-full w-full object-cover object-center"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                  )}
                </NavigationMenuLink>
                {link.ctaCard.badge && (
                  <div className="flex flex-row items-center gap-3 rounded-lg bg-secondary/30 p-3 hover:bg-secondary/80 focus:bg-secondary/80">
                    <span className="rounded-md bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground">
                      {link.ctaCard.badge}
                    </span>
                    {link.ctaCard.description && (
                      <span className="text-sm text-ellipsis text-secondary-foreground">
                        {link.ctaCard.description}
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
      <NavigationMenuContent className="min-w-[640px] p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {link.dropdownItems?.map((item, itemIndex) => (
            <NavigationMenuLink
              key={`${item.title}-${itemIndex}`}
              href={item.href}
              className="flex flex-row items-start gap-4 rounded-lg border border-input bg-background p-4 hover:bg-accent hover:text-accent-foreground"
            >
              {item.imgUrl && (
                <div className="h-12 w-12 overflow-hidden rounded-md border border-border">
                  <Img
                    src={item.imgUrl}
                    alt={item.title}
                    className="h-full w-full object-cover object-center"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              )}
              {!item.imgUrl && item.icon && (
                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
                  <DynamicIcon name={item.icon} size={18} />
                </div>
              )}
              <div>
                <div className="text-sm font-medium text-foreground">
                  {item.title}
                </div>
                {item.description && (
                  <div className="text-sm font-normal text-muted-foreground">
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

  const renderActions = () => {
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
              {icon}
              {label}
              {iconAfter}
            </>
          )}
        </Pressable>
      );
    });
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn("inset-x-0 top-0 z-20", className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div
        className={cn(
          "container px-4 sm:px-6 md:px-8 lg:px-40 xl:px-52",
          containerClassName,
        )}
      >
        <NavigationMenu className={cn("min-w-full", navigationMenuClassName)}>
          <div className="flex w-full items-center justify-between gap-12 py-4">
            {renderLogo()}
            <NavigationMenuList
              className={cn("hidden lg:flex", navigationMenuListClassName)}
            >
              {menuLinks?.map((link, index) => {
                if (hasDropdownItems(link)) {
                  return (
                    <NavigationMenuItem key={`${link.title}-${index}`}>
                      <NavigationMenuTrigger className="bg-transparent px-0 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                        {link.title}
                      </NavigationMenuTrigger>
                      {renderDropdownContent(link)}
                    </NavigationMenuItem>
                  );
                }

                if (!link.href) {
                  return null;
                }

                return (
                  <NavigationMenuItem key={`${link.title}-${index}`}>
                    <NavigationMenuLink
                      href={link.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
            <div
              className={cn(
                "hidden items-center gap-4 lg:flex",
                actionsClassName,
              )}
            >
              {renderActions()}
            </div>
            <div className="flex items-center gap-4 lg:hidden">
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

          {/* Mobile Menu */}
          {open && (
            <div
              className={cn(
                "absolute inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden",
                mobileMenuClassName,
              )}
            >
              <Accordion type="single" collapsible className="w-full">
                {menuLinks?.map((link, index) => {
                  if (hasDropdownItems(link)) {
                    return (
                      <AccordionItem
                        key={`${link.title}-${index}`}
                        value={`menu-${index}`}
                        className="border-b-2 border-dashed"
                      >
                        <AccordionTrigger className="px-2 py-4 text-left hover:no-underline">
                          {link.title}
                        </AccordionTrigger>
                        <AccordionContent className="px-2 pb-4">
                          <div className="space-y-3">
                            {link.dropdownItems?.map((item, itemIndex) => (
                              <Pressable
                                key={`${item.title}-${itemIndex}`}
                                href={item.href}
                                className="group flex items-start gap-4 rounded-lg p-2 hover:bg-muted"
                              >
                                {item.imgUrl && (
                                  <div className="h-10 w-10 overflow-hidden rounded-md border border-border">
                                    <Img
                                      src={item.imgUrl}
                                      alt={item.title}
                                      className="h-full w-full object-cover object-center"
                                      optixFlowConfig={optixFlowConfig}
                                    />
                                  </div>
                                )}
                                {!item.imgUrl && item.icon && (
                                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
                                    <DynamicIcon name={item.icon} size={16} />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-foreground">
                                    {item.title}
                                  </div>
                                  {item.description && (
                                    <div className="text-xs text-muted-foreground">
                                      {item.description}
                                    </div>
                                  )}
                                </div>
                              </Pressable>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  }

                  if (!link.href) {
                    return null;
                  }

                  return (
                    <div
                      key={`${link.title}-${index}`}
                      className="border-b-2 border-dashed"
                    >
                      <Pressable
                        href={link.href}
                        className="flex w-full items-center px-2 py-4 text-left text-sm font-medium"
                      >
                        {link.title}
                      </Pressable>
                    </div>
                  );
                })}
              </Accordion>

              <div
                className={cn(
                  "mx-8 mt-auto flex flex-col gap-4 py-12",
                  actionsClassName,
                )}
              >
                {renderActions()}
              </div>
            </div>
          )}
        </NavigationMenu>
      </div>
    </Section>
  );
};

export default NavbarPlatformResources;
