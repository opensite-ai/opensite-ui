"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Pressable } from "../../lib/Pressable";
import { DynamicIcon, type DynamicIconName } from "./dynamic-icon";
import { Img } from "@page-speed/img";
import { NavigationMenuLink } from "./navigation-menu";
import type { OptixFlowConfig } from "../../src/types";

/**
 * SHARED NAVBAR MEGA MENU COMPONENTS
 *
 * These components provide reusable menu layouts for all navbar blocks.
 * Instead of duplicating menu logic across navbar-enterprise-mega, navbar-mega-menu, etc.,
 * we centralize the implementations here.
 */

// ==================== TYPE DEFINITIONS ====================

export interface ISubpageItem {
  id: string;
  title: string;
  href: string;
  icon: DynamicIconName;
}

export interface ISolutionCard {
  id: string;
  title: string;
  description: string;
  href: string;
  subpages: ISubpageItem[];
}

export interface ITechnologyItem {
  id: string;
  title: string;
  href: string;
  icon: DynamicIconName;
}

export interface IProductItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface IProductCategory {
  title: string;
  products: IProductItem[];
}

export interface IFeatureItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: DynamicIconName;
}

export interface IFeatureCategory {
  title: string;
  features: IFeatureItem[];
}

export interface ILocationItem {
  title: string;
  href: string;
  icon: DynamicIconName;
}

export interface IRegionItem {
  title: string;
  locations: ILocationItem[];
}

export interface IResourceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: DynamicIconName;
}

export interface ITopicItem {
  id: string;
  title: string;
  href: string;
  icon: DynamicIconName;
}

export interface ITopicGroup {
  title: string;
  topics: ITopicItem[];
}

export interface IFeaturedHeroCard {
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  image: string;
  imagePosition?: "top" | "bottom" | "background";
  variant?: "primary" | "accent";
}

export interface IPartnerCard {
  title: string;
  description: string;
  href: string;
  icon: DynamicIconName;
}

// ==================== SOLUTIONS MENU ====================

export interface SolutionsMenuProps {
  solutionCards: ISolutionCard[];
  platformItems: ITechnologyItem[];
  platformTitle?: string;
  featuredHeroCard?: IFeaturedHeroCard;
  optixFlowConfig?: OptixFlowConfig;
}

export const SolutionsMenu = ({
  solutionCards,
  platformItems,
  platformTitle = "Platform",
  featuredHeroCard,
  optixFlowConfig,
}: SolutionsMenuProps) => {
  const featuredCard = featuredHeroCard ? (
    <Pressable
      href={featuredHeroCard.href}
      className={cn(
        "group flex h-full min-h-[420px] flex-col overflow-hidden rounded-lg text-primary-foreground",
        featuredHeroCard.variant === "accent"
          ? "bg-accent text-accent-foreground"
          : "bg-primary",
      )}
    >
      <div className="flex shrink-0 flex-col justify-between p-5">
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
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <Img
          src={featuredHeroCard.image}
          alt={featuredHeroCard.title}
          className="h-full w-full object-cover"
          optixFlowConfig={optixFlowConfig}
          loading="eager"
        />
      </div>
    </Pressable>
  ) : null;

  const platformSection =
    platformItems.length > 0 ? (
      <div className="min-w-0">
        <div className="mb-3 text-left">
          <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            {platformTitle}
          </strong>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {platformItems.map((technology) => (
            <NavigationMenuLink
              key={technology.id}
              href={technology.href}
              className="group !flex !w-full min-w-0 items-center gap-2 rounded-lg p-2 hover:bg-muted"
            >
              <DynamicIcon
                name={technology.icon}
                size={16}
                className="shrink-0"
              />
              <div className="min-w-0 flex-1 text-sm font-medium">
                {technology.title}
              </div>
            </NavigationMenuLink>
          ))}
        </div>
      </div>
    ) : null;

  const solutionSection =
    solutionCards.length > 0 ? (
      <div className="grid grid-cols-2 gap-3">
        {solutionCards.map((solution) => (
          <div
            key={solution.id}
            className="flex min-w-0 flex-col rounded-lg border border-border p-4"
          >
            <div className="border-b border-border pb-3">
              <Pressable
                href={solution.href}
                className="group flex min-w-0 flex-col text-left"
              >
                <div className="flex min-w-0 items-center gap-1">
                  <strong className="min-w-0 break-words text-sm font-medium">
                    {solution.title}
                  </strong>
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={14}
                    className="shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </div>
                <p className="mt-1 break-words text-xs text-muted-foreground">
                  {solution.description}
                </p>
              </Pressable>
            </div>
            <menu className="mt-3 grid gap-2">
              {solution.subpages.map((subpage) => (
                <NavigationMenuLink
                  key={subpage.id}
                  href={subpage.href}
                  className="group !flex !w-full min-w-0 items-center gap-2 rounded-lg p-2 text-left hover:bg-muted"
                >
                  <DynamicIcon
                    name={subpage.icon}
                    size={14}
                    className="shrink-0"
                  />
                  <div className="min-w-0 flex-1 break-words text-sm font-medium">
                    {subpage.title}
                  </div>
                </NavigationMenuLink>
              ))}
            </menu>
          </div>
        ))}
      </div>
    ) : null;

  if (featuredCard) {
    return (
      <div className="grid w-[1200px] max-w-[calc(100vw-4rem)] grid-cols-[minmax(380px,1fr)_minmax(360px,0.95fr)] gap-4">
        <div className="min-w-0">{featuredCard}</div>
        <div className="flex min-w-0 flex-col gap-4">
          {platformSection}
          {solutionSection}
        </div>
      </div>
    );
  }

  return (
    <div className="grid w-[1200px] max-w-[calc(100vw-4rem)] grid-cols-2 gap-4">
      {platformSection}
      {solutionCards.length > 0 && (
        <div className="col-span-2 grid grid-cols-4 gap-3">
          {solutionCards.map((solution) => (
            <div
              key={solution.id}
              className="flex min-w-0 flex-col rounded-lg border border-border p-4"
            >
              <div className="border-b border-border pb-3">
                <Pressable
                  href={solution.href}
                  className="group flex min-w-0 flex-col text-left"
                >
                  <div className="flex min-w-0 items-center gap-1">
                    <strong className="min-w-0 break-words text-sm font-medium">
                      {solution.title}
                    </strong>
                    <DynamicIcon
                      name="lucide/arrow-right"
                      size={14}
                      className="shrink-0 transition-transform group-hover:translate-x-1"
                    />
                  </div>
                  <p className="mt-1 break-words text-xs text-muted-foreground">
                    {solution.description}
                  </p>
                </Pressable>
              </div>
              <menu className="mt-3 grid gap-2">
                {solution.subpages.map((subpage) => (
                  <NavigationMenuLink
                    key={subpage.id}
                    href={subpage.href}
                    className="group !flex !w-full min-w-0 items-center gap-2 rounded-lg p-2 text-left hover:bg-muted"
                  >
                    <DynamicIcon
                      name={subpage.icon}
                      size={14}
                      className="shrink-0"
                    />
                    <div className="min-w-0 flex-1 break-words text-sm font-medium">
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
};

// ==================== PRODUCTS MENU ====================

export interface ProductsMenuProps {
  productCategories: IProductCategory[];
  featuredHeroCard?: IFeaturedHeroCard;
  optixFlowConfig?: OptixFlowConfig;
}

export const ProductsMenu = ({
  productCategories,
  featuredHeroCard,
  optixFlowConfig,
}: ProductsMenuProps) => (
  <div className="grid w-[1100px] grid-cols-[320px_1fr] gap-6">
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
              loading="eager"
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
                  className="group col-span-1 !flex !w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-muted"
                >
                  <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded">
                    <Img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover"
                      optixFlowConfig={optixFlowConfig}
                      loading="eager"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{product.title}</div>
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

// ==================== RESOURCES MENU ====================

export interface ResourcesMenuProps {
  resourceItems: IResourceItem[];
  resourcesTitle?: string;
  topicGroups: ITopicGroup[];
  featuredHeroCard?: IFeaturedHeroCard;
}

export const ResourcesMenu = ({
  resourceItems,
  resourcesTitle = "Resources",
  topicGroups,
  featuredHeroCard,
}: ResourcesMenuProps) => (
  <div className="grid w-[1100px] grid-cols-[280px_1fr_220px] gap-6">
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
              loading="eager"
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
            <p className="mt-2 text-sm leading-relaxed">
              {featuredHeroCard.description}
            </p>
          </div>
        </Pressable>
      </div>
    )}

    {resourceItems.length > 0 && (
      <div className="col-span-1">
        <div className="mb-3 text-left">
          <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            {resourcesTitle}
          </strong>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {resourceItems.map((resource) => (
            <NavigationMenuLink
              key={resource.id}
              href={resource.href}
              className="group col-span-1 !flex !w-full items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted"
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
                  className="group !flex !w-full items-center gap-2 rounded-lg p-2 hover:bg-muted"
                >
                  <DynamicIcon
                    name={topic.icon}
                    size={14}
                    className="shrink-0"
                  />
                  <span className="min-w-0 flex-1 text-sm font-medium">
                    {topic.title}
                  </span>
                </NavigationMenuLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ==================== GLOBAL/FEATURES MENU ====================

export interface GlobalMenuProps {
  featureCategories: IFeatureCategory[];
  regions: IRegionItem[];
  locationsTitle?: string;
  featuredHeroCard?: IFeaturedHeroCard;
  optixFlowConfig?: OptixFlowConfig;
}

export const GlobalMenu = ({
  featureCategories,
  regions,
  locationsTitle = "Locations",
  featuredHeroCard,
  optixFlowConfig,
}: GlobalMenuProps) => (
  <div className="w-[1100px]">
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
                loading="eager"
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
                    className="group col-span-1 !flex !w-full items-center gap-2 rounded-lg p-2 text-left hover:bg-muted"
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center">
                      <DynamicIcon name={feature.icon} size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium">{feature.title}</div>
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
            {locationsTitle}
          </strong>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {regions.map((region) => (
            <div
              key={region.title}
              className="col-span-1 flex w-full flex-col gap-3"
            >
              <div className="text-left text-xs font-medium text-muted-foreground">
                {region.title}
              </div>
              <menu className="grid gap-1.5">
                {region.locations.map((location) => (
                  <NavigationMenuLink
                    key={location.title}
                    href={location.href}
                    className="group !flex !w-full items-center gap-2 rounded-lg p-2 text-left hover:bg-muted"
                  >
                    <div className="flex size-4 shrink-0 items-center justify-center">
                      <DynamicIcon
                        name={location.icon}
                        size={16}
                        className="shrink-0"
                      />
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

// ==================== PARTNERS MENU ====================

export interface PartnersMenuProps {
  partnerCards: IPartnerCard[];
  featuredHeroCard?: IFeaturedHeroCard;
  optixFlowConfig?: OptixFlowConfig;
}

export const PartnersMenu = ({
  partnerCards,
  featuredHeroCard,
  optixFlowConfig,
}: PartnersMenuProps) => (
  <div className="grid w-[1000px] grid-cols-[2fr_1fr] gap-6">
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
                featuredHeroCard.imagePosition === "background" && "invert",
              )}
              optixFlowConfig={optixFlowConfig}
              loading="eager"
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
            <p className="mt-2 text-sm leading-relaxed">
              {featuredHeroCard.description}
            </p>
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
            className="group !flex !w-full items-start gap-3 rounded-lg border border-border p-4 hover:bg-muted"
          >
            <DynamicIcon name={card.icon} size={28} className="shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold">{card.title}</div>
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
