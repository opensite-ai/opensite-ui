"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * SHARED TYPE INTERFACES FOR ALL NAVBAR COMPONENTS
 * These types provide a consistent interface across all navbar blocks
 */

/**
 * Base link item - used across all navbar components
 */
export interface ILinkItem {
  label: React.ReactNode;
  description?: React.ReactNode;
  url: string;
  icon?: React.ReactNode;
  iconName?: string;
  image?: string;
  background?: string;
}

/**
 * Group of links with optional metadata
 */
export interface IMenuLinkGroup {
  label: React.ReactNode;
  description?: string;
  image?: string;
  links: ILinkItem[];
}

/**
 * Layout types for mega menu dropdowns
 *
 * LAYOUT OPTIONS FOR AI PAGE BUILDER:
 *
 * 1. "animated-image-preview"
 *    - Visual: Grid layout with large image preview on left (360px wide), links list on right
 *    - Behavior: Image changes on hover based on which link is being hovered over
 *    - Best for: Product showcases, visual content navigation, feature highlights
 *    - Required data: links[] with label, description, url, image
 *    - Example use case: Product categories where each product has a hero image that displays on hover
 *
 * 2. "simple-grid"
 *    - Visual: 2-column responsive grid of cards with icons or images
 *    - Behavior: Static grid with hover effects on cards
 *    - Best for: Feature lists, service offerings, general navigation with icons
 *    - Required data: links[] with label, description, url, icon/iconName OR image
 *    - Example use case: Features menu showing analytics, reports, dashboards with icons
 *
 * 3. "list-with-icons"
 *    - Visual: Single column list of items with small icons on the left
 *    - Behavior: Compact list with hover effects
 *    - Best for: Simple navigation, documentation links, resource lists
 *    - Required data: links[] with label, description (optional), url, icon/iconName
 *    - Example use case: Resources menu with documentation, API reference, guides
 */
export type MegaMenuLayout =
  | "animated-image-preview"
  | "simple-grid"
  | "list-with-icons";

/**
 * Menu link configuration with layout-based dropdown options
 */
export interface IMenuLink {
  label: React.ReactNode;
  href?: string;
  layout?: MegaMenuLayout;
  // Unified links array - used by all layouts
  links?: ILinkItem[];
  // Optional grouped links for more complex layouts
  dropdownGroups?: IMenuLinkGroup[];
}

/**
 * Logo configuration interface
 */
export interface LogoConfig {
  url?: string;
  desktopSrc?: string;
  mobileSrc?: string;
  alt?: string;
  className?: string;
}

/**
 * Props for the NavbarMegaMenu component
 */
export interface NavbarMegaMenuProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the navigation
   */
  navClassName?: string;
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
}

/**
 * Desktop menu item component with layout-based rendering
 */
interface DesktopMenuItemProps {
  link: IMenuLink;
  index: number;
  optixFlowConfig?: OptixFlowConfig;
}

const DesktopMenuItem = ({
  link,
  index,
  optixFlowConfig,
}: DesktopMenuItemProps) => {
  const imagesRef = React.useRef<HTMLImageElement[]>([]);
  // Default to "simple-grid" if no layout specified
  const layout = link.layout || "simple-grid";

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    if (link.links && imagesRef.current[index]) {
      imagesRef.current.forEach((img, i) => {
        img.classList.toggle("opacity-100", i === index);
        img.classList.toggle("opacity-0", i !== index);
      });
    }
  };

  const handleMouseLeave = () => {
    imagesRef.current.forEach((img) => {
      img.classList.remove("opacity-100");
      img.classList.add("opacity-0");
    });
    if (imagesRef.current[0]) {
      imagesRef.current[0].classList.add("opacity-100");
    }
  };

  // Animated Image Preview Layout
  if (layout === "animated-image-preview" && link.links) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`}>
        <NavigationMenuTrigger className="h-auto bg-transparent px-3 py-2 font-normal text-foreground/80 hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground data-[state=open]:bg-muted/50 data-[state=open]:text-foreground">
          {link.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="!rounded-2xl !p-0">
          <div className="grid min-h-[18.75rem] w-[45.25rem] grid-cols-[22.5rem_1fr] gap-4 p-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl">
              {link.links.map((item, idx) => (
                <Img
                  key={idx}
                  ref={(el) => {
                    if (el) {
                      imagesRef.current[idx] =
                        el as unknown as HTMLImageElement;
                    }
                  }}
                  src={item.image || ""}
                  alt={
                    typeof item.label === "string" ? item.label : "Menu item"
                  }
                  className={cn(
                    "absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-300",
                    idx === 0 ? "opacity-100" : "opacity-0",
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
              ))}
            </div>
            <div>
              <div className="p-4 leading-normal font-bold">{link.label}</div>
              <ul>
                {link.links.map((item, idx) => (
                  <li key={`desktop-nav-sublink-${idx}`}>
                    <NavigationMenuLink
                      href={item.url}
                      className="flex items-center gap-4 rounded-lg px-4 py-3 hover:bg-muted"
                      data-index={idx}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div>
                        <h3 className="leading-normal font-medium">
                          {item.label}
                        </h3>
                        {item.description && (
                          <p className="leading-normal text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  // Simple Grid Layout
  if (layout === "simple-grid" && link.links) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`}>
        <NavigationMenuTrigger className="h-auto bg-transparent px-3 py-2 font-normal text-foreground/80 hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground data-[state=open]:bg-muted/50 data-[state=open]:text-foreground">
          {link.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="min-w-[520px] p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {link.links.map((item, itemIndex) => (
              <NavigationMenuLink
                key={`grid-item-${itemIndex}`}
                href={item.url}
                className="flex flex-row items-start gap-4 rounded-lg border border-input bg-background p-4 hover:bg-muted hover:text-foreground"
              >
                {item.image && (
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border">
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
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
                    {item.icon ? (
                      item.icon
                    ) : item.iconName ? (
                      <DynamicIcon name={item.iconName} size={20} />
                    ) : null}
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium">{item.label}</div>
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
      </NavigationMenuItem>
    );
  }

  // List with Icons Layout
  if (layout === "list-with-icons" && link.links) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`}>
        <NavigationMenuTrigger className="h-auto bg-transparent px-3 py-2 font-normal text-foreground/80 hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground data-[state=open]:bg-muted/50 data-[state=open]:text-foreground">
          {link.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="min-w-[400px] p-4">
          <ul className="flex flex-col gap-1">
            {link.links.map((item, itemIndex) => (
              <li key={`list-item-${itemIndex}`}>
                <NavigationMenuLink
                  href={item.url}
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-muted"
                >
                  {(item.icon || item.iconName) && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/40 text-muted-foreground">
                      {item.icon ? (
                        item.icon
                      ) : item.iconName ? (
                        <DynamicIcon name={item.iconName} size={16} />
                      ) : null}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium">{item.label}</div>
                    {item.description && (
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                    )}
                  </div>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  // Simple link without dropdown
  if (link.href) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`}>
        <NavigationMenuLink
          href={link.href}
          className="inline-flex h-auto items-center justify-center px-0 py-0 text-sm font-normal text-foreground/60 transition-colors hover:text-foreground focus:text-foreground"
        >
          {link.label}
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }

  return null;
};

/**
 * Mobile submenu component with layout-based rendering
 */
interface MobileSubmenuProps {
  submenu: IMenuLink;
  mobileMenuClassName?: string;
  optixFlowConfig?: OptixFlowConfig;
}

const MobileSubmenu = ({
  submenu,
  mobileMenuClassName,
  optixFlowConfig,
}: MobileSubmenuProps) => {
  // Use unified links array
  const items = submenu.links || [];

  return (
    <div
      className={cn(
        "fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden",
        mobileMenuClassName,
      )}
    >
      <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
        {submenu.label}
      </div>
      {items.map((item, index) => {
        return (
          <Pressable
            key={`mobile-item-${index}`}
            href={item.url}
            className="flex items-start gap-4 border-b border-border px-8 py-5"
          >
            {item.image && (
              <div className="h-10 w-10 overflow-hidden rounded-md border border-border">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
                {item.icon ? (
                  item.icon
                ) : item.iconName ? (
                  <DynamicIcon name={item.iconName} size={16} />
                ) : null}
              </div>
            )}
            <div>
              <div className="text-base">{item.label}</div>
              {item.description && (
                <div className="text-sm text-muted-foreground">
                  {item.description}
                </div>
              )}
            </div>
          </Pressable>
        );
      })}
    </div>
  );
};

/**
 * NavbarMegaMenu - A comprehensive navigation bar with rich mega-menu dropdowns.
 *
 * Features grouped dropdown menus for complex site structures or simple links.
 * Each dropdown panel contains categorized links with optional icons or images.
 * Includes a full-screen mobile menu with slide-in submenus for each category.
 * Ideal for enterprise applications and complex product offerings.
 */
export const NavbarMegaMenu = ({
  className,
  containerClassName,
  navClassName,
  navigationMenuListClassName,
  actionsClassName,
  logoClassName,
  mobileMenuClassName,
  logo = {
    url: "/",
  },
  logoSlot,
  menuLinks,
  actions,
  background = "white",
  spacing = "none",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarMegaMenuProps) => {
  const [open, setOpen] = useState(false);
  const [submenuIndex, setSubmenuIndex] = useState<number | null>(null);
  const activeSubmenu =
    submenuIndex !== null ? menuLinks?.[submenuIndex] : null;

  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    return (
      <Pressable
        href={logo.url || "/"}
        className={cn("flex items-center gap-2", logoClassName)}
      >
        <Img
          src={logo.desktopSrc}
          className={cn("hidden h-7 dark:invert md:block", logo.className)}
          alt={logo.alt || "Logo"}
          optixFlowConfig={optixFlowConfig}
        />
        <Img
          src={logo.mobileSrc}
          className={cn("h-7 dark:invert md:hidden", logo.className)}
          alt={logo.alt || "Logo"}
          optixFlowConfig={optixFlowConfig}
        />
      </Pressable>
    );
  };

  const hasDropdownItems = (link: IMenuLink) =>
    Boolean(link.links?.length || link.dropdownGroups?.length);

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
      <div className={cn("container", containerClassName)}>
        <NavigationMenu
          className={cn(
            "min-w-full [&>div:last-child]:left-1/2 [&>div:last-child]:-translate-x-1/2",
            navClassName,
          )}
        >
          <div className="flex w-full items-center justify-between gap-12 py-4">
            {/* Logo */}
            <div>
              {(!open || submenuIndex === null) && renderLogo()}
              {open && submenuIndex !== null && (
                <Pressable
                  variant="outline"
                  asButton
                  onClick={() => setSubmenuIndex(null)}
                >
                  Back
                  <DynamicIcon
                    name="lucide/chevron-left"
                    size={16}
                    className="ml-2"
                  />
                </Pressable>
              )}
            </div>

            <NavigationMenuList
              className={cn("hidden lg:flex", navigationMenuListClassName)}
            >
              {menuLinks?.map((link, index) => {
                if (hasDropdownItems(link)) {
                  return (
                    <DesktopMenuItem
                      key={`menu-link-${index}`}
                      link={link}
                      index={index}
                      optixFlowConfig={optixFlowConfig}
                    />
                  );
                }

                if (!link.href) {
                  return null;
                }

                return (
                  <NavigationMenuItem key={`menu-link-${index}`}>
                    <NavigationMenuLink
                      href={link.href}
                      className="inline-flex h-auto items-center justify-center px-0 py-0 text-sm font-normal text-foreground/60 transition-colors hover:text-foreground focus:text-foreground"
                    >
                      {link.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>

            <div
              className={cn(
                "hidden items-center gap-2 lg:flex",
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
                onClick={() => {
                  if (open) {
                    setOpen(false);
                    setSubmenuIndex(null);
                  } else {
                    setOpen(true);
                  }
                }}
              >
                {!open && <DynamicIcon name="lucide/menu" size={16} />}
                {open && <DynamicIcon name="lucide/x" size={16} />}
              </Pressable>
            </div>
          </div>

          {/* Mobile Menu (Root) */}
          {open && submenuIndex === null && (
            <div
              className={cn(
                "fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden",
                mobileMenuClassName,
              )}
            >
              <div>
                {menuLinks?.map((link, index) => {
                  if (hasDropdownItems(link)) {
                    return (
                      <button
                        key={`mobile-menu-link-${index}`}
                        type="button"
                        className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                        onClick={() => setSubmenuIndex(index)}
                      >
                        <span className="flex-1">{link.label}</span>
                        <span className="shrink-0">
                          <DynamicIcon name="lucide/chevron-right" size={16} />
                        </span>
                      </button>
                    );
                  }

                  if (!link.href) {
                    return null;
                  }

                  return (
                    <Pressable
                      key={`mobile-menu-link-${index}`}
                      href={link.href}
                      className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                    >
                      <span className="flex-1">{link.label}</span>
                    </Pressable>
                  );
                })}
              </div>
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

          {/* Mobile Menu > Dropdown */}
          {open && activeSubmenu && hasDropdownItems(activeSubmenu) && (
            <MobileSubmenu
              submenu={activeSubmenu}
              mobileMenuClassName={mobileMenuClassName}
              optixFlowConfig={optixFlowConfig}
            />
          )}
        </NavigationMenu>
      </div>
    </Section>
  );
};

export default NavbarMegaMenu;
