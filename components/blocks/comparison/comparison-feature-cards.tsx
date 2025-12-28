import React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { Separator } from "../../ui/separator";

interface FeatureItem {
  text: string;
  included: boolean;
}

interface ProductCard {
  logo?: string;
  logoAlt?: string;
  name: string;
  features: FeatureItem[];
  highlighted?: boolean;
}

export interface ComparisonFeatureCardsProps {
  className?: string;
  title?: string;
  description?: string;
  productA?: ProductCard;
  productB?: ProductCard;
  suitabilityTitle?: string;
  suitabilityDescription?: string;
  differencesTitle?: string;
  differencesDescription?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultProductA: ProductCard = {
  name: "Product A",
  highlighted: true,
  features: [
    { text: "Basic Plan Available", included: true },
    { text: "Unlimited Users", included: true },
    { text: "Advanced Features", included: true },
    { text: "Partner Program", included: true },
    { text: "Live Events", included: true },
    { text: "Community Access", included: true },
    { text: "Premium Support", included: true },
  ],
};

const defaultProductB: ProductCard = {
  name: "Product B",
  highlighted: false,
  features: [
    { text: "Basic Plan Available", included: true },
    { text: "Unlimited Users", included: true },
    { text: "Basic Features", included: true },
    { text: "Partner Program", included: false },
    { text: "Live Events", included: false },
    { text: "Community Access", included: false },
    { text: "Premium Support", included: false },
  ],
};

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
  className,
  title = "Product A vs. Product B: Making the Right Choice",
  description = "Product A isn't just an alternative to Product B. It offers enhanced features and capabilities, making it easier to achieve your goals with a modern, intuitive interface designed for today's needs.",
  productA = defaultProductA,
  productB = defaultProductB,
  suitabilityTitle = "Who is Product B suitable for?",
  suitabilityDescription = "Product B is a reliable solution designed for basic needs and smaller teams. It provides essential functionality for those getting started or requiring fundamental features. While it offers a straightforward interface, it may lack some of the advanced capabilities needed for scaling operations or handling complex workflows.",
  differencesTitle = "Key Differences and Considerations",
  differencesDescription = "When choosing between Product A and Product B, consider your long-term needs and growth plans. Product A offers more advanced features, better scalability, and premium support options. While Product B might be suitable for basic use cases, Product A provides a more comprehensive solution for teams looking to expand and optimize their workflows.",
  optixFlowConfig,
}: ComparisonFeatureCardsProps) {
  const renderCard = (product: ProductCard, isHighlighted: boolean) => (
    <div
      className={cn(
        "rounded-xl p-6",
        isHighlighted
          ? "border bg-background shadow"
          : "bg-border/40"
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

  return (
    <section className={cn("bg-muted/50 py-32", className)}>
      <div className="container">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-semibold md:text-7xl">{title}</h1>
          <p className="mx-auto max-w-4xl text-muted-foreground md:text-xl">
            {description}
          </p>
        </div>
        <div className="mt-28">
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            {renderCard(productA, productA.highlighted ?? true)}
            {renderCard(productB, productB.highlighted ?? false)}
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-4 text-3xl font-semibold">{suitabilityTitle}</h2>
          <p className="leading-6 text-muted-foreground md:text-lg">
            {suitabilityDescription}
          </p>
          <h2 className="mt-16 mb-4 text-3xl font-semibold">
            {differencesTitle}
          </h2>
          <p className="leading-6 text-muted-foreground md:text-lg">
            {differencesDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
