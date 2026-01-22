"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

interface MenuItem {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
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
 * Props for the NavbarFullscreenMenu component
 */
export interface NavbarFullscreenMenuProps {
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
  socialLinks?: SocialLink[];
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
  logo = {
    url: "/",
    src: logoPlaceholders.darkHorizontalLogo,
  },
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
  background = "white",
  spacing = "none",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarFullscreenMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    return (
      <Pressable
        href={logo.url || "/"}
        className={cn("flex items-center gap-2", logoClassName)}
      >
        {logo.src && (
          <Img
            src={logo.src}
            className={cn("h-9", logo.className)}
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

  const renderMenuItems = () => {
    if (menuSlot) return menuSlot;
    if (!menuItems || menuItems.length === 0) return null;

    return menuItems.map((item, index) => (
      <div
        key={item.label}
        className="mb-5 animate-in slide-in-from-bottom-4 fade-in"
        style={{
          animationDelay: `${0.2 + index * 0.1}s`,
          animationFillMode: "both",
        }}
      >
        <Pressable href={item.href} className="group relative inline-block">
          <span className="relative z-10 text-4xl font-black text-foreground uppercase transition-all duration-300 md:text-6xl group-hover:opacity-80 group-hover:blur-[6px]">
            {item.label}
          </span>
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
        </Pressable>
      </div>
    ));
  };

  const renderSocialLinks = () => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return socialLinks.map((link, index) => (
      <Pressable
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 font-mono text-sm tracking-wider text-muted-foreground transition-colors hover:text-foreground hover:translate-x-1"
        style={{ animationDelay: `${0.8 + index * 0.1}s` }}
      >
        <span>{link.label}</span>
      </Pressable>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn(containerClassName)}>
        <div
          className={cn(
            "flex items-center justify-between px-6 py-6",
            headerClassName,
          )}
        >
          <div className="z-50">{renderLogo()}</div>

          <div className="z-50">
            <button
              onClick={toggleMenu}
              className="text-lg tracking-wider text-foreground transition-colors hover:text-muted-foreground"
            >
              <span
                className={`inline-block transition-all duration-200 ${
                  isOpen
                    ? "opacity-0 -translate-y-2"
                    : "opacity-100 translate-y-0"
                }`}
                style={{ display: isOpen ? "none" : "inline-block" }}
              >
                MENU
              </span>
              <span
                className={`inline-block transition-all duration-200 ${
                  isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
                style={{ display: isOpen ? "inline-block" : "none" }}
              >
                CLOSE
              </span>
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            className={cn(
              "fixed inset-0 z-40 overflow-hidden bg-background animate-in fade-in duration-300",
              overlayClassName,
            )}
          >
            <div className="flex h-full flex-col items-center justify-center px-6">
              <div className={cn("mb-16 text-center", menuItemsClassName)}>
                {renderMenuItems()}
              </div>

              <div
                className={cn(
                  "flex flex-col gap-8 sm:flex-row sm:gap-12 animate-in slide-in-from-bottom-4 fade-in",
                  socialLinksClassName,
                )}
                style={{ animationDelay: "0.7s", animationFillMode: "both" }}
              >
                {renderSocialLinks()}
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default NavbarFullscreenMenu;
