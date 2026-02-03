"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import { NavbarLogo } from "../../ui/navbar-logo";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
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

export interface NavItem {
  title: React.ReactNode;
  url: string;
  icon?: React.ReactNode;
  iconName?: string;
}

/**
 * Props for the NavbarSearchFocused component
 */
export interface NavbarSearchFocusedProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the nav wrapper
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
   * Navigation items for the left side
   */
  navItems?: NavItem[];
  /**
   * Custom slot for navigation (overrides navItems array)
   */
  navigationSlot?: React.ReactNode;
  /**
   * Search placeholder text
   */
  searchPlaceholder?: React.ReactNode;
  /**
   * Callback when search is submitted
   */
  onSearch?: (query: string) => void;
  /**
   * Custom slot for search (overrides default search input)
   */
  searchSlot?: React.ReactNode;
  /**
   * Authentication action configurations for desktop
   */
  authActions?: ActionConfig[];
  /**
   * Custom slot for auth actions (overrides authActions array)
   */
  authActionsSlot?: React.ReactNode;
  /**
   * Mobile menu action configurations
   */
  mobileMenuActions?: ActionConfig[];
  /**
   * Custom slot for mobile menu actions (overrides mobileMenuActions array)
   */
  mobileMenuActionsSlot?: React.ReactNode;
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
}

/**
 * NavbarSearchFocused - A navigation bar with a prominent search input.
 *
 * Features a centered search bar that takes up significant horizontal space, making search
 * the primary action. Navigation links are positioned to the sides of the search bar.
 * The search input expands on focus for better usability. Mobile view moves the search bar
 * below the logo and hamburger menu, with navigation in a slide-out sheet. Ideal for
 * e-commerce sites, marketplaces, documentation sites, and content-heavy platforms.
 */
export const NavbarSearchFocused = ({
  className,
  containerClassName,
  navClassName,
  navigationMenuClassName,
  actionsClassName,
  logo,
  logoSlot,
  logoClassName,
  navItems,
  navigationSlot,
  searchPlaceholder,
  onSearch,
  searchSlot,
  authActions,
  authActionsSlot,
  mobileMenuActions,
  mobileMenuActionsSlot,
  layoutVariant = "fullScreenContainerizedLinks",
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarSearchFocusedProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderNavigation = (items: NavItem[]) => {
    if (navigationSlot) return navigationSlot;
    if (!items || items.length === 0) return null;

    return (
      <NavigationMenuList>
        {items.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Pressable href={item.url}>
                {item.icon ??
                  (item.iconName && (
                    <DynamicIcon name={item.iconName} size={16} />
                  ))}
                {item.title}
              </Pressable>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    );
  };

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
        "aria-label": ariaLabel,
        ...pressableProps
      } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={actionClassName}
          aria-label={ariaLabel}
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

  const renderMobileMenuActions = useMemo(() => {
    if (mobileMenuActionsSlot) return mobileMenuActionsSlot;
    if (!mobileMenuActions || mobileMenuActions.length === 0) return null;

    return (
      <div className="flex flex-col gap-2">
        {mobileMenuActions.map((action, index) => {
          const { label, icon, href } = action;
          return (
            <Pressable
              key={index}
              href={href}
              className="flex items-center gap-2 rounded-md py-2 text-sm"
              onClick={() => setIsOpen(false)}
            >
              {icon}
              {label}
            </Pressable>
          );
        })}
      </div>
    );
  }, [mobileMenuActionsSlot, mobileMenuActions]);

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
            <nav
              className={cn(
                "flex items-center gap-4 py-3 lg:gap-8",
                navClassName,
              )}
            >
              <NavbarLogo
                logo={logo}
                logoSlot={logoSlot}
                logoClassName={logoClassName}
                optixFlowConfig={optixFlowConfig}
              />

              <NavigationMenu
                className={cn("hidden lg:flex", navigationMenuClassName)}
              >
                {renderNavigation(navItems?.slice(0, 2) ?? [])}
              </NavigationMenu>

              <NavigationMenu
                className={cn("hidden lg:flex", navigationMenuClassName)}
              >
                {renderNavigation(navItems?.slice(2) ?? [])}
              </NavigationMenu>

              <div
                className={cn(
                  "hidden shrink-0 items-center gap-2 lg:flex",
                  actionsClassName,
                )}
              >
                {renderAuthActions}
              </div>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Pressable
                    variant="ghost"
                    size="icon"
                    asButton
                    onClick={() => {}}
                  >
                    <DynamicIcon name="lucide/menu" size={20} />
                    <span className="sr-only">Toggle menu</span>
                  </Pressable>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px]">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex flex-col gap-6 pt-8">
                    <div className="flex flex-col gap-2">
                      {navItems?.map((item, index) => (
                        <Pressable
                          key={index}
                          href={item.url}
                          className="flex items-center gap-2 rounded-md py-2 text-base font-medium"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.icon ??
                            (item.iconName && (
                              <DynamicIcon name={item.iconName} size={16} />
                            ))}
                          {item.title}
                        </Pressable>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      {renderMobileMenuActions}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NavbarSearchFocused;
