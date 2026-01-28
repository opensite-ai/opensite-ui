"use client";

import * as React from "react";
import { useMemo } from "react";
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
import { Section } from "../../ui/section";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  AuthorInfo,
  BreadcrumbItem as BreadcrumbItemType,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ResourceDetailDocumentSidebarArticle {
  /**
   * Featured image configuration
   */
  featuredImage?: {
    src: string;
    alt: string;
  };
  /**
   * Article content (prose)
   */
  content?: React.ReactNode;
}

export interface ResourceDetailDocumentSidebarFeature {
  /**
   * Feature text
   */
  text?: React.ReactNode;
  /**
   * Custom icon for the feature (defaults to check-circle-2)
   */
  icon?: React.ReactNode;
}

export interface ResourceDetailDocumentSidebarSidebar {
  /**
   * Excerpt section title
   */
  excerptTitle?: React.ReactNode;
  /**
   * Excerpt description text
   */
  excerptDescription?: React.ReactNode;
  /**
   * Download button configuration
   */
  downloadAction?: ActionConfig;
  /**
   * Reviewer information
   */
  reviewer?: AuthorInfo;
  /**
   * Features section title
   */
  featuresTitle?: React.ReactNode;
  /**
   * List of features
   */
  features?: ResourceDetailDocumentSidebarFeature[];
  /**
   * Share section title
   */
  shareTitle?: React.ReactNode;
  /**
   * Social share actions
   */
  shareActions?: ActionConfig[];
}

export interface ResourceDetailDocumentSidebarProps {
  /**
   * Additional CSS classes for the outer wrapper
   */
  className?: string;
  /**
   * Breadcrumb navigation items
   */
  breadcrumbs?: BreadcrumbItemType[];
  /**
   * Custom slot for breadcrumbs (overrides breadcrumbs array)
   */
  breadcrumbsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the breadcrumbs
   */
  breadcrumbsClassName?: string;
  /**
   * Page title
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Article configuration
   */
  article?: ResourceDetailDocumentSidebarArticle;
  /**
   * Custom slot for article content (overrides article config)
   */
  articleSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the article
   */
  articleClassName?: string;
  /**
   * Sidebar configuration
   */
  sidebar?: ResourceDetailDocumentSidebarSidebar;
  /**
   * Custom slot for sidebar (overrides sidebar config)
   */
  sidebarSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Section background style
   */
  background?: SectionBackground;
  /**
   * Section spacing
   */
  spacing?: SectionSpacing;
  /**
   * Section pattern
   */
  pattern?: PatternName | undefined;
  /**
   * Section pattern opacity
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

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
 *     downloadAction: { children: "Download PDF", href: "/download" },
 *     reviewer: { name: "John Doe", role: "Legal Consultant", avatarSrc: "/avatars/john.jpg" },
 *     features: [{ text: "Customizable Terms" }],
 *   }}
 *   background="white"
 *   spacing="xl"
 * />
 * ```
 */
export function ResourceDetailDocumentSidebar({
  className,
  breadcrumbs,
  breadcrumbsSlot,
  breadcrumbsClassName,
  title,
  titleClassName,
  article,
  articleSlot,
  articleClassName,
  sidebar,
  sidebarSlot,
  sidebarClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ResourceDetailDocumentSidebarProps) {
  const renderedBreadcrumbs = useMemo(() => {
    if (breadcrumbsSlot) return breadcrumbsSlot;

    return (
      <Breadcrumb className={breadcrumbsClassName}>
        <BreadcrumbList>
          {breadcrumbs?.map((crumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {crumb.isCurrentPage ? (
                  <BreadcrumbPage>
                    {typeof crumb.label === "string"
                      ? crumb.label
                      : crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.href || "#"}>
                    {index === 0
                      ? (crumb.icon ?? (
                          <DynamicIcon name="lucide/home" size={16} />
                        ))
                      : typeof crumb.label === "string"
                        ? crumb.label
                        : crumb.label}
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
    );
  }, [breadcrumbsSlot, breadcrumbsClassName, breadcrumbs]);

  const renderedArticle = useMemo(() => {
    if (articleSlot) return articleSlot;

    return (
      <article
        className={cn(
          "order-2 mx-auto prose md:order-1 dark:prose-invert",
          articleClassName,
        )}
      >
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
    );
  }, [articleSlot, articleClassName, article?.featuredImage, article?.content, optixFlowConfig]);

  const renderedSidebar = useMemo(() => {
    if (sidebarSlot) return sidebarSlot;

    return (
      <div
        className={cn(
          "order-1 h-fit md:sticky md:top-20 md:order-2",
          sidebarClassName,
        )}
      >
        {sidebar?.excerptTitle &&
          (typeof sidebar.excerptTitle === "string" ? (
            <p className="mb-2 text-lg font-semibold">{sidebar.excerptTitle}</p>
          ) : (
            sidebar.excerptTitle
          ))}
        {sidebar?.excerptDescription &&
          (typeof sidebar.excerptDescription === "string" ? (
            <p className="text-muted-foreground">
              {sidebar.excerptDescription}
            </p>
          ) : (
            sidebar.excerptDescription
          ))}
        {sidebar?.downloadAction && (
          <Pressable
            href={sidebar.downloadAction.href}
            onClick={sidebar.downloadAction.onClick}
            variant={sidebar.downloadAction.variant ?? "default"}
            size={sidebar.downloadAction.size ?? "lg"}
            asButton
            className={cn("mt-6", sidebar.downloadAction.className)}
            aria-label={sidebar.downloadAction["aria-label"]}
          >
            {sidebar.downloadAction.children ?? (
              <>
                {sidebar.downloadAction.icon}
                {sidebar.downloadAction.label}
                {sidebar.downloadAction.iconAfter}
              </>
            )}
          </Pressable>
        )}
        <Separator className="my-6" />
        {sidebar?.reviewer && (
          <>
            <div className="flex gap-3">
              <Avatar className="size-10 rounded-full border">
                {sidebar.reviewer.avatarSrc && (
                  <AvatarImage
                    src={sidebar.reviewer.avatarSrc}
                    alt={
                      typeof sidebar.reviewer.name === "string"
                        ? sidebar.reviewer.name
                        : ""
                    }
                  />
                )}
              </Avatar>
              <div>
                {sidebar.reviewer.name &&
                  (typeof sidebar.reviewer.name === "string" ? (
                    <h2 className="text-sm font-medium">
                      {sidebar.reviewer.name}
                    </h2>
                  ) : (
                    sidebar.reviewer.name
                  ))}
                {sidebar.reviewer.role &&
                  (typeof sidebar.reviewer.role === "string" ? (
                    <p className="text-sm text-muted-foreground">
                      {sidebar.reviewer.role}
                    </p>
                  ) : (
                    sidebar.reviewer.role
                  ))}
              </div>
            </div>
            <Separator className="my-6" />
          </>
        )}
        {sidebar?.features && sidebar.features.length > 0 && (
          <>
            {sidebar?.featuresTitle &&
              (typeof sidebar.featuresTitle === "string" ? (
                <p className="mb-4 text-sm font-medium">
                  {sidebar.featuresTitle}
                </p>
              ) : (
                sidebar.featuresTitle
              ))}
            <ul className="flex flex-col gap-2">
              {sidebar.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  {feature.icon ?? (
                    <DynamicIcon
                      name="lucide/check-circle-2"
                      size={16}
                      className="text-primary"
                    />
                  )}
                  {feature.text &&
                    (typeof feature.text === "string" ? (
                      <p>{feature.text}</p>
                    ) : (
                      feature.text
                    ))}
                </li>
              ))}
            </ul>
            <Separator className="my-6" />
          </>
        )}
        <div className="flex items-center justify-between">
          {sidebar?.shareTitle &&
            (typeof sidebar.shareTitle === "string" ? (
              <p className="text-sm font-medium">{sidebar.shareTitle}</p>
            ) : (
              sidebar.shareTitle
            ))}
          {sidebar?.shareActions && sidebar.shareActions.length > 0 && (
            <ul className="flex gap-2">
              {sidebar.shareActions.map((action, index) => {
                const {
                  icon,
                  iconAfter,
                  children,
                  className: actionClassName,
                  label,
                  ...pressableProps
                } = action;
                return (
                  <li key={index}>
                    <Pressable
                      className={cn(
                        "inline-flex rounded-full border p-2 transition-colors hover:bg-muted",
                        actionClassName,
                      )}
                      {...pressableProps}
                    >
                      {children ?? (
                        <>
                          {icon}
                          {iconAfter}
                        </>
                      )}
                    </Pressable>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }, [
    sidebarSlot,
    sidebarClassName,
    sidebar?.excerptTitle,
    sidebar?.excerptDescription,
    sidebar?.downloadAction,
    sidebar?.reviewer,
    sidebar?.features,
    sidebar?.featuresTitle,
    sidebar?.shareTitle,
    sidebar?.shareActions,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      {renderedBreadcrumbs}
      {title &&
        (typeof title === "string" ? (
          <h1
            className={cn(
              "mt-7 text-3xl font-semibold md:text-5xl",
              titleClassName,
            )}
          >
            {title}
          </h1>
        ) : (
          <div className={titleClassName}>{title}</div>
        ))}
      <div className="relative mt-12 grid gap-16 md:grid-cols-2">
        {renderedArticle}
        {renderedSidebar}
      </div>
    </Section>
  );
}
