"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Img } from "@page-speed/img";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

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
   * Array of action configurations for CTA buttons
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
}

/**
 * Feature Icon Tabs Content - Tabbed interface with icon triggers and
 * content panels featuring images and CTAs.
 *
 * Layout: Centered header with icon tabs, muted background content area.
 * Key features: Icon tab triggers, badge labels, CTA buttons, responsive images.
 * Best for: Feature categories, product tours, service breakdowns.
 *
 * @example
 * ```tsx
 * <FeatureIconTabsContent
 *   badge="Features"
 *   heading="A Collection of Components"
 *   tabs={[
 *     {
 *       value: "tab-1",
 *       iconName: "lucide/zap",
 *       label: "Boost Revenue",
 *       content: {
 *         badge: "Modern Tactics",
 *         title: "Make your site stand out",
 *         description: "Discover new web trends.",
 *         actions: [{ label: "See Plans", href: "#", variant: "default" }],
 *         imageSrc: "/feature.jpg",
 *         imageAlt: "Feature"
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
  containerClassName,
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  tabsListClassName,
  tabTriggerClassName,
  contentWrapperClassName,
  tabContentClassName,
  optixFlowConfig,
}: FeatureIconTabsContentProps): React.JSX.Element {
  const renderTabIcon = (tab: FeatureIconTabsContentTab) => {
    if (tab.icon) return tab.icon;
    if (tab.iconName) return <DynamicIcon name={tab.iconName} size={16} />;
    return <DynamicIcon name="lucide/star" size={16} />;
  };

  const renderTabContentActions = (content: FeatureIconTabsContentTabContent) => {
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
  };

  const renderTabContentImage = (content: FeatureIconTabsContentTabContent) => {
    if (content.imageSlot) return content.imageSlot;
    if (content.imageSrc) {
      return (
        <Img
          src={content.imageSrc}
          alt={content.imageAlt || "Tab content image"}
          className={cn("h-full w-full rounded-xl object-cover", content.imageClassName)}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
      );
    }
    return null;
  };

  const renderTabs = () => {
    if (tabsSlot) return tabsSlot;
    if (!tabs || tabs.length === 0) return null;

    const activeDefaultTab = defaultTab || tabs[0]?.value;

    return (
      <Tabs defaultValue={activeDefaultTab} className="mt-8">
        <TabsList className={cn("container flex flex-col items-center justify-center gap-4 bg-transparent sm:flex-row md:gap-10", tabsListClassName)}>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={cn("flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary", tabTriggerClassName, tab.className)}
            >
              {renderTabIcon(tab)}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className={cn("mx-auto mt-8 max-w-7xl rounded-2xl bg-muted/70 p-6 lg:p-16", contentWrapperClassName)}>
          <div className="relative">
            {tabs.map((tab) => {
              if (tab.contentSlot) {
                return (
                  <TabsContent key={tab.value} value={tab.value} className={tabContentClassName}>
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
                  className={cn("grid place-items-start gap-20 lg:grid-cols-2 lg:gap-10", tabContentClassName, content.className)}
                >
                  <div className="flex flex-col gap-5">
                    {content.badge && (
                      <Badge variant="outline" className={cn("w-fit bg-background", content.badgeClassName)}>
                        {content.badge}
                      </Badge>
                    )}
                    {content.title && (
                      typeof content.title === "string" ? (
                        <h3 className={cn("text-3xl font-semibold lg:text-5xl", content.titleClassName)}>
                          {content.title}
                        </h3>
                      ) : (
                        <div className={cn("text-3xl font-semibold lg:text-5xl", content.titleClassName)}>
                          {content.title}
                        </div>
                      )
                    )}
                    {content.description && (
                      typeof content.description === "string" ? (
                        <p className={cn("text-muted-foreground lg:text-lg", content.descriptionClassName)}>
                          {content.description}
                        </p>
                      ) : (
                        <div className={cn("text-muted-foreground lg:text-lg", content.descriptionClassName)}>
                          {content.description}
                        </div>
                      )
                    )}
                    {renderTabContentActions(content)}
                  </div>
                  <div className="relative h-[300px] w-full lg:h-[400px]">
                    {renderTabContentImage(content)}
                  </div>
                </TabsContent>
              );
            })}
          </div>
        </div>
      </Tabs>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container mx-auto", containerClassName)}>
        <div className={cn("flex flex-col items-center gap-4 text-center", headerClassName)}>
          {badge && <Badge variant="outline" className={badgeClassName}>{badge}</Badge>}
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("max-w-2xl text-3xl font-semibold md:text-4xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <div className={cn("max-w-2xl text-3xl font-semibold md:text-4xl", headingClassName)}>
                {heading}
              </div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("text-muted-foreground", descriptionClassName)}>{description}</p>
            ) : (
              <div className={cn("text-muted-foreground", descriptionClassName)}>{description}</div>
            )
          )}
        </div>
        {renderTabs()}
      </div>
    </section>
  );
}
