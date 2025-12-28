"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";

interface Feature {
  name: string;
  description?: string;
}

export interface PricingEnterpriseContactProps {
  className?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  features?: Feature[];
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
}

const defaultFeatures: Feature[] = [
  {
    name: "Unlimited everything",
    description: "No limits on projects, users, or storage",
  },
  {
    name: "Custom integrations",
    description: "Connect with your existing tools and workflows",
  },
  {
    name: "Dedicated support",
    description: "24/7 priority support with dedicated account manager",
  },
  {
    name: "SLA guarantee",
    description: "99.99% uptime guarantee with financial backing",
  },
  {
    name: "Custom contracts",
    description: "Flexible terms tailored to your organization",
  },
  {
    name: "On-premise deployment",
    description: "Deploy on your own infrastructure if needed",
  },
];

/**
 * PricingEnterpriseContact displays an enterprise-focused pricing section with contact CTA.
 * Features a list of enterprise benefits with descriptions and prominent contact buttons.
 * No specific pricing shown - designed for custom enterprise quotes.
 *
 * Ideal for enterprise sales pages or as a complement to standard pricing tiers.
 *
 * @example
 * ```tsx
 * <PricingEnterpriseContact
 *   title="Enterprise"
 *   subtitle="For large organizations"
 *   features={[
 *     { name: "Unlimited everything", description: "No limits" }
 *   ]}
 *   buttonText="Contact Sales"
 * />
 * ```
 */
export function PricingEnterpriseContact({
  className,
  title = "Enterprise",
  subtitle = "For large organizations with custom needs",
  description = "Get a custom solution tailored to your organization's specific requirements. Our enterprise plans include everything you need to scale.",
  features = defaultFeatures,
  buttonText = "Contact Sales",
  buttonHref = "#",
  secondaryButtonText = "Schedule Demo",
  secondaryButtonHref = "#",
}: PricingEnterpriseContactProps) {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border bg-linear-to-br from-muted/50 to-muted p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Left - Content */}
              <div>
                <p className="text-sm font-medium uppercase tracking-wide text-primary">
                  {subtitle}
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                  {title}
                </h2>
                <p className="mt-4 text-muted-foreground">{description}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Pressable
                    href={buttonHref}
                    variant="default"
                    size="lg"
                    asButton
                  >
                    {buttonText}
                  </Pressable>
                  <Pressable
                    href={secondaryButtonHref}
                    variant="outline"
                    size="lg"
                    asButton
                  >
                    {secondaryButtonText}
                  </Pressable>
                </div>
              </div>

              {/* Right - Features */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <DynamicIcon
                        name="lucide/check"
                        size={16}
                        className="text-primary"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.name}</h3>
                      {feature.description && (
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
