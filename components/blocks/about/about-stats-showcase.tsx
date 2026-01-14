"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import type { OptixFlowConfig } from "../../../src/types";

export interface ShowcaseImageItem {
  src: string;
  alt: string;
  colSpan?: number;
}

export interface ShowcaseStatItem {
  value?: React.ReactNode;
  label?: React.ReactNode;
}

export interface ShowcaseLogoItem {
  src: string;
  alt: string;
  name?: React.ReactNode;
}

export interface ShowcaseBenefitItem {
  image?: {
    src: string;
    alt: string;
  };
  stat?: {
    value?: React.ReactNode;
    label?: React.ReactNode;
    description?: React.ReactNode;
  };
  testimonial?: {
    logo?: {
      src: string;
      alt: string;
    };
    company?: React.ReactNode;
    quote?: React.ReactNode;
    author?: React.ReactNode;
    role?: React.ReactNode;
  };
}

export interface AboutStatsShowcaseProps {
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Main title
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Main description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Array of images
   */
  images?: ShowcaseImageItem[];
  /**
   * Custom slot for rendering images (overrides images array)
   */
  imagesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the images container
   */
  imagesClassName?: string;
  /**
   * Stats section title
   */
  statsTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the stats title
   */
  statsTitleClassName?: string;
  /**
   * Array of stats
   */
  stats?: ShowcaseStatItem[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the stats container
   */
  statsClassName?: string;
  /**
   * Logos section title
   */
  logosTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the logos title
   */
  logosTitleClassName?: string;
  /**
   * Array of logos
   */
  logos?: ShowcaseLogoItem[];
  /**
   * Custom slot for rendering logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logos container
   */
  logosClassName?: string;
  /**
   * Benefits section title
   */
  benefitsTitle?: React.ReactNode;
  /**
   * Additional CSS classes for the benefits title
   */
  benefitsTitleClassName?: string;
  /**
   * Array of benefits
   */
  benefits?: ShowcaseBenefitItem[];
  /**
   * Custom slot for rendering benefits (overrides benefits array)
   */
  benefitsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the benefits container
   */
  benefitsClassName?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function AboutStatsShowcase({
  className,
  containerClassName,
  title = "Our Background",
  titleClassName,
  description = "Discover how our solution simplifies complex processes, making it easier to manage key operations and deliver exceptional experiences.",
  descriptionClassName,
  images,
  imagesSlot,
  imagesClassName,
  statsTitle = "We excel in our field, but skill isn't everything we offer.",
  statsTitleClassName,
  stats,
  statsSlot,
  statsClassName,
  logosTitle = "Trusted by leading product teams worldwide.",
  logosTitleClassName,
  logos,
  logosSlot,
  logosClassName,
  benefitsTitle = "See the Benefits Firsthand",
  benefitsTitleClassName,
  benefits,
  benefitsSlot,
  benefitsClassName,
  optixFlowConfig,
}: AboutStatsShowcaseProps): React.JSX.Element {
  const renderImages = () => {
    if (imagesSlot) return imagesSlot;
    if (!images || images.length === 0) return null;

    return (
      <div className={cn("grid gap-6 md:grid-cols-12", imagesClassName)}>
        {images.map((image, idx) => (
          <Img
            key={idx}
            src={image.src}
            alt={image.alt}
            className={cn(
              "size-full max-h-96 rounded-xl object-cover",
              image.colSpan ? `md:col-span-${image.colSpan}` : "md:col-span-4"
            )}
            optixFlowConfig={optixFlowConfig}
          />
        ))}
      </div>
    );
  };

  const renderStats = () => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return (
      <div className={cn("grid grid-cols-2 gap-6 md:grid-cols-3", statsClassName)}>
        {stats.map((stat, idx) => (
          <div className="flex flex-col gap-6 border-b pb-8" key={idx}>
            {stat.value && (
              typeof stat.value === "string" ? (
                <p className="text-4xl font-medium md:text-5xl">{stat.value}</p>
              ) : (
                stat.value
              )
            )}
            {stat.label && (
              typeof stat.label === "string" ? (
                <p className="text-muted-foreground">{stat.label}</p>
              ) : (
                stat.label
              )
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderLogos = () => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return (
      <div className="bg-muted/50 py-24">
        <div className="container flex flex-col items-center gap-11">
          {logosTitle && (
            typeof logosTitle === "string" ? (
              <p className={cn("text-center text-xl font-medium", logosTitleClassName)}>{logosTitle}</p>
            ) : (
              <div className={logosTitleClassName}>{logosTitle}</div>
            )
          )}
          <div className={cn("grid grid-cols-2 gap-x-7 gap-y-12 lg:grid-cols-4", logosClassName)}>
            {logos.map((logo, idx) => (
              <div className="flex items-center gap-3" key={idx}>
                <Img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 w-auto md:h-14"
                  optixFlowConfig={optixFlowConfig}
                />
                {logo.name && (
                  typeof logo.name === "string" ? (
                    <p className="text-xl font-semibold md:text-4xl">{logo.name}</p>
                  ) : (
                    logo.name
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderBenefits = () => {
    if (benefitsSlot) return benefitsSlot;
    if (!benefits || benefits.length === 0) return null;

    return (
      <div className="container flex flex-col items-center gap-14">
        {benefitsTitle && (
          typeof benefitsTitle === "string" ? (
            <h2 className={cn("text-center text-4xl font-semibold md:text-5xl", benefitsTitleClassName)}>
              {benefitsTitle}
            </h2>
          ) : (
            <div className={benefitsTitleClassName}>{benefitsTitle}</div>
          )
        )}
        <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", benefitsClassName)}>
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              {benefit.image && (
                <Img
                  src={benefit.image.src}
                  alt={benefit.image.alt}
                  className="max-h-96 w-full rounded-xl object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              )}
              {benefit.stat && (
                <div className="flex flex-col justify-center rounded-xl bg-muted p-8">
                  {benefit.stat.value && (
                    typeof benefit.stat.value === "string" ? (
                      <p className="mb-2 text-4xl font-medium">{benefit.stat.value}</p>
                    ) : (
                      <div className="mb-2">{benefit.stat.value}</div>
                    )
                  )}
                  {benefit.stat.label && (
                    typeof benefit.stat.label === "string" ? (
                      <p className="mb-6 font-semibold">{benefit.stat.label}</p>
                    ) : (
                      <div className="mb-6">{benefit.stat.label}</div>
                    )
                  )}
                  {benefit.stat.description && (
                    typeof benefit.stat.description === "string" ? (
                      <p className="text-muted-foreground">{benefit.stat.description}</p>
                    ) : (
                      benefit.stat.description
                    )
                  )}
                </div>
              )}
              {benefit.testimonial && (
                <div className="rounded-xl bg-background p-4">
                  <div className="mb-4 flex items-center gap-2">
                    {benefit.testimonial.logo && (
                      <Img
                        src={benefit.testimonial.logo.src}
                        alt={benefit.testimonial.logo.alt}
                        className="h-7 w-auto"
                        optixFlowConfig={optixFlowConfig}
                      />
                    )}
                    {benefit.testimonial.company && (
                      typeof benefit.testimonial.company === "string" ? (
                        <span className="text-lg font-semibold">{benefit.testimonial.company}</span>
                      ) : (
                        benefit.testimonial.company
                      )
                    )}
                  </div>
                  {benefit.testimonial.quote && (
                    typeof benefit.testimonial.quote === "string" ? (
                      <p className="mb-6 text-sm">{benefit.testimonial.quote}</p>
                    ) : (
                      <div className="mb-6">{benefit.testimonial.quote}</div>
                    )
                  )}
                  <div className="flex items-baseline gap-1">
                    {benefit.testimonial.author && (
                      typeof benefit.testimonial.author === "string" ? (
                        <span className="font-medium">{benefit.testimonial.author},</span>
                      ) : (
                        benefit.testimonial.author
                      )
                    )}
                    {benefit.testimonial.role && (
                      typeof benefit.testimonial.role === "string" ? (
                        <span className="text-sm text-muted-foreground">{benefit.testimonial.role}</span>
                      ) : (
                        benefit.testimonial.role
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("flex flex-col gap-28", containerClassName)}>
        <div className="container flex flex-col gap-10 text-center md:gap-24">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            {title && (
              typeof title === "string" ? (
                <h1 className={cn("text-4xl font-medium md:text-6xl", titleClassName)}>{title}</h1>
              ) : (
                <div className={titleClassName}>{title}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-lg text-muted-foreground md:text-xl", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
          </div>
          {renderImages()}
        </div>
        <div className="container flex flex-col gap-16">
          {statsTitle && (
            typeof statsTitle === "string" ? (
              <h2 className={cn("max-w-3xl text-4xl font-medium md:text-5xl", statsTitleClassName)}>
                {statsTitle}
              </h2>
            ) : (
              <div className={statsTitleClassName}>{statsTitle}</div>
            )
          )}
          {renderStats()}
        </div>
        {renderLogos()}
        {renderBenefits()}
      </div>
    </section>
  );
}
