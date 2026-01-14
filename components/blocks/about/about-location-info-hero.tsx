"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { patternSvgs } from "../../../lib/patternSvgs";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

export type PatternName = keyof typeof patternSvgs;

export interface AboutLocationInfoHeroHours {
  /**
   * Day label
   */
  day?: React.ReactNode;
  /**
   * Hours text
   */
  time?: React.ReactNode;
}

export interface AboutLocationInfoHeroHoursSection {
  /**
   * Section label
   */
  label?: React.ReactNode;
  /**
   * Hours list for the section
   */
  hours?: AboutLocationInfoHeroHours[];
}

export interface AboutLocationInfoHeroProps {
  /**
   * Main headline text
   */
  headline?: React.ReactNode;
  /**
   * Additional CSS classes for the headline
   */
  headlineClassName?: string;
  /**
   * Address text
   */
  address?: React.ReactNode;
  /**
   * Optional address link
   */
  addressHref?: string;
  /**
   * Additional CSS classes for the address
   */
  addressClassName?: string;
  /**
   * Phone text
   */
  phone?: React.ReactNode;
  /**
   * Optional phone link
   */
  phoneHref?: string;
  /**
   * Additional CSS classes for the phone
   */
  phoneClassName?: string;
  /**
   * Action buttons shown below the headline
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Hours sections to display
   */
  hoursSections?: AboutLocationInfoHeroHoursSection[];
  /**
   * Custom slot for rendering hours sections (overrides hoursSections array)
   */
  hoursSectionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the hours sections container
   */
  hoursSectionsClassName?: string;
  /**
   * Image list (one or two images recommended)
   */
  images?: { src: string; alt: string }[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * Layout direction on desktop
   */
  contentPosition?: "left" | "right";
  /**
   * Mobile stack order
   */
  mobileStackOrder?: "content-first" | "images-first";
  /**
   * Section background color
   */
  backgroundColor?: string;
  /**
   * Accent color for section labels
   */
  accentColor?: string;
  /**
   * Pattern background key or URL
   */
  pattern?: PatternName | string;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * AboutLocationInfoHero - Split hero section with contact details, action links,
 * hours breakdown, and a dual-image layout. Great for showcasing location-focused
 * service hubs or flagship office pages.
 */
export function AboutLocationInfoHero({
  headline,
  headlineClassName,
  address,
  addressHref,
  addressClassName,
  phone,
  phoneHref,
  phoneClassName,
  actions,
  actionsSlot,
  actionsClassName,
  hoursSections,
  hoursSectionsSlot,
  hoursSectionsClassName,
  images,
  imagesSlot,
  imagesClassName,
  contentPosition = "left",
  mobileStackOrder = "content-first",
  backgroundColor = "hsl(var(--foreground))",
  accentColor = "hsl(var(--primary))",
  pattern,
  patternOpacity = 0.12,
  className,
  containerClassName,
  optixFlowConfig,
}: AboutLocationInfoHeroProps): React.JSX.Element {
  const patternUrl = pattern
    ? pattern in patternSvgs
      ? patternSvgs[pattern as PatternName]
      : pattern
    : undefined;

  const isSingleImage = (images?.length ?? 0) <= 1;

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("flex flex-wrap gap-4", actionsClassName)}>
        {actions.map((action, index) => (
          <Pressable
            key={index}
            href={action.href}
            onClick={action.onClick}
            className="h-auto text-sm font-semibold uppercase tracking-wider text-white underline decoration-2 underline-offset-8 transition hover:no-underline"
          >
            {action.label}
          </Pressable>
        ))}
      </div>
    );
  };

  const renderHoursSections = () => {
    if (hoursSectionsSlot) return hoursSectionsSlot;
    if (!hoursSections || hoursSections.length === 0) return null;

    return (
      <div className={cn("space-y-4", hoursSectionsClassName)}>
        {hoursSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.label && (
              typeof section.label === "string" ? (
                <h3
                  className="mb-2 text-sm font-medium"
                  style={{ color: accentColor }}
                >
                  {section.label}
                </h3>
              ) : (
                section.label
              )
            )}
            {section.hours && section.hours.length > 0 && (
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-white">
                {section.hours.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex flex-col">
                    {item.day && (
                      typeof item.day === "string" ? (
                        <span className="text-white/80">{item.day}</span>
                      ) : (
                        item.day
                      )
                    )}
                    {item.time && (
                      typeof item.time === "string" ? (
                        <span>{item.time}</span>
                      ) : (
                        item.time
                      )
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderImages = () => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    if (isSingleImage) {
      return (
        <div className="flex justify-center">
          <div className={cn("relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-lg shadow-2xl", imagesClassName)}>
            <Img
              src={images[0]?.src || imagePlaceholders[5]}
              alt={images[0]?.alt || "OpenSite AI location"}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={cn("relative min-h-[350px] md:min-h-[400px] lg:min-h-[450px]", imagesClassName)}>
        <div className="absolute left-0 top-0 z-10 aspect-[4/3] w-[70%] overflow-hidden rounded-lg shadow-2xl md:w-[65%]">
          <Img
            src={images[0]?.src || imagePlaceholders[5]}
            alt={images[0]?.alt || "OpenSite AI location"}
            className="h-full w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
        <div className="absolute bottom-0 right-0 z-20 aspect-[3/4] w-[55%] overflow-hidden rounded-lg shadow-2xl md:w-[50%]">
          <Img
            src={images[1]?.src || imagePlaceholders[6]}
            alt={images[1]?.alt || "OpenSite AI advisors"}
            className="h-full w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
      </div>
    );
  };

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden py-12 md:py-16 lg:py-20",
        className,
      )}
      style={{ backgroundColor }}
    >
      {patternUrl ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url(${patternUrl})`,
            backgroundRepeat: "repeat",
            opacity: patternOpacity,
          }}
          aria-hidden="true"
        />
      ) : null}

      <div className={cn("container relative", containerClassName)}>
        <div
          className={cn(
            "flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12",
            contentPosition === "right" && "lg:flex-row-reverse",
            mobileStackOrder === "images-first" && "flex-col-reverse",
          )}
        >
          <div className="flex-1 space-y-6 lg:space-y-8">
            {headline && (
              typeof headline === "string" ? (
                <h2 className={cn("text-balance text-3xl font-bold uppercase leading-tight tracking-tight text-white md:text-4xl lg:text-5xl", headlineClassName)}>
                  {headline}
                </h2>
              ) : (
                <div className={headlineClassName}>{headline}</div>
              )
            )}

            {renderActions()}

            {(address || phone) ? (
              <div className="space-y-2">
                {address ? (
                  <div className={cn("flex items-center gap-3 text-sm text-white", addressClassName)}>
                    <DynamicIcon name="lucide/map-pin" size={16} />
                    {addressHref ? (
                      <Pressable
                        href={addressHref}
                        className="transition hover:underline"
                      >
                        {address}
                      </Pressable>
                    ) : (
                      typeof address === "string" ? (
                        <span>{address}</span>
                      ) : (
                        address
                      )
                    )}
                  </div>
                ) : null}
                {phone ? (
                  <div className={cn("flex items-center gap-3 text-sm text-white", phoneClassName)}>
                    <DynamicIcon name="lucide/phone" size={16} />
                    {phoneHref ? (
                      <Pressable
                        href={phoneHref}
                        className="transition hover:underline"
                      >
                        {phone}
                      </Pressable>
                    ) : (
                      typeof phone === "string" ? (
                        <Pressable
                          href={phone}
                          className="transition hover:underline"
                        >
                          {phone}
                        </Pressable>
                      ) : (
                        phone
                      )
                    )}
                  </div>
                ) : null}
              </div>
            ) : null}

            {renderHoursSections()}
          </div>

          <div className="relative flex-1">
            {renderImages()}
          </div>
        </div>
      </div>
    </section>
  );
}
