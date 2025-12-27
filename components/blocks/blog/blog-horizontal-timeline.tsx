"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Card, CardContent } from "../../ui/card";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}

export interface BlogHorizontalTimelineProps {
  className?: string;
  title?: string;
  posts?: BlogPost[];
  readText?: string;
  optixFlowConfig?: { apiKey: string; compression?: number };
}

const defaultPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development",
    date: "3rd Dec 2024",
    description:
      "Exploring the latest trends in frontend and backend technologies, including AI-powered coding tools and modern frameworks.",
    image: imagePlaceholders[0],
    imageAlt: "Developer working on code",
    href: "#",
  },
  {
    id: 2,
    title: "Mastering React Performance Optimization",
    date: "5th Dec 2024",
    description:
      "A deep dive into memoization, lazy loading, and efficient state management techniques for faster React applications.",
    image: imagePlaceholders[1],
    imageAlt: "Code on screen",
    href: "#",
  },
  {
    id: 3,
    title: "UI/UX Design Principles for 2025",
    date: "10th Dec 2024",
    description:
      "Key strategies for creating intuitive, beautiful interfaces that delight users and drive engagement in the coming year.",
    image: imagePlaceholders[2],
    imageAlt: "UI/UX design sketches on paper",
    href: "#",
  },
];

const defaultProps: Partial<BlogHorizontalTimelineProps> = {
  title: "Discover Our Fresh Content",
  posts: defaultPosts,
  readText: "Read",
};

export function BlogHorizontalTimeline({
  className,
  title = defaultProps.title,
  posts = defaultProps.posts,
  readText = defaultProps.readText,
  optixFlowConfig,
}: BlogHorizontalTimelineProps) {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <h1 className="mb-12 max-w-lg font-sans text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
          {title}
        </h1>

        <div className="flex flex-col">
          {posts?.map((post, index) => (
            <div
              key={post.id}
              className="flex flex-col items-center gap-16 md:flex-row"
            >
              <div className="flex h-80 w-full items-center justify-center overflow-hidden rounded-3xl bg-muted md:w-140">
                <Img
                  src={post.image}
                  className="h-full w-full object-cover"
                  alt={post.imageAlt}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <Card className="border-none shadow-none">
                <CardContent className="p-0">
                  <div
                    className={cn(
                      "mb-5 flex h-90 items-start border-b py-10 md:mb-0 lg:gap-32",
                      index === 0 && "md:border-t"
                    )}
                  >
                    <div className="flex h-full w-full flex-col items-start justify-between pr-8">
                      <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
                        {post.date}
                      </p>
                    </div>
                    <div className="flex h-full w-full flex-col items-start justify-between gap-6">
                      <p className="text-lg leading-relaxed font-normal tracking-tight text-muted-foreground md:text-xl">
                        {post.description}
                      </p>
                      <Pressable
                        href={post.href}
                        variant="ghost"
                        className="inline-flex items-center justify-center gap-4 px-0 text-primary transition-all ease-in-out hover:gap-6 hover:text-accent-foreground"
                      >
                        <span className="text-lg font-semibold tracking-tight">
                          {readText}
                        </span>
                        <DynamicIcon name="lucide/arrow-right" size={20} />
                      </Pressable>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
