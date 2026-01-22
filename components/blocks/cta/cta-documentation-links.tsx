"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Card } from "../../ui/card";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CtaDocumentationLink {
  /**
   * Icon name for the link (e.g., "lucide/file", "lucide/book")
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

export interface CtaDocumentationLinksProps {
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
   * Array of documentation links to display
   */
  links?: CtaDocumentationLink[];
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
   * Additional CSS classes for the card wrapper
   */
  cardClassName?: string;
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
  pattern?: PatternName;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
}

/**
 * CtaDocumentationLinks - A CTA section with heading, description, dual action buttons,
 * and a grid of documentation/resource links with icons. Ideal for developer-focused
 * or documentation-heavy products that want to drive users to resources alongside
 * a primary call to action.
 *
 * @example
 * ```tsx
 * <CtaDocumentationLinks
 *   heading="Get Started Today"
 *   description="Build faster with our comprehensive documentation."
 *   actions={[
 *     { label: "Get Started", href: "/signup", variant: "default" },
 *     { label: "Contact Sales", href: "/contact", variant: "outline" }
 *   ]}
 *   links={[
 *     { iconName: "lucide/file", title: "Documentation", description: "Learn the basics", href: "/docs" },
 *     { iconName: "lucide/book", title: "Tutorials", description: "Step-by-step guides", href: "/tutorials" }
 *   ]}
 * />
 * ```
 */
export function CtaDocumentationLinks({
  heading,
  description,
  actions,
  actionsSlot,
  links,
  linksSlot,
  className,
  containerClassName,
  cardClassName,
  contentClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  linksClassName,
  linkCardClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
}: CtaDocumentationLinksProps): React.JSX.Element {
  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return (
      <div
        className={cn(
          "mt-8 flex flex-col items-center gap-2 sm:flex-row",
          actionsClassName
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
              className={cn("w-full sm:w-auto", action.className)}
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
  };

  const renderLinks = () => {
    if (linksSlot) return linksSlot;
    if (!links || links.length === 0) return null;

    return (
      <div className={cn("flex flex-col gap-4", linksClassName)}>
        {links.map((link, index) => (
          <Pressable key={index} href={link.href}>
            <Card
              className={cn(
                "flex flex-row items-center justify-between gap-2 px-6 py-4 shadow-none hover:bg-accent",
                linkCardClassName,
                link.className
              )}
            >
              <div className="flex items-start gap-2">
                {link.icon ??
                  (link.iconName && (
                    <DynamicIcon
                      name={link.iconName}
                      size={16}
                      className="shrink-0"
                    />
                  ))}
                <div>
                  <h5 className="mb-2 leading-4 font-medium">{link.title}</h5>
                  <p className="text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </div>
              </div>
              <DynamicIcon name="lucide/chevron-right" size={24} />
            </Card>
          </Pressable>
        ))}
      </div>
    );
  };

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
          className={cn(
            "grid grid-cols-1 flex-col gap-10 rounded-lg border p-6 shadow-sm lg:grid-cols-2 lg:px-20 lg:py-16",
            cardClassName
          )}
        >
          <div className={contentClassName}>
            <h4
              className={cn(
                "mb-2 text-2xl font-bold lg:text-4xl",
                headingClassName
              )}
            >
              {heading}
            </h4>
            <p className={cn("text-muted-foreground", descriptionClassName)}>
              {description}
            </p>
            {renderActions()}
          </div>
          {renderLinks()}
        </div>
      </div>
    </Section>
  );
}
