"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface IDropdownItem {
  title: string;
  description?: string;
  href: string;
  icon?: string;
  imgUrl?: string;
}

export interface IMenuLink {
  title: string;
  href?: string;
  dropdownItems?: IDropdownItem[];
}

/**
 * Logo configuration interface
 */
export interface LogoConfig {
  url?: string;
  desktopSrc?: string;
  mobileSrc?: string;
  alt?: string;
  className?: string;
}

/**
 * Props for the NavbarMegaMenu component
 */
export interface NavbarMegaMenuProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the navigation
   */
  navClassName?: string;
  /**
   * Additional CSS classes for the navigation menu list
   */
  navigationMenuListClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the logo
   */
  logoClassName?: string;
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
   * Navigation menu links with optional dropdown groups
   */
  menuLinks?: IMenuLink[];
  /**
   * Actions rendered on the right side (desktop) and bottom (mobile)
   */
  actions?: ActionConfig[];
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * NavbarMegaMenu - A comprehensive navigation bar with rich mega-menu dropdowns.
 *
 * Features grouped dropdown menus for complex site structures or simple links.
 * Each dropdown panel contains categorized links with optional icons or images.
 * Includes a full-screen mobile menu with slide-in submenus for each category.
 * Ideal for enterprise applications and complex product offerings.
 */
export const NavbarMegaMenu = ({
  className,
  containerClassName,
  navClassName,
  navigationMenuListClassName,
  actionsClassName,
  logoClassName,
  mobileMenuClassName,
  logo = {
    url: "/",
    desktopSrc: logoPlaceholders.darkHorizontalLogo,
    mobileSrc: logoPlaceholders.logoMark,
  },
  logoSlot,
  menuLinks,
  actions,
  background = "white",
  spacing = "none",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarMegaMenuProps) => {
  const [open, setOpen] = useState(false);
  const [submenuIndex, setSubmenuIndex] = useState<number | null>(null);
  const activeSubmenu =
    submenuIndex !== null ? menuLinks?.[submenuIndex] : null;

  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    return (
      <Pressable
        href={logo.url || "/"}
        className={cn("flex items-center gap-2", logoClassName)}
      >
        <Img
          src={logo.desktopSrc || logoPlaceholders.darkHorizontalLogo}
          className={cn("hidden h-7 dark:invert md:block", logo.className)}
          alt={logo.alt || "Logo"}
          optixFlowConfig={optixFlowConfig}
        />
        <Img
          src={logo.mobileSrc || logoPlaceholders.logoMark}
          className={cn("h-7 dark:invert md:hidden", logo.className)}
          alt={logo.alt || "Logo"}
          optixFlowConfig={optixFlowConfig}
        />
      </Pressable>
    );
  };

  const hasDropdownItems = (link: IMenuLink) =>
    Boolean(link.dropdownItems?.length);

  const renderActions = () => {
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
        <Pressable key={index} className={actionClassName} {...pressableProps}>
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

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn("inset-x-0 top-0 z-20", className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <NavigationMenu
          className={cn(
            "min-w-full [&>div:last-child]:left-1/2 [&>div:last-child]:-translate-x-1/2",
            navClassName,
          )}
        >
          <div className="flex w-full items-center justify-between gap-12 py-4">
            {/* Logo */}
            <div>
              {(!open || submenuIndex === null) && renderLogo()}
              {open && submenuIndex !== null && (
                <Pressable
                  variant="outline"
                  asButton
                  onClick={() => setSubmenuIndex(null)}
                >
                  Back
                  <DynamicIcon
                    name="lucide/chevron-left"
                    size={16}
                    className="ml-2"
                  />
                </Pressable>
              )}
            </div>

            <NavigationMenuList
              className={cn("hidden lg:flex", navigationMenuListClassName)}
            >
              {menuLinks?.map((link, index) => {
                if (hasDropdownItems(link)) {
                  return (
                    <NavigationMenuItem key={`${link.title}-${index}`}>
                      <NavigationMenuTrigger>
                        {link.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="min-w-[520px] p-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {link.dropdownItems?.map((item, itemIndex) => (
                            <NavigationMenuLink
                              key={`${item.title}-${itemIndex}`}
                              href={item.href}
                              className="flex flex-row items-start gap-4 rounded-lg border border-input bg-background p-4 hover:bg-accent hover:text-accent-foreground"
                            >
                              {item.imgUrl && (
                                <div className="h-12 w-12 overflow-hidden rounded-md border border-border">
                                  <Img
                                    src={item.imgUrl}
                                    alt={item.title}
                                    className="h-full w-full object-cover object-center"
                                    optixFlowConfig={optixFlowConfig}
                                  />
                                </div>
                              )}
                              {!item.imgUrl && item.icon && (
                                <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
                                  <DynamicIcon name={item.icon} size={18} />
                                </div>
                              )}
                              <div>
                                <div className="text-base">{item.title}</div>
                                {item.description && (
                                  <div className="text-sm font-normal text-muted-foreground">
                                    {item.description}
                                  </div>
                                )}
                              </div>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                }

                if (!link.href) {
                  return null;
                }

                return (
                  <NavigationMenuItem key={`${link.title}-${index}`}>
                    <NavigationMenuLink
                      href={link.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                    >
                      {link.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>

            <div
              className={cn(
                "hidden items-center gap-2 lg:flex",
                actionsClassName,
              )}
            >
              {renderActions()}
            </div>

            <div className="flex items-center gap-4 lg:hidden">
              <Pressable
                variant="outline"
                size="icon"
                asButton
                aria-label="Main Menu"
                onClick={() => {
                  if (open) {
                    setOpen(false);
                    setSubmenuIndex(null);
                  } else {
                    setOpen(true);
                  }
                }}
              >
                {!open && <DynamicIcon name="lucide/menu" size={16} />}
                {open && <DynamicIcon name="lucide/x" size={16} />}
              </Pressable>
            </div>
          </div>

          {/* Mobile Menu (Root) */}
          {open && submenuIndex === null && (
            <div
              className={cn(
                "fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden",
                mobileMenuClassName,
              )}
            >
              <div>
                {menuLinks?.map((link, index) => {
                  if (hasDropdownItems(link)) {
                    return (
                      <button
                        key={`${link.title}-${index}`}
                        type="button"
                        className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                        onClick={() => setSubmenuIndex(index)}
                      >
                        <span className="flex-1">{link.title}</span>
                        <span className="shrink-0">
                          <DynamicIcon name="lucide/chevron-right" size={16} />
                        </span>
                      </button>
                    );
                  }

                  if (!link.href) {
                    return null;
                  }

                  return (
                    <Pressable
                      key={`${link.title}-${index}`}
                      href={link.href}
                      className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                    >
                      <span className="flex-1">{link.title}</span>
                    </Pressable>
                  );
                })}
              </div>
              <div
                className={cn(
                  "mx-8 mt-auto flex flex-col gap-4 py-12",
                  actionsClassName,
                )}
              >
                {renderActions()}
              </div>
            </div>
          )}

          {/* Mobile Menu > Dropdown */}
          {open && activeSubmenu?.dropdownItems?.length && (
            <div
              className={cn(
                "fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden",
                mobileMenuClassName,
              )}
            >
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                {activeSubmenu.title}
              </div>
              {activeSubmenu.dropdownItems.map((item, index) => (
                <Pressable
                  key={`${item.title}-${index}`}
                  href={item.href}
                  className="flex items-start gap-4 border-b border-border px-8 py-5"
                >
                  {item.imgUrl && (
                    <div className="h-10 w-10 overflow-hidden rounded-md border border-border">
                      <Img
                        src={item.imgUrl}
                        alt={item.title}
                        className="h-full w-full object-cover object-center"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                  )}
                  {!item.imgUrl && item.icon && (
                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground">
                      <DynamicIcon name={item.icon} size={16} />
                    </div>
                  )}
                  <div>
                    <div className="text-base">{item.title}</div>
                    {item.description && (
                      <div className="text-sm text-muted-foreground">
                        {item.description}
                      </div>
                    )}
                  </div>
                </Pressable>
              ))}
            </div>
          )}
        </NavigationMenu>
      </div>
    </Section>
  );
};

export default NavbarMegaMenu;
