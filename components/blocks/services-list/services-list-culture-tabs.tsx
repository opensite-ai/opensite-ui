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

export interface ServicesListCultureTabsProps {
  className?: string;
  badge?: string;
  title?: string;
  description?: string;
  aspects?: Array<{
    id: string;
    title: string;
    description: string;
    images?: Array<{
      src: string;
      alt: string;
    }>;
    testimonial?: {
      quote: string;
      author: string;
      role: string;
      avatar?: {
        src: string;
        alt: string;
      };
    };
  }>;
  ctaTitle?: string;
  ctaDescription?: string;
  primaryCtaText?: string;
  primaryCtaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultAspects = [
  {
    id: "innovation",
    title: "Innovation Culture",
    description:
      "We foster a culture of innovation where creative thinking is encouraged and new ideas are celebrated. Our team is empowered to experiment and push boundaries.",
    images: [
      { src: imagePlaceholders[0], alt: "Innovation" },
      { src: imagePlaceholders[1], alt: "Creativity" },
      { src: imagePlaceholders[2], alt: "Ideas" },
    ],
    testimonial: {
      quote:
        "The freedom to innovate here has led to our most successful products. We're encouraged to explore new ideas without fear.",
      author: "Sarah Chen",
      role: "Product Designer",
      avatar: { src: blockBrandedIconsAndPlaceholders.avatar1, alt: "Sarah Chen" },
    },
  },
  {
    id: "collaboration",
    title: "Collaborative Spirit",
    description:
      "Our collaborative culture fosters open communication and cross-functional teamwork. We believe diverse perspectives drive better outcomes.",
    images: [
      { src: imagePlaceholders[3], alt: "Collaboration" },
      { src: imagePlaceholders[4], alt: "Teamwork" },
      { src: imagePlaceholders[5], alt: "Communication" },
    ],
    testimonial: {
      quote:
        "The walls between teams don't exist here. Developers, designers, marketers—we all work together with mutual respect.",
      author: "Marcus Johnson",
      role: "Engineering Lead",
      avatar: { src: blockBrandedIconsAndPlaceholders.avatar2, alt: "Marcus Johnson" },
    },
  },
  {
    id: "growth",
    title: "Continuous Growth",
    description:
      "Learning is embedded in our culture. We invest in professional development through mentorship, learning budgets, and career pathing.",
    images: [
      { src: imagePlaceholders[6], alt: "Growth" },
      { src: imagePlaceholders[7], alt: "Learning" },
      { src: imagePlaceholders[8], alt: "Development" },
    ],
    testimonial: {
      quote:
        "In three years, I've grown from a junior role to leading a team, supported every step of the way.",
      author: "James Wilson",
      role: "Marketing Director",
      avatar: { src: blockBrandedIconsAndPlaceholders.avatar3, alt: "James Wilson" },
    },
  },
];

/**
 * ServicesListCultureTabs - A tabbed layout showcasing company culture aspects with testimonials.
 * Each tab displays a culture aspect with description, image gallery, and employee testimonial.
 * Includes a bottom CTA section for recruitment. Ideal for about/careers pages highlighting company values
 * and culture through employee stories and visual content.
 */
export function ServicesListCultureTabs({
  className,
  badge = "Our Culture",
  title = "What Makes Us Different",
  description = "Our culture defines how we work together and the values that guide our decisions.",
  aspects = defaultAspects,
  ctaTitle = "Join Our Team",
  ctaDescription = "We're always looking for talented individuals who share our values.",
  primaryCtaText = "View Open Positions",
  primaryCtaUrl = "#",
  secondaryCtaText = "Our Values",
  secondaryCtaUrl = "#",
  optixFlowConfig,
}: ServicesListCultureTabsProps) {
  return (
    <section className={cn("bg-muted/25 py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="space-y-4 text-center">
            {badge && (
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                {badge}
              </div>
            )}
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              {description}
            </p>
          </div>

          <Tabs defaultValue={aspects[0]?.id} className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="grid h-auto grid-cols-2 p-1 md:grid-cols-3">
                {aspects.map((aspect) => (
                  <TabsTrigger
                    key={aspect.id}
                    value={aspect.id}
                    className="px-4 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
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
                    <h3 className="text-2xl font-bold tracking-tight">
                      {aspect.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {aspect.description}
                    </p>
                  </div>

                  {aspect.testimonial && (
                    <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10 p-0">
                      <CardContent className="space-y-4 p-6">
                        <DynamicIcon
                          name="lucide/quote"
                          className="h-8 w-8 text-primary/40"
                        />
                        <p className="italic text-muted-foreground">
                          &quot;{aspect.testimonial.quote}&quot;
                        </p>
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
                  )}
                </div>

                {aspect.images && aspect.images.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {aspect.images.map((image, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[4/3] overflow-hidden rounded-lg"
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

          <div className="relative rounded-xl border bg-background p-8 md:p-12">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-2xl font-bold">{ctaTitle}</h3>
                <p className="mb-6 text-muted-foreground">{ctaDescription}</p>
                <div className="flex gap-4">
                  <Pressable href={primaryCtaUrl} variant="default" asButton>
                    {primaryCtaText}
                  </Pressable>
                  <Pressable href={secondaryCtaUrl} variant="outline" asButton>
                    {secondaryCtaText}
                  </Pressable>
                </div>
              </div>
            </div>
            <div className="absolute -left-5 -top-5 h-10 w-10 rounded-full bg-primary/10" />
            <div className="absolute -bottom-5 -right-5 h-10 w-10 rounded-full bg-primary/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
