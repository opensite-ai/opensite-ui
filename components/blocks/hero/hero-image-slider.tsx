"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Section } from "../../ui/section";
import { ImageSlider, type ImageSliderImage } from "../../ui/image-slider";
import { Card, CardContent } from "../../ui/card";
import {
  FormEngine,
  FormEngineProps,
  FormEngineStyleRules,
  type FormFieldConfig,
} from "@page-speed/forms/integration";
import type {
  ActionConfig,
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import { BlockActions } from "@/components/ui/block-actions";
import { BrandLogo } from "../../ui/brand-logo";
import { DynamicIcon } from "../../ui/dynamic-icon";
import type { LogoConfig } from "../navbars/types";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "",
  fieldsContainer: "",
  fieldClassName: "",
  formClassName: "space-y-4",
};

const DEFAULT_FORM_FIELDS: FormFieldConfig[] = [
  {
    name: "first_name",
    type: "text",
    label: "First name",
    placeholder: "John",
    required: true,
    columnSpan: 12,
  },
  {
    name: "last_name",
    type: "text",
    label: "Last name",
    placeholder: "Doe",
    required: true,
    columnSpan: 12,
  },
  {
    name: "email",
    type: "email",
    label: "E-mail",
    placeholder: "john@example.com",
    required: true,
    columnSpan: 12,
  },
];

export interface HeroImageSliderProps {
  /**
   * Eyebrow label above the heading
   */
  eyebrow?: React.ReactNode;
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Supporting description text
   */
  description?: React.ReactNode;
  /**
   * Action button configurations
   */
  actions?: ActionConfig[];
  /**
   * Custom slot for actions (overrides actions array)
   */
  actionsSlot?: React.ReactNode;
  /**
   * Custom content slot for the hero copy area
   */
  contentSlot?: React.ReactNode;
  /**
   * Image slider items
   */
  images?: ImageSliderImage[];
  /**
   * Enable autoplay rotation
   */
  autoplay?: boolean;
  /**
   * Autoplay interval in milliseconds
   */
  autoplayIntervalMs?: number;
  /**
   * Slide direction for transitions
   */
  direction?: "up" | "down";
  /**
   * Enable the overlay gradient
   */
  overlay?: boolean;
  /**
   * Custom overlay slot (overrides default overlay)
   */
  overlaySlot?: React.ReactNode;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Background pattern
   */
  pattern?: PatternName;
  /**
   * Pattern opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the slider wrapper
   */
  sliderClassName?: string;
  /**
   * Additional CSS classes for the hero content wrapper
   */
  contentClassName?: string;
  /**
   * Additional CSS classes for the eyebrow
   */
  eyebrowClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the actions container
   */
  actionsClassName?: string;
  /**
   * Additional CSS classes for the image element
   */
  imageClassName?: string;
  /**
   * Additional CSS classes for the overlay layer
   */
  overlayClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
  /**
   * Form heading text
   */
  formHeading?: React.ReactNode;
  /**
   * Submit button text
   */
  buttonText?: string;
  /**
   * Icon to display in submit button
   */
  buttonIcon?: React.ReactNode | string;
  /**
   * Full form engine setup and props
   */
  formEngineSetup?: FormEngineProps;
  /**
   * Additional CSS classes for the form card
   */
  cardClassName?: string;
  /**
   * Additional CSS classes for the card content
   */
  cardContentClassName?: string;
  /**
   * Additional CSS classes for the form heading
   */
  formHeadingClassName?: string;
  /**
   * Privacy notice text below the form
   */
  privacyNotice?: React.ReactNode;
  /**
   * Additional CSS classes for the privacy notice
   */
  privacyNoticeClassName?: string;
  /**
   * Additional CSS classes for the grid layout
   */
  gridClassName?: string;
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

/**
 * HeroImageSlider - A full-width hero with background image slider,
 * split layout with content on the left and a form card on the right.
 */
export function HeroImageSlider({
  sectionId = "hero-image-slider",
  eyebrow,
  heading,
  description,
  actions,
  actionsSlot,
  contentSlot,
  images,
  autoplay = true,
  autoplayIntervalMs = 6000,
  direction = "up",
  overlay = true,
  overlaySlot,
  background,
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-12 py-12",
  spacing = "hero",
  pattern,
  patternOpacity,
  className,
  sliderClassName,
  contentClassName,
  eyebrowClassName,
  headingClassName,
  descriptionClassName,
  actionsClassName,
  imageClassName,
  overlayClassName,
  optixFlowConfig,
  formHeading,
  buttonText,
  buttonIcon,
  formEngineSetup,
  cardClassName,
  cardContentClassName,
  formHeadingClassName,
  privacyNotice,
  privacyNoticeClassName,
  gridClassName,
  logo,
  logoSlot,
  logoClassName,
}: HeroImageSliderProps): React.JSX.Element {
  const renderContent = useMemo(() => {
    if (contentSlot) return contentSlot;

    return (
      <div
        className={cn(
          "flex flex-col items-start justify-center",
          contentClassName,
        )}
      >
        {eyebrow ? (
          typeof eyebrow === "string" ? (
            <p
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.3em] text-white/80",
                eyebrowClassName,
              )}
            >
              {eyebrow}
            </p>
          ) : (
            eyebrow
          )
        ) : null}
        {(logo || logoSlot) && (
          <div className={cn("mb-4", logoClassName)}>
            <BrandLogo logo={logo} logoSlot={logoSlot} size="lg" />
          </div>
        )}
        {heading ? (
          typeof heading === "string" ? (
            <h1
              className={cn(
                "mt-3 text-3xl font-bold tracking-tight text-balance md:text-4xl lg:text-5xl text-white text-shadow-lg",
                headingClassName,
              )}
            >
              {heading}
            </h1>
          ) : (
            <div className={cn("mt-3", headingClassName)}>{heading}</div>
          )
        ) : null}
        {description ? (
          typeof description === "string" ? (
            <p
              className={cn(
                "mt-4 text-sm text-white/90 text-balance md:text-base max-w-md text-shadow-lg",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          ) : (
            <div className={cn("mt-4", descriptionClassName)}>
              {description}
            </div>
          )
        ) : null}
        <BlockActions
          actions={actions}
          actionsSlot={actionsSlot}
          actionsClassName={actionsClassName}
        />
      </div>
    );
  }, [
    contentSlot,
    eyebrow,
    heading,
    description,
    actionsSlot,
    actions,
    contentClassName,
    eyebrowClassName,
    headingClassName,
    descriptionClassName,
    actionsClassName,
  ]);

  const hasForm = formEngineSetup !== undefined;

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn("relative overflow-hidden", className)}
      containerClassName={containerClassName}
    >
      {/* Full-width background image slider */}
      <div className={cn("absolute inset-0", sliderClassName)}>
        <ImageSlider
          images={images && images.length ? images : []}
          autoplay={autoplay}
          autoplayIntervalMs={autoplayIntervalMs}
          direction={direction}
          transition="fade"
          overlay={overlay}
          overlaySlot={overlaySlot}
          overlayClassName={cn(
            "bg-linear-to-r from-black/70 via-black/50 to-black/30",
            overlayClassName,
          )}
          className="min-h-full w-full rounded-none md:rounded-2xl border-none shadow-none md:shadow-xl overflow-hidden"
          imageClassName={cn("scale-[1.02]", imageClassName)}
          optixFlowConfig={optixFlowConfig}
        />
      </div>

      {/* Content Grid */}
      <div
        className={cn(
          "relative z-20 grid min-h-[500px] md:min-h-[600px] gap-8 lg:gap-12 grid-cols-1",
          hasForm ? "lg:grid-cols-2" : "lg:grid-cols-1",
          gridClassName,
        )}
      >
        {/* Left: Content */}
        <div className="flex items-center">{renderContent}</div>

        {/* Right: Form Card */}
        {hasForm && (
          <div className="flex items-center justify-center lg:justify-end">
            <Card
              className={cn(
                "w-full max-w-sm bg-card/95 backdrop-blur-sm shadow-2xl",
                cardClassName,
              )}
            >
              <CardContent className={cn("p-6 lg:p-8", cardContentClassName)}>
                {formHeading &&
                  (typeof formHeading === "string" ? (
                    <h3
                      className={cn(
                        "mb-6 text-xl font-semibold",
                        formHeadingClassName,
                      )}
                    >
                      {formHeading}
                    </h3>
                  ) : (
                    <div className={cn("mb-6", formHeadingClassName)}>
                      {formHeading}
                    </div>
                  ))}

                <FormEngine
                  formEngineSetup={{
                    ...formEngineSetup,
                    formLayoutSettings: {
                      ...formEngineSetup?.formLayoutSettings,
                      formLayout: "standard",
                      submitButtonSetup: {
                        ...formEngineSetup?.formLayoutSettings
                          ?.submitButtonSetup,
                        submitLabel: (
                          <>
                            <DynamicIcon name={buttonIcon} />
                            {buttonText}
                          </>
                        ),
                      },
                    },
                  }}
                  defaultFields={DEFAULT_FORM_FIELDS}
                  defaultStyleRules={DEFAULT_STYLE_RULES}
                />

                {privacyNotice && (
                  <p
                    className={cn(
                      "mt-4 text-xs text-muted-foreground text-center",
                      privacyNoticeClassName,
                    )}
                  >
                    {privacyNotice}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Section>
  );
}
