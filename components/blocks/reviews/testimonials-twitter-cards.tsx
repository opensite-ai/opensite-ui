"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Card, CardContent } from "../../ui/card";
import { Pressable } from "../../../lib/Pressable";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface TwitterTestimonial {
  id: string;
  content: string;
  author: {
    name: string;
    handle: string;
    avatar?: string;
  };
  twitterUrl?: string;
}

export interface TestimonialsTwitterCardsProps {
  testimonials?: TwitterTestimonial[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_TESTIMONIALS: TwitterTestimonial[] = [
  {
    id: "1",
    content:
      "Just shipped our new landing page using @opensiteai components. Took us 2 hours instead of 2 weeks. The quality is incredible!",
    author: {
      name: "Sarah Chen",
      handle: "@sarahchen",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
    twitterUrl: "https://twitter.com/sarahchen",
  },
  {
    id: "2",
    content:
      "The attention to detail in these components is next level. Every interaction feels polished and professional.",
    author: {
      name: "Alex Rivera",
      handle: "@alexrivera",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
    twitterUrl: "https://twitter.com/alexrivera",
  },
  {
    id: "3",
    content:
      "Finally, a component library that doesn't require a PhD to customize. Clean code, great docs, amazing support.",
    author: {
      name: "Jordan Lee",
      handle: "@jordanlee",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
    twitterUrl: "https://twitter.com/jordanlee",
  },
  {
    id: "4",
    content:
      "Our design team is obsessed with the consistency across all components. Makes our job so much easier!",
    author: {
      name: "Maya Patel",
      handle: "@mayapatel",
      avatar: blockBrandedIconsAndPlaceholders.avatar4,
    },
    twitterUrl: "https://twitter.com/mayapatel",
  },
  {
    id: "5",
    content:
      "Switched from building everything from scratch to using Opensite AI. Best decision we made this quarter.",
    author: {
      name: "Chris Wong",
      handle: "@chriswong",
      avatar: blockBrandedIconsAndPlaceholders.avatar5,
    },
    twitterUrl: "https://twitter.com/chriswong",
  },
  {
    id: "6",
    content:
      "The semantic component system is genius. Our AI can now pick the perfect component every time.",
    author: {
      name: "Emma Davis",
      handle: "@emmadavis",
      avatar: blockBrandedIconsAndPlaceholders.avatar6,
    },
    twitterUrl: "https://twitter.com/emmadavis",
  },
];

/**
 * TestimonialsTwitterCards - A grid of Twitter/X-style testimonial cards featuring
 * user content, profile avatars, handles, and links to original tweets. Each card
 * displays the Twitter/X logo and links to the author's profile. Ideal for showcasing
 * social proof from real social media posts and building credibility through authentic
 * user endorsements.
 *
 * @example
 * ```tsx
 * <TestimonialsTwitterCards
 *   title="What People Are Saying"
 *   subtitle="Real tweets from real users"
 *   testimonials={[
 *     {
 *       id: "1",
 *       content: "This product is amazing!",
 *       author: { name: "John Doe", handle: "@johndoe", avatar: "/avatars/john.jpg" },
 *       twitterUrl: "https://twitter.com/johndoe/status/123"
 *     }
 *   ]}
 * />
 * ```
 */
export function TestimonialsTwitterCards({
  testimonials = DEFAULT_TESTIMONIALS,
  title = "What People Are Saying",
  subtitle = "Real feedback from our community",
  className,
}: TestimonialsTwitterCardsProps): React.JSX.Element {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="group">
              <CardContent className="p-6">
                <div className="mb-4 flex items-start justify-between">
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
                      <p className="font-medium leading-none">
                        {testimonial.author.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.author.handle}
                      </p>
                    </div>
                  </div>
                  {testimonial.twitterUrl && (
                    <Pressable
                      href={testimonial.twitterUrl}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="View on Twitter"
                    >
                      <DynamicIcon name="simple-icons/x" size={18} />
                    </Pressable>
                  )}
                </div>
                <p className="text-sm leading-relaxed">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
