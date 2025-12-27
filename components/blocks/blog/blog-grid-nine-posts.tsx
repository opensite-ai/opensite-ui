"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  authorAvatar?: string;
  published: string;
  href: string;
  image: string;
}

export interface BlogGridNinePostsProps {
  className?: string;
  title?: string;
  description?: string;
  posts?: BlogPost[];
  ctaText?: string;
  ctaHref?: string;
  optixFlowConfig?: { apiKey: string; compression?: number };
}

const defaultPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "The Future of Web Development: What's Next in 2024",
    summary:
      "Explore the latest trends in web development, from AI-powered tools to new frameworks that are reshaping how we build the web.",
    label: "Web Development",
    author: "Sarah Chen",
    published: "15 Jan 2024",
    href: "#",
    image: imagePlaceholders[0],
  },
  {
    id: "post-2",
    title: "Building Scalable APIs with Modern Architecture Patterns",
    summary:
      "Learn about microservices, GraphQL, and event-driven architectures that are powering today's most successful applications.",
    label: "Backend",
    author: "Marcus Rodriguez",
    published: "12 Jan 2024",
    href: "#",
    image: imagePlaceholders[1],
  },
  {
    id: "post-3",
    title: "Design Systems: Creating Consistency at Scale",
    summary:
      "How leading companies are implementing design systems to maintain visual consistency across products.",
    label: "Design",
    author: "Emma Thompson",
    published: "10 Jan 2024",
    href: "#",
    image: imagePlaceholders[2],
  },
  {
    id: "post-4",
    title: "Machine Learning in Production: Best Practices for Deployment",
    summary:
      "From model versioning to monitoring and scaling, learn the essential practices for deploying ML models.",
    label: "Machine Learning",
    author: "Alex Kim",
    published: "8 Jan 2024",
    href: "#",
    image: imagePlaceholders[3],
  },
  {
    id: "post-5",
    title: "The Rise of Edge Computing: Transforming Application Architecture",
    summary:
      "Discover how edge computing is revolutionizing application performance and user experience.",
    label: "Cloud Computing",
    author: "David Park",
    published: "5 Jan 2024",
    href: "#",
    image: imagePlaceholders[4],
  },
  {
    id: "post-6",
    title: "Cybersecurity Essentials for Modern Applications",
    summary:
      "Essential security practices every developer should implement, from authentication to encryption.",
    label: "Security",
    author: "Lisa Wang",
    published: "3 Jan 2024",
    href: "#",
    image: imagePlaceholders[5],
  },
  {
    id: "post-7",
    title: "Performance Optimization: Techniques for Faster Web Applications",
    summary:
      "Advanced techniques for optimizing web application performance, including code splitting and caching.",
    label: "Performance",
    author: "James Wilson",
    published: "1 Jan 2024",
    href: "#",
    image: imagePlaceholders[6],
  },
  {
    id: "post-8",
    title: "DevOps Culture: Building Better Software Delivery Pipelines",
    summary:
      "How to foster a DevOps culture and implement CI/CD pipelines that accelerate development.",
    label: "DevOps",
    author: "Maria Garcia",
    published: "29 Dec 2023",
    href: "#",
    image: imagePlaceholders[7],
  },
  {
    id: "post-9",
    title: "Mobile App Development: Native vs Cross-Platform Solutions",
    summary:
      "Compare native and cross-platform development approaches, exploring trade-offs and best practices.",
    label: "Mobile Development",
    author: "Ryan Johnson",
    published: "27 Dec 2023",
    href: "#",
    image: imagePlaceholders[8],
  },
];

const defaultProps: Partial<BlogGridNinePostsProps> = {
  title: "Blog",
  description: "Insights, tutorials, and thoughts on modern software development",
  posts: defaultPosts,
  ctaText: "View all posts",
  ctaHref: "#",
};

export function BlogGridNinePosts({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  posts = defaultProps.posts,
  ctaText = defaultProps.ctaText,
  ctaHref = defaultProps.ctaHref,
  optixFlowConfig,
}: BlogGridNinePostsProps) {
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
                  <AvatarFallback>
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
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
          <Pressable asButton className="w-full sm:w-fit" href={ctaHref}>
            {ctaText}
          </Pressable>
        </div>
      </div>
    </section>
  );
}
