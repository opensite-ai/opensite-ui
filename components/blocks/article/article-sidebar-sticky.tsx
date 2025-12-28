"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { OptixFlowConfig } from "../../../src/types";

export interface ArticleSidebarStickyProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the article content
   */
  articleClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the author info
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the hero image
   */
  heroImageClassName?: string;
  /**
   * Additional CSS classes for the back link
   */
  backLinkClassName?: string;
  /**
   * Back link href
   */
  backHref?: string;
  /**
   * Back link text
   */
  backText?: React.ReactNode;
  /**
   * Back link icon (defaults to chevron-left)
   */
  backIcon?: React.ReactNode;
  /**
   * Custom slot for back link (overrides backHref, backText, backIcon)
   */
  backLinkSlot?: React.ReactNode;
  /**
   * Article title
   */
  title?: React.ReactNode;
  /**
   * Author name
   */
  authorName?: string;
  /**
   * Author image URL
   */
  authorImage?: string;
  /**
   * Author profile href
   */
  authorHref?: string;
  /**
   * Publish date string
   */
  publishDate?: React.ReactNode;
  /**
   * Custom slot for author info (overrides author props)
   */
  authorSlot?: React.ReactNode;
  /**
   * Hero image source URL
   */
  heroImageSrc?: string;
  /**
   * Hero image alt text
   */
  heroImageAlt?: string;
  /**
   * Custom slot for hero media (overrides heroImageSrc)
   */
  heroMediaSlot?: React.ReactNode;
  /**
   * Article body content (replaces hardcoded prose)
   */
  children?: React.ReactNode;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultArticleContent = (optixFlowConfig?: OptixFlowConfig) => (
  <>
    <p className="lead">
      In the ever-evolving landscape of web development, staying current
      with best practices and emerging technologies is crucial for
      building exceptional digital experiences.
    </p>
    <h2>Understanding the Fundamentals</h2>
    <p>
      Before diving into advanced concepts, it&apos;s essential to have
      a solid grasp of the fundamentals. HTML, CSS, and JavaScript form
      the backbone of web development, and mastering these technologies
      opens doors to more complex frameworks and tools.
    </p>
    <p>
      Modern web development has evolved significantly over the past
      decade. What once required extensive server-side rendering can now
      be accomplished with client-side frameworks that offer improved
      performance and user experience.
    </p>
    <h2>The Rise of Component-Based Architecture</h2>
    <p>
      Component-based architecture has revolutionized how we build web
      applications. By breaking down interfaces into reusable,
      self-contained components, developers can create more maintainable
      and scalable codebases.
    </p>
    <blockquote>
      &ldquo;The best code is no code at all. Every new line of code you
      willingly bring into the world is code that has to be debugged,
      code that has to be read and understood.&rdquo;
    </blockquote>
    <h2>Performance Optimization</h2>
    <p>
      Performance is no longer optional—it&apos;s a critical factor in
      user experience and search engine rankings. Techniques like code
      splitting, lazy loading, and image optimization have become
      standard practices in modern web development.
    </p>
    <Img
      src={imagePlaceholders[3]}
      alt="Performance optimization illustration"
      className="my-8 aspect-video w-full rounded-lg object-cover"
      optixFlowConfig={optixFlowConfig}
    />
    <h2>Looking Ahead</h2>
    <p>
      The future of web development is exciting, with emerging
      technologies like WebAssembly, Edge Computing, and AI-powered
      development tools reshaping how we build for the web. Staying
      curious and continuously learning will be key to thriving in this
      dynamic field.
    </p>
  </>
);

export function ArticleSidebarStickyComponent({
  className,
  containerClassName,
  sidebarClassName,
  articleClassName,
  titleClassName,
  authorClassName,
  heroImageClassName,
  backLinkClassName,
  backHref = "#",
  backText = "Back to Blog",
  backIcon,
  backLinkSlot,
  title = "The Art of Modern Web Development",
  authorName = "Sarah Johnson",
  authorImage = imagePlaceholders[10],
  authorHref,
  publishDate = "December 15, 2024",
  authorSlot,
  heroImageSrc = imagePlaceholders[2],
  heroImageAlt = "Article featured image",
  heroMediaSlot,
  children,
  optixFlowConfig,
}: ArticleSidebarStickyProps) {
  const renderBackLink = () => {
    if (backLinkSlot) return backLinkSlot;

    return (
      <Pressable
        href={backHref}
        className={cn("inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground", backLinkClassName)}
      >
        {backIcon ?? <DynamicIcon name="lucide/chevron-left" size={16} />}
        {backText}
      </Pressable>
    );
  };

  const renderAuthor = (isMobile = false) => {
    if (authorSlot) return authorSlot;
    if (!authorName) return null;

    const avatarSize = isMobile ? "h-8 w-8" : "h-10 w-10";

    return (
      <div className={cn("flex items-center gap-3", authorClassName)}>
        <Avatar className={avatarSize}>
          <AvatarImage src={authorImage} />
          <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          {authorHref ? (
            <Pressable href={authorHref} className="text-sm font-medium hover:underline">
              {authorName}
            </Pressable>
          ) : (
            <p className="text-sm font-medium">{authorName}</p>
          )}
          {publishDate && (
            <p className="text-xs text-muted-foreground">{publishDate}</p>
          )}
        </div>
      </div>
    );
  };

  const renderHeroMedia = () => {
    if (heroMediaSlot) return heroMediaSlot;
    if (!heroImageSrc) return null;

    return (
      <Img
        src={heroImageSrc}
        alt={heroImageAlt}
        className={cn("my-8 aspect-video w-full rounded-lg object-cover", heroImageClassName)}
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,2fr)]">
          <aside className={cn("hidden lg:block", sidebarClassName)}>
            <div className="sticky top-8 space-y-6">
              {renderBackLink()}
              <div className="space-y-4">
                {renderAuthor(false)}
              </div>
            </div>
          </aside>
          <article className={cn("prose max-w-none dark:prose-invert", articleClassName)}>
            <div className="mb-8 lg:hidden">
              {renderBackLink()}
            </div>
            {title && (
              typeof title === "string" ? (
                <h1 className={cn("text-4xl font-bold tracking-tight md:text-5xl", titleClassName)}>
                  {title}
                </h1>
              ) : (
                <div className={titleClassName}>{title}</div>
              )
            )}
            <div className="mt-4 lg:hidden">
              {renderAuthor(true)}
            </div>
            {renderHeroMedia()}
            {children || defaultArticleContent(optixFlowConfig)}
          </article>
        </div>
      </div>
    </section>
  );
}

export { ArticleSidebarStickyComponent as ArticleSidebarSticky };
