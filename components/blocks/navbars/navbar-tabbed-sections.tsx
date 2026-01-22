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
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  logoPlaceholders,
  imagePlaceholders,
} from "../../../lib/mediaPlaceholders";
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

interface TabItem {
  id: string;
  title: string;
  icon?: string;
  links: {
    title: string;
    description?: string;
    url: string;
    icon?: string;
  }[];
  featured?: {
    title: string;
    description: string;
    url: string;
    image: string;
  };
}

interface MenuItem {
  title: string;
  url?: string;
  tabs?: TabItem[];
}

/**
 * Props for the NavbarTabbedSections component
 */
export interface NavbarTabbedSectionsProps {
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
 * NavbarTabbedSections - A navigation bar with tabbed dropdown menus for organized content.
 *
 * Features dropdown menus that use tabs to organize content into distinct sections. Each tab
 * displays a list of links with icons and descriptions, and optionally a featured content card
 * with an image. The tabs allow users to quickly switch between different categories within
 * the same dropdown. Mobile view uses a slide-out sheet with expandable sections. Ideal for
 * products with many features organized into logical categories.
 */
export const NavbarTabbedSections = ({
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
  },
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
  background = "white",
  spacing = "none",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarTabbedSectionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

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
            className={cn("h-8", logo.className)}
            alt={logo.alt || "Logo"}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        {logo.title &&
          (typeof logo.title === "string" ? (
            <span className="text-lg font-semibold">{logo.title}</span>
          ) : (
            logo.title
          ))}
      </Pressable>
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

  const renderMenu = () => {
    if (menuSlot) return menuSlot;
    if (!menu || menu.length === 0) return null;

    return menu.map((item, index) =>
      item.tabs ? (
        <NavigationMenuItem key={index}>
          <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <Tabs defaultValue={item.tabs[0]?.id} className="w-[600px]">
              <div className="border-b px-4 pt-2">
                <TabsList className="h-auto bg-transparent p-0">
                  {item.tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      <div className="flex items-center gap-2">
                        {tab.icon && <DynamicIcon name={tab.icon} size={16} />}
                        {tab.title}
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              {item.tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-0 p-4">
                  <div className="flex gap-6">
                    <div className="flex-1 space-y-1">
                      {tab.links.map((link, linkIndex) => (
                        <NavigationMenuLink key={linkIndex} asChild>
                          <Pressable
                            href={link.url}
                            className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
                          >
                            {link.icon && (
                              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-background">
                                <DynamicIcon name={link.icon} size={16} />
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-medium">
                                {link.title}
                              </div>
                              {link.description && (
                                <p className="text-xs text-muted-foreground">
                                  {link.description}
                                </p>
                              )}
                            </div>
                          </Pressable>
                        </NavigationMenuLink>
                      ))}
                    </div>
                    {tab.featured && (
                      <div className="w-[200px] shrink-0">
                        <NavigationMenuLink asChild>
                          <Pressable
                            href={tab.featured.url}
                            className="group block overflow-hidden rounded-lg border"
                          >
                            <div className="aspect-video overflow-hidden">
                              <Img
                                src={tab.featured.image}
                                alt={tab.featured.title}
                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                optixFlowConfig={optixFlowConfig}
                              />
                            </div>
                            <div className="p-3">
                              <div className="text-sm font-medium">
                                {tab.featured.title}
                              </div>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {tab.featured.description}
                              </p>
                            </div>
                          </Pressable>
                        </NavigationMenuLink>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </NavigationMenuContent>
        </NavigationMenuItem>
      ) : (
        <NavigationMenuItem key={index}>
          <NavigationMenuLink asChild>
            <Pressable
              href={item.url}
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
            >
              {item.title}
            </Pressable>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ),
    );
  };

  const renderMobileMenu = () => {
    if (menuSlot) return menuSlot;
    if (!menu || menu.length === 0) return null;

    return menu.map((item, index) =>
      item.tabs ? (
        <div key={index} className="space-y-3">
          <div className="text-sm font-semibold">{item.title}</div>
          {item.tabs.map((tab) => (
            <div key={tab.id} className="space-y-1 pl-2">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                {tab.icon && <DynamicIcon name={tab.icon} size={14} />}
                {tab.title}
              </div>
              <div className="flex flex-col gap-1 pl-4">
                {tab.links.map((link, linkIndex) => (
                  <Pressable
                    key={linkIndex}
                    href={link.url}
                    className="flex items-center gap-2 rounded-md py-1.5 text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.icon && <DynamicIcon name={link.icon} size={14} />}
                    {link.title}
                  </Pressable>
                ))}
              </div>
            </div>
          ))}
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
  };

  // Get layout classes based on variant
  const {
    sectionClasses,
    containerWrapperClasses,
    innerContainerClasses,
    navWrapperClasses,
    spacingOverride,
  } = getNavbarLayoutClasses(layoutVariant, { className, containerClassName });

  return (
    <Section
      background={background}
      spacing={spacingOverride ?? spacing}
      className={sectionClasses}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={containerWrapperClasses}>
        <div className={cn(innerContainerClasses, navWrapperClasses)}>
          <nav
            className={cn("flex items-center justify-between py-4", navClassName)}
          >
          <div className="flex items-center gap-8">
            {renderLogo()}

            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>{renderMenu()}</NavigationMenuList>
            </NavigationMenu>
          </div>

          <div
            className={cn(
              "hidden items-center gap-2 lg:flex",
              actionsClassName,
            )}
          >
            {renderAuthActions()}
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Pressable
                variant="ghost"
                size="icon"
                asButton
                onClick={() => {}}
              >
                <DynamicIcon name="lucide/menu" size={20} />
                <span className="sr-only">Toggle menu</span>
              </Pressable>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-4 pt-8">
                {renderMobileMenu()}
                <div
                  className={cn(
                    "mt-4 flex flex-col gap-2 border-t pt-4",
                    actionsClassName,
                  )}
                >
                  {renderAuthActions()}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
        </div>
      </div>
    </Section>
  );
};

export default NavbarTabbedSections;
