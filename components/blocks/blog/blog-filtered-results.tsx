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
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, BlogPostItem, OptixFlowConfig } from "../../../src/types";

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
   * Title for the "All Blogs" section
   */
  allBlogsHeading?: React.ReactNode;
  /**
   * Breadcrumb navigation items
   */
  breadcrumb?: BreadcrumbItemType[];
  /**
   * Custom slot for rendering breadcrumb (overrides breadcrumb array)
   */
  breadcrumbSlot?: React.ReactNode;
  /**
   * Primary/featured post configuration
   */
  primaryPost?: BlogPostItem;
  /**
   * Custom slot for rendering primary post (overrides primaryPost)
   */
  primaryPostSlot?: React.ReactNode;
  /**
   * Array of blog post configurations
   */
  posts?: BlogPostItem[];
  /**
   * Custom slot for rendering posts (overrides posts array)
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
   * Number of posts to show per page
   */
  postsPerPage?: number;
  /**
   * Action configuration for the "Load More" button
   */
  loadMoreAction?: ActionConfig;
  /**
   * Custom slot for rendering the load more action (overrides loadMoreAction)
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
   * Additional CSS classes for the primary post container
   */
  primaryPostClassName?: string;
  /**
   * Additional CSS classes for the all blogs section
   */
  allBlogsClassName?: string;
  /**
   * Additional CSS classes for the all blogs heading
   */
  allBlogsHeadingClassName?: string;
  /**
   * Additional CSS classes for the categories filter
   */
  categoriesClassName?: string;
  /**
   * Additional CSS classes for the posts grid
   */
  postsClassName?: string;
  /**
   * Additional CSS classes for individual post cards
   */
  postCardClassName?: string;
  /**
   * Additional CSS classes for the load more container
   */
  loadMoreClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const POSTS_PER_PAGE = 6;

const defaultBreadcrumb: BreadcrumbItemType[] = [
  { label: "Resources", link: "#" },
  { label: "Blogs", link: "#" },
];

const defaultCategories: CategoryFilter[] = [
  { label: "All", value: "all" },
  { label: "Productivity", value: "productivity" },
  { label: "Accessibility", value: "accessibility" },
  { label: "Performance", value: "performance" },
];

const defaultPrimaryPost: BlogPostItem = {
  category: "Innovation Spotlight",
  title: "How AI is Transforming Frontend Development",
  summary:
    "Explore how tools like GitHub Copilot, AI design generators, and code assistants are changing the way developers build UIs and ship features faster.",
  href: "#",
  cta: "Discover the Future",
  thumbnail: imagePlaceholders[0],
};

const defaultPosts: BlogPostItem[] = [
  {
    category: "Productivity",
    title: "5 VS Code Extensions That Will Save You Hours",
    summary:
      "Discover must-have extensions to boost your coding efficiency and streamline your workflow.",
    href: "#",
    cta: "Boost Your Editor",
    thumbnail: imagePlaceholders[1],
  },
  {
    category: "Productivity",
    title: "Time Management for Developers: What Really Works",
    summary:
      "Learn proven strategies to avoid burnout and stay on top of your tasks without stress.",
    href: "#",
    cta: "Manage Your Time",
    thumbnail: imagePlaceholders[2],
  },
  {
    category: "Accessibility",
    title: "Why Accessibility Should Be Part of Your MVP",
    summary:
      "Making your product inclusive from day one improves usability and reach.",
    href: "#",
    cta: "Learn Why",
    thumbnail: imagePlaceholders[3],
  },
  {
    category: "Accessibility",
    title: "Using ARIA Roles Correctly in Your Web App",
    summary:
      "Understand how to enhance screen reader support using ARIA roles and landmarks.",
    href: "#",
    cta: "Improve Semantics",
    thumbnail: imagePlaceholders[4],
  },
  {
    category: "Performance",
    title: "Lazy Loading Images with Modern HTML",
    summary:
      "Improve load times by using native lazy-loading and fallback strategies for images.",
    href: "#",
    cta: "Optimize Images",
    thumbnail: imagePlaceholders[5],
  },
  {
    category: "Performance",
    title: "Web Vitals Explained: CLS, LCP, FID",
    summary:
      "Learn how to measure and improve Core Web Vitals for a better user experience.",
    href: "#",
    cta: "Improve Vitals",
    thumbnail: imagePlaceholders[6],
  },
];

const defaultLoadMoreAction: ActionConfig = {
  label: "Load More",
  variant: "secondary",
};

interface BlogCardProps {
  post: BlogPostItem;
  optixFlowConfig?: OptixFlowConfig;
  className?: string;
}

function BlogCard({ post, optixFlowConfig, className }: BlogCardProps) {
  const postHref = post.href || post.url || post.link || "#";
  const postImage = post.thumbnail || post.image;
  const postTitle = typeof post.title === "string" ? post.title : "Blog post";
  const postCategory = post.category || post.label;
  const postSummary = post.summary || post.description;
  const postCta = post.cta || "Read more";

  return (
    <Pressable href={postHref} className={cn("block h-full w-full", className)}>
      <Card className="size-full rounded-lg border py-0">
        <CardContent className="p-0">
          {postCategory && (
            <div className="border-b p-2.5 text-sm leading-[1.2] font-medium text-muted-foreground">
              {postCategory}
            </div>
          )}
          {postImage && (
            <AspectRatio ratio={1.520833333} className="overflow-hidden">
              <Img
                src={postImage}
                alt={postTitle}
                className="block size-full object-cover object-center"
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          )}
          <div className="flex w-full flex-col gap-5 p-5">
            {post.title && (
              <h2 className="text-lg leading-tight font-medium md:text-xl">
                {post.title}
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
    </Pressable>
  );
}

interface FilterFormProps {
  categories: CategoryFilter[];
  selectedCategories: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
  className?: string;
}

function FilterForm({
  categories,
  selectedCategories,
  onCategoryChange,
  className,
}: FilterFormProps) {
  return (
    <div className={cn("flex w-full flex-wrap items-center gap-2.5", className)}>
      {categories.map((category) => {
        const isChecked = selectedCategories.includes(category.value);
        return (
          <Label
            key={category.value}
            className="flex cursor-pointer items-center gap-2.5 rounded-full bg-muted px-2.5 py-1.5"
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
}

interface BreadcrumbBlogProps {
  breadcrumb: BreadcrumbItemType[];
}

function BreadcrumbBlog({ breadcrumb }: BreadcrumbBlogProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item, i) => {
          const labelKey = typeof item.label === "string" ? item.label : `breadcrumb-${i}`;
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
}

export function BlogFilteredResults({
  heading = "Best Blog Articles",
  description = "The best blog is one that captivates readers with engaging, well-researched content presented in a clear and relatable way.",
  allBlogsHeading = "All Blogs",
  breadcrumb = defaultBreadcrumb,
  breadcrumbSlot,
  primaryPost = defaultPrimaryPost,
  primaryPostSlot,
  posts = defaultPosts,
  postsSlot,
  categories = defaultCategories,
  categoriesSlot,
  postsPerPage = POSTS_PER_PAGE,
  loadMoreAction = defaultLoadMoreAction,
  loadMoreSlot,
  className,
  heroClassName,
  headingClassName,
  descriptionClassName,
  primaryPostClassName,
  allBlogsClassName,
  allBlogsHeadingClassName,
  categoriesClassName,
  postsClassName,
  postCardClassName,
  loadMoreClassName,
  optixFlowConfig,
}: BlogFilteredResultsProps): React.JSX.Element {
  const [visibleCount, setVisibleCount] = useState(
    postsPerPage || POSTS_PER_PAGE
  );
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
      setVisibleCount(postsPerPage || POSTS_PER_PAGE);
    },
    [postsPerPage]
  );

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + (postsPerPage || POSTS_PER_PAGE));
  }, [postsPerPage]);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return posts.filter((post) => {
      const postCategory = typeof post.category === "string" ? post.category.toLowerCase() : "";
      return selectedCategories.includes(postCategory) || selectedCategories.includes("all");
    });
  }, [posts, selectedCategories]);

  const postsToDisplay = filteredPosts.length > 0 ? filteredPosts : posts || [];
  const hasMore = visibleCount < postsToDisplay.length;

  const renderBreadcrumb = () => {
    if (breadcrumbSlot) return breadcrumbSlot;
    if (!breadcrumb || breadcrumb.length === 0) return null;
    return <BreadcrumbBlog breadcrumb={breadcrumb} />;
  };

  const renderPrimaryPost = () => {
    if (primaryPostSlot) return primaryPostSlot;
    if (!primaryPost) return null;
    return <BlogCard post={primaryPost} optixFlowConfig={optixFlowConfig} className={postCardClassName} />;
  };

  const renderCategories = () => {
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
  };

  const renderPosts = () => {
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
  };

  const renderLoadMoreAction = () => {
    if (loadMoreSlot) return loadMoreSlot;
    if (!loadMoreAction || !hasMore) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = loadMoreAction;
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
  };

  return (
    <section className={cn("pb-32", className)}>
      <div className={cn("bg-muted bg-size-[3.125rem_3.125rem] bg-repeat", heroClassName)}>
        <div className="container flex flex-col items-start justify-start gap-16 py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-col justify-between gap-12">
            <div className="flex w-full max-w-xl flex-col gap-8">
              {renderBreadcrumb()}
              <div className="flex w-full flex-col gap-5">
                {heading && (
                  typeof heading === "string" ? (
                    <h1 className={cn("text-[2.5rem] leading-[1.2] font-semibold md:text-5xl lg:text-6xl", headingClassName)}>
                      {heading}
                    </h1>
                  ) : (
                    <div className={headingClassName}>{heading}</div>
                  )
                )}
                {description && (
                  typeof description === "string" ? (
                    <p className={cn("text-xl leading-[1.4] text-muted-foreground", descriptionClassName)}>
                      {description}
                    </p>
                  ) : (
                    <div className={descriptionClassName}>{description}</div>
                  )
                )}
              </div>
            </div>
          </div>

          {(primaryPostSlot || primaryPost) && (
            <div className={cn("w-full max-w-110", primaryPostClassName)}>
              {renderPrimaryPost()}
            </div>
          )}
        </div>
      </div>
      <div className={cn("py-20", allBlogsClassName)}>
        <div className="container flex flex-col gap-8">
          {allBlogsHeading && (
            typeof allBlogsHeading === "string" ? (
              <h2 className={cn("text-[1.75rem] leading-none font-medium md:text-[2.25rem] lg:text-[2rem]", allBlogsHeadingClassName)}>
                {allBlogsHeading}
              </h2>
            ) : (
              <div className={allBlogsHeadingClassName}>{allBlogsHeading}</div>
            )
          )}
          <div>
            {renderCategories()}
            <div className="flex w-full flex-col gap-4 py-8 lg:gap-8">
              <div className={cn("grid gap-10 md:grid-cols-2 lg:grid-cols-3", postsClassName)}>
                {renderPosts()}
              </div>
              <div className={cn("flex justify-center", loadMoreClassName)}>
                {renderLoadMoreAction()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
