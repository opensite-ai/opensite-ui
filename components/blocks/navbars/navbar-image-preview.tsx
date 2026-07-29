"use client";

import * as React from "react";
import { useState, useRef, useEffect, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon, type DynamicIconName } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import { NavbarLogo } from "../../ui/navbar-logo";
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
import { NavbarMobileMenu } from "../../ui/navbar-mobile-menu";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import {
  type LogoConfig,
  type ILinkItem,
  type NavbarLayoutVariant,
  getLinkUrl,
} from "./types";
import { getNavbarLayoutClasses } from "./layout-variant-utils";

// Re-export shared types for backward compatibility
export type { LogoConfig, ILinkItem };
export { getLinkUrl };

/**
 * MenuLink type alias for backward compatibility
 * Uses shared ILinkItem which supports both href and url
 */
export type MenuLink = ILinkItem;

export interface MenuItem {
  title: React.ReactNode;
  url?: string;
  className?: string;
  links?: MenuLink[];
}

export interface SocialLink {
  label: React.ReactNode;
  url: string;
  icon?: DynamicIconName;
  iconName?: DynamicIconName;
}

/**
 * Props for the NavbarImagePreview component
 */
export interface NavbarImagePreviewProps {
  /**
   * Logo configuration
   */
  logo?: LogoConfig;
  /**
   * Navigation menu items
   */
  navigation?: MenuItem[];
  /**
   * Authentication action configurations
   */
  authActions?: ActionConfig[];
}

export interface NavbarImagePreviewRuntimeProps {
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
   * Navigation menu items
   */
  navigation?: MenuItem[];
  /**
   * Custom slot for navigation (overrides navigation array)
   */
  navigationSlot?: React.ReactNode;
  /**
   * Mobile navigation menu items
   */
  mobileNavigation?: MenuItem[];
  /**
   * Custom slot for mobile navigation (overrides mobileNavigation array)
   */
  mobileNavigationSlot?: React.ReactNode;
  /**
   * Authentication action configurations
   */
  authActions?: ActionConfig[];
  /**
   * Custom slot for auth actions (overrides authActions array)
   */
  authActionsSlot?: React.ReactNode;
  /**
   * Social links for mobile menu
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
   * Layout variant for the navbar
   */
  layoutVariant?: NavbarLayoutVariant;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

const MOBILE_BREAKPOINT = 1024;

/**
 * NavbarImagePreview - A fixed navigation bar with image preview on hover.
 *
 * Features a sticky header that changes background on scroll. Desktop dropdowns
 * show a large image preview that changes as users hover over different menu items.
 * Mobile view uses a full-screen dark overlay with categorized link columns and
 * social links. Ideal for content-rich sites where visual previews enhance navigation.
 */
export const NavbarImagePreview = ({
  sectionId = "navbar-image-preview",
  className,
  containerClassName,
  navClassName,
  navigationMenuClassName,
  actionsClassName,
  logo,
  logoSlot,
  logoClassName,
  navigation,
  navigationSlot,
  mobileNavigation,
  mobileNavigationSlot,
  authActions,
  authActionsSlot,
  socialLinks,
  socialLinksSlot,
  layoutVariant = "fullScreenContainerizedLinks",
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarImagePreviewRuntimeProps) => {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setOpen(false);
      }
    };

    const handleScroll = () => {
      navRef.current?.classList.toggle("bg-background", window.scrollY > 300);
      navRef.current?.classList.toggle(
        "bg-transparent",
        !(window.scrollY > 300),
      );
    };

    handleResize();
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleMobileMenu = () => {
    setOpen(!open);
  };

  const renderNavigation = useMemo(() => {
    if (navigationSlot) return navigationSlot;
    if (!navigation || navigation.length === 0) return null;

    return (
      <NavigationMenuList>
        {navigation.map((item, index) => (
          <DesktopMenuItem
            key={`desktop-link-${index}`}
            item={item}
            index={index}
            optixFlowConfig={optixFlowConfig}
          />
        ))}
      </NavigationMenuList>
    );
  }, [navigationSlot, navigation, optixFlowConfig]);

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
              <DynamicIcon name={icon} size={16} className="shrink-0" />
              {label}
              <DynamicIcon name={iconAfter} size={16} className="shrink-0" />
            </>
          )}
        </Pressable>
      );
    });
  }, [authActionsSlot, authActions]);

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
    <Section
      id="navbar-image-preview"
      background={background}
      spacing={spacingOverride ?? spacing}
      className={sectionClasses}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={sectionContainerClassName}
      containerMaxWidth={sectionContainerMaxWidth}
    >
      <div className={cn("z-500 w-full", containerWrapperClasses)} ref={navRef}>
        <div className={navWrapperClasses}>
          <div className={innerContainerClasses}>
            <div
              className={cn(
                "relative flex items-center justify-between gap-3.5 py-5",
                navClassName,
              )}
            >
              <NavbarLogo
                logo={logo}
                logoSlot={logoSlot}
                logoClassName={logoClassName}
                optixFlowConfig={optixFlowConfig}
              />
              <NavigationMenu
                className={cn(
                  "hidden lg:flex absolute left-1/2 -translate-x-1/2 [&>div:nth-child(2)]:left-1/2 [&>div:nth-child(2)]:-translate-x-1/2",
                  navigationMenuClassName,
                )}
              >
                {renderNavigation}
              </NavigationMenu>
              <div
                className={cn("flex items-center gap-3.5", actionsClassName)}
              >
                <div className="hidden lg:flex lg:items-center lg:gap-3.5">
                  {renderAuthActions}
                </div>
                <div className="lg:hidden">
                  <Pressable
                    variant="ghost"
                    size="icon"
                    asButton
                    onClick={handleMobileMenu}
                  >
                    <DynamicIcon name="lucide/menu" size={22} />
                  </Pressable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileNavigationMenu
        open={open}
        setOpen={setOpen}
        mobileNavigation={mobileNavigation ?? navigation ?? []}
        mobileNavigationSlot={mobileNavigationSlot}
        socialLinks={socialLinks ?? []}
        socialLinksSlot={socialLinksSlot}
        authActions={authActions}
        authActionsSlot={authActionsSlot}
      />
    </Section>
  );
};

interface DesktopMenuItemProps {
  item: MenuItem;
  index: number;
  optixFlowConfig?: OptixFlowConfig;
}

const DesktopMenuItem = ({
  item,
  index,
  optixFlowConfig,
}: DesktopMenuItemProps) => {
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    const idx = Number(event.currentTarget.getAttribute("data-index"));
    if (item.links && imagesRef.current[idx]) {
      imagesRef.current.forEach((img, i) => {
        img.classList.toggle("opacity-100", i === idx);
        img.classList.toggle("opacity-0", i !== idx);
      });
    }
  };

  const handleMouseLeave = () => {
    imagesRef.current.forEach((img) => {
      img.classList.remove("opacity-100");
      img.classList.add("opacity-0");
    });
    if (imagesRef.current[0]) {
      imagesRef.current[0].classList.add("opacity-100");
    }
  };

  if (item.links) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
        <NavigationMenuTrigger className="bg-transparent px-3 py-2 hover:bg-muted focus:bg-muted data-[state=open]:bg-muted/50">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="rounded-2xl! p-0!">
          <div className="grid min-h-75 w-181 grid-cols-[22.5rem_1fr] gap-4 p-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl">
              {item.links.map((link, linkIndex) => (
                <Img
                  key={linkIndex}
                  ref={(el: HTMLImageElement | null) => {
                    if (el) {
                      imagesRef.current[linkIndex] = el;
                    }
                  }}
                  src={link.image}
                  alt={typeof link.label === "string" ? link.label : ""}
                  className={`absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-300 ${
                    linkIndex === 0 ? "opacity-100" : "opacity-0"
                  }`}
                  optixFlowConfig={optixFlowConfig}
                  loading="eager"
                />
              ))}
            </div>
            <div>
              <div className="p-4 leading-normal font-bold">{item.title}</div>
              <ul>
                {item.links.map((link, linkIndex) => (
                  <li key={`desktop-nav-sublink-${linkIndex}`}>
                    <Pressable
                      href={getLinkUrl(link)}
                      className="flex items-center gap-4 rounded-lg px-4 py-3 hover:bg-muted"
                      data-index={linkIndex}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div>
                        <h3 className="text-sm leading-normal font-medium">
                          {link.label}
                        </h3>
                        <p className="text-xs leading-normal">
                          {link.description}
                        </p>
                      </div>
                    </Pressable>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem
      key={`desktop-menu-item-${index}`}
      value={`${index}`}
      className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-muted`}
    >
      <NavigationMenuLink href={item.url}>{item.title}</NavigationMenuLink>
    </NavigationMenuItem>
  );
};

interface MobileNavigationMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileNavigation: MenuItem[];
  mobileNavigationSlot?: React.ReactNode;
  socialLinks: SocialLink[];
  socialLinksSlot?: React.ReactNode;
  authActions?: ActionConfig[];
  authActionsSlot?: React.ReactNode;
}

const MobileNavigationMenu = ({
  open,
  setOpen,
  mobileNavigation,
  mobileNavigationSlot,
  socialLinks,
  socialLinksSlot,
  authActions,
  authActionsSlot,
}: MobileNavigationMenuProps) => {
  const handleClose = () => setOpen(false);

  const renderSocialLinks = useMemo(() => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div className="flex flex-col gap-4 mt-6">
        <div className="px-4 text-[10px] text-muted-foreground uppercase">
          SOCIAL
        </div>
        <div className="flex gap-4 px-4">
          {socialLinks.map((link, index) => (
            <Pressable
              key={`social-link-${index}`}
              href={link.url}
              onClick={handleClose}
            >
              <DynamicIcon name={link.icon || link.iconName} size={20} />
              {!link.icon && !link.iconName && link.label}
            </Pressable>
          ))}
        </div>
      </div>
    );
  }, [socialLinksSlot, socialLinks, handleClose]);

  const renderMobileAuthActions = useMemo(() => {
    if (authActionsSlot) return authActionsSlot;
    if (!authActions || authActions.length === 0) return null;

    return (
      <div className="flex flex-col gap-4 mt-6">
        {authActions.map((action, index) => {
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
              className={cn("w-full", actionClassName)}
              onClick={handleClose}
              {...pressableProps}
            >
              {children ?? (
                <>
                  <DynamicIcon name={icon} size={16} className="shrink-0" />
                  {label}
                  <DynamicIcon
                    name={iconAfter}
                    size={16}
                    className="shrink-0"
                  />
                </>
              )}
            </Pressable>
          );
        })}
      </div>
    );
  }, [authActionsSlot, authActions, handleClose]);

  // If custom slot is provided, use it
  if (mobileNavigationSlot) {
    return (
      <NavbarMobileMenu
        open={open}
        onClose={handleClose}
        title="Mobile Navigation"
      >
        <div className="max-w-screen-sm mx-auto">
          <div className="flex flex-col gap-6">
            {mobileNavigationSlot}
            {renderSocialLinks}
            {renderMobileAuthActions}
          </div>
        </div>
      </NavbarMobileMenu>
    );
  }

  return (
    <NavbarMobileMenu
      open={open}
      onClose={handleClose}
      title="Mobile Navigation"
    >
      <div className="max-w-screen-sm mx-auto">
        <div className="flex flex-col gap-6">
          <Accordion type="multiple" className="w-full">
            {mobileNavigation.map((item, index) => {
              // If the item has links, render as accordion
              if (item.links && item.links.length > 0) {
                return (
                  <AccordionItem
                    key={`nav-item-${index}`}
                    value={`nav-${index}`}
                    className="border-b-0"
                  >
                    <AccordionTrigger className="h-15 items-center p-0 px-4! text-base leading-[3.75] font-normal text-muted-foreground hover:bg-muted hover:no-underline">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="overflow-x-none">
                      {item.links.map((link, linkIndex) => (
                        <Pressable
                          key={`mobile-link-${linkIndex}`}
                          href={getLinkUrl(link)}
                          className="flex min-h-12 items-center gap-2 rounded-lg px-4 text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-foreground"
                          onClick={handleClose}
                        >
                          <DynamicIcon
                            name={link.icon || link.iconName}
                            size={16}
                            className="stroke-muted-foreground"
                          />
                          {link.label}
                        </Pressable>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                );
              }

              // Simple link item (no dropdown)
              return (
                <Pressable
                  key={`nav-link-${index}`}
                  href={item.url}
                  className="flex h-15 items-center rounded-md p-0 px-4 text-left text-base leading-[3.75] font-normal text-muted-foreground ring-ring/10 outline-ring/50 transition-all hover:bg-muted focus-visible:ring-4 focus-visible:outline-1"
                  onClick={handleClose}
                >
                  {item.title}
                </Pressable>
              );
            })}
          </Accordion>
          {renderSocialLinks}
          {renderMobileAuthActions}
        </div>
      </div>
    </NavbarMobileMenu>
  );
};

export default NavbarImagePreview;
