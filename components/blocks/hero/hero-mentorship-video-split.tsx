"use client";

import * as React from "react";
import { useMemo, useEffect } from "react";
import { Fragment, useState } from "react";
import { Video } from "@page-speed/video";
import { loadSkinFromJsDelivr, resolveVideoClasses, getSkinStyleObject } from '@page-speed/skins';
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

export interface HeroMentorshipVideoSplitProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Action configuration for CTA button
   */
  action?: ActionConfig;
  /**
   * Custom slot for action (overrides action prop)
   */
  actionSlot?: React.ReactNode;
  /**
   * Video section label text
   */
  videoLabel?: React.ReactNode;
  /**
   * Video configuration for modal/dialog
   */
  modalVideo?: MediaItem;
  /**
   * Video dialog title
   */
  videoTitle?: string;
  /**
   * @deprecated Use modalVideo instead
   */
  videoThumbnail?: ImageItem;
  /**
   * @deprecated Use modalVideo instead
   */
  videoUrl?: string;
  /**
   * Custom slot for video section (overrides video props)
   */
  videoSlot?: React.ReactNode;
  /**
   * Main feature image
   */
  image?: ImageItem;
  /**
   * Custom slot for image (overrides image prop)
   */
  imageSlot?: React.ReactNode; /**
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
}

export function HeroMentorshipVideoSplit({
  videoAspectRatio = "horizontal",
  heading,
  description,
  action,
  actionSlot,
  videoLabel,
  modalVideo,
  videoThumbnail,
  videoUrl,
  videoTitle,
  videoSlot,
  image,
  imageSlot,
  background,
  spacing = "py-32 md:py-32",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  contentClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
}: HeroMentorshipVideoSplitProps): React.JSX.Element {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [skinClasses, setSkinClasses] = useState<any>(null);
  const [skinStyle, setSkinStyle] = useState<any>(null);

  useEffect(() => {
    loadSkinFromJsDelivr('0.1.2', 'skins/video/base.json').then(skin => {
      setSkinClasses(resolveVideoClasses(skin));
      setSkinStyle(getSkinStyleObject(skin));
    });
  }, []);

  const renderAction = useMemo(() => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionClassName,
      ...pressableProps
    } = action;
    return (
      <div className="flex">
        <Pressable asButton className={actionClassName} {...pressableProps}>
          {children ?? (
            <>
              {icon}
              {label}
              {iconAfter}
            </>
          )}
        </Pressable>
      </div>
    );
  }, [actionSlot, action]);

  const renderVideoSection = useMemo(() => {
    if (videoSlot) return videoSlot;
    const thumbnail = modalVideo?.image || videoThumbnail;
    if (!thumbnail) return null;

    const aspectRatio = videoAspectRatio === "vertical" ? 9 / 16 : 16 / 9;

    return (
      <div className="flex flex-col gap-4">
        {videoLabel &&
          (typeof videoLabel === "string" ? (
            <p className="text-xs font-semibold uppercase opacity-75">
              {videoLabel}
            </p>
          ) : (
            videoLabel
          ))}
        <Pressable
          onClick={() => setIsVideoOpen(true)}
          asButton
          variant="ghost"
          className={cn(
            "group relative flex overflow-hidden rounded-lg p-0",
            videoAspectRatio === "vertical" ? "h-36 w-20" : "h-20 w-36",
          )}
        >
          <AspectRatio ratio={aspectRatio} className="flex h-full w-full">
            <Img
              src={thumbnail.src}
              alt={thumbnail.alt}
              className={cn(
                "absolute inset-0 h-full w-full object-cover",
                thumbnail.className,
              )}
              optixFlowConfig={optixFlowConfig}
            />
            <div className="m-auto aspect-square z-10 bg-card text-card-foreground p-2 rounded-xl shadow-xl">
              <DynamicIcon
                name="lucide/play"
                size={24}
                className="transition-transform group-hover:scale-125"
              />
            </div>
          </AspectRatio>
        </Pressable>
      </div>
    );
  }, [
    videoSlot,
    modalVideo,
    videoThumbnail,
    videoLabel,
    videoAspectRatio,
    optixFlowConfig,
    setIsVideoOpen,
  ]);

  const renderImage = useMemo(() => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <div>
        <Img
          src={image.src}
          alt={image.alt}
          className={cn(
            "aspect-4/5 h-full max-h-250 w-full rounded-xl object-cover object-center",
            imageClassName,
            image.className,
          )}
          optixFlowConfig={optixFlowConfig}
        />
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
        className={cn("relative flex items-center justify-center", className)}
        containerClassName={containerClassName}
      >
        <div className="relative">
          <div className="flex w-full flex-col-reverse md:flex-row gap-6 md:gap-20">
            <div>
              <div
                className={cn(
                  "flex h-full flex-col justify-between gap-8",
                  contentClassName,
                )}
              >
                <div className="flex max-w-165 flex-col gap-9">
                  {heading &&
                    (typeof heading === "string" ? (
                      <h1
                        className={cn(
                          "text-4xl font-semibold lg:text-8xl text-balance text-shadow-lg",
                          headingClassName,
                        )}
                      >
                        {heading}
                      </h1>
                    ) : (
                      <h1
                        className={cn(
                          "text-4xl font-semibold lg:text-8xl text-balance text-shadow-lg",
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
                          "text-lg font-medium md:text-xl",
                          descriptionClassName,
                        )}
                      >
                        {description}
                      </p>
                    ) : (
                      <div className={descriptionClassName}>{description}</div>
                    ))}
                  {renderAction}
                </div>
                {renderVideoSection}
              </div>
            </div>
            {renderImage}
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
            <DialogTitle>{videoTitle}</DialogTitle>
          </DialogHeader>
          <div
            className={
              videoAspectRatio === "vertical" ? "aspect-9/16" : "aspect-video"
            }
          >
            <Video
              src={modalVideo?.video?.src || videoUrl}
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
