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
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Showcase image configuration
   */
  image?: ImageItem;
  /**
   * Custom slot for image (overrides image prop)
   */
  imageSlot?: React.ReactNode;
  /**
   * Video dialog configuration
   */
  videoDialog?: VideoDialogConfig;
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
}

const defaultImage: ImageItem = {
  src: imagePlaceholders[101],
  alt: "",
};

const defaultVideoDialog: VideoDialogConfig = {
  title: "Product Demo",
  videoUrl: "https://www.youtube.com/embed/your-video-id",
};

export function HeroVideoDialogGradient({
  heading = "Transform your workflow with intelligent automation",
  description = "Streamline your processes, reduce manual work, and focus on what matters most. Our platform helps teams work smarter, not harder.",
  actions,
  actionsSlot,
  image = defaultImage,
  imageSlot,
  videoDialog = defaultVideoDialog,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  imageClassName,
  optixFlowConfig,
}: HeroVideoDialogGradientProps): React.JSX.Element {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const defaultActions: ActionConfig[] = [
    {
      label: "Start free trial",
      href: "#",
      variant: "default",
      size: "lg",
      className: "rounded-full px-8",
      iconAfter: <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />,
    },
    {
      label: "Watch demo",
      href: "#",
      onClick: () => setIsVideoOpen(true),
      variant: "outline",
      size: "lg",
      className: "rounded-full px-8",
      icon: <DynamicIcon name="lucide/play" size={16} className="mr-2" />,
    },
  ];

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;

    const actionsToRender = actions || defaultActions;

    return (
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        {actionsToRender.map((action, index) => {
          const { label, icon, iconAfter, children, className: actionClassName, onClick, ...pressableProps } = action;
          return (
            <Pressable
              key={index}
              asButton
              className={actionClassName}
              onClick={onClick || (index === 1 && !actions ? () => setIsVideoOpen(true) : undefined)}
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
        })}
      </div>
    );
  };

  const renderImage = () => {
    if (imageSlot) return imageSlot;

    return (
      <div className="mx-auto mt-16 w-full max-w-[1000px] overflow-hidden rounded-xl shadow-[4px_2px_3.123rem_rgba(0,0,0,.15)]">
        <AspectRatio ratio={1.406469761 / 1}>
          <Img
            src={image.src}
            alt={image.alt}
            className={cn("size-full object-cover object-center", imageClassName, image.className)}
            optixFlowConfig={optixFlowConfig}
          />
        </AspectRatio>
      </div>
    );
  };

  return (
    <Fragment>
      <section
        className={cn(
          "relative overflow-hidden bg-background py-12 font-sans md:py-20",
          className
        )}
      >
        <div className={cn("relative z-20 container", containerClassName)}>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-6">
              {heading && (
                typeof heading === "string" ? (
                  <h1 className={cn("max-w-[920px] text-center text-4xl leading-tight font-semibold text-foreground md:text-6xl lg:text-7xl", headingClassName)}>
                    {heading}
                  </h1>
                ) : (
                  <h1 className={cn("max-w-[920px] text-center text-4xl leading-tight font-semibold text-foreground md:text-6xl lg:text-7xl", headingClassName)}>
                    {heading}
                  </h1>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("max-w-[750px] text-center text-base leading-relaxed font-normal text-muted-foreground md:text-xl", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                )
              )}
            </div>
            {renderActions()}
          </div>
          {renderImage()}
        </div>
        <div className="absolute top-auto bottom-[32%] left-[31%] z-10 size-full md:top-[-6%] md:bottom-auto md:left-55.5">
          <AspectRatio
            ratio={1}
            className="bg-[radial-gradient(closest-side,var(--color-accent),transparent)]"
          />
        </div>
      </section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{videoDialog.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src={videoDialog.videoUrl}
              title={videoDialog.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
