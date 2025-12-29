"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

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
  pattern?: string;
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
}

const defaultCarouselImages: ImageItem[] = [
  { src: imagePlaceholders[49], alt: "Architecture view 1" },
  { src: imagePlaceholders[50], alt: "Architecture view 2" },
  { src: imagePlaceholders[51], alt: "Architecture view 3" },
  { src: imagePlaceholders[52], alt: "Architecture view 4" },
];

const defaultSections: ProjectDetailArchitectureCarouselSection[] = [
  {
    title: "Design Philosophy",
    content:
      "The design embraces a philosophy of contextual modernism, where contemporary architectural language responds to and enhances the surrounding urban fabric. Every element serves both functional and aesthetic purposes.",
  },
  {
    title: "Sustainability",
    content:
      "Environmental responsibility is woven into every aspect of the design, from passive solar strategies to rainwater harvesting systems. The building achieves LEED Platinum certification.",
  },
];

const defaultGridImages: ImageItem[] = [
  { src: imagePlaceholders[53], alt: "Detail 1" },
  { src: imagePlaceholders[54], alt: "Detail 2" },
  { src: imagePlaceholders[55], alt: "Detail 3" },
];

const defaultProps: ProjectDetailArchitectureCarouselProps = {
  title: "The Meridian Tower",
  subtitle: "Mixed-Use Development",
  year: "2024",
  category: "Architecture",
  location: "New York, NY",
  heroImage: {
    src: imagePlaceholders[56],
    alt: "The Meridian Tower exterior",
  },
  description:
    "A landmark mixed-use development that redefines urban living through innovative design and sustainable practices. The tower rises 45 stories, featuring residential units, commercial spaces, and public amenities.",
  carouselImages: defaultCarouselImages,
  sections: defaultSections,
  gridImages: defaultGridImages,
  backAction: { label: "Back to Projects", href: "/projects", icon: <DynamicIcon name="lucide/arrow-left" size={16} /> },
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailArchitectureCarousel(
  props: ProjectDetailArchitectureCarouselProps
): React.JSX.Element {
  const {
    title = defaultProps.title,
    subtitle = defaultProps.subtitle,
    year = defaultProps.year,
    category = defaultProps.category,
    location = defaultProps.location,
    heroImage = defaultProps.heroImage,
    description = defaultProps.description,
    carouselImages = defaultProps.carouselImages,
    sections = defaultProps.sections,
    gridImages = defaultProps.gridImages,
    backAction = defaultProps.backAction,
    backActionSlot,
    optixFlowConfig,
    background = "white",
    spacing = "lg",
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
  } = props;

  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    if (carouselImages) {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }
  };

  const prevSlide = () => {
    if (carouselImages) {
      setCurrentSlide(
        (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
      );
    }
  };

  const renderBackAction = () => {
    if (backActionSlot) return backActionSlot;
    if (!backAction) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = backAction;
    return (
      <Pressable
        className={cn("inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground", actionClassName)}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon}
            {label}
            {iconAfter}
          </>
        )}
      </Pressable>
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
      <article className={containerClassName}>
        {(backActionSlot || backAction) && (
          <motion.div {...fadeInUp} className="mb-12">
            {renderBackAction()}
          </motion.div>
        )}

        <motion.header {...fadeInUp} className={cn("mb-16", headerClassName)}>
          <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
              {category}
            </span>
            <span>{year}</span>
            <span>|</span>
            <span>{location}</span>
          </div>

          {typeof title === "string" ? (
            <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", titleClassName)}>
              {title}
            </h1>
          ) : (
            <div className={titleClassName}>{title}</div>
          )}

          {subtitle && (
            typeof subtitle === "string" ? (
              <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
            ) : (
              <div className="mt-4">{subtitle}</div>
            )
          )}
        </motion.header>

        <motion.div {...fadeInUp} className="mb-16">
          <div className={cn("relative aspect-video overflow-hidden rounded-2xl bg-muted", heroImageClassName)}>
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

        {carouselImages && carouselImages.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn("mb-16", carouselClassName)}
          >
            <div className="relative">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
                <Img
                  src={
                    carouselImages[currentSlide]?.src ||
                    imagePlaceholders[49 + currentSlide]
                  }
                  alt={carouselImages[currentSlide]?.alt || "Carousel image"}
                  className="h-full w-full object-cover transition-opacity duration-500"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                  onClick={prevSlide}
                  className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                  aria-label="Previous slide"
                >
                  <DynamicIcon name="lucide/chevron-left" size={20} />
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  onClick={nextSlide}
                  className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
                  aria-label="Next slide"
                >
                  <DynamicIcon name="lucide/chevron-right" size={20} />
                </button>
              </div>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors",
                      index === currentSlide
                        ? "bg-foreground"
                        : "bg-foreground/30"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {sections && sections.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={cn("mb-16 grid gap-12 md:grid-cols-2", sectionsClassName)}
          >
            {sections.map((section, index) => (
              <div key={index}>
                {typeof section.title === "string" ? (
                  <h2 className="mb-4 text-2xl font-semibold text-foreground">
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
                className="relative aspect-4/3 overflow-hidden rounded-xl bg-muted"
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
    </Section>
  );
}
