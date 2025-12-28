"use client";

import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface CaseStudyProseSidebarProps {
  heroImage?: string;
  heroImageAlt?: string;
  title?: string;
  content?: React.ReactNode;
  companyLogo?: string;
  companyDescription?: string;
  industry?: string;
  location?: string;
  companySize?: string;
  websiteUrl?: string;
  websiteLabel?: string;
  topics?: string;
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

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
 * sidebar on the right with company logo, description, industry, location, company
 * size, website link, and topics. The sidebar uses an accent background with
 * organized sections separated by borders.
 *
 * Ideal for detailed case study pages, customer success stories, or in-depth
 * articles that need supplementary company context alongside the main narrative.
 *
 * @example
 * ```tsx
 * <CaseStudyProseSidebar
 *   heroImage="/images/case-study-hero.jpg"
 *   title="How TechCorp transformed their workflow"
 *   companyLogo="/logos/techcorp.svg"
 *   companyDescription="Leading enterprise software company"
 *   industry="Technology"
 *   location="San Francisco, CA"
 *   companySize="500-1000"
 *   websiteUrl="https://techcorp.com"
 * />
 * ```
 */
export function CaseStudyProseSidebar({
  heroImage = blockBrandedIconsAndPlaceholders.placeholder1,
  heroImageAlt = "Case study hero image",
  title,
  content = defaultContent,
  companyLogo = blockBrandedIconsAndPlaceholders.fictionalCompanyLogo3,
  companyDescription = "Suspendisse vel euismod sem. Sed sollicitudin augue eu facilisis scelerisque. Nullam pharetra tortor ut massa accumsan egestas.",
  industry = "Suspendisse volutpat",
  location = "London, United Kingdom",
  companySize = "11-50",
  websiteUrl = "#",
  websiteLabel = "https://example.com/",
  topics = "Sed sollicitudin augue eu facilisis scelerisque",
  className,
  optixFlowConfig,
}: CaseStudyProseSidebarProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col gap-12 lg:flex-row lg:gap-24">
        <article className="mx-auto">
          <Img
            src={heroImage}
            alt={heroImageAlt}
            className="mb-8 aspect-video w-full max-w-3xl rounded-lg border object-cover"
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
          <div className="prose dark:prose-invert">
            {content}
          </div>
        </article>

        <aside className="lg:max-w-[300px]">
          <div className="flex flex-col items-start rounded-lg border border-border bg-accent py-6 md:py-8">
            <div className="mb-8 px-6">
              <Img
                src={companyLogo}
                alt="Company logo"
                className="max-h-8 w-full"
                loading="lazy"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
            <div className="mb-5 px-6 last:mb-0">
              <div className="mb-2 text-xs font-semibold">Company</div>
              <div className="overflow-hidden text-xs text-muted-foreground md:text-sm">
                {companyDescription}
              </div>
            </div>
            <div className="mb-5 px-6 last:mb-0">
              <div className="mb-2 text-xs font-semibold">Industry</div>
              <div className="overflow-hidden text-xs text-muted-foreground md:text-sm">
                {industry}
              </div>
            </div>
            <div className="mb-5 w-full border-t border-border px-6 pt-5 last:mb-0">
              <div className="mb-2 text-xs font-semibold">Location</div>
              <div className="overflow-hidden text-xs text-muted-foreground md:text-sm">
                {location}
              </div>
            </div>
            <div className="mb-5 px-6 last:mb-0">
              <div className="mb-2 text-xs font-semibold">Company size</div>
              <div className="overflow-hidden text-xs text-muted-foreground md:text-sm">
                {companySize}
              </div>
            </div>
            <div className="mb-5 px-6 last:mb-0">
              <div className="mb-2 text-xs font-semibold">Website</div>
              <div className="overflow-hidden text-xs text-muted-foreground md:text-sm">
                <Pressable href={websiteUrl} className="underline hover:text-foreground">
                  {websiteLabel}
                </Pressable>
              </div>
            </div>
            <div className="mb-5 px-6 last:mb-0">
              <div className="mb-2 text-xs font-semibold">Topics</div>
              <div className="overflow-hidden text-xs text-muted-foreground md:text-sm">
                {topics}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
