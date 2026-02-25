"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent } from "../../ui/card";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { BlockActions } from "@/components/ui/block-actions";
import { Badge } from "@/src";
import {
  ContentGroup,
  type ContentGroupItem,
} from "@/components/ui/content-group";

export interface CultureTestimonial {
  /**
   * Testimonial quote
   */
  quote: string;
  /**
   * Author name
   */
  author: string;
  /**
   * Author role/title
   */
  role: string;
  /**
   * Author avatar URL
   */
  avatar: string;
}

export interface CultureAspect {
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Aspect title
   */
  title: string;
  /**
   * Aspect description
   */
  description: string;
  /**
   * Array of image URLs
   */
  images: string[];
  /**
   * Testimonial for this aspect
   */
  testimonial: CultureTestimonial;
}

export interface AboutCultureTabsProps {
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
   * Array of culture aspects
   */
  aspects?: CultureAspect[];
  /**
   * Custom slot for rendering aspects (overrides aspects array)
   */
  aspectsSlot?: React.ReactNode;
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
   * CTA section images
   */
  ctaImages?: string[];
  /**
   * Custom slot for rendering CTA images (overrides ctaImages array)
   */
  ctaImagesSlot?: React.ReactNode;
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
}

/**
 * About Culture Tabs - A tabbed company culture section with testimonials,
 * image galleries, and a careers CTA.
 *
 * Layout: Tabbed interface with description, testimonial card, and image grid.
 * Key features: Culture aspect tabs, employee testimonials, image galleries.
 * Best for: Company culture pages, careers sections, about us pages.
 *
 * @example
 * ```tsx
 * <AboutCultureTabs
 *   badgeText="Our Culture"
 *   heading="What Makes Us Different"
 *   aspects={[
 *     {
 *       id: "innovation",
 *       title: "Innovation First",
 *       description: "We believe in challenging the status quo.",
 *       images: [...],
 *       testimonial: { quote: "...", author: "...", role: "...", avatar: "..." },
 *     },
 *   ]}
 * />
 * ```
 */
export function AboutCultureTabs({
  badgeText,
  heading,
  description,
  aspects,
  aspectsSlot,
  ctaHeading,
  ctaDescription,
  ctaImages,
  ctaImagesSlot,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  tabsClassName,
  ctaClassName,
  ctaHeadingClassName,
  ctaDescriptionClassName,
  actions,
  actionsSlot,
  actionsClassName,
  optixFlowConfig,
  background,
  spacing = "xl",
  pattern,
  patternOpacity,
}: AboutCultureTabsProps): React.JSX.Element {
  const resolvedAspects = aspects ?? [];
  const [activeTab, setActiveTab] = React.useState(
    resolvedAspects[0]?.id || "",
  );

  const headerItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (badgeText) {
      if (typeof badgeText === "string") {
        items.push(
          <Badge key="badge" className={cn("px-3 py-1", badgeClassName)}>
            {badgeText}
          </Badge>,
        );
      } else {
        items.push(badgeText);
      }
    }

    if (heading) {
      if (typeof heading === "string") {
        items.push({
          _type: "text",
          as: "h2",
          className: cn(
            "text-3xl font-bold tracking-tight md:text-4xl text-pretty",
            headingClassName,
          ),
          children: heading,
        });
      } else {
        items.push(heading);
      }
    }

    if (description) {
      if (typeof description === "string") {
        items.push({
          _type: "text",
          as: "p",
          className: cn("text-balance", descriptionClassName),
          children: description,
        });
      } else {
        items.push(description);
      }
    }

    return items;
  }, [
    badgeText,
    badgeClassName,
    heading,
    headingClassName,
    description,
    descriptionClassName,
  ]);

  const ctaImagesContent = useMemo(() => {
    if (ctaImagesSlot) return ctaImagesSlot;
    if (!ctaImages || ctaImages.length === 0) return null;

    return ctaImages.map((src, i) => (
      <div
        key={i}
        className="relative aspect-square overflow-hidden rounded-md"
      >
        <Img
          src={src}
          alt="Team culture"
          className="h-full w-full object-cover"
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    ));
  }, [ctaImagesSlot, ctaImages, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <ContentGroup
        items={headerItems}
        className={cn(
          "mx-auto mb-12 max-w-full md:max-w-md space-y-4 text-center flex flex-col items-center justify-center",
          headerClassName,
        )}
      />

      {aspectsSlot ? (
        aspectsSlot
      ) : resolvedAspects.length > 0 ? (
        <Tabs
          defaultValue={resolvedAspects[0]?.id}
          value={activeTab}
          onValueChange={setActiveTab}
          className={cn("space-y-8", tabsClassName)}
        >
          <div className="flex justify-center">
            <TabsList className="grid h-auto grid-cols-2 p-1 md:grid-cols-4">
              {resolvedAspects.map((aspect) => (
                <TabsTrigger
                  key={aspect.id}
                  value={aspect.id}
                  className={cn("px-3 py-2.5")}
                >
                  {aspect.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {resolvedAspects.map((aspect) => (
            <TabsContent
              key={aspect.id}
              value={aspect.id}
              className="space-y-8"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight">
                    {aspect.title}
                  </h3>
                  <p className={cn("leading-relaxed")}>{aspect.description}</p>
                </div>

                <Card className="border-0 p-0">
                  <CardContent className="space-y-4 p-6 pt-6">
                    <DynamicIcon name="lucide/quote" size={32} />
                    <p className="italic">
                      &quot;{aspect.testimonial.quote}&quot;
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Img
                          src={aspect.testimonial.avatar}
                          alt={aspect.testimonial.author}
                          className="h-full w-full object-cover"
                          optixFlowConfig={optixFlowConfig}
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">
                          {aspect.testimonial.author}
                        </h4>
                        <p className="text-xs">{aspect.testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {aspect.images.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-4/3 overflow-hidden rounded-lg"
                  >
                    <Img
                      src={image}
                      alt={`${aspect.title} culture`}
                      className="h-full w-full transform object-cover transition-transform duration-500 hover:scale-105"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : null}

      <div
        className={cn(
          "relative mt-16 rounded-xl border p-8 md:p-12",
          ctaClassName,
        )}
      >
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            {ctaHeading &&
              (typeof ctaHeading === "string" ? (
                <h3
                  className={cn("mb-4 text-2xl font-bold", ctaHeadingClassName)}
                >
                  {ctaHeading}
                </h3>
              ) : (
                ctaHeading
              ))}
            {ctaDescription &&
              (typeof ctaDescription === "string" ? (
                <p className={cn("mb-6", ctaDescriptionClassName)}>
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
          <div className="grid grid-cols-3 gap-2">{ctaImagesContent}</div>
        </div>

        <div className="absolute -left-5 -top-5 h-10 w-10 rounded-full bg-primary/10" />
        <div className="absolute -bottom-5 -right-5 h-10 w-10 rounded-full bg-primary/10" />
      </div>
    </Section>
  );
}
