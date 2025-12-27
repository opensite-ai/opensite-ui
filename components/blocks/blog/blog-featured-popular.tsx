"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Badge } from "../../ui/badge";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

type Category =
  | "Technology"
  | "Business"
  | "Health & Wellness"
  | "Productivity"
  | "Innovation";

export interface BlogPost {
  title: string;
  category: Category | string;
  description: string;
  image: string;
}

export interface BlogFeaturedPopularProps {
  className?: string;
  title?: string;
  description?: string;
  popularTitle?: string;
  posts?: BlogPost[];
  optixFlowConfig?: { apiKey: string; compression?: number };
}

const defaultPosts: BlogPost[] = [
  {
    title: "Exploring the Future of AI in Modern Technology Trends",
    category: "Technology",
    description:
      "Discover how AI is transforming industries and learn about the latest advancements in artificial intelligence. Discover how AI is transforming industries and learn about the latest advancements in artificial intelligence.",
    image: imagePlaceholders[0],
  },
  {
    title: "Strategies for Effective Business Growth in 2025",
    category: "Business",
    description:
      "Learn proven strategies to grow your business and stay competitive in the ever-evolving market landscape.",
    image: imagePlaceholders[1],
  },
  {
    title: "Top Wellness Trends to Improve Your Health in 2025",
    category: "Health & Wellness",
    description:
      "Explore the top wellness trends that can help you achieve a healthier and more balanced lifestyle.",
    image: imagePlaceholders[2],
  },
  {
    title: "Boosting Productivity with Smart Tools and Techniques",
    category: "Productivity",
    description:
      "Find out how to enhance your productivity using the latest tools and techniques for better time management.",
    image: imagePlaceholders[3],
  },
];

const defaultProps: Partial<BlogFeaturedPopularProps> = {
  title: "Insights and Trends Blog",
  description:
    "Stay updated with the latest insights, trends, and tips across various topics to keep ahead of the curve.",
  popularTitle: "Popular Posts",
  posts: defaultPosts,
};

export function BlogFeaturedPopular({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  popularTitle = defaultProps.popularTitle,
  posts = defaultProps.posts,
  optixFlowConfig,
}: BlogFeaturedPopularProps) {
  const featuredPost = posts?.[0];
  const popularPosts = posts?.slice(1);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-medium md:text-6xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="mx-auto max-w-7xl">
          {featuredPost && (
            <div className="my-16 grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-16">
              <Img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="aspect-video rounded-lg object-cover"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="flex flex-col items-start gap-4">
                <Badge variant="secondary" className="shrink">
                  {featuredPost.category}
                </Badge>
                <h2 className="text-2xl font-semibold text-balance md:max-w-lg lg:text-3xl">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground md:max-w-lg">
                  {featuredPost.description}
                </p>
              </div>
            </div>
          )}
          <p className="text-2xl font-medium md:text-3xl">{popularTitle}</p>
          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
            {popularPosts?.map((post) => (
              <div key={post.title} className="flex flex-col items-start gap-4">
                <Img
                  src={post.image}
                  alt={post.title}
                  className="aspect-video rounded-lg object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
                <Badge variant="secondary" className="shrink">
                  {post.category}
                </Badge>
                <h3 className="text-xl font-semibold text-balance md:max-w-md">
                  {post.title}
                </h3>
                <p className="text-muted-foreground md:max-w-md">
                  {post.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
