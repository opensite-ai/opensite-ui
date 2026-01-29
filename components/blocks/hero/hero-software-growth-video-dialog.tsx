"use client";

import * as React from "react";
import { useMemo } from "react";
import { Fragment, useState } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { AspectRatio } from "../../ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import type {ActionConfig, ImageItem, OptixFlowConfig, SectionBackground, SectionSpacing} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

export interface VideoDialogConfig {
  /**
   * Dialog title
   */
  title?: string;
  /**
   * Video embed URL
   */
  videoUrl?: string;
}

export interface HeroSoftwareGrowthVideoDialogProps {
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
   * Array of showcase images (expects 4 images)
   */
  showcaseImages?: ImageItem[];
  /**
   * Custom slot for showcase images (overrides showcaseImages array)
   */
  showcaseImagesSlot?: React.ReactNode;
  /**
   * Video dialog configuration
   */
  videoDialog?: VideoDialogConfig;
  /**
   * Callback when video button is clicked
   */
  onVideoClick?: () => void;  /**
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
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the showcase area
   */
  showcaseClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroSoftwareGrowthVideoDialog({
  heading,
  description,
  actions,
  actionsSlot,
  showcaseImages,
  showcaseImagesSlot,
  videoDialog,
  onVideoClick,
  background,
  spacing,
  pattern,
  patternOpacity,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  showcaseClassName,
  optixFlowConfig,
}: HeroSoftwareGrowthVideoDialogProps): React.JSX.Element {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleVideoClick = () => {
    if (onVideoClick) {
      onVideoClick();
    } else {
      setIsVideoOpen(true);
    }
  };

  const defaultActions: ActionConfig[] = [
    {
      label: "See How it Works",
      href: "#",
      onClick: handleVideoClick,
      variant: "default",
      className: "group flex h-fit w-fit items-center gap-2 overflow-hidden rounded-full px-5 py-2 text-base",
      iconAfter: <DynamicIcon name="lucide/play" size={16} />,
    },
    {
      label: "Get Started Now",
      href: "#",
      variant: "outline",
      className: "group block h-fit w-fit overflow-hidden rounded-full px-5 py-2 text-center text-base ",
    },
  ];

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;

    const actionsToRender = actions || defaultActions;

    return (
      <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
        {actionsToRender.map((action, index) => {
          const { label, icon, iconAfter, children, className: actionClassName, onClick, ...pressableProps } = action;
          const isVideoButton = index === 0 && !actions;
          return (
            <Pressable
              key={index}
              asButton
              className={actionClassName}
              onClick={isVideoButton ? handleVideoClick : onClick}
              {...pressableProps}
            >
              {children ?? (
                <span className="block overflow-hidden">
                  <span
                    data-text={label}
                    className="relative block text-nowrap transition-all group-hover:-translate-y-[110%] after:absolute after:top-[110%] after:left-0 after:h-full after:w-full after:content-[attr(data-text)]"
                  >
                    {icon}
                    {label}
                    {iconAfter}
                  </span>
                </span>
              )}
            </Pressable>
          );
        })}
      </div>
    );
  }, [actionsSlot, actions, defaultActions, handleVideoClick]);

  const renderShowcaseImages = useMemo(() => {
    if (showcaseImagesSlot) return showcaseImagesSlot;
    if (!showcaseImages || showcaseImages.length < 4) return null;

    const imageConfigs = [
      { index: 0, className: "absolute -top-[28%] left-[18%] w-[28.47%] max-w-102.5", ratio: 1.11372549 / 1 },
      { index: 1, className: "absolute -top-[28%] left-[51%] w-[18.75%] max-w-67.5", ratio: 0.845559846 / 1 },
      { index: 2, className: "absolute -bottom-[14%] left-[51%] w-[38.19%] max-w-137.5", ratio: 1.686153846 / 1 },
      { index: 3, className: "absolute -bottom-[30%] left-[10.7%] w-[38.19%] max-w-137.5", ratio: 1.415041783 / 1 },
    ];

    return (
      <div className={cn("w-full py-[16%]", showcaseClassName)}>
        <div className="border-muted2 relative aspect-[2.716981132/1] w-full border">
          {imageConfigs.map(({ index, className: posClassName, ratio }) => (
            <div key={index} className={posClassName}>
              <AspectRatio ratio={ratio}>
                <Img
                  src={showcaseImages[index].src}
                  alt={showcaseImages[index].alt}
                  className={cn("size-full object-cover object-center", showcaseImages[index].className)}
                  optixFlowConfig={optixFlowConfig}
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>
    );
  }, [showcaseImagesSlot, showcaseImages, showcaseClassName, optixFlowConfig]);

  return (
    <Fragment>
      <Section
        className={cn("font-dm_sans bg-background py-12 md:py-24", className)}
      >
        <div className={cn("container max-w-[1440px]", containerClassName)}>
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center gap-8">
              {heading && (
                typeof heading === "string" ? (
                  <h1 className={cn("max-w-[1000px] text-center text-[3.125rem] leading-none md:text-[4.25rem] lg:text-[5.5rem]", headingClassName)}>
                    {heading}
                  </h1>
                ) : (
                  <h1 className={cn("max-w-[1000px] text-center text-[3.125rem] leading-none md:text-[4.25rem] lg:text-[5.5rem]", headingClassName)}>
                    {heading}
                  </h1>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("max-w-212.5 text-center text-lg leading-snug text-muted-foreground md:text-xl", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                )
              )}
              {renderActions}
            </div>
            {renderShowcaseImages}
          </div>
        </div>
      </Section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{videoDialog?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src={videoDialog?.videoUrl}
              title={videoDialog?.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
