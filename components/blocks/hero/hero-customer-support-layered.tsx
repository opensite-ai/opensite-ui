"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { AspectRatio } from "../../ui/aspect-ratio";
import type { ImageItem, OptixFlowConfig } from "../../../src/types";

export interface HeroCustomerSupportLayeredProps {
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
   * Array of layered images (expects 3 images)
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
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultImages: ImageItem[] = [
  { src: imagePlaceholders[11], alt: "" },
  { src: imagePlaceholders[12], alt: "" },
  { src: imagePlaceholders[13], alt: "" },
];

export function HeroCustomerSupportLayered({
  tagline = "Customer Support",
  heading = <>Change<br />their life</>,
  description = "Customer challenges and team missteps can cause chaos. Simplify delivering exceptional support with a platform designed for customer-focused teams like yours.",
  images = defaultImages,
  imagesSlot,
  className,
  containerClassName,
  contentClassName,
  taglineClassName,
  headingClassName,
  descriptionClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroCustomerSupportLayeredProps): React.JSX.Element {
  const renderImages = () => {
    if (imagesSlot) return imagesSlot;

    return (
      <div className={cn("relative ml-8 aspect-square w-full max-w-225 overflow-hidden lg:absolute lg:right-0 lg:bottom-0 lg:w-1/2", imagesClassName)}>
        {images[0] && (
          <div className="absolute right-0 bottom-0 w-[85%] overflow-hidden rounded-lg">
            <AspectRatio ratio={0.918918919 / 1}>
              <Img
                src={images[0].src}
                alt={images[0].alt}
                className={cn("block size-full object-cover object-top-left", images[0].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        )}
        {images[1] && (
          <div className="absolute bottom-0 left-[0%] w-[70%] overflow-hidden rounded-tl-lg">
            <AspectRatio ratio={1.9 / 1}>
              <Img
                src={images[1].src}
                alt={images[1].alt}
                className={cn("block h-full w-full object-cover object-center", images[1].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        )}
        {images[2] && (
          <div className="absolute right-[5%] bottom-0 w-[40%] overflow-hidden rounded-tl-lg rounded-tr-lg shadow-md">
            <AspectRatio ratio={0.776119403 / 1}>
              <Img
                src={images[2].src}
                alt={images[2].alt}
                className={cn("block h-full w-full object-cover object-top", images[2].className)}
                optixFlowConfig={optixFlowConfig}
              />
            </AspectRatio>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      className={cn(
        "relative border-b border-muted bg-background pt-10",
        className
      )}
    >
      <div className={cn("container", containerClassName)}>
        <div className="grid grid-cols-1 items-center gap-2 md:gap-4 lg:grid-cols-2">
          <div className={cn("flex w-full max-w-125 flex-col gap-9 lg:max-w-150 lg:py-[20%] xl:py-[26%]", contentClassName)}>
            {tagline && (
              typeof tagline === "string" ? (
                <p className={cn("font-mono text-[clamp(0.875rem,0.875vw,1rem)] text-muted-foreground", taglineClassName)}>
                  {tagline}
                </p>
              ) : (
                <div className={taglineClassName}>{tagline}</div>
              )
            )}
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("text-[clamp(3.5rem,calc(6.5vw+2.3rem),9.5rem)] leading-[0.85] tracking-[-0.03em] text-foreground", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <h1 className={cn("text-[clamp(3.5rem,calc(6.5vw+2.3rem),9.5rem)] leading-[0.85] tracking-[-0.03em] text-foreground", headingClassName)}>
                  {heading}
                </h1>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-[clamp(1.125rem,1.125vw,1.4rem)] leading-normal text-muted-foreground", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
          </div>
          <div>
            {renderImages()}
          </div>
        </div>
      </div>
    </section>
  );
}
