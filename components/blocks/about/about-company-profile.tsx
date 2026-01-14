"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import type { ActionConfig, LogoItem, StatItem, OptixFlowConfig } from "../../../src/types";

export interface BreakoutConfig {
  /**
   * Logo image configuration
   */
  logo?: {
    src: string;
    alt: string;
  };
  /**
   * Breakout title
   */
  title: React.ReactNode;
  /**
   * Breakout description
   */
  description: React.ReactNode;
  /**
   * Action configuration for the breakout button
   */
  action?: ActionConfig;
}

export interface AboutCompanyProfileProps {
  /**
   * Main heading/title
   */
  title?: React.ReactNode;
  /**
   * Main description text
   */
  description?: React.ReactNode;
  /**
   * Main image configuration
   */
  mainImage?: {
    src: string;
    alt: string;
  };
  /**
   * Secondary image configuration
   */
  secondaryImage?: {
    src: string;
    alt: string;
  };
  /**
   * Breakout section configuration
   */
  breakout?: BreakoutConfig;
  /**
   * Custom slot for rendering breakout section (overrides breakout object)
   */
  breakoutSlot?: React.ReactNode;
  /**
   * Companies section title
   */
  companiesTitle?: React.ReactNode;
  /**
   * Array of company logo configurations
   */
  companies?: LogoItem[];
  /**
   * Custom slot for rendering companies (overrides companies array)
   */
  companiesSlot?: React.ReactNode;
  /**
   * Achievements section title
   */
  achievementsTitle?: React.ReactNode;
  /**
   * Achievements section description
   */
  achievementsDescription?: React.ReactNode;
  /**
   * Array of achievement/stat configurations
   */
  achievements?: StatItem[];
  /**
   * Custom slot for rendering achievements (overrides achievements array)
   */
  achievementsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the main image
   */
  mainImageClassName?: string;
  /**
   * Additional CSS classes for the secondary image
   */
  secondaryImageClassName?: string;
  /**
   * Additional CSS classes for the breakout section
   */
  breakoutClassName?: string;
  /**
   * Additional CSS classes for the companies section
   */
  companiesClassName?: string;
  /**
   * Additional CSS classes for the achievements section
   */
  achievementsClassName?: string;
  /**
   * Additional CSS classes for the achievements title
   */
  achievementsTitleClassName?: string;
  /**
   * Additional CSS classes for the achievements description
   */
  achievementsDescriptionClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function AboutCompanyProfile({
  title = "About Us",
  description = "Opensite AI is a passionate team dedicated to creating innovative solutions that empower businesses to thrive in the digital age.",
  mainImage,
  secondaryImage,
  breakout,
  breakoutSlot,
  companiesTitle = "Valued by clients worldwide",
  companies,
  companiesSlot,
  achievementsTitle = "Our Achievements in Numbers",
  achievementsDescription = "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
  achievements,
  achievementsSlot,
  className,
  containerClassName,
  titleClassName,
  descriptionClassName,
  mainImageClassName,
  secondaryImageClassName,
  breakoutClassName,
  companiesClassName,
  achievementsClassName,
  achievementsTitleClassName,
  achievementsDescriptionClassName,
  optixFlowConfig,
}: AboutCompanyProfileProps): React.JSX.Element {
  const renderBreakout = () => {
    if (breakoutSlot) return breakoutSlot;
    if (!breakout) return null;

    return (
      <div className={cn("flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto", breakoutClassName)}>
        {breakout.logo && (
          <Img
            src={breakout.logo.src}
            alt={breakout.logo.alt}
            className="mr-auto h-12 dark:invert"
            optixFlowConfig={optixFlowConfig}
          />
        )}
        <div>
          {typeof breakout.title === "string" ? (
            <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
          ) : (
            breakout.title
          )}
          {typeof breakout.description === "string" ? (
            <p className="text-muted-foreground">{breakout.description}</p>
          ) : (
            breakout.description
          )}
        </div>
        {breakout.action && (
          <Pressable
            href={breakout.action.href}
            variant={breakout.action.variant || "outline"}
            asButton
            className={cn("mr-auto", breakout.action.className)}
          >
            {breakout.action.children ?? (
              <>
                {breakout.action.icon}
                {breakout.action.label}
                {breakout.action.iconAfter}
              </>
            )}
          </Pressable>
        )}
      </div>
    );
  };

  const renderCompanies = () => {
    if (companiesSlot) return companiesSlot;
    if (!companies || companies.length === 0) return null;

    return (
      <div className={cn("py-32", companiesClassName)}>
        {companiesTitle && (
          typeof companiesTitle === "string" ? (
            <p className="text-center">{companiesTitle}</p>
          ) : (
            companiesTitle
          )
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-8">
          {companies.map((company, idx) => {
            const logoSrc = typeof company.src === "string" ? company.src : company.src.light;
            return (
              <div className="flex items-center gap-3" key={idx}>
                <Img
                  src={logoSrc}
                  alt={company.alt}
                  className="h-6 w-auto md:h-8 dark:invert"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAchievements = () => {
    if (achievementsSlot) return achievementsSlot;
    if (!achievements || achievements.length === 0) return null;

    return achievements.map((item, idx) => (
      <div className="flex flex-col gap-2" key={idx}>
        {typeof item.value === "string" ? (
          <span className="text-4xl font-semibold md:text-5xl">{item.value}</span>
        ) : (
          item.value
        )}
        {typeof item.label === "string" ? (
          <p className="text-sm md:text-base">{item.label}</p>
        ) : (
          item.label
        )}
      </div>
    ));
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          {title && (
            typeof title === "string" ? (
              <h1 className={cn("text-5xl font-semibold", titleClassName)}>{title}</h1>
            ) : (
              <div className={titleClassName}>{title}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("text-muted-foreground", descriptionClassName)}>{description}</p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          {mainImage && (
            <Img
              src={mainImage.src}
              alt={mainImage.alt}
              className={cn("size-full max-h-[620px] rounded-xl object-cover lg:col-span-2", mainImageClassName)}
              optixFlowConfig={optixFlowConfig}
            />
          )}
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            {(breakoutSlot || breakout) && renderBreakout()}
            {secondaryImage && (
              <Img
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                className={cn("grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto", secondaryImageClassName)}
                optixFlowConfig={optixFlowConfig}
              />
            )}
          </div>
        </div>
        {(companiesSlot || (companies && companies.length > 0)) && renderCompanies()}
        <div className={cn("relative overflow-hidden rounded-xl bg-muted p-7 md:p-16", achievementsClassName)}>
          <div className="flex flex-col gap-4 text-center md:text-left">
            {achievementsTitle && (
              typeof achievementsTitle === "string" ? (
                <h2 className={cn("text-3xl font-semibold md:text-4xl", achievementsTitleClassName)}>
                  {achievementsTitle}
                </h2>
              ) : (
                <div className={achievementsTitleClassName}>{achievementsTitle}</div>
              )
            )}
            {achievementsDescription && (
              typeof achievementsDescription === "string" ? (
                <p className={cn("max-w-xl text-muted-foreground", achievementsDescriptionClassName)}>
                  {achievementsDescription}
                </p>
              ) : (
                <div className={achievementsDescriptionClassName}>{achievementsDescription}</div>
              )
            )}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 text-center lg:grid-cols-4">
            {renderAchievements()}
          </div>
        </div>
      </div>
    </section>
  );
}
