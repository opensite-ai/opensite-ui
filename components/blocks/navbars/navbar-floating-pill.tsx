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
} from "../../ui/navigation-menu";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

interface DropdownItem {
  title: string;
  href: string;
  description: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdownItems?: DropdownItem[];
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
 * Props for the NavbarFloatingPill component
 */
export interface NavbarFloatingPillProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the pill navigation wrapper
   */
  pillWrapperClassName?: string;
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
  items?: NavItem[];
  /**
   * Custom slot for menu items (overrides items array)
   */
  menuSlot?: React.ReactNode;
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
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * NavbarFloatingPill - A floating pill-shaped navigation bar with glassmorphism effect.
 *
 * Features a centered, rounded pill design with semi-transparent background and backdrop blur.
 * Positioned absolutely at the top of the viewport. Includes dropdown menus with smooth
 * animations and a collapsible mobile menu. Perfect for landing pages and modern marketing
 * sites where the navbar should float over hero content.
 */
export const NavbarFloatingPill = ({
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
  },
  logoSlot,
  logoClassName,
  items,
  menuSlot,
  authActions,
  authActionsSlot,
  className,
  containerClassName,
  pillWrapperClassName,
  navigationMenuClassName,
  actionsClassName,
  background = "white",
  spacing = "none",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarFloatingPillProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    return (
      <Pressable
        href={logo.url || "/"}
        className={cn("flex shrink-0 items-center gap-2", logoClassName)}
      >
        {logo.src && (
          <Img
            src={logo.src}
            className={cn("w-10", logo.className)}
            alt={logo.alt || "Logo"}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        {logo.title &&
          (typeof logo.title === "string" ? (
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          ) : (
            logo.title
          ))}
      </Pressable>
    );
  };

  const renderAuthActions = () => {
    if (authActionsSlot) return authActionsSlot;
    if (!authActions || authActions.length === 0) return null;

    return authActions.map((action, index) => {
      const {
        label,
        icon,
        iconAfter,
        children,
        className: actionClassName,
        ...pressableProps
      } = action;
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

  const renderMenu = (): NavItem[] | null => {
    if (menuSlot) return null;
    if (!items || items.length === 0) return null;

    return items;
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div
        className={cn(
          "absolute top-5 left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-full border bg-background/70 backdrop-blur-md lg:top-12",
          containerClassName,
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between px-6 py-3",
            pillWrapperClassName,
          )}
        >
          {renderLogo()}

          {/* Desktop Navigation */}
          <NavigationMenu
            className={cn("max-lg:hidden", navigationMenuClassName)}
          >
            <NavigationMenuList>
              {menuSlot
                ? menuSlot
                : renderMenu()?.map((link) =>
                    link.dropdownItems ? (
                      <NavigationMenuItem key={link.label}>
                        <NavigationMenuTrigger className="bg-transparent! px-1.5 data-[state=open]:bg-accent/50">
                          {link.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="w-[400px] space-y-2 p-4">
                            {link.dropdownItems.map((item) => (
                              <li key={item.title}>
                                <NavigationMenuLink asChild>
                                  <Pressable
                                    href={item.href}
                                    className="group flex gap-4 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <div className="transition-transform duration-300 group-hover:translate-x-1">
                                      <div className="mb-1 text-sm leading-none font-medium">
                                        {item.title}
                                      </div>
                                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Pressable>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    ) : (
                      <NavigationMenuItem key={link.label}>
                        <Pressable
                          href={link.href}
                          className={cn(
                            "relative bg-transparent px-1.5 text-sm font-medium text-muted-foreground",
                          )}
                        >
                          {link.label}
                        </Pressable>
                      </NavigationMenuItem>
                    ),
                  )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <div className={cn("flex items-center gap-2.5", actionsClassName)}>
            <div className="max-lg:hidden">{renderAuthActions()}</div>

            {/* Hamburger Menu Button (Mobile Only) */}
            <button
              className="relative flex size-8 text-muted-foreground lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
                <span
                  aria-hidden="true"
                  className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                  aria-hidden="true"
                  className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Navigation */}
        <div
          className={cn(
            "fixed inset-x-0 top-[calc(100%+1rem)] flex flex-col rounded-2xl border bg-background p-6 transition-all duration-300 ease-in-out lg:hidden",
            isMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-4 opacity-0",
          )}
        >
          <nav className="flex flex-1 flex-col divide-y divide-border">
            {menuSlot
              ? menuSlot
              : renderMenu()?.map((link) =>
                  link.dropdownItems ? (
                    <div key={link.label} className="py-4 first:pt-0 last:pb-0">
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === link.label ? null : link.label,
                          )
                        }
                        className="flex w-full items-center justify-between text-base font-medium text-primary"
                      >
                        {link.label}
                        <DynamicIcon
                          name="lucide/chevron-right"
                          size={16}
                          className={cn(
                            "transition-transform duration-200",
                            openDropdown === link.label ? "rotate-90" : "",
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "overflow-hidden transition-all duration-300",
                          openDropdown === link.label
                            ? "mt-4 max-h-[1000px] opacity-100"
                            : "max-h-0 opacity-0",
                        )}
                      >
                        <div className="space-y-3 rounded-lg bg-muted/50 p-4">
                          {link.dropdownItems.map((item) => (
                            <Pressable
                              key={item.title}
                              href={item.href}
                              className="group block rounded-md p-2 transition-colors hover:bg-accent"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setOpenDropdown(null);
                              }}
                            >
                              <div className="transition-transform duration-200 group-hover:translate-x-1">
                                <div className="font-medium text-primary">
                                  {item.title}
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                            </Pressable>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Pressable
                      key={link.label}
                      href={link.href}
                      className={cn(
                        "py-4 text-base font-medium text-primary transition-colors first:pt-0 last:pb-0 hover:text-primary/80",
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Pressable>
                  ),
                )}
          </nav>
        </div>
      </div>
    </Section>
  );
};

export default NavbarFloatingPill;
