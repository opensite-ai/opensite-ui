"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { NavbarLogo } from "../../ui/navbar-logo";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { LogoConfig, NavbarLayoutVariant } from "./types";
import { getNavbarLayoutClasses } from "./layout-variant-utils";

// Re-export for backward compatibility
export type { LogoConfig };

interface FeatureItem {
  title: string;
  description: string;
  href: string;
}

/**
 * Props for the NavbarFeatureGrid component
 */
export interface NavbarFeatureGridProps {
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
   * Logo configuration
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo object)
   */
  logoSlot?: React.ReactNode;
  /**
   * Features for Features dropdown
   */
  features?: FeatureItem[];
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
 * NavbarFeatureGrid - A responsive navigation bar with a two-column feature grid dropdown.
 *
 * Features a logo, navigation menu with a grid-based features dropdown showing title and
 * description for each feature. Includes Products, Resources, and Contact links. Mobile
 * view uses a top-sliding sheet with accordion navigation. Ideal for SaaS applications
 * with multiple feature categories.
 */
export const NavbarFeatureGrid = ({
  className,
  containerClassName,
  navClassName,
  navigationMenuClassName,
  actionsClassName,
  logoClassName,
  logo,
  logoSlot,
  features,
  authActions,
  authActionsSlot,
  layoutVariant = "fullScreenContainerizedLinks",
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarFeatureGridProps) => {
  const renderAuthActions = useMemo(() => {
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
  }, [authActionsSlot, authActions]);

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
      className={sectionClasses}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={sectionContainerClassName}
      containerMaxWidth={sectionContainerMaxWidth}
    >
      <div className={containerWrapperClasses}>
        <div className={navWrapperClasses}>
          <div className={innerContainerClasses}>
            <nav
              className={cn("flex items-center justify-between", navClassName)}
            >
              <NavbarLogo
                logo={logo}
                logoSlot={logoSlot}
                logoClassName={logoClassName}
                optixFlowConfig={optixFlowConfig}
              />
              <NavigationMenu
                className={cn("hidden lg:block", navigationMenuClassName)}
              >
                <NavigationMenuList>
                  {features && features.length > 0 && (
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
                                <p className="mb-1 font-semibold">
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
                  )}
                </NavigationMenuList>
              </NavigationMenu>
              <div
                className={cn(
                  "hidden items-center gap-4 lg:flex",
                  actionsClassName,
                )}
              >
                {renderAuthActions}
              </div>
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Pressable
                    variant="outline"
                    size="icon"
                    asButton
                    onClick={() => {}}
                  >
                    <DynamicIcon name="lucide/menu" size={16} />
                  </Pressable>
                </SheetTrigger>
                <SheetContent side="top" className="max-h-screen overflow-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <NavbarLogo
                        logo={logo}
                        logoSlot={logoSlot}
                        logoClassName={logoClassName}
                        optixFlowConfig={optixFlowConfig}
                      />
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col p-4">
                    {features && features.length > 0 && (
                      <Accordion
                        type="single"
                        collapsible
                        className="mt-4 mb-2"
                      >
                        <AccordionItem
                          value="solutions"
                          className="border-none"
                        >
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
                                    <p className="mb-1 font-semibold">
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
                    )}
                    <div
                      className={cn(
                        "mt-6 flex flex-col gap-4",
                        actionsClassName,
                      )}
                    >
                      {renderAuthActions}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </nav>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NavbarFeatureGrid;
