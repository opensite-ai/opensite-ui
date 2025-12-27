"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  authorAvatar?: string;
  authorInitials?: string;
  published: string;
  href: string;
  image: string;
}

export interface BlogGridAuthorCardsProps {
  className?: string;
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
    title: "The Future of Web Development: What's Next in 2024",
    summary:
      "Explore the latest trends in web development, from AI-powered tools to new frameworks that are reshaping how we build the web. Discover what developers need to know to stay ahead.",
    label: "Web Development",
    author: "Sarah Chen",
    authorInitials: "SC",
    published: "15 Jan 2024",
    href: "#",
    image: imagePlaceholders[0],
  },
  {
    id: "post-2",
    title: "Building Scalable APIs with Modern Architecture Patterns",
    summary:
      "Learn about microservices, GraphQL, and event-driven architectures that are powering today's most successful applications. Practical insights for building robust APIs.",
    label: "Backend",
    author: "Marcus Rodriguez",
    authorInitials: "MR",
    published: "12 Jan 2024",
    href: "#",
    image: imagePlaceholders[1],
  },
  {
    id: "post-3",
    title: "Design Systems: Creating Consistency at Scale",
    summary:
      "How leading companies are implementing design systems to maintain visual consistency across products while enabling rapid development and innovation.",
    label: "Design",
    author: "Emma Thompson",
    authorInitials: "ET",
    published: "10 Jan 2024",
    href: "#",
    image: imagePlaceholders[2],
  },
];

const defaultProps: Partial<BlogGridAuthorCardsProps> = {
  title: "Blog",
  description: "Insights, tutorials, and thoughts on modern software development",
  posts: defaultPosts,
  viewAllText: "View all posts",
  viewAllHref: "#",
};

export function BlogGridAuthorCards({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  posts = defaultProps.posts,
  viewAllText = defaultProps.viewAllText,
  viewAllHref = defaultProps.viewAllHref,
  optixFlowConfig,
}: BlogGridAuthorCardsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-8 md:mb-14 lg:mb-16">
          <div className="flex items-start justify-between gap-8">
            <div>
              <h2 className="mb-4 w-full text-4xl font-medium md:mb-5 md:text-5xl lg:mb-6 lg:text-6xl">
                {title}
              </h2>
            </div>
          </div>
          <p>{description}</p>
        </div>
        <div className="grid gap-x-4 gap-y-8 md:grid-cols-2 lg:gap-x-6 lg:gap-y-12 2xl:grid-cols-3">
          {posts?.map((post) => (
            <Pressable
              key={post.id}
              href={post.href}
              className="group flex flex-col"
            >
              <div className="mb-4 flex overflow-clip rounded-xl md:mb-5">
                <div className="transition-opacity duration-300 group-hover:opacity-80">
                  <Img
                    src={post.image}
                    alt={post.title}
                    className="aspect-3/2 h-full w-full object-cover object-center"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </div>

              <div>
                <Badge variant="secondary">{post.label}</Badge>
              </div>
              <div className="mb-2 line-clamp-3 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-2xl lg:pt-4 lg:text-3xl">
                {post.title}
              </div>
              <div className="mb-4 line-clamp-2 text-sm text-muted-foreground md:mb-5 md:text-base">
                {post.summary}
              </div>
              <div className="flex items-center gap-2">
                <Avatar className="size-12">
                  {post.authorAvatar && <AvatarImage src={post.authorAvatar} />}
                  <AvatarFallback>{post.authorInitials || post.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-px">
                  <span className="text-xs font-medium">{post.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {post.published}
                  </span>
                </div>
              </div>
            </Pressable>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center py-2 md:hidden">
          <Pressable
            href={viewAllHref}
            asButton
            className="w-full sm:w-fit"
          >
            {viewAllText}
          </Pressable>
        </div>
      </div>
    </section>
  );
}
