"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  StatItem,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaWorkflowTabItem {
  /**
   * Tab ID
   */
  id: string;
  /**
   * Tab label
   */
  label?: React.ReactNode;
  /**
   * Tab icon name
   */
  iconName?: string;
  /**
   * Custom tab icon element
   */
  icon?: React.ReactNode;
  /**
   * Tab content heading
   */
  heading?: React.ReactNode;
  /**
   * Tab content description
   */
  description?: React.ReactNode;
  /**
   * Stats to display
   */
  stats?: StatItem[];
  /**
   * Image URL for the tab content
   */
  image?: string;
  /**
   * Additional CSS classes for the tab
   */
  className?: string;
}

export interface CtaWorkflowTabsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description content below the heading
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of tab items
   */
  tabs?: CtaWorkflowTabItem[];
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
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the tabs wrapper
   */
  tabsWrapperClassName?: string;
  /**
   * Additional CSS classes for the tab buttons container
   */
  tabButtonsClassName?: string;
  /**
   * Additional CSS classes for each tab button
   */
  tabButtonClassName?: string;
  /**
   * Additional CSS classes for the tab content area
   */
  tabContentClassName?: string;
  /**
   * Additional CSS classes for the tab image wrapper
   */
  tabImageClassName?: string;
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
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * CtaWorkflowTabs - A hero CTA with tabbed content sections for design, develop,
 * and deploy workflows. Each tab shows stats and an image. Great for showcasing
 * product capabilities.
 *
 * @example
 * ```tsx
 * <CtaWorkflowTabs
 *   heading="Build your workflow"
 *   description="From design to deployment, we've got you covered."
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "default" },
 *     { label: "Learn More", href: "/about", variant: "outline" }
 *   ]}
 *   tabs={[
 *     { id: "design", label: "Design", iconName: "lucide/palette", ... }
 *   ]}
 * />
 * ```
 */
export function CtaWorkflowTabs({
  heading,
  description,
  actions,
  actionsSlot,
  tabs,
  tabsSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  tabsWrapperClassName,
  tabButtonsClassName,
  tabButtonClassName,
  tabContentClassName,
  tabImageClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: CtaWorkflowTabsProps): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState(tabs?.[0]?.id || "");
  const activeTabData = tabs?.find((tab) => tab.id === activeTab) || tabs?.[0];

  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "mb-8 flex flex-col justify-center gap-3 sm:flex-row",
          actionsClassName,
        )}
      >
        {actions.map((action, index) => {
          const isFirstAction = index === 0;
          return (
            <Pressable
              key={index}
              href={action.href}
              onClick={action.onClick}
              variant={action.variant}
              size={action.size}
              className={action.className}
              aria-label={action["aria-label"]}
              asButton
            >
              {action.icon}
              {action.children ?? action.label}
              {action.iconAfter ??
                (isFirstAction && (
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="ml-2"
                  />
                ))}
            </Pressable>
          );
        })}
      </div>
    );
  }, [actionsSlot, actions, actionsClassName]);

  const tabsContent = useMemo(() => {
    if (tabsSlot) return tabsSlot;
    if (!tabs || tabs.length === 0) return null;

    return (
      <div className={cn("mt-12", tabsWrapperClassName)}>
        <div className="mb-8 flex justify-center">
          <div
            className={cn(
              "inline-flex rounded-lg border bg-muted p-1",
              tabButtonsClassName,
            )}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-background shadow-sm"
                    : "text-muted-foreground",
                  tabButtonClassName,
                  tab.className,
                )}
              >
                {tab.icon ??
                  (tab.iconName && (
                    <DynamicIcon name={tab.iconName} size={16} />
                  ))}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTabData && (
          <div
            className={cn(
              "grid gap-8 lg:grid-cols-2 lg:items-center",
              tabContentClassName,
            )}
          >
            <div>
              {activeTabData.heading && (
                typeof activeTabData.heading === "string" ? (
                  <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                    {activeTabData.heading}
                  </h3>
                ) : (
                  <div className="mb-4">{activeTabData.heading}</div>
                )
              )}
              {activeTabData.description && (
                typeof activeTabData.description === "string" ? (
                  <p className="mb-6 text-lg text-muted-foreground">
                    {activeTabData.description}
                  </p>
                ) : (
                  <div className="mb-6">{activeTabData.description}</div>
                )
              )}
              {activeTabData.stats && activeTabData.stats.length > 0 && (
                <div className="flex gap-8">
                  {activeTabData.stats.map((stat, index) => (
                    <div key={index}>
                      {stat.icon && <div className="mb-1">{stat.icon}</div>}
                      {stat.value && (
                        <div className="text-3xl font-bold text-primary">
                          {stat.value}
                        </div>
                      )}
                      {stat.label && (
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {activeTabData.image && (
              <div
                className={cn(
                  "overflow-hidden rounded-xl border shadow-lg",
                  tabImageClassName,
                )}
              >
                <Img
                  src={activeTabData.image}
                  alt={
                    typeof activeTabData.heading === "string"
                      ? activeTabData.heading
                      : ""
                  }
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }, [tabsSlot, tabs, activeTab, activeTabData, tabsWrapperClassName, tabButtonsClassName, tabButtonClassName, tabContentClassName, tabImageClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto max-w-3xl text-center", contentClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h2
                className={cn(
                  "mb-4 text-3xl font-bold md:text-5xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={cn("mb-4", headingClassName)}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p
                className={cn(
                  "mb-8 text-lg text-muted-foreground",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={cn("mb-8", descriptionClassName)}>{description}</div>
            )
          )}
          {actionsContent}
        </div>
        {tabsContent}
      </div>
    </Section>
  );
}
