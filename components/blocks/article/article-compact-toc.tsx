"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
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

export interface ArticleCompactTocSection {
  id: string;
  title: string;
}

export interface ArticleCompactTocProps {
  className?: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
  currentPage?: string;
  title?: string;
  authorName?: string;
  publishDate?: string;
  readTime?: string;
  sections?: ArticleCompactTocSection[];
  shareUrls?: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSections: ArticleCompactTocSection[] = [
  { id: "introduction", title: "Introduction" },
  { id: "methodology", title: "Methodology" },
  { id: "results", title: "Results" },
  { id: "discussion", title: "Discussion" },
  { id: "conclusion", title: "Conclusion" },
];

const defaultProps: Partial<ArticleCompactTocProps> = {
  breadcrumbs: [
    { label: "Home", href: "#" },
    { label: "Research", href: "#" },
  ],
  currentPage: "Study",
  title: "Understanding User Behavior in Modern Web Applications",
  authorName: "Dr. Michael Chen",
  publishDate: "January 12, 2025",
  readTime: "18 min read",
  sections: defaultSections,
  shareUrls: {
    twitter: "#",
    facebook: "#",
    linkedin: "#",
  },
};

export function ArticleCompactTocComponent({
  className,
  breadcrumbs = defaultProps.breadcrumbs,
  currentPage = defaultProps.currentPage,
  title = defaultProps.title,
  authorName = defaultProps.authorName,
  publishDate = defaultProps.publishDate,
  readTime = defaultProps.readTime,
  sections = defaultProps.sections,
  shareUrls = defaultProps.shareUrls,
  optixFlowConfig,
}: ArticleCompactTocProps) {
  const [activeSection, setActiveSection] = React.useState<string>(
    sections?.[0]?.id || ""
  );
  const [isTocOpen, setIsTocOpen] = React.useState(false);

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
        <Breadcrumb className="mb-6">
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

        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>{authorName}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>{publishDate}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>{readTime}</span>
          </div>

          <div className="mt-6 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Share:</span>
            <Pressable
              href={shareUrls?.twitter}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
              aria-label="Share on Twitter"
            >
              <DynamicIcon name="lucide/twitter" size={16} />
            </Pressable>
            <Pressable
              href={shareUrls?.facebook}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
              aria-label="Share on Facebook"
            >
              <DynamicIcon name="lucide/facebook" size={16} />
            </Pressable>
            <Pressable
              href={shareUrls?.linkedin}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
              aria-label="Share on LinkedIn"
            >
              <DynamicIcon name="lucide/linkedin" size={16} />
            </Pressable>
          </div>

          <Separator className="my-8" />

          <div className="mb-8 lg:hidden">
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="flex w-full items-center justify-between rounded-lg border p-4"
            >
              <span className="text-sm font-medium">Table of Contents</span>
              <DynamicIcon
                name={isTocOpen ? "lucide/chevron-up" : "lucide/chevron-down"}
                size={16}
              />
            </button>
            {isTocOpen && (
              <nav className="mt-2 space-y-2 rounded-lg border p-4">
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
                    onClick={() => setIsTocOpen(false)}
                  >
                    {section.title}
                  </Pressable>
                ))}
              </nav>
            )}
          </div>

          <article className="prose max-w-none dark:prose-invert">
            <Img
              src={imagePlaceholders[8]}
              alt="Article hero"
              className="my-8 aspect-video w-full rounded-lg object-cover"
              optixFlowConfig={optixFlowConfig}
            />

            <section id="introduction">
              <h2>Introduction</h2>
              <p>
                Understanding user behavior is fundamental to creating effective
                web applications. This study examines patterns in user
                interaction and provides insights for improving user experience.
              </p>
              <p>
                Our research focuses on identifying key factors that influence
                user engagement and satisfaction in modern web applications.
              </p>
            </section>

            <section id="methodology">
              <h2>Methodology</h2>
              <p>
                We employed a mixed-methods approach combining quantitative
                analytics with qualitative user interviews. Data was collected
                from over 10,000 users across diverse demographics.
              </p>
              <Img
                src={imagePlaceholders[9]}
                alt="Research methodology"
                className="my-8 aspect-video w-full rounded-lg object-cover"
                optixFlowConfig={optixFlowConfig}
              />
              <p>
                Statistical analysis was performed using industry-standard tools
                to ensure reliability and validity of our findings.
              </p>
            </section>

            <section id="results">
              <h2>Results</h2>
              <p>
                Our findings reveal several key patterns in user behavior:
              </p>
              <ul>
                <li>Users prefer intuitive navigation over complex menus</li>
                <li>Page load time significantly impacts engagement</li>
                <li>Mobile-first design improves overall satisfaction</li>
                <li>Clear calls-to-action increase conversion rates</li>
              </ul>
            </section>

            <section id="discussion">
              <h2>Discussion</h2>
              <p>
                These results align with existing literature while providing new
                insights into emerging user expectations. The implications for
                web development practices are significant.
              </p>
              <blockquote>
                &ldquo;User experience is not just about usability—it&apos;s
                about creating meaningful interactions that resonate with
                users.&rdquo;
              </blockquote>
            </section>

            <section id="conclusion">
              <h2>Conclusion</h2>
              <p>
                This study provides actionable insights for developers and
                designers seeking to improve user experience. Future research
                should explore the impact of emerging technologies on user
                behavior patterns.
              </p>
            </section>
          </article>
        </div>
      </div>
    </section>
  );
}

export { ArticleCompactTocComponent as ArticleCompactToc };
