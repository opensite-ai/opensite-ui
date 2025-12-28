"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface TestimonialItem {
  id: string;
  quote: string;
  author: {
    name: string;
    role?: string;
    company?: string;
    avatar?: string;
  };
  featured?: boolean;
}

export interface TestimonialsBentoGridProps {
  testimonials?: TestimonialItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    quote:
      "This platform has completely transformed how we approach our workflow. The intuitive design and powerful features have made our team significantly more productive. I can't imagine going back to our old tools.",
    author: {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
    featured: true,
  },
  {
    id: "2",
    quote:
      "The best investment we've made this year. ROI was visible within the first month.",
    author: {
      name: "Michael Torres",
      role: "CEO",
      company: "StartupXYZ",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
  },
  {
    id: "3",
    quote:
      "Customer support is exceptional. They went above and beyond to help us with our specific needs.",
    author: {
      name: "Emily Watson",
      role: "Operations Lead",
      company: "GrowthCo",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
  },
  {
    id: "4",
    quote:
      "Simple, elegant, and powerful. Everything we needed in one package.",
    author: {
      name: "David Kim",
      role: "CTO",
      company: "InnovateLabs",
      avatar: blockBrandedIconsAndPlaceholders.avatar4,
    },
  },
  {
    id: "5",
    quote:
      "We've tried many solutions, but this one stands out for its reliability and ease of use.",
    author: {
      name: "Lisa Park",
      role: "Engineering Manager",
      company: "DevStudio",
      avatar: blockBrandedIconsAndPlaceholders.avatar5,
    },
  },
];

/**
 * TestimonialsBentoGrid - A modern bento-style grid layout featuring one large featured
 * testimonial card alongside smaller testimonial cards. The featured card spans multiple
 * rows for visual hierarchy, while remaining cards fill the grid in an asymmetric pattern.
 * Includes quote icons, author avatars, roles, and company names. Perfect for landing pages
 * and marketing sections requiring visual impact.
 *
 * @example
 * ```tsx
 * <TestimonialsBentoGrid
 *   title="What Our Customers Say"
 *   subtitle="Trusted by thousands of companies worldwide"
 *   testimonials={[
 *     {
 *       id: "1",
 *       quote: "This platform transformed our workflow...",
 *       author: { name: "Jane D.", role: "CEO", company: "TechCo", avatar: "/avatars/jane.jpg" },
 *       featured: true
 *     }
 *   ]}
 * />
 * ```
 */
export function TestimonialsBentoGrid({
  testimonials = DEFAULT_TESTIMONIALS,
  title = "Loved by Teams Everywhere",
  subtitle = "See what our customers have to say about their experience",
  className,
}: TestimonialsBentoGridProps): React.JSX.Element {
  const featured = testimonials.find((t) => t.featured) || testimonials[0];
  const others = testimonials.filter((t) => t.id !== featured.id);

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2 lg:row-span-2">
            <CardContent className="flex h-full flex-col justify-between p-6 md:p-8">
              <div>
                <DynamicIcon
                  name="lucide/quote"
                  size={40}
                  className="mb-4 text-primary/20"
                />
                <blockquote className="text-xl font-medium leading-relaxed md:text-2xl">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <Avatar className="size-12">
                  <AvatarImage
                    src={featured.author.avatar}
                    alt={featured.author.name}
                  />
                  <AvatarFallback>
                    {featured.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{featured.author.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {featured.author.role}
                    {featured.author.company && ` at ${featured.author.company}`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {others.slice(0, 4).map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="flex h-full flex-col justify-between p-6">
                <blockquote className="text-sm leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarImage
                      src={testimonial.author.avatar}
                      alt={testimonial.author.name}
                    />
                    <AvatarFallback className="text-xs">
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
