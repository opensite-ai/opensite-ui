"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
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
   * Badge text displayed above the heading
   */
  badgeText?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Array of metric items to display
   */
  metrics?: ListMetricItem[];
  /**
   * Categories for tab filtering
   */
  categories?: { value: string; label: string }[];
  /**
   * Last updated text
   */
  lastUpdated?: string;
  /**
   * Dashboard link text
   */
  dashboardLinkText?: string;
  /**
   * Dashboard link URL
   */
  dashboardLinkUrl?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

const defaultCategories = [
  { value: "all", label: "All Metrics" },
  { value: "performance", label: "Performance" },
  { value: "security", label: "Security" },
  { value: "users", label: "Users" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "business", label: "Business" },
];

const defaultMetrics: ListMetricItem[] = [
  {
    id: "response-time",
    icon: "lucide/zap",
    name: "Response Time",
    value: "32ms",
    previousValue: "39ms",
    changePercentage: -18,
    status: "positive",
    category: "performance",
    info: "Average API response time across all endpoints",
  },
  {
    id: "uptime",
    icon: "lucide/server",
    name: "System Uptime",
    value: "99.99%",
    previousValue: "99.97%",
    changePercentage: 0.02,
    status: "positive",
    category: "performance",
    info: "Service availability over the past 30 days",
  },
  {
    id: "requests",
    icon: "lucide/refresh-cw",
    name: "Requests/Sec",
    value: "45K",
    previousValue: "34K",
    changePercentage: 32,
    status: "neutral",
    category: "performance",
    info: "Peak request rate during high traffic periods",
  },
  {
    id: "blocked-threats",
    icon: "lucide/shield",
    name: "Threats Blocked",
    value: "1.2M+",
    previousValue: "970K",
    changePercentage: 24,
    status: "positive",
    category: "security",
    info: "Malicious requests blocked monthly",
  },
  {
    id: "2fa-adoption",
    icon: "lucide/alert-circle",
    name: "2FA Adoption",
    value: "78%",
    previousValue: "65%",
    changePercentage: 20,
    status: "positive",
    category: "security",
    info: "Percentage of users with 2FA enabled",
  },
  {
    id: "active-users",
    icon: "lucide/users",
    name: "Active Users",
    value: "2.4M",
    previousValue: "2.05M",
    changePercentage: 17,
    status: "positive",
    category: "users",
    info: "Monthly active users",
  },
  {
    id: "retention",
    icon: "lucide/bar-chart-3",
    name: "30d Retention",
    value: "84%",
    previousValue: "79%",
    changePercentage: 6.3,
    status: "positive",
    category: "users",
    info: "User retention rate after 30 days",
  },
  {
    id: "data-processed",
    icon: "lucide/hard-drive",
    name: "Data Processed",
    value: "8.7 PB",
    previousValue: "6.1 PB",
    changePercentage: 42,
    status: "neutral",
    category: "infrastructure",
    info: "Total data processed monthly",
  },
  {
    id: "bandwidth",
    icon: "lucide/globe",
    name: "Bandwidth Usage",
    value: "240 TB",
    previousValue: "190 TB",
    changePercentage: 26,
    status: "warning",
    category: "infrastructure",
    info: "Total bandwidth consumption this month",
  },
  {
    id: "transactions",
    icon: "lucide/credit-card",
    name: "Transactions",
    value: "$740M",
    previousValue: "$578M",
    changePercentage: 28,
    status: "positive",
    category: "business",
    info: "Total transaction volume processed",
  },
  {
    id: "mrr",
    icon: "lucide/line-chart",
    name: "MRR",
    value: "$4.2M",
    previousValue: "$3.6M",
    changePercentage: 16.7,
    status: "positive",
    category: "business",
    info: "Monthly recurring revenue",
  },
];

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
 *   badgeText="System Metrics"
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
 *   dashboardLinkText="View complete dashboard"
 *   dashboardLinkUrl="/dashboard"
 * />
 * ```
 */
export function ListMetricsDashboard({
  badgeText = "System Metrics",
  heading = "Platform Health & Performance",
  description = "Key metrics across our infrastructure, security, and business operations.",
  metrics = defaultMetrics,
  categories = defaultCategories,
  lastUpdated = "Today at 15:42 UTC",
  dashboardLinkText = "View complete dashboard",
  dashboardLinkUrl = "#",
  className,
}: ListMetricsDashboardProps): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState("all");

  const filteredMetrics =
    activeTab === "all"
      ? metrics
      : metrics.filter((metric) => metric.category === activeTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <section className={cn("bg-background w-full py-12 md:py-24", className)}>
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">{badgeText}</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-lg">
            {description}
          </p>
        </div>

        <Card className="border p-0 shadow-sm">
          <CardContent className="p-0">
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full gap-0"
            >
              {/* Mobile view: Dropdown for categories */}
              <div className="border-b p-3 md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <span>
                        {activeTab === "all"
                          ? "All Metrics"
                          : categories.find((c) => c.value === activeTab)
                              ?.label || activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
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

              {/* Desktop view: Horizontal tabs */}
              <div className="hidden border-b px-4 md:block">
                <TabsList className="h-12 bg-transparent">
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category.value}
                      value={category.value}
                      className="data-[state=active]:bg-muted rounded-none data-[state=active]:shadow-none"
                    >
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value={activeTab} className="mt-0 p-0">
                <div className="grid grid-cols-1 divide-y">
                  {filteredMetrics.length === 0 ? (
                    <div className="text-muted-foreground py-8 text-center">
                      No metrics available for this category.
                    </div>
                  ) : (
                    filteredMetrics.map((metric) => (
                      <div
                        key={metric.id}
                        className="hover:bg-muted/50 flex items-center justify-between px-4 py-4 transition-colors md:px-6"
                      >
                        <div className="flex items-center space-x-3 md:space-x-4">
                          <div
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-full",
                              metric.status === "positive" &&
                                "bg-green-100 text-green-600",
                              metric.status === "negative" &&
                                "bg-red-100 text-red-600",
                              metric.status === "warning" &&
                                "bg-amber-100 text-amber-600",
                              metric.status === "neutral" &&
                                "bg-blue-100 text-blue-600"
                            )}
                          >
                            {metric.icon && (
                              <DynamicIcon name={metric.icon} size={16} />
                            )}
                          </div>

                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <span className="text-sm font-medium">
                                {metric.name}
                              </span>
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
                                  metric.status === "positive" &&
                                    "text-green-600",
                                  metric.status === "negative" && "text-red-600",
                                  metric.status === "warning" &&
                                    "text-amber-600",
                                  metric.status === "neutral" && "text-blue-600"
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
                    ))
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-muted-foreground order-2 text-sm sm:order-1">
            <span className="font-medium">Last updated:</span> {lastUpdated}
          </div>

          <Pressable
            href={dashboardLinkUrl}
            variant="outline"
            size="sm"
            asButton
            className="group order-1 sm:order-2"
          >
            {dashboardLinkText}
            <DynamicIcon
              name="lucide/arrow-right"
              size={16}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </Pressable>
        </div>
      </div>
    </section>
  );
}
