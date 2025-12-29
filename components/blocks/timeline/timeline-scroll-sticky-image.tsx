"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface TimelineSection {
  subTitle: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  image: string;
  imageAlt?: string;
}

export interface TimelineScrollStickyImageProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of timeline sections
   */
  sections?: TimelineSection[];
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the sections wrapper
   */
  sectionsClassName?: string;
  /**
   * Additional CSS classes for individual section items
   */
  sectionClassName?: string;
  /**
   * Additional CSS classes for section subtitles
   */
  subTitleClassName?: string;
  /**
   * Additional CSS classes for section titles
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for section descriptions
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for images
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the sticky image container
   */
  stickyImageClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern background
   */
  patternClassName?: string;
  /**
   * Section ID for anchor links
   */
  id?: string;
  /**
   * Inline styles for the section
   */
  style?: React.CSSProperties;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSections: TimelineSection[] = [
  {
    subTitle: "Smart Dashboard",
    title: "Streamline Your Workflow Process",
    description:
      "Leverage our intuitive interface to streamline your workflow. Access powerful tools and features designed to enhance productivity and efficiency.",
    image: blockBrandedIconsAndPlaceholders.placeholderDark1,
  },
  {
    subTitle: "Team Management",
    title: "Collaborate Seamlessly with Teams",
    description:
      "Enable smooth collaboration across your organization. Share resources efficiently with customizable access controls and permission settings.",
    image: blockBrandedIconsAndPlaceholders.placeholderDark2,
  },
  {
    subTitle: "Advanced Analytics",
    title: "Flexible Configuration Options",
    description:
      "Customize your experience with advanced configuration options. Adapt the platform to your specific needs with our versatile solution.",
    image: blockBrandedIconsAndPlaceholders.placeholderDark3,
  },
  {
    subTitle: "Automation Tools",
    title: "Simplified User Experience",
    description:
      "Experience a user-friendly interface designed for efficiency. Our intuitive building blocks make complex tasks simple and accessible.",
    image: blockBrandedIconsAndPlaceholders.placeholderDark1,
  },
];

export function TimelineScrollStickyImage({
  heading = "Transform your workflow with our solution",
  sections = defaultSections,
  className,
  containerClassName,
  headingClassName,
  sectionsClassName,
  sectionClassName,
  subTitleClassName,
  titleClassName,
  descriptionClassName,
  imageClassName,
  stickyImageClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  id,
  style,
  optixFlowConfig,
}: TimelineScrollStickyImageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const safeActiveIndex = sections.length > 0 
    ? Math.max(0, Math.min(activeIndex, sections.length - 1))
    : 0;

  useEffect(() => {
    if (sections.length === 0) return;

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;

      let closestSection = 0;
      let closestDistance = Infinity;

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = index;
          }
        }
      });

      setActiveIndex(closestSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections.length]);

  if (sections.length === 0) {
    return (
      <Section
        id={id}
        background={background}
        spacing={spacing}
        className={className}
        pattern={pattern}
        patternOpacity={patternOpacity}
        patternClassName={patternClassName}
        style={style}
      >
        <div className={cn("max-w-7xl", containerClassName)}>
          <h1 className={cn("mb-14 max-w-2xl text-4xl font-semibold text-balance md:text-5xl", headingClassName)}>
            {heading}
          </h1>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id={id}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      style={style}
    >
      <div className={cn("max-w-7xl", containerClassName)}>
        <h1 className={cn("mb-14 max-w-2xl text-4xl font-semibold text-balance md:text-5xl", headingClassName)}>
          {heading}
        </h1>
        <div className={cn("flex justify-between gap-20", sectionsClassName)}>
          <div className="flex flex-col gap-16 md:w-1/2">
            {sections.map((section, index) => (
              <div
                key={index}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className={cn("flex flex-col gap-4 md:h-[50vh]", sectionClassName)}
              >
                <div className="block rounded-2xl border bg-muted p-4 md:hidden">
                  <Img
                    src={section.image}
                    alt={section.imageAlt || (typeof section.title === 'string' ? section.title : `Section ${index + 1}`)}
                    className={cn("h-full max-h-full w-full max-w-full rounded-2xl object-cover", imageClassName)}
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                <p className={cn("text-sm font-semibold text-muted-foreground md:text-base", subTitleClassName)}>
                  {section.subTitle}
                </p>
                <h2 className={cn("text-2xl font-semibold md:text-4xl", titleClassName)}>
                  {section.title}
                </h2>
                <p className={cn("text-muted-foreground", descriptionClassName)}>{section.description}</p>
              </div>
            ))}
          </div>
          <div className={cn("sticky top-56 right-0 hidden h-fit w-full items-center justify-center md:flex", stickyImageClassName)}>
            <Img
              src={sections[sections.length - 1].image}
              alt={sections[sections.length - 1].imageAlt || (typeof sections[sections.length - 1].title === 'string' ? sections[sections.length - 1].title as string : `Section ${sections.length}`)}
              className="invisible h-full max-h-[550px] w-full max-w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />

            {sections.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 flex h-full items-center justify-center rounded-2xl border bg-muted p-4 transition-opacity duration-200",
                  index === safeActiveIndex ? "opacity-100" : "opacity-0"
                )}
              >
                <Img
                  src={item.image}
                  alt={item.imageAlt || (typeof item.title === 'string' ? item.title : `Item ${index + 1}`)}
                  className={cn("h-full max-h-full w-full max-w-full rounded-2xl border object-cover", imageClassName)}
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
