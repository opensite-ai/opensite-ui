"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { AspectRatio } from "../../ui/aspect-ratio";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

export interface HeroAdCampaignExpertProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Highlighted text within heading (underlined)
   */
  headingHighlight?: string;
  /**
   * Description text below heading
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
   * Hero image source URL
   */
  imageSrc?: string;
  /**
   * Hero image alt text
   */
  imageAlt?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content column
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
   * Additional CSS classes for the image container
   */
  imageContainerClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroAdCampaignExpert({
  heading,
  headingHighlight = "my expertise",
  description = "I'll maximize your ad campaigns' potential or teach you the strategies so you can manage them yourself!",
  action,
  actionSlot,
  imageSrc = imagePlaceholders[60],
  imageAlt = "",
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imageContainerClassName,
  imageClassName,
  optixFlowConfig,
}: HeroAdCampaignExpertProps): React.JSX.Element {
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
            {label}
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  };

  const defaultHeading = (
    <>
      Your ad campaigns excel with{" "}
      <span className="border-muted2 border-b-2">{headingHighlight}</span>,
      delivering optimized performance.
    </>
  );

  return (
    <section className={cn("pb-24", className)}>
      <div className={cn("bg-muted pt-16 lg:pt-24", containerClassName)}>
        <div className="container flex flex-col items-center lg:flex-row lg:items-start">
          <div className={cn("relative flex flex-col items-start gap-8 pb-20 lg:w-1/2", contentClassName)}>
            {(heading || headingHighlight) && (
              typeof heading === "string" ? (
                <h2 className={cn("text-3xl leading-tight font-bold tracking-tighter text-foreground lg:text-5xl", headingClassName)}>
                  {heading}
                </h2>
              ) : heading ? (
                <div className={headingClassName}>{heading}</div>
              ) : (
                <h2 className={cn("text-3xl leading-tight font-bold tracking-tighter text-foreground lg:text-5xl", headingClassName)}>
                  {defaultHeading}
                </h2>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-lg text-foreground", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            {renderAction()}
          </div>
          <div className={cn("relative flex w-full justify-center lg:w-1/2", imageContainerClassName)}>
            {imageSrc && (
              <div className="relative z-10 -mb-16 h-auto w-[80%] max-w-[355px] lg:w-[520px]">
                <AspectRatio ratio={355 / 520} className="border-muted2 border">
                  <Img
                    src={imageSrc}
                    alt={imageAlt}
                    className={cn("size-full object-cover", imageClassName)}
                    optixFlowConfig={optixFlowConfig}
                  />
                </AspectRatio>
              </div>
            )}
            <div className="absolute bottom-0 w-full overflow-hidden">
              <AspectRatio ratio={2} className="relative">
                <AspectRatio
                  ratio={1}
                  className="absolute w-full rounded-full bg-muted"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
