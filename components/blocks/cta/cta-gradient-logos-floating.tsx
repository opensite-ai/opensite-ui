"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaGradientLogosFloatingProps {
  /**
   * Main heading content (supports gradient styling)
   */
  heading?: React.ReactNode;
  /**
   * Gradient portion of the heading
   */
  headingGradient?: React.ReactNode;
  /**
   * Description content below the heading
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
   * Array of logo URLs for floating circles on the left
   */
  leftLogos?: string[];
  /**
   * Array of logo URLs for floating circles on the right
   */
  rightLogos?: string[];
  /**
   * Custom slot for rendering left logos (overrides leftLogos array)
   */
  leftLogosSlot?: React.ReactNode;
  /**
   * Custom slot for rendering right logos (overrides rightLogos array)
   */
  rightLogosSlot?: React.ReactNode;
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
   * Additional CSS classes for the gradient text
   */
  gradientClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the left logos wrapper
   */
  leftLogosClassName?: string;
  /**
   * Additional CSS classes for the right logos wrapper
   */
  rightLogosClassName?: string;
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
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * CtaGradientLogosFloating - A CTA section with gradient text heading, centered
 * content, and floating logo circles on both sides. Creates a dynamic, modern
 * appearance.
 *
 * @example
 * ```tsx
 * <CtaGradientLogosFloating
 *   heading="Build faster with"
 *   headingGradient="modern tools"
 *   description="Join thousands of developers building amazing products."
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "default", size: "lg" },
 *     { label: "Learn More", href: "/learn", variant: "outline", size: "lg" }
 *   ]}
 *   leftLogos={["/logo1.png", "/logo2.png"]}
 *   rightLogos={["/logo3.png", "/logo4.png"]}
 * />
 * ```
 */
export function CtaGradientLogosFloating({
  heading,
  headingGradient,
  description,
  actions,
  actionsSlot,
  leftLogos,
  rightLogos,
  leftLogosSlot,
  rightLogosSlot,
  className,
  containerClassName,
  contentClassName,
  headingClassName,
  gradientClassName,
  descriptionClassName,
  actionsClassName,
  leftLogosClassName,
  rightLogosClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: CtaGradientLogosFloatingProps): React.JSX.Element {
  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "flex flex-col justify-center gap-3 sm:flex-row",
          actionsClassName,
        )}
      >
        {actions.map((action, index) => {
          const isFirstAction = index === 0;
          return (
            <Pressable
              key={index}
              href={action.href}
              onClick={action.onClick}
              variant={action.variant}
              size={action.size}
              className={action.className}
              aria-label={action["aria-label"]}
              asButton
            >
              {action.icon}
              {action.children ?? action.label}
              {action.iconAfter ??
                (isFirstAction && (
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={16}
                    className="ml-2"
                  />
                ))}
            </Pressable>
          );
        })}
      </div>
    );
  }, [actionsSlot, actions, actionsClassName]);

  const leftLogosContent = useMemo(() => {
    if (leftLogosSlot) return leftLogosSlot;
    if (!leftLogos || leftLogos.length === 0) return null;

    return (
      <div
        className={cn(
          "absolute left-0 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex",
          leftLogosClassName,
        )}
      >
        {leftLogos.map((logo, index) => (
          <div
            key={index}
            className="flex h-16 w-16 items-center justify-center rounded-full border bg-background p-3 shadow-lg"
            style={{
              transform: `translateX(${index % 2 === 0 ? "0" : "2rem"})`,
            }}
          >
            <Img
              src={logo}
              alt=""
              className="h-full w-full object-contain"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        ))}
      </div>
    );
  }, [leftLogosSlot, leftLogos, leftLogosClassName, optixFlowConfig]);

  const rightLogosContent = useMemo(() => {
    if (rightLogosSlot) return rightLogosSlot;
    if (!rightLogos || rightLogos.length === 0) return null;

    return (
      <div
        className={cn(
          "absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex",
          rightLogosClassName,
        )}
      >
        {rightLogos.map((logo, index) => (
          <div
            key={index}
            className="flex h-16 w-16 items-center justify-center rounded-full border bg-background p-3 shadow-lg"
            style={{
              transform: `translateX(${index % 2 === 0 ? "0" : "-2rem"})`,
            }}
          >
            <Img
              src={logo}
              alt=""
              className="h-full w-full object-contain"
              optixFlowConfig={optixFlowConfig}
            />
          </div>
        ))}
      </div>
    );
  }, [rightLogosSlot, rightLogos, rightLogosClassName, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn("overflow-hidden", className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div className="relative">
          {leftLogosContent}
          {rightLogosContent}

          <div
            className={cn("mx-auto max-w-2xl text-center", contentClassName)}
          >
            {(heading || headingGradient) && (
              <h2
                className={cn(
                  "mb-6 text-4xl font-bold md:text-5xl",
                  headingClassName,
                )}
              >
                {heading}{" "}
                {headingGradient && (
                  <span
                    className={cn(
                      "bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent",
                      gradientClassName,
                    )}
                  >
                    {headingGradient}
                  </span>
                )}
              </h2>
            )}
            {description && (
              typeof description === "string" ? (
                <p
                  className={cn(
                    "mb-8 text-lg text-muted-foreground",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={cn("mb-8", descriptionClassName)}>{description}</div>
              )
            )}
            {actionsContent}
          </div>
        </div>
      </div>
    </Section>
  );
}
