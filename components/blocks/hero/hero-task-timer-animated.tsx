"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { AspectRatio } from "../../ui/aspect-ratio";
import type {ActionConfig, ImageItem, OptixFlowConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface HeroTaskTimerAnimatedProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of showcase images (expects 2 images)
   */
  images?: ImageItem[];
  /**
   * Custom slot for images (overrides images array)
   */
  imagesSlot?: React.ReactNode;  /**
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
   * Additional CSS classes for the header area
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the images area
   */
  imagesClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroTaskTimerAnimated({
  heading,
  actions,
  actionsSlot,
  images,
  imagesSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  headerClassName,
  headingClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroTaskTimerAnimatedProps): React.JSX.Element {
  const defaultActions: ActionConfig[] = [
    {
      label: "Download for Mac",
      href: "#",
      variant: "default",
      className: "group h-fit rounded-xl p-4 text-xl font-semibold shadow-xl",
      icon: <DynamicIcon name="lucide/apple" size={20} className="mr-2" />,
    },
    {
      label: "Download for Windows",
      href: "#",
      variant: "link",
      className: "flex items-center gap-2 text-lg font-semibold text-foreground",
      iconAfter: <DynamicIcon name="lucide/arrow-right" size={20} />,
    },
  ];

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;

    const actionsToRender = actions || defaultActions;

    return (
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        {actionsToRender.map((action, index) => {
          const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
          const isPrimaryAction = index === 0 && !actions;
          
          if (isPrimaryAction) {
            return (
              <Pressable
                key={index}
                asButton
                className={actionClassName}
                {...pressableProps}
              >
                <div className="size-full overflow-hidden">
                  <div className="flex items-center transition-all group-hover:-translate-x-5">
                    {icon}
                    <span>{label}</span>
                    <DynamicIcon name="lucide/arrow-right" size={20} className="ml-2 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>
              </Pressable>
            );
          }

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
                  <span>{label}</span>
                  {iconAfter}
                </>
              )}
            </Pressable>
          );
        })}
      </div>
    );
  };

  const renderImages = () => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length < 2) return null;

    return (
      <div className={cn("flex flex-col gap-10 lg:flex-row", imagesClassName)}>
        <div className="flex flex-col gap-10 lg:w-[60%]">
          <div className="overflow-hidden rounded-lg">
            <AspectRatio ratio={1.916786227 / 1}>
              <Img
                src={images[0].src}
                alt={images[0].alt}
                className={cn("block size-full object-cover object-top-left", images[0].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:w-[40%]">
          <div className="overflow-hidden rounded-lg">
            <AspectRatio ratio={1.916786227 / 1}>
              <Img
                src={images[1].src}
                alt={images[1].alt}
                className={cn("block size-full object-cover object-top-left", images[1].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Section
      className={cn(
        "container flex flex-col gap-10 bg-background py-20 sm:gap-20",
        className,
      )}
    >
      <div className={cn("flex flex-col gap-10 lg:w-[80%] lg:self-center", headerClassName)}>
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("max-w-2xl text-6xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <h1 className={cn("max-w-2xl text-6xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl", headingClassName)}>
              {heading}
            </h1>
          )
        )}
        {renderActions()}
      </div>
      {renderImages()}
    </Section>
  );
}
