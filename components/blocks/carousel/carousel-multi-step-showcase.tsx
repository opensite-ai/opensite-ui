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
import type { ActionConfig, OptixFlowConfig } from "../../../src/types";

export interface StepItem {
  /**
   * Unique identifier for the step
   */
  id: string;
  /**
   * Step number
   */
  step: number;
  /**
   * Step title
   */
  title?: React.ReactNode;
  /**
   * Step description
   */
  description?: React.ReactNode;
  /**
   * Image source URL
   */
  image: string;
  /**
   * Additional CSS classes for the step
   */
  className?: string;
  /**
   * Additional CSS classes for the image
   */
  imageClassName?: string;
}

export interface CarouselMultiStepShowcaseProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Subheading/description text
   */
  subheading?: React.ReactNode;
  /**
   * Array of step items
   */
  steps?: StepItem[];
  /**
   * Custom slot for rendering steps (overrides steps array)
   */
  stepsSlot?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the subheading
   */
  subheadingClassName?: string;
  /**
   * Additional CSS classes for the step navigation
   */
  stepNavigationClassName?: string;
  /**
   * Additional CSS classes for the progress bar
   */
  progressClassName?: string;
  /**
   * Additional CSS classes for the content area
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the image container
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function CarouselMultiStepShowcase({
  heading,
  subheading,
  steps,
  stepsSlot,
  actions,
  actionsSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  subheadingClassName,
  stepNavigationClassName,
  progressClassName,
  contentClassName,
  imageClassName,
  actionsClassName,
  optixFlowConfig,
}: CarouselMultiStepShowcaseProps): React.JSX.Element {
  const [activeStep, setActiveStep] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const goToStep = (index: number) => {
    setDirection(index > activeStep ? 1 : -1);
    setActiveStep(index);
  };

  const goToNext = () => {
    if (activeStep < (steps?.length ?? 0) - 1) {
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

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!actions || actions.length === 0) return null;

    return actions.map((action, index) => {
      const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
      return (
        <Pressable
          key={index}
          asButton
          className={actionClassName}
          {...pressableProps}
        >
          {children ?? (
            <>
              {icon}
              {label}
              {iconAfter ?? <DynamicIcon name="lucide/arrow-right" size={16} className="ml-2" />}
            </>
          )}
        </Pressable>
      );
    });
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
      <div className={cn("container mx-auto px-4", containerClassName)}>
        {/* Header */}
        <div className={cn("mb-12 text-center", headerClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {subheading && (
            typeof subheading === "string" ? (
              <p className={cn("mt-4 text-lg text-muted-foreground", subheadingClassName)}>{subheading}</p>
            ) : (
              <div className={subheadingClassName}>{subheading}</div>
            )
          )}
        </div>

        {/* Step navigation */}
        {stepsSlot ? (
          <div className={stepNavigationClassName}>{stepsSlot}</div>
        ) : (
          <div className={cn("mb-8 flex flex-wrap justify-center gap-2", stepNavigationClassName)}>
            {steps?.map((step, index) => (
              <button
                key={step.id}
                onClick={() => goToStep(index)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  activeStep === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80",
                  step.className
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
                <span className="hidden sm:inline">
                  {typeof step.title === "string" ? step.title.split(":")[0] : step.title}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Progress bar */}
        <div className={cn("mx-auto mb-12 h-1 max-w-2xl overflow-hidden rounded-full bg-muted", progressClassName)}>
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{
              width: `${((activeStep + 1) / (steps?.length ?? 1)) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content */}
        <div className={cn("grid gap-8 lg:grid-cols-2 lg:gap-12", contentClassName)}>
          {/* Image */}
          <div className={cn("relative aspect-video overflow-hidden rounded-xl bg-muted", imageClassName)}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn("absolute inset-0", steps?.[activeStep]?.imageClassName)}
              >
                <Img
                  src={steps?.[activeStep]?.image}
                  alt={typeof steps?.[activeStep]?.title === "string" ? steps[activeStep].title : `Step ${activeStep + 1}`}
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
                  Step {steps?.[activeStep]?.step} of {steps?.length ?? 0}
                </div>

                {steps?.[activeStep]?.title && (
                  typeof steps[activeStep].title === "string" ? (
                    <h3 className="text-2xl font-semibold md:text-3xl">
                      {steps[activeStep].title}
                    </h3>
                  ) : (
                    <div>{steps[activeStep].title}</div>
                  )
                )}

                {steps?.[activeStep]?.description && (
                  typeof steps[activeStep].description === "string" ? (
                    <p className="mt-4 text-lg text-muted-foreground">
                      {steps[activeStep].description}
                    </p>
                  ) : (
                    <div className="mt-4">{steps[activeStep].description}</div>
                  )
                )}

                <div className={cn("mt-8 flex gap-4", actionsClassName)}>
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

                  {activeStep < (steps?.length ?? 0) - 1 ? (
                    <Pressable onClick={goToNext} asButton>
                      Next
                      <DynamicIcon
                        name="lucide/arrow-right"
                        size={16}
                        className="ml-2"
                      />
                    </Pressable>
                  ) : (
                    (actionsSlot || (actions && actions.length > 0)) && renderActions()
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

