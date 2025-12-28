"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface FaqBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface FaqIconBenefitsProps {
  heading?: string;
  description?: string;
  benefits?: FaqBenefit[];
  className?: string;
}

const defaultBenefits: FaqBenefit[] = [
  {
    icon: "lucide/zap",
    title: "Fast Performance",
    description:
      "Our platform is optimized for speed, ensuring your applications run smoothly and efficiently.",
  },
  {
    icon: "lucide/shield",
    title: "Secure by Default",
    description:
      "Built-in security features protect your data and applications from common vulnerabilities.",
  },
  {
    icon: "lucide/users",
    title: "Team Collaboration",
    description:
      "Work together seamlessly with built-in collaboration tools and real-time updates.",
  },
  {
    icon: "lucide/headphones",
    title: "24/7 Support",
    description:
      "Our dedicated support team is available around the clock to help you with any issues.",
  },
  {
    icon: "lucide/trending-up",
    title: "Scalable Infrastructure",
    description:
      "Easily scale your applications as your business grows without worrying about infrastructure.",
  },
  {
    icon: "lucide/code",
    title: "Developer Friendly",
    description:
      "Comprehensive APIs and documentation make it easy for developers to build and integrate.",
  },
];

export function FaqIconBenefits({
  heading = "Why choose us?",
  description = "Discover the benefits of using our platform for your business needs.",
  benefits = defaultBenefits,
  className,
}: FaqIconBenefitsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 rounded-lg border p-6 text-center"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <DynamicIcon
                  name={benefit.icon}
                  className="size-6 text-primary"
                />
              </div>
              <h3 className="text-lg font-semibold">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
