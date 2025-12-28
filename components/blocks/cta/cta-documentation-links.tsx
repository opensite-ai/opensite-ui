"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Card } from "../../ui/card";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface CtaDocumentationLink {
  /**
   * Icon name for the link (e.g., "lucide/file", "lucide/book")
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

export interface CtaDocumentationLinksProps {
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
   * Array of documentation links to display
   */
  links?: CtaDocumentationLink[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

const defaultLinks: CtaDocumentationLink[] = [
  {
    icon: "lucide/file",
    title: "Documentation",
    description: "Learn how to integrate our tools with your app.",
    href: "#",
  },
  {
    icon: "lucide/book",
    title: "Getting Started",
    description: "Get started with our comprehensive guides.",
    href: "#",
  },
];

/**
 * CtaDocumentationLinks - A CTA section with heading, description, dual action buttons,
 * and a grid of documentation/resource links with icons. Ideal for developer-focused
 * or documentation-heavy products that want to drive users to resources alongside
 * a primary call to action.
 *
 * @example
 * ```tsx
 * <CtaDocumentationLinks
 *   heading="Get Started Today"
 *   description="Build faster with our comprehensive documentation."
 *   primaryButtonText="Get Started"
 *   primaryButtonUrl="/signup"
 *   links={[
 *     { icon: "lucide/file", title: "Documentation", description: "Learn the basics", href: "/docs" },
 *     { icon: "lucide/book", title: "Tutorials", description: "Step-by-step guides", href: "/tutorials" }
 *   ]}
 * />
 * ```
 */
export function CtaDocumentationLinks({
  heading = "Call To Action",
  description = "Build faster with our collection of pre-built components. Speed up your development and ship features in record time.",
  primaryButtonText = "Get Started",
  primaryButtonUrl = "#",
  secondaryButtonText = "Contact Sales",
  secondaryButtonUrl = "#",
  links = defaultLinks,
  className,
}: CtaDocumentationLinksProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 flex-col gap-10 rounded-lg border p-6 shadow-sm lg:grid-cols-2 lg:px-20 lg:py-16">
          <div>
            <h4 className="mb-2 text-2xl font-bold lg:text-4xl">{heading}</h4>
            <p className="text-muted-foreground">{description}</p>
            <div className="mt-8 flex flex-col items-center gap-2 sm:flex-row">
              <Pressable
                href={primaryButtonUrl}
                variant="default"
                className="w-full sm:w-auto"
                asButton
              >
                {primaryButtonText}
                <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
              </Pressable>
              <Pressable
                href={secondaryButtonUrl}
                variant="outline"
                className="w-full sm:w-auto"
                asButton
              >
                {secondaryButtonText}
              </Pressable>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {links.map((link, index) => (
              <Pressable key={index} href={link.href}>
                <Card className="flex flex-row items-center justify-between gap-2 px-6 py-4 shadow-none hover:bg-accent">
                  <div className="flex items-start gap-2">
                    {link.icon && (
                      <DynamicIcon name={link.icon} size={16} className="shrink-0" />
                    )}
                    <div>
                      <h5 className="mb-2 leading-4 font-medium">{link.title}</h5>
                      <p className="text-sm text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                  </div>
                  <DynamicIcon name="lucide/chevron-right" size={24} />
                </Card>
              </Pressable>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
