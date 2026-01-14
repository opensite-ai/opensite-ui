"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import { buttonVariants } from "../../../lib/button-variants";
import type { ActionConfig, LogoItem, OptixFlowConfig } from "../../../src/types";

export interface HeroPatternLogoTechStackProps {
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
   * Highlighted word in heading
   */
  highlightedWord?: string;
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
   * Tech stack section label
   */
  techStackLabel?: React.ReactNode;
  /**
   * Array of tech stack logos
   */
  techLogos?: LogoItem[];
  /**
   * Custom slot for tech logos (overrides techLogos array)
   */
  techLogosSlot?: React.ReactNode;
  /**
   * Background pattern image URL
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the tech logos container
   */
  techLogosClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroPatternLogoTechStack({
  logo,
  logoSlot,
  heading = "Build your next project with",
  highlightedWord = "Blocks",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
  actions,
  actionsSlot,
  techStackLabel = "Built with open-source technologies",
  techLogos,
  techLogosSlot,
  backgroundImage = "https://cdn.ing/assets/files/record/286187/4gpn0yq2ptra8iwlvmwwv860ggwv",
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  techLogosClassName,
  optixFlowConfig,
}: HeroPatternLogoTechStackProps): React.JSX.Element {
  const renderLogo = () => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    const logoSrc = typeof logo.src === "string" ? logo.src : logo.src.light;
    return (
      <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
        <Img
          src={logoSrc}
          alt={logo.alt}
          className={cn("h-16", logo.imgClassName)}
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    );
  };

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("mt-6 flex justify-center gap-3", actionsClassName)}>
        {actions.map((action, index) => {
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
        })}
      </div>
    );
  };

  const renderTechLogos = () => {
    if (techLogosSlot) return techLogosSlot;
    if (!techLogos || techLogos.length === 0) return null;

    return (
      <div className={cn("mt-20 flex flex-col items-center gap-5", techLogosClassName)}>
        {techStackLabel && (
          typeof techStackLabel === "string" ? (
            <p className="font-medium text-muted-foreground lg:text-left">
              {techStackLabel}
            </p>
          ) : (
            techStackLabel
          )
        )}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {techLogos.map((techLogo, index) => {
            const techLogoSrc = typeof techLogo.src === "string" ? techLogo.src : techLogo.src.light;
            return (
              <Pressable
                key={index}
                href={techLogo.href}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "group flex aspect-square h-12 items-center justify-center p-0",
                  techLogo.className
                )}
              >
                <Img
                  src={techLogoSrc}
                  alt={techLogo.alt}
                  className={cn("h-6 saturate-0 transition-all group-hover:saturate-100", techLogo.imgClassName)}
                  optixFlowConfig={optixFlowConfig}
                />
              </Pressable>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className={cn("relative overflow-hidden py-32", className)}>
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <Img
          alt="background"
          src={backgroundImage}
          className="mask-[radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
          optixFlowConfig={optixFlowConfig}
        />
      </div>
      <div className={cn("relative z-10 container", containerClassName)}>
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className={cn("flex flex-col items-center gap-6 text-center", contentClassName)}>
            {renderLogo()}
            <div>
              {heading && (
                typeof heading === "string" ? (
                  <h1 className={cn("mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl", headingClassName)}>
                    {heading}{" "}
                    {highlightedWord && <span className="text-primary">{highlightedWord}</span>}
                  </h1>
                ) : (
                  <h1 className={cn("mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl", headingClassName)}>
                    {heading}
                  </h1>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("mx-auto max-w-3xl text-muted-foreground lg:text-xl", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                )
              )}
            </div>
            {renderActions()}
            {renderTechLogos()}
          </div>
        </div>
      </div>
    </section>
  );
}
