"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import {
  imagePlaceholders,
  videoPlaceholders,
} from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
  OptixFlowConfig,
} from "../../../src/types";

/**
 * Service item configuration for video showcase display
 */
export interface ServicesListVideoShowcaseService {
  /**
   * Custom icon element (takes precedence over iconName)
   */
  icon?: React.ReactNode;
  /**
   * Icon name for DynamicIcon
   */
  iconName?: string;
  /**
   * Service title
   */
  title?: React.ReactNode;
  /**
   * Service description
   */
  description?: React.ReactNode;
  /**
   * Video URL
   */
  videoUrl?: string;
  /**
   * Poster image configuration
   */
  posterImage?: {
    src: string;
    alt: string;
  };
  /**
   * CTA button text
   */
  ctaText?: React.ReactNode;
  /**
   * CTA button URL
   */
  ctaUrl?: string;
  /**
   * CTA click handler
   */
  ctaOnClick?: () => void;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
}

export interface ServicesListVideoShowcaseProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Array of service configurations
   */
  services?: ServicesListVideoShowcaseService[];
  /**
   * Custom slot for rendering services (overrides services array)
   */
  servicesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each card
   */
  cardClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * ServicesListVideoShowcase - A services layout featuring video showcases for each service.
 * Each service card includes an icon, title, description, video player with poster image, and CTA.
 * Videos play on hover or click. Perfect for showcasing services with dynamic video content
 * that demonstrates capabilities or processes.
 *
 * @example
 * ```tsx
 * <ServicesListVideoShowcase
 *   heading="Our Services"
 *   description="See our services in action."
 *   services={[{ iconName: "lucide/code", title: "Web Dev", videoUrl: "/video.mp4" }]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListVideoShowcase({
  heading,
  description,
  services,
  servicesSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ServicesListVideoShowcaseProps): React.JSX.Element {
  const [playingIndex, setPlayingIndex] = React.useState<number | null>(null);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    setPlayingIndex(index);
    videoRefs.current[index]?.play();
  };

  const handleMouseLeave = (index: number) => {
    setPlayingIndex(null);
    videoRefs.current[index]?.pause();
    if (videoRefs.current[index]) {
      videoRefs.current[index]!.currentTime = 0;
    }
  };

  const renderServiceIcon = (service: ServicesListVideoShowcaseService) => {
    if (service.icon) return service.icon;
    if (service.iconName)
      return (
        <DynamicIcon name={service.iconName} className="h-5 w-5 text-primary" />
      );
    return null;
  };

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div
        className={cn(
          "grid gap-8 md:grid-cols-2 lg:grid-cols-3",
          gridClassName,
        )}
      >
        {services.map((service, index) => (
          <div
            key={index}
            className={cn(
              "group overflow-hidden rounded-xl border border-border transition-shadow hover:shadow-lg",
              cardClassName,
              service.className,
            )}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className="relative aspect-video overflow-hidden">
              {service.posterImage && (
                <Img
                  src={service.posterImage.src}
                  alt={service.posterImage.alt}
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                    playingIndex === index ? "opacity-0" : "opacity-100",
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
              )}
              {service.videoUrl && (
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={service.videoUrl}
                  className="h-full w-full object-cover"
                  muted
                  loop
                  playsInline
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90">
                  <DynamicIcon
                    name={
                      playingIndex === index ? "lucide/pause" : "lucide/play"
                    }
                    className="h-5 w-5 text-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3">
                {(service.icon || service.iconName) && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    {renderServiceIcon(service)}
                  </div>
                )}
                {service.title &&
                  (typeof service.title === "string" ? (
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  ) : (
                    <div className="text-lg font-semibold">{service.title}</div>
                  ))}
              </div>
              {service.description &&
                (typeof service.description === "string" ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                ) : (
                  <div className="mt-3 text-sm text-muted-foreground">
                    {service.description}
                  </div>
                ))}
              {service.ctaText && (
                <Pressable
                  href={service.ctaUrl}
                  onClick={service.ctaOnClick}
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  {service.ctaText}
                  <DynamicIcon
                    name="lucide/arrow-right"
                    className="ml-1 h-4 w-4"
                  />
                </Pressable>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("mx-auto max-w-6xl space-y-12", containerClassName)}>
        <div className={cn("space-y-4 text-center", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-semibold tracking-tight md:text-4xl",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>
        {renderServices()}
      </div>
    </Section>
  );
}
