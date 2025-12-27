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

export interface BreadcrumbItemType {
  label: string;
  link: string;
}

export interface BlogPost {
  category: string;
  title: string;
  summary: string;
  link: string;
  cta: string;
  thumbnail: string;
}

export interface Category {
  label: string;
  value: string;
}

export interface BlogFilteredResultsProps {
  className?: string;
  title?: string;
  description?: string;
  allBlogsTitle?: string;
  breadcrumb?: BreadcrumbItemType[];
  primaryPost?: BlogPost;
  posts?: BlogPost[];
  categories?: Category[];
  postsPerPage?: number;
  loadMoreText?: string;
  optixFlowConfig?: { apiKey: string; compression?: number };
}

const POSTS_PER_PAGE = 6;

const defaultBreadcrumb: BreadcrumbItemType[] = [
  { label: "Resources", link: "#" },
  { label: "Blogs", link: "#" },
];

const defaultCategories: Category[] = [
  { label: "All", value: "all" },
  { label: "Productivity", value: "productivity" },
  { label: "Accessibility", value: "accessibility" },
  { label: "Performance", value: "performance" },
];

const defaultPrimaryPost: BlogPost = {
  category: "Innovation Spotlight",
  title: "How AI is Transforming Frontend Development",
  summary:
    "Explore how tools like GitHub Copilot, AI design generators, and code assistants are changing the way developers build UIs and ship features faster.",
  link: "#",
  cta: "Discover the Future",
  thumbnail: imagePlaceholders[0],
};

const defaultPosts: BlogPost[] = [
  {
    category: "Productivity",
    title: "5 VS Code Extensions That Will Save You Hours",
    summary:
      "Discover must-have extensions to boost your coding efficiency and streamline your workflow.",
    link: "#",
    cta: "Boost Your Editor",
    thumbnail: imagePlaceholders[1],
  },
  {
    category: "Productivity",
    title: "Time Management for Developers: What Really Works",
    summary:
      "Learn proven strategies to avoid burnout and stay on top of your tasks without stress.",
    link: "#",
    cta: "Manage Your Time",
    thumbnail: imagePlaceholders[2],
  },
  {
    category: "Accessibility",
    title: "Why Accessibility Should Be Part of Your MVP",
    summary:
      "Making your product inclusive from day one improves usability and reach.",
    link: "#",
    cta: "Learn Why",
    thumbnail: imagePlaceholders[3],
  },
  {
    category: "Accessibility",
    title: "Using ARIA Roles Correctly in Your Web App",
    summary:
      "Understand how to enhance screen reader support using ARIA roles and landmarks.",
    link: "#",
    cta: "Improve Semantics",
    thumbnail: imagePlaceholders[4],
  },
  {
    category: "Performance",
    title: "Lazy Loading Images with Modern HTML",
    summary:
      "Improve load times by using native lazy-loading and fallback strategies for images.",
    link: "#",
    cta: "Optimize Images",
    thumbnail: imagePlaceholders[5],
  },
  {
    category: "Performance",
    title: "Web Vitals Explained: CLS, LCP, FID",
    summary:
      "Learn how to measure and improve Core Web Vitals for a better user experience.",
    link: "#",
    cta: "Improve Vitals",
    thumbnail: imagePlaceholders[6],
  },
];

const defaultProps: Partial<BlogFilteredResultsProps> = {
  title: "Best Blog Articles",
  description:
    "The best blog is one that captivates readers with engaging, well-researched content presented in a clear and relatable way.",
  allBlogsTitle: "All Blogs",
  breadcrumb: defaultBreadcrumb,
  primaryPost: defaultPrimaryPost,
  posts: defaultPosts,
  categories: defaultCategories,
  postsPerPage: POSTS_PER_PAGE,
  loadMoreText: "Load More",
};

interface BlogCardProps {
  post: BlogPost;
  optixFlowConfig?: { apiKey: string; compression?: number };
}

function BlogCard({ post, optixFlowConfig }: BlogCardProps) {
  return (
    <Pressable href={post.link} className="block h-full w-full">
      <Card className="size-full rounded-lg border py-0">
        <CardContent className="p-0">
          <div className="border-b p-2.5 text-sm leading-[1.2] font-medium text-muted-foreground">
            {post.category}
          </div>
          <AspectRatio ratio={1.520833333} className="overflow-hidden">
            <Img
              src={post.thumbnail}
              alt={post.title}
              className="block size-full object-cover object-center"
              optixFlowConfig={optixFlowConfig}
            />
          </AspectRatio>
          <div className="flex w-full flex-col gap-5 p-5">
            <h2 className="text-lg leading-tight font-medium md:text-xl">
              {post.title}
            </h2>
            <div className="w-full max-w-[20rem]">
              <p className="text-sm leading-[1.4] font-medium text-muted-foreground">
                {post.summary}
              </p>
            </div>
            <div>
              <Pressable href={post.link} asButton size="sm" variant="outline">
                {post.cta}
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
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
}

function FilterForm({
  categories,
  selectedCategories,
  onCategoryChange,
}: FilterFormProps) {
  return (
    <div className="flex w-full flex-wrap items-center gap-2.5">
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
        {breadcrumb.map((item, i) => (
          <Fragment key={item.label}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {i < breadcrumb.length - 1 && (
              <BreadcrumbSeparator>
                <DynamicIcon name="lucide/slash" size={14} />
              </BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function BlogFilteredResults({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  allBlogsTitle = defaultProps.allBlogsTitle,
  breadcrumb = defaultProps.breadcrumb,
  primaryPost = defaultProps.primaryPost,
  posts = defaultProps.posts,
  categories = defaultProps.categories,
  postsPerPage = defaultProps.postsPerPage,
  loadMoreText = defaultProps.loadMoreText,
  optixFlowConfig,
}: BlogFilteredResultsProps) {
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
    return posts.filter(
      (post) =>
        selectedCategories.includes(post.category.toLowerCase()) ||
        selectedCategories.includes("all")
    );
  }, [posts, selectedCategories]);

  const postsToDisplay = filteredPosts.length > 0 ? filteredPosts : posts || [];
  const hasMore = visibleCount < postsToDisplay.length;

  return (
    <section className={cn("pb-32", className)}>
      <div className="bg-muted bg-size-[3.125rem_3.125rem] bg-repeat">
        <div className="container flex flex-col items-start justify-start gap-16 py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-col justify-between gap-12">
            <div className="flex w-full max-w-xl flex-col gap-8">
              {breadcrumb && <BreadcrumbBlog breadcrumb={breadcrumb} />}
              <div className="flex w-full flex-col gap-5">
                <h1 className="text-[2.5rem] leading-[1.2] font-semibold md:text-5xl lg:text-6xl">
                  {title}
                </h1>
                <p className="text-xl leading-[1.4] text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {primaryPost && (
            <div className="w-full max-w-110">
              <BlogCard post={primaryPost} optixFlowConfig={optixFlowConfig} />
            </div>
          )}
        </div>
      </div>
      <div className="py-20">
        <div className="container flex flex-col gap-8">
          <h2 className="text-[1.75rem] leading-none font-medium md:text-[2.25rem] lg:text-[2rem]">
            {allBlogsTitle}
          </h2>
          <div>
            {categories && (
              <FilterForm
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
            )}
            <div className="flex w-full flex-col gap-4 py-8 lg:gap-8">
              <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                {postsToDisplay.slice(0, visibleCount).map((post) => (
                  <BlogCard
                    key={post.title}
                    post={post}
                    optixFlowConfig={optixFlowConfig}
                  />
                ))}
              </div>
              <div className="flex justify-center">
                {hasMore && (
                  <Pressable
                    asButton
                    variant="secondary"
                    onClick={handleLoadMore}
                  >
                    {loadMoreText}
                  </Pressable>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
