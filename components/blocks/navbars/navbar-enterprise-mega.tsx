"use client";

import * as React from "react";
import { Fragment, useState, useEffect, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon, type DynamicIconName } from "../../ui/dynamic-icon";
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
import { NavbarMobileMenu } from "../../ui/navbar-mobile-menu";
import { NavbarLogo } from "../../ui/navbar-logo";
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

// Import shared mega menu components and their prop types
import {
  SolutionsMenu,
  ProductsMenu,
  ResourcesMenu,
  GlobalMenu,
  PartnersMenu,
  type SolutionsMenuProps,
  type ProductsMenuProps,
  type ResourcesMenuProps,
  type GlobalMenuProps,
  type PartnersMenuProps,
} from "../../ui/navbar-mega-menus";

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
  icon: DynamicIconName;
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
  icon: DynamicIconName;
}

/**
 * Product item with image
 */
export interface IProductItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image?: string;
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
  icon: DynamicIconName;
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
  icon: DynamicIconName;
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
  icon: DynamicIconName;
}

/**
 * Topic item for sidebar
 */
export interface ITopicItem {
  id: string;
  title: string;
  href: string;
  icon: DynamicIconName;
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
  image?: string;
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
  icon: DynamicIconName;
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
  platformTitle?: string;

  // Products layout
  productCategories?: IProductCategory[];

  // Features/Global layout
  featureCategories?: IFeatureCategory[];
  regions?: IRegionItem[];
  locationsTitle?: string;

  // Partners layout
  partnerCards?: IPartnerCard[];

  // Resources layout
  resourceItems?: IResourceItem[];
  resourcesTitle?: string;
  topicGroups?: ITopicGroup[];
}

/**
 * Props for the NavbarEnterpriseMega component
 */
export interface NavbarEnterpriseMegaProps {
  /**
     * Logo configuration
     */
  logo?: LogoConfig;
  /**
     * Navigation menu links with mega menu configurations
     */
  menuLinks?: IMenuLink[];
  /**
     * Action configurations (e.g., login, signup buttons)
     */
  actions?: ActionConfig[];
}

export interface NavbarEnterpriseMegaRuntimeProps {
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
  logo,
  logoSlot,
  menuLinks,
  actions,
  actionsSlot,
  layoutVariant = "fullScreenContainerizedLinks",
  background = "white",
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: NavbarEnterpriseMegaRuntimeProps) => {
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
              <DynamicIcon name={icon} size={16} className="shrink-0" />
              {label}
              <DynamicIcon name={iconAfter} size={16} className="shrink-0" />
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
        id="navbar-enterprise-mega"
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
                    navigationMenuClassName,
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
                <div
                  className={cn("flex items-center gap-3", actionsClassName)}
                >
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

const hasItems = <T,>(items?: T[]) => Array.isArray(items) && items.length > 0;

const hasFeaturedHeroCardContent = (card?: IFeaturedHeroCard) =>
  Boolean(
    card && (card.title || card.subtitle || card.description || card.image),
  );

const hasGenericDropdownContent = (item: IMenuLink) =>
  hasItems(item.links) ||
  Boolean(item.dropdownGroups?.some((group) => hasItems(group.links)));

const hasLayoutSpecificDropdownContent = (item: IMenuLink) => {
  switch (item.layout) {
    case "solutions-with-platform":
      return (
        hasItems(item.solutionCards) ||
        hasItems(item.platformItems) ||
        hasFeaturedHeroCardContent(item.featuredHeroCard)
      );
    case "products-categorized":
      return (
        Boolean(
          item.productCategories?.some((category) =>
            hasItems(category.products),
          ),
        ) || hasFeaturedHeroCardContent(item.featuredHeroCard)
      );
    case "features-with-locations":
      return (
        Boolean(
          item.featureCategories?.some((category) =>
            hasItems(category.features),
          ),
        ) ||
        Boolean(item.regions?.some((region) => hasItems(region.locations))) ||
        hasFeaturedHeroCardContent(item.featuredHeroCard)
      );
    case "partners-promotional":
      return (
        hasItems(item.partnerCards) ||
        hasFeaturedHeroCardContent(item.featuredHeroCard)
      );
    case "resources-with-topics":
      return (
        hasItems(item.resourceItems) ||
        Boolean(
          item.topicGroups?.some((group) => hasItems(group.topics)),
        ) ||
        hasFeaturedHeroCardContent(item.featuredHeroCard)
      );
    default:
      return false;
  }
};

const hasDropdownContent = (item: IMenuLink) =>
  hasLayoutSpecificDropdownContent(item) || hasGenericDropdownContent(item);

const DesktopMenuItem = ({
  item,
  index,
  optixFlowConfig,
}: DesktopMenuItemProps) => {
  const hasDropdown = hasDropdownContent(item);

  if (hasDropdown) {
    return (
      <NavigationMenuItem key={`desktop-menu-item-${index}`} value={`${index}`}>
        <NavigationMenuTrigger className="h-auto bg-transparent px-3 py-2 font-normal hover:bg-muted focus:bg-muted data-[state=open]:bg-muted/50">
          {item.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl! border-0! p-4!">
          {renderDropdownContent(item, optixFlowConfig)}
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
  if (!hasLayoutSpecificDropdownContent(item)) {
    return renderGenericDropdownContent(item, optixFlowConfig);
  }

  switch (item.layout) {
    case "solutions-with-platform":
      return (
        <SolutionsMenu
          solutionCards={item.solutionCards ?? []}
          platformItems={item.platformItems ?? []}
          platformTitle={item.platformTitle}
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
          locationsTitle={item.locationsTitle}
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
          resourcesTitle={item.resourcesTitle}
          topicGroups={item.topicGroups ?? []}
          featuredHeroCard={item.featuredHeroCard}
          optixFlowConfig={optixFlowConfig}
        />
      );
    default:
      return renderGenericDropdownContent(item, optixFlowConfig);
  }
};

const renderGenericDropdownContent = (
  item: IMenuLink,
  optixFlowConfig?: OptixFlowConfig,
) => {
  const links = item.links ?? [];
  const groups = (item.dropdownGroups ?? []).filter((group) =>
    hasItems(group.links),
  );
  const hasLinks = hasItems(links);
  const hasGroups = hasItems(groups);

  if (!hasLinks && !hasGroups) return null;

  const renderGenericLink = (link: ILinkItem, key: React.Key) => {
    const iconName = link.icon ?? link.iconName;
    const label = typeof link.label === "string" ? link.label : "";

    return (
      <NavigationMenuLink
        key={key}
        href={getLinkUrl(link)}
        className="group !flex !w-full min-w-0 items-start gap-3 rounded-lg p-3 text-left hover:bg-muted"
      >
        {link.image ? (
          <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded bg-muted">
            <Img
              src={link.image}
              alt={label}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
              loading="eager"
            />
          </div>
        ) : iconName ? (
          <DynamicIcon
            name={iconName}
            size={18}
            className="mt-0.5 shrink-0"
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="break-words text-sm font-medium">{link.label}</div>
          {link.description && (
            <p className="mt-0.5 break-words text-xs text-muted-foreground">
              {link.description}
            </p>
          )}
        </div>
      </NavigationMenuLink>
    );
  };

  return (
    <div
      className={cn(
        "grid max-w-[calc(100vw-4rem)] gap-6",
        hasLinks && hasGroups
          ? "w-[900px] grid-cols-[minmax(0,1fr)_minmax(220px,0.45fr)]"
          : hasGroups
            ? "w-[780px] grid-cols-1"
            : "w-[420px] grid-cols-1",
      )}
    >
      {hasGroups && (
        <div
          className={cn(
            "grid min-w-0 gap-5",
            !hasLinks && groups.length > 1
              ? "grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
              : "grid-cols-1",
          )}
        >
          {groups.map((group, groupIndex) => (
            <div key={groupIndex} className="min-w-0">
              <div className="mb-3 border-b border-border pb-2 text-left">
                <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  {group.label}
                </strong>
                {group.description && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {group.description}
                  </p>
                )}
              </div>
              <menu className="grid gap-1.5">
                {group.links.map((link, linkIndex) =>
                  renderGenericLink(link, `${groupIndex}-${linkIndex}`),
                )}
              </menu>
            </div>
          ))}
        </div>
      )}

      {hasLinks && (
        <menu className="grid min-w-0 gap-1.5">
          {links.map((link, linkIndex) => renderGenericLink(link, linkIndex))}
        </menu>
      )}
    </div>
  );
};

const renderMobileFeaturedHeroCard = (card?: IFeaturedHeroCard) => {
  if (!hasFeaturedHeroCardContent(card) || !card) return null;

  return (
    <Pressable
      href={card.href}
      className={cn(
        "block rounded-lg p-4 text-sm font-medium text-primary-foreground",
        card.variant === "accent"
          ? "bg-accent text-accent-foreground"
          : "bg-primary",
      )}
    >
      <span>{card.title}</span>
      {card.description && (
        <p className="mt-1 text-xs leading-relaxed opacity-90">
          {card.description}
        </p>
      )}
    </Pressable>
  );
};

const renderMobileDropdownContent = (item: IMenuLink) => {
  if (!hasLayoutSpecificDropdownContent(item)) {
    return renderMobileGenericDropdownContent(item);
  }

  switch (item.layout) {
    case "solutions-with-platform":
      return (
        <div className="flex flex-col space-y-2">
          {renderMobileFeaturedHeroCard(item.featuredHeroCard)}
          {item.platformItems?.map((technology) => (
            <Pressable
              key={technology.id}
              href={technology.href}
              className="flex items-center gap-2 pl-4 text-sm text-muted-foreground"
            >
              <DynamicIcon name={technology.icon} size={14} />
              {technology.title}
            </Pressable>
          ))}
          {item.solutionCards?.map((solution) => (
            <div key={solution.id} className="space-y-2">
              <Pressable
                href={solution.href}
                className="block pt-4 text-sm font-medium"
              >
                {solution.title}
              </Pressable>
              {(solution.subpages ?? []).map((subpage) => (
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
          {renderMobileFeaturedHeroCard(item.featuredHeroCard)}
          {item.productCategories?.flatMap((category) =>
            (category.products ?? []).map((product) => (
              <Pressable
                key={product.id}
                href={product.href}
                className="flex items-center pl-4 gap-2 text-sm text-muted-foreground"
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
          {renderMobileFeaturedHeroCard(item.featuredHeroCard)}
          {item.resourceItems?.map((resource) => (
            <Pressable
              key={resource.id}
              href={resource.href}
              className="flex items-center pl-4 gap-2 text-sm text-muted-foreground"
            >
              <DynamicIcon name={resource.icon} size={14} />
              {resource.title}
            </Pressable>
          ))}
          {item.topicGroups?.map((group) => (
            <div key={group.title} className="space-y-2">
              <div className="pt-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                {group.title}
              </div>
              {group.topics.map((topic) => (
                <Pressable
                  key={topic.id}
                  href={topic.href}
                  className="flex items-center gap-2 pl-4 text-sm text-muted-foreground"
                >
                  <DynamicIcon name={topic.icon} size={14} />
                  {topic.title}
                </Pressable>
              ))}
            </div>
          ))}
        </div>
      );
    case "features-with-locations":
      return (
        <div className="space-y-4">
          {renderMobileFeaturedHeroCard(item.featuredHeroCard)}
          {item.featureCategories?.flatMap((category) =>
            (category.features ?? []).map((feature) => (
              <Pressable
                key={feature.id}
                href={feature.href}
                className="flex items-center gap-2 pl-4 text-sm text-muted-foreground"
              >
                <DynamicIcon name={feature.icon} size={14} />
                {feature.title}
              </Pressable>
            )),
          )}
          {item.regions?.map((region) => (
            <div key={region.title} className="space-y-2">
              <div className="pt-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                {region.title}
              </div>
              {region.locations.map((location) => (
                <Pressable
                  key={location.title}
                  href={location.href}
                  className="flex items-center gap-2 pl-4 text-sm text-muted-foreground"
                >
                  <DynamicIcon name={location.icon} size={14} />
                  {location.title}
                </Pressable>
              ))}
            </div>
          ))}
        </div>
      );
    case "partners-promotional":
      return (
        <div className="space-y-4">
          {renderMobileFeaturedHeroCard(item.featuredHeroCard)}
          {item.partnerCards?.map((card) => (
            <Pressable
              key={card.title}
              href={card.href}
              className="flex items-start gap-2 pl-4 text-sm text-muted-foreground"
            >
              <DynamicIcon name={card.icon} size={14} className="mt-0.5" />
              <span>{card.title}</span>
            </Pressable>
          ))}
        </div>
      );
    default:
      return renderMobileGenericDropdownContent(item);
  }
};

const renderMobileGenericDropdownContent = (item: IMenuLink) => {
  const links = item.links ?? [];
  const groups = (item.dropdownGroups ?? []).filter((group) =>
    hasItems(group.links),
  );

  return (
    <div className="space-y-4">
      {groups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-2">
          <div className="pt-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
            {group.label}
          </div>
          {group.links.map((link, linkIndex) => {
            const iconName = link.icon ?? link.iconName;

            return (
              <Pressable
                key={`${groupIndex}-${linkIndex}`}
                href={getLinkUrl(link)}
                className="flex items-center gap-2 pl-4 text-sm text-muted-foreground"
              >
                {iconName && <DynamicIcon name={iconName} size={14} />}
                {link.label}
              </Pressable>
            );
          })}
        </div>
      ))}
      {links.map((link, linkIndex) => {
        const iconName = link.icon ?? link.iconName;

        return (
          <Pressable
            key={linkIndex}
            href={getLinkUrl(link)}
            className="flex items-center gap-2 pl-4 text-sm text-muted-foreground"
          >
            {iconName && <DynamicIcon name={iconName} size={14} />}
            {link.label}
          </Pressable>
        );
      })}
    </div>
  );
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
              <DynamicIcon name={icon} size={16} className="shrink-0" />
              {label}
              <DynamicIcon name={iconAfter} size={16} className="shrink-0" />
            </>
          )}
        </Pressable>
      );
    });
  }, [actionsSlot, actions]);

  return (
    <NavbarMobileMenu
      open={open}
      onClose={() => setOpen(false)}
      title="Mobile Navigation"
    >
      <div className="max-w-screen-sm mx-auto">
        <Accordion type="multiple" className="w-full">
          {menuLinks.map((item, index) => {
            const hasDropdown = hasDropdownContent(item);

            if (hasDropdown) {
              return (
                <AccordionItem
                  key={
                    typeof item.label === "string" ? item.label : `nav-${index}`
                  }
                  value={`nav-${index}`}
                  className="border-b-0"
                >
                  <AccordionTrigger className="h-15 items-center text-base font-normal text-foreground hover:no-underline">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="overflow-x-none">
                    {renderMobileDropdownContent(item)}
                  </AccordionContent>
                </AccordionItem>
              );
            }

            return (
              <Pressable
                key={
                  typeof item.label === "string" ? item.label : `nav-${index}`
                }
                href={item.href}
                className="flex h-15 items-center text-base font-normal text-foreground"
              >
                {item.label}
              </Pressable>
            );
          })}
        </Accordion>
        <div className={cn("mt-4 flex flex-col gap-4", actionsClassName)}>
          {renderActions}
        </div>
      </div>
    </NavbarMobileMenu>
  );
};

export default NavbarEnterpriseMega;
