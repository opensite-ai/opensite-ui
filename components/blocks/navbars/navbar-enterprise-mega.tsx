"use client";

import * as React from "react";
import { Fragment, useState, useEffect } from "react";
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
import { Sheet, SheetContent, SheetTitle } from "../../ui/sheet";
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

interface SubpageItem {
  id: string;
  title: string;
  href: string;
  icon: string;
}

interface SolutionItem {
  id: string;
  title: string;
  description: string;
  href: string;
  subpages: SubpageItem[];
}

interface TechnologyItem {
  id: string;
  title: string;
  href: string;
  icon: string;
}

interface ProductItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

interface ProductCategory {
  title: string;
  products: ProductItem[];
}

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

interface GlobalCategory {
  title: string;
  features: FeatureItem[];
}

interface LocationItem {
  title: string;
  href: string;
  icon: string;
}

interface RegionItem {
  title: string;
  locations: LocationItem[];
}

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

interface TopicItem {
  id: string;
  title: string;
  href: string;
  icon: string;
}

interface TopicGroup {
  title: string;
  topics: TopicItem[];
}

interface MenuItem {
  title: string;
  url?: string;
  menuType?: "solutions" | "products" | "global" | "partners" | "resources";
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
 * Props for the NavbarEnterpriseMega component
 */
export interface NavbarEnterpriseMegaProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the navigation wrapper
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
   * Navigation menu items
   */
  navigation?: MenuItem[];
  /**
   * Solutions for Solutions menu
   */
  solutions?: SolutionItem[];
  /**
   * Solution technologies for Solutions menu
   */
  solutionTechnologies?: TechnologyItem[];
  /**
   * Product categories for Products menu
   */
  productCategories?: ProductCategory[];
  /**
   * Global categories for Global menu
   */
  globalCategories?: GlobalCategory[];
  /**
   * Regions for Global menu
   */
  regions?: RegionItem[];
  /**
   * Resources for Resources menu
   */
  resources?: ResourceItem[];
  /**
   * Topic groups for Resources menu
   */
  topicGroups?: TopicGroup[];
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

const MOBILE_BREAKPOINT = 1024;

/**
 * NavbarEnterpriseMega - A comprehensive enterprise-grade navigation bar with multiple mega-menu styles.
 *
 * Features five distinct mega-menu types: (1) Solutions with bordered cards containing subpages and
 * a developer platform section, (2) Products with featured image card and categorized product listings,
 * (3) Global with enterprise/business features and regional location selectors, (4) Partners with
 * large promotional cards and partner type listings, and (5) Resources with topic groups and resource
 * cards. Each menu spans full width with rich content layouts. Mobile view uses a full-screen sheet
 * with accordion navigation. Ideal for large enterprise SaaS platforms and B2B software companies.
 */
export const NavbarEnterpriseMega = ({
  className,
  containerClassName,
  navClassName,
  navigationMenuClassName,
  actionsClassName,
  logoClassName,
  logo = {
    url: "/",
    src: logoPlaceholders.logoMark,
    alt: "Opensite AI",
    title: "Opensite AI",
  },
  logoSlot,
  navigation,
  solutions,
  solutionTechnologies,
  productCategories,
  globalCategories,
  regions,
  resources,
  topicGroups,
  authActions,
  authActionsSlot,
  background = "white",
  spacing = "none",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarEnterpriseMegaProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        setOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleMobileMenu = () => {
    setOpen(!open);
  };

  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    return (
      <Pressable
        href={logo.url || "/"}
        className={cn("flex max-h-8 items-center gap-2 text-lg font-semibold tracking-tighter", logoClassName)}
      >
        {logo.src && (
          <Img
            src={logo.src}
            alt={logo.alt || "Logo"}
            className={cn("inline-block size-6", logo.className)}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        {logo.title && (
          typeof logo.title === "string" ? (
            <span className="hidden md:inline-block">{logo.title}</span>
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
    <Fragment>
      <Section
        background={background}
        spacing={spacing}
        className={cn(
          "pointer-events-auto fixed top-0 z-999 flex w-full items-center justify-center border-b",
          className
        )}
        pattern={pattern}
        patternOpacity={patternOpacity}
      >
        <div className={cn("container", containerClassName)}>
          <div className={cn("flex h-16 items-center justify-between gap-8", navClassName)}>
            {renderLogo()}
            <NavigationMenu className={cn("hidden lg:flex", navigationMenuClassName)} viewport={false}>
              <NavigationMenuList>
                {navigation.map((item, index) => (
                  <DesktopMenuItem
                    key={`desktop-link-${index}`}
                    item={item}
                    index={index}
                    solutions={solutions}
                    solutionTechnologies={solutionTechnologies}
                    productCategories={productCategories}
                    globalCategories={globalCategories}
                    regions={regions}
                    resources={resources}
                    topicGroups={topicGroups}
                    optixFlowConfig={optixFlowConfig}
                  />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className={cn("flex items-center gap-3", actionsClassName)}>
              <div className="hidden lg:flex lg:items-center lg:gap-3">
                {renderAuthActions()}
              </div>
              <div className="lg:hidden">
                <Pressable
                  className="size-11"
                  variant="ghost"
                  size="icon"
                  asButton
                  onClick={handleMobileMenu}
                >
                  {open ? (
                    <DynamicIcon
                      name="lucide/x"
                      size={22}
                      className="stroke-foreground"
                    />
                  ) : (
                    <DynamicIcon
                      name="lucide/menu"
                      size={22}
                      className="stroke-foreground"
                    />
                  )}
                </Pressable>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <MobileNavigationMenu
        open={open}
        navigation={navigation}
        solutions={solutions}
        productCategories={productCategories}
        resources={resources}
        actionsClassName={actionsClassName}
        authActions={authActions}
        authActionsSlot={authActionsSlot}
        optixFlowConfig={optixFlowConfig}
      />
    </Fragment>
  );
};

interface DesktopMenuItemProps {
  item: MenuItem;
  index: number;
  solutions: SolutionItem[];
  solutionTechnologies: TechnologyItem[];
  productCategories: ProductCategory[];
  globalCategories: GlobalCategory[];
  regions: RegionItem[];
  resources: ResourceItem[];
  topicGroups: TopicGroup[];
  optixFlowConfig?: OptixFlowConfig;
}

const DesktopMenuItem = ({
  item,
  index,
  solutions,
  solutionTechnologies,
  productCategories,
  globalCategories,
  regions,
  resources,
  topicGroups,
  optixFlowConfig,
}: DesktopMenuItemProps) => {
  if (item.menuType) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
        <NavigationMenuTrigger className="h-fit bg-transparent font-normal text-foreground/60">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="rounded-xl! border-0! p-0!">
          <div className="w-dvw px-8 pt-6 pb-12">
            <div className="container">
              {item.menuType === "solutions" && (
                <SolutionsMenu
                  solutions={solutions}
                  solutionTechnologies={solutionTechnologies}
                  optixFlowConfig={optixFlowConfig}
                />
              )}
              {item.menuType === "products" && (
                <ProductsMenu
                  productCategories={productCategories}
                  optixFlowConfig={optixFlowConfig}
                />
              )}
              {item.menuType === "global" && (
                <GlobalMenu
                  globalCategories={globalCategories}
                  regions={regions}
                  optixFlowConfig={optixFlowConfig}
                />
              )}
              {item.menuType === "partners" && (
                <PartnersMenu optixFlowConfig={optixFlowConfig} />
              )}
              {item.menuType === "resources" && (
                <ResourcesMenu
                  resources={resources}
                  topicGroups={topicGroups}
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

interface SolutionsMenuProps {
  solutions: SolutionItem[];
  solutionTechnologies: TechnologyItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const SolutionsMenu = ({
  solutions,
  solutionTechnologies,
  optixFlowConfig,
}: SolutionsMenuProps) => (
  <div className="grid gap-8 sm:grid-cols-2">
    <Pressable
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
            <DynamicIcon
              name="lucide/arrow-right"
              size={16}
              className="ml-1 transition-transform group-hover:translate-x-1"
            />
          </div>
          <p className="mt-2 text-xs text-primary-foreground/85">
            Streamline collaboration, automate workflows, and boost productivity
            across your organization.
          </p>
        </div>
        <div className="relative aspect-2/1 overflow-clip rounded-t pl-6 lg:max-w-64 lg:pl-0 xl:max-w-96">
          <Img
            src={imagePlaceholders[0]}
            alt="placeholder"
            className="aspect-2/1 h-full w-full translate-y-px object-cover object-center"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    </Pressable>

    <div className="order-last mt-3 sm:order-0 sm:mt-0 sm:py-2 md:p-6">
      <div className="mb-4 text-left leading-none md:col-span-2 lg:col-span-4 lg:mb-6">
        <strong className="text-left text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Developer Platform
        </strong>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {solutionTechnologies.map((technology) => (
          <NavigationMenuLink
            key={technology.id}
            href={technology.href}
            className="group flex flex-row items-center gap-4"
          >
            <DynamicIcon name={technology.icon} size={16} />
            <div className="flex-1 text-sm font-medium">{technology.title}</div>
            <DynamicIcon
              name="lucide/arrow-right"
              size={16}
              className="transition-transform group-hover:translate-x-1 lg:hidden"
            />
          </NavigationMenuLink>
        ))}
      </div>
    </div>
    <div className="col-span-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {solutions.map((solution) => (
        <div key={solution.id} className="rounded-md border border-border p-5">
          <div className="border-b border-border pb-4">
            <Pressable
              href={solution.href}
              className="group flex flex-col text-left"
            >
              <div className="flex items-center">
                <strong className="text-sm font-medium">
                  {solution.title}
                </strong>
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={16}
                  className="ml-1 transition-transform group-hover:translate-x-1"
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {solution.description}
              </p>
            </Pressable>
          </div>
          <menu className="mt-6 grid gap-y-4">
            {solution.subpages.map((subpage) => (
              <NavigationMenuLink
                key={subpage.id}
                href={subpage.href}
                className="group flex flex-row items-center space-x-4 text-left text-foreground/85 hover:text-foreground lg:space-x-4 lg:border-0"
              >
                <DynamicIcon name={subpage.icon} size={16} />
                <div className="flex-1 text-sm font-medium">
                  {subpage.title}
                </div>
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={16}
                  className="transition-transform group-hover:translate-x-1 lg:hidden"
                />
              </NavigationMenuLink>
            ))}
          </menu>
        </div>
      ))}
    </div>
  </div>
);

interface ProductsMenuProps {
  productCategories: ProductCategory[];
  optixFlowConfig?: OptixFlowConfig;
}

const ProductsMenu = ({
  productCategories,
  optixFlowConfig,
}: ProductsMenuProps) => (
  <div className="grid gap-y-12 lg:flex lg:space-x-8">
    <div className="w-full shrink-0 lg:max-w-[18rem]">
      <Pressable
        href="#"
        className="group relative flex h-full flex-row overflow-hidden rounded-lg px-0 text-primary-foreground lg:rounded-xl"
      >
        <div className="relative z-10 flex w-full flex-col text-left">
          <div className="relative flex aspect-2/1 max-h-44 w-full flex-1 justify-center">
            <Img
              src={imagePlaceholders[5]}
              alt="placeholder"
              className="h-full w-full object-cover object-center"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
          <div className="relative z-20 flex flex-col rounded-b-xl bg-primary p-6">
            <div className="flex items-center space-x-1 text-xs">
              Enterprise Solutions
              <DynamicIcon
                name="lucide/arrow-right"
                size={16}
                className="ml-1 transition-transform group-hover:translate-x-1"
              />
            </div>
            <p className="mt-2 text-xs text-primary-foreground/70">
              Scale your business with enterprise-grade features and support.
            </p>
          </div>
        </div>
      </Pressable>
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
                href={product.href}
                className="group flex flex-row items-center space-x-6 border-b border-border py-5 text-left sm:py-7 lg:space-x-4 lg:border-0 lg:py-2"
              >
                <div className="relative flex aspect-square w-6 shrink-0 items-center justify-center overflow-clip rounded md:size-9 md:p-2">
                  <Img
                    src={product.image}
                    alt={product.title}
                    className="dark:invert"
                    optixFlowConfig={optixFlowConfig}
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
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={16}
                  className="transition-transform group-hover:translate-x-1 lg:hidden"
                />
              </NavigationMenuLink>
            ))}
          </menu>
        </div>
      ))}
    </div>
  </div>
);

interface GlobalMenuProps {
  globalCategories: GlobalCategory[];
  regions: RegionItem[];
  optixFlowConfig?: OptixFlowConfig;
}

const GlobalMenu = ({
  globalCategories,
  regions,
  optixFlowConfig,
}: GlobalMenuProps) => (
  <div>
    <div className="space-y-6 lg:flex lg:space-y-0 lg:space-x-8">
      <div className="w-full shrink-0 lg:max-w-[18rem]">
        <Pressable
          href="#"
          className="group relative flex h-full flex-row overflow-hidden rounded-lg p-0 text-primary-foreground lg:rounded-xl"
        >
          <div className="relative z-10 flex w-full flex-col-reverse text-left lg:flex-col">
            <div className="relative flex aspect-4/3 max-h-72 w-full flex-1 justify-center">
              <Img
                src={imagePlaceholders[6]}
                alt="placeholder"
                className="h-full w-full object-cover object-center"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
            <div className="relative z-20 flex flex-col rounded-b-xl bg-primary p-6">
              <div className="flex items-center space-x-1 text-xs">
                Enterprise Solutions
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={16}
                  className="ml-1 transition-transform group-hover:translate-x-1"
                />
              </div>
              <p className="mt-2 text-xs text-primary-foreground/85">
                Scale your business with enterprise-grade features and support.
              </p>
            </div>
          </div>
        </Pressable>
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
                  href={feature.href}
                  className="group flex flex-row items-center space-x-4 border-b border-border py-5 text-left sm:py-7 lg:border-0 lg:py-0"
                >
                  <div className="flex aspect-square size-9 shrink-0 items-center justify-center">
                    <DynamicIcon name={feature.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground/85 group-hover:text-foreground">
                      {feature.title}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground">
                      {feature.description}
                    </p>
                  </div>
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="transition-transform group-hover:translate-x-1 lg:hidden"
                  />
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
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="transition-transform group-hover:translate-x-1 lg:hidden"
                  />
                </NavigationMenuLink>
              ))}
            </menu>
          </div>
        ))}
      </div>
    </div>
  </div>
);

interface PartnersMenuProps {
  optixFlowConfig?: OptixFlowConfig;
}

const PartnersMenu = ({ optixFlowConfig }: PartnersMenuProps) => (
  <div className="grid gap-y-6 md:grid-cols-2 md:gap-x-6 lg:grid-cols-4">
    <div className="md:col-span-2">
      <Pressable
        href="#"
        className="group relative flex h-full flex-row overflow-hidden rounded-lg bg-primary p-0 text-primary-foreground lg:rounded-xl"
      >
        <div className="relative z-10 flex w-full flex-col-reverse text-left">
          <div className="relative z-20 flex flex-col px-6 pt-6 pb-56 md:pt-40 md:pb-6">
            <div className="mt-auto flex items-center space-x-1 text-xs font-medium">
              Partner Program
              <DynamicIcon
                name="lucide/arrow-right"
                size={16}
                className="ml-1 transition-transform group-hover:translate-x-1"
              />
            </div>
            <p className="mt-2 text-xs">
              Join our partner network and grow your business with our leading
              productivity platform.
            </p>
          </div>
          <div className="absolute inset-0 top-[32%] bg-accent invert md:top-0">
            <Img
              src={imagePlaceholders[7]}
              alt="placeholder"
              className="object-fit h-full w-full object-top-right opacity-100 md:h-2/3 md:object-top"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </Pressable>
    </div>
    <div className="md:col-span-1">
      <Pressable
        href="#"
        className="group relative flex h-full flex-row overflow-hidden rounded-lg bg-accent p-0 text-accent-foreground lg:rounded-xl"
      >
        <div className="relative z-10 flex w-full flex-col-reverse text-left">
          <div className="relative z-20 flex flex-col px-6 pt-6 pb-56 md:pt-40 md:pb-6">
            <div className="mt-auto flex items-center space-x-1 text-xs font-medium">
              Solution Partners
              <DynamicIcon
                name="lucide/arrow-right"
                size={16}
                className="ml-1 transition-transform group-hover:translate-x-1"
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Build and deliver solutions that help customers achieve more.
            </p>
          </div>
          <div className="absolute inset-0 top-[32%] md:top-0">
            <Img
              src={imagePlaceholders[8]}
              alt="placeholder"
              className="object-fit h-full w-full object-top-right md:h-2/3 md:object-top"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </Pressable>
    </div>
    <div className="grid gap-4 md:col-span-1">
      <NavigationMenuLink
        href="#"
        className="group flex w-full flex-row items-center rounded-lg border border-border lg:rounded-xl"
      >
        <div className="flex items-start p-6 text-left">
          <DynamicIcon name="lucide/users" size={32} />
          <div className="ml-4">
            <div className="mt-auto mb-1 text-sm font-bold text-foreground/85 hover:text-foreground">
              Implementation Partners
            </div>
            <p className="text-xs text-muted-foreground group-hover:text-foreground">
              Help customers implement and optimize their workflows.
            </p>
          </div>
        </div>
      </NavigationMenuLink>
      <NavigationMenuLink
        href="#"
        className="group flex w-full flex-row items-center rounded-lg border border-border lg:rounded-xl"
      >
        <div className="flex items-start p-6 text-left">
          <DynamicIcon name="lucide/monitor" size={32} />
          <div className="ml-4">
            <div className="mt-auto mb-1 text-sm font-bold text-foreground/85 hover:text-foreground">
              Technology Partners
            </div>
            <p className="text-xs text-muted-foreground group-hover:text-foreground">
              Integrate your products with our platform.
            </p>
          </div>
        </div>
      </NavigationMenuLink>
    </div>
  </div>
);

interface ResourcesMenuProps {
  resources: ResourceItem[];
  topicGroups: TopicGroup[];
}

const ResourcesMenu = ({ resources, topicGroups }: ResourcesMenuProps) => (
  <div className="grid gap-8 lg:grid-cols-3">
    <div className="lg:col-span-2">
      <div className="mb-6 text-left">
        <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Resources
        </strong>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <NavigationMenuLink
            key={resource.id}
            href={resource.href}
            className="group flex flex-row items-start gap-4 rounded-lg border border-border p-4 hover:bg-accent"
          >
            <DynamicIcon
              name={resource.icon}
              size={20}
              className="mt-1 shrink-0"
            />
            <div>
              <div className="text-sm font-medium">{resource.title}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                {resource.description}
              </p>
            </div>
          </NavigationMenuLink>
        ))}
      </div>
    </div>
    <div>
      {topicGroups.map((group) => (
        <div key={group.title} className="mb-8 last:mb-0">
          <div className="mb-4 text-left">
            <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {group.title}
            </strong>
          </div>
          <div className="space-y-3">
            {group.topics.map((topic) => (
              <NavigationMenuLink
                key={topic.id}
                href={topic.href}
                className="group flex flex-row items-center gap-3 text-foreground/85 hover:text-foreground"
              >
                <DynamicIcon name={topic.icon} size={16} />
                <span className="text-sm font-medium">{topic.title}</span>
              </NavigationMenuLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface MobileNavigationMenuProps {
  open: boolean;
  navigation: MenuItem[];
  solutions: SolutionItem[];
  productCategories: ProductCategory[];
  resources: ResourceItem[];
  actionsClassName?: string;
  authActions?: ActionConfig[];
  authActionsSlot?: React.ReactNode;
  optixFlowConfig?: OptixFlowConfig;
}

const MobileNavigationMenu = ({
  open,
  navigation,
  solutions,
  productCategories,
  resources,
  actionsClassName,
  authActions,
  authActionsSlot,
  optixFlowConfig,
}: MobileNavigationMenuProps) => {
  const renderAuthActions = () => {
    if (authActionsSlot) return authActionsSlot;
    if (!authActions || authActions.length === 0) return null;

    return authActions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
          asButton
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
    <Sheet open={open}>
      <SheetContent
        aria-describedby={undefined}
        side="top"
        className="inset-0 z-998 h-dvh w-full bg-background pt-16 [&>button]:hidden"
      >
        <div className="h-full overflow-y-auto pt-4 pb-20">
          <div className="container">
            <div className="absolute -m-px h-px w-px overflow-hidden border-0 mask-clip-border p-0 text-nowrap whitespace-nowrap">
              <SheetTitle className="text-primary">
                Mobile Navigation
              </SheetTitle>
            </div>
            <div className={cn("flex flex-col gap-4", actionsClassName)}>
              {renderAuthActions()}
            </div>
            <Accordion type="multiple" className="mt-6 w-full">
              {navigation.map((item, index) => {
                if (item.menuType) {
                  return (
                    <AccordionItem
                      key={item.title}
                      value={`nav-${index}`}
                      className="border-b-0"
                    >
                      <AccordionTrigger className="h-15 items-center text-base font-normal text-foreground hover:no-underline">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent className="max-h-[60dvh] overflow-y-auto">
                        {item.menuType === "solutions" && (
                          <div className="space-y-4">
                            {solutions.map((solution) => (
                              <div key={solution.id} className="space-y-2">
                                <Pressable
                                  href={solution.href}
                                  className="text-sm font-medium"
                                >
                                  {solution.title}
                                </Pressable>
                                {solution.subpages.map((subpage) => (
                                  <Pressable
                                    key={subpage.id}
                                    href={subpage.href}
                                    className="flex items-center gap-2 pl-4 text-sm text-muted-foreground"
                                  >
                                    <DynamicIcon
                                      name={subpage.icon}
                                      size={14}
                                    />
                                    {subpage.title}
                                  </Pressable>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                        {item.menuType === "products" && (
                          <div className="space-y-4">
                            {productCategories.flatMap((category) =>
                              category.products.map((product) => (
                                <Pressable
                                  key={product.id}
                                  href={product.href}
                                  className="flex items-center gap-2 text-sm text-muted-foreground"
                                >
                                  {product.title}
                                </Pressable>
                              ))
                            )}
                          </div>
                        )}
                        {item.menuType === "resources" && (
                          <div className="space-y-4">
                            {resources.map((resource) => (
                              <Pressable
                                key={resource.id}
                                href={resource.href}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                              >
                                <DynamicIcon name={resource.icon} size={14} />
                                {resource.title}
                              </Pressable>
                            ))}
                          </div>
                        )}
                        {(item.menuType === "global" ||
                          item.menuType === "partners") && (
                          <div className="text-sm text-muted-foreground">
                            <Pressable href="#">
                              View all {item.title.toLowerCase()}
                            </Pressable>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                }

                return (
                  <Pressable
                    key={item.title}
                    href={item.url}
                    className="flex h-15 items-center text-base font-normal text-foreground"
                  >
                    {item.title}
                  </Pressable>
                );
              })}
            </Accordion>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarEnterpriseMega;
