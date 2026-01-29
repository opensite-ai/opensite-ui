"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Pressable } from "../../../lib/Pressable";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectDetailParallaxScrollSection {
  title: React.ReactNode;
  content: React.ReactNode;
  image?: {
    src?: string;
    alt: string;
  };
}

export interface ProjectDetailParallaxScrollProps {
  /** Main title */
  title?: React.ReactNode;
  /** Subtitle text */
  subtitle?: React.ReactNode;
  /** Project year */
  year?: React.ReactNode;
  /** Category label */
  category?: React.ReactNode;
  /** Hero image configuration */
  heroImage?: {
    src?: string;
    alt?: string;
  };
  /** Description text */
  description?: React.ReactNode;
  /** Parallax content sections */
  sections?: ProjectDetailParallaxScrollSection[];
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
  /** Additional CSS classes for the parallax sections */
  sectionsClassName?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function ParallaxSection({
  title,
  content,
  image,
  index,
  optixFlowConfig,
}: {
  title: React.ReactNode;
  content: React.ReactNode;
  image?: {
    src?: string;
    alt: string;
  };
  index: number;
  optixFlowConfig?: OptixFlowConfig;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "grid gap-12 lg:grid-cols-2 lg:gap-16 items-center",
        index % 2 === 1 && "lg:flex-row-reverse",
      )}
    >
      <motion.div
        style={{ opacity }}
        className={cn(index % 2 === 1 && "lg:order-2")}
      >
        {typeof title === "string" ? (
          <h2 className="mb-6 text-2xl font-semibold md:text-3xl">
            {title}
          </h2>
        ) : (
          <div className="mb-6">{title}</div>
        )}
        {typeof content === "string" ? (
          <p className="text-lg leading-relaxed text-muted-foreground">
            {content}
          </p>
        ) : (
          content
        )}
      </motion.div>
      {image && (
        <motion.div
          style={{ y }}
          className={cn(
            "relative aspect-4/3 overflow-hidden rounded-2xl bg-muted",
            index % 2 === 1 && "lg:order-1",
          )}
        >
          <Img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

export function ProjectDetailParallaxScroll(
  props: ProjectDetailParallaxScrollProps,
): React.JSX.Element {
  const {
    title,
    subtitle,
    year,
    category,
    heroImage,
    description,
    sections,
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
    sectionsClassName,
  } = props;

  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
          "inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground",
          actionClassName,
        )}
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
  }, [backActionSlot, backAction]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <article className={containerClassName}>
        <section
          ref={heroRef}
          className={cn(
            "relative min-h-screen overflow-hidden",
            heroImageClassName,
          )}
        >
          <motion.div style={{ y: heroY }} className="absolute inset-0">
            <Img
              src={heroImage?.src}
              alt={heroImage?.alt || "Project hero image"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
          </motion.div>

          <div className="container relative z-10 flex min-h-screen flex-col justify-end py-16">
            {(backActionSlot || backAction) && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute top-8 left-0"
              >
                {renderedBackAction}
              </motion.div>
            )}

            <motion.div
              style={{ opacity: heroOpacity }}
              className={cn("max-w-4xl", headerClassName)}
            >
              <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
                <span className="rounded-full border border-border px-3 py-1">
                  {category}
                </span>
                <span>{year}</span>
              </div>

              {typeof title === "string" ? (
                <h1
                  className={cn(
                    "text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl",
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
                  <p className="mt-6 text-xl text-muted-foreground">{subtitle}</p>
                ) : (
                  <div className="mt-6">{subtitle}</div>
                ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 md:py-32">
          <div className="container">
            {description && (
              <motion.div {...fadeInUp} className="mb-24 max-w-3xl">
                {typeof description === "string" ? (
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                ) : (
                  description
                )}
              </motion.div>
            )}

            {sections && sections.length > 0 && (
              <div className={cn("space-y-48", sectionsClassName)}>
                {sections.map((section, index) => (
                  <ParallaxSection
                    key={index}
                    title={section.title}
                    content={section.content}
                    image={section.image}
                    index={index}
                    optixFlowConfig={optixFlowConfig}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </article>
    </Section>
  );
}
