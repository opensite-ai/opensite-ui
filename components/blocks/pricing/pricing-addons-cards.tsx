"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

interface AddonCard {
  name: string;
  description: string;
  price: string;
  priceDescription?: string;
  features: string[];
  buttonText?: string;
  buttonHref?: string;
}

export interface PricingAddonsCardsProps {
  className?: string;
  title?: string;
  subtitle?: string;
  addons?: AddonCard[];
}

const defaultAddons: AddonCard[] = [
  {
    name: "Analytics Pro",
    description: "Advanced analytics and reporting tools",
    price: "$19",
    priceDescription: "/month",
    features: [
      "Custom dashboards",
      "Real-time analytics",
      "Export to CSV/PDF",
      "API access",
    ],
    buttonText: "Add to Plan",
    buttonHref: "#",
  },
  {
    name: "Team Collaboration",
    description: "Enhanced team features and workflows",
    price: "$29",
    priceDescription: "/month",
    features: [
      "Shared workspaces",
      "Team chat",
      "Task assignments",
      "Activity feed",
    ],
    buttonText: "Add to Plan",
    buttonHref: "#",
  },
  {
    name: "Security Suite",
    description: "Enterprise-grade security features",
    price: "$39",
    priceDescription: "/month",
    features: [
      "SSO integration",
      "Audit logs",
      "2FA enforcement",
      "IP allowlisting",
    ],
    buttonText: "Add to Plan",
    buttonHref: "#",
  },
];

/**
 * PricingAddonsCards displays a row of 3 add-on cards with feature lists.
 * Each card includes a name, description, price, feature checklist, and CTA button.
 * Simpler version of PricingAddonsFeatured without the additional add-ons list.
 *
 * Ideal for showcasing optional upgrades or premium features.
 *
 * @example
 * ```tsx
 * <PricingAddonsCards
 *   title="Power-ups"
 *   subtitle="Enhance your experience"
 *   addons={[
 *     { name: "Analytics", description: "Deep insights", price: "$19", features: ["Feature 1"] }
 *   ]}
 * />
 * ```
 */
export function PricingAddonsCards({
  className,
  title = "Power-ups",
  subtitle = "Add extra features to enhance your experience",
  addons = defaultAddons,
}: PricingAddonsCardsProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {addons.map((addon, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl border p-6"
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
                variant="outline"
                size="default"
                asButton
                className="w-full justify-center"
              >
                {addon.buttonText}
              </Pressable>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
