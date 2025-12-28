"use client";

import * as React from "react";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface ResourceListCourseCardsAuthor {
  name: string;
  title: string;
  avatar: string;
}

export interface ResourceListCourseCardsCourse {
  badge?: string;
  title: string;
  description: string;
  author: ResourceListCourseCardsAuthor;
  image: string;
  lessons: number;
  videos: number;
  duration: string;
  audience: string[];
  gradient: string;
  cta: {
    text: string;
    url: string;
  };
}

export interface ResourceListCourseCardsProps {
  className?: string;
  courses?: ResourceListCourseCardsCourse[];
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultCourses: ResourceListCourseCardsCourse[] = [
  {
    badge: "Course",
    title: "Master Sanity Studio Fundamentals",
    description:
      "Learn the core concepts of Sanity Studio, from schema design to content modeling. Build your first content management system with hands-on exercises and real-world examples.",
    author: {
      name: "Alex Chen",
      title: "Senior Developer at Sanity",
      avatar: blockBrandedIconsAndPlaceholders.avatar1,
    },
    lessons: 12,
    videos: 15,
    duration: "42:18 minutes",
    audience: ["Developers", "Content creators"],
    gradient: "from-blue-100 to-purple-100",
    image: blockBrandedIconsAndPlaceholders.placeholder1,
    cta: {
      text: "Start",
      url: "#",
    },
  },
  {
    badge: "Course",
    title: "Advanced Content Operations",
    description:
      "Dive deep into advanced Sanity features including custom input components, validation rules, and performance optimization. Learn to build scalable content workflows for enterprise applications.",
    author: {
      name: "Maria Rodriguez",
      title: "Lead Content Strategist",
      avatar: blockBrandedIconsAndPlaceholders.avatar2,
    },
    lessons: 18,
    videos: 22,
    duration: "58:45 minutes",
    audience: ["Developers", "Content creators", "Designers"],
    gradient: "from-green-100 to-emerald-100",
    image: blockBrandedIconsAndPlaceholders.placeholder2,
    cta: {
      text: "Start",
      url: "#",
    },
  },
];

/**
 * ResourceListCourseCards - A course/training listing with detailed metadata cards
 * featuring author info, lesson counts, video duration, and animated visual elements.
 *
 * Key features:
 * - Course cards with badge, title, description, and author info
 * - Metadata display: audience, lessons count, videos count, duration
 * - Author section with avatar, name, and title
 * - Animated visual element with stacked cards and gradient background
 * - Hover effects on visual elements and CTA links
 * - Responsive two-column layout
 *
 * Ideal for: Online course platforms, training portals, educational resources,
 * tutorial libraries, certification programs, and learning management systems
 * that need to showcase course details with instructor information.
 */
export function ResourceListCourseCards({
  className,
  courses = defaultCourses,
  optixFlowConfig,
}: ResourceListCourseCardsProps) {
  return (
    <section className={cn("bg-background py-16", className)}>
      <div className="flex flex-col gap-8">
        {courses.map((course) => (
          <div
            key={course.title}
            className="relative flex flex-col gap-8 border-t border-border py-16 md:p-8"
          >
            <div className="container grid grid-cols-1 gap-10 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                {course.badge && (
                  <div>
                    <Badge variant="secondary" className="rounded-none uppercase">
                      {course.badge}
                    </Badge>
                  </div>
                )}

                <h3 className="text-2xl font-bold">{course.title}</h3>

                <div className="space-y-2 text-sm text-foreground/90">
                  <div className="flex items-center gap-2">
                    <DynamicIcon name="lucide/users" size={16} />
                    <span>{course.audience.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DynamicIcon name="lucide/book-open" size={16} />
                    <span>{course.lessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DynamicIcon name="lucide/play" size={16} />
                    <span>
                      {course.videos} Videos, {course.duration}
                    </span>
                  </div>
                </div>

                <p className="text-lg leading-relaxed">{course.description}</p>

                <div>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 border xl:size-12">
                      <AvatarImage src={course.author.avatar} />
                      <AvatarFallback>{course.author.name}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{course.author.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {course.author.title}
                      </p>
                    </div>
                  </div>
                </div>

                <Pressable
                  href={course.cta.url}
                  className="group/btn flex w-fit items-center gap-2 border-l border-border p-1 hover:bg-accent"
                >
                  <span className="font-medium">{course.cta.text}</span>
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="text-primary transition-transform group-hover/btn:translate-x-1"
                  />
                </Pressable>
              </div>

              <div>
                <div
                  className={cn(
                    "group grid aspect-video w-full place-items-center rounded-lg bg-gradient-to-br pt-6 pr-8 transition duration-200 ease-out hover:scale-[1.03] hover:-rotate-2 dark:from-muted dark:to-muted/50",
                    course.gradient
                  )}
                >
                  <div className="col-start-1 row-start-1 flex aspect-square w-24 origin-top-left -rotate-6 rounded-md border border-border bg-muted/50 shadow-lg transition duration-500 ease-out group-hover:scale-[1.1] group-hover:-rotate-2 lg:w-32"></div>
                  <div className="col-start-1 row-start-1 flex aspect-square w-24 origin-top-left rotate-[-8deg] rounded-md border border-border bg-muted/50 transition duration-500 ease-out group-hover:scale-[1.1] group-hover:rotate-[-8deg] lg:w-32"></div>
                  <div className="relative col-start-1 row-start-1 flex aspect-square w-24 origin-top-left rotate-[-10deg] rounded-md border border-border bg-card shadow-lg transition duration-500 ease-out group-hover:scale-[1.1] group-hover:rotate-[-14deg] lg:w-32">
                    <div className="m-4 h-4 w-4 rounded-full bg-muted shadow-inner"></div>
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-md">
                      <Img
                        src={course.image}
                        alt={course.title}
                        className="h-full w-full object-cover"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
