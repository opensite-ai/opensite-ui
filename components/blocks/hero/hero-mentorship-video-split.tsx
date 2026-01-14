"use client";

import * as React from "react";
import { Fragment, useState } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { AspectRatio } from "../../ui/aspect-ratio";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import type { ActionConfig, ImageItem, OptixFlowConfig } from "../../../src/types";

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
   * Video thumbnail image
   */
  videoThumbnail?: ImageItem;
  /**
   * Video embed URL
   */
  videoUrl?: string;
  /**
   * Video dialog title
   */
  videoTitle?: string;
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
  imageSlot?: React.ReactNode;
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
}

export function HeroMentorshipVideoSplit({
  heading = "Career Growth with Expert Mentorship",
  description = "Receive tailored mentorship aligned with your goals. Let experienced mentors guide you to success with personalized insights and dedicated support.",
  action,
  actionSlot,
  videoLabel = "Watch our introduction to discover our services",
  videoThumbnail,
  videoUrl = "https://www.youtube.com/embed/your-video-id",
  videoTitle = "Presentation Video",
  videoSlot,
  image,
  imageSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
}: HeroMentorshipVideoSplitProps): React.JSX.Element {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const renderAction = () => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
    return (
      <Pressable asButton className={actionClassName} {...pressableProps}>
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

  const renderVideoSection = () => {
    if (videoSlot) return videoSlot;
    if (!videoThumbnail) return null;

    return (
      <div className="flex max-w-97.5 flex-col gap-6">
        {videoLabel && (
          typeof videoLabel === "string" ? (
            <p className="text-xl text-primary">{videoLabel}</p>
          ) : (
            videoLabel
          )
        )}
        <Pressable
          href="#"
          onClick={() => setIsVideoOpen(true)}
          asButton
          variant="ghost"
          className="group relative flex aspect-video h-full w-full max-w-97.5 overflow-hidden rounded-lg bg-accent p-0 transition-all hover:bg-accent"
        >
          <AspectRatio ratio={16 / 9} className="flex h-full w-full">
            <Img
              src={videoThumbnail.src}
              alt={videoThumbnail.alt}
              className={cn("absolute inset-0 h-full w-full object-cover", videoThumbnail.className)}
              optixFlowConfig={optixFlowConfig}
            />
            <div className="m-auto aspect-square z-10">
              <DynamicIcon
                name="lucide/play"
                size={40}
                className="fill-white stroke-white transition-transform group-hover:scale-125"
              />
            </div>
          </AspectRatio>
        </Pressable>
      </div>
    );
  };

  const renderImage = () => {
    if (imageSlot) return imageSlot;
    if (!image) return null;

    return (
      <div>
        <Img
          src={image.src}
          alt={image.alt}
          className={cn("aspect-4/5 h-full max-h-250 w-full rounded-xl object-cover object-center", imageClassName, image.className)}
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    );
  };

  return (
    <Fragment>
      <section className={cn("font-onest py-12 md:py-28", className)}>
        <div className={cn("container", containerClassName)}>
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <div className={cn("flex h-full flex-col justify-between gap-12", contentClassName)}>
                <div className="flex max-w-165 flex-col gap-9">
                  {heading && (
                    typeof heading === "string" ? (
                      <h1 className={cn("text-[2.5rem] leading-none text-primary sm:text-[3.4375rem] md:text-[4rem]", headingClassName)}>
                        {heading}
                      </h1>
                    ) : (
                      <h1 className={cn("text-[2.5rem] leading-none text-primary sm:text-[3.4375rem] md:text-[4rem]", headingClassName)}>
                        {heading}
                      </h1>
                    )
                  )}
                  {description && (
                    typeof description === "string" ? (
                      <p className={cn("text-lg font-medium text-primary md:text-xl", descriptionClassName)}>
                        {description}
                      </p>
                    ) : (
                      <div className={descriptionClassName}>{description}</div>
                    )
                  )}
                  {renderAction()}
                </div>
                {renderVideoSection()}
              </div>
            </div>
            {renderImage()}
          </div>
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-200">
          <DialogHeader>
            <DialogTitle>{videoTitle}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src={videoUrl}
              title={videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
