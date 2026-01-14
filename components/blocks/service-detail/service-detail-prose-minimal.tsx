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

export function ServiceDetailProseMinimal({
  title,
  titleClassName,
  headerClassName,
  introTitle,
  introTitleClassName,
  introDescription,
  introDescriptionClassName,
  introSlot,
  introClassName,
  contentSections,
  contentSectionsSlot,
  contentSectionsClassName,
  servicesList,
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
