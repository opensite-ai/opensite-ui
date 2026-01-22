"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface NavItem {
  title: React.ReactNode;
  url: string;
  icon?: React.ReactNode;
  iconName?: string;
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
 * Props for the NavbarTransparentOverlay component
 */
export interface NavbarTransparentOverlayProps {
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
   * Navigation items
   */
  navItems?: NavItem[];
  /**
   * Custom slot for navigation (overrides navItems array)
   */
  navigationSlot?: React.ReactNode;
  /**
   * Authentication action configurations for desktop
   */
  authActions?: ActionConfig[];
  /**
   * Custom slot for auth actions (overrides authActions array)
   */
  authActionsSlot?: React.ReactNode;
  /**
   * Authentication action configurations for mobile
   */
  mobileAuthActions?: ActionConfig[];
  /**
   * Custom slot for mobile auth actions (overrides mobileAuthActions array)
   */
  mobileAuthActionsSlot?: React.ReactNode;
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
  containerClassName,
  navClassName,
  navigationMenuClassName,
  actionsClassName,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
  },
  logoSlot,
  logoClassName,
  navItems,
  navigationSlot,
  authActions,
  authActionsSlot,
  mobileAuthActions,
  mobileAuthActionsSlot,
  background = "white",
  spacing = "none",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarTransparentOverlayProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    return (
      <Pressable
        href={logo.url || "/"}
        className={cn("z-50 flex items-center gap-2", logoClassName)}
      >
        {logo.src && (
          <Img
            src={logo.src}
            alt={logo.alt || "Logo"}
            className={cn(
              "h-8 transition-all duration-300",
              !isScrolled && !isOpen && "brightness-0 invert",
              logo.className,
            )}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        {logo.title &&
          (typeof logo.title === "string" ? (
            <span
              className={cn(
                "text-lg font-semibold transition-colors duration-300",
                !isScrolled && !isOpen ? "text-white" : "text-foreground",
              )}
            >
              {logo.title}
            </span>
          ) : (
            logo.title
          ))}
      </Pressable>
    );
  };

  const renderNavigation = () => {
    if (navigationSlot) return navigationSlot;
    if (!navItems || navItems.length === 0) return null;

    return (
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
              <Pressable href={item.url}>
                {item.icon ??
                  (item.iconName && (
                    <DynamicIcon name={item.iconName} size={16} />
                  ))}
                {item.title}
              </Pressable>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
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
        variant,
        ...pressableProps
      } = action;
      const isGhost = variant === "ghost";
      return (
        <Pressable
          key={index}
          asButton
          variant={variant}
          className={cn(
            "transition-colors duration-300",
            !isScrolled && isGhost
              ? "text-white hover:text-white hover:bg-white/10"
              : !isScrolled && !isGhost
                ? "bg-white text-black hover:bg-white/90"
                : "",
            actionClassName,
          )}
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

  const renderMobileAuthActions = () => {
    if (mobileAuthActionsSlot) return mobileAuthActionsSlot;
    if (!mobileAuthActions || mobileAuthActions.length === 0) return null;

    return mobileAuthActions.map((action, index) => {
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
          className={cn("min-w-[200px]", actionClassName)}
          onClick={() => setIsOpen(false)}
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

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn("", className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <nav
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/95 shadow-sm backdrop-blur-sm"
            : "bg-transparent",
          navClassName,
        )}
      >
        <div className={cn("container", containerClassName)}>
          <div className="flex h-16 items-center justify-between">
            {renderLogo()}

            <NavigationMenu
              className={cn("hidden lg:flex", navigationMenuClassName)}
            >
              {renderNavigation()}
            </NavigationMenu>

            <div
              className={cn(
                "hidden items-center gap-2 lg:flex",
                actionsClassName,
              )}
            >
              {renderAuthActions()}
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
            {navItems?.map((item, index) => (
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
                {item.icon ??
                  (item.iconName && (
                    <DynamicIcon name={item.iconName} size={24} />
                  ))}
                {item.title}
              </Pressable>
            ))}
          </nav>
          <div
            className={cn(
              "mt-12 flex flex-col items-center gap-4 transition-all duration-300",
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
            style={{
              transitionDelay: isOpen
                ? `${(navItems?.length ?? 0) * 100}ms`
                : "0ms",
            }}
          >
            {renderMobileAuthActions()}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NavbarTransparentOverlay;
