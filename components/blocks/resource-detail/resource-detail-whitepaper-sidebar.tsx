"use client";

import * as React from "react";
import { useState, useCallback, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
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
  resourceTypeIcon?: React.ReactNode | string;
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
  downloadOptionsIcon?: React.ReactNode | string;
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
  shareIcon?: React.ReactNode | string;
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
  pattern?: PatternName | undefined;
  /**
   * Section pattern opacity
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Label for the view full document button
   */
  viewFullDocumentLabel?: React.ReactNode;
  /**
   * Fallback label for the document viewer heading
   */
  documentViewerLabel?: React.ReactNode;
  /**
   * Aria label for the close viewer button
   */
  closeViewerAriaLabel?: string;
  /** Optional Section ID */
  sectionId?: string;
}

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
  sectionId = "resource-detail-whitepaper-sidebar",
  className,
  sidebar,
  sidebarSlot,
  sidebarClassName,
  article,
  articleSlot,
  articleClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  viewFullDocumentLabel,
  documentViewerLabel,
  closeViewerAriaLabel,
}: ResourceDetailWhitepaperSidebarProps) {
  const [showFullViewer, setShowFullViewer] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state after initial render (for SSR safety with portals)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle body scroll locking while the full viewer is open
  useEffect(() => {
    if (!showFullViewer) return;
    if (typeof document === "undefined") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showFullViewer]);

  const handleOpenFullViewer = useCallback(() => {
    setShowFullViewer(true);
  }, []);

  const handleCloseFullViewer = useCallback(() => {
    setShowFullViewer(false);
  }, []);

  const showPdfPreview = sidebar?.showPdfPreview !== false && !!sidebar?.pdfUrl;

  const renderDownloadAction = useCallback((
    action: ActionConfig | undefined,
    defaultVariant: "default" | "outline",
  ) => {
    if (!action) return null;

    const {
      icon,
      iconAfter,
      children,
      className: actionClassName,
      label,
      ...pressableProps
    } = action;
    return (
      <Pressable
        variant={action.variant ?? defaultVariant}
        asButton
        className={cn("w-full justify-between", actionClassName)}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon !== "" && <DynamicIcon name={icon} />}
            {label}
          </>
        )}
        {iconAfter !== "" && <DynamicIcon name={iconAfter} />}
      </Pressable>
    );
  }, []);

  const renderedSidebar = useMemo(() => {
    if (sidebarSlot) return sidebarSlot;

    return (
      <aside className={cn("flex flex-col gap-2", sidebarClassName)}>
        <div className={cn(
          "mb-6 overflow-hidden rounded-lg border border-border shadow-sm",
          getNestedCardBg(background, 'card'),
          getNestedCardTextColor(background)
        )}>
          <div className={cn(
            "border-b border-border px-5 py-4",
            getNestedCardBg(background)
          )}>
            <h3 className="flex items-center text-sm font-semibold">
              {sidebar?.resourceTypeIcon !== "" && (
                <DynamicIcon name={sidebar?.resourceTypeIcon} />
              )}
              {sidebar?.resourceType &&
                (typeof sidebar.resourceType === "string"
                  ? sidebar.resourceType
                  : sidebar.resourceType)}
            </h3>
          </div>
          <div className="p-5">
            <div className="gap-4 text-lg font-semibold leading-snug">
              {sidebar?.resourceTitle &&
                (typeof sidebar.resourceTitle === "string" ? (
                  <p>{sidebar.resourceTitle}</p>
                ) : (
                  sidebar.resourceTitle
                ))}
            </div>

            {showPdfPreview && sidebar?.pdfUrl && (
              <div className={cn(
                "mt-4 overflow-hidden rounded-lg border border-border",
                getNestedCardBg(background)
              )}>
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
                  <Pressable
                    asButton
                    onClick={handleOpenFullViewer}
                    variant="default"
                    size="sm"
                    className="w-full"
                  >
                    <DynamicIcon name="lucide/maximize-2" size={16} />
                    {viewFullDocumentLabel ?? "View Full Document"}
                  </Pressable>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={cn(
          "mb-6 overflow-hidden rounded-lg border border-border shadow-sm",
          getNestedCardBg(background, 'card'),
          getNestedCardTextColor(background)
        )}>
          <div className={cn(
            "border-b border-border px-5 py-4",
            getNestedCardBg(background)
          )}>
            <h3 className="flex items-center text-sm font-semibold">
              {sidebar?.downloadOptionsIcon !== "" && (
                <DynamicIcon name={sidebar?.downloadOptionsIcon} />
              )}
              {sidebar?.downloadOptionsTitle &&
                (typeof sidebar.downloadOptionsTitle === "string"
                  ? sidebar.downloadOptionsTitle
                  : sidebar.downloadOptionsTitle)}
            </h3>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              {sidebar?.downloadDescription &&
                (typeof sidebar.downloadDescription === "string" ? (
                  <p className="text-sm text-muted-foreground">
                    {sidebar.downloadDescription}
                  </p>
                ) : (
                  sidebar.downloadDescription
                ))}
              <div className="flex flex-col space-y-2">
                {renderDownloadAction(
                  sidebar?.primaryDownloadAction,
                  "default",
                )}
                {renderDownloadAction(
                  sidebar?.secondaryDownloadAction,
                  "outline",
                )}
              </div>
              {sidebar?.readTime && (
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Read time:{" "}
                  {typeof sidebar.readTime === "string"
                    ? sidebar.readTime
                    : sidebar.readTime}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className={cn(
          "mb-6 overflow-hidden rounded-lg border border-border shadow-sm",
          getNestedCardBg(background, 'card'),
          getNestedCardTextColor(background)
        )}>
          <div className={cn(
            "border-b border-border px-5 py-4",
            getNestedCardBg(background)
          )}>
            <h3 className="flex items-center text-sm font-semibold">
              {sidebar?.shareIcon !== "" && (
                <DynamicIcon name={sidebar?.shareIcon} />
              )}
              {sidebar?.shareTitle &&
                (typeof sidebar.shareTitle === "string"
                  ? sidebar.shareTitle
                  : sidebar.shareTitle)}
            </h3>
          </div>
          <div className="p-5">
            {sidebar?.shareActions && sidebar.shareActions.length > 0 && (
              <ul className="flex items-center gap-2">
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
                          "flex size-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted",
                          getNestedCardBg(background),
                          actionClassName,
                        )}
                        {...pressableProps}
                      >
                        {children ?? (
                          <>
                            {icon !== "" && <DynamicIcon name={icon} />}
                            {iconAfter !== "" && (
                              <DynamicIcon name={iconAfter} />
                            )}
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
  }, [
    sidebarSlot,
    sidebarClassName,
    sidebar?.resourceTypeIcon,
    sidebar?.resourceType,
    sidebar?.resourceTitle,
    sidebar?.pdfUrl,
    sidebar?.pdfPreviewHeight,
    sidebar?.downloadOptionsIcon,
    sidebar?.downloadOptionsTitle,
    sidebar?.downloadDescription,
    sidebar?.primaryDownloadAction,
    sidebar?.secondaryDownloadAction,
    sidebar?.readTime,
    sidebar?.shareIcon,
    sidebar?.shareTitle,
    sidebar?.shareActions,
    showPdfPreview,
    handleOpenFullViewer,
    viewFullDocumentLabel,
    renderDownloadAction,
  ]);

  const renderedArticle = useMemo(() => {
    if (articleSlot) return articleSlot;

    return (
      <article
        className={cn("prose prose-sm dark:prose-invert", articleClassName)}
      >
        {article?.content}
      </article>
    );
  }, [articleSlot, articleClassName, article?.content]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className="grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="order-last md:order-0 md:col-span-4 lg:col-span-3">
          {renderedSidebar}
        </div>
        <div className="md:col-span-7 md:col-start-5 lg:col-start-6">
          {renderedArticle}
        </div>
      </div>

      {showFullViewer &&
        sidebar?.pdfUrl &&
        isMounted &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex flex-col bg-black/90"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
              <h2 className="text-lg font-semibold">
                {typeof sidebar.resourceTitle === "string" ? sidebar.resourceTitle : (documentViewerLabel ?? "Document Viewer")}
              </h2>
              <button
                type="button"
                onClick={handleCloseFullViewer}
                className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-muted"
                aria-label={closeViewerAriaLabel ?? "Close viewer"}
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
                  initialZoom: "page-fit",
                }}
              />
            </div>
          </div>,
          document.body,
        )}
    </Section>
  );
}
