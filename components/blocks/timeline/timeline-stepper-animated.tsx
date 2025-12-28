"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface TimelineStep {
  title: string;
  imageSrc: string;
  description: string;
}

export interface TimelineStepperAnimatedProps {
  className?: string;
  heading?: string;
  steps?: TimelineStep[];
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultSteps: TimelineStep[] = [
  {
    title: "Introduction",
    imageSrc: blockBrandedIconsAndPlaceholders.placeholder1,
    description:
      "Welcome to our step-by-step guide. This introduction will help you get started with the process and understand what to expect.",
  },
  {
    title: "Personal Information",
    imageSrc: blockBrandedIconsAndPlaceholders.placeholder2,
    description:
      "In this section, we'll collect some basic information about you to personalize your experience and provide better recommendations.",
  },
  {
    title: "Address Details",
    imageSrc: blockBrandedIconsAndPlaceholders.placeholder3,
    description:
      "Please provide your address details so we can deliver your products to the right location and calculate shipping costs.",
  },
  {
    title: "Review & Submit",
    imageSrc: blockBrandedIconsAndPlaceholders.placeholder4,
    description:
      "Take a moment to review all the information you've provided before finalizing your submission. You can go back to any step.",
  },
];

const ProcessBar: React.FC<{
  currentStep: number;
  steps: TimelineStep[];
}> = ({ currentStep, steps }) => (
  <div className="relative w-full scale-75">
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={step.title}>
          <div className="flex flex-col items-center">
            <motion.div
              className={cn(
                "z-10 flex h-8 w-8 items-center justify-center rounded-full",
                index <= currentStep
                  ? "bg-neutral-800 text-white"
                  : "bg-gray-200 text-white dark:bg-gray-800 dark:text-gray-600"
              )}
              animate={{ scale: 1.02 }}
            >
              {index < currentStep ? (
                <DynamicIcon name="lucide/check" size={17} />
              ) : (
                <DynamicIcon name="lucide/circle" size={17} />
              )}
            </motion.div>
          </div>
          {index < steps.length - 1 && (
            <div className="relative grow">
              <div className="absolute -top-1 h-1.5 w-full bg-muted" />
              <motion.div
                className="absolute -top-1 h-1.5 w-full bg-primary"
                initial={{ width: "0%" }}
                animate={{
                  width: index < currentStep ? "100%" : "0%",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const StepperContent: React.FC<{
  step: TimelineStep;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}> = ({ step, optixFlowConfig }) => {
  return (
    <div className="my-4 flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-muted p-6 text-center">
      <motion.div
        key={step.imageSrc}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex h-[200px] w-[500px] items-center justify-center overflow-hidden"
      >
        <Img
          src={step.imageSrc}
          alt={step.title}
          className="w-[500px]"
          optixFlowConfig={optixFlowConfig}
        />
      </motion.div>
      <p className="mt-6 px-10 text-base leading-snug font-normal tracking-tight text-muted-foreground">
        {step.description}
      </p>
    </div>
  );
};

const NavButtons: React.FC<{
  handlePrev: () => void;
  handleNext: () => void;
}> = ({ handlePrev, handleNext }) => (
  <div className="flex w-full justify-end gap-3 tracking-tight">
    <Pressable
      onClick={handlePrev}
      className="flex gap-2 transition-all ease-in-out hover:gap-4"
      variant="secondary"
      asButton
    >
      <DynamicIcon name="lucide/chevron-left" size={20} />
      Previous
    </Pressable>

    <Pressable
      onClick={handleNext}
      className="flex gap-2 transition-all ease-in-out hover:gap-4"
      variant="default"
      asButton
    >
      Next
      <DynamicIcon name="lucide/chevron-right" size={20} />
    </Pressable>
  </div>
);

export function TimelineStepperAnimated({
  className,
  heading = "Stepper",
  steps = defaultSteps,
  optixFlowConfig,
}: TimelineStepperAnimatedProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container flex max-w-2xl flex-col items-center gap-10 md:gap-0">
        <h1 className="mb-10 text-center text-6xl font-bold tracking-tighter text-foreground">
          {heading}
        </h1>
        <ProcessBar currentStep={currentStep} steps={steps} />
        <StepperContent step={steps[currentStep]} optixFlowConfig={optixFlowConfig} />
        <NavButtons handlePrev={handlePrev} handleNext={handleNext} />
      </div>
    </section>
  );
}
