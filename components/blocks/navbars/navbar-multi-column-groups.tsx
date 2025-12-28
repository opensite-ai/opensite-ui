"use client";

import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img, type OptixFlowConfig } from "@page-speed/img";
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
import { Sheet, SheetContent, SheetTitle } from "../../ui/sheet";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

interface MenuLink {
  label: string;
  description?: string;
  url: string;
  icon?: string;
}

interface MenuGroup {
  title: string;
  links: MenuLink[];
}

interface MenuItem {
  title: string;
  url?: string;
  groups?: MenuGroup[];
}

interface NavButton {
  label: string;
  isPrimary: boolean;
  url: string;
}

/**
 * Props for the NavbarMultiColumnGroups component
 */
export interface NavbarMultiColumnGroupsProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  navigation?: MenuItem[];
  desktopButtons?: NavButton[];
  mobileButtons?: NavButton[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultNavigation: MenuItem[] = [
  {
    title: "Products",
    groups: [
      {
        title: "Company Blog",
        links: [
          { label: "Insights", icon: "lucide/book", description: "Company news and updates", url: "#" },
          { label: "Engineering", icon: "lucide/code", description: "Technical deep dives", url: "#" },
          { label: "Culture", icon: "lucide/users", description: "Team stories and values", url: "#" },
          { label: "Press", icon: "lucide/globe", description: "Media mentions", url: "#" },
        ],
      },
      {
        title: "Developer Tools",
        links: [
          { label: "API", icon: "lucide/monitor", description: "Access our REST API", url: "#" },
          { label: "CLI", icon: "lucide/terminal", description: "Command line tools", url: "#" },
          { label: "SDKs", icon: "lucide/code", description: "Integrate with our SDKs", url: "#" },
          { label: "Docs", icon: "lucide/book", description: "Complete documentation", url: "#" },
        ],
      },
      {
        title: "Commerce",
        links: [
          { label: "Store", icon: "lucide/shopping-cart", description: "Buy our products", url: "#" },
          { label: "Plans", icon: "lucide/database", description: "Subscription options", url: "#" },
          { label: "Mobile App", icon: "lucide/smartphone", description: "Shop on the go", url: "#" },
          { label: "Gift Cards", icon: "lucide/gift", description: "Send a gift instantly", url: "#" },
        ],
      },
    ],
  },
  {
    title: "Solutions",
    groups: [
      {
        title: "Industries",
        links: [
          { label: "E-commerce", icon: "lucide/shopping-cart", description: "Solutions for online stores", url: "#" },
          { label: "SaaS", icon: "lucide/cloud", description: "Tools for SaaS apps", url: "#" },
          { label: "Finance", icon: "lucide/shield", description: "Secure finance apps", url: "#" },
          { label: "Healthcare", icon: "lucide/heart", description: "For medical platforms", url: "#" },
        ],
      },
      {
        title: "Design System",
        links: [
          { label: "Components", icon: "lucide/layout", description: "Reusable UI parts", url: "#" },
          { label: "Tokens", icon: "lucide/settings", description: "Design tokens reference", url: "#" },
          { label: "Icons", icon: "lucide/sparkles", description: "Lucide icon library", url: "#" },
          { label: "Themes", icon: "lucide/paintbrush", description: "UI appearance presets", url: "#" },
        ],
      },
    ],
  },
  {
    title: "Platform",
    groups: [
      {
        title: "Core Services",
        links: [
          { label: "Hosting", icon: "lucide/server", description: "Reliable infrastructure", url: "#" },
          { label: "Auth", icon: "lucide/shield", description: "Secure login & roles", url: "#" },
          { label: "Database", icon: "lucide/database", description: "Scalable data storage", url: "#" },
          { label: "Edge Functions", icon: "lucide/zap", description: "Low-latency logic", url: "#" },
        ],
      },
    ],
  },
  { title: "Resources", url: "#" },
  { title: "Pricing", url: "#" },
];

const defaultDesktopButtons: NavButton[] = [
  { label: "Contact", isPrimary: false, url: "#" },
  { label: "Log in", isPrimary: false, url: "#" },
  { label: "Sign up", isPrimary: true, url: "#" },
];

const defaultMobileButtons: NavButton[] = [
  { label: "Sign up", isPrimary: true, url: "#" },
  { label: "Log in", isPrimary: false, url: "#" },
];

const MOBILE_BREAKPOINT = 1024;

/**
 * NavbarMultiColumnGroups - A navigation bar with multi-column grouped dropdown menus.
 * 
 * Features dropdown menus that display links organized into multiple columns by category.
 * Each column has a group title and a list of links with icons and descriptions. The dropdown
 * width dynamically adjusts based on the number of groups. Mobile view uses a dark-themed
 * full-screen sheet with accordion navigation and CTA buttons at the top. Ideal for SaaS
 * platforms, enterprise software, and products with many features to showcase.
 */
export const NavbarMultiColumnGroups = ({
  className,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  navigation = defaultNavigation,
  desktopButtons = defaultDesktopButtons,
  mobileButtons = defaultMobileButtons,
  optixFlowConfig,
}: NavbarMultiColumnGroupsProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleMobileMenu = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <section
        className={cn(
          "pointer-events-auto fixed top-0 z-999 flex h-16 w-full items-center justify-center bg-background",
          className,
        )}
      >
        <div className="container">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <Pressable
                href={logo.url}
                className="flex max-h-8 items-center gap-2 text-lg font-semibold tracking-tighter"
              >
                <Img
                  src={logo.src}
                  alt={logo.alt}
                  className="inline-block size-6"
                  optixFlowConfig={optixFlowConfig}
                />
                <span className="hidden md:inline-block">{logo.title}</span>
              </Pressable>
              <NavigationMenu className="hidden xl:flex" viewport={false}>
                <NavigationMenuList>
                  {navigation.map((item, index) => (
                    <DesktopMenuItem key={`desktop-link-${index}`} item={item} index={index} />
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="hidden items-center gap-3 xl:flex">
              {desktopButtons.map((btn, index) => (
                <Pressable
                  key={`navbar-btn-${index}`}
                  size="sm"
                  variant={!btn.isPrimary ? "outline" : "default"}
                  className={btn.isPrimary ? "text-primary-foreground" : "text-foreground"}
                  asButton
                  href={btn.url}
                >
                  {btn.label}
                </Pressable>
              ))}
            </div>
            <div className="xl:hidden">
              <Pressable className="size-11" variant="ghost" asButton onClick={handleMobileMenu}>
                {open ? (
                  <DynamicIcon name="lucide/x" size={22} className="stroke-foreground" />
                ) : (
                  <DynamicIcon name="lucide/menu" size={22} className="stroke-foreground" />
                )}
              </Pressable>
            </div>
          </div>
        </div>
      </section>
      <MobileNavigationMenu
        open={open}
        navigation={navigation}
        mobileButtons={mobileButtons}
      />
    </Fragment>
  );
};

interface DesktopMenuItemProps {
  item: MenuItem;
  index: number;
}

const DesktopMenuItem = ({ item, index }: DesktopMenuItemProps) => {
  if (item.groups) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
        <NavigationMenuTrigger className="h-fit bg-transparent px-2.5 font-normal text-muted-foreground">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="!rounded-xl !border !p-0">
          <ul className="flex p-2" style={{ width: item.groups.length * 248 }}>
            {item.groups.map((group, groupIndex) => (
              <li className="flex-1" key={`desktop-group-${groupIndex}`}>
                <ul>
                  <li className="px-3 py-2 text-sm leading-normal text-muted-foreground">
                    {group.title}
                  </li>
                  {group.links.map((link, linkIndex) => (
                    <li key={`desktop-links-${groupIndex}-${linkIndex}`}>
                      <NavigationMenuLink
                        asChild
                        className="group/link flex-row gap-2 px-3 py-2 transition-colors duration-200"
                      >
                        <Pressable href={link.url}>
                          <div className="flex size-8 shrink-0 rounded-lg border duration-400 fade-in group-hover/link:bg-background">
                            {link.icon && (
                              <DynamicIcon
                                name={link.icon}
                                size={16}
                                className="m-auto group-hover/link:stroke-black"
                              />
                            )}
                          </div>
                          <div className="flex flex-col gap-[2px]">
                            <div className="text-sm font-medium">{link.label}</div>
                            <div className="text-xs text-muted-foreground group-hover/link:text-foreground">
                              {link.description}
                            </div>
                          </div>
                        </Pressable>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
      <NavigationMenuLink
        href={item.url}
        className={`${navigationMenuTriggerStyle()} h-fit bg-transparent px-2.5 font-normal text-muted-foreground`}
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

interface MobileNavigationMenuProps {
  open: boolean;
  navigation: MenuItem[];
  mobileButtons: NavButton[];
}

const MobileNavigationMenu = ({ open, navigation, mobileButtons }: MobileNavigationMenuProps) => {
  return (
    <Sheet open={open}>
      <SheetContent
        aria-describedby={undefined}
        side="top"
        className="dark inset-0 z-998 h-dvh w-full bg-background pt-[3.9375rem] [&>button]:hidden"
      >
        <div className="h-full overflow-y-auto pt-10 pb-20">
          <div className="container">
            <div className="absolute -m-px h-px w-px overflow-hidden border-0 mask-clip-border p-0 text-nowrap whitespace-nowrap">
              <SheetTitle className="text-primary">Mobile Navigation</SheetTitle>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {mobileButtons.map((btn, index) => (
                  <Pressable
                    key={`navbar-btn-${index}`}
                    variant={!btn.isPrimary ? "outline" : "default"}
                    className={btn.isPrimary ? "text-primary-foreground" : "text-foreground"}
                    asButton
                    href={btn.url}
                  >
                    {btn.label}
                  </Pressable>
                ))}
              </div>
              <Accordion type="multiple" className="w-full">
                {navigation.map((item, index) => renderMobileMenuItem(item, index))}
              </Accordion>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const renderMobileMenuItem = (item: MenuItem, index: number) => {
  if (item.groups) {
    return (
      <AccordionItem key={item.title} value={`nav-${index}`} className="border-b-0">
        <AccordionTrigger className="h-[3.75rem] items-center p-0 !px-4 text-base leading-[3.75] font-normal text-muted-foreground hover:bg-muted hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="max-h-[60dvh] overflow-x-auto">
          {item.groups.flatMap((group, groupIndex) =>
            group.links.map((link, linkIndex) => (
              <Pressable
                key={`mobile-link-${groupIndex}-${linkIndex}`}
                href={link.url}
                className="flex h-12 items-center gap-2 rounded-lg px-4 text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-foreground"
              >
                {link.icon && (
                  <DynamicIcon name={link.icon} size={16} className="stroke-muted-foreground" />
                )}
                {link.label}
              </Pressable>
            )),
          )}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Pressable
      key={item.title}
      href={item.url}
      className="flex h-[3.75rem] items-center rounded-md p-0 px-4 text-left text-base leading-[3.75] font-normal text-muted-foreground ring-ring/10 outline-ring/50 transition-all hover:bg-muted focus-visible:ring-4 focus-visible:outline-1 nth-last-1:border-0"
    >
      {item.title}
    </Pressable>
  );
};

export default NavbarMultiColumnGroups;
