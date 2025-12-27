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
import { Separator } from "../../ui/separator";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ArticleBreadcrumbSection {
  id: string;
  title: string;
}

export interface ArticleBreadcrumbSocialProps {
  className?: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
  currentPage?: string;
  title?: string;
  authorName?: string;
  authorImage?: string;
  authorRole?: string;
  publishDate?: string;
  readTime?: string;
  sections?: ArticleBreadcrumbSection[];
  shareUrls?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSections: ArticleBreadcrumbSection[] = [
  { id: "overview", title: "Overview" },
  { id: "key-features", title: "Key Features" },
  { id: "implementation", title: "Implementation" },
  { id: "performance", title: "Performance" },
  { id: "summary", title: "Summary" },
];

const defaultProps: Partial<ArticleBreadcrumbSocialProps> = {
  breadcrumbs: [
    { label: "Home", href: "#" },
    { label: "Blog", href: "#" },
  ],
  currentPage: "Article",
  title: "Mastering Performance Optimization in Modern Web Apps",
  authorName: "Emily Rodriguez",
  authorImage: imagePlaceholders[10],
  authorRole: "Senior Engineer",
  publishDate: "January 10, 2025",
  readTime: "15 min read",
  sections: defaultSections,
  shareUrls: {
    twitter: "#",
    facebook: "#",
    linkedin: "#",
    instagram: "#",
  },
};

export function ArticleBreadcrumbSocialComponent({
  className,
  breadcrumbs = defaultProps.breadcrumbs,
  currentPage = defaultProps.currentPage,
  title = defaultProps.title,
  authorName = defaultProps.authorName,
  authorImage = defaultProps.authorImage,
  authorRole = defaultProps.authorRole,
  publishDate = defaultProps.publishDate,
  readTime = defaultProps.readTime,
  sections = defaultProps.sections,
  shareUrls = defaultProps.shareUrls,
  optixFlowConfig,
}: ArticleBreadcrumbSocialProps) {
  const [activeSection, setActiveSection] = React.useState<string>(
    sections?.[0]?.id || ""
  );
  const [showBackToTop, setShowBackToTop] = React.useState(false);

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

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <article className="prose max-w-none dark:prose-invert">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {title}
            </h1>

            <div className="mt-6 flex items-center gap-4 not-prose">
              <Avatar className="h-12 w-12">
                <AvatarImage src={authorImage} />
                <AvatarFallback>{authorName?.charAt(0) || "A"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{authorName}</p>
                <p className="text-sm text-muted-foreground">
                  {authorRole} · {publishDate} · {readTime}
                </p>
              </div>
            </div>

            <Separator className="my-8" />

            <Img
              src={imagePlaceholders[6]}
              alt="Article hero"
              className="my-8 aspect-video w-full rounded-lg object-cover"
              optixFlowConfig={optixFlowConfig}
            />

            <section id="overview">
              <h2>Overview</h2>
              <p>
                Performance optimization is crucial for delivering exceptional
                user experiences. In this comprehensive guide, we&apos;ll
                explore proven strategies for improving web application
                performance.
              </p>
              <p>
                From initial page load to runtime performance, every
                millisecond counts. Users expect fast, responsive applications,
                and search engines reward sites that deliver.
              </p>
            </section>

            <section id="key-features">
              <h2>Key Features</h2>
              <p>
                Modern performance optimization encompasses several key areas:
              </p>
              <ul>
                <li>Code splitting and lazy loading</li>
                <li>Image optimization and responsive images</li>
                <li>Caching strategies and CDN utilization</li>
                <li>Bundle size optimization</li>
              </ul>
              <Img
                src={imagePlaceholders[7]}
                alt="Performance metrics"
                className="my-8 aspect-video w-full rounded-lg object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </section>

            <section id="implementation">
              <h2>Implementation</h2>
              <p>
                Implementing performance optimizations requires a systematic
                approach. Start by measuring your current performance using
                tools like Lighthouse, WebPageTest, or Chrome DevTools.
              </p>
              <blockquote>
                &ldquo;You can&apos;t improve what you don&apos;t measure.&rdquo;
                - Peter Drucker
              </blockquote>
              <p>
                Once you have baseline metrics, prioritize optimizations based
                on their potential impact and implementation effort.
              </p>
            </section>

            <section id="performance">
              <h2>Performance Metrics</h2>
              <p>
                Focus on Core Web Vitals: Largest Contentful Paint (LCP), First
                Input Delay (FID), and Cumulative Layout Shift (CLS). These
                metrics directly impact user experience and SEO rankings.
              </p>
            </section>

            <section id="summary">
              <h2>Summary</h2>
              <p>
                Performance optimization is an ongoing process, not a one-time
                task. Continuously monitor your metrics, identify bottlenecks,
                and iterate on improvements to maintain a fast, responsive
                application.
              </p>
            </section>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-6">
              <div className="rounded-lg border p-4">
                <h3 className="mb-4 text-sm font-semibold">On this page</h3>
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

              <div className="rounded-lg border p-4">
                <h3 className="mb-4 text-sm font-semibold">Share this article</h3>
                <div className="flex gap-2">
                  <Pressable
                    href={shareUrls?.twitter}
                    className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-muted"
                    aria-label="Share on Twitter"
                  >
                    <DynamicIcon name="lucide/twitter" size={16} />
                  </Pressable>
                  <Pressable
                    href={shareUrls?.facebook}
                    className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-muted"
                    aria-label="Share on Facebook"
                  >
                    <DynamicIcon name="lucide/facebook" size={16} />
                  </Pressable>
                  <Pressable
                    href={shareUrls?.linkedin}
                    className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-muted"
                    aria-label="Share on LinkedIn"
                  >
                    <DynamicIcon name="lucide/linkedin" size={16} />
                  </Pressable>
                  <Pressable
                    href={shareUrls?.instagram}
                    className="flex h-9 w-9 items-center justify-center rounded-md border hover:bg-muted"
                    aria-label="Share on Instagram"
                  >
                    <DynamicIcon name="lucide/instagram" size={16} />
                  </Pressable>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
          aria-label="Back to top"
        >
          <DynamicIcon name="lucide/arrow-up" size={20} />
        </button>
      )}
    </section>
  );
}

export { ArticleBreadcrumbSocialComponent as ArticleBreadcrumbSocial };
