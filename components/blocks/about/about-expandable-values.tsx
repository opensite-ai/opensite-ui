"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface AboutExpandableValueItem {
  /**
   * Unique identifier for the value
   */
  id: string;
  /**
   * Icon name in format: prefix/name (e.g., "lucide/shield")
   */
  icon: string;
  /**
   * Value title
   */
  title: string;
  /**
   * Short description shown when collapsed
   */
  shortDescription: string;
  /**
   * Long description shown when expanded
   */
  longDescription: string;
  /**
   * Examples of how the value is practiced
   */
  examples: string[];
}

export interface AboutExpandableValuesProps {
  /**
   * Badge/label text
   */
  badgeText?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Supporting description text
   */
  description?: string;
  /**
   * Array of value items
   */
  values?: AboutExpandableValueItem[];
  /**
   * Bottom CTA heading
   */
  ctaHeading?: string;
  /**
   * Bottom CTA description
   */
  ctaDescription?: string;
  /**
   * Bottom CTA button text
   */
  ctaButtonText?: string;
  /**
   * Bottom CTA button URL
   */
  ctaButtonUrl?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

const defaultValues: AboutExpandableValueItem[] = [
  {
    id: "integrity",
    icon: "lucide/shield",
    title: "Integrity",
    shortDescription: "Doing what's right, even when no one is watching.",
    longDescription:
      "We believe that honesty and strong moral principles are the foundation of any successful business. We are transparent in our practices, accountable for our actions, and committed to doing what's right in all situations.",
    examples: [
      "Transparent pricing with no hidden fees",
      "Honest communication with clients, even when delivering difficult news",
      "Ethical sourcing and business practices",
    ],
  },
  {
    id: "innovation",
    icon: "lucide/zap",
    title: "Innovation",
    shortDescription: "Constantly exploring new ideas to create better solutions.",
    longDescription:
      "We embrace change and continuously seek new ways to solve problems. We encourage creative thinking, experimentation, and calculated risk-taking to drive our industry forward and deliver exceptional value to our clients.",
    examples: [
      "Dedicated time for all team members to explore new ideas",
      "Regular hackathons and innovation challenges",
      "Investment in research and emerging technologies",
    ],
  },
  {
    id: "collaboration",
    icon: "lucide/users",
    title: "Collaboration",
    shortDescription: "Achieving more by working together effectively.",
    longDescription:
      "We believe the best results come from diverse teams working together toward common goals. We foster an inclusive environment where all voices are heard, different perspectives are valued, and collective success is celebrated.",
    examples: [
      "Cross-functional teams with diverse backgrounds and expertise",
      "Open workspaces and collaboration tools",
      "Recognition programs that celebrate team achievements",
    ],
  },
  {
    id: "empathy",
    icon: "lucide/heart",
    title: "Empathy",
    shortDescription: "Understanding and sharing the feelings of others.",
    longDescription:
      "We prioritize understanding our customers' and colleagues' perspectives and experiences. By putting ourselves in others' shoes, we build stronger relationships, create better products, and foster a supportive work environment.",
    examples: [
      "User research and feedback sessions that inform our decisions",
      "Comprehensive support for employees during difficult times",
      "Products designed with accessibility and inclusion in mind",
    ],
  },
  {
    id: "excellence",
    icon: "lucide/brain",
    title: "Excellence",
    shortDescription: "Striving for the highest quality in everything we do.",
    longDescription:
      "We are committed to delivering exceptional quality and exceeding expectations. We continuously raise our standards, refine our processes, and develop our skills to achieve outstanding results in all areas of our business.",
    examples: [
      "Rigorous quality assurance processes",
      "Continuous professional development opportunities",
      "Recognition and celebration of exceptional work",
    ],
  },
  {
    id: "sustainability",
    icon: "lucide/globe",
    title: "Sustainability",
    shortDescription: "Creating long-term value while minimizing environmental impact.",
    longDescription:
      "We recognize our responsibility to future generations and the planet. We make business decisions that balance economic growth with environmental protection and social well-being, aiming to create positive impact beyond profitability.",
    examples: [
      "Carbon neutrality commitment and tracking",
      "Eco-friendly office practices and remote work options",
      "Community involvement and social responsibility initiatives",
    ],
  },
];

/**
 * About Expandable Values - An interactive values section with expandable cards
 * that reveal detailed descriptions and examples when clicked.
 *
 * Layout: Responsive grid of value cards that expand to full width when active.
 * Key features: Expandable cards, icon integration, example lists, CTA banner.
 * Best for: Company values pages, culture showcases, brand identity sections.
 *
 * @example
 * ```tsx
 * <AboutExpandableValues
 *   badgeText="Our Core Values"
 *   heading="The Principles That Guide Us"
 *   values={[
 *     {
 *       id: "integrity",
 *       icon: "lucide/shield",
 *       title: "Integrity",
 *       shortDescription: "Doing what's right.",
 *       longDescription: "We believe in honesty...",
 *       examples: ["Transparent pricing", "Honest communication"],
 *     },
 *   ]}
 * />
 * ```
 */
export function AboutExpandableValues({
  badgeText = "Our Core Values",
  heading = "The Principles That Guide Us",
  description = "Our values define who we are, how we work together, and what we strive for. They are the foundation of our culture and drive every decision we make.",
  values = defaultValues,
  ctaHeading = "Living Our Values Every Day",
  ctaDescription = "These aren't just words on our website—our values are integrated into our hiring processes, performance reviews, decision-making frameworks, and daily interactions. They're how we show up for our team, our customers, and our community.",
  ctaButtonText = "Learn about our culture",
  ctaButtonUrl = "#",
  className,
}: AboutExpandableValuesProps) {
  const [expandedValue, setExpandedValue] = React.useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedValue(expandedValue === id ? null : id);
  };

  return (
    <section className={cn("py-24", className)}>
      <div className="container mx-auto space-y-12 px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            {badgeText}
          </div>
          <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.id}
              className={cn(
                "group overflow-hidden rounded-xl border bg-card text-card-foreground transition-all duration-300",
                expandedValue === value.id
                  ? "col-span-1 shadow-lg md:col-span-2 lg:col-span-3"
                  : ""
              )}
            >
              <button
                onClick={() => toggleExpand(value.id)}
                className="flex w-full items-start justify-between p-6 text-left"
                type="button"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 rounded-md bg-primary/10 p-3">
                    <DynamicIcon name={value.icon} size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{value.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {value.shortDescription}
                    </p>
                  </div>
                </div>
                <DynamicIcon
                  name="lucide/chevron-down"
                  size={20}
                  className={cn(
                    "mt-1 flex-shrink-0 text-muted-foreground transition-transform duration-300",
                    expandedValue === value.id ? "rotate-180" : ""
                  )}
                />
              </button>

              {expandedValue === value.id && (
                <div className="space-y-6 px-6 pb-6">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-muted-foreground">{value.longDescription}</p>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
                      How we put this into practice:
                    </h4>
                    <ul className="space-y-2">
                      {value.examples.map((example, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="mt-0.5 flex-shrink-0 rounded-full bg-primary/10 p-1">
                            <DynamicIcon
                              name={value.icon}
                              size={12}
                              className="text-primary"
                            />
                          </div>
                          <span className="text-sm">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="relative mt-8 rounded-lg bg-accent/50 p-8">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h3 className="text-2xl font-bold">{ctaHeading}</h3>
            <p className="text-muted-foreground">{ctaDescription}</p>
            <Pressable href={ctaButtonUrl} variant="default" asButton>
              {ctaButtonText}
            </Pressable>
          </div>
        </div>
      </div>
    </section>
  );
}
