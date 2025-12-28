"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { Separator } from "../../ui/separator";

interface FeatureGroup {
  title: string;
  features: string[];
}

export interface PricingSingleCardProps {
  className?: string;
  heading?: string;
  description?: string;
  price?: string;
  priceDescription?: string;
  featureGroups?: FeatureGroup[];
  buttonText?: string;
  buttonHref?: string;
}

const defaultFeatureGroups: FeatureGroup[] = [
  {
    title: "Core Features",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "API access",
    ],
  },
  {
    title: "Collaboration",
    features: [
      "Team workspaces",
      "Real-time editing",
      "Comments & mentions",
      "Version history",
    ],
  },
  {
    title: "Security",
    features: [
      "SSO authentication",
      "Role-based access",
      "Audit logs",
      "Data encryption",
    ],
  },
];

/**
 * PricingSingleCard displays a single comprehensive pricing card with grouped features.
 * Features are organized into sections with titles, making it easy to understand what's included.
 * Ideal for products with a single pricing tier or for highlighting a featured plan.
 *
 * Perfect for simple pricing pages or as a standalone pricing component within a larger page.
 *
 * @example
 * ```tsx
 * <PricingSingleCard
 *   heading="Professional Plan"
 *   description="Everything you need to grow your business"
 *   price="$99"
 *   featureGroups={[
 *     { title: "Core Features", features: ["Feature 1", "Feature 2"] }
 *   ]}
 *   buttonText="Get Started"
 * />
 * ```
 */
export function PricingSingleCard({
  className,
  heading = "Professional Plan",
  description = "Everything you need to build and scale your product",
  price = "$99",
  priceDescription = "per month, billed annually",
  featureGroups = defaultFeatureGroups,
  buttonText = "Start Free Trial",
  buttonHref = "#",
}: PricingSingleCardProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border bg-card p-8 shadow-lg md:p-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {heading}
              </h2>
              <p className="mt-2 text-muted-foreground">{description}</p>

              <div className="mt-8">
                <span className="text-5xl font-bold">{price}</span>
                <p className="mt-2 text-sm text-muted-foreground">
                  {priceDescription}
                </p>
              </div>

              <Pressable
                href={buttonHref}
                variant="default"
                size="lg"
                asButton
                className="mt-8 w-full justify-center sm:w-auto sm:px-12"
              >
                {buttonText}
              </Pressable>
            </div>

            <Separator className="my-8" />

            <div className="grid gap-8 md:grid-cols-3">
              {featureGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <h3 className="mb-4 font-semibold">{group.title}</h3>
                  <ul className="space-y-3">
                    {group.features.map((feature, featureIndex) => (
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
