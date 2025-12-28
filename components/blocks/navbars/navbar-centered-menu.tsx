"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
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
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

/**
 * Menu item interface for navigation
 */
interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: string;
  items?: MenuItem[];
}

/**
 * Props for the NavbarCenteredMenu component
 */
export interface NavbarCenteredMenuProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
  optixFlowConfig?: OptixFlowConfig;
}

const defaultMenu: MenuItem[] = [
  { title: "Home", url: "#" },
  {
    title: "Products",
    url: "#",
    items: [
      {
        title: "Blog",
        description: "The latest industry news, updates, and info",
        icon: "lucide/book",
        url: "#",
      },
      {
        title: "Company",
        description: "Our mission is to innovate and empower the world",
        icon: "lucide/trees",
        url: "#",
      },
      {
        title: "Careers",
        description: "Browse job listing and discover our workspace",
        icon: "lucide/sunset",
        url: "#",
      },
      {
        title: "Support",
        description:
          "Get in touch with our support team or visit our community forums",
        icon: "lucide/zap",
        url: "#",
      },
    ],
  },
  {
    title: "Resources",
    url: "#",
    items: [
      {
        title: "Help Center",
        description: "Get all the answers you need right here",
        icon: "lucide/zap",
        url: "#",
      },
      {
        title: "Contact Us",
        description: "We are here to help you with any questions you have",
        icon: "lucide/sunset",
        url: "#",
      },
      {
        title: "Status",
        description: "Check the current status of our services and APIs",
        icon: "lucide/trees",
        url: "#",
      },
      {
        title: "Terms of Service",
        description: "Our terms and conditions for using our services",
        icon: "lucide/book",
        url: "#",
      },
    ],
  },
  {
    title: "Pricing",
    url: "#",
  },
  {
    title: "Blog",
    url: "#",
  },
];

const NavigationMenuWithoutViewport = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root>) => {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Root>
  );
};

const SubMenuLink = ({
  item,
}: {
  item: MenuItem;
}) => {
  return (
    <Pressable
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      {item.icon && (
        <div className="text-muted-foreground">
          <DynamicIcon name={item.icon} size={20} className="shrink-0" />
        </div>
      )}
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Pressable>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="origin-top-center relative top-11 w-full overflow-hidden rounded-md border bg-popover shadow data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:zoom-in-90 md:absolute md:left-1/2 md:w-80 md:-translate-x-1/2">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-full">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Pressable key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </Pressable>
  );
};

/**
 * NavbarCenteredMenu - A responsive navigation bar with centered navigation links and dropdown menus.
 * 
 * Features a logo on the left, centered navigation menu with dropdown submenus that appear
 * directly below their parent items, and auth buttons on the right. Mobile view uses a
 * slide-out sheet with accordion navigation. The dropdowns are centered under their
 * trigger elements for a balanced visual appearance.
 */
export const NavbarCenteredMenu = ({
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  menu = defaultMenu,
  auth = {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
  className,
  optixFlowConfig,
}: NavbarCenteredMenuProps) => {
  return (
    <section className={cn("py-4", className)}>
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          {/* Logo */}
          <Pressable href={logo.url} className="flex items-center gap-2">
            <Img
              src={logo.src}
              className={cn("max-h-8", logo.className)}
              alt={logo.alt}
              optixFlowConfig={optixFlowConfig}
            />
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          </Pressable>
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <NavigationMenuWithoutViewport>
                <NavigationMenuList className="relative">
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenuWithoutViewport>
            </div>
          </div>
          <div className="flex gap-2">
            <Pressable href={auth.login.url} variant="outline" size="sm" asButton>
              {auth.login.title}
            </Pressable>
            <Pressable href={auth.signup.url} size="sm" asButton>
              {auth.signup.title}
            </Pressable>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Pressable href={logo.url} className="flex items-center gap-2">
              <Img
                src={logo.src}
                className={cn("max-h-8", logo.className)}
                alt={logo.alt}
                optixFlowConfig={optixFlowConfig}
              />
            </Pressable>
            <Sheet>
              <SheetTrigger asChild>
                <Pressable variant="outline" size="icon" asButton onClick={() => {}}>
                  <DynamicIcon name="lucide/menu" size={16} />
                </Pressable>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Pressable href={logo.url} className="flex items-center gap-2">
                      <Img
                        src={logo.src}
                        className={cn("max-h-8", logo.className)}
                        alt={logo.alt}
                        optixFlowConfig={optixFlowConfig}
                      />
                    </Pressable>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Pressable href={auth.login.url} variant="outline" asButton>
                      {auth.login.title}
                    </Pressable>
                    <Pressable href={auth.signup.url} asButton>
                      {auth.signup.title}
                    </Pressable>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavbarCenteredMenu;
