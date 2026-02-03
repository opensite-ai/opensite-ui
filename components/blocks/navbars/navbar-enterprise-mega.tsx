"use client";

import * as React from "react";
import { Fragment, useState, useEffect, useMemo } from "react";
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
import { NavbarLogo } from "../../ui/navbar-logo";
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

// Import shared types from the centralized types file
import {
  type LogoConfig,
  type ILinkItem,
  type IMenuLinkGroup,
  type NavbarLayoutVariant,
  getLinkUrl,
} from "./types";
import { getNavbarLayoutClasses } from "./layout-variant-utils";

// Re-export shared types for backward compatibility
export type { LogoConfig, ILinkItem, IMenuLinkGroup };
export { getLinkUrl };

/**
 * SPECIALIZED TYPE INTERFACES FOR ENTERPRISE MEGA MENU
 * These extend the base types for specific layout requirements
 */

/**
 * Subpage item for solution cards
 */
export interface ISubpageItem {
  id: string;
  title: string;
  href: string;
  icon: string;
}

/**
 * Solution card with bordered layout and subpages
 */
export interface ISolutionCard {
  id: string;
  title: string;
  description: string;
  href: string;
  subpages: ISubpageItem[];
}

/**
 * Technology/platform item for developer platform section
 */
export interface ITechnologyItem {
  id: string;
  title: string;
  href: string;
  icon: string;
}

/**
 * Product item with image
 */
export interface IProductItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

/**
 * Product category grouping
 */
export interface IProductCategory {
  title: string;
  products: IProductItem[];
}

/**
 * Feature item with icon
 */
export interface IFeatureItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

/**
 * Feature category grouping
 */
export interface IFeatureCategory {
  title: string;
  features: IFeatureItem[];
}

/**
 * Location item for location grids
 */
export interface ILocationItem {
  title: string;
  href: string;
  icon: string;
}

/**
 * Region grouping for locations
 */
export interface IRegionItem {
  title: string;
  locations: ILocationItem[];
}

/**
 * Resource card item
 */
export interface IResourceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}

/**
 * Topic item for sidebar
 */
export interface ITopicItem {
  id: string;
  title: string;
  href: string;
  icon: string;
}

/**
 * Topic group for sidebar sections
 */
export interface ITopicGroup {
  title: string;
  topics: ITopicItem[];
}

/**
 * Featured hero card configuration
 */
export interface IFeaturedHeroCard {
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  image: string;
  imagePosition?: "top" | "bottom" | "background";
  variant?: "primary" | "accent";
}

/**
 * Partner card configuration
 */
export interface IPartnerCard {
  title: string;
  description: string;
  href: string;
  icon: string;
}

/**
 * Mega menu layout types
 *
 * LAYOUT OPTIONS FOR AI PAGE BUILDER:
 *
 * 1. "solutions-with-platform"
 *    - Visual: Left column shows solution cards with expandable subpages, right column shows platform technologies and featured hero card
 *    - Behavior: Solution cards expand to show subpages on hover
 *    - Best for: Enterprise solutions with multiple sub-offerings and technology stack showcase
 *    - Required data: solutionCards[] with title, description, href, subpages[]
 *                     platformItems[] with title, icon, description
 *                     featuredHeroCard (optional) with title, description, href, image
 *    - Example use case: "Solutions" menu showing Enterprise, SMB, Startup solutions with React/Node/Python tech stack
 *
 * 2. "products-categorized"
 *    - Visual: Left column shows product categories with nested products, right column shows featured hero card
 *    - Behavior: Categories organize products hierarchically
 *    - Best for: Large product catalogs organized by category
 *    - Required data: productCategories[] with title and products[] (each with title, href, description, image)
 *                     featuredHeroCard (optional)
 *    - Example use case: "Products" menu with categories like Analytics, Marketing, Sales
 *
 * 3. "features-with-locations"
 *    - Visual: Left column shows feature categories with nested features, right column shows geographic regions and featured hero card
 *    - Behavior: Features organized by category, regions shown as list
 *    - Best for: Global companies showcasing features and regional presence
 *    - Required data: featureCategories[] with title and features[] (each with title, href, description, icon)
 *                     regions[] with name, href, flag (optional)
 *                     featuredHeroCard (optional)
 *    - Example use case: "Company" menu showing features by category and office locations
 *
 * 4. "partners-promotional"
 *    - Visual: Grid of partner cards with logos and descriptions, plus featured hero card
 *    - Behavior: Partner cards in 2-column grid with hover effects
 *    - Best for: Partner/integration showcases with promotional content
 *    - Required data: partnerCards[] with title, description, href, logo, badge (optional)
 *                     featuredHeroCard (optional)
 *    - Example use case: "Partners" menu showing integration partners and partner program
 *
 * 5. "resources-with-topics"
 *    - Visual: Left column shows resource items, right column shows topic groups and featured hero card
 *    - Behavior: Resources as cards, topics organized in groups
 *    - Best for: Learning resources, documentation, and content hubs
 *    - Required data: resourceItems[] with title, description, href, icon
 *                     topicGroups[] with title and topics[] (each with title, href, icon)
 *                     featuredHeroCard (optional)
 *    - Example use case: "Resources" menu with docs, guides, blog, organized by learning topics
 */
export type MegaMenuLayout =
  | "solutions-with-platform"
  | "products-categorized"
  | "features-with-locations"
  | "partners-promotional"
  | "resources-with-topics";

/**
 * Menu link interface for enterprise mega menu
 */
export interface IMenuLink {
  label: React.ReactNode;
  href?: string;
  layout?: MegaMenuLayout;

  // Unified links array - used by simpler layouts
  links?: ILinkItem[];
  // Optional grouped links for more complex layouts
  dropdownGroups?: IMenuLinkGroup[];

  // Featured hero card (used in most layouts)
  featuredHeroCard?: IFeaturedHeroCard;

  // Solutions layout
  solutionCards?: ISolutionCard[];
  platformItems?: ITechnologyItem[];

  // Products layout
  productCategories?: IProductCategory[];

  // Features/Global layout
  featureCategories?: IFeatureCategory[];
  regions?: IRegionItem[];

  // Partners layout
  partnerCards?: IPartnerCard[];

  // Resources layout
  resourceItems?: IResourceItem[];
  topicGroups?: ITopicGroup[];
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
   * Navigation menu links with mega menu configurations
   */
  menuLinks?: IMenuLink[];
  /**
   * Action configurations (e.g., login, signup buttons)
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
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
  },
  logoSlot,
  menuLinks,
  actions,
  actionsSlot,
  layoutVariant = "fullScreenContainerizedLinks",
  background,
  spacing,
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

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
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
  }, [actionsSlot, actions]);

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
    <Fragment>
      <Section
        background={background}
        spacing={spacingOverride ?? spacing}
        className={cn(
          "pointer-events-auto fixed top-0 z-999 flex w-full items-center justify-center",
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
                  "flex h-16 items-center justify-between gap-8",
                  navClassName,
                )}
              >
                <NavbarLogo
                  logo={logo}
                  logoSlot={logoSlot}
                  logoClassName={logoClassName}
                  optixFlowConfig={optixFlowConfig}
                />
                <NavigationMenu
              className={cn(
                "hidden lg:flex [&>div:last-child]:left-1/2 [&>div:last-child]:-translate-x-1/2",
                navigationMenuClassName
              )}
              viewport={true}
            >
              <NavigationMenuList>
                {menuLinks?.map((item, index) => (
                  <DesktopMenuItem
                    key={`desktop-link-${index}`}
                    item={item}
                    index={index}
                    optixFlowConfig={optixFlowConfig}
                  />
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <div className={cn("flex items-center gap-3", actionsClassName)}>
              <div className="hidden lg:flex lg:items-center lg:gap-3">
                {renderActions}
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
          </nav>
            </div>
          </div>
        </div>
      </Section>
      <MobileNavigationMenu
        open={open}
        setOpen={setOpen}
        menuLinks={menuLinks ?? []}
        actionsClassName={actionsClassName}
        actions={actions}
        actionsSlot={actionsSlot}
        optixFlowConfig={optixFlowConfig}
      />
    </Fragment>
  );
};

interface DesktopMenuItemProps {
  item: IMenuLink;
  index: number;
  optixFlowConfig?: OptixFlowConfig;
}

const DesktopMenuItem = ({
  item,
  index,
  optixFlowConfig,
}: DesktopMenuItemProps) => {
  const hasDropdown = Boolean(item.layout);
  const effectiveLayout = item.layout || "solutions-with-platform";

  if (hasDropdown) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
        <NavigationMenuTrigger className="h-auto bg-transparent px-3 py-2 font-normal hover:bg-muted focus:bg-muted data-[state=open]:bg-muted/50">
          {item.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="!rounded-xl !border-0">
          <div className="w-full max-w-6xl p-6">
            {renderDropdownContent(
              { ...item, layout: effectiveLayout },
              optixFlowConfig,
            )}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
      <NavigationMenuLink
        href={item.href}
        className="h-auto bg-transparent px-3 py-2 font-normal hover:bg-muted focus:bg-muted"
      >
        {item.label}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderDropdownContent = (
  item: IMenuLink,
  optixFlowConfig?: OptixFlowConfig,
) => {
  switch (item.layout) {
    case "solutions-with-platform":
      return (
        <SolutionsMenu
          solutionCards={item.solutionCards ?? []}
          platformItems={item.platformItems ?? []}
          featuredHeroCard={item.featuredHeroCard}
          optixFlowConfig={optixFlowConfig}
        />
      );
    case "products-categorized":
      return (
        <ProductsMenu
          productCategories={item.productCategories ?? []}
          featuredHeroCard={item.featuredHeroCard}
          optixFlowConfig={optixFlowConfig}
        />
      );
    case "features-with-locations":
      return (
        <GlobalMenu
          featureCategories={item.featureCategories ?? []}
          regions={item.regions ?? []}
          featuredHeroCard={item.featuredHeroCard}
          optixFlowConfig={optixFlowConfig}
        />
      );
    case "partners-promotional":
      return (
        <PartnersMenu
          partnerCards={item.partnerCards ?? []}
          featuredHeroCard={item.featuredHeroCard}
          optixFlowConfig={optixFlowConfig}
        />
      );
    case "resources-with-topics":
      return (
        <ResourcesMenu
          resourceItems={item.resourceItems ?? []}
          topicGroups={item.topicGroups ?? []}
          featuredHeroCard={item.featuredHeroCard}
        />
      );
    default:
      return null;
  }
};

interface SolutionsMenuProps {
  solutionCards: ISolutionCard[];
  platformItems: ITechnologyItem[];
  featuredHeroCard?: IFeaturedHeroCard;
  optixFlowConfig?: OptixFlowConfig;
}

const SolutionsMenu = ({
  solutionCards,
  platformItems,
  featuredHeroCard,
  optixFlowConfig,
}: SolutionsMenuProps) => (
  <div className="grid grid-cols-2 gap-4">
    {featuredHeroCard && (
      <div className="col-span-1">
        <Pressable
          href={featuredHeroCard.href}
          className={cn(
            "group flex h-full flex-col overflow-hidden rounded-lg text-primary-foreground",
            featuredHeroCard.variant === "accent"
              ? "bg-accent text-accent-foreground"
              : "bg-primary",
          )}
        >
          <div className="flex flex-1 flex-col justify-between p-5">
            {featuredHeroCard.subtitle && (
              <span className="mb-2 text-xs font-medium tracking-wider uppercase">
                {featuredHeroCard.subtitle}
              </span>
            )}
            <div>
              <div className="flex items-center gap-1.5 text-base font-semibold">
                {featuredHeroCard.title}
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
                {featuredHeroCard.description}
              </p>
            </div>
          </div>
          <div className="relative aspect-video w-full overflow-hidden">
            <Img
              src={featuredHeroCard.image}
              alt={featuredHeroCard.title}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </Pressable>
      </div>
    )}

    {platformItems.length > 0 && (
      <div className="col-span-1">
        <div className="mb-3 text-left">
          <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Developer Platform
          </strong>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {platformItems.map((technology) => (
            <NavigationMenuLink
              key={technology.id}
              href={technology.href}
              className="group flex items-center gap-2 rounded-lg p-2 hover:bg-muted"
            >
              <DynamicIcon name={technology.icon} size={16} className="shrink-0" />
              <div className="min-w-0 flex-1 text-sm font-medium">
                {technology.title}
              </div>
            </NavigationMenuLink>
          ))}
        </div>
      </div>
    )}

    {solutionCards.length > 0 && (
      <div className="col-span-2 mt-2 grid grid-cols-4 gap-3">
        {solutionCards.map((solution) => (
          <div
            key={solution.id}
            className="col-span-1 flex flex-col rounded-lg border border-border p-4"
          >
            <div className="border-b border-border pb-3">
              <Pressable
                href={solution.href}
                className="group flex flex-col text-left"
              >
                <div className="flex items-center gap-1">
                  <strong className="text-sm font-medium">
                    {solution.title}
                  </strong>
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={14}
                    className="shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {solution.description}
                </p>
              </Pressable>
            </div>
            <menu className="mt-3 grid gap-2">
              {solution.subpages.map((subpage) => (
                <NavigationMenuLink
                  key={subpage.id}
                  href={subpage.href}
                  className="group flex items-center gap-2 rounded-lg p-2 text-left hover:bg-muted"
                >
                  <DynamicIcon name={subpage.icon} size={14} className="shrink-0" />
                  <div className="min-w-0 flex-1 text-sm font-medium">
                    {subpage.title}
                  </div>
                </NavigationMenuLink>
              ))}
            </menu>
          </div>
        ))}
      </div>
    )}
  </div>
);

interface ProductsMenuProps {
  productCategories: IProductCategory[];
  featuredHeroCard?: IFeaturedHeroCard;
  optixFlowConfig?: OptixFlowConfig;
}

const ProductsMenu = ({
  productCategories,
  featuredHeroCard,
  optixFlowConfig,
}: ProductsMenuProps) => (
  <div className="grid grid-cols-[320px_1fr] gap-6">
    {featuredHeroCard && (
      <div className="col-span-1">
        <Pressable
          href={featuredHeroCard.href}
          className={cn(
            "group flex h-full flex-col overflow-hidden rounded-lg text-primary-foreground",
            featuredHeroCard.variant === "accent"
              ? "bg-accent text-accent-foreground"
              : "bg-primary",
          )}
        >
          <div className="relative aspect-video w-full overflow-hidden">
            <Img
              src={featuredHeroCard.image}
              alt={featuredHeroCard.title}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
          <div className="flex flex-col p-5">
            <div className="flex items-center gap-1.5 text-base font-semibold">
              {featuredHeroCard.title}
              <DynamicIcon
                name="lucide/arrow-right"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
              {featuredHeroCard.description}
            </p>
          </div>
        </Pressable>
      </div>
    )}

    {productCategories.length > 0 && (
      <div className="col-span-1 flex flex-col gap-6">
        {productCategories.map((category) => (
          <div key={category.title} className="flex flex-col gap-3">
            <div className="border-b border-border pb-2 text-left">
              <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                {category.title}
              </strong>
            </div>
            <menu className="grid grid-cols-3 gap-3">
              {category.products.map((product) => (
                <NavigationMenuLink
                  key={product.id}
                  href={product.href}
                  className="group col-span-1 flex items-center gap-3 rounded-lg p-3 text-left hover:bg-muted"
                >
                  <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded">
                    <Img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">
                      {product.title}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {product.description}
                    </p>
                  </div>
                </NavigationMenuLink>
              ))}
            </menu>
          </div>
        ))}
      </div>
    )}
  </div>
);

interface GlobalMenuProps {
  featureCategories: IFeatureCategory[];
  regions: IRegionItem[];
  featuredHeroCard?: IFeaturedHeroCard;
  optixFlowConfig?: OptixFlowConfig;
}

const GlobalMenu = ({
  featureCategories,
  regions,
  featuredHeroCard,
  optixFlowConfig,
}: GlobalMenuProps) => (
  <div>
    <div className="grid grid-cols-[280px_1fr] gap-6">
      {featuredHeroCard && (
        <div className="col-span-1">
          <Pressable
            href={featuredHeroCard.href}
            className={cn(
              "group flex h-full flex-col overflow-hidden rounded-lg text-primary-foreground",
              featuredHeroCard.variant === "accent"
                ? "bg-accent text-accent-foreground"
                : "bg-primary",
            )}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Img
                src={featuredHeroCard.image}
                alt={featuredHeroCard.title}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
            <div className="flex flex-col p-5">
              <div className="flex items-center gap-1.5 text-base font-semibold">
                {featuredHeroCard.title}
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/85">
                {featuredHeroCard.description}
              </p>
            </div>
          </Pressable>
        </div>
      )}

      {featureCategories.length > 0 && (
        <div className="col-span-1 flex flex-col gap-6">
          {featureCategories.map((category) => (
            <div key={category.title} className="flex flex-col gap-3">
              <div className="border-b border-border pb-2 text-left">
                <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  {category.title}
                </strong>
              </div>
              <menu className="grid grid-cols-3 gap-3">
                {category.features.map((feature) => (
                  <NavigationMenuLink
                    key={feature.id}
                    href={feature.href}
                    className="group col-span-1 flex items-center gap-2 rounded-lg p-2 text-left hover:bg-muted"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center">
                      <DynamicIcon name={feature.icon} size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium">
                        {feature.title}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </NavigationMenuLink>
                ))}
              </menu>
            </div>
          ))}
        </div>
      )}
    </div>

    {regions.length > 0 && (
      <div className="mt-6">
        <div className="mb-3 border-b border-border pb-2 text-left">
          <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Popular Locations
          </strong>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {regions.map((region) => (
            <div
              key={region.title}
              className="col-span-1 flex flex-col gap-3"
            >
              <div className="text-left text-xs font-medium text-muted-foreground">
                {region.title}
              </div>
              <menu className="grid gap-1.5">
                {region.locations.map((location) => (
                  <NavigationMenuLink
                    key={location.title}
                    href={location.href}
                    className="group flex items-center gap-2 rounded-lg p-2 text-left hover:bg-muted"
                  >
                    <div className="flex size-4 shrink-0 items-center justify-center">
                      {location.icon}
                    </div>
                    <div className="min-w-0 flex-1 text-sm font-medium">
                      {location.title}
                    </div>
                  </NavigationMenuLink>
                ))}
              </menu>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

interface PartnersMenuProps {
  partnerCards: IPartnerCard[];
  featuredHeroCard?: IFeaturedHeroCard;
  optixFlowConfig?: OptixFlowConfig;
}

const PartnersMenu = ({
  partnerCards,
  featuredHeroCard,
  optixFlowConfig,
}: PartnersMenuProps) => (
  <div className="grid grid-cols-[2fr_1fr] gap-6">
    {featuredHeroCard && (
      <div className="col-span-1">
        <Pressable
          href={featuredHeroCard.href}
          className={cn(
            "group flex h-full flex-col overflow-hidden rounded-lg text-primary-foreground",
            featuredHeroCard.variant === "accent"
              ? "bg-accent text-accent-foreground"
              : "bg-primary",
          )}
        >
          <div className="relative aspect-video w-full overflow-hidden">
            <Img
              src={featuredHeroCard.image}
              alt={featuredHeroCard.title}
              className={cn(
                "h-full w-full object-cover",
                featuredHeroCard.imagePosition === "background" && "invert"
              )}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
          <div className="flex flex-col p-5">
            <div className="flex items-center gap-1.5 text-base font-semibold">
              {featuredHeroCard.title}
              <DynamicIcon
                name="lucide/arrow-right"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
            <p className="mt-2 text-sm leading-relaxed">{featuredHeroCard.description}</p>
          </div>
        </Pressable>
      </div>
    )}

    {partnerCards.length > 0 && (
      <div className="col-span-1 flex flex-col gap-3">
        {partnerCards.map((card) => (
          <NavigationMenuLink
            key={card.title}
            href={card.href}
            className="group flex items-start gap-3 rounded-lg border border-border p-4 hover:bg-muted"
          >
            <DynamicIcon name={card.icon} size={28} className="shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold">
                {card.title}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {card.description}
              </p>
            </div>
          </NavigationMenuLink>
        ))}
      </div>
    )}
  </div>
);

interface ResourcesMenuProps {
  resourceItems: IResourceItem[];
  topicGroups: ITopicGroup[];
  featuredHeroCard?: IFeaturedHeroCard;
}

const ResourcesMenu = ({
  resourceItems,
  topicGroups,
  featuredHeroCard,
}: ResourcesMenuProps) => (
  <div className="grid grid-cols-[280px_1fr_220px] gap-6">
    {featuredHeroCard && (
      <div className="col-span-1">
        <Pressable
          href={featuredHeroCard.href}
          className={cn(
            "group flex h-full flex-col overflow-hidden rounded-lg text-primary-foreground",
            featuredHeroCard.variant === "accent"
              ? "bg-accent text-accent-foreground"
              : "bg-primary",
          )}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Img
              src={featuredHeroCard.image}
              alt={featuredHeroCard.title}
              className="h-full w-full object-cover invert"
            />
          </div>
          <div className="flex flex-col p-5">
            <div className="flex items-center gap-1.5 text-base font-semibold">
              {featuredHeroCard.title}
              <DynamicIcon
                name="lucide/arrow-right"
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </div>
            <p className="mt-2 text-sm leading-relaxed">{featuredHeroCard.description}</p>
          </div>
        </Pressable>
      </div>
    )}

    {resourceItems.length > 0 && (
      <div className="col-span-1">
        <div className="mb-3 text-left">
          <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Resources
          </strong>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {resourceItems.map((resource) => (
            <NavigationMenuLink
              key={resource.id}
              href={resource.href}
              className="group col-span-1 flex items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted"
            >
              <DynamicIcon
                name={resource.icon}
                size={18}
                className="mt-0.5 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{resource.title}</div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {resource.description}
                </p>
              </div>
            </NavigationMenuLink>
          ))}
        </div>
      </div>
    )}

    {topicGroups.length > 0 && (
      <div className="col-span-1">
        {topicGroups.map((group) => (
          <div key={group.title} className="mb-5 last:mb-0">
            <div className="mb-3 text-left">
              <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                {group.title}
              </strong>
            </div>
            <div className="space-y-1.5">
              {group.topics.map((topic) => (
                <NavigationMenuLink
                  key={topic.id}
                  href={topic.href}
                  className="group flex items-center gap-2 rounded-lg p-2 hover:bg-muted"
                >
                  <DynamicIcon name={topic.icon} size={14} className="shrink-0" />
                  <span className="min-w-0 flex-1 text-sm font-medium">{topic.title}</span>
                </NavigationMenuLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const renderMobileDropdownContent = (item: IMenuLink) => {
  switch (item.layout) {
    case "solutions-with-platform":
      return (
        <div className="space-y-4">
          {item.solutionCards?.map((solution) => (
            <div key={solution.id} className="space-y-2">
              <Pressable href={solution.href} className="text-sm font-medium">
                {solution.title}
              </Pressable>
              {solution.subpages.map((subpage) => (
                <Pressable
                  key={subpage.id}
                  href={subpage.href}
                  className="flex items-center gap-2 pl-4 text-sm text-muted-foreground"
                >
                  <DynamicIcon name={subpage.icon} size={14} />
                  {subpage.title}
                </Pressable>
              ))}
            </div>
          ))}
        </div>
      );
    case "products-categorized":
      return (
        <div className="space-y-4">
          {item.productCategories?.flatMap((category) =>
            category.products.map((product) => (
              <Pressable
                key={product.id}
                href={product.href}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                {product.title}
              </Pressable>
            )),
          )}
        </div>
      );
    case "resources-with-topics":
      return (
        <div className="space-y-4">
          {item.resourceItems?.map((resource) => (
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
      );
    case "features-with-locations":
    case "partners-promotional":
      return (
        <div className="text-sm text-muted-foreground">
          <Pressable href="#">
            View all{" "}
            {typeof item.label === "string"
              ? item.label.toLowerCase()
              : "items"}
          </Pressable>
        </div>
      );
    default:
      return null;
  }
};

interface MobileNavigationMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  menuLinks: IMenuLink[];
  actionsClassName?: string;
  actions?: ActionConfig[];
  actionsSlot?: React.ReactNode;
  optixFlowConfig?: OptixFlowConfig;
}

const MobileNavigationMenu = ({
  open,
  setOpen,
  menuLinks,
  actionsClassName,
  actions,
  actionsSlot,
  optixFlowConfig,
}: MobileNavigationMenuProps) => {
  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const {
        label,
        icon,
        iconAfter,
        children,
        className: actionClassName,
        ...pressableProps
      } = action;
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
  }, [actionsSlot, actions]);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        aria-describedby={undefined}
        side="top"
        className="inset-0 z-998 h-dvh w-full bg-background pt-16"
      >
        <div className="h-full overflow-y-auto pt-4 pb-20">
          <div className="container">
            <div className="absolute -m-px h-px w-px overflow-hidden border-0 mask-clip-border p-0 text-nowrap whitespace-nowrap">
              <SheetTitle className="text-primary">
                Mobile Navigation
              </SheetTitle>
            </div>
            <div className={cn("flex flex-col gap-4", actionsClassName)}>
              {renderActions}
            </div>
            <Accordion type="multiple" className="mt-6 w-full">
              {menuLinks.map((item, index) => {
                const hasDropdown = Boolean(item.layout);

                if (hasDropdown) {
                  return (
                    <AccordionItem
                      key={
                        typeof item.label === "string"
                          ? item.label
                          : `nav-${index}`
                      }
                      value={`nav-${index}`}
                      className="border-b-0"
                    >
                      <AccordionTrigger className="h-15 items-center text-base font-normal text-foreground hover:no-underline">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="max-h-[60dvh] overflow-y-auto">
                        {renderMobileDropdownContent(item)}
                      </AccordionContent>
                    </AccordionItem>
                  );
                }

                return (
                  <Pressable
                    key={
                      typeof item.label === "string"
                        ? item.label
                        : `nav-${index}`
                    }
                    href={item.href}
                    className="flex h-15 items-center text-base font-normal text-foreground"
                  >
                    {item.label}
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
