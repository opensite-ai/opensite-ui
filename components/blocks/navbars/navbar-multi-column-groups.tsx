"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
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
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle } from "../../ui/sheet";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
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
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
  },
  logoSlot,
  logoClassName,
  navigation,
  navigationSlot,
  authActions,
  authActionsSlot,
  mobileAuthActions,
  mobileAuthActionsSlot,
  layoutVariant = "fullScreenContainerizedLinks",
  background = "white",
  spacing = "none",
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

  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    return (
      <Pressable
        href={logo.url || "/"}
        className={cn(
          "flex max-h-8 items-center gap-2 text-lg font-semibold tracking-tighter",
          logoClassName,
        )}
      >
        {logo.src && (
          <Img
            src={logo.src}
            alt={logo.alt || "Logo"}
            className={cn("inline-block size-6", logo.className)}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        {logo.title &&
          (typeof logo.title === "string" ? (
            <span className="hidden md:inline-block">{logo.title}</span>
          ) : (
            logo.title
          ))}
      </Pressable>
    );
  };

  const renderNavigation = () => {
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
  };

  const renderAuthActions = () => {
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
  };

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
            <div
              className={cn(
                "flex items-center justify-between gap-8",
                navClassName,
              )}
            >
          <div className="flex items-center gap-8">
            {renderLogo()}
            <NavigationMenu
              className={cn("hidden xl:flex", navigationMenuClassName)}
              viewport={false}
            >
              {renderNavigation()}
            </NavigationMenu>
          </div>
          <div
            className={cn(
              "hidden items-center gap-3 xl:flex",
              actionsClassName,
            )}
          >
            {renderAuthActions()}
          </div>
          <div className="xl:hidden">
            <Pressable
              className="size-11"
              variant="ghost"
              asButton
              onClick={handleMobileMenu}
            >
              {open ? (
                <DynamicIcon
                  name="lucide/x"
                  size={22}
                  className="stroke-foreground"
                />
              ) : (
                <DynamicIcon
                  name="lucide/menu"
                  size={22}
                  className="stroke-foreground"
                />
              )}
            </Pressable>
          </div>
            </div>
          </div>
        </div>
      </div>
      <MobileNavigationMenu
        open={open}
        navigation={navigation ?? []}
        authActions={mobileAuthActions}
        authActionsSlot={mobileAuthActionsSlot}
      />
    </Section>
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
  navigation: MenuItem[];
  authActions?: ActionConfig[];
  authActionsSlot?: React.ReactNode;
}

const MobileNavigationMenu = ({
  open,
  navigation,
  authActions,
  authActionsSlot,
}: MobileNavigationMenuProps) => {
  const renderMobileAuthActions = () => {
    if (authActionsSlot) return authActionsSlot;
    if (!authActions || authActions.length === 0) return null;

    return (
      <div className="flex flex-col gap-4">
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
  };

  return (
    <Sheet open={open}>
      <SheetContent
        aria-describedby={undefined}
        side="top"
        className="dark inset-0 z-998 h-dvh w-full bg-background pt-15.75 [&>button]:hidden"
      >
        <div className="h-full overflow-y-auto pt-10 pb-20">
          <div className="container">
            <div className="absolute -m-px h-px w-px overflow-hidden border-0 mask-clip-border p-0 text-nowrap whitespace-nowrap">
              <SheetTitle className="text-primary">
                Mobile Navigation
              </SheetTitle>
            </div>
            <div className="flex flex-col gap-6">
              {renderMobileAuthActions()}
              <Accordion type="multiple" className="w-full">
                {navigation.map((item, index) =>
                  renderMobileMenuItem(item, index),
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const renderMobileMenuItem = (item: MenuItem, index: number) => {
  if (item.groups) {
    return (
      <AccordionItem
        key={`nav-item-${index}`}
        value={`nav-${index}`}
        className="border-b-0"
      >
        <AccordionTrigger className="h-15 items-center p-0 px-4! text-base leading-[3.75] font-normal text-muted-foreground hover:bg-muted hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="max-h-[60dvh] overflow-x-auto">
          {item.groups.flatMap((group, groupIndex) =>
            group.links.map((link, linkIndex) => (
              <Pressable
                key={`mobile-link-${groupIndex}-${linkIndex}`}
                href={link.url}
                className="flex h-12 items-center gap-2 rounded-lg px-4 text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-foreground"
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
            )),
          )}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Pressable
      key={`nav-link-${index}`}
      href={item.url}
      className="flex h-15 items-center rounded-md p-0 px-4 text-left text-base leading-[3.75] font-normal text-muted-foreground ring-ring/10 outline-ring/50 transition-all hover:bg-muted focus-visible:ring-4 focus-visible:outline-1 nth-last-1:border-0"
    >
      {item.title}
    </Pressable>
  );
};

export default NavbarMultiColumnGroups;
