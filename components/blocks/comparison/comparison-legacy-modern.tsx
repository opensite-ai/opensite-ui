import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

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
 * ComparisonLegacyModern - Two-column feature comparison split layout
 *
 * Displays a two-column comparison between two approaches or solutions.
 * The first column uses muted styling with X icons,
 * while the second column uses a bordered card with emoji indicators.
 * Features are separated by dividers for clear visual hierarchy.
 *
 * Best for: Transformation messaging, modernization pitches,
 * before/after comparisons, migration benefits, upgrade justifications.
 */
export function ComparisonLegacyModern({
  heading,
  headingHighlight,
  description,
  legacyTitle,
  legacyFeatures,
  modernTitle,
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
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
}: ComparisonLegacyModernProps): React.JSX.Element {
  const columnsContent = React.useMemo(() => {
    if (columnsSlot) return columnsSlot;
    if (!legacyFeatures || legacyFeatures.length === 0 || !modernFeatures || modernFeatures.length === 0)
      return null;

    return (
      <>
        <div className={cn("rounded-3xl bg-muted p-6 lg:rounded-r-none lg:p-12", legacyColumnClassName)}>
          {legacyTitle &&
            (typeof legacyTitle === "string" ? (
              <h3 className="text-2xl font-medium">{legacyTitle}</h3>
            ) : (
              legacyTitle
            ))}
          <ul className="mt-9 space-y-3">
            {legacyFeatures.map((feature, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center gap-2">
                  <DynamicIcon name="lucide/x" size={16} className="my-1.5 shrink-0 text-muted-foreground" />
                  <li className="text-sm">{feature.text}</li>
                </div>
                {idx !== legacyFeatures.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </ul>
        </div>
        <div
          className={cn(
            "rounded-3xl border border-y p-6 lg:rounded-l-none lg:border-l-0 lg:p-12",
            modernColumnClassName
          )}
        >
          {modernTitle &&
            (typeof modernTitle === "string" ? (
              <h3 className="text-2xl font-medium">{modernTitle}</h3>
            ) : (
              modernTitle
            ))}
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
  }, [columnsSlot, legacyFeatures, modernFeatures, legacyTitle, modernTitle, legacyColumnClassName, modernColumnClassName]);

  const headingContent = React.useMemo(() => {
    if (!heading && !headingHighlight) return null;
    return (
      <h2 className={cn("text-4xl font-medium md:text-5xl lg:text-7xl", headingClassName)}>
        {heading &&
          (typeof heading === "string" ? <span className="text-muted-foreground">{heading} </span> : heading)}
        {headingHighlight &&
          (typeof headingHighlight === "string" ? (
            <>
              <br />
              <span className={headingHighlightClassName}>{headingHighlight}</span>
            </>
          ) : (
            headingHighlight
          ))}
      </h2>
    );
  }, [heading, headingHighlight, headingClassName, headingHighlightClassName]);

  const descriptionContent = React.useMemo(() => {
    if (!description) return null;
    if (typeof description === "string") {
      return <p className={cn("text-lg", descriptionClassName)}>{description}</p>;
    }
    return <div className={descriptionClassName}>{description}</div>;
  }, [description, descriptionClassName]);

  return (
    <Section
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div className="flex flex-col gap-6 text-center md:gap-12">
          {headingContent}
          {descriptionContent}
        </div>
        <div className={cn("mt-20 grid gap-12 lg:grid-cols-2 lg:gap-0", columnsGridClassName)}>
          {columnsContent}
        </div>
      </div>
    </Section>
  );
}
