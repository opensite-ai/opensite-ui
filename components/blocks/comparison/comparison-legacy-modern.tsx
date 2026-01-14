import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Separator } from "../../ui/separator";

/**
 * Legacy feature item
 */
export interface LegacyFeature {
  text: string;
}

/**
 * Modern feature item with emoji indicator
 */
export interface ModernFeature {
  emoji: string;
  text: string;
}

export interface ComparisonLegacyModernProps {
  /**
   * Main heading content (before highlight)
   */
  heading?: React.ReactNode;
  /**
   * Highlighted portion of heading
   */
  headingHighlight?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Title for legacy features column
   */
  legacyTitle?: React.ReactNode;
  /**
   * Array of legacy feature items
   */
  legacyFeatures?: LegacyFeature[];
  /**
   * Title for modern features column
   */
  modernTitle?: React.ReactNode;
  /**
   * Array of modern feature items
   */
  modernFeatures?: ModernFeature[];
  /**
   * Custom slot for rendering columns (overrides default columns)
   */
  columnsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the heading highlight
   */
  headingHighlightClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the columns grid
   */
  columnsGridClassName?: string;
  /**
   * Additional CSS classes for the legacy column
   */
  legacyColumnClassName?: string;
  /**
   * Additional CSS classes for the modern column
   */
  modernColumnClassName?: string;
}

/**
 * ComparisonLegacyModern - Legacy vs Modern features split layout
 *
 * Displays a two-column comparison between legacy/old approaches and modern/new
 * solutions. The legacy column uses muted styling with X icons for pain points,
 * while the modern column uses a bordered card with emoji indicators for benefits.
 * Features are separated by dividers for clear visual hierarchy.
 *
 * Best for: Digital transformation messaging, product modernization pitches,
 * before/after comparisons, migration benefits, upgrade justifications.
 */
export function ComparisonLegacyModern({
  heading = "Why Teams are",
  headingHighlight = "Moving to Modern Tools",
  description = "Old tools slow your team down and don't help you ship faster. Modern tools help you ship faster.",
  legacyTitle = "Legacy Features",
  legacyFeatures,
  modernTitle = "New Features",
  modernFeatures,
  columnsSlot,
  className,
  containerClassName,
  headingClassName,
  headingHighlightClassName,
  descriptionClassName,
  columnsGridClassName,
  legacyColumnClassName,
  modernColumnClassName,
}: ComparisonLegacyModernProps): React.JSX.Element {
  const renderColumns = () => {
    if (columnsSlot) return columnsSlot;
    if (!legacyFeatures || legacyFeatures.length === 0 || !modernFeatures || modernFeatures.length === 0) return null;

    return (
      <>
        <div className={cn("rounded-3xl bg-muted p-6 lg:rounded-r-none lg:p-12", legacyColumnClassName)}>
          {legacyTitle && (
            typeof legacyTitle === "string" ? (
              <h3 className="text-2xl font-medium">{legacyTitle}</h3>
            ) : (
              legacyTitle
            )
          )}
          <ul className="mt-9 space-y-3">
            {legacyFeatures.map((feature, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center gap-2">
                  <DynamicIcon
                    name="lucide/x"
                    size={16}
                    className="my-1.5 shrink-0 text-muted-foreground"
                  />
                  <li className="text-sm">{feature.text}</li>
                </div>
                {idx !== legacyFeatures.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </ul>
        </div>
        <div className={cn("rounded-3xl border border-y p-6 lg:rounded-l-none lg:border-l-0 lg:p-12", modernColumnClassName)}>
          {modernTitle && (
            typeof modernTitle === "string" ? (
              <h3 className="text-2xl font-medium">{modernTitle}</h3>
            ) : (
              modernTitle
            )
          )}
          <ul className="mt-9 space-y-3">
            {modernFeatures.map((feature, idx) => (
              <React.Fragment key={idx}>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-lg">{feature.emoji}</span>
                  {feature.text}
                </li>
                {idx !== modernFeatures.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </>
    );
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="flex flex-col gap-6 text-center md:gap-12">
          <h2 className={cn("text-4xl font-medium md:text-5xl lg:text-7xl", headingClassName)}>
            {heading && (
              typeof heading === "string" ? (
                <span className="text-muted-foreground">{heading} </span>
              ) : (
                heading
              )
            )}
            {headingHighlight && (
              typeof headingHighlight === "string" ? (
                <>
                  <br />
                  <span className={headingHighlightClassName}>{headingHighlight}</span>
                </>
              ) : (
                headingHighlight
              )
            )}
          </h2>
          {description && (
            typeof description === "string" ? (
              <p className={cn("text-lg", descriptionClassName)}>{description}</p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>
        <div className={cn("mt-20 grid gap-12 lg:grid-cols-2 lg:gap-0", columnsGridClassName)}>
          {renderColumns()}
        </div>
      </div>
    </section>
  );
}
