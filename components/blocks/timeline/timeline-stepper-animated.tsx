"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

export interface TimelineStep {
  title: React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
  description: React.ReactNode;
}

export interface TimelineStepperAnimatedProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Array of timeline steps
   */
  steps?: TimelineStep[];
  /**
   * Initial step index (0-based)
   */
  initialStep?: number;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the process bar
   */
  processBarClassName?: string;
  /**
   * Additional CSS classes for the step content area
   */
  stepContentClassName?: string;
  /**
   * Additional CSS classes for step images
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for step descriptions
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for navigation buttons container
   */
  navButtonsClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the pattern background
   */
  patternClassName?: string;
  /**
   * Section ID for anchor links
   */
  id?: string;
  /**
   * Inline styles for the section
   */
  style?: React.CSSProperties;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const ProcessBar: React.FC<{
  currentStep: number;
  steps: TimelineStep[];
}> = ({ currentStep, steps }) => (
  <div className="relative w-full scale-75">
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
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
  imageClassName?: string;
  descriptionClassName?: string;
}> = ({ step, optixFlowConfig, imageClassName, descriptionClassName }) => {
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
          alt={step.imageAlt || (typeof step.title === 'string' ? step.title : 'Step image')}
          className={cn("w-[500px]", imageClassName)}
          optixFlowConfig={optixFlowConfig}
        />
      </motion.div>
      <p className={cn("mt-6 px-10 text-base leading-snug font-normal tracking-tight text-muted-foreground", descriptionClassName)}>
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
  heading = "Stepper",
  steps,
  initialStep = 1,
  className,
  containerClassName,
  headingClassName,
  processBarClassName,
  stepContentClassName,
  imageClassName,
  descriptionClassName,
  navButtonsClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  id,
  style,
  optixFlowConfig,
}: TimelineStepperAnimatedProps) {
  const safeInitialStep = steps.length > 0 
    ? Math.max(0, Math.min(initialStep, steps.length - 1))
    : 0;
  const [currentStep, setCurrentStep] = useState(safeInitialStep);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const safeCurrentStep = steps.length > 0 
    ? Math.max(0, Math.min(currentStep, steps.length - 1))
    : 0;

  if (steps.length === 0) {
    return (
      <Section
        id={id}
        background={background}
        spacing={spacing}
        className={className}
        pattern={pattern}
        patternOpacity={patternOpacity}
        patternClassName={patternClassName}
        style={style}
      >
        <div className={cn("flex max-w-2xl flex-col items-center gap-10 md:gap-0", containerClassName)}>
          <h1 className={cn("mb-10 text-center text-6xl font-bold tracking-tighter text-foreground", headingClassName)}>
            {heading}
          </h1>
        </div>
      </Section>
    );
  }

  return (
    <Section
      id={id}
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      style={style}
    >
      <div className={cn("flex max-w-2xl flex-col items-center gap-10 md:gap-0 mx-auto", containerClassName)}>
        <h1 className={cn("mb-10 text-center text-6xl font-bold tracking-tighter text-foreground", headingClassName)}>
          {heading}
        </h1>
        <div className={processBarClassName}>
          <ProcessBar currentStep={safeCurrentStep} steps={steps} />
        </div>
        <div className={stepContentClassName}>
          <StepperContent 
            step={steps[safeCurrentStep]} 
            optixFlowConfig={optixFlowConfig}
            imageClassName={imageClassName}
            descriptionClassName={descriptionClassName}
          />
        </div>
        <div className={navButtonsClassName}>
          <NavButtons handlePrev={handlePrev} handleNext={handleNext} />
        </div>
      </div>
    </Section>
  );
}
