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
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ProjectDetailTabbedCaseStudyTab {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
}

export interface ProjectDetailTabbedCaseStudyContentSection {
  title: React.ReactNode;
  content: React.ReactNode;
  image?: {
    src?: string;
    alt: string;
  };
  imagePosition?: "left" | "right";
}

export interface ProjectDetailTabbedCaseStudyTestimonial {
  quote: React.ReactNode;
  author: React.ReactNode;
  role: React.ReactNode;
  avatar?: string;
}

export interface ProjectDetailTabbedCaseStudyTool {
  name: React.ReactNode;
  icon?: string;
}

export interface ProjectDetailTabbedCaseStudyProps {
  /** Main title */
  title?: React.ReactNode;
  /** Subtitle text */
  subtitle?: React.ReactNode;
  /** Hero image configuration */
  heroImage?: {
    src?: string;
    alt?: string;
  };
  /** Tab navigation items */
  tabs?: ProjectDetailTabbedCaseStudyTab[];
  /** Content sections */
  contentSections?: ProjectDetailTabbedCaseStudyContentSection[];
  /** Testimonial block */
  testimonial?: ProjectDetailTabbedCaseStudyTestimonial;
  /** Tools and technologies */
  tools?: ProjectDetailTabbedCaseStudyTool[];
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
  /** Additional CSS classes for the tabs */
  tabsClassName?: string;
  /** Additional CSS classes for the content sections */
  contentSectionsClassName?: string;
  /** Additional CSS classes for the testimonial */
  testimonialClassName?: string;
  /** Additional CSS classes for the tools section */
  toolsClassName?: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export function ProjectDetailTabbedCaseStudy(
  props: ProjectDetailTabbedCaseStudyProps
): React.JSX.Element {
  const {
    title,
    subtitle,
    heroImage,
    tabs,
    contentSections,
    testimonial,
    tools,
    backAction,
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
    tabsClassName,
    contentSectionsClassName,
    testimonialClassName,
    toolsClassName,
  } = props;

  const [activeTab, setActiveTab] = React.useState(tabs?.[0]?.id || "");

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

        <motion.header {...fadeInUp} className={cn("mb-16 max-w-3xl", headerClassName)}>
          {typeof title === "string" ? (
            <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl", titleClassName)}>
              {title}
            </h1>
          ) : (
            <div className={titleClassName}>{title}</div>
          )}
          {subtitle && (
            typeof subtitle === "string" ? (
              <p className="mt-6 text-xl text-muted-foreground">{subtitle}</p>
            ) : (
              <div className="mt-6">{subtitle}</div>
            )
          )}
        </motion.header>

        <motion.div {...fadeInUp} className="mb-16">
          <div className={cn("relative aspect-video overflow-hidden rounded-2xl bg-muted", heroImageClassName)}>
            <Img
              src={heroImage?.src || imagePlaceholders[76]}
              alt={heroImage?.alt || "Case study hero"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </motion.div>

        {tabs && tabs.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={cn("mb-16", tabsClassName)}
          >
            <div className="border-b border-border">
              <nav className="flex gap-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "whitespace-nowrap border-b-2 pb-4 text-sm font-medium transition-colors",
                      activeTab === tab.id
                        ? "border-foreground text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="mt-8">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={cn(
                    "transition-opacity duration-300",
                    activeTab === tab.id ? "block" : "hidden"
                  )}
                >
                  {typeof tab.content === "string" ? (
                    <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl">
                      {tab.content}
                    </p>
                  ) : (
                    tab.content
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {contentSections && contentSections.length > 0 && (
          <div className={cn("space-y-24", contentSectionsClassName)}>
            {contentSections.map((section, index) => (
              <motion.div
                key={index}
                {...fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "grid gap-12 lg:grid-cols-2 lg:gap-16 items-center",
                  section.imagePosition === "left" && "lg:flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    section.imagePosition === "left" && "lg:order-2"
                  )}
                >
                  {typeof section.title === "string" ? (
                    <h2 className="mb-6 text-2xl font-semibold text-foreground">
                      {section.title}
                    </h2>
                  ) : (
                    <div className="mb-6">{section.title}</div>
                  )}
                  {typeof section.content === "string" ? (
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {section.content}
                    </p>
                  ) : (
                    section.content
                  )}
                </div>
                {section.image && (
                  <div
                    className={cn(
                      "relative aspect-4/3 overflow-hidden rounded-2xl bg-muted",
                      section.imagePosition === "left" && "lg:order-1"
                    )}
                  >
                    <Img
                      src={section.image.src || imagePlaceholders[72 + index]}
                      alt={section.image.alt}
                      className="h-full w-full object-cover"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {testimonial && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={cn("mt-24 rounded-2xl bg-muted/30 p-8 md:p-12", testimonialClassName)}
          >
            <blockquote className="text-xl leading-relaxed text-foreground md:text-2xl">
              "{testimonial.quote}"
            </blockquote>
            <div className="mt-6 flex items-center gap-4">
              {testimonial.avatar && (
                <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
                  <Img
                    src={testimonial.avatar}
                    alt={typeof testimonial.author === "string" ? testimonial.author : "Author"}
                    className="h-full w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              )}
              <div>
                <p className="font-medium text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {tools && tools.length > 0 && (
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={cn("mt-16", toolsClassName)}
          >
            <h2 className="mb-6 text-sm font-medium tracking-wider text-muted-foreground uppercase">
              Tools & Technologies
            </h2>
            <div className="flex flex-wrap gap-4">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full border border-border px-4 py-2"
                >
                  {tool.icon && (
                    <DynamicIcon
                      name={tool.icon}
                      size={16}
                      className="text-muted-foreground"
                    />
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </Section>
  );
}
