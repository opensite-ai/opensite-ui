"use client";

import * as React from "react";
import { useState, useEffect } from "react";
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
  icon?: string;
}

interface MenuItem {
  title: string;
  url?: string;
  items?: SubMenuItem[];
}

/**
 * Props for the NavbarStickyCompact component
 */
export interface NavbarStickyCompactProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultMenu: MenuItem[] = [
  {
    title: "Features",
    items: [
      { title: "Analytics", url: "#", icon: "lucide/bar-chart-3" },
      { title: "Automation", url: "#", icon: "lucide/zap" },
      { title: "Integrations", url: "#", icon: "lucide/puzzle" },
      { title: "Security", url: "#", icon: "lucide/shield" },
    ],
  },
  {
    title: "Solutions",
    items: [
      { title: "For Teams", url: "#", icon: "lucide/users" },
      { title: "For Enterprise", url: "#", icon: "lucide/building-2" },
      { title: "For Startups", url: "#", icon: "lucide/rocket" },
    ],
  },
  { title: "Pricing", url: "#" },
  { title: "Docs", url: "#" },
];

/**
 * NavbarStickyCompact - A compact sticky navigation bar that shrinks on scroll.
 * 
 * Features a standard-height navigation bar that compresses to a more compact size when
 * the user scrolls down. The logo shrinks and padding reduces to maximize content space
 * while maintaining navigation accessibility. Desktop view shows dropdown menus with icons.
 * Mobile view uses a slide-out sheet from the right. Ideal for content-heavy sites where
 * vertical space is valuable.
 */
export const NavbarStickyCompact = ({
  className,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  menu = defaultMenu,
  optixFlowConfig,
}: NavbarStickyCompactProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={cn(
        "fixed top-0 left-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm transition-all duration-300",
        isScrolled ? "shadow-sm" : "",
        className,
      )}
    >
      <div className="container">
        <nav
          className={cn(
            "flex items-center justify-between transition-all duration-300",
            isScrolled ? "h-14" : "h-16",
          )}
        >
          <Pressable href={logo.url} className="flex items-center gap-2">
            <Img
              src={logo.src}
              alt={logo.alt}
              className={cn(
                "transition-all duration-300",
                isScrolled ? "h-6" : "h-8",
              )}
              optixFlowConfig={optixFlowConfig}
            />
            <span
              className={cn(
                "font-semibold transition-all duration-300",
                isScrolled ? "text-base" : "text-lg",
              )}
            >
              {logo.title}
            </span>
          </Pressable>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {menu.map((item, index) =>
                item.items ? (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger
                      className={cn(
                        "transition-all duration-300",
                        isScrolled ? "h-8 text-sm" : "h-10",
                      )}
                    >
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-1 p-2">
                        {item.items.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <NavigationMenuLink asChild>
                              <Pressable
                                href={subItem.url}
                                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                              >
                                {subItem.icon && (
                                  <DynamicIcon name={subItem.icon} size={16} />
                                )}
                                {subItem.title}
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
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "transition-all duration-300",
                        isScrolled ? "h-8 text-sm" : "h-10",
                      )}
                    >
                      <Pressable href={item.url}>{item.title}</Pressable>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden items-center gap-2 lg:flex">
            <Pressable
              variant="ghost"
              size={isScrolled ? "sm" : "default"}
              asButton
              href="#"
              className="transition-all duration-300"
            >
              Log in
            </Pressable>
            <Pressable
              size={isScrolled ? "sm" : "default"}
              asButton
              href="#"
              className="transition-all duration-300"
            >
              Sign up
            </Pressable>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Pressable
                variant="ghost"
                size={isScrolled ? "sm" : "icon"}
                asButton
                onClick={() => {}}
                className="transition-all duration-300"
              >
                <DynamicIcon name="lucide/menu" size={isScrolled ? 18 : 20} />
                <span className="sr-only">Toggle menu</span>
              </Pressable>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-4 pt-8">
                {menu.map((item, index) =>
                  item.items ? (
                    <div key={index} className="space-y-2">
                      <div className="text-sm font-medium text-muted-foreground">
                        {item.title}
                      </div>
                      <div className="flex flex-col gap-1 pl-2">
                        {item.items.map((subItem, subIndex) => (
                          <Pressable
                            key={subIndex}
                            href={subItem.url}
                            className="flex items-center gap-2 rounded-md py-2 text-sm hover:text-foreground"
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
                      className="text-sm font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Pressable>
                  ),
                )}
                <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                  <Pressable variant="outline" asButton href="#" className="w-full">
                    Log in
                  </Pressable>
                  <Pressable asButton href="#" className="w-full">
                    Sign up
                  </Pressable>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default NavbarStickyCompact;
