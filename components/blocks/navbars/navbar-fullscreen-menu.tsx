"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img, type OptixFlowConfig } from "@page-speed/img";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

interface MenuItem {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
}

/**
 * Props for the NavbarFullscreenMenu component
 */
export interface NavbarFullscreenMenuProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
  };
  menuItems?: MenuItem[];
  socialLinks?: SocialLink[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultMenuItems: MenuItem[] = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Services", href: "#" },
  { label: "Contact", href: "#" },
];

const defaultSocialLinks: SocialLink[] = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

/**
 * NavbarFullscreenMenu - A dramatic fullscreen overlay navigation with animated text.
 * 
 * Features a minimal header with logo and MENU/CLOSE text toggle. When opened, displays
 * a fullscreen overlay with large, centered menu items that animate in with blur effects
 * on hover. Social links appear at the bottom with staggered animations. Uses Framer Motion
 * for smooth transitions. Perfect for creative agencies, portfolios, and artistic websites.
 */
export const NavbarFullscreenMenu = ({
  className,
  logo = {
    url: "/",
    src: logoPlaceholders.darkHorizontalLogo,
    alt: "Opensite AI",
  },
  menuItems = defaultMenuItems,
  socialLinks = defaultSocialLinks,
  optixFlowConfig,
}: NavbarFullscreenMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <section className={cn("", className)}>
      <div className="flex items-center justify-between px-6 py-6">
        <div className="z-50">
          <Pressable href={logo.url} className="flex items-center gap-2">
            <Img
              src={logo.src}
              alt={logo.alt}
              className="h-9"
              optixFlowConfig={optixFlowConfig}
            />
          </Pressable>
        </div>

        <div className="z-50">
          <button
            onClick={toggleMenu}
            className="text-lg tracking-wider text-foreground transition-colors hover:text-muted-foreground"
          >
            <span
              className={`inline-block transition-all duration-200 ${
                isOpen ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
              }`}
              style={{ display: isOpen ? "none" : "inline-block" }}
            >
              MENU
            </span>
            <span
              className={`inline-block transition-all duration-200 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
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
          className="fixed inset-0 z-40 overflow-hidden bg-background animate-in fade-in duration-300"
        >
          <div className="flex h-full flex-col items-center justify-center px-6">
            <div className="mb-16 text-center">
              {menuItems.map((item, index) => (
                <div
                  key={item.label}
                  className="mb-5 animate-in slide-in-from-bottom-4 fade-in"
                  style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: "both" }}
                >
                  <Pressable href={item.href} className="group relative inline-block">
                    <span
                      className="relative z-10 text-4xl font-black text-foreground uppercase transition-all duration-300 md:text-6xl group-hover:opacity-80 group-hover:blur-[6px]"
                    >
                      {item.label}
                    </span>
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Pressable>
                </div>
              ))}
            </div>

            <div
              className="flex flex-col gap-8 sm:flex-row sm:gap-12 animate-in slide-in-from-bottom-4 fade-in"
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              {socialLinks.map((link, index) => (
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
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NavbarFullscreenMenu;
