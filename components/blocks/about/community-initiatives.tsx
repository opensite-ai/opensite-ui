"use client";

import * as React from "react";
import { useMemo, useCallback } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";

export interface CommunityMetric {
  /**
   * Metric value (e.g., "45%", "$2M")
   */
  value: string;
  /**
   * Metric label
   */
  label: string;
}

export interface CommunityInitiative {
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Initiative title
   */
  title: string;
  /**
   * Initiative description
   */
  description: string;
  /**
   * Icon name in format: prefix/name
   */
  icon: string;
  /**
   * Optional metrics to display
   */
  metrics?: CommunityMetric[];
  /**
   * Optional image URL
   */
  image?: string;
}

export interface CommunityCategory {
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Category title
   */
  title: string;
  /**
   */
  description: string;
  /**
   * Array of initiatives in this category
   */
  initiatives: CommunityInitiative[];
}

export interface CommunityInitiativesProps {
  /**
   * Badge/label text
   */
  badgeText?: React.ReactNode;
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Supporting description text
   */
  description?: React.ReactNode;
  /**
   * Array of DEI categories
   */
  categories?: CommunityCategory[];
  /**
   * Custom slot for rendering categories (overrides categories array)
   */
  categoriesSlot?: React.ReactNode;
  /**
   * CTA badge text
   */
  ctaBadgeText?: React.ReactNode;
  /**
   * CTA heading
   */
  ctaHeading?: React.ReactNode;
  /**
   * CTA description
   */
  ctaDescription?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
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
   * Additional CSS classes for the tabs container
   */
  tabsClassName?: string;
  /**
   * Additional CSS classes for the CTA section
   */
  ctaClassName?: string;
  /**
   * Additional CSS classes for the CTA heading
   */
  ctaHeadingClassName?: string;
  /**
   * Additional CSS classes for the CTA description
   */
  ctaDescriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
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
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * About DEI Initiatives - A comprehensive diversity, equity, and inclusion section
 * with tabbed categories and detailed initiative cards with metrics.
 *
 * Layout: Tabbed interface with alternating content/image layout for initiatives.
 * Key features: Category tabs, metrics display, responsive dropdown for mobile.
 * Best for: DEI pages, corporate responsibility sections, values showcases.
 *
 * @example
 * ```tsx
 * <CommunityInitiatives
 *   badgeText="Diversity & Inclusion"
 *   heading="Building a More Equitable Future"
 *   categories={[
 *     {
 *       id: "workplace",
 *       title: "Inclusive Workplace",
 *       description: "Creating an inclusive environment.",
 *       initiatives: [...]
 *     },
 *   ]}
 * />
 * ```
 */
export function CommunityInitiatives({
  sectionId = "community-initiatives",
  badgeText,
  heading,
  description,
  categories,
  categoriesSlot,
  ctaBadgeText,
  ctaHeading,
  ctaDescription,
  actions,
  actionsSlot,
  className,
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  tabsClassName,
  ctaClassName,
  ctaHeadingClassName,
  ctaDescriptionClassName,
  actionsClassName,
  optixFlowConfig,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
}: CommunityInitiativesProps): React.JSX.Element {
  const [activeCategory, setActiveCategory] = React.useState(
    categories?.[0]?.id || "",
  );

  const currentCategory =
    categories?.find((category) => category.id === activeCategory) ||
    categories?.[0];

  const handleCategoryChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setActiveCategory(e.target.value);
    },
    [],
  );

  const categoriesContent = useMemo(() => {
    if (categoriesSlot) return categoriesSlot;
    if (!categories || categories.length === 0) return null;

    return (
      <Tabs
        defaultValue={categories[0]?.id}
        value={activeCategory}
        onValueChange={setActiveCategory}
        className={cn("space-y-8", tabsClassName)}
      >
        <div className="flex justify-center">
          <div className="mb-0 md:mb-6 w-full md:hidden">
            <select
              value={activeCategory}
              onChange={handleCategoryChange}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <TabsList
            className={`hidden h-auto grid-cols-${categories.length} p-1 md:grid ring-2 ring-primary`}
          >
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={cn(
                  "px-3 py-2.5 cursor-pointer",
                  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                  "hover:bg-muted hover:text-muted-foreground",
                  "transition-all duration-500",
                )}
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="mx-auto max-w-2xl text-left md:text-center">
          <p className="relative">{currentCategory?.description}</p>
        </div>

        {categories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.id}
            className="space-y-12 md:space-y-24"
          >
            {category.initiatives.map((initiative, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={initiative.id}
                  className="grid items-center gap-8 md:grid-cols-12"
                >
                  <div
                    className={cn(
                      "space-y-6 md:col-span-7",
                      isEven ? "md:order-1" : "md:order-2",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("rounded-md p-2")}>
                        <DynamicIcon name={initiative.icon} size={24} />
                      </div>
                      <h3 className="text-2xl font-bold">{initiative.title}</h3>
                    </div>

                    <p className="relative">{initiative.description}</p>

                    {initiative.metrics && (
                      <div className="grid grid-cols-3 gap-4 pt-2">
                        {initiative.metrics.map((metric, i) => (
                          <div key={i} className="text-center">
                            <div className={cn("text-2xl font-bold")}>
                              {metric.value}
                            </div>
                            <div className={cn("mt-1 text-xs")}>
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {initiative.image ? (
                    <div
                      className={cn(
                        "md:col-span-5",
                        isEven ? "md:order-2" : "md:order-1",
                      )}
                    >
                      <div className="relative aspect-video overflow-hidden rounded-xl shadow-xl">
                        <Img
                          src={initiative.image}
                          alt={initiative.title}
                          className="h-full w-full object-cover"
                          optixFlowConfig={optixFlowConfig}
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "flex h-full items-center justify-center md:col-span-5",
                        isEven ? "md:order-2" : "md:order-1",
                      )}
                    >
                      <Card
                        className={cn(
                          "flex h-full min-h-[280px] w-full items-center justify-center",
                        )}
                      >
                        <CardContent className="p-6 text-center flex flex-col items-center gap-4">
                          <DynamicIcon
                            name={initiative.icon}
                            size={64}
                            className={cn(
                              "mx-auto text-card-foreground",
                              "opacity-50",
                            )}
                          />
                          <Badge className="mx-auto">{initiative.title}</Badge>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              );
            })}
          </TabsContent>
        ))}
      </Tabs>
    );
  }, [
    categoriesSlot,
    categories,
    activeCategory,
    setActiveCategory,
    tabsClassName,
    handleCategoryChange,
    currentCategory,
    optixFlowConfig,
  ]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div
        className={cn(
          "mx-auto mb-8 md:mb-16 max-w-3xl space-y-4 flex flex-col items-center",
          headerClassName,
        )}
      >
        {badgeText &&
          (typeof badgeText === "string" ? (
            <Badge className={cn("px-3", badgeClassName)}>{badgeText}</Badge>
          ) : (
            badgeText
          ))}
        {heading &&
          (typeof heading === "string" ? (
            <h2
              className={cn(
                "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance text-center",
                headingClassName,
              )}
            >
              {heading}
            </h2>
          ) : (
            heading
          ))}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn(
                "text-lg text-balance text-center",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            description
          ))}
      </div>

      {categoriesContent}

      <div
        className={cn(
          "mt-10 md:mt-24 p-6 md:p-16",
          "text-center flex flex-col items-center justify-center gap-6",
          "bg-card text-card-foreground",
          "rounded-2xl shadow-lg",
          ctaClassName,
        )}
      >
        {ctaBadgeText && (
          <div className={cn("flex items-center justify-center p-1")}>
            <Badge>{ctaBadgeText}</Badge>
          </div>
        )}

        {ctaHeading &&
          (typeof ctaHeading === "string" ? (
            <h3 className={cn("text-3xl font-bold", ctaHeadingClassName)}>
              {ctaHeading}
            </h3>
          ) : (
            ctaHeading
          ))}
        {ctaDescription &&
          (typeof ctaDescription === "string" ? (
            <p className={cn(ctaDescriptionClassName, "text-balance")}>
              {ctaDescription}
            </p>
          ) : (
            ctaDescription
          ))}

        <BlockActions
          actions={actions}
          actionsSlot={actionsSlot}
          actionsClassName={actionsClassName}
        />
      </div>
    </Section>
  );
}
