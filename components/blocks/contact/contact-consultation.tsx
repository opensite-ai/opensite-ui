"use client";

import * as React from "react";
import { useMemo } from "react";
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
import { ContentGroup, type ContentGroupItem } from "../../ui/content-group";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "",
  fieldsContainer: "",
  fieldClassName: "",
  formClassName: "space-y-6",
};

const SERVICES = [
  { value: "strategy", label: "Business Strategy" },
  { value: "marketing", label: "Marketing Consultation" },
  { value: "tech", label: "Technology Advisory" },
  { value: "finance", label: "Financial Planning" },
  { value: "hr", label: "HR & Talent" },
  { value: "other", label: "Other" },
];

const DURATIONS = [
  { value: "30", label: "30 minutes" },
  { value: "60", label: "1 hour" },
  { value: "90", label: "1.5 hours" },
  { value: "120", label: "2 hours" },
];

const BUDGETS = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-50k", label: "$25,000 - $50,000" },
  { value: "50k-plus", label: "$50,000+" },
];

// Default form fields for consultation booking
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "service",
    type: "select",
    label: "Service Needed",
    placeholder: "Select a service",
    required: true,
    columnSpan: 12,
    options: SERVICES,
  },
  {
    name: "duration",
    type: "select",
    label: "Preferred Duration",
    placeholder: "Select duration",
    required: false,
    columnSpan: 6,
    options: DURATIONS,
  },
  {
    name: "budget",
    type: "select",
    label: "Project Budget",
    placeholder: "Select budget range",
    required: false,
    columnSpan: 6,
    options: BUDGETS,
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
    name: "company",
    type: "text",
    label: "Company Name",
    placeholder: "Acme Inc.",
    required: false,
    columnSpan: 12,
  },
  {
    name: "details",
    type: "textarea",
    label: "Tell us about your needs",
    placeholder: "Describe your project, goals, and any specific challenges...",
    required: false,
    rows: 4,
    columnSpan: 12,
  },
];

export interface ContactConsultationProps {
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
 * ContactConsultation - A consultation booking form with service selection,
 * duration, budget, and detailed information. Perfect for professional services
 * and consulting businesses.
 *
 * @example
 * ```tsx
 * <ContactConsultation
 *   heading="Book a Consultation"
 *   description="Let's discuss how we can help your business grow."
 *   formEngineSetup={{ formConfig: { endpoint: "/api/consultation", format: "json" } }}
 * />
 * ```
 */
export function ContactConsultation({
  heading,
  description,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  cardContentClassName,
  spacing = "py-8 md:py-32",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  background,
  pattern,
  patternOpacity,
  formEngineSetup,
}: ContactConsultationProps): React.JSX.Element {
  const headerItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (heading) {
      if (typeof heading === "string") {
        items.push({
          _type: "text",
          as: "h2",
          className: cn(
            "mb-3 text-3xl font-bold tracking-tight text-balance",
            headingClassName,
          ),
          children: heading,
        });
      } else {
        items.push(heading);
      }
    }

    if (description) {
      if (typeof description === "string") {
        items.push({
          _type: "text",
          as: "p",
          className: cn("leading-relaxed text-balance", descriptionClassName),
          children: description,
        });
      } else {
        items.push(description);
      }
    }

    return items;
  }, [heading, headingClassName, description, descriptionClassName]);

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
        <ContentGroup
          items={headerItems}
          className={cn("mb-10 text-center", headerClassName)}
        />

        <Card className={cardClassName}>
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
