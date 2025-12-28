"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { DynamicIcon } from "../../ui/dynamic-icon";

export interface ProcessExpandableTimelineProps {
  className?: string;
  title?: string;
  description?: string;
  steps?: Array<{
    title: string;
    description: string;
    expandedContent?: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSteps = [
  {
    title: "Discovery Phase",
    description: "Understanding your needs and goals",
    expandedContent:
      "During the discovery phase, we conduct in-depth interviews, analyze your current systems, and identify opportunities for improvement. This foundational work ensures we build solutions that truly address your challenges.",
  },
  {
    title: "Planning & Strategy",
    description: "Creating a roadmap for success",
    expandedContent:
      "We develop a comprehensive project plan that outlines milestones, deliverables, and timelines. Our strategic approach ensures alignment between technical implementation and business objectives.",
  },
  {
    title: "Design & Prototyping",
    description: "Visualizing the solution",
    expandedContent:
      "Our design team creates wireframes, mockups, and interactive prototypes that bring your vision to life. We iterate based on your feedback to ensure the final design meets your expectations.",
  },
  {
    title: "Development & Testing",
    description: "Building with quality in mind",
    expandedContent:
      "Using agile methodologies, we develop your solution in sprints with regular demos and feedback sessions. Comprehensive testing ensures reliability and performance across all scenarios.",
  },
  {
    title: "Launch & Support",
    description: "Going live with confidence",
    expandedContent:
      "We handle deployment with care, providing training and documentation for your team. Our ongoing support ensures your solution continues to perform optimally as your needs evolve.",
  },
];

const defaultProps: Partial<ProcessExpandableTimelineProps> = {
  title: "How We Work",
  description:
    "Click on each step to learn more about our process and methodology.",
  steps: defaultSteps,
};

const CornerConnector = ({ className }: { className?: string }) => (
  <svg
    width="22"
    height="20"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <line
      x1="0.607422"
      y1="2.57422"
      x2="21.5762"
      y2="2.57422"
      stroke="currentColor"
      strokeWidth="4"
    />
    <line
      x1="19.5762"
      y1="19.624"
      x2="19.5762"
      y2="4.57422"
      stroke="currentColor"
      strokeWidth="4"
    />
  </svg>
);

export function ProcessExpandableTimeline({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  steps = defaultProps.steps,
}: ProcessExpandableTimelineProps) {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-16 max-w-2xl">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight lg:text-5xl">
            {title}
          </h1>
          <p className="text-lg text-foreground/50">{description}</p>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-0">
            {steps?.map((step, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => toggleExpand(index)}
                  className="group relative flex w-full items-start gap-6 border-b py-6 pl-16 text-left transition-colors hover:bg-muted/30"
                >
                  <div
                    className={cn(
                      "absolute left-0 flex size-12 items-center justify-center rounded-full border-2 bg-background transition-colors",
                      expandedIndex === index
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground group-hover:border-primary"
                    )}
                  >
                    <span className="text-sm font-semibold">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <CornerConnector className="absolute right-4 top-4 text-muted-foreground/30" />

                  <div className="flex-1 pr-12">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                        {step.title}
                      </h3>
                      <DynamicIcon
                        name={
                          expandedIndex === index
                            ? "lucide/chevron-up"
                            : "lucide/chevron-down"
                        }
                        size={20}
                        className="text-muted-foreground"
                      />
                    </div>
                    <p className="mt-1 text-foreground/50">{step.description}</p>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedIndex === index && step.expandedContent && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-b bg-muted/20 py-6 pl-16 pr-6">
                        <p className="text-foreground/70">{step.expandedContent}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
