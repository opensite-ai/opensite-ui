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
   * Primary action configuration
   */
  primaryAction?: ActionConfig;
  /**
   * Video button label
   */
  videoButtonLabel?: React.ReactNode;
  /**
   * Video URL for the dialog
   */
  videoUrl?: string;
  /**
   * Video dialog title
   */
  videoDialogTitle?: string;
  /**
   * Custom slot for actions (overrides primaryAction and video button)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of stacked images (expects 3 images)
   */
  images?: ImageItem[];
  /**
   * Custom slot for images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultPrimaryAction: ActionConfig = {
  label: "Discover now",
  href: "#",
  variant: "default",
  className: "block h-fit w-fit rounded-sm px-5 py-3.5 text-sm font-medium tracking-wider text-nowrap uppercase",
};

const defaultImages: ImageItem[] = [
  { src: imagePlaceholders[7], alt: "" },
  { src: imagePlaceholders[8], alt: "" },
  { src: imagePlaceholders[9], alt: "" },
];

export function HeroCreativeStudioStacked({
  tagline = "Harmony Creative Studio",
  heading = "Boost your business with a brand-new website.",
  description = "Harmony is a full-service design studio crafting stunning digital experiences and products.",
  primaryAction = defaultPrimaryAction,
  videoButtonLabel = "How it works?",
  videoUrl = "https://www.youtube.com/embed/your-video-id",
  videoDialogTitle = "Presentation Video",
  actionsSlot,
  images = defaultImages,
  imagesSlot,
  className,
  containerClassName,
  contentClassName,
  taglineClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroCreativeStudioStackedProps): React.JSX.Element {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = primaryAction;
    
    return (
      <>
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
        <Pressable
          href="#"
          onClick={() => setIsVideoOpen(true)}
          asButton
          variant="ghost"
          className="flex h-fit w-fit flex-nowrap items-center gap-2 rounded-sm bg-transparent px-5 py-3.5 text-sm font-medium tracking-wider text-nowrap uppercase"
        >
          <DynamicIcon
            name="lucide/play"
            size={12}
            className="fill-neutral-950"
          />
          <p>{videoButtonLabel}</p>
        </Pressable>
      </>
    );
  };

  const renderImages = () => {
    if (imagesSlot) return imagesSlot;

    return (
      <div className={cn("relative mx-auto aspect-[0.789340102/1] max-w-100", imagesClassName)}>
        {images[0] && (
          <div className="absolute bottom-0 left-0 z-30 w-[63%]">
            <AspectRatio
              ratio={0.724137931 / 1}
              className="overflow-hidden"
            >
              <Img
                src={images[0].src}
                alt={images[0].alt}
                className={cn("size-full object-cover object-center", images[0].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        )}

        {images[1] && (
          <div className="absolute top-1/2 left-1/2 z-20 w-[63%] -translate-x-1/2 -translate-y-1/2">
            <AspectRatio
              ratio={0.724137931 / 1}
              className="overflow-hidden"
            >
              <Img
                src={images[1].src}
                alt={images[1].alt}
                className={cn("size-full object-cover object-center", images[1].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        )}

        {images[2] && (
          <div className="absolute top-0 right-0 z-10 w-[63%]">
            <AspectRatio
              ratio={0.724137931 / 1}
              className="overflow-hidden"
            >
              <Img
                src={images[2].src}
                alt={images[2].alt}
                className={cn("size-full object-cover object-center", images[2].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        )}
      </div>
    );
  };

  return (
    <Fragment>
      <section className={cn("bg-background py-12 md:py-20", className)}>
        <div className={cn("container", containerClassName)}>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className={cn("flex flex-col gap-6", contentClassName)}>
              {tagline && (
                typeof tagline === "string" ? (
                  <p className={cn("text-sm font-medium tracking-wider text-muted-foreground uppercase", taglineClassName)}>
                    {tagline}
                  </p>
                ) : (
                  <div className={taglineClassName}>{tagline}</div>
                )
              )}
              <div className="flex max-w-160 flex-col gap-6">
                {heading && (
                  typeof heading === "string" ? (
                    <h1 className={cn("text-4xl leading-tight font-medium md:text-5xl xl:text-6xl", headingClassName)}>
                      {heading}
                    </h1>
                  ) : (
                    <div className={headingClassName}>{heading}</div>
                  )
                )}
                {description && (
                  typeof description === "string" ? (
                    <p className={cn("text-xl text-balance text-muted-foreground", descriptionClassName)}>
                      {description}
                    </p>
                  ) : (
                    <div className={descriptionClassName}>{description}</div>
                  )
                )}
              </div>
              <div className={cn("flex flex-wrap gap-4 py-4", actionsClassName)}>
                {renderActions()}
              </div>
            </div>
            <div>
              {renderImages()}
            </div>
          </div>
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{videoDialogTitle}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src={videoUrl}
              title={videoDialogTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
