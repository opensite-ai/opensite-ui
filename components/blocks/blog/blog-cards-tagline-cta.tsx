"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";
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

export interface BlogCardsTaglineCtaProps {
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
   * Action configuration for the main CTA button
   */
  ctaAction?: ActionConfig;
  /**
   * Custom slot for rendering the CTA action (overrides ctaAction)
   */
  ctaSlot?: React.ReactNode;
  /**
   * Array of blog post configurations
   */
  posts?: BlogPostItem[];
  /**
   * Custom slot for rendering posts (overrides posts array)
   */
  postsSlot?: React.ReactNode;
  /**
   * Text for "Read more" links on each post
   */
  readMoreText?: React.ReactNode;
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
   * Additional CSS classes for the CTA action
   */
  ctaClassName?: string;
  /**
   * Additional CSS classes for the posts grid
   */
  postsClassName?: string;
  /**
   * Additional CSS classes for individual post cards
   */
  postCardClassName?: string;
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
}

export function BlogCardsTaglineCta({
  badge,
  heading,
  description,
  ctaAction,
  ctaSlot,
  posts,
  postsSlot,
  readMoreText,
  className,
  containerClassName,
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  ctaClassName,
  postsClassName,
  postCardClassName,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
}: BlogCardsTaglineCtaProps): React.JSX.Element {
  const ctaActionContent = React.useMemo(() => {
    if (ctaSlot) return ctaSlot;
    if (!ctaAction) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = ctaAction;
    return (
      <Pressable
        className={cn(
          "w-full sm:w-auto inline-flex items-center",
          actionClassName,
          ctaClassName,
        )}
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
  }, [ctaSlot, ctaAction, ctaClassName]);

  const postsContent = React.useMemo(() => {
    if (postsSlot) return postsSlot;
    if (!posts || posts.length === 0) return null;

    return posts.map((post) => {
      const postHref = post.href || post.url || post.link || "#";
      const postId = post.id || String(post.title) || Math.random().toString();
      const postTitle =
        typeof post.title === "string" ? post.title : "Blog post";
      const postSummary = post.summary || post.description;

      return (
        <Card
          key={postId}
          className={cn(
            "grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0",
            postCardClassName,
          )}
        >
          {post.image && (
            <div className="aspect-video w-full">
              <Pressable
                href={postHref}
                className="transition-opacity duration-200 fade-in hover:opacity-70"
              >
                <Img
                  src={post.image}
                  alt={postTitle}
                  className="h-full w-full object-cover object-center"
                  optixFlowConfig={optixFlowConfig}
                />
              </Pressable>
            </div>
          )}
          <CardHeader>
            {post.title && (
              <h3 className="text-lg font-semibold hover:underline md:text-xl">
                <Pressable href={postHref}>{post.title}</Pressable>
              </h3>
            )}
          </CardHeader>
          <CardContent>
            {postSummary && (
              <p className="text-muted-foreground">{postSummary}</p>
            )}
          </CardContent>
          <CardFooter>
            {readMoreText && (
              <Pressable
                href={postHref}
                className="flex items-center hover:underline"
              >
                {readMoreText}
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={16}
                  className="ml-2"
                />
              </Pressable>
            )}
          </CardFooter>
        </Card>
      );
    });
  }, [postsSlot, posts, readMoreText, postCardClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div
        className={cn(
          "container mx-auto flex flex-col items-center gap-16 lg:px-16",
          containerClassName,
        )}
      >
        <div
          className={cn(
            "text-center flex flex-col items-center px-4 md:px-0",
            headerClassName,
          )}
        >
          {badge &&
            (typeof badge === "string" ? (
              <Badge variant="secondary" className={cn("mb-6", badgeClassName)}>
                {badge}
              </Badge>
            ) : (
              <div className={cn("mb-6", badgeClassName)}>{badge}</div>
            ))}
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
          {ctaActionContent}
        </div>
        <div
          className={cn(
            "grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8",
            postsClassName,
          )}
        >
          {postsContent}
        </div>
      </div>
    </Section>
  );
}
