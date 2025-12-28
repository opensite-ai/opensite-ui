"use client";

import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img, type OptixFlowConfig } from "@page-speed/img";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetClose,
} from "../../ui/sheet";
import { logoPlaceholders, imagePlaceholders } from "../../../lib/mediaPlaceholders";

interface MenuLink {
  label: string;
  description?: string;
  url: string;
  image?: string;
}

interface MenuItem {
  title: string;
  url?: string;
  className?: string;
  links?: MenuLink[];
}

interface NavButton {
  label: string;
  url: string;
  variant: "ghost" | "default" | "link" | "destructive" | "outline" | "secondary";
}

interface SocialLink {
  label: string;
  url: string;
}

/**
 * Props for the NavbarImagePreview component
 */
export interface NavbarImagePreviewProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  navigation?: MenuItem[];
  mobileNavigation?: MenuItem[];
  navButtons?: NavButton[];
  socialLinks?: SocialLink[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultNavigation: MenuItem[] = [
  {
    title: "Products",
    links: [
      {
        label: "Company Blog",
        description: "Explore the latest insights and updates",
        url: "#",
        image: imagePlaceholders[0],
      },
      {
        label: "Our Platform",
        description: "Innovative tools to empower your workflow",
        url: "#",
        image: imagePlaceholders[1],
      },
      {
        label: "Careers at Our Company",
        description: "Discover open roles and our workplace culture",
        url: "#",
        image: imagePlaceholders[2],
      },
      {
        label: "Customer Support",
        description: "Reach out or browse community help articles",
        url: "#",
        image: imagePlaceholders[3],
      },
      {
        label: "Product Documentation",
        description: "In-depth guides, references, and API docs",
        url: "#",
        image: imagePlaceholders[4],
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About Our Team",
        url: "#",
        description: "Learn more about our mission and values",
        image: imagePlaceholders[5],
      },
      {
        label: "Help & Support Center",
        url: "#",
        description: "Search our help center for quick answers",
        image: imagePlaceholders[6],
      },
      {
        label: "Latest News",
        url: "#",
        description: "Stay up to date with product announcements",
        image: imagePlaceholders[7],
      },
    ],
  },
  {
    title: "Contact",
    url: "#",
  },
];

const defaultMobileNavigation: MenuItem[] = [
  {
    title: "Products",
    className: "col-span-2",
    links: [
      { label: "Company Blog", url: "#" },
      { label: "Our Platform", url: "#" },
      { label: "Careers at Our Company", url: "#" },
      { label: "Customer Support", url: "#" },
      { label: "Product Documentation", url: "#" },
    ],
  },
  {
    title: "Company",
    className: "",
    links: [
      { label: "About Our Team", url: "#" },
      { label: "Help & Support Center", url: "#" },
      { label: "Latest News", url: "#" },
    ],
  },
  {
    title: "Community",
    className: "",
    links: [
      { label: "Forum", url: "#" },
      { label: "Slack Group", url: "#" },
      { label: "Contributors", url: "#" },
      { label: "Meetups", url: "#" },
    ],
  },
];

const defaultNavButtons: NavButton[] = [
  { label: "Log in", url: "#", variant: "ghost" },
  { label: "Sign up", url: "#", variant: "default" },
];

const defaultSocialLinks: SocialLink[] = [
  { label: "Linkedin", url: "#" },
  { label: "Twitter", url: "#" },
  { label: "Facebook", url: "#" },
];

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
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  navigation = defaultNavigation,
  mobileNavigation = defaultMobileNavigation,
  navButtons = defaultNavButtons,
  socialLinks = defaultSocialLinks,
  optixFlowConfig,
}: NavbarImagePreviewProps) => {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setOpen(false);
      }
    };

    const handleScroll = () => {
      navRef.current?.classList.toggle("bg-background", window.scrollY > 300);
      navRef.current?.classList.toggle("bg-transparent", !(window.scrollY > 300));
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
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleMobileMenu = () => {
    setOpen(!open);
  };

  return (
    <section className={cn("", className)}>
      <div
        className="fixed top-0 z-500 w-full bg-transparent transition-colors duration-500"
        ref={navRef}
      >
        <div className="container border-b">
          <div className="flex items-center justify-between gap-3.5 py-5">
            <Pressable
              href={logo.url}
              className="flex max-h-8 items-center gap-2 text-lg font-semibold tracking-tighter"
            >
              <Img
                src={logo.src}
                alt={logo.alt}
                className="inline-block size-8"
                optixFlowConfig={optixFlowConfig}
              />
              <span className="hidden md:inline-block">{logo.title}</span>
            </Pressable>
            <NavigationMenu className="hidden lg:flex [&>div:nth-child(2)]:left-1/2 [&>div:nth-child(2)]:-translate-x-1/2">
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
            </NavigationMenu>
            <div className="flex items-center gap-3.5">
              {navButtons.map((button, index) => (
                <Pressable
                  key={`nav-button-${index}`}
                  variant={button.variant}
                  asButton
                  href={button.url}
                >
                  {button.label}
                </Pressable>
              ))}
              <div className="lg:hidden">
                <Pressable variant="ghost" size="icon" asButton onClick={handleMobileMenu}>
                  <DynamicIcon name="lucide/menu" size={22} />
                </Pressable>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileNavigationMenu
        open={open}
        setOpen={setOpen}
        mobileNavigation={mobileNavigation}
        socialLinks={socialLinks}
      />
    </section>
  );
};

interface DesktopMenuItemProps {
  item: MenuItem;
  index: number;
  optixFlowConfig?: OptixFlowConfig;
}

const DesktopMenuItem = ({ item, index, optixFlowConfig }: DesktopMenuItemProps) => {
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
        <NavigationMenuTrigger className="bg-transparent">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="!rounded-2xl !p-0">
          <div className="grid min-h-[18.75rem] w-[45.25rem] grid-cols-[22.5rem_1fr] gap-4 p-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl">
              {item.links.map((link, linkIndex) => (
                <Img
                  key={linkIndex}
                  ref={(el: HTMLImageElement | null) => {
                    if (el) {
                      imagesRef.current[linkIndex] = el;
                    }
                  }}
                  src={link.image || imagePlaceholders[0]}
                  alt={link.label}
                  className={`absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-300 ${linkIndex === 0 ? "opacity-100" : "opacity-0"}`}
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
                      href={link.url}
                      className="flex items-center gap-4 rounded-lg px-4 py-3 hover:bg-muted"
                      data-index={linkIndex}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div>
                        <h3 className="leading-normal font-medium">{link.label}</h3>
                        <p className="leading-normal text-muted-foreground">
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
      className={`${navigationMenuTriggerStyle()} bg-transparent`}
    >
      <NavigationMenuLink href={item.url}>{item.title}</NavigationMenuLink>
    </NavigationMenuItem>
  );
};

interface MobileNavigationMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileNavigation: MenuItem[];
  socialLinks: SocialLink[];
}

const MobileNavigationMenu = ({
  open,
  setOpen,
  mobileNavigation,
  socialLinks,
}: MobileNavigationMenuProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        aria-describedby={undefined}
        side="top"
        className="inset-0 z-600 h-dvh w-full bg-primary text-primary-foreground [&>button]:hidden"
      >
        <div className="flex-1 overflow-y-auto">
          <div className="container pb-12">
            <div className="absolute -m-px h-px w-px overflow-hidden border-0 mask-clip-border p-0 text-nowrap whitespace-nowrap">
              <SheetTitle className="text-primary">Mobile Navigation</SheetTitle>
            </div>
            <div className="flex justify-end pt-5">
              <SheetClose asChild>
                <Pressable
                  size="icon"
                  asButton
                  className="size-9 rounded-full bg-muted/20 hover:bg-muted/20"
                  onClick={() => setOpen(false)}
                >
                  <DynamicIcon name="lucide/x" size={22} />
                </Pressable>
              </SheetClose>
            </div>
            <div className="flex h-full flex-col justify-between gap-30 pt-24">
              <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10">
                {mobileNavigation.map((item, index) => (
                  <div
                    className={`flex flex-col gap-4 text-primary-foreground ${item.className || ""}`}
                    key={`mobile-menu-item-${index}`}
                  >
                    <div className="text-xs text-foreground/60 uppercase">{item.title}</div>
                    <ul className="flex flex-col gap-3">
                      {item.links?.map((link, i) => (
                        <li key={`mobile-nav-link-${i}`}>
                          <Pressable
                            href={link.url}
                            className={`text-primary-foreground ${index === 0 ? "text-2xl" : "text-base"} leading-normal font-medium`}
                          >
                            {link.label}
                          </Pressable>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="col-span-2 flex flex-col gap-4">
                <div className="text-xs text-foreground/60 uppercase">SOCIAL</div>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <Pressable
                      key={`social-link-${index}`}
                      href={link.url}
                      className="text-primary-foreground"
                    >
                      {link.label}
                    </Pressable>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarImagePreview;
