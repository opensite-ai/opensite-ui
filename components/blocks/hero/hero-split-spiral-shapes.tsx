"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig } from "../../../src/types";

export interface HeroSplitSpiralShapesProps {
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
   * Custom slot for spiral shapes (overrides default shapes)
   */
  shapesSlot?: React.ReactNode;
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

export function HeroSplitSpiralShapes({
  badgeText = "New Release",
  heading = "Welcome to Our Website",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  actions,
  actionsSlot,
  shapesSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
}: HeroSplitSpiralShapesProps): React.JSX.Element {
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
      <div className="relative aspect-3/4">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 800 800"
            className="h-full w-full text-muted-foreground opacity-20"
          >
            {Array.from(Array(720).keys()).map((dot, index, array) => {
              const angle = 0.2 * index;
              const scalar = 40 + index * (360 / array.length);
              const x = Math.round(Math.cos(angle) * scalar);
              const y = Math.round(Math.sin(angle) * scalar);

              return (
                <circle
                  key={index}
                  r={(3 * index) / array.length}
                  cx={400 + x}
                  cy={400 + y}
                  opacity={1 - Math.sin(angle)}
                />
              );
            })}
          </svg>
        </div>
        <div className="absolute top-[10%] left-[8%] flex aspect-5/6 w-[38%] justify-center rounded-lg border border-border bg-accent"></div>
        <div className="absolute top-[20%] right-[12%] flex aspect-square w-[20%] justify-center rounded-lg border border-border bg-accent"></div>
        <div className="absolute right-[24%] bottom-[24%] flex aspect-5/6 w-[38%] justify-center rounded-lg border border-border bg-accent"></div>
      </div>
    );
  };

  return (
    <section className={cn("", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className={cn("flex flex-col items-center py-32 text-center lg:mx-auto lg:items-start lg:px-0 lg:text-left", contentClassName)}>
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
    </section>
  );
}
