"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent } from "../../ui/card";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

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
  badgeText = "Our Culture",
  heading = "What Makes Us Different",
  description = "Our culture defines how we work together and the values that guide our decisions. It's what makes our company a special place to work and grow.",
  aspects,
  aspectsSlot,
  ctaHeading = "Join Our Team",
  ctaDescription = "We're always looking for talented individuals who share our values and want to be part of building something meaningful. Explore our open positions and find where you might fit in.",
  actions,
  actionsSlot,
  ctaImages,
  ctaImagesSlot,
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
}: AboutCultureTabsProps): React.JSX.Element {
  const [activeTab, setActiveTab] = React.useState(aspects[0]?.id || "");

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={actionClassName}
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
    });
  };

  const renderCtaImages = () => {
    if (ctaImagesSlot) return ctaImagesSlot;
    if (!ctaImages || ctaImages.length === 0) return null;

    return ctaImages.map((src, i) => (
      <div key={i} className="relative aspect-square overflow-hidden rounded-md">
        <Img
          src={src}
          alt="Team culture"
          className="h-full w-full object-cover"
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    ));
  };

  return (
    <section className={cn("bg-muted/25 py-24", className)}>
      <div className={cn("container mx-auto px-4 md:px-6 2xl:max-w-[1400px]", containerClassName)}>
        <div className={cn("mx-auto mb-12 max-w-3xl space-y-4 text-center", headerClassName)}>
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
              <h2 className={cn("text-3xl font-bold tracking-tight md:text-4xl", headingClassName)}>{heading}</h2>
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

        {aspectsSlot ? (
          aspectsSlot
        ) : (
          <Tabs
            defaultValue={aspects[0]?.id}
            value={activeTab}
            onValueChange={setActiveTab}
            className={cn("space-y-8", tabsClassName)}
          >
            <div className="flex justify-center">
              <TabsList className="grid h-auto grid-cols-2 p-1 md:grid-cols-4">
                {aspects.map((aspect) => (
                  <TabsTrigger
                    key={aspect.id}
                    value={aspect.id}
                    className="px-3 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {aspect.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {aspects.map((aspect) => (
              <TabsContent key={aspect.id} value={aspect.id} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold tracking-tight">{aspect.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {aspect.description}
                    </p>
                  </div>

                  <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10 p-0">
                    <CardContent className="space-y-4 p-6 pt-6">
                      <DynamicIcon
                        name="lucide/quote"
                        size={32}
                        className="text-primary/40"
                      />
                      <p className="italic text-muted-foreground">
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
                          <p className="text-xs text-muted-foreground">
                            {aspect.testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {aspect.images.map((image, idx) => (
                    <div
                      key={idx}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg"
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
        )}

        <div className={cn("relative mt-16 rounded-xl border bg-background p-8 md:p-12", ctaClassName)}>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              {ctaHeading && (
                typeof ctaHeading === "string" ? (
                  <h3 className={cn("mb-4 text-2xl font-bold", ctaHeadingClassName)}>{ctaHeading}</h3>
                ) : (
                  <div className={cn("mb-4", ctaHeadingClassName)}>{ctaHeading}</div>
                )
              )}
              {ctaDescription && (
                typeof ctaDescription === "string" ? (
                  <p className={cn("mb-6 text-muted-foreground", ctaDescriptionClassName)}>{ctaDescription}</p>
                ) : (
                  <div className={cn("mb-6", ctaDescriptionClassName)}>{ctaDescription}</div>
                )
              )}
              {(actionsSlot || (actions && actions.length > 0)) && (
                <div className={cn("flex gap-4", actionsClassName)}>
                  {renderActions()}
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {renderCtaImages()}
            </div>
          </div>

          <div className="absolute -left-5 -top-5 h-10 w-10 rounded-full bg-primary/10" />
          <div className="absolute -bottom-5 -right-5 h-10 w-10 rounded-full bg-primary/10" />
        </div>
      </div>
    </section>
  );
}
