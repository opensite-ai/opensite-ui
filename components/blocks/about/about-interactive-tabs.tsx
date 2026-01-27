"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  id: string;
  /**
   * Tab label text
   */
  label: React.ReactNode;
  /**
   * Tab content configuration
   */
  content: {
    title: React.ReactNode;
    description: React.ReactNode;
    image?: {
      src: string;
      alt: string;
    };
  };
}

export interface AboutInteractiveTabsProps {
  /**
   * Main heading/title
   */
  title?: React.ReactNode;
  /**
   * Subtitle/description text
   */
  subtitle?: React.ReactNode;
  /**
   * Array of tab configurations
   */
  tabs?: TabItem[];
  /**
   * Custom slot for rendering tabs (overrides tabs array)
   */
  tabsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Additional CSS classes for the tabs container
   */
  tabsContainerClassName?: string;
  /**
   * Additional CSS classes for the tab buttons
   */
  tabButtonClassName?: string;
  /**
   * Additional CSS classes for the active tab button
   */
  activeTabClassName?: string;
  /**
   * Additional CSS classes for the tab content
   */
  tabContentClassName?: string;
  /**
   * Additional CSS classes for the tab content title
   */
  tabContentTitleClassName?: string;
  /**
   * Additional CSS classes for the tab content description
   */
  tabContentDescriptionClassName?: string;
  /**
   * Additional CSS classes for the tab content image
   */
  tabContentImageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Section background variant
   */
  background?: SectionBackground;
  /**
   * Section spacing variant
   */
  spacing?: SectionSpacing;
  /**
   * Pattern background key or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
}

export function AboutInteractiveTabs({
  title,
  subtitle,
  tabs,
  tabsSlot,
  className,
  containerClassName,
  headerClassName,
  titleClassName,
  subtitleClassName,
  tabsContainerClassName,
  tabButtonClassName,
  activeTabClassName,
  tabContentClassName,
  tabContentTitleClassName,
  tabContentDescriptionClassName,
  tabContentImageClassName,
  optixFlowConfig,
  background,
  spacing,
  pattern,
  patternOpacity,
}: AboutInteractiveTabsProps): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState(tabs?.[0]?.id ?? "");

  const activeContent = useMemo(() => {
    return tabs?.find((tab) => tab.id === activeTab)?.content;
  }, [tabs, activeTab]);

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id);
  }, []);

  const tabsContent = useMemo(() => {
    if (tabsSlot) return tabsSlot;
    if (!tabs || tabs.length === 0) return null;

    return (
      <div className="mt-16">
        <div className={cn("flex flex-wrap justify-center gap-2 border-b", tabsContainerClassName)}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={cn(
                "px-6 py-3 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? cn("border-b-2 border-primary text-primary", activeTabClassName)
                  : "text-muted-foreground hover:text-foreground",
                tabButtonClassName
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeContent && (
          <div className={cn("mt-12 grid gap-12 lg:grid-cols-2 lg:items-center", tabContentClassName)}>
            <div>
              {typeof activeContent.title === "string" ? (
                <h2 className={cn("text-3xl font-bold", tabContentTitleClassName)}>{activeContent.title}</h2>
              ) : (
                <div className={tabContentTitleClassName}>{activeContent.title}</div>
              )}
              {typeof activeContent.description === "string" ? (
                <p className={cn("mt-4 text-lg text-muted-foreground", tabContentDescriptionClassName)}>
                  {activeContent.description}
                </p>
              ) : (
                <div className={cn("mt-4", tabContentDescriptionClassName)}>{activeContent.description}</div>
              )}
            </div>
            {activeContent.image && (
              <Img
                src={activeContent.image.src}
                alt={activeContent.image.alt}
                className={cn("rounded-2xl object-cover", tabContentImageClassName)}
                optixFlowConfig={optixFlowConfig}
              />
            )}
          </div>
        )}
      </div>
    );
  }, [tabsSlot, tabs, tabsContainerClassName, activeTab, activeTabClassName, tabButtonClassName, handleTabChange, activeContent, tabContentClassName, tabContentTitleClassName, tabContentDescriptionClassName, tabContentImageClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
        <div className={cn("mx-auto max-w-3xl text-center", headerClassName)}>
          {title && (
            typeof title === "string" ? (
              <h1 className={cn("text-4xl font-bold tracking-tight md:text-5xl", titleClassName)}>
                {title}
              </h1>
            ) : (
              <div className={titleClassName}>{title}</div>
            )
          )}
          {subtitle && (
            typeof subtitle === "string" ? (
              <p className={cn("mt-4 text-lg text-muted-foreground", subtitleClassName)}>{subtitle}</p>
            ) : (
              <div className={cn("mt-4", subtitleClassName)}>{subtitle}</div>
            )
          )}
        </div>

        {(tabsSlot || (tabs && tabs.length > 0)) && tabsContent}
    </Section>
  );
}
