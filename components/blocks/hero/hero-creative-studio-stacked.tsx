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
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ImageItem,
  MediaItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { VideoDialogConfig } from "./hero-video-dialog-gradient";
import { ActionComponent } from "@/components/ui/block-actions";

export interface HeroCreativeStudioStackedProps {
  /**
   * Tagline text above heading
   */
  tagline?: React.ReactNode;
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
   * Array of stacked images (expects 3 images)
   */
  images?: ImageItem[];
  /**
   * Custom slot for images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
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
   * Additional CSS classes for the content column
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the tagline
   */
  taglineClassName?: string;
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
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * Video aspect ratio
   */
  videoAspectRatio?: "horizontal" | "vertical";
  /**
   * Callback when video button is clicked
   */
  onVideoClick?: () => void;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
}

export function HeroCreativeStudioStacked({
  videoAspectRatio = "horizontal",
  tagline,
  heading,
  description,
  videoAction,
  patternClassName,
  actions,
  onVideoClick,
  modalVideo,
  videoDialogTitle,
  videoDialog,
  images,
  imagesSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  taglineClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroCreativeStudioStackedProps): React.JSX.Element {
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

  const renderImages = useMemo(() => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;
    const sharedImgWrapperClassName = "overflow-hidden rounded-xl shadow-xl";

    return (
      <div
        className={cn(
          "relative mx-auto aspect-[0.789340102/1] max-w-100",
          imagesClassName,
        )}
      >
        {images[0] && (
          <div className="absolute bottom-0 left-0 z-30 w-[63%]">
            <AspectRatio
              ratio={0.724137931 / 1}
              className={sharedImgWrapperClassName}
            >
              <Img
                src={images[0].src}
                alt={images[0].alt}
                className={cn(
                  "size-full object-cover object-center",
                  images[0].className,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        )}

        {images[1] && (
          <div className="absolute top-1/2 left-1/2 z-20 w-[63%] -translate-x-1/2 -translate-y-1/2">
            <AspectRatio
              ratio={0.724137931 / 1}
              className={sharedImgWrapperClassName}
            >
              <Img
                src={images[1].src}
                alt={images[1].alt}
                className={cn(
                  "size-full object-cover object-center",
                  images[1].className,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        )}

        {images[2] && (
          <div className="absolute top-0 right-0 z-10 w-[63%]">
            <AspectRatio
              ratio={0.724137931 / 1}
              className={sharedImgWrapperClassName}
            >
              <Img
                src={images[2].src}
                alt={images[2].alt}
                className={cn(
                  "size-full object-cover object-center",
                  images[2].className,
                )}
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        )}
      </div>
    );
  }, [imagesSlot, images, imagesClassName, optixFlowConfig]);

  return (
    <Fragment>
      <Section
        background={background}
        spacing={spacing}
        pattern={pattern}
        patternOpacity={patternOpacity}
        patternClassName={patternClassName}
        className={className}
        containerClassName={containerClassName}
      >
        <div className="pt-8 md:pt-0">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className={cn("flex flex-col gap-6", contentClassName)}>
              {tagline &&
                (typeof tagline === "string" ? (
                  <p
                    className={cn(
                      "text-sm font-medium tracking-wider uppercase",
                      taglineClassName,
                    )}
                  >
                    {tagline}
                  </p>
                ) : (
                  <div className={taglineClassName}>{tagline}</div>
                ))}
              <div className="flex max-w-160 flex-col gap-6">
                {heading &&
                  (typeof heading === "string" ? (
                    <h1
                      className={cn(
                        "max-w-[920px] text-left text-4xl leading-tight font-semibold md:text-6xl lg:text-7xl text-balance",
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
                        "max-w-[750px] text-left text-base leading-relaxed font-normal md:text-xl text-balance",
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
            <div>{renderImages}</div>
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
