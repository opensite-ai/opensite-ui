"use client";

import * as React from "react";
import { useState } from "react";
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
} from "../../ui/navigation-menu";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

interface SolutionItem {
  title: string;
  description: string;
  href: string;
  icon: string;
}

interface PlatformItem {
  title: string;
  href: string;
  icon: string;
}

interface ResourceItem {
  title: string;
  description: string;
  href: string;
  icon: string;
}

/**
 * Props for the NavbarPlatformResources component
 */
export interface NavbarPlatformResourcesProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  solutions?: SolutionItem[];
  platformCases?: PlatformItem[];
  resources?: ResourceItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultSolutions: SolutionItem[] = [
  {
    title: "First solution",
    description: "Vestibulum scelerisque quis nisl ut convallis.",
    href: "#",
    icon: "lucide/cloud",
  },
  {
    title: "Another solution",
    description: "Curabitur vehicula malesuada enim a cursus.",
    href: "#",
    icon: "lucide/lock",
  },
  {
    title: "And a third solution",
    description: "Proin aliquam feugiat lobortis.",
    href: "#",
    icon: "lucide/fingerprint",
  },
  {
    title: "And a fourth solution",
    description: "Donec nec sapien nec dolor.",
    href: "#",
    icon: "lucide/cloud",
  },
];

const defaultPlatformCases: PlatformItem[] = [
  { title: "Banking", href: "#", icon: "lucide/credit-card" },
  { title: "Fintech", href: "#", icon: "lucide/banknote" },
  { title: "E-commerce", href: "#", icon: "lucide/shopping-cart" },
  { title: "Travel & Hospitality", href: "#", icon: "lucide/plane" },
  { title: "Real Estate", href: "#", icon: "lucide/home" },
  { title: "Gaming", href: "#", icon: "lucide/gamepad-2" },
  { title: "Manufacturing", href: "#", icon: "lucide/factory" },
  { title: "Logistics", href: "#", icon: "lucide/truck" },
];

const defaultResources: ResourceItem[] = [
  {
    title: "AI Powered",
    description: "Explore AI-powered resources",
    href: "#",
    icon: "lucide/sparkle",
  },
  {
    title: "AI Development",
    description: "Tools and frameworks for AI development",
    href: "#",
    icon: "lucide/code",
  },
  {
    title: "Machine Learning",
    description: "Resources for machine learning enthusiasts",
    href: "#",
    icon: "lucide/brain",
  },
  {
    title: "Data Management",
    description: "Best practices for data management",
    href: "#",
    icon: "lucide/database",
  },
  {
    title: "Cloud AI",
    description: "Cloud-based AI solutions",
    href: "#",
    icon: "lucide/cloud",
  },
  {
    title: "AI Security",
    description: "Secure your AI applications",
    href: "#",
    icon: "lucide/shield",
  },
  {
    title: "AI Configuration",
    description: "Configure AI systems effectively",
    href: "#",
    icon: "lucide/settings",
  },
  {
    title: "AI Analytics",
    description: "Analyze AI performance metrics",
    href: "#",
    icon: "lucide/bar-chart",
  },
  {
    title: "Global AI Trends",
    description: "Stay updated with global AI trends",
    href: "#",
    icon: "lucide/globe",
  },
  {
    title: "AI Community",
    description: "Join the AI community",
    href: "#",
    icon: "lucide/users",
  },
  {
    title: "AI Learning",
    description: "Learn AI from the best resources",
    href: "#",
    icon: "lucide/book-open",
  },
  {
    title: "AI Support",
    description: "Get support for AI-related queries",
    href: "#",
    icon: "lucide/message-square",
  },
];

/**
 * NavbarPlatformResources - A comprehensive navigation bar with platform solutions and resources dropdowns.
 * 
 * Features two main mega-menu dropdowns: Platform (with solutions and use cases) and Resources
 * (with a 3-column grid of AI-related topics). Each item displays an icon, title, and description.
 * Mobile view uses a full-screen overlay with accordion navigation. Ideal for tech platforms
 * and AI/ML product offerings.
 */
export const NavbarPlatformResources = ({
  className,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  solutions = defaultSolutions,
  platformCases = defaultPlatformCases,
  resources = defaultResources,
  optixFlowConfig,
}: NavbarPlatformResourcesProps) => {
  const [open, setOpen] = useState(false);

  return (
    <section className={cn("inset-x-0 top-0 z-20 bg-background", className)}>
      <div className="container px-4 sm:px-6 md:px-8 lg:px-40 xl:px-52">
        <NavigationMenu className="min-w-full">
          <div className="flex w-full items-center justify-between gap-12 py-4">
            <Pressable href={logo.url} className="flex items-center gap-2">
              <Img
                src={logo.src}
                className="max-h-8"
                alt={logo.alt}
                optixFlowConfig={optixFlowConfig}
              />
              <span className="text-lg font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Pressable>
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
                        {solutions.map((solution, index) => (
                          <NavigationMenuLink
                            key={index}
                            href={solution.href}
                            className="group flex flex-row items-center first:mt-4 hover:bg-transparent"
                          >
                            <div className="mr-4 rounded-lg bg-muted p-4 shadow-sm">
                              <DynamicIcon
                                name={solution.icon}
                                size={24}
                                className="text-muted-foreground transition-all group-hover:text-foreground"
                              />
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
                        {platformCases.map((item, index) => (
                          <NavigationMenuLink
                            key={index}
                            href={item.href}
                            className="group flex flex-row items-center hover:bg-transparent"
                          >
                            <div className="mr-4 rounded-lg bg-muted p-2 shadow-sm">
                              <DynamicIcon
                                name={item.icon}
                                size={16}
                                className="text-muted-foreground transition-all group-hover:text-foreground"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="text-sm font-medium">
                                {item.title}
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
                    {resources.map((resource, index) => (
                      <NavigationMenuLink
                        key={index}
                        href={resource.href}
                        className="group flex flex-row items-center hover:bg-transparent"
                      >
                        <div className="mr-4 rounded-lg bg-muted p-4 shadow-sm">
                          <DynamicIcon
                            name={resource.icon}
                            size={24}
                            className="text-muted-foreground transition-all group-hover:text-foreground"
                          />
                        </div>
                        <div className="flex flex-col gap-1 text-sm font-normal text-muted-foreground">
                          <div className="font-medium text-foreground">
                            {resource.title}
                          </div>
                          <div className="font-normal text-muted-foreground">
                            {resource.description}
                          </div>
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <Pressable href="#" variant="ghost" asButton>
                Developer
              </Pressable>
            </NavigationMenuList>
            <div className="hidden items-center gap-4 lg:flex">
              <Pressable href="#" variant="ghost" asButton>
                Sign in
              </Pressable>
              <Pressable href="#" asButton>
                Get Started
              </Pressable>
            </div>
            <div className="flex items-center gap-4 lg:hidden">
              <Pressable
                variant="outline"
                size="icon"
                asButton
                aria-label="Main Menu"
                onClick={() => setOpen(!open)}
              >
                {!open && <DynamicIcon name="lucide/menu" size={16} />}
                {open && <DynamicIcon name="lucide/x" size={16} />}
              </Pressable>
            </div>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="absolute inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="platform" className="border-b-2 border-dashed">
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
                          {solutions.map((solution, index) => (
                            <Pressable
                              key={index}
                              href={solution.href}
                              className="group flex items-center gap-4 rounded-lg p-2 hover:bg-muted"
                            >
                              <div className="rounded-lg bg-muted p-2 shadow-sm">
                                <DynamicIcon
                                  name={solution.icon}
                                  size={16}
                                  className="text-muted-foreground transition-all group-hover:text-foreground"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-foreground">
                                  {solution.title}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {solution.description}
                                </div>
                              </div>
                            </Pressable>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">
                          By Use Case
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {platformCases.map((useCase, index) => (
                            <Pressable
                              key={index}
                              href={useCase.href}
                              className="group flex items-center gap-2 rounded-lg p-2 hover:bg-muted"
                            >
                              <div className="rounded-lg bg-muted p-1.5 shadow-sm">
                                <DynamicIcon
                                  name={useCase.icon}
                                  size={12}
                                  className="text-muted-foreground transition-all group-hover:text-foreground"
                                />
                              </div>
                              <div className="truncate text-sm font-medium">
                                {useCase.title}
                              </div>
                            </Pressable>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="resources" className="border-b-2 border-dashed">
                  <AccordionTrigger className="px-2 py-4 text-left hover:no-underline">
                    Resources
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-4">
                    <div className="space-y-3">
                      {resources.map((resource, index) => (
                        <Pressable
                          key={index}
                          href={resource.href}
                          className="group flex items-center gap-4 rounded-lg p-2 hover:bg-muted"
                        >
                          <div className="rounded-lg bg-muted p-2 shadow-sm">
                            <DynamicIcon
                              name={resource.icon}
                              size={16}
                              className="text-muted-foreground transition-all group-hover:text-foreground"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-foreground">
                              {resource.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {resource.description}
                            </div>
                          </div>
                        </Pressable>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Pressable
                href="#"
                className="w-full border-y-2 border-dashed px-2 py-4 text-left text-sm font-medium"
              >
                Developer
              </Pressable>

              <div className="mx-8 mt-auto flex flex-col gap-4 py-12">
                <span className="text-center">
                  Existing Customer? <b>Login</b>
                </span>
                <Pressable href="#" size="lg" asButton>
                  Start now
                </Pressable>
              </div>
            </div>
          )}
        </NavigationMenu>
      </div>
    </section>
  );
};

export default NavbarPlatformResources;
