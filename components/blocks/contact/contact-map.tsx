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
import { GeoMap, type GeoMapProps } from "../../ui/geo-map";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";

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

export interface ContactMapProps {
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
  /** Additional CSS classes for the left panel wrapper */
  panelClassName?: string;
  /** Additional CSS classes for the content grid */
  contentGridClassName?: string;
  /** Additional CSS classes for the map column wrapper */
  mapColumnClassName?: string;
  /** Additional CSS classes for the map component wrapper */
  mapClassName?: string;
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
  /** Geo map configuration and marker data */
  mapProps?: GeoMapProps;
}

/**
 * ContactMap - Contact form with flexible field configuration
 *
 * @example
 * ```tsx
 * <ContactMap
 *   heading="Get In Touch"
 *   formEngineSetup={{ formConfig: { endpoint: "/api/contact", format: "json" } }}
 * />
 * ```
 */
export function ContactMap({
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
  panelClassName,
  contentGridClassName,
  mapColumnClassName,
  mapClassName,
  background,
  spacing = "xl",
  pattern,
  patternOpacity = 0.1,
  mapProps,
}: ContactMapProps): React.JSX.Element {
  const renderForm = React.useMemo(() => {
    if (!formEngineSetup) {
      return null;
    }

    return (
      <FormEngine
        formEngineSetup={formEngineSetup}
        defaultFields={DEFAULT_FORM_FIELDS}
        defaultStyleRules={DEFAULT_STYLE_RULES}
      />
    );
  }, [formEngineSetup]);

  const resolvedMapProps = React.useMemo<GeoMapProps>(() => {
    return {
      mapWrapperClassName: "h-[420px] md:h-[520px]",
      panelPosition: "top-left",
      ...mapProps,
      className: cn("h-full w-full", mapClassName, mapProps?.className),
    };
  }, [mapClassName, mapProps]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("py-12", className)}
      containerClassName={containerClassName}
    >
      <div
        className={cn(
          "mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
          contentGridClassName,
        )}
      >
        <div
          className={cn(
            "flex flex-col rounded-2xl bg-slate-900 p-6 md:p-8 text-slate-100",
            panelClassName,
          )}
        >
          <div className={cn("mb-6", headerClassName)}>
            {heading &&
              (typeof heading === "string" ? (
                <h2
                  className={cn(
                    "mb-3 text-3xl font-bold tracking-tight text-balance text-white md:text-5xl",
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
                    "leading-relaxed text-balance text-slate-300",
                    descriptionClassName,
                  )}
                >
                  {description}
                </p>
              ) : (
                <div className={descriptionClassName}>{description}</div>
              ))}
          </div>

          <Card
            className={cn(
              "mt-4 border-0 bg-rose-500 text-rose-50 shadow-none",
              cardClassName,
            )}
          >
            <CardContent className={cn("p-6 lg:p-8", cardContentClassName)}>
              {renderForm}
            </CardContent>
          </Card>
        </div>

        <div className={cn("h-full", mapColumnClassName)}>
          <GeoMap {...resolvedMapProps} />
        </div>
      </div>
    </Section>
  );
}
