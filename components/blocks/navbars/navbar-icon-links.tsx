"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img, type OptixFlowConfig } from "@page-speed/img";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

interface NavItem {
  title: string;
  url: string;
  icon: string;
}

/**
 * Props for the NavbarIconLinks component
 */
export interface NavbarIconLinksProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  navItems?: NavItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultNavItems: NavItem[] = [
  { title: "Dashboard", url: "#", icon: "lucide/layout-dashboard" },
  { title: "Analytics", url: "#", icon: "lucide/bar-chart-3" },
  { title: "Projects", url: "#", icon: "lucide/folder" },
  { title: "Messages", url: "#", icon: "lucide/message-square" },
  { title: "Settings", url: "#", icon: "lucide/settings" },
];

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
  className,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  navItems = defaultNavItems,
  optixFlowConfig,
}: NavbarIconLinksProps) => {
  const [activeItem, setActiveItem] = useState(navItems[0]?.title || "");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={cn("border-b bg-background", className)}>
      <div className="container">
        <nav className="flex items-center justify-between py-3">
          <div className="flex items-center gap-6">
            <Pressable href={logo.url} className="flex items-center gap-2">
              <Img
                src={logo.src}
                alt={logo.alt}
                className="h-8"
                optixFlowConfig={optixFlowConfig}
              />
              <span className="text-lg font-semibold">{logo.title}</span>
            </Pressable>

            <TooltipProvider delayDuration={0}>
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList className="gap-1">
                  {navItems.map((item, index) => (
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

          <div className="hidden items-center gap-2 lg:flex">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Pressable variant="ghost" size="icon" asButton href="#">
                    <DynamicIcon name="lucide/bell" size={20} />
                    <span className="sr-only">Notifications</span>
                  </Pressable>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Pressable variant="ghost" size="icon" asButton href="#">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-sm font-medium">JD</span>
              </div>
              <span className="sr-only">Profile</span>
            </Pressable>
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
                {navItems.map((item, index) => (
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
                  <Pressable
                    href="#"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    <DynamicIcon name="lucide/bell" size={18} />
                    Notifications
                  </Pressable>
                  <Pressable
                    href="#"
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    <DynamicIcon name="lucide/user" size={18} />
                    Profile
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

export default NavbarIconLinks;
