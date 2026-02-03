"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
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
import type { LogoConfig, NavbarLayoutVariant } from "./types";
import { getNavbarLayoutClasses } from "./layout-variant-utils";

// Re-export shared types for backward compatibility
export type { LogoConfig } from "./types";

/**
 * Menu item interface for navigation (component-specific)
 * Note: This uses title/url pattern specific to this dropdown menu component
 */
export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: string;
  items?: MenuItem[];
}

/**
 * Props for the NavbarDropdownMenu component
 */
export interface NavbarDropdownMenuProps {
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
}

const SubMenuLink = ({
  item,
  optixFlowConfig,
}: {
  item: MenuItem;
  optixFlowConfig?: OptixFlowConfig;
}) => {
  return (
    <Pressable
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted"
      href={item.url}
    >
      {item.icon && (
        <div>
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
};

const renderMenuItem = (item: MenuItem, optixFlowConfig?: OptixFlowConfig) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} optixFlowConfig={optixFlowConfig} />
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

const renderMobileMenuItem = (
  item: MenuItem,
  optixFlowConfig?: OptixFlowConfig,
) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink
              key={subItem.title}
              item={subItem}
              optixFlowConfig={optixFlowConfig}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Pressable
      key={item.title}
      href={item.url}
      className="text-md font-semibold"
    >
      {item.title}
    </Pressable>
  );
};

/**
 * NavbarDropdownMenu - A responsive navigation bar with dropdown menus and mobile sheet navigation.
 *
 * Features a logo, navigation menu with dropdown submenus on desktop, and a slide-out sheet
 * menu with accordion navigation on mobile. Includes login and signup call-to-action buttons.
 * The dropdown menus display icons and descriptions for each submenu item.
 */
export const NavbarDropdownMenu = ({
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
}: NavbarDropdownMenuProps) => {
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
              {icon}
              {label}
              {iconAfter}
            </>
          )}
        </Pressable>
      );
    });
  }, [authActionsSlot, authActions]);

  const renderMenu = useMemo(() => {
    if (menuSlot) return menuSlot;
    if (!menu || menu.length === 0) return null;

    return menu.map((item) => renderMenuItem(item, optixFlowConfig));
  }, [menuSlot, menu, optixFlowConfig]);

  const renderMobileMenu = useMemo(() => {
    if (menuSlot) return menuSlot;
    if (!menu || menu.length === 0) return null;

    return menu.map((item) => renderMobileMenuItem(item, optixFlowConfig));
  }, [menuSlot, menu, optixFlowConfig]);

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
                "hidden items-center justify-between lg:flex",
                desktopNavClassName,
              )}
            >
              <div className="flex items-center gap-6">
                {/* Logo */}
                <NavbarLogo
                  logo={logo}
                  logoSlot={logoSlot}
                  logoClassName={logoClassName}
                  optixFlowConfig={optixFlowConfig}
                />
                <div className="flex items-center">
                  <NavigationMenu className={navigationMenuClassName}>
                    <NavigationMenuList>{renderMenu}</NavigationMenuList>
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
                {/* Logo */}
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
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col gap-4"
                >
                  {renderMobileMenu}
                </Accordion>

                <div
                  className={cn("mt-6 flex flex-col gap-3", actionsClassName)}
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

export default NavbarDropdownMenu;
