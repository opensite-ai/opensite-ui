"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface TimelineStep {
  icon: string;
  title: string;
  description: string;
}

export interface TimelineVerticalIconDashedProps {
  className?: string;
  steps?: TimelineStep[];
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSteps: TimelineStep[] = [
  {
    icon: "lucide/files",
    title: "Data Integration",
    description:
      "Connect your existing tools and platforms seamlessly. Our system automatically syncs and manages your data across all integrated services.",
  },
  {
    icon: "lucide/layout",
    title: "Custom Configuration",
    description:
      "Tailor the platform to your needs with our intuitive interface. Create powerful workflows without any technical knowledge required.",
  },
  {
    icon: "lucide/circle-arrow-out-up-right",
    title: "Scale Your Business",
    description:
      "Access comprehensive analytics and tools designed to help you grow. Monitor performance and make data-driven decisions effortlessly.",
  },
];

export function TimelineVerticalIconDashed({
  className,
  steps = defaultSteps,
}: TimelineVerticalIconDashedProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex flex-col items-center justify-center text-center sm:max-w-xl">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <span className="flex size-24 items-center justify-center rounded-full border-2 border-foreground">
                  <DynamicIcon name={step.icon} size={32} />
                </span>
                <h2 className="my-2 text-3xl font-medium">{step.title}</h2>
                <p className="font-mono text-muted-foreground">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <span
                  className="my-3 h-36 w-0.5"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom, currentColor 10%, rgba(255, 255, 255, 0) 0%)",
                    backgroundPosition: "left",
                    backgroundSize: "3px 15px",
                    backgroundRepeat: "repeat-y",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
