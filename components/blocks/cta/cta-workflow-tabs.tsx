"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface CtaWorkflowTabItem {
  /**
   * Tab ID
   */
  id: string;
  /**
   * Tab label
   */
  label?: string;
  /**
   * Tab icon name
   */
  icon?: string;
  /**
   * Tab content heading
   */
  heading?: string;
  /**
   * Tab content description
   */
  description?: string;
  /**
   * Stats to display
   */
  stats?: Array<{ value: string; label: string }>;
  /**
   * Image URL for the tab content
   */
  image?: string;
}

export interface CtaWorkflowTabsProps {
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Primary button text
   */
  primaryButtonText?: string;
  /**
   * Primary button URL
   */
  primaryButtonUrl?: string;
  /**
   * Secondary button text
   */
  secondaryButtonText?: string;
  /**
   * Secondary button URL
   */
  secondaryButtonUrl?: string;
  /**
   * Array of tab items
   */
  tabs?: CtaWorkflowTabItem[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultTabs: CtaWorkflowTabItem[] = [
  {
    id: "design",
    label: "Design",
    icon: "lucide/palette",
    heading: "Design with ease",
    description:
      "Create beautiful interfaces with our intuitive design tools. No coding required.",
    stats: [
      { value: "50+", label: "Templates" },
      { value: "100+", label: "Components" },
    ],
    image: imagePlaceholders[13],
  },
  {
    id: "develop",
    label: "Develop",
    icon: "lucide/code",
    heading: "Develop faster",
    description:
      "Write clean, maintainable code with our powerful development tools.",
    stats: [
      { value: "10x", label: "Faster" },
      { value: "99%", label: "Less bugs" },
    ],
    image: imagePlaceholders[14],
  },
  {
    id: "deploy",
    label: "Deploy",
    icon: "lucide/rocket",
    heading: "Deploy instantly",
    description:
      "Ship to production with one click. Automatic scaling and monitoring included.",
    stats: [
      { value: "1-click", label: "Deploy" },
      { value: "99.9%", label: "Uptime" },
    ],
    image: imagePlaceholders[15],
  },
];

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
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   tabs={[
 *     { id: "design", label: "Design", icon: "lucide/palette", ... }
 *   ]}
 * />
 * ```
 */
export function CtaWorkflowTabs({
  heading = "Build your workflow",
  description = "From design to deployment, we've got you covered. Choose your path and start building today.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Learn More",
  secondaryButtonUrl = "#",
  tabs = defaultTabs,
  className,
  optixFlowConfig,
}: CtaWorkflowTabsProps): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState(tabs[0]?.id || "");
  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">{heading}</h2>
          <p className="mb-8 text-lg text-muted-foreground">{description}</p>
          <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Pressable
              href={primaryButtonUrl}
              variant="default"
              size="lg"
              asButton
            >
              {primaryButtonText}
              <DynamicIcon
                name="lucide/arrow-right"
                size={16}
                className="ml-2"
              />
            </Pressable>
            <Pressable
              href={secondaryButtonUrl}
              variant="outline"
              size="lg"
              asButton
            >
              {secondaryButtonText}
            </Pressable>
          </div>
        </div>

        <div className="mt-12">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-lg border bg-muted p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.icon && <DynamicIcon name={tab.icon} size={16} />}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {activeTabData && (
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h3 className="mb-4 text-2xl font-bold md:text-3xl">
                  {activeTabData.heading}
                </h3>
                <p className="mb-6 text-lg text-muted-foreground">
                  {activeTabData.description}
                </p>
                {activeTabData.stats && (
                  <div className="flex gap-8">
                    {activeTabData.stats.map((stat, index) => (
                      <div key={index}>
                        <div className="text-3xl font-bold text-primary">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="overflow-hidden rounded-xl border shadow-lg">
                <Img
                  src={activeTabData.image || imagePlaceholders[0]}
                  alt={activeTabData.heading || ""}
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
