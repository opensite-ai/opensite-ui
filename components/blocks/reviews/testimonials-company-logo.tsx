"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img, type OptixFlowConfig } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface CompanyTestimonial {
  quote: string;
  author: {
    name: string;
    role?: string;
  };
  companyLogo?: string;
  companyLogoAlt?: string;
  image?: string;
}

export interface TestimonialsCompanyLogoProps {
  testimonial?: CompanyTestimonial;
  className?: string;
  optixFlowConfig?: OptixFlowConfig;
}

const DEFAULT_TESTIMONIAL: CompanyTestimonial = {
  quote:
    "Implementing this solution was the best decision we made this year. Our team productivity increased by 40% and customer satisfaction scores have never been higher. The support team is exceptional - they're always available and incredibly knowledgeable.",
  author: {
    name: "Jennifer Martinez",
    role: "Chief Technology Officer",
  },
  companyLogo: blockBrandedIconsAndPlaceholders.fictionalCompanyLogo1,
  companyLogoAlt: "Company Logo",
  image: imagePlaceholders[20],
};

/**
 * TestimonialsCompanyLogo - A prominent company testimonial section featuring a large
 * company logo, extended quote, author information, and an accompanying image. Designed
 * for showcasing enterprise-level endorsements with visual branding. The split layout
 * places the testimonial content alongside a professional image. Perfect for B2B landing
 * pages and case study highlights.
 *
 * @example
 * ```tsx
 * <TestimonialsCompanyLogo
 *   testimonial={{
 *     quote: "This platform transformed our operations...",
 *     author: { name: "Jane D.", role: "CTO" },
 *     companyLogo: "/logos/company.svg",
 *     companyLogoAlt: "Acme Corp",
 *     image: "/images/office.jpg"
 *   }}
 * />
 * ```
 */
export function TestimonialsCompanyLogo({
  testimonial = DEFAULT_TESTIMONIAL,
  className,
  optixFlowConfig,
}: TestimonialsCompanyLogoProps): React.JSX.Element {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            {testimonial.companyLogo && (
              <Img
                src={testimonial.companyLogo}
                alt={testimonial.companyLogoAlt || "Company logo"}
                className="h-10 w-auto object-contain"
                optixFlowConfig={optixFlowConfig}
              />
            )}

            <div className="relative">
              <DynamicIcon
                name="lucide/quote"
                size={40}
                className="absolute -left-2 -top-4 text-primary/10"
              />
              <blockquote className="relative text-xl font-medium leading-relaxed md:text-2xl">
                {testimonial.quote}
              </blockquote>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <div className="text-right">
                <p className="font-semibold">{testimonial.author.name}</p>
                {testimonial.author.role && (
                  <p className="text-sm text-muted-foreground">
                    {testimonial.author.role}
                  </p>
                )}
              </div>
            </div>
          </div>

          {testimonial.image && (
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
              <Img
                src={testimonial.image}
                alt="Testimonial"
                className="size-full object-cover"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
