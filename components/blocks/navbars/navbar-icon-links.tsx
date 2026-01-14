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
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

interface NavItem {
  title: string;
  url: string;
  icon: string;
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
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
  },
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
  background = "white",
  spacing = "none",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarIconLinksProps) => {
  const [activeItem, setActiveItem] = useState(navItems?.[0]?.title || "");
  const [isOpen, setIsOpen] = useState(false);

  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    return (
      <Pressable href={logo.url || "/"} className={cn("flex items-center gap-2", logoClassName)}>
        {logo.src && (
          <Img
            src={logo.src}
            className={cn("h-8", logo.className)}
            alt={logo.alt || "Logo"}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        {logo.title && (
          typeof logo.title === "string" ? (
            <span className="text-lg font-semibold">
              {logo.title}
            </span>
          ) : (
            logo.title
          )
        )}
      </Pressable>
    );
  };

  const renderAuthActions = () => {
    if (authActionsSlot) return authActionsSlot;
    if (!authActions || authActions.length === 0) return null;

    return authActions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <TooltipProvider delayDuration={0} key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Pressable
                asButton
                className={actionClassName}
                {...pressableProps}
              >
                {children ?? (
                  <>
                    {icon}
                    {label && <span className="sr-only">{label}</span>}
                    {iconAfter}
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
  };

  const renderNavItems = (): NavItem[] | null => {
    if (navItemsSlot) return null;
    if (!navItems || navItems.length === 0) return null;

    return navItems;
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn("border-b", className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <nav className={cn("flex items-center justify-between py-3", navClassName)}>
          <div className="flex items-center gap-6">
            {renderLogo()}

            <TooltipProvider delayDuration={0}>
              <NavigationMenu className={cn("hidden lg:flex", navigationMenuClassName)}>
                <NavigationMenuList className="gap-1">
                  {navItemsSlot ? navItemsSlot : renderNavItems()?.map((item, index) => (
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
                              <span className="sr-only">{item.title}</span>
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

          <div className={cn("hidden items-center gap-2 lg:flex", actionsClassName)}>
            {renderAuthActions()}
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Pressable variant="ghost" size="icon" asButton onClick={() => {}}>
                <DynamicIcon name="lucide/menu" size={20} />
                <span className="sr-only">Toggle menu</span>
              </Pressable>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-4 pt-8">
                {navItemsSlot ? navItemsSlot : renderNavItems()?.map((item, index) => (
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
                <div className="mt-4 border-t pt-4">
                  {authActions?.map((action, index) => (
                    <Pressable
                      key={index}
                      href={action.href}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsOpen(false)}
                    >
                      {action.icon}
                      {action.label}
                    </Pressable>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </Section>
  );
};

export default NavbarIconLinks;
