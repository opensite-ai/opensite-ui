"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type {
  ActionConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";

export interface PricingPackagesRadioFeature {
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
   * Additional CSS classes for feature item
   */
  className?: string;
  /**
   * Additional CSS classes for feature icon
   */
  iconClassName?: string;
  /**
   * Additional CSS classes for feature text
   */
  textClassName?: string;
}

export interface PricingPackagesRadioPackage {
  /**
   * Package ID
   */
  id: string;
  /**
   * Package name
   */
  name?: React.ReactNode;
  /**
   * Package price
   */
  price?: React.ReactNode;
  /**
   * Price description/interval
   */
  priceDescription?: React.ReactNode;
  /**
   * Package description
   */
  description?: React.ReactNode;
  /**
   * Package features
   */
  features?: PricingPackagesRadioFeature[];
  /**
   * Custom slot for rendering features (overrides features array)
   */
  featuresSlot?: React.ReactNode;
  /**
   * Highlight this package
   */
  isPopular?: boolean;
  /**
   * Badge content
   */
  badge?: React.ReactNode;
  /**
   * Additional CSS classes for the package item
   */
  className?: string;
}

export interface PricingPackagesRadioProps {
  /**
   * Section title
   */
  title?: React.ReactNode;
  /**
   * Section subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Pricing packages
   */
  packages?: PricingPackagesRadioPackage[];
  /**
   * Custom slot for rendering packages (overrides packages array)
   */
  packagesSlot?: React.ReactNode;
  /**
   * Controlled selected package ID
   */
  selectedPackageId?: string;
  /**
   * Default selected package ID
   */
  defaultSelectedPackageId?: string;
  /**
   * Callback when selection changes
   */
  onSelectionChange?: (packageId: string) => void;
  /**
   * Default icon used for features
   */
  featureIcon?: React.ReactNode;
  /**
   * Default icon name for features
   */
  featureIconName?: string;
  /**
   * Primary action configuration
   */
  action?: ActionConfig;
  /**
   * Custom slot for rendering action (overrides action)
   */
  actionSlot?: React.ReactNode;
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
   * Additional CSS classes for the packages wrapper
   */
  packagesClassName?: string;
  /**
   * Additional CSS classes for package buttons
   */
  packageButtonClassName?: string;
  /**
   * Additional CSS classes for selected package
   */
  selectedPackageClassName?: string;
  /**
   * Additional CSS classes for badges
   */
  badgeClassName?: string;
  /**
   * Additional CSS classes for selection indicator
   */
  selectionIndicatorClassName?: string;
  /**
   * Additional CSS classes for package name
   */
  packageNameClassName?: string;
  /**
   * Additional CSS classes for package description
   */
  packageDescriptionClassName?: string;
  /**
   * Additional CSS classes for price
   */
  priceClassName?: string;
  /**
   * Additional CSS classes for price description
   */
  priceDescriptionClassName?: string;
  /**
   * Additional CSS classes for features list
   */
  featuresClassName?: string;
  /**
   * Additional CSS classes for feature items
   */
  featureItemClassName?: string;
  /**
   * Additional CSS classes for feature icons
   */
  featureIconClassName?: string;
  /**
   * Additional CSS classes for feature text
   */
  featureTextClassName?: string;
  /**
   * Additional CSS classes for action wrapper
   */
  actionWrapperClassName?: string;
  /**
   * Additional CSS classes for action
   */
  actionClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * PricingPackagesRadio displays pricing packages with radio button selection.
 * Users can select a package and proceed with a single CTA button.
 * Features visual selection state, popular package highlighting, and feature lists.
 *
 * Ideal for service packages where users need to choose one option before proceeding.
 *
 * @example
 * ```tsx
 * <PricingPackagesRadio
 *   title="Choose Your Package"
 *   packages={[
 *     { id: "basic", name: "Basic", price: "$499", features: [{ text: "Feature 1" }] }
 *   ]}
 *   action={{ label: "Get Started", href: "#" }}
 * />
 * ```
 */
export function PricingPackagesRadio({
  sectionId = "pricing-packages-radio",
  title,
  subtitle,
  packages = [],
  packagesSlot,
  selectedPackageId,
  defaultSelectedPackageId,
  onSelectionChange,
  featureIcon,
  featureIconName,
  action,
  actionSlot,
  background,
  spacing,
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  headerClassName,
  titleClassName,
  subtitleClassName,
  packagesClassName,
  packageButtonClassName,
  selectedPackageClassName,
  badgeClassName,
  selectionIndicatorClassName,
  packageNameClassName,
  packageDescriptionClassName,
  priceClassName,
  priceDescriptionClassName,
  featuresClassName,
  featureItemClassName,
  featureIconClassName,
  featureTextClassName,
  actionWrapperClassName,
  actionClassName,
}: PricingPackagesRadioProps): React.JSX.Element {
  const defaultSelected = useMemo(() => {
    if (defaultSelectedPackageId) return defaultSelectedPackageId;
    return packages.find((pkg) => pkg.isPopular)?.id || packages[0]?.id;
  }, [defaultSelectedPackageId, packages]);

  const [internalSelection, setInternalSelection] = useState(defaultSelected);
  const activeSelection = selectedPackageId ?? internalSelection;

  const handleSelect = (packageId: string) => {
    if (!selectedPackageId) {
      setInternalSelection(packageId);
    }
    onSelectionChange?.(packageId);
  };

  const renderFeatures = (pkg: PricingPackagesRadioPackage) => {
    if (pkg.featuresSlot) return pkg.featuresSlot;
    if (!pkg.features || pkg.features.length === 0) return null;

    return (
      <ul className={cn("mt-4 grid gap-2 sm:grid-cols-2", featuresClassName)}>
        {pkg.features.map((feature, index) => {
          const iconName = feature.iconName || featureIconName;
          const resolvedIcon =
            feature.icon ??
            featureIcon ??
            (iconName ? (
              <DynamicIcon
                name={iconName}
                size={16}
                className={cn(
                  "shrink-0 text-primary",
                  featureIconClassName,
                  feature.iconClassName,
                )}
              />
            ) : null);

          return (
            <li
              key={index}
              className={cn(
                "flex items-center gap-2",
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

  const renderPackages = () => {
    if (packagesSlot) return packagesSlot;
    if (!packages || packages.length === 0) return null;

    return (
      <div className={cn("mx-auto max-w-3xl space-y-4", packagesClassName)}>
        {packages.map((pkg) => {
          const isSelected = activeSelection === pkg.id;
          const badgeContent =
            pkg.badge ?? (pkg.isPopular ? "Most Popular" : null);

          return (
            <button
              key={pkg.id}
              onClick={() => handleSelect(pkg.id)}
              className={cn(
                "relative w-full rounded-2xl border p-6 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border hover:border-primary/50",
                packageButtonClassName,
                isSelected ? selectedPackageClassName : null,
                pkg.className,
              )}
            >
              {badgeContent && (
                <span
                  className={cn(
                    "absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground",
                    badgeClassName,
                  )}
                >
                  {badgeContent}
                </span>
              )}

              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                    isSelected
                      ? "border-primary bg-primary"
                      : "border-muted-foreground",
                    selectionIndicatorClassName,
                  )}
                >
                  {isSelected && (
                    <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      {pkg.name &&
                        (typeof pkg.name === "string" ? (
                          <h3
                            className={cn(
                              "font-semibold",
                              packageNameClassName,
                            )}
                          >
                            {pkg.name}
                          </h3>
                        ) : (
                          <div className={packageNameClassName}>{pkg.name}</div>
                        ))}
                      {pkg.description &&
                        (typeof pkg.description === "string" ? (
                          <p
                            className={cn(
                              "mt-1 text-sm text-muted-foreground",
                              packageDescriptionClassName,
                            )}
                          >
                            {pkg.description}
                          </p>
                        ) : (
                          <div className={packageDescriptionClassName}>
                            {pkg.description}
                          </div>
                        ))}
                    </div>
                    <div className="text-right">
                      {pkg.price && (
                        <span
                          className={cn("text-2xl font-bold", priceClassName)}
                        >
                          {pkg.price}
                        </span>
                      )}
                      {pkg.priceDescription && (
                        <span
                          className={cn(
                            "text-sm text-muted-foreground",
                            priceDescriptionClassName,
                          )}
                        >
                          {pkg.priceDescription}
                        </span>
                      )}
                    </div>
                  </div>

                  {renderFeatures(pkg)}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderAction = () => {
    if (actionSlot) return actionSlot;
    if (!action) return null;

    const {
      label,
      icon,
      iconAfter,
      children,
      className: actionItemClassName,
      ...pressableProps
    } = action;

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

  return (
    <Section
      id={sectionId}
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

        {renderPackages()}

        <div className={cn("mx-auto mt-8 max-w-md", actionWrapperClassName)}>
          {renderAction()}
        </div>
      </div>
    </Section>
  );
}
