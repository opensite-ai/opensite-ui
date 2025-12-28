"use client";

import * as React from "react";
import { format } from "date-fns";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { OptixFlowConfig } from "../../../src/types";

export interface ArticleHeroProsePost {
  title?: string;
  authorName?: string;
  authorHref?: string;
  image?: string;
  pubDate?: Date;
  description?: string;
  authorImage?: string;
}

export interface ArticleHeroProseProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header section
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the author info
   */
  authorClassName?: string;
  /**
   * Additional CSS classes for the hero image
   */
  heroImageClassName?: string;
  /**
   * Additional CSS classes for the prose content
   */
  proseClassName?: string;
  /**
   * Post metadata (title, author, image, etc.)
   */
  post?: ArticleHeroProsePost;
  /**
   * Custom slot for hero media (overrides post.image)
   */
  heroMediaSlot?: React.ReactNode;
  /**
   * Custom slot for author info (overrides post author fields)
   */
  authorSlot?: React.ReactNode;
  /**
   * Article body content (replaces hardcoded prose)
   */
  children?: React.ReactNode;
  /**
   * Date format string (date-fns format)
   * @default "MMMM d, yyyy"
   */
  dateFormat?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultPost: ArticleHeroProsePost = {
  title: "Designing websites faster with Opensite AI",
  authorName: "John Doe",
  authorHref: "#",
  image: imagePlaceholders[0],
  pubDate: new Date(),
  description:
    "A step-by-step guide to building a modern, responsive blog using React and Tailwind CSS.",
  authorImage: imagePlaceholders[10],
};

const defaultArticleContent = (optixFlowConfig?: OptixFlowConfig) => (
  <>
    <h2 className="text-3xl font-extrabold">The Great Joke Tax</h2>
    <p className="mt-2 text-lg text-muted-foreground">
      In a kingdom far away, where laughter once flowed freely, a peculiar
      tale unfolded about a king who decided to tax the very essence of
      joy itself - jokes and jest.
    </p>

    <h2>How the Tax System Works</h2>
    <p>
      The king, seeing how much happier his subjects were, realized the
      error of his ways and repealed the joke tax. Jokester was declared a
      hero, and the kingdom lived happily ever after.
    </p>
    <Alert>
      <DynamicIcon name="lucide/lightbulb" size={16} />
      <AlertTitle>Royal Decree!</AlertTitle>
      <AlertDescription>
        Remember, all jokes must be registered at the Royal Jest Office
        before telling them
      </AlertDescription>
    </Alert>
    <h2>The People&apos;s Rebellion</h2>
    <p>
      The people of the kingdom, feeling uplifted by the laughter, started
      to tell jokes and puns again, and soon the entire kingdom was in on
      the joke.
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
      error of his ways and repealed the joke tax. Jokester was declared a
      hero, and the kingdom lived happily ever after.
    </p>

    <h2>The King&apos;s Plan</h2>

    <Img
      src={imagePlaceholders[1]}
      alt="Article content image"
      className="my-8 aspect-video w-full rounded-md object-cover"
      optixFlowConfig={optixFlowConfig}
    />
    <p>
      The king thought long and hard, and finally came up with{" "}
      <Pressable href="#">a brilliant plan</Pressable>: he would tax the jokes in the
      kingdom.
    </p>
    <blockquote>
      &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good
      joke, so it&apos;s only fair that they should pay for the
      privilege.&rdquo;
    </blockquote>
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
      As a result, people stopped telling jokes, and the kingdom fell into
      a gloom. But there was one person who refused to let the king&apos;s
      foolishness get him down: a court jester named Jokester.
    </p>
  </>
);

export function ArticleHeroProseComponent({
  post = defaultPost,
  className,
  containerClassName,
  headerClassName,
  titleClassName,
  descriptionClassName,
  authorClassName,
  heroImageClassName,
  proseClassName,
  heroMediaSlot,
  authorSlot,
  children,
  dateFormat = "MMMM d, yyyy",
  optixFlowConfig,
}: ArticleHeroProseProps) {
  const { title, authorName, authorHref, image, pubDate, description, authorImage } = post;

  const renderAuthor = () => {
    if (authorSlot) return authorSlot;
    if (!authorName) return null;

    return (
      <div className={cn("flex items-center gap-3 text-sm md:text-base", authorClassName)}>
        <Avatar className="h-8 w-8 border">
          <AvatarImage src={authorImage} />
          <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <span>
          <Pressable href={authorHref || "#"} className="font-semibold">
            {authorName}
          </Pressable>
          {pubDate && (
            <span className="ml-1">on {format(pubDate, dateFormat)}</span>
          )}
        </span>
      </div>
    );
  };

  const renderHeroMedia = () => {
    if (heroMediaSlot) return heroMediaSlot;
    if (!image) return null;

    return (
      <Img
        src={image}
        alt="Article hero image"
        className={cn("mt-4 mb-8 aspect-video w-full rounded-lg border object-cover", heroImageClassName)}
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto flex max-w-5xl flex-col items-center gap-4 text-center", headerClassName)}>
          {title && (
            <h1 className={cn("max-w-3xl text-5xl font-semibold text-pretty md:text-6xl", titleClassName)}>
              {title}
            </h1>
          )}
          {description && (
            <h3 className={cn("max-w-3xl text-lg text-muted-foreground md:text-xl", descriptionClassName)}>
              {description}
            </h3>
          )}
          {renderAuthor()}
          {renderHeroMedia()}
        </div>
      </div>
      <div className={cn("container", containerClassName)}>
        <div className={cn("mx-auto prose max-w-3xl dark:prose-invert", proseClassName)}>
          {children || defaultArticleContent(optixFlowConfig)}
        </div>
      </div>
    </section>
  );
}

export { ArticleHeroProseComponent as ArticleHeroProse };
