"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type { ActionConfig, LogoItem, OptixFlowConfig } from "../../../src/types";

export interface HeroFullscreenLogoCtaProps {
  /**
   * Logo configuration
   */
  logo?: LogoItem;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Scroll/read more action configuration
   */
  action?: ActionConfig;
  /**
   * Custom slot for action (overrides action prop)
   */
  actionSlot?: React.ReactNode;
  /**
   * Background image URL
   */
  backgroundImage?: string;
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultLogo: LogoItem = {
  src: logoPlaceholders.lightHorizontalLogo,
  alt: "",
  className: "size-20",
};

const defaultAction: ActionConfig = {
  label: "Read More",
  href: "#",
  variant: "ghost",
  className: "hidden items-center gap-2 text-foreground hover:bg-transparent md:flex",
  iconAfter: <DynamicIcon name="lucide/arrow-down" size={24} />,
};

export function HeroFullscreenLogoCta({
  logo = defaultLogo,
  logoSlot,
  heading = "Create your own fiber optics facility",
  description = "CableCore Partnership. Worldwide network. Regional manufacturing",
  action = defaultAction,
  actionSlot,
  backgroundImage = imagePlaceholders[34],
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  optixFlowConfig,
}: HeroFullscreenLogoCtaProps): React.JSX.Element {
  const renderLogo = () => {
    if (logoSlot) return logoSlot;

    return (
      <Img
        src={logo.src}
        alt={logo.alt}
        className={cn("size-20", logo.className)}
        optixFlowConfig={optixFlowConfig}
      />
    );
  };

  const renderAction = () => {
    if (actionSlot) return actionSlot;

    const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
    return (
      <Pressable
        asButton
        className={actionClassName}
        {...pressableProps}
      >
        {children ?? (
          <>
            {icon}
            <span className="text-2xl">{label}</span>
            {iconAfter}
          </>
        )}
      </Pressable>
    );
  };

  return (
    <section
      className={cn(
        "dark h-screen w-screen bg-background bg-cover bg-center bg-no-repeat pt-12 pb-24",
        className,
      )}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className={cn("container flex h-full flex-col justify-between px-5 xl:px-20", containerClassName)}>
        {renderLogo()}
        <div className="flex items-end justify-between">
          <div className={cn("flex w-full flex-col gap-8 md:w-2/3", contentClassName)}>
            {heading && (
              typeof heading === "string" ? (
                <h1 className={cn("text-6xl font-medium text-foreground md:text-[5.8rem]", headingClassName)}>
                  {heading}
                </h1>
              ) : (
                <h1 className={cn("text-6xl font-medium text-foreground md:text-[5.8rem]", headingClassName)}>
                  {heading}
                </h1>
              )
            )}
            {description && (
              typeof description === "string" ? (
                <p className={cn("text-xl text-foreground md:text-2xl", descriptionClassName)}>
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              )
            )}
          </div>
          {renderAction()}
        </div>
      </div>
    </section>
  );
}
