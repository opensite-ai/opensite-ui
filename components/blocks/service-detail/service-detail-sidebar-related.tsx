"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface SidebarRelatedStatItem {
  icon?: string;
  iconSlot?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export interface SidebarRelatedServiceItem {
  iconName?: string;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  href?: string;
  className?: string;
}

export interface SidebarRelatedContentSection {
  title?: React.ReactNode;
  paragraphs?: React.ReactNode[];
  contentSlot?: React.ReactNode;
  className?: string;
}

export interface SidebarRelatedServicesList {
  title?: React.ReactNode;
  items?: React.ReactNode[];
  listSlot?: React.ReactNode;
  className?: string;
}

export interface ServiceDetailSidebarRelatedProps {
  title?: React.ReactNode;
  titleClassName?: string;
  serviceIcon?: {
    src: string;
    alt: string;
  };
  serviceIconSlot?: React.ReactNode;
  serviceIconClassName?: string;
  introDescription?: React.ReactNode;
  introDescriptionClassName?: string;
  statsTitle?: React.ReactNode;
  statsTitleClassName?: string;
  stats?: SidebarRelatedStatItem[];
  statsSlot?: React.ReactNode;
  statsClassName?: string;
  relatedServicesTitle?: React.ReactNode;
  relatedServicesTitleClassName?: string;
  relatedServices?: SidebarRelatedServiceItem[];
  relatedServicesSlot?: React.ReactNode;
  relatedServicesClassName?: string;
  contentSections?: SidebarRelatedContentSection[];
  contentSectionsSlot?: React.ReactNode;
  contentSectionsClassName?: string;
  servicesList?: SidebarRelatedServicesList;
  servicesListSlot?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  mainColumnClassName?: string;
  sidebarClassName?: string;
  background?: SectionBackground;
  spacing?: SectionSpacing;
  pattern?: PatternName | string;
  patternOpacity?: number;
  optixFlowConfig?: OptixFlowConfig;
}

export function ServiceDetailSidebarRelated({
  title = "UX/UI Design",
  titleClassName,
  serviceIcon = {
    src: blockBrandedIconsAndPlaceholders.ux,
    alt: "UX/UI Design",
  },
  serviceIconSlot,
  serviceIconClassName,
  introDescription = "We believe that great design should be intuitive, accessible, and purposeful for every user who interacts with your product. Our UX/UI design approach focuses on understanding your users' needs, behaviors, and pain points to create interfaces that not only look beautiful but function seamlessly.",
  introDescriptionClassName,
  statsTitle = "Our Expertise",
  statsTitleClassName,
  stats,
  statsSlot,
  statsClassName,
  relatedServicesTitle = "Related Services",
  relatedServicesTitleClassName,
  relatedServices,
  relatedServicesSlot,
  relatedServicesClassName,
  contentSections,
  contentSectionsSlot,
  contentSectionsClassName,
  servicesList,
  servicesListSlot,
  className,
  containerClassName,
  mainColumnClassName,
  sidebarClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ServiceDetailSidebarRelatedProps) {
  const renderServiceIcon = () => {
    if (serviceIconSlot) return serviceIconSlot;
    if (!serviceIcon) return null;

    return (
      <div className={cn("rounded-lg bg-muted p-4", serviceIconClassName)}>
        <Img
          src={serviceIcon.src}
          alt={serviceIcon.alt}
          className="h-12 dark:invert"
          optixFlowConfig={optixFlowConfig}
        />
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

  const renderStats = () => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div className={cn("rounded-lg bg-muted/50 p-6", statsClassName)}>
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

  const renderRelatedServices = () => {
    if (relatedServicesSlot) return relatedServicesSlot;
    if (!relatedServices || relatedServices.length === 0) return null;

    return (
      <div className={cn("rounded-lg bg-muted/50 p-6", relatedServicesClassName)}>
        {relatedServicesTitle && (
          <h3
            className={cn("mb-6 text-lg font-semibold", relatedServicesTitleClassName)}
          >
            {typeof relatedServicesTitle === "string"
              ? relatedServicesTitle
              : relatedServicesTitle}
          </h3>
        )}
        <div className="space-y-4">
          {relatedServices.map((service, index) => (
            <div key={index} className={cn("group", service.className)}>
              <Pressable
                href={service.href}
                className="block space-y-1 rounded-md p-3 transition-colors hover:bg-background"
              >
                <div className="flex items-center gap-2">
                  {service.icon ? (
                    service.icon
                  ) : service.iconName ? (
                    <DynamicIcon
                      name={service.iconName}
                      size={16}
                      className="text-muted-foreground group-hover:text-primary"
                    />
                  ) : null}
                  {service.title && (
                    <div className="text-sm font-medium group-hover:text-primary">
                      {typeof service.title === "string"
                        ? service.title
                        : service.title}
                    </div>
                  )}
                </div>
                {service.description && (
                  <div className="text-xs text-muted-foreground">
                    {typeof service.description === "string"
                      ? service.description
                      : service.description}
                  </div>
                )}
              </Pressable>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Section
      className={className}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("max-w-5xl mx-auto", containerClassName)}>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className={cn("lg:col-span-2", mainColumnClassName)}>
            <div className="mb-12 space-y-8">
              <div className="flex justify-center lg:justify-start">
                {renderServiceIcon()}
              </div>

              <div className="space-y-6">
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
            </div>

            <div
              className={cn(
                "prose prose-sm max-w-none dark:prose-invert",
                contentSectionsClassName
              )}
            >
              {renderContentSections()}
              {renderServicesList()}
            </div>
          </div>

          <div className={cn("space-y-8 lg:col-span-1", sidebarClassName)}>
            {renderStats()}
            {renderRelatedServices()}
          </div>
        </div>
      </div>
    </Section>
  );
}
