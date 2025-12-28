"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface ResourceDetailWhitepaperSidebarProps {
  className?: string;
  sidebar?: {
    resourceType?: string;
    resourceTitle?: string;
    downloadDescription?: string;
    readTime?: string;
    primaryDownload?: {
      text: string;
      href: string;
    };
    secondaryDownload?: {
      text: string;
      href: string;
    };
    shareTitle?: string;
    socialLinks?: Array<{
      platform: "instagram" | "linkedin" | "producthunt" | "twitter";
      href: string;
      label: string;
    }>;
  };
  article?: {
    title?: string;
    content?: React.ReactNode;
  };
}

const defaultSocialLinks = [
  {
    platform: "instagram" as const,
    href: "#",
    label: "Share on Instagram",
  },
  {
    platform: "linkedin" as const,
    href: "#",
    label: "Share on LinkedIn",
  },
  {
    platform: "producthunt" as const,
    href: "#",
    label: "Share on Product Hunt",
  },
  {
    platform: "twitter" as const,
    href: "#",
    label: "Share on Twitter",
  },
];

const defaultArticleContent = (
  <>
    <h1>White Paper: The Complete Guide to Launching Your Startup</h1>
    <p>
      Once upon a time, in a far-off land, there was a very lazy king who spent
      all day lounging on his throne. One day, his advisors came to him with a
      problem: the kingdom was running out of money.
    </p>
    <h2>The King&apos;s Plan</h2>
    <p>
      The king thought long and hard, and finally came up with{" "}
      <a href="#">a brilliant plan</a>: he would tax the jokes in the kingdom.
    </p>
    <blockquote>
      &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good joke, so
      it&apos;s only fair that they should pay for the privilege.&rdquo;
    </blockquote>
    <h3>The Joke Tax</h3>
    <p>
      The king&apos;s subjects were not amused. They grumbled and complained,
      but the king was firm:
    </p>
    <ul>
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners: 20 gold coins</li>
    </ul>
    <p>
      As a result, people stopped telling jokes, and the kingdom fell into a
      gloom. But there was one person who refused to let the king&apos;s
      foolishness get him down: a court jester named Jokester.
    </p>
    <h3>Jokester&apos;s Revolt</h3>
    <p>
      Jokester began sneaking into the castle in the middle of the night and
      leaving jokes all over the place: under the king&apos;s pillow, in his
      soup, even in the royal toilet. The king was furious, but he couldn&apos;t
      seem to stop Jokester.
    </p>
    <p>
      And then, one day, the people of the kingdom discovered that the jokes
      left by Jokester were so funny that they couldn&apos;t help but laugh. And
      once they started laughing, they couldn&apos;t stop.
    </p>
    <h3>The People&apos;s Rebellion</h3>
    <p>
      The people of the kingdom, feeling uplifted by the laughter, started to
      tell jokes and puns again, and soon the entire kingdom was in on the joke.
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
      The king, seeing how much happier his subjects were, realized the error of
      his ways and repealed the joke tax. Jokester was declared a hero, and the
      kingdom lived happily ever after.
    </p>
    <p>
      The moral of the story is: never underestimate the power of a good laugh
      and always be careful of bad ideas.
    </p>
  </>
);

const defaultProps: Partial<ResourceDetailWhitepaperSidebarProps> = {
  sidebar: {
    resourceType: "Whitepaper",
    resourceTitle: "The Complete Guide to Launching Your Startup",
    downloadDescription:
      "Enjoy this guide? Download it for offline reading or sharing.",
    readTime: "5 minutes",
    primaryDownload: {
      text: "PDF Format",
      href: "#",
    },
    secondaryDownload: {
      text: "Print Version",
      href: "#",
    },
    shareTitle: "Share this guide",
    socialLinks: defaultSocialLinks,
  },
  article: {
    title: "White Paper: The Complete Guide to Launching Your Startup",
    content: defaultArticleContent,
  },
};

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case "instagram":
      return blockBrandedIconsAndPlaceholders.integration1;
    case "linkedin":
      return blockBrandedIconsAndPlaceholders.integration2;
    case "producthunt":
      return blockBrandedIconsAndPlaceholders.integration3;
    case "twitter":
      return blockBrandedIconsAndPlaceholders.integration4;
    default:
      return blockBrandedIconsAndPlaceholders.integration1;
  }
};

/**
 * ResourceDetailWhitepaperSidebar - A resource detail layout with a left sidebar
 * containing whitepaper info card, download options, and social sharing icons.
 * Main content area displays prose article content. Ideal for whitepapers,
 * guides, ebooks, and downloadable resources.
 *
 * @example
 * ```tsx
 * <ResourceDetailWhitepaperSidebar
 *   sidebar={{
 *     resourceType: "Whitepaper",
 *     resourceTitle: "The Complete Guide to Launching Your Startup",
 *     downloadDescription: "Download for offline reading",
 *     readTime: "5 minutes",
 *     primaryDownload: { text: "PDF Format", href: "/download/pdf" },
 *     secondaryDownload: { text: "Print Version", href: "/download/print" },
 *   }}
 *   article={{
 *     title: "White Paper: The Complete Guide",
 *     content: <div>Your article content here...</div>,
 *   }}
 * />
 * ```
 */
export function ResourceDetailWhitepaperSidebar({
  className,
  sidebar = defaultProps.sidebar,
  article = defaultProps.article,
}: ResourceDetailWhitepaperSidebarProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container grid gap-12 md:grid-cols-12 md:gap-8">
        <div className="order-last md:order-0 md:col-span-4 lg:col-span-3">
          <aside className="flex flex-col gap-2">
            <div className="mb-6 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="border-b border-border bg-muted/50 px-5 py-4">
                <h3 className="flex items-center text-sm font-semibold">
                  <DynamicIcon
                    name="lucide/book"
                    size={14}
                    className="mr-2.5 text-muted-foreground"
                  />
                  {sidebar?.resourceType}
                </h3>
              </div>
              <div className="p-5">
                <div className="gap-4 text-lg leading-snug font-semibold text-foreground">
                  <p>{sidebar?.resourceTitle}</p>
                </div>
              </div>
            </div>

            <div className="mb-6 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="border-b border-border bg-muted/50 px-5 py-4">
                <h3 className="flex items-center text-sm font-semibold">
                  <DynamicIcon
                    name="lucide/download"
                    size={14}
                    className="mr-2.5 text-muted-foreground"
                  />
                  Download Options
                </h3>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {sidebar?.downloadDescription}
                  </p>
                  <div className="flex flex-col space-y-2">
                    {sidebar?.primaryDownload && (
                      <Pressable
                        href={sidebar.primaryDownload.href}
                        variant="default"
                        asButton
                        className="w-full justify-between"
                      >
                        {sidebar.primaryDownload.text}
                        <DynamicIcon
                          name="lucide/download"
                          size={16}
                          className="ml-2"
                        />
                      </Pressable>
                    )}
                    {sidebar?.secondaryDownload && (
                      <Pressable
                        href={sidebar.secondaryDownload.href}
                        variant="outline"
                        asButton
                        className="w-full justify-between"
                      >
                        {sidebar.secondaryDownload.text}
                        <DynamicIcon
                          name="lucide/download"
                          size={16}
                          className="ml-2"
                        />
                      </Pressable>
                    )}
                  </div>
                  {sidebar?.readTime && (
                    <p className="mt-4 text-center text-xs text-muted-foreground">
                      Read time: {sidebar.readTime}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="border-b border-border bg-muted/50 px-5 py-4">
                <h3 className="flex items-center text-sm font-semibold">
                  <DynamicIcon
                    name="lucide/share-2"
                    size={14}
                    className="mr-2.5 text-muted-foreground"
                  />
                  {sidebar?.shareTitle}
                </h3>
              </div>
              <div className="p-5">
                <ul className="flex items-center gap-2">
                  {sidebar?.socialLinks?.map((link, index) => (
                    <li key={index}>
                      <Pressable
                        href={link.href}
                        className="flex size-10 items-center justify-center rounded-full border border-border bg-muted/50 transition-colors hover:bg-muted"
                        aria-label={link.label}
                      >
                        <img
                          src={getSocialIcon(link.platform)}
                          alt={link.platform}
                          className="size-5"
                        />
                      </Pressable>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
        <div className="md:col-span-7 md:col-start-5 lg:col-start-6">
          <article className="prose prose-sm dark:prose-invert">
            {article?.content}
          </article>
        </div>
      </div>
    </section>
  );
}
