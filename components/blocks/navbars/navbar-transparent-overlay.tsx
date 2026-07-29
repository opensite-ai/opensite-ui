"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon, type DynamicIconName } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import { NavbarLogo } from "../../ui/navbar-logo";
import { NavbarMobileMenu } from "../../ui/navbar-mobile-menu";
import {
  SocialLinkIcon,
  type SocialPlatformName,
} from "../../ui/social-link-icon";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { LogoConfig, NavbarLayoutVariant } from "./types";
import { getNavbarLayoutClasses } from "./layout-variant-utils";

// Re-export for backward compatibility
export type { LogoConfig };

export interface NavItem {
  title: React.ReactNode;
  url: string;
  icon?: DynamicIconName;
  iconName?: DynamicIconName;
}

/**
 * Social link configuration for transparent overlay navbar
 */
export interface NavbarTransparentOverlaySocialLink {
  /** Social platform name - determines which icon to display */
  platformName: SocialPlatformName;
  /** URL to the social profile */
  href: string;
  /** Optional label for accessibility (defaults to platform name) */
  label?: string;
}

/**
 * Props for the NavbarTransparentOverlay component
 */
export interface NavbarTransparentOverlayProps {
  /**
     * Logo configuration
     */
  logo?: LogoConfig;
  /**
     * Navigation items
     */
  navItems?: NavItem[];
  /**
     * Authentication action configurations for desktop
     */
  authActions?: ActionConfig[];
}

export interface NavbarTransparentOverlayRuntimeProps {
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
   * Additional CSS classes for the mobile menu
   */
  mobileMenuClassName?: string;
  /**
   * Additional CSS classes for the social links container
   */
  socialLinksClassName?: string;
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
   * Social links displayed in mobile menu
   */
  socialLinks?: NavbarTransparentOverlaySocialLink[];
  /**
   * Custom slot for social links (overrides socialLinks array)
   */
  socialLinksSlot?: React.ReactNode;
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
  /**
   * Layout variant for the navbar
   */
  layoutVariant?: NavbarLayoutVariant;

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
  mobileMenuClassName,
  socialLinksClassName,
  logo,
  logoSlot,
  logoClassName,
  navItems,
  navigationSlot,
  authActions,
  authActionsSlot,
  mobileAuthActions,
  mobileAuthActionsSlot,
  socialLinks,
  socialLinksSlot,
  layoutVariant = "fullScreenContainerizedLinks",
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarTransparentOverlayRuntimeProps) => {
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

  const handleMobileMenuClose = () => setIsOpen(false);

  const renderNavigation = useMemo(() => {
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
                  ? "text-background/90 hover:text-background hover:bg-background/10"
                  : "",
              )}
            >
              <Pressable href={item.url}>
                <DynamicIcon name={item.icon || item.iconName} size={16} />
                {item.title}
              </Pressable>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    );
  }, [navigationSlot, navItems, isScrolled]);

  const renderAuthActions = useMemo(() => {
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
              ? "text-background hover:text-background hover:bg-background/10"
              : !isScrolled && !isGhost
                ? "bg-background text-foreground hover:bg-background/90"
                : "",
            actionClassName,
          )}
          {...pressableProps}
        >
          {children ?? (
            <>
              <DynamicIcon name={icon} size={16} className="shrink-0" />
              {label}
              <DynamicIcon name={iconAfter} size={16} className="shrink-0" />
            </>
          )}
        </Pressable>
      );
    });
  }, [authActionsSlot, authActions, isScrolled]);

  // Get layout classes based on variant
  const {
    sectionClasses,
    containerWrapperClasses,
    innerContainerClasses,
    navWrapperClasses,
    sectionContainerClassName,
    sectionContainerMaxWidth,
    spacingOverride,
  } = getNavbarLayoutClasses(layoutVariant, { className, containerClassName });

  return (
    <>
      <Section
        id="navbar-transparent-overlay"
        background={background}
        spacing={spacingOverride ?? spacing}
        className={sectionClasses}
        pattern={pattern}
        patternOpacity={patternOpacity}
        containerClassName={sectionContainerClassName}
        containerMaxWidth={sectionContainerMaxWidth}
      >
        <div className={containerWrapperClasses}>
          <nav
            className={cn(
              "fixed top-0 left-0 z-50 w-full transition-all duration-300",
              isScrolled
                ? "bg-background/95 shadow-sm backdrop-blur-sm"
                : "bg-transparent",
              navWrapperClasses,
              navClassName,
            )}
          >
            <div className={innerContainerClasses}>
              <div className="flex h-16 items-center justify-between">
                <NavbarLogo
                  logo={logo}
                  logoSlot={logoSlot}
                  logoClassName={cn(
                    "z-50",
                    !isScrolled &&
                      !isOpen &&
                      "[&_img]:brightness-0 [&_img]:invert [&_span]:text-background",
                    logoClassName,
                  )}
                  optixFlowConfig={optixFlowConfig}
                />

                <NavigationMenu
                  className={cn("hidden lg:flex", navigationMenuClassName)}
                >
                  {renderNavigation}
                </NavigationMenu>

                <div
                  className={cn(
                    "hidden items-center gap-2 lg:flex",
                    actionsClassName,
                  )}
                >
                  {renderAuthActions}
                </div>

                <div className="lg:hidden">
                  <Pressable
                    variant="ghost"
                    size="icon"
                    asButton
                    aria-label="Open menu"
                    onClick={() => setIsOpen(true)}
                    className={cn(
                      "size-11",
                      !isScrolled && "hover:bg-white/10",
                      isScrolled ? "text-foreground" : "text-white",
                    )}
                  >
                    <DynamicIcon name="lucide/menu" size={16} />
                  </Pressable>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </Section>

      <MobileNavigationMenu
        open={isOpen}
        onClose={handleMobileMenuClose}
        navItems={navItems}
        mobileAuthActions={mobileAuthActions}
        mobileAuthActionsSlot={mobileAuthActionsSlot}
        socialLinks={socialLinks}
        socialLinksSlot={socialLinksSlot}
        mobileMenuClassName={mobileMenuClassName}
        socialLinksClassName={socialLinksClassName}
      />
    </>
  );
};

/**
 * Mobile navigation menu component for NavbarTransparentOverlay
 */
const MobileNavigationMenu = ({
  open,
  onClose,
  navItems,
  mobileAuthActions,
  mobileAuthActionsSlot,
  socialLinks,
  socialLinksSlot,
  mobileMenuClassName,
  socialLinksClassName,
}: {
  open: boolean;
  onClose: () => void;
  navItems?: NavItem[];
  mobileAuthActions?: ActionConfig[];
  mobileAuthActionsSlot?: React.ReactNode;
  socialLinks?: NavbarTransparentOverlaySocialLink[];
  socialLinksSlot?: React.ReactNode;
  mobileMenuClassName?: string;
  socialLinksClassName?: string;
}) => {
  const renderMobileAuthActions = useMemo(() => {
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
          onClick={onClose}
          {...pressableProps}
        >
          {children ?? (
            <>
              <DynamicIcon name={icon} size={16} className="shrink-0" />
              {label}
              <DynamicIcon name={iconAfter} size={16} className="shrink-0" />
            </>
          )}
        </Pressable>
      );
    });
  }, [mobileAuthActionsSlot, mobileAuthActions, onClose]);

  const renderSocialLinks = useMemo(() => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((link) => (
      <SocialLinkIcon
        key={link.platformName}
        platformName={link.platformName}
        href={link.href}
        label={link.label}
        iconSize={24}
        className="text-white/70 transition-all duration-300 hover:text-white hover:scale-110"
      />
    ));
  }, [socialLinksSlot, socialLinks]);

  return (
    <NavbarMobileMenu
      open={open}
      onClose={onClose}
      title="Mobile Navigation"
      className={cn("bg-black/95", mobileMenuClassName)}
      contentClassName="flex flex-col items-center justify-center"
      closeContainerClassName="bg-black/95"
      closeIconClassName="text-white"
    >
      <div className="flex h-full flex-col items-center justify-center">
        <nav className="flex flex-col items-center gap-8">
          {navItems?.map((item, index) => (
            <Pressable
              key={index}
              href={item.url}
              className="text-3xl font-medium text-white transition-all duration-300 hover:text-white/80"
              onClick={onClose}
            >
              <DynamicIcon name={item.icon || item.iconName} size={24} />
              {item.title}
            </Pressable>
          ))}
        </nav>

        {renderMobileAuthActions && (
          <div className="mt-12 flex flex-col items-center gap-4">
            {renderMobileAuthActions}
          </div>
        )}

        {renderSocialLinks && (
          <div
            className={cn(
              "mt-12 flex flex-row flex-wrap items-center justify-center gap-6",
              socialLinksClassName,
            )}
          >
            {renderSocialLinks}
          </div>
        )}
      </div>
    </NavbarMobileMenu>
  );
};

export default NavbarTransparentOverlay;
