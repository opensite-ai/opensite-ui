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
} from "../../ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { logoPlaceholders, imagePlaceholders } from "../../../lib/mediaPlaceholders";

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
    title: "Products",
    tabs: [
      {
        id: "platform",
        title: "Platform",
        icon: "lucide/layers",
        links: [
          { title: "Dashboard", description: "Monitor your metrics", url: "#", icon: "lucide/layout-dashboard" },
          { title: "Analytics", description: "Deep insights", url: "#", icon: "lucide/bar-chart-3" },
          { title: "Automation", description: "Streamline workflows", url: "#", icon: "lucide/zap" },
        ],
        featured: {
          title: "New: AI Assistant",
          description: "Supercharge your productivity with AI-powered features",
          url: "#",
          image: imagePlaceholders[0],
        },
      },
      {
        id: "tools",
        title: "Tools",
        icon: "lucide/wrench",
        links: [
          { title: "Editor", description: "Visual editing tools", url: "#", icon: "lucide/edit" },
          { title: "Templates", description: "Pre-built templates", url: "#", icon: "lucide/layout-template" },
          { title: "Plugins", description: "Extend functionality", url: "#", icon: "lucide/puzzle" },
        ],
      },
      {
        id: "integrations",
        title: "Integrations",
        icon: "lucide/plug",
        links: [
          { title: "Slack", description: "Team communication", url: "#", icon: "lucide/message-square" },
          { title: "GitHub", description: "Code management", url: "#", icon: "lucide/github" },
          { title: "Figma", description: "Design collaboration", url: "#", icon: "lucide/figma" },
        ],
      },
    ],
  },
  {
    title: "Solutions",
    tabs: [
      {
        id: "by-team",
        title: "By Team",
        icon: "lucide/users",
        links: [
          { title: "Engineering", description: "For dev teams", url: "#", icon: "lucide/code" },
          { title: "Marketing", description: "For marketers", url: "#", icon: "lucide/megaphone" },
          { title: "Sales", description: "For sales teams", url: "#", icon: "lucide/trending-up" },
        ],
      },
      {
        id: "by-size",
        title: "By Size",
        icon: "lucide/building",
        links: [
          { title: "Startups", description: "For growing companies", url: "#", icon: "lucide/rocket" },
          { title: "Enterprise", description: "For large orgs", url: "#", icon: "lucide/building-2" },
        ],
      },
    ],
  },
  { title: "Pricing", url: "#" },
  { title: "Docs", url: "#" },
];

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
  className,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  menu = defaultMenu,
  optixFlowConfig,
}: NavbarTabbedSectionsProps) => {
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
                                          <div className="text-sm font-medium">{link.title}</div>
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
                                          <div className="text-sm font-medium">{tab.featured.title}</div>
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
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Pressable variant="ghost" asButton href="#">
              Log in
            </Pressable>
            <Pressable asButton href="#">
              Get Started
            </Pressable>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Pressable variant="ghost" size="icon" asButton onClick={() => {}}>
                <DynamicIcon name="lucide/menu" size={20} />
                <span className="sr-only">Toggle menu</span>
              </Pressable>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-4 pt-8">
                {menu.map((item, index) =>
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
                )}
                <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                  <Pressable variant="outline" asButton href="#" className="w-full">
                    Log in
                  </Pressable>
                  <Pressable asButton href="#" className="w-full">
                    Get Started
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

export default NavbarTabbedSections;
