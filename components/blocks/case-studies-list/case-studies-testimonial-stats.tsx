"use client";

import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Separator } from "../../ui/separator";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface CaseStudyTestimonialItem {
  image: string;
  quote: string;
  authorName: string;
  authorRole: string;
  companyLogo: string;
  stats: Array<{
    value: string;
    label: string;
    description: string;
  }>;
}

export interface CaseStudiesTestimonialStatsProps {
  heading?: string;
  subheading?: string;
  testimonials?: CaseStudyTestimonialItem[];
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultTestimonials: CaseStudyTestimonialItem[] = [
  {
    image: blockBrandedIconsAndPlaceholders.placeholder1,
    quote:
      "This productivity tool transformed how we collaborate. Our team's workflow improved dramatically, and we've cut meeting time by half while increasing output.",
    authorName: "Michael Rivera",
    authorRole: "Product Director",
    companyLogo: blockBrandedIconsAndPlaceholders.fictionalCompanyLogo2,
    stats: [
      {
        value: "98%",
        label: "Customer Satisfaction",
        description: "From verified reviews",
      },
      {
        value: "3.8x",
        label: "ROI Improvement",
        description: "Within first quarter",
      },
    ],
  },
  {
    image: blockBrandedIconsAndPlaceholders.placeholder2,
    quote:
      "The interface is intuitive and customizable to our needs. We implemented it across departments with minimal training and saw immediate results.",
    authorName: "Sarah Chen",
    authorRole: "Operations Lead",
    companyLogo: blockBrandedIconsAndPlaceholders.fictionalCompanyLogo3,
    stats: [
      {
        value: "4.2x",
        label: "Team Efficiency",
        description: "Proven productivity gains",
      },
      {
        value: "72%",
        label: "Reduced Task Time",
        description: "Across all projects",
      },
    ],
  },
];

/**
 * CaseStudiesTestimonialStats displays customer testimonials alongside key metrics
 * in a split-layout format with visual separators.
 *
 * Features a two-column layout with customer photo and quote on the left, and
 * performance statistics on the right. Each testimonial includes author details
 * with company logo. Multiple testimonials are separated by horizontal dividers.
 * Ideal for showcasing customer success stories with quantifiable results and
 * social proof metrics.
 *
 * @example
 * ```tsx
 * <CaseStudiesTestimonialStats
 *   heading="4500+ Satisfied Customers"
 *   subheading="Real results from real users"
 *   testimonials={[
 *     {
 *       image: "/images/customer.jpg",
 *       quote: "This tool transformed our workflow...",
 *       authorName: "John Doe",
 *       authorRole: "CEO",
 *       companyLogo: "/logos/company.svg",
 *       stats: [
 *         { value: "98%", label: "Satisfaction", description: "From reviews" }
 *       ]
 *     }
 *   ]}
 * />
 * ```
 */
export function CaseStudiesTestimonialStats({
  heading = "4500+ Satisfied Customers",
  subheading = "Real results from real users",
  testimonials = defaultTestimonials,
  className,
  optixFlowConfig,
}: CaseStudiesTestimonialStatsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-6 text-center">
          <p className="font-medium">{heading}</p>
          <h2 className="text-4xl font-medium md:text-5xl">{subheading}</h2>
        </div>
        <div className="mt-20">
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              {index > 0 && <Separator className="my-20" />}
              <div className="grid gap-16 lg:grid-cols-3 xl:gap-24">
                <div className="flex flex-col gap-10 border-border sm:flex-row lg:col-span-2 lg:border-r lg:pr-16 xl:pr-24">
                  <Img
                    src={testimonial.image}
                    alt={testimonial.authorName}
                    className="aspect-[29/35] h-full w-full max-w-60 rounded-2xl object-cover"
                    loading="lazy"
                    optixFlowConfig={optixFlowConfig}
                  />
                  <div className="flex h-full flex-col justify-between gap-10">
                    <q className="sm:text-xl">{testimonial.quote}</q>
                    <div className="flex items-end gap-6">
                      <div className="flex flex-col gap-1">
                        <p className="text-lg font-semibold text-primary">
                          {testimonial.authorName}
                        </p>
                        <p className="text-muted-foreground">
                          {testimonial.authorRole}
                        </p>
                      </div>
                      <Img
                        src={testimonial.companyLogo}
                        alt="Company logo"
                        loading="lazy"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-10 self-center lg:flex-col">
                  {testimonial.stats.map((stat, statIndex) => (
                    <div key={statIndex} className="flex flex-col gap-2">
                      <p className="text-4xl font-medium text-primary sm:text-5xl">
                        {stat.value}
                      </p>
                      <p className="font-semibold text-primary">{stat.label}</p>
                      <p className="text-muted-foreground">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
