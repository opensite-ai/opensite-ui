"use client";

import * as React from "react";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface ResourceListFeaturedArticlesFeaturedPost {
  title: string;
  imageUrl: string;
  link: string;
}

export interface ResourceListFeaturedArticlesArticle {
  date: string;
  category: string;
  title: string;
  link: string;
}

export interface ResourceListFeaturedArticlesProps {
  className?: string;
  featuredPost?: ResourceListFeaturedArticlesFeaturedPost;
  featuredBadgeText?: string;
  featuredButtonText?: string;
  articlesTitle?: string;
  articles?: ResourceListFeaturedArticlesArticle[];
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultFeaturedPost: ResourceListFeaturedArticlesFeaturedPost = {
  title: "How to Build Reusable UI Component Blocks for Beginners",
  imageUrl: blockBrandedIconsAndPlaceholders.placeholder2,
  link: "#",
};

const defaultArticles: ResourceListFeaturedArticlesArticle[] = [
  {
    date: "Jan 02, 2025",
    category: "Design Systems",
    link: "#",
    title: "Mastering Reusable UI Block Patterns in React Applications",
  },
  {
    date: "Jan 03, 2025",
    category: "Best Practices",
    link: "#",
    title: "10 Common Mistakes to Avoid When Building UI Components",
  },
  {
    date: "Jan 04, 2025",
    category: "Components",
    link: "#",
    title: "A Step-by-Step Guide to Creating Flexible Card Blocks",
  },
  {
    date: "Jan 05, 2025",
    category: "Accessibility",
    link: "#",
    title: "Ensuring Accessibility in Custom UI Block Components",
  },
  {
    date: "Jan 06, 2025",
    category: "Performance",
    link: "#",
    title: "How to Optimize UI Blocks for Speed and Efficiency",
  },
  {
    date: "Jan 07, 2025",
    category: "Frameworks",
    link: "#",
    title: "Building Scalable UI Blocks with Tailwind and Headless UI",
  },
  {
    date: "Jan 08, 2025",
    category: "Design Systems",
    link: "#",
    title: "Creating Consistent UI Blocks Across a Shared Design System",
  },
  {
    date: "Jan 09, 2025",
    category: "React",
    link: "#",
    title: "Why React Is the Best Tool for Component-Based UI Blocks",
  },
];

interface FeaturedPostProps {
  title: string;
  imageUrl: string;
  link: string;
  badgeText: string;
  buttonText: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const FeaturedPost = ({
  title,
  imageUrl,
  link,
  badgeText,
  buttonText,
  optixFlowConfig,
}: FeaturedPostProps) => {
  return (
    <div className="flex flex-col justify-between gap-10 rounded-2xl bg-muted p-10 xl:flex-row">
      <div className="basis-full lg:basis-1/2">
        <div className="flex flex-col gap-5">
          <Badge variant="outline" className="w-fit bg-background">
            {badgeText}
          </Badge>
          <h2 className="text-2xl leading-[1.2] font-normal text-foreground md:text-[2.5rem] xl:text-[3.125rem]">
            {title}
          </h2>
          <div>
            <Pressable
              href={link}
              variant="default"
              asButton
              className="group relative mt-5 px-6 transition-all hover:pr-8 hover:pl-4"
            >
              {buttonText}
              <DynamicIcon
                name="lucide/arrow-right"
                size={16}
                className="absolute top-1/2 right-4 -translate-y-1/2 opacity-0 transition-all group-hover:translate-x-1.5 group-hover:opacity-100"
              />
            </Pressable>
          </div>
        </div>
      </div>
      <div className="basis-full lg:basis-1/2">
        <div className="mx-auto aspect-[1.782729805] w-full max-w-160 overflow-hidden rounded-2xl">
          <Img
            src={imageUrl}
            alt={title}
            className="block size-full object-cover object-center"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * ResourceListFeaturedArticles - A clean resource listing with a prominent featured post
 * section and a structured article list showing date, category, and title.
 *
 * Key features:
 * - Featured post card with large image, badge, title, and CTA button
 * - Article list with three-column layout (date, category, title)
 * - Hover effect on article rows for better interactivity
 * - Clean, minimal design with clear visual hierarchy
 * - Responsive layout adapting to different screen sizes
 *
 * Ideal for: Blog archives, resource libraries, documentation indexes,
 * knowledge bases, tutorial collections, and content hubs that want to
 * highlight a featured piece while providing easy access to other articles.
 */
export function ResourceListFeaturedArticles({
  className,
  featuredPost = defaultFeaturedPost,
  featuredBadgeText = "Featured Resource",
  featuredButtonText = "Read more",
  articlesTitle = "Resources",
  articles = defaultArticles,
  optixFlowConfig,
}: ResourceListFeaturedArticlesProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <FeaturedPost
          {...featuredPost}
          badgeText={featuredBadgeText}
          buttonText={featuredButtonText}
          optixFlowConfig={optixFlowConfig}
        />
        <div className="flex w-full flex-col gap-4">
          <h2 className="mt-16 text-xl font-semibold">{articlesTitle}</h2>
          <div>
            {articles.map((article, index) => (
              <Pressable
                href={article.link}
                key={index}
                className="block w-full hover:bg-foreground/10"
              >
                <div className="flex flex-col items-baseline justify-between gap-2 border-t py-6 text-foreground md:flex-row">
                  <div className="basis-1/4 font-medium">{article.date}</div>
                  <div className="basis-1/4">{article.category}</div>
                  <div className="basis-1/2 text-muted-foreground">
                    {article.title}
                  </div>
                </div>
              </Pressable>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
