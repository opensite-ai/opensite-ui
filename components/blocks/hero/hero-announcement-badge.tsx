"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig } from "../../../src/types";

export interface HeroAnnouncementBadgeProps {
  /**
   * Badge/announcement content
   */
  badge?: React.ReactNode;
  /**
   * Badge icon
   */
  badgeIcon?: React.ReactNode;
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
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
}

export function HeroAnnouncementBadge({
  badge = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi eaque distinctio iusto voluptas voluptatum sed!",
  badgeIcon = <DynamicIcon name="lucide/bell" size={16} />,
  heading = "Streamline your workflow experience.",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum dolor assumenda voluptatem nemo magni a maiores aspernatur.",
  actions,
  actionsSlot,
  className,
  containerClassName,
  badgeClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
}: HeroAnnouncementBadgeProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
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
    });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        {badge && (
          <Badge
            variant="outline"
            className={cn("mb-4 max-w-full text-sm font-normal lg:mb-10 lg:py-2 lg:pr-5 lg:pl-2", badgeClassName)}
          >
            {badgeIcon && (
              <span className="mr-2 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent">
                {badgeIcon}
              </span>
            )}
            {typeof badge === "string" ? (
              <p className="truncate whitespace-nowrap">{badge}</p>
            ) : (
              badge
            )}
          </Badge>
        )}
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("mb-6 text-4xl leading-none font-bold tracking-tighter md:text-[7vw] lg:text-8xl", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("max-w-2xl text-muted-foreground md:text-[2vw] lg:text-xl", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        {(actionsSlot || (actions && actions.length > 0)) && (
          <div className={cn("mt-6 flex flex-col gap-4 sm:flex-row lg:mt-10", actionsClassName)}>
            {renderActions()}
          </div>
        )}
      </div>
    </section>
  );
}
