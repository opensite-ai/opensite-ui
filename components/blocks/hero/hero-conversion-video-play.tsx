"use client";

import * as React from "react";
import { useMemo } from "react";
import { Fragment, useState } from "react";
import { cn, getTextColor, getBorderColor, getAccentColor } from "../../../lib/utils";
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
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, ImageItem, LogoItem, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface HeroConversionVideoPlayProps {
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
   * Video play button label
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
   * Main image configuration
   */
  image?: ImageItem;
  /**
   * Custom slot for image (overrides image)
   */
  imageSlot?: React.ReactNode;
  /**
   * Logos tagline text
   */
  logosTagline?: React.ReactNode;
  /**
   * Array of logo items
   */
  logos?: LogoItem[];
  /**
   * Custom slot for logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
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
   * Additional CSS classes for the logos container
   */
  logosClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroConversionVideoPlay({
  heading,
  description,
  primaryAction,
  videoButtonLabel = "Play Video",
  videoUrl = "https://www.youtube.com/embed/your-video-id",
  videoDialogTitle = "Presentation Video",
  actionsSlot,
  image,
  imageSlot,
  logosTagline = "Trusted by these brands and many others",
  logos,
  logosSlot,
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
  logosClassName,
  optixFlowConfig,
}: HeroConversionVideoPlayProps): React.JSX.Element {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;

    return (
      <>
        {primaryAction && (() => {
          const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = primaryAction;
          return (
            <Pressable
              asButton
              className={actionClassName}
              {...pressableProps}
            >
              <div className="relative z-10 flex items-center gap-2.5">
                {children ?? (
                  <>
                    {icon}
                    <span>{label}</span>
                    {iconAfter}
                  </>
                )}
              </div>
              <div className="absolute bottom-16 -left-16 aspect-square w-16 rounded-full bg-pink-400 transition-all duration-300 group-hover:bottom-1/2 group-hover:-left-5 group-hover:w-[110%] group-hover:translate-y-1/2"></div>
            </Pressable>
          );
        })()}

        <Pressable
          href="#"
          onClick={() => setIsVideoOpen(true)}
          asButton
          variant="ghost"
          className="flex h-fit w-fit items-center gap-2 text-lg font-semibold uppercase hover:bg-transparent"
        >
          <div className="flex h-10 w-10 rounded-full bg-primary">
            <DynamicIcon
              name="lucide/play"
              size={16}
              className="m-auto fill-white stroke-white"
            />
          </div>
          <div>{videoButtonLabel}</div>
        </Pressable>
      </>
    );
  }, [actionsSlot, primaryAction, videoButtonLabel, setIsVideoOpen]);

  const renderLogos = useMemo(() => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return logos.map((logo, index) => {
      const src = typeof logo.src === "string" ? logo.src : logo.src.light;
      return (
        <Img
          key={index}
          src={src}
          alt={logo.alt}
          className={logo.className}
          optixFlowConfig={optixFlowConfig}
        />
      );
    });
  }, [logosSlot, logos, optixFlowConfig]);

  return (
    <Fragment>
      <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
    >
        <div className={cn("overflow-hidden border-b", getBorderColor(background, "muted"))}>
          <div className={cn("container", containerClassName)}>
            <div className="flex flex-col items-center gap-16 md:gap-24">
              <div className={cn("flex flex-col items-center gap-8", contentClassName)}>
                <div className="flex flex-col items-center gap-7">
                  {heading && (
                    typeof heading === "string" ? (
                      <h1 className={cn("max-w-[920px] text-center text-4xl leading-tight font-semibold md:text-6xl lg:text-7xl", headingClassName)}>
                        {heading}
                      </h1>
                    ) : (
                      <div className={headingClassName}>{heading}</div>
                    )
                  )}
                  {description && (
                    typeof description === "string" ? (
                      <p className={cn("max-w-[750px] text-center text-base leading-relaxed font-normal md:text-xl", getTextColor(background, "muted"), descriptionClassName)}>
                        {description}
                      </p>
                    ) : (
                      <div className={descriptionClassName}>{description}</div>
                    )
                  )}
                </div>

                <div className={cn("flex flex-wrap items-center justify-center gap-8", actionsClassName)}>
                  {renderActions}
                </div>
              </div>
              <div className="w-full">
                {imageSlot ? imageSlot : image ? (
                  <div className={cn("relative h-fit w-full", imageClassName)}>
                    <div className="relative z-20 w-full max-w-330 overflow-hidden rounded-t-xl md:rounded-t-3xl">
                      <AspectRatio ratio={2.095238095 / 1}>
                        <Img
                          src={image.src}
                          alt={image.alt}
                          className={cn("size-full object-cover object-center", image.className)}
                          optixFlowConfig={optixFlowConfig}
                        />
                      </AspectRatio>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className={cn("flex flex-col items-center gap-16 py-20", logosClassName)}>
            {logosTagline && (
              typeof logosTagline === "string" ? (
                <p className={cn("text-center text-xl font-medium", getAccentColor(background))}>
                  {logosTagline}
                </p>
              ) : (
                logosTagline
              )
            )}
            {(logosSlot || (logos && logos.length > 0)) && (
              <div className="flex flex-wrap items-center justify-center gap-20">
                {renderLogos}
              </div>
            )}
          </div>
        </div>
      </Section>
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
