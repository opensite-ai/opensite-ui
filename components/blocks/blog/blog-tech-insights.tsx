"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface SecondaryPost {
  title: string;
  content: string;
  image?: string;
}

export interface FeaturedPost {
  title: string;
  image: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
}

export interface BlogTechInsightsProps {
  className?: string;
  title?: string;
  description?: string;
  readMoreText?: string;
  readMoreHref?: string;
  featuredPost?: FeaturedPost;
  secondaryPosts?: SecondaryPost[];
  optixFlowConfig?: { apiKey: string; compression?: number };
}

const defaultSecondaryPosts: SecondaryPost[] = [
  {
    title: "Cloud Computing",
    content:
      "Exploring cost-effective cloud migration patterns and multi-cloud management",
    image: imagePlaceholders[5],
  },
  {
    title: "Cybersecurity",
    content:
      "Implementing adaptive security frameworks for distributed workforces",
    image: imagePlaceholders[6],
  },
  {
    title: "IoT",
    content: "Reducing latency in smart city deployments through fog computing",
    image: imagePlaceholders[7],
  },
  {
    title: "Blockchain",
    content:
      "Enterprise applications of distributed ledger technology in supply chains",
    image: imagePlaceholders[8],
  },
];

const defaultFeaturedPost: FeaturedPost = {
  title: "Next-Gen AI: Transforming Business Operations",
  image: imagePlaceholders[4],
  author: "Sarah Johnson",
  authorRole: "AI Researcher",
  authorAvatar: imagePlaceholders[10],
};

const defaultProps: Partial<BlogTechInsightsProps> = {
  title: "Tech Insights",
  description:
    "Exploring cutting-edge technologies shaping tomorrow's digital landscape",
  readMoreText: "Read More",
  readMoreHref: "#",
  featuredPost: defaultFeaturedPost,
  secondaryPosts: defaultSecondaryPosts,
};

export function BlogTechInsights({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  readMoreText = defaultProps.readMoreText,
  readMoreHref = defaultProps.readMoreHref,
  featuredPost = defaultProps.featuredPost,
  secondaryPosts = defaultProps.secondaryPosts,
  optixFlowConfig,
}: BlogTechInsightsProps) {
  return (
    <section className={cn("dark relative bg-background py-32", className)}>
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {title}
          </h1>

          <div className="mt-4 flex justify-start">
            <span className="mt-2 block text-sm text-muted-foreground md:text-base">
              {description}
            </span>
            <Pressable
              href={readMoreHref}
              asButton
              variant="outline"
              className="ml-auto rounded-full border-foreground text-foreground"
            >
              {readMoreText}
              <DynamicIcon name="lucide/arrow-right" size={16} className="h-4 w-4 md:h-6 md:w-6" />
            </Pressable>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {featuredPost && (
            <div className="mb-4">
              <Img
                className="w-full rounded-lg object-cover"
                src={featuredPost.image}
                alt={featuredPost.title}
                optixFlowConfig={optixFlowConfig}
              />
              <div className="mt-4">
                <h1 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
                  {featuredPost.title}
                </h1>
              </div>
              <div className="mt-6 flex items-center gap-3 md:mt-8 md:gap-4">
                <Avatar className="h-8 w-8 rounded-md md:h-12 md:w-12">
                  {featuredPost.authorAvatar && (
                    <AvatarImage src={featuredPost.authorAvatar} />
                  )}
                </Avatar>
                <span className="text-sm md:text-base">
                  <span className="block text-foreground">
                    {featuredPost.author}
                  </span>
                  <span className="text-xs text-muted-foreground md:text-sm">
                    {featuredPost.authorRole}
                  </span>
                </span>
              </div>
            </div>
          )}

          <div className="space-y-6 text-foreground md:space-y-8">
            {secondaryPosts?.map((post, index) => (
              <div
                key={index}
                className="flex items-start gap-4 border-b pb-6 last:border-b-0"
              >
                <div className="w-1/4 shrink-0 md:w-1/5">
                  {post.image && (
                    <Img
                      className="rounded-md"
                      src={post.image}
                      alt={post.title}
                      optixFlowConfig={optixFlowConfig}
                    />
                  )}
                </div>
                <div className="w-3/4 md:w-4/5">
                  <p className="text-sm leading-relaxed md:text-base">
                    {post.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
