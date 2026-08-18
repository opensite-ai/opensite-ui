"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { useRouteChangeClose } from "../../../lib/useRouteChangeClose";
import { Section } from "../../ui/section";
import { NavbarLogo } from "../../ui/navbar-logo";
import {
  SocialLinkIcon,
  type SocialPlatformName,
} from "../../ui/social-link-icon";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { LogoConfig, NavbarLayoutVariant } from "./types";
import { getNavbarLayoutClasses } from "./layout-variant-utils";

// Re-export for backward compatibility
export type { LogoConfig };

interface MenuItem {
  label: string;
  href: string;
}

/**
 * Social link configuration for fullscreen menu
 */
export interface NavbarFullscreenMenuSocialLink {
  /** Social platform name - determines which icon to display */
  platformName: SocialPlatformName;
  /** URL to the social profile */
  href: string;
  /** Optional label for accessibility (defaults to platform name) */
  label?: string;
}

/**
 * Props for the NavbarFullscreenMenu component
 */
export interface NavbarFullscreenMenuProps {
  /**
     * Logo configuration
     */
  logo?: LogoConfig;
  /**
     * Menu items for fullscreen navigation
     */
  menuItems?: MenuItem[];
  /**
     * Social links displayed at bottom of fullscreen menu
     */
  socialLinks?: NavbarFullscreenMenuSocialLink[];
}

export interface NavbarFullscreenMenuRuntimeProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the fullscreen overlay
   */
  overlayClassName?: string;
  /**
   * Additional CSS classes for the menu items container
   */
  menuItemsClassName?: string;
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
   * Menu items for fullscreen navigation
   */
  menuItems?: MenuItem[];
  /**
   * Custom slot for menu items (overrides menuItems array)
   */
  menuSlot?: React.ReactNode;
  /**
   * Social links displayed at bottom of fullscreen menu
   */
  socialLinks?: NavbarFullscreenMenuSocialLink[];
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
   * Layout variant for the navbar
   */
  layoutVariant?: NavbarLayoutVariant;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;

}

/**
 * NavbarFullscreenMenu - A dramatic fullscreen overlay navigation with animated text.
 *
 * Features a minimal header with logo and MENU/CLOSE text toggle. When opened, displays
 * a fullscreen overlay with large, centered menu items that animate in with blur effects
 * on hover. Social links appear at the bottom with staggered animations. Uses Framer Motion
 * for smooth transitions. Perfect for creative agencies, portfolios, and artistic websites.
 */
export const NavbarFullscreenMenu = ({
  logo,
  logoSlot,
  logoClassName,
  menuItems,
  menuSlot,
  socialLinks,
  socialLinksSlot,
  className,
  containerClassName,
  headerClassName,
  overlayClassName,
  menuItemsClassName,
  socialLinksClassName,
  layoutVariant = "fullScreenContainerizedLinks",
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarFullscreenMenuRuntimeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // This overlay is hand-rolled — no Radix primitive dismisses it — and it is
  // `fixed inset-0`, so an SPA navigation would render the new page invisibly
  // behind it. The ref resolves the owning window, which differs from the
  // parent app's window inside the dt-cms iframe preview.
  useRouteChangeClose(isOpen, () => setIsOpen(false), overlayRef);

  const renderMenuItems = useMemo(() => {
    if (menuSlot) return menuSlot;
    if (!menuItems || menuItems.length === 0) return null;

    // Use group/menu-container to blur non-hovered items when any item is hovered
    return (
      <div className="group/menu-container">
        {menuItems.map((item, index) => (
          <div
            key={item.label}
            className="group/menu-item mb-5 animate-in slide-in-from-bottom-4 fade-in"
            style={{
              animationDelay: `${0.2 + index * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            <Pressable href={item.href} className="relative inline-block">
              <span className="relative z-10 text-4xl font-black text-foreground uppercase transition-all duration-300 md:text-6xl group-hover/menu-container:opacity-50 group-hover/menu-container:blur-[4px] group-hover/menu-item:!opacity-100 group-hover/menu-item:!blur-none">
                {item.label}
              </span>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover/menu-item:w-full" />
            </Pressable>
          </div>
        ))}
      </div>
    );
  }, [menuSlot, menuItems]);

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
        className="text-muted-foreground transition-all duration-300 hover:text-foreground hover:scale-110"
      />
    ));
  }, [socialLinksSlot, socialLinks]);

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
        id="navbar-fullscreen-menu"
        background={background}
        spacing={spacingOverride ?? spacing}
        className={sectionClasses}
        pattern={pattern}
        patternOpacity={patternOpacity}
        containerClassName={sectionContainerClassName}
        containerMaxWidth={sectionContainerMaxWidth}
      >
        <div className={containerWrapperClasses}>
          <div className={navWrapperClasses}>
            <div className={innerContainerClasses}>
              <nav
                className={cn(
                  "flex items-center justify-between px-6 py-6",
                  headerClassName,
                )}
              >
                <div className="z-50">
                  <NavbarLogo
                    logo={logo}
                    logoSlot={logoSlot}
                    logoClassName={logoClassName}
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>

                <div className="z-50">
                  <button
                    onClick={toggleMenu}
                    className="text-2xl tracking-wider text-foreground transition-colors hover:text-muted-foreground"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                  >
                    ☰
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </Section>

      {/* Fullscreen overlay - renders outside Section to cover entire viewport */}
      {isOpen && (
        <div
          ref={overlayRef}
          className={cn(
            "fixed inset-0 z-50 flex flex-col bg-background animate-in fade-in duration-300",
            overlayClassName,
          )}
        >
          {/* Overlay header with logo and close button */}
          <div className="flex items-center justify-between px-6 py-6">
            <NavbarLogo
              logo={logo}
              logoSlot={logoSlot}
              logoClassName={logoClassName}
              optixFlowConfig={optixFlowConfig}
            />
            <button
              onClick={toggleMenu}
              className="text-2xl text-foreground transition-colors hover:text-muted-foreground"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Scrollable content area */}
          <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-8">
            <div
              className={cn(
                "mb-12 max-h-[60vh] overflow-y-auto text-center md:max-h-none",
                menuItemsClassName,
              )}
            >
              {renderMenuItems}
            </div>

            <div
              className={cn(
                "flex flex-row flex-wrap items-center justify-center gap-6 animate-in slide-in-from-bottom-4 fade-in",
                socialLinksClassName,
              )}
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              {renderSocialLinks}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarFullscreenMenu;
