"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface ResourceDetailArticleHeroProps {
  navigation?: {
    backText?: string;
    backHref?: string;
  };
  blog?: {
    title?: string;
    author?: string;
    role?: string;
    date?: string;
    readTime?: string;
    imageSrc?: string;
    content?: React.ReactNode;
  };
  social?: {
    heading?: string;
    links?: Array<{
      icon: "link" | "linkedin" | "twitter" | "facebook";
      href: string;
      label: string;
    }>;
  };
  illustration?: {
    imageSrc?: string;
    imageAlt?: string;
  };
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultBlogContent = (
  <>
    <p>
      The digital world consumes more energy than the entire aviation industry.
      As developers, we have a responsibility to build applications that are not
      only functional and beautiful, but also sustainable for our planet.
    </p>

    <h2>The Carbon Footprint of Code</h2>
    <p>
      Every line of code we write has an environmental impact. From the energy
      consumed by servers to the resources used in manufacturing devices, our
      digital choices matter more than we think.
    </p>

    <h3>Understanding the Impact</h3>
    <p>
      Modern web applications are incredibly resource-intensive. Consider these
      staggering facts:
    </p>
    <ul>
      <li>
        <strong>Data centers</strong> consume 1% of global electricity
      </li>
      <li>
        <strong>Video streaming</strong> accounts for 3% of global carbon
        emissions
      </li>
      <li>
        <strong>Email spam</strong> generates 17 million tons of CO2 annually
      </li>
    </ul>

    <blockquote>
      <p>
        &ldquo;The most sustainable code is the code you don&apos;t write. The
        second most sustainable is the code that runs efficiently.&rdquo;
      </p>
    </blockquote>

    <h2>Green Coding Principles</h2>
    <p>Here are the fundamental principles every developer should follow:</p>
    <ol>
      <li>
        <strong>Optimize for performance:</strong> Faster code uses less energy
      </li>
      <li>
        <strong>Minimize dependencies:</strong> Every package adds to the bundle
        size
      </li>
      <li>
        <strong>Use efficient algorithms:</strong> Better complexity means less
        computation
      </li>
      <li>
        <strong>Implement caching strategies:</strong> Reduce redundant
        operations
      </li>
      <li>
        <strong>Choose green hosting:</strong> Renewable energy-powered servers
      </li>
    </ol>

    <h3>Practical Implementation</h3>
    <p>
      Let&apos;s look at some concrete examples of how to implement these
      principles:
    </p>

    <h4>1. Image Optimization</h4>
    <p>
      Images often account for 60-80% of a webpage&apos;s size. Use modern
      formats like WebP or AVIF, implement lazy loading, and serve appropriately
      sized images.
    </p>

    <h4>2. Code Splitting</h4>
    <p>
      Load only the JavaScript that users actually need. This reduces initial
      bundle size and improves performance.
    </p>

    <h4>3. Database Optimization</h4>
    <p>
      Write efficient queries, use proper indexing, and implement connection
      pooling to reduce database load.
    </p>

    <h2>The Future of Sustainable Development</h2>
    <p>
      As we move forward, sustainability must become a core consideration in
      every development decision. Tools like <strong>WebPageTest</strong> and{" "}
      <strong>Lighthouse</strong> can help measure the environmental impact of
      our applications.
    </p>

    <p>
      The journey to sustainable web development is ongoing, but every small
      optimization contributes to a greener digital future. Start with one
      principle, measure the impact, and gradually incorporate more sustainable
      practices into your development workflow.
    </p>
  </>
);

const defaultProps: Partial<ResourceDetailArticleHeroProps> = {
  navigation: {
    backText: "All Articles",
    backHref: "/resources",
  },
  blog: {
    title:
      "Building Sustainable Web Applications: A Developer's Guide to Green Coding",
    author: "Sarah Chen",
    date: "December 15, 2024",
    readTime: "8 min read",
    role: "Senior Developer",
    imageSrc: blockBrandedIconsAndPlaceholders.avatar1,
    content: defaultBlogContent,
  },
  social: {
    heading: "Share this article",
    links: [
      { icon: "link", href: "#", label: "Copy link" },
      { icon: "linkedin", href: "#", label: "Share on LinkedIn" },
      { icon: "twitter", href: "#", label: "Share on X" },
      { icon: "facebook", href: "#", label: "Share on Facebook" },
    ],
  },
  illustration: {
    imageSrc: blockBrandedIconsAndPlaceholders.placeholder2,
    imageAlt:
      "Sustainable web development illustration showing green coding practices and environmental impact",
  },
};

const getIcon = (icon: string, className: string) => {
  switch (icon) {
    case "link":
      return <DynamicIcon name="lucide/link" size={16} className={className} />;
    case "linkedin":
      return (
        <DynamicIcon name="lucide/linkedin" size={16} className={className} />
      );
    case "twitter":
      return (
        <DynamicIcon name="lucide/twitter" size={16} className={className} />
      );
    case "facebook":
      return (
        <DynamicIcon name="lucide/facebook" size={16} className={className} />
      );
    default:
      return null;
  }
};

/**
 * ResourceDetailArticleHero - A full-width article hero with dark background,
 * navigation back link, title, author info, social sharing, and featured image.
 * Below is prose content with author bio section. Ideal for blog posts, articles,
 * case studies, and long-form content.
 *
 * @example
 * ```tsx
 * <ResourceDetailArticleHero
 *   navigation={{ backText: "All Articles", backHref: "/blog" }}
 *   blog={{
 *     title: "Building Sustainable Web Applications",
 *     author: "Sarah Chen",
 *     date: "December 15, 2024",
 *     readTime: "8 min read",
 *     role: "Senior Developer",
 *     imageSrc: "/avatars/sarah.jpg",
 *     content: <div>Your article content here...</div>,
 *   }}
 *   social={{
 *     heading: "Share this article",
 *     links: [
 *       { icon: "linkedin", href: "#", label: "Share on LinkedIn" },
 *     ],
 *   }}
 *   illustration={{
 *     imageSrc: "/images/hero.jpg",
 *     imageAlt: "Article hero image",
 *   }}
 * />
 * ```
 */
export function ResourceDetailArticleHero({
  className,
  navigation = defaultProps.navigation,
  blog = defaultProps.blog,
  social = defaultProps.social,
  illustration = defaultProps.illustration,
  optixFlowConfig,
}: ResourceDetailArticleHeroProps) {
  return (
    <section className={cn("", className)}>
      <div className="min-h-128 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
            <div className="flex h-full max-w-md flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Pressable
                    href={navigation?.backHref}
                    className="group/nav flex items-center gap-2 transition-all duration-200 hover:gap-4"
                  >
                    <DynamicIcon
                      name="lucide/arrow-left"
                      size={16}
                      className="group-hover/nav:text-primary-foreground"
                    />
                    <span className="transition-colors group-hover/nav:text-primary-foreground group-hover/nav:underline">
                      {navigation?.backText}
                    </span>
                  </Pressable>
                </div>
                <h1 className="text-3xl leading-tight font-medium">
                  {blog?.title}
                </h1>
              </div>
              <div className="flex flex-col gap-8">
                <div className="space-y-2">
                  <p className="text-lg text-muted-foreground">{blog?.author}</p>
                  <p className="text-muted-foreground">
                    {blog?.date} • {blog?.readTime}
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="">{social?.heading}</h3>
                  <div className="flex gap-3">
                    {social?.links?.map((link, index) => (
                      <Pressable
                        key={index}
                        href={link.href}
                        variant="outline"
                        size="icon"
                        asButton
                        className="group/btn h-12 w-12 rounded-full border-border/10 bg-muted/20 transition-colors hover:bg-transparent hover:text-muted"
                        aria-label={link.label}
                      >
                        {getIcon(
                          link.icon,
                          "text-muted/30 group-hover/btn:text-primary-foreground transition-colors"
                        )}
                      </Pressable>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2 h-full w-full">
              <div className="aspect-video min-h-96 w-full">
                {illustration?.imageSrc && (
                  <Img
                    src={illustration.imageSrc}
                    alt={illustration.imageAlt || ""}
                    className="h-full w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:max-w-2xl xl:max-w-5xl">
        <div className="prose max-w-none pb-16 prose-headings:text-foreground prose-p:text-muted-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-strong:text-foreground prose-em:text-foreground prose-ol:text-muted-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground">
          {blog?.content}
        </div>
        <div className="flex flex-col justify-between gap-8 border-t border-border py-8 md:flex-row">
          <div className="flex items-center gap-3">
            <Avatar className="size-12 border xl:size-16">
              {blog?.imageSrc && <AvatarImage src={blog.imageSrc} />}
              <AvatarFallback>{blog?.author}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{blog?.author}</p>
              <p className="text-sm text-muted-foreground">{blog?.role}</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="">{social?.heading}</h3>
            <div className="flex gap-3">
              {social?.links?.map((link, index) => (
                <Pressable
                  key={index}
                  href={link.href}
                  variant="outline"
                  size="icon"
                  asButton
                  className="group/btn h-12 w-12 rounded-full border-border bg-muted transition-colors hover:bg-transparent hover:text-muted"
                  aria-label={link.label}
                >
                  {getIcon(
                    link.icon,
                    "text-muted-foreground group-hover/btn:text-primary transition-colors"
                  )}
                </Pressable>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
