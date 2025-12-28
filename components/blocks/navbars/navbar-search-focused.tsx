"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img, type OptixFlowConfig } from "@page-speed/img";
import { Input } from "../../ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

interface NavItem {
  title: string;
  url: string;
}

/**
 * Props for the NavbarSearchFocused component
 */
export interface NavbarSearchFocusedProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  navItems?: NavItem[];
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  optixFlowConfig?: OptixFlowConfig;
}

const defaultNavItems: NavItem[] = [
  { title: "Explore", url: "#" },
  { title: "Categories", url: "#" },
  { title: "Trending", url: "#" },
  { title: "Collections", url: "#" },
];

/**
 * NavbarSearchFocused - A navigation bar with a prominent search input.
 * 
 * Features a centered search bar that takes up significant horizontal space, making search
 * the primary action. Navigation links are positioned to the sides of the search bar.
 * The search input expands on focus for better usability. Mobile view moves the search bar
 * below the logo and hamburger menu, with navigation in a slide-out sheet. Ideal for
 * e-commerce sites, marketplaces, documentation sites, and content-heavy platforms.
 */
export const NavbarSearchFocused = ({
  className,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  navItems = defaultNavItems,
  searchPlaceholder = "Search for anything...",
  onSearch,
  optixFlowConfig,
}: NavbarSearchFocusedProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <section className={cn("border-b bg-background", className)}>
      <div className="container">
        <nav className="flex items-center gap-4 py-3 lg:gap-8">
          {/* Logo */}
          <Pressable href={logo.url} className="flex shrink-0 items-center gap-2">
            <Img
              src={logo.src}
              alt={logo.alt}
              className="h-8"
              optixFlowConfig={optixFlowConfig}
            />
            <span className="hidden text-lg font-semibold sm:inline-block">
              {logo.title}
            </span>
          </Pressable>

          {/* Desktop Navigation - Left */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navItems.slice(0, 2).map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Pressable href={item.url}>{item.title}</Pressable>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className={cn(
              "relative flex-1 transition-all duration-300",
              isSearchFocused ? "lg:flex-[2]" : "lg:flex-1",
            )}
          >
            <div className="relative">
              <DynamicIcon
                name="lucide/search"
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="search"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="h-10 w-full rounded-full border-muted-foreground/20 bg-muted/50 pl-10 pr-4 transition-all duration-300 focus:bg-background focus:ring-2 focus:ring-primary/20"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <DynamicIcon name="lucide/x" size={16} />
                </button>
              )}
            </div>
          </form>

          {/* Desktop Navigation - Right */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navItems.slice(2).map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Pressable href={item.url}>{item.title}</Pressable>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Actions */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Pressable variant="ghost" size="icon" asButton href="#">
              <DynamicIcon name="lucide/heart" size={20} />
              <span className="sr-only">Favorites</span>
            </Pressable>
            <Pressable variant="ghost" size="icon" asButton href="#">
              <DynamicIcon name="lucide/shopping-cart" size={20} />
              <span className="sr-only">Cart</span>
            </Pressable>
            <Pressable variant="ghost" size="icon" asButton href="#">
              <DynamicIcon name="lucide/user" size={20} />
              <span className="sr-only">Account</span>
            </Pressable>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Pressable variant="ghost" size="icon" asButton onClick={() => {}}>
                <DynamicIcon name="lucide/menu" size={20} />
                <span className="sr-only">Toggle menu</span>
              </Pressable>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 pt-8">
                <div className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <Pressable
                      key={index}
                      href={item.url}
                      className="flex items-center gap-2 rounded-md py-2 text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Pressable>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <div className="flex flex-col gap-2">
                    <Pressable
                      href="#"
                      className="flex items-center gap-2 rounded-md py-2 text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <DynamicIcon name="lucide/heart" size={18} />
                      Favorites
                    </Pressable>
                    <Pressable
                      href="#"
                      className="flex items-center gap-2 rounded-md py-2 text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <DynamicIcon name="lucide/shopping-cart" size={18} />
                      Cart
                    </Pressable>
                    <Pressable
                      href="#"
                      className="flex items-center gap-2 rounded-md py-2 text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <DynamicIcon name="lucide/user" size={18} />
                      Account
                    </Pressable>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <Pressable asButton href="#" className="w-full">
                    Sign in
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

export default NavbarSearchFocused;
