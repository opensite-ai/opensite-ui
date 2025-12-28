"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, BlogPostItem, OptixFlowConfig } from "../../../src/types";

export interface BlogTechInsightsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Action configuration for the "Read More" button
   */
  readMoreAction?: ActionConfig;
  /**
   * Custom slot for rendering the read more action (overrides readMoreAction)
   */
  readMoreSlot?: React.ReactNode;
  /**
   * Featured post configuration
   */
  featuredPost?: BlogPostItem;
  /**
   * Custom slot for rendering the featured post (overrides featuredPost)
   */
  featuredSlot?: React.ReactNode;
  /**
   * Array of secondary post configurations
   */
  secondaryPosts?: BlogPostItem[];
  /**
   * Custom slot for rendering secondary posts (overrides secondaryPosts array)
   */
  secondaryPostsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the read more action
   */
  readMoreClassName?: string;
  /**
   * Additional CSS classes for the content grid
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the featured post wrapper
   */
  featuredClassName?: string;
  /**
   * Additional CSS classes for the featured post image
   */
  featuredImageClassName?: string;
  /**
   * Additional CSS classes for the secondary posts container
   */
  secondaryPostsClassName?: string;
  /**
   * Additional CSS classes for individual secondary post items
   */
  secondaryPostItemClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultSecondaryPosts: BlogPostItem[] = [
  {
    title: "Cloud Computing",
    description:
      "Exploring cost-effective cloud migration patterns and multi-cloud management",
    image: imagePlaceholders[5],
  },
  {
    title: "Cybersecurity",
    description:
      "Implementing adaptive security frameworks for distributed workforces",
    image: imagePlaceholders[6],
  },
  {
    title: "IoT",
    description: "Reducing latency in smart city deployments through fog computing",
    image: imagePlaceholders[7],
  },
  {
    title: "Blockchain",
    description:
      "Enterprise applications of distributed ledger technology in supply chains",
    image: imagePlaceholders[8],
  },
];

const defaultFeaturedPost: BlogPostItem = {
  title: "Next-Gen AI: Transforming Business Operations",
  image: imagePlaceholders[4],
  author: "Sarah Johnson",
  authorRole: "AI Researcher",
  authorAvatar: imagePlaceholders[10],
};

const defaultReadMoreAction: ActionConfig = {
  label: "Read More",
  href: "#",
  variant: "outline",
  iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} className="h-4 w-4 md:h-6 md:w-6" />,
};

export function BlogTechInsights({
  heading = "Tech Insights",
  description = "Exploring cutting-edge technologies shaping tomorrow's digital landscape",
  readMoreAction = defaultReadMoreAction,
  readMoreSlot,
  featuredPost = defaultFeaturedPost,
  featuredSlot,
  secondaryPosts = defaultSecondaryPosts,
  secondaryPostsSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  readMoreClassName,
  contentClassName,
  featuredClassName,
  featuredImageClassName,
  secondaryPostsClassName,
  secondaryPostItemClassName,
  optixFlowConfig,
}: BlogTechInsightsProps): React.JSX.Element {
  const renderReadMoreAction = () => {
    if (readMoreSlot) return readMoreSlot;
    if (!readMoreAction) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = readMoreAction;
    return (
      <Pressable
        asButton
        className={cn("ml-auto rounded-full border-foreground text-foreground", actionClassName, readMoreClassName)}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon}
            {label}
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  };

  const renderFeaturedPost = () => {
    if (featuredSlot) return featuredSlot;
    if (!featuredPost) return null;

    return (
      <div className={cn("mb-4", featuredClassName)}>
        {featuredPost.image && (
          <Img
            className={cn("w-full rounded-lg object-cover", featuredImageClassName)}
            src={featuredPost.image}
            alt={typeof featuredPost.title === "string" ? featuredPost.title : "Featured post"}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        <div className="mt-4">
          {featuredPost.title && (
            typeof featuredPost.title === "string" ? (
              <h2 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
                {featuredPost.title}
              </h2>
            ) : (
              <div className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
                {featuredPost.title}
              </div>
            )
          )}
        </div>
        {(featuredPost.author || featuredPost.authorAvatar) && (
          <div className="mt-6 flex items-center gap-3 md:mt-8 md:gap-4">
            <Avatar className="h-8 w-8 rounded-md md:h-12 md:w-12">
              {featuredPost.authorAvatar && (
                <AvatarImage src={featuredPost.authorAvatar} />
              )}
            </Avatar>
            <span className="text-sm md:text-base">
              {featuredPost.author && (
                <span className="block text-foreground">
                  {featuredPost.author}
                </span>
              )}
              {featuredPost.authorRole && (
                <span className="text-xs text-muted-foreground md:text-sm">
                  {featuredPost.authorRole}
                </span>
              )}
            </span>
          </div>
        )}
      </div>
    );
  };

  const renderSecondaryPosts = () => {
    if (secondaryPostsSlot) return secondaryPostsSlot;
    if (!secondaryPosts || secondaryPosts.length === 0) return null;

    return secondaryPosts.map((post) => {
      const postId = post.id || String(post.title) || Math.random().toString();

      return (
        <div
          key={postId}
          className={cn("flex items-start gap-4 border-b pb-6 last:border-b-0", secondaryPostItemClassName)}
        >
          <div className="w-1/4 shrink-0 md:w-1/5">
            {post.image && (
              <Img
                className="rounded-md"
                src={post.image}
                alt={typeof post.title === "string" ? post.title : "Blog post"}
                optixFlowConfig={optixFlowConfig}
              />
            )}
          </div>
          <div className="w-3/4 md:w-4/5">
            {(post.description || post.summary) && (
              <p className="text-sm leading-relaxed md:text-base">
                {post.description || post.summary}
              </p>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <section className={cn("dark relative bg-background py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mb-8", headerClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("text-3xl font-bold text-foreground md:text-4xl lg:text-5xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}

          <div className="mt-4 flex justify-start">
            {description && (
              typeof description === "string" ? (
                <span className={cn("mt-2 block text-sm text-muted-foreground md:text-base", descriptionClassName)}>
                  {description}
                </span>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            {renderReadMoreAction()}
          </div>
        </div>

        <div className={cn("mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12", contentClassName)}>
          {renderFeaturedPost()}

          <div className={cn("space-y-6 text-foreground md:space-y-8", secondaryPostsClassName)}>
            {renderSecondaryPosts()}
          </div>
        </div>
      </div>
    </section>
  );
}
