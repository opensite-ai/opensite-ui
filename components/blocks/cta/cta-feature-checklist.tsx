"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface CtaFeatureChecklistProps {
  /**
   * Main heading text
   */
  title?: string;
  /**
   * Description text below the heading
   */
  description?: string;
  /**
   * Primary button text
   */
  buttonText?: string;
  /**
   * Primary button URL
   */
  buttonUrl?: string;
  /**
   * Array of feature items to display in the checklist
   */
  items?: string[];
  /**
   * Additional CSS classes for the section
   */
  className?: string;
}

const defaultItems = [
  "Easy Integration",
  "24/7 Support",
  "Customizable Design",
  "Scalable Performance",
  "Hundreds of Blocks",
];

/**
 * CtaFeatureChecklist - A CTA section with heading, description, action button,
 * and a checklist of key features displayed in a muted background card layout.
 * Ideal for highlighting product benefits alongside a call to action.
 *
 * @example
 * ```tsx
 * <CtaFeatureChecklist
 *   title="Start Building Today"
 *   description="Get access to all features with our starter plan."
 *   buttonText="Get Started"
 *   buttonUrl="/signup"
 *   items={["Easy Integration", "24/7 Support", "Scalable Performance"]}
 * />
 * ```
 */
export function CtaFeatureChecklist({
  title = "Call to Action",
  description = "Build faster with our collection of pre-built components. Speed up your development and ship features in record time.",
  buttonText = "Get Started",
  buttonUrl = "#",
  items = defaultItems,
  className,
}: CtaFeatureChecklistProps): React.JSX.Element {
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="max-w-5xl">
            <div className="flex flex-col items-start justify-between gap-8 rounded-lg bg-muted px-6 py-10 md:flex-row lg:px-20 lg:py-16">
              <div className="md:w-1/2">
                <h4 className="mb-1 text-2xl font-bold md:text-3xl">{title}</h4>
                <p className="text-muted-foreground">{description}</p>
                <Pressable
                  href={buttonUrl}
                  variant="default"
                  className="mt-6"
                  asButton
                >
                  {buttonText}
                  <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />
                </Pressable>
              </div>
              <div className="md:w-1/3">
                <ul className="flex flex-col space-y-2 text-sm font-medium">
                  {items.map((item, idx) => (
                    <li className="flex items-center" key={idx}>
                      <DynamicIcon
                        name="lucide/check"
                        size={16}
                        className="mr-4 shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
