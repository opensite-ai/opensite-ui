"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig } from "../../../src/types";

export interface HeroArchitectureFullscreenProps {
  /**
   * Tagline/label above heading
   */
  tagline?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text
   */
  description?: React.ReactNode;
  /**
   * CTA action configuration
   */
  action?: ActionConfig;
  /**
   * Custom slot for rendering action (overrides action)
   */
  actionSlot?: React.ReactNode;
  /**
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the tagline
   */
  taglineClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
}

export function HeroArchitectureFullscreen({
  tagline,
  heading,
  description,
  action,
  actionSlot,
  backgroundImage = imagePlaceholders[97],
  className,
  containerClassName,
  taglineClassName,
  headingClassName,
  descriptionClassName,
}: HeroArchitectureFullscreenProps): React.JSX.Element {
  const renderAction = () => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
    return (
      <Pressable
        asButton
        className={actionClassName}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon}
            {typeof label === "string" ? <p className="group-hover:underline">{label}</p> : label}
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  };

  return (
    <section
      className={cn(
        "dark relative h-svh max-h-[1400px] w-full overflow-hidden bg-cover bg-center bg-no-repeat py-12 font-poppins after:absolute after:top-0 after:left-0 after:block after:h-full after:w-full after:bg-black/65 after:content-[''] md:py-20",
        className
      )}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className={cn("relative z-20 container h-full w-full max-w-340", containerClassName)}>
        <div className="flex h-full w-full flex-col justify-end gap-12">
          <div className="flex max-w-245.5 flex-col gap-1">
            {tagline && (
              typeof tagline === "string" ? (
                <p className={cn("text-sm leading-none text-muted-foreground uppercase", taglineClassName)}>
                  {tagline}
                </p>
              ) : (
                <div className={taglineClassName}>{tagline}</div>
              )
            )}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("text-3xl leading-snug! text-foreground md:text-4xl lg:text-6xl", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <div className={headingClassName}>{heading}</div>
              )
            )}
          </div>
          <div className="flex w-full flex-col justify-between gap-5 sm:flex-row sm:items-center">
            {description && (
              typeof description === "string" ? (
                <p className={cn("max-w-81 border-l border-muted-foreground pl-6 text-base text-muted-foreground", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            <div className="shrink-0">
              {renderAction()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
