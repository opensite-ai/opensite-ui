"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Separator } from "../../ui/separator";

export interface ListAchievementItem {
  /**
   * Icon name for the achievement (e.g., "lucide/trophy")
   */
  icon?: string;
  /**
   * Title of the achievement
   */
  title?: string;
  /**
   * Category of the achievement
   */
  category?: string;
  /**
   * Description of the achievement
   */
  description?: string;
  /**
   * Link URL for more details
   */
  link?: string;
}

export interface ListAchievementsShowcaseProps {
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Array of achievement items to display
   */
  items?: ListAchievementItem[];
  /**
   * Text for the view project button
   */
  buttonText?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

const defaultItems: ListAchievementItem[] = [
  {
    icon: "lucide/trophy",
    title: "Industry Recognition",
    category: "Achievement",
    description: "Outstanding Performance Award.",
    link: "#",
  },
  {
    icon: "lucide/award",
    title: "Excellence Award",
    category: "Recognition",
    description: "Best in Category Winner.",
    link: "#",
  },
  {
    icon: "lucide/lightbulb",
    title: "Innovation Prize",
    category: "Technology",
    description: "Breakthrough Solution of the Year.",
    link: "#",
  },
  {
    icon: "lucide/heart-handshake",
    title: "Customer Success",
    category: "Service",
    description: "Top-Rated Solution Provider.",
    link: "#",
  },
  {
    icon: "lucide/building-2",
    title: "Global Leadership",
    category: "Management",
    description: "Executive Team of the Year.",
    link: "#",
  },
  {
    icon: "lucide/leaf",
    title: "Sustainability Impact",
    category: "Environmental",
    description: "Green Initiative Excellence.",
    link: "#",
  },
];

/**
 * ListAchievementsShowcase - A vertical list displaying achievements and recognition
 * with icons, titles, categories, descriptions, and action links. Each item is separated
 * by dividers and features a responsive grid layout that adapts to mobile screens.
 *
 * Perfect for showcasing awards, certifications, milestones, or company achievements
 * in a professional, scannable format.
 *
 * @example
 * ```tsx
 * <ListAchievementsShowcase
 *   heading="Our Achievements & Recognition"
 *   items={[
 *     {
 *       icon: "lucide/trophy",
 *       title: "Industry Recognition",
 *       category: "Achievement",
 *       description: "Outstanding Performance Award.",
 *       link: "/achievements/recognition"
 *     }
 *   ]}
 *   buttonText="View project"
 * />
 * ```
 */
export function ListAchievementsShowcase({
  heading = "Our Achievements & Recognition",
  items = defaultItems,
  buttonText = "View project",
  className,
}: ListAchievementsShowcaseProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container px-0 md:px-8">
        <h1 className="mb-10 px-4 text-3xl font-semibold md:mb-14 md:text-4xl">
          {heading}
        </h1>
        <div className="flex flex-col">
          <Separator />
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <div className="grid items-center gap-4 px-4 py-5 md:grid-cols-4">
                <div className="order-2 flex items-center gap-2 md:order-none">
                  <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-md bg-muted">
                    {item.icon && (
                      <DynamicIcon
                        name={item.icon}
                        size={24}
                        className="text-foreground"
                      />
                    )}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                </div>
                <p className="order-1 text-2xl font-semibold md:order-none md:col-span-2">
                  {item.description}
                </p>
                <Pressable
                  href={item.link}
                  variant="outline"
                  asButton
                  className="order-3 ml-auto w-fit gap-2 md:order-none"
                >
                  <span>{buttonText}</span>
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="text-current"
                  />
                </Pressable>
              </div>
              <Separator />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
