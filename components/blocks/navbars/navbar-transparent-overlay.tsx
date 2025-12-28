"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img, type OptixFlowConfig } from "@page-speed/img";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

interface NavItem {
  title: string;
  url: string;
}

/**
 * Props for the NavbarTransparentOverlay component
 */
export interface NavbarTransparentOverlayProps {
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
  { title: "Home", url: "#" },
  { title: "About", url: "#" },
  { title: "Services", url: "#" },
  { title: "Portfolio", url: "#" },
  { title: "Contact", url: "#" },
];

/**
 * NavbarTransparentOverlay - A transparent navigation bar that transitions to solid on scroll.
 * 
 * Features a transparent background that becomes solid white/dark when the user scrolls down.
 * The logo and navigation links are visible against hero images or video backgrounds. Mobile
 * view uses a full-screen overlay menu with large, centered navigation links that animate in
 * with a staggered effect. The hamburger menu transforms into an X when open. Perfect for
 * landing pages, portfolios, and creative websites with hero sections.
 */
export const NavbarTransparentOverlay = ({
  className,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  navItems = defaultNavItems,
  optixFlowConfig,
}: NavbarTransparentOverlayProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <section className={cn("", className)}>
      <nav
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/95 shadow-sm backdrop-blur-sm"
            : "bg-transparent",
        )}
      >
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            <Pressable href={logo.url} className="z-50 flex items-center gap-2">
              <Img
                src={logo.src}
                alt={logo.alt}
                className={cn(
                  "h-8 transition-all duration-300",
                  !isScrolled && !isOpen && "brightness-0 invert",
                )}
                optixFlowConfig={optixFlowConfig}
              />
              <span
                className={cn(
                  "text-lg font-semibold transition-colors duration-300",
                  !isScrolled && !isOpen ? "text-white" : "text-foreground",
                )}
              >
                {logo.title}
              </span>
            </Pressable>

            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {navItems.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent transition-colors duration-300",
                        !isScrolled
                          ? "text-white/90 hover:text-white hover:bg-white/10"
                          : "text-foreground/80 hover:text-foreground",
                      )}
                    >
                      <Pressable href={item.url}>{item.title}</Pressable>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="hidden items-center gap-2 lg:flex">
              <Pressable
                variant="ghost"
                asButton
                href="#"
                className={cn(
                  "transition-colors duration-300",
                  !isScrolled
                    ? "text-white hover:text-white hover:bg-white/10"
                    : "",
                )}
              >
                Log in
              </Pressable>
              <Pressable
                asButton
                href="#"
                className={cn(
                  "transition-colors duration-300",
                  !isScrolled
                    ? "bg-white text-black hover:bg-white/90"
                    : "",
                )}
              >
                Get Started
              </Pressable>
            </div>

            <button
              onClick={toggleMenu}
              className={cn(
                "z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden",
              )}
              aria-label="Toggle menu"
            >
              <span
                className={cn(
                  "h-0.5 w-6 transition-all duration-300",
                  isOpen
                    ? "translate-y-2 rotate-45 bg-foreground"
                    : isScrolled
                      ? "bg-foreground"
                      : "bg-white",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-6 transition-all duration-300",
                  isOpen
                    ? "opacity-0"
                    : isScrolled
                      ? "bg-foreground"
                      : "bg-white",
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-6 transition-all duration-300",
                  isOpen
                    ? "-translate-y-2 -rotate-45 bg-foreground"
                    : isScrolled
                      ? "bg-foreground"
                      : "bg-white",
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background transition-all duration-500 lg:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div className="flex h-full flex-col items-center justify-center">
          <nav className="flex flex-col items-center gap-8">
            {navItems.map((item, index) => (
              <Pressable
                key={index}
                href={item.url}
                className={cn(
                  "text-3xl font-medium text-foreground transition-all duration-300",
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0",
                )}
                style={{
                  transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
                }}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Pressable>
            ))}
          </nav>
          <div
            className={cn(
              "mt-12 flex flex-col items-center gap-4 transition-all duration-300",
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0",
            )}
            style={{
              transitionDelay: isOpen ? `${navItems.length * 100}ms` : "0ms",
            }}
          >
            <Pressable
              variant="outline"
              asButton
              href="#"
              className="min-w-[200px]"
              onClick={() => setIsOpen(false)}
            >
              Log in
            </Pressable>
            <Pressable
              asButton
              href="#"
              className="min-w-[200px]"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Pressable>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavbarTransparentOverlay;
