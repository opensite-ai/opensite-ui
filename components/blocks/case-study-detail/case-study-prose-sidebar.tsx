"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { DetailItem, OptixFlowConfig } from "../../../src/types";

export interface CaseStudyProseSidebarProps {
  /**
   * Hero image URL
   */
  heroImageSrc?: string;
  /**
   * Hero image alt text
   */
  heroImageAlt?: string;
  /**
   * Custom slot for hero media (overrides heroImageSrc)
   */
  heroMediaSlot?: React.ReactNode;
  /**
   * Main prose content
   */
  content?: React.ReactNode;
  /**
   * Custom slot for content (overrides content prop)
   */
  contentSlot?: React.ReactNode;
  /**
   * Company logo URL
   */
  companyLogoSrc?: string;
  /**
   * Company logo alt text
   */
  companyLogoAlt?: string;
  /**
   * Custom slot for company logo (overrides companyLogoSrc)
   */
  companyLogoSlot?: React.ReactNode;
  /**
   * Array of detail items for the sidebar (replaces individual company props)
   */
  details?: DetailItem[];
  /**
   * Custom slot for entire sidebar (overrides all sidebar props)
   */
  sidebarSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the article/main content area
   */
  articleClassName?: string;
  /**
   * Additional CSS classes for the hero image
   */
  heroImageClassName?: string;
  /**
   * Additional CSS classes for the prose content
   */
  proseClassName?: string;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the sidebar card
   */
  sidebarCardClassName?: string;
  /**
   * Additional CSS classes for the company logo
   */
  companyLogoClassName?: string;
  /**
   * Additional CSS classes for detail items
   */
  detailItemClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultDetails: DetailItem[] = [
  { label: "Company", value: "Suspendisse vel euismod sem. Sed sollicitudin augue eu facilisis scelerisque. Nullam pharetra tortor ut massa accumsan egestas." },
  { label: "Industry", value: "Suspendisse volutpat" },
  { label: "Location", value: "London, United Kingdom" },
  { label: "Company size", value: "11-50" },
  { label: "Website", value: "https://example.com/", href: "https://example.com/" },
  { label: "Topics", value: "Sed sollicitudin augue eu facilisis scelerisque" },
];

const defaultContent = (
  <>
    <h1>How Opensite AI uses semantic components to build their design system</h1>
    <p>
      Once upon a time, in a far-off land, there was a very lazy king
      who spent all day lounging on his throne. One day, his advisors
      came to him with a problem: the kingdom was running out of money.
    </p>
    <h2>The King&apos;s Plan</h2>
    <p>
      The king thought long and hard, and finally came up with{" "}
      <a href="#">a brilliant plan</a>: he would tax the jokes in the
      kingdom.
    </p>
    <blockquote>
      &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good
      joke, so it&apos;s only fair that they should pay for the
      privilege.&rdquo;
    </blockquote>
    <h3>The Joke Tax</h3>
    <p>
      The king&apos;s subjects were not amused. They grumbled and
      complained, but the king was firm:
    </p>
    <ul>
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners : 20 gold coins</li>
    </ul>
    <p>
      As a result, people stopped telling jokes, and the kingdom fell
      into a gloom. But there was one person who refused to let the
      king&apos;s foolishness get him down: a court jester named
      Jokester.
    </p>
    <h3>Jokester&apos;s Revolt</h3>
    <p>
      Jokester began sneaking into the castle in the middle of the night
      and leaving jokes all over the place: under the king&apos;s
      pillow, in his soup, even in the royal toilet. The king was
      furious, but he couldn&apos;t seem to stop Jokester.
    </p>
    <p>
      And then, one day, the people of the kingdom discovered that the
      jokes left by Jokester were so funny that they couldn&apos;t help
      but laugh. And once they started laughing, they couldn&apos;t
      stop.
    </p>
    <h3>The People&apos;s Rebellion</h3>
    <p>
      The people of the kingdom, feeling uplifted by the laughter,
      started to tell jokes and puns again, and soon the entire kingdom
      was in on the joke.
    </p>
    <div>
      <table>
        <thead>
          <tr>
            <th>King&apos;s Treasury</th>
            <th>People&apos;s happiness</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Empty</td>
            <td>Overflowing</td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td>Modest</td>
            <td>Satisfied</td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td>Full</td>
            <td>Ecstatic</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      The king, seeing how much happier his subjects were, realized the
      error of his ways and repealed the joke tax. Jokester was declared
      a hero, and the kingdom lived happily ever after.
    </p>
    <p>
      The moral of the story is: never underestimate the power of a good
      laugh and always be careful of bad ideas.
    </p>
  </>
);

/**
 * CaseStudyProseSidebar displays a case study article with rich prose content
 * and a sidebar containing company information.
 *
 * Features a two-column layout with the main article content on the left (including
 * hero image, headings, paragraphs, blockquotes, lists, and tables) and a sticky
 * sidebar on the right with company logo and flexible detail items. The sidebar
 * uses an accent background with organized sections.
 *
 * Ideal for detailed case study pages, customer success stories, or in-depth
 * articles that need supplementary company context alongside the main narrative.
 *
 * @example
 * ```tsx
 * <CaseStudyProseSidebar
 *   heroImageSrc="/images/case-study-hero.jpg"
 *   companyLogoSrc="/logos/techcorp.svg"
 *   details={[
 *     { label: "Company", value: "Leading enterprise software company" },
 *     { label: "Industry", value: "Technology" },
 *     { label: "Location", value: "San Francisco, CA" },
 *     { label: "Website", value: "techcorp.com", href: "https://techcorp.com" }
 *   ]}
 * />
 * ```
 */
export function CaseStudyProseSidebar({
  heroImageSrc = blockBrandedIconsAndPlaceholders.placeholder1,
  heroImageAlt = "Case study hero image",
  heroMediaSlot,
  content = defaultContent,
  contentSlot,
  companyLogoSrc = blockBrandedIconsAndPlaceholders.fictionalCompanyLogo3,
  companyLogoAlt = "Company logo",
  companyLogoSlot,
  details = defaultDetails,
  sidebarSlot,
  className,
  containerClassName,
  articleClassName,
  heroImageClassName,
  proseClassName,
  sidebarClassName,
  sidebarCardClassName,
  companyLogoClassName,
  detailItemClassName,
  optixFlowConfig,
}: CaseStudyProseSidebarProps): React.JSX.Element {
  const renderHeroMedia = () => {
    if (heroMediaSlot) return heroMediaSlot;

    return (
      <Img
        src={heroImageSrc}
        alt={heroImageAlt}
        className={cn("mb-8 aspect-video w-full max-w-3xl rounded-lg border object-cover", heroImageClassName)}
        loading="lazy"
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  const renderContent = () => {
    if (contentSlot) return contentSlot;

    return (
      <div className={cn("prose dark:prose-invert", proseClassName)}>
        {content}
      </div>
    );
  };

  const renderCompanyLogo = () => {
    if (companyLogoSlot) return companyLogoSlot;

    return (
      <div className="mb-8 px-6">
        <Img
          src={companyLogoSrc}
          alt={companyLogoAlt}
          className={cn("max-h-8 w-full", companyLogoClassName)}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    );
  };

  const renderDetailItem = (detail: DetailItem, index: number, isFirstAfterBorder: boolean = false) => {
    const baseClassName = isFirstAfterBorder
      ? "mb-5 w-full border-t border-border px-6 pt-5 last:mb-0"
      : "mb-5 px-6 last:mb-0";

    return (
      <div key={index} className={cn(baseClassName, detail.className, detailItemClassName)}>
        <div className="mb-2 text-xs font-semibold">
          {detail.label}
        </div>
        <div className="overflow-hidden text-xs text-muted-foreground md:text-sm">
          {detail.href ? (
            <Pressable href={detail.href} className="underline hover:text-foreground">
              {detail.value}
            </Pressable>
          ) : (
            detail.value
          )}
        </div>
      </div>
    );
  };

  const renderDetails = () => {
    if (!details || details.length === 0) return null;

    return details.map((detail, index) => {
      const isFirstAfterBorder = index === 2;
      return renderDetailItem(detail, index, isFirstAfterBorder);
    });
  };

  const renderSidebar = () => {
    if (sidebarSlot) return sidebarSlot;

    return (
      <aside className={cn("lg:max-w-[300px]", sidebarClassName)}>
        <div className={cn("flex flex-col items-start rounded-lg border border-border bg-accent py-6 md:py-8", sidebarCardClassName)}>
          {renderCompanyLogo()}
          {renderDetails()}
        </div>
      </aside>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container flex flex-col gap-12 lg:flex-row lg:gap-24", containerClassName)}>
        <article className={cn("mx-auto", articleClassName)}>
          {renderHeroMedia()}
          {renderContent()}
        </article>
        {renderSidebar()}
      </div>
    </section>
  );
}
