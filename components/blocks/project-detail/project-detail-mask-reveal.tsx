"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectDetailMaskRevealImage {
  src?: string;
  alt: string;
  caption?: React.ReactNode;
}

export interface ProjectDetailMaskRevealProps {
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
  /** Images with reveal animation */
  revealImages?: ProjectDetailMaskRevealImage[];
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
  /** Additional CSS classes for the reveal images section */
  revealImagesClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function RevealImage({
  src,
  alt,
  caption,
  index,
  optixFlowConfig,
}: {
  src?: string;
  alt: string;
  caption?: React.ReactNode;
  index: number;
  optixFlowConfig?: OptixFlowConfig;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
  );

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      <motion.div
        style={{ clipPath }}
        className="relative aspect-4/3 overflow-hidden rounded-2xl"
      >
        <motion.div style={{ y }} className="h-full w-full">
          <Img
            src={src}
            alt={alt}
            className="h-full w-full object-cover scale-110"
            optixFlowConfig={optixFlowConfig}
          />
        </motion.div>
      </motion.div>
      {caption && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-4 text-sm text-muted-foreground text-center"
        >
          {caption}
        </motion.div>
      )}
    </motion.div>
  );
}

export function ProjectDetailMaskReveal(
  props: ProjectDetailMaskRevealProps,
): React.JSX.Element {
  const {
    sectionId: sectionIdProp,
    title,
    subtitle,
    year,
    category,
    heroImage,
    description,
    revealImages,
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
    revealImagesClassName,
  } = props;
  const sectionId = sectionIdProp ?? "project-detail-mask-reveal";

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

        <motion.header
          {...fadeInUp}
          className={cn("mb-16 max-w-3xl", headerClassName)}
        >
          <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-muted-foreground">
            <span className={cn(
              "rounded-full px-3 py-1 font-medium",
              getNestedCardBg(background),
              getNestedCardTextColor(background)
            )}>
              {category}
            </span>
            <span>{year}</span>
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
              src={heroImage?.src}
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
            className="mb-24 max-w-3xl"
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

        {revealImages && revealImages.length > 0 && (
          <div className={cn("space-y-24", revealImagesClassName)}>
            {revealImages.map((image, index) => (
              <RevealImage
                key={index}
                src={image.src}
                alt={image.alt}
                caption={image.caption}
                index={index}
                optixFlowConfig={optixFlowConfig}
              />
            ))}
          </div>
        )}
      </article>
    </Section>
  );
}
