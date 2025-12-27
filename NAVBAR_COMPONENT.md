```tsx
"use client";

import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
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
}

const Navbar1 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [
    { title: "Home", url: "#" },
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Company",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Careers",
          description: "Browse job listing and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Support",
          description:
            "Get in touch with our support team or visit our community forums",
          icon: <Zap className="size-5 shrink-0" />,
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
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Contact Us",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Terms of Service",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
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
  ],
  auth = {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
  className,
}: Navbar1Props) => {
  return (
    <section className={cn("py-4", className)}>
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={auth.login.url}>{auth.login.title}</a>
            </Button>
            <Button asChild size="sm">
              <a href={auth.signup.url}>{auth.signup.title}</a>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <img
                src={logo.src}
                className="max-h-8 dark:invert"
                alt={logo.alt}
              />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img
                        src={logo.src}
                        className="max-h-8 dark:invert"
                        alt={logo.alt}
                      />
                    </a>
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
                    <Button asChild variant="outline">
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                    <Button asChild>
                      <a href={auth.signup.url}>{auth.signup.title}</a>
                    </Button>
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

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
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
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar1 };

```

```tsx
"use client";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar2Props {
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
  className?: string;
}

const Navbar2 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [
    { title: "Home", url: "#" },
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Company",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Careers",
          description: "Browse job listing and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Support",
          description:
            "Get in touch with our support team or visit our community forums",
          icon: <Zap className="size-5 shrink-0" />,
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
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Contact Us",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Terms of Service",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
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
  ],
  auth = {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
  className,
}: Navbar2Props) => {
  return (
    <section className={cn("py-4", className)}>
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          {/* Logo */}
          <a href={logo.url} className="flex items-center gap-2">
            <img src={logo.src} className="max-h-8" alt={logo.alt} />
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          </a>
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
            <Button asChild variant="outline" size="sm">
              <a href={auth.login.url}>{auth.login.title}</a>
            </Button>
            <Button asChild size="sm">
              <a href={auth.signup.url}>{auth.signup.title}</a>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-8" alt={logo.alt} />
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="max-h-8" alt={logo.alt} />
                    </a>
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
                    <Button asChild variant="outline">
                      <a href={auth.login.url}>{auth.login.title}</a>
                    </Button>
                    <Button asChild>
                      <a href={auth.signup.url}>{auth.signup.title}</a>
                    </Button>
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
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      <div className="text-muted-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

const NavigationMenuWithoutViewport = ({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean;
}) => {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      {/* The Viewport needs to be removed to center align submenus under their parents. You could remove this from the shadcn/ui component */}
      {/* {viewport && <NavigationMenuViewport />} */}
    </NavigationMenuPrimitive.Root>
  );
};

export { Navbar2 };

```

```tsx
"use client";

import {
  ArrowUpRight,
  BarChart,
  Bitcoin,
  Building,
  Building2,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Cpu,
  Film,
  Fingerprint,
  GraduationCap,
  HeartPulse,
  Leaf,
  Lock,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Logo,
  LogoImageDesktop,
  LogoImageMobile,
} from "@/components/shadcnblocks/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const solutions = [
  {
    title: "Cloud Infrastructure",
    description: "Scalable cloud solutions built for modern businesses.",
    href: "#",
    icon: Cloud,
  },
  {
    title: "Security & Compliance",
    description: "Enterprise-grade security with automated compliance.",
    href: "#",
    icon: Lock,
  },
  {
    title: "Identity Management",
    description: "Advanced authentication and access control systems.",
    href: "#",
    icon: Fingerprint,
  },
];

const useCases = [
  {
    title: "Banking",
    href: "#",
    icon: Building2,
  },
  {
    title: "Healthcare",
    href: "#",
    icon: HeartPulse,
  },
  {
    title: "Technology",
    href: "#",
    icon: Cpu,
  },
  {
    title: "Education",
    href: "#",
    icon: GraduationCap,
  },
  {
    title: "Agriculture",
    href: "#",
    icon: Leaf,
  },
  {
    title: "BaaS",
    href: "#",
    icon: Building,
  },
  {
    title: "Entertainment",
    href: "#",
    icon: Film,
  },
  {
    title: "SaaS",
    href: "#",
    icon: BarChart,
  },
  {
    title: "Crypto",
    href: "#",
    icon: Bitcoin,
  },
];

const documentationLinks = [
  {
    title: "API Reference",
    href: "#",
  },
  {
    title: "SDK Documentation",
    href: "#",
  },
  {
    title: "Integration Guides",
    href: "#",
  },
  {
    title: "Code Examples",
    href: "#",
  },
];

const resources = [
  {
    title: "Blog",
    description: "Latest insights, tutorials, and industry best practices.",
    href: "#",
  },
  {
    title: "News",
    description: "Product updates, announcements, and company news.",
    href: "#",
  },
];

interface Navbar3Props {
  className?: string;
}

const Navbar3 = ({ className }: Navbar3Props) => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<
    "platform" | "usecases" | "developers" | "resources" | null
  >(null);
  return (
    <section className={cn("inset-x-0 top-0 z-20 bg-background", className)}>
      <div className="container">
        <NavigationMenu className="min-w-full [&>div:last-child]:left-1/2 [&>div:last-child]:-translate-x-1/2">
          <div className="flex w-full items-center justify-between gap-12 py-4">
            {/* Logo */}
            <div>
              {(!open || !submenu) && (
                <>
                  <Logo url="https://shadcnblocks.com">
                    <LogoImageDesktop
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblocks-logo-word.svg"
                      className="h-7 dark:invert"
                      alt="Shadcn UI Navbar"
                    />
                    <LogoImageMobile
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblocks-logo.svg"
                      className="h-7 dark:invert"
                      alt="Shadcn UI Navbar"
                    />
                  </Logo>
                </>
              )}
              {open && submenu && (
                <Button variant="outline" onClick={() => setSubmenu(null)}>
                  Back
                  <ChevronLeft className="ml-2 size-4" />
                </Button>
              )}
            </div>

            <NavigationMenuList className="hidden lg:flex">
              <NavigationMenuItem>
                <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[900px] p-6">
                  <div className="flex justify-between gap-8">
                    <NavigationMenuLink
                      href="#"
                      className="group w-1/3 p-0 hover:bg-transparent"
                    >
                      <div className="overflow-clip rounded-lg border border-input bg-background">
                        <div>
                          <img
                            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                            alt="Placeholder image"
                            className="aspect-[4/3] object-cover object-center"
                          />
                        </div>
                        <div className="p-5 xl:p-8">
                          <div className="mb-2 text-base">
                            Platform Overview
                          </div>
                          <div className="text-sm font-normal text-muted-foreground">
                            Discover how our platform transforms your workflow.
                          </div>
                        </div>
                      </div>
                    </NavigationMenuLink>
                    <div className="max-w-[760px] flex-1">
                      <div className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
                        Solutions
                      </div>
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                        {solutions.map((solution, index) => (
                          <NavigationMenuLink
                            key={index}
                            href={solution.href}
                            className="group block p-4"
                          >
                            <div className="mb-5 group-hover:opacity-60">
                              <solution.icon className="size-5" />
                            </div>
                            <div className="mb-1 text-base">
                              {solution.title}
                            </div>
                            <div className="text-sm font-normal text-muted-foreground">
                              {solution.description}
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Use cases</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[900px] p-6">
                  <div className="flex justify-between gap-4">
                    <div className="w-1/2 max-w-[510px]">
                      <div className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
                        Use cases
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {useCases.map((useCase, index) => (
                          <NavigationMenuLink
                            key={index}
                            href={useCase.href}
                            className="group flex flex-row items-center gap-5"
                          >
                            <div className="group-hover:opacity-60">
                              <useCase.icon className="size-4" />
                            </div>
                            <div className="text-base">{useCase.title}</div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                    <NavigationMenuLink
                      href="#"
                      className="group flex-1 p-0 hover:bg-transparent"
                    >
                      <div className="flex h-full rounded-lg border border-input bg-background p-0 hover:bg-transparent">
                        <div className="w-2/5 max-w-[310px] shrink-0 overflow-clip rounded-tl-lg rounded-bl-lg">
                          <img
                            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                            alt="Placeholder image"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="flex flex-col p-5 xl:p-8">
                          <div className="mb-8 text-xs tracking-widest text-muted-foreground uppercase">
                            For user persona
                          </div>
                          <div className="mt-auto">
                            <div className="mb-4 text-xl">
                              Call to action for user persona
                            </div>
                            <div className="text-sm font-normal text-muted-foreground">
                              Tailored solutions designed specifically for your
                              team's unique needs.
                            </div>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Developers</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[900px] p-6">
                  <div className="flex justify-between gap-8">
                    <div className="w-1/3 max-w-[404px]">
                      <div className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">
                        Documentation
                      </div>
                      <div className="mb-6 text-sm font-normal text-muted-foreground">
                        Call to action for developers
                      </div>
                      <div className="-ml-2.5 space-y-2.5">
                        {documentationLinks.map((documentationLink, index) => (
                          <NavigationMenuLink
                            key={index}
                            href={documentationLink.href}
                            className="group flex flex-row items-center gap-2.5 rounded-md p-2.5 focus:text-accent-foreground"
                          >
                            <ArrowUpRight className="size-4" />
                            <div className="text-base">
                              {documentationLink.title}
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                    <div className="max-w-[716px] flex-1 space-y-6">
                      <NavigationMenuLink
                        href="#"
                        className="flex flex-row items-center overflow-clip rounded-lg border border-input bg-background p-0 hover:bg-transparent"
                      >
                        <div className="flex-1 p-5 xl:p-8">
                          <div className="mb-2 text-base">Showcase link</div>
                          <div className="text-sm font-normal text-muted-foreground">
                            Explore real-world implementations and success
                            stories from our community.
                          </div>
                        </div>
                        <div className="h-[154px] max-w-[264px] shrink-0">
                          <img
                            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                            alt="Placeholder image"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        href="#"
                        className="flex flex-row items-center overflow-clip rounded-lg border border-input bg-background p-0 hover:bg-transparent"
                      >
                        <div className="flex-1 p-5 xl:p-8">
                          <div className="mb-2 text-base">
                            Another showcase link
                          </div>
                          <div className="text-sm font-normal text-muted-foreground">
                            Learn best practices and advanced techniques from
                            expert developers.
                          </div>
                        </div>
                        <div className="h-[154px] max-w-[264px] shrink-0">
                          <img
                            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                            alt="Placeholder image"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[900px] p-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="flex flex-1 flex-col">
                      <div className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
                        Resources
                      </div>
                      <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2">
                        {resources.map((resource, index) => (
                          <NavigationMenuLink
                            key={index}
                            href={resource.href}
                            className="flex h-full flex-col overflow-clip rounded-lg border border-input bg-background p-5 hover:bg-accent hover:text-accent-foreground xl:p-8"
                          >
                            <div className="mt-auto">
                              <div className="mb-2 text-base">
                                {resource.title}
                              </div>
                              <div className="text-sm font-normal text-muted-foreground">
                                {resource.description}
                              </div>
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                    <div className="">
                      <div className="mb-6 text-xs tracking-widest text-muted-foreground uppercase">
                        Customers
                      </div>
                      <NavigationMenuLink
                        href="#"
                        className="mb-6 flex flex-row overflow-clip rounded-lg border border-input bg-background p-0 hover:bg-transparent"
                      >
                        <div className="flex-1 p-5 xl:p-8">
                          <div className="mb-2 text-base">Customers</div>
                          <div className="text-sm font-normal text-muted-foreground">
                            See how leading companies leverage our platform to
                            drive innovation.
                          </div>
                        </div>
                        <div className="w-1/3 max-w-[130px] shrink-0">
                          <img
                            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                            alt="Placeholder image"
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        href="#"
                        className="flex flex-row items-center gap-3 rounded-lg bg-secondary/30 p-3 hover:bg-secondary/80 focus:bg-secondary/80"
                      >
                        <Badge variant="secondary">NEW</Badge>
                        <span className="text-sm text-ellipsis text-secondary-foreground">
                          Introducing our latest feature: enhanced analytics
                          dashboard
                        </span>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <div className="hidden items-center gap-2 lg:flex">
              <Button variant="ghost">Login</Button>
              <Button variant="outline">
                Start now
                <ChevronRight className="size-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4 lg:hidden">
              <Button
                variant="outline"
                size="icon"
                aria-label="Main Menu"
                onClick={() => {
                  if (open) {
                    setOpen(false);
                    setSubmenu(null);
                  } else {
                    setOpen(true);
                  }
                }}
              >
                {!open && <Menu className="size-4" />}
                {open && <X className="size-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu (Root) */}
          {open && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <div>
                <button
                  type="button"
                  className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                  onClick={() => setSubmenu("platform")}
                >
                  <span className="flex-1">Platform</span>
                  <span className="shrink-0">
                    <ChevronRight className="size-4" />
                  </span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                  onClick={() => setSubmenu("usecases")}
                >
                  <span className="flex-1">Use cases</span>
                  <span className="shrink-0">
                    <ChevronRight className="size-4" />
                  </span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                  onClick={() => setSubmenu("developers")}
                >
                  <span className="flex-1">Developers</span>
                  <span className="shrink-0">
                    <ChevronRight className="size-4" />
                  </span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                  onClick={() => setSubmenu("resources")}
                >
                  <span className="flex-1">Resources</span>
                  <span className="shrink-0">
                    <ChevronRight className="size-4" />
                  </span>
                </button>
              </div>
              <div className="mx-[2rem] mt-auto flex flex-col gap-4 py-12">
                <Button variant="outline" className="relative" size="lg">
                  Login
                </Button>
                <Button className="relative" size="lg">
                  Start now
                </Button>
              </div>
            </div>
          )}
          {/* Mobile Menu > Platform */}
          {open && submenu === "platform" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <a href="#" className="block space-y-6 px-8 py-8">
                <div className="w-full overflow-clip rounded-lg">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                    alt="Placeholder image"
                    className="aspect-2/1 h-full w-full object-cover object-center"
                  />
                </div>
                <div>
                  <div className="mb-2 text-base">Platform Overview</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Pellentesque nec odio id elit dapibus rutrum.
                  </div>
                </div>
              </a>
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                Solutions
              </div>
              <div className="border-t border-border pb-16">
                {solutions.map((solution, index) => (
                  <a
                    key={index}
                    href={solution.href}
                    className="group flex w-full items-start gap-x-4 border-b border-border px-8 py-7 text-left hover:bg-accent"
                  >
                    <div className="shrink-0">
                      <solution.icon className="size-6" />
                    </div>
                    <div>
                      <div className="mb-1.5 text-base">{solution.title}</div>
                      <div className="text-sm font-normal text-muted-foreground">
                        {solution.description}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
          {/* Mobile Menu > Use cases */}
          {open && submenu === "usecases" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll bg-background lg:hidden">
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                Use cases
              </div>
              <div>
                {useCases.map((useCase, index) => (
                  <a
                    key={index}
                    href={useCase.href}
                    className="group flex w-full items-start gap-x-4 border-t border-border px-8 py-7 text-left hover:bg-accent"
                  >
                    <div className="shrink-0">
                      <useCase.icon className="size-6" />
                    </div>
                    <div className="text-base">{useCase.title}</div>
                  </a>
                ))}
              </div>
              <div className="bg-secondary/30 px-8 pt-8 pb-16">
                <div className="mb-7 text-xs tracking-widest text-muted-foreground uppercase">
                  For user persona
                </div>
                <a href="#" className="block space-y-6">
                  <div className="overflow-clip rounded-lg">
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                      alt="Placeholder image"
                      className="aspect-2/1 h-full w-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <div className="mb-1.5 text-base">
                      Call to action for user persona
                    </div>
                    <div className="text-sm font-normal text-muted-foreground">
                      Etiam ornare venenatis neque, sit amet suscipit diam
                      pulvinar a.
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}
          {/* Mobile Menu > Developers */}
          {open && submenu === "developers" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <a href="#" className="block space-y-6 px-8 py-8">
                <div className="w-full overflow-clip rounded-lg">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                    alt="Placeholder image"
                    className="aspect-2/1 h-full w-full object-cover object-center"
                  />
                </div>
                <div>
                  <div className="mb-2 text-base">Start with our API</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Comprehensive documentation and guides to help you integrate
                    quickly.
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="block space-y-6 border-t border-border px-8 py-8"
              >
                <div className="w-full overflow-clip rounded-lg">
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                    alt="Placeholder image"
                    className="aspect-2/1 h-full w-full object-cover object-center"
                  />
                </div>
                <div>
                  <div className="mb-2 text-base">Quick Start</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Get up and running in minutes with our step-by-step
                    tutorials and examples.
                  </div>
                </div>
              </a>
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                Documentation
              </div>
              <div className="-mx-2.5 space-y-2.5 px-8 pb-16">
                {documentationLinks.map((documentationLink, index) => (
                  <NavigationMenuLink
                    key={index}
                    href={documentationLink.href}
                    className="py-[18px]focus:text-accent-foreground group flex flex-row items-center gap-2.5 rounded-md px-2.5"
                  >
                    <div className="flex size-5 items-center justify-center rounded">
                      <ArrowUpRight className="size-3" />
                    </div>
                    <div className="text-sm">{documentationLink.title}</div>
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          )}
          {/* Mobile Menu > Resources */}
          {open && submenu === "resources" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll bg-background lg:hidden">
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                Resources
              </div>
              <div>
                {resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.href}
                    className="group flex w-full items-start gap-x-4 border-t border-border px-8 py-7 text-left hover:bg-accent"
                  >
                    <div>
                      <div className="mb-1.5 text-base">{resource.title}</div>
                      <div className="text-sm font-normal text-muted-foreground">
                        {resource.description}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="px-8 pt-8 pb-16">
                <div className="mb-7 text-xs tracking-widest text-muted-foreground uppercase">
                  Customers
                </div>
                <a href="#" className="block space-y-6">
                  <div className="overflow-clip rounded-lg">
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                      alt="Placeholder image"
                      className="aspect-2/1 h-full w-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <div className="mb-1.5 text-base">Customers</div>
                    <div className="text-sm font-normal text-muted-foreground">
                      See how leading companies leverage our platform to drive
                      innovation.
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}
        </NavigationMenu>
      </div>
    </section>
  );
};

export { Navbar3 };

```

```tsx
"use client";

import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  Book,
  Building,
  Building2,
  Calculator,
  Calendar,
  CheckCircle2,
  Clock,
  Code,
  Computer,
  DollarSign,
  File,
  Flag,
  Gavel,
  Globe,
  Globe2,
  Lightbulb,
  Lock,
  Menu,
  Mic,
  Newspaper,
  Phone,
  PieChart,
  Play,
  PlayCircle,
  Puzzle,
  Pyramid,
  Rocket,
  Scale,
  Search,
  ShieldCheck,
  Speech,
  Table,
  UserPlus,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { Fragment, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const solutions = [
  {
    id: "solution-1",
    title: "Team Management",
    description: "Streamline team collaboration and project workflows.",
    href: "#",
    subpages: [
      {
        id: "subpage-1",
        title: "Task Management",
        href: "#",
        icon: File,
      },
      {
        id: "subpage-2",
        title: "Team Planning",
        href: "#",
        icon: Building,
      },
      {
        id: "subpage-3",
        title: "Resource Allocation",
        href: "#",
        icon: Search,
      },
      {
        id: "subpage-4",
        title: "Time Tracking",
        href: "#",
        icon: File,
      },
      {
        id: "subpage-5",
        title: "Team Analytics",
        href: "#",
        icon: UserPlus,
      },
    ],
  },
  {
    id: "solution-2",
    title: "Project Management",
    description: "Plan, track, and deliver projects with confidence.",
    href: "#",
    subpages: [
      {
        id: "subpage-6",
        title: "Project Templates",
        href: "#",
        icon: CheckCircle2,
      },
      {
        id: "subpage-7",
        title: "Timeline Views",
        href: "#",
        icon: UserRound,
      },
      {
        id: "subpage-8",
        title: "Risk Management",
        href: "#",
        icon: ShieldCheck,
      },
      {
        id: "subpage-9",
        title: "Budget Tracking",
        href: "#",
        icon: Scale,
      },
      {
        id: "subpage-10",
        title: "Global Teams",
        href: "#",
        icon: Globe,
      },
    ],
  },
  {
    id: "solution-3",
    title: "Workflow Automation",
    description: "Automate repetitive tasks and focus on what matters.",
    href: "#",
    subpages: [
      {
        id: "subpage-11",
        title: "Custom Workflows",
        href: "#",
        icon: Globe2,
      },
      {
        id: "subpage-12",
        title: "Process Templates",
        href: "#",
        icon: Clock,
      },
      {
        id: "subpage-13",
        title: "Business Rules",
        href: "#",
        icon: DollarSign,
      },
      {
        id: "subpage-14",
        title: "Integrations",
        href: "#",
        icon: Phone,
      },
      {
        id: "subpage-15",
        title: "API Access",
        href: "#",
        icon: Speech,
      },
    ],
  },
  {
    id: "solution-4",
    title: "Enterprise Solutions",
    description: "Scale your organization with enterprise-grade features.",
    href: "#",
    subpages: [
      {
        id: "subpage-16",
        title: "Advanced Analytics",
        href: "#",
        icon: PieChart,
      },
      {
        id: "subpage-17",
        title: "Security Controls",
        href: "#",
        icon: Calculator,
      },
      {
        id: "subpage-18",
        title: "Custom Reporting",
        href: "#",
        icon: Table,
      },
    ],
  },
];

const solutionTechnologies = [
  {
    id: "technology-1",
    title: "Integration Platform",
    href: "#",
    icon: Puzzle,
  },
  {
    id: "technology-2",
    title: "Enterprise Security",
    href: "#",
    icon: Lock,
  },
  {
    id: "technology-3",
    title: "Developer API",
    href: "#",
    icon: Code,
  },
];

const productCategories = [
  {
    title: "Core Products",
    products: [
      {
        id: "product-1",
        title: "Task Management",
        description: "Organize and track work efficiently.",
        href: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
      },
      {
        id: "product-2",
        title: "Team Calendar",
        description: "Coordinate schedules and deadlines.",
        href: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg",
      },
      {
        id: "product-3",
        title: "Workflows",
        description: "Automate your business processes.",
        href: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg",
      },
    ],
  },
  {
    title: "Advanced Features",
    products: [
      {
        id: "product-4",
        title: "Portfolio Management",
        description: "Track and optimize project portfolios at scale.",
        href: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg",
      },
      {
        id: "product-5",
        title: "Resource Planning",
        description: "Optimize team workload and capacity.",
        href: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-5.svg",
      },
    ],
  },
];

const globalCategories = [
  {
    title: "Enterprise Solutions",
    features: [
      {
        id: "feature-1",
        title: "Digital Transformation",
        description: "Transform how your organization works with our platform.",
        href: "#",
        icon: Rocket,
      },
      {
        id: "feature-2",
        title: "Change Management",
        description: "Expert guidance for organizational change and adoption.",
        href: "#",
        icon: Building2,
      },
      {
        id: "feature-3",
        title: "Global Deployment",
        description: "Roll out and scale across global teams seamlessly.",
        href: "#",
        icon: Globe2,
      },
    ],
  },
  {
    title: "Business Solutions",
    features: [
      {
        id: "feature-4",
        title: "Customer Success",
        description: "Dedicated support for your business needs.",
        href: "#",
        icon: Phone,
      },
      {
        id: "feature-5",
        title: "Compliance",
        description: "Meet industry standards and regulations.",
        href: "#",
        icon: Gavel,
      },
      {
        id: "feature-6",
        title: "ROI Calculator",
        description: "Measure the impact on your business.",
        href: "#",
        icon: DollarSign,
      },
      {
        id: "feature-7",
        title: "IT Solutions",
        description: "Enterprise-grade security and administration tools.",
        href: "#",
        icon: Computer,
      },
      {
        id: "feature-8",
        title: "Strategic Planning",
        description: "Align teams and track company objectives.",
        href: "#",
        icon: Flag,
      },
    ],
  },
];

const regions = [
  {
    title: "Asia-Pacific",
    locations: [
      {
        title: "China",
        href: "#",
        icon: "🇨🇳",
      },
      {
        title: "India",
        href: "#",
        icon: "🇮🇳",
      },
      {
        title: "Japan",
        href: "#",
        icon: "🇯🇵",
      },
      {
        title: "Thailand",
        href: "#",
        icon: "🇹🇭",
      },
    ],
  },
  {
    title: "Europe",
    locations: [
      {
        title: "Italy",
        href: "#",
        icon: "🇮🇹",
      },
      {
        title: "Germany",
        href: "#",
        icon: "🇩🇪",
      },
      {
        title: "Poland",
        href: "#",
        icon: "🇵🇱",
      },
      {
        title: "United Kingdom",
        href: "#",
        icon: "🇬🇧",
      },
    ],
  },
  {
    title: "Americas",
    locations: [
      {
        title: "Brazil",
        href: "#",
        icon: "🇧🇷",
      },
      {
        title: "Canada",
        href: "#",
        icon: "🇨🇦",
      },
      {
        title: "Mexico",
        href: "#",
        icon: "🇲🇽",
      },
      {
        title: "United States",
        href: "#",
        icon: "🇺🇸",
      },
    ],
  },
  {
    title: "Middle East/Africa",
    locations: [
      {
        title: "Egypt",
        href: "#",
        icon: "🇸🇦",
      },
      {
        title: "Nigeria",
        href: "#",
        icon: "🇳🇬",
      },
      {
        title: "Türkiye",
        href: "#",
        icon: "🇹🇷",
      },
      {
        title: "United Arab Emirates",
        href: "#",
        icon: "🇦🇪",
      },
    ],
  },
];

const resources = [
  {
    id: "resource-1",
    title: "Events & Webinars",
    description: "Learn from industry experts.",
    href: "#",
    icon: Calendar,
  },
  {
    id: "resource-2",
    title: "Podcasts",
    description: "Insights on productivity and leadership.",
    href: "#",
    icon: Mic,
  },
  {
    id: "resource-3",
    title: "Blog",
    description: "Latest updates and best practices.",
    href: "#",
    icon: Newspaper,
  },
  {
    id: "resource-4",
    title: "Video Tutorials",
    description: "Get started with guided videos.",
    href: "#",
    icon: PlayCircle,
  },
  {
    id: "resource-5",
    title: "Knowledge Base",
    description: "Detailed guides and documentation.",
    href: "#",
    icon: Book,
  },
  {
    id: "resource-6",
    title: "Success Stories",
    description: "See how others achieve more.",
    href: "#",
    icon: Lightbulb,
  },
];

const topicGroups = [
  {
    title: "Learning Resources",
    topics: [
      {
        id: "topic-1",
        title: "Getting Started Guide",
        href: "#",
        icon: Globe,
      },
      {
        id: "topic-2",
        title: "Product Updates",
        href: "#",
        icon: Rocket,
      },
      {
        id: "topic-3",
        title: "Best Practices",
        href: "#",
        icon: Pyramid,
      },
      {
        id: "topic-4",
        title: "Integrations",
        href: "#",
        icon: ArrowRightLeft,
      },
      {
        id: "topic-5",
        title: "API Documentation",
        href: "#",
        icon: AppWindow,
      },
    ],
  },
  {
    title: "Community",
    topics: [
      {
        id: "topic-6",
        title: "Community Forum",
        href: "#",
        icon: Play,
      },
    ],
  },
];

const SolutionsMenu = () => (
  <div className="grid gap-8 sm:grid-cols-2">
    <a
      href="#"
      className="group relative flex h-full flex-row overflow-hidden rounded-lg bg-primary px-0 pt-8 text-primary-foreground lg:rounded-xl lg:px-6"
    >
      <div className="relative flex w-full flex-col space-y-12 text-left md:space-y-8 lg:w-full lg:flex-row lg:justify-between lg:space-y-0 lg:space-x-6 xl:space-x-8">
        <div className="relative flex flex-col px-6 lg:mb-6 lg:px-0">
          <span className="mb-6 text-xs font-medium tracking-wider uppercase md:mb-8">
            Transform Your Workflow
          </span>
          <div className="mt-auto flex items-center space-x-1 text-xs">
            Discover Our Platform
            <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
          </div>
          <p className="mt-2 text-xs text-primary-foreground/85">
            Streamline collaboration, automate workflows, and boost productivity
            across your organization.
          </p>
        </div>
        <div className="relative aspect-2/1 overflow-clip rounded-t pl-6 lg:max-w-64 lg:pl-0 xl:max-w-96">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="aspect-2/1 h-full w-full translate-y-px object-cover object-center"
          />
        </div>
      </div>
    </a>

    <div className="order-last mt-3 sm:order-none sm:mt-0 sm:py-2 md:p-6">
      <div className="mb-4 text-left leading-none md:col-span-2 lg:col-span-4 lg:mb-6">
        <strong className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Developer Platform
        </strong>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {solutionTechnologies.map((technology) => (
          <NavigationMenuLink
            key={technology.id}
            href="#"
            className="group flex flex-row items-center gap-4"
          >
            <technology.icon className="size-4" />
            <div className="flex-1 text-sm font-medium">{technology.title}</div>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
          </NavigationMenuLink>
        ))}
      </div>
    </div>
    <div className="col-span-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {solutions.map((solution) => (
        <div key={solution.id} className="rounded-md border border-border p-5">
          <div className="border-b border-border pb-4">
            <a href={solution.href} className="group flex flex-col text-left">
              <div className="flex items-center">
                <strong className="text-sm font-medium">
                  {solution.title}
                </strong>
                <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {solution.description}
              </p>
            </a>
          </div>
          <menu className="mt-6 grid gap-y-4">
            {solution.subpages.map((subpage) => (
              <NavigationMenuLink
                key={subpage.id}
                href={subpage.href}
                className="group flex flex-row items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0"
              >
                <subpage.icon className="size-4" />
                <div className="flex-1 text-sm font-medium">
                  {subpage.title}
                </div>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
              </NavigationMenuLink>
            ))}
          </menu>
        </div>
      ))}
    </div>
  </div>
);

const ProductsMenu = () => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <a
        href="#"
        className="group relative flex h-full flex-row overflow-hidden rounded-lg px-0 text-primary-foreground lg:rounded-xl"
      >
        <div className="relative z-10 flex w-full flex-col text-left">
          <div className="relative flex aspect-2/1 max-h-[11rem] w-full flex-1 justify-center">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
              alt="placeholder"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="relative z-20 flex flex-col rounded-b-xl bg-primary p-6">
            <div className="flex items-center space-x-1 text-xs">
              Enterprise Solutions
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="mt-2 text-xs text-primary-foreground/70">
              Scale your business with enterprise-grade features and support.
            </p>
          </div>
        </div>
      </a>
    </div>
    <div className="grid w-full gap-y-12 lg:gap-y-6">
      {productCategories.map((category) => (
        <div key={category.title} className="grid gap-y-2 lg:gap-y-6">
          <div className="border-border text-left lg:border-b lg:pb-3">
            <strong className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {category.title}
            </strong>
          </div>
          <menu className="grid md:grid-cols-3 md:gap-x-5 lg:gap-y-7">
            {category.products.map((product) => (
              <NavigationMenuLink
                key={product.id}
                href="#"
                className="group flex flex-row items-center space-x-6 border-b border-border py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2"
              >
                <div className="relative flex aspect-square w-6 shrink-0 items-center justify-center overflow-clip rounded md:size-9 md:p-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="dark:invert"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground/85 group-hover:text-foreground">
                    {product.title}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground">
                    {product.description}
                  </p>
                </div>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
              </NavigationMenuLink>
            ))}
          </menu>
        </div>
      ))}
    </div>
  </div>
);

const GlobalGuidanceMenu = () => (
  <div>
    <div className="space-y-6 lg:flex lg:space-y-0 lg:space-x-8">
      <div className="w-full shrink-0 lg:max-w-[18rem]">
        <a
          href="#"
          className="group relative flex h-full flex-row overflow-hidden rounded-lg p-0 text-primary-foreground lg:rounded-xl"
        >
          <div className="relative z-10 flex w-full flex-col-reverse text-left lg:flex-col">
            <div className="relative flex aspect-4/3 max-h-[18rem] w-full flex-1 justify-center">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg"
                alt="placeholder"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative z-20 flex flex-col rounded-b-xl bg-primary p-6">
              <div className="flex items-center space-x-1 text-xs">
                Enterprise Solutions
                <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="mt-2 text-xs text-primary-foreground/85">
                Scale your business with enterprise-grade features and support.
              </p>
            </div>
          </div>
        </a>
      </div>
      <div className="grid w-full gap-y-12 lg:gap-y-6">
        {globalCategories.map((category) => (
          <div key={category.title} className="grid gap-y-2 lg:gap-y-6">
            <div className="border-border text-left lg:border-b lg:pb-3">
              <strong className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">
                {category.title}
              </strong>
            </div>
            <menu className="grid md:grid-cols-3 md:gap-x-6 lg:gap-y-6">
              {category.features.map((feature) => (
                <NavigationMenuLink
                  key={feature.id}
                  href="#"
                  className="group flex flex-row items-center space-x-4 border-b border-border py-5 text-left sm:py-7 lg:border-0 lg:py-0"
                >
                  <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                    <feature.icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground/85 group-hover:text-foreground">
                      {feature.title}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground">
                      {feature.description}
                    </p>
                  </div>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
                </NavigationMenuLink>
              ))}
            </menu>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-8">
      <div className="mb-6 border-border pb-1 text-left lg:border-b">
        <strong className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Popular Locations
        </strong>
      </div>
      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        {regions.map((region) => (
          <div
            key={region.title}
            className="space-y-6 rounded-md border border-border p-6 lg:border-0 lg:p-0"
          >
            <div className="text-left text-xs text-muted-foreground">
              {region.title}
            </div>
            <menu className="grid gap-y-3 border-t border-border pt-6 lg:border-0 lg:pt-0">
              {region.locations.map((location) => (
                <NavigationMenuLink
                  key={location.title}
                  href={location.href}
                  className="group flex flex-row items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0 lg:py-0"
                >
                  <div className="flex size-4 items-center justify-center">
                    {location.icon}
                  </div>
                  <div className="flex-1 text-sm font-medium">
                    {location.title}
                  </div>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
                </NavigationMenuLink>
              ))}
            </menu>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PartnersMenu = () => (
  <div className="grid gap-y-6 md:grid-cols-2 md:gap-x-6 lg:grid-cols-4">
    <div className="md:col-span-2">
      <a
        href="#"
        className="group relative flex h-full flex-row overflow-hidden rounded-lg bg-primary p-0 text-primary-foreground lg:rounded-xl"
      >
        <div className="relative z-10 flex w-full flex-col-reverse text-left">
          <div className="relative z-20 flex flex-col px-6 pt-6 pb-[14rem] md:pt-40 md:pb-6">
            <div className="mt-auto flex items-center space-x-1 text-xs font-medium">
              Partner Program
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="mt-2 text-xs">
              Join our partner network and grow your business with our leading
              productivity platform.
            </p>
          </div>
          <div className="absolute inset-0 top-[32%] bg-accent invert md:top-0">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
              alt="placeholder"
              className="object-fit h-full w-full object-top-right opacity-100 md:h-2/3 md:object-top"
            />
          </div>
        </div>
      </a>
    </div>
    <div className="md:col-span-1">
      <a
        href="#"
        className="group relative flex h-full flex-row overflow-hidden rounded-lg bg-accent p-0 text-accent-foreground lg:rounded-xl"
      >
        <div className="relative z-10 flex w-full flex-col-reverse text-left">
          <div className="relative z-20 flex flex-col px-6 pt-6 pb-[14rem] md:pt-40 md:pb-6">
            <div className="mt-auto flex items-center space-x-1 text-xs font-medium">
              Solution Partners
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Build and deliver solutions that help customers achieve more.
            </p>
          </div>
          <div className="absolute inset-0 top-[32%] md:top-0">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg"
              alt="placeholder"
              className="object-fit h-full w-full object-top-right md:h-2/3 md:object-top"
            />
          </div>
        </div>
      </a>
    </div>
    <div className="grid gap-4 md:col-span-1">
      <NavigationMenuLink
        href="#"
        className="group flex w-full flex-row items-center rounded-lg border border-border lg:rounded-xl"
      >
        <div className="flex items-start p-6 text-left">
          <Users className="size-8" />
          <div className="ml-4">
            <div className="mt-auto mb-1 text-sm font-bold text-foreground/85 hover:text-foreground">
              Implementation Partners
            </div>
            <p className="text-xs text-muted-foreground group-hover:text-foreground">
              Velit incididunt duis id consequat elit.
            </p>
          </div>
        </div>
      </NavigationMenuLink>
      <NavigationMenuLink
        href="#"
        className="group flex w-full flex-row items-center rounded-lg border border-border lg:rounded-xl"
      >
        <div className="flex items-start p-6 text-left">
          <Computer className="size-8" />
          <div className="ml-4">
            <div className="mt-auto mb-1 text-sm font-bold text-foreground/85 hover:text-foreground">
              Technology Partners
            </div>
            <p className="text-xs text-muted-foreground group-hover:text-foreground">
              Consequat nulla ex culpa aliquip ad.
            </p>
          </div>
        </div>
      </NavigationMenuLink>
    </div>
  </div>
);

const ResourcesMenu = () => (
  <div className="grid gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-4 lg:gap-6">
    <div className="col-span-1">
      <a
        href="#"
        className="group relative flex h-full flex-row overflow-hidden rounded-lg bg-primary p-0 text-primary-foreground lg:rounded-xl"
      >
        <div className="relative z-10 flex w-full flex-col-reverse text-left">
          <div className="relative z-20 flex flex-col px-6 pt-6 pb-[14rem] md:pt-40 md:pb-6">
            <div className="mt-auto flex items-center space-x-1 text-xs">
              Resource Center
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </div>
            <p className="mt-2 text-xs">
              Access guides, tutorials, and best practices to maximize your
              success.
            </p>
          </div>
          <div className="absolute inset-0">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg"
              alt="placeholder"
              className="h-full w-full object-cover object-center invert"
            />
          </div>
          <div className="absolute inset-x-0 top-0 z-10 h-[60%] bg-[linear-gradient(hsl(var(--color-primary))_50%,transparent)] md:top-auto md:bottom-[-10%] md:h-[50%] md:bg-[linear-gradient(transparent,hsl(var(--color-primary))_50%)]"></div>
        </div>
      </a>
    </div>
    <div className="lg:col-span-2 lg:flex lg:flex-col">
      <div>
        <div className="mb-4 border-border pb-3 text-left md:mb-6 lg:border-b">
          <strong className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Featured Resources
          </strong>
        </div>
      </div>
      <menu className="grid gap-y-4 lg:h-full lg:grid-cols-2 lg:gap-6">
        {resources.map((resource) => (
          <NavigationMenuLink
            key={resource.id}
            href={resource.href}
            className="group flex flex-row items-center space-x-4 rounded-md border-border bg-accent px-6 py-5 text-left md:space-x-5 lg:border lg:bg-background lg:p-5"
          >
            <resource.icon className="size-6 sm:size-7" />
            <div className="ml-4 flex-1">
              <div className="text-sm font-medium text-foreground/85 group-hover:text-foreground">
                {resource.title}
              </div>
              <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground">
                {resource.description}
              </p>
            </div>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
          </NavigationMenuLink>
        ))}
      </menu>
    </div>
    <div className="col-span-1 md:col-span-2 lg:col-span-1">
      {topicGroups.map((group) => (
        <Fragment key={group.title}>
          <div className="mb-4 border-border pb-3 text-left md:col-span-2 md:mb-7 lg:border-b">
            <strong className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Learning & Support
            </strong>
          </div>
          <menu className="mb-7 grid md:grid-cols-2 md:gap-x-6 lg:grid-cols-1 lg:gap-x-0">
            {group.topics.map((topic) => (
              <NavigationMenuLink
                key={topic.id}
                href={topic.href}
                className="group flex flex-row items-center space-x-6 border-b border-border py-5 text-left sm:py-8 lg:space-x-4 lg:border-0 lg:py-0"
              >
                <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                  <topic.icon className="size-5" />
                </div>
                <div className="flex-1 text-xs font-medium text-foreground/85 group-hover:text-foreground md:text-sm">
                  {topic.title}
                </div>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 lg:hidden" />
              </NavigationMenuLink>
            ))}
          </menu>
        </Fragment>
      ))}
    </div>
  </div>
);

const navigationMenuItems = [
  {
    key: "solutions",
    label: "Solutions",
    component: SolutionsMenu,
  },
  {
    key: "products",
    label: "Products",
    component: ProductsMenu,
  },
  {
    key: "global",
    label: "Company",
    component: GlobalGuidanceMenu,
  },
  {
    key: "partners",
    label: "Partners",
    component: PartnersMenu,
  },
  {
    key: "resources",
    label: "Resources",
    component: ResourcesMenu,
  },
] as const;

interface Navbar4Props {
  className?: string;
}

const Navbar4 = ({ className }: Navbar4Props) => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<
    "solutions" | "products" | "global" | "partners" | "resources" | null
  >(null);

  return (
    <section className={cn("inset-x-0 top-0 z-20 bg-background", className)}>
      <div className="container">
        <NavigationMenu className="min-w-full [&>div:last-child]:left-auto">
          <div className="flex w-full justify-between gap-2 py-4">
            <a
              href="https://www.shadcnblocks.com"
              className="flex items-center gap-2"
            >
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                className="max-h-8 dark:invert"
                alt="Shadcn UI Navbar"
              />
              <span className="text-lg font-semibold tracking-tighter">
                Shadcnblocks.com
              </span>
            </a>
            <div className="flex items-center gap-2 xl:gap-8">
              <NavigationMenuList className="hidden gap-0 lg:flex">
                {navigationMenuItems.map((item) => (
                  <NavigationMenuItem key={item.key}>
                    <NavigationMenuTrigger className="text-xs xl:text-sm">
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="min-w-[calc(100vw-4rem)] p-12 2xl:min-w-[calc(1400px-4rem)]">
                      <item.component />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </div>
            <div className="flex items-center gap-2">
              <Button className="hidden md:block">Login</Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Main Menu"
                className="lg:hidden"
                onClick={() => {
                  if (open) {
                    setOpen(false);
                    setSubmenu(null);
                  } else {
                    setOpen(true);
                  }
                }}
              >
                {!open && <Menu className="size-4" />}
                {open && <X className="size-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="fixed inset-0 top-[72px] container flex h-[calc(100vh-72px)] w-full flex-col overflow-auto border-t border-border bg-background lg:hidden">
              {submenu && (
                <div className="mt-3">
                  <Button
                    variant="link"
                    onClick={() => setSubmenu(null)}
                    className="relative -left-4"
                  >
                    <ArrowLeft className="size-4 text-xs" />
                    Go back
                  </Button>
                </div>
              )}
              {submenu === null && (
                <div>
                  {navigationMenuItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className="flex w-full items-center border-b border-border py-6 text-left"
                      onClick={() => setSubmenu(item.key)}
                    >
                      <span className="flex-1 text-sm font-medium">
                        {item.label}
                      </span>
                      <span className="shrink-0">
                        <ArrowRight className="size-4" />
                      </span>
                    </button>
                  ))}
                </div>
              )}
              {navigationMenuItems.map(
                (item) =>
                  submenu === item.key && (
                    <div key={item.key}>
                      <h2 className="pt-4 pb-6 text-lg font-medium">
                        {item.label}
                      </h2>
                      <item.component />
                    </div>
                  ),
              )}
              {/* Mobile menu footer */}
              <div className="mx-[2rem] mt-auto flex flex-col items-center gap-8 py-24">
                <Button>Login</Button>
              </div>
            </div>
          )}
        </NavigationMenu>
      </div>
    </section>
  );
};

export { Navbar4 };

```

```tsx
"use client";

import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Navbar5Props {
  className?: string;
}

const Navbar5 = ({ className }: Navbar5Props) => {
  const features = [
    {
      title: "Dashboard",
      description: "Overview of your activity",
      href: "#",
    },
    {
      title: "Analytics",
      description: "Track your performance",
      href: "#",
    },
    {
      title: "Settings",
      description: "Configure your preferences",
      href: "#",
    },
    {
      title: "Integrations",
      description: "Connect with other tools",
      href: "#",
    },
    {
      title: "Storage",
      description: "Manage your files",
      href: "#",
    },
    {
      title: "Support",
      description: "Get help when needed",
      href: "#",
    },
  ];

  return (
    <section className={cn("py-4", className)}>
      <div className="container">
        <nav className="flex items-center justify-between">
          <a
            href="https://www.shadcnblocks.com"
            className="flex items-center gap-2"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
              className="max-h-8"
              alt="Shadcn UI Navbar"
            />
            <span className="text-lg font-semibold tracking-tighter">
              Shadcnblocks.com
            </span>
          </a>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[600px] grid-cols-2 p-3">
                    {features.map((feature, index) => (
                      <NavigationMenuLink
                        href={feature.href}
                        key={index}
                        className="rounded-md p-3 transition-colors hover:bg-muted/70"
                      >
                        <div key={feature.title}>
                          <p className="mb-1 font-semibold text-foreground">
                            {feature.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Products
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Resources
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            <Button variant="outline">Sign in</Button>
            <Button>Start for free</Button>
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <a
                    href="https://www.shadcnblocks.com"
                    className="flex items-center gap-2"
                  >
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                      className="max-h-8"
                      alt="Shadcn UI Navbar"
                    />
                    <span className="text-lg font-semibold tracking-tighter">
                      Shadcnblocks.com
                    </span>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <Accordion type="single" collapsible className="mt-4 mb-2">
                  <AccordionItem value="solutions" className="border-none">
                    <AccordionTrigger className="text-base hover:no-underline">
                      Features
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid md:grid-cols-2">
                        {features.map((feature, index) => (
                          <a
                            href={feature.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                          >
                            <div key={feature.title}>
                              <p className="mb-1 font-semibold text-foreground">
                                {feature.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-6">
                  <a href="#" className="font-medium">
                    Templates
                  </a>
                  <a href="#" className="font-medium">
                    Blog
                  </a>
                  <a href="#" className="font-medium">
                    Pricing
                  </a>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Button variant="outline">Sign in</Button>
                  <Button>Start for free</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export { Navbar5 };

```

```tsx
"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const ITEMS = [
  {
    label: "Features",
    href: "#",
    dropdownItems: [
      {
        title: "Modern product teams",
        href: "#",
        description:
          "Mainline is built on the habits that make the best product teams successful",
      },
      {
        title: "Resource Allocation",
        href: "#",
        description: "Mainline your resource allocation and execution",
      },
    ],
  },
  { label: "About Us", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Contact", href: "#" },
];

interface Navbar6Props {
  className?: string;
}

const Navbar6 = ({ className }: Navbar6Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <section
      className={cn(
        "absolute top-5 left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-full border bg-background/70 backdrop-blur-md lg:top-12",
        className,
      )}
    >
      <div className="flex items-center justify-between px-6 py-3">
        <a href="/" className="flex shrink-0 items-center gap-2">
          <img src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg" alt="logo" className="w-10" />
        </a>

        {/* Desktop Navigation */}
        <NavigationMenu className="max-lg:hidden">
          <NavigationMenuList>
            {ITEMS.map((link) =>
              link.dropdownItems ? (
                <NavigationMenuItem key={link.label} className="">
                  <NavigationMenuTrigger className="bg-transparent! px-1.5 data-[state=open]:bg-accent/50">
                    {link.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[400px] space-y-2 p-4">
                      {link.dropdownItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className="group flex gap-4 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="transition-transform duration-300 group-hover:translate-x-1">
                                <div className="mb-1 text-sm leading-none font-medium">
                                  {item.title}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={link.label} className="">
                  <a
                    href={link.href}
                    className={cn(
                      "relative bg-transparent px-1.5 text-sm font-medium text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </a>
                </NavigationMenuItem>
              ),
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2.5">
          <a href="/login" className="max-lg:hidden">
            <Button variant="outline">
              <span className="relative z-10">Login</span>
            </Button>
          </a>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            className="relative flex size-8 text-muted-foreground lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/*  Mobile Menu Navigation */}
      <div
        className={cn(
          "fixed inset-x-0 top-[calc(100%+1rem)] flex flex-col rounded-2xl border bg-background p-6 transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0",
        )}
      >
        <nav className="flex flex-1 flex-col divide-y divide-border">
          {ITEMS.map((link) =>
            link.dropdownItems ? (
              <div key={link.label} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === link.label ? null : link.label,
                    )
                  }
                  className="flex w-full items-center justify-between text-base font-medium text-primary"
                >
                  {link.label}
                  <ChevronRight
                    className={cn(
                      "size-4 transition-transform duration-200",
                      openDropdown === link.label ? "rotate-90" : "",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    openDropdown === link.label
                      ? "mt-4 max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0",
                  )}
                >
                  <div className="space-y-3 rounded-lg bg-muted/50 p-4">
                    {link.dropdownItems.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        className="group block rounded-md p-2 transition-colors hover:bg-accent"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                      >
                        <div className="transition-transform duration-200 group-hover:translate-x-1">
                          <div className="font-medium text-primary">
                            {item.title}
                          </div>

                          <p className="mt-1 text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={cn(
                  "py-4 text-base font-medium text-primary transition-colors first:pt-0 last:pb-0 hover:text-primary/80",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>
      </div>
    </section>
  );
};

export { Navbar6 };

```

```tsx
"use client";

import type { LucideIcon } from "lucide-react";
import {
  Banknote,
  BarChart,
  BookOpen,
  Brain,
  Cloud,
  Code,
  CreditCard,
  Database,
  Factory,
  Fingerprint,
  Gamepad2,
  Globe,
  Home,
  Lock,
  Menu,
  MessageSquare,
  Plane,
  Settings,
  Shield,
  ShoppingCart,
  Sparkle,
  Truck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface Solution {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const DATA_SOLUTIONS: Solution[] = [
  {
    title: "First solution",
    description: "Vestibulum scelerisque quis nisl ut convallis.",
    href: "#",
    icon: Cloud,
  },
  {
    title: "Another solution",
    description: "Curabitur vehicula malesuada enim a cursus.",
    href: "#",
    icon: Lock,
  },
  {
    title: "And a third solution",
    description: "Proin aliquam feugiat lobortis.",
    href: "#",
    icon: Fingerprint,
  },
  {
    title: "And a fourth solution",
    description: "Donec nec sapien nec dolor.",
    href: "#",
    icon: Cloud,
  },
];

interface Platfrom {
  title: string;
  href: string;
  icon: LucideIcon;
}

const DATA_PLATFORM_CASE: Platfrom[] = [
  {
    title: "Banking",
    href: "#",
    icon: CreditCard,
  },
  {
    title: "Fintech",
    href: "#",
    icon: Banknote,
  },
  {
    title: "E-commerce",
    href: "#",
    icon: ShoppingCart,
  },
  {
    title: "Travel & Hospitality",
    href: "#",
    icon: Plane,
  },
  {
    title: "Real Estate",
    href: "#",
    icon: Home,
  },
  {
    title: "Gaming",
    href: "#",
    icon: Gamepad2,
  },
  {
    title: "Manufacturing",
    href: "#",
    icon: Factory,
  },
  {
    title: "Logistics",
    href: "#",
    icon: Truck,
  },
];

interface Resource {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const DATA_RESOURCES: Resource[] = [
  {
    title: "AI Powered",
    description: "Explore AI-powered resources",
    href: "#",
    icon: Sparkle,
  },
  {
    title: "AI Development",
    description: "Tools and frameworks for AI development",
    href: "#",
    icon: Code,
  },
  {
    title: "Machine Learning",
    description: "Resources for machine learning enthusiasts",
    href: "#",
    icon: Brain,
  },
  {
    title: "Data Management",
    description: "Best practices for data management",
    href: "#",
    icon: Database,
  },
  {
    title: "Cloud AI",
    description: "Cloud-based AI solutions",
    href: "#",
    icon: Cloud,
  },
  {
    title: "AI Security",
    description: "Secure your AI applications",
    href: "#",
    icon: Shield,
  },
  {
    title: "AI Configuration",
    description: "Configure AI systems effectively",
    href: "#",
    icon: Settings,
  },
  {
    title: "AI Analytics",
    description: "Analyze AI performance metrics",
    href: "#",
    icon: BarChart,
  },
  {
    title: "Global AI Trends",
    description: "Stay updated with global AI trends",
    href: "#",
    icon: Globe,
  },
  {
    title: "AI Community",
    description: "Join the AI community",
    href: "#",
    icon: Users,
  },
  {
    title: "AI Learning",
    description: "Learn AI from the best resources",
    href: "#",
    icon: BookOpen,
  },
  {
    title: "AI Support",
    description: "Get support for AI-related queries",
    href: "#",
    icon: MessageSquare,
  },
];

interface Navbar7Props {
  className?: string;
}

const Navbar7 = ({ className }: Navbar7Props) => {
  const [open, setOpen] = useState(false);
  return (
    <section className={cn("inset-x-0 top-0 z-20 bg-background", className)}>
      <div className="container px-4 sm:px-6 md:px-8 lg:px-40 xl:px-52">
        <NavigationMenu className="min-w-full">
          <div className="flex w-full items-center justify-between gap-12 py-4">
            <a href="#" className="flex items-center gap-2">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                className="max-h-8"
                alt="Shadcn UI Navbar"
              />
              <span className="text-lg font-semibold tracking-tighter">
                Shadcnblocks.com
              </span>
            </a>
            <NavigationMenuList className="hidden lg:flex">
              <NavigationMenuItem>
                <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[760px] p-4">
                  <div className="flex items-start justify-between">
                    <div className="max-w-[760px] flex-1">
                      <div className="text-xs tracking-widest text-muted-foreground">
                        Solutions
                      </div>
                      <div className="grid grid-rows-1 gap-6">
                        {DATA_SOLUTIONS.map((solution, index) => (
                          <NavigationMenuLink
                            key={index}
                            href={solution.href}
                            className="group flex flex-row items-center first:mt-4 hover:bg-transparent"
                          >
                            <div className="mr-4 rounded-lg bg-muted p-4 shadow-sm">
                              <solution.icon className="size-6 text-muted-foreground transition-all fade-in group-hover:text-foreground" />
                            </div>
                            <div className="flex flex-col gap-1 text-sm">
                              <div className="font-medium text-foreground">
                                {solution.title}
                              </div>
                              <div className="text-sm font-normal text-muted-foreground">
                                {solution.description}
                              </div>
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                    <div className="max-w-[760px] flex-1">
                      <div className="text-xs tracking-widest text-muted-foreground">
                        By Use Case
                      </div>
                      <div className="mt-4 gap-6">
                        {DATA_PLATFORM_CASE.map((solution, index) => (
                          <NavigationMenuLink
                            key={index}
                            href={solution.href}
                            className="group flex flex-row items-center hover:bg-transparent"
                          >
                            <div className="mr-4 rounded-lg bg-muted p-2 shadow-sm">
                              <solution.icon className="size-4 text-muted-foreground transition-all fade-in group-hover:text-foreground" />
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="text-sm font-medium">
                                {solution.title}
                              </div>
                            </div>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent className="w-full min-w-[820px] p-4">
                  <div className="grid grid-cols-3 gap-6">
                    {DATA_RESOURCES.map((solution, index) => (
                      <NavigationMenuLink
                        key={index}
                        href={solution.href}
                        className="group flex flex-row items-center hover:bg-transparent"
                      >
                        <div className="mr-4 rounded-lg bg-muted p-4 shadow-sm">
                          <solution.icon className="size-6 text-muted-foreground transition-all fade-in group-hover:text-foreground" />
                        </div>
                        <div className="flex flex-col gap-1 text-sm font-normal text-muted-foreground">
                          <div className="font-medium text-foreground">
                            {solution.title}
                          </div>
                          <div className="font-normal text-muted-foreground">
                            {solution.description}
                          </div>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <Button variant="ghost">Developer</Button>
            </NavigationMenuList>
            <div className="hidden items-center gap-4 lg:flex">
              <Button variant="ghost">Sign in</Button>
              <Button>Get Started</Button>
            </div>
            <div className="flex items-center gap-4 lg:hidden">
              <Button
                variant="outline"
                size="icon"
                aria-label="Main Menu"
                onClick={() => {
                  if (open) {
                    setOpen(false);
                  } else {
                    setOpen(true);
                  }
                }}
              >
                {!open && <Menu className="size-4" />}
                {open && <X className="size-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu (Root) */}
          {open && (
            <div className="absolute inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="platform"
                  className="border-b-2 border-dashed"
                >
                  <AccordionTrigger className="px-2 py-4 text-left hover:no-underline">
                    Platform
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-4">
                    <div className="space-y-6">
                      <div>
                        <div className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">
                          Solutions
                        </div>
                        <div className="space-y-4">
                          {DATA_SOLUTIONS.map((solution, index) => (
                            <a
                              key={index}
                              href={solution.href}
                              className="group flex items-center gap-4 rounded-lg p-2 hover:bg-muted"
                            >
                              <div className="rounded-lg bg-muted p-2 shadow-sm">
                                <solution.icon className="size-4 text-muted-foreground transition-all group-hover:text-foreground" />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-foreground">
                                  {solution.title}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {solution.description}
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">
                          By Use Case
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {DATA_PLATFORM_CASE.map((useCase, index) => (
                            <a
                              key={index}
                              href={useCase.href}
                              className="group flex items-center gap-2 rounded-lg p-2 hover:bg-muted"
                            >
                              <div className="rounded-lg bg-muted p-1.5 shadow-sm">
                                <useCase.icon className="size-3 text-muted-foreground transition-all group-hover:text-foreground" />
                              </div>
                              <div className="truncate text-sm font-medium">
                                {useCase.title}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="resources"
                  className="border-b-2 border-dashed"
                >
                  <AccordionTrigger className="px-2 py-4 text-left hover:no-underline">
                    Resources
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-4">
                    <div className="space-y-3">
                      {DATA_RESOURCES.map((resource, index) => (
                        <a
                          key={index}
                          href={resource.href}
                          className="group flex items-center gap-4 rounded-lg p-2 hover:bg-muted"
                        >
                          <div className="rounded-lg bg-muted p-2 shadow-sm">
                            <resource.icon className="size-4 text-muted-foreground transition-all group-hover:text-foreground" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-foreground">
                              {resource.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {resource.description}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <a
                href="#"
                className="w-full border-y-2 border-dashed px-2 py-4 text-left text-sm font-medium"
              >
                Developer
              </a>

              <div className="mx-8 mt-auto flex flex-col gap-4 py-12">
                <span className="text-center">
                  Existing Customer? <b>Login</b>
                </span>
                <Button className="relative" size="lg">
                  Start now
                </Button>
              </div>
            </div>
          )}
        </NavigationMenu>
      </div>
    </section>
  );
};

export { Navbar7 };

```

```tsx
"use client";
import { Menu, X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url?: string;
  className?: string;
  links?: {
    label: string;
    description?: string;
    url: string;
    image?: string;
  }[];
}

interface MobileNavigationMenuProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface DesktopMenuItemProps {
  item: MenuItem;
  index: number;
}

const LOGO = {
  url: "https://www.shadcnblocks.com",
  src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
  alt: "logo",
  title: "Shadcnblocks.com",
};

const NAVIGATION: MenuItem[] = [
  {
    title: "Products",
    links: [
      {
        label: "Company Blog",
        description: "Explore the latest insights and updates",
        url: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      },
      {
        label: "Our Platform",
        description: "Innovative tools to empower your workflow",
        url: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
      },
      {
        label: "Careers at Our Company",
        description: "Discover open roles and our workplace culture",
        url: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
      },
      {
        label: "Customer Support",
        description: "Reach out or browse community help articles",
        url: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
      },
      {
        label: "Product Documentation",
        description: "In-depth guides, references, and API docs",
        url: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
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
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      },
      {
        label: "Help & Support Center",
        url: "#",
        description: "Search our help center for quick answers",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
      },
      {
        label: "Latest News",
        url: "#",
        description: "Stay up to date with product announcements",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
      },
    ],
  },
  {
    title: "Contact",
    url: "#",
  },
];

const MOBILE_NAVIGATION: MenuItem[] = [
  {
    title: "Products",
    className: "col-span-2",
    links: [
      {
        label: "Company Blog",
        url: "#",
      },
      {
        label: "Our Platform",
        url: "#",
      },
      {
        label: "Careers at Our Company",
        url: "#",
      },
      {
        label: "Customer Support",
        url: "#",
      },
      {
        label: "Product Documentation",
        url: "#",
      },
    ],
  },
  {
    title: "Company",
    className: "",
    links: [
      {
        label: "About Our Team",
        url: "#",
      },
      {
        label: "Help & Support Center",
        url: "#",
      },
      {
        label: "Latest News",
        url: "#",
      },
    ],
  },
  {
    title: "Community",
    className: "",
    links: [
      {
        label: "Forum",
        url: "#",
      },
      {
        label: "Slack Group",
        url: "#",
      },
      {
        label: "Contributors",
        url: "#",
      },
      {
        label: "Meetups",
        url: "#",
      },
    ],
  },
];

const NAV_BUTTONS: {
  label: string;
  url: string;
  variant:
    | "ghost"
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary";
}[] = [
  {
    label: "Log in",
    url: "#",
    variant: "ghost",
  },
  {
    label: "Sign up",
    url: "#",
    variant: "default",
  },
];

const SOCIAL_LINKS = [
  {
    label: "Linkedin",
    url: "#",
  },
  {
    label: "Twitter",
    url: "#",
  },
  {
    label: "Facebook",
    url: "#",
  },
];

const MOBILE_BREAKPOINT = 1024;

interface Navbar8Props {
  className?: string;
}

const Navbar8 = ({ className }: Navbar8Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleMobileMenu = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
  };

  return (
    <section className={cn("", className)}>
      <div
        className="fixed top-0 z-500 w-full bg-transparent transition-colors duration-500"
        ref={navRef}
      >
        <div className="container border-b">
          <div className="flex items-center justify-between gap-3.5 py-5">
            <a
              href={LOGO.url}
              className="flex max-h-8 items-center gap-2 text-lg font-semibold tracking-tighter"
            >
              <img
                src={LOGO.src}
                alt={LOGO.alt}
                className="inline-block size-8"
              />
              <span className="hidden md:inline-block">{LOGO.title}</span>
            </a>
            <NavigationMenu className="hidden lg:flex [&>div:nth-child(2)]:left-1/2 [&>div:nth-child(2)]:-translate-x-1/2">
              <NavigationMenuList>
                {NAVIGATION.map((item, index) => (
                  <DesktopMenuItem
                    key={`desktop-link-${index}`}
                    item={item}
                    index={index}
                  />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-3.5">
              {NAV_BUTTONS.map((button, index) => (
                <Button
                  key={`nav-button-${index}`}
                  variant={button.variant}
                  asChild
                >
                  <a href={button.url}>{button.label}</a>
                </Button>
              ))}
              <div className="lg:hidden">
                <Button variant="ghost" size="icon" onClick={handleMobileMenu}>
                  <Menu className="size-5.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileNavigationMenu open={open} setOpen={setOpen} />
    </section>
  );
};

const DesktopMenuItem = ({ item, index }: DesktopMenuItemProps) => {
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    if (item.links && imagesRef.current[index]) {
      imagesRef.current.forEach((img, i) => {
        img.classList.toggle("opacity-100", i === index);
        img.classList.toggle("opacity-0", i !== index);
      });
    }
  };

  const handleMouseLeave = () => {
    imagesRef.current.forEach((img) => {
      img.classList.remove("opacity-100");
      img.classList.add("opacity-0");
    });
    imagesRef.current[0].classList.add("opacity-100");
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
              {item.links.map((link, index) => (
                <img
                  key={index}
                  ref={(el) => {
                    if (el) {
                      imagesRef.current[index] = el;
                    }
                  }}
                  src={link.image}
                  alt={link.label}
                  className={`absolute top-0 left-0 h-full w-full object-cover transition-opacity duration-300 ${index === 0 ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
            <div>
              <div className="p-4 leading-normal font-bold">{item.title}</div>
              <ul>
                {item.links.map((link, index) => (
                  <li key={`desktop-nav-sublink-${index}`}>
                    <a
                      href={link.url}
                      className="flex items-center gap-4 rounded-lg px-4 py-3 hover:bg-muted"
                      data-index={index}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div>
                        <h3 className="leading-normal font-medium">
                          {link.label}
                        </h3>
                        <p className="leading-normal text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </a>
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

const MobileNavigationMenu = ({ open, setOpen }: MobileNavigationMenuProps) => {
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
              <SheetTitle className="text-primary">
                Mobile Navigation
              </SheetTitle>
            </div>
            <div className="flex justify-end pt-5">
              <SheetClose asChild>
                <Button
                  size="icon"
                  className="size-9 rounded-full bg-muted/20 hover:bg-muted/20"
                >
                  <X className="size-5.5" />
                </Button>
              </SheetClose>
            </div>
            <div className="flex h-full flex-col justify-between gap-30 pt-24">
              <div className="grid w-full grid-cols-2 gap-x-4 gap-y-10">
                {MOBILE_NAVIGATION.map((item, index) =>
                  renderMobileMenuItem(item, index),
                )}
              </div>
              <div className="col-span-2 flex flex-col gap-4">
                <div className="text-xs text-foreground/60 uppercase">
                  SOCIAL
                </div>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((link, index) => (
                    <a
                      key={`social-link-${index}`}
                      href={link.url}
                      className="text-primary-foreground"
                    >
                      {link.label}
                    </a>
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

const renderMobileMenuItem = (item: MenuItem, index: number) => {
  return (
    <div
      className={`flex flex-col gap-4 text-primary-foreground ${item.className}`}
      key={`mobile-menu-item-${index}`}
    >
      <div className="text-xs text-foreground/60 uppercase">{item.title}</div>
      <ul className="flex flex-col gap-3">
        {item.links?.map((link, i) => (
          <li key={`mobile-nav-link-${i}`}>
            <a
              href={link.url}
              className={`text-primary-foreground ${index === 0 ? "text-2xl" : "text-base"} leading-normal font-medium`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { Navbar8 };

```

```tsx
"use client";

import {
  Bell,
  Book,
  ChevronRight,
  FileText,
  Globe,
  Grid,
  HelpCircle,
  Info,
  LucideIcon,
  Menu,
  X,
} from "lucide-react";
import { Fragment, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

interface MenuLink {
  label: string;
  description?: string;
  url?: string;
  icon?: {
    component: LucideIcon;
    color: string;
  };
}
interface MenuItem {
  title: string;
  url?: string;
  links?: MenuLink[];
}

interface DesktopMenuItemProps {
  item: MenuItem;
  index: number;
}

interface MobileNavigationMenuProps {
  open: boolean;
}

interface MenuSubLinkProps {
  link: MenuLink;
}

const LOGO = {
  url: "https://www.shadcnblocks.com",
  src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
  alt: "logo",
  title: "Shadcnblocks.com",
};

const NAVIGATION: MenuItem[] = [
  {
    title: "Products",
    links: [
      {
        label: "Company Blog",
        description: "Insights & updates",
        url: "#",
        icon: {
          component: FileText,
          color: "#10b981",
        },
      },
      {
        label: "Our Platform",
        description: "Empower your work",
        url: "#",
        icon: {
          component: Grid,
          color: "#6366f1",
        },
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
        icon: {
          component: Info,
          color: "#f59e0b",
        },
      },
      {
        label: "Help & Support Center",
        url: "#",
        description: "Get quick help",
        icon: {
          component: HelpCircle,
          color: "#3b82f6",
        },
      },
      {
        label: "Latest News",
        url: "#",
        description: "Product updates",
        icon: {
          component: Bell,
          color: "#f97316",
        },
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
        icon: {
          component: Book,
          color: "#8b5cf6",
        },
      },
      {
        label: "API Reference",
        url: "#",
        description: "Explore our API",
        icon: {
          component: Globe,
          color: "#ef4444",
        },
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

const PRIMARY_BUTTON = {
  label: "Sign up",
  url: "#",
};

const MOBILE_BREAKPOINT = 1024;

interface Navbar9Props {
  className?: string;
}

const Navbar9 = ({ className }: Navbar9Props) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleMobileMenu = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
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
            <a
              href={LOGO.url}
              className="flex max-h-8 items-center gap-2 text-lg font-semibold tracking-tighter"
            >
              <img
                src={LOGO.src}
                alt={LOGO.alt}
                className="inline-block size-8 invert"
              />
              <span className="hidden text-foreground md:inline-block">
                {LOGO.title}
              </span>
            </a>
            <NavigationMenu className="hidden lg:flex" viewport={false}>
              <NavigationMenuList className="">
                {NAVIGATION.map((item, index) => (
                  <DesktopMenuItem
                    key={`desktop-link-${index}`}
                    item={item}
                    index={index}
                  />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center gap-4">
              <GithubStars repoUrl="https://github.com/shadcn/ui" />
              <Button asChild>
                <a href={PRIMARY_BUTTON.url}>{PRIMARY_BUTTON.label}</a>
              </Button>
              <div className="lg:hidden">
                <Button variant="ghost" size="icon" onClick={handleMobileMenu}>
                  {open ? (
                    <X className="size-5.5 stroke-foreground" />
                  ) : (
                    <Menu className="size-5.5 stroke-foreground" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MobileNavigationMenu open={open} />
    </Fragment>
  );
};

const DesktopMenuItem = ({ item, index }: DesktopMenuItemProps) => {
  if (item.links) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
        <NavigationMenuTrigger className="h-fit bg-transparent font-normal text-foreground focus:!bg-transparent data-[active=true]:!bg-transparent">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="!rounded-xl !p-0">
          <ul className="w-[20rem] p-2.5">
            {item.links.map((link, index) => (
              <li key={`desktop-nav-sublink-${index}`}>
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

const MenuSubLink = ({ link }: MenuSubLinkProps) => {
  return (
    <a
      href={link.url}
      className="flex items-center gap-4 rounded-lg p-2 hover:bg-muted"
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-2.5">
          {link.icon && (
            <link.icon.component
              className="size-5"
              style={{ stroke: link.icon.color }}
            />
          )}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-sm leading-none text-foreground">
              {link.label}
            </h3>
            <p className="text-sm leading-[1.2] text-muted-foreground/80">
              {link.description}
            </p>
          </div>
        </div>
        <ChevronRight className="size-3.5 stroke-muted-foreground opacity-100" />
      </div>
    </a>
  );
};

const MobileNavigationMenu = ({ open }: MobileNavigationMenuProps) => {
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
              <SheetTitle className="text-primary">
                Mobile Navigation
              </SheetTitle>
            </div>
            <div className="flex h-full flex-col justify-between gap-20">
              <Accordion type="multiple" className="w-full">
                {NAVIGATION.map((item, index) =>
                  renderMobileMenuItem(item, index),
                )}
              </Accordion>
              <div className="pb-20">
                <Button asChild className="w-full">
                  <a href={PRIMARY_BUTTON.url}>{PRIMARY_BUTTON.label}</a>
                </Button>
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
    <a
      key={item.title}
      href={item.url}
      className="flex h-[3.75rem] items-center border-b p-0 text-left text-base leading-[3.75] font-normal text-muted-foreground ring-ring/10 outline-ring/50 transition-all focus-visible:ring-4 focus-visible:outline-1 nth-last-1:border-0"
    >
      {item.title}
    </a>
  );
};

interface GithubStarsProps {
  repoUrl: string;
}

const GithubStars = ({ repoUrl }: GithubStarsProps) => {
  const [stargazersCount, setStargazersCount] = useState<string>("");

  const [owner, repo] = repoUrl.split("github.com/")[1].split("/");
  const githubApiEndpoint = `https://api.github.com/repos/${owner}/${repo}`;

  const formatStargazers = (count: number | ""): string => {
    if (count === "") return "";
    if (count < 1000) return count.toString();
    return `${Math.round(count / 1000)}k`;
  };

  useEffect(() => {
    const getStars = async () => {
      try {
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
  }, [githubApiEndpoint]);

  return (
    <Button
      variant="ghost"
      asChild
      className="flex items-center gap-1.5 bg-muted text-foreground"
    >
      <a href={repoUrl}>
        <svg width="800px" height="800px" viewBox="0 0 20 20">
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              transform="translate(-140.000000, -7559.000000)"
              fill="currentColor"
            >
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path
                  d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                  id="github-[#142]"
                ></path>
              </g>
            </g>
          </g>
        </svg>
        <span>{stargazersCount}</span>
      </a>
    </Button>
  );
};

export { Navbar9 };

```

```tsx
"use client";
import {
  Book,
  ChevronRight,
  Code,
  Database,
  Globe,
  Layout,
  MenuIcon,
  Monitor,
  Paintbrush,
  Server,
  Settings,
  Shield,
  Sparkles,
  Terminal,
  Users,
  X,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import {
  forwardRef,
  Fragment,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

interface MenuLink {
  label?: string;
  description?: string;
  url: string;
  icon?: LucideIcon;
  image?: string;
  background?: string;
  company?: {
    logo: string;
    name: string;
  };
}

interface MenuGroup {
  title: string;
  links: MenuLink[];
}

interface MenuItem {
  id?: number;
  title: string;
  url?: string;
  links?: MenuLink[];
  featuredLinks?: MenuLink[];
  imageLink?: MenuLink;
  groupLinks?: MenuGroup[];
}

interface DesktopMenuItemProps {
  item: MenuItem;
  index: number;
}

interface MobileNavigationMenuProps {
  open: boolean;
}

type NavLinkProps = {
  link: MenuLink;
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
  showDescription?: boolean;
};

const LOGO = {
  url: "https://www.shadcnblocks.com",
  src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
  alt: "logo",
  title: "Shadcnblocks.com",
};

const NAVIGATION: MenuItem[] = [
  {
    title: "Products",
    id: 1,
    links: [
      {
        label: "Insights",
        icon: Book,
        description:
          "Latest company news, updates, insights, and announcements",
        url: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/jeremy-bishop-iEjCQtcsVPY-unsplash.jpg",
      },
      {
        label: "Engineering",
        icon: Code,
        description:
          "Deep technical articles, tutorials, guides, and documentation",
        url: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/carles-rabada-f7UprkNqi08-unsplash.jpg",
      },
      {
        label: "Culture",
        icon: Users,
        description: "Team values, experiences, stories, goals, and traditions",
        url: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/john-murphey-ZWUWSEY6OGk-unsplash.jpg",
      },
      {
        label: "Press",
        icon: Globe,
        description:
          "Mentions in media, interviews, articles, and publications",
        url: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/kevin-charit-1fL2Q1JcbNc-unsplash.jpg",
      },
      {
        label: "API",
        icon: Monitor,
        description: "Programmatic access using our secure REST API",
        url: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/pat-whelen-gWfpmH0H2bM-unsplash.jpg",
      },
      {
        label: "CLI",
        icon: Terminal,
        description: "Command line tools for automation and productivity",
        url: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/sam-wermut-FiUuNWxnb3k-unsplash.jpg",
      },
      {
        label: "SDKs",
        icon: Code,
        description: "Software kits for easy and fast integration",
        url: "#",
        image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/vasilis-karkalas-qOaeVSKyhhE-unsplash.jpg",
      },
    ],
  },
  {
    title: "Solutions",
    id: 2,
    featuredLinks: [
      {
        label: "Icons",
        icon: Sparkles,
        description: "Lucide open-source icon library for developers",
        background:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/john-murphey-ZWUWSEY6OGk-unsplash.jpg",
        url: "#",
      },
      {
        label: "Themes",
        icon: Paintbrush,
        description: "Customizable UI themes, styles, and appearance presets",
        background:
          "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/kevin-charit-1fL2Q1JcbNc-unsplash.jpg",
        url: "#",
      },
    ],
    links: [
      {
        description:
          "Tailored eCommerce solutions for growing online businesses",
        url: "#",
        company: {
          logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
          name: "ARC",
        },
      },
      {
        description: "Optimized development tools for SaaS web platforms",
        url: "#",
        company: {
          logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
          name: "descript",
        },
      },
      {
        description: "Bank-grade security for finance-based web applications",
        url: "#",
        company: {
          logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
          name: "MERCURY",
        },
      },
      {
        description:
          "Healthcare infrastructure built for medical tech platforms",
        url: "#",
        company: {
          logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
          name: "ramp",
        },
      },
    ],
  },
  {
    title: "Platform",
    id: 3,
    imageLink: {
      url: "#",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/carles-rabada-f7UprkNqi08-unsplash.jpg",
      label: "Explore New Components",
    },
    groupLinks: [
      {
        title: "Core Services",
        links: [
          {
            label: "Hosting",
            icon: Server,
            description: "Global infrastructure hosting your scalable web apps",
            url: "#",
          },
          {
            label: "Auth",
            icon: Shield,
            description: "Secure authentication and role-based user access",
            url: "#",
          },
          {
            label: "Database",
            icon: Database,
            description:
              "Reliable, scalable storage for application data needs",
            url: "#",
          },
        ],
      },
      {
        title: "Design System",
        links: [
          {
            label: "Components",
            icon: Layout,
            description:
              "Reusable components built for consistent UI experiences",
            url: "#",
          },
          {
            label: "Tokens",
            icon: Settings,
            description:
              "Design tokens standardizing consistent branding elements",
            url: "#",
          },
          {
            label: "Icons",
            icon: Sparkles,
            description: "Lucide icons used across multiple interface elements",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    title: "Resources",
    url: "#",
  },
  {
    title: "Pricing",
    url: "#",
  },
];

const BUTTON = {
  label: "Sign up",
  isPrimary: true,
  url: "#",
};

const MOBILE_BREAKPOINT = 1024;

interface Navbar10Props {
  className?: string;
}

const Navbar10 = ({ className }: Navbar10Props) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleMobileMenu = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
  };

  return (
    <Fragment>
      <section
        className={cn(
          "pointer-events-auto fixed top-0 z-999 flex w-full items-center justify-center bg-background",
          className,
        )}
      >
        <NavigationMenu className="h-20 max-w-full after:absolute after:inset-0 after:z-998 after:block after:size-full after:bg-background after:content-[''] [&>div:last-child>div]:mt-0 [&>div:last-child>div]:animate-none [&>div:last-child>div]:rounded-none [&>div:last-child>div]:border-0 [&>div:last-child>div]:border-b [&>div:last-child>div]:!shadow-[0px_-1px_0px_0px_rgba(0,0,0,0.05),0px_0px_0px_1px_rgba(17,26,37,0.05),0px_2px_5px_0px_rgba(16,25,36,0.1),0px_5px_20px_0px_rgba(16,25,36,0.1)]">
          <div className="relative z-999 container grid w-full grid-cols-2 items-center justify-between gap-8 xl:grid-cols-3">
            <a
              href={LOGO.url}
              className="flex max-h-8 items-center gap-2 text-lg font-semibold tracking-tighter"
            >
              <img
                src={LOGO.src}
                alt={LOGO.alt}
                className="inline-block size-6"
              />
              <span className="hidden md:inline-block">{LOGO.title}</span>
            </a>
            <div className="hidden xl:flex">
              <NavigationMenuList>
                {NAVIGATION.map((item, index) => (
                  <DesktopMenuItem
                    key={`desktop-link-${index}`}
                    item={item}
                    index={index}
                  />
                ))}
              </NavigationMenuList>
            </div>
            <div className="justify-self-end">
              <div className="hidden xl:block">
                <Button variant="ghost" asChild>
                  <a href={BUTTON.url}>
                    {BUTTON.label}
                    <ChevronRight />
                  </a>
                </Button>
              </div>
              <div className="xl:hidden">
                <Button
                  className="size-11"
                  variant="ghost"
                  size="icon"
                  onClick={handleMobileMenu}
                >
                  {open ? (
                    <X className="size-5.5 stroke-foreground" />
                  ) : (
                    <MenuIcon className="size-5.5 stroke-foreground" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </NavigationMenu>
      </section>
      <MobileNavigationMenu open={open} />
    </Fragment>
  );
};

const DesktopMenuItem = ({ item, index }: DesktopMenuItemProps) => {
  if (item.links || item.featuredLinks || item.groupLinks) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
        <NavigationMenuTrigger className="h-fit bg-transparent font-normal text-foreground/60">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="hidden !rounded-xl !border-0 !p-0 xl:block">
          <div className="w-dvw animate-[fade-in-slide-down_0.35s_cubic-bezier(0.33,1,0.68,1)_forwards] px-8 pt-6 pb-12">
            <div className="container">
              {item.id === 1 && <DropdownMenu1 links={item.links} />}
              {item.id === 2 && (
                <DropdownMenu2
                  featuredLinks={item.featuredLinks}
                  links={item.links}
                />
              )}
              {item.id === 3 && (
                <DropdownMenu3
                  groupLinks={item.groupLinks}
                  imageLink={item.imageLink}
                />
              )}
            </div>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
      <NavigationMenuLink
        href={item.url}
        className={`${navigationMenuTriggerStyle()} h-fit bg-transparent font-normal text-foreground/60`}
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const DropdownMenu1 = ({ links }: { links?: MenuLink[] }) => {
  const linksRef = useRef<HTMLAnchorElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  const updateImageClasses = (activeIndex: number) => {
    imageRefs.current.forEach((img, i) => {
      if (!img) return;
      const isActive = i === activeIndex;

      img.classList.toggle("opacity-100", isActive);
      img.classList.toggle("translate-y-0", isActive);
      img.classList.toggle("opacity-0", !isActive);
      img.classList.toggle("translate-y-20", !isActive);
      img.classList.toggle("z-10", isActive);
    });
  };

  const handleMouseEnter =
    (index: number) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      linksRef.current.forEach((link) => {
        if (link && link !== event.currentTarget) {
          link.classList.add("opacity-50");
        }
      });

      updateImageClasses(index);
    };

  const handleMouseLeave = () => {
    linksRef.current.forEach((link) => {
      link?.classList.remove("opacity-50");
    });

    updateImageClasses(0);
  };

  if (!links) return null;

  return (
    <div className="grid grid-cols-2 gap-8">
      <ul className="grid grid-cols-2 gap-8">
        {links.map((link, index) => (
          <NavLink
            key={`default-nav-link-${index}`}
            link={link}
            onMouseEnter={handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            ref={(el) => {
              if (el) linksRef.current[index] = el;
            }}
          />
        ))}
      </ul>
      <div className="relative !h-[16rem] w-full overflow-hidden rounded-lg bg-muted">
        {links.map((link, index) => (
          <div
            key={`default-nav-link-img-${index}`}
            ref={(el) => {
              if (el) imageRefs.current[index] = el;
            }}
            className={`will-change-opacity absolute top-14 left-14 aspect-video w-[43.75rem] overflow-hidden rounded-tl-md border-t border-l transition-all duration-600 ease-in-out will-change-transform ${
              index === 0
                ? "z-10 translate-y-0 opacity-100"
                : "pointer-events-none z-0 translate-y-20 opacity-0"
            }`}
          >
            <img
              src={link.image}
              alt={link.label}
              className="size-full object-cover object-left-top"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const DropdownMenu2 = ({
  links,
  featuredLinks,
}: {
  links?: MenuLink[];
  featuredLinks?: MenuLink[];
}) => {
  return (
    <div>
      <div className="flex gap-8 pb-8">
        {featuredLinks &&
          featuredLinks.map((link, index) => (
            <FeaturedLink key={`desktop-featured-link-${index}`} link={link} />
          ))}
      </div>
      <Separator />
      <div className="grid grid-cols-4 pt-8">
        {links &&
          links.map((link, index) => (
            <NavLink key={`default-nav-link-${index}`} link={link} />
          ))}
      </div>
    </div>
  );
};

const DropdownMenu3 = ({
  groupLinks,
  imageLink,
}: {
  groupLinks?: MenuGroup[];
  imageLink?: MenuLink;
}) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <GroupLinks groupLinks={groupLinks} />
      <FeaturedImageLink link={imageLink} />
    </div>
  );
};

const GroupLinks = ({ groupLinks }: { groupLinks?: MenuGroup[] }) => {
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  const handleMouseEnter =
    () => (event: React.MouseEvent<HTMLAnchorElement>) => {
      linksRef.current.forEach((link) => {
        if (link && link !== event.currentTarget) {
          link.classList.add("opacity-50");
        }
      });
    };

  const handleMouseLeave = () => {
    linksRef.current.forEach((link) => {
      link?.classList.remove("opacity-50");
    });
  };

  if (!groupLinks) return null;

  let linkIndex = 0;
  return (
    <div className="grid grid-cols-2 gap-8">
      {groupLinks.map((group, index1) => (
        <div key={`group-link-${index1}`}>
          <div className="mb-4 text-xs text-muted-foreground">
            {group.title}
          </div>
          <ul className="flex flex-col gap-8">
            {group.links.map((link, index2) => {
              const index = linkIndex++;
              return (
                <li key={`group-link-${index1}-${index2}`}>
                  <NavLink
                    link={link}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    ref={(el) => {
                      if (el) linksRef.current[index] = el;
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

const FeaturedImageLink = ({ link }: { link?: MenuLink }) => {
  if (!link) return null;

  return (
    <div className="hidden xl:block">
      <a href={link.url} className="w-full max-w-[36.875rem]">
        <AspectRatio
          ratio={1.77245509}
          className="overflow-hidden rounded-[0.25rem] bg-muted"
        >
          <div className="size-full">
            <Badge className="absolute top-2 left-2">New</Badge>
            <div className="flex w-full flex-col items-center justify-center gap-8 pt-10">
              <div className="text-2xl font-semibold">{link.label}</div>
              <div className="w-[80%]">
                <AspectRatio
                  ratio={1.5}
                  className="overflow-hidden rounded-[0.25rem] bg-muted"
                >
                  <img
                    src={link.image}
                    alt={link.label}
                    className="size-full object-cover object-left-top"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </AspectRatio>
      </a>
    </div>
  );
};

const FeaturedLink = ({ link }: { link: MenuLink }) => {
  return (
    <a
      href={link.url}
      className="group relative flex w-full overflow-hidden rounded-xl bg-muted px-8 py-7"
    >
      <div className="relative z-10 flex w-full items-center gap-6">
        <div className="flex size-12 shrink-0 rounded-lg border bg-background shadow-lg">
          {link.icon && (
            <link.icon className="m-auto size-5 stroke-foreground" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-semibold text-white">{link.label}</div>
          <div className="font-medium text-white/80">{link.description}</div>
        </div>
      </div>
      <img
        src={link.background}
        alt={link.label}
        className="absolute top-0 left-0 size-full object-cover object-left-top opacity-90 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
      />
    </a>
  );
};

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ link, onMouseEnter, onMouseLeave }, ref) => {
    return (
      <a
        ref={ref}
        href={link.url}
        className="flex w-full gap-2 transition-opacity duration-300"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {link.icon && (
          <div className="flex size-6 shrink-0 rounded-md border shadow">
            <link.icon className="m-auto size-3.5" />
          </div>
        )}
        <div className="flex flex-col items-start gap-2">
          {link.company && (
            <div className="block text-base leading-normal xl:hidden">
              {link.company.name}
            </div>
          )}
          {link.company && (
            <img
              className="hidden h-6 xl:block"
              src={link.company.logo}
              alt={link.company.name}
            />
          )}
          {link.label && (
            <div className="text-base leading-normal">{link.label}</div>
          )}
          <div className="text-sm leading-normal text-muted-foreground">
            {link.description}
          </div>
        </div>
      </a>
    );
  },
);

const MobileNavigationMenu = ({ open }: MobileNavigationMenuProps) => {
  return (
    <Sheet open={open}>
      <SheetContent
        aria-describedby={undefined}
        side="top"
        className="inset-0 z-998 h-dvh w-full bg-background pt-20 [&>button]:hidden"
      >
        <div className="flex-1 overflow-y-auto">
          <div className="container py-8">
            <div className="absolute -m-px h-px w-px overflow-hidden border-0 mask-clip-border p-0 text-nowrap whitespace-nowrap">
              <SheetTitle className="text-primary">
                Mobile Navigation
              </SheetTitle>
            </div>
            <div className="flex min-h-full flex-col gap-6">
              <Accordion type="multiple" className="w-full">
                {NAVIGATION.map((item, index) =>
                  renderMobileMenuItem(item, index),
                )}
              </Accordion>

              <Button asChild>
                <a href={BUTTON.url}>{BUTTON.label}</a>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const renderMobileMenuItem = (item: MenuItem, index: number) => {
  if (item.links || item.featuredLinks || item.groupLinks) {
    return (
      <AccordionItem
        key={item.title}
        value={`nav-${index}`}
        className="border-b-0"
      >
        <AccordionTrigger className="h-[2.5rem] items-center text-base font-normal text-foreground hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-6 p-2">
          {item.featuredLinks && (
            <div className="flex flex-col gap-2 p-2">
              {item.featuredLinks.map((link, index) => (
                <NavLink key={`default-nav-link-${index}`} link={link} />
              ))}
            </div>
          )}

          {item.links && (
            <div className="flex flex-col gap-2 p-2">
              {item.links.map((link, index) => (
                <NavLink key={`default-nav-link-${index}`} link={link} />
              ))}
            </div>
          )}

          {item.groupLinks && (
            <div className="flex flex-col gap-2 p-2">
              {item.groupLinks.map((group, index1) => (
                <div className="mb-8 last:mb-0" key={`group-link-${index1}`}>
                  <div className="mb-4 text-xs text-muted-foreground">
                    {group.title}
                  </div>
                  <ul className="flex flex-col gap-2">
                    {group.links.map((link, index2) => (
                      <li key={`group-link-${index1}-${index2}`}>
                        <NavLink link={link} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a
      key={item.title}
      href={item.url}
      className="flex h-[2.5rem] items-center rounded-md text-left text-base leading-[3.75] font-normal text-foreground ring-ring/10 outline-ring/50 transition-all focus-visible:ring-4 focus-visible:outline-1 nth-last-1:border-0"
    >
      {item.title}
    </a>
  );
};

export { Navbar10 };

```

```tsx
"use client";
import {
  Book,
  Cloud,
  Code,
  Database,
  Gift,
  Globe,
  Heart,
  Layout,
  MenuIcon,
  Monitor,
  Paintbrush,
  Server,
  Settings,
  Shield,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Terminal,
  Users,
  X,
  Zap,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

interface MenuLink {
  label: string;
  description?: string;
  url: string;
  icon: LucideIcon;
}

interface MenuGroup {
  title: string;
  links: MenuLink[];
}

interface MenuItem {
  title: string;
  url?: string;
  groups?: MenuGroup[];
}

interface DesktopMenuItemProps {
  item: MenuItem;
  index: number;
}

interface MobileNavigationMenuProps {
  open: boolean;
}

const LOGO = {
  url: "https://www.shadcnblocks.com",
  src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
  alt: "logo",
  title: "Shadcnblocks.com",
};

const NAVIGATION: MenuItem[] = [
  {
    title: "Products",
    groups: [
      {
        title: "Company Blog",
        links: [
          {
            label: "Insights",
            icon: Book,
            description: "Company news and updates",
            url: "#",
          },
          {
            label: "Engineering",
            icon: Code,
            description: "Technical deep dives",
            url: "#",
          },
          {
            label: "Culture",
            icon: Users,
            description: "Team stories and values",
            url: "#",
          },
          {
            label: "Press",
            icon: Globe,
            description: "Media mentions",
            url: "#",
          },
        ],
      },
      {
        title: "Developer Tools",
        links: [
          {
            label: "API",
            icon: Monitor,
            description: "Access our REST API",
            url: "#",
          },
          {
            label: "CLI",
            icon: Terminal,
            description: "Command line tools",
            url: "#",
          },
          {
            label: "SDKs",
            icon: Code,
            description: "Integrate with our SDKs",
            url: "#",
          },
          {
            label: "Docs",
            icon: Book,
            description: "Complete documentation",
            url: "#",
          },
        ],
      },
      {
        title: "Commerce",
        links: [
          {
            label: "Store",
            icon: ShoppingCart,
            description: "Buy our products",
            url: "#",
          },
          {
            label: "Plans",
            icon: Database,
            description: "Subscription options",
            url: "#",
          },
          {
            label: "Mobile App",
            icon: Smartphone,
            description: "Shop on the go",
            url: "#",
          },
          {
            label: "Gift Cards",
            icon: Gift,
            description: "Send a gift instantly",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    title: "Solutions",
    groups: [
      {
        title: "Industries",
        links: [
          {
            label: "E-commerce",
            icon: ShoppingCart,
            description: "Solutions for online stores",
            url: "#",
          },
          {
            label: "SaaS",
            icon: Cloud,
            description: "Tools for SaaS apps",
            url: "#",
          },
          {
            label: "Finance",
            icon: Shield,
            description: "Secure finance apps",
            url: "#",
          },
          {
            label: "Healthcare",
            icon: Heart,
            description: "For medical platforms",
            url: "#",
          },
        ],
      },
      {
        title: "Design System",
        links: [
          {
            label: "Components",
            icon: Layout,
            description: "Reusable UI parts",
            url: "#",
          },
          {
            label: "Tokens",
            icon: Settings,
            description: "Design tokens reference",
            url: "#",
          },
          {
            label: "Icons",
            icon: Sparkles,
            description: "Lucide icon library",
            url: "#",
          },
          {
            label: "Themes",
            icon: Paintbrush,
            description: "UI appearance presets",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    title: "Platform",
    groups: [
      {
        title: "Core Services",
        links: [
          {
            label: "Hosting",
            icon: Server,
            description: "Reliable infrastructure",
            url: "#",
          },
          {
            label: "Auth",
            icon: Shield,
            description: "Secure login & roles",
            url: "#",
          },
          {
            label: "Database",
            icon: Database,
            description: "Scalable data storage",
            url: "#",
          },
          {
            label: "Edge Functions",
            icon: Zap,
            description: "Low-latency logic",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    title: "Resources",
    url: "#",
  },
  {
    title: "Pricing",
    url: "#",
  },
];

const DESKTOP_BUTTONS = [
  {
    label: "Contact",
    isPrimary: false,
    url: "#",
  },
  {
    label: "Log in",
    isPrimary: false,
    url: "#",
  },
  {
    label: "Sign up",
    isPrimary: true,
    url: "#",
  },
];

const MOBILE_BUTTONS = [
  {
    label: "Sign up",
    isPrimary: true,
    url: "#",
  },
  {
    label: "Log in",
    isPrimary: false,
    url: "#",
  },
];

const MOBILE_BREAKPOINT = 1024;

interface Navbar11Props {
  className?: string;
}

const Navbar11 = ({ className }: Navbar11Props) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleMobileMenu = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
  };

  return (
    <Fragment>
      <section
        className={cn(
          "pointer-events-auto fixed top-0 z-999 flex h-16 w-full items-center justify-center bg-background",
          className,
        )}
      >
        <div className="container">
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <a
                href={LOGO.url}
                className="flex max-h-8 items-center gap-2 text-lg font-semibold tracking-tighter"
              >
                <img
                  src={LOGO.src}
                  alt={LOGO.alt}
                  className="inline-block size-6"
                />
                <span className="hidden md:inline-block">{LOGO.title}</span>
              </a>
              <NavigationMenu className="hidden xl:flex" viewport={false}>
                <NavigationMenuList>
                  {NAVIGATION.map((item, index) => (
                    <DesktopMenuItem
                      key={`desktop-link-${index}`}
                      item={item}
                      index={index}
                    />
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="hidden items-center gap-3 xl:flex">
              {DESKTOP_BUTTONS.map((btn, index) => (
                <Button
                  size="sm"
                  variant={!btn.isPrimary ? "outline" : "default"}
                  className={
                    btn.isPrimary
                      ? "text-primary-foreground"
                      : "text-foreground"
                  }
                  asChild
                  key={`navbar-btn-${index}`}
                >
                  <a href={btn.url}>{btn.label}</a>
                </Button>
              ))}
            </div>
            <div className="xl:hidden">
              <Button
                className="size-11"
                variant="ghost"
                onClick={handleMobileMenu}
              >
                {open ? (
                  <X className="size-5.5 stroke-foreground" />
                ) : (
                  <MenuIcon className="size-5.5 stroke-foreground" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <MobileNavigationMenu open={open} />
    </Fragment>
  );
};

const DesktopMenuItem = ({ item, index }: DesktopMenuItemProps) => {
  if (item.groups) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
        <NavigationMenuTrigger className="h-fit bg-transparent px-2.5 font-normal text-muted-foreground">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="!rounded-xl !border !p-0">
          <ul className="flex p-2" style={{ width: item.groups.length * 248 }}>
            {item.groups.map((group, index1) => (
              <li className="flex-1" key={`desktop-group-${index1}`}>
                <ul>
                  <li className="px-3 py-2 text-sm leading-normal text-muted-foreground">
                    {group.title}
                  </li>
                  {group.links.map((link, index2) => (
                    <li key={`desktop-links-${index1}-${index2}`}>
                      <NavigationMenuLink
                        asChild
                        className="group/link flex-row gap-2 px-3 py-2 transition-colors duration-200"
                      >
                        <a href={link.url}>
                          <div className="flex size-8 shrink-0 rounded-lg border duration-400 fade-in group-hover/link:bg-background">
                            <link.icon className="m-auto size-4 group-hover/link:stroke-black" />
                          </div>
                          <div className="flex flex-col gap-[2px]">
                            <div className="text-sm font-medium">
                              {link.label}
                            </div>
                            <div className="text-xs text-muted-foreground group-hover/link:text-foreground">
                              {link.description}
                            </div>
                          </div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
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
        className={`${navigationMenuTriggerStyle()} h-fit bg-transparent px-2.5 font-normal text-muted-foreground`}
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const MobileNavigationMenu = ({ open }: MobileNavigationMenuProps) => {
  return (
    <Sheet open={open}>
      <SheetContent
        aria-describedby={undefined}
        side="top"
        className="dark inset-0 z-998 h-dvh w-full bg-background pt-[3.9375rem] [&>button]:hidden"
      >
        <div className="h-full overflow-y-auto pt-10 pb-20">
          <div className="container">
            <div className="absolute -m-px h-px w-px overflow-hidden border-0 mask-clip-border p-0 text-nowrap whitespace-nowrap">
              <SheetTitle className="text-primary">
                Mobile Navigation
              </SheetTitle>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {MOBILE_BUTTONS.map((btn, index) => (
                  <Button
                    variant={!btn.isPrimary ? "outline" : "default"}
                    className={
                      btn.isPrimary
                        ? "text-primary-foreground"
                        : "text-foreground"
                    }
                    asChild
                    key={`navbar-btn-${index}`}
                  >
                    <a href={btn.url}>{btn.label}</a>
                  </Button>
                ))}
              </div>
              <Accordion type="multiple" className="w-full">
                {NAVIGATION.map((item, index) =>
                  renderMobileMenuItem(item, index),
                )}
              </Accordion>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const renderMobileMenuItem = (item: MenuItem, index: number) => {
  if (item.groups) {
    return (
      <AccordionItem
        key={item.title}
        value={`nav-${index}`}
        className="border-b-0"
      >
        <AccordionTrigger className="h-[3.75rem] items-center p-0 !px-4 text-base leading-[3.75] font-normal text-muted-foreground hover:bg-muted hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="max-h-[60dvh] overflow-x-auto">
          {item.groups.flatMap((group, groupIndex) =>
            group.links.map((link, linkIndex) => (
              <a
                key={`mobile-link-${groupIndex}-${linkIndex}`}
                href={link.url}
                className="flex h-12 items-center gap-2 rounded-lg px-4 text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-foreground"
              >
                <link.icon className="size-4 stroke-muted-foreground" />
                {link.label}
              </a>
            )),
          )}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a
      key={item.title}
      href={item.url}
      className="flex h-[3.75rem] items-center rounded-md p-0 px-4 text-left text-base leading-[3.75] font-normal text-muted-foreground ring-ring/10 outline-ring/50 transition-all hover:bg-muted focus-visible:ring-4 focus-visible:outline-1 nth-last-1:border-0"
    >
      {item.title}
    </a>
  );
};

export { Navbar11 };

```

```tsx
"use client";

import {
  Award,
  BarChart3,
  Bell,
  Book,
  BookOpen,
  Brain,
  ChevronRight,
  FileCode,
  FileText,
  GraduationCap,
  Menu,
  MessageSquare,
  Users,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";

const features = [
  {
    title: "Course Management & Content",
    description: "Create, organize and deliver courses",
    icon: GraduationCap,
    link: "#",
  },
  {
    title: "Student Analytics",
    description: "Track progress and performance data",
    icon: BarChart3,
    link: "#",
  },
  {
    title: "Interactive Learning",
    description: "Engage students with multimedia content",
    icon: Video,
    link: "#",
  },
  {
    title: "AI-Powered Tutoring",
    description: "Personalized learning with AI assistance",
    icon: Brain,
    link: "#",
  },
  {
    title: "Collaboration & Discussion",
    description: "Connect students and instructors seamlessly",
    icon: MessageSquare,
    link: "#",
  },
  {
    title: "Assessments & Certification",
    description: "Evaluate learning with comprehensive testing",
    icon: Award,
    link: "#",
  },
];

const docs = [
  {
    title: "Learning Center",
    description: "Discover how to use EduMax effectively",
    icon: Book,
    link: "#",
  },
  {
    title: "Course Catalog",
    description: "Browse our comprehensive course library",
    icon: BookOpen,
    link: "#",
  },
  {
    title: "API Documentation",
    description: "Integrate EduMax into your platform",
    icon: FileCode,
    link: "#",
  },
];

const company = [
  {
    title: "Platform Updates",
    icon: FileText,
    link: "#",
  },
  {
    title: "News & Events",
    icon: Bell,
    link: "#",
  },
  {
    title: "Education Blog",
    icon: Book,
    link: "#",
  },
  {
    title: "Join Our Team",
    icon: Users,
    link: "#",
  },
];

interface Navbar14Props {
  className?: string;
}

const Navbar14 = ({ className }: Navbar14Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section
      className={cn(
        "border-b border-border lg:border-b",
        isOpen && "border-b-0",
        className,
      )}
    >
      <div className="container">
        <nav className="flex items-center justify-between py-4">
          <div className="flex flex-1 items-center gap-9">
            <a href="#" className="flex items-center gap-2">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblocks-logo.svg"
                alt="logo"
                className="h-8 dark:invert"
              />
              <span className="text-lg font-semibold">Shadcnblocks</span>
            </a>
            <div className="hidden items-center gap-1.5 lg:flex">
              <NavigationMenu delayDuration={0}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-0">
                      <div className="flex">
                        <div className="p-4">
                          <p className="mb-3 text-[10px] text-muted-foreground uppercase">
                            TOOLS
                          </p>
                          {features.map((feature) => (
                            <NavigationMenuLink key={feature.title} asChild>
                              <a
                                href={feature.link}
                                className="group flex cursor-pointer flex-row gap-3"
                              >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                                  <feature.icon className="size-5!" />
                                </span>
                                <div className="flex flex-col">
                                  <span className="flex items-center gap-0.5 text-sm font-medium whitespace-nowrap">
                                    {feature.title}
                                    <ChevronRight className="size-4 text-primary! opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                  </span>
                                  <p className="text-xs whitespace-nowrap text-muted-foreground">
                                    {feature.description}
                                  </p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          ))}
                        </div>
                        <Separator
                          orientation="vertical"
                          className="data-[orientation=vertical]:h-auto"
                        />
                        <div className="p-4">
                          <p className="mb-3 text-[10px] text-muted-foreground uppercase">
                            QUICK START
                          </p>
                          <div>
                            <NavigationMenuLink asChild>
                              <a
                                href="#"
                                className="flex flex-row items-center gap-3"
                              >
                                <BookOpen className="size-4!" />
                                <span className="text-sm font-medium whitespace-nowrap">
                                  Shadcnblocks 101
                                </span>
                              </a>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <a
                                href="#"
                                className="flex flex-row items-center gap-3"
                              >
                                <Users className="size-4!" />
                                <span className="text-sm font-medium whitespace-nowrap">
                                  Find a tutor
                                </span>
                              </a>
                            </NavigationMenuLink>
                          </div>
                          <p className="mt-5 mb-3 text-[10px] text-muted-foreground uppercase">
                            LATEST UPDATES
                          </p>
                          <NavigationMenuLink asChild>
                            <a href="#">
                              <div className="rounded-lg bg-primary p-3">
                                <img
                                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                                  alt="placeholder"
                                  className="aspect-video min-w-52 rounded-md object-cover"
                                />
                              </div>
                              <div className="mt-3.5 flex flex-col gap-2 px-1">
                                <p className="text-xs font-medium">
                                  One Platform. Every Learner.
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Personalized learning paths for every student.
                                </p>
                              </div>
                            </a>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Support</NavigationMenuTrigger>
                    <NavigationMenuContent className="p-0">
                      <div className="flex">
                        <div className="p-4">
                          <p className="mb-3 text-[10px] text-muted-foreground uppercase">
                            GUIDES
                          </p>
                          {docs.map((doc) => (
                            <NavigationMenuLink key={doc.title} asChild>
                              <a
                                href={doc.link}
                                className="group flex flex-row gap-3"
                              >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                                  <doc.icon className="size-5!" />
                                </span>
                                <div className="flex flex-col">
                                  <span className="flex items-center gap-0.5 text-sm font-medium whitespace-nowrap">
                                    {doc.title}
                                    <ChevronRight className="size-4 text-primary! opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                  </span>
                                  <p className="text-xs whitespace-nowrap text-muted-foreground">
                                    {doc.description}
                                  </p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          ))}
                        </div>
                        <Separator
                          orientation="vertical"
                          className="data-[orientation=vertical]:h-auto"
                        />
                        <div className="p-4">
                          <p className="mb-3 text-[10px] text-muted-foreground uppercase">
                            ABOUT US
                          </p>
                          <div>
                            {company.map((company) => (
                              <NavigationMenuLink key={company.title} asChild>
                                <a
                                  href={company.link}
                                  className="flex flex-row items-center gap-3"
                                >
                                  <company.icon className="size-4!" />
                                  <span className="text-sm font-medium whitespace-nowrap">
                                    {company.title}
                                  </span>
                                </a>
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <a href="#">About</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Button variant="outline">Login</Button>
            <Button>Demo</Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </nav>
      </div>

      {isOpen && (
        <div className="border-t bg-background lg:hidden">
          <div className="container">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="learning-hub">
                <AccordionTrigger className="pr-2.5 text-base font-medium hover:no-underline">
                  Products
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-5">
                    <div>
                      <p className="mb-3 text-[10px] text-muted-foreground uppercase">
                        TOOLS
                      </p>
                      <div className="space-y-5">
                        {features.map((feature) => (
                          <a
                            key={feature.title}
                            href={feature.link}
                            className="group flex cursor-pointer flex-row gap-3 rounded-md transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                              <feature.icon className="size-4" />
                            </span>
                            <div className="flex min-w-0 flex-col">
                              <span className="text-sm leading-tight font-medium">
                                {feature.title}
                              </span>
                              <p className="text-xs leading-tight text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="mb-3 text-[10px] text-muted-foreground uppercase">
                        QUICK START
                      </p>
                      <div className="space-y-5">
                        <a
                          href="#"
                          className="flex cursor-pointer flex-row items-center gap-3 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <BookOpen className="size-4" />
                          <span className="text-sm font-medium">
                            Shadcnblocks 101
                          </span>
                        </a>
                        <a
                          href="#"
                          className="flex cursor-pointer flex-row items-center gap-3 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Users className="size-4" />
                          <span className="text-sm font-medium">
                            Find a tutor
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="support" className="last:border-b">
                <AccordionTrigger className="pr-2.5 text-base font-medium hover:no-underline">
                  Support
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-3 text-[10px] text-muted-foreground uppercase">
                        GUIDES
                      </p>
                      <div className="space-y-5">
                        {docs.map((doc) => (
                          <a
                            key={doc.title}
                            href={doc.link}
                            className="group flex cursor-pointer flex-row gap-3 rounded-md transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                              <doc.icon className="size-4" />
                            </span>
                            <div className="flex min-w-0 flex-col">
                              <span className="text-sm leading-tight font-medium">
                                {doc.title}
                              </span>
                              <p className="text-xs leading-tight text-muted-foreground">
                                {doc.description}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="mb-3 text-[10px] text-muted-foreground uppercase">
                        ABOUT US
                      </p>
                      <div className="space-y-5">
                        {company.map((companyItem) => (
                          <a
                            key={companyItem.title}
                            href={companyItem.link}
                            className="flex cursor-pointer flex-row items-center gap-3 rounded-md transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <companyItem.icon className="size-4" />
                            <span className="text-sm font-medium">
                              {companyItem.title}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-2">
              <a
                href="#"
                className="block border-b border-border py-4 pr-3 text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export { Navbar14 };

```

```tsx
"use client";

import { Menu, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NAV_LOGO = {
  url: "https://www.shadcnblocks.com",
  src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
  alt: "logo",
  title: "Shadcnblocks.com",
};
const NAV_ITEMS = [
  { name: "Home", link: "#" },
  { name: "About", link: "#" },
  { name: "Pricing", link: "#" },
  { name: "Contact", link: "#" },
];

interface Navbar17Props {
  className?: string;
}

const Navbar17 = ({ className }: Navbar17Props) => {
  const [activeItem, setActiveItem] = useState(NAV_ITEMS[0].name);

  const indicatorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = document.querySelector(
        `[data-nav-item="${activeItem}"]`,
      ) as HTMLElement;

      if (activeEl && indicatorRef.current && menuRef.current) {
        const menuRect = menuRef.current.getBoundingClientRect();
        const itemRect = activeEl.getBoundingClientRect();

        indicatorRef.current.style.width = `${itemRect.width}px`;
        indicatorRef.current.style.left = `${itemRect.left - menuRect.left}px`;
      }
    };
    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeItem]);

  return (
    <section className={cn("py-4", className)}>
      <nav className="container flex items-center justify-between">
        {/* Left WordMark */}
        <a href={NAV_LOGO.url} className="flex items-center gap-2">
          <img src={NAV_LOGO.src} className="max-h-8 w-8" alt={NAV_LOGO.alt} />
          <span className="text-lg font-semibold tracking-tighter">
            {NAV_LOGO.title}
          </span>
        </a>

        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList
            ref={menuRef}
            className="flex items-center gap-6 rounded-4xl px-8 py-3"
          >
            {NAV_ITEMS.map((item) => (
              <React.Fragment key={item.name}>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    data-nav-item={item.name}
                    onClick={() => setActiveItem(item.name)}
                    className={`relative cursor-pointer text-sm font-medium hover:bg-transparent ${
                      activeItem === item.name
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </React.Fragment>
            ))}
            {/* Active Indicator */}
            <div
              ref={indicatorRef}
              className="absolute bottom-2 flex h-1 items-center justify-center px-2 transition-all duration-300"
            >
              <div className="h-0.5 w-full rounded-t-none bg-foreground transition-all duration-300" />
            </div>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Popover */}
        <MobileNav activeItem={activeItem} setActiveItem={setActiveItem} />

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="outline"
            size="sm"
            className="h-10 py-2.5 text-sm font-normal"
          >
            Sign Up
          </Button>
        </div>
      </nav>
    </section>
  );
};

export { Navbar17 };

const AnimatedHamburger = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <div className="group relative size-full">
      <div className="absolute flex size-full items-center justify-center">
        <Menu
          className={`absolute size-6 text-muted-foreground transition-all duration-300 group-hover:text-foreground ${
            isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
          }`}
        />
        <X
          className={`absolute size-6 text-muted-foreground transition-all duration-300 group-hover:text-foreground ${
            isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

const MobileNav = ({
  activeItem,
  setActiveItem,
}: {
  activeItem: string;
  setActiveItem: (item: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block flex h-full items-center lg:hidden">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon">
            <AnimatedHamburger isOpen={isOpen} />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="relative top-4 -right-4 block w-[calc(100vw-32px)] overflow-hidden rounded-xl p-0 sm:top-auto sm:right-auto sm:w-80 lg:hidden"
        >
          <ul className="w-full bg-background py-4 text-foreground">
            {NAV_ITEMS.map((navItem, idx) => (
              <li key={idx}>
                <a
                  href={navItem.link}
                  onClick={() => setActiveItem(navItem.name)}
                  className={`flex items-center border-l-[3px] px-6 py-4 text-sm font-medium text-foreground transition-all duration-75 ${
                    activeItem === navItem.name
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {navItem.name}
                </a>
              </li>
            ))}
            <li className="flex flex-col px-7 py-2">
              <Button variant="outline">Sign Up</Button>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

```

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

const socialLinks = [
  { label: "X [Twitter]", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "ArtStation", href: "#" },
];

interface Navbar21Props {
  className?: string;
}

const Navbar21 = ({ className }: Navbar21Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <section className={cn("", className)}>
      <div className="flex items-center justify-between px-6 py-6">
        <div className="z-50">
          <div className="flex items-center gap-2">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-wordmark.svg"
              alt="Logo"
              className="h-9"
            />
          </div>
        </div>

        <div className="z-50">
          <button
            onClick={toggleMenu}
            className="text-lg tracking-wider text-foreground transition-colors hover:text-muted-foreground"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isOpen ? "close" : "menu"}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {isOpen ? "CLOSE" : "MENU"}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-hidden bg-background"
          >
            <div className="flex h-full flex-col items-center justify-center px-6">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="mb-16 text-center"
              >
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                    className="mb-5"
                  >
                    <a href={item.href} className="group relative inline-block">
                      <motion.span
                        className="relative z-10 text-4xl font-black text-foreground uppercase transition-transform duration-300 md:text-6xl"
                        initial={{ opacity: 1, filter: "blur(0px)" }}
                        whileHover={{ opacity: 0.8, filter: "blur(6px)" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {item.label}
                      </motion.span>

                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-primary"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </a>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="flex flex-col gap-8 sm:flex-row sm:gap-12"
              >
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 font-mono text-sm tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                    whileHover={{ x: 5 }}
                  >
                    <span>{link.label}</span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export { Navbar21 };

```
