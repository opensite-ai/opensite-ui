"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface SidebarStatsServiceItem {
  iconName?: string;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
}

export interface SidebarStatsStatItem {
  icon?: string;
  iconSlot?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export interface SidebarStatsContentSection {
  title?: React.ReactNode;
  paragraphs?: React.ReactNode[];
  contentSlot?: React.ReactNode;
  className?: string;
}

export interface ServiceDetailSidebarStatsProps {
  title?: React.ReactNode;
  titleClassName?: string;
  serviceIcon?: {
    src: string;
    alt: string;
  };
  serviceIconSlot?: React.ReactNode;
  serviceIconClassName?: string;
  introTitle?: React.ReactNode;
  introTitleClassName?: string;
  introDescription?: React.ReactNode;
  introDescriptionClassName?: string;
  servicesTitle?: React.ReactNode;
  servicesTitleClassName?: string;
  services?: SidebarStatsServiceItem[];
  servicesSlot?: React.ReactNode;
  servicesClassName?: string;
  statsTitle?: React.ReactNode;
  statsTitleClassName?: string;
  stats?: SidebarStatsStatItem[];
  statsSlot?: React.ReactNode;
  statsClassName?: string;
  contentSections?: SidebarStatsContentSection[];
  contentSectionsSlot?: React.ReactNode;
  contentSectionsClassName?: string;
  className?: string;
  headerClassName?: string;
  containerClassName?: string;
  mainColumnClassName?: string;
  sidebarClassName?: string;
  headerBackground?: SectionBackground;
  bodyBackground?: SectionBackground;
  bodySpacing?: SectionSpacing;
  bodyPattern?: PatternName | string;
  bodyPatternOpacity?: number;
  optixFlowConfig?: OptixFlowConfig;
}

export function ServiceDetailSidebarStats({
  title = "UX/UI Design",
  titleClassName,
  serviceIcon = {
    src: blockBrandedIconsAndPlaceholders.ux,
    alt: "UX/UI Design",
  },
  serviceIconSlot,
  serviceIconClassName,
  introTitle = "User-Centered Design That Converts",
  introTitleClassName,
  introDescription = "We believe that great design should be intuitive, accessible, and purposeful for every user who interacts with your product. Our UX/UI design approach focuses on understanding your users' needs, behaviors, and pain points to create interfaces that not only look beautiful but function seamlessly.",
  introDescriptionClassName,
  servicesTitle = "Our UX/UI Design Services",
  servicesTitleClassName,
  services,
  servicesSlot,
  servicesClassName,
  statsTitle = "Our Expertise",
  statsTitleClassName,
  stats,
  statsSlot,
  statsClassName,
  contentSections,
  contentSectionsSlot,
  contentSectionsClassName,
  className,
  headerClassName,
  containerClassName,
  mainColumnClassName,
  sidebarClassName,
  headerBackground = "muted",
  bodyBackground,
  bodySpacing,
  bodyPattern,
  bodyPatternOpacity,
  optixFlowConfig,
}: ServiceDetailSidebarStatsProps) {
  const renderServiceIcon = () => {
    if (serviceIconSlot) return serviceIconSlot;
    if (!serviceIcon) return null;

    return (
      <Img
        src={serviceIcon.src}
        alt={serviceIcon.alt}
        className={cn("h-16 dark:invert", serviceIconClassName)}
        optixFlowConfig={optixFlowConfig}
      />
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

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div className={servicesClassName}>
        {servicesTitle && (
          <h2 className={servicesTitleClassName}>
            {typeof servicesTitle === "string" ? servicesTitle : servicesTitle}
          </h2>
        )}
        <div className="space-y-3">
          {services.map((service, index) => (
            <div key={index} className={cn("flex items-center gap-3", service.className)}>
              {service.icon ? (
                service.icon
              ) : service.iconName ? (
                <DynamicIcon
                  name={service.iconName}
                  size={20}
                  className="text-primary"
                />
              ) : null}
              {service.title && (
                <span>
                  {typeof service.title === "string" ? service.title : service.title}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStats = () => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div className={cn("rounded-lg bg-muted/50 p-6 lg:sticky lg:top-8", statsClassName)}>
        {statsTitle && (
          <h3 className={cn("mb-6 text-lg font-semibold", statsTitleClassName)}>
            {typeof statsTitle === "string" ? statsTitle : statsTitle}
          </h3>
        )}
        <div className="space-y-6">
          {stats.map((stat, index) => (
            <div key={index} className={cn("flex items-center gap-4", stat.className)}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                {stat.iconSlot ? (
                  stat.iconSlot
                ) : stat.icon ? (
                  <Img
                    src={stat.icon}
                    alt={typeof stat.title === "string" ? stat.title : ""}
                    className="h-6 w-6 object-contain"
                    optixFlowConfig={optixFlowConfig}
                  />
                ) : null}
              </div>
              <div className="flex-1">
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

  return (
    <div className={className}>
      <Section background={headerBackground} spacing="lg">
        <div className={cn("flex items-center justify-center gap-4", headerClassName)}>
          {renderServiceIcon()}
          {title && (
            <h1
              className={cn(
                "text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl",
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
        <div className={cn("max-w-5xl mx-auto", containerClassName)}>
          <div className="grid gap-12 lg:grid-cols-3">
            <div className={cn("lg:col-span-2", mainColumnClassName)}>
              <div
                className={cn(
                  "prose prose-sm max-w-none dark:prose-invert",
                  contentSectionsClassName
                )}
              >
                {introTitle && (
                  <h2 className={introTitleClassName}>
                    {typeof introTitle === "string" ? introTitle : introTitle}
                  </h2>
                )}
                {introDescription && (
                  <p className={introDescriptionClassName}>
                    {typeof introDescription === "string"
                      ? introDescription
                      : introDescription}
                  </p>
                )}
                {renderContentSections()}
                {renderServices()}
              </div>
            </div>

            <div className={cn("lg:col-span-1", sidebarClassName)}>
              {renderStats()}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
