"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig } from "../../../src/types";

export interface HeroGridPatternEfficiencyProps {
  /**
   * Main heading content (can include highlighted text)
   */
  heading?: React.ReactNode;
  /**
   * Highlighted word in heading (rendered with background)
   */
  highlightedWord?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Action configuration for CTA button
   */
  action?: ActionConfig;
  /**
   * Custom slot for action (overrides action prop)
   */
  actionSlot?: React.ReactNode;
  /**
   * Subtext below the action button
   */
  actionSubtext?: React.ReactNode;
  /**
   * Whether to show the grid pattern background
   */
  showGridPattern?: boolean;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the action container
   */
  actionClassName?: string;
}

export function HeroGridPatternEfficiency({
  heading,
  highlightedWord = "efficiency.",
  description = "A powerful tool to streamline workflows, manage tasks, and deliver results efficiently.",
  action,
  actionSlot,
  actionSubtext = "No credit card required.",
  showGridPattern = true,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionClassName,
}: HeroGridPatternEfficiencyProps): React.JSX.Element {
  const renderAction = () => {
    if (actionSlot) return actionSlot;

    const { label, icon, iconAfter, children, className: btnClassName, ...pressableProps } = action;
    return (
      <Pressable asButton className={btnClassName} {...pressableProps}>
        {children ?? (
          <>
            {icon}
            {label}
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  };

  const renderHeading = () => {
    if (heading) {
      return typeof heading === "string" ? (
        <h1 className={cn("text-5xl leading-tight font-extrabold lg:text-8xl lg:leading-snug", headingClassName)}>
          {heading}
        </h1>
      ) : (
        <h1 className={cn("text-5xl leading-tight font-extrabold lg:text-8xl lg:leading-snug", headingClassName)}>
          {heading}
        </h1>
      );
    }

    return (
      <h1 className={cn("text-5xl leading-tight font-extrabold lg:text-8xl lg:leading-snug", headingClassName)}>
        Less complexity. <span className="mr-6">More</span>
        <span className="relative inline-block before:absolute before:top-0 before:-right-2 before:-bottom-2 before:-left-4 before:-z-10 before:rounded-lg before:bg-muted-foreground/15">
          {highlightedWord}
        </span>
      </h1>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("relative max-w-5xl", contentClassName)}>
          {showGridPattern && (
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted))_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_100%_at_50%_50%,#000_60%,transparent_100%)] bg-size-[64px_64px]"></div>
          )}
          {renderHeading()}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mt-7 text-xl font-light lg:text-3xl", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          <div className={cn("mt-12 flex w-fit flex-col gap-2.5 text-center", actionClassName)}>
            {renderAction()}
            {actionSubtext && (
              typeof actionSubtext === "string" ? (
                <p className="text-sm text-muted-foreground">{actionSubtext}</p>
              ) : (
                actionSubtext
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
