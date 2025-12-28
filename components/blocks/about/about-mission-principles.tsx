"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface AboutMissionPrincipleItem {
  /**
   * Principle number (e.g., "01", "02")
   */
  number: string;
  /**
   * Principle title
   */
  title: string;
  /**
   * Principle description
   */
  description: string;
}

export interface AboutMissionPrinciplesProps {
  /**
   * Badge/label text
   */
  badgeText?: string;
  /**
   * Main mission statement heading
   */
  missionHeading?: string;
  /**
   * Mission description text
   */
  missionDescription?: string;
  /**
   * CTA button text
   */
  ctaText?: string;
  /**
   * CTA button URL
   */
  ctaUrl?: string;
  /**
   * Array of principle items
   */
  principles?: AboutMissionPrincipleItem[];
  /**
   * Vision section heading
   */
  visionHeading?: string;
  /**
   * Vision section description
   */
  visionDescription?: string;
  /**
   * Vision CTA text
   */
  visionCtaText?: string;
  /**
   * Vision CTA URL
   */
  visionCtaUrl?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

const defaultPrinciples: AboutMissionPrincipleItem[] = [
  {
    number: "01",
    title: "Customer-Centric",
    description:
      "We place our customers at the center of everything we do, designing products and services that solve real problems and create lasting value.",
  },
  {
    number: "02",
    title: "Innovation-Driven",
    description:
      "We continuously explore new ideas and technologies to push boundaries and create better solutions for evolving challenges.",
  },
  {
    number: "03",
    title: "Quality-Focused",
    description:
      "We are committed to excellence in every aspect of our work, from the products we build to the experiences we create and the support we provide.",
  },
  {
    number: "04",
    title: "Inclusive by Design",
    description:
      "We embrace diversity of thought, background, and perspective, creating solutions that work for everyone and building teams that reflect the communities we serve.",
  },
];

/**
 * About Mission Principles - A comprehensive mission statement section with
 * numbered principle cards and a vision callout.
 *
 * Layout: Two-column grid with mission text on left, principle cards on right,
 * followed by a full-width vision banner.
 * Key features: Numbered principle cards, badge label, dual CTAs.
 * Best for: Company about pages, mission statements, values showcases.
 *
 * @example
 * ```tsx
 * <AboutMissionPrinciples
 *   badgeText="Our Mission"
 *   missionHeading="To empower people through technology"
 *   missionDescription="We believe technology should serve humanity."
 *   principles={[
 *     { number: "01", title: "Customer-Centric", description: "..." },
 *   ]}
 * />
 * ```
 */
export function AboutMissionPrinciples({
  badgeText = "Our Mission",
  missionHeading = "To empower people through technology that's intuitive, accessible, and transformative.",
  missionDescription = "We believe technology should serve humanity, not the other way around. Our mission drives us to create solutions that enhance people's lives, expand their capabilities, and help them achieve their goals.",
  ctaText = "See our impact",
  ctaUrl = "#",
  principles = defaultPrinciples,
  visionHeading = "Our Vision",
  visionDescription = "We envision a world where technology enhances human potential, enabling everyone to achieve more, connect meaningfully, and contribute to a better future. We strive to be the company that makes this vision a reality through thoughtful innovation and an unwavering commitment to our core principles.",
  visionCtaText = "View our strategy",
  visionCtaUrl = "#",
  className,
}: AboutMissionPrinciplesProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-8">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              {badgeText}
            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
              {missionHeading}
            </h2>

            <p className="text-xl text-muted-foreground">{missionDescription}</p>

            <div className="pt-2">
              <Pressable
                href={ctaUrl}
                variant="default"
                asButton
                className="group inline-flex items-center"
              >
                {ctaText}
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Pressable>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <div
                key={principle.number}
                className="relative rounded-lg border p-6 transition-colors hover:bg-accent/50"
              >
                <div className="absolute right-4 top-4 text-3xl font-bold text-primary/20">
                  {principle.number}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold">{principle.title}</h3>
                  <p className="text-muted-foreground">{principle.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 rounded-lg bg-accent p-8 lg:p-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h3 className="mb-4 text-2xl font-bold">{visionHeading}</h3>
              <p className="mb-4 text-muted-foreground">{visionDescription}</p>
            </div>
            <div className="flex justify-center lg:col-span-1 lg:justify-end">
              <Pressable
                href={visionCtaUrl}
                variant="outline"
                size="lg"
                asButton
                className="group inline-flex items-center"
              >
                {visionCtaText}
                <DynamicIcon
                  name="lucide/arrow-right"
                  size={16}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </Pressable>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
