"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig, OptixFlowConfig, SectionBackground, SectionSpacing } from "../../../src/types";

export interface LogosCertificationsGridLogoItem {
  /**
   * Unique identifier for the logo
   */
  id: string;
  /**
   * Description/alt text for the logo
   */
  description: string;
  /**
   * Logo image URL
   */
  image: string;
  /**
   * Additional CSS classes for the logo image
   */
  imgClassName?: string;
}

export interface LogosCertificationsGridProps {
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Main title/heading
   */
  title?: React.ReactNode;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Description text below the title
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the content container
   */
  contentClassName?: string;
  /**
   * Array of action configurations for CTA buttons
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
   * Array of logo configurations
   */
  logos?: LogosCertificationsGridLogoItem[];
  /**
   * Custom slot for rendering logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logos grid container
   */
  logosClassName?: string;
  /**
   * Additional CSS classes for each logo wrapper
   */
  logoWrapperClassName?: string;
  /**
   * Additional CSS classes for the grid container
   */
  gridClassName?: string;
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
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultLogos: LogosCertificationsGridLogoItem[] = [
  {
    id: "logo-1",
    description: "Logo 1",
    image: "https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb",
  },
  {
    id: "logo-2",
    description: "Logo 2",
    image: "https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5",
  },
  {
    id: "logo-3",
    description: "Logo 3",
    image: "https://cdn.ing/assets/files/record/286214/pn9v9zz0de8jgz2mf8o1c11k8gxh",
  },
  {
    id: "logo-4",
    description: "Logo 4",
    image: "https://cdn.ing/assets/files/record/286235/x4po9fpjkd6cdxnfxaqya6emwvea",
  },
  {
    id: "logo-5",
    description: "Logo 5",
    image: "https://cdn.ing/assets/files/record/286234/bldwkc8wkq6nd3hkdqds9fy5lls9",
  },
  {
    id: "logo-6",
    description: "Logo 6",
    image: "https://cdn.ing/assets/files/record/286233/176g648qa51ou4g3hfnywyldnc7a",
  },
];

const defaultActions: ActionConfig[] = [
  {
    label: "Get in touch",
    href: "#",
    variant: "default",
    icon: <DynamicIcon name="lucide/arrow-right" className="mr-2 size-5" />,
  },
];

/**
 * LogosCertificationsGrid - A split layout with content on the left and certification logos grid on the right.
 * Features a bordered card design with CTA button and 3-column logo grid.
 */
export function LogosCertificationsGrid({
  className,
  title = "Our certifications say it all.",
  titleClassName,
  description = "In non libero bibendum odio pellentesque ullamcorper. Aenean condimentum, dolor commodo pulvinar bibendum.",
  descriptionClassName,
  contentClassName,
  actions = defaultActions,
  actionsSlot,
  actionsClassName,
  logos = defaultLogos,
  logosSlot,
  logosClassName,
  logoWrapperClassName,
  gridClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: LogosCertificationsGridProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => (
      <Pressable
        key={index}
        href={action.href}
        onClick={action.onClick}
        variant={action.variant || "default"}
        asButton
        className={cn("w-full md:w-fit", action.className)}
      >
        {action.icon}
        {action.label}
        {action.iconAfter}
      </Pressable>
    ));
  };

  const renderLogos = () => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return logos.map((logo) => (
      <div
        key={logo.id}
        className={cn(
          "-mb-px flex items-center justify-center border-r border-b border-border p-5 nth-[3n]:border-r-0 sm:p-6",
          logoWrapperClassName
        )}
      >
        <Img
          src={logo.image}
          alt={logo.description}
          className={cn("size-12 object-cover object-center sm:size-16 lg:size-24", logo.imgClassName)}
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    ));
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
    >
      <div className={cn("grid overflow-hidden rounded-xl border border-border md:grid-cols-2", gridClassName)}>
        <div className={cn("my-auto px-6 py-10 sm:px-10 sm:py-12 lg:p-16", contentClassName)}>
          <div className="w-full md:max-w-md">
            {title && (
              typeof title === "string" ? (
                <h2 className={cn("mb-4 text-2xl font-semibold lg:text-3xl", titleClassName)}>
                  {title}
                </h2>
              ) : (
                <div className={titleClassName}>{title}</div>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("mb-6 text-lg", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
            <div className={actionsClassName}>
              {renderActions()}
            </div>
          </div>
        </div>
        <div className={cn("grid grid-cols-3 border-t border-border md:border-t-0 md:border-l", logosClassName)}>
          {renderLogos()}
        </div>
      </div>
    </Section>
  );
}
