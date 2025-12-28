"use client";

import * as React from "react";
import { Fragment } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface ResourceListNewsUpdatesItem {
  title: string;
  category: string;
  avatar: string;
  date: string;
  link: string;
}

export interface ResourceListNewsUpdatesProps {
  className?: string;
  sectionLabel?: string;
  title?: string;
  subtitle?: string;
  news?: ResourceListNewsUpdatesItem[];
}

const defaultNews: ResourceListNewsUpdatesItem[] = [
  {
    title: "TechFlow AI Platform now available on Azure Marketplace",
    category: "Partnership",
    avatar: blockBrandedIconsAndPlaceholders.avatar1,
    date: "June 15, 2024",
    link: "#",
  },
  {
    title: "CodeSphere: the journey behind our latest developer tool",
    category: "Press release",
    avatar: blockBrandedIconsAndPlaceholders.avatar2,
    date: "June 10, 2024",
    link: "#",
  },
  {
    title: "DataViz & CloudNative announce collaboration on next-gen analytics tools",
    category: "Partnership",
    avatar: blockBrandedIconsAndPlaceholders.avatar3,
    date: "May 28, 2024",
    link: "#",
  },
  {
    title: "QuantumByte launches EdgeCompute: a revolutionary edge computing platform",
    category: "News",
    avatar: blockBrandedIconsAndPlaceholders.avatar4,
    date: "May 12, 2024",
    link: "#",
  },
  {
    title: "Join us at DevCon Global Summit 2024 in Berlin",
    category: "Press release",
    avatar: blockBrandedIconsAndPlaceholders.avatar5,
    date: "May 5, 2024",
    link: "#",
  },
];

/**
 * ResourceListNewsUpdates - A news and updates listing with animated hover effects,
 * category badges, author avatars, and dates in a clean two-column layout.
 *
 * Key features:
 * - Section label with accent dot indicator
 * - Two-line title with primary/muted color split
 * - News items with hover slide animation and background highlight
 * - Category labels, author avatars, and dates for each item
 * - Arrow icon appears on hover for visual feedback
 * - Separator lines between items for clear visual structure
 *
 * Ideal for: Company news sections, press release archives, update logs,
 * announcement pages, changelog displays, and any content that benefits
 * from a timeline-style presentation with author attribution.
 */
export function ResourceListNewsUpdates({
  className,
  sectionLabel = "Resources",
  title = "Stay in the loop?",
  subtitle = "Discover our recent updates.",
  news = defaultNews,
}: ResourceListNewsUpdatesProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:gap-2">
          <div className="flex w-full max-w-56 items-center gap-3 text-sm">
            <span className="size-2 rounded-full bg-primary"></span>
            {sectionLabel}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl">
              {title}
              <br />
              <span className="text-primary/50">{subtitle}</span>
            </h2>
            <div className="mt-14">
              <Separator />
              {news.map((item, idx) => (
                <Fragment key={idx}>
                  <Pressable
                    href={item.link}
                    className="group flex flex-col justify-between gap-10 py-6 transition-all duration-400 lg:flex-row lg:items-center lg:hover:bg-muted"
                  >
                    <div className="flex items-center gap-2 text-lg transition-all duration-400 lg:group-hover:translate-x-8">
                      <p className="inline text-pretty text-primary">
                        {item.title}
                        <DynamicIcon
                          name="lucide/arrow-right"
                          size={16}
                          className="ml-2 inline shrink-0 opacity-0 transition-all duration-400 lg:group-hover:text-primary lg:group-hover:opacity-100"
                        />
                      </p>
                    </div>
                    <div className="flex w-full items-center justify-between transition-all duration-400 lg:max-w-72 lg:group-hover:-translate-x-4 xl:max-w-80">
                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-7 rounded-full border border-border">
                          <AvatarImage src={item.avatar} />
                        </Avatar>
                        <time className="text-xs text-muted-foreground">
                          {item.date}
                        </time>
                      </div>
                    </div>
                  </Pressable>
                  <Separator />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
