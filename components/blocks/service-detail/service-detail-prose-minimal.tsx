"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ProseMinimalContentSection {
  title?: React.ReactNode;
  paragraphs?: React.ReactNode[];
  contentSlot?: React.ReactNode;
  className?: string;
}

export interface ProseMinimalServicesList {
  title?: React.ReactNode;
  items?: React.ReactNode[];
  listSlot?: React.ReactNode;
  className?: string;
}

export interface ServiceDetailProseMinimalProps {
  title?: React.ReactNode;
  titleClassName?: string;
  headerClassName?: string;
  introTitle?: React.ReactNode;
  introTitleClassName?: string;
  introDescription?: React.ReactNode;
  introDescriptionClassName?: string;
  introSlot?: React.ReactNode;
  introClassName?: string;
  contentSections?: ProseMinimalContentSection[];
  contentSectionsSlot?: React.ReactNode;
  contentSectionsClassName?: string;
  servicesList?: ProseMinimalServicesList;
  servicesListSlot?: React.ReactNode;
  className?: string;
  headerBackground?: SectionBackground;
  bodyBackground?: SectionBackground;
  bodySpacing?: SectionSpacing;
  bodyPattern?: PatternName | string;
  bodyPatternOpacity?: number;
  optixFlowConfig?: OptixFlowConfig;
}

const defaultContentSections: ProseMinimalContentSection[] = [
  {
    title: "Creating Meaningful Digital Experiences",
    paragraphs: [
      "We combine user research, information architecture, and visual design to deliver experiences that drive engagement and conversions.",
      "Through comprehensive user research and testing, we validate design decisions with real data. Our iterative design process ensures that every element serves a purpose and contributes to your business goals while providing an exceptional user experience.",
      "We specialize in creating design systems that scale with your business, ensuring consistency across all touchpoints while maintaining flexibility for future growth and evolution.",
      "Our collaborative approach involves stakeholders throughout the design process, from initial wireframes to final prototypes. This ensures alignment between business objectives and user needs, resulting in products that succeed in the market.",
      "Every design decision is backed by research and testing, creating solutions that are not just visually appealing but strategically sound and user-validated.",
    ],
  },
  {
    title: "Strategic Design for Business Success",
    paragraphs: [
      "Our design philosophy centers on creating interfaces that bridge the gap between user needs and business objectives. We understand that great UX/UI design is not just about aesthetics—it's about creating meaningful interactions that drive results.",
      "From initial concept to final implementation, we ensure that every design element contributes to a cohesive user experience that reflects your brand values and supports your business goals. Our designs are optimized for performance, accessibility, and scalability across all devices and platforms.",
    ],
  },
];

const defaultServicesList: ProseMinimalServicesList = {
  title: "Our UX/UI Design Services",
  items: [
    "User research and persona development",
    "Information architecture and user journey mapping",
    "Wireframing and interactive prototyping",
    "Visual design and brand integration",
    "Usability testing and design validation",
    "Design system creation and documentation",
  ],
};

export function ServiceDetailProseMinimal({
  title = "UX/UI Design",
  titleClassName,
  headerClassName,
  introTitle = "User-Centered Design That Converts",
  introTitleClassName,
  introDescription = "We believe that great design should be intuitive, accessible, and purposeful for every user who interacts with your product. Our UX/UI design approach focuses on understanding your users' needs, behaviors, and pain points to create interfaces that not only look beautiful but function seamlessly.",
  introDescriptionClassName,
  introSlot,
  introClassName,
  contentSections = defaultContentSections,
  contentSectionsSlot,
  contentSectionsClassName,
  servicesList = defaultServicesList,
  servicesListSlot,
  className,
  headerBackground = "muted",
  bodyBackground,
  bodySpacing,
  bodyPattern,
  bodyPatternOpacity,
}: ServiceDetailProseMinimalProps) {
  const renderIntro = () => {
    if (introSlot) return introSlot;

    return (
      <div className={cn("mx-auto max-w-3xl space-y-8 text-left", introClassName)}>
        {introTitle && (
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight md:text-4xl",
              introTitleClassName
            )}
          >
            {typeof introTitle === "string" ? introTitle : introTitle}
          </h2>
        )}
        {introDescription && (
          <p
            className={cn(
              "text-xl leading-relaxed text-muted-foreground",
              introDescriptionClassName
            )}
          >
            {typeof introDescription === "string"
              ? introDescription
              : introDescription}
          </p>
        )}
      </div>
    );
  };

  const renderContentSections = () => {
    if (contentSectionsSlot) return contentSectionsSlot;
    if (!contentSections || contentSections.length === 0) return null;

    return (
      <>
        {contentSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={section.className}>
            {section.contentSlot ? (
              section.contentSlot
            ) : (
              <>
                {section.title && (
                  <h2>
                    {typeof section.title === "string"
                      ? section.title
                      : section.title}
                  </h2>
                )}
                {section.paragraphs?.map((paragraph, paragraphIndex) =>
                  typeof paragraph === "string" ? (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ) : (
                    <div key={paragraphIndex}>{paragraph}</div>
                  )
                )}
              </>
            )}
          </div>
        ))}
      </>
    );
  };

  const renderServicesList = () => {
    if (servicesListSlot) return servicesListSlot;
    if (!servicesList) return null;

    if (servicesList.listSlot) return servicesList.listSlot;

    return (
      <div className={servicesList.className}>
        {servicesList.title && (
          <h2>
            {typeof servicesList.title === "string"
              ? servicesList.title
              : servicesList.title}
          </h2>
        )}
        {servicesList.items && servicesList.items.length > 0 && (
          <ul>
            {servicesList.items.map((item, index) =>
              typeof item === "string" ? (
                <li key={index}>{item}</li>
              ) : (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className={className}>
      <Section background={headerBackground} spacing="lg">
        <div className={cn("text-center", headerClassName)}>
          {title && (
            <h1
              className={cn(
                "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
                titleClassName
              )}
            >
              {typeof title === "string" ? title : title}
            </h1>
          )}
        </div>
      </Section>

      <Section
        background={bodyBackground}
        spacing={bodySpacing}
        pattern={bodyPattern}
        patternOpacity={bodyPatternOpacity}
      >
        {renderIntro()}
      </Section>

      <Section
        background={bodyBackground}
        spacing={bodySpacing}
        pattern={bodyPattern}
        patternOpacity={bodyPatternOpacity}
      >
        <div
          className={cn(
            "mx-auto prose prose-sm max-w-3xl dark:prose-invert",
            contentSectionsClassName
          )}
        >
          {renderContentSections()}
          {renderServicesList()}
        </div>
      </Section>
    </div>
  );
}
