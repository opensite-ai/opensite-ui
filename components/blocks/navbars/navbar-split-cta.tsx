"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img, type OptixFlowConfig } from "@page-speed/img";
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
 * Props for the NavbarSplitCta component
 */
export interface NavbarSplitCtaProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  primaryCta?: {
    label: string;
    url: string;
  };
  secondaryCta?: {
    label: string;
    url: string;
  };
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
  className,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  menu = defaultMenu,
  primaryCta = { label: "Start Free Trial", url: "#" },
  secondaryCta = { label: "Book Demo", url: "#" },
  optixFlowConfig,
}: NavbarSplitCtaProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={cn("border-b bg-background", className)}>
      <div className="container">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Pressable href={logo.url} className="flex items-center gap-2">
              <Img
                src={logo.src}
                alt={logo.alt}
                className="h-8"
                optixFlowConfig={optixFlowConfig}
              />
              <span className="text-lg font-semibold">{logo.title}</span>
            </Pressable>

            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {menu.map((item, index) =>
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
                  ),
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Pressable variant="outline" asButton href={secondaryCta.url}>
              {secondaryCta.label}
            </Pressable>
            <Pressable asButton href={primaryCta.url}>
              {primaryCta.label}
              <DynamicIcon name="lucide/arrow-right" size={16} className="ml-1" />
            </Pressable>
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
                  <Pressable asButton href={primaryCta.url} className="w-full">
                    {primaryCta.label}
                    <DynamicIcon name="lucide/arrow-right" size={16} className="ml-1" />
                  </Pressable>
                  <Pressable variant="outline" asButton href={secondaryCta.url} className="w-full">
                    {secondaryCta.label}
                  </Pressable>
                </div>
                <div className="border-t pt-4">
                  {menu.map((item, index) =>
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
                    ),
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default NavbarSplitCta;
