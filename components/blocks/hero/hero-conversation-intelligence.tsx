"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getNestedCardBg, getNestedCardTextColor } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, ImageItem, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface HeroConversationIntelligenceProps {
  /**
   * Main heading content (first part)
   */
  headingPrimary?: React.ReactNode;
  /**
   * Highlighted heading content (second part with background)
   */
  headingHighlight?: React.ReactNode;
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
   * Main image configuration
   */
  image?: ImageItem;
  /**
   * Custom slot for image area (overrides image)
   */
  imageSlot?: React.ReactNode;
  /**
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
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the image container
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroConversationIntelligence({
  headingPrimary = "Conversation Intelligence",
  headingHighlight,
  description,
  actions,
  actionsSlot,
  image,
  imageSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageClassName,
  optixFlowConfig,
}: HeroConversationIntelligenceProps): React.JSX.Element {
  const renderActions = useMemo(() => {
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
  }, [actionsSlot, actions]);

  const renderImage = useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <div className={cn("mx-auto w-full max-w-325", imageClassName)}>
        <AspectRatio ratio={1.818181818 / 1}>
          <div className="relative flex size-full flex-col justify-between">
            <AspectRatio
              ratio={3.714285714 / 1}
              className="w-full rounded-xl bg-[linear-gradient(transparent,var(--color-muted))]"
            />
            <AspectRatio
              ratio={3.714285714 / 1}
              className="w-full rounded-xl bg-[linear-gradient(var(--color-muted),transparent)]"
            />
            <div className="border-muted2 absolute top-1/2 left-1/2 z-10 w-[87.69%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border">
              <AspectRatio ratio={1.594405594 / 1}>
                <Img
                  src={image.src}
                  alt={image.alt}
                  className={cn("object-centers size-full object-cover", image.className)}
                  optixFlowConfig={optixFlowConfig}
                />
              </AspectRatio>
            </div>
            <div className="absolute -top-[50%] left-1/2 z-0 w-[60%] -translate-x-1/2">
              <AspectRatio
                ratio={1}
                className="bg-[radial-gradient(closest-side,var(--color-accent),transparent)]"
              />
            </div>
          </div>
        </AspectRatio>
      </div>
    );
  }, [imageSlot, image, imageClassName, optixFlowConfig]);

  return (
    <Section
      className={cn("bg-background py-12 font-sans md:py-20", className)}
    >
      <div className={cn("container", containerClassName)}>
        <div className="flex flex-col gap-24">
          <div>
            <div className={cn("relative z-10 mx-auto flex max-w-220 flex-col gap-7", contentClassName)}>
              <h1 className={cn("text-center text-5xl leading-[1.294] font-semibold sm:text-[3.75rem] md:text-[4.25rem]", headingClassName)}>
                {headingPrimary}{" "}
                <span className={cn(
                  "relative text-nowrap",
                  `after:absolute after:top-1/2 after:left-0 after:z-[-1] after:block after:h-[65%] after:w-full after:-translate-y-1/3 after:content-['']`,
                  `after:${getNestedCardBg(background)}`
                )}>
                  {headingHighlight}
                </span>
              </h1>
              {description && (
                typeof description === "string" ? (
                  <p className={cn("text-center text-xl leading-normal text-muted-foreground", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                )
              )}
              {(actionsSlot || (actions && actions.length > 0)) && (
                <div className={cn("flex items-center justify-center gap-5", actionsClassName)}>
                  {renderActions}
                </div>
              )}
            </div>
          </div>
          <div>
            {renderImage}
          </div>
        </div>
      </div>
    </Section>
  );
}
