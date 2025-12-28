"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProjectDetailArchitectureCarouselSection {
  title: string;
  content: string;
}

export interface ProjectDetailArchitectureCarouselProps {
  className?: string;
  title?: string;
  subtitle?: string;
  year?: string;
  category?: string;
  location?: string;
  heroImage?: {
    src?: string;
    alt?: string;
  };
  description?: string;
  carouselImages?: Array<{
    src?: string;
    alt: string;
  }>;
  sections?: ProjectDetailArchitectureCarouselSection[];
  gridImages?: Array<{
    src?: string;
    alt: string;
  }>;
  backHref?: string;
  backLabel?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultCarouselImages = [
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

const defaultGridImages = [
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
  backHref: "/projects",
  backLabel: "Back to Projects",
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
    className,
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
    backHref = defaultProps.backHref,
    backLabel = defaultProps.backLabel,
    optixFlowConfig,
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

  return (
    <article className={cn("py-24 md:py-32", className)}>
      <div className="container">
        {backHref && (
          <motion.div {...fadeInUp} className="mb-12">
            <Pressable
              href={backHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <DynamicIcon name="lucide/arrow-left" size={16} />
              {backLabel}
            </Pressable>
          </motion.div>
        )}

        <motion.header {...fadeInUp} className="mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
            <span className="rounded-full bg-muted px-3 py-1 font-medium text-foreground">
              {category}
            </span>
            <span>{year}</span>
            <span>|</span>
            <span>{location}</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>

          <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
        </motion.header>

        <motion.div {...fadeInUp} className="mb-16">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
            <Img
              src={heroImage?.src || imagePlaceholders[56]}
              alt={heroImage?.alt || "Project hero image"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 max-w-3xl"
        >
          <p className="text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        </motion.div>

        {carouselImages && carouselImages.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
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
            className="mb-16 grid gap-12 md:grid-cols-2"
          >
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">
                  {section.title}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {section.content}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {gridImages && gridImages.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid gap-6 md:grid-cols-3"
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
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </article>
  );
}
