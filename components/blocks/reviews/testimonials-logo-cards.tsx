"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Img, type OptixFlowConfig } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface LogoTestimonial {
  id: string;
  content: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
  companyLogo?: string;
  companyLogoAlt?: string;
}

export interface TestimonialsLogoCardsProps {
  testimonials?: LogoTestimonial[];
  title?: string;
  subtitle?: string;
  className?: string;
  optixFlowConfig?: OptixFlowConfig;
}

const DEFAULT_TESTIMONIALS: LogoTestimonial[] = [
  {
    id: "1",
    content:
      "This platform has transformed the way we develop web applications. The extensive collection of UI components and blocks has significantly accelerated our workflow. The flexibility to customize every aspect allows us to create unique user experiences.",
    author: {
      name: "Sarah Chen",
      role: "Software Engineer",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
    companyLogo: blockBrandedIconsAndPlaceholders.fictionalCompanyLogo1,
    companyLogoAlt: "TechCorp",
  },
  {
    id: "2",
    content:
      "Extraordinary and very practical. No need to break your head trying to figure things out. A real gold mine for developers who want to ship fast without sacrificing quality.",
    author: {
      name: "Michael Torres",
      role: "Software Engineer",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
    companyLogo: blockBrandedIconsAndPlaceholders.fictionalCompanyLogo2,
    companyLogoAlt: "StartupXYZ",
  },
  {
    id: "3",
    content:
      "Great work on the templates. This is one of the best component libraries I have seen so far! The attention to detail and the quality of the code is impressive.",
    author: {
      name: "Emily Watson",
      role: "Creator",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
    companyLogo: blockBrandedIconsAndPlaceholders.fictionalCompanyLogo3,
    companyLogoAlt: "GrowthCo",
  },
  {
    id: "4",
    content:
      "The best personal website template I have seen so far! Clean, modern, and incredibly well-documented. Made our development process so much smoother.",
    author: {
      name: "David Kim",
      role: "Creator",
      avatar: blockBrandedIconsAndPlaceholders.avatar4,
    },
    companyLogo: blockBrandedIconsAndPlaceholders.fictionalCompanyLogo4,
    companyLogoAlt: "DevStudio",
  },
];

/**
 * TestimonialsLogoCards - A grid of testimonial cards featuring company logos in the
 * header. Each card displays a company logo, extended quote, and author information
 * with avatar. The prominent logo placement emphasizes brand partnerships and enterprise
 * credibility. Ideal for B2B landing pages showcasing client testimonials with brand
 * recognition.
 *
 * @example
 * ```tsx
 * <TestimonialsLogoCards
 *   title="Trusted by Leading Companies"
 *   subtitle="See what our enterprise clients say"
 *   testimonials={[
 *     {
 *       id: "1",
 *       content: "Amazing platform...",
 *       author: { name: "Jane D.", role: "CTO", avatar: "/avatars/jane.jpg" },
 *       companyLogo: "/logos/company.svg",
 *       companyLogoAlt: "Acme Corp"
 *     }
 *   ]}
 * />
 * ```
 */
export function TestimonialsLogoCards({
  testimonials = DEFAULT_TESTIMONIALS,
  title = "Trusted by Leading Companies",
  subtitle = "See what our enterprise clients say",
  className,
  optixFlowConfig,
}: TestimonialsLogoCardsProps): React.JSX.Element {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className={cn(
                "flex flex-col",
                index === 0 && "sm:col-span-2 lg:row-span-2"
              )}
            >
              {testimonial.companyLogo && (
                <CardHeader className="pb-0">
                  <Img
                    src={testimonial.companyLogo}
                    alt={testimonial.companyLogoAlt || "Company logo"}
                    className="h-6 w-auto object-contain dark:invert"
                    optixFlowConfig={optixFlowConfig}
                  />
                </CardHeader>
              )}
              <CardContent className="flex flex-1 flex-col justify-between gap-6 pt-6">
                <blockquote
                  className={cn(
                    "leading-relaxed",
                    index === 0 ? "text-xl font-medium" : "text-sm"
                  )}
                >
                  {testimonial.content}
                </blockquote>
                <div className="flex items-center gap-3">
                  <Avatar className={cn(index === 0 ? "size-12" : "size-10")}>
                    <AvatarImage
                      src={testimonial.author.avatar}
                      alt={testimonial.author.name}
                    />
                    <AvatarFallback>
                      {testimonial.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-medium not-italic">
                      {testimonial.author.name}
                    </cite>
                    {testimonial.author.role && (
                      <p className="text-xs text-muted-foreground">
                        {testimonial.author.role}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
