"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card } from "../../ui/card";

export interface CtaEnterpriseSplitLink {
  /**
   * Icon name for the link
   */
  icon?: string;
  /**
   * Title of the link
   */
  title?: string;
  /**
   * Description of the link
   */
  description?: string;
  /**
   * URL for the link
   */
  href?: string;
}

export interface CtaEnterpriseSplitProps {
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Primary button text
   */
  primaryButtonText?: string;
  /**
   * Primary button URL
   */
  primaryButtonUrl?: string;
  /**
   * Secondary button text
   */
  secondaryButtonText?: string;
  /**
   * Secondary button URL
   */
  secondaryButtonUrl?: string;
  /**
   * Array of resource links to display
   */
  links?: CtaEnterpriseSplitLink[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

const defaultLinks: CtaEnterpriseSplitLink[] = [
  {
    icon: "lucide/file-text",
    title: "Documentation",
    description: "Comprehensive guides and API references.",
    href: "#",
  },
  {
    icon: "lucide/play-circle",
    title: "Live Demo",
    description: "See our platform in action.",
    href: "#",
  },
  {
    icon: "lucide/message-circle",
    title: "Contact Sales",
    description: "Talk to our enterprise team.",
    href: "#",
  },
];

/**
 * CtaEnterpriseSplit - A split-layout CTA with enterprise messaging and buttons
 * on one side, and documentation/demo links with icons on the other. Perfect
 * for B2B and enterprise products.
 *
 * @example
 * ```tsx
 * <CtaEnterpriseSplit
 *   heading="Enterprise Ready"
 *   description="Built for scale with enterprise-grade security."
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   links={[
 *     { icon: "lucide/file-text", title: "Docs", description: "Read our docs", href: "/docs" }
 *   ]}
 * />
 * ```
 */
export function CtaEnterpriseSplit({
  heading = "Enterprise Ready",
  description = "Built for scale with enterprise-grade security, compliance, and support. Trusted by Fortune 500 companies worldwide.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Contact Sales",
  secondaryButtonUrl = "#",
  links = defaultLinks,
  className,
}: CtaEnterpriseSplitProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">{heading}</h2>
            <p className="mb-8 text-lg text-muted-foreground">{description}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Pressable
                href={primaryButtonUrl}
                variant="default"
                size="lg"
                asButton
              >
                {primaryButtonText}
                <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
              </Pressable>
              <Pressable
                href={secondaryButtonUrl}
                variant="outline"
                size="lg"
                asButton
              >
                {secondaryButtonText}
              </Pressable>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {links.map((link, index) => (
              <Pressable key={index} href={link.href}>
                <Card className="flex items-start gap-4 p-6 transition-colors hover:bg-accent">
                  {link.icon && (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <DynamicIcon
                        name={link.icon}
                        size={20}
                        className="text-primary"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{link.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                  <DynamicIcon
                    name="lucide/arrow-right"
                    size={20}
                    className="ml-auto shrink-0 text-muted-foreground"
                  />
                </Card>
              </Pressable>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
