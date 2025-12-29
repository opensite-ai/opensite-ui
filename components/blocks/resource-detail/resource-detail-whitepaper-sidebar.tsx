"use client";

import * as React from "react";
import { useState, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import { PDFViewer } from "@page-speed/pdf-viewer";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ResourceDetailWhitepaperSidebarSidebar {
  /**
   * Resource type label (e.g., "Whitepaper", "Guide", "Ebook")
   */
  resourceType?: React.ReactNode;
  /**
   * Custom icon for resource type (defaults to book icon)
   */
  resourceTypeIcon?: React.ReactNode;
  /**
   * Resource title
   */
  resourceTitle?: React.ReactNode;
  /**
   * PDF URL for inline preview
   */
  pdfUrl?: string;
  /**
   * Height of the PDF preview (CSS value)
   * @default "300px"
   */
  pdfPreviewHeight?: string | number;
  /**
   * Whether to show the PDF preview
   * @default true when pdfUrl is provided
   */
  showPdfPreview?: boolean;
  /**
   * Download section description
   */
  downloadDescription?: React.ReactNode;
  /**
   * Download options section title
   */
  downloadOptionsTitle?: React.ReactNode;
  /**
   * Custom icon for download options (defaults to download icon)
   */
  downloadOptionsIcon?: React.ReactNode;
  /**
   * Read time estimate
   */
  readTime?: React.ReactNode;
  /**
   * Primary download action
   */
  primaryDownloadAction?: ActionConfig;
  /**
   * Secondary download action
   */
  secondaryDownloadAction?: ActionConfig;
  /**
   * Share section title
   */
  shareTitle?: React.ReactNode;
  /**
   * Custom icon for share section (defaults to share-2 icon)
   */
  shareIcon?: React.ReactNode;
  /**
   * Social share actions
   */
  shareActions?: ActionConfig[];
}

export interface ResourceDetailWhitepaperSidebarArticle {
  /**
   * Article title
   */
  title?: React.ReactNode;
  /**
   * Article content (prose)
   */
  content?: React.ReactNode;
}

export interface ResourceDetailWhitepaperSidebarProps {
  /**
   * Additional CSS classes for the outer wrapper
   */
  className?: string;
  /**
   * Sidebar configuration
   */
  sidebar?: ResourceDetailWhitepaperSidebarSidebar;
  /**
   * Custom slot for sidebar (overrides sidebar config)
   */
  sidebarSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Article configuration
   */
  article?: ResourceDetailWhitepaperSidebarArticle;
  /**
   * Custom slot for article content (overrides article config)
   */
  articleSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the article
   */
  articleClassName?: string;
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
  pattern?: PatternName | string;
  /**
   * Section pattern opacity
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultShareActions: ActionConfig[] = [
  {
    icon: (
      <img
        src={blockBrandedIconsAndPlaceholders.integration1}
        alt="Instagram"
        className="size-5"
      />
    ),
    href: "#",
    "aria-label": "Share on Instagram",
  },
  {
    icon: (
      <img
        src={blockBrandedIconsAndPlaceholders.integration2}
        alt="LinkedIn"
        className="size-5"
      />
    ),
    href: "#",
    "aria-label": "Share on LinkedIn",
  },
  {
    icon: (
      <img
        src={blockBrandedIconsAndPlaceholders.integration3}
        alt="Product Hunt"
        className="size-5"
      />
    ),
    href: "#",
    "aria-label": "Share on Product Hunt",
  },
  {
    icon: (
      <img
        src={blockBrandedIconsAndPlaceholders.integration4}
        alt="Twitter"
        className="size-5"
      />
    ),
    href: "#",
    "aria-label": "Share on Twitter",
  },
];

const defaultArticleContent = (
  <>
    <h1>White Paper: The Complete Guide to Launching Your Startup</h1>
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
      <li>3rd level of one-liners: 20 gold coins</li>
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

const defaultSidebar: ResourceDetailWhitepaperSidebarSidebar = {
  resourceType: "Whitepaper",
  resourceTypeIcon: (
    <DynamicIcon
      name="lucide/book"
      size={14}
      className="mr-2.5 text-muted-foreground"
    />
  ),
  resourceTitle: "The Complete Guide to Launching Your Startup",
  pdfUrl: "https://cdn.ing/assets/files/record/286359/5fv7u23rr648t363fy2ibs61sflg",
  pdfPreviewHeight: "300px",
  showPdfPreview: true,
  downloadDescription:
    "Enjoy this guide? Download it for offline reading or sharing.",
  downloadOptionsTitle: "Download Options",
  downloadOptionsIcon: (
    <DynamicIcon
      name="lucide/download"
      size={14}
      className="mr-2.5 text-muted-foreground"
    />
  ),
  readTime: "5 minutes",
  primaryDownloadAction: {
    children: "PDF Format",
    href: "#",
    variant: "default",
    iconAfter: <DynamicIcon name="lucide/download" size={16} className="ml-2" />,
  },
  secondaryDownloadAction: {
    children: "Print Version",
    href: "#",
    variant: "outline",
    iconAfter: <DynamicIcon name="lucide/download" size={16} className="ml-2" />,
  },
  shareTitle: "Share this guide",
  shareIcon: (
    <DynamicIcon
      name="lucide/share-2"
      size={14}
      className="mr-2.5 text-muted-foreground"
    />
  ),
  shareActions: defaultShareActions,
};

const defaultArticle: ResourceDetailWhitepaperSidebarArticle = {
  title: "White Paper: The Complete Guide to Launching Your Startup",
  content: defaultArticleContent,
};

/**
 * ResourceDetailWhitepaperSidebar - A resource detail layout with a left sidebar
 * containing whitepaper info card, download options, and social sharing icons.
 * Main content area displays prose article content. Ideal for whitepapers,
 * guides, ebooks, and downloadable resources.
 *
 * @example
 * ```tsx
 * <ResourceDetailWhitepaperSidebar
 *   sidebar={{
 *     resourceType: "Whitepaper",
 *     resourceTitle: "The Complete Guide to Launching Your Startup",
 *     downloadDescription: "Download for offline reading",
 *     readTime: "5 minutes",
 *     primaryDownloadAction: { children: "PDF Format", href: "/download/pdf" },
 *     secondaryDownloadAction: { children: "Print Version", href: "/download/print" },
 *   }}
 *   article={{
 *     title: "White Paper: The Complete Guide",
 *     content: <div>Your article content here...</div>,
 *   }}
 *   background="white"
 *   spacing="xl"
 * />
 * ```
 */
export function ResourceDetailWhitepaperSidebar({
  className,
  sidebar = defaultSidebar,
  sidebarSlot,
  sidebarClassName,
  article = defaultArticle,
  articleSlot,
  articleClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
}: ResourceDetailWhitepaperSidebarProps) {
  const [showFullViewer, setShowFullViewer] = useState(false);

  const handleOpenFullViewer = useCallback(() => {
    setShowFullViewer(true);
  }, []);

  const handleCloseFullViewer = useCallback(() => {
    setShowFullViewer(false);
  }, []);

  const showPdfPreview = sidebar?.showPdfPreview !== false && !!sidebar?.pdfUrl;

  const renderDownloadAction = (action: ActionConfig | undefined, defaultVariant: "default" | "outline") => {
    if (!action) return null;

    const { icon, iconAfter, children, className: actionClassName, label, ...pressableProps } = action;
    return (
      <Pressable
        variant={action.variant ?? defaultVariant}
        asButton
        className={cn("w-full justify-between", actionClassName)}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon}
            {label}
          </>
        )}
        {iconAfter}
      </Pressable>
    );
  };

  const renderSidebar = () => {
    if (sidebarSlot) return sidebarSlot;

    return (
      <aside className={cn("flex flex-col gap-2", sidebarClassName)}>
        <div className="mb-6 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-muted/50 px-5 py-4">
            <h3 className="flex items-center text-sm font-semibold">
              {sidebar?.resourceTypeIcon}
              {sidebar?.resourceType && (
                typeof sidebar.resourceType === "string" ? (
                  sidebar.resourceType
                ) : (
                  sidebar.resourceType
                )
              )}
            </h3>
          </div>
          <div className="p-5">
            <div className="gap-4 text-lg leading-snug font-semibold text-foreground">
              {sidebar?.resourceTitle && (
                typeof sidebar.resourceTitle === "string" ? (
                  <p>{sidebar.resourceTitle}</p>
                ) : (
                  sidebar.resourceTitle
                )
              )}
            </div>

            {showPdfPreview && sidebar?.pdfUrl && (
              <div className="mt-4 overflow-hidden rounded-lg border border-border bg-muted/30">
                <PDFViewer
                  url={sidebar.pdfUrl}
                  height={sidebar.pdfPreviewHeight ?? "300px"}
                  config={{
                    showControls: true,
                    showThumbnails: false,
                    enableDownload: true,
                    enablePrint: true,
                    enableFullscreen: false,
                    initialPage: 1,
                    initialZoom: "page-fit",
                  }}
                />
                <div className="border-t border-border p-3">
                  <button
                    type="button"
                    onClick={handleOpenFullViewer}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <DynamicIcon name="lucide/maximize-2" size={16} />
                    View Full Document
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-muted/50 px-5 py-4">
            <h3 className="flex items-center text-sm font-semibold">
              {sidebar?.downloadOptionsIcon}
              {sidebar?.downloadOptionsTitle && (
                typeof sidebar.downloadOptionsTitle === "string" ? (
                  sidebar.downloadOptionsTitle
                ) : (
                  sidebar.downloadOptionsTitle
                )
              )}
            </h3>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {sidebar?.downloadDescription && (
                typeof sidebar.downloadDescription === "string" ? (
                  <p className="text-sm text-muted-foreground">{sidebar.downloadDescription}</p>
                ) : (
                  sidebar.downloadDescription
                )
              )}
              <div className="flex flex-col space-y-2">
                {renderDownloadAction(sidebar?.primaryDownloadAction, "default")}
                {renderDownloadAction(sidebar?.secondaryDownloadAction, "outline")}
              </div>
              {sidebar?.readTime && (
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Read time: {typeof sidebar.readTime === "string" ? sidebar.readTime : sidebar.readTime}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-muted/50 px-5 py-4">
            <h3 className="flex items-center text-sm font-semibold">
              {sidebar?.shareIcon}
              {sidebar?.shareTitle && (
                typeof sidebar.shareTitle === "string" ? (
                  sidebar.shareTitle
                ) : (
                  sidebar.shareTitle
                )
              )}
            </h3>
          </div>
          <div className="p-5">
            {sidebar?.shareActions && sidebar.shareActions.length > 0 && (
              <ul className="flex items-center gap-2">
                {sidebar.shareActions.map((action, index) => {
                  const { icon, iconAfter, children, className: actionClassName, label, ...pressableProps } = action;
                  return (
                    <li key={index}>
                      <Pressable
                        className={cn(
                          "flex size-10 items-center justify-center rounded-full border border-border bg-muted/50 transition-colors hover:bg-muted",
                          actionClassName
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
      </aside>
    );
  };

  const renderArticle = () => {
    if (articleSlot) return articleSlot;

    return (
      <article className={cn("prose prose-sm dark:prose-invert", articleClassName)}>
        {article?.content}
      </article>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="order-last md:order-0 md:col-span-4 lg:col-span-3">
          {renderSidebar()}
        </div>
        <div className="md:col-span-7 md:col-start-5 lg:col-start-6">
          {renderArticle()}
        </div>
      </div>

      {showFullViewer && sidebar?.pdfUrl && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/90">
          <div className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
            <h2 className="text-lg font-semibold">
              {typeof sidebar.resourceTitle === "string"
                ? sidebar.resourceTitle
                : "Document Viewer"}
            </h2>
            <button
              type="button"
              onClick={handleCloseFullViewer}
              className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-muted"
              aria-label="Close viewer"
            >
              <DynamicIcon name="lucide/x" size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <PDFViewer
              url={sidebar.pdfUrl}
              height="100%"
              config={{
                showControls: true,
                showThumbnails: true,
                enableDownload: true,
                enablePrint: true,
                enableFullscreen: true,
                initialZoom: "page-width",
              }}
            />
          </div>
        </div>
      )}
    </Section>
  );
}
