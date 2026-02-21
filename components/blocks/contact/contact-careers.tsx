"use client";

import * as React from "react";
import {
  FormEngine,
  FormEngineProps,
  FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";
import { cn } from "../../../lib/utils";
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

// Default form fields for careers application
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "position",
    type: "select",
    label: "Position Applying For",
    placeholder: "Select a position",
    required: true,
    columnSpan: 12,
    options: [
      { value: "frontend", label: "Frontend Developer" },
      { value: "backend", label: "Backend Developer" },
      { value: "fullstack", label: "Full Stack Developer" },
      { value: "designer", label: "Product Designer" },
      { value: "pm", label: "Product Manager" },
      { value: "marketing", label: "Marketing Manager" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    placeholder: "John",
    required: true,
    columnSpan: 6,
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    placeholder: "Doe",
    required: true,
    columnSpan: 6,
  },
  {
    name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "john@example.com",
    required: true,
    columnSpan: 6,
  },
  {
    name: "phone",
    type: "tel",
    label: "Phone Number",
    placeholder: "+1 (555) 000-0000",
    required: true,
    columnSpan: 6,
  },
  {
    name: "linkedin",
    type: "url",
    label: "LinkedIn Profile",
    placeholder: "https://linkedin.com/in/yourprofile",
    required: false,
    columnSpan: 6,
  },
  {
    name: "portfolio",
    type: "url",
    label: "Portfolio/Website",
    placeholder: "https://yourportfolio.com",
    required: false,
    columnSpan: 6,
  },
  {
    name: "availability",
    type: "select",
    label: "Availability",
    placeholder: "Select your availability",
    required: true,
    columnSpan: 12,
    options: [
      { value: "immediately", label: "Immediately" },
      { value: "2-weeks", label: "2 weeks notice" },
      { value: "1-month", label: "1 month notice" },
      { value: "flexible", label: "Flexible" },
    ],
  },
  {
    name: "coverLetter",
    type: "textarea",
    label: "Cover Letter",
    placeholder: "Tell us why you'd be a great fit for this position...",
    required: true,
    rows: 6,
    columnSpan: 12,
  },
  {
    name: "resume",
    type: "file",
    label: "Resume/CV",
    placeholder: "Upload your resume (PDF, DOC, DOCX)",
    required: true,
    columnSpan: 12,
    accept: ".pdf,.doc,.docx",
  },
];

export interface ContactCareersProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below the heading
   */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   * @default "px-6 sm:px-6 md:px-8 lg:px-8"
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header wrapper
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the card content
   */
  cardContentClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   * @default "py-8 md:py-32"
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Full form engine setup and props
   */
  formEngineSetup?: FormEngineProps;
}

/**
 * ContactCareers - A comprehensive job application form with position selection,
 * resume upload, and availability options. Perfect for career pages and job applications.
 *
 * @example
 * ```tsx
 * <ContactCareers
 *   heading="Join Our Team"
 *   description="We're always looking for talented people to join us."
 *   formEngineSetup={{ formConfig: { endpoint: "/api/careers", format: "json" } }}
 * />
 * ```
 */
export function ContactCareers({
  heading,
  description,
  className,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  cardContentClassName,
  background,
  spacing = "py-8 md:py-32",
  pattern,
  patternOpacity,
  formEngineSetup,
}: ContactCareersProps): React.JSX.Element {
  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className={cn("mb-10 text-center", headerClassName)}>
          {heading &&
            (typeof heading === "string" ? (
              <h2
                className={cn(
                  "mb-3 text-3xl font-bold tracking-tight text-balance",
                  headingClassName,
                )}
              >
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            ))}
          {description &&
            (typeof description === "string" ? (
              <p
                className={cn(
                  "leading-relaxed text-balance",
                  descriptionClassName,
                )}
              >
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            ))}
        </div>

        <Card className={cardClassName}>
          <CardContent className={cn("p-0", cardContentClassName)}>
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
