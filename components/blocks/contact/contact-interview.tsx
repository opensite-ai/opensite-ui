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

export interface ContactInterviewProps {
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
}

/**
 * ContactInterview - Contact form with flexible field configuration
 *
 * @example
 * ```tsx
 * <ContactInterview
 *   heading="Schedule an Interview"
 *   formEngineSetup={{ formConfig: { endpoint: "/api/contact", format: "json" } }}
 * />
 * ```
 */
export function ContactInterview({
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
  background = "white",
  spacing = "xl",
  pattern,
  patternOpacity = 0.1,
}: ContactInterviewProps): React.JSX.Element {
  const headerItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (heading) {
      if (typeof heading === "string") {
        items.push({
          _type: "text",
          as: "h2",
          className: cn(
            "mb-3 text-3xl font-bold tracking-tight text-pretty",
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
          className: cn(
            "leading-relaxed text-balance md:text-pretty",
            descriptionClassName,
          ),
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
      className={cn("py-12", className)}
      containerClassName={containerClassName}
    >
      <div className="mx-auto max-w-full md:max-w-md">
        <Card className={cn("mx-auto max-w-xl", cardClassName)}>
          <CardContent className={cn("p-6 lg:p-8", cardContentClassName)}>
            <ContentGroup
              items={headerItems}
              className={cn(
                "flex flex-col items-start text-left pb-8 md:pb-18 max-w-full md:max-w-md",
                headerClassName,
              )}
            />

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
