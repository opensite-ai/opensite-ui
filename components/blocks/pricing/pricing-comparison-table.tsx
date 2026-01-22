"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Separator } from "../../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Section } from "../../ui/section";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface PricingComparisonTableFeature {
  /**
   * Feature label
   */
  name?: React.ReactNode;
  /**
   * Values per plan id
   */
  values?: Record<string, boolean | React.ReactNode>;
  /**
   * Additional CSS classes for the row
   */
  className?: string;
}

export interface PricingComparisonTablePlanFeature {
  /**
   * Feature text
   */
  text?: React.ReactNode;
  /**
   * Optional icon element
   */
  icon?: React.ReactNode;
  /**
   * Optional icon name for DynamicIcon
   */
  iconName?: string;
  /**
   * Additional CSS classes for the feature item
   */
  className?: string;
  /**
   * Additional CSS classes for the icon
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for the text
   */
  textClassName?: string;
}

export interface PricingComparisonTablePlan {
  /**
   * Unique plan id
   */
  id?: string;
  /**
   * Plan name
   */
  name?: React.ReactNode;
  /**
   * Plan price
   */
  price?: React.ReactNode;
  /**
   * Plan description
   */
  description?: React.ReactNode;
  /**
   * Plan feature list
   */
  features?: PricingComparisonTablePlanFeature[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Action configuration
   */
  action?: ActionConfig;
  /**
   * Custom slot for rendering action (overrides action)
   */
  actionSlot?: React.ReactNode;
  /**
   * Highlight this plan
   */
  isHighlighted?: boolean;
  /**
   * Additional CSS classes for the card
   */
  className?: string;
}

export interface PricingComparisonTableProps {
  /**
   * Section title
   */
  title?: React.ReactNode;
  /**
   * Section subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Plans to compare
   */
  plans?: PricingComparisonTablePlan[];
  /**
   * Custom slot for rendering plans (overrides plans array)
   */
  plansSlot?: React.ReactNode;
  /**
   * Comparison rows
   */
  comparisonFeatures?: PricingComparisonTableFeature[];
  /**
   * Custom slot for rendering comparison table (overrides comparisonFeatures)
   */
  comparisonSlot?: React.ReactNode;
  /**
   * Comparison table heading
   */
  comparisonHeading?: React.ReactNode;
  /**
   * Feature column label
   */
  featureColumnLabel?: React.ReactNode;
  /**
   * Default icon for feature items
   */
  featureIcon?: React.ReactNode;
  /**
   * Default icon name for feature items
   */
  featureIconName?: string;
  /**
   * Icon for available features in comparison table
   */
  availableIcon?: React.ReactNode;
  /**
   * Icon for unavailable features in comparison table
   */
  unavailableIcon?: React.ReactNode;
  /**
   * Icon name for available features
   */
  availableIconName?: string;
  /**
   * Icon name for unavailable features
   */
  unavailableIconName?: string;
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
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Additional CSS classes for the plans grid
   */
  plansGridClassName?: string;
  /**
   * Additional CSS classes for plan cards
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for highlighted cards
   */
  highlightedCardClassName?: string;
  /**
   * Additional CSS classes for card title
   */
  cardTitleClassName?: string;
  /**
   * Additional CSS classes for card description
   */
  cardDescriptionClassName?: string;
  /**
   * Additional CSS classes for price
   */
  priceClassName?: string;
  /**
   * Additional CSS classes for features list
   */
  featuresClassName?: string;
  /**
   * Additional CSS classes for feature items
   */
  featureItemClassName?: string;
  /**
   * Additional CSS classes for feature icon
   */
  featureIconClassName?: string;
  /**
   * Additional CSS classes for feature text
   */
  featureTextClassName?: string;
  /**
   * Additional CSS classes for action
   */
  actionClassName?: string;
  /**
   * Additional CSS classes for separator
   */
  separatorClassName?: string;
  /**
   * Additional CSS classes for comparison heading
   */
  comparisonHeadingClassName?: string;
  /**
   * Additional CSS classes for table
   */
  tableClassName?: string;
  /**
   * Additional CSS classes for table head
   */
  tableHeadClassName?: string;
  /**
   * Additional CSS classes for table rows
   */
  tableRowClassName?: string;
  /**
   * Additional CSS classes for table cells
   */
  tableCellClassName?: string;
}

/**
 * PricingComparisonTable displays two pricing plans side-by-side with a detailed feature comparison table.
 * Each plan card includes features, pricing, and CTA button, followed by a comprehensive comparison matrix.
 * Uses check/minus icons to indicate feature availability across plans.
 *
 * Ideal for businesses with two main tiers (Pro/Enterprise) that want to highlight feature differences.
 *
 * @example
 * ```tsx
 * <PricingComparisonTable
 *   title="Compare Plans"
 *   plans={[
 *     { id: "pro", name: "Pro", price: "$49", features: [{ text: "Feature 1" }], action: { label: "Get Started" } },
 *     { id: "enterprise", name: "Enterprise", price: "Custom", features: [{ text: "Feature 1" }], action: { label: "Contact Sales" } }
 *   ]}
 *   comparisonFeatures={[
 *     { name: "API access", values: { pro: true, enterprise: true } }
 *   ]}
 * />
 * ```
 */
export function PricingComparisonTable({
  title,
  subtitle,
  plans,
  plansSlot,
  comparisonFeatures,
  comparisonSlot,
  comparisonHeading,
  featureColumnLabel,
  featureIcon,
  featureIconName = "lucide/check",
  availableIcon,
  unavailableIcon,
  availableIconName = "lucide/check",
  unavailableIconName = "lucide/minus",
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  headerClassName,
  titleClassName,
  subtitleClassName,
  plansGridClassName,
  cardClassName,
  highlightedCardClassName,
  cardTitleClassName,
  cardDescriptionClassName,
  priceClassName,
  featuresClassName,
  featureItemClassName,
  featureIconClassName,
  featureTextClassName,
  actionClassName,
  separatorClassName,
  comparisonHeadingClassName,
  tableClassName,
  tableHeadClassName,
  tableRowClassName,
  tableCellClassName,
}: PricingComparisonTableProps): React.JSX.Element {
  const resolvedPlanIds = plans.map(
    (plan, index) => plan.id ?? `plan-${index}`,
  );

  const renderPlanFeatures = (plan: PricingComparisonTablePlan) => {
    if (plan.featuresSlot) return plan.featuresSlot;
    if (!plan.features || plan.features.length === 0) return null;

    return (
      <ul className={cn("space-y-3", featuresClassName)}>
        {plan.features.map((feature, featureIndex) => {
          const resolvedIcon =
            feature.icon ??
            featureIcon ??
            (feature.iconName || featureIconName ? (
              <DynamicIcon
                name={feature.iconName || featureIconName}
                size={18}
                className={cn(
                  "mt-0.5 shrink-0 text-primary",
                  featureIconClassName,
                  feature.iconClassName,
                )}
              />
            ) : null);

          return (
            <li
              key={featureIndex}
              className={cn(
                "flex items-start gap-3",
                featureItemClassName,
                feature.className,
              )}
            >
              {resolvedIcon}
              {feature.text &&
                (typeof feature.text === "string" ? (
                  <span
                    className={cn(
                      "text-sm text-muted-foreground",
                      featureTextClassName,
                      feature.textClassName,
                    )}
                  >
                    {feature.text}
                  </span>
                ) : (
                  <div
                    className={cn(
                      "text-sm text-muted-foreground",
                      featureTextClassName,
                      feature.textClassName,
                    )}
                  >
                    {feature.text}
                  </div>
                ))}
            </li>
          );
        })}
      </ul>
    );
  };

  const renderAction = (plan: PricingComparisonTablePlan) => {
    if (plan.actionSlot) return plan.actionSlot;
    if (!plan.action) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionItemClassName,
      ...pressableProps
    } = plan.action;

    return (
      <Pressable
        asButton
        className={cn(
          "w-full justify-center",
          actionClassName,
          actionItemClassName,
        )}
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
  };

  const renderPlans = () => {
    if (plansSlot) return plansSlot;
    if (!plans || plans.length === 0) return null;

    return (
      <div className={cn("grid gap-6 md:grid-cols-2", plansGridClassName)}>
        {plans.map((plan, index) => (
          <Card
            key={resolvedPlanIds[index]}
            className={cn(
              "flex flex-col",
              plan.isHighlighted ? "border-primary shadow-lg" : null,
              cardClassName,
              plan.isHighlighted ? highlightedCardClassName : null,
              plan.className,
            )}
          >
            <CardHeader>
              {plan.name &&
                (typeof plan.name === "string" ? (
                  <CardTitle className={cn("text-xl", cardTitleClassName)}>
                    {plan.name}
                  </CardTitle>
                ) : (
                  <div className={cardTitleClassName}>{plan.name}</div>
                ))}
              {plan.description &&
                (typeof plan.description === "string" ? (
                  <p
                    className={cn(
                      "text-sm text-muted-foreground",
                      cardDescriptionClassName,
                    )}
                  >
                    {plan.description}
                  </p>
                ) : (
                  <div className={cardDescriptionClassName}>
                    {plan.description}
                  </div>
                ))}
              {plan.price && (
                <div className="mt-4">
                  <span className={cn("text-4xl font-bold", priceClassName)}>
                    {plan.price}
                  </span>
                </div>
              )}
            </CardHeader>

            <CardContent className="flex-1">
              {renderPlanFeatures(plan)}
            </CardContent>

            <CardFooter>{renderAction(plan)}</CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  const renderComparisonValue = (
    value: boolean | React.ReactNode | undefined,
  ) => {
    if (typeof value === "boolean") {
      if (value) {
        return (
          availableIcon ?? (
            <DynamicIcon
              name={availableIconName}
              size={18}
              className="mx-auto text-primary"
            />
          )
        );
      }
      return (
        unavailableIcon ?? (
          <DynamicIcon
            name={unavailableIconName}
            size={18}
            className="mx-auto text-muted-foreground"
          />
        )
      );
    }

    return value ? <span className="text-sm">{value}</span> : null;
  };

  const renderComparisonTable = () => {
    if (comparisonSlot) return comparisonSlot;
    if (!comparisonFeatures || comparisonFeatures.length === 0) return null;

    return (
      <div>
        {comparisonHeading &&
          (typeof comparisonHeading === "string" ? (
            <h3
              className={cn(
                "mb-6 text-xl font-semibold",
                comparisonHeadingClassName,
              )}
            >
              {comparisonHeading}
            </h3>
          ) : (
            <div className={comparisonHeadingClassName}>
              {comparisonHeading}
            </div>
          ))}
        <Table className={tableClassName}>
          <TableHeader>
            <TableRow className={tableRowClassName}>
              <TableHead className={cn("w-1/2", tableHeadClassName)}>
                {featureColumnLabel}
              </TableHead>
              {plans.map((plan, index) => (
                <TableHead
                  key={resolvedPlanIds[index]}
                  className={cn("text-center", tableHeadClassName)}
                >
                  {plan.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonFeatures.map((feature, index) => (
              <TableRow
                key={index}
                className={cn("border-b", tableRowClassName, feature.className)}
              >
                <TableCell className={cn("font-medium", tableCellClassName)}>
                  {feature.name}
                </TableCell>
                {resolvedPlanIds.map((planId) => (
                  <TableCell
                    key={planId}
                    className={cn("text-center", tableCellClassName)}
                  >
                    {renderComparisonValue(feature.values?.[planId])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={cn("mx-auto", containerClassName)}>
        <div
          className={cn("mx-auto mb-12 max-w-2xl text-center", headerClassName)}
        >
          {title &&
            (typeof title === "string" ? (
              <h2
                className={cn(
                  "text-3xl font-bold tracking-tight sm:text-4xl",
                  titleClassName,
                )}
              >
                {title}
              </h2>
            ) : (
              <div className={titleClassName}>{title}</div>
            ))}
          {subtitle &&
            (typeof subtitle === "string" ? (
              <p
                className={cn(
                  "mt-4 text-lg text-muted-foreground",
                  subtitleClassName,
                )}
              >
                {subtitle}
              </p>
            ) : (
              <div className={subtitleClassName}>{subtitle}</div>
            ))}
        </div>

        <div className={cn("mx-auto max-w-4xl", containerClassName)}>
          {renderPlans()}
          <Separator className={cn("my-12", separatorClassName)} />
          {renderComparisonTable()}
        </div>
      </div>
    </Section>
  );
}
