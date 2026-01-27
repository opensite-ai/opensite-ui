"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card } from "../../ui/card";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaEnterpriseSplitLink {
  /**
   * Icon name for the link
   */
  iconName?: string;
  /**
   * Custom icon element
   */
  icon?: React.ReactNode;
  /**
   * Title of the link
   */
  title?: React.ReactNode;
  /**
   * Description of the link
   */
  description?: React.ReactNode;
  /**
   * URL for the link
   */
  href?: string;
  /**
   * Additional CSS classes for the link card
   */
  className?: string;
}

export interface CtaEnterpriseSplitProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
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
   * Array of resource links to display
   */
  links?: CtaEnterpriseSplitLink[];
  /**
   * Custom slot for rendering links (overrides links array)
   */
  linksSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the grid layout
   */
  gridClassName?: string;
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
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the links wrapper
   */
  linksClassName?: string;
  /**
   * Additional CSS classes for each link card
   */
  linkCardClassName?: string;
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
}

/**
 * CtaEnterpriseSplit - A split-layout CTA with enterprise messaging and buttons
 * on one side, and documentation/demo links with icons on the other. Perfect
 * for B2B and enterprise products.
 *
 * @example
 * ```tsx
 * <CtaEnterpriseSplit
 *   heading="Enterprise Ready"
 *   description="Built for scale with enterprise-grade security."
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "default" },
 *     { label: "Contact Sales", href: "/contact", variant: "outline" }
 *   ]}
 *   links={[
 *     { iconName: "lucide/file-text", title: "Docs", description: "Read our docs", href: "/docs" }
 *   ]}
 * />
 * ```
 */
export function CtaEnterpriseSplit({
  heading,
  description,
  actions,
  actionsSlot,
  links,
  linksSlot,
  className,
  containerClassName,
  gridClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  linksClassName,
  linkCardClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
}: CtaEnterpriseSplitProps): React.JSX.Element {
  const actionsContent = useMemo(() => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div className={cn("flex flex-col gap-3 sm:flex-row", actionsClassName)}>
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

  const linksContent = useMemo(() => {
    if (linksSlot) return linksSlot;
    if (!links || links.length === 0) return null;

    return (
      <div className={cn("flex flex-col gap-4", linksClassName)}>
        {links.map((link, index) => (
          <Pressable key={index} href={link.href}>
            <Card
              className={cn(
                "flex items-start gap-4 p-6 transition-colors hover:bg-accent",
                linkCardClassName,
                link.className,
              )}
            >
              {(link.icon || link.iconName) && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  {link.icon ?? (
                    <DynamicIcon
                      name={link.iconName || ""}
                      size={20}
                      className="text-primary"
                    />
                  )}
                </div>
              )}
              <div>
                <h3 className="font-semibold">{link.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {link.description}
                </p>
              </div>
              <DynamicIcon
                name="lucide/arrow-right"
                size={20}
                className="ml-auto shrink-0 text-muted-foreground"
              />
            </Card>
          </Pressable>
        ))}
      </div>
    );
  }, [linksSlot, links, linksClassName, linkCardClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div
          className={cn("grid gap-8 lg:grid-cols-2 lg:gap-16", gridClassName)}
        >
          <div className={cn("flex flex-col justify-center", contentClassName)}>
            {heading && (
              typeof heading === "string" ? (
                <h2
                  className={cn(
                    "mb-4 text-3xl font-bold md:text-5xl",
                    headingClassName,
                  )}
                >
                  {heading}
                </h2>
              ) : (
                <div className={cn("mb-4", headingClassName)}>{heading}</div>
              )
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
          {linksContent}
        </div>
      </div>
    </Section>
  );
}
