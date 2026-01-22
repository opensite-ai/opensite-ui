"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type {ActionConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface HeroSplitGeometricShapesProps {
  /**
   * Badge/label text above heading
   */
  badgeText?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Custom slot for geometric shapes (overrides default shapes)
   */
  shapesSlot?: React.ReactNode;  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;

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
}

export function HeroSplitGeometricShapes({
  badgeText,
  heading,
  description,
  actions,
  actionsSlot,
  shapesSlot,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
}: HeroSplitGeometricShapesProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
        {actions.map((action, index) => {
          const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
          return (
            <Pressable
              key={index}
              asButton
              className={actionClassName}
              {...pressableProps}
            >
              {children ?? (
                <>
                  {icon}
                  {label}
                  {iconAfter}
                </>
              )}
            </Pressable>
          );
        })}
      </div>
    );
  };

  const renderShapes = () => {
    if (shapesSlot) return shapesSlot;

    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative aspect-7/8 h-full w-full">
          <div className="absolute top-[12%] right-[50%] flex aspect-square w-[24%] justify-center rounded-lg border border-border bg-accent"></div>
          <div className="absolute top-[36%] right-[50%] flex aspect-5/6 w-[40%] justify-center rounded-lg border border-border bg-accent"></div>
          <div className="absolute bottom-[36%] left-[54%] flex aspect-5/6 w-[40%] justify-center rounded-lg border border-border bg-accent"></div>
          <div className="absolute bottom-[12%] left-[54%] flex aspect-square w-[24%] justify-center rounded-lg border border-border bg-accent"></div>
        </div>
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
      <div className={cn("container flex flex-col items-center", containerClassName)}>
        <div className="2xl:w-[calc(min(100vw-2*theme(container.padding),100%+8rem))] w-full overflow-clip rounded-lg bg-accent/50">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className={cn("container flex flex-col items-center px-16 py-16 text-center lg:mx-auto lg:items-start lg:px-16 lg:py-32 lg:text-left", contentClassName)}>
              {badgeText && (
                typeof badgeText === "string" ? (
                  <p>{badgeText}</p>
                ) : (
                  badgeText
                )
              )}
              {heading && (
                typeof heading === "string" ? (
                  <h1 className={cn("my-6 text-4xl font-bold text-pretty lg:text-6xl", headingClassName)}>
                    {heading}
                  </h1>
                ) : (
                  <h1 className={cn("my-6 text-4xl font-bold text-pretty lg:text-6xl", headingClassName)}>
                    {heading}
                  </h1>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("mb-8 max-w-xl text-muted-foreground lg:text-xl", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                )
              )}
              {renderActions()}
            </div>
            {renderShapes()}
          </div>
        </div>
      </div>
    </Section>
  );
}
