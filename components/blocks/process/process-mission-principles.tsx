"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface ProcessMissionPrinciplesProps {
  className?: string;
  missionLabel?: string;
  missionTitle?: string;
  missionDescription?: string;
  principlesLabel?: string;
  principles?: Array<{
    number: string;
    title: string;
    description: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultPrinciples = [
  {
    number: "01",
    title: "Customer First",
    description:
      "Every decision we make starts with understanding how it impacts our customers. Their success is our success.",
  },
  {
    number: "02",
    title: "Continuous Improvement",
    description:
      "We believe in constant iteration and learning. There's always a better way, and we're committed to finding it.",
  },
  {
    number: "03",
    title: "Transparency",
    description:
      "Open communication builds trust. We share our progress, challenges, and learnings with all stakeholders.",
  },
  {
    number: "04",
    title: "Quality Over Speed",
    description:
      "While we move fast, we never compromise on quality. Excellence is a habit, not an exception.",
  },
  {
    number: "05",
    title: "Collaboration",
    description:
      "Great things are built together. We foster an environment where diverse perspectives drive innovation.",
  },
  {
    number: "06",
    title: "Accountability",
    description:
      "We own our commitments and deliver on our promises. When we fall short, we learn and improve.",
  },
];

const defaultProps: Partial<ProcessMissionPrinciplesProps> = {
  missionLabel: "OUR MISSION",
  missionTitle: "Building the Future Together",
  missionDescription:
    "We're on a mission to transform how businesses operate by providing innovative solutions that drive growth, efficiency, and success. Our commitment to excellence guides everything we do.",
  principlesLabel: "OUR PRINCIPLES",
  principles: defaultPrinciples,
};

export function ProcessMissionPrinciples({
  className,
  missionLabel = defaultProps.missionLabel,
  missionTitle = defaultProps.missionTitle,
  missionDescription = defaultProps.missionDescription,
  principlesLabel = defaultProps.principlesLabel,
  principles = defaultProps.principles,
}: ProcessMissionPrinciplesProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-20 max-w-3xl">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            {missionLabel}
          </span>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight lg:text-5xl">
            {missionTitle}
          </h1>
          <p className="text-lg text-foreground/50 leading-relaxed">
            {missionDescription}
          </p>
        </div>

        <div>
          <span className="mb-8 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            {principlesLabel}
          </span>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {principles?.map((principle, index) => (
              <div
                key={index}
                className="group relative rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <span className="absolute -top-3 -left-3 flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {principle.number}
                </span>
                <div className="pt-4">
                  <h3 className="mb-3 text-xl font-semibold tracking-tight">
                    {principle.title}
                  </h3>
                  <p className="text-foreground/50 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
