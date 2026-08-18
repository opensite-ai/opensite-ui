"use client";

import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon, type DynamicIconName } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
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
import { NavbarLogo } from "../../ui/navbar-logo";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { LogoConfig, NavbarLayoutVariant } from "./types";
import { getNavbarLayoutClasses } from "./layout-variant-utils";

// Re-export LogoConfig for backward compatibility
export type { LogoConfig } from "./types";

export interface MenuLink {
  label: React.ReactNode;
  description?: React.ReactNode;
  url?: string;
  icon?: DynamicIconName;
  iconName?: DynamicIconName;
  iconColor?: string;
}

export interface MenuItem {
  title: React.ReactNode;
  url?: string;
  links?: MenuLink[];
}

/**
 * Props for the NavbarDarkIcons component
 */
export interface NavbarDarkIconsProps {
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

export interface NavbarDarkIconsRuntimeProps {
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
   * Authentication action configurations
   */
  authActions?: ActionConfig[];
  /**
   * Custom slot for auth actions (overrides authActions array)
   */
  authActionsSlot?: React.ReactNode;
  /**
   * GitHub repository URL for stars counter
   */
  githubUrl?: string;
  /**
   * Custom slot for GitHub stars (overrides githubUrl)
   */
  githubSlot?: React.ReactNode;
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
 * NavbarDarkIcons - A dark-themed navigation bar with colorful icon indicators.
 *
 * Features a dark background with dropdown menus containing colorful icons next to
 * each menu item. Includes a GitHub stars counter button and primary CTA. Mobile
 * view uses a full-screen dark sheet with accordion navigation. Ideal for developer
 * tools, open-source projects, and tech-focused applications.
 */
export const NavbarDarkIcons = ({
  sectionId = "navbar-dark-icons",
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
  authActions,
  authActionsSlot,
  githubUrl,
  githubSlot,
  layoutVariant = "fullScreenContainerizedLinks",
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarDarkIconsRuntimeProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
          />
        ))}
      </NavigationMenuList>
    );
  }, [navigationSlot, navigation]);

  const renderGithubStars = useMemo(() => {
    if (githubSlot) return githubSlot;
    if (!githubUrl) return null;
    return <GithubStars repoUrl={githubUrl} />;
  }, [githubSlot, githubUrl]);

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
      id="navbar-dark-icons"
      background={background}
      spacing={spacingOverride ?? spacing}
      className={cn("dark pointer-events-auto relative z-999", sectionClasses)}
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
                "flex h-16 items-center justify-between",
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
                className={cn("hidden lg:flex", navigationMenuClassName)}
                viewport={false}
              >
                {renderNavigation}
              </NavigationMenu>
              <div className={cn("flex items-center gap-4", actionsClassName)}>
                {renderGithubStars}
                {renderAuthActions}
                <div className="lg:hidden">
                  <Pressable
                    variant="ghost"
                    size="icon"
                    asButton
                    onClick={handleMobileMenu}
                  >
                    {open ? (
                      <DynamicIcon
                        name="lucide/x"
                        size={22}
                        className="stroke-foreground"
                      />
                    ) : (
                      <DynamicIcon
                        name="lucide/menu"
                        size={22}
                        className="stroke-foreground"
                      />
                    )}
                  </Pressable>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <MobileNavigationMenu
        open={open}
        setOpen={setOpen}
        navigation={navigation ?? []}
        authActions={authActions}
        authActionsSlot={authActionsSlot}
      />
    </Section>
  );
};

interface DesktopMenuItemProps {
  item: MenuItem;
  index: number;
}

const DesktopMenuItem = ({ item, index }: DesktopMenuItemProps) => {
  if (item.links) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
        <NavigationMenuTrigger className="h-fit bg-transparent font-normal focus:bg-transparent! data-[active=true]:bg-transparent!">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="rounded-xl! p-0!">
          <ul className="w-[20rem] p-2.5">
            {item.links.map((link, linkIndex) => (
              <li key={`desktop-nav-sublink-${linkIndex}`}>
                {/* NavigationMenuLink gives the sub-link Radix's link
                    semantics (rootContentDismiss on click, keyboard/focus
                    grouping) — a bare Pressable never dismissed the panel.
                    Its className pre-resolves the wrapper's defaults
                    (inline-flex/justify-center/w-max/px-3 py-2/rounded-md/…)
                    toward MenuSubLink's own styling, because Slot joins the
                    two class strings by plain concatenation. */}
                <NavigationMenuLink
                  asChild
                  className="flex w-full justify-start rounded-lg p-2 text-current transition-colors hover:bg-muted hover:text-current"
                >
                  <MenuSubLink link={link} />
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
      <NavigationMenuLink
        href={item.url}
        className={`${navigationMenuTriggerStyle()} h-fit bg-transparent font-normal`}
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

/**
 * Rendered under `NavigationMenuLink asChild` on desktop (and bare inside the
 * mobile accordion): Radix's Slot injects the merged props — the composed
 * `onClick` that dispatches `rootContentDismiss`, plus `data-*`/aria props and
 * the ref. They MUST all reach the inner `Pressable`; destructuring only `link`
 * silently discarded the dismiss handler and left the dropdown open.
 */
const MenuSubLink = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  { link: MenuLink } & Omit<
    React.ComponentProps<typeof Pressable>,
    "href" | "children"
  >
>(({ link, className, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      href={link.url}
      className={cn(
        "flex items-center gap-4 rounded-lg p-2 hover:bg-muted",
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2.5">
          <DynamicIcon
            name={link.icon || link.iconName}
            size={20}
            color={link.iconColor}
            className="shrink-0"
          />
          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm leading-none">{link.label}</h3>
            <p className="text-sm leading-[1.2] text-muted-foreground/80">
              {link.description}
            </p>
          </div>
        </div>
        <DynamicIcon
          name="lucide/chevron-right"
          size={14}
          className="stroke-muted-foreground opacity-100"
        />
      </div>
    </Pressable>
  );
});
MenuSubLink.displayName = "MenuSubLink";

interface MobileNavigationMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  navigation: MenuItem[];
  authActions?: ActionConfig[];
  authActionsSlot?: React.ReactNode;
}

const MobileNavigationMenu = ({
  open,
  setOpen,
  navigation,
  authActions,
  authActionsSlot,
}: MobileNavigationMenuProps) => {
  const renderMobileAuthActions = useMemo(() => {
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
          className={cn("w-full", actionClassName)}
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

  return (
    <NavbarMobileMenu
      open={open}
      onClose={() => setOpen(false)}
      title="Mobile Navigation"
      className="dark"
    >
      <div className="max-w-screen-sm mx-auto">
        <div className="flex h-full flex-col justify-between gap-4">
          <Accordion type="multiple" className="w-full">
            {navigation.map((item, index) => renderMobileMenuItem(item, index))}
          </Accordion>
          <div className="flex flex-col gap-2 pb-20">
            {renderMobileAuthActions}
          </div>
        </div>
      </div>
    </NavbarMobileMenu>
  );
};

const renderMobileMenuItem = (item: MenuItem, index: number) => {
  if (item.links) {
    return (
      <AccordionItem key={`nav-item-${index}`} value={`nav-${index}`}>
        <AccordionTrigger className="h-15 items-center p-0 text-base leading-[3.75] font-normal text-muted-foreground hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent>
          {item.links.map((subItem, subIndex) => (
            <MenuSubLink key={`sub-link-${index}-${subIndex}`} link={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Pressable
      key={`nav-link-${index}`}
      href={item.url}
      className="flex h-15 items-center border-b p-0 text-left text-base leading-[3.75] font-normal text-muted-foreground ring-ring/10 outline-ring/50 transition-all focus-visible:ring-4 focus-visible:outline-1"
    >
      {item.title}
    </Pressable>
  );
};

interface GithubStarsProps {
  repoUrl: string;
}

const GithubStars = ({ repoUrl }: GithubStarsProps) => {
  const [stargazersCount, setStargazersCount] = useState<string>("");

  const formatStargazers = (count: number | ""): string => {
    if (count === "") return "";
    if (count < 1000) return count.toString();
    return `${Math.round(count / 1000)}k`;
  };

  useEffect(() => {
    const getStars = async () => {
      try {
        const parts = repoUrl.split("github.com/");
        if (parts.length < 2) return;
        const [owner, repo] = parts[1].split("/");
        const githubApiEndpoint = `https://api.github.com/repos/${owner}/${repo}`;
        const response = await fetch(githubApiEndpoint);
        const json = await response.json();
        const formattedCount = formatStargazers(json.stargazers_count);
        setStargazersCount(formattedCount);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    getStars();
  }, [repoUrl]);

  return (
    <Pressable
      variant="ghost"
      asButton
      className="flex items-center gap-1.5 bg-muted"
      href={repoUrl}
    >
      <svg width="20" height="20" viewBox="0 0 20 20">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g
            transform="translate(-140.000000, -7559.000000)"
            fill="currentColor"
          >
            <g transform="translate(56.000000, 160.000000)">
              <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"></path>
            </g>
          </g>
        </g>
      </svg>
      <span>{stargazersCount}</span>
    </Pressable>
  );
};

export default NavbarDarkIcons;
