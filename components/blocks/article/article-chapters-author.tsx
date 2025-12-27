"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ArticleChapter {
  id: string;
  number: number;
  title: string;
}

export interface ArticleAuthor {
  name: string;
  role: string;
  image: string;
  bio: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface ArticleChaptersAuthorProps {
  className?: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
  currentPage?: string;
  title?: string;
  subtitle?: string;
  chapters?: ArticleChapter[];
  author?: ArticleAuthor;
  conclusionTitle?: string;
  conclusionDescription?: string;
  conclusionButtonText?: string;
  conclusionButtonHref?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultChapters: ArticleChapter[] = [
  { id: "chapter-1", number: 1, title: "The Foundation" },
  { id: "chapter-2", number: 2, title: "Building Blocks" },
  { id: "chapter-3", number: 3, title: "Advanced Patterns" },
  { id: "chapter-4", number: 4, title: "Real-World Applications" },
  { id: "chapter-5", number: 5, title: "Future Directions" },
];

const defaultAuthor: ArticleAuthor = {
  name: "Jessica Williams",
  role: "Principal Engineer",
  image: imagePlaceholders[10],
  bio: "Jessica is a principal engineer with over 15 years of experience in software architecture and design patterns. She has led teams at major tech companies and is a frequent speaker at industry conferences.",
  socialLinks: {
    twitter: "#",
    linkedin: "#",
  },
};

const defaultProps: Partial<ArticleChaptersAuthorProps> = {
  breadcrumbs: [
    { label: "Home", href: "#" },
    { label: "Guides", href: "#" },
  ],
  currentPage: "Design Patterns",
  title: "A Comprehensive Guide to Software Design Patterns",
  subtitle:
    "Master the essential patterns that every software engineer should know",
  chapters: defaultChapters,
  author: defaultAuthor,
  conclusionTitle: "Ready to apply these patterns?",
  conclusionDescription:
    "Download our companion code repository with working examples of all patterns discussed in this guide.",
  conclusionButtonText: "Get the Code",
  conclusionButtonHref: "#",
};

export function ArticleChaptersAuthorComponent({
  className,
  breadcrumbs = defaultProps.breadcrumbs,
  currentPage = defaultProps.currentPage,
  title = defaultProps.title,
  subtitle = defaultProps.subtitle,
  chapters = defaultProps.chapters,
  author = defaultProps.author,
  conclusionTitle = defaultProps.conclusionTitle,
  conclusionDescription = defaultProps.conclusionDescription,
  conclusionButtonText = defaultProps.conclusionButtonText,
  conclusionButtonHref = defaultProps.conclusionButtonHref,
  optixFlowConfig,
}: ArticleChaptersAuthorProps) {
  const [activeChapter, setActiveChapter] = React.useState<string>(
    chapters?.[0]?.id || ""
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapter(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    chapters?.forEach((chapter) => {
      const element = document.getElementById(chapter.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [chapters]);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Pressable href="#">
                  <DynamicIcon name="lucide/home" size={16} />
                </Pressable>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs?.map((crumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Pressable href={crumb.href}>{crumb.label}</Pressable>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            ))}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentPage}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-6">
              <div className="rounded-lg border p-4">
                <h3 className="mb-4 text-sm font-semibold">Chapters</h3>
                <nav className="space-y-2">
                  {chapters?.map((chapter) => (
                    <Pressable
                      key={chapter.id}
                      href={`#${chapter.id}`}
                      className={cn(
                        "flex items-center gap-3 text-sm transition-colors",
                        activeChapter === chapter.id
                          ? "font-medium text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs">
                        {chapter.number}
                      </span>
                      {chapter.title}
                    </Pressable>
                  ))}
                </nav>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-4 text-sm font-semibold">About the Author</h3>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={author?.image} />
                    <AvatarFallback>
                      {author?.name?.charAt(0) || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{author?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {author?.role}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {author?.bio}
                </p>
                <div className="mt-4 flex gap-2">
                  {author?.socialLinks?.twitter && (
                    <Pressable
                      href={author.socialLinks.twitter}
                      className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
                      aria-label="Twitter"
                    >
                      <DynamicIcon name="lucide/twitter" size={14} />
                    </Pressable>
                  )}
                  {author?.socialLinks?.linkedin && (
                    <Pressable
                      href={author.socialLinks.linkedin}
                      className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
                      aria-label="LinkedIn"
                    >
                      <DynamicIcon name="lucide/linkedin" size={14} />
                    </Pressable>
                  )}
                </div>
              </div>
            </div>
          </aside>

          <article className="prose max-w-none dark:prose-invert">
            <Img
              src={imagePlaceholders[0]}
              alt="Article hero"
              className="my-8 aspect-video w-full rounded-lg object-cover"
              optixFlowConfig={optixFlowConfig}
            />

            <section id="chapter-1">
              <h2>Chapter 1: The Foundation</h2>
              <p>
                Design patterns are reusable solutions to common problems in
                software design. They represent best practices evolved over time
                by experienced software developers.
              </p>
              <p>
                Understanding the foundation of design patterns helps you
                recognize when and how to apply them effectively in your own
                projects.
              </p>
            </section>

            <section id="chapter-2">
              <h2>Chapter 2: Building Blocks</h2>
              <p>
                The building blocks of design patterns include creational,
                structural, and behavioral patterns. Each category addresses
                different aspects of software design.
              </p>
              <Img
                src={imagePlaceholders[1]}
                alt="Pattern categories"
                className="my-8 aspect-video w-full rounded-lg object-cover"
                optixFlowConfig={optixFlowConfig}
              />
              <p>
                Creational patterns deal with object creation mechanisms,
                structural patterns focus on class composition, and behavioral
                patterns characterize object interaction.
              </p>
            </section>

            <section id="chapter-3">
              <h2>Chapter 3: Advanced Patterns</h2>
              <p>
                Advanced patterns build upon the fundamentals to address more
                complex scenarios. These include patterns for concurrency,
                distributed systems, and enterprise applications.
              </p>
              <blockquote>
                &ldquo;Patterns are not invented, they are discovered.&rdquo; -
                Christopher Alexander
              </blockquote>
            </section>

            <section id="chapter-4">
              <h2>Chapter 4: Real-World Applications</h2>
              <p>
                Seeing patterns in action helps solidify understanding. This
                chapter explores how major frameworks and libraries implement
                design patterns.
              </p>
              <ul>
                <li>React&apos;s use of the Observer pattern</li>
                <li>Express.js middleware as Chain of Responsibility</li>
                <li>Redux implementing the Flux pattern</li>
                <li>Dependency injection in Angular</li>
              </ul>
            </section>

            <section id="chapter-5">
              <h2>Chapter 5: Future Directions</h2>
              <p>
                As software development evolves, new patterns emerge while
                others become less relevant. Understanding the principles behind
                patterns helps you adapt to changing technologies.
              </p>
              <p>
                The rise of functional programming, microservices, and
                serverless architectures has introduced new patterns and
                variations on classic ones.
              </p>
            </section>

            <div className="mt-12 rounded-lg border bg-muted/50 p-6 not-prose">
              <h3 className="text-lg font-semibold">{conclusionTitle}</h3>
              <p className="mt-2 text-muted-foreground">
                {conclusionDescription}
              </p>
              <Pressable
                href={conclusionButtonHref}
                asButton
                variant="default"
                className="mt-4"
              >
                {conclusionButtonText}
              </Pressable>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export { ArticleChaptersAuthorComponent as ArticleChaptersAuthor };
