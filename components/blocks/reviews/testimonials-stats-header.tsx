"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsTestimonial {
  id: string;
  content: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
}

export interface TestimonialsStatsHeaderProps {
  stats?: StatItem[];
  testimonials?: StatsTestimonial[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_STATS: StatItem[] = [
  { value: "10K+", label: "Happy Customers" },
  { value: "4.9", label: "Average Rating" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "24/7", label: "Support Available" },
];

const DEFAULT_TESTIMONIALS: StatsTestimonial[] = [
  {
    id: "1",
    content:
      "The platform has revolutionized our workflow. We've seen a 40% increase in productivity since implementation.",
    author: {
      name: "Sarah Chen",
      role: "Product Manager",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
  },
  {
    id: "2",
    content:
      "Outstanding support and an even better product. The team goes above and beyond to ensure our success.",
    author: {
      name: "Michael Torres",
      role: "CEO",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
  },
  {
    id: "3",
    content:
      "Best investment we've made this year. The ROI was visible within the first month of using the platform.",
    author: {
      name: "Emily Watson",
      role: "Operations Director",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
  },
];

/**
 * TestimonialsStatsHeader - A testimonial section featuring a prominent statistics
 * header followed by testimonial cards. The stats section displays key metrics in
 * a horizontal row, providing social proof through numbers. Below, testimonial cards
 * show customer quotes with author information. Perfect for landing pages requiring
 * both quantitative and qualitative social proof.
 *
 * @example
 * ```tsx
 * <TestimonialsStatsHeader
 *   title="Trusted by Thousands"
 *   subtitle="See what our customers have to say"
 *   stats={[
 *     { value: "10K+", label: "Users" },
 *     { value: "4.9", label: "Rating" }
 *   ]}
 *   testimonials={[...]}
 * />
 * ```
 */
export function TestimonialsStatsHeader({
  stats = DEFAULT_STATS,
  testimonials = DEFAULT_TESTIMONIALS,
  title = "Trusted by Thousands",
  subtitle = "Join the growing community of satisfied customers",
  className,
}: TestimonialsStatsHeaderProps): React.JSX.Element {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-lg bg-muted/50 p-6 text-center"
            >
              <p className="text-3xl font-bold text-primary md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <DynamicIcon
                      key={i}
                      name="lucide/star"
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
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
                    <p className="text-sm font-medium">
                      {testimonial.author.name}
                    </p>
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
