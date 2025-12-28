"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { patternSvgs } from "../../../lib/patternSvgs";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export type PatternName = keyof typeof patternSvgs;

export interface AboutLocationInfoHeroAction {
  /**
   * Button label
   */
  label: string;
  /**
   * Optional link destination
   */
  href?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export interface AboutLocationInfoHeroHours {
  /**
   * Day label
   */
  day: string;
  /**
   * Hours text
   */
  time: string;
}

export interface AboutLocationInfoHeroHoursSection {
  /**
   * Section label
   */
  label: string;
  /**
   * Hours list for the section
   */
  hours: AboutLocationInfoHeroHours[];
}

export interface AboutLocationInfoHeroProps {
  /**
   * Main headline text
   */
  headline?: string;
  /**
   * Address text
   */
  address?: string;
  /**
   * Optional address link
   */
  addressHref?: string;
  /**
   * Phone text
   */
  phone?: string;
  /**
   * Optional phone link
   */
  phoneHref?: string;
  /**
   * Action buttons shown below the headline
   */
  actionButtons?: AboutLocationInfoHeroAction[];
  /**
   * Hours sections to display
   */
  hoursSections?: AboutLocationInfoHeroHoursSection[];
  /**
   * Image list (one or two images recommended)
   */
  images?: { src: string; alt: string }[];
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
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultImages = [
  { src: imagePlaceholders[5], alt: "OpenSite AI workspace" },
  { src: imagePlaceholders[6], alt: "OpenSite AI team collaboration" },
];

const defaultHoursSections: AboutLocationInfoHeroHoursSection[] = [
  {
    label: "Office Hours",
    hours: [
      { day: "Mon - Thu", time: "8:00am - 6:00pm" },
      { day: "Fri", time: "8:00am - 4:00pm" },
    ],
  },
  {
    label: "Claims Support",
    hours: [
      { day: "Sat", time: "9:00am - 2:00pm" },
      { day: "Sun", time: "On call" },
    ],
  },
];

/**
 * AboutLocationInfoHero - Split hero section with contact details, action links,
 * hours breakdown, and a dual-image layout. Great for showcasing location-focused
 * service hubs or flagship office pages.
 */
export function AboutLocationInfoHero({
  headline = "OpenSite AI service center in the heart of the city",
  address = "975 Mission St, San Francisco, CA",
  addressHref,
  phone = "+1 (415) 555-0192",
  phoneHref,
  actionButtons = [
    { label: "Schedule a Visit", href: "/contact" },
    { label: "Get Directions", href: "https://maps.google.com" },
  ],
  hoursSections = defaultHoursSections,
  images = defaultImages,
  contentPosition = "left",
  mobileStackOrder = "content-first",
  backgroundColor = "hsl(var(--foreground))",
  accentColor = "hsl(var(--primary))",
  pattern,
  patternOpacity = 0.12,
  className,
  optixFlowConfig,
}: AboutLocationInfoHeroProps): React.JSX.Element {
  const patternUrl = pattern
    ? pattern in patternSvgs
      ? patternSvgs[pattern as PatternName]
      : pattern
    : undefined;

  const isSingleImage = images.length <= 1;

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

      <div className="container relative">
        <div
          className={cn(
            "flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12",
            contentPosition === "right" && "lg:flex-row-reverse",
            mobileStackOrder === "images-first" && "flex-col-reverse",
          )}
        >
          <div className="flex-1 space-y-6 lg:space-y-8">
            <h2 className="text-balance text-3xl font-bold uppercase leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
              {headline}
            </h2>

            {actionButtons.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {actionButtons.map((button, index) => (
                  <Pressable
                    key={`${button.label}-${index}`}
                    href={button.href}
                    onClick={button.onClick}
                    className="h-auto text-sm font-semibold uppercase tracking-wider text-white underline decoration-2 underline-offset-8 transition hover:no-underline"
                  >
                    {button.label}
                  </Pressable>
                ))}
              </div>
            ) : null}

            {(address || phone) ? (
              <div className="space-y-2">
                {address ? (
                  <div className="flex items-center gap-3 text-sm text-white">
                    <DynamicIcon name="lucide/map-pin" size={16} />
                    {addressHref ? (
                      <Pressable
                        href={addressHref}
                        className="transition hover:underline"
                      >
                        {address}
                      </Pressable>
                    ) : (
                      <span>{address}</span>
                    )}
                  </div>
                ) : null}
                {phone ? (
                  <div className="flex items-center gap-3 text-sm text-white">
                    <DynamicIcon name="lucide/phone" size={16} />
                    {phoneHref ? (
                      <Pressable
                        href={phoneHref}
                        className="transition hover:underline"
                      >
                        {phone}
                      </Pressable>
                    ) : (
                      <Pressable
                        href={phone}
                        className="transition hover:underline"
                      >
                        {phone}
                      </Pressable>
                    )}
                  </div>
                ) : null}
              </div>
            ) : null}

            {hoursSections.length > 0 ? (
              <div className="space-y-4">
                {hoursSections.map((section, sectionIndex) => (
                  <div key={`${section.label}-${sectionIndex}`}>
                    <h3
                      className="mb-2 text-sm font-medium"
                      style={{ color: accentColor }}
                    >
                      {section.label}
                    </h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-white">
                      {section.hours.map((item, itemIndex) => (
                        <div
                          key={`${item.day}-${itemIndex}`}
                          className="flex flex-col"
                        >
                          <span className="text-white/80">{item.day}</span>
                          <span>{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="relative flex-1">
            {isSingleImage ? (
              <div className="flex justify-center">
                <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-lg shadow-2xl">
                  <Img
                    src={images[0]?.src || imagePlaceholders[5]}
                    alt={images[0]?.alt || "OpenSite AI location"}
                    className="h-full w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </div>
            ) : (
              <div className="relative min-h-[350px] md:min-h-[400px] lg:min-h-[450px]">
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
