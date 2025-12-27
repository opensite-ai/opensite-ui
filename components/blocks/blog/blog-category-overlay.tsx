"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  href: string;
  image: string;
}

export interface BlogCategoryOverlayProps {
  className?: string;
  tagline?: string;
  title?: string;
  description?: string;
  posts?: BlogPost[];
  viewAllText?: string;
  viewAllHref?: string;
  optixFlowConfig?: { apiKey: string; compression?: number };
}

const defaultPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "How to build a successful brand and business",
    category: "Business",
    date: "September, 23, 2024",
    href: "#",
    image: imagePlaceholders[0],
  },
  {
    id: "post-2",
    title: "The difference between UI and UX",
    category: "Design",
    date: "April, 07, 2024",
    href: "#",
    image: imagePlaceholders[1],
  },
  {
    id: "post-3",
    title: "Optimizing your website for SEO and getting more traffic",
    category: "Marketing",
    date: "August, 31, 2024",
    href: "#",
    image: imagePlaceholders[2],
  },
];

const defaultProps: Partial<BlogCategoryOverlayProps> = {
  tagline: "Articles",
  title: "Discover the latest trends",
  description:
    "Explore our blog for insightful articles, personal reflections and ideas that inspire action on the topics you care about.",
  posts: defaultPosts,
  viewAllText: "View All Blogs",
  viewAllHref: "#",
};

export function BlogCategoryOverlay({
  className,
  tagline = defaultProps.tagline,
  title = defaultProps.title,
  description = defaultProps.description,
  posts = defaultProps.posts,
  viewAllText = defaultProps.viewAllText,
  viewAllHref = defaultProps.viewAllHref,
  optixFlowConfig,
}: BlogCategoryOverlayProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Badge variant="outline">{tagline}</Badge>
          <h1 className="text-4xl font-semibold text-balance">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
          <Pressable
            href={viewAllHref}
            className="flex items-center gap-1 text-sm font-semibold"
          >
            {viewAllText}
            <DynamicIcon name="lucide/chevron-right" size={16} className="h-full w-4" />
          </Pressable>
        </div>
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <div key={post.id} className="flex flex-col">
              <div className="relative">
                <Img
                  src={post.image}
                  alt={post.title}
                  className="aspect-video w-full rounded-lg object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
                <Badge
                  variant="secondary"
                  className="absolute top-4 right-4 bg-background/70 px-3 py-1 text-sm backdrop-blur-sm"
                >
                  {post.category}
                </Badge>
              </div>
              <div className="flex h-full flex-col justify-between p-4">
                <h2 className="mb-5 text-xl font-semibold">{post.title}</h2>
                <div className="flex justify-between gap-6 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <DynamicIcon name="lucide/calendar" size={16} className="h-4 w-4" />
                    {post.date}
                  </span>
                  <Pressable href={post.href} className="flex items-center gap-1">
                    Read more
                    <DynamicIcon name="lucide/chevron-right" size={12} className="h-full w-3" />
                  </Pressable>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
