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
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
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
    <Card className={cn("size-full rounded-lg border py-0", className)}>
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
      className={cn("flex w-full flex-wrap items-center gap-2.5", className)}
    >
      {categories.map((category) => {
        const isChecked = selectedCategories.includes(category.value);
        return (
          <Label
            key={category.value}
            className="flex cursor-pointer items-center gap-2.5 bg-none px-2.5 py-1.5"
          >
            <div>{category.label}</div>
            <Checkbox
              checked={isChecked}
              onCheckedChange={(checked) =>
                onCategoryChange(category.value, !!checked)
              }
            />
          </Label>
        );
      })}
    </div>
  );
});

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
  containerClassName = "mx-auto w-full px-4 lg:px-8 max-w-full md:max-w-7xl relative z-10 flex justify-center",
  patternOpacity,
}: BlogFilteredResultsProps): React.JSX.Element {
  const effectivePostsPerPage = postsPerPage || POSTS_PER_PAGE;

  const [visibleCount, setVisibleCount] = useState(effectivePostsPerPage);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "all",
  ]);

  const handleCategoryChange = useCallback(
    (categoryValue: string, checked: boolean) => {
      setSelectedCategories((prev) => {
        let updated: string[];

        if (checked) {
          if (categoryValue === "all") {
            updated = ["all"];
          } else {
            updated = [...prev.filter((v) => v !== "all"), categoryValue];
          }
        } else {
          updated = prev.filter((v) => v !== categoryValue);
          if (updated.length === 0) {
            updated = ["all"];
          }
        }

        return updated;
      });
      setVisibleCount(effectivePostsPerPage);
    },
    [effectivePostsPerPage],
  );

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + effectivePostsPerPage);
  }, [effectivePostsPerPage]);

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

  const postsToDisplay = filteredPosts.length > 0 ? filteredPosts : posts || [];
  const hasMore = visibleCount < postsToDisplay.length;

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
            {icon}
            {label}
            {iconAfter}
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

          {(primaryPostSlot || primaryPost) && (
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
