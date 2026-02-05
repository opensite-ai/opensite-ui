"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn, getTextColor, getBorderColor } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Img } from "@page-speed/img";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface FeatureIconTabsContentTabContent {
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Title content
   */
  title?: React.ReactNode;
  /**
   * Description content
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Image source URL
   */
  imageSrc?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Custom slot for image (overrides imageSrc)
   */
  imageSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the content
   */
  className?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface FeatureIconTabsContentTab {
  /**
   * Tab value identifier
   */
  value: string;
  /**
   * Icon element (overrides iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/zap")
   */
  iconName?: string;
  /**
   * Tab label content
   */
  label?: React.ReactNode;
  /**
   * Tab content configuration
   */
  content?: FeatureIconTabsContentTabContent;
  /**
   * Custom slot for tab content (overrides content)
   */
  contentSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the tab trigger
   */
  className?: string;
}

export interface FeatureIconTabsContentProps {
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Array of tab configurations
   */
  tabs?: FeatureIconTabsContentTab[];
  /**
   * Custom slot for rendering tabs (overrides tabs array)
   */
  tabsSlot?: React.ReactNode;
  /**
   * Default active tab value
   */
  defaultTab?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the tabs list
   */
  tabsListClassName?: string;
  /**
   * Additional CSS classes for each tab trigger
   */
  tabTriggerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentWrapperClassName?: string;
  /**
   * Additional CSS classes for each tab content
   */
  tabContentClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
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
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
}

/**
 * Feature Icon Tabs Content - Tabbed interface with icon triggers and
 * content panels featuring images and actions.
 *
 * Layout: Centered header with icon tabs, muted background content area.
 * Key features: Icon tab triggers, badge labels, action buttons, responsive images.
 * Best for: Content categories, product tours, service breakdowns, multi-section showcases.
 *
 * @example
 * ```tsx
 * <FeatureIconTabsContent
 *   badge="Overview"
 *   heading="Explore Our Offerings"
 *   tabs={[
 *     {
 *       value: "tab-1",
 *       iconName: "lucide/zap",
 *       label: "Performance",
 *       content: {
 *         badge: "Speed",
 *         title: "Lightning Fast",
 *         description: "Optimized for performance.",
 *         actions: [{ label: "Learn More", href: "#", variant: "default" }],
 *         imageSrc: "/image.jpg",
 *         imageAlt: "Performance"
 *       }
 *     },
 *   ]}
 * />
 * ```
 */
export function FeatureIconTabsContent({
  badge,
  heading,
  description,
  tabs,
  tabsSlot,
  defaultTab,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  tabsListClassName,
  tabTriggerClassName,
  contentWrapperClassName,
  tabContentClassName,
  optixFlowConfig,
  background,
  spacing = "pt-14 pb-12 md:pt-32 md:pb-32",
  pattern,
  patternOpacity,
  patternClassName,
}: FeatureIconTabsContentProps): React.JSX.Element {
  const renderTabIcon = useCallback((tab: FeatureIconTabsContentTab) => {
    if (tab.icon) return tab.icon;
    if (tab.iconName) return <DynamicIcon name={tab.iconName} size={16} />;
    return null;
  }, []);

  const renderTabContentActions = useCallback(
    (content: FeatureIconTabsContentTabContent) => {
      if (content.actionsSlot) return content.actionsSlot;
      if (!content.actions || content.actions.length === 0) return null;

      return content.actions.map((action, index) => {
        if (action.children) {
          return (
            <Pressable
              key={index}
              href={action.href}
              onClick={action.onClick}
              variant={action.variant}
              size={action.size}
              className={cn("mt-2.5 w-fit gap-2", action.className)}
              aria-label={action["aria-label"]}
              asButton
            >
              {action.children}
            </Pressable>
          );
        }

        return (
          <Pressable
            key={index}
            href={action.href}
            onClick={action.onClick}
            variant={action.variant}
            size={action.size}
            className={cn("mt-2.5 w-fit gap-2", action.className)}
            aria-label={action["aria-label"]}
            asButton
          >
            {action.icon}
            {action.label}
            {action.iconAfter}
          </Pressable>
        );
      });
    },
    [],
  );

  const renderTabContentImage = useCallback(
    (content: FeatureIconTabsContentTabContent) => {
      if (content.imageSlot) return content.imageSlot;
      if (content.imageSrc) {
        return (
          <Img
            src={content.imageSrc}
            alt={content.imageAlt || "Tab content image"}
            className={cn(
              "h-full w-full rounded-xl object-cover",
              content.imageClassName,
            )}
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
        );
      }
      return null;
    },
    [optixFlowConfig],
  );

  const tabsContent = useMemo(() => {
    if (tabsSlot) return tabsSlot;
    if (!tabs || tabs.length === 0) return null;

    const activeDefaultTab = defaultTab || tabs[0]?.value;

    return (
      <Tabs defaultValue={activeDefaultTab} className="mt-8">
        <div className="container overflow-x-auto px-4 pb-2 md:px-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/50 hover:scrollbar-thumb-border md:overflow-x-visible [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border/30">
          <TabsList
            className={cn(
              "inline-flex w-auto items-center justify-start gap-2 bg-transparent md:w-full md:justify-center md:gap-4 h-auto! p-0!",
              tabsListClassName,
            )}
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "flex h-auto! w-auto! flex-none items-center gap-2 rounded-lg border border-border pl-0 pr-4 md:pl-4 md:pr-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                  `data-[state=active]:${getBorderColor(background, "accent")}`,
                  tabTriggerClassName,
                  tab.className,
                )}
              >
                {(tab.icon || tab.iconName) && renderTabIcon(tab)}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className={cn("py-6 md:py-10", contentWrapperClassName)}>
          <div className="p-4 md:p-8 bg-muted/50 rounded-2xl shadow-lg">
            {tabs.map((tab) => {
              if (tab.contentSlot) {
                return (
                  <TabsContent
                    key={tab.value}
                    value={tab.value}
                    className={tabContentClassName}
                  >
                    {tab.contentSlot}
                  </TabsContent>
                );
              }

              const content = tab.content;
              if (!content) return null;

              return (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "grid place-items-start gap-20 lg:grid-cols-2 lg:gap-10",
                    tabContentClassName,
                    content.className,
                  )}
                >
                  <div className="flex flex-col gap-5">
                    {content.badge && (
                      <Badge
                        variant="outline"
                        className={cn("w-fit", content.badgeClassName)}
                      >
                        {content.badge}
                      </Badge>
                    )}
                    {content.title &&
                      (typeof content.title === "string" ? (
                        <h3
                          className={cn(
                            "text-2xl font-semibold",
                            content.titleClassName,
                          )}
                        >
                          {content.title}
                        </h3>
                      ) : (
                        <div
                          className={cn(
                            "text-2xl font-semibold",
                            content.titleClassName,
                          )}
                        >
                          {content.title}
                        </div>
                      ))}
                    {content.description &&
                      (typeof content.description === "string" ? (
                        <p
                          className={cn(
                            "lg:text-lg",
                            getTextColor(background, "muted"),
                            content.descriptionClassName,
                          )}
                        >
                          {content.description}
                        </p>
                      ) : (
                        <div
                          className={cn(
                            "lg:text-lg",
                            getTextColor(background, "muted"),
                            content.descriptionClassName,
                          )}
                        >
                          {content.description}
                        </div>
                      ))}
                    {(content.actionsSlot ||
                      (content.actions && content.actions.length > 0)) &&
                      renderTabContentActions(content)}
                  </div>
                  {(content.imageSlot || content.imageSrc) && (
                    <div className="relative h-[300px] w-full lg:h-[400px]">
                      {renderTabContentImage(content)}
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </div>
        </div>
      </Tabs>
    );
  }, [
    tabsSlot,
    tabs,
    defaultTab,
    tabsListClassName,
    tabTriggerClassName,
    contentWrapperClassName,
    tabContentClassName,
    renderTabIcon,
    renderTabContentActions,
    renderTabContentImage,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="flex flex-col space-y-6 md:space-y-16">
        {(badge || heading || description) && (
          <div
            className={cn(
              "flex flex-col items-center gap-4 text-center",
              headerClassName,
            )}
          >
            {badge && (
              <Badge variant="outline" className={badgeClassName}>
                {badge}
              </Badge>
            )}
            {heading &&
              (typeof heading === "string" ? (
                <h1
                  className={cn(
                    "max-w-4xl text-3xl font-semibold md:text-6xl text-balance",
                    headingClassName,
                  )}
                >
                  {heading}
                </h1>
              ) : (
                <div
                  className={cn(
                    "max-w-4xl text-3xl font-semibold md:text-6xl text-balance",
                    headingClassName,
                  )}
                >
                  {heading}
                </div>
              ))}
            {description &&
              (typeof description === "string" ? (
                <p className={cn("text-balance", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={cn("text-balance", descriptionClassName)}>
                  {description}
                </div>
              ))}
          </div>
        )}
        {tabsContent}
      </div>
    </Section>
  );
}
