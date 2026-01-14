"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig } from "../../../src/types";

export interface HeroSpiralPatternCardsProps {
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
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
}

export function HeroSpiralPatternCards({
  badgeText,
  heading,
  description,
  actions,
  actionsSlot,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
}: HeroSpiralPatternCardsProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
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

  return (
    <section className={cn("overflow-hidden py-32", className)}>
      <div className={cn("container flex flex-col items-center text-center", containerClassName)}>
        {badgeText && (
          typeof badgeText === "string" ? (
            <p className="text-xs uppercase">{badgeText}</p>
          ) : (
            badgeText
          )
        )}
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("my-3 text-2xl font-bold text-pretty sm:text-4xl md:my-6 lg:text-5xl", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <h1 className={cn("my-3 text-2xl font-bold text-pretty sm:text-4xl md:my-6 lg:text-5xl", headingClassName)}>
              {heading}
            </h1>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("mb-6 max-w-xl text-muted-foreground md:mb-12 lg:text-xl", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        {renderActions()}
      </div>
      <div className="mt-16 flex flex-col items-center justify-center lg:mt-32">
        <div className="b relative mx-auto aspect-square w-[95%] max-w-125 sm:w-full">
          <div className="absolute inset-x-1/2 top-full z-0 flex w-480 -translate-x-1/2 -translate-y-16 md:-translate-y-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 800 800"
              className="h-full w-full text-muted-foreground opacity-20"
            >
              {Array.from(Array(4000).keys()).map((dot, index, array) => {
                const angle = 0.2 * index;
                const scalar = 300 + index * (100 / array.length);
                const x = Math.round(Math.cos(angle) * scalar);
                const y = Math.round(Math.sin(angle) * scalar);
                return (
                  <circle
                    key={index}
                    r={1}
                    cx={400 + x}
                    cy={400 + y}
                    fill="currentColor"
                    opacity={(array.length - index) / array.length}
                  />
                );
              })}
            </svg>
          </div>
          <div className="absolute inset-0 z-5 m-auto flex aspect-29/36 w-4/5 max-w-[16rem] translate-x-[-75%] translate-y-[10%] scale-[0.85] rotate-[-15deg] justify-center rounded-lg border border-border bg-accent opacity-60 md:w-85 md:max-w-85"></div>
          <div className="absolute inset-0 z-10 m-auto flex aspect-29/36 w-4/5 max-w-[16rem] translate-x-[-40%] translate-y-[5%] scale-[0.9] rotate-[-7deg] justify-center rounded-lg border border-border bg-accent opacity-80 md:w-85 md:max-w-85"></div>
          <div className="absolute inset-0 z-20 m-auto flex aspect-29/36 w-4/5 max-w-[16rem] justify-center rounded-lg border border-border bg-accent md:w-85 md:max-w-85"></div>
        </div>
      </div>
    </section>
  );
}
