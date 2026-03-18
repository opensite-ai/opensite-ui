"use client";

import * as React from "react";
import { useMemo, useEffect } from "react";
import { Fragment, useState } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Video } from "@page-speed/video";
import { loadSkinFromJsDelivr, resolveVideoClasses, getSkinStyleObject } from '@page-speed/skins';
import { AspectRatio } from "../../ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import type {
  ActionConfig,
  ImageItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { ActionComponent } from "@/components/ui/block-actions";

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
   * Video action object
   */
  videoAction?: ActionConfig;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
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
  onVideoClick?: () => void;
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
  /**
   * Video aspect ratio
   */
  videoAspectRatio?: "horizontal" | "vertical";
}

export function HeroSoftwareGrowthVideoDialog({
  videoAspectRatio = "horizontal",
  heading,
  description,
  videoAction,
  actions,
  showcaseImages,
  showcaseImagesSlot,
  videoDialog,
  onVideoClick,
  background,
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headingClassName,
  descriptionClassName,
  showcaseClassName,
  optixFlowConfig,
}: HeroSoftwareGrowthVideoDialogProps): React.JSX.Element {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [skinClasses, setSkinClasses] = useState<any>(null);
  const [skinStyle, setSkinStyle] = useState<any>(null);

  useEffect(() => {
    loadSkinFromJsDelivr('0.1.2', 'skins/video/base.json').then(skin => {
      setSkinClasses(resolveVideoClasses(skin));
      setSkinStyle(getSkinStyleObject(skin));
    });
  }, []);

  const handleVideoClick = () => {
    if (onVideoClick) {
      onVideoClick();
    } else {
      setIsVideoOpen(true);
    }
  };

  const renderShowcaseImages = useMemo(() => {
    if (showcaseImagesSlot) return showcaseImagesSlot;
    if (!showcaseImages || showcaseImages.length < 4) return null;

    const imageConfigs = [
      {
        index: 0,
        className: "absolute -top-[28%] left-[18%] w-[28.47%] max-w-102.5",
        ratio: 1.11372549 / 1,
      },
      {
        index: 1,
        className: "absolute -top-[28%] left-[51%] w-[18.75%] max-w-67.5",
        ratio: 0.845559846 / 1,
      },
      {
        index: 2,
        className: "absolute -bottom-[14%] left-[51%] w-[38.19%] max-w-137.5",
        ratio: 1.686153846 / 1,
      },
      {
        index: 3,
        className: "absolute -bottom-[30%] left-[10.7%] w-[38.19%] max-w-137.5",
        ratio: 1.415041783 / 1,
      },
    ];

    return (
      <div className={cn("w-full py-[16%]", showcaseClassName)}>
        <div
          className={cn(
            "relative aspect-[2.716981132/1] w-full border border-dashed",
          )}
        >
          {imageConfigs.map(({ index, className: posClassName, ratio }) => (
            <div key={index} className={posClassName}>
              <AspectRatio ratio={ratio}>
                <Img
                  src={showcaseImages[index].src}
                  alt={showcaseImages[index].alt}
                  className={cn(
                    "size-full object-cover object-center rounded-xl shadow-xl",
                    showcaseImages[index].className,
                  )}
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
        background={background}
        spacing={spacing}
        pattern={pattern}
        patternOpacity={patternOpacity}
        className={className}
        containerClassName={containerClassName}
      >
        <div className="relative">
          <div className="flex flex-col gap-10 md:gap-6">
            <div className="flex flex-col items-center justify-center gap-8 pt-6 md:pt-0">
              {heading &&
                (typeof heading === "string" ? (
                  <h1
                    className={cn(
                      "max-w-[1000px] text-center text-[3.125rem] leading-none md:text-[4.25rem] lg:text-[5.5rem] text-balance font-semibold",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h1>
                ) : (
                  <h1
                    className={cn(
                      "max-w-[1000px] text-center text-[3.125rem] leading-none md:text-[4.25rem] lg:text-[5.5rem] text-balance font-semibold",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h1>
                ))}
              {description &&
                (typeof description === "string" ? (
                  <p
                    className={cn(
                      "max-w-212.5 text-center text-lg leading-snug md:text-xl text-balance",
                      descriptionClassName,
                    )}
                  >
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                ))}
              <div className="flex flex-col md:flex-row flex-wrap gap-4">
                {videoAction && videoDialog?.videoUrl ? (
                  <ActionComponent
                    action={{
                      ...videoAction,
                      onClick: handleVideoClick,
                    }}
                  />
                ) : null}
                {actions?.map((action, index) => (
                  <ActionComponent key={index} action={action} />
                ))}
              </div>
            </div>
            {renderShowcaseImages}
          </div>
        </div>
      </Section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent
          className={cn(
            videoAspectRatio === "vertical" ? "sm:max-w-100" : "sm:max-w-200",
          )}
        >
          <DialogHeader>
            <DialogTitle>{videoDialog?.title}</DialogTitle>
          </DialogHeader>
          <div
            className={
              videoAspectRatio === "vertical" ? "aspect-9/16" : "aspect-video"
            }
          >
            <Video
              src={videoDialog?.videoUrl}
              controls={true}
              autoPlay
              skinClasses={skinClasses || undefined}
              skinStyle={skinStyle || undefined}
              className="h-full w-full rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
