"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import type {
  ActionConfig,
  StatItem,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import {
  FormEngine,
  FormEngineProps,
  FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";
import { BrandLogo } from "../../ui/brand-logo";
import type { LogoConfig } from "../navbars/types";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer:
    "mt-10 flex justify-center items-center w-full max-w-md flex-col gap-4 sm:flex-row",
  fieldsContainer: "",
  fieldClassName: "",
  formClassName: "",
};

const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    required: true,
    columnSpan: 12,
  },
];

export interface HeroNewsletterMinimalProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Full form engine setup and props
   */
  formEngineSetup?: FormEngineProps;
  /**
   * Submit button configuration
   */
  buttonAction?: ActionConfig;
  /**
   * Helper text below form
   */
  helperText?: React.ReactNode;
  /**
   * Custom slot for the form (overrides form props)
   */
  formSlot?: React.ReactNode;
  /**
   * Disclaimer text below form
   */
  disclaimer?: React.ReactNode;
  /**
   * Array of stat/trust indicators
   */
  stats?: StatItem[];
  /**
   * Custom slot for rendering stats (overrides stats array)
   */
  statsSlot?: React.ReactNode; /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;

  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the input
   */
  inputClassName?: string;
  /**
   * Additional CSS classes for the disclaimer
   */
  disclaimerClassName?: string;
  /**
   * Additional CSS classes for the stats container
   */
  statsClassName?: string;
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * Brand logo configuration. LOGO MEDIA ONLY — do not use photos or hero images.
   */
  logo?: LogoConfig;
  /**
   * Custom slot for logo (overrides logo prop)
   */
  logoSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the logo container
   */
  logoClassName?: string;
  /** Optional Section ID */
  sectionId?: string;
}

export function HeroNewsletterMinimal({
  sectionId = "hero-newsletter-minimal",
  heading,
  description,
  formEngineSetup,
  buttonAction,
  helperText,
  formSlot,
  disclaimer,
  stats,
  patternClassName,
  statsSlot,
  background,
  containerClassName = "pmx-auto w-full max-w-7xl relative z-10 px-6 sm:px-6 md:px-8 lg:px-8 flex flex-col items-center justify-center",
  spacing = "xl",
  pattern,
  patternOpacity,
  className,
  headingClassName,
  descriptionClassName,
  disclaimerClassName,
  statsClassName,
  logo,
  logoSlot,
  logoClassName,
}: HeroNewsletterMinimalProps): React.JSX.Element {
  const renderStats = React.useMemo(() => {
    if (statsSlot) return statsSlot;
    if (!stats || stats.length === 0) return null;

    return stats.map((stat, index) => (
      <div key={index} className={cn("flex items-center", stat.className)}>
        <div className="text-center">
          <div
            className={cn(
              "flex items-center",
              stat.icon ? "justify-between" : "justify-center",
            )}
          >
            {stat.icon}
            <div
              className={cn("font-bold ", stat.icon ? "text-xl" : "text-2xl")}
            >
              {stat.value}
            </div>
          </div>
          <div className={cn("text-sm")}>{stat.label}</div>
        </div>
      </div>
    ));
  }, [statsSlot, stats]);

  const renderForm = React.useMemo(() => {
    if (formSlot) return formSlot;
    if (!formEngineSetup) return null;

    const defaultButtonAction: ActionConfig = {
      label: "Subscribe",
      variant: "default",
    };

    const action = buttonAction || defaultButtonAction;

    return (
      <>
        <FormEngine
          formEngineSetup={{
            ...formEngineSetup,
            formLayoutSettings: {
              ...formEngineSetup.formLayoutSettings,
              formLayout: "button-group",
              buttonGroupSetup: {
                ...formEngineSetup.formLayoutSettings?.buttonGroupSetup,
                size: "lg",
                submitLabel: (
                  <>
                    {action.label}
                    {action.iconAfter}
                  </>
                ),
                submitVariant: action.variant || "default",
              },
            },
          }}
          defaultFields={DEFAULT_FORM_FIELDS}
          defaultStyleRules={DEFAULT_STYLE_RULES}
        />
        {helperText &&
          (typeof helperText === "string" ? (
            <p className={cn("text-sm mt-2 text-center")}>{helperText}</p>
          ) : (
            helperText
          ))}
      </>
    );
  }, [
    formSlot,
    formEngineSetup,
    buttonAction,
    helperText,
  ]);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="flex flex-col items-center justify-center">
        {(logo || logoSlot) && (

          <div className={cn("mb-4 flex justify-center", logoClassName)}>

            <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />

          </div>

        )}

        
        {heading &&
          (typeof heading === "string" ? (
            <h1
              className={cn(
                "max-w-3xl text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl text-pretty text-center",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : (
            heading
          ))}
        {description &&
          (typeof description === "string" ? (
            <p
              className={cn(
                "mt-6 max-w-full md:max-w-lg text-lg md:text-xl text-balance text-center",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            description
          ))}

        {renderForm}
        {disclaimer &&
          (typeof disclaimer === "string" ? (
            <p className={cn("mt-4 text-sm", disclaimerClassName)}>
              {disclaimer}
            </p>
          ) : (
            disclaimer
          ))}
        {(statsSlot || (stats && stats.length > 0)) && (
          <div
            className={cn(
              "mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12",
              statsClassName,
            )}
          >
            {renderStats}
          </div>
        )}
      </div>
    </Section>
  );
}
