"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig } from "../../../src/types";

export interface AboutMissionPrincipleItem {
  /**
   * Principle number (e.g., "01", "02")
   */
  number?: React.ReactNode;
  /**
   * Principle title
   */
  title?: React.ReactNode;
  /**
   * Principle description
   */
  description?: React.ReactNode;
}

export interface AboutMissionPrinciplesProps {
  /**
   * Badge/label text
   */
  badgeText?: React.ReactNode;
  /**
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Main mission statement heading
   */
  missionHeading?: React.ReactNode;
  /**
   * Additional CSS classes for the mission heading
   */
  missionHeadingClassName?: string;
  /**
   * Mission description text
   */
  missionDescription?: React.ReactNode;
  /**
   * Additional CSS classes for the mission description
   */
  missionDescriptionClassName?: string;
  /**
   * Mission CTA action configuration
   */
  missionAction?: ActionConfig;
  /**
   * Custom slot for rendering mission CTA (overrides missionAction)
   */
  missionActionSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the mission action
   */
  missionActionClassName?: string;
  /**
   * Array of principle items
   */
  principles?: AboutMissionPrincipleItem[];
  /**
   * Custom slot for rendering principles (overrides principles array)
   */
  principlesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the principles container
   */
  principlesClassName?: string;
  /**
   * Vision section heading
   */
  visionHeading?: React.ReactNode;
  /**
   * Additional CSS classes for the vision heading
   */
  visionHeadingClassName?: string;
  /**
   * Vision section description
   */
  visionDescription?: React.ReactNode;
  /**
   * Additional CSS classes for the vision description
   */
  visionDescriptionClassName?: string;
  /**
   * Vision CTA action configuration
   */
  visionAction?: ActionConfig;
  /**
   * Custom slot for rendering vision CTA (overrides visionAction)
   */
  visionActionSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the vision section
   */
  visionClassName?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
}

/**
 * About Mission Principles - A comprehensive mission statement section with
 * numbered principle cards and a vision callout.
 *
 * Layout: Two-column grid with mission text on left, principle cards on right,
 * followed by a full-width vision banner.
 * Key features: Numbered principle cards, badge label, dual CTAs.
 * Best for: Company about pages, mission statements, values showcases.
 *
 * @example
 * ```tsx
 * <AboutMissionPrinciples
 *   badgeText="Our Mission"
 *   missionHeading="To empower people through technology"
 *   missionDescription="We believe technology should serve humanity."
 *   principles={[
 *     { number: "01", title: "Customer-Centric", description: "..." },
 *   ]}
 * />
 * ```
 */
export function AboutMissionPrinciples({
  badgeText,
  badgeClassName,
  missionHeading,
  missionHeadingClassName,
  missionDescription,
  missionDescriptionClassName,
  missionAction,
  missionActionSlot,
  missionActionClassName,
  principles,
  principlesSlot,
  principlesClassName,
  visionHeading,
  visionHeadingClassName,
  visionDescription,
  visionDescriptionClassName,
  visionAction,
  visionActionSlot,
  visionClassName,
  className,
  containerClassName,
}: AboutMissionPrinciplesProps): React.JSX.Element {
  const missionActionContent = useMemo(() => {
    if (missionActionSlot) return missionActionSlot;
    if (!missionAction) return null;

    return (
      <div className={cn("pt-2", missionActionClassName)}>
        <Pressable
          href={missionAction.href}
          onClick={missionAction.onClick}
          variant={missionAction.variant || "default"}
          asButton
          className="group inline-flex items-center"
        >
          {missionAction.label}
          <DynamicIcon
            name="lucide/arrow-right"
            size={16}
            className="ml-2 transition-transform group-hover:translate-x-1"
          />
        </Pressable>
      </div>
    );
  }, [missionActionSlot, missionAction, missionActionClassName]);

  const principlesContent = useMemo(() => {
    if (principlesSlot) return principlesSlot;
    if (!principles || principles.length === 0) return null;

    return (
      <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2", principlesClassName)}>
        {principles.map((principle, idx) => (
          <div
            key={idx}
            className="relative rounded-lg border p-6 transition-colors hover:bg-accent/50"
          >
            {principle.number && (
              <div className="absolute right-4 top-4 text-3xl font-bold text-primary/20">
                {principle.number}
              </div>
            )}
            <div className="space-y-3">
              {principle.title && (
                typeof principle.title === "string" ? (
                  <h3 className="text-xl font-bold">{principle.title}</h3>
                ) : (
                  principle.title
                )
              )}
              {principle.description && (
                typeof principle.description === "string" ? (
                  <p className="text-muted-foreground">{principle.description}</p>
                ) : (
                  principle.description
                )
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }, [principlesSlot, principles, principlesClassName]);

  const visionActionContent = useMemo(() => {
    if (visionActionSlot) return visionActionSlot;
    if (!visionAction) return null;

    return (
      <Pressable
        href={visionAction.href}
        onClick={visionAction.onClick}
        variant={visionAction.variant || "outline"}
        size={visionAction.size || "lg"}
        asButton
        className="group inline-flex items-center"
      >
        {visionAction.label}
        <DynamicIcon
          name="lucide/arrow-right"
          size={16}
          className="ml-2 transition-transform group-hover:translate-x-1"
        />
      </Pressable>
    );
  }, [visionActionSlot, visionAction]);

  return (
    <section className={cn("py-24", className)}>
      <div className={cn("container mx-auto px-4 md:px-6 2xl:max-w-[1400px]", containerClassName)}>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-8">
            {badgeText && (
              typeof badgeText === "string" ? (
                <div className={cn("inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary", badgeClassName)}>
                  {badgeText}
                </div>
              ) : (
                <div className={badgeClassName}>{badgeText}</div>
              )
            )}

            {missionHeading && (
              typeof missionHeading === "string" ? (
                <h2 className={cn("text-4xl font-bold leading-tight tracking-tight lg:text-5xl", missionHeadingClassName)}>
                  {missionHeading}
                </h2>
              ) : (
                <div className={missionHeadingClassName}>{missionHeading}</div>
              )
            )}

            {missionDescription && (
              typeof missionDescription === "string" ? (
                <p className={cn("text-xl text-muted-foreground", missionDescriptionClassName)}>{missionDescription}</p>
              ) : (
                <div className={missionDescriptionClassName}>{missionDescription}</div>
              )
            )}

            {missionActionContent}
          </div>

          {principlesContent}
        </div>

        <div className={cn("mt-24 rounded-lg bg-accent p-8 lg:p-12", visionClassName)}>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {visionHeading && (
                typeof visionHeading === "string" ? (
                  <h3 className={cn("mb-4 text-2xl font-bold", visionHeadingClassName)}>{visionHeading}</h3>
                ) : (
                  <div className={cn("mb-4", visionHeadingClassName)}>{visionHeading}</div>
                )
              )}
              {visionDescription && (
                typeof visionDescription === "string" ? (
                  <p className={cn("mb-4 text-muted-foreground", visionDescriptionClassName)}>{visionDescription}</p>
                ) : (
                  <div className={cn("mb-4", visionDescriptionClassName)}>{visionDescription}</div>
                )
              )}
            </div>
            <div className="flex justify-center lg:col-span-1 lg:justify-end">
              {visionActionContent}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
