"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

export interface AboutMissionDualImageProps {
  /**
   * Mission section title
   */
  missionTitle?: React.ReactNode;
  /**
   * Mission section content
   */
  missionContent?: React.ReactNode;
  /**
   * Vision section title
   */
  visionTitle?: React.ReactNode;
  /**
   * Vision section content
   */
  visionContent?: React.ReactNode;
  /**
   * Primary image configuration
   */
  primaryImage?: {
    src: string;
    alt: string;
  };
  /**
   * Secondary image configuration
   */
  secondaryImage?: {
    src: string;
    alt: string;
  };
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
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the mission title
   */
  missionTitleClassName?: string;
  /**
   * Additional CSS classes for the mission content
   */
  missionContentClassName?: string;
  /**
   * Additional CSS classes for the vision title
   */
  visionTitleClassName?: string;
  /**
   * Additional CSS classes for the vision content
   */
  visionContentClassName?: string;
  /**
   * Additional CSS classes for the primary image
   */
  primaryImageClassName?: string;
  /**
   * Additional CSS classes for the secondary image
   */
  secondaryImageClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultActions: ActionConfig[] = [
  {
    label: "Join Our Journey",
    href: "#",
    size: "lg",
    variant: "default",
    iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />,
  },
];

export function AboutMissionDualImage({
  missionTitle = "Our Mission",
  missionContent = "To democratize software development by providing intuitive tools that empower anyone to build professional applications. We believe that the ability to create software should not be limited to those with technical expertise.",
  visionTitle = "Our Vision",
  visionContent = "A world where every idea can become reality. We envision a future where the barrier between imagination and implementation is eliminated, enabling unprecedented innovation and creativity.",
  primaryImage,
  secondaryImage,
  actions = defaultActions,
  actionsSlot,
  className,
  containerClassName,
  contentClassName,
  missionTitleClassName,
  missionContentClassName,
  visionTitleClassName,
  visionContentClassName,
  primaryImageClassName,
  secondaryImageClassName,
  actionsClassName,
  optixFlowConfig,
}: AboutMissionDualImageProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={cn("w-fit", actionClassName)}
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
        <div className={cn("grid gap-16 lg:grid-cols-2", contentClassName)}>
          <div className="flex flex-col justify-center">
            <div className="mb-12">
              {missionTitle && (
                typeof missionTitle === "string" ? (
                  <h2 className={cn("text-3xl font-bold tracking-tight md:text-4xl", missionTitleClassName)}>
                    {missionTitle}
                  </h2>
                ) : (
                  <div className={missionTitleClassName}>{missionTitle}</div>
                )
              )}
              {missionContent && (
                typeof missionContent === "string" ? (
                  <p className={cn("mt-4 text-lg text-muted-foreground", missionContentClassName)}>
                    {missionContent}
                  </p>
                ) : (
                  <div className={cn("mt-4", missionContentClassName)}>{missionContent}</div>
                )
              )}
            </div>
            <div>
              {visionTitle && (
                typeof visionTitle === "string" ? (
                  <h2 className={cn("text-3xl font-bold tracking-tight md:text-4xl", visionTitleClassName)}>
                    {visionTitle}
                  </h2>
                ) : (
                  <div className={visionTitleClassName}>{visionTitle}</div>
                )
              )}
              {visionContent && (
                typeof visionContent === "string" ? (
                  <p className={cn("mt-4 text-lg text-muted-foreground", visionContentClassName)}>
                    {visionContent}
                  </p>
                ) : (
                  <div className={cn("mt-4", visionContentClassName)}>{visionContent}</div>
                )
              )}
            </div>
            {(actionsSlot || (actions && actions.length > 0)) && (
              <div className={cn("mt-8 flex flex-wrap gap-4", actionsClassName)}>
                {renderActions()}
              </div>
            )}
          </div>

          <div className="relative grid grid-cols-2 gap-4">
            {primaryImage && (
              <Img
                src={primaryImage.src}
                alt={primaryImage.alt}
                className={cn("h-full rounded-2xl object-cover", primaryImageClassName)}
                optixFlowConfig={optixFlowConfig}
              />
            )}
            {secondaryImage && (
              <Img
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                className={cn("mt-12 h-full rounded-2xl object-cover", secondaryImageClassName)}
                optixFlowConfig={optixFlowConfig}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
