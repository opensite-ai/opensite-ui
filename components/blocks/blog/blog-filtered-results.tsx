"use client";

import * as React from "react";
import { Fragment, useCallback, useMemo, useState } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { AspectRatio } from "../../ui/aspect-ratio";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import { Card, CardContent } from "../../ui/card";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  BlogPostItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Breadcrumb item configuration
 */
export interface BreadcrumbItemType {
  label: React.ReactNode;
  link: string;
}

/**
 * Category filter configuration
 */
export interface CategoryFilter {
  label: React.ReactNode;
  value: string;
  /**
   * Category slug for the platform's `?category_slug=` URL filter
   * (FEED_CONTRACT §2.4). Hydration-provided and optional — chips without one
   * filter client-side only and skip the URL write. The `All` chip never
   * carries one (selecting it removes the param).
   */
  slug?: string;
}

export interface BlogFilteredResultsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Title for the secondary content section
   */
  allContentHeading?: React.ReactNode;
  /**
   * Breadcrumb navigation items
   */
  breadcrumb?: BreadcrumbItemType[];
  /**
   * Custom slot for rendering breadcrumb (overrides breadcrumb array)
   */
  breadcrumbSlot?: React.ReactNode;
  /**
   * Primary/featured item configuration
   */
  primaryPost?: BlogPostItem;
  /**
   * Custom slot for rendering primary item (overrides primaryPost)
   */
  primaryPostSlot?: React.ReactNode;
  /**
   * Array of content item configurations
   */
  posts?: BlogPostItem[];
  /**
   * Custom slot for rendering content items (overrides posts array)
   */
  postsSlot?: React.ReactNode;
  /**
   * Category filter options
   */
  categories?: CategoryFilter[];
  /**
   * Custom slot for rendering category filters (overrides categories)
   */
  categoriesSlot?: React.ReactNode;
  /**
   * Number of items to show per page
   */
  postsPerPage?: number;
  /**
   * Action configuration for the pagination button
   */
  loadMoreAction?: ActionConfig;
  /**
   * Custom slot for rendering the pagination action (overrides loadMoreAction)
   */
  loadMoreSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the hero container
   */
  heroClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the primary item container
   */
  primaryPostClassName?: string;
  /**
   * Additional CSS classes for the secondary content section
   */
  allContentClassName?: string;
  /**
   * Additional CSS classes for the secondary content heading
   */
  allContentHeadingClassName?: string;
  /**
   * Additional CSS classes for the categories filter
   */
  categoriesClassName?: string;
  /**
   * Additional CSS classes for the content grid
   */
  postsClassName?: string;
  /**
   * Additional CSS classes for individual item cards
   */
  postCardClassName?: string;
  /**
   * Additional CSS classes for the pagination container
   */
  loadMoreClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /** Optional Section ID */
  sectionId?: string;
}

const POSTS_PER_PAGE = 6;

interface BlogCardProps {
  post: BlogPostItem;
  optixFlowConfig?: OptixFlowConfig;
  className?: string;
}

const BlogCard = React.memo(function BlogCard({
  post,
  optixFlowConfig,
  className,
}: BlogCardProps) {
  const postHref = post.href || post.url || post.link || "#";
  const postImage = post.thumbnail || post.image;
  const postTitle =
    typeof post.title === "string" ? post.title : "Content item";
  const postCategory = post.category || post.label;
  const postSummary = post.summary || post.description;
  const postCta = post.cta || "Read more";

  return (
    <Card
      /*
        Grid card guard: a card's default `min-width: auto` is its min-content
        width, so one unbroken token in a feed-driven title or summary makes the
        card wider than its track and scrolls the whole page sideways on a phone.
        `min-w-0` and `wrap-break-word` are both already in the production
        Tailwind safelist.
      */
      className={cn(
        "size-full min-w-0 rounded-lg border py-0 wrap-break-word",
        className,
      )}
    >
      <CardContent className="p-0">
        {postCategory && (
          <div className="border-b p-2.5 text-xs leading-[1.2] font-bold text-muted-foreground/70 uppercase">
            {postCategory}
          </div>
        )}
        {postImage && (
          <Pressable
            href={postHref}
            className="block transition-opacity duration-200 hover:opacity-80"
          >
            <AspectRatio ratio={1.520833333} className="overflow-hidden">
              <Img
                src={postImage}
                alt={postTitle}
                className="block size-full object-cover object-center"
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </Pressable>
        )}
        <div className="flex w-full flex-col gap-5 p-5">
          {post.title && (
            <h2 className="text-lg leading-tight font-medium md:text-xl hover:underline">
              <Pressable href={postHref}>{post.title}</Pressable>
            </h2>
          )}
          {postSummary && (
            <div className="w-full max-w-[20rem]">
              <p className="text-sm leading-[1.4] font-medium text-muted-foreground">
                {postSummary}
              </p>
            </div>
          )}
          <div>
            <Pressable href={postHref} asButton size="sm" variant="outline">
              {postCta}
              <DynamicIcon name="lucide/arrow-right" size={16} />
            </Pressable>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

interface FilterFormProps {
  categories: CategoryFilter[];
  selectedCategories: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
  className?: string;
}

const FilterForm = React.memo(function FilterForm({
  categories,
  selectedCategories,
  onCategoryChange,
  className,
}: FilterFormProps) {
  return (
    <div
      role="group"
      aria-label="Filter by category"
      className={cn("flex w-full flex-wrap items-center gap-2", className)}
    >
      {categories.map((category) => {
        const isActive = selectedCategories.includes(category.value);
        return (
          <button
            key={category.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onCategoryChange(category.value, !isActive)}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
});

/**
 * Initial pill selection: chips matching the platform's `?category_slug=` URL
 * filter (FEED_CONTRACT §5.4 — repeated bare keys allowed), else `["all"]`.
 * Hydrated chips are inlined server-side, so they are present at first render;
 * SSR renders the `["all"]` default (no window) and the client initializer is
 * only consulted on the client-rendered tree.
 */
function initialSelectedCategories(categories?: CategoryFilter[]): string[] {
  if (typeof window === "undefined" || !categories?.length) return ["all"];
  const params = new URLSearchParams(window.location.search);
  const slugs = [
    ...params.getAll("category_slug"),
    ...params.getAll("category_slug[]"),
  ];
  if (slugs.length === 0) return ["all"];
  const matched = categories
    .filter((category) => category.slug && slugs.includes(category.slug))
    .map((category) => category.value);
  return matched.length > 0 ? matched : ["all"];
}

/**
 * Mirror the pill selection into the URL (`history.replaceState`, no
 * navigation): selected chips write their `slug` as repeated `?category_slug=`
 * keys; `All` clears the param. A stale `?page=` is dropped — a filter change
 * always restarts at page 1. Chips without a slug are skipped, so legacy
 * hydrated payloads keep working with client-side filtering only. Direct-link
 * loads are server-filtered by the host page (`applyListFilters`), so the URL
 * this writes is a first-class shareable filter.
 */
function syncCategoryUrl(
  categories: CategoryFilter[] | undefined,
  selected: string[],
): void {
  if (typeof window === "undefined" || !window.history?.replaceState) return;
  const slugs = selected.includes("all")
    ? []
    : (categories ?? [])
        .filter(
          (category) => category.slug && selected.includes(category.value),
        )
        .map((category) => category.slug as string);
  if (slugs.length === 0 && selected.some((value) => value !== "all")) {
    // Slug-less legacy chips: nothing valid to write — leave the URL alone.
    return;
  }
  const url = new URL(window.location.href);
  url.searchParams.delete("category_slug");
  url.searchParams.delete("category_slug[]");
  url.searchParams.delete("page");
  for (const slug of slugs) url.searchParams.append("category_slug", slug);
  window.history.replaceState(window.history.state, "", url);
}

interface BreadcrumbBlogProps {
  breadcrumb: BreadcrumbItemType[];
}

const BreadcrumbBlog = React.memo(function BreadcrumbBlog({
  breadcrumb,
}: BreadcrumbBlogProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item, i) => {
          const labelKey =
            typeof item.label === "string" ? item.label : `breadcrumb-${i}`;
          return (
            <Fragment key={labelKey}>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
              {i < breadcrumb.length - 1 && (
                <BreadcrumbSeparator>
                  <DynamicIcon name="lucide/slash" size={14} />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
});

export function BlogFilteredResultsComponent({
  sectionId = "blog-filtered-results",
  heading,
  description,
  allContentHeading,
  breadcrumb,
  breadcrumbSlot,
  primaryPost,
  primaryPostSlot,
  posts,
  postsSlot,
  categories,
  categoriesSlot,
  postsPerPage,
  loadMoreAction,
  loadMoreSlot,
  className,
  heroClassName,
  headingClassName,
  descriptionClassName,
  primaryPostClassName,
  allContentClassName,
  allContentHeadingClassName,
  categoriesClassName,
  postsClassName,
  postCardClassName,
  loadMoreClassName,
  optixFlowConfig,
  background,
  spacing = "hero",
  pattern,
  containerClassName = "mx-auto w-full px-4 lg:px-8 max-w-full md:max-w-7xl relative z-10 flex items-center flex-col",
  patternOpacity,
}: BlogFilteredResultsProps): React.JSX.Element {
  const effectivePostsPerPage = postsPerPage || POSTS_PER_PAGE;

  const [visibleCount, setVisibleCount] = useState(effectivePostsPerPage);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
    initialSelectedCategories(categories),
  );

  const handleCategoryChange = useCallback(
    (categoryValue: string, checked: boolean) => {
      let updated: string[];

      if (checked) {
        if (categoryValue === "all") {
          updated = ["all"];
        } else {
          updated = [
            ...selectedCategories.filter((v) => v !== "all"),
            categoryValue,
          ];
        }
      } else {
        updated = selectedCategories.filter((v) => v !== categoryValue);
        if (updated.length === 0) {
          updated = ["all"];
        }
      }

      setSelectedCategories(updated);
      setVisibleCount(effectivePostsPerPage);
      syncCategoryUrl(categories, updated);
    },
    [selectedCategories, categories, effectivePostsPerPage],
  );

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + effectivePostsPerPage);
  }, [effectivePostsPerPage]);

  const filterActive = !selectedCategories.includes("all");

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return posts.filter((post) => {
      const postCategory =
        typeof post.category === "string" ? post.category.toLowerCase() : "";
      return (
        selectedCategories.includes(postCategory) ||
        selectedCategories.includes("all")
      );
    });
  }, [posts, selectedCategories]);

  // With a specific filter active, a zero-match result renders EMPTY — falling
  // back to every post would contradict the filter (and the URL it writes).
  const postsToDisplay = filterActive ? filteredPosts : posts || [];
  const hasMore = visibleCount < postsToDisplay.length;

  // The featured hero follows the filter too: hydration binds the site-wide
  // newest post, which may not belong to the selected category.
  const primaryPostMatchesFilter = useMemo(() => {
    if (!primaryPost || !filterActive) return true;
    const category =
      typeof primaryPost.category === "string"
        ? primaryPost.category.toLowerCase()
        : "";
    return selectedCategories.includes(category);
  }, [primaryPost, filterActive, selectedCategories]);

  const breadcrumbContent = React.useMemo(() => {
    if (breadcrumbSlot) return breadcrumbSlot;
    if (!breadcrumb || breadcrumb.length === 0) return null;
    return <BreadcrumbBlog breadcrumb={breadcrumb} />;
  }, [breadcrumbSlot, breadcrumb]);

  const primaryPostContent = React.useMemo(() => {
    if (primaryPostSlot) return primaryPostSlot;
    if (!primaryPost) return null;
    return (
      <BlogCard
        post={primaryPost}
        optixFlowConfig={optixFlowConfig}
        className={postCardClassName}
      />
    );
  }, [primaryPostSlot, primaryPost, optixFlowConfig, postCardClassName]);

  const categoriesContent = React.useMemo(() => {
    if (categoriesSlot) return categoriesSlot;
    if (!categories || categories.length === 0) return null;
    return (
      <FilterForm
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        className={categoriesClassName}
      />
    );
  }, [
    categoriesSlot,
    categories,
    selectedCategories,
    handleCategoryChange,
    categoriesClassName,
  ]);

  const postsContent = React.useMemo(() => {
    if (postsSlot) return postsSlot;
    return postsToDisplay.slice(0, visibleCount).map((post) => {
      const postKey = post.id || String(post.title) || Math.random().toString();
      return (
        <BlogCard
          key={postKey}
          post={post}
          optixFlowConfig={optixFlowConfig}
          className={postCardClassName}
        />
      );
    });
  }, [
    postsSlot,
    postsToDisplay,
    visibleCount,
    optixFlowConfig,
    postCardClassName,
  ]);

  const loadMoreContent = React.useMemo(() => {
    if (loadMoreSlot) return loadMoreSlot;
    if (!loadMoreAction || !hasMore) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = loadMoreAction;
    return (
      <Pressable
        asButton
        onClick={handleLoadMore}
        className={actionClassName}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon === "" ? null : <DynamicIcon name={icon} />}
            {label}
            {iconAfter === "" ? null : <DynamicIcon name={iconAfter} />}
          </>
        )}
      </Pressable>
    );
  }, [loadMoreSlot, loadMoreAction, hasMore, handleLoadMore]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
      containerClassName={containerClassName}
    >
      <div
        className={cn(
          "bg-size-[3.125rem_3.125rem] bg-repeat rounded-2xl shadow-xl",
          "bg-muted text-muted-foreground",
          heroClassName,
        )}
      >
        <div className="w-full flex flex-col items-start justify-start gap-6 md:gap-16 p-6 md:p-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-col justify-between gap-12">
            <div className="flex w-full max-w-xl flex-col gap-8">
              {breadcrumbContent}
              <div className="flex w-full flex-col gap-5">
                {heading &&
                  (typeof heading === "string" ? (
                    <h1
                      className={cn(
                        "text-[2.5rem] leading-[1.2] font-semibold md:text-5xl lg:text-6xl",
                        headingClassName,
                      )}
                    >
                      {heading}
                    </h1>
                  ) : (
                    <div className={headingClassName}>{heading}</div>
                  ))}
                {description &&
                  (typeof description === "string" ? (
                    <p
                      className={cn(
                        "text-xl leading-[1.4] text-muted-foreground",
                        descriptionClassName,
                      )}
                    >
                      {description}
                    </p>
                  ) : (
                    <div className={descriptionClassName}>{description}</div>
                  ))}
              </div>
            </div>
          </div>

          {(primaryPostSlot || (primaryPost && primaryPostMatchesFilter)) && (
            <div className={cn("w-full max-w-110", primaryPostClassName)}>
              {primaryPostContent}
            </div>
          )}
        </div>
      </div>
      <div className={cn("py-20", allContentClassName)}>
        <div className="container flex flex-col gap-8">
          {allContentHeading &&
            (typeof allContentHeading === "string" ? (
              <h2
                className={cn(
                  "text-[1.75rem] leading-none font-medium md:text-[2.25rem] lg:text-[2rem]",
                  allContentHeadingClassName,
                )}
              >
                {allContentHeading}
              </h2>
            ) : (
              <div className={allContentHeadingClassName}>
                {allContentHeading}
              </div>
            ))}
          <div>
            {categoriesContent}
            <div className="flex w-full flex-col gap-4 py-8 lg:gap-8">
              <div
                className={cn(
                  "grid gap-4 md:gap-6 lg:gap-10 md:grid-cols-2 lg:grid-cols-3",
                  postsClassName,
                )}
              >
                {postsContent}
              </div>
              <div className={cn("flex justify-center", loadMoreClassName)}>
                {loadMoreContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export { BlogFilteredResultsComponent as BlogFilteredResults };
