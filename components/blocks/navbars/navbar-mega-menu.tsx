"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img, type OptixFlowConfig } from "@page-speed/img";
import { Badge } from "../../ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import {
  logoPlaceholders,
  imagePlaceholders,
} from "../../../lib/mediaPlaceholders";

interface SolutionItem {
  title: string;
  description: string;
  href: string;
  icon: string;
}

interface UseCaseItem {
  title: string;
  href: string;
  icon: string;
}

interface DocumentationLink {
  title: string;
  href: string;
}

interface ResourceItem {
  title: string;
  description: string;
  href: string;
}

/**
 * Props for the NavbarMegaMenu component
 */
export interface NavbarMegaMenuProps {
  className?: string;
  logo?: {
    url: string;
    desktopSrc: string;
    mobileSrc: string;
    alt: string;
  };
  solutions?: SolutionItem[];
  useCases?: UseCaseItem[];
  documentationLinks?: DocumentationLink[];
  resources?: ResourceItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultSolutions: SolutionItem[] = [
  {
    title: "Cloud Infrastructure",
    description: "Scalable cloud solutions built for modern businesses.",
    href: "#",
    icon: "lucide/cloud",
  },
  {
    title: "Security & Compliance",
    description: "Enterprise-grade security with automated compliance.",
    href: "#",
    icon: "lucide/lock",
  },
  {
    title: "Identity Management",
    description: "Advanced authentication and access control systems.",
    href: "#",
    icon: "lucide/fingerprint",
  },
];

const defaultUseCases: UseCaseItem[] = [
  { title: "Banking", href: "#", icon: "lucide/building-2" },
  { title: "Healthcare", href: "#", icon: "lucide/heart-pulse" },
  { title: "Technology", href: "#", icon: "lucide/cpu" },
  { title: "Education", href: "#", icon: "lucide/graduation-cap" },
  { title: "Agriculture", href: "#", icon: "lucide/leaf" },
  { title: "BaaS", href: "#", icon: "lucide/building" },
  { title: "Entertainment", href: "#", icon: "lucide/film" },
  { title: "SaaS", href: "#", icon: "lucide/bar-chart" },
  { title: "Crypto", href: "#", icon: "lucide/bitcoin" },
];

const defaultDocumentationLinks: DocumentationLink[] = [
  { title: "API Reference", href: "#" },
  { title: "SDK Documentation", href: "#" },
  { title: "Integration Guides", href: "#" },
  { title: "Code Examples", href: "#" },
];

const defaultResources: ResourceItem[] = [
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

/**
 * NavbarMegaMenu - A comprehensive navigation bar with rich mega-menu dropdowns.
 *
 * Features multiple mega-menu panels for Platform, Use Cases, Developers, and Resources.
 * Each panel contains categorized links with icons, descriptions, and featured content cards.
 * Includes a full-screen mobile menu with slide-in submenus for each category.
 * Ideal for enterprise applications and complex product offerings.
 */
export const NavbarMegaMenu = ({
  className,
  logo = {
    url: "/",
    desktopSrc: logoPlaceholders.darkHorizontalLogo,
    mobileSrc: logoPlaceholders.logoMark,
    alt: "Opensite AI",
  },
  solutions = defaultSolutions,
  useCases = defaultUseCases,
  documentationLinks = defaultDocumentationLinks,
  resources = defaultResources,
  optixFlowConfig,
}: NavbarMegaMenuProps) => {
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
                <Pressable href={logo.url} className="flex items-center gap-2">
                  <Img
                    src={logo.desktopSrc}
                    className="hidden h-7 dark:invert md:block"
                    alt={logo.alt}
                    optixFlowConfig={optixFlowConfig}
                  />
                  <Img
                    src={logo.mobileSrc}
                    className="h-7 dark:invert md:hidden"
                    alt={logo.alt}
                    optixFlowConfig={optixFlowConfig}
                  />
                </Pressable>
              )}
              {open && submenu && (
                <Pressable
                  variant="outline"
                  asButton
                  onClick={() => setSubmenu(null)}
                >
                  Back
                  <DynamicIcon
                    name="lucide/chevron-left"
                    size={16}
                    className="ml-2"
                  />
                </Pressable>
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
                          <Img
                            src={imagePlaceholders[0]}
                            alt="Platform overview"
                            className="aspect-4/3 object-cover object-center"
                            optixFlowConfig={optixFlowConfig}
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
                              <DynamicIcon name={solution.icon} size={20} />
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
                              <DynamicIcon name={useCase.icon} size={16} />
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
                          <Img
                            src={imagePlaceholders[1]}
                            alt="Use case"
                            className="h-full w-full object-cover object-center"
                            optixFlowConfig={optixFlowConfig}
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
                        {documentationLinks.map((link, index) => (
                          <NavigationMenuLink
                            key={index}
                            href={link.href}
                            className="group flex flex-row items-center gap-2.5 rounded-md p-2.5 focus:text-accent-foreground"
                          >
                            <DynamicIcon
                              name="lucide/arrow-up-right"
                              size={16}
                            />
                            <div className="text-base">{link.title}</div>
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
                          <Img
                            src={imagePlaceholders[2]}
                            alt="Showcase"
                            className="h-full w-full object-cover object-center"
                            optixFlowConfig={optixFlowConfig}
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
                          <Img
                            src={imagePlaceholders[3]}
                            alt="Showcase"
                            className="h-full w-full object-cover object-center"
                            optixFlowConfig={optixFlowConfig}
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
                    <div>
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
                          <Img
                            src={imagePlaceholders[4]}
                            alt="Customers"
                            className="h-full w-full object-cover object-center"
                            optixFlowConfig={optixFlowConfig}
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
              <Pressable href="#" variant="ghost" asButton>
                Login
              </Pressable>
              <Pressable href="#" variant="outline" asButton>
                Start now
                <DynamicIcon
                  name="lucide/chevron-right"
                  size={16}
                  className="ml-1"
                />
              </Pressable>
            </div>

            <div className="flex items-center gap-4 lg:hidden">
              <Pressable
                variant="outline"
                size="icon"
                asButton
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
                {!open && <DynamicIcon name="lucide/menu" size={16} />}
                {open && <DynamicIcon name="lucide/x" size={16} />}
              </Pressable>
            </div>
          </div>

          {/* Mobile Menu (Root) */}
          {open && !submenu && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <div>
                <button
                  type="button"
                  className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                  onClick={() => setSubmenu("platform")}
                >
                  <span className="flex-1">Platform</span>
                  <span className="shrink-0">
                    <DynamicIcon name="lucide/chevron-right" size={16} />
                  </span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                  onClick={() => setSubmenu("usecases")}
                >
                  <span className="flex-1">Use cases</span>
                  <span className="shrink-0">
                    <DynamicIcon name="lucide/chevron-right" size={16} />
                  </span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                  onClick={() => setSubmenu("developers")}
                >
                  <span className="flex-1">Developers</span>
                  <span className="shrink-0">
                    <DynamicIcon name="lucide/chevron-right" size={16} />
                  </span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center border-b border-border px-8 py-7 text-left"
                  onClick={() => setSubmenu("resources")}
                >
                  <span className="flex-1">Resources</span>
                  <span className="shrink-0">
                    <DynamicIcon name="lucide/chevron-right" size={16} />
                  </span>
                </button>
              </div>
              <div className="mx-8 mt-auto flex flex-col gap-4 py-12">
                <Pressable href="#" variant="outline" size="lg" asButton>
                  Login
                </Pressable>
                <Pressable href="#" size="lg" asButton>
                  Start now
                </Pressable>
              </div>
            </div>
          )}

          {/* Mobile Menu > Platform */}
          {open && submenu === "platform" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <Pressable href="#" className="block space-y-6 px-8 py-8">
                <div className="w-full overflow-clip rounded-lg">
                  <Img
                    src={imagePlaceholders[0]}
                    alt="Platform overview"
                    className="aspect-2/1 h-full w-full object-cover object-center"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                <div>
                  <div className="mb-2 text-base">Platform Overview</div>
                  <div className="text-sm font-normal text-muted-foreground">
                    Discover how our platform transforms your workflow.
                  </div>
                </div>
              </Pressable>
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                Solutions
              </div>
              {solutions.map((solution, index) => (
                <Pressable
                  key={index}
                  href={solution.href}
                  className="flex items-center gap-5 border-b border-border px-8 py-5"
                >
                  <DynamicIcon name={solution.icon} size={20} />
                  <div>
                    <div className="text-base">{solution.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {solution.description}
                    </div>
                  </div>
                </Pressable>
              ))}
            </div>
          )}

          {/* Mobile Menu > Use Cases */}
          {open && submenu === "usecases" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                Use cases
              </div>
              {useCases.map((useCase, index) => (
                <Pressable
                  key={index}
                  href={useCase.href}
                  className="flex items-center gap-5 border-b border-border px-8 py-5"
                >
                  <DynamicIcon name={useCase.icon} size={16} />
                  <div className="text-base">{useCase.title}</div>
                </Pressable>
              ))}
            </div>
          )}

          {/* Mobile Menu > Developers */}
          {open && submenu === "developers" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                Documentation
              </div>
              {documentationLinks.map((link, index) => (
                <Pressable
                  key={index}
                  href={link.href}
                  className="flex items-center gap-5 border-b border-border px-8 py-5"
                >
                  <DynamicIcon name="lucide/arrow-up-right" size={16} />
                  <div className="text-base">{link.title}</div>
                </Pressable>
              ))}
            </div>
          )}

          {/* Mobile Menu > Resources */}
          {open && submenu === "resources" && (
            <div className="fixed inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <div className="px-8 py-3.5 text-xs tracking-widest text-muted-foreground uppercase">
                Resources
              </div>
              {resources.map((resource, index) => (
                <Pressable
                  key={index}
                  href={resource.href}
                  className="flex items-center gap-5 border-b border-border px-8 py-5"
                >
                  <div>
                    <div className="text-base">{resource.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {resource.description}
                    </div>
                  </div>
                </Pressable>
              ))}
            </div>
          )}
        </NavigationMenu>
      </div>
    </section>
  );
};

export default NavbarMegaMenu;
