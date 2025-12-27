"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

export interface BlogHorizontalCardsProps {
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  posts?: BlogPost[];
  className?: string;
  optixFlowConfig?: { apiKey: string; compression?: number };
}

const defaultPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Getting Started with Opensite AI Components",
    summary:
      "Learn how to quickly integrate and customize Opensite AI components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
    label: "Tutorial",
    author: "Sarah Chen",
    published: "1 Jan 2024",
    url: "#",
    image: imagePlaceholders[0],
  },
  {
    id: "post-2",
    title: "Building Accessible Web Applications",
    summary:
      "Explore how to create inclusive web experiences using accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
    label: "Accessibility",
    author: "Marcus Rodriguez",
    published: "1 Jan 2024",
    url: "#",
    image: imagePlaceholders[1],
  },
  {
    id: "post-3",
    title: "Modern Design Systems with Tailwind CSS",
    summary:
      "Dive into creating scalable design systems using Tailwind CSS. Learn how to maintain consistency while building flexible and maintainable component libraries.",
    label: "Design Systems",
    author: "Emma Thompson",
    published: "1 Jan 2024",
    url: "#",
    image: imagePlaceholders[2],
  },
];

const defaultProps: Partial<BlogHorizontalCardsProps> = {
  tagline: "Latest Updates",
  heading: "Blog Posts",
  description:
    "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
  buttonText: "View all articles",
  buttonUrl: "#",
  posts: defaultPosts,
};

export function BlogHorizontalCards({
  tagline = defaultProps.tagline,
  heading = defaultProps.heading,
  description = defaultProps.description,
  buttonText = defaultProps.buttonText,
  buttonUrl = defaultProps.buttonUrl,
  posts = defaultProps.posts,
  className,
  optixFlowConfig,
}: BlogHorizontalCardsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-6">
            {tagline}
          </Badge>
          <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-5xl lg:mb-6">
            {heading}
          </h2>
          <p className="mb-12 text-muted-foreground md:text-base lg:text-lg">
            {description}
          </p>
        </div>

        <div className="mx-auto max-w-5xl space-y-12">
          {posts?.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden border-0 bg-transparent shadow-none"
            >
              <div className="flex flex-col gap-6 sm:flex-row">
                <div className="shrink-0">
                  <Pressable
                    href={post.url}
                    className="block transition-opacity duration-200 hover:opacity-90"
                  >
                    <Img
                      src={post.image}
                      alt={post.title}
                      className="aspect-16/9 w-full rounded-lg object-cover object-center sm:w-[260px]"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </Pressable>
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge variant="secondary">{post.label}</Badge>
                    <span>{post.author}</span>
                    <span>{post.published}</span>
                  </div>
                  <h3 className="text-xl leading-tight font-bold lg:text-2xl">
                    <Pressable href={post.url} className="hover:underline">
                      {post.title}
                    </Pressable>
                  </h3>
                  <p className="text-base text-muted-foreground">
                    {post.summary}
                  </p>
                  <Pressable
                    href={post.url}
                    className="inline-flex items-center text-primary hover:underline"
                  >
                    Read more
                    <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2 size-4" />
                  </Pressable>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Pressable
            href={buttonUrl}
            asButton
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            {buttonText}
            <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2 size-4" />
          </Pressable>
        </div>
      </div>
    </section>
  );
}
