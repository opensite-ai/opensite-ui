"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ArticleTocSection {
  id: string;
  title: string;
}

export interface ArticleTocSidebarProps {
  className?: string;
  title?: string;
  description?: string;
  authorName?: string;
  authorImage?: string;
  publishDate?: string;
  readTime?: string;
  category?: string;
  sections?: ArticleTocSection[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonHref?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSections: ArticleTocSection[] = [
  { id: "introduction", title: "Introduction" },
  { id: "getting-started", title: "Getting Started" },
  { id: "core-concepts", title: "Core Concepts" },
  { id: "best-practices", title: "Best Practices" },
  { id: "conclusion", title: "Conclusion" },
];

const defaultProps: Partial<ArticleTocSidebarProps> = {
  title: "Building Scalable Applications with Modern Architecture",
  description:
    "Learn how to design and implement scalable applications using modern architectural patterns and best practices.",
  authorName: "Alex Chen",
  authorImage: imagePlaceholders[10],
  publishDate: "January 5, 2025",
  readTime: "12 min read",
  category: "Architecture",
  sections: defaultSections,
  ctaTitle: "Ready to build?",
  ctaDescription:
    "Start building scalable applications today with our comprehensive toolkit.",
  ctaButtonText: "Get Started",
  ctaButtonHref: "#",
};

export function ArticleTocSidebarComponent({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  authorName = defaultProps.authorName,
  authorImage = defaultProps.authorImage,
  publishDate = defaultProps.publishDate,
  readTime = defaultProps.readTime,
  category = defaultProps.category,
  sections = defaultProps.sections,
  ctaTitle = defaultProps.ctaTitle,
  ctaDescription = defaultProps.ctaDescription,
  ctaButtonText = defaultProps.ctaButtonText,
  ctaButtonHref = defaultProps.ctaButtonHref,
  optixFlowConfig,
}: ArticleTocSidebarProps) {
  const [activeSection, setActiveSection] = React.useState<string>(
    sections?.[0]?.id || ""
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    sections?.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="prose max-w-none dark:prose-invert">
            <div className="mb-8 not-prose">
              <Badge variant="secondary">{category}</Badge>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                {title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">{description}</p>
              <div className="mt-6 flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={authorImage} />
                  <AvatarFallback>
                    {authorName?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{authorName}</p>
                  <p className="text-xs text-muted-foreground">
                    {publishDate} · {readTime}
                  </p>
                </div>
              </div>
            </div>

            <Img
              src={imagePlaceholders[4]}
              alt="Article hero"
              className="my-8 aspect-video w-full rounded-lg object-cover"
              optixFlowConfig={optixFlowConfig}
            />

            <section id="introduction">
              <h2>Introduction</h2>
              <p>
                Building scalable applications requires careful consideration of
                architecture, design patterns, and infrastructure. In this
                guide, we&apos;ll explore the key principles that enable
                applications to grow gracefully with increasing demand.
              </p>
              <Alert>
                <DynamicIcon name="lucide/lightbulb" size={16} />
                <AlertTitle>Pro Tip</AlertTitle>
                <AlertDescription>
                  Start with a simple architecture and evolve it as your needs
                  grow. Premature optimization can lead to unnecessary
                  complexity.
                </AlertDescription>
              </Alert>
            </section>

            <section id="getting-started">
              <h2>Getting Started</h2>
              <p>
                Before diving into complex architectural patterns, ensure you
                have a solid understanding of your application&apos;s
                requirements. Consider factors like expected traffic, data
                volume, and team expertise.
              </p>
              <p>
                A well-designed system starts with clear requirements and
                constraints. Document your assumptions and validate them with
                stakeholders before making architectural decisions.
              </p>
            </section>

            <section id="core-concepts">
              <h2>Core Concepts</h2>
              <p>
                Scalability encompasses both horizontal and vertical scaling
                strategies. Horizontal scaling adds more machines to handle
                load, while vertical scaling increases the capacity of existing
                machines.
              </p>
              <Img
                src={imagePlaceholders[5]}
                alt="Architecture diagram"
                className="my-8 aspect-video w-full rounded-lg object-cover"
                optixFlowConfig={optixFlowConfig}
              />
              <p>
                Key concepts include load balancing, caching, database sharding,
                and microservices architecture. Each approach has trade-offs
                that must be carefully evaluated.
              </p>
            </section>

            <section id="best-practices">
              <h2>Best Practices</h2>
              <p>
                Follow these best practices to ensure your application scales
                effectively:
              </p>
              <ul>
                <li>Design for failure and implement graceful degradation</li>
                <li>Use caching strategically at multiple levels</li>
                <li>Implement proper monitoring and alerting</li>
                <li>Automate deployment and scaling processes</li>
              </ul>
            </section>

            <section id="conclusion">
              <h2>Conclusion</h2>
              <p>
                Building scalable applications is both an art and a science. By
                understanding the fundamental principles and applying them
                thoughtfully, you can create systems that grow with your
                business needs.
              </p>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-6">
              <div className="rounded-lg border p-4">
                <h3 className="mb-4 text-sm font-semibold">Table of Contents</h3>
                <nav className="space-y-2">
                  {sections?.map((section) => (
                    <Pressable
                      key={section.id}
                      href={`#${section.id}`}
                      className={cn(
                        "block text-sm transition-colors",
                        activeSection === section.id
                          ? "font-medium text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {section.title}
                    </Pressable>
                  ))}
                </nav>
              </div>

              <div className="rounded-lg border bg-muted/50 p-4">
                <h3 className="mb-2 text-sm font-semibold">{ctaTitle}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {ctaDescription}
                </p>
                <Pressable
                  href={ctaButtonHref}
                  asButton
                  variant="default"
                  className="w-full"
                >
                  {ctaButtonText}
                </Pressable>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export { ArticleTocSidebarComponent as ArticleTocSidebar };
