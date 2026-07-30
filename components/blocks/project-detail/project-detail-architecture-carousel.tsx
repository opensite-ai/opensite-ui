"use client";

import * as React from "react";
import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { Video } from "@page-speed/video";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Lightbox, type LightboxItem } from "@page-speed/lightbox";
import { PDFViewer } from "@page-speed/pdf-viewer";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectDetailArchitectureCarouselSection {
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface ProjectDetailArchitectureCarouselProps {
  /** Main title */
  title?: React.ReactNode;
  /** Subtitle text */
  subtitle?: React.ReactNode;
  /** Project year */
  year?: React.ReactNode;
  /** Category label */
  category?: React.ReactNode;
  /** Location text */
  location?: React.ReactNode;
  /** Hero image configuration */
  heroImage?: {
    src?: string;
    alt?: string;
  };
  /** Description text */
  description?: React.ReactNode;
  /** Carousel images */
  carouselImages?: ImageItem[];
  /** Content sections */
  sections?: ProjectDetailArchitectureCarouselSection[];
  /** Grid images */
  gridImages?: ImageItem[];
  /** Back navigation action */
  backAction?: ActionConfig;
  /** Custom slot for back action (overrides backAction) */
  backActionSlot?: React.ReactNode;
  /** OptixFlow image optimization configuration */
  optixFlowConfig?: OptixFlowConfig;
  /** Section background variant */
  background?: SectionBackground;
  /** Section spacing variant */
  spacing?: SectionSpacing;
  /** Background pattern */
  pattern?: PatternName | undefined;
  /** Pattern opacity */
  patternOpacity?: number;
  /** Additional CSS classes for the section */
  className?: string;
  /** Additional CSS classes for the container */
  containerClassName?: string;
  /** Additional CSS classes for the header */
  headerClassName?: string;
  /** Additional CSS classes for the title */
  titleClassName?: string;
  /** Additional CSS classes for the hero image */
  heroImageClassName?: string;
  /** Additional CSS classes for the carousel */
  carouselClassName?: string;
  /** Additional CSS classes for the sections */
  sectionsClassName?: string;
  /** Additional CSS classes for the grid */
  gridClassName?: string;
  /** Video URL for presentation video */
  videoUrl?: string;
  /** Video poster image */
  videoPoster?: string;
  /** PDF URL for presentation document */
  pdfUrl?: string;
  /** Whether to show the video tab */
  showVideoTab?: boolean;
  /** Whether to show the PDF tab */
  showPdfTab?: boolean;
  /** Whether to enable lightbox for carousel images */
  enableLightbox?: boolean;
  /** Optional Section ID */
  sectionId?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailArchitectureCarousel(
  props: ProjectDetailArchitectureCarouselProps,
): React.JSX.Element {
  const {
    sectionId: sectionIdProp,
    title,
    subtitle,
    year,
    category,
    location,
    heroImage,
    description,
    carouselImages,
    sections,
    gridImages,
    backAction,
    backActionSlot,
    optixFlowConfig,
    background,
    spacing,
    pattern,
    patternOpacity,
    className,
    containerClassName,
    headerClassName,
    titleClassName,
    heroImageClassName,
    carouselClassName,
    sectionsClassName,
    gridClassName,
    videoUrl,
    videoPoster,
    pdfUrl,
    showVideoTab,
    showPdfTab,
    enableLightbox,
  } = props;
  const sectionId = sectionIdProp ?? "project-detail-architecture-carousel";

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTab, setSelectedTab] = useState<"slides" | "video" | "pdf">(
    "slides",
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxItems: LightboxItem[] = useMemo(() => {
    if (!carouselImages || carouselImages.length === 0) return [];
    return carouselImages.map((img, index) => ({
      id: `carousel-image-${index}`,
      type: "image" as const,
      src: img.src || imagePlaceholders[49 + index],
      alt: img.alt || `Slide ${index + 1}`,
      download: true,
      share: true,
    }));
  }, [carouselImages]);

  const handleImageClick = useCallback(
    (index: number) => {
      if (enableLightbox) {
        setLightboxIndex(index);
        setLightboxOpen(true);
      }
    },
    [enableLightbox],
  );

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const nextSlide = useCallback(() => {
    if (carouselImages) {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }
  }, [carouselImages]);

  const prevSlide = useCallback(() => {
    if (carouselImages) {
      setCurrentSlide(
        (prev) => (prev - 1 + carouselImages.length) % carouselImages.length,
      );
    }
  }, [carouselImages]);

  const renderedBackAction = useMemo(() => {
    if (backActionSlot) return backActionSlot;
    if (!backAction) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = backAction;
    return (
      <Pressable
        className={cn(
          "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
          actionClassName,
        )}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon === "" ? null : <DynamicIcon name={icon} />}
            {label}
            {iconAfter === "" ? null : <DynamicIcon name={iconAfter} />}
          </>
        )}
      </Pressable>
    );
  }, [backActionSlot, backAction]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <article className={containerClassName}>
        {(backActionSlot || backAction) && (
          <motion.div {...fadeInUp} className="mb-12">
            {renderedBackAction}
          </motion.div>
        )}

        <motion.header {...fadeInUp} className={cn("mb-16", headerClassName)}>
          <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
            <span className={cn(
              "rounded-full px-3 py-1 font-medium",
              getNestedCardBg(background),
              getNestedCardTextColor(background)
            )}>
              {category}
            </span>
            <span>{year}</span>
            <span>|</span>
            <span>{location}</span>
          </div>

          {typeof title === "string" ? (
            <h1
              className={cn(
                "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
                titleClassName,
              )}
            >
              {title}
            </h1>
          ) : (
            <div className={titleClassName}>{title}</div>
          )}

          {subtitle &&
            (typeof subtitle === "string" ? (
              <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
            ) : (
              <div className="mt-4">{subtitle}</div>
            ))}
        </motion.header>

        <motion.div {...fadeInUp} className="mb-16">
          <div
            className={cn(
              "relative aspect-video overflow-hidden rounded-2xl",
              heroImageClassName,
            )}
          >
            <Img
              src={heroImage?.src || imagePlaceholders[56]}
              alt={heroImage?.alt || "Project hero image"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </motion.div>

        {description && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-16 max-w-3xl"
          >
            {typeof description === "string" ? (
              <p className="text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : (
              description
            )}
          </motion.div>
        )}

        {(showVideoTab || showPdfTab) && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2 border-b border-border">
              <button
                type="button"
                onClick={() => setSelectedTab("slides")}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors",
                  selectedTab === "slides"
                    ? "border-b-2 border-primary text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <DynamicIcon
                  name="lucide/images"
                  size={16}
                  className="mr-2 inline-block"
                />
                Slides ({carouselImages?.length || 0})
              </button>
              {showVideoTab && videoUrl && (
                <button
                  type="button"
                  onClick={() => setSelectedTab("video")}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors",
                    selectedTab === "video"
                      ? "border-b-2 border-primary text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <DynamicIcon
                    name="lucide/play-circle"
                    size={16}
                    className="mr-2 inline-block"
                  />
                  Video
                </button>
              )}
              {showPdfTab && pdfUrl && (
                <button
                  type="button"
                  onClick={() => setSelectedTab("pdf")}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors",
                    selectedTab === "pdf"
                      ? "border-b-2 border-primary text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <DynamicIcon
                    name="lucide/file-text"
                    size={16}
                    className="mr-2 inline-block"
                  />
                  PDF Document
                </button>
              )}
            </div>
          </motion.div>
        )}

        {selectedTab === "slides" &&
          carouselImages &&
          carouselImages.length > 0 && (
            <motion.div
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn("mb-16", carouselClassName)}
            >
              <div className="relative">
                <div
                  className={cn(
                    "relative aspect-video overflow-hidden rounded-2xl",
                    enableLightbox && "cursor-pointer",
                  )}
                  onClick={() => handleImageClick(currentSlide)}
                  role={enableLightbox ? "button" : undefined}
                  tabIndex={enableLightbox ? 0 : undefined}
                  onKeyDown={
                    enableLightbox
                      ? (e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleImageClick(currentSlide);
                          }
                        }
                      : undefined
                  }
                  aria-label={
                    enableLightbox ? "Open image in lightbox" : undefined
                  }
                >
                  <Img
                    src={
                      carouselImages[currentSlide]?.src ||
                      imagePlaceholders[49 + currentSlide]
                    }
                    alt={carouselImages[currentSlide]?.alt || "Carousel image"}
                    className="h-full w-full object-cover transition-opacity duration-500"
                    optixFlowConfig={optixFlowConfig}
                  />
                  {enableLightbox && (
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors hover:bg-foreground/20">
                      <div className="rounded-full bg-background/80 p-3 opacity-0 transition-opacity group-hover:opacity-100 hover:opacity-100">
                        <DynamicIcon name="lucide/maximize-2" size={24} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevSlide();
                    }}
                    className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                    aria-label="Previous slide"
                  >
                    <DynamicIcon name="lucide/chevron-left" size={20} />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextSlide();
                    }}
                    className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                    aria-label="Next slide"
                  >
                    <DynamicIcon name="lucide/chevron-right" size={20} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4">
                  <div className="flex gap-2">
                    {carouselImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentSlide(index);
                        }}
                        className={cn(
                          "h-2 w-2 rounded-full transition-colors",
                          index === currentSlide
                            ? "bg-foreground"
                            : "bg-foreground/30",
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  {enableLightbox && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(currentSlide);
                      }}
                      className="flex h-8 items-center gap-1.5 rounded-full bg-background/80 px-3 text-sm font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                      aria-label="Open fullscreen"
                    >
                      <DynamicIcon name="lucide/maximize-2" size={14} />
                      Fullscreen
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

        {selectedTab === "video" && showVideoTab && videoUrl && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Video
                src={videoUrl}
                poster={videoPoster}
                controls
                className="h-full w-full object-cover"
                controlsList="nodownload"
              >
                <track kind="captions" />
              </Video>
            </div>
          </motion.div>
        )}

        {selectedTab === "pdf" && showPdfTab && pdfUrl && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <div className={cn(
              "overflow-hidden rounded-2xl border border-border",
              getNestedCardBg(background, 'card')
            )}>
              <PDFViewer
                url={pdfUrl}
                height="600px"
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
          </motion.div>
        )}

        {sections && sections.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={cn(
              "mb-16 grid gap-12 md:grid-cols-2",
              sectionsClassName,
            )}
          >
            {sections.map((section, index) => (
              <div key={index}>
                {typeof section.title === "string" ? (
                  <h2 className="mb-4 text-2xl font-semibold">
                    {section.title}
                  </h2>
                ) : (
                  <div className="mb-4">{section.title}</div>
                )}
                {typeof section.content === "string" ? (
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {section.content}
                  </p>
                ) : (
                  section.content
                )}
              </div>
            ))}
          </motion.div>
        )}

        {gridImages && gridImages.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={cn("grid gap-6 md:grid-cols-3", gridClassName)}
          >
            {gridImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative aspect-4/3 overflow-hidden rounded-xl"
              >
                <Img
                  src={image.src || imagePlaceholders[53 + index]}
                  alt={image.alt || "Grid image"}
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </article>

      {lightboxOpen && lightboxItems.length > 0 && (
        <Lightbox
          items={lightboxItems}
          initialIndex={lightboxIndex}
          layout="horizontal"
          controls={{
            navigation: true,
            thumbnails: true,
            download: true,
            share: true,
            fullscreen: true,
            captions: true,
            counter: true,
          }}
          onClose={handleLightboxClose}
          onSelect={(index) => setCurrentSlide(index)}
          enableKeyboardShortcuts={true}
          closeOnEscape={true}
          closeOnBackdropClick={true}
        />
      )}
    </Section>
  );
}
