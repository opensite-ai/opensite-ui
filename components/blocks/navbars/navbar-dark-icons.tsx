"use client";

import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img, type OptixFlowConfig } from "@page-speed/img";
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
import { Sheet, SheetContent, SheetTitle } from "../../ui/sheet";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

interface MenuLink {
  label: string;
  description?: string;
  url?: string;
  icon?: string;
  iconColor?: string;
}

interface MenuItem {
  title: string;
  url?: string;
  links?: MenuLink[];
}

/**
 * Props for the NavbarDarkIcons component
 */
export interface NavbarDarkIconsProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  navigation?: MenuItem[];
  primaryButton?: {
    label: string;
    url: string;
  };
  githubUrl?: string;
  optixFlowConfig?: OptixFlowConfig;
}

const defaultNavigation: MenuItem[] = [
  {
    title: "Products",
    links: [
      {
        label: "Company Blog",
        description: "Insights & updates",
        url: "#",
        icon: "lucide/file-text",
        iconColor: "#10b981",
      },
      {
        label: "Our Platform",
        description: "Empower your work",
        url: "#",
        icon: "lucide/grid",
        iconColor: "#6366f1",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About Our Team",
        url: "#",
        description: "Our mission & values",
        icon: "lucide/info",
        iconColor: "#f59e0b",
      },
      {
        label: "Help & Support Center",
        url: "#",
        description: "Get quick help",
        icon: "lucide/help-circle",
        iconColor: "#3b82f6",
      },
      {
        label: "Latest News",
        url: "#",
        description: "Product updates",
        icon: "lucide/bell",
        iconColor: "#f97316",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "Documentation",
        url: "#",
        description: "Guides & references",
        icon: "lucide/book",
        iconColor: "#8b5cf6",
      },
      {
        label: "API Reference",
        url: "#",
        description: "Explore our API",
        icon: "lucide/globe",
        iconColor: "#ef4444",
      },
    ],
  },
  {
    title: "Pricing",
    url: "#",
  },
  {
    title: "Contact",
    url: "#",
  },
];

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
  className,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  navigation = defaultNavigation,
  primaryButton = { label: "Sign up", url: "#" },
  githubUrl = "https://github.com/opensite-ai/opensite-ui",
  optixFlowConfig,
}: NavbarDarkIconsProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
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
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleMobileMenu = () => {
    setOpen(!open);
  };

  return (
    <Fragment>
      <section
        className={cn(
          "dark pointer-events-auto relative z-999 bg-background",
          className,
        )}
      >
        <div className="container h-16">
          <div className="flex h-full items-center justify-between">
            <Pressable
              href={logo.url}
              className="flex max-h-8 items-center gap-2 text-lg font-semibold tracking-tighter"
            >
              <Img
                src={logo.src}
                alt={logo.alt}
                className="inline-block size-8 invert"
                optixFlowConfig={optixFlowConfig}
              />
              <span className="hidden text-foreground md:inline-block">
                {logo.title}
              </span>
            </Pressable>
            <NavigationMenu className="hidden lg:flex" viewport={false}>
              <NavigationMenuList>
                {navigation.map((item, index) => (
                  <DesktopMenuItem
                    key={`desktop-link-${index}`}
                    item={item}
                    index={index}
                  />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-4">
              <GithubStars repoUrl={githubUrl} />
              <Pressable href={primaryButton.url} asButton>
                {primaryButton.label}
              </Pressable>
              <div className="lg:hidden">
                <Pressable variant="ghost" size="icon" asButton onClick={handleMobileMenu}>
                  {open ? (
                    <DynamicIcon name="lucide/x" size={22} className="stroke-foreground" />
                  ) : (
                    <DynamicIcon name="lucide/menu" size={22} className="stroke-foreground" />
                  )}
                </Pressable>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MobileNavigationMenu open={open} navigation={navigation} primaryButton={primaryButton} />
    </Fragment>
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
        <NavigationMenuTrigger className="h-fit bg-transparent font-normal text-foreground focus:!bg-transparent data-[active=true]:!bg-transparent">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="!rounded-xl !p-0">
          <ul className="w-[20rem] p-2.5">
            {item.links.map((link, linkIndex) => (
              <li key={`desktop-nav-sublink-${linkIndex}`}>
                <MenuSubLink link={link} />
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
        className={`${navigationMenuTriggerStyle()} h-fit bg-transparent font-normal text-foreground`}
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

interface MenuSubLinkProps {
  link: MenuLink;
}

const MenuSubLink = ({ link }: MenuSubLinkProps) => {
  return (
    <Pressable
      href={link.url}
      className="flex items-center gap-4 rounded-lg p-2 hover:bg-muted"
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2.5">
            {link.icon && (
              <DynamicIcon
                name={link.icon}
                size={20}
                color={link.iconColor}
              />
            )}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm leading-none text-foreground">{link.label}</h3>
            <p className="text-sm leading-[1.2] text-muted-foreground/80">
              {link.description}
            </p>
          </div>
        </div>
        <DynamicIcon name="lucide/chevron-right" size={14} className="stroke-muted-foreground opacity-100" />
      </div>
    </Pressable>
  );
};

interface MobileNavigationMenuProps {
  open: boolean;
  navigation: MenuItem[];
  primaryButton: { label: string; url: string };
}

const MobileNavigationMenu = ({ open, navigation, primaryButton }: MobileNavigationMenuProps) => {
  return (
    <Sheet open={open}>
      <SheetContent
        aria-describedby={undefined}
        side="top"
        className="dark inset-0 z-998 h-dvh w-full bg-background pt-16 [&>button]:hidden"
      >
        <div className="flex-1 overflow-y-auto">
          <div className="container pb-12">
            <div className="absolute -m-px h-px w-px overflow-hidden border-0 mask-clip-border p-0 text-nowrap whitespace-nowrap">
              <SheetTitle className="text-primary">Mobile Navigation</SheetTitle>
            </div>
            <div className="flex h-full flex-col justify-between gap-20">
              <Accordion type="multiple" className="w-full">
                {navigation.map((item, index) => renderMobileMenuItem(item, index))}
              </Accordion>
              <div className="pb-20">
                <Pressable href={primaryButton.url} asButton className="w-full">
                  {primaryButton.label}
                </Pressable>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const renderMobileMenuItem = (item: MenuItem, index: number) => {
  if (item.links) {
    return (
      <AccordionItem key={item.title} value={`nav-${index}`}>
        <AccordionTrigger className="h-[3.75rem] items-center p-0 text-base leading-[3.75] font-normal text-muted-foreground hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent>
          {item.links.map((subItem) => (
            <MenuSubLink key={subItem.label} link={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Pressable
      key={item.title}
      href={item.url}
      className="flex h-[3.75rem] items-center border-b p-0 text-left text-base leading-[3.75] font-normal text-muted-foreground ring-ring/10 outline-ring/50 transition-all focus-visible:ring-4 focus-visible:outline-1 nth-last-1:border-0"
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
      className="flex items-center gap-1.5 bg-muted text-foreground"
      href={repoUrl}
    >
      <svg width="20" height="20" viewBox="0 0 20 20">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-140.000000, -7559.000000)" fill="currentColor">
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
