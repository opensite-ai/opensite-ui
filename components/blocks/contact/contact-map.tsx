"use client";

import * as React from "react";
import {
  FormEngine,
  FormEngineProps,
  FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";
import { GeoMap, type GeoMapProps } from "@page-speed/maps";
import { cn } from "../../../lib/utils";
import { Card, CardContent } from "../../ui/card";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";

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
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * ContactMap - Contact form with flexible field configuration and integrated map
 *
 * Now uses @page-speed/maps for optimal tree-shaking and performance.
 *
 * @example
 * ```tsx
 * <ContactMap
 *   heading="Get In Touch"
 *   formEngineSetup={{ formConfig: { endpoint: "/api/contact", format: "json" } }}
 *   mapProps={{
 *     markers: [{
 *       id: 'office',
 *       latitude: 40.7128,
 *       longitude: -74.0060,
 *       title: 'Our Office',
 *     }],
 *     stadiaApiKey: process.env.NEXT_PUBLIC_STADIA_API_KEY,
 *   }}
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
  contentGridClassName,
  mapColumnClassName,
  mapClassName,
  background,
  spacing = "xl",
  pattern,
  patternOpacity,
  mapProps,
  optixFlowConfig,
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
      panelPosition: "top-left",
      ...mapProps,
      // Don't override mapWrapperClassName if it's provided in mapProps
      mapWrapperClassName: mapProps?.mapWrapperClassName,
      className: cn(mapClassName, mapProps?.className),
      optixFlowConfig,
      // Provide icon and image components for rich marker panels
      IconComponent: DynamicIcon,
      ImgComponent: Img,
    };
  }, [mapClassName, mapProps, optixFlowConfig]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div
        className={cn(
          "mx-auto grid max-w-full md:max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
          contentGridClassName,
        )}
      >
        <Card className={cn("shadow-lg rounded-xl", cardClassName)}>
          <CardContent className={cardContentClassName}>
            <div className={cn("mb-6", headerClassName)}>
              {heading &&
                (typeof heading === "string" ? (
                  <h2
                    className={cn(
                      "mb-3 text-2xl font-bold tracking-tight text-pretty md:text-4xl",
                      headingClassName,
                    )}
                  >
                    {heading}
                  </h2>
                ) : (
                  heading
                ))}
              {description &&
                (typeof description === "string" ? (
                  <p
                    className={cn(
                      "leading-relaxed text-pretty",
                      descriptionClassName,
                    )}
                  >
                    {description}
                  </p>
                ) : (
                  description
                ))}
            </div>

            {renderForm}
          </CardContent>
        </Card>

        <div
          className={cn(
            // Allow map panels to overflow outside container
            "relative shadow-lg rounded-xl",
            mapColumnClassName,
          )}
          style={{
            // Explicitly allow overflow for marker panels
            overflow: "visible",
          }}
        >
          <GeoMap {...resolvedMapProps} />
        </div>
      </div>
    </Section>
  );
}
