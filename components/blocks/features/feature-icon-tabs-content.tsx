"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Badge } from "../../ui/badge";
import { Img } from "@page-speed/img";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface FeatureIconTabsContentTab {
  /**
   * Tab value identifier
   */
  value: string;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/zap")
   */
  icon: string;
  /**
   * Tab label text
   */
  label: string;
  /**
   * Tab content configuration
   */
  content: {
    badge: string;
    title: string;
    description: string;
    buttonText: string;
    imageSrc: string;
    imageAlt: string;
  };
}

export interface FeatureIconTabsContentProps {
  /**
   * Badge text
   */
  badge?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Array of tab configurations
   */
  tabs?: FeatureIconTabsContentTab[];
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
 *       icon: "lucide/zap",
 *       label: "Boost Revenue",
 *       content: {
 *         badge: "Modern Tactics",
 *         title: "Make your site stand out",
 *         description: "Discover new web trends.",
 *         buttonText: "See Plans",
 *         imageSrc: "/feature.jpg",
 *         imageAlt: "Feature"
 *       }
 *     },
 *   ]}
 * />
 * ```
 */
export function FeatureIconTabsContent({
  badge = "Opensite AI",
  heading = "A Collection of Components Built With Opensite AI & Tailwind",
  description = "Join us to build flawless web solutions.",
  tabs = [
    {
      value: "tab-1",
      icon: "lucide/zap",
      label: "Boost Revenue",
      content: {
        badge: "Modern Tactics",
        title: "Make your site a true standout.",
        description:
          "Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.",
        buttonText: "See Plans",
        imageSrc: blockBrandedIconsAndPlaceholders.placeholder1,
        imageAlt: "Feature illustration",
      },
    },
    {
      value: "tab-2",
      icon: "lucide/pointer",
      label: "Higher Engagement",
      content: {
        badge: "Expert Features",
        title: "Boost your site with top-tier design.",
        description:
          "Use stellar design to easily engage users and strengthen their loyalty. Create a seamless experience that keeps them coming back for more.",
        buttonText: "See Tools",
        imageSrc: blockBrandedIconsAndPlaceholders.placeholderDark1,
        imageAlt: "Feature illustration",
      },
    },
    {
      value: "tab-3",
      icon: "lucide/layout",
      label: "Stunning Layouts",
      content: {
        badge: "Elite Solutions",
        title: "Build an advanced web experience.",
        description:
          "Lift your brand with modern tech that grabs attention and drives action. Create a digital experience that stands out from the crowd.",
        buttonText: "See Options",
        imageSrc: blockBrandedIconsAndPlaceholders.placeholder3,
        imageAlt: "Feature illustration",
      },
    },
  ],
  className,
  optixFlowConfig,
}: FeatureIconTabsContentProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          {badge && <Badge variant="outline">{badge}</Badge>}
          {heading && (
            <h1 className="max-w-2xl text-3xl font-semibold md:text-4xl">
              {heading}
            </h1>
          )}
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        <Tabs defaultValue={tabs[0]?.value} className="mt-8">
          <TabsList className="container flex flex-col items-center justify-center gap-4 bg-transparent sm:flex-row md:gap-10">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
              >
                <DynamicIcon name={tab.icon} size={16} />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-8 max-w-7xl rounded-2xl bg-muted/70 p-6 lg:p-16">
            <div className="relative">
              {tabs.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="grid place-items-start gap-20 lg:grid-cols-2 lg:gap-10"
                >
                  <div className="flex flex-col gap-5">
                    <Badge variant="outline" className="w-fit bg-background">
                      {tab.content.badge}
                    </Badge>
                    <h3 className="text-3xl font-semibold lg:text-5xl">
                      {tab.content.title}
                    </h3>
                    <p className="text-muted-foreground lg:text-lg">
                      {tab.content.description}
                    </p>
                    <Pressable
                      href="#"
                      variant="default"
                      size="lg"
                      asButton
                      className="mt-2.5 w-fit gap-2"
                    >
                      {tab.content.buttonText}
                    </Pressable>
                  </div>
                  <div className="relative h-[300px] w-full lg:h-[400px]">
                    <Img
                      src={tab.content.imageSrc}
                      alt={tab.content.imageAlt}
                      className="h-full w-full rounded-xl object-cover"
                      loading="lazy"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
