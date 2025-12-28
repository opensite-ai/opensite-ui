"use client";

/**
 * CarouselMultiStepShowcase
 *
 * A multi-step feature showcase with animated step navigation, progress indicators,
 * and synchronized image transitions. Features numbered step buttons with active
 * state highlighting and smooth content transitions.
 *
 * Use cases:
 * - Product onboarding flows with visual guides
 * - Feature walkthroughs with step-by-step explanations
 * - Process documentation with visual examples
 * - Tutorial sections with progressive disclosure
 */

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface StepItem {
  id: string;
  step: number;
  title: string;
  description: string;
  image: string;
}

export interface CarouselMultiStepShowcaseProps {
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
  steps?: StepItem[];
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function CarouselMultiStepShowcase({
  className,
  optixFlowConfig,
  steps,
  heading = "How It Works",
  subheading = "Follow these simple steps to get started",
  ctaText = "Get Started",
  ctaHref = "#",
}: CarouselMultiStepShowcaseProps): React.JSX.Element {
  const defaultSteps: StepItem[] = React.useMemo(
    () =>
      Array.from({ length: 4 }).map((_, index) => ({
        id: `step-${index}`,
        step: index + 1,
        title: `Step ${index + 1}: ${["Setup", "Configure", "Customize", "Launch"][index]}`,
        description: `Complete step ${index + 1} to continue your journey. This step involves important configuration that will help you get the most out of our platform.`,
        image: imagePlaceholders[index % imagePlaceholders.length],
      })),
    []
  );

  const stepItems = steps || defaultSteps;
  const [activeStep, setActiveStep] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const goToStep = (index: number) => {
    setDirection(index > activeStep ? 1 : -1);
    setActiveStep(index);
  };

  const goToNext = () => {
    if (activeStep < stepItems.length - 1) {
      setDirection(1);
      setActiveStep((prev) => prev + 1);
    }
  };

  const goToPrev = () => {
    if (activeStep > 0) {
      setDirection(-1);
      setActiveStep((prev) => prev - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className={cn("w-full py-16 lg:py-24", className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{subheading}</p>
        </div>

        {/* Step navigation */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {stepItems.map((step, index) => (
            <button
              key={step.id}
              onClick={() => goToStep(index)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                activeStep === index
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs",
                  activeStep === index
                    ? "bg-primary-foreground text-primary"
                    : "bg-background"
                )}
              >
                {step.step}
              </span>
              <span className="hidden sm:inline">{step.title.split(":")[0]}</span>
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mx-auto mb-12 h-1 max-w-2xl overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{
              width: `${((activeStep + 1) / stepItems.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image */}
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Img
                  src={stepItems[activeStep].image}
                  alt={stepItems[activeStep].title}
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text content */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <DynamicIcon name="lucide/check-circle" size={16} />
                  Step {stepItems[activeStep].step} of {stepItems.length}
                </div>

                <h3 className="text-2xl font-semibold md:text-3xl">
                  {stepItems[activeStep].title}
                </h3>

                <p className="mt-4 text-lg text-muted-foreground">
                  {stepItems[activeStep].description}
                </p>

                <div className="mt-8 flex gap-4">
                  <Pressable
                    onClick={goToPrev}
                    asButton
                    variant="outline"
                    disabled={activeStep === 0}
                    className="disabled:opacity-50"
                  >
                    <DynamicIcon
                      name="lucide/arrow-left"
                      size={16}
                      className="mr-2"
                    />
                    Previous
                  </Pressable>

                  {activeStep < stepItems.length - 1 ? (
                    <Pressable onClick={goToNext} asButton>
                      Next
                      <DynamicIcon
                        name="lucide/arrow-right"
                        size={16}
                        className="ml-2"
                      />
                    </Pressable>
                  ) : (
                    <Pressable href={ctaHref} asButton>
                      {ctaText}
                      <DynamicIcon
                        name="lucide/arrow-right"
                        size={16}
                        className="ml-2"
                      />
                    </Pressable>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

