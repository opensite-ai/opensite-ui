"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
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
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

interface NavItem {
  name: string;
  link: string;
}

/**
 * Props for the NavbarSimpleLinks component
 */
export interface NavbarSimpleLinksProps {
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
  { name: "Home", link: "#" },
  { name: "About", link: "#" },
  { name: "Pricing", link: "#" },
  { name: "Contact", link: "#" },
];

/**
 * NavbarSimpleLinks - A minimal navigation bar with animated active indicator.
 *
 * Features a clean, simple design with horizontal navigation links and an animated
 * underline indicator that slides to show the active item. Desktop view shows all
 * links inline with a smooth sliding indicator. Mobile view uses a popover menu
 * with a left border indicator for the active item. Perfect for simple marketing
 * sites and portfolios.
 */
export const NavbarSimpleLinks = ({
  className,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  navItems = defaultNavItems,
  optixFlowConfig,
}: NavbarSimpleLinksProps) => {
  const [activeItem, setActiveItem] = useState(navItems[0]?.name || "");
  const indicatorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = document.querySelector(
        `[data-nav-item="${activeItem}"]`
      ) as HTMLElement;

      if (activeEl && indicatorRef.current && menuRef.current) {
        const menuRect = menuRef.current.getBoundingClientRect();
        const itemRect = activeEl.getBoundingClientRect();

        indicatorRef.current.style.width = `${itemRect.width}px`;
        indicatorRef.current.style.left = `${itemRect.left - menuRect.left}px`;
      }
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeItem]);

  return (
    <section className={cn("py-4", className)}>
      <nav className="container flex items-center justify-between">
        <Pressable href={logo.url} className="flex items-center gap-2">
          <Img
            src={logo.src}
            className="max-h-8 w-8"
            alt={logo.alt}
            optixFlowConfig={optixFlowConfig}
          />
          <span className="text-lg font-semibold tracking-tighter">
            {logo.title}
          </span>
        </Pressable>

        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList
            ref={menuRef}
            className="flex items-center gap-6 rounded-4xl px-8 py-3"
          >
            {navItems.map((item) => (
              <React.Fragment key={item.name}>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    data-nav-item={item.name}
                    onClick={() => setActiveItem(item.name)}
                    className={`relative cursor-pointer text-sm font-medium hover:bg-transparent ${
                      activeItem === item.name
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </React.Fragment>
            ))}
            <div
              ref={indicatorRef}
              className="absolute bottom-2 flex h-1 items-center justify-center px-2 transition-all duration-300"
            >
              <div className="h-0.5 w-full rounded-t-none bg-foreground transition-all duration-300" />
            </div>
          </NavigationMenuList>
        </NavigationMenu>

        <MobileNav
          navItems={navItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />

        <div className="hidden items-center gap-2 lg:flex">
          <Pressable
            variant="outline"
            size="sm"
            asButton
            className="h-10 py-2.5 text-sm font-normal"
            href="#"
          >
            Sign Up
          </Pressable>
        </div>
      </nav>
    </section>
  );
};

interface MobileNavProps {
  navItems: NavItem[];
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const AnimatedHamburger = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="group relative size-full">
      <div className="absolute flex size-full items-center justify-center">
        <DynamicIcon
          name="lucide/menu"
          size={24}
          className={`absolute text-muted-foreground transition-all duration-300 group-hover:text-foreground ${
            isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          }`}
        />
        <DynamicIcon
          name="lucide/x"
          size={24}
          className={`absolute text-muted-foreground transition-all duration-300 group-hover:text-foreground ${
            isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

const MobileNav = ({ navItems, activeItem, setActiveItem }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-full items-center lg:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Pressable variant="ghost" size="icon" asButton onClick={() => {}}>
            <AnimatedHamburger isOpen={isOpen} />
          </Pressable>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="relative top-4 -right-4 block w-[calc(100vw-32px)] overflow-hidden rounded-xl p-0 sm:top-auto sm:right-auto sm:w-80 lg:hidden"
        >
          <ul className="w-full bg-background py-4 text-foreground">
            {navItems.map((navItem, idx) => (
              <li key={idx}>
                <Pressable
                  href={navItem.link}
                  onClick={() => setActiveItem(navItem.name)}
                  className={`flex items-center border-l-[3px] px-6 py-4 text-sm font-medium text-foreground transition-all duration-75 ${
                    activeItem === navItem.name
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {navItem.name}
                </Pressable>
              </li>
            ))}
            <li className="flex flex-col px-7 py-2">
              <Pressable variant="outline" asButton href="#">
                Sign Up
              </Pressable>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default NavbarSimpleLinks;
