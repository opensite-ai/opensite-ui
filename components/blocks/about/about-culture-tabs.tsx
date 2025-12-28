"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent } from "../../ui/card";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

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
  badgeText?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Array of culture aspects
   */
  aspects?: CultureAspect[];
  /**
   * CTA heading
   */
  ctaHeading?: string;
  /**
   * CTA description
   */
  ctaDescription?: string;
  /**
   * Primary CTA button text
   */
  primaryCtaText?: string;
  /**
   * Primary CTA button URL
   */
  primaryCtaUrl?: string;
  /**
   * Secondary CTA button text
   */
  secondaryCtaText?: string;
  /**
   * Secondary CTA button URL
   */
  secondaryCtaUrl?: string;
  /**
   * CTA section images
   */
  ctaImages?: string[];
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

const defaultAspects: CultureAspect[] = [
  {
    id: "innovation",
    title: "Innovation First",
    description:
      "We believe in challenging the status quo and constantly pushing boundaries to create new solutions. Our innovation-driven approach encourages experimentation, learning from failures, and celebrating breakthrough successes.",
    images: [imagePlaceholders[0], imagePlaceholders[1], imagePlaceholders[2]],
    testimonial: {
      quote:
        "I've never worked anywhere that so actively encourages creative thinking. We're given the time and resources to explore new ideas, even if they might not work out. That freedom to innovate without fear has led to our most successful products.",
      author: "Sarah Chen",
      role: "Product Designer",
      avatar: imagePlaceholders[15],
    },
  },
  {
    id: "collaboration",
    title: "Collaborative Spirit",
    description:
      "Our collaborative culture fosters open communication and cross-functional teamwork. We believe that diverse perspectives drive better outcomes, and we create intentional spaces for sharing ideas and working together across departments.",
    images: [imagePlaceholders[3], imagePlaceholders[4], imagePlaceholders[5]],
    testimonial: {
      quote:
        "The walls between teams simply don't exist here. Developers, designers, marketers—we all work together with mutual respect. I've seen ideas transform when people from different backgrounds contribute their unique perspectives.",
      author: "Marcus Johnson",
      role: "Engineering Lead",
      avatar: imagePlaceholders[16],
    },
  },
  {
    id: "wellbeing",
    title: "Wellbeing & Balance",
    description:
      "We prioritize the holistic wellbeing of our team, recognizing that the best work happens when people feel supported in all aspects of their lives. Our flexible policies and wellness initiatives reflect our commitment to sustainable work practices.",
    images: [imagePlaceholders[6], imagePlaceholders[7], imagePlaceholders[8]],
    testimonial: {
      quote:
        "I joined from a company where burnout was considered a badge of honor. Here, I'm encouraged to take time off, pursue hobbies, and bring my whole self to work. The result? I'm happier, healthier, and doing the best work of my career.",
      author: "Elena Rodriguez",
      role: "Customer Success Manager",
      avatar: imagePlaceholders[17],
    },
  },
  {
    id: "growth",
    title: "Continuous Growth",
    description:
      "Learning is embedded in our culture. We invest in our team's professional development through mentorship programs, learning budgets, and career pathing that nurtures both technical expertise and leadership skills.",
    images: [imagePlaceholders[9], imagePlaceholders[10], imagePlaceholders[11]],
    testimonial: {
      quote:
        "In three years, I've grown from a junior role to leading a team, supported every step of the way with training, challenges that stretched my abilities, and leaders who saw potential in me before I saw it in myself.",
      author: "James Wilson",
      role: "Marketing Director",
      avatar: imagePlaceholders[18],
    },
  },
];

const defaultCtaImages = [
  imagePlaceholders[12],
  imagePlaceholders[13],
  imagePlaceholders[14],
];

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
  aspects = defaultAspects,
  ctaHeading = "Join Our Team",
  ctaDescription = "We're always looking for talented individuals who share our values and want to be part of building something meaningful. Explore our open positions and find where you might fit in.",
  primaryCtaText = "View Open Positions",
  primaryCtaUrl = "/careers",
  secondaryCtaText = "Our Values",
  secondaryCtaUrl = "/about/values",
  ctaImages = defaultCtaImages,
  className,
  optixFlowConfig,
}: AboutCultureTabsProps) {
  const [activeTab, setActiveTab] = React.useState(aspects[0]?.id || "");

  return (
    <section className={cn("bg-muted/25 py-24", className)}>
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mx-auto mb-12 max-w-3xl space-y-4 text-center">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            {badgeText}
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <Tabs
          defaultValue={aspects[0]?.id}
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
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

        <div className="relative mt-16 rounded-xl border bg-background p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold">{ctaHeading}</h3>
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
            <div className="grid grid-cols-3 gap-2">
              {ctaImages.map((src, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-md">
                  <Img
                    src={src}
                    alt="Team culture"
                    className="h-full w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute -left-5 -top-5 h-10 w-10 rounded-full bg-primary/10" />
          <div className="absolute -bottom-5 -right-5 h-10 w-10 rounded-full bg-primary/10" />
        </div>
      </div>
    </section>
  );
}
