"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface SimpleTestimonial {
  id: string;
  content: string;
  author: {
    name: string;
    role?: string;
    company?: string;
    avatar?: string;
  };
}

export interface TestimonialsSimpleGridProps {
  testimonials?: SimpleTestimonial[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

const DEFAULT_TESTIMONIALS: SimpleTestimonial[] = [
  {
    id: "1",
    content:
      "The platform exceeded all our expectations. Implementation was smooth and the results were immediate.",
    author: {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
  },
  {
    id: "2",
    content:
      "Outstanding customer support and a product that actually delivers on its promises. Rare combination!",
    author: {
      name: "Michael Torres",
      role: "CEO",
      company: "StartupXYZ",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
  },
  {
    id: "3",
    content:
      "We've seen a 50% increase in efficiency since switching. The ROI speaks for itself.",
    author: {
      name: "Emily Watson",
      role: "Operations Director",
      company: "GrowthCo",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
  },
  {
    id: "4",
    content:
      "Clean interface, powerful features, and excellent documentation. Everything a developer could ask for.",
    author: {
      name: "David Kim",
      role: "Senior Developer",
      company: "DevStudio",
      avatar: blockBrandedIconsAndPlaceholders.avatar4,
    },
  },
  {
    id: "5",
    content:
      "The best decision we made this quarter. Our team adopted it instantly and loves using it daily.",
    author: {
      name: "Lisa Park",
      role: "Team Lead",
      company: "InnovateLabs",
      avatar: blockBrandedIconsAndPlaceholders.avatar5,
    },
  },
  {
    id: "6",
    content:
      "Intuitive design that requires minimal training. Our onboarding time dropped significantly.",
    author: {
      name: "Alex Rivera",
      role: "HR Manager",
      company: "PeopleCo",
      avatar: blockBrandedIconsAndPlaceholders.avatar6,
    },
  },
];

/**
 * TestimonialsSimpleGrid - A clean, straightforward grid of testimonial cards with
 * configurable column count. Each card displays a quote, author avatar, name, role,
 * and company. The minimal design focuses on content readability while maintaining
 * visual consistency. Ideal for sections requiring multiple testimonials without
 * complex layouts or animations.
 *
 * @example
 * ```tsx
 * <TestimonialsSimpleGrid
 *   title="Customer Stories"
 *   subtitle="Hear from our satisfied customers"
 *   columns={3}
 *   testimonials={[
 *     {
 *       id: "1",
 *       content: "Great product!",
 *       author: { name: "John D.", role: "CEO", company: "TechCo", avatar: "/avatars/john.jpg" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TestimonialsSimpleGrid({
  testimonials = DEFAULT_TESTIMONIALS,
  title = "Customer Stories",
  subtitle = "Hear from our satisfied customers",
  columns = 3,
  className,
}: TestimonialsSimpleGridProps): React.JSX.Element {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className={cn("grid gap-6", gridCols[columns])}>
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="p-6">
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
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
                    <p className="text-xs text-muted-foreground">
                      {testimonial.author.role}
                      {testimonial.author.company &&
                        `, ${testimonial.author.company}`}
                    </p>
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
