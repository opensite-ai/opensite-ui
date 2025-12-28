"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface MarqueeTestimonial {
  id: string;
  content: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
}

export interface TestimonialsMarqueeProps {
  testimonials?: MarqueeTestimonial[];
  title?: string;
  subtitle?: string;
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
}

const DEFAULT_TESTIMONIALS: MarqueeTestimonial[] = [
  {
    id: "1",
    content:
      "This platform has completely transformed how we work. The efficiency gains have been remarkable.",
    author: {
      name: "Sarah Chen",
      role: "Product Manager",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
  },
  {
    id: "2",
    content:
      "The best investment we've made this year. Our team loves it and productivity is through the roof.",
    author: {
      name: "Michael Torres",
      role: "CEO",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
  },
  {
    id: "3",
    content:
      "Incredible support team and an even better product. Highly recommend to anyone looking to scale.",
    author: {
      name: "Emily Watson",
      role: "Operations Lead",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
  },
  {
    id: "4",
    content:
      "Simple, elegant, and powerful. Everything we needed in one package. A game-changer for our workflow.",
    author: {
      name: "David Kim",
      role: "CTO",
      avatar: blockBrandedIconsAndPlaceholders.avatar4,
    },
  },
  {
    id: "5",
    content:
      "We've tried many solutions, but this one stands out for its reliability and ease of use.",
    author: {
      name: "Lisa Park",
      role: "Engineering Manager",
      avatar: blockBrandedIconsAndPlaceholders.avatar5,
    },
  },
  {
    id: "6",
    content:
      "The attention to detail is impressive. Every feature feels thoughtfully designed.",
    author: {
      name: "Alex Rivera",
      role: "Design Director",
      avatar: blockBrandedIconsAndPlaceholders.avatar6,
    },
  },
];

const speedMap = {
  slow: "60s",
  normal: "40s",
  fast: "20s",
};

/**
 * TestimonialsMarquee - An auto-scrolling horizontal marquee of testimonial cards
 * that creates a continuous, infinite scroll effect. Features configurable scroll
 * speed and optional pause-on-hover functionality. Each card displays a quote with
 * author avatar, name, and role. Perfect for showcasing a large volume of testimonials
 * in an engaging, space-efficient manner.
 *
 * @example
 * ```tsx
 * <TestimonialsMarquee
 *   title="What Our Customers Say"
 *   subtitle="Join thousands of satisfied users"
 *   testimonials={[...]}
 *   speed="normal"
 *   pauseOnHover={true}
 * />
 * ```
 */
export function TestimonialsMarquee({
  testimonials = DEFAULT_TESTIMONIALS,
  title = "What Our Customers Say",
  subtitle = "Join thousands of satisfied users",
  speed = "normal",
  pauseOnHover = true,
  className,
}: TestimonialsMarqueeProps): React.JSX.Element {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className={cn("py-16 md:py-24 overflow-hidden", className)}>
      <div className="container mb-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

        <div
          className={cn(
            "flex gap-4",
            pauseOnHover && "[&:hover_.marquee-content]:pause"
          )}
        >
          <div
            className="marquee-content flex shrink-0 animate-marquee gap-4"
            style={{
              animationDuration: speedMap[speed],
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <Card
                key={`${testimonial.id}-${index}`}
                className="w-80 shrink-0"
              >
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
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
        .pause {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
