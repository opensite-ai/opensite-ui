"use client";

import * as React from "react";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Img } from "@page-speed/img";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { Pressable } from "../../../lib/Pressable";
import type {
  ActionConfig,
  DetailItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { PatternName } from "@/components/ui/pattern-background";

export interface ProjectDetailSplitMaterialsProps {
  /** Main title */
  title?: React.ReactNode;
  /** Subtitle text */
  subtitle?: React.ReactNode;
  /** Project year */
  year?: React.ReactNode;
  /** Category label */
  category?: React.ReactNode;
  /** Artist name */
  artist?: React.ReactNode;
  /** Hero image configuration */
  heroImage?: {
    src?: string;
    alt?: string;
  };
  /** Description text */
  description?: React.ReactNode;
  /** Specifications list */
  specifications?: DetailItem[];
  /** Materials list */
  materials?: string[];
  /** Secondary image configuration */
  secondaryImage?: {
    src?: string;
    alt?: string;
  };
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
  /** Additional CSS classes for the grid layout */
  gridClassName?: string;
  /** Additional CSS classes for the hero image */
  heroImageClassName?: string;
  /** Additional CSS classes for the specifications section */
  specificationsClassName?: string;
  /** Additional CSS classes for the materials section */
  materialsClassName?: string;
  /** Additional CSS classes for the secondary image */
  secondaryImageClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailSplitMaterials(
  props: ProjectDetailSplitMaterialsProps,
): React.JSX.Element {
  const {
    sectionId: sectionIdProp,
    title,
    subtitle,
    year,
    category,
    artist,
    heroImage,
    description,
    specifications,
    materials,
    secondaryImage,
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
    gridClassName,
    heroImageClassName,
    specificationsClassName,
    materialsClassName,
    secondaryImageClassName,
  } = props;
  const sectionId = sectionIdProp ?? "project-detail-split-materials";

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
            <span>{artist}</span>
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
              <p className="mt-4 text-xl text-muted-foreground">{subtitle}</p>
            ) : (
              <div className="mt-4">{subtitle}</div>
            ))}
        </motion.header>

        <div
          className={cn("grid gap-12 lg:grid-cols-2 lg:gap-16", gridClassName)}
        >
          <motion.div {...fadeInUp}>
            <div
              className={cn(
                "relative aspect-4/5 overflow-hidden rounded-2xl",
                heroImageClassName,
              )}
            >
              <Img
                src={heroImage?.src}
                alt={heroImage?.alt || "Sculpture main view"}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center space-y-8"
          >
            {description &&
              (typeof description === "string" ? (
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {description}
                </p>
              ) : (
                description
              ))}

            <div className={cn("space-y-6", specificationsClassName)}>
              <h2 className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Specifications
              </h2>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full">
                  <tbody>
                    {specifications?.map((spec, index) => (
                      <tr
                        key={
                          typeof spec.label === "string" ? spec.label : index
                        }
                        className={cn(
                          "border-b border-border last:border-b-0",
                          index % 2 === 0 ? `${getNestedCardBg(background)}/30` : "bg-background",
                        )}
                      >
                        <td className="px-4 py-3 text-sm font-medium text-muted-foreground">
                          {spec.label}
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={cn("space-y-4", materialsClassName)}>
              <h2 className="text-sm font-medium tracking-wider text-muted-foreground uppercase">
                Materials
              </h2>
              <div className="flex flex-wrap gap-2">
                {materials?.map((material) => (
                  <span
                    key={material}
                    className="rounded-full border border-border px-3 py-1 text-sm"
                  >
                    {material}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {secondaryImage && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={cn("mt-16", secondaryImageClassName)}
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Img
                src={secondaryImage.src}
                alt={secondaryImage.alt || "Sculpture detail view"}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          </motion.div>
        )}
      </article>
    </Section>
  );
}
