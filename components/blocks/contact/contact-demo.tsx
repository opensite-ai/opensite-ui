"use client";

import * as React from "react";
import {
  FormEngine,
  FormEngineProps,
  FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";
import { cn } from "../../../lib/utils";
import { BlurText } from "../../ui/blur-text";
import { Card, CardContent } from "../../ui/card";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "",
  fieldsContainer: "",
  fieldClassName: "",
  formClassName: "space-y-6",
};

// Default form fields
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "first_name",
    type: "text",
    label: "First Name",
    placeholder: "John",
    required: true,
    columnSpan: 6,
  },
  {
    name: "last_name",
    type: "text",
    label: "Last Name",
    placeholder: "Doe",
    required: true,
    columnSpan: 6,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "john@example.com",
    required: true,
    columnSpan: 12,
  },
  {
    name: "phone",
    type: "tel",
    label: "Phone",
    placeholder: "+1 (555) 000-0000",
    required: true,
    columnSpan: 12,
  },
  {
    name: "message",
    type: "textarea",
    label: "Message",
    placeholder: "Your message...",
    required: true,
    rows: 4,
    columnSpan: 12,
  },
];

export interface ContactDemoProps {
  /** Main heading text */
  heading?: React.ReactNode;
  /** Description text below heading */
  description?: React.ReactNode;
  /** Additional CSS classes for the section */
  className?: string;
  /** Additional CSS classes for the container */
  containerClassName?: string;
  /** Additional CSS classes for the header */
  headerClassName?: string;
  /** Additional CSS classes for the heading */
  headingClassName?: string;
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
  /** Additional CSS classes for the card */
  cardClassName?: string;
  /** Additional CSS classes for the card content */
  cardContentClassName?: string;
  /** Background style for the section */
  background?: SectionBackground;
  /** Vertical spacing for the section */
  spacing?: SectionSpacing;
  /** Optional background pattern name or URL */
  pattern?: PatternName | undefined;
  /** Pattern overlay opacity (0-1) */
  patternOpacity?: number;
  /** Full form engine setup and props */
  formEngineSetup?: FormEngineProps;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ContactDemo - Contact form with flexible field configuration
 *
 * @example
 * ```tsx
 * <ContactDemo
 *   heading="Request a Demo"
 *   formEngineSetup={{ formConfig: { endpoint: "/api/contact", format: "json" } }}
 * />
 * ```
 */
export function ContactDemo({
  sectionId = "contact-demo",
  heading,
  description,
  className,
  formEngineSetup,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  cardContentClassName,
  background,
  spacing = "xl",
  pattern,
  patternOpacity,
}: ContactDemoProps): React.JSX.Element {
  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="flex flex-col items-center gap-8 md:gap-20">
        <div
          className={cn(
            "flex flex-col items-center gap-4 md:gap-8 text-center max-w-full md:max-w-sm",
            headerClassName,
          )}
        >
          {heading &&
            (typeof heading === "string" ? (
              <BlurText
                as="h2"
                text={heading}
                className={cn(
                  "justify-start text-left text-5xl font-bold text-pretty md:justify-center md:text-center lg:text-6xl xl:text-7xl",
                  headingClassName,
                )}
                animateBy="words"
                delay={150}
                direction="top"
              />
            ) : (
              heading
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "leading-relaxed text-balance text-lg text-left md:text-center",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              description
            ))}
        </div>

        <Card className={cn("rounded-2xl shadow-2xl", cardClassName)}>
          <CardContent className={cn("p-6 lg:p-8", cardContentClassName)}>
            {formEngineSetup ? (
              <FormEngine
                formEngineSetup={formEngineSetup}
                defaultFields={DEFAULT_FORM_FIELDS}
                defaultStyleRules={DEFAULT_STYLE_RULES}
              />
            ) : null}
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
