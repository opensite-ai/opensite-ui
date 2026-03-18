"use client";

import * as React from "react";
import { useMemo, useEffect } from "react";
import { Fragment, useState } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
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
import { Carousel, CarouselContent, CarouselItem } from "../../ui/carousel";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  ImageItem,
  LogoItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

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
  videoUrl,
  videoDialogTitle,
  actionsSlot,
  image,
  imageSlot,
  logosTagline,
  logos,
  logosSlot,
  background,
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageClassName,
  logosClassName,
  optixFlowConfig,
}: HeroConversionVideoPlayProps): React.JSX.Element {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [skinClasses, setSkinClasses] = useState<any>(null);
  const [skinStyle, setSkinStyle] = useState<any>(null);

  useEffect(() => {
    loadSkinFromJsDelivr('0.1.2', 'skins/video/base.json').then(skin => {
      setSkinClasses(resolveVideoClasses(skin));
      setSkinStyle(getSkinStyleObject(skin));
    });
  }, []);

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;

    return (
      <>
        {primaryAction &&
          (() => {
            const {
              label,
              icon,
              iconAfter,
              children,
              className: actionClassName,
              ...pressableProps
            } = primaryAction;
            return (
              <Pressable
                asButton
                className={actionClassName}
                {...pressableProps}
              >
                {children ?? (
                  <>
                    {icon}
                    <span>{label}</span>
                    {iconAfter}
                  </>
                )}
              </Pressable>
            );
          })()}

        {videoUrl && (
          <Pressable
            onClick={() => setIsVideoOpen(true)}
            asButton
            variant="link"
          >
            <div className="flex h-10 w-10 rounded-full bg-primary text-primary-foreground justify-center items-center">
              <DynamicIcon name="lucide/play" />
            </div>
            <div>{videoButtonLabel}</div>
          </Pressable>
        )}
      </>
    );
  }, [actionsSlot, primaryAction, videoButtonLabel, setIsVideoOpen]);

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
          <div className="overflow-hidden border-b border-border">
            <div className="flex flex-col items-center gap-16 md:gap-24">
              <div
                className={cn(
                  "flex flex-col items-center gap-8 pt-8 md:pt-12",
                  contentClassName,
                )}
              >
                <div className="flex flex-col items-center gap-7">
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
                      <div className={headingClassName}>{heading}</div>
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
                      <div className={descriptionClassName}>{description}</div>
                    ))}
                </div>

                <div
                  className={cn(
                    "flex flex-wrap items-center justify-center gap-4",
                    actionsClassName,
                  )}
                >
                  {renderActions}
                </div>
              </div>
              <div className="w-full">
                {imageSlot ? (
                  imageSlot
                ) : image ? (
                  <div className={cn("relative h-fit w-full", imageClassName)}>
                    <div className="relative z-20 w-full max-w-330 overflow-hidden rounded-t-xl md:rounded-t-3xl">
                      <AspectRatio ratio={2.095238095 / 1}>
                        <Img
                          src={image.src}
                          alt={image.alt}
                          className={cn(
                            "size-full object-cover object-center",
                            image.className,
                          )}
                          optixFlowConfig={optixFlowConfig}
                        />
                      </AspectRatio>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-16 py-20">
            {logosTagline &&
              (typeof logosTagline === "string" ? (
                <p className={cn("text-center font-medium ")}>{logosTagline}</p>
              ) : (
                logosTagline
              ))}
            {logosSlot ? (
              logosSlot
            ) : logos && logos.length > 0 ? (
              <Carousel
                opts={{ loop: true }}
                plugins={[AutoScroll({ playOnInit: true, speed: 1 })]}
                className="relative w-full max-w-(--breakpoint-2xl) overflow-hidden"
              >
                <CarouselContent className={cn("items-center", logosClassName)}>
                  {[...logos, ...logos].map((logo, index) => (
                    <CarouselItem key={index} className="w-fit basis-auto px-7">
                      <Img
                        src={
                          typeof logo.src === "string"
                            ? logo.src
                            : logo.src.light
                        }
                        alt={logo.alt}
                        className={cn(
                          "h-8 w-full object-fill",
                          logo.imgClassName,
                        )}
                        optixFlowConfig={optixFlowConfig}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : null}
          </div>
        </div>
      </Section>
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="sm:max-w-200">
          <DialogHeader>
            <DialogTitle>{videoDialogTitle}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <Video
              src={videoUrl}
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
