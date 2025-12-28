"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface MasonryTestimonial {
  id: string;
  content: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
}

export interface TestimonialsMasonryGridProps {
  testimonials?: MasonryTestimonial[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_TESTIMONIALS: MasonryTestimonial[] = [
  {
    id: "1",
    content:
      "This platform has completely transformed how we approach our daily operations. The intuitive design and powerful features have made our team significantly more productive. I can't imagine going back to our old workflow.",
    author: {
      name: "Sarah Chen",
      role: "Product Manager",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
  },
  {
    id: "2",
    content:
      "Outstanding support and an exceptional product. Highly recommend!",
    author: {
      name: "Michael Torres",
      role: "CEO",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
  },
  {
    id: "3",
    content:
      "The best investment we've made this year. Our team adopted it instantly and the results speak for themselves.",
    author: {
      name: "Emily Watson",
      role: "Operations Director",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
  },
  {
    id: "4",
    content:
      "Clean interface, powerful features, and excellent documentation. Everything a developer could ask for. The API is well-designed and the SDK makes integration a breeze.",
    author: {
      name: "David Kim",
      role: "Senior Developer",
      avatar: blockBrandedIconsAndPlaceholders.avatar4,
    },
  },
  {
    id: "5",
    content:
      "Simple, elegant, and powerful. A game-changer for our workflow.",
    author: {
      name: "Lisa Park",
      role: "Engineering Manager",
      avatar: blockBrandedIconsAndPlaceholders.avatar5,
    },
  },
  {
    id: "6",
    content:
      "We've tried many solutions, but this one stands out for its reliability and ease of use. The customer support team is also incredibly responsive.",
    author: {
      name: "Alex Rivera",
      role: "Design Director",
      avatar: blockBrandedIconsAndPlaceholders.avatar6,
    },
  },
  {
    id: "7",
    content:
      "Intuitive design that requires minimal training. Our onboarding time dropped significantly since we started using this platform.",
    author: {
      name: "Jordan Lee",
      role: "HR Manager",
      avatar: blockBrandedIconsAndPlaceholders.avatar7,
    },
  },
  {
    id: "8",
    content:
      "The attention to detail is impressive. Every feature feels thoughtfully designed.",
    author: {
      name: "Maya Patel",
      role: "UX Designer",
      avatar: blockBrandedIconsAndPlaceholders.avatar8,
    },
  },
];

/**
 * TestimonialsMasonryGrid - A masonry-style grid layout for testimonials with varying
 * card heights based on content length. Cards are distributed across columns creating
 * an organic, Pinterest-like layout. Each card displays a quote with author avatar,
 * name, and role. The masonry effect creates visual interest while efficiently using
 * space. Ideal for showcasing testimonials of varying lengths.
 *
 * @example
 * ```tsx
 * <TestimonialsMasonryGrid
 *   title="What People Say"
 *   subtitle="Feedback from our community"
 *   testimonials={[
 *     {
 *       id: "1",
 *       content: "Amazing product that changed our workflow...",
 *       author: { name: "John D.", role: "CEO", avatar: "/avatars/john.jpg" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TestimonialsMasonryGrid({
  testimonials = DEFAULT_TESTIMONIALS,
  title = "What People Say",
  subtitle = "Feedback from our community",
  className,
}: TestimonialsMasonryGridProps): React.JSX.Element {
  const columns = [
    testimonials.filter((_, i) => i % 3 === 0),
    testimonials.filter((_, i) => i % 3 === 1),
    testimonials.filter((_, i) => i % 3 === 2),
  ];

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
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              {column.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardContent className="p-6">
                    <p className="mb-4 text-sm leading-relaxed">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
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
          ))}
        </div>
      </div>
    </section>
  );
}
