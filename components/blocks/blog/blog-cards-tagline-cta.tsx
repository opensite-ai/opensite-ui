"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../ui/card";
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

export interface BlogCardsTaglineCtaProps {
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

const defaultProps: Partial<BlogCardsTaglineCtaProps> = {
  tagline: "Latest Updates",
  heading: "Blog Posts",
  description:
    "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
  buttonText: "View all articles",
  buttonUrl: "#",
  posts: defaultPosts,
};

export function BlogCardsTaglineCta({
  tagline = defaultProps.tagline,
  heading = defaultProps.heading,
  description = defaultProps.description,
  buttonText = defaultProps.buttonText,
  buttonUrl = defaultProps.buttonUrl,
  posts = defaultProps.posts,
  className,
  optixFlowConfig,
}: BlogCardsTaglineCtaProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            {tagline}
          </Badge>
          <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
            {description}
          </p>
          <Pressable
            href={buttonUrl}
            variant="link"
            className="w-full sm:w-auto inline-flex items-center"
          >
            {buttonText}
            <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
          </Pressable>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts?.map((post) => (
            <Card
              key={post.id}
              className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0"
            >
              <div className="aspect-16/9 w-full">
                <Pressable
                  href={post.url}
                  className="transition-opacity duration-200 fade-in hover:opacity-70"
                >
                  <Img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover object-center"
                    optixFlowConfig={optixFlowConfig}
                  />
                </Pressable>
              </div>
              <CardHeader>
                <h3 className="text-lg font-semibold hover:underline md:text-xl">
                  <Pressable href={post.url}>{post.title}</Pressable>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.summary}</p>
              </CardContent>
              <CardFooter>
                <Pressable
                  href={post.url}
                  className="flex items-center text-foreground hover:underline"
                >
                  Read more
                  <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
                </Pressable>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
