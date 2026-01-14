"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Pressable } from "../../../lib/Pressable";
import { Img } from "@page-speed/img";
import { logoPlaceholders } from "../../../lib/mediaPlaceholders";
import type {
  ActionConfig,
  LogoItem,
  OptixFlowConfig,
} from "../../../src/types";

export interface HeroPatternBadgeLogosProps {
  /**
   * Badge/eyebrow content above heading
   */
  badge?: React.ReactNode;
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
   * Array of logo configurations
   */
  logos?: LogoItem[];
  /**
   * Custom slot for rendering logos (overrides logos array)
   */
  logosSlot?: React.ReactNode;
  /**
   * Tagline text above logos
   */
  logosTagline?: React.ReactNode;
  /**
   * Background pattern image URL
   */
  backgroundImageUrl?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
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
   * Additional CSS classes for the badge
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the logos container
   */
  logosClassName?: string;
  /**
   * Additional CSS classes for the background pattern
   */
  backgroundClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function HeroPatternBadgeLogos({
  badge = <Badge variant="outline" className="transition-colors hover:bg-secondary/20">New Release</Badge>,
  heading = "This is a heading for your new project",
  description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur.",
  actions,
  actionsSlot,
  logos,
  logosSlot,
  logosTagline = "Powering the next generation of digital products",
  backgroundImageUrl = "https://cdn.ing/assets/files/record/286186/nbdflpgp4ostrno079hygibsflp3",
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  badgeClassName,
  actionsClassName,
  logosClassName,
  backgroundClassName,
  optixFlowConfig,
}: HeroPatternBadgeLogosProps): React.JSX.Element {
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

  const renderLogos = () => {
    if (logosSlot) return logosSlot;
    if (!logos || logos.length === 0) return null;

    return logos.map((logo, index) => {
      const { src, alt, href, className: logoClassName, imgClassName } = logo;
      const isVariantSrc = typeof src === "object";

      const imgElement = isVariantSrc ? (
        <>
          <Img
            src={src.light}
            alt={alt}
            className={cn(imgClassName, "dark:hidden")}
            optixFlowConfig={optixFlowConfig}
          />
          {src.dark && (
            <Img
              src={src.dark}
              alt={alt}
              className={cn(imgClassName, "hidden dark:block")}
              optixFlowConfig={optixFlowConfig}
            />
          )}
        </>
      ) : (
        <Img
          src={src}
          alt={alt}
          className={imgClassName}
          optixFlowConfig={optixFlowConfig}
        />
      );

      if (href) {
        return (
          <Pressable key={index} href={href} className={logoClassName}>
            {imgElement}
          </Pressable>
        );
      }

      return (
        <div key={index} className={logoClassName}>
          {imgElement}
        </div>
      );
    });
  };

  return (
    <section className={cn("relative p-0", className)}>
      <div
        className={cn(
          "absolute h-full w-full bg-contain bg-repeat opacity-100 lg:block",
          "mask-[linear-gradient(to_right,var(--color-border),transparent,transparent,var(--color-border))]",
          backgroundClassName
        )}
        style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
      />
      <div className={cn("container py-28 md:py-32", containerClassName)}>
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className={cn("z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 text-center", contentClassName)}>
            {badge && (
              <div className={badgeClassName}>
                {typeof badge === "string" ? (
                  <Badge variant="outline" className="transition-colors hover:bg-secondary/20">
                    {badge}
                  </Badge>
                ) : (
                  badge
                )}
              </div>
            )}
            <div>
              {heading && (
                typeof heading === "string" ? (
                  <h1 className={cn("mb-6 text-4xl font-bold tracking-tight text-pretty md:text-5xl lg:text-7xl", headingClassName)}>
                    {heading}
                  </h1>
                ) : (
                  <div className={headingClassName}>{heading}</div>
                )
              )}
              {description && (
                typeof description === "string" ? (
                  <p className={cn("mx-auto max-w-2xl text-muted-foreground md:text-lg lg:text-xl", descriptionClassName)}>
                    {description}
                  </p>
                ) : (
                  <div className={descriptionClassName}>{description}</div>
                )
              )}
            </div>

            {(actionsSlot || (actions && actions.length > 0)) && (
              <div className={cn("mt-6 flex items-center gap-4", actionsClassName)}>
                {renderActions()}
              </div>
            )}

            {(logosSlot || (logos && logos.length > 0) || logosTagline) && (
              <div className={cn("mt-12 flex flex-col items-center gap-4 lg:mt-16", logosClassName)}>
                {logosTagline && (
                  typeof logosTagline === "string" ? (
                    <p className="text-center text-sm text-muted-foreground">
                      {logosTagline}
                    </p>
                  ) : (
                    logosTagline
                  )
                )}
                <div className="grid grid-cols-2 place-items-center items-center justify-center gap-6 opacity-80 sm:grid-cols-4 sm:gap-4">
                  {renderLogos()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
