"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  author: string;
  authorAvatar?: string;
  readTime: string;
  href: string;
  image: string;
}

export interface BlogCardsReadTimeProps {
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
    title: "How to build a successful brand and business online in 2024",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "John Doe",
    authorAvatar: imagePlaceholders[10],
    readTime: "10 Min Read",
    href: "#",
    image: imagePlaceholders[0],
  },
  {
    id: "post-2",
    title: "The difference between UI and UX and how to design for both",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Jane Doe",
    authorAvatar: imagePlaceholders[11],
    readTime: "14 Min Read",
    href: "#",
    image: imagePlaceholders[1],
  },
  {
    id: "post-3",
    title: "Optimizing your website for SEO and getting more traffic",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Jane Smith",
    authorAvatar: imagePlaceholders[12],
    readTime: "9 Min Read",
    href: "#",
    image: imagePlaceholders[2],
  },
];

const defaultProps: Partial<BlogCardsReadTimeProps> = {
  tagline: "Our Blogs",
  title: "Discover the latest trends",
  description:
    "Explore our blog for insightful articles, personal reflections and ideas that inspire action on the topics you care about.",
  posts: defaultPosts,
  viewAllText: "View All Blogs",
  viewAllHref: "#",
};

export function BlogCardsReadTime({
  className,
  tagline = defaultProps.tagline,
  title = defaultProps.title,
  description = defaultProps.description,
  posts = defaultProps.posts,
  viewAllText = defaultProps.viewAllText,
  viewAllHref = defaultProps.viewAllHref,
  optixFlowConfig,
}: BlogCardsReadTimeProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <Badge variant="outline" className="gap-1 py-1">
            <DynamicIcon name="lucide/file-text" size={16} className="h-full w-4" /> {tagline}
          </Badge>
          <h1 className="text-4xl font-semibold text-balance">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts?.map((post) => (
            <Pressable key={post.id} className="rounded-xl border" href={post.href}>
              <div className="p-2">
                <Img
                  src={post.image}
                  alt={post.title}
                  className="aspect-video w-full rounded-lg object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <div className="px-3 pt-2 pb-4">
                <h2 className="mb-1 font-medium">{post.title}</h2>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {post.summary}
                </p>
                <Separator className="my-5" />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9 rounded-full ring-1 ring-input">
                      {post.authorAvatar && (
                        <AvatarImage src={post.authorAvatar} alt={post.author} />
                      )}
                    </Avatar>
                    <span className="text-sm font-medium">{post.author}</span>
                  </div>
                  <Badge variant="secondary" className="h-fit">
                    {post.readTime}
                  </Badge>
                </div>
              </div>
            </Pressable>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Pressable href={viewAllHref} asButton variant="outline">
            {viewAllText} <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2 h-full w-4" />
          </Pressable>
        </div>
      </div>
    </section>
  );
}
