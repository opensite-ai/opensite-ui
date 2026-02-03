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
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
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

interface MobileNavProps {
  navItems: NavItem[];
  activeItem: string;
  setActiveItem: (item: string) => void;
  actions?: ActionConfig[];
  actionsSlot?: React.ReactNode;
}

const AnimatedHamburger = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="group relative size-full">
      <div className="absolute flex size-full items-center justify-center">
        <DynamicIcon
          name="lucide/menu"
          size={24}
          className={`absolute text-muted-foreground transition-all duration-300 group-hover:text-foreground ${
            isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          }`}
        />
        <DynamicIcon
          name="lucide/x"
          size={24}
          className={`absolute text-muted-foreground transition-all duration-300 group-hover:text-foreground ${
            isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

const MobileNav = ({
  navItems,
  activeItem,
  setActiveItem,
  actions,
  actionsSlot,
}: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
  }, [actionsSlot, actions]);

  return (
    <div className="flex h-full items-center lg:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Pressable variant="ghost" size="icon" asButton onClick={() => {}}>
            <AnimatedHamburger isOpen={isOpen} />
          </Pressable>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="relative top-4 -right-4 block w-[calc(100vw-32px)] overflow-hidden rounded-xl p-0 sm:top-auto sm:right-auto sm:w-80 lg:hidden"
        >
          <ul className="w-full bg-background py-4 text-foreground">
            {navItems.map((navItem, idx) => (
              <li key={idx}>
                <Pressable
                  href={navItem.link}
                  onClick={() => setActiveItem(navItem.name)}
                  className={`flex items-center border-l-[3px] px-6 py-4 text-sm font-medium text-foreground transition-all duration-75 ${
                    activeItem === navItem.name
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {navItem.name}
                </Pressable>
              </li>
            ))}
            {(actionsSlot || (actions && actions.length > 0)) && (
              <li className="flex flex-col gap-3 px-7 py-2">{renderActions}</li>
            )}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

/**
 * NavbarSimpleLinks - A minimal navigation bar with animated active indicator.
 *
 * Features a clean, simple design with horizontal navigation links and an animated
 * underline indicator that slides to show the active item. Desktop view shows all
 * links inline with a smooth sliding indicator. Mobile view uses a popover menu
 * with a left border indicator for the active item. Perfect for simple marketing
 * sites and portfolios.
 */
export const NavbarSimpleLinks = ({
  className,
  containerClassName,
  navClassName,
  navigationMenuClassName,
  menuListClassName,
  actionsClassName,
  logo,
  logoSlot,
  logoClassName,
  navItems,
  navItemsSlot,
  defaultActiveItem,
  actions,
  actionsSlot,
  layoutVariant = "fullScreenContainerizedLinks",
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarSimpleLinksProps) => {
  const [activeItem, setActiveItem] = useState(
    defaultActiveItem || navItems?.[0]?.name || "",
  );
  const indicatorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

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
              {icon}
              {label}
              {iconAfter}
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

              <MobileNav
                navItems={navItems ?? []}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                actions={actions}
                actionsSlot={actionsSlot}
              />

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
  );
};

export default NavbarSimpleLinks;
