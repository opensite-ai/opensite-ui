"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";
import {
  imagePlaceholders,
  logoPlaceholders,
} from "../../../lib/mediaPlaceholders";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface CtaCaseStudySection {
  /**
   * Icon name for the section
   */
  icon?: string;
  /**
   * Section title
   */
  title?: string;
  /**
   * Section description
   */
  description?: string;
}

export interface CtaCaseStudyStat {
  /**
   * Stat value
   */
  value?: string;
  /**
   * Stat label
   */
  label?: string;
}

export interface CtaCaseStudyTestimonialProps {
  /**
   * Badge text
   */
  badgeText?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Case study sections (challenge, solution, results)
   */
  sections?: CtaCaseStudySection[];
  /**
   * Testimonial quote
   */
  testimonialQuote?: string;
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
   * Featured image URL
   */
  featuredImage?: string;
  /**
   * Featured image alt text
   */
  featuredImageAlt?: string;
  /**
   * Stats to display
   */
  stats?: CtaCaseStudyStat[];
  /**
   * Company logo URL
   */
  companyLogo?: string;
  /**
   * Company name
   */
  companyName?: string;
  /**
   * Company industry badge
   */
  industryBadge?: string;
  /**
   * Company details
   */
  companyDetails?: string;
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

const defaultSections: CtaCaseStudySection[] = [
  {
    icon: "lucide/maximize",
    title: "The Challenge",
    description:
      "Managing multiple projects across distributed teams with outdated tools led to miscommunication and missed deadlines.",
  },
  {
    icon: "lucide/check-circle",
    title: "The Solution",
    description:
      "Implementing our comprehensive platform unified communication, streamlined workflows, and provided real-time tracking capabilities.",
  },
  {
    icon: "lucide/activity",
    title: "The Results",
    description:
      "200% increase in productivity, 50% reduction in meeting time, and 30% faster project completion.",
  },
];

const defaultStats: CtaCaseStudyStat[] = [
  { value: "200%", label: "Productivity Increase" },
  { value: "30%", label: "Faster Project Delivery" },
];

/**
 * CtaCaseStudyTestimonial - A comprehensive case study CTA with testimonial quote,
 * challenge/solution/results breakdown, stats cards, and video thumbnail. Perfect
 * for social proof and conversion.
 *
 * @example
 * ```tsx
 * <CtaCaseStudyTestimonial
 *   badgeText="Case Study"
 *   heading="How TechNova transformed their workflow"
 *   description="See how TechNova achieved 200% productivity increase."
 *   testimonialQuote="The platform transformed how our teams collaborate."
 *   primaryButtonText="Read Full Case Study"
 *   primaryButtonUrl="/case-studies/technova"
 * />
 * ```
 */
export function CtaCaseStudyTestimonial({
  badgeText = "Case Study",
  heading = "How TechNova transformed their workflow",
  description = "See how TechNova achieved 200% productivity increase and 30% faster project delivery with our platform.",
  sections = defaultSections,
  testimonialQuote = "The platform transformed how our teams collaborate. We've eliminated silos and can now deliver projects with unprecedented speed and quality.",
  primaryButtonText = "Read Full Case Study",
  primaryButtonUrl = "#",
  secondaryButtonText = "Schedule a Demo",
  secondaryButtonUrl = "#",
  featuredImage = imagePlaceholders[16],
  featuredImageAlt = "Team collaborating on the platform",
  stats = defaultStats,
  companyLogo = blockBrandedIconsAndPlaceholders.fictionalCompanyLogo7,
  companyName = "TechNova",
  industryBadge = "SaaS",
  companyDetails = "Industry: Technology • Team size: 120+ • Region: Global",
  className,
  optixFlowConfig,
}: CtaCaseStudyTestimonialProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Badge variant="secondary" className="mb-4">
              {badgeText}
            </Badge>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{heading}</h2>
            <p className="mb-8 text-lg text-muted-foreground">{description}</p>

            <div className="mb-8 space-y-6">
              {sections.map((section, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    {section.icon && (
                      <DynamicIcon
                        name={section.icon}
                        size={20}
                        className="text-primary"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{section.title}</h3>
                    <p className="text-muted-foreground">{section.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative mt-8 border-l-4 border-primary/20 pl-6 italic text-muted-foreground">
              <DynamicIcon
                name="lucide/quote"
                size={24}
                className="absolute -left-3 -top-2 rounded-full bg-background text-primary"
              />
              <p className="md:text-lg">&ldquo;{testimonialQuote}&rdquo;</p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Pressable href={primaryButtonUrl} variant="default" size="lg" asButton>
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
                <DynamicIcon
                  name="lucide/arrow-up-right"
                  size={16}
                  className="ml-2"
                />
              </Pressable>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="relative aspect-4/3 overflow-hidden rounded-xl border">
              <Img
                src={featuredImage}
                alt={featuredImageAlt}
                className="h-full w-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full border-2 border-white bg-white/20 p-2 backdrop-blur-sm transition-transform hover:scale-110">
                  <DynamicIcon
                    name="lucide/play"
                    size={40}
                    className="text-white"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="rounded-lg border p-4 text-center">
                  <div className="text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </Card>
              ))}
            </div>

            <Card className="mt-6 rounded-lg border bg-muted/40 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Img
                    src={companyLogo}
                    alt={`${companyName} logo`}
                    className="h-8 w-8 rounded-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                  <span className="font-medium">{companyName}</span>
                </div>
                <Badge variant="outline">{industryBadge}</Badge>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                {companyDetails}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
