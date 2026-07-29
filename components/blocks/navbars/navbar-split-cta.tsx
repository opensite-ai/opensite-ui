"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon, type DynamicIconName } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import { NavbarLogo } from "../../ui/navbar-logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
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
export type { LogoConfig } from "./types";

interface SubMenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: DynamicIconName;
}

interface MenuItem {
  title: string;
  url?: string;
  items?: SubMenuItem[];
}

/**
 * Props for the NavbarSplitCta component
 */
export interface NavbarSplitCtaProps {
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

export interface NavbarSplitCtaRuntimeProps {
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
 * NavbarSplitCta - A navigation bar with split primary and secondary call-to-action buttons.
 *
 * Features a balanced layout with navigation links on the left and two distinct CTA buttons
 * on the right - a secondary outline button and a primary filled button. The dropdown menus
 * display items with icons and descriptions in a clean list format. Mobile view uses a
 * slide-out sheet with the CTAs prominently displayed at the top. Ideal for SaaS products
 * and services that want to emphasize both login/signup or demo/trial actions.
 */
export const NavbarSplitCta = ({
  sectionId = "navbar-split-cta",
  logo,
  logoSlot,
  logoClassName,
  menu,
  menuSlot,
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
}: NavbarSplitCtaRuntimeProps) => {
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
      } = action as ActionConfig;
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

  const renderMenu = useMemo((): MenuItem[] | null => {
    if (menuSlot) return null;
    if (!menu || menu.length === 0) return null;

    return menu;
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
      id="navbar-split-cta"
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
              <div className="flex items-center gap-8">
                <NavbarLogo
                  logo={logo}
                  logoSlot={logoSlot}
                  logoClassName={logoClassName}
                  optixFlowConfig={optixFlowConfig}
                />

                <NavigationMenu
                  className={cn("hidden lg:flex", navigationMenuClassName)}
                >
                  <NavigationMenuList>
                    {menuSlot
                      ? menuSlot
                      : renderMenu?.map((item, index) =>
                          item.items ? (
                            <NavigationMenuItem key={index}>
                              <NavigationMenuTrigger>
                                {item.title}
                              </NavigationMenuTrigger>
                              <NavigationMenuContent>
                                <ul className="w-[280px] p-2">
                                  {item.items.map((subItem, subIndex) => (
                                    <li key={subIndex}>
                                      <NavigationMenuLink asChild>
                                        <Pressable
                                          href={subItem.url}
                                          className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
                                        >
                                          {subItem.icon && (
                                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-background">
                                              <DynamicIcon
                                                name={subItem.icon}
                                                size={16}
                                              />
                                            </div>
                                          )}
                                          <div>
                                            <div className="text-sm font-medium">
                                              {subItem.title}
                                            </div>
                                            {subItem.description && (
                                              <p className="text-xs text-muted-foreground">
                                                {subItem.description}
                                              </p>
                                            )}
                                          </div>
                                        </Pressable>
                                      </NavigationMenuLink>
                                    </li>
                                  ))}
                                </ul>
                              </NavigationMenuContent>
                            </NavigationMenuItem>
                          ) : (
                            <NavigationMenuItem key={index}>
                              <NavigationMenuLink
                                asChild
                                className={navigationMenuTriggerStyle()}
                              >
                                <Pressable href={item.url}>
                                  {item.title}
                                </Pressable>
                              </NavigationMenuLink>
                            </NavigationMenuItem>
                          ),
                        )}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <div
                className={cn(
                  "hidden items-center gap-3 lg:flex",
                  actionsClassName,
                )}
              >
                {renderAuthActions}
              </div>

              <div className="flex lg:hidden">
                <Pressable
                  variant="ghost"
                  size="icon"
                  asButton
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <DynamicIcon name="lucide/menu" size={20} />
                  <span className="sr-only">Toggle menu</span>
                </Pressable>
              </div>
              <NavbarMobileMenu
                open={isOpen}
                onClose={() => setIsOpen(false)}
                title="Navigation Menu"
              >
                <div className="max-w-screen-sm mx-auto">
                  <div className="flex flex-col gap-4">
                    <div className="pt-0">
                      {menuSlot
                        ? menuSlot
                        : renderMenu?.map((item, index) =>
                            item.items ? (
                              <div key={index} className="mb-4">
                                <div className="mb-2 text-sm font-medium text-muted-foreground">
                                  {item.title}
                                </div>
                                <div className="flex flex-col gap-1 pl-2">
                                  {item.items.map((subItem, subIndex) => (
                                    <Pressable
                                      key={subIndex}
                                      href={subItem.url}
                                      className="flex items-center gap-2 rounded-md py-2 text-sm"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {subItem.icon && (
                                        <DynamicIcon
                                          name={subItem.icon}
                                          size={14}
                                        />
                                      )}
                                      {subItem.title}
                                    </Pressable>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <Pressable
                                key={index}
                                href={item.url}
                                className="block py-2 text-sm font-medium"
                                onClick={() => setIsOpen(false)}
                              >
                                {item.title}
                              </Pressable>
                            ),
                          )}
                    </div>
                    <div className="flex flex-col gap-4 mt-0">
                      {renderAuthActions}
                    </div>
                  </div>
                </div>
              </NavbarMobileMenu>
            </nav>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NavbarSplitCta;
