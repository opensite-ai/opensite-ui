"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
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
} from "../../ui/navigation-menu";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

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
 * Logo configuration interface
 */
export interface LogoConfig {
  url?: string;
  src?: string;
  alt?: string;
  title?: React.ReactNode;
  className?: string;
}

/**
 * Props for the NavbarPlatformResources component
 */
export interface NavbarPlatformResourcesProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the navigation menu
   */
  navigationMenuClassName?: string;
  /**
   * Additional CSS classes for the navigation menu list
   */
  navigationMenuListClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the logo
   */
  logoClassName?: string;
  /**
   * Additional CSS classes for the mobile menu
   */
  mobileMenuClassName?: string;
  /**
   * Logo configuration
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo object)
   */
  logoSlot?: React.ReactNode;
  /**
   * Solutions for Platform menu
   */
  solutions?: SolutionItem[];
  /**
   * Platform cases for Platform menu
   */
  platformCases?: PlatformItem[];
  /**
   * Resources for Resources menu
   */
  resources?: ResourceItem[];
  /**
   * Authentication action configurations
   */
  authActions?: ActionConfig[];
  /**
   * Custom slot for auth actions (overrides authActions array)
   */
  authActionsSlot?: React.ReactNode;
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

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
  containerClassName,
  navigationMenuClassName,
  navigationMenuListClassName,
  actionsClassName,
  logoClassName,
  mobileMenuClassName,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  logoSlot,
  solutions,
  platformCases,
  resources,
  authActions,
  authActionsSlot,
  background = "white",
  spacing = "none",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarPlatformResourcesProps) => {
  const [open, setOpen] = useState(false);

  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    return (
      <Pressable href={logo.url || "/"} className={cn("flex items-center gap-2", logoClassName)}>
        {logo.src && (
          <Img
            src={logo.src}
            className={cn("max-h-8", logo.className)}
            alt={logo.alt || "Logo"}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        {logo.title && (
          typeof logo.title === "string" ? (
            <span className="text-lg font-semibold tracking-tighter">
              {logo.title}
            </span>
          ) : (
            logo.title
          )
        )}
      </Pressable>
    );
  };

  const renderAuthActions = () => {
    if (authActionsSlot) return authActionsSlot;
    if (!authActions || authActions.length === 0) return null;

    return authActions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
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
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn("inset-x-0 top-0 z-20", className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container px-4 sm:px-6 md:px-8 lg:px-40 xl:px-52", containerClassName)}>
        <NavigationMenu className={cn("min-w-full", navigationMenuClassName)}>
          <div className="flex w-full items-center justify-between gap-12 py-4">
            {renderLogo()}
            <NavigationMenuList className={cn("hidden lg:flex", navigationMenuListClassName)}>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[760px] p-4">
                  <div className="flex items-start justify-between">
                    <div className="max-w-[760px] flex-1">
                      <div className="text-xs tracking-widest text-muted-foreground">
                        Solutions
                      </div>
                      <div className="grid grid-rows-1 gap-6">
                        {solutions?.map((solution, index) => (
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
                        {platformCases?.map((item, index) => (
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
                    {resources?.map((resource, index) => (
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
            <div className={cn("hidden items-center gap-4 lg:flex", actionsClassName)}>
              {renderAuthActions()}
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
            <div className={cn("absolute inset-0 top-[72px] flex h-[calc(100vh-72px)] w-full flex-col overflow-scroll border-t border-border bg-background lg:hidden", mobileMenuClassName)}>
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
                          {solutions?.map((solution, index) => (
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
                          {platformCases?.map((useCase, index) => (
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
                      {resources?.map((resource, index) => (
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

              <div className={cn("mx-8 mt-auto flex flex-col gap-4 py-12", actionsClassName)}>
                {renderAuthActions()}
              </div>
            </div>
          )}
        </NavigationMenu>
      </div>
    </Section>
  );
};

export default NavbarPlatformResources;
