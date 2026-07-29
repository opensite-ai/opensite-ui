"use client";

import * as React from "react";
import { useState, useRef, useEffect, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../ui/navigation-menu";
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
 * Navigation item interface
 */
export interface NavItem {
  name: string;
  link: string;
}

/**
 * Props for the NavbarSimpleLinks component
 */
export interface NavbarSimpleLinksProps {
  /**
     * Logo configuration
     */
  logo?: LogoConfig;
  /**
     * Navigation items array
     */
  navItems?: NavItem[];
  /**
     * Initial active item name
     */
  defaultActiveItem?: string;
  /**
     * Authentication/CTA action configurations
     */
  actions?: ActionConfig[];
}

export interface NavbarSimpleLinksRuntimeProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the nav element
   */
  navClassName?: string;
  /**
   * Additional CSS classes for the navigation menu
   */
  navigationMenuClassName?: string;
  /**
   * Additional CSS classes for the navigation menu list
   */
  menuListClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
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
   * Additional CSS classes for the logo
   */
  logoClassName?: string;
  /**
   * Navigation items array
   */
  navItems?: NavItem[];
  /**
   * Custom slot for nav items (overrides navItems array)
   */
  navItemsSlot?: React.ReactNode;
  /**
   * Initial active item name
   */
  defaultActiveItem?: string;
  /**
   * Authentication/CTA action configurations
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Mobile-specific action configurations
   */
  mobileActions?: ActionConfig[];
  /**
   * Custom slot for mobile actions (overrides mobileActions array)
   */
  mobileActionsSlot?: React.ReactNode;
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
 * NavbarSimpleLinks - A minimal navigation bar with animated active indicator.
 *
 * Features a clean, simple design with horizontal navigation links and an animated
 * underline indicator that slides to show the active item. Desktop view shows all
 * links inline with a smooth sliding indicator. Mobile view uses the shared
 * NavbarMobileMenu component with a fullscreen overlay. Perfect for simple marketing
 * sites and portfolios.
 */
export const NavbarSimpleLinks = ({
  className,
  containerClassName,
  navClassName,
  navigationMenuClassName,
  menuListClassName,
  actionsClassName,
  mobileMenuClassName,
  logo,
  logoSlot,
  logoClassName,
  navItems,
  navItemsSlot,
  defaultActiveItem,
  actions,
  actionsSlot,
  mobileActions,
  mobileActionsSlot,
  layoutVariant = "fullScreenContainerizedLinks",
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarSimpleLinksRuntimeProps) => {
  const [activeItem, setActiveItem] = useState(
    defaultActiveItem || navItems?.[0]?.name || "",
  );
  const [isOpen, setIsOpen] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  // Close mobile menu on resize to desktop
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

  // Update active indicator position
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = document.querySelector(
        `[data-nav-item="${activeItem}"]`,
      ) as HTMLElement;

      if (activeEl && indicatorRef.current && menuRef.current) {
        const menuRect = menuRef.current.getBoundingClientRect();
        const itemRect = activeEl.getBoundingClientRect();

        indicatorRef.current.style.width = `${itemRect.width}px`;
        indicatorRef.current.style.left = `${itemRect.left - menuRect.left}px`;
      }
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeItem]);

  const handleMobileMenuClose = () => {
    setIsOpen(false);
  };

  const renderNavItems = useMemo(() => {
    if (navItemsSlot) return navItemsSlot;
    if (!navItems || navItems.length === 0) return null;

    return navItems.map((item) => (
      <React.Fragment key={item.name}>
        <NavigationMenuItem>
          <NavigationMenuLink
            data-nav-item={item.name}
            onClick={() => setActiveItem(item.name)}
            className={cn(
              "cursor-pointer font-medium",
              activeItem === item.name && "text-foreground",
            )}
          >
            {item.name}
          </NavigationMenuLink>
        </NavigationMenuItem>
      </React.Fragment>
    ));
  }, [navItemsSlot, navItems, activeItem]);

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
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
        <Pressable
          key={index}
          asButton
          className={cn("h-10 py-2.5 text-sm font-normal", actionClassName)}
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
  }, [actionsSlot, actions]);

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
        id="navbar-simple-links"
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
              className={cn("flex items-center justify-between", navClassName)}
            >
              <NavbarLogo
                logo={logo}
                logoSlot={logoSlot}
                logoClassName={logoClassName}
                optixFlowConfig={optixFlowConfig}
              />

              <NavigationMenu
                className={cn("hidden lg:block", navigationMenuClassName)}
              >
                <NavigationMenuList
                  ref={menuRef}
                  className={cn(
                    "flex items-center gap-6 rounded-4xl px-8 py-3",
                    menuListClassName,
                  )}
                >
                  {renderNavItems}
                  <div
                    ref={indicatorRef}
                    className="absolute bottom-2 flex h-1 items-center justify-center px-2 transition-all duration-300"
                  >
                    <div className="h-0.5 w-full rounded-t-none bg-foreground transition-all duration-300" />
                  </div>
                </NavigationMenuList>
              </NavigationMenu>

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

              <div
                className={cn(
                  "hidden items-center gap-2 lg:flex",
                  actionsClassName,
                )}
              >
                {renderActions}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </Section>

    <MobileNavigationMenu
      open={isOpen}
      onClose={handleMobileMenuClose}
      navItems={navItems ?? []}
      mobileActions={mobileActions ?? actions}
      mobileActionsSlot={mobileActionsSlot ?? actionsSlot}
      mobileMenuClassName={mobileMenuClassName}
    />
    </>
  );
};

/**
 * Mobile navigation menu component for simple links navbar
 */
interface MobileNavigationMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  mobileActions?: ActionConfig[];
  mobileActionsSlot?: React.ReactNode;
  mobileMenuClassName?: string;
}

const MobileNavigationMenu = ({
  open,
  onClose,
  navItems,
  mobileActions,
  mobileActionsSlot,
  mobileMenuClassName,
}: MobileNavigationMenuProps) => {
  const renderMobileActions = useMemo(() => {
    if (mobileActionsSlot) return mobileActionsSlot;
    if (!mobileActions || mobileActions.length === 0) return null;

    return (
      <div className="flex flex-col gap-4 px-4">
        {mobileActions.map((action, index) => {
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
  }, [mobileActionsSlot, mobileActions, onClose]);

  return (
    <NavbarMobileMenu
      open={open}
      onClose={onClose}
      title="Navigation"
      className={mobileMenuClassName}
    >
      <div className="max-w-screen-sm mx-auto">
        <div className="flex flex-col gap-6">
          <nav className="flex flex-col">
            {navItems.map((item, index) => (
              <Pressable
                key={`nav-link-${index}`}
                href={item.link}
                className="flex h-15 items-center rounded-md px-4 text-left text-base leading-[3.75] font-normal text-muted-foreground ring-ring/10 outline-ring/50 transition-all hover:bg-muted focus-visible:ring-4 focus-visible:outline-1"
                onClick={onClose}
              >
                {item.name}
              </Pressable>
            ))}
          </nav>
          {renderMobileActions}
        </div>
      </div>
    </NavbarMobileMenu>
  );
};

export default NavbarSimpleLinks;
