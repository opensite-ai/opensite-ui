"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

const usePrevious = <T,>(value: T): T | undefined => {
  const [prev, setPrev] = React.useState<T | undefined>(undefined);
  const ref = React.useRef(value);

  React.useEffect(() => {
    setPrev(ref.current);
    ref.current = value;
  }, [value]);

  return prev;
};

export interface ProcessScrollImageProps {
  className?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
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
    image: imagePlaceholders[0],
    description:
      "We begin by understanding your business goals, target audience, and current challenges. This phase involves research, analysis, and strategic planning to identify opportunities.",
  },
  {
    step: "02",
    title: "Strategy & Planning",
    image: imagePlaceholders[1],
    description:
      "Based on our findings, we develop a comprehensive strategy that aligns with your objectives. This includes defining the approach, timeline, and key milestones for success.",
  },
  {
    step: "03",
    title: "Execute & Develop",
    image: imagePlaceholders[2],
    description:
      "We bring the strategy to life through careful implementation and development. Our team works collaboratively to ensure every detail meets your requirements and standards.",
  },
  {
    step: "04",
    title: "Optimize & Improve",
    image: imagePlaceholders[3],
    description:
      "We continuously monitor performance and gather feedback to refine and improve the solution. This iterative process ensures long-term success and growth.",
  },
];

const defaultProps: Partial<ProcessScrollImageProps> = {
  title: "Our Process",
  description:
    "We follow a proven methodology to deliver exceptional results for every project we undertake.",
  ctaText: "Get in touch",
  ctaUrl: "#contact",
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
  setActive: (index: number) => void;
}

const ProcessCard = ({ step, index, setActive }: ProcessCardProps) => {
  const ref = React.useRef<HTMLLIElement>(null);

  const itemInView = useInView(ref, {
    amount: 0,
    margin: "0px 0px -60% 0px",
  });

  React.useEffect(() => {
    if (itemInView) {
      setActive(index);
    }
  }, [itemInView, index, setActive]);

  return (
    <li
      ref={ref}
      className="relative flex flex-col justify-between gap-12 border-b py-8 lg:py-16"
    >
      <div className="flex w-fit items-center justify-center px-4 py-1 text-9xl tracking-tighter">
        0{index + 1}
      </div>
      <div>
        <h3 className="mb-4 text-2xl font-semibold tracking-tighter lg:text-3xl">
          {step.title}
        </h3>
        <p className="text-foreground/50">{step.description}</p>
      </div>
    </li>
  );
};

export function ProcessScrollImage({
  className,
  title = defaultProps.title,
  description = defaultProps.description,
  ctaText = defaultProps.ctaText,
  ctaUrl = defaultProps.ctaUrl,
  steps = defaultProps.steps,
  optixFlowConfig,
}: ProcessScrollImageProps) {
  const [active, setActive] = React.useState<number>(0);
  const previousActive = usePrevious(active);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-20">
          <div className="top-10 h-fit w-fit gap-3 space-y-7 py-8 lg:sticky">
            <h1 className="relative w-fit text-5xl font-semibold tracking-tight lg:text-7xl">
              {title}
            </h1>
            <p className="text-base text-foreground/50">{description}</p>
            <div className="relative h-90 overflow-hidden border">
              {previousActive !== undefined && steps && steps[previousActive] && (
                <div className="absolute top-0 h-full w-full">
                  <Img
                    src={steps[previousActive].image}
                    alt={steps[previousActive].title}
                    className="h-full w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              )}
              {steps && steps[active] && (
                <motion.div
                  initial={{ clipPath: "inset(100% 100% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  key={active}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                  }}
                  className="h-full w-full"
                >
                  <Img
                    src={steps[active].image}
                    alt={steps[active].title}
                    className="h-full w-full object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </motion.div>
              )}
            </div>
            {ctaText && ctaUrl && (
              <Pressable
                href={ctaUrl}
                variant="ghost"
                asButton
                className="flex items-center justify-start gap-2"
              >
                <DynamicIcon
                  name="lucide/corner-down-right"
                  size={20}
                  className="text-primary"
                />
                {ctaText}
              </Pressable>
            )}
          </div>
          <ul className="relative w-full lg:pl-22">
            {steps?.map((step, index) => (
              <ProcessCard
                key={index}
                step={step}
                index={index}
                setActive={setActive}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
