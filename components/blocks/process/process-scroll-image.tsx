"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

const usePrevious = <T,>(value: T): T | undefined => {
  const [prev, setPrev] = React.useState<T | undefined>(undefined);
  const ref = React.useRef(value);

  React.useEffect(() => {
    setPrev(ref.current);
    ref.current = value;
  }, [value]);

  return prev;
};

/**
 * Step item configuration for ProcessScrollImage
 */
export interface ProcessScrollImageItem {
  /**
   * Step number or label (e.g., "01", "Step 1")
   */
  step?: React.ReactNode;
  /**
   * Step title
   */
  title?: React.ReactNode;
  /**
   * Image URL for the step
   */
  image?: string;
  /**
   * Step description
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the step item
   */
  className?: string;
}

export interface ProcessScrollImageProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of action configurations for CTA buttons
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for rendering actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Array of step configurations
   */
  steps?: ProcessScrollImageItem[];
  /**
   * Custom slot for rendering steps (overrides steps array)
   */
  stepsSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the image container
   */
  imageContainerClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the steps list
   */
  stepsClassName?: string;
  /**
   * Additional CSS classes for each step item
   */
  stepItemClassName?: string;
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
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * @deprecated Use `heading` instead
   */
  title?: string;
  /**
   * @deprecated Use `actions` instead
   */
  ctaText?: string;
  /**
   * @deprecated Use `actions` instead
   */
  ctaUrl?: string;
}

interface ProcessCardProps {
  step: ProcessScrollImageItem;
  index: number;
  setActive: (index: number) => void;
  itemClassName?: string;
}

const ProcessCard = ({ step, index, setActive, itemClassName }: ProcessCardProps) => {
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
      className={cn(
        "relative flex flex-col justify-between gap-12 border-b py-8 lg:py-16",
        itemClassName,
        step.className
      )}
    >
      <div className="flex w-fit items-center justify-center px-4 py-1 text-9xl tracking-tighter">
        {step.step ?? `0${index + 1}`}
      </div>
      <div>
        {step.title && (
          typeof step.title === "string" ? (
            <h3 className="mb-4 text-2xl font-semibold tracking-tighter lg:text-3xl">
              {step.title}
            </h3>
          ) : (
            <div className="mb-4">{step.title}</div>
          )
        )}
        {step.description && (
          typeof step.description === "string" ? (
            <p className="text-foreground/50">{step.description}</p>
          ) : (
            <div className="text-foreground/50">{step.description}</div>
          )
        )}
      </div>
    </li>
  );
};

/**
 * ProcessScrollImage - A process section with scroll-triggered image transitions.
 */
export function ProcessScrollImage({
  heading,
  description,
  actions,
  actionsSlot,
  steps,
  stepsSlot,
  className,
  contentClassName,
  sidebarClassName,
  headingClassName,
  descriptionClassName,
  imageContainerClassName,
  actionsClassName,
  stepsClassName,
  stepItemClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
  // Backwards compatibility
  title,
  ctaText,
  ctaUrl,
}: ProcessScrollImageProps): React.JSX.Element {
  const [active, setActive] = React.useState<number>(0);
  const previousActive = usePrevious(active);

  // Handle backwards compatibility
  const resolvedHeading = title ?? heading;
  const resolvedActions: ActionConfig[] = actions ?? (ctaText && ctaUrl ? [{ label: ctaText, href: ctaUrl, variant: "ghost" as const, icon: <DynamicIcon name="lucide/corner-down-right" size={20} className="text-primary" /> }] : []);

  const renderActions = () => {
    if (actionsSlot) return actionsSlot;
    if (!resolvedActions || resolvedActions.length === 0) return null;

    return (
      <div className={cn("flex flex-col gap-2", actionsClassName)}>
        {resolvedActions.map((action, index) => {
          const { label, icon, iconAfter, children, className: actionClassName, ...pressableProps } = action;
          return (
            <Pressable
              key={index}
              asButton
              className={cn("flex items-center justify-start gap-2", actionClassName)}
              {...pressableProps}
            >
              {children ?? (
                <>
                  {icon}
                  {label}
                  {iconAfter}
                </>
              )}
            </Pressable>
          );
        })}
      </div>
    );
  };

  const renderSteps = () => {
    if (stepsSlot) return stepsSlot;
    if (!steps || steps.length === 0) return null;

    return (
      <ul className={cn("relative w-full lg:pl-22", stepsClassName)}>
        {steps.map((step, index) => (
          <ProcessCard
            key={index}
            step={step}
            index={index}
            setActive={setActive}
            itemClassName={stepItemClassName}
          />
        ))}
      </ul>
    );
  };

  const getStepTitle = (step: ProcessScrollImageItem): string => {
    return typeof step.title === "string" ? step.title : `Step ${steps?.indexOf(step) ?? 0 + 1}`;
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-20", contentClassName)}>
        <div className={cn("top-10 h-fit w-fit gap-3 space-y-7 py-8 lg:sticky", sidebarClassName)}>
          {resolvedHeading && (
            typeof resolvedHeading === "string" ? (
              <h1 className={cn("relative w-fit text-5xl font-semibold tracking-tight lg:text-7xl", headingClassName)}>
                {resolvedHeading}
              </h1>
            ) : (
              <div className={headingClassName}>{resolvedHeading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("text-base text-foreground/50", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
          <div className={cn("relative h-90 overflow-hidden border", imageContainerClassName)}>
            {previousActive !== undefined && steps && steps[previousActive] && steps[previousActive].image && (
              <div className="absolute top-0 h-full w-full">
                <Img
                  src={steps[previousActive].image!}
                  alt={getStepTitle(steps[previousActive])}
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            )}
            {steps && steps[active] && steps[active].image && (
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
                  src={steps[active].image!}
                  alt={getStepTitle(steps[active])}
                  className="h-full w-full object-cover"
                  optixFlowConfig={optixFlowConfig}
                />
              </motion.div>
            )}
          </div>
          {renderActions()}
        </div>
        {renderSteps()}
      </div>
    </Section>
  );
}
