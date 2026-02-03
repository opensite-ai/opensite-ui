"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
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
export type { LogoConfig } from "./types";

interface SubMenuItem {
  title: string;
  url: string;
  icon?: string;
}

interface MenuItem {
  title: string;
  url?: string;
  items?: SubMenuItem[];
}

/**
 * Props for the NavbarStickyCompact component
 */
export interface NavbarStickyCompactProps {
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
}

/**
 * NavbarStickyCompact - A compact sticky navigation bar that shrinks on scroll.
 *
 * Features a standard-height navigation bar that compresses to a more compact size when
 * the user scrolls down. The logo shrinks and padding reduces to maximize content space
 * while maintaining navigation accessibility. Desktop view shows dropdown menus with icons.
 * Mobile view uses a slide-out sheet from the right. Ideal for content-heavy sites where
 * vertical space is valuable.
 */
export const NavbarStickyCompact = ({
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
  actionsClassName,
  layoutVariant = "fullScreenContainerizedLinks",
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarStickyCompactProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        size: actionSize,
        ...pressableProps
      } = action;
      return (
        <Pressable
          key={index}
          asButton
          size={isScrolled ? "sm" : actionSize || "default"}
          className={cn("transition-all duration-300", actionClassName)}
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
  }, [authActionsSlot, authActions, isScrolled]);

  const renderMenu = useMemo(() => {
    if (menuSlot) return menuSlot;
    if (!menu || menu.length === 0) return null;

    return menu.map((item, index) =>
      item.items ? (
        <NavigationMenuItem key={index}>
          <NavigationMenuTrigger
            className={cn(
              "transition-all duration-300",
              isScrolled ? "h-8 text-sm" : "h-10",
            )}
          >
            {item.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-1 p-2">
              {item.items.map((subItem, subIndex) => (
                <li key={subIndex}>
                  <NavigationMenuLink asChild>
                    <Pressable
                      href={subItem.url}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                    >
                      {subItem.icon && (
                        <DynamicIcon name={subItem.icon} size={16} />
                      )}
                      {subItem.title}
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
            className={cn(
              navigationMenuTriggerStyle(),
              "transition-all duration-300",
              isScrolled ? "h-8 text-sm" : "h-10",
            )}
          >
            <Pressable href={item.url}>{item.title}</Pressable>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ),
    );
  }, [menuSlot, menu, isScrolled]);

  const renderMobileMenu = useMemo(() => {
    if (menuSlot) return menuSlot;
    if (!menu || menu.length === 0) return null;

    return menu.map((item, index) =>
      item.items ? (
        <div key={index} className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">
            {item.title}
          </div>
          <div className="flex flex-col gap-1 pl-2">
            {item.items.map((subItem, subIndex) => (
              <Pressable
                key={subIndex}
                href={subItem.url}
                className="flex items-center gap-2 rounded-md py-2 text-sm hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {subItem.icon && <DynamicIcon name={subItem.icon} size={14} />}
                {subItem.title}
              </Pressable>
            ))}
          </div>
        </div>
      ) : (
        <Pressable
          key={index}
          href={item.url}
          className="text-sm font-medium"
          onClick={() => setIsOpen(false)}
        >
          {item.title}
        </Pressable>
      ),
    );
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
      background={background}
      spacing={spacingOverride ?? spacing}
      className={cn(
        sectionClasses,
        "fixed top-0 left-0 z-50 w-full bg-background/95 backdrop-blur-sm transition-all duration-300",
        isScrolled ? "shadow-sm" : "",
      )}
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
                "flex items-center justify-between transition-all duration-300",
                isScrolled ? "h-14" : "h-16",
                navClassName,
              )}
            >
              <NavbarLogo
                logo={logo}
                logoSlot={logoSlot}
                logoClassName={cn(
                  isScrolled
                    ? "[&_img]:h-6 [&_span]:text-base"
                    : "[&_img]:h-8 [&_span]:text-lg",
                  "[&_img]:transition-all [&_img]:duration-300 [&_span]:transition-all [&_span]:duration-300",
                  logoClassName,
                )}
                optixFlowConfig={optixFlowConfig}
              />

              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList>{renderMenu}</NavigationMenuList>
              </NavigationMenu>

              <div
                className={cn(
                  "hidden items-center gap-2 lg:flex",
                  actionsClassName,
                )}
              >
                {renderAuthActions}
              </div>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Pressable
                    variant="ghost"
                    size={isScrolled ? "sm" : "icon"}
                    asButton
                    onClick={() => {}}
                    className="transition-all duration-300"
                  >
                    <DynamicIcon
                      name="lucide/menu"
                      size={isScrolled ? 18 : 20}
                    />
                    <span className="sr-only">Toggle menu</span>
                  </Pressable>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px]">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex flex-col gap-4 pt-8">
                    {renderMobileMenu}
                    <div
                      className={cn(
                        "mt-4 flex flex-col gap-2 border-t pt-4",
                        actionsClassName,
                      )}
                    >
                      {renderAuthActions}
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

export default NavbarStickyCompact;
