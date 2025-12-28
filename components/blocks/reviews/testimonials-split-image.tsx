"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Img, type OptixFlowConfig } from "@page-speed/img";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface SplitTestimonial {
  quote: string;
  author: {
    name: string;
    role?: string;
    company?: string;
    avatar?: string;
  };
  image: string;
}

export interface TestimonialsSplitImageProps {
  testimonial?: SplitTestimonial;
  imagePosition?: "left" | "right";
  className?: string;
  optixFlowConfig?: OptixFlowConfig;
}

const DEFAULT_TESTIMONIAL: SplitTestimonial = {
  quote:
    "Working with this team has been transformative for our business. Their expertise and dedication to quality have helped us achieve results we never thought possible. The attention to detail and commitment to excellence is evident in everything they do.",
  author: {
    name: "Sarah Chen",
    role: "Chief Executive Officer",
    company: "TechVentures Inc.",
    avatar: blockBrandedIconsAndPlaceholders.avatar1,
  },
  image: imagePlaceholders[25],
};

/**
 * TestimonialsSplitImage - A two-column split layout testimonial featuring a large
 * image on one side and a prominent quote with author details on the other. The image
 * position is configurable (left or right). Includes a decorative quote icon, author
 * avatar, name, role, and company. Ideal for featured testimonials, case study highlights,
 * or any section requiring visual impact alongside social proof.
 *
 * @example
 * ```tsx
 * <TestimonialsSplitImage
 *   testimonial={{
 *     quote: "This service transformed our business...",
 *     author: { name: "Jane D.", role: "CEO", company: "TechCo", avatar: "/avatars/jane.jpg" },
 *     image: "/images/testimonial.jpg"
 *   }}
 *   imagePosition="left"
 * />
 * ```
 */
export function TestimonialsSplitImage({
  testimonial = DEFAULT_TESTIMONIAL,
  imagePosition = "left",
  className,
  optixFlowConfig,
}: TestimonialsSplitImageProps): React.JSX.Element {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div
            className={cn(
              "relative aspect-4/3 overflow-hidden rounded-2xl lg:aspect-square",
              imagePosition === "right" && "lg:order-2"
            )}
          >
            <Img
              src={testimonial.image}
              alt="Testimonial"
              className="size-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>

          <div
            className={cn(
              "space-y-6",
              imagePosition === "right" && "lg:order-1"
            )}
          >
            <DynamicIcon
              name="lucide/quote"
              size={48}
              className="text-primary/20"
            />

            <blockquote className="text-xl font-medium leading-relaxed md:text-2xl">
              {testimonial.quote}
            </blockquote>

            <div className="flex items-center gap-4 pt-4">
              <Avatar className="size-12">
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
                <p className="font-semibold">{testimonial.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.author.role}
                  {testimonial.author.company &&
                    ` at ${testimonial.author.company}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
