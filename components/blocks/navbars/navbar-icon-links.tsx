"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon, type DynamicIconName } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import { NavbarMobileMenu } from "../../ui/navbar-mobile-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
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

// Re-export for backward compatibility
export type { LogoConfig };

/**
 * Navigation item with icon for compact navbar display
 */
interface NavItem {
  title: string;
  url: string;
  icon: DynamicIconName;
}

/**
 * Props for the NavbarIconLinks component
 */
export interface NavbarIconLinksProps {
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
   * Navigation items with icons
   */
  navItems?: NavItem[];
  /**
   * Custom slot for nav items (overrides navItems array)
   */
  navItemsSlot?: React.ReactNode;
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
 * NavbarIconLinks - A compact navigation bar with icon-only links and tooltips.
 *
 * Features a minimalist design with icon-only navigation links that display tooltips
 * on hover to reveal the link title. This design maximizes horizontal space while
 * maintaining accessibility through tooltips. The active state is indicated by a
 * highlighted background. Mobile view uses a slide-out sheet with full text labels.
 * Ideal for dashboards, admin panels, and applications where users are familiar
 * with the navigation structure.
 */
export const NavbarIconLinks = ({
  sectionId = "navbar-icon-links",
  logo,
  logoSlot,
  logoClassName,
  navItems,
  navItemsSlot,
  authActions,
  authActionsSlot,
  className,
  containerClassName,
  navClassName,
  navigationMenuClassName,
  actionsClassName,
  layoutVariant = "fullScreenContainerizedLinks",
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarIconLinksProps) => {
  const [activeItem, setActiveItem] = useState(navItems?.[0]?.title || "");
  const [isOpen, setIsOpen] = useState(false);

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
        <TooltipProvider delayDuration={0} key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Pressable
                size="icon"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
                  "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  actionClassName,
                )}
                {...pressableProps}
              >
                {children ?? (
                  <>
                    <DynamicIcon name={icon} size={18} className="shrink-0" />
                    {label && <span className="sr-only">{label}</span>}
                    <DynamicIcon
                      name={iconAfter}
                      size={18}
                      className="shrink-0"
                    />
                  </>
                )}
              </Pressable>
            </TooltipTrigger>
            {label && (
              <TooltipContent side="bottom">
                <p>{label}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      );
    });
  }, [authActionsSlot, authActions]);

  const renderNavItems = useMemo((): NavItem[] | null => {
    if (navItemsSlot) return null;
    if (!navItems || navItems.length === 0) return null;

    return navItems;
  }, [navItemsSlot, navItems]);

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
      id={sectionId}
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
                "hidden items-center justify-between py-3 lg:flex",
                navClassName,
              )}
            >
              <div className="flex items-center gap-6">
                <NavbarLogo
                  logo={logo}
                  logoSlot={logoSlot}
                  logoClassName={logoClassName}
                  optixFlowConfig={optixFlowConfig}
                />

                <TooltipProvider delayDuration={0}>
                  <NavigationMenu
                    className={cn("flex", navigationMenuClassName)}
                  >
                    <NavigationMenuList className="gap-1">
                      {navItemsSlot
                        ? navItemsSlot
                        : renderNavItems?.map((item, index) => (
                            <NavigationMenuItem key={index}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <NavigationMenuLink asChild>
                                    <Pressable
                                      href={item.url}
                                      onClick={() => setActiveItem(item.title)}
                                      className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-md transition-colors",
                                        activeItem === item.title
                                          ? "bg-accent text-accent-foreground"
                                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                      )}
                                    >
                                      <DynamicIcon name={item.icon} size={20} />
                                      <span className="sr-only">
                                        {item.title}
                                      </span>
                                    </Pressable>
                                  </NavigationMenuLink>
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                  <p>{item.title}</p>
                                </TooltipContent>
                              </Tooltip>
                            </NavigationMenuItem>
                          ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </TooltipProvider>
              </div>

              <div className={cn("flex items-center gap-2", actionsClassName)}>
                {renderAuthActions}
              </div>
            </nav>

            {/* Mobile Menu */}
            <div className="block py-3 lg:hidden">
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
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <DynamicIcon name="lucide/menu" size={16} />
                </Pressable>
              </div>
            </div>
            <NavbarMobileMenu
              open={isOpen}
              onClose={() => setIsOpen(false)}
              title="Mobile Navigation"
            >
              <div className="max-w-screen-sm mx-auto">
                <div className="flex flex-col gap-4">
                  {navItemsSlot
                    ? navItemsSlot
                    : renderNavItems?.map((item, index) => (
                        <Pressable
                          key={index}
                          href={item.url}
                          onClick={() => {
                            setActiveItem(item.title);
                            setIsOpen(false);
                          }}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            activeItem === item.title
                              ? "bg-accent text-accent-foreground"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                          )}
                        >
                          <DynamicIcon name={item.icon} size={18} />
                          {item.title}
                        </Pressable>
                      ))}
                </div>
                <div className="border-t pt-4 mt-6">
                  <div className="flex flex-col gap-3">
                    {authActions?.map((action, index) => (
                      <Pressable
                        key={index}
                        href={action.href}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        <DynamicIcon
                          name={action.icon}
                          size={18}
                          className="shrink-0"
                        />
                        {action.label}
                      </Pressable>
                    ))}
                  </div>
                </div>
              </div>
            </NavbarMobileMenu>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NavbarIconLinks;
