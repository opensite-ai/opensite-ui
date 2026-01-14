"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface StatsHeroStatItem {
  icon?: string;
  iconSlot?: React.ReactNode;
  title?: React.ReactNode;
  value?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export interface StatsHeroContentSection {
  title?: React.ReactNode;
  paragraphs?: React.ReactNode[];
  contentSlot?: React.ReactNode;
  className?: string;
}

export interface StatsHeroServicesList {
  title?: React.ReactNode;
  items?: React.ReactNode[];
  listSlot?: React.ReactNode;
  className?: string;
}

export interface ServiceDetailStatsHeroProps {
  title?: React.ReactNode;
  titleClassName?: string;
  heroImage?: {
    src: string;
    alt: string;
  };
  heroImageSlot?: React.ReactNode;
  heroClassName?: string;
  heroMinHeight?: string;
  heroOverlayClassName?: string;
  serviceIcon?: {
    src: string;
    alt: string;
  };
  serviceIconSlot?: React.ReactNode;
  serviceIconClassName?: string;
  stats?: StatsHeroStatItem[];
  statsSlot?: React.ReactNode;
  statsClassName?: string;
  contentSections?: StatsHeroContentSection[];
  contentSectionsSlot?: React.ReactNode;
  contentSectionsClassName?: string;
  servicesList?: StatsHeroServicesList;
  servicesListSlot?: React.ReactNode;
  className?: string;
  statsBackground?: SectionBackground;
  bodyBackground?: SectionBackground;
  bodySpacing?: SectionSpacing;
  bodyPattern?: PatternName | string;
  bodyPatternOpacity?: number;
  optixFlowConfig?: OptixFlowConfig;
}

export function ServiceDetailStatsHero({
  title,
  titleClassName,
  heroImage,
  heroImageSlot,
  heroClassName,
  heroMinHeight = "500px",
  heroOverlayClassName,
  serviceIcon,
  serviceIconSlot,
  serviceIconClassName,
  stats,
  statsSlot,
  statsClassName,
  contentSections,
  contentSectionsSlot,
  contentSectionsClassName,
  servicesList,
  servicesListSlot,
  className,
  statsBackground = "muted",
  bodyBackground,
  bodySpacing,
  bodyPattern,
  bodyPatternOpacity,
  optixFlowConfig,
}: ServiceDetailStatsHeroProps) {
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

  const renderServiceIcon = () => {
    if (serviceIconSlot) return serviceIconSlot;
    if (!serviceIcon) return null;

    return (
      <Img
        src={serviceIcon.src}
        alt={serviceIcon.alt}
        className={cn("w-24", serviceIconClassName)}
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  const renderStats = () => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div className={cn("mx-auto max-w-3xl", statsClassName)}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={cn(
                "rounded-lg border bg-background p-6 text-center",
                stat.className
              )}
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
                {stat.iconSlot ? (
                  stat.iconSlot
                ) : stat.icon ? (
                  <Img
                    src={stat.icon}
                    alt={typeof stat.title === "string" ? stat.title : ""}
                    className="h-8 w-8 object-contain"
                    optixFlowConfig={optixFlowConfig}
                  />
                ) : null}
              </div>
              <div className="space-y-2">
                {stat.value && (
                  <div className="text-2xl font-bold">
                    {typeof stat.value === "string" ? stat.value : stat.value}
                  </div>
                )}
                {stat.title && (
                  <div className="text-sm font-medium">
                    {typeof stat.title === "string" ? stat.title : stat.title}
                  </div>
                )}
                {stat.description && (
                  <div className="text-xs text-muted-foreground">
                    {typeof stat.description === "string"
                      ? stat.description
                      : stat.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
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
      <div
        className={cn(
          "relative flex items-center justify-center py-32",
          heroClassName
        )}
        style={{ minHeight: heroMinHeight }}
      >
        <div className="absolute inset-0">{renderHeroImage()}</div>
        <div className={cn("absolute inset-0 bg-black/50", heroOverlayClassName)} />

        <div className="relative z-10 container text-center">
          <div className="mx-auto flex flex-col items-center space-y-6">
            {renderServiceIcon()}
            {title && (
              <h1
                className={cn(
                  "text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl",
                  titleClassName
                )}
              >
                {typeof title === "string" ? title : title}
              </h1>
            )}
          </div>
        </div>
      </div>

      <Section background={statsBackground} spacing="lg">
        {renderStats()}
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
