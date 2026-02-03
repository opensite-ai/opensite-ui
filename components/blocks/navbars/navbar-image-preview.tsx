"use client";

import * as React from "react";
import { useState, useRef, useEffect, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import { NavbarLogo } from "../../ui/navbar-logo";
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
  icon?: React.ReactNode;
  iconName?: string;
}

/**
 * Props for the NavbarImagePreview component
 */
export interface NavbarImagePreviewProps {
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
}: NavbarImagePreviewProps) => {
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
              {icon}
              {label}
              {iconAfter}
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
      background={background}
      spacing={spacingOverride ?? spacing}
      className={sectionClasses}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={sectionContainerClassName}
      containerMaxWidth={sectionContainerMaxWidth}
    >
      <div
        className={cn(
          "fixed top-0 z-500 w-full bg-transparent transition-colors duration-500",
          containerWrapperClasses,
        )}
        ref={navRef}
      >
        <div className={navWrapperClasses}>
          <div className={innerContainerClasses}>
            <div
              className={cn(
                "flex items-center justify-between gap-3.5 py-5",
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
                  "hidden lg:flex [&>div:nth-child(2)]:left-1/2 [&>div:nth-child(2)]:-translate-x-1/2",
                  navigationMenuClassName,
                )}
              >
                {renderNavigation}
              </NavigationMenu>
              <div
                className={cn("flex items-center gap-3.5", actionsClassName)}
              >
                {renderAuthActions}
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
        mobileNavigation={mobileNavigation ?? []}
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
                        <p className="text-xs leading-normal text-muted-foreground">
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
  const renderMobileNavigation = useMemo(() => {
    if (mobileNavigationSlot) return mobileNavigationSlot;
    if (!mobileNavigation || mobileNavigation.length === 0) return null;

    return (
      <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10">
        {mobileNavigation.map((item, index) => (
          <div
            className={cn(
              "flex flex-col gap-4 text-primary-foreground",
              item.className,
            )}
            key={`mobile-menu-item-${index}`}
          >
            <div className="text-xs text-muted-foreground uppercase">
              {item.title}
            </div>
            <ul className="flex flex-col gap-3">
              {item.links?.map((link, i) => (
                <li key={`mobile-nav-link-${i}`}>
                  <Pressable
                    href={getLinkUrl(link)}
                    className={cn(
                      "text-primary-foreground leading-normal font-medium",
                      index === 0 ? "text-2xl" : "text-base",
                    )}
                  >
                    {link.label}
                  </Pressable>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }, [mobileNavigationSlot, mobileNavigation]);

  const renderSocialLinks = useMemo(() => {
    if (socialLinksSlot) return socialLinksSlot;
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div className="col-span-2 flex flex-col gap-4">
        <div className="text-xs text-muted-foreground uppercase">SOCIAL</div>
        <div className="flex gap-4">
          {socialLinks.map((link, index) => (
            <Pressable
              key={`social-link-${index}`}
              href={link.url}
              className="text-primary-foreground"
            >
              {link.icon ??
                (link.iconName && (
                  <DynamicIcon name={link.iconName} size={20} />
                ))}
              {!link.icon && !link.iconName && link.label}
            </Pressable>
          ))}
        </div>
      </div>
    );
  }, [socialLinksSlot, socialLinks]);

  const renderMobileAuthActions = useMemo(() => {
    if (authActionsSlot) return authActionsSlot;
    if (!authActions || authActions.length === 0) return null;

    return (
      <div className="flex flex-col gap-2">
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
        })}
      </div>
    );
  }, [authActionsSlot, authActions]);

  return (
    <NavbarMobileMenu
      open={open}
      onClose={() => setOpen(false)}
      title="Mobile Navigation"
      className="bg-primary text-primary-foreground"
      contentClassName="pt-24 pb-12"
    >
      <div className="max-w-screen-sm mx-auto">
        <div className="flex h-full flex-col justify-between gap-30">
          {renderMobileNavigation}
          {renderSocialLinks}
          {renderMobileAuthActions}
        </div>
      </div>
    </NavbarMobileMenu>
  );
};

export default NavbarImagePreview;
