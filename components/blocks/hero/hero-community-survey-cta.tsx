"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, ImageItem, OptixFlowConfig } from "../../../src/types";

export interface HeroCommunitySurveyCtaProps {
  /**
   * Announcement banner content (primary text)
   */
  announcementPrimary?: React.ReactNode;
  /**
   * Announcement banner secondary text
   */
  announcementSecondary?: React.ReactNode;
  /**
   * Announcement banner link text
   */
  announcementLinkText?: React.ReactNode;
  /**
   * Announcement banner href
   */
  announcementHref?: string;
  /**
   * Custom slot for announcement banner (overrides announcement props)
   */
  announcementSlot?: React.ReactNode;
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
   * Main image configuration
   */
  mainImage?: ImageItem;
  /**
   * Left overlay image configuration
   */
  leftOverlayImage?: ImageItem;
  /**
   * Right overlay image configuration
   */
  rightOverlayImage?: ImageItem;
  /**
   * Custom slot for images (overrides image props)
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
   * Additional CSS classes for the announcement banner
   */
  announcementClassName?: string;
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

const defaultActions: ActionConfig[] = [
  {
    label: "Get started for free",
    href: "#",
    variant: "default",
    size: "lg",
  },
  {
    label: "Book a demo",
    href: "#",
    variant: "outline",
    size: "lg",
  },
];

const defaultMainImage: ImageItem = {
  src: imagePlaceholders[7],
  alt: "placeholder",
  className: "mt-20 max-h-[580px] w-full rounded-lg object-cover shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]",
};

const defaultLeftOverlayImage: ImageItem = {
  src: imagePlaceholders[8],
  alt: "placeholder",
  className: "absolute top-1/2 -left-3 hidden max-h-56 -translate-y-1/2 rounded-lg object-cover shadow-md md:block xl:-left-10",
};

const defaultRightOverlayImage: ImageItem = {
  src: imagePlaceholders[9],
  alt: "placeholder",
  className: "absolute top-1/3 -right-3 hidden h-24 w-24 -translate-y-1/2 rounded-lg bg-muted shadow-md md:block xl:-right-10",
};

export function HeroCommunitySurveyCta({
  announcementPrimary = "Join our Community Collaboration Survey!",
  announcementSecondary = "We'll donate $20 for each response.",
  announcementLinkText = "Take a tour",
  announcementHref = "#",
  announcementSlot,
  heading = "Community & business data, centralized",
  description = "Showcase the value of your community to the business. Talkbase sets the stage for successful cross-collaboration among community teams working with customer, marketing, sales, and product development.",
  actions = defaultActions,
  actionsSlot,
  mainImage = defaultMainImage,
  leftOverlayImage = defaultLeftOverlayImage,
  rightOverlayImage = defaultRightOverlayImage,
  imagesSlot,
  className,
  containerClassName,
  announcementClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imagesClassName,
  optixFlowConfig,
}: HeroCommunitySurveyCtaProps): React.JSX.Element {
  const renderAnnouncement = () => {
    if (announcementSlot) return announcementSlot;

    return (
      <Pressable
        href={announcementHref}
        className={cn("group mx-auto mb-3 w-fit gap-3 rounded-full border px-5 py-2 text-sm", announcementClassName)}
      >
        <span className="mr-1 font-medium">
          {announcementPrimary}
        </span>
        {announcementSecondary}
        <DynamicIcon name="lucide/minus" size={16} className="mx-1 inline-block" />
        <span className="font-semibold group-hover:underline">
          {announcementLinkText}
        </span>
      </Pressable>
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
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
      );
    });
  };

  const renderImages = () => {
    if (imagesSlot) return imagesSlot;

    return (
      <div className={cn("relative mx-auto max-w-5xl", imagesClassName)}>
        {mainImage && (
          <Img
            src={mainImage.src}
            alt={mainImage.alt}
            className={mainImage.className}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        {leftOverlayImage && (
          <Img
            src={leftOverlayImage.src}
            alt={leftOverlayImage.alt}
            className={leftOverlayImage.className}
            optixFlowConfig={optixFlowConfig}
          />
        )}
        {rightOverlayImage && (
          <Img
            src={rightOverlayImage.src}
            alt={rightOverlayImage.alt}
            className={rightOverlayImage.className}
            optixFlowConfig={optixFlowConfig}
          />
        )}
      </div>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container flex flex-col gap-7 text-center", containerClassName)}>
        {renderAnnouncement()}
        {heading && (
          typeof heading === "string" ? (
            <h1 className={cn("mx-auto max-w-4xl text-4xl font-semibold text-balance lg:text-6xl", headingClassName)}>
              {heading}
            </h1>
          ) : (
            <div className={headingClassName}>{heading}</div>
          )
        )}
        {description && (
          typeof description === "string" ? (
            <p className={cn("mx-auto max-w-4xl text-muted-foreground lg:text-xl", descriptionClassName)}>
              {description}
            </p>
          ) : (
            <div className={descriptionClassName}>{description}</div>
          )
        )}
        {(actionsSlot || (actions && actions.length > 0)) && (
          <div className={cn("flex flex-col justify-center gap-4 sm:flex-row", actionsClassName)}>
            {renderActions()}
          </div>
        )}
      </div>
      <div className="relative px-8">
        <div className="absolute inset-0 top-1/2 h-full w-full bg-linear-to-b from-muted to-transparent to-50%"></div>
        {renderImages()}
      </div>
    </section>
  );
}
