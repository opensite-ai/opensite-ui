"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img, type OptixFlowConfig } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ScrollingColumnTestimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  imageSrc: string;
}

export interface TestimonialsScrollingColumnsProps {
  testimonials?: ScrollingColumnTestimonial[];
  title?: string;
  subtitle?: string;
  className?: string;
  optixFlowConfig?: OptixFlowConfig;
}

const DEFAULT_TESTIMONIALS: ScrollingColumnTestimonial[] = [
  {
    id: "1",
    quote:
      "This platform has completely transformed how we approach our daily operations. The intuitive design makes everything seamless.",
    name: "Sarah Chen",
    role: "Product Manager",
    imageSrc: imagePlaceholders[40],
  },
  {
    id: "2",
    quote:
      "The best investment we've made this year. Our team productivity has increased significantly since we started using it.",
    name: "Michael Torres",
    role: "CEO",
    imageSrc: imagePlaceholders[41],
  },
  {
    id: "3",
    quote:
      "Outstanding support and an exceptional product. The team goes above and beyond to ensure our success.",
    name: "Emily Watson",
    role: "Operations Director",
    imageSrc: imagePlaceholders[42],
  },
  {
    id: "4",
    quote:
      "Clean interface, powerful features, and excellent documentation. Everything a developer could ask for.",
    name: "David Kim",
    role: "Senior Developer",
    imageSrc: imagePlaceholders[43],
  },
  {
    id: "5",
    quote:
      "We've tried many solutions, but this one stands out for its reliability and ease of use.",
    name: "Lisa Park",
    role: "Engineering Manager",
    imageSrc: imagePlaceholders[44],
  },
  {
    id: "6",
    quote:
      "The attention to detail is impressive. Every feature feels thoughtfully designed and implemented.",
    name: "Alex Rivera",
    role: "Design Director",
    imageSrc: imagePlaceholders[45],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * TestimonialsScrollingColumns - An animated testimonial section with staggered card
 * animations powered by Framer Motion. Features large image cards with gradient overlays
 * and quote content positioned at the bottom. Cards animate into view with a staggered
 * effect as they enter the viewport. Ideal for visually rich testimonial sections
 * requiring engaging scroll-triggered animations.
 *
 * @example
 * ```tsx
 * <TestimonialsScrollingColumns
 *   title="What Our Clients Say"
 *   subtitle="Real feedback from real customers"
 *   testimonials={[
 *     {
 *       id: "1",
 *       quote: "Amazing experience...",
 *       name: "Jane D.",
 *       role: "CEO",
 *       imageSrc: "/images/testimonial-1.jpg"
 *     }
 *   ]}
 * />
 * ```
 */
export function TestimonialsScrollingColumns({
  testimonials = DEFAULT_TESTIMONIALS,
  title = "What Our Clients Say",
  subtitle = "Real feedback from real customers",
  className,
  optixFlowConfig,
}: TestimonialsScrollingColumnsProps): React.JSX.Element {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="relative overflow-hidden rounded-lg bg-card shadow-sm"
              variants={itemVariants}
            >
              <div className="relative">
                <Img
                  src={testimonial.imageSrc}
                  alt={testimonial.name}
                  className="aspect-4/5 w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-left text-white">
                <DynamicIcon
                  name="lucide/quote"
                  size={32}
                  className="mb-4 text-white/40"
                />
                <blockquote className="text-base font-medium leading-relaxed">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-4">
                  <p className="font-semibold">
                    &mdash; {testimonial.name},
                    <span className="ml-1 text-white/60">
                      {testimonial.role}
                    </span>
                  </p>
                </figcaption>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
