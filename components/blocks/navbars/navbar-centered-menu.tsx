"use client";

import * as React from "react";
import { useMemo } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
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
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { type LogoConfig, type NavbarLayoutVariant } from "./types";
import { getNavbarLayoutClasses } from "./layout-variant-utils";

// Re-export shared types for backward compatibility
export type { LogoConfig } from "./types";

/**
 * Menu item interface for navigation
 * Component-specific type using 'title' and 'url' fields
 */
export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: string;
  items?: MenuItem[];
}

/**
 * Props for the NavbarCenteredMenu component
 */
export interface NavbarCenteredMenuProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the desktop nav
   */
  desktopNavClassName?: string;
  /**
   * Additional CSS classes for the mobile nav
   */
  mobileNavClassName?: string;
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
   * Layout variant for the navbar
   */
  layoutVariant?: NavbarLayoutVariant;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const NavigationMenuWithoutViewport = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) => {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Root>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <Pressable
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-foreground"
      href={item.url}
    >
      {item.icon && (
        <div className="text-muted-foreground">
          <DynamicIcon name={item.icon} size={20} className="shrink-0" />
        </div>
      )}
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Pressable>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="origin-top-center relative top-11 w-full overflow-hidden rounded-md border bg-popover shadow data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:absolute md:left-1/2 md:w-80 md:-translate-x-1/2">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-full">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink href={item.url}>
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Pressable
      key={item.title}
      href={item.url}
      className="text-md font-semibold"
    >
      {item.title}
    </Pressable>
  );
};

/**
 * NavbarCenteredMenu - A responsive navigation bar with centered navigation links and dropdown menus.
 *
 * Features a logo on the left, centered navigation menu with dropdown submenus that appear
 * directly below their parent items, and auth buttons on the right. Mobile view uses a
 * slide-out sheet with accordion navigation. The dropdowns are centered under their
 * trigger elements for a balanced visual appearance.
 */
export const NavbarCenteredMenu = ({
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
  desktopNavClassName,
  mobileNavClassName,
  navigationMenuClassName,
  actionsClassName,
  layoutVariant = "fullScreenContainerizedLinks",
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarCenteredMenuProps) => {
  const renderLogo = useMemo(() => {
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
  }, [logoSlot, logo, logoClassName, optixFlowConfig]);

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

  const renderMenu = useMemo(() => {
    if (menuSlot) return menuSlot;
    if (!menu || menu.length === 0) return null;

    return menu.map((item) => renderMenuItem(item));
  }, [menuSlot, menu]);

  const renderMobileMenu = useMemo(() => {
    if (menuSlot) return menuSlot;
    if (!menu || menu.length === 0) return null;

    return menu.map((item) => renderMobileMenuItem(item));
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
              className={cn("hidden justify-between lg:flex", desktopNavClassName)}
            >
          {/* Logo */}
          {renderLogo}
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <NavigationMenuWithoutViewport
                className={navigationMenuClassName}
              >
                <NavigationMenuList className="relative">
                  {renderMenu}
                </NavigationMenuList>
              </NavigationMenuWithoutViewport>
            </div>
          </div>
          <div className={cn("flex gap-2", actionsClassName)}>
            {renderAuthActions}
          </div>
        </nav>

          {/* Mobile Menu */}
          <div className={cn("block lg:hidden", mobileNavClassName)}>
            <div className="flex items-center justify-between">
              {renderLogo}
              <Sheet>
                <SheetTrigger asChild>
                  <Pressable
                    variant="outline"
                    size="icon"
                    asButton
                    onClick={() => {}}
                  >
                    <DynamicIcon name="lucide/menu" size={16} />
                  </Pressable>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>{renderLogo}</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {renderMobileMenu}
                    </Accordion>

                    <div className={cn("flex flex-col gap-3", actionsClassName)}>
                      {renderAuthActions}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NavbarCenteredMenu;
