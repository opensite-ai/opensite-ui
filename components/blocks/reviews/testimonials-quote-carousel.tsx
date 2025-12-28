"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface QuoteCarouselTestimonial {
  id: string;
  quote: string;
  author: {
    name: string;
    title?: string;
    avatar?: string;
  };
}

export interface TestimonialsQuoteCarouselProps {
  testimonials?: QuoteCarouselTestimonial[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const DEFAULT_TESTIMONIALS: QuoteCarouselTestimonial[] = [
  {
    id: "1",
    quote:
      "Their collaborative approach and deep understanding of our industry resulted in a design that not only looks exceptional but performs brilliantly.",
    author: {
      name: "Daniel Ramirez",
      title: "Product Director, NexGen",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
  },
  {
    id: "2",
    quote:
      "The team's ability to translate complex requirements into clean, intuitive interfaces is remarkable. They're truly masters of their craft.",
    author: {
      name: "Sophia Chen",
      title: "UX Director, Innovate AI",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
  },
  {
    id: "3",
    quote:
      "Working with them was effortless. They brought fresh perspectives to challenges we'd been struggling with for months.",
    author: {
      name: "Marcus Johnson",
      title: "CEO, Horizon Media",
      avatar: blockBrandedIconsAndPlaceholders.avatar3,
    },
  },
  {
    id: "4",
    quote:
      "They didn't just meet our expectations - they redefined what we thought was possible. I cannot recommend them highly enough.",
    author: {
      name: "Olivia Thompson",
      title: "Brand Manager, Elevate",
      avatar: blockBrandedIconsAndPlaceholders.avatar4,
    },
  },
  {
    id: "5",
    quote:
      "The strategic thinking behind their design decisions transformed our product. We saw immediate improvements in user engagement.",
    author: {
      name: "James Wilson",
      title: "CTO, TechSphere",
      avatar: blockBrandedIconsAndPlaceholders.avatar5,
    },
  },
];

/**
 * TestimonialsQuoteCarousel - A horizontal carousel of testimonial cards with quote
 * styling and navigation controls. Each card displays a large quote mark, testimonial
 * content, and author information with avatar. Features previous/next buttons for
 * manual navigation. Responsive design shows multiple cards on larger screens. Perfect
 * for showcasing multiple testimonials in a swipeable, interactive format.
 *
 * @example
 * ```tsx
 * <TestimonialsQuoteCarousel
 *   title="Client Testimonials"
 *   subtitle="Swipe through what our clients have to say"
 *   testimonials={[
 *     {
 *       id: "1",
 *       quote: "Amazing experience working with this team...",
 *       author: { name: "Jane D.", title: "CEO, TechCo", avatar: "/avatars/jane.jpg" }
 *     }
 *   ]}
 * />
 * ```
 */
export function TestimonialsQuoteCarousel({
  testimonials = DEFAULT_TESTIMONIALS,
  title = "Client Testimonials",
  subtitle = "Swipe through what our clients have to say about working with us",
  className,
}: TestimonialsQuoteCarouselProps): React.JSX.Element {
  return (
    <section className={cn("bg-muted/30 py-16 md:py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title.split(" ").map((word, i) =>
              i === 1 ? (
                <span key={i} className="text-primary">
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mx-auto max-w-5xl">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="flex h-full flex-col rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                    <div className="mb-4 font-serif text-4xl text-primary">
                      &ldquo;
                    </div>
                    <blockquote className="mb-6 flex-1">
                      <p className="text-sm leading-relaxed">
                        {testimonial.quote}
                      </p>
                    </blockquote>
                    <div className="mt-auto flex items-center gap-3">
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
                      <div className="text-left">
                        <p className="text-sm font-medium">
                          {testimonial.author.name}
                        </p>
                        {testimonial.author.title && (
                          <p className="text-xs text-muted-foreground">
                            {testimonial.author.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex justify-center gap-2">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
