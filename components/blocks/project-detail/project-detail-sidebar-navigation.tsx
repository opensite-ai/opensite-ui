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
  SectionItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ProjectDetailSidebarNavigationProps {
  /** Main title */
  title?: React.ReactNode;
  /** Subtitle text */
  subtitle?: React.ReactNode;
  /** Project year */
  year?: React.ReactNode;
  /** Category label */
  category?: React.ReactNode;
  /** Client name */
  client?: React.ReactNode;
  /** Hero image configuration */
  heroImage?: {
    src?: string;
    alt?: string;
  };
  /** Content sections with navigation */
  sections?: SectionItem[];
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
  /** Additional CSS classes for the sidebar */
  sidebarClassName?: string;
  /** Additional CSS classes for the navigation */
  navClassName?: string;
  /** Additional CSS classes for the main content */
  mainClassName?: string;
  /** Additional CSS classes for the title */
  titleClassName?: string;
  /** Additional CSS classes for the subtitle */
  subtitleClassName?: string;
  /** Additional CSS classes for the hero image */
  heroImageClassName?: string;
  /** Additional CSS classes for the metadata section */
  metadataClassName?: string;
}

export function ProjectDetailSidebarNavigation(
  props: ProjectDetailSidebarNavigationProps
): React.JSX.Element {
  const {
    title,
    subtitle,
    year,
    category,
    client,
    heroImage,
    sections,
    backAction,
    backActionSlot,
    optixFlowConfig,
    background = "white",
    spacing = "lg",
    pattern,
    patternOpacity,
    className,
    containerClassName,
    sidebarClassName,
    navClassName,
    mainClassName,
    titleClassName,
    subtitleClassName,
    heroImageClassName,
    metadataClassName,
  } = props;

  const [activeSection, setActiveSection] = React.useState(
    sections?.[0]?.id || ""
  );

  React.useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections?.map((section) =>
        document.getElementById(section.id)
      );

      sectionElements?.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sections?.[index]?.id || "");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className={cn("lg:col-span-3", sidebarClassName)}>
            <div className="sticky top-24 space-y-8">
              {(backActionSlot || backAction) && renderBackAction()}

              <nav className={cn("space-y-1", navClassName)}>
                {sections?.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "block w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      activeSection === section.id
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>

              <div className={cn("space-y-3 border-t border-border pt-6", metadataClassName)}>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium text-foreground">{category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Client</span>
                  <span className="font-medium text-foreground">{client}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Year</span>
                  <span className="font-medium text-foreground">{year}</span>
                </div>
              </div>
            </div>
          </aside>

          <main className={cn("lg:col-span-9", mainClassName)}>
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              {typeof title === "string" ? (
                <h1 className={cn("text-4xl font-bold tracking-tight text-foreground md:text-5xl", titleClassName)}>
                  {title}
                </h1>
              ) : (
                <div className={titleClassName}>{title}</div>
              )}
              {subtitle && (
                typeof subtitle === "string" ? (
                  <p className={cn("mt-4 text-xl text-muted-foreground", subtitleClassName)}>{subtitle}</p>
                ) : (
                  <div className={cn("mt-4", subtitleClassName)}>{subtitle}</div>
                )
              )}
            </motion.header>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-16"
            >
              <div className={cn("relative aspect-video overflow-hidden rounded-2xl bg-muted", heroImageClassName)}>
                <Img
                  src={heroImage?.src || imagePlaceholders[8]}
                  alt={heroImage?.alt || "Project hero image"}
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </motion.div>

            <div className="space-y-24">
              {sections?.map((section, index) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  className={cn("scroll-mt-24", section.className)}
                >
                  {typeof section.title === "string" ? (
                    <h2 className="mb-6 text-2xl font-semibold text-foreground">
                      {section.title}
                    </h2>
                  ) : (
                    section.title
                  )}
                  {typeof section.content === "string" ? (
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      {section.content}
                    </p>
                  ) : (
                    section.content
                  )}
                </motion.section>
              ))}
            </div>
          </main>
        </div>
      </article>
    </Section>
  );
}
