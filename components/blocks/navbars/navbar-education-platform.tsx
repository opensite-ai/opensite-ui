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
  navigationMenuTriggerStyle,
} from "../../ui/navigation-menu";
import { Separator } from "../../ui/separator";
import {
  logoPlaceholders,
  imagePlaceholders,
} from "../../../lib/mediaPlaceholders";
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
export type { LogoConfig };

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
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the nav
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
   * Features for Products menu
   */
  features?: FeatureItem[];
  /**
   * Documentation items for Support menu
   */
  docs?: DocItem[];
  /**
   * Company items for Support menu
   */
  company?: CompanyItem[];
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
}

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
  containerClassName,
  navClassName,
  navigationMenuClassName,
  actionsClassName,
  logoClassName,
  mobileMenuClassName,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
  },
  logoSlot,
  features,
  docs,
  company,
  authActions,
  authActionsSlot,
  layoutVariant = "fullScreenContainerizedLinks",
  background = "white",
  spacing = "none",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarEducationPlatformProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    return (
      <Pressable
        href={logo.url || "/"}
        className={cn("flex items-center gap-2", logoClassName)}
      >
        {logo.src && (
          <Img
            src={logo.src}
            alt={logo.alt || "Logo"}
            className={cn("h-8 dark:invert", logo.className)}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        {logo.title &&
          (typeof logo.title === "string" ? (
            <span className="text-lg font-semibold">{logo.title}</span>
          ) : (
            logo.title
          ))}
      </Pressable>
    );
  };

  const renderAuthActions = () => {
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
        <Pressable key={index} className={actionClassName} {...pressableProps}>
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
      background={background}
      spacing={spacingOverride ?? spacing}
      className={cn(
        isOpen && "border-b-0",
        sectionClasses,
      )}
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
                "flex items-center justify-between py-4",
                navClassName,
              )}
            >
          <div className="flex flex-1 items-center gap-9">
            {renderLogo()}
            <div
              className={cn(
                "hidden items-center gap-1.5 lg:flex",
                navigationMenuClassName,
              )}
            >
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
                          {features?.map((feature) => (
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
                                <DynamicIcon
                                  name="lucide/book-open"
                                  size={16}
                                />
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
                          {docs?.map((doc) => (
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
                            {company?.map((item) => (
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

          <div
            className={cn(
              "hidden items-center gap-2 lg:flex",
              actionsClassName,
            )}
          >
            {renderAuthActions()}
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
        </div>
      </div>

      {isOpen && (
        <div
          className={cn(
            "border-t bg-background lg:hidden",
            mobileMenuClassName,
          )}
        >
          <div className={cn("container", containerClassName)}>
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
                        {features?.map((feature) => (
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
                          <span className="text-sm font-medium">
                            Platform 101
                          </span>
                        </Pressable>
                        <Pressable
                          href="#"
                          className="flex cursor-pointer flex-row items-center gap-3 rounded-md transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <DynamicIcon name="lucide/users" size={16} />
                          <span className="text-sm font-medium">
                            Find a tutor
                          </span>
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
                        {docs?.map((doc) => (
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
                        {company?.map((item) => (
                          <Pressable
                            key={item.title}
                            href={item.link}
                            className="flex cursor-pointer flex-row items-center gap-3 rounded-md transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <DynamicIcon name={item.icon} size={16} />
                            <span className="text-sm font-medium">
                              {item.title}
                            </span>
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
    </Section>
  );
};

export default NavbarEducationPlatform;
