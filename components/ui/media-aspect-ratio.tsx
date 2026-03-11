import * as React from "react";
import { Img } from "@page-speed/img";
import { cn } from "../../lib/utils";
import type { MediaItem, OptixFlowConfig } from "../../src/types";
import { AspectRatio } from "./aspect-ratio";

export type MediaAspectRatioVariant = "square" | "horizontal" | "vertical" | number;
export type MediaAspectRatioBreakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export interface ResponsiveMediaAspectRatioProps {
  desktop?: MediaAspectRatioVariant;
  mobile?: MediaAspectRatioVariant;
}

export interface MediaAspectRatioProps {
  /**
   * Shared wrapper for the mobile + desktop viewport containers.
   */
  containerClassName?: string;
  /**
   * Mobile-only viewport wrapper classes.
   */
  mobileClassName?: string;
  /**
   * Desktop-only viewport wrapper classes.
   */
  desktopClassName?: string;
  /**
   * Shared frame classes applied to the aspect-ratio container for both viewports.
   * Useful for radius, shadow, borders, and overflow behavior.
   */
  frameClassName?: string;
  /**
   * Mobile-only frame classes.
   */
  mobileFrameClassName?: string;
  /**
   * Desktop-only frame classes.
   */
  desktopFrameClassName?: string;
  /**
   * Shared image/video element classes.
   * Defaults are applied first so overrides can be passed here or through `mediaItem`.
   */
  mediaClassName?: string;
  /**
   * Additional image-only classes.
   */
  imageClassName?: string;
  /**
   * Additional video-only classes.
   */
  videoClassName?: string;
  /**
   * Standardized media payload used across blocks.
   */
  mediaItem?: MediaItem;
  /**
   * Optional OptixFlow image optimization config.
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Responsive aspect-ratio values.
   * @default { desktop: "square", mobile: "square" }
   */
  deviceAspectRatios?: ResponsiveMediaAspectRatioProps;
  /**
   * Breakpoint where the component switches from the mobile viewport wrapper
   * to the desktop viewport wrapper.
   * @default "lg"
   */
  breakpoint?: MediaAspectRatioBreakpoint;
}

const DEFAULT_DEVICE_ASPECT_RATIOS = {
  desktop: "square",
  mobile: "square",
} satisfies Required<ResponsiveMediaAspectRatioProps>;

const DEFAULT_MEDIA_CLASS_NAME = "size-full object-cover";
const DEFAULT_FRAME_CLASS_NAME = "overflow-hidden";
const DEFAULT_BREAKPOINT: MediaAspectRatioBreakpoint = "lg";

const BREAKPOINT_VISIBILITY_CLASSES: Record<
  MediaAspectRatioBreakpoint,
  { desktop: string; mobile: string }
> = {
  sm: {
    desktop: "hidden sm:block",
    mobile: "sm:hidden",
  },
  md: {
    desktop: "hidden md:block",
    mobile: "md:hidden",
  },
  lg: {
    desktop: "hidden lg:block",
    mobile: "lg:hidden",
  },
  xl: {
    desktop: "hidden xl:block",
    mobile: "xl:hidden",
  },
  "2xl": {
    desktop: "hidden 2xl:block",
    mobile: "2xl:hidden",
  },
};

export const MEDIA_ASPECT_RATIOS: Record<Exclude<MediaAspectRatioVariant, number>, number> = {
  square: 1,
  horizontal: 16 / 9,
  vertical: 355 / 520,
};

function resolveAspectRatio(
  ratio: MediaAspectRatioVariant | undefined,
  fallback: keyof typeof MEDIA_ASPECT_RATIOS,
): number {
  const resolvedRatio = ratio ?? fallback;

  if (
    typeof resolvedRatio === "number" &&
    Number.isFinite(resolvedRatio) &&
    resolvedRatio > 0
  ) {
    return resolvedRatio;
  }

  return MEDIA_ASPECT_RATIOS[resolvedRatio as keyof typeof MEDIA_ASPECT_RATIOS];
}

function hasRenderableMedia(mediaItem?: MediaItem): mediaItem is MediaItem {
  return Boolean(mediaItem?.image?.src || mediaItem?.video?.src);
}

function renderMediaElement({
  mediaItem,
  optixFlowConfig,
  mediaClassName,
  imageClassName,
  videoClassName,
}: Pick<
  MediaAspectRatioProps,
  "mediaItem" | "optixFlowConfig" | "mediaClassName" | "imageClassName" | "videoClassName"
>): React.JSX.Element | null {
  if (!hasRenderableMedia(mediaItem)) {
    return null;
  }

  if (mediaItem.video?.src) {
    const { className: inlineVideoClassName, poster, ...videoProps } = mediaItem.video;
    const posterFallback =
      poster ?? (typeof mediaItem.image?.src === "string" ? mediaItem.image.src : undefined);

    return (
      <video
        {...videoProps}
        poster={posterFallback}
        className={cn(
          DEFAULT_MEDIA_CLASS_NAME,
          mediaClassName,
          videoClassName,
          inlineVideoClassName,
        )}
      />
    );
  }

  if (mediaItem.image?.src) {
    const { className: inlineImageClassName, alt, src, ...imageProps } = mediaItem.image;

    return (
      <Img
        {...imageProps}
        src={src}
        alt={alt ?? ""}
        className={cn(
          DEFAULT_MEDIA_CLASS_NAME,
          mediaClassName,
          imageClassName,
          inlineImageClassName,
        )}
        optixFlowConfig={optixFlowConfig}
      />
    );
  }

  return null;
}

function MediaAspectRatio({
  containerClassName,
  mobileClassName,
  desktopClassName,
  frameClassName,
  mobileFrameClassName,
  desktopFrameClassName,
  mediaClassName,
  imageClassName,
  videoClassName,
  mediaItem,
  optixFlowConfig,
  deviceAspectRatios = DEFAULT_DEVICE_ASPECT_RATIOS,
  breakpoint = DEFAULT_BREAKPOINT,
}: MediaAspectRatioProps): React.JSX.Element | null {
  if (!hasRenderableMedia(mediaItem)) {
    return null;
  }

  const ratios = {
    desktop: resolveAspectRatio(
      deviceAspectRatios.desktop,
      DEFAULT_DEVICE_ASPECT_RATIOS.desktop,
    ),
    mobile: resolveAspectRatio(
      deviceAspectRatios.mobile,
      DEFAULT_DEVICE_ASPECT_RATIOS.mobile,
    ),
  };

  const sharedFrameClassName = cn(
    DEFAULT_FRAME_CLASS_NAME,
    frameClassName,
    mediaItem.containerClassName,
  );
  const visibilityClasses = BREAKPOINT_VISIBILITY_CLASSES[breakpoint];

  return (
    <div className={containerClassName} data-slot="media-aspect-ratio">
      <div className={cn("relative", visibilityClasses.mobile, mobileClassName)}>
        <AspectRatio
          ratio={ratios.mobile}
          className={cn(sharedFrameClassName, mobileFrameClassName)}
        >
          {renderMediaElement({
            mediaItem,
            optixFlowConfig,
            mediaClassName,
            imageClassName,
            videoClassName,
          })}
        </AspectRatio>
      </div>
      <div
        className={cn(visibilityClasses.desktop, desktopClassName)}
        style={{ aspectRatio: String(ratios.desktop) }}
      >
        <div
          className={cn("size-full", sharedFrameClassName, desktopFrameClassName)}
          data-slot="media-aspect-ratio-frame"
        >
          {renderMediaElement({
            mediaItem,
            optixFlowConfig,
            mediaClassName,
            imageClassName,
            videoClassName,
          })}
        </div>
      </div>
    </div>
  );
}

export { MediaAspectRatio };
