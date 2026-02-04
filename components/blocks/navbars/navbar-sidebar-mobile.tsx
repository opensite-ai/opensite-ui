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

interface SubMenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: string;
}

interface MenuItem {
  title: string;
  url?: string;
  items?: SubMenuItem[];
}

/**
 * Props for the NavbarSidebarMobile component
 */
export interface NavbarSidebarMobileProps {
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
   * Extra links shown in mobile sidebar footer
   */
  mobileExtraLinks?: { title: string; url: string }[];
  /**
   * Custom slot for mobile extra links
   */
  mobileExtraLinksSlot?: React.ReactNode;
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
 * NavbarSidebarMobile - A navigation bar with a slide-out sidebar for mobile devices.
 *
 * Features a standard horizontal navigation menu on desktop with dropdown menus containing
 * icons, titles, and descriptions for each item. Mobile view uses a slide-out sidebar from
 * the left with accordion navigation and additional footer links. The sidebar includes a
 * header with logo and close button. Ideal for applications that need a more app-like
 * mobile navigation experience.
 */
export const NavbarSidebarMobile = ({
  logo,
  logoSlot,
  logoClassName,
  menu,
  menuSlot,
  mobileExtraLinks,
  mobileExtraLinksSlot,
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
}: NavbarSidebarMobileProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const MOBILE_BREAKPOINT = 1024;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

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

  const renderMenu = (): MenuItem[] | null => {
    if (menuSlot) return null;
    if (!menu || menu.length === 0) return null;

    return menu;
  };

  const renderMobileExtraLinks = ():
    | { title: string; url: string }[]
    | null => {
    if (mobileExtraLinksSlot) return null;
    if (!mobileExtraLinks || mobileExtraLinks.length === 0) return null;

    return mobileExtraLinks;
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
                    viewport={false}
                  >
                    <NavigationMenuList>
                      {menuSlot
                        ? menuSlot
                        : renderMenu()?.map((item, index) =>
                            item.items ? (
                              <NavigationMenuItem key={index}>
                                <NavigationMenuTrigger>
                                  {item.title}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                                    {item.items.map((subItem, subIndex) => (
                                      <li key={subIndex}>
                                        <NavigationMenuLink asChild>
                                          <Pressable
                                            href={subItem.url}
                                            className="block w-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                                          >
                                            <div className="flex items-center gap-2">
                                              {subItem.icon && (
                                                <DynamicIcon
                                                  name={subItem.icon}
                                                  size={16}
                                                />
                                              )}
                                              <div className="text-sm font-medium leading-none">
                                                {subItem.title}
                                              </div>
                                            </div>
                                            {subItem.description && (
                                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                {subItem.description}
                                              </p>
                                            )}
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
                    "hidden items-center gap-2 lg:flex",
                    actionsClassName,
                  )}
                >
                  {renderAuthActions}
                </div>

                <div className="lg:hidden">
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
        mobileExtraLinks={mobileExtraLinks}
        mobileExtraLinksSlot={mobileExtraLinksSlot}
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
  mobileExtraLinks?: { title: string; url: string }[];
  mobileExtraLinksSlot?: React.ReactNode;
}

const MobileNavigationMenu = ({
  open,
  setOpen,
  menu,
  menuSlot,
  authActions,
  authActionsSlot,
  mobileExtraLinks,
  mobileExtraLinksSlot,
}: MobileNavigationMenuProps) => {
  const renderMobileAuthActions = useMemo(() => {
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
  }, [authActionsSlot, authActions]);

  const renderMobileExtraLinks = useMemo(() => {
    if (mobileExtraLinksSlot) return mobileExtraLinksSlot;
    if (!mobileExtraLinks || mobileExtraLinks.length === 0) return null;

    return (
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {mobileExtraLinks.map((link, index) => (
          <Pressable
            key={index}
            href={link.url}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            {link.title}
          </Pressable>
        ))}
      </div>
    );
  }, [mobileExtraLinksSlot, mobileExtraLinks]);

  return (
    <NavbarMobileMenu
      open={open}
      onClose={() => setOpen(false)}
      title="Navigation Menu"
    >
      <div className="max-w-screen-sm mx-auto">
        <div className="flex flex-col gap-6">
          <Accordion type="single" collapsible className="w-full">
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
                      className="flex h-15 items-center rounded-md p-0 px-4 text-left text-base leading-[3.75] font-normal text-muted-foreground ring-ring/10 outline-ring/50 transition-all hover:bg-muted focus-visible:ring-4 focus-visible:outline-1 nth-last-1:border-0"
                    >
                      {item.title}
                    </Pressable>
                  ),
                )}
          </Accordion>
          {renderMobileAuthActions}
          {renderMobileExtraLinks}
        </div>
      </div>
    </NavbarMobileMenu>
  );
};

export default NavbarSidebarMobile;
