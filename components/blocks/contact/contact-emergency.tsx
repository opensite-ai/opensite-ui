"use client";

import * as React from "react";
import { useMemo } from "react";
import {
  FormEngine,
  type FormEngineProps,
  type FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";
import { cn } from "../../../lib/utils";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { ContentGroup, type ContentGroupItem } from "../../ui/content-group";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "",
  fieldsContainer: "",
  fieldClassName: "",
  formClassName: "space-y-4",
};

/**
 * Configuration for a contact info item in the emergency contact grid.
 */
export interface ContactInfoItem {
  /**
   * Icon name for DynamicIcon (e.g., "lucide/phone")
   */
  icon: string;
  /**
   * Icon size in pixels
   * @default 28
   */
  iconSize?: number;
  /**
   * Primary label/title for the item
   */
  title: string;
  /**
   * Secondary text (e.g., phone number, email)
   */
  subtitle: string;
  /**
   * Link URL (e.g., "tel:+15551234567", "mailto:support@example.com")
   */
  href: string;
  /**
   * Additional CSS classes for the item container
   */
  className?: string;
}

/**
 * Default emergency contact items
 */

const PRIORITIES = [
  {
    value: "critical",
    label: "Critical",
    description: "System down, business stopped",
    response: "15 min",
  },
  {
    value: "high",
    label: "High",
    description: "Major impact, needs attention",
    response: "2 hours",
  },
  {
    value: "normal",
    label: "Normal",
    description: "Standard request",
    response: "24 hours",
  },
];

// Default form fields
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "priority",
    type: "radio",
    label: "Priority Level",
    required: true,
    columnSpan: 12,
    options: PRIORITIES.map((p) => ({ value: p.value, label: p.label })),
  },
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Your name",
    required: true,
    columnSpan: 6,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "you@company.com",
    required: true,
    columnSpan: 6,
  },
  {
    name: "phone",
    type: "tel",
    label: "Phone (Optional)",
    placeholder: "+1 (555) 000-0000",
    required: false,
    columnSpan: 12,
  },
  {
    name: "subject",
    type: "text",
    label: "Subject",
    placeholder: "Brief summary of the issue",
    required: true,
    columnSpan: 12,
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Describe the issue, what you've tried, and the impact...",
    required: true,
    rows: 4,
    columnSpan: 12,
  },
];

export interface ContactEmergencyProps {
  /**
   * Main heading text
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of emergency contact info items to display in the grid
   */
  contactItems?: ContactInfoItem[];
  /**
   * Full form engine setup and props
   */
  formEngineSetup?: FormEngineProps;
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
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
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
  pattern?: PatternName | undefined;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ContactEmergency - Urgent support form with priority level selection.
 * Features priority-based response time indicators and emergency contact information.
 *
 * @example
 * ```tsx
 * <ContactEmergency
 *   heading="Urgent Support"
 *   formEngineSetup={{ formConfig: { endpoint: "/api/emergency", format: "json" } }}
 * />
 * ```
 */
export function ContactEmergency({
  sectionId = "contact-emergency",
  heading,
  description,
  contactItems,
  formEngineSetup,
  className,
  headerClassName,
  headingClassName,
  descriptionClassName,
  spacing = "py-16 md:py-32",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  background,
  pattern,
  patternOpacity,
}: ContactEmergencyProps): React.JSX.Element {
  const headerItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (heading) {
      if (typeof heading === "string") {
        items.push({
          _type: "text",
          as: "h2",
          className: cn(
            "text-4xl lg:text-5xl xl:text-6xl font-bold text-pretty",
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
            "leading-relaxed text-pretty md:text-balance text-lg",
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
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-28">
        <div className="h-full">
          <div className="flex flex-col items-start justify-between h-full gap-8 md:gap-12">
            <ContentGroup
              items={headerItems}
              className={cn(
                "flex flex-col items-start gap-4 text-left",
                headerClassName,
              )}
            />

            {contactItems && contactItems.length > 0 && (
              <div className="grid grid-cols-1 gap-4 md:gap-6 w-full">
                {contactItems.map((item, index) => (
                  <Pressable
                    key={index}
                    href={item.href}
                    className={cn(
                      "rounded-xl border bg-transparent hover:bg-muted ring-2",
                      "px-4 py-4 flex",
                      "justify-start items-start transition-all",
                      "duration-500 hover:text-muted-foreground",
                      item.className,
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {item.icon ? (
                        <div className="flex items-center justify-center p-2 rounded-xl border bg-primary text-primary-foreground">
                          <DynamicIcon
                            name={item.icon}
                            size={item.iconSize ?? 24}
                          />
                        </div>
                      ) : null}
                      <div>
                        <p className="font-bold text-xs uppercase opacity-70">
                          {item.title}
                        </p>
                        <p className="text-md font-medium">{item.subtitle}</p>
                      </div>
                    </div>
                  </Pressable>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-card text-card-foreground p-6 md:p-8 rounded-2xl shadow-2xl">
          {formEngineSetup ? (
            <FormEngine
              formEngineSetup={formEngineSetup}
              defaultFields={DEFAULT_FORM_FIELDS}
              defaultStyleRules={DEFAULT_STYLE_RULES}
            />
          ) : null}
        </div>
      </div>
    </Section>
  );
}
