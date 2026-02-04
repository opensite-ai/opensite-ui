"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
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
export type { LogoConfig };

export interface MenuLink {
  label: React.ReactNode;
  description?: React.ReactNode;
  url: string;
  icon?: React.ReactNode;
  iconName?: string;
}

export interface MenuGroup {
  title: React.ReactNode;
  links: MenuLink[];
}

export interface MenuItem {
  title: React.ReactNode;
  url?: string;
  groups?: MenuGroup[];
}

/**
 * Props for the NavbarMultiColumnGroups component
 */
export interface NavbarMultiColumnGroupsProps {
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
  navigation?: MenuItem[];
  /**
   * Custom slot for navigation (overrides navigation array)
   */
  navigationSlot?: React.ReactNode;
  /**
   * Authentication action configurations for desktop
   */
  authActions?: ActionConfig[];
  /**
   * Custom slot for auth actions (overrides authActions array)
   */
  authActionsSlot?: React.ReactNode;
  /**
   * Authentication action configurations for mobile
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Layout variant for the navbar
   */
  layoutVariant?: NavbarLayoutVariant;
}

const MOBILE_BREAKPOINT = 1024;

/**
 * NavbarMultiColumnGroups - A navigation bar with multi-column grouped dropdown menus.
 *
 * Features dropdown menus that display links organized into multiple columns by category.
 * Each column has a group title and a list of links with icons and descriptions. The dropdown
 * width dynamically adjusts based on the number of groups. Mobile view uses a dark-themed
 * full-screen sheet with accordion navigation and CTA buttons at the top. Ideal for SaaS
 * platforms, enterprise software, and products with many features to showcase.
 */
export const NavbarMultiColumnGroups = ({
  className,
  containerClassName,
  navClassName,
  navigationMenuClassName,
  actionsClassName,
  logo,
  logoSlot,
  logoClassName,
  navigation,
  navigationSlot,
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
}: NavbarMultiColumnGroupsProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleMobileMenu = () => {
    setOpen(!open);
  };

  const renderNavigation = useMemo(() => {
    if (navigationSlot) return navigationSlot;
    if (!navigation || navigation.length === 0) return null;

    return (
      <NavigationMenuList>
        {navigation.map((item, index) => (
          <DesktopMenuItem
            key={`desktop-link-${index}`}
            item={item}
            index={index}
          />
        ))}
      </NavigationMenuList>
    );
  }, [navigationSlot, navigation]);

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
              <div
                className={cn(
                  "flex items-center justify-between gap-8",
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
                    className={cn("hidden xl:flex", navigationMenuClassName)}
                    viewport={false}
                  >
                    {renderNavigation}
                  </NavigationMenu>
                </div>
                <div
                  className={cn(
                    "hidden items-center gap-3 xl:flex",
                    actionsClassName,
                  )}
                >
                  {renderAuthActions}
                </div>
                <div className="xl:hidden">
                  <Pressable
                    className="size-11"
                    variant="ghost"
                    size="icon"
                    asButton
                    onClick={handleMobileMenu}
                  >
                    <DynamicIcon
                      name="lucide/menu"
                      size={22}
                      className="stroke-foreground"
                    />
                  </Pressable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <MobileNavigationMenu
        open={open}
        setOpen={setOpen}
        navigation={navigation ?? []}
        authActions={mobileAuthActions}
        authActionsSlot={mobileAuthActionsSlot}
      />
    </>
  );
};

interface DesktopMenuItemProps {
  item: MenuItem;
  index: number;
}

const DesktopMenuItem = ({ item, index }: DesktopMenuItemProps) => {
  if (item.groups) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
        <NavigationMenuTrigger className="h-fit bg-transparent px-2.5 font-normal text-muted-foreground">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="rounded-xl! border! p-0!">
          <ul className="flex p-2" style={{ width: item.groups.length * 248 }}>
            {item.groups.map((group, groupIndex) => (
              <li className="flex-1" key={`desktop-group-${groupIndex}`}>
                <ul>
                  <li className="px-3 py-2 text-sm leading-normal text-muted-foreground">
                    {group.title}
                  </li>
                  {group.links.map((link, linkIndex) => (
                    <li key={`desktop-links-${groupIndex}-${linkIndex}`}>
                      <NavigationMenuLink
                        asChild
                        className="group/link flex-row gap-2 px-3 py-2 transition-colors duration-200"
                      >
                        <Pressable href={link.url}>
                          <div className="flex size-8 shrink-0 rounded-lg border duration-400 fade-in group-hover/link:bg-background">
                            {link.icon ? (
                              link.icon
                            ) : link.iconName ? (
                              <DynamicIcon
                                name={link.iconName}
                                size={16}
                                className="m-auto group-hover/link:stroke-black"
                              />
                            ) : null}
                          </div>
                          <div className="flex flex-col gap-0.5">
                            <div className="text-sm font-medium">
                              {link.label}
                            </div>
                            <div className="text-xs text-muted-foreground group-hover/link:text-foreground">
                              {link.description}
                            </div>
                          </div>
                        </Pressable>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
      <NavigationMenuLink
        href={item.url}
        className={`${navigationMenuTriggerStyle()} h-fit bg-transparent px-2.5 font-normal text-muted-foreground`}
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

interface MobileNavigationMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  navigation: MenuItem[];
  authActions?: ActionConfig[];
  authActionsSlot?: React.ReactNode;
}

const MobileNavigationMenu = ({
  open,
  setOpen,
  navigation,
  authActions,
  authActionsSlot,
}: MobileNavigationMenuProps) => {
  const handleClose = () => setOpen(false);

  const renderMobileAuthActions = useMemo(() => {
    if (authActionsSlot) return authActionsSlot;
    if (!authActions || authActions.length === 0) return null;

    return (
      <div className="flex flex-col gap-4 mt-6">
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
                  {icon}
                  {label}
                  {iconAfter}
                </>
              )}
            </Pressable>
          );
        })}
      </div>
    );
  }, [authActionsSlot, authActions, handleClose]);

  return (
    <NavbarMobileMenu
      open={open}
      onClose={handleClose}
      title="Mobile Navigation"
    >
      <div className="max-w-screen-sm mx-auto">
        <div className="flex flex-col gap-6">
          <Accordion type="multiple" className="w-full">
            {navigation.map((item, index) => {
              // If the item has groups, render as accordion
              if (item.groups && item.groups.length > 0) {
                return (
                  <AccordionItem
                    key={`nav-item-${index}`}
                    value={`nav-${index}`}
                    className="border-b-0"
                  >
                    <AccordionTrigger className="h-15 items-center p-0 px-4! text-base leading-[3.75] font-normal text-muted-foreground hover:bg-muted hover:no-underline">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="overflow-x-none">
                      {item.groups.map((group, groupIndex) => (
                        <div
                          key={`mobile-group-${groupIndex}`}
                          className="mb-4"
                        >
                          {group.title && (
                            <p className="mt-4 px-4 text-xs font-semibold text-muted-foreground uppercase">
                              {group.title}
                            </p>
                          )}
                          {group.links.map((link, linkIndex) => (
                            <Pressable
                              key={`mobile-link-${groupIndex}-${linkIndex}`}
                              href={link.url}
                              className="flex min-h-12 items-center gap-2 rounded-lg px-4 text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-foreground"
                              onClick={handleClose}
                            >
                              {link.icon ? (
                                link.icon
                              ) : link.iconName ? (
                                <DynamicIcon
                                  name={link.iconName}
                                  size={16}
                                  className="stroke-muted-foreground"
                                />
                              ) : null}
                              {link.label}
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
                  href={item.url}
                  className="flex h-15 items-center rounded-md p-0 px-4 text-left text-base leading-[3.75] font-normal text-muted-foreground ring-ring/10 outline-ring/50 transition-all hover:bg-muted focus-visible:ring-4 focus-visible:outline-1"
                  onClick={handleClose}
                >
                  {item.title}
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

export default NavbarMultiColumnGroups;
