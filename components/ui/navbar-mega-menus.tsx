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
  image?: string;
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
  image?: string;
  imagePosition?: "top" | "bottom" | "background";
  variant?: "primary" | "accent";
}

export interface IPartnerCard {
  title: string;
  description: string;
  href: string;
  icon: DynamicIconName;
}

const PANEL_MAX_WIDTH_CLASS = "max-w-[calc(100vw-4rem)]";

const hasItems = <T,>(items?: T[]) => Array.isArray(items) && items.length > 0;

const hasFeaturedHeroCardContent = (card?: IFeaturedHeroCard) =>
  Boolean(
    card &&
      (card.title || card.subtitle || card.description || card.image),
  );

interface FeaturedHeroCardPanelProps {
  card: IFeaturedHeroCard;
  optixFlowConfig?: OptixFlowConfig;
  className?: string;
  contentClassName?: string;
  imageContainerClassName?: string;
  imageClassName?: string;
  contentFirst?: boolean;
}

const FeaturedHeroCardPanel = ({
  card,
  optixFlowConfig,
  className,
  contentClassName,
  imageContainerClassName = "relative aspect-video w-full overflow-hidden",
  imageClassName,
  contentFirst,
}: FeaturedHeroCardPanelProps) => {
  const image = card.image ? (
    <div className={imageContainerClassName}>
      <Img
        src={card.image}
        alt={card.title}
        className={cn("h-full w-full object-cover", imageClassName)}
        optixFlowConfig={optixFlowConfig}
        loading="eager"
      />
    </div>
  ) : null;

  const content = (
    <div className={cn("flex flex-col p-5", contentClassName)}>
      {card.subtitle && (
        <span className="mb-2 text-xs font-medium tracking-wider uppercase">
          {card.subtitle}
        </span>
      )}
      <div className="flex items-center gap-1.5 text-base font-semibold">
        {card.title}
        <DynamicIcon
          name="lucide/arrow-right"
          size={16}
          className="shrink-0 transition-transform group-hover:translate-x-1"
        />
      </div>
      {card.description && (
        <p className="mt-2 text-sm leading-relaxed opacity-90">
          {card.description}
        </p>
      )}
    </div>
  );

  return (
    <Pressable
      href={card.href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg text-primary-foreground",
        card.variant === "accent"
          ? "bg-accent text-accent-foreground"
          : "bg-primary",
        className,
      )}
    >
      {contentFirst ? (
        <>
          {content}
          {image}
        </>
      ) : (
        <>
          {image}
          {content}
        </>
      )}
    </Pressable>
  );
};

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
  const visibleSolutionCards = solutionCards.filter(Boolean);
  const visiblePlatformItems = platformItems.filter(Boolean);
  const hasFeaturedCard = hasFeaturedHeroCardContent(featuredHeroCard);
  const hasPlatformSection = hasItems(visiblePlatformItems);
  const hasSolutionSection = hasItems(visibleSolutionCards);
  const hasRightColumn = hasPlatformSection || hasSolutionSection;

  if (!hasFeaturedCard && !hasRightColumn) return null;

  const featuredCard =
    hasFeaturedCard && featuredHeroCard ? (
      <FeaturedHeroCardPanel
        card={featuredHeroCard}
        optixFlowConfig={optixFlowConfig}
        contentFirst
        className={cn(featuredHeroCard.image && "min-h-[420px]")}
        imageContainerClassName="relative min-h-0 flex-1 overflow-hidden"
      />
    ) : null;

  const platformSection =
    hasPlatformSection ? (
      <div className="min-w-0">
        <div className="mb-3 text-left">
          <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            {platformTitle}
          </strong>
        </div>
        <div
          className={cn(
            "grid gap-2",
            hasFeaturedCard
              ? "grid-cols-2"
              : "grid-cols-[repeat(auto-fit,minmax(160px,1fr))]",
          )}
        >
          {visiblePlatformItems.map((technology) => (
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
    hasSolutionSection ? (
      <div
        className={cn(
          "grid gap-3",
          hasFeaturedCard
            ? "grid-cols-2"
            : "grid-cols-[repeat(auto-fit,minmax(220px,1fr))]",
        )}
      >
        {visibleSolutionCards.map((solution) => (
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
              {(solution.subpages ?? []).map((subpage) => (
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

  return (
    <div
      className={cn(
        "grid gap-4",
        PANEL_MAX_WIDTH_CLASS,
        hasFeaturedCard && hasRightColumn
          ? "w-[1200px] grid-cols-[minmax(380px,1fr)_minmax(360px,0.95fr)]"
          : hasFeaturedCard
            ? "w-[560px] grid-cols-1"
            : hasSolutionSection
              ? "w-[900px] grid-cols-1"
              : "w-[520px] grid-cols-1",
      )}
    >
      {featuredCard && <div className="min-w-0">{featuredCard}</div>}
      {hasRightColumn && (
        <div className="flex min-w-0 flex-col gap-4">
          {platformSection}
          {solutionSection}
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
}: ProductsMenuProps) => {
  const visibleCategories = productCategories.filter(
    (category) => hasItems(category.products),
  );
  const hasFeaturedCard = hasFeaturedHeroCardContent(featuredHeroCard);
  const hasProductContent = hasItems(visibleCategories);

  if (!hasFeaturedCard && !hasProductContent) return null;

  return (
    <div
      className={cn(
        "grid gap-6",
        PANEL_MAX_WIDTH_CLASS,
        hasFeaturedCard && hasProductContent
          ? "w-[1100px] grid-cols-[320px_1fr]"
          : hasProductContent
            ? "w-[860px] grid-cols-1"
            : "w-[360px] grid-cols-1",
      )}
    >
      {hasFeaturedCard && featuredHeroCard && (
        <div className="col-span-1 min-w-0">
          <FeaturedHeroCardPanel
            card={featuredHeroCard}
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      )}

      {hasProductContent && (
        <div className="col-span-1 flex min-w-0 flex-col gap-6">
          {visibleCategories.map((category) => (
            <div key={category.title} className="flex min-w-0 flex-col gap-3">
              <div className="border-b border-border pb-2 text-left">
                <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                  {category.title}
                </strong>
              </div>
              <menu
                className={cn(
                  "grid gap-3",
                  hasFeaturedCard
                    ? "grid-cols-3"
                    : "grid-cols-[repeat(auto-fit,minmax(220px,1fr))]",
                )}
              >
                {category.products.map((product) => (
                  <NavigationMenuLink
                    key={product.id}
                    href={product.href}
                    className="group col-span-1 !flex !w-full min-w-0 items-center gap-3 rounded-lg p-3 text-left hover:bg-muted"
                  >
                    <div className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded bg-muted text-muted-foreground">
                      {product.image ? (
                        <Img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-cover"
                          optixFlowConfig={optixFlowConfig}
                          loading="eager"
                        />
                      ) : (
                        <DynamicIcon name="lucide/package" size={18} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="break-words text-sm font-medium">
                        {product.title}
                      </div>
                      <p className="mt-0.5 break-words text-xs text-muted-foreground">
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
};

// ==================== RESOURCES MENU ====================

export interface ResourcesMenuProps {
  resourceItems: IResourceItem[];
  resourcesTitle?: string;
  topicGroups: ITopicGroup[];
  featuredHeroCard?: IFeaturedHeroCard;
  optixFlowConfig?: OptixFlowConfig;
}

export const ResourcesMenu = ({
  resourceItems,
  resourcesTitle = "Resources",
  topicGroups,
  featuredHeroCard,
  optixFlowConfig,
}: ResourcesMenuProps) => {
  const visibleTopicGroups = topicGroups.filter((group) =>
    hasItems(group.topics),
  );
  const hasFeaturedCard = hasFeaturedHeroCardContent(featuredHeroCard);
  const hasResourceContent = hasItems(resourceItems);
  const hasTopicContent = hasItems(visibleTopicGroups);

  if (!hasFeaturedCard && !hasResourceContent && !hasTopicContent) return null;

  return (
    <div
      className={cn(
        "grid gap-6",
        PANEL_MAX_WIDTH_CLASS,
        hasFeaturedCard && hasResourceContent && hasTopicContent
          ? "w-[1100px] grid-cols-[280px_1fr_220px]"
          : hasFeaturedCard && hasResourceContent
            ? "w-[900px] grid-cols-[280px_1fr]"
            : hasFeaturedCard && hasTopicContent
              ? "w-[560px] grid-cols-[280px_220px]"
              : hasResourceContent && hasTopicContent
                ? "w-[900px] grid-cols-[1fr_220px]"
                : hasResourceContent
                  ? "w-[700px] grid-cols-1"
                  : hasTopicContent
                    ? "w-[280px] grid-cols-1"
                    : "w-[320px] grid-cols-1",
      )}
    >
      {hasFeaturedCard && featuredHeroCard && (
        <div className="col-span-1 min-w-0">
          <FeaturedHeroCardPanel
            card={featuredHeroCard}
            optixFlowConfig={optixFlowConfig}
            imageContainerClassName="relative aspect-[4/3] w-full overflow-hidden"
            imageClassName="invert"
          />
        </div>
      )}

      {hasResourceContent && (
        <div className="col-span-1 min-w-0">
          <div className="mb-3 text-left">
            <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {resourcesTitle}
            </strong>
          </div>
          <div
            className={cn(
              "grid gap-3",
              resourceItems.length > 1 ? "grid-cols-2" : "grid-cols-1",
            )}
          >
            {resourceItems.map((resource) => (
              <NavigationMenuLink
                key={resource.id}
                href={resource.href}
                className="group col-span-1 !flex !w-full min-w-0 items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted"
              >
                <DynamicIcon
                  name={resource.icon}
                  size={18}
                  className="mt-0.5 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="break-words text-sm font-medium">
                    {resource.title}
                  </div>
                  <p className="mt-0.5 break-words text-xs text-muted-foreground">
                    {resource.description}
                  </p>
                </div>
              </NavigationMenuLink>
            ))}
          </div>
        </div>
      )}

      {hasTopicContent && (
        <div className="col-span-1 min-w-0">
          {visibleTopicGroups.map((group) => (
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
                    className="group !flex !w-full min-w-0 items-center gap-2 rounded-lg p-2 hover:bg-muted"
                  >
                    <DynamicIcon
                      name={topic.icon}
                      size={14}
                      className="shrink-0"
                    />
                    <span className="min-w-0 flex-1 break-words text-sm font-medium">
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
};

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
}: GlobalMenuProps) => {
  const visibleFeatureCategories = featureCategories.filter((category) =>
    hasItems(category.features),
  );
  const visibleRegions = regions.filter((region) => hasItems(region.locations));
  const hasFeaturedCard = hasFeaturedHeroCardContent(featuredHeroCard);
  const hasFeatureContent = hasItems(visibleFeatureCategories);
  const hasRegionContent = hasItems(visibleRegions);

  if (!hasFeaturedCard && !hasFeatureContent && !hasRegionContent) return null;

  return (
    <div
      className={cn(
        PANEL_MAX_WIDTH_CLASS,
        hasFeatureContent && hasFeaturedCard
          ? "w-[1100px]"
          : hasFeatureContent || hasRegionContent
            ? "w-[900px]"
            : "w-[320px]",
      )}
    >
      {(hasFeaturedCard || hasFeatureContent) && (
        <div
          className={cn(
            "grid gap-6",
            hasFeaturedCard && hasFeatureContent
              ? "grid-cols-[280px_1fr]"
              : "grid-cols-1",
          )}
        >
          {hasFeaturedCard && featuredHeroCard && (
            <div
              className={cn(
                "col-span-1 min-w-0",
                !hasFeatureContent && hasRegionContent && "max-w-[320px]",
              )}
            >
              <FeaturedHeroCardPanel
                card={featuredHeroCard}
                optixFlowConfig={optixFlowConfig}
                imageContainerClassName="relative aspect-[4/3] w-full overflow-hidden"
              />
            </div>
          )}

          {hasFeatureContent && (
            <div className="col-span-1 flex min-w-0 flex-col gap-6">
              {visibleFeatureCategories.map((category) => (
                <div key={category.title} className="flex min-w-0 flex-col gap-3">
                  <div className="border-b border-border pb-2 text-left">
                    <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                      {category.title}
                    </strong>
                  </div>
                  <menu
                    className={cn(
                      "grid gap-3",
                      hasFeaturedCard
                        ? "grid-cols-3"
                        : "grid-cols-[repeat(auto-fit,minmax(220px,1fr))]",
                    )}
                  >
                    {category.features.map((feature) => (
                      <NavigationMenuLink
                        key={feature.id}
                        href={feature.href}
                        className="group col-span-1 !flex !w-full min-w-0 items-center gap-2 rounded-lg p-2 text-left hover:bg-muted"
                      >
                        <div className="flex size-8 shrink-0 items-center justify-center">
                          <DynamicIcon name={feature.icon} size={18} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="break-words text-sm font-medium">
                            {feature.title}
                          </div>
                          <p className="mt-0.5 break-words text-xs text-muted-foreground">
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
      )}

      {hasRegionContent && (
        <div className={cn(hasFeaturedCard || hasFeatureContent ? "mt-6" : "")}>
          <div className="mb-3 border-b border-border pb-2 text-left">
            <strong className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {locationsTitle}
            </strong>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
            {visibleRegions.map((region) => (
              <div
                key={region.title}
                className="col-span-1 flex w-full min-w-0 flex-col gap-3"
              >
                <div className="break-words text-left text-xs font-medium text-muted-foreground">
                  {region.title}
                </div>
                <menu className="grid gap-1.5">
                  {region.locations.map((location) => (
                    <NavigationMenuLink
                      key={location.title}
                      href={location.href}
                      className="group !flex !w-full min-w-0 items-center gap-2 rounded-lg p-2 text-left hover:bg-muted"
                    >
                      <div className="flex size-4 shrink-0 items-center justify-center">
                        <DynamicIcon
                          name={location.icon}
                          size={16}
                          className="shrink-0"
                        />
                      </div>
                      <div className="min-w-0 flex-1 break-words text-sm font-medium">
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
};

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
}: PartnersMenuProps) => {
  const hasFeaturedCard = hasFeaturedHeroCardContent(featuredHeroCard);
  const hasPartnerContent = hasItems(partnerCards);

  if (!hasFeaturedCard && !hasPartnerContent) return null;

  return (
    <div
      className={cn(
        "grid gap-6",
        PANEL_MAX_WIDTH_CLASS,
        hasFeaturedCard && hasPartnerContent
          ? "w-[1000px] grid-cols-[2fr_1fr]"
          : hasPartnerContent
            ? "w-[680px] grid-cols-1"
            : "w-[360px] grid-cols-1",
      )}
    >
      {hasFeaturedCard && featuredHeroCard && (
        <div className="col-span-1 min-w-0">
          <FeaturedHeroCardPanel
            card={featuredHeroCard}
            optixFlowConfig={optixFlowConfig}
            imageClassName={cn(
              featuredHeroCard.imagePosition === "background" && "invert",
            )}
          />
        </div>
      )}

      {hasPartnerContent && (
        <div
          className={cn(
            "col-span-1 min-w-0 gap-3",
            hasFeaturedCard
              ? "flex flex-col"
              : "grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))]",
          )}
        >
          {partnerCards.map((card) => (
            <NavigationMenuLink
              key={card.title}
              href={card.href}
              className="group !flex !w-full min-w-0 items-start gap-3 rounded-lg border border-border p-4 hover:bg-muted"
            >
              <DynamicIcon name={card.icon} size={28} className="shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="break-words text-sm font-bold">
                  {card.title}
                </div>
                <p className="mt-0.5 break-words text-xs text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </NavigationMenuLink>
          ))}
        </div>
      )}
    </div>
  );
};
