"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarImage } from "../../ui/avatar";
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
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface ResourceDetailDocumentSidebarProps {
  className?: string;
  breadcrumbs?: Array<{
    label: string;
    href?: string;
    isCurrentPage?: boolean;
  }>;
  title?: string;
  article?: {
    featuredImage?: {
      src: string;
      alt: string;
    };
    content?: React.ReactNode;
  };
  sidebar?: {
    excerptTitle?: string;
    excerptDescription?: string;
    downloadButton?: {
      text: string;
      href: string;
    };
    reviewer?: {
      name: string;
      role: string;
      avatarSrc: string;
    };
    featuresTitle?: string;
    features?: Array<{
      text: string;
    }>;
    shareTitle?: string;
    socialLinks?: Array<{
      icon: "facebook" | "twitter" | "linkedin" | "instagram";
      href: string;
      label: string;
    }>;
  };
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultArticleContent = (
  <>
    <h1>The Joke Tax Chronicles</h1>
    <p>
      Once upon a time, in a far-off land, there was a very lazy king who spent
      all day lounging on his throne. One day, his advisors came to him with a
      problem: the kingdom was running out of money.
    </p>
    <h2>The King&apos;s Plan</h2>
    <p>
      The king thought long and hard, and finally came up with{" "}
      <a href="#">a brilliant plan</a>: he would tax the jokes in the kingdom.
    </p>
    <blockquote>
      &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good joke, so
      it&apos;s only fair that they should pay for the privilege.&rdquo;
    </blockquote>
    <h3>The Joke Tax</h3>
    <p>
      The king&apos;s subjects were not amused. They grumbled and complained,
      but the king was firm:
    </p>
    <ul>
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners : 20 gold coins</li>
    </ul>
    <p>
      As a result, people stopped telling jokes, and the kingdom fell into a
      gloom. But there was one person who refused to let the king&apos;s
      foolishness get him down: a court jester named Jokester.
    </p>
    <h3>Jokester&apos;s Revolt</h3>
    <p>
      Jokester began sneaking into the castle in the middle of the night and
      leaving jokes all over the place: under the king&apos;s pillow, in his
      soup, even in the royal toilet. The king was furious, but he couldn&apos;t
      seem to stop Jokester.
    </p>
    <p>
      And then, one day, the people of the kingdom discovered that the jokes
      left by Jokester were so funny that they couldn&apos;t help but laugh. And
      once they started laughing, they couldn&apos;t stop.
    </p>
    <h3>The People&apos;s Rebellion</h3>
    <p>
      The people of the kingdom, feeling uplifted by the laughter, started to
      tell jokes and puns again, and soon the entire kingdom was in on the joke.
    </p>
    <div>
      <table>
        <thead>
          <tr>
            <th>King&apos;s Treasury</th>
            <th>People&apos;s happiness</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Empty</td>
            <td>Overflowing</td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td>Modest</td>
            <td>Satisfied</td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td>Full</td>
            <td>Ecstatic</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      The king, seeing how much happier his subjects were, realized the error of
      his ways and repealed the joke tax. Jokester was declared a hero, and the
      kingdom lived happily ever after.
    </p>
    <p>
      The moral of the story is: never underestimate the power of a good laugh
      and always be careful of bad ideas.
    </p>
  </>
);

const defaultProps: Partial<ResourceDetailDocumentSidebarProps> = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Components", href: "/" },
    { label: "Products", isCurrentPage: true },
  ],
  title: "Professional Service Agreement",
  article: {
    featuredImage: {
      src: imagePlaceholders[0],
      alt: "Professional Service Agreement document preview",
    },
    content: defaultArticleContent,
  },
  sidebar: {
    excerptTitle: "Excerpt from the document",
    excerptDescription:
      "A comprehensive service agreement template designed for professional service providers and their clients. This document outlines the scope of work, deliverables, timelines, and terms of service to ensure clear expectations and protect both parties' interests.",
    downloadButton: {
      text: "Download the document",
      href: "#",
    },
    reviewer: {
      name: "Reviewed by John Doe",
      role: "Legal Consultant",
      avatarSrc: blockBrandedIconsAndPlaceholders.avatar1,
    },
    featuresTitle: "Key Features",
    features: [
      { text: "Customizable Terms" },
      { text: "Digital Signatures" },
      { text: "Document Tracking" },
    ],
    shareTitle: "Share this template",
    socialLinks: [
      { icon: "facebook", href: "#", label: "Share on Facebook" },
      { icon: "twitter", href: "#", label: "Share on Twitter" },
      { icon: "linkedin", href: "#", label: "Share on LinkedIn" },
      { icon: "instagram", href: "#", label: "Share on Instagram" },
    ],
  },
};

const getSocialIcon = (icon: string) => {
  switch (icon) {
    case "facebook":
      return <DynamicIcon name="lucide/facebook" size={16} />;
    case "twitter":
      return <DynamicIcon name="lucide/twitter" size={16} />;
    case "linkedin":
      return <DynamicIcon name="lucide/linkedin" size={16} />;
    case "instagram":
      return <DynamicIcon name="lucide/instagram" size={16} />;
    default:
      return null;
  }
};

/**
 * ResourceDetailDocumentSidebar - A document detail page with breadcrumb navigation,
 * title, two-column layout with article content and sticky sidebar containing excerpt,
 * download button, reviewer info, key features, and social sharing. Ideal for legal
 * documents, templates, contracts, and downloadable resources.
 *
 * @example
 * ```tsx
 * <ResourceDetailDocumentSidebar
 *   breadcrumbs={[
 *     { label: "Home", href: "/" },
 *     { label: "Templates", href: "/templates" },
 *     { label: "Service Agreement", isCurrentPage: true },
 *   ]}
 *   title="Professional Service Agreement"
 *   article={{
 *     featuredImage: { src: "/images/doc.jpg", alt: "Document preview" },
 *     content: <div>Your article content here...</div>,
 *   }}
 *   sidebar={{
 *     excerptTitle: "Document Summary",
 *     excerptDescription: "A comprehensive service agreement...",
 *     downloadButton: { text: "Download PDF", href: "/download" },
 *     reviewer: { name: "John Doe", role: "Legal Consultant", avatarSrc: "/avatars/john.jpg" },
 *     features: [{ text: "Customizable Terms" }],
 *   }}
 * />
 * ```
 */
export function ResourceDetailDocumentSidebar({
  className,
  breadcrumbs = defaultProps.breadcrumbs,
  title = defaultProps.title,
  article = defaultProps.article,
  sidebar = defaultProps.sidebar,
  optixFlowConfig,
}: ResourceDetailDocumentSidebarProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs?.map((crumb, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {crumb.isCurrentPage ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={crumb.href || "#"}>
                      {index === 0 ? (
                        <DynamicIcon name="lucide/home" size={16} />
                      ) : (
                        crumb.label
                      )}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < (breadcrumbs?.length || 0) - 1 && (
                  <BreadcrumbSeparator />
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="mt-7 text-3xl font-semibold md:text-5xl">{title}</h1>
        <div className="relative mt-12 grid gap-16 md:grid-cols-2">
          <article className="order-2 mx-auto prose md:order-1 dark:prose-invert">
            {article?.featuredImage && (
              <div>
                <Img
                  src={article.featuredImage.src}
                  alt={article.featuredImage.alt}
                  className="mt-0 mb-8 aspect-video w-full rounded-lg object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
            {article?.content}
          </article>
          <div className="order-1 h-fit md:sticky md:top-20 md:order-2">
            <p className="mb-2 text-lg font-semibold">{sidebar?.excerptTitle}</p>
            <p className="text-muted-foreground">{sidebar?.excerptDescription}</p>
            {sidebar?.downloadButton && (
              <Pressable
                href={sidebar.downloadButton.href}
                variant="default"
                size="lg"
                asButton
                className="mt-6"
              >
                {sidebar.downloadButton.text}
              </Pressable>
            )}
            <Separator className="my-6" />
            {sidebar?.reviewer && (
              <>
                <div className="flex gap-3">
                  <Avatar className="size-10 rounded-full border">
                    <AvatarImage
                      src={sidebar.reviewer.avatarSrc}
                      alt={sidebar.reviewer.name}
                    />
                  </Avatar>
                  <div>
                    <h2 className="text-sm font-medium">
                      {sidebar.reviewer.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {sidebar.reviewer.role}
                    </p>
                  </div>
                </div>
                <Separator className="my-6" />
              </>
            )}
            {sidebar?.features && sidebar.features.length > 0 && (
              <>
                <p className="mb-4 text-sm font-medium">
                  {sidebar?.featuresTitle}
                </p>
                <ul className="flex flex-col gap-2">
                  {sidebar.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <DynamicIcon
                        name="lucide/check-circle-2"
                        size={16}
                        className="text-primary"
                      />
                      <p>{feature.text}</p>
                    </li>
                  ))}
                </ul>
                <Separator className="my-6" />
              </>
            )}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{sidebar?.shareTitle}</p>
              <ul className="flex gap-2">
                {sidebar?.socialLinks?.map((link, index) => (
                  <li key={index}>
                    <Pressable
                      href={link.href}
                      className="inline-flex rounded-full border p-2 transition-colors hover:bg-muted"
                      aria-label={link.label}
                    >
                      {getSocialIcon(link.icon)}
                    </Pressable>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
