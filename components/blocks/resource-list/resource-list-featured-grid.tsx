"use client";

import * as React from "react";
import { useState } from "react";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface ResourceListFeaturedGridArticle {
  title: string;
  category: string;
  date: string;
  author: string[];
  link: string;
}

export interface ResourceListFeaturedGridFeaturedArticle {
  title: string;
  imageUrl: string;
  date: string;
  authors: string[];
  link: string;
  badge?: string;
}

export interface ResourceListFeaturedGridProps {
  className?: string;
  title?: string;
  description?: string;
  featuredArticle?: ResourceListFeaturedGridFeaturedArticle;
  secondaryArticles?: ResourceListFeaturedGridFeaturedArticle[];
  articles?: ResourceListFeaturedGridArticle[];
  categories?: string[];
  latestUpdatesTitle?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultCategories = ["All", "Data", "AI", "Security", "News"];

const defaultFeaturedArticle: ResourceListFeaturedGridFeaturedArticle = {
  title: "Getting Started With Modern Digital Platforms and Infrastructure",
  imageUrl: blockBrandedIconsAndPlaceholders.placeholderDark1,
  date: "Dec 4, 2024",
  authors: [
    blockBrandedIconsAndPlaceholders.avatar1,
    blockBrandedIconsAndPlaceholders.avatar2,
    blockBrandedIconsAndPlaceholders.avatar3,
  ],
  link: "#",
  badge: "Featured Article",
};

const defaultSecondaryArticles: ResourceListFeaturedGridFeaturedArticle[] = [
  {
    title: "Streamlining Business Operations Through Effective Workflow Automation",
    imageUrl: blockBrandedIconsAndPlaceholders.placeholderDark2,
    date: "Feb 12, 2024",
    authors: [blockBrandedIconsAndPlaceholders.avatar1],
    link: "#",
    badge: "Latest",
  },
  {
    title: "Boosting Overall Efficiency: How We Significantly Improved Search Performance",
    imageUrl: blockBrandedIconsAndPlaceholders.placeholderDark3,
    date: "Apr 1, 2025",
    authors: [blockBrandedIconsAndPlaceholders.avatar1],
    link: "#",
    badge: "Latest",
  },
];

const defaultArticles: ResourceListFeaturedGridArticle[] = [
  {
    title: "Exploring the Depths of Modern Data Analytics Techniques and Applications",
    category: "Data",
    date: "Dec 4, 2024",
    author: [
      blockBrandedIconsAndPlaceholders.avatar1,
      blockBrandedIconsAndPlaceholders.avatar2,
      blockBrandedIconsAndPlaceholders.avatar3,
    ],
    link: "#",
  },
  {
    title: "Navigating the Complex Landscape of Artificial Intelligence and Advanced Machine Learning",
    category: "AI",
    date: "Dec 3, 2024",
    author: [
      blockBrandedIconsAndPlaceholders.avatar2,
      blockBrandedIconsAndPlaceholders.avatar3,
    ],
    link: "#",
  },
  {
    title: "Fortifying Digital Defenses: Implementing Advanced Cybersecurity Strategies for Modern Enterprises",
    category: "Security",
    date: "Dec 2, 2024",
    author: [
      blockBrandedIconsAndPlaceholders.avatar1,
      blockBrandedIconsAndPlaceholders.avatar3,
    ],
    link: "#",
  },
  {
    title: "Understanding and Exploring Distributed Computing Architectures and Concepts",
    category: "Data",
    date: "Dec 1, 2024",
    author: [blockBrandedIconsAndPlaceholders.avatar2],
    link: "#",
  },
  {
    title: "Recent Significant Scientific Breakthroughs in Advanced Quantum Technology Research",
    category: "News",
    date: "Nov 30, 2024",
    author: [
      blockBrandedIconsAndPlaceholders.avatar1,
      blockBrandedIconsAndPlaceholders.avatar2,
    ],
    link: "#",
  },
  {
    title: "Applying Practical Machine Learning Techniques in Real-World Business Scenarios and Use Cases",
    category: "AI",
    date: "Nov 29, 2024",
    author: [
      blockBrandedIconsAndPlaceholders.avatar3,
      blockBrandedIconsAndPlaceholders.avatar1,
    ],
    link: "#",
  },
];

/**
 * ResourceListFeaturedGrid - A visually rich resource listing with featured article hero,
 * secondary article cards, and a tabbed category filter for browsing articles.
 *
 * Key features:
 * - Large featured article with image overlay, badge, and author avatars
 * - Two secondary article cards with grayscale-to-color hover effect
 * - Tabbed category filtering (All, Data, AI, Security, News, etc.)
 * - Article list with title, category, date, and author avatars
 * - Responsive grid layout with hover animations
 *
 * Ideal for: Resource centers, whitepapers libraries, research publications,
 * tech blogs, news portals, and content hubs that want to highlight featured
 * content while providing easy category-based navigation.
 */
export function ResourceListFeaturedGrid({
  className,
  title = "Resources & Whitepapers",
  description = "Explore our thoughts and perspectives on key topics.",
  featuredArticle = defaultFeaturedArticle,
  secondaryArticles = defaultSecondaryArticles,
  articles = defaultArticles,
  categories = defaultCategories,
  latestUpdatesTitle = "Latest updates",
  optixFlowConfig,
}: ResourceListFeaturedGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = articles.filter(
    (article) =>
      selectedCategory === "All" || article.category === selectedCategory
  );

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="text-4xl font-medium sm:text-6xl md:text-7xl">
          {title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-12">
          <Pressable
            href={featuredArticle.link}
            className="group relative isolate overflow-hidden rounded-2xl border border-border transition-transform duration-300 hover:-translate-y-0.5 lg:col-span-7 lg:row-span-2"
          >
            <Img
              src={featuredArticle.imageUrl}
              alt={featuredArticle.title}
              className="size-full max-h-[550px] object-cover grayscale-100 transition-all duration-300 group-hover:grayscale-50"
              optixFlowConfig={optixFlowConfig}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
              {featuredArticle.badge && (
                <Badge className="w-fit border border-background/20 bg-background/15 backdrop-blur-sm">
                  <DynamicIcon name="lucide/sparkles" size={16} className="mr-1" />
                  {featuredArticle.badge}
                </Badge>
              )}
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-medium text-background">
                  {featuredArticle.title}
                </h2>
                <div className="flex items-center gap-2">
                  <time className="text-sm text-background/80">
                    {featuredArticle.date}
                  </time>
                  <div className="flex items-center -space-x-2">
                    {featuredArticle.authors.map((author, idx) => (
                      <Avatar key={idx} className="size-6 border border-primary">
                        <AvatarImage src={author} />
                      </Avatar>
                    ))}
                    {featuredArticle.authors.length > 2 && (
                      <span className="z-10 grid size-6 place-items-center rounded-full border border-primary bg-primary/90 text-xs text-background backdrop-blur-sm">
                        +{featuredArticle.authors.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Pressable>
          <div className="flex flex-col gap-4 lg:col-span-5 lg:row-span-2 lg:flex-col">
            {secondaryArticles.map((article, idx) => (
              <Pressable
                key={idx}
                href={article.link}
                className="group relative isolate overflow-hidden rounded-2xl border border-border transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Img
                  src={article.imageUrl}
                  alt={article.title}
                  className="size-full max-h-[267px] object-cover grayscale-100 transition-all duration-300 group-hover:grayscale-50"
                  optixFlowConfig={optixFlowConfig}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent" />
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
                  {article.badge && (
                    <Badge className="w-fit border border-background/20 bg-background/15 backdrop-blur-sm">
                      {article.badge}
                    </Badge>
                  )}
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-medium text-background">
                      {article.title}
                    </h2>
                    <div className="flex items-center gap-2">
                      <time className="text-sm text-background/80">
                        {article.date}
                      </time>
                      {article.authors.map((author, authorIdx) => (
                        <Avatar key={authorIdx} className="size-6 border border-primary">
                          <AvatarImage src={author} />
                        </Avatar>
                      ))}
                    </div>
                  </div>
                </div>
              </Pressable>
            ))}
          </div>
        </div>
        <div className="mt-24">
          <h2 className="mb-6 text-2xl font-medium md:text-3xl">
            {latestUpdatesTitle}
          </h2>
          <Tabs
            defaultValue="All"
            className="border-b border-border"
            onValueChange={setSelectedCategory}
          >
            <TabsList className="flex h-auto gap-2 bg-background p-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="group relative py-2.5 uppercase data-[state=active]:shadow-none"
                >
                  {category}
                  <span className="absolute -bottom-px group-data-[state=active]:h-px group-data-[state=active]:w-full group-data-[state=active]:bg-primary" />
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="mt-4">
            {filteredArticles.map((article, idx) => (
              <Pressable
                key={idx}
                href={article.link}
                className="flex flex-col justify-between gap-4 border-b border-border py-6 md:flex-row"
              >
                <h3 className="font-medium md:line-clamp-1">{article.title}</h3>
                <div className="flex w-full shrink-0 grid-cols-3 justify-between gap-2 md:grid md:max-w-80">
                  <p className="text-sm text-muted-foreground">
                    {article.category}
                  </p>
                  <time className="text-sm text-muted-foreground">
                    {article.date}
                  </time>
                  <div className="hidden items-center justify-end -space-x-2 md:flex">
                    {article.author.map((author, authorIdx) => (
                      <Avatar key={authorIdx} className="size-6 border border-border">
                        <AvatarImage src={author} />
                      </Avatar>
                    ))}
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
