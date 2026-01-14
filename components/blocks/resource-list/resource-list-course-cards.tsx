"use client";

import * as React from "react";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Section } from "../../ui/section";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { PatternName } from "../../ui/pattern-background";
import type { OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface ResourceListCourseCardsAuthor {
  /**
   * Author name
   */
  name: React.ReactNode;
  /**
   * Author title/role
   */
  title: React.ReactNode;
  /**
   * Author avatar URL
   */
  avatar: string;
}

export interface ResourceListCourseCardsCourse {
  /**
   * Badge text for the course
   */
  badge?: React.ReactNode;
  /**
   * Course title
   */
  title: React.ReactNode;
  /**
   * Course description
   */
  description: React.ReactNode;
  /**
   * Course author information
   */
  author: ResourceListCourseCardsAuthor;
  /**
   * Course image URL
   */
  image: string;
  /**
   * Number of lessons
   */
  lessons: number;
  /**
   * Lessons label (defaults to "Lessons")
   */
  lessonsLabel?: React.ReactNode;
  /**
   * Number of videos
   */
  videos: number;
  /**
   * Videos label (defaults to "Videos")
   */
  videosLabel?: React.ReactNode;
  /**
   * Course duration
   */
  duration: React.ReactNode;
  /**
   * Target audience labels
   */
  audience: React.ReactNode[];
  /**
   * Gradient class for the visual element
   */
  gradient: string;
  /**
   * CTA configuration
   */
  cta: {
    text: React.ReactNode;
    url: string;
  };
  /**
   * Additional CSS classes for the course card
   */
  className?: string;
}

export interface ResourceListCourseCardsProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Array of course configurations
   */
  courses?: ResourceListCourseCardsCourse[];
  /**
   * Custom slot for rendering courses (overrides courses array)
   */
  coursesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the courses container
   */
  coursesClassName?: string;
  /**
   * Additional CSS classes for each course card
   */
  courseCardClassName?: string;
  /**
   * Additional CSS classes for the course content area
   */
  courseContentClassName?: string;
  /**
   * Additional CSS classes for the course visual area
   */
  courseVisualClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

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
  courses,
  coursesSlot,
  coursesClassName,
  courseCardClassName,
  courseContentClassName,
  courseVisualClassName,
  optixFlowConfig,
  background = "white",
  spacing = "md",
  pattern,
  patternOpacity,
}: ResourceListCourseCardsProps) {
  const renderCourses = () => {
    if (coursesSlot) return coursesSlot;
    if (!courses || courses.length === 0) return null;

    return (
      <div className={cn("flex flex-col gap-8", coursesClassName)}>
        {courses.map((course, idx) => (
          <div
            key={idx}
            className={cn(
              "relative flex flex-col gap-8 border-t border-border py-16 md:p-8",
              courseCardClassName,
              course.className
            )}
          >
            <div className="container grid grid-cols-1 gap-10 md:grid-cols-2">
              <div className={cn("flex flex-col gap-4", courseContentClassName)}>
                {course.badge && (
                  <div>
                    <Badge variant="secondary" className="rounded-none uppercase">
                      {course.badge}
                    </Badge>
                  </div>
                )}

                {typeof course.title === "string" ? (
                  <h3 className="text-2xl font-bold">{course.title}</h3>
                ) : (
                  <div className="text-2xl font-bold">{course.title}</div>
                )}

                <div className="space-y-2 text-sm text-foreground/90">
                  <div className="flex items-center gap-2">
                    <DynamicIcon name="lucide/users" size={16} />
                    <span>
                      {course.audience.map((item, i) => (
                        <span key={i}>
                          {i > 0 && ", "}
                          {item}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DynamicIcon name="lucide/book-open" size={16} />
                    <span>{course.lessons} {course.lessonsLabel ?? "Lessons"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DynamicIcon name="lucide/play" size={16} />
                    <span>
                      {course.videos} {course.videosLabel ?? "Videos"}, {course.duration}
                    </span>
                  </div>
                </div>

                {typeof course.description === "string" ? (
                  <p className="text-lg leading-relaxed">{course.description}</p>
                ) : (
                  <div className="text-lg leading-relaxed">{course.description}</div>
                )}

                <div>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 border xl:size-12">
                      <AvatarImage src={course.author.avatar} />
                      <AvatarFallback>
                        {typeof course.author.name === "string" ? course.author.name : ""}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      {typeof course.author.name === "string" ? (
                        <p className="font-medium">{course.author.name}</p>
                      ) : (
                        <div className="font-medium">{course.author.name}</div>
                      )}
                      {typeof course.author.title === "string" ? (
                        <p className="text-sm text-muted-foreground">
                          {course.author.title}
                        </p>
                      ) : (
                        <div className="text-sm text-muted-foreground">
                          {course.author.title}
                        </div>
                      )}
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

              <div className={courseVisualClassName}>
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
                        alt={typeof course.title === "string" ? course.title : "Course"}
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
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      {renderCourses()}
    </Section>
  );
}
