"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { Card } from "../../ui/card";
import { Separator } from "../../ui/separator";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

export interface FeatureUtilityCardsGridItem {
  /**
   * Utility title content
   */
  title?: React.ReactNode;
  /**
   * Utility description content
   */
  description?: React.ReactNode;
  /**
   * Image source URL
   */
  image?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Custom slot for image (overrides image)
   */
  imageSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the item
   */
  className?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface FeatureUtilityCardsGridProps {
  /**
   * Section label content
   */
  label?: React.ReactNode;
  /**
   * Icon element for label (overrides iconName)
   */
  labelIcon?: React.ReactNode;
  /**
   * Icon name for label in format: prefix/name
   */
  labelIconName?: string;
  /**
   * Main heading content
   */
  title?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Learn more action configuration
   */
  learnMoreAction?: ActionConfig;
  /**
   * Custom slot for learn more link (overrides learnMoreAction)
   */
  learnMoreSlot?: React.ReactNode;
  /**
   * Array of utility items
   */
  utilities?: FeatureUtilityCardsGridItem[];
  /**
   * Custom slot for rendering utilities (overrides utilities array)
   */
  utilitiesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
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
   * Additional CSS classes for the label
   */
  labelClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultUtilities: FeatureUtilityCardsGridItem[] = [
  {
    title: "Integrations",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: blockBrandedIconsAndPlaceholders.placeholder1,
  },
  {
    title: "Apps",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: blockBrandedIconsAndPlaceholders.placeholderDark1,
  },
  {
    title: "APIs",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: blockBrandedIconsAndPlaceholders.placeholder3,
  },
  {
    title: "Plugins",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: blockBrandedIconsAndPlaceholders.placeholder4,
  },
  {
    title: "Extensions",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: blockBrandedIconsAndPlaceholders.placeholder5,
  },
  {
    title: "Widgets",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: blockBrandedIconsAndPlaceholders.placeholder6,
  },
];

const defaultLearnMoreAction: ActionConfig = {
  label: "Learn more",
  href: "#",
  iconAfter: <DynamicIcon name="lucide/chevron-right" size={16} className="ml-2 inline-block" />,
};

/**
 * Feature Utility Cards Grid - Six-card grid showcasing utilities with images
 * and descriptions.
 *
 * Layout: Header with separator, two-column intro, three-column card grid.
 * Key features: Icon label, separator line, image cards, hover effects.
 * Best for: Utility showcases, integration highlights, tool collections.
 *
 * @example
 * ```tsx
 * <FeatureUtilityCardsGrid
 *   label="Utilities"
 *   title="What you can do with our utilities?"
 *   utilities={[
 *     { title: "Integrations", description: "Connect your tools", image: "/integrations.jpg" },
 *   ]}
 * />
 * ```
 */
export function FeatureUtilityCardsGrid({
  label = "Utilities",
  labelIcon,
  labelIconName = "lucide/square-dashed-mouse-pointer",
  title = "What you can do with our utilities?",
  description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae praesent, ad ullam quis cupiditate atque maxime alias eaque repellendus perferendis, nemo repudiandae.",
  learnMoreAction = defaultLearnMoreAction,
  learnMoreSlot,
  utilities = defaultUtilities,
  utilitiesSlot,
  className,
  containerClassName,
  headerClassName,
  labelClassName,
  titleClassName,
  descriptionClassName,
  gridClassName,
  cardClassName,
  optixFlowConfig,
}: FeatureUtilityCardsGridProps): React.JSX.Element {
  const renderLabelIcon = () => {
    if (labelIcon) return labelIcon;
    if (labelIconName) return <DynamicIcon name={labelIconName} size={20} className="text-primary" />;
    return <DynamicIcon name="lucide/square-dashed-mouse-pointer" size={20} className="text-primary" />;
  };

  const renderLearnMore = () => {
    if (learnMoreSlot) return learnMoreSlot;
    if (!learnMoreAction) return null;

    if (learnMoreAction.children) {
      return (
        <Pressable
          href={learnMoreAction.href}
          onClick={learnMoreAction.onClick}
          className={cn("hover:text-primary hover:underline", learnMoreAction.className)}
          aria-label={learnMoreAction["aria-label"]}
        >
          {learnMoreAction.children}
        </Pressable>
      );
    }

    return (
      <Pressable
        href={learnMoreAction.href}
        onClick={learnMoreAction.onClick}
        className={cn("hover:text-primary hover:underline", learnMoreAction.className)}
        aria-label={learnMoreAction["aria-label"]}
      >
        {learnMoreAction.icon}
        {learnMoreAction.label}
        {learnMoreAction.iconAfter}
      </Pressable>
    );
  };

  const renderUtilityImage = (utility: FeatureUtilityCardsGridItem) => {
    if (utility.imageSlot) return utility.imageSlot;
    if (utility.image) {
      return (
        <Img
          src={utility.image}
          alt={utility.imageAlt || (typeof utility.title === "string" ? utility.title : "Utility image")}
          className={cn("aspect-video w-full object-cover", utility.imageClassName)}
          loading="lazy"
          optixFlowConfig={optixFlowConfig}
        />
      );
    }
    return null;
  };

  const renderUtilities = () => {
    if (utilitiesSlot) return utilitiesSlot;
    if (!utilities || utilities.length === 0) return null;

    return utilities.map((utility, index) => (
      <Card key={index} className={cn("overflow-hidden pt-0", cardClassName, utility.className)}>
        {renderUtilityImage(utility)}
        <div className="p-5">
          {utility.title && (
            typeof utility.title === "string" ? (
              <p className={cn("mb-1 font-medium", utility.titleClassName)}>{utility.title}</p>
            ) : (
              <div className={cn("mb-1 font-medium", utility.titleClassName)}>{utility.title}</div>
            )
          )}
          {utility.description && (
            typeof utility.description === "string" ? (
              <p className={cn("text-muted-foreground", utility.descriptionClassName)}>{utility.description}</p>
            ) : (
              <div className={cn("text-muted-foreground", utility.descriptionClassName)}>{utility.description}</div>
            )
          )}
        </div>
      </Card>
    ));
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container max-w-7xl", containerClassName)}>
        <div className={cn("flex items-center justify-between text-sm", headerClassName)}>
          <div className={cn("flex items-center gap-1 text-muted-foreground", labelClassName)}>
            {renderLabelIcon()}
            {label && (
              typeof label === "string" ? (
                <p>{label}</p>
              ) : (
                <div>{label}</div>
              )
            )}
          </div>
          {renderLearnMore()}
        </div>
        <Separator className="mt-3 mb-8" />
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          {title && (
            typeof title === "string" ? (
              <h2 className={cn("text-3xl font-medium md:w-1/2", titleClassName)}>{title}</h2>
            ) : (
              <div className={cn("text-3xl font-medium md:w-1/2", titleClassName)}>{title}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("md:w-1/2", descriptionClassName)}>{description}</p>
            ) : (
              <div className={cn("md:w-1/2", descriptionClassName)}>{description}</div>
            )
          )}
        </div>
        <div className={cn("mt-11 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3", gridClassName)}>
          {renderUtilities()}
        </div>
      </div>
    </section>
  );
}
