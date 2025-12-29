"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

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
}

const defaultCategories: CommunityCategory[] = [
  {
    id: "workplace",
    title: "Inclusive Workplace",
    description:
      "Creating an environment where everyone feels welcome, respected, and able to contribute their best work.",
    initiatives: [
      {
        id: "hiring",
        title: "Inclusive Hiring",
        description:
          "We've implemented structured interviewing and blind resume reviews to minimize bias in our hiring process. Our job descriptions are crafted to be inclusive, and we partner with organizations focused on underrepresented groups in tech.",
        icon: "lucide/user-plus",
        metrics: [
          { value: "45%", label: "Women in leadership" },
          { value: "38%", label: "Employees from underrepresented groups" },
          { value: "30+", label: "Countries represented" },
        ],
        image: imagePlaceholders[0],
      },
      {
        id: "education",
        title: "Ongoing Education",
        description:
          "Regular workshops, training sessions, and open discussions that help our team understand the importance of diversity and how to be more inclusive in their daily interactions.",
        icon: "lucide/globe",
        metrics: [
          { value: "100%", label: "Employees trained in DEI" },
          { value: "12", label: "DEI workshops per year" },
          { value: "4.8/5", label: "Average workshop rating" },
        ],
      },
      {
        id: "ergs",
        title: "Employee Resource Groups",
        description:
          "We support and fund employee-led groups that foster a diverse, inclusive workplace aligned with our organizational values. These groups serve as resources for employees and the company.",
        icon: "lucide/users",
        metrics: [
          { value: "9", label: "Active ERGs" },
          { value: "68%", label: "Employee participation" },
          { value: "$150K", label: "Annual ERG funding" },
        ],
        image: imagePlaceholders[1],
      },
    ],
  },
  {
    id: "product",
    title: "Inclusive Products",
    description:
      "Designing products and services that work for everyone, regardless of background or ability.",
    initiatives: [
      {
        id: "accessibility",
        title: "Accessibility Standards",
        description:
          "Our product teams adhere to WCAG 2.1 AA standards at minimum. We regularly conduct accessibility audits and include people with disabilities in our user testing to ensure our products work for everyone.",
        icon: "lucide/heart-handshake",
        metrics: [
          { value: "100%", label: "WCAG 2.1 AA compliance" },
          { value: "Quarterly", label: "Accessibility audits" },
          { value: "15+", label: "Inclusive design patterns" },
        ],
        image: imagePlaceholders[2],
      },
      {
        id: "localization",
        title: "Global Localization",
        description:
          "We design our products with global audiences in mind, accounting for cultural differences, language nuances, and regional preferences to create truly inclusive experiences.",
        icon: "lucide/globe",
        metrics: [
          { value: "24", label: "Supported languages" },
          { value: "95%", label: "Translation coverage" },
          { value: "12", label: "Localization specialists" },
        ],
      },
      {
        id: "diverse-testing",
        title: "Diverse User Testing",
        description:
          "We ensure our user research and testing includes diverse participants across demographics, abilities, and backgrounds to capture a wide range of perspectives and needs.",
        icon: "lucide/users",
        metrics: [
          { value: "500+", label: "Diverse testers" },
          { value: "40+", label: "Countries represented" },
          { value: "20%", label: "Testers with disabilities" },
        ],
        image: imagePlaceholders[3],
      },
    ],
  },
  {
    id: "community",
    title: "Community Impact",
    description:
      "Extending our commitment beyond our company to create positive change in the broader community.",
    initiatives: [
      {
        id: "partnerships",
        title: "Strategic Partnerships",
        description:
          "We collaborate with organizations that promote diversity in tech and education, providing funding, volunteer hours, and expertise to support their important work.",
        icon: "lucide/heart-handshake",
        metrics: [
          { value: "15+", label: "Partner organizations" },
          { value: "$2M", label: "Annual contributions" },
          { value: "5,000+", label: "Volunteer hours" },
        ],
        image: imagePlaceholders[4],
      },
      {
        id: "education-initiatives",
        title: "Education Initiatives",
        description:
          "We run programs that introduce technology careers to underrepresented groups, including coding camps, mentorship programs, and scholarships for promising students.",
        icon: "lucide/users",
        metrics: [
          { value: "250", label: "Annual scholarships" },
          { value: "1,200+", label: "Students mentored" },
          { value: "85%", label: "Program graduation rate" },
        ],
      },
      {
        id: "supplier-diversity",
        title: "Supplier Diversity",
        description:
          "We actively seek to work with diverse suppliers and vendors, ensuring our procurement practices reflect our commitment to economic inclusion.",
        icon: "lucide/bar-chart",
        metrics: [
          { value: "32%", label: "Diverse suppliers" },
          { value: "$12M+", label: "Annual diverse spend" },
          { value: "4x", label: "Growth in 3 years" },
        ],
        image: imagePlaceholders[5],
      },
    ],
  },
  {
    id: "transparency",
    title: "Transparency & Progress",
    description:
      "Measuring our progress, holding ourselves accountable, and sharing our journey openly.",
    initiatives: [
      {
        id: "reporting",
        title: "Public Reporting",
        description:
          "We publish annual diversity reports that share our demographics, goals, successes, and areas for improvement. We believe transparency drives accountability and progress.",
        icon: "lucide/bar-chart",
        metrics: [
          { value: "5", label: "Years of public reporting" },
          { value: "12", label: "Tracked metrics" },
          { value: "Quarterly", label: "Internal updates" },
        ],
        image: imagePlaceholders[6],
      },
      {
        id: "goals",
        title: "Measurable Goals",
        description:
          "We set specific, measurable goals for diversity, equity, and inclusion across all aspects of our business, with executive accountability for progress.",
        icon: "lucide/medal",
        metrics: [
          { value: "15%", label: "YoY diversity growth" },
          { value: "100%", label: "Pay equity achieved" },
          { value: "90%", label: "Belonging index score" },
        ],
      },
      {
        id: "recognition",
        title: "External Recognition",
        description:
          "While we don't pursue DEI work for awards, we're proud to be recognized for our efforts by independent organizations that evaluate workplace equality.",
        icon: "lucide/medal",
        metrics: [
          { value: "Top 10", label: "Most inclusive employers" },
          { value: "100%", label: "HRC equality index" },
          { value: "5 Stars", label: "Disability equality index" },
        ],
        image: imagePlaceholders[7],
      },
    ],
  },
];

const defaultActions: ActionConfig[] = [
  {
    label: "Join Our Team",
    href: "/careers",
    variant: "default",
    size: "lg",
  },
  {
    label: "Read Our Annual Report",
    href: "/about/dei-report",
    variant: "outline",
    size: "lg",
  },
];

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
  badgeText = "Diversity & Inclusion",
  heading = "Building a More Equitable Future Together",
  description = "Our commitment to diversity, equity, and inclusion runs deep in everything we do—from how we build our teams to how we build our products.",
  categories = defaultCategories,
  categoriesSlot,
  ctaBadgeText = "Join us in making a difference",
  ctaHeading = "Become Part of Our Inclusive Community",
  ctaDescription = "We're always looking for passionate individuals who share our commitment to diversity, equity, and inclusion to join our team.",
  actions = defaultActions,
  actionsSlot,
  className,
  containerClassName,
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
}: CommunityInitiativesProps): React.JSX.Element {
  const [activeCategory, setActiveCategory] = React.useState(
    categories[0]?.id || ""
  );

  const currentCategory =
    categories.find((category) => category.id === activeCategory) ||
    categories[0];

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("flex flex-wrap justify-center gap-4", actionsClassName)}>
        {actions.map((action, idx) => (
          <Pressable
            key={idx}
            href={action.href}
            onClick={action.onClick}
            variant={action.variant || "default"}
            size={action.size || "lg"}
            asButton
          >
            {action.label}
          </Pressable>
        ))}
      </div>
    );
  };

  const renderCategories = () => {
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
          <div className="mb-6 w-full md:hidden">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <TabsList className="hidden h-auto grid-cols-4 p-1 md:grid">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-3 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-muted-foreground">
            {currentCategory?.description}
          </p>
        </div>

        {categories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.id}
            className="space-y-12"
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
                      isEven ? "md:order-1" : "md:order-2"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-primary/10 p-2">
                        <DynamicIcon
                          name={initiative.icon}
                          size={24}
                          className="text-primary"
                        />
                      </div>
                      <h3 className="text-2xl font-bold">
                        {initiative.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground">
                      {initiative.description}
                    </p>

                    {initiative.metrics && (
                      <div className="grid grid-cols-3 gap-4 pt-2">
                        {initiative.metrics.map((metric, i) => (
                          <div key={i} className="text-center">
                            <div className="text-2xl font-bold text-primary">
                              {metric.value}
                            </div>
                            <div className="mt-1 text-xs text-muted-foreground">
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
                        isEven ? "md:order-2" : "md:order-1"
                      )}
                    >
                      <div className="relative aspect-4/3 overflow-hidden rounded-xl">
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
                        isEven ? "md:order-2" : "md:order-1"
                      )}
                    >
                      <Card className="flex h-full min-h-[280px] w-full items-center justify-center bg-muted/30">
                        <CardContent className="p-6 text-center">
                          <DynamicIcon
                            name={initiative.icon}
                            size={64}
                            className="mx-auto mb-4 text-muted-foreground/50"
                          />
                          <Badge variant="secondary" className="mx-auto">
                            Learn more about our{" "}
                            {initiative.title.toLowerCase()} initiative
                          </Badge>
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
  };

  return (
    <section className={cn("py-24", className)}>
      <div className={cn("container mx-auto px-4 md:px-6 2xl:max-w-[1400px]", containerClassName)}>
        <div className={cn("mx-auto mb-16 max-w-3xl space-y-4 text-center", headerClassName)}>
          {badgeText && (
            typeof badgeText === "string" ? (
              <div className={cn("inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary", badgeClassName)}>
                {badgeText}
              </div>
            ) : (
              <div className={badgeClassName}>{badgeText}</div>
            )
          )}
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("text-3xl font-bold tracking-tight md:text-4xl", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("text-muted-foreground", descriptionClassName)}>{description}</p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>

        {renderCategories()}

        <div className={cn("mt-20 text-center", ctaClassName)}>
          {ctaBadgeText && (
            <div className="mb-8 inline-flex items-center justify-center rounded-full bg-muted p-1">
              <Badge className="rounded-full bg-primary px-4 py-1 text-primary-foreground">
                {ctaBadgeText}
              </Badge>
            </div>
          )}

          {ctaHeading && (
            typeof ctaHeading === "string" ? (
              <h3 className={cn("mb-4 text-2xl font-bold", ctaHeadingClassName)}>{ctaHeading}</h3>
            ) : (
              <div className={cn("mb-4", ctaHeadingClassName)}>{ctaHeading}</div>
            )
          )}
          {ctaDescription && (
            typeof ctaDescription === "string" ? (
              <p className={cn("mx-auto mb-8 max-w-2xl text-muted-foreground", ctaDescriptionClassName)}>
                {ctaDescription}
              </p>
            ) : (
              <div className={cn("mx-auto mb-8 max-w-2xl", ctaDescriptionClassName)}>{ctaDescription}</div>
            )
          )}

          {renderActions()}
        </div>
      </div>
    </section>
  );
}
