"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ArticleSidebarStickyProps {
  className?: string;
  backHref?: string;
  backText?: string;
  title?: string;
  authorName?: string;
  authorImage?: string;
  publishDate?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultProps: Partial<ArticleSidebarStickyProps> = {
  backHref: "#",
  backText: "Back to Blog",
  title: "The Art of Modern Web Development",
  authorName: "Sarah Johnson",
  authorImage: imagePlaceholders[10],
  publishDate: "December 15, 2024",
};

export function ArticleSidebarStickyComponent({
  className,
  backHref = defaultProps.backHref,
  backText = defaultProps.backText,
  title = defaultProps.title,
  authorName = defaultProps.authorName,
  authorImage = defaultProps.authorImage,
  publishDate = defaultProps.publishDate,
  optixFlowConfig,
}: ArticleSidebarStickyProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,2fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-6">
              <Pressable
                href={backHref}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <DynamicIcon name="lucide/chevron-left" size={16} />
                {backText}
              </Pressable>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={authorImage} />
                    <AvatarFallback>
                      {authorName?.charAt(0) || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{authorName}</p>
                    <p className="text-xs text-muted-foreground">
                      {publishDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          <article className="prose max-w-none dark:prose-invert">
            <div className="mb-8 lg:hidden">
              <Pressable
                href={backHref}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <DynamicIcon name="lucide/chevron-left" size={16} />
                {backText}
              </Pressable>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {title}
            </h1>
            <div className="mt-4 flex items-center gap-3 lg:hidden">
              <Avatar className="h-8 w-8">
                <AvatarImage src={authorImage} />
                <AvatarFallback>{authorName?.charAt(0) || "A"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{authorName}</p>
                <p className="text-xs text-muted-foreground">{publishDate}</p>
              </div>
            </div>
            <Img
              src={imagePlaceholders[2]}
              alt="Article featured image"
              className="my-8 aspect-video w-full rounded-lg object-cover"
              optixFlowConfig={optixFlowConfig}
            />
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
          </article>
        </div>
      </div>
    </section>
  );
}

export { ArticleSidebarStickyComponent as ArticleSidebarSticky };
