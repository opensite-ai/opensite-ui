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
  MediaItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import { ActionComponent, BlockActions } from "@/components/ui/block-actions";

/**
 * @deprecated Use modalVideo prop with MediaItem type instead
 */
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

export interface HeroVideoDialogGradientProps {
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
   * Video action object
   */
  videoAction?: ActionConfig;
  /**
   * Showcase image configuration
   */
  image?: ImageItem;
  /**
   * Custom slot for image (overrides image prop)
   */
  imageSlot?: React.ReactNode;
  /**
   * Video configuration for modal/dialog
   */
  modalVideo?: MediaItem;
  /**
   * Video dialog title
   */
  videoDialogTitle?: string;
  /**
   * @deprecated Use modalVideo instead
   */
  videoDialog?: VideoDialogConfig;
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
   * Additional CSS classes for the image
   */
  imageClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Video aspect ratio
   */
  videoAspectRatio?: "horizontal" | "vertical";
  /**
   * Callback when video button is clicked
   */
  onVideoClick?: () => void;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
}

export function HeroVideoDialogGradient({
  videoAspectRatio = "horizontal",
  heading,
  description,
  actions,
  videoAction,
  image,
  imageSlot,
  modalVideo,
  videoDialogTitle,
  videoDialog,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  onVideoClick,
  patternOpacity,
  actionsClassName,
  className,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
}: HeroVideoDialogGradientProps): React.JSX.Element {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [skinClasses, setSkinClasses] = useState<any>(null);
  const [skinStyle, setSkinStyle] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    loadSkinFromJsDelivr("0.1.2", "skins/video/base.json")
      .then((skin) => {
        if (!isMounted) return;

        setSkinClasses(resolveVideoClasses(skin));
        setSkinStyle(getSkinStyleObject(skin));
      })
      .catch(() => {
        if (!isMounted) return;

        setSkinClasses(null);
        setSkinStyle(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleVideoClick = () => {
    if (onVideoClick) {
      onVideoClick();
    } else {
      setIsVideoOpen(true);
    }
  };

  const renderImage = useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <div className="mx-auto mt-16 w-full max-w-[1000px] overflow-hidden rounded-xl shadow-[4px_2px_3.123rem_rgba(0,0,0,.15)]">
        <AspectRatio ratio={1.406469761 / 1}>
          <Img
            src={image.src}
            alt={image.alt}
            className={cn(
              "size-full object-cover object-center",
              imageClassName,
              image.className,
            )}
            optixFlowConfig={optixFlowConfig}
          />
        </AspectRatio>
      </div>
    );
  }, [imageSlot, image, imageClassName, optixFlowConfig]);

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
        <div className="relative z-20 pt-10 md:pt-">
          <div className="flex flex-col items-center gap-6 md:gap-8">
            <div className="flex flex-col items-center gap-6">
              {heading &&
                (typeof heading === "string" ? (
                  <h1
                    className={cn(
                      "max-w-[920px] text-center text-4xl leading-tight font-semibold md:text-6xl lg:text-7xl text-balance",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h1>
                ) : (
                  heading
                ))}
              {description &&
                (typeof description === "string" ? (
                  <p
                    className={cn(
                      "max-w-[750px] text-center text-base leading-relaxed font-normal md:text-xl text-balance",
                      descriptionClassName,
                    )}
                  >
                    {description}
                  </p>
                ) : (
                  description
                ))}
            </div>
            <div
              className={cn(
                "flex flex-col md:flex-row flex-wrap gap-4",
                actionsClassName,
              )}
            >
              {videoAction && (modalVideo || videoDialog?.videoUrl) ? (
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
          {renderImage}
        </div>
      </Section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent
          className={cn(
            videoAspectRatio === "vertical" ? "sm:max-w-100" : "sm:max-w-200",
          )}
        >
          <DialogHeader>
            <DialogTitle>{videoDialogTitle || videoDialog?.title}</DialogTitle>
          </DialogHeader>
          <div
            className={
              videoAspectRatio === "vertical" ? "aspect-9/16" : "aspect-video"
            }
          >
            <Video
              src={modalVideo?.video?.src || videoDialog?.videoUrl}
              masterPlaylistUrl={modalVideo?.video?.masterPlaylistUrl}
              fallbackSrc={modalVideo?.video?.fallbackSrc}
              poster={modalVideo?.video?.poster || modalVideo?.image?.src}
              controls={true}
              autoPlay
              skinClasses={skinClasses || undefined}
              skinStyle={skinStyle || undefined}
              className="h-full w-full rounded-lg"
              {...modalVideo?.video}
            />
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
