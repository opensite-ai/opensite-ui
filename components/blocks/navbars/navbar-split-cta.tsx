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
 * Props for the NavbarSplitCta component
 */
export interface NavbarSplitCtaProps {
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
   * Primary CTA configuration (deprecated - use authActions instead)
   * @deprecated
   */
  primaryCta?: {
    label: string;
    url: string;
  };
  /**
   * Secondary CTA configuration (deprecated - use authActions instead)
   * @deprecated
   */
  secondaryCta?: {
    label: string;
    url: string;
  };
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
    title: "Product",
    items: [
      { title: "Features", url: "#", description: "Explore all features", icon: "lucide/sparkles" },
      { title: "Integrations", url: "#", description: "Connect your tools", icon: "lucide/puzzle" },
      { title: "API", url: "#", description: "Build with our API", icon: "lucide/code" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { title: "Enterprise", url: "#", description: "For large organizations", icon: "lucide/building-2" },
      { title: "Small Business", url: "#", description: "For growing teams", icon: "lucide/store" },
      { title: "Developers", url: "#", description: "For technical teams", icon: "lucide/terminal" },
    ],
  },
  { title: "Pricing", url: "#" },
  { title: "Resources", url: "#" },
];

const defaultAuthActions: ActionConfig[] = [
  { label: "Book Demo", href: "#", variant: "outline", size: "default" },
  { label: "Start Free Trial", href: "#", variant: "default", size: "default", iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} className="ml-1" /> },
];

/**
 * NavbarSplitCta - A navigation bar with split primary and secondary call-to-action buttons.
 *
 * Features a balanced layout with navigation links on the left and two distinct CTA buttons
 * on the right - a secondary outline button and a primary filled button. The dropdown menus
 * display items with icons and descriptions in a clean list format. Mobile view uses a
 * slide-out sheet with the CTAs prominently displayed at the top. Ideal for SaaS products
 * and services that want to emphasize both login/signup or demo/trial actions.
 */
export const NavbarSplitCta = ({
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
  primaryCta,
  secondaryCta,
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
}: NavbarSplitCtaProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Support legacy primaryCta/secondaryCta props
  const finalAuthActions = authActions || (primaryCta || secondaryCta ? [
    ...(secondaryCta ? [{ label: secondaryCta.label, href: secondaryCta.url, variant: "outline" as const, size: "default" as const }] : []),
    ...(primaryCta ? [{ label: primaryCta.label, href: primaryCta.url, variant: "default" as const, size: "default" as const, iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} className="ml-1" /> }] : []),
  ] : defaultAuthActions);

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
    if (!finalAuthActions || finalAuthActions.length === 0) return null;

    return finalAuthActions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action as ActionConfig;
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

  const renderMenu = (): MenuItem[] | null => {
    if (menuSlot) return null;
    if (!menu || menu.length === 0) return null;

    return menu;
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

            <NavigationMenu className={cn("hidden lg:flex", navigationMenuClassName)}>
              <NavigationMenuList>
                {menuSlot ? menuSlot : renderMenu()?.map((item, index) =>
                  item.items ? (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="w-[280px] p-2">
                          {item.items.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <NavigationMenuLink asChild>
                                <Pressable
                                  href={subItem.url}
                                  className="flex items-start gap-3 rounded-md p-3 hover:bg-accent"
                                >
                                  {subItem.icon && (
                                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border bg-background">
                                      <DynamicIcon name={subItem.icon} size={16} />
                                    </div>
                                  )}
                                  <div>
                                    <div className="text-sm font-medium">
                                      {subItem.title}
                                    </div>
                                    {subItem.description && (
                                      <p className="text-xs text-muted-foreground">
                                        {subItem.description}
                                      </p>
                                    )}
                                  </div>
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
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className={cn("hidden items-center gap-3 lg:flex", actionsClassName)}>
            {renderAuthActions()}
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Pressable variant="ghost" size="icon" asButton onClick={() => {}}>
                <DynamicIcon name="lucide/menu" size={20} />
                <span className="sr-only">Toggle menu</span>
              </Pressable>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 pt-8">
                <div className="flex flex-col gap-2">
                  {renderAuthActions()}
                </div>
                <div className="border-t pt-4">
                  {menuSlot ? menuSlot : renderMenu()?.map((item, index) =>
                    item.items ? (
                      <div key={index} className="mb-4">
                        <div className="mb-2 text-sm font-medium text-muted-foreground">
                          {item.title}
                        </div>
                        <div className="flex flex-col gap-1 pl-2">
                          {item.items.map((subItem, subIndex) => (
                            <Pressable
                              key={subIndex}
                              href={subItem.url}
                              className="flex items-center gap-2 rounded-md py-2 text-sm"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.icon && (
                                <DynamicIcon name={subItem.icon} size={14} />
                              )}
                              {subItem.title}
                            </Pressable>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Pressable
                        key={index}
                        href={item.url}
                        className="block py-2 text-sm font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Pressable>
                    )
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </Section>
  );
};

export default NavbarSplitCta;
