"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon, type DynamicIconName } from "../../ui/dynamic-icon";
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
import { NavbarMobileMenu } from "../../ui/navbar-mobile-menu";
import { NavbarLogo } from "../../ui/navbar-logo";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { type LogoConfig, type NavbarLayoutVariant } from "./types";
import { getNavbarLayoutClasses } from "./layout-variant-utils";

// Re-export shared types for backward compatibility
export type { LogoConfig } from "./types";

/**
 * Menu item interface for navigation
 * Component-specific type using 'title' and 'url' fields
 */
export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: DynamicIconName;
  items?: MenuItem[];
}

/**
 * Props for the NavbarCenteredMenu component
 */
export interface NavbarCenteredMenuProps {
  /**
     * Logo configuration
     */
  logo?: LogoConfig;
  /**
     * Navigation menu items
     */
  menu?: MenuItem[];
  /**
     * Authentication action configurations
     */
  authActions?: ActionConfig[];
}

export interface NavbarCenteredMenuRuntimeProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the desktop nav
   */
  desktopNavClassName?: string;
  /**
   * Additional CSS classes for the mobile nav
   */
  mobileNavClassName?: string;
  /**
   * Additional CSS classes for the navigation menu
   */
  navigationMenuClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Logo configuration
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo object)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo
   */
  logoClassName?: string;
  /**
   * Navigation menu items
   */
  menu?: MenuItem[];
  /**
   * Custom slot for menu items (overrides menu array)
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
  /** Optional Section ID */
  sectionId?: string;

}

/**
 * Rendered under `NavigationMenuLink asChild`: Radix's Slot injects the merged
 * props (the composed `onClick` that dispatches `rootContentDismiss`, plus
 * `data-*`/aria props and the ref). They MUST be forwarded to the inner
 * `Pressable` — destructuring only `item` silently discarded the dismiss
 * handler, which is why clicking a sub-link left the dropdown open.
 */
const SubMenuLink = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  { item: MenuItem } & Omit<
    React.ComponentProps<typeof Pressable>,
    "href" | "children"
  >
>(({ item, className, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      className={cn(
        "flex flex-row items-center gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-foreground",
        className,
      )}
      href={item.url}
      {...props}
    >
      {item.icon && (
        <div className="flex size-5 shrink-0 items-center justify-center text-muted-foreground">
          <DynamicIcon name={item.icon} size={20} className="shrink-0" />
        </div>
      )}
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Pressable>
  );
});
SubMenuLink.displayName = "SubMenuLink";

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        {/* Positioning/animation now come from the shared wrapper's
            viewport={false} path (top-full + mt-1.5, zoom-in-95/fade-in),
            whose group-data-[viewport=false] selectors out-specify plain
            utilities — the old top-11/zoom-in-90 compensation for the deleted
            local Root fork was dead weight and has been dropped. */}
        <NavigationMenuContent className="origin-top-center relative w-full overflow-hidden rounded-md border bg-popover shadow data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in md:absolute md:left-1/2 md:w-80 md:-translate-x-1/2">
          {item.items.map((subItem) => (
            // The className pre-resolves NavigationMenuLink's opinionated
            // defaults (inline-flex/justify-center/px-3 py-2/w-max/…) toward
            // SubMenuLink's own styling so the Slot-merged class string keeps
            // today's visuals.
            <NavigationMenuLink
              asChild
              key={subItem.title}
              className="flex w-full justify-start p-3 text-current transition-colors hover:bg-muted hover:text-foreground"
            >
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink href={item.url}>{item.title}</NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="h-15 items-center text-base font-normal text-foreground hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="overflow-x-none">
          {item.items.map((subItem) => (
            <Pressable
              key={subItem.title}
              href={subItem.url}
              className="flex items-center gap-2 pl-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {subItem.icon && <DynamicIcon name={subItem.icon} size={14} />}
              {subItem.title}
            </Pressable>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Pressable
      key={item.title}
      href={item.url}
      className="flex h-15 items-center text-base font-normal text-foreground"
    >
      {item.title}
    </Pressable>
  );
};

/**
 * NavbarCenteredMenu - A responsive navigation bar with centered navigation links and dropdown menus.
 *
 * Features a logo on the left, centered navigation menu with dropdown submenus that appear
 * directly below their parent items, and auth buttons on the right. Mobile view uses a
 * slide-out sheet with accordion navigation. The dropdowns are centered under their
 * trigger elements for a balanced visual appearance.
 */
export const NavbarCenteredMenu = ({
  sectionId = "navbar-centered-menu",
  logo,
  logoSlot,
  logoClassName,
  menu,
  menuSlot,
  authActions,
  authActionsSlot,
  className,
  containerClassName,
  desktopNavClassName,
  mobileNavClassName,
  navigationMenuClassName,
  actionsClassName,
  layoutVariant = "fullScreenContainerizedLinks",
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarCenteredMenuRuntimeProps) => {
  const [open, setOpen] = React.useState(false);
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
        <Pressable
          key={index}
          asButton
          className={actionClassName}
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
    });
  }, [authActionsSlot, authActions]);

  const renderMenu = useMemo(() => {
    if (menuSlot) return menuSlot;
    if (!menu || menu.length === 0) return null;

    return menu.map((item) => renderMenuItem(item));
  }, [menuSlot, menu]);

  const renderMobileMenu = useMemo(() => {
    if (menuSlot) return menuSlot;
    if (!menu || menu.length === 0) return null;

    return menu.map((item) => renderMobileMenuItem(item));
  }, [menuSlot, menu]);

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
    <Section
      id="navbar-centered-menu"
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
            {/* Desktop Menu */}
            <nav
              className={cn(
                "hidden justify-between lg:flex",
                desktopNavClassName,
              )}
            >
              {/* Logo */}
              <NavbarLogo
                logo={logo}
                logoSlot={logoSlot}
                logoClassName={logoClassName}
                optixFlowConfig={optixFlowConfig}
              />
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  {/* The shared wrapper's viewport={false} path replaces the
                      old local NavigationMenuPrimitive.Root fork, which
                      bypassed the wrapper and therefore missed its
                      route-change reset. */}
                  <NavigationMenu
                    viewport={false}
                    className={navigationMenuClassName}
                  >
                    <NavigationMenuList className="relative">
                      {renderMenu}
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
              </div>
              <div className={cn("flex gap-2", actionsClassName)}>
                {renderAuthActions}
              </div>
            </nav>

            {/* Mobile Menu */}
            <div className={cn("block lg:hidden", mobileNavClassName)}>
              <div className="flex items-center justify-between">
                <NavbarLogo
                  logo={logo}
                  logoSlot={logoSlot}
                  logoClassName={logoClassName}
                  optixFlowConfig={optixFlowConfig}
                />
                <Pressable
                  variant="outline"
                  size="icon"
                  asButton
                  onClick={() => setOpen(!open)}
                >
                  <DynamicIcon name="lucide/menu" size={16} />
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
                  {renderMobileMenu}
                </Accordion>

                <div
                  className={cn("mt-6 flex flex-col gap-4", actionsClassName)}
                >
                  {renderAuthActions}
                </div>
              </div>
            </NavbarMobileMenu>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NavbarCenteredMenu;
