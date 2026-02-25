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
import { Img } from "@page-speed/img";
import { type PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import { Section } from "../../ui/section";
import { ContentGroup, type ContentGroupItem } from "../../ui/content-group";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "",
  fieldsContainer: "",
  fieldClassName: "",
  formClassName: "space-y-6",
};

export interface DirectionConfig {
  desktop: "mediaRight" | "mediaLeft";
  mobile: "mediaTop" | "mediaBottom";
}

export interface ContactPhotographyProps {
  /** Main heading text */
  heading?: React.ReactNode;
  /** Description text below heading */
  description?: React.ReactNode;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /** Additional CSS classes for the section */
  className?: string;
  /** Additional CSS classes for the heading */
  headingClassName?: string;
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
  /** Additional CSS classes for the content area */
  contentClassName?: string;
  /** Section background variant */
  background?: SectionBackground;
  /** Pattern background key or URL */
  pattern?: PatternName | undefined;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /** Pattern opacity (0-1) */
  patternOpacity?: number;
  /**
   * Image configuration for the left panel
   */
  image?: {
    src: string;
    alt: string;
  };
  /** Additional CSS classes for the image */
  imageClassName?: string;
  /** Optional Optix Flow configuration for image optimization */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Direction configuration for desktop and mobile layouts
   * @default { desktop: 'mediaRight', mobile: 'mediaTop' }
   */
  directionConfig?: DirectionConfig;
  /**
   * Full form engine setup and props
   */
  formEngineSetup?: FormEngineProps;
}

// Default form fields
const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "first_name",
    type: "text",
    label: "First Name",
    placeholder: "First name",
    required: true,
    columnSpan: 6,
  },
  {
    name: "last_name",
    type: "text",
    label: "Last Name",
    placeholder: "Last name",
    required: true,
    columnSpan: 6,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "your@email.com",
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

/**
 * ContactPhotography - A full-width split-screen contact form section with edge-to-edge design,
 * featuring text content and a form on one side and a large full-height image on the other.
 *
 * Layout: 50/50 split layout with content/form and image sections. Fully responsive with
 * configurable media placement for desktop and mobile.
 * Key features: Pattern background support, edge-to-edge design, no card wrapping.
 * Best for: Photography studios, creative services, visual-first contact pages.
 */
export function ContactPhotography({
  heading,
  description,
  containerClassName = "px-0 sm:px-0 md:px-0 lg:px-0 mx-0 w-full max-w-full relative z-10",
  className,
  headingClassName,
  descriptionClassName,
  contentClassName,
  spacing = "none",
  background,
  pattern,
  patternOpacity,
  image,
  imageClassName,
  optixFlowConfig,
  directionConfig = { desktop: "mediaRight", mobile: "mediaTop" },
  formEngineSetup,
}: ContactPhotographyProps): React.JSX.Element {
  const headerItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (heading) {
      if (typeof heading === "string") {
        items.push({
          _type: "text",
          as: "h2",
          className: cn(
            "text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl",
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
            "text-base leading-relaxed opacity-90 sm:text-lg",
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

  const desktopOrder = React.useMemo(() => {
    return directionConfig.desktop === "mediaRight"
      ? "lg:flex-row"
      : "lg:flex-row-reverse";
  }, [directionConfig?.desktop]);

  const mobileOrder = React.useMemo(() => {
    return directionConfig?.mobile === "mediaTop"
      ? "flex-col"
      : "flex-col-reverse";
  }, [directionConfig?.mobile]);

  const imageArea = React.useMemo(() => {
    if (!image?.src) {
      return null;
    }

    return (
      <div className="relative h-64 w-full sm:h-96 lg:h-auto lg:w-1/2">
        <Img
          src={image?.src}
          alt={image?.alt || "Contact Photo Banner"}
          className={cn("h-full w-full object-cover", imageClassName)}
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    );
  }, [image, imageClassName, optixFlowConfig]);

  const contentArea = (
    <div
      className={cn(
        "relative flex w-full items-center lg:w-1/2",
        contentClassName,
      )}
    >
      <div className="relative z-10 w-full px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 xl:px-24">
        <div className="mx-auto max-w-xl space-y-8">
          <ContentGroup items={headerItems} className="space-y-8" />

          {formEngineSetup ? (
            <FormEngine
              formEngineSetup={formEngineSetup}
              defaultFields={DEFAULT_FORM_FIELDS}
              defaultStyleRules={DEFAULT_STYLE_RULES}
            />
          ) : null}
        </div>
      </div>
    </div>
  );

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={className}
      containerClassName={containerClassName}
    >
      <div className={cn("flex min-h-screen", mobileOrder, desktopOrder)}>
        {contentArea}
        {imageArea}
      </div>
    </Section>
  );
}
