import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Separator } from "../../ui/separator";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

/**
 * Feature item with inclusion status
 */
export interface FeatureItem {
  text: string;
  included: boolean;
}

/**
 * Product card configuration for comparison
 */
export interface ProductCard {
  logo?: string;
  logoAlt?: string;
  name: string;
  features: FeatureItem[];
  highlighted?: boolean;
}

export interface ComparisonFeatureCardsProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * First option card configuration
   */
  productA?: ProductCard;
  /**
   * Second option card configuration
   */
  productB?: ProductCard;
  /**
   * Custom slot for rendering cards (overrides productA/productB)
   */
  cardsSlot?: React.ReactNode;
  /**
   * Suitability section title
   */
  suitabilityTitle?: React.ReactNode;
  /**
   * Suitability section description
   */
  suitabilityDescription?: React.ReactNode;
  /**
   * Differences section title
   */
  differencesTitle?: React.ReactNode;
  /**
   * Differences section description
   */
  differencesDescription?: React.ReactNode;
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
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the cards grid
   */
  cardsGridClassName?: string;
  /**
   * Additional CSS classes for individual cards
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the suitability section
   */
  suitabilityClassName?: string;
  /**
   * Additional CSS classes for the differences section
   */
  differencesClassName?: string;
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ComparisonFeatureCards - Side-by-side feature comparison cards
 *
 * Displays two option cards side by side with feature checklists.
 * The highlighted card uses a bordered, shadowed style while the other uses
 * a muted background. Features show check icons for included items and
 * strikethrough with minus icons for excluded items. Includes optional
 * explanatory text sections below the cards.
 *
 * Best for: Tier comparisons, subscription plan comparisons,
 * feature analysis, package breakdowns.
 */
export function ComparisonFeatureCards({
  sectionId = "comparison-feature-cards",
  heading,
  description,
  productA,
  productB,
  cardsSlot,
  suitabilityTitle,
  suitabilityDescription,
  differencesTitle,
  differencesDescription,
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  cardsGridClassName,
  cardClassName,
  suitabilityClassName,
  differencesClassName,
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ComparisonFeatureCardsProps): React.JSX.Element {
  const renderCard = React.useCallback(
    (product: ProductCard, isHighlighted: boolean) => (
      <div
        className={cn(
          "rounded-xl p-6",
          isHighlighted ? "border bg-background shadow" : "bg-border/40",
          cardClassName
        )}
      >
        <span className="flex items-center justify-center gap-2 font-medium">
          {product.logo ? (
            <Img
              src={product.logo}
              alt={product.logoAlt || `${product.name} logo`}
              className="h-7"
              optixFlowConfig={optixFlowConfig}
            />
          ) : null}
          {product.name}
        </span>
        <Separator className="my-6" />
        <ul className="space-y-2">
          {product.features.map((feature, idx) => (
            <li
              key={idx}
              className={cn(
                "flex items-center gap-2",
                !feature.included && "text-muted-foreground line-through"
              )}
            >
              {feature.included ? (
                <DynamicIcon
                  name="lucide/circle-check-big"
                  size={20}
                  className="shrink-0 text-success"
                />
              ) : (
                <DynamicIcon
                  name="lucide/circle-minus"
                  size={20}
                  className="shrink-0 opacity-50"
                />
              )}
              {feature.text}
            </li>
          ))}
        </ul>
      </div>
    ),
    [cardClassName, optixFlowConfig]
  );

  const cardsContent = React.useMemo(() => {
    if (cardsSlot) return cardsSlot;
    if (!productA || !productB) return null;

    return (
      <>
        {renderCard(productA, productA.highlighted ?? true)}
        {renderCard(productB, productB.highlighted ?? false)}
      </>
    );
  }, [cardsSlot, productA, productB, renderCard]);

  const headingContent = React.useMemo(() => {
    if (!heading) return null;
    if (typeof heading === "string") {
      return (
        <h1 className={cn("mb-6 text-4xl font-semibold md:text-7xl", headingClassName)}>
          {heading}
        </h1>
      );
    }
    return <div className={headingClassName}>{heading}</div>;
  }, [heading, headingClassName]);

  const descriptionContent = React.useMemo(() => {
    if (!description) return null;
    if (typeof description === "string") {
      return (
        <p className={cn("mx-auto max-w-4xl text-muted-foreground md:text-xl", descriptionClassName)}>
          {description}
        </p>
      );
    }
    return <div className={descriptionClassName}>{description}</div>;
  }, [description, descriptionClassName]);

  const suitabilityContent = React.useMemo(() => {
    if (!suitabilityTitle && !suitabilityDescription) return null;
    return (
      <div className={suitabilityClassName}>
        {suitabilityTitle &&
          (typeof suitabilityTitle === "string" ? (
            <h2 className="mb-4 text-3xl font-semibold">{suitabilityTitle}</h2>
          ) : (
            suitabilityTitle
          ))}
        {suitabilityDescription &&
          (typeof suitabilityDescription === "string" ? (
            <p className="leading-6 text-muted-foreground md:text-lg">
              {suitabilityDescription}
            </p>
          ) : (
            suitabilityDescription
          ))}
      </div>
    );
  }, [suitabilityTitle, suitabilityDescription, suitabilityClassName]);

  const differencesContent = React.useMemo(() => {
    if (!differencesTitle && !differencesDescription) return null;
    return (
      <div className={cn("mt-16", differencesClassName)}>
        {differencesTitle &&
          (typeof differencesTitle === "string" ? (
            <h2 className="mb-4 text-3xl font-semibold">{differencesTitle}</h2>
          ) : (
            differencesTitle
          ))}
        {differencesDescription &&
          (typeof differencesDescription === "string" ? (
            <p className="leading-6 text-muted-foreground md:text-lg">
              {differencesDescription}
            </p>
          ) : (
            differencesDescription
          ))}
      </div>
    );
  }, [differencesTitle, differencesDescription, differencesClassName]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      className={cn(className)}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("container", containerClassName)}>
        <div className="text-center">
          {headingContent}
          {descriptionContent}
        </div>
        <div className="mt-28">
          <div className={cn("mx-auto grid max-w-3xl gap-6 md:grid-cols-2", cardsGridClassName)}>
            {cardsContent}
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-3xl">
          {suitabilityContent}
          {differencesContent}
        </div>
      </div>
    </Section>
  );
}
