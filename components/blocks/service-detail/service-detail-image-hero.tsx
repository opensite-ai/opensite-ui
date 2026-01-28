"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ImageHeroContentSection {
  title?: React.ReactNode;
  paragraphs?: React.ReactNode[];
  contentSlot?: React.ReactNode;
  className?: string;
}

export interface ImageHeroServicesList {
  title?: React.ReactNode;
  items?: React.ReactNode[];
  listSlot?: React.ReactNode;
  className?: string;
}

export interface ServiceDetailImageHeroProps {
  title?: React.ReactNode;
  titleClassName?: string;
  heroImage?: {
    src: string;
    alt: string;
  };
  heroImageSlot?: React.ReactNode;
  heroClassName?: string;
  heroOverlayClassName?: string;
  heroMinHeight?: string;
  introTitle?: React.ReactNode;
  introTitleClassName?: string;
  introDescription?: React.ReactNode;
  introDescriptionClassName?: string;
  introSlot?: React.ReactNode;
  introClassName?: string;
  contentSections?: ImageHeroContentSection[];
  contentSectionsSlot?: React.ReactNode;
  contentSectionsClassName?: string;
  servicesList?: ImageHeroServicesList;
  servicesListSlot?: React.ReactNode;
  className?: string;
  bodyBackground?: SectionBackground;
  bodySpacing?: SectionSpacing;
  bodyPattern?: PatternName | undefined;
  bodyPatternOpacity?: number;
  optixFlowConfig?: OptixFlowConfig;
}

export function ServiceDetailImageHero({
  title,
  titleClassName,
  heroImage,
  heroImageSlot,
  heroClassName,
  heroOverlayClassName,
  heroMinHeight,
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
  bodyBackground,
  bodySpacing,
  bodyPattern,
  bodyPatternOpacity,
  optixFlowConfig,
}: ServiceDetailImageHeroProps) {
  const renderHeroImage = () => {
    if (heroImageSlot) return heroImageSlot;
    if (!heroImage) return null;

    return (
      <Img
        src={heroImage.src}
        alt={heroImage.alt}
        className="h-full w-full object-cover"
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  const renderIntro = () => {
    if (introSlot) return introSlot;

    return (
      <div
        className={cn("mx-auto max-w-3xl space-y-8 text-left", introClassName)}
      >
        {introTitle && (
          <h2
            className={cn(
              "text-3xl font-semibold tracking-tight md:text-4xl",
              introTitleClassName,
            )}
          >
            {typeof introTitle === "string" ? introTitle : introTitle}
          </h2>
        )}
        {introDescription && (
          <p
            className={cn(
              "text-xl leading-relaxed text-muted-foreground",
              introDescriptionClassName,
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
                  ),
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
              ),
            )}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className={className}>
      <div
        className={cn(
          "relative flex items-center justify-center py-32",
          heroClassName,
        )}
        style={heroMinHeight ? { minHeight: heroMinHeight } : undefined}
      >
        <div className="absolute inset-0">{renderHeroImage()}</div>
        <div
          className={cn("absolute inset-0 bg-black/50", heroOverlayClassName)}
        />

        <div className="relative z-10 container text-center">
          {title && (
            <h1
              className={cn(
                "text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl",
                titleClassName,
              )}
            >
              {typeof title === "string" ? title : title}
            </h1>
          )}
        </div>
      </div>

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
            contentSectionsClassName,
          )}
        >
          {renderContentSections()}
          {renderServicesList()}
        </div>
      </Section>
    </div>
  );
}
