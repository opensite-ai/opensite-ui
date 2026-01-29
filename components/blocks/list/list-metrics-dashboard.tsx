"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface ListMetricItem {
  /**
   * Unique identifier for the metric
   */
  id: string;
  /**
   * Icon name for the metric (e.g., "lucide/zap")
   */
  icon?: string;
  /**
   * Display name of the metric
   */
  name?: string;
  /**
   * Current value of the metric
   */
  value?: string;
  /**
   * Previous value for comparison
   */
  previousValue?: string;
  /**
   * Percentage change from previous value
   */
  changePercentage?: number;
  /**
   * Status indicator for styling
   */
  status?: "positive" | "negative" | "neutral" | "warning";
  /**
   * Category for filtering
   */
  category?: string;
  /**
   * Additional info tooltip text
   */
  info?: string;
}

export interface ListMetricsDashboardProps {
  /**
   * Badge content displayed above the heading
   */
  badge?: React.ReactNode;
  /**
   * Custom slot for rendering badge (overrides badge)
   */
  badgeSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Description content below the heading
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Array of metric items to display
   */
  metrics?: ListMetricItem[];
  /**
   * Custom slot for rendering metrics (overrides metrics array)
   */
  metricsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the metrics container
   */
  metricsClassName?: string;
  /**
   * Categories for tab filtering
   */
  categories?: { value: string; label: string }[];
  /**
   * Last updated content
   */
  lastUpdated?: React.ReactNode;
  /**
   * Additional CSS classes for the last updated text
   */
  lastUpdatedClassName?: string;
  /**
   * Dashboard action configuration
   */
  dashboardAction?: ActionConfig;
  /**
   * Custom slot for rendering dashboard action (overrides dashboardAction)
   */
  dashboardActionSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the dashboard action
   */
  dashboardActionClassName?: string;
  /**
   * Additional CSS classes for the card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the tabs
   */
  tabsClassName?: string;
  /**
   * Additional CSS classes for the header section
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the footer section
   */
  footerClassName?: string;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
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
   * Controlled active tab value
   */
  activeCategory?: string;
  /**
   * Callback when active category changes
   */
  onActiveCategoryChange?: (category: string) => void;
}

/**
 * ListMetricsDashboard - A comprehensive metrics dashboard with tabbed category filtering,
 * status indicators, change percentages, and tooltips. Features a mobile-friendly dropdown
 * for category selection and a responsive grid layout for metric items.
 *
 * Perfect for admin dashboards, analytics pages, or status monitoring displays
 * showcasing KPIs across multiple categories like performance, security, users, and business.
 *
 * @example
 * ```tsx
 * <ListMetricsDashboard
 *   badge="System Metrics"
 *   heading="Platform Health & Performance"
 *   description="Key metrics across our infrastructure, security, and business operations."
 *   metrics={[
 *     {
 *       id: "uptime",
 *       icon: "lucide/server",
 *       name: "System Uptime",
 *       value: "99.99%",
 *       changePercentage: 0.02,
 *       status: "positive",
 *       category: "performance"
 *     }
 *   ]}
 *   dashboardAction={{ label: "View complete dashboard", href: "/dashboard" }}
 * />
 * ```
 */
export function ListMetricsDashboard({
  badge,
  badgeSlot,
  badgeClassName,
  heading,
  headingClassName,
  description,
  descriptionClassName,
  metrics,
  metricsSlot,
  metricsClassName,
  categories,
  lastUpdated,
  lastUpdatedClassName,
  dashboardAction,
  dashboardActionSlot,
  dashboardActionClassName,
  cardClassName,
  tabsClassName,
  headerClassName,
  footerClassName,
  className,
  background,
  spacing,
  pattern,
  patternOpacity,
  activeCategory: controlledActiveCategory,
  onActiveCategoryChange,
}: ListMetricsDashboardProps): React.JSX.Element {
  const [internalActiveTab, setInternalActiveTab] = React.useState("all");
  const activeTab = controlledActiveCategory ?? internalActiveTab;

  const handleTabChange = (value: string) => {
    if (onActiveCategoryChange) {
      onActiveCategoryChange(value);
    } else {
      setInternalActiveTab(value);
    }
  };

  const filteredMetrics =
    activeTab === "all"
      ? metrics
      : metrics?.filter((metric) => metric.category === activeTab);

  const renderBadge = useMemo(() => {
    if (badgeSlot) return badgeSlot;
    if (!badge) return null;

    return typeof badge === "string" ? (
      <Badge className={cn("px-3.5 py-1.5", badgeClassName)}>{badge}</Badge>
    ) : (
      <div className={badgeClassName}>{badge}</div>
    );
  }, [badgeSlot, badge, badgeClassName]);

  const renderDashboardAction = useMemo(() => {
    if (dashboardActionSlot) return dashboardActionSlot;
    if (!dashboardAction) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = dashboardAction;

    return (
      <Pressable
        asButton
        className={cn("group", actionClassName, dashboardActionClassName)}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon}
            {label}
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  }, [dashboardActionSlot, dashboardAction, dashboardActionClassName]);

  const renderMetrics = useMemo(() => {
    if (metricsSlot) return metricsSlot;

    if (!filteredMetrics || filteredMetrics.length === 0) {
      return (
        <div className="text-muted-foreground py-8 text-center">
          No metrics available for this category.
        </div>
      );
    }

    return filteredMetrics.map((metric) => (
      <div
        key={metric.id}
        className={cn(
          "hover:bg-muted/50 flex items-center justify-between px-4 py-4 transition-colors md:px-6",
          metricsClassName,
        )}
      >
        <div className="flex items-center space-x-3 md:space-x-4">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full",
              metric.status === "positive" && "bg-primary/10 text-primary",
              metric.status === "negative" &&
                "bg-destructive/10 text-destructive",
              metric.status === "warning" && "bg-accent text-accent-foreground",
              metric.status === "neutral" && "bg-muted text-muted-foreground",
            )}
          >
            {metric.icon && <DynamicIcon name={metric.icon} size={16} />}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-sm font-medium">{metric.name}</span>
              {metric.info && (
                <div className="group relative ml-1.5">
                  <DynamicIcon
                    name="lucide/info"
                    size={14}
                    className="text-muted-foreground cursor-help"
                  />
                  <div className="bg-background invisible absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 transform rounded border p-2 text-xs opacity-0 shadow-md transition-all group-hover:visible group-hover:opacity-100">
                    {metric.info}
                  </div>
                </div>
              )}
            </div>
            <span className="text-muted-foreground text-xs capitalize">
              {metric.category}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          {metric.previousValue && (
            <span className="text-muted-foreground hidden text-sm md:inline-block">
              {metric.previousValue}
            </span>
          )}

          <div className="flex flex-col items-end">
            <span className="font-bold">{metric.value}</span>

            {metric.changePercentage !== undefined && (
              <div
                className={cn(
                  "flex items-center text-xs",
                  metric.status === "positive" && "text-primary",
                  metric.status === "negative" && "text-destructive",
                  metric.status === "warning" && "text-accent-foreground",
                  metric.status === "neutral" && "text-muted-foreground",
                )}
              >
                {metric.changePercentage > 0 ? (
                  <DynamicIcon
                    name="lucide/chevron-up"
                    size={12}
                    className="mr-0.5"
                  />
                ) : metric.changePercentage < 0 ? (
                  <DynamicIcon
                    name="lucide/chevron-down"
                    size={12}
                    className="mr-0.5"
                  />
                ) : null}
                {Math.abs(metric.changePercentage)}%
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  }, [metricsSlot, filteredMetrics, metricsClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div
        className={cn(
          "mb-8 flex flex-col items-center justify-center space-y-4 text-center",
          headerClassName,
        )}
      >
        {renderBadge}
        {heading &&
          (typeof heading === "string" ? (
            <h2
              className={cn(
                "text-3xl font-bold tracking-tighter sm:text-4xl",
                headingClassName,
              )}
            >
              {heading}
            </h2>
          ) : (
            <div className={headingClassName}>{heading}</div>
          ))}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn(
                "text-muted-foreground max-w-[700px] md:text-lg",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          ))}
      </div>

      <Card className={cn("border p-0 shadow-sm", cardClassName)}>
        <CardContent className="p-0">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={handleTabChange}
            className={cn("w-full gap-0", tabsClassName)}
          >
            {categories && (
              <>
                <div className="border-b p-3 md:hidden">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                        <span>
                          {activeTab === "all"
                            ? "All Metrics"
                            : categories.find((c) => c.value === activeTab)
                                ?.label ||
                              activeTab.charAt(0).toUpperCase() +
                                activeTab.slice(1)}
                        </span>
                        <DynamicIcon
                          name="lucide/menu"
                          size={16}
                          className="ml-2"
                        />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[200px]">
                      {categories.map((category) => (
                        <DropdownMenuItem
                          key={category.value}
                          onClick={() => handleTabChange(category.value)}
                        >
                          {category.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="hidden border-b px-4 md:block">
                  <TabsList className="h-12 bg-transparent">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category.value}
                        value={category.value}
                        className={cn("rounded-none data-[state=active]:shadow-none", `data-[state=active]:${getNestedCardBg(background)}`)}
                      >
                        {category.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </>
            )}

            <TabsContent value={activeTab} className="mt-0 p-0">
              <div className="grid grid-cols-1 divide-y">{renderMetrics}</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div
        className={cn(
          "mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row",
          footerClassName,
        )}
      >
        {lastUpdated && (
          <div
            className={cn(
              "text-muted-foreground order-2 text-sm sm:order-1",
              lastUpdatedClassName,
            )}
          >
            <span className="font-medium">Last updated:</span>{" "}
            {typeof lastUpdated === "string" ? lastUpdated : lastUpdated}
          </div>
        )}
        <div className="order-1 sm:order-2">{renderDashboardAction}</div>
      </div>
    </Section>
  );
}
