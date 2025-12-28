"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface WallTestimonial {
  id: string;
  content: string;
  author: {
    name: string;
    handle?: string;
    avatar?: string;
  };
  badge?: string;
}

export interface TestimonialsWallCompactProps {
  testimonials?: WallTestimonial[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_TESTIMONIALS: WallTestimonial[] = [
  {
    id: "1",
    content: "Game-changer for our team. Productivity up 50%!",
    author: {
      name: "Sarah Chen",
      handle: "@sarahchen",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
    badge: "Featured",
  },
  {
    id: "2",
    content: "Best tool I've used in years. Highly recommend.",
    author: {
      name: "Michael Torres",
      handle: "@mtorres",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
  },
  {
    id: "3",
    content: "Support team is incredible. Always there when needed.",
    author: {
      name: "Emily Watson",
      handle: "@emilyw",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
  },
  {
    id: "4",
    content: "Clean UI, powerful features. Perfect combo.",
    author: {
      name: "David Kim",
      handle: "@davidkim",
      avatar: blockBrandedIconsAndPlaceholders.avatar4,
    },
    badge: "Verified",
  },
  {
    id: "5",
    content: "Switched from competitors. Never looking back.",
    author: {
      name: "Lisa Park",
      handle: "@lisapark",
      avatar: blockBrandedIconsAndPlaceholders.avatar5,
    },
  },
  {
    id: "6",
    content: "ROI was visible in the first week. Amazing!",
    author: {
      name: "Alex Rivera",
      handle: "@alexr",
      avatar: blockBrandedIconsAndPlaceholders.avatar6,
    },
  },
  {
    id: "7",
    content: "Documentation is top-notch. Easy to get started.",
    author: {
      name: "Jordan Lee",
      handle: "@jordanlee",
      avatar: blockBrandedIconsAndPlaceholders.avatar7,
    },
  },
  {
    id: "8",
    content: "Our whole team adopted it instantly. Love it!",
    author: {
      name: "Maya Patel",
      handle: "@mayap",
      avatar: blockBrandedIconsAndPlaceholders.avatar8,
    },
    badge: "Power User",
  },
  {
    id: "9",
    content: "Finally, a tool that just works. No fuss.",
    author: {
      name: "Chris Wong",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
  },
  {
    id: "10",
    content: "Customer service responded in minutes. Impressed!",
    author: {
      name: "Emma Davis",
      handle: "@emmad",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
  },
  {
    id: "11",
    content: "Worth every penny. Quality is unmatched.",
    author: {
      name: "Ryan Miller",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
  },
  {
    id: "12",
    content: "Integrations work flawlessly. Saved us hours.",
    author: {
      name: "Sophie Brown",
      handle: "@sophieb",
      avatar: blockBrandedIconsAndPlaceholders.avatar4,
    },
  },
];

/**
 * TestimonialsWallCompact - A dense wall of compact testimonial cards arranged in
 * a multi-column grid. Each card displays a short quote, author avatar, name, and
 * optional handle and badge. The compact design allows displaying many testimonials
 * in a small space, creating a powerful visual of social proof. Ideal for showcasing
 * volume of positive feedback.
 *
 * @example
 * ```tsx
 * <TestimonialsWallCompact
 *   title="Wall of Love"
 *   subtitle="What our community is saying"
 *   testimonials={[
 *     {
 *       id: "1",
 *       content: "Amazing product!",
 *       author: { name: "John D.", handle: "@johnd", avatar: "/avatars/john.jpg" },
 *       badge: "Featured"
 *     }
 *   ]}
 * />
 * ```
 */
export function TestimonialsWallCompact({
  testimonials = DEFAULT_TESTIMONIALS,
  title = "Wall of Love",
  subtitle = "What our community is saying",
  className,
}: TestimonialsWallCompactProps): React.JSX.Element {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg border bg-card p-4 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
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
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {testimonial.author.name}
                    </p>
                    {testimonial.author.handle && (
                      <p className="truncate text-xs text-muted-foreground">
                        {testimonial.author.handle}
                      </p>
                    )}
                  </div>
                </div>
                {testimonial.badge && (
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    {testimonial.badge}
                  </Badge>
                )}
              </div>
              <p className="text-sm leading-relaxed">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
