"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

interface FeaturedAddon {
  name: string;
  description: string;
  price: string;
  priceDescription?: string;
  features: string[];
  buttonText?: string;
  buttonHref?: string;
  isHighlighted?: boolean;
}

interface AdditionalAddon {
  name: string;
  description: string;
  price: string;
}

export interface PricingAddonsFeaturedProps {
  className?: string;
  title?: string;
  subtitle?: string;
  featuredAddons?: FeaturedAddon[];
  additionalAddons?: AdditionalAddon[];
}

const defaultFeaturedAddons: FeaturedAddon[] = [
  {
    name: "Advanced Analytics",
    description: "Deep insights into your data with custom reports and dashboards",
    price: "$29",
    priceDescription: "/month",
    features: [
      "Custom dashboards",
      "Advanced reporting",
      "Data export",
      "API access",
    ],
    buttonText: "Add to Plan",
    buttonHref: "#",
  },
  {
    name: "Priority Support",
    description: "Get faster response times and dedicated support channels",
    price: "$49",
    priceDescription: "/month",
    features: [
      "24/7 support",
      "Dedicated account manager",
      "Phone support",
      "Priority queue",
    ],
    buttonText: "Add to Plan",
    buttonHref: "#",
    isHighlighted: true,
  },
  {
    name: "Enterprise Security",
    description: "Advanced security features for compliance and protection",
    price: "$79",
    priceDescription: "/month",
    features: [
      "SSO integration",
      "Audit logs",
      "Custom security policies",
      "Compliance reports",
    ],
    buttonText: "Add to Plan",
    buttonHref: "#",
  },
];

const defaultAdditionalAddons: AdditionalAddon[] = [
  {
    name: "Extra Storage",
    description: "Add 100GB of additional storage",
    price: "$10/month",
  },
  {
    name: "Additional Users",
    description: "Add 5 more team members",
    price: "$25/month",
  },
  {
    name: "Custom Domain",
    description: "Use your own domain for your workspace",
    price: "$15/month",
  },
  {
    name: "API Rate Limit Increase",
    description: "Increase your API rate limit by 10x",
    price: "$20/month",
  },
];

/**
 * PricingAddonsFeatured displays featured add-on options with a secondary list of additional add-ons.
 * Features 3 highlighted add-on cards with feature lists, plus a compact list of smaller add-ons below.
 * Ideal for upselling additional features or services to existing customers.
 *
 * Perfect for pricing pages that want to showcase optional upgrades and add-ons.
 *
 * @example
 * ```tsx
 * <PricingAddonsFeatured
 *   title="Enhance Your Plan"
 *   featuredAddons={[
 *     { name: "Analytics", description: "Deep insights", price: "$29", features: ["Feature 1"] }
 *   ]}
 *   additionalAddons={[
 *     { name: "Extra Storage", description: "100GB more", price: "$10/month" }
 *   ]}
 * />
 * ```
 */
export function PricingAddonsFeatured({
  className,
  title = "Enhance Your Plan",
  subtitle = "Add powerful features to supercharge your workflow",
  featuredAddons = defaultFeaturedAddons,
  additionalAddons = defaultAdditionalAddons,
}: PricingAddonsFeaturedProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        {/* Featured Add-ons */}
        <div className="grid gap-6 md:grid-cols-3">
          {featuredAddons.map((addon, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col rounded-2xl border p-6",
                addon.isHighlighted
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border"
              )}
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{addon.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {addon.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold">{addon.price}</span>
                {addon.priceDescription && (
                  <span className="text-muted-foreground">
                    {addon.priceDescription}
                  </span>
                )}
              </div>

              <ul className="mb-6 flex-1 space-y-3">
                {addon.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <DynamicIcon
                      name="lucide/check"
                      size={16}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Pressable
                href={addon.buttonHref}
                variant={addon.isHighlighted ? "default" : "outline"}
                size="default"
                asButton
                className="w-full justify-center"
              >
                {addon.buttonText}
              </Pressable>
            </div>
          ))}
        </div>

        {/* Additional Add-ons */}
        {additionalAddons.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-6 text-xl font-semibold">Additional Add-ons</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {additionalAddons.map((addon, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h4 className="font-medium">{addon.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {addon.description}
                    </p>
                  </div>
                  <div className="ml-4 text-right">
                    <span className="font-semibold">{addon.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
