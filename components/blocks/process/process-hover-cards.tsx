"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ProcessHoverCardsProps {
  className?: string;
  title?: string;
  description?: string;
  steps?: Array<{
    step: string;
    title: string;
    image: string;
    description: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSteps = [
  {
    step: "01",
    title: "Discover & Research",
    image: imagePlaceholders[4],
    description:
      "We begin by understanding your business goals, target audience, and current challenges.",
  },
  {
    step: "02",
    title: "Strategy & Planning",
    image: imagePlaceholders[5],
    description:
      "Based on our findings, we develop a comprehensive strategy that aligns with your objectives.",
  },
  {
    step: "03",
    title: "Execute & Develop",
    image: imagePlaceholders[6],
    description:
      "We bring the strategy to life through careful implementation and development.",
  },
  {
    step: "04",
    title: "Optimize & Improve",
    image: imagePlaceholders[7],
    description:
      "We continuously monitor performance and gather feedback to refine and improve the solution.",
  },
];

const defaultProps: Partial<ProcessHoverCardsProps> = {
  title: "Our Process",
  description:
    "We follow a proven methodology to deliver exceptional results for every project we undertake.",
  steps: defaultSteps,
};

interface ProcessCardProps {
  step: {
    step: string;
    title: string;
    image: string;
    description: string;
  };
  index: number;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const ProcessCard = ({ step, index, optixFlowConfig }: ProcessCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <li
      className="group relative flex flex-col justify-between gap-12 border-b py-8 lg:py-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute top-1/2 right-10 z-10 hidden h-60 w-80 -translate-y-1/2 overflow-hidden lg:block"
          >
            <Img
              src={step.image}
              alt={step.title}
              className="h-full w-full object-cover"
              optixFlowConfig={optixFlowConfig}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-start justify-between gap-8">
        <div className="flex items-center gap-8">
          <div className="flex w-fit items-center justify-center font-mono text-sm tracking-tighter text-muted-foreground">
            0{index + 1}
          </div>
          <div>
            <h3 className="mb-2 text-2xl font-semibold tracking-tighter transition-colors group-hover:text-primary lg:text-3xl">
              {step.title}
            </h3>
            <p className="max-w-md text-foreground/50">{step.description}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export function ProcessHoverCards({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  steps = defaultProps.steps,
  optixFlowConfig,
}: ProcessHoverCardsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-16 max-w-2xl">
          <h1 className="mb-4 text-5xl font-semibold tracking-tight lg:text-7xl">
            {title}
          </h1>
          <p className="text-lg text-foreground/50">{description}</p>
        </div>
        <ul className="relative w-full">
          {steps?.map((step, index) => (
            <ProcessCard
              key={index}
              step={step}
              index={index}
              optixFlowConfig={optixFlowConfig}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
