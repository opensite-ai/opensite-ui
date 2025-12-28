"use client";

import * as React from "react";
import { Fragment, useCallback, useMemo, useState } from "react";
import { Field, Form, useForm } from "@page-speed/forms";
import { TextInput } from "../../ui/form-inputs";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import {
  isValidEmail,
  PageSpeedFormSubmissionError,
  submitPageSpeedForm,
  type PageSpeedFormConfig,
} from "../../../lib/forms";
import { patternSvgs } from "../../../lib/patternSvgs";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface ResourceListHeroFilterBreadcrumbItem {
  label: string;
  link: string;
}

export interface ResourceListHeroFilterPost {
  category: string;
  title: string;
  summary: string;
  link: string;
  cta: string;
  thumbnail: string;
}

export interface ResourceListHeroFilterCategory {
  label: string;
  value: string;
}

export interface ResourceListHeroFilterProps {
  className?: string;
  title?: string;
  description?: string;
  breadcrumb?: ResourceListHeroFilterBreadcrumbItem[];
  primaryPost?: ResourceListHeroFilterPost;
  posts?: ResourceListHeroFilterPost[];
  categories?: ResourceListHeroFilterCategory[];
  allPostsTitle?: string;
  emailPlaceholder?: string;
  buttonText?: string;
  postsPerPage?: number;
  loadMoreText?: string;
  /**
   * Optional form submission configuration.
   *
   * **Universal Usage**: Works with ANY REST API endpoint. Simply provide an `endpoint` URL
   * and the form will submit to it in JSON format.
   *
   * @example
   * // Works with any API
   * formConfig={{ endpoint: "https://api.mysite.com/subscribe", format: "json" }}
   *
   * @example
   * // With custom headers (e.g., authentication)
   * formConfig={{
   *   endpoint: "/api/newsletter",
   *   headers: { "Authorization": "Bearer token123" }
   * }}
   *
   * **Note**: The `apiKey`, `contactCategoryToken`, and other platform-specific fields
   * are OPTIONAL and only needed when integrating with DashTrack's Rails backend.
   * For generic REST APIs, just use `endpoint`, `method`, `format`, and `headers`.
   *
   * See `FORMS_INTEGRATION_GUIDE.md` for complete examples with Next.js, React, and more.
   */
  formConfig?: PageSpeedFormConfig;
  /**
   * Optional custom submission handler for maximum flexibility.
   *
   * Use this when you need complete control over the submission logic,
   * such as custom API calls, analytics tracking, or multi-step workflows.
   *
   * Can be used alone or in combination with `formConfig` for hybrid approaches.
   *
   * @example
   * onSubmit={async (email) => {
   *   await fetch("/api/subscribe", {
   *     method: "POST",
   *     body: JSON.stringify({ email, source: "resource-list" })
   *   });
   * }}
   */
  onSubmit?: (email: string) => void | Promise<void>;
  /**
   * Optional success callback invoked after successful submission.
   *
   * Called after `formConfig` submission and/or `onSubmit` completes successfully.
   * Use for showing success messages, redirecting, analytics tracking, etc.
   */
  onSuccess?: (data: unknown) => void;
  /**
   * Optional error callback invoked if submission fails.
   *
   * Receives the error object for custom error handling, logging, or user notifications.
   */
  onError?: (error: Error) => void;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultBreadcrumb: ResourceListHeroFilterBreadcrumbItem[] = [
  { label: "Resources", link: "#" },
  { label: "Reports", link: "#" },
];

const defaultCategories: ResourceListHeroFilterCategory[] = [
  { label: "All", value: "all" },
  { label: "Productivity", value: "productivity" },
  { label: "Accessibility", value: "accessibility" },
  { label: "Performance", value: "performance" },
];

const defaultPrimaryPost: ResourceListHeroFilterPost = {
  category: "Innovation Spotlight",
  title: "How AI is Transforming Frontend Development",
  summary:
    "Explore how tools like GitHub Copilot, AI design generators, and code assistants are changing the way developers build UIs and ship features faster.",
  link: "#",
  cta: "Discover the Future",
  thumbnail: blockBrandedIconsAndPlaceholders.placeholder1,
};

const defaultPosts: ResourceListHeroFilterPost[] = [
  {
    category: "Productivity",
    title: "5 VS Code Extensions That Will Save You Hours",
    summary:
      "Discover must-have extensions to boost your coding efficiency and streamline your workflow.",
    link: "#",
    cta: "Boost Your Editor",
    thumbnail: blockBrandedIconsAndPlaceholders.placeholder2,
  },
  {
    category: "Productivity",
    title: "Time Management for Developers: What Really Works",
    summary:
      "Learn proven strategies to avoid burnout and stay on top of your tasks without stress.",
    link: "#",
    cta: "Manage Your Time",
    thumbnail: blockBrandedIconsAndPlaceholders.placeholder3,
  },
  {
    category: "Accessibility",
    title: "Why Accessibility Should Be Part of Your MVP",
    summary:
      "Making your product inclusive from day one improves usability and reach.",
    link: "#",
    cta: "Learn Why",
    thumbnail: blockBrandedIconsAndPlaceholders.placeholder4,
  },
  {
    category: "Accessibility",
    title: "Using ARIA Roles Correctly in Your Web App",
    summary:
      "Understand how to enhance screen reader support using ARIA roles and landmarks.",
    link: "#",
    cta: "Improve Semantics",
    thumbnail: blockBrandedIconsAndPlaceholders.placeholder5,
  },
  {
    category: "Performance",
    title: "Lazy Loading Images with Modern HTML",
    summary:
      "Improve load times by using native lazy-loading and fallback strategies for images.",
    link: "#",
    cta: "Optimize Images",
    thumbnail: blockBrandedIconsAndPlaceholders.placeholder6,
  },
  {
    category: "Performance",
    title: "Web Vitals Explained: CLS, LCP, FID",
    summary:
      "Learn how to measure and improve Core Web Vitals for a better user experience.",
    link: "#",
    cta: "Improve Vitals",
    thumbnail: blockBrandedIconsAndPlaceholders.placeholder1,
  },
];

interface FilterFormProps {
  categories: ResourceListHeroFilterCategory[];
  onCategoryChange: (selectedCategories: string[]) => void;
}

const FilterForm = ({ categories, onCategoryChange }: FilterFormProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(["all"]);

  const handleCheckboxChange = useCallback(
    (checked: boolean, categoryValue: string) => {
      let updatedValues = checked
        ? [...selectedItems, categoryValue]
        : selectedItems.filter((value: string) => value !== categoryValue);

      if (updatedValues.length === 0) {
        setSelectedItems(["all"]);
        onCategoryChange(["all"]);
        return;
      }

      if (updatedValues.includes("all") && categoryValue !== "all") {
        updatedValues = updatedValues.filter((v: string) => v !== "all");
      }

      if (categoryValue === "all" && checked) {
        updatedValues = ["all"];
      }

      setSelectedItems(updatedValues);
      onCategoryChange(updatedValues);
    },
    [selectedItems, onCategoryChange]
  );

  return (
    <div className="flex w-full flex-wrap items-center gap-2.5">
      {categories.map((category) => {
        const isChecked = selectedItems.includes(category.value);
        return (
          <Label
            key={category.value}
            className="flex cursor-pointer items-center gap-2.5 rounded-full bg-muted px-2.5 py-1.5"
          >
            <span>{category.label}</span>
            <Checkbox
              checked={isChecked}
              onCheckedChange={(checked) =>
                handleCheckboxChange(!!checked, category.value)
              }
            />
          </Label>
        );
      })}
    </div>
  );
};

interface ResourcesResultProps {
  posts: ResourceListHeroFilterPost[];
  categories: ResourceListHeroFilterCategory[];
  postsPerPage: number;
  loadMoreText: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const ResourcesResult = ({
  posts,
  categories,
  postsPerPage,
  loadMoreText,
  optixFlowConfig,
}: ResourcesResultProps) => {
  const [visibleCount, setVisibleCount] = useState(postsPerPage);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "all",
  ]);

  const handleCategoryChange = useCallback((selected: string[]) => {
    setSelectedCategories(selected);
    setVisibleCount(postsPerPage);
  }, [postsPerPage]);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + postsPerPage);
  }, [postsPerPage]);

  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        selectedCategories.includes(post.category.toLowerCase()) ||
        selectedCategories.includes("all")
    );
  }, [posts, selectedCategories]);

  const postsToDisplay = filteredPosts.length > 0 ? filteredPosts : posts;
  const hasMore = visibleCount < postsToDisplay.length;

  return (
    <div>
      <FilterForm
        categories={categories}
        onCategoryChange={handleCategoryChange}
      />
      <div className="flex w-full flex-col gap-4 py-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {postsToDisplay.slice(0, visibleCount).map((post) => (
            <ResourceCard key={post.title} {...post} optixFlowConfig={optixFlowConfig} />
          ))}
        </div>
        {hasMore && (
          <Pressable
            className="w-full"
            variant="secondary"
            asButton
            onClick={handleLoadMore}
          >
            {loadMoreText}
          </Pressable>
        )}
      </div>
    </div>
  );
};

interface BreadcrumbBlogProps {
  breadcrumb: ResourceListHeroFilterBreadcrumbItem[];
}

const BreadcrumbBlog = ({ breadcrumb }: BreadcrumbBlogProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumb.map((item, i) => {
          return (
            <Fragment key={`${item.label}`}>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
              {i < breadcrumb.length - 1 ? (
                <BreadcrumbSeparator>
                  <DynamicIcon name="lucide/slash" size={16} />
                </BreadcrumbSeparator>
              ) : null}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

interface EmailFormProps {
  emailPlaceholder: string;
  buttonText: string;
  formConfig?: PageSpeedFormConfig;
  onSubmit?: (email: string) => void | Promise<void>;
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

const EmailForm = ({
  emailPlaceholder,
  buttonText,
  formConfig,
  onSubmit,
  onSuccess,
  onError,
}: EmailFormProps) => {
  const form = useForm<{ email: string }>({
    initialValues: {
      email: "",
    },
    validationSchema: {
      email: (value) => {
        if (!value) return "Email is required";
        if (!isValidEmail(value)) return "Please enter a valid email address";
        return undefined;
      },
    },
    onSubmit: async (values, helpers) => {
      const shouldAutoSubmit = Boolean(formConfig?.endpoint);

      if (!shouldAutoSubmit && !onSubmit) {
        return;
      }

      try {
        let result: unknown;

        if (shouldAutoSubmit) {
          result = await submitPageSpeedForm(values, formConfig);
        }

        if (onSubmit) {
          await onSubmit(values.email);
        }

        if (shouldAutoSubmit || onSubmit) {
          if (formConfig?.resetOnSuccess !== false) {
            helpers.resetForm();
          }
          onSuccess?.(result);
        }
      } catch (error) {
        if (
          error instanceof PageSpeedFormSubmissionError &&
          error.formErrors
        ) {
          helpers.setErrors(error.formErrors);
        }
        onError?.(error as Error);
        throw error;
      }
    },
  });

  const formMethod =
    formConfig?.method?.toLowerCase() === "get" ? "get" : "post";

  return (
    <Form
      form={form}
      action={formConfig?.endpoint}
      method={formMethod}
      className="w-full"
    >
      <Field name="email">
        {({ field, meta }) => (
          <div className="w-full">
            <div className="relative flex w-full flex-col gap-2 lg:block">
              <TextInput
                {...field}
                type="email"
                placeholder={emailPlaceholder}
                error={meta.touched && !!meta.error}
                className="h-fit bg-background py-4 pr-5 pl-5 lg:pr-55"
                aria-label={emailPlaceholder}
              />
              <div className="top-1/2 right-2.5 lg:absolute lg:-translate-y-1/2">
                <Pressable
                  componentType="button"
                  type="submit"
                  className="w-full rounded-full lg:w-fit"
                  variant="default"
                  asButton
                  disabled={form.isSubmitting}
                >
                  {buttonText}
                  <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
                </Pressable>
              </div>
            </div>
            {meta.touched && meta.error && (
              <p className="py-1 text-sm text-destructive">{meta.error}</p>
            )}
          </div>
        )}
      </Field>
    </Form>
  );
};

interface ResourceCardProps extends ResourceListHeroFilterPost {
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const ResourceCard = ({
  category,
  title,
  thumbnail,
  summary,
  link,
  cta,
  optixFlowConfig,
}: ResourceCardProps) => {
  return (
    <Pressable href={link} className="block h-full w-full">
      <Card className="size-full border py-0">
        <CardContent className="p-0">
          <div className="border-b p-2.5 text-sm leading-[1.2] font-medium text-muted-foreground">
            {category}
          </div>
          <AspectRatio ratio={1.520833333} className="overflow-hidden">
            <Img
              src={thumbnail}
              alt={title}
              className="block size-full object-cover object-center"
              optixFlowConfig={optixFlowConfig}
            />
          </AspectRatio>
          <div className="flex w-full flex-col gap-5 p-5">
            <h2 className="text-lg leading-none font-bold md:text-2xl">
              {title}
            </h2>
            <div className="w-full max-w-[20rem]">
              <p className="text-sm leading-[1.4] font-medium text-foreground">
                {summary}
              </p>
            </div>
            <div>
              <Badge className="rounded-full">
                {cta}
                <DynamicIcon name="lucide/arrow-right" size={14} className="ml-1" />
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Pressable>
  );
};

/**
 * ResourceListHeroFilter - A comprehensive resource listing page with hero section,
 * breadcrumb navigation, email subscription form, featured post card, and filterable
 * resource grid with category checkboxes and load more functionality.
 *
 * Key features:
 * - Hero section with pattern background and breadcrumb navigation
 * - Email subscription form with @page-speed/forms integration
 * - Featured primary post card with image, category, and CTA
 * - Filterable resource grid with category checkboxes
 * - Load more pagination for resource cards
 * - Responsive layout with mobile-first design
 *
 * Ideal for: Resource centers, blog archives, documentation hubs, report libraries,
 * knowledge bases, and content marketing pages that need category filtering and
 * email capture functionality.
 */
export function ResourceListHeroFilter({
  className,
  title = "Explore Reports",
  description = "The best Reports is one that captivates readers with engaging, well-researched content presented in a clear and relatable way.",
  breadcrumb = defaultBreadcrumb,
  primaryPost = defaultPrimaryPost,
  posts = defaultPosts,
  categories = defaultCategories,
  allPostsTitle = "All Reports",
  emailPlaceholder = "What's your work email?",
  buttonText = "See Company in action",
  postsPerPage = 6,
  loadMoreText = "Load More",
  formConfig,
  onSubmit,
  onSuccess,
  onError,
  optixFlowConfig,
}: ResourceListHeroFilterProps) {
  return (
    <section className={cn("pb-32", className)}>
      <div
        className="bg-muted bg-repeat"
        style={{
          backgroundImage: `url('${patternSvgs.dotPattern2}')`,
          backgroundSize: "3.125rem 3.125rem",
        }}
      >
        <div className="container flex flex-col items-start justify-start gap-16 py-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex w-full flex-col justify-between gap-12">
            <div className="flex w-full max-w-xl flex-col gap-8">
              <BreadcrumbBlog breadcrumb={breadcrumb} />
              <div className="flex w-full flex-col gap-5">
                <h1 className="text-[2.5rem] leading-[1.2] font-semibold md:text-5xl lg:text-6xl">
                  {title}
                </h1>
                <p className="text-xl leading-[1.4] font-semibold text-foreground">
                  {description}
                </p>
              </div>
              <div className="max-w-120">
                <EmailForm
                  emailPlaceholder={emailPlaceholder}
                  buttonText={buttonText}
                  formConfig={formConfig}
                  onSubmit={onSubmit}
                  onSuccess={onSuccess}
                  onError={onError}
                />
              </div>
            </div>
          </div>
          <div className="w-full max-w-110">
            <ResourceCard {...primaryPost} optixFlowConfig={optixFlowConfig} />
          </div>
        </div>
      </div>
      <div className="py-20">
        <div className="container flex flex-col gap-8">
          <h2 className="text-[1.75rem] leading-none font-medium md:text-[2.25rem] lg:text-[2rem]">
            {allPostsTitle}
          </h2>
          <div>
            <ResourcesResult
              posts={posts}
              categories={categories}
              postsPerPage={postsPerPage}
              loadMoreText={loadMoreText}
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
