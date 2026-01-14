import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Separator } from "../../ui/separator";
import type { OptixFlowConfig } from "../../../src/types";

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
   * First product card configuration
   */
  productA?: ProductCard;
  /**
   * Second product card configuration
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * ComparisonFeatureCards - Side-by-side feature comparison cards
 *
 * Displays two product/service cards side by side with feature checklists.
 * The highlighted card uses a bordered, shadowed style while the other uses
 * a muted background. Features show check icons for included items and
 * strikethrough with minus icons for excluded items. Includes optional
 * explanatory text sections below the cards.
 *
 * Best for: Product tier comparisons, subscription plan comparisons,
 * competitor feature analysis, service package breakdowns.
 */
export function ComparisonFeatureCards({
  heading = "Product A vs. Product B: Making the Right Choice",
  description = "Product A isn't just an alternative to Product B. It offers enhanced features and capabilities, making it easier to achieve your goals with a modern, intuitive interface designed for today's needs.",
  productA,
  productB,
  cardsSlot,
  suitabilityTitle = "Who is Product B suitable for?",
  suitabilityDescription = "Product B is a reliable solution designed for basic needs and smaller teams. It provides essential functionality for those getting started or requiring fundamental features. While it offers a straightforward interface, it may lack some of the advanced capabilities needed for scaling operations or handling complex workflows.",
  differencesTitle = "Key Differences and Considerations",
  differencesDescription = "When choosing between Product A and Product B, consider your long-term needs and growth plans. Product A offers more advanced features, better scalability, and premium support options. While Product B might be suitable for basic use cases, Product A provides a more comprehensive solution for teams looking to expand and optimize their workflows.",
  className,
  containerClassName,
  headingClassName,
  descriptionClassName,
  cardsGridClassName,
  cardClassName,
  suitabilityClassName,
  differencesClassName,
  optixFlowConfig,
}: ComparisonFeatureCardsProps): React.JSX.Element {
  const renderCard = (product: ProductCard, isHighlighted: boolean) => (
    <div
      className={cn(
        "rounded-xl p-6",
        isHighlighted
          ? "border bg-background shadow"
          : "bg-border/40",
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
                className="shrink-0 text-emerald-700"
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
  );

  const renderCards = () => {
    if (cardsSlot) return cardsSlot;

    return (
      <>
        {renderCard(productA, productA.highlighted ?? true)}
        {renderCard(productB, productB.highlighted ?? false)}
      </>
    );
  };

  return (
    <section className={cn("bg-muted/50 py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className="text-center">
          {heading && (
            typeof heading === "string" ? (
              <h1 className={cn("mb-6 text-4xl font-semibold md:text-7xl", headingClassName)}>
                {heading}
              </h1>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mx-auto max-w-4xl text-muted-foreground md:text-xl", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>
        <div className="mt-28">
          <div className={cn("mx-auto grid max-w-3xl gap-6 md:grid-cols-2", cardsGridClassName)}>
            {renderCards()}
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-3xl">
          {(suitabilityTitle || suitabilityDescription) && (
            <div className={suitabilityClassName}>
              {suitabilityTitle && (
                typeof suitabilityTitle === "string" ? (
                  <h2 className="mb-4 text-3xl font-semibold">{suitabilityTitle}</h2>
                ) : (
                  suitabilityTitle
                )
              )}
              {suitabilityDescription && (
                typeof suitabilityDescription === "string" ? (
                  <p className="leading-6 text-muted-foreground md:text-lg">
                    {suitabilityDescription}
                  </p>
                ) : (
                  suitabilityDescription
                )
              )}
            </div>
          )}
          {(differencesTitle || differencesDescription) && (
            <div className={cn("mt-16", differencesClassName)}>
              {differencesTitle && (
                typeof differencesTitle === "string" ? (
                  <h2 className="mb-4 text-3xl font-semibold">{differencesTitle}</h2>
                ) : (
                  differencesTitle
                )
              )}
              {differencesDescription && (
                typeof differencesDescription === "string" ? (
                  <p className="leading-6 text-muted-foreground md:text-lg">
                    {differencesDescription}
                  </p>
                ) : (
                  differencesDescription
                )
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
