"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon, type DynamicIconName } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import { NavbarLogo } from "../../ui/navbar-logo";
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
  icon?: DynamicIconName;
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

interface NavbarStickyCompactRuntimeProps {
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
}: NavbarStickyCompactRuntimeProps) => {
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
              <DynamicIcon name={icon} size={16} className="shrink-0" />
              {label}
              <DynamicIcon name={iconAfter} size={16} className="shrink-0" />
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
              "transition-all duration-300 bg-transparent hover:bg-muted",
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
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
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
              "transition-all duration-300 bg-transparent hover:bg-muted",
              isScrolled ? "h-8 text-sm" : "h-10",
            )}
          >
            <Pressable href={item.url}>{item.title}</Pressable>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ),
    );
  }, [menuSlot, menu, isScrolled]);

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
        id="navbar-sticky-compact"
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
                  logoClassName={logoClassName}
                  optixFlowConfig={optixFlowConfig}
                />

                <NavigationMenu className="hidden lg:flex" viewport={false}>
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

                <div className="flex lg:hidden">
                  <Pressable
                    variant="ghost"
                    size={isScrolled ? "sm" : "icon"}
                    asButton
                    className="transition-all duration-300"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <DynamicIcon
                      name="lucide/menu"
                      size={isScrolled ? 18 : 20}
                    />
                    <span className="sr-only">Toggle menu</span>
                  </Pressable>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </Section>
      <MobileNavigationMenu
        open={isOpen}
        setOpen={setIsOpen}
        menu={menu ?? []}
        menuSlot={menuSlot}
        authActions={authActions}
        authActionsSlot={authActionsSlot}
      />
    </>
  );
};

interface MobileNavigationMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  menu: MenuItem[];
  menuSlot?: React.ReactNode;
  authActions?: ActionConfig[];
  authActionsSlot?: React.ReactNode;
}

const MobileNavigationMenu = ({
  open,
  setOpen,
  menu,
  menuSlot,
  authActions,
  authActionsSlot,
}: MobileNavigationMenuProps) => {
  const handleClose = () => setOpen(false);

  const renderMobileAuthActions = useMemo(() => {
    if (authActionsSlot) return authActionsSlot;
    if (!authActions || authActions.length === 0) return null;

    return (
      <div className="mt-6 flex flex-col gap-4">
        {authActions.map((action, index) => {
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
              onClick={handleClose}
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
  }, [authActionsSlot, authActions]);

  return (
    <NavbarMobileMenu open={open} onClose={handleClose} title="Navigation Menu">
      <div className="max-w-screen-sm mx-auto">
        <div className="flex flex-col gap-0">
          <Accordion type="multiple" className="w-full">
            {menuSlot
              ? menuSlot
              : menu.map((item, index) =>
                  item.items ? (
                    <AccordionItem
                      key={`nav-item-${index}`}
                      value={`nav-${index}`}
                      className="border-b-0"
                    >
                      <AccordionTrigger className="h-15 items-center p-0 px-4! text-base leading-[3.75] font-normal text-muted-foreground hover:bg-muted hover:no-underline">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent className="overflow-x-none">
                        {item.items.map((subItem, subIndex) => (
                          <Pressable
                            key={`mobile-link-${index}-${subIndex}`}
                            href={subItem.url}
                            className="flex min-h-12 items-center gap-2 rounded-lg px-4 text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-foreground"
                            onClick={handleClose}
                          >
                            {subItem.icon && (
                              <DynamicIcon
                                name={subItem.icon}
                                size={16}
                                className="stroke-muted-foreground"
                              />
                            )}
                            {subItem.title}
                          </Pressable>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <Pressable
                      key={`nav-link-${index}`}
                      href={item.url}
                      className="flex h-15 items-center rounded-md p-0 px-4 text-left text-base leading-[3.75] font-normal text-muted-foreground ring-ring/10 outline-ring/50 transition-all hover:bg-muted focus-visible:ring-4 focus-visible:outline-1"
                      onClick={handleClose}
                    >
                      {item.title}
                    </Pressable>
                  ),
                )}
          </Accordion>
          {renderMobileAuthActions}
        </div>
      </div>
    </NavbarMobileMenu>
  );
};

export default NavbarStickyCompact;
