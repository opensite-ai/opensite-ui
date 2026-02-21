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

const EVENT_TYPES = [
  { value: "wedding", label: "Wedding" },
  { value: "corporate", label: "Corporate Event" },
  { value: "birthday", label: "Birthday / Anniversary" },
  { value: "holiday", label: "Holiday Party" },
  { value: "gala", label: "Gala / Fundraiser" },
  { value: "private", label: "Private Dinner" },
  { value: "other", label: "Other" },
];

const SERVICE_STYLES = [
  { value: "buffet", label: "Buffet", description: "Self-serve stations" },
  { value: "plated", label: "Plated", description: "Formal sit-down service" },
  { value: "family", label: "Family Style", description: "Shared platters" },
  {
    value: "stations",
    label: "Food Stations",
    description: "Interactive cooking",
  },
  { value: "cocktail", label: "Cocktail", description: "Passed appetizers" },
];

const CUISINES = [
  { value: "american", label: "American" },
  { value: "italian", label: "Italian" },
  { value: "asian", label: "Asian Fusion" },
  { value: "mexican", label: "Mexican" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "bbq", label: "BBQ" },
];

const DIETARY_OPTIONS = [
  { value: "vegetarian", label: "Vegetarian options" },
  { value: "vegan", label: "Vegan options" },
  { value: "gluten-free", label: "Gluten-free options" },
  { value: "kosher", label: "Kosher" },
  { value: "halal", label: "Halal" },
];

const GUEST_COUNTS = [
  { value: "10-25", label: "10-25 guests" },
  { value: "26-50", label: "26-50 guests" },
  { value: "51-75", label: "51-75 guests" },
  { value: "76-100", label: "76-100 guests" },
  { value: "101-150", label: "101-150 guests" },
  { value: "151-200", label: "151-200 guests" },
  { value: "201-300", label: "201-300 guests" },
  { value: "301-500", label: "301-500 guests" },
  { value: "500+", label: "500+ guests" },
];

const BUDGET_RANGES = [
  { value: "25-50", label: "$25-50 / person" },
  { value: "50-75", label: "$50-75 / person" },
  { value: "75-100", label: "$75-100 / person" },
  { value: "100-150", label: "$100-150 / person" },
  { value: "150+", label: "$150+ / person" },
];

// Default form fields for catering inquiry
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "eventType",
    type: "select",
    label: "Event Type",
    placeholder: "Select event type",
    required: true,
    columnSpan: 6,
    options: EVENT_TYPES,
  },
  {
    name: "eventDate",
    type: "date",
    label: "Event Date",
    placeholder: "Select date",
    required: true,
    columnSpan: 6,
  },
  {
    name: "guestCount",
    type: "select",
    label: "Number of Guests",
    placeholder: "Select guest count",
    required: true,
    columnSpan: 6,
    options: GUEST_COUNTS,
  },
  {
    name: "budget",
    type: "select",
    label: "Budget Per Person",
    placeholder: "Select budget range",
    required: false,
    columnSpan: 6,
    options: BUDGET_RANGES,
  },
  {
    name: "serviceStyle",
    type: "radio",
    label: "Service Style",
    required: true,
    columnSpan: 12,
    options: SERVICE_STYLES,
  },
  {
    name: "cuisinePreferences",
    type: "checkbox-group",
    label: "Cuisine Preferences",
    required: false,
    columnSpan: 12,
    options: CUISINES,
  },
  {
    name: "dietaryAccommodations",
    type: "checkbox-group",
    label: "Dietary Accommodations",
    required: false,
    columnSpan: 12,
    options: DIETARY_OPTIONS,
  },
  {
    name: "name",
    type: "text",
    label: "Full Name",
    placeholder: "John Doe",
    required: true,
    columnSpan: 12,
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
    name: "venue",
    type: "text",
    label: "Venue / Location",
    placeholder: "Event venue or address",
    required: false,
    columnSpan: 12,
  },
  {
    name: "details",
    type: "textarea",
    label: "Additional Details",
    placeholder: "Tell us more about your event...",
    required: false,
    rows: 4,
    columnSpan: 12,
  },
  {
    name: "tasting",
    type: "checkbox",
    label: "I'm interested in scheduling a tasting",
    required: false,
    columnSpan: 12,
  },
];

export interface ContactCateringProps {
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
 * ContactCatering - A comprehensive catering inquiry form with event type selection,
 * guest count, dietary restrictions, and event details. Perfect for catering services
 * and event planning businesses.
 *
 * @example
 * ```tsx
 * <ContactCatering
 *   heading="Catering Inquiry"
 *   description="Let us make your event unforgettable with our catering services."
 *   formEngineSetup={{ formConfig: { endpoint: "/api/catering", format: "json" } }}
 * />
 * ```
 */
export function ContactCatering({
  heading,
  description,
  className,
  spacing = "py-8 md:py-32",
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  headerClassName,
  headingClassName,
  descriptionClassName,
  cardClassName,
  cardContentClassName,
  background,
  pattern,
  patternOpacity,
  formEngineSetup,
}: ContactCateringProps): React.JSX.Element {
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
