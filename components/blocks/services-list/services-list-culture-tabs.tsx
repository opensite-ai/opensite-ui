"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent } from "../../ui/card";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  ActionConfig,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Testimonial configuration for culture aspect
 */
export interface ServicesListCultureTabsTestimonial {
  /**
   * Quote text
   */
  quote?: React.ReactNode;
  /**
   * Author name
   */
  author?: React.ReactNode;
  /**
   * Author role/title
   */
  role?: React.ReactNode;
  /**
   * Author avatar image
   */
  avatar?: {
    src: string;
    alt: string;
  };
}

/**
 * Culture aspect configuration
 */
export interface ServicesListCultureTabsAspect {
  /**
   * Unique identifier for the aspect
   */
  id?: string;
  /**
   * Aspect title
   */
  title?: React.ReactNode;
  /**
   * Aspect description
   */
  description?: React.ReactNode;
  /**
   * Gallery images
   */
  images?: Array<{
    src: string;
    alt: string;
  }>;
  /**
   * Employee testimonial
   */
  testimonial?: ServicesListCultureTabsTestimonial;
  /**
   * Additional CSS classes for the tab content
   */
  className?: string;
}

export interface ServicesListCultureTabsProps {
  /**
   * Badge/eyebrow content above heading
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
   * Array of culture aspect configurations
   */
  aspects?: ServicesListCultureTabsAspect[];
  /**
   * Custom slot for rendering aspects (overrides aspects array)
   */
  aspectsSlot?: React.ReactNode;
  /**
   * Default active tab value
   */
  defaultValue?: string;
  /**
   * CTA section title
   */
  ctaTitle?: React.ReactNode;
  /**
   * CTA section description
   */
  ctaDescription?: React.ReactNode;
  /**
   * Primary CTA action configuration
   */
  primaryAction?: ActionConfig;
  /**
   * Secondary CTA action configuration
   */
  secondaryAction?: ActionConfig;
  /**
   * Custom slot for CTA section (overrides CTA props)
   */
  ctaSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
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
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the tabs
   */
  tabsClassName?: string;
  /**
   * Additional CSS classes for the CTA section
   */
  ctaClassName?: string;
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * ServicesListCultureTabs - A tabbed layout showcasing company culture aspects with testimonials.
 * Each tab displays a culture aspect with description, image gallery, and employee testimonial.
 * Includes a bottom CTA section for recruitment. Ideal for about/careers pages highlighting company values
 * and culture through employee stories and visual content.
 *
 * @example
 * ```tsx
 * <ServicesListCultureTabs
 *   badge="Our Culture"
 *   heading="What Makes Us Different"
 *   description="Our culture defines how we work together."
 *   aspects={[
 *     { id: "innovation", title: "Innovation", description: "We innovate", testimonial: { quote: "Great place", author: "John" } }
 *   ]}
 *   primaryAction={{ label: "Join Us", href: "/careers" }}
 *   background="muted"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListCultureTabs({
  badge,
  heading,
  description,
  aspects,
  aspectsSlot,
  defaultValue,
  ctaTitle,
  ctaDescription,
  primaryAction,
  secondaryAction,
  ctaSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  badgeClassName,
  tabsClassName,
  ctaClassName,
  background = "muted",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ServicesListCultureTabsProps): React.JSX.Element {
  const renderAspects = () => {
    if (aspectsSlot) return aspectsSlot;
    if (!aspects || aspects.length === 0) return null;

    const activeDefaultValue = defaultValue || aspects[0]?.id;

    return (
      <Tabs
        defaultValue={activeDefaultValue}
        className={cn("space-y-8", tabsClassName)}
      >
        <div className="flex justify-center">
          <TabsList className="grid h-auto grid-cols-2 p-1 md:grid-cols-3">
            {aspects.map((aspect, index) => (
              <TabsTrigger
                key={aspect.id || `aspect-${index}`}
                value={aspect.id || `aspect-${index}`}
                className="px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {aspect.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {aspects.map((aspect, index) => (
          <TabsContent
            key={aspect.id || `aspect-${index}`}
            value={aspect.id || `aspect-${index}`}
            className={cn("space-y-8", aspect.className)}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                {aspect.title &&
                  (typeof aspect.title === "string" ? (
                    <h3 className="text-2xl font-bold tracking-tight">
                      {aspect.title}
                    </h3>
                  ) : (
                    <div className="text-2xl font-bold tracking-tight">
                      {aspect.title}
                    </div>
                  ))}
                {aspect.description &&
                  (typeof aspect.description === "string" ? (
                    <p className="text-muted-foreground leading-relaxed">
                      {aspect.description}
                    </p>
                  ) : (
                    <div className="text-muted-foreground leading-relaxed">
                      {aspect.description}
                    </div>
                  ))}
              </div>

              {aspect.testimonial && (
                <Card className="border-0 bg-linear-to-br from-primary/5 to-primary/10 p-0">
                  <CardContent className="space-y-4 p-6">
                    <DynamicIcon
                      name="lucide/quote"
                      className="h-8 w-8 text-primary/40"
                    />
                    {aspect.testimonial.quote &&
                      (typeof aspect.testimonial.quote === "string" ? (
                        <p className="italic text-muted-foreground">
                          &quot;{aspect.testimonial.quote}&quot;
                        </p>
                      ) : (
                        <div className="italic text-muted-foreground">
                          {aspect.testimonial.quote}
                        </div>
                      ))}
                    <div className="flex items-center gap-3 pt-2">
                      {aspect.testimonial.avatar && (
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Img
                            src={aspect.testimonial.avatar.src}
                            alt={aspect.testimonial.avatar.alt}
                            className="h-full w-full object-cover"
                            optixFlowConfig={optixFlowConfig}
                          />
                        </div>
                      )}
                      <div>
                        {aspect.testimonial.author &&
                          (typeof aspect.testimonial.author === "string" ? (
                            <h4 className="text-sm font-medium">
                              {aspect.testimonial.author}
                            </h4>
                          ) : (
                            <div className="text-sm font-medium">
                              {aspect.testimonial.author}
                            </div>
                          ))}
                        {aspect.testimonial.role &&
                          (typeof aspect.testimonial.role === "string" ? (
                            <p className="text-xs text-muted-foreground">
                              {aspect.testimonial.role}
                            </p>
                          ) : (
                            <div className="text-xs text-muted-foreground">
                              {aspect.testimonial.role}
                            </div>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {aspect.images && aspect.images.length > 0 && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {aspect.images.map((image, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-4/3 overflow-hidden rounded-lg"
                  >
                    <Img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    );
  };

  const renderCta = () => {
    if (ctaSlot) return ctaSlot;
    if (!ctaTitle && !ctaDescription && !primaryAction && !secondaryAction)
      return null;

    return (
      <div
        className={cn(
          "relative rounded-xl border bg-background p-8 md:p-12",
          ctaClassName,
        )}
      >
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            {ctaTitle &&
              (typeof ctaTitle === "string" ? (
                <h3 className="mb-4 text-2xl font-bold">{ctaTitle}</h3>
              ) : (
                <div className="mb-4 text-2xl font-bold">{ctaTitle}</div>
              ))}
            {ctaDescription &&
              (typeof ctaDescription === "string" ? (
                <p className="mb-6 text-muted-foreground">{ctaDescription}</p>
              ) : (
                <div className="mb-6 text-muted-foreground">
                  {ctaDescription}
                </div>
              ))}
            <div className="flex gap-4">
              {primaryAction && (
                <Pressable
                  href={primaryAction.href}
                  onClick={primaryAction.onClick}
                  variant="default"
                  asButton
                >
                  {primaryAction.label}
                </Pressable>
              )}
              {secondaryAction && (
                <Pressable
                  href={secondaryAction.href}
                  onClick={secondaryAction.onClick}
                  variant="outline"
                  asButton
                >
                  {secondaryAction.label}
                </Pressable>
              )}
            </div>
          </div>
        </div>
        <div className="absolute -left-5 -top-5 h-10 w-10 rounded-full bg-primary/10" />
        <div className="absolute -bottom-5 -right-5 h-10 w-10 rounded-full bg-primary/10" />
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("mx-auto max-w-6xl space-y-12", containerClassName)}>
        <div className={cn("space-y-4 text-center", headerClassName)}>
          {badge &&
            (typeof badge === "string" ? (
              <div
                className={cn(
                  "inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary",
                  badgeClassName,
                )}
              >
                {badge}
              </div>
            ) : (
              <div className={badgeClassName}>{badge}</div>
            ))}
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-bold tracking-tight md:text-4xl",
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
                  "mx-auto max-w-2xl text-muted-foreground",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>
        {renderAspects()}
        {renderCta()}
      </div>
    </Section>
  );
}
