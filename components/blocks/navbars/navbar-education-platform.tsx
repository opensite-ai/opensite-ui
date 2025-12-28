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
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
import { Separator } from "../../ui/separator";
import { logoPlaceholders, imagePlaceholders } from "../../../lib/mediaPlaceholders";

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  link: string;
}

interface DocItem {
  title: string;
  description: string;
  icon: string;
  link: string;
}

interface CompanyItem {
  title: string;
  icon: string;
  link: string;
}

/**
 * Props for the NavbarEducationPlatform component
 */
export interface NavbarEducationPlatformProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  features?: FeatureItem[];
  docs?: DocItem[];
  company?: CompanyItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultFeatures: FeatureItem[] = [
  {
    title: "Course Management & Content",
    description: "Create, organize and deliver courses",
    icon: "lucide/graduation-cap",
    link: "#",
  },
  {
    title: "Student Analytics",
    description: "Track progress and performance data",
    icon: "lucide/bar-chart-3",
    link: "#",
  },
  {
    title: "Interactive Learning",
    description: "Engage students with multimedia content",
    icon: "lucide/video",
    link: "#",
  },
  {
    title: "AI-Powered Tutoring",
    description: "Personalized learning with AI assistance",
    icon: "lucide/brain",
    link: "#",
  },
  {
    title: "Collaboration & Discussion",
    description: "Connect students and instructors seamlessly",
    icon: "lucide/message-square",
    link: "#",
  },
  {
    title: "Assessments & Certification",
    description: "Evaluate learning with comprehensive testing",
    icon: "lucide/award",
    link: "#",
  },
];

const defaultDocs: DocItem[] = [
  {
    title: "Learning Center",
    description: "Discover how to use the platform effectively",
    icon: "lucide/book",
    link: "#",
  },
  {
    title: "Course Catalog",
    description: "Browse our comprehensive course library",
    icon: "lucide/book-open",
    link: "#",
  },
  {
    title: "API Documentation",
    description: "Integrate the platform into your system",
    icon: "lucide/file-code",
    link: "#",
  },
];

const defaultCompany: CompanyItem[] = [
  { title: "Platform Updates", icon: "lucide/file-text", link: "#" },
  { title: "News & Events", icon: "lucide/bell", link: "#" },
  { title: "Education Blog", icon: "lucide/book", link: "#" },
  { title: "Join Our Team", icon: "lucide/users", link: "#" },
];

/**
 * NavbarEducationPlatform - A comprehensive navigation bar designed for education and LMS platforms.
 * 
 * Features two main dropdown menus: Products (with tools and quick start sections) and Support
 * (with guides and about us sections). Products dropdown includes a featured image card for
 * latest updates. Each menu item displays an icon, title, and description with hover animations.
 * Mobile view uses accordion navigation with categorized sections. Ideal for e-learning platforms,
 * course management systems, and educational technology products.
 */
export const NavbarEducationPlatform = ({
  className,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  features = defaultFeatures,
  docs = defaultDocs,
  company = defaultCompany,
  optixFlowConfig,
}: NavbarEducationPlatformProps) => {
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
            <Pressable href={logo.url} className="flex items-center gap-2">
              <Img
                src={logo.src}
                alt={logo.alt}
                className="h-8 dark:invert"
                optixFlowConfig={optixFlowConfig}
              />
              <span className="text-lg font-semibold">{logo.title}</span>
            </Pressable>
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
                              <Pressable
                                href={feature.link}
                                className="group flex cursor-pointer flex-row gap-3"
                              >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                                  <DynamicIcon name={feature.icon} size={20} />
                                </span>
                                <div className="flex flex-col">
                                  <span className="flex items-center gap-0.5 text-sm font-medium whitespace-nowrap">
                                    {feature.title}
                                    <DynamicIcon
                                      name="lucide/chevron-right"
                                      size={16}
                                      className="text-primary! opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                                    />
                                  </span>
                                  <p className="text-xs whitespace-nowrap text-muted-foreground">
                                    {feature.description}
                                  </p>
                                </div>
                              </Pressable>
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
                              <Pressable
                                href="#"
                                className="flex flex-row items-center gap-3"
                              >
                                <DynamicIcon name="lucide/book-open" size={16} />
                                <span className="text-sm font-medium whitespace-nowrap">
                                  Platform 101
                                </span>
                              </Pressable>
                            </NavigationMenuLink>
                            <NavigationMenuLink asChild>
                              <Pressable
                                href="#"
                                className="flex flex-row items-center gap-3"
                              >
                                <DynamicIcon name="lucide/users" size={16} />
                                <span className="text-sm font-medium whitespace-nowrap">
                                  Find a tutor
                                </span>
                              </Pressable>
                            </NavigationMenuLink>
                          </div>
                          <p className="mt-5 mb-3 text-[10px] text-muted-foreground uppercase">
                            LATEST UPDATES
                          </p>
                          <NavigationMenuLink asChild>
                            <Pressable href="#">
                              <div className="rounded-lg bg-primary p-3">
                                <Img
                                  src={imagePlaceholders[0]}
                                  alt="placeholder"
                                  className="aspect-video min-w-52 rounded-md object-cover"
                                  optixFlowConfig={optixFlowConfig}
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
                            </Pressable>
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
                              <Pressable
                                href={doc.link}
                                className="group flex flex-row gap-3"
                              >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                                  <DynamicIcon name={doc.icon} size={20} />
                                </span>
                                <div className="flex flex-col">
                                  <span className="flex items-center gap-0.5 text-sm font-medium whitespace-nowrap">
                                    {doc.title}
                                    <DynamicIcon
                                      name="lucide/chevron-right"
                                      size={16}
                                      className="text-primary! opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                                    />
                                  </span>
                                  <p className="text-xs whitespace-nowrap text-muted-foreground">
                                    {doc.description}
                                  </p>
                                </div>
                              </Pressable>
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
                            {company.map((item) => (
                              <NavigationMenuLink key={item.title} asChild>
                                <Pressable
                                  href={item.link}
                                  className="flex flex-row items-center gap-3"
                                >
                                  <DynamicIcon name={item.icon} size={16} />
                                  <span className="text-sm font-medium whitespace-nowrap">
                                    {item.title}
                                  </span>
                                </Pressable>
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
                      <Pressable href="#">About</Pressable>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Pressable variant="outline" asButton href="#">
              Login
            </Pressable>
            <Pressable asButton href="#">
              Demo
            </Pressable>
          </div>

          <Pressable
            variant="outline"
            size="icon"
            asButton
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <DynamicIcon name="lucide/x" size={20} />
            ) : (
              <DynamicIcon name="lucide/menu" size={20} />
            )}
            <span className="sr-only">Toggle menu</span>
          </Pressable>
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
                          <Pressable
                            key={feature.title}
                            href={feature.link}
                            className="group flex cursor-pointer flex-row gap-3 rounded-md transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                              <DynamicIcon name={feature.icon} size={16} />
                            </span>
                            <div className="flex min-w-0 flex-col">
                              <span className="text-sm leading-tight font-medium">
                                {feature.title}
                              </span>
                              <p className="text-xs leading-tight text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </Pressable>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="mb-3 text-[10px] text-muted-foreground uppercase">
                        QUICK START
                      </p>
                      <div className="space-y-5">
                        <Pressable
                          href="#"
                          className="flex cursor-pointer flex-row items-center gap-3 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <DynamicIcon name="lucide/book-open" size={16} />
                          <span className="text-sm font-medium">Platform 101</span>
                        </Pressable>
                        <Pressable
                          href="#"
                          className="flex cursor-pointer flex-row items-center gap-3 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <DynamicIcon name="lucide/users" size={16} />
                          <span className="text-sm font-medium">Find a tutor</span>
                        </Pressable>
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
                          <Pressable
                            key={doc.title}
                            href={doc.link}
                            className="group flex cursor-pointer flex-row gap-3 rounded-md transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-background">
                              <DynamicIcon name={doc.icon} size={16} />
                            </span>
                            <div className="flex min-w-0 flex-col">
                              <span className="text-sm leading-tight font-medium">
                                {doc.title}
                              </span>
                              <p className="text-xs leading-tight text-muted-foreground">
                                {doc.description}
                              </p>
                            </div>
                          </Pressable>
                        ))}
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <p className="mb-3 text-[10px] text-muted-foreground uppercase">
                        ABOUT US
                      </p>
                      <div className="space-y-5">
                        {company.map((item) => (
                          <Pressable
                            key={item.title}
                            href={item.link}
                            className="flex cursor-pointer flex-row items-center gap-3 rounded-md transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <DynamicIcon name={item.icon} size={16} />
                            <span className="text-sm font-medium">{item.title}</span>
                          </Pressable>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="space-y-2">
              <Pressable
                href="#"
                className="block border-b border-border py-4 pr-3 text-base font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Pressable>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default NavbarEducationPlatform;
