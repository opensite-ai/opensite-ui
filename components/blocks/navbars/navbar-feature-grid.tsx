"use client";

import * as React from "react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";

interface FeatureItem {
  title: string;
  description: string;
  href: string;
}

/**
 * Props for the NavbarFeatureGrid component
 */
export interface NavbarFeatureGridProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  features?: FeatureItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const defaultFeatures: FeatureItem[] = [
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

/**
 * NavbarFeatureGrid - A responsive navigation bar with a two-column feature grid dropdown.
 * 
 * Features a logo, navigation menu with a grid-based features dropdown showing title and
 * description for each feature. Includes Products, Resources, and Contact links. Mobile
 * view uses a top-sliding sheet with accordion navigation. Ideal for SaaS applications
 * with multiple feature categories.
 */
export const NavbarFeatureGrid = ({
  className,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  features = defaultFeatures,
  optixFlowConfig,
}: NavbarFeatureGridProps) => {
  return (
    <section className={cn("py-4", className)}>
      <div className="container">
        <nav className="flex items-center justify-between">
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
                        <div>
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
            <Pressable href="#" variant="outline" asButton>
              Sign in
            </Pressable>
            <Pressable href="#" asButton>
              Start for free
            </Pressable>
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Pressable variant="outline" size="icon" asButton onClick={() => {}}>
                <DynamicIcon name="lucide/menu" size={16} />
              </Pressable>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
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
                          <Pressable
                            href={feature.href}
                            key={index}
                            className="rounded-md p-3 transition-colors hover:bg-muted/70"
                          >
                            <div>
                              <p className="mb-1 font-semibold text-foreground">
                                {feature.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </Pressable>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div className="flex flex-col gap-6">
                  <Pressable href="#" className="font-medium">
                    Templates
                  </Pressable>
                  <Pressable href="#" className="font-medium">
                    Blog
                  </Pressable>
                  <Pressable href="#" className="font-medium">
                    Pricing
                  </Pressable>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  <Pressable href="#" variant="outline" asButton>
                    Sign in
                  </Pressable>
                  <Pressable href="#" asButton>
                    Start for free
                  </Pressable>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export default NavbarFeatureGrid;
