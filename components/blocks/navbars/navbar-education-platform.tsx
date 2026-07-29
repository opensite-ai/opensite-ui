"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon, type DynamicIconName } from "../../ui/dynamic-icon";
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
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
import { Separator } from "../../ui/separator";
import { NavbarLogo } from "../../ui/navbar-logo";
import { NavbarMobileMenu } from "../../ui/navbar-mobile-menu";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { LogoConfig, NavbarLayoutVariant } from "./types";
import { getNavbarLayoutClasses } from "./layout-variant-utils";

// Re-export LogoConfig for backward compatibility
export type { LogoConfig };

/**
 * Link item for menu groups
 */
export interface MenuLinkItem {
  /** Display title */
  title: string;
  /** Optional description */
  description?: string;
  /** Icon name or element for DynamicIcon */
  icon?: DynamicIconName;
  /** Link URL */
  href: string;
}

/**
 * Featured image configuration for menu groups
 */
export interface MenuFeaturedImage {
  /** Image source URL */
  src: string;
  /** Alt text for the image */
  alt?: string;
  /** Link URL when clicking the image */
  href?: string;
}

/**
 * Group of links within a dropdown menu
 */
export interface MenuGroup {
  /** Group label/title displayed above the links */
  label: string;
  /** Links within this group */
  links: MenuLinkItem[];
  /** Optional featured image for this group */
  featuredImage?: MenuFeaturedImage;
}

/**
 * Menu item configuration - can be a simple link or a dropdown with groups
 */
export interface MenuItem {
  /** Display label for the menu item */
  label: React.ReactNode;
  /** Direct link URL (for non-dropdown items) */
  href?: string;
  /** Dropdown groups (if provided, creates a dropdown menu) */
  groups?: MenuGroup[];
}

/**
 * Props for the NavbarEducationPlatform component
 */
export interface NavbarEducationPlatformProps {
  /**
     * Logo configuration
     */
  logo?: LogoConfig;
  /**
     * Navigation menu items - can be simple links or dropdowns with grouped links
     */
  menu?: MenuItem[];
  /**
     * Authentication action configurations
     */
  authActions?: ActionConfig[];
}

export interface NavbarEducationPlatformRuntimeProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the nav
   */
  navClassName?: string;
  /**
   * Additional CSS classes for the navigation menu
   */
  navigationMenuClassName?: string;
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
   * Navigation menu items - can be simple links or dropdowns with grouped links
   */
  menu?: MenuItem[];
  /**
   * Custom slot for navigation menu (overrides menu array)
   */
  menuSlot?: React.ReactNode;
  /**
   * Authentication action configurations
   */
  authActions?: ActionConfig[];
  /**
   * Custom slot for auth actions (overrides authActions array)
   */
  authActionsSlot?: React.ReactNode;
  /**
   * Mobile authentication action configurations
   */
  mobileAuthActions?: ActionConfig[];
  /**
   * Custom slot for mobile auth actions (overrides mobileAuthActions array)
   */
  mobileAuthActionsSlot?: React.ReactNode;
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
   * Layout variant for the navbar
   */
  layoutVariant?: NavbarLayoutVariant;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;

}

const MOBILE_BREAKPOINT = 1024;

/**
 * NavbarEducationPlatform - A flexible navigation bar designed for education and LMS platforms.
 *
 * Features configurable dropdown menus with grouped links. Each menu item can be a simple link
 * or a dropdown with multiple groups, where each group can optionally include a featured image.
 * Each menu item displays an icon, title, and description with hover animations.
 * Mobile view uses accordion navigation with the shared NavbarMobileMenu component.
 * Ideal for e-learning platforms, course management systems, and educational technology products.
 */
export const NavbarEducationPlatform = ({
  className,
  containerClassName,
  navClassName,
  navigationMenuClassName,
  actionsClassName,
  logoClassName,
  mobileMenuClassName,
  logo,
  logoSlot,
  menu,
  menuSlot,
  authActions,
  authActionsSlot,
  mobileAuthActions,
  mobileAuthActionsSlot,
  layoutVariant = "fullScreenContainerizedLinks",
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarEducationPlatformRuntimeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMobileMenuClose = () => {
    setIsOpen(false);
  };

  const renderNavigation = useMemo(() => {
    if (menuSlot) return menuSlot;
    if (!menu || menu.length === 0) return null;

    return (
      <NavigationMenuList>
        {menu.map((item, index) => (
          <DesktopMenuItem
            key={`desktop-link-${index}`}
            item={item}
            index={index}
            optixFlowConfig={optixFlowConfig}
          />
        ))}
      </NavigationMenuList>
    );
  }, [menuSlot, menu, optixFlowConfig]);

  const renderAuthActions = useMemo(() => {
    if (authActionsSlot) return authActionsSlot;
    if (!authActions || authActions.length === 0) return null;

    return authActions.map((action, index) => {
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
  }, [authActionsSlot, authActions]);

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

  return (
    <>
      <Section
        id="navbar-education-platform"
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
              <nav
                className={cn(
                  "flex items-center justify-between py-4",
                  navClassName,
                )}
              >
                <div className="flex flex-1 items-center gap-9">
                  <NavbarLogo
                    logo={logo}
                    logoSlot={logoSlot}
                    logoClassName={logoClassName}
                    optixFlowConfig={optixFlowConfig}
                  />
                  <div
                    className={cn(
                      "hidden items-center gap-1.5 lg:flex",
                      navigationMenuClassName,
                    )}
                  >
                    <NavigationMenu delayDuration={0} viewport={false}>
                      {renderNavigation}
                    </NavigationMenu>
                  </div>
                </div>

                <div
                  className={cn(
                    "hidden items-center gap-2 lg:flex",
                    actionsClassName,
                  )}
                >
                  {renderAuthActions}
                </div>

                <div className="lg:hidden">
                  <Pressable
                    className="size-11"
                    variant="ghost"
                    size="icon"
                    asButton
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <DynamicIcon
                      name="lucide/menu"
                      size={22}
                      className="stroke-foreground"
                    />
                  </Pressable>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </Section>

      <MobileNavigationMenu
        open={isOpen}
        onClose={handleMobileMenuClose}
        menu={menu ?? []}
        mobileAuthActions={mobileAuthActions ?? authActions}
        mobileAuthActionsSlot={mobileAuthActionsSlot ?? authActionsSlot}
        mobileMenuClassName={mobileMenuClassName}
      />
    </>
  );
};

/**
 * Desktop menu item component
 */
interface DesktopMenuItemProps {
  item: MenuItem;
  index: number;
  optixFlowConfig?: OptixFlowConfig;
}

const DesktopMenuItem = ({
  item,
  index,
  optixFlowConfig,
}: DesktopMenuItemProps) => {
  // If the item has groups, render as dropdown
  if (item.groups && item.groups.length > 0) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
        <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
        <NavigationMenuContent className="p-0">
          <div className="flex">
            {item.groups.map((group, groupIndex) => (
              <React.Fragment key={`group-${groupIndex}`}>
                {groupIndex > 0 && (
                  <Separator
                    orientation="vertical"
                    className="data-[orientation=vertical]:h-auto"
                  />
                )}
                <div className="p-4">
                  <p className="mb-3 text-[10px] text-muted-foreground uppercase">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.links.map((link) => (
                      <NavigationMenuLink
                        key={link.title}
                        asChild
                        className="w-full"
                      >
                        <Pressable
                          href={link.href}
                          className="group flex cursor-pointer justify-start! flex-row gap-3"
                        >
                          {link.icon && (
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                              <DynamicIcon name={link.icon} size={20} />
                            </span>
                          )}
                          <div className="flex flex-col">
                            <span className="flex items-center gap-0.5 text-sm font-medium whitespace-nowrap">
                              {link.title}
                              <DynamicIcon
                                name="lucide/chevron-right"
                                size={16}
                                className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                              />
                            </span>
                            {link.description && (
                              <p className="text-xs whitespace-nowrap text-muted-foreground">
                                {link.description}
                              </p>
                            )}
                          </div>
                        </Pressable>
                      </NavigationMenuLink>
                    ))}
                  </div>
                  {group.featuredImage && (
                    <div className="mt-4">
                      <NavigationMenuLink asChild>
                        <Pressable href={group.featuredImage.href || "#"}>
                          <div className="rounded-lg bg-muted p-3">
                            <Img
                              src={group.featuredImage.src}
                              alt={group.featuredImage.alt || "Featured image"}
                              className="aspect-video w-full max-w-60 rounded-md object-cover object-center"
                              optixFlowConfig={optixFlowConfig}
                            />
                          </div>
                        </Pressable>
                      </NavigationMenuLink>
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  // Simple link item (no dropdown)
  return (
    <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Pressable href={item.href}>{item.label}</Pressable>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

/**
 * Mobile navigation menu component
 */
interface MobileNavigationMenuProps {
  open: boolean;
  onClose: () => void;
  menu: MenuItem[];
  mobileAuthActions?: ActionConfig[];
  mobileAuthActionsSlot?: React.ReactNode;
  mobileMenuClassName?: string;
}

const MobileNavigationMenu = ({
  open,
  onClose,
  menu,
  mobileAuthActions,
  mobileAuthActionsSlot,
  mobileMenuClassName,
}: MobileNavigationMenuProps) => {
  const renderMobileAuthActions = useMemo(() => {
    if (mobileAuthActionsSlot) return mobileAuthActionsSlot;
    if (!mobileAuthActions || mobileAuthActions.length === 0) return null;

    return (
      <div className="flex flex-col gap-4">
        {mobileAuthActions.map((action, index) => {
          const {
            label,
            icon,
            iconAfter,
            children,
            className: actionClassName,
            ...pressableProps
          } = action;
          return (
            <Pressable
              key={index}
              asButton
              className={cn("w-full", actionClassName)}
              onClick={onClose}
              {...pressableProps}
            >
              {children ?? (
                <>
                  <DynamicIcon name={icon} size={16} className="shrink-0" />
                  {label}
                  <DynamicIcon name={iconAfter} size={16} className="shrink-0" />
                </>
              )}
            </Pressable>
          );
        })}
      </div>
    );
  }, [mobileAuthActionsSlot, mobileAuthActions, onClose]);

  return (
    <NavbarMobileMenu
      open={open}
      onClose={onClose}
      title="Mobile Navigation"
      className={mobileMenuClassName}
    >
      <div className="max-w-screen-sm mx-auto">
        <div className="flex flex-col gap-6">
          <Accordion type="multiple" className="w-full">
            {menu.map((item, index) => {
              // If the item has groups, render as accordion
              if (item.groups && item.groups.length > 0) {
                return (
                  <AccordionItem
                    key={`nav-item-${index}`}
                    value={`nav-${index}`}
                    className="border-b-0"
                  >
                    <AccordionTrigger className="h-15 items-center p-0 px-4! text-base leading-[3.75] font-normal text-muted-foreground hover:bg-muted hover:no-underline">
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent className="overflow-x-none">
                      {item.groups.map((group, groupIndex) => (
                        <div
                          key={`mobile-group-${groupIndex}`}
                          className="mb-4"
                        >
                          {group.label && (
                            <p className="block mt-4 mb-2 px-4 text-[10px] text-muted-foreground uppercase">
                              {group.label}
                            </p>
                          )}
                          {group.links.map((link) => (
                            <Pressable
                              key={link.title}
                              href={link.href}
                              className="flex min-h-12 items-center gap-2 rounded-lg pl-6 pr-4 text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-foreground"
                              onClick={onClose}
                            >
                              {link.icon && (
                                <DynamicIcon
                                  name={link.icon}
                                  size={16}
                                  className="stroke-muted-foreground"
                                />
                              )}
                              {link.title}
                            </Pressable>
                          ))}
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                );
              }

              // Simple link item
              return (
                <Pressable
                  key={`nav-link-${index}`}
                  href={item.href}
                  className="flex h-15 items-center rounded-md p-0 px-4 text-left text-base leading-[3.75] font-normal text-muted-foreground ring-ring/10 outline-ring/50 transition-all hover:bg-muted focus-visible:ring-4 focus-visible:outline-1"
                  onClick={onClose}
                >
                  {item.label}
                </Pressable>
              );
            })}
          </Accordion>
          {renderMobileAuthActions}
        </div>
      </div>
    </NavbarMobileMenu>
  );
};

export default NavbarEducationPlatform;
