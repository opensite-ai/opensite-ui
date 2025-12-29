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
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

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

const defaultMenu: MenuItem[] = [
  {
    title: "Products",
    items: [
      { title: "Dashboard", url: "#", description: "Monitor your metrics", icon: "lucide/layout-dashboard" },
      { title: "Analytics", url: "#", description: "Deep insights", icon: "lucide/bar-chart-3" },
      { title: "Reports", url: "#", description: "Generate reports", icon: "lucide/file-text" },
      { title: "Settings", url: "#", description: "Configure options", icon: "lucide/settings" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { title: "Enterprise", url: "#", description: "For large teams", icon: "lucide/building-2" },
      { title: "Startups", url: "#", description: "For growing companies", icon: "lucide/rocket" },
      { title: "Agencies", url: "#", description: "For creative teams", icon: "lucide/palette" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Documentation", url: "#", description: "Guides and references", icon: "lucide/book" },
      { title: "Blog", url: "#", description: "Latest updates", icon: "lucide/newspaper" },
      { title: "Community", url: "#", description: "Join discussions", icon: "lucide/users" },
    ],
  },
  { title: "Pricing", url: "#" },
  { title: "Contact", url: "#" },
];

const defaultMobileExtraLinks = [
  { title: "Help Center", url: "#" },
  { title: "API Status", url: "#" },
  { title: "Terms of Service", url: "#" },
];

const defaultAuthActions: ActionConfig[] = [
  { label: "Log in", href: "#", variant: "ghost", size: "default" },
  { label: "Sign up", href: "#", variant: "default", size: "default" },
];

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
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  logoSlot,
  logoClassName,
  menu = defaultMenu,
  menuSlot,
  mobileExtraLinks = defaultMobileExtraLinks,
  mobileExtraLinksSlot,
  authActions = defaultAuthActions,
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
}: NavbarSidebarMobileProps) => {
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

    return menu;
  };

  const renderMobileExtraLinks = () => {
    if (mobileExtraLinksSlot) return mobileExtraLinksSlot;
    if (!mobileExtraLinks || mobileExtraLinks.length === 0) return null;

    return mobileExtraLinks;
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
        <nav className={cn("flex items-center justify-between py-4", navClassName)}>
          <div className="flex items-center gap-8">
            {renderLogo()}

            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {menu.map((item, index) =>
                  item.items ? (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                          {item.items.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <NavigationMenuLink asChild>
                                <Pressable
                                  href={subItem.url}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="flex items-center gap-2">
                                    {subItem.icon && (
                                      <DynamicIcon name={subItem.icon} size={16} />
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
                        <Pressable href={item.url}>{item.title}</Pressable>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Pressable variant="ghost" asButton href="#">
              Log in
            </Pressable>
            <Pressable asButton href="#">
              Sign up
            </Pressable>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Pressable variant="outline" size="icon" asButton onClick={() => {}}>
                <DynamicIcon name="lucide/menu" size={20} />
                <span className="sr-only">Toggle menu</span>
              </Pressable>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b pb-4">
                  <Pressable href={logo.url} className="flex items-center gap-2">
                    <Img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-6"
                      optixFlowConfig={optixFlowConfig}
                    />
                    <span className="font-semibold">{logo.title}</span>
                  </Pressable>
                </div>

                <div className="flex-1 overflow-y-auto py-4">
                  <Accordion type="single" collapsible className="w-full">
                    {menu.map((item, index) =>
                      item.items ? (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-base hover:no-underline">
                            {item.title}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col space-y-2 pl-4">
                              {item.items.map((subItem, subIndex) => (
                                <Pressable
                                  key={subIndex}
                                  href={subItem.url}
                                  className="flex items-center gap-2 rounded-md py-2 text-sm text-muted-foreground hover:text-foreground"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.icon && (
                                    <DynamicIcon name={subItem.icon} size={14} />
                                  )}
                                  {subItem.title}
                                </Pressable>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ) : (
                        <div key={index} className="border-b py-4">
                          <Pressable
                            href={item.url}
                            className="text-base font-medium"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.title}
                          </Pressable>
                        </div>
                      ),
                    )}
                  </Accordion>
                </div>

                <div className="border-t pt-4">
                  <div className="flex flex-col gap-2">
                    <Pressable variant="outline" asButton href="#" className="w-full">
                      Log in
                    </Pressable>
                    <Pressable asButton href="#" className="w-full">
                      Sign up
                    </Pressable>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {mobileExtraLinks.map((link, index) => (
                      <Pressable
                        key={index}
                        href={link.url}
                        className="text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </Pressable>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default NavbarSidebarMobile;
