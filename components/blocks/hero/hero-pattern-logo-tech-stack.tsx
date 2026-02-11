"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import type {
  ActionConfig,
  LogoItem,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";

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
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;

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
  heading,
  highlightedWord,
  description,
  actions,
  actionsSlot,
  techStackLabel,
  techLogos,
  techLogosSlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "py-12 md:py-32",
  pattern,
  patternOpacity,
  className,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  techLogosClassName,
  optixFlowConfig,
}: HeroPatternLogoTechStackProps): React.JSX.Element {
  const renderLogo = useMemo(() => {
    if (logoSlot) return logoSlot;
    if (!logo) return null;

    const logoSrc = typeof logo.src === "string" ? logo.src : logo.src.light;
    return (
      <div className="relative">
        <Img
          src={logoSrc}
          alt={logo.alt}
          className={cn("h-16 w-auto object-contain", logo.imgClassName)}
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    );
  }, [logoSlot, logo, optixFlowConfig]);

  const renderActions = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-6 flex justify-center flex-col md:flex-row gap-3",
          actionsClassName,
        )}
      >
        {actions.map((action, index) => {
          const {
            label,
            icon,
            iconAfter,
            children,
            className: actionClassName,
            ...pressableProps
          } = action;
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
  }, [actionsSlot, actions, actionsClassName]);

  const renderTechLogos = useMemo(() => {
    if (techLogosSlot) return techLogosSlot;
    if (!techLogos || techLogos.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-20 flex flex-col items-center gap-5",
          techLogosClassName,
        )}
      >
        {techStackLabel &&
          (typeof techStackLabel === "string" ? (
            <p className={cn("font-medium lg:text-left")}>{techStackLabel}</p>
          ) : (
            techStackLabel
          ))}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {techLogos.map((techLogo, index) => {
            const techLogoSrc =
              typeof techLogo.src === "string"
                ? techLogo.src
                : techLogo.src.light;
            return (
              <Pressable
                key={index}
                href={techLogo.href}
                className={cn(
                  "group flex w-auto h-12 items-center justify-center p-0",
                  techLogo.className,
                )}
              >
                <Img
                  src={techLogoSrc}
                  alt={techLogo.alt}
                  className={cn(
                    "h-full w-auto object-contain",
                    techLogo.imgClassName,
                  )}
                  optixFlowConfig={optixFlowConfig}
                />
              </Pressable>
            );
          })}
        </div>
      </div>
    );
  }, [
    techLogosSlot,
    techLogos,
    techStackLabel,
    techLogosClassName,
    optixFlowConfig,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(className)}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div
            className={cn(
              "flex flex-col items-center gap-6 text-center",
              contentClassName,
            )}
          >
            {renderLogo}
            <div>
              {heading &&
                (typeof heading === "string" ? (
                  <h1
                    className={cn(
                      "mb-6 text-2xl font-bold tracking-tight text-balance lg:text-5xl",
                      headingClassName,
                    )}
                  >
                    {heading}{" "}
                    {highlightedWord && (
                      <span className="opacity-75">{highlightedWord}</span>
                    )}
                  </h1>
                ) : (
                  <h1
                    className={cn(
                      "mb-6 text-2xl font-bold tracking-tight text-balance lg:text-5xl",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h1>
                ))}
              {description &&
                (typeof description === "string" ? (
                  <p
                    className={cn(
                      "mx-auto max-w-3xl lg:text-xl text-balance",
                      descriptionClassName,
                    )}
                  >
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                ))}
            </div>
            {renderActions}
            {renderTechLogos}
          </div>
        </div>
      </div>
    </Section>
  );
}
