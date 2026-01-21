"use client";

import * as React from "react";
import { useState } from "react";
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
  src?: string;
  alt?: string;
  title?: React.ReactNode;
  className?: string;
}

/**
 * Props for the NavbarPlatformResources component
 */
export interface NavbarPlatformResourcesProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the navigation menu
   */
  navigationMenuClassName?: string;
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
 * NavbarPlatformResources - A navigation bar with flexible dropdown menus and action buttons.
 *
 * Supports grouped dropdowns or simple links via menuLinks, with dropdown items that can
 * display icons or images. Mobile view uses a full-screen overlay with accordion navigation.
 * Ideal for platforms that need configurable navigation and supporting resources.
 */
export const NavbarPlatformResources = ({
  className,
  containerClassName,
  navigationMenuClassName,
  navigationMenuListClassName,
  actionsClassName,
  logoClassName,
  mobileMenuClassName,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
  },
  logoSlot,
  menuLinks,
  actions,
  background = "white",
  spacing = "none",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarPlatformResourcesProps) => {
  const [open, setOpen] = useState(false);

  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    return (
      <Pressable
        href={logo.url || "/"}
        className={cn("flex items-center gap-2", logoClassName)}
      >
        {logo.src && (
          <Img
            src={logo.src}
            className={cn("max-h-8", logo.className)}
            alt={logo.alt || "Logo"}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        {logo.title &&
          (typeof logo.title === "string" ? (
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          ) : (
            logo.title
          ))}
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
      <div
        className={cn(
          "container px-4 sm:px-6 md:px-8 lg:px-40 xl:px-52",
          containerClassName,
        )}
      >
        <NavigationMenu className={cn("min-w-full", navigationMenuClassName)}>
          <div className="flex w-full items-center justify-between gap-12 py-4">
            {renderLogo()}
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
                      <NavigationMenuContent className="min-w-[640px] p-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                                <div className="text-sm font-medium text-foreground">
                                  {item.title}
                                </div>
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
                "hidden items-center gap-4 lg:flex",
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
                onClick={() => setOpen(!open)}
              >
                {!open && <DynamicIcon name="lucide/menu" size={16} />}
                {open && <DynamicIcon name="lucide/x" size={16} />}
              </Pressable>
            </div>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div
              className={cn(
                "absolute inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden",
                mobileMenuClassName,
              )}
            >
              <Accordion type="single" collapsible className="w-full">
                {menuLinks?.map((link, index) => {
                  if (hasDropdownItems(link)) {
                    return (
                      <AccordionItem
                        key={`${link.title}-${index}`}
                        value={`menu-${index}`}
                        className="border-b-2 border-dashed"
                      >
                        <AccordionTrigger className="px-2 py-4 text-left hover:no-underline">
                          {link.title}
                        </AccordionTrigger>
                        <AccordionContent className="px-2 pb-4">
                          <div className="space-y-3">
                            {link.dropdownItems?.map((item, itemIndex) => (
                              <Pressable
                                key={`${item.title}-${itemIndex}`}
                                href={item.href}
                                className="group flex items-start gap-4 rounded-lg p-2 hover:bg-muted"
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
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-foreground">
                                    {item.title}
                                  </div>
                                  {item.description && (
                                    <div className="text-xs text-muted-foreground">
                                      {item.description}
                                    </div>
                                  )}
                                </div>
                              </Pressable>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  }

                  if (!link.href) {
                    return null;
                  }

                  return (
                    <div
                      key={`${link.title}-${index}`}
                      className="border-b-2 border-dashed"
                    >
                      <Pressable
                        href={link.href}
                        className="flex w-full items-center px-2 py-4 text-left text-sm font-medium"
                      >
                        {link.title}
                      </Pressable>
                    </div>
                  );
                })}
              </Accordion>

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
        </NavigationMenu>
      </div>
    </Section>
  );
};

export default NavbarPlatformResources;
