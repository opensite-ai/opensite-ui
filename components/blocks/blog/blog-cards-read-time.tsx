"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  BlogPostItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface BlogCardsReadTimeProps {
  /**
   * Badge/tagline content above heading
   */
  badge?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of blog post configurations
   */
  posts?: BlogPostItem[];
  /**
   * Custom slot for rendering posts (overrides posts array)
   */
  postsSlot?: React.ReactNode;
  /**
   * Action configuration for the "View All" button
   */
  viewAllAction?: ActionConfig;
  /**
   * Custom slot for rendering the view all action (overrides viewAllAction)
   */
  viewAllSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header content wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the posts grid
   */
  postsClassName?: string;
  /**
   * Additional CSS classes for individual post cards
   */
  postCardClassName?: string;
  /**
   * Additional CSS classes for the view all action container
   */
  viewAllClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /** Optional Section ID */
  sectionId?: string;
}

export function BlogCardsReadTime({
  sectionId = "blog-cards-read-time",
  badge,
  heading,
  description,
  posts,
  postsSlot,
  viewAllAction,
  viewAllSlot,
  className,
  containerClassName,
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  postsClassName,
  postCardClassName,
  viewAllClassName,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
}: BlogCardsReadTimeProps): React.JSX.Element {
  const renderedViewAllAction = React.useMemo(() => {
    if (viewAllSlot) return viewAllSlot;
    if (!viewAllAction) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = viewAllAction;
    return (
      <Pressable asButton className={actionClassName} {...pressableProps}>
        {children ?? (
          <>
            {icon !== "" && <DynamicIcon name={icon} />}
            {label}
            {iconAfter !== "" && <DynamicIcon name={iconAfter} />}
          </>
        )}
      </Pressable>
    );
  }, [viewAllSlot, viewAllAction]);

  const renderedPosts = React.useMemo(() => {
    if (postsSlot) return postsSlot;
    if (!posts || posts.length === 0) return null;

    return posts.map((post) => {
      const postHref = post.href || post.url || post.link || "#";
      const postId = post.id || String(post.title) || Math.random().toString();

      return (
        <Pressable
          key={postId}
          className={cn("rounded-xl border", postCardClassName)}
          href={postHref}
        >
          <div className="p-2">
            {post.image && (
              <Img
                src={post.image}
                alt={typeof post.title === "string" ? post.title : "Blog post"}
                className="aspect-video w-full rounded-lg object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            )}
          </div>
          <div className="px-3 pt-2 pb-4">
            {post.title &&
              (typeof post.title === "string" ? (
                <h2 className="mb-1 font-medium">{post.title}</h2>
              ) : (
                <div className="mb-1 font-medium">{post.title}</div>
              ))}
            {(post.summary || post.description) && (
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {post.summary || post.description}
              </p>
            )}
            <Separator className="my-5" />
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-9 rounded-full ring-1 ring-input">
                  {post.authorAvatar && (
                    <AvatarImage
                      src={post.authorAvatar}
                      alt={
                        typeof post.author === "string" ? post.author : "Author"
                      }
                    />
                  )}
                </Avatar>
                {post.author && (
                  <span className="text-sm font-medium">{post.author}</span>
                )}
              </div>
              {post.readTime && (
                <Badge variant="secondary" className="h-fit">
                  {post.readTime}
                </Badge>
              )}
            </div>
          </div>
        </Pressable>
      );
    });
  }, [posts, postsSlot, postCardClassName, optixFlowConfig]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div
          className={cn(
            "mx-auto flex max-w-3xl flex-col items-center gap-4 text-center px-4 md:px-0",
            headerClassName,
          )}
        >
          {badge && (
            <div className={badgeClassName}>
              {typeof badge === "string" ? (
                <Badge variant="outline" className="gap-1">
                  <DynamicIcon
                    name="lucide/file-text"
                    size={16}
                    className="h-full w-4"
                  />{" "}
                  {badge}
                </Badge>
              ) : (
                badge
              )}
            </div>
          )}
          {heading &&
            (typeof heading === "string" ? (
              <h1
                className={cn(
                  "text-4xl font-semibold text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "text-muted-foreground text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>
        <div
          className={cn(
            "mt-6 md:mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3",
            postsClassName,
          )}
        >
          {renderedPosts}
        </div>
        {(viewAllSlot || viewAllAction) && (
          <div className={cn("mt-10 flex justify-center", viewAllClassName)}>
            {renderedViewAllAction}
          </div>
        )}
      </div>
    </Section>
  );
}
