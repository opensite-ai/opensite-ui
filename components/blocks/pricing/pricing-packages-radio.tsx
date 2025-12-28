"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

interface PricingPackage {
  id: string;
  name: string;
  price: string;
  priceDescription?: string;
  description?: string;
  features: string[];
  isPopular?: boolean;
}

export interface PricingPackagesRadioProps {
  className?: string;
  title?: string;
  subtitle?: string;
  packages?: PricingPackage[];
  buttonText?: string;
  buttonHref?: string;
}

const defaultPackages: PricingPackage[] = [
  {
    id: "basic",
    name: "Basic Package",
    price: "$499",
    priceDescription: "/month",
    description: "Essential marketing services",
    features: [
      "Social media management",
      "Monthly content calendar",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth Package",
    price: "$999",
    priceDescription: "/month",
    description: "Comprehensive marketing solution",
    features: [
      "Everything in Basic",
      "SEO optimization",
      "Paid advertising",
      "Weekly reporting",
      "Priority support",
    ],
    isPopular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise Package",
    price: "$2,499",
    priceDescription: "/month",
    description: "Full-service marketing agency",
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "Custom strategy",
      "24/7 support",
      "Quarterly reviews",
    ],
  },
];

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
 *     { id: "basic", name: "Basic", price: "$499", features: ["Feature 1"] }
 *   ]}
 *   buttonText="Get Started"
 * />
 * ```
 */
export function PricingPackagesRadio({
  className,
  title = "Marketing Packages",
  subtitle = "Select the package that fits your business needs",
  packages = defaultPackages,
  buttonText = "Get Started",
  buttonHref = "#",
}: PricingPackagesRadioProps) {
  const [selectedPackage, setSelectedPackage] = useState(
    packages.find((p) => p.isPopular)?.id || packages[0]?.id
  );

  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              className={cn(
                "relative w-full rounded-2xl border p-6 text-left transition-all",
                selectedPackage === pkg.id
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border hover:border-primary/50"
              )}
            >
              {pkg.isPopular && (
                <span className="absolute -top-3 right-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </span>
              )}

              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                    selectedPackage === pkg.id
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  )}
                >
                  {selectedPackage === pkg.id && (
                    <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{pkg.name}</h3>
                      {pkg.description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {pkg.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold">{pkg.price}</span>
                      {pkg.priceDescription && (
                        <span className="text-sm text-muted-foreground">
                          {pkg.priceDescription}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <DynamicIcon
                          name="lucide/check"
                          size={16}
                          className="shrink-0 text-primary"
                        />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-md">
          <Pressable
            href={buttonHref}
            variant="default"
            size="lg"
            asButton
            className="w-full justify-center"
          >
            {buttonText}
          </Pressable>
        </div>
      </div>
    </section>
  );
}
