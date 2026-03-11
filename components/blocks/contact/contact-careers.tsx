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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";

const DEFAULT_STYLE_RULES: FormEngineStyleRules = {
  formContainer: "",
  fieldsContainer: "",
  fieldClassName: "",
  formClassName: "space-y-6",
};

/**
 * A job listing item for the sidebar accordion
 */
export interface JobListingItem {
  /**
   * Unique identifier for the job listing
   */
  id: string;
  /**
   * Job title (displayed as accordion trigger)
   */
  title: React.ReactNode;
  /**
   * Job description/details (displayed in accordion content)
   */
  description: React.ReactNode;
}

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
  /**
   * Array of job listings to display in the sidebar accordion.
   * Each item will render as an expandable card showing job details.
   */
  jobListings?: JobListingItem[];
  /**
   * Custom sidebar component that replaces the default job listings accordion.
   * Use this for fully custom sidebar content.
   */
  sidebarComponent?: React.ReactNode;
  /**
   * Title for the sidebar section
   * @default "Open Positions"
   */
  sidebarTitle?: string;
  /**
   * Description for the sidebar section
   */
  sidebarDescription?: string;
  /**
   * Additional CSS classes for the sidebar wrapper
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the sticky container inside the sidebar
   */
  sidebarStickyClassName?: string;
  /**
   * Additional CSS classes for the accordion
   */
  accordionClassName?: string;
  /**
   * Additional CSS classes for accordion items
   */
  accordionItemClassName?: string;
  /**
   * Additional CSS classes for accordion triggers
   */
  accordionTriggerClassName?: string;
  /**
   * Additional CSS classes for accordion content
   */
  accordionContentClassName?: string;
  /**
   * Title for the form card
   */
  formCardTitle?: string;
  /**
   * Description for the form card
   */
  formCardDescription?: string;
  /** Optional Section ID */
  sectionId?: string;
}

/**
 * ContactCareers - A comprehensive job application form with position selection,
 * resume upload, and availability options. Features a sticky sidebar that can display
 * expandable job listings or custom content, allowing applicants to reference job
 * details while completing their application.
 *
 * @example
 * ```tsx
 * <ContactCareers
 *   heading="Join Our Team"
 *   description="We're always looking for talented people to join us."
 *   formEngineSetup={{ formConfig: { endpoint: "/api/careers", format: "json" } }}
 *   jobListings={[
 *     { id: "1", title: "Frontend Developer", description: "Build amazing UIs..." },
 *     { id: "2", title: "Backend Developer", description: "Design robust APIs..." },
 *   ]}
 * />
 * ```
 */
export function ContactCareers({
  sectionId = "contact-careers",
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
  spacing = "xl",
  pattern,
  patternOpacity,
  formEngineSetup,
  jobListings,
  sidebarComponent,
  sidebarTitle = "Open Positions",
  sidebarDescription,
  sidebarClassName,
  sidebarStickyClassName,
  accordionClassName,
  accordionItemClassName,
  accordionTriggerClassName,
  accordionContentClassName,
  formCardTitle,
  formCardDescription,
}: ContactCareersProps): React.JSX.Element {
  // Memoize the job listings accordion content
  const jobListingsContent = useMemo(() => {
    if (sidebarComponent) return sidebarComponent;
    if (!jobListings || jobListings.length === 0) return null;

    return (
      <Accordion
        type="single"
        collapsible
        className={cn("space-y-3", accordionClassName)}
      >
        {jobListings.map((job) => (
          <AccordionItem
            key={job.id}
            value={job.id}
            className={cn(
              "rounded-xl border border-border/60",
              "px-5 shadow-sm transition-all hover:shadow-md",
              "data-[state=open]:shadow-md",
              "data-[state=open]:bg-card data-[state=open]:text-card-foreground",
              accordionItemClassName,
            )}
          >
            <AccordionTrigger
              className={cn(
                "py-4 font-medium transition-opacity",
                "hover:no-underline hover:opacity-70 lg:text-lg",
                "[&[data-state=open]>svg]:rotate-180",
                "cursor-pointer",
                accordionTriggerClassName,
              )}
            >
              {job.title}
            </AccordionTrigger>
            <AccordionContent className={cn("pb-4", accordionContentClassName)}>
              {job.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }, [
    sidebarComponent,
    jobListings,
    accordionClassName,
    accordionItemClassName,
    accordionTriggerClassName,
    accordionContentClassName,
  ]);

  const contentItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (heading) {
      if (typeof heading === "string") {
        items.push({
          _type: "text",
          as: "h1",
          className: cn(
            "text-4xl font-bold tracking-tight md:text-6xl text-balance",
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
            "max-w-2xl text-lg md:text-xl text-balance",
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

  const hasSidebar =
    sidebarComponent || (jobListings && jobListings.length > 0);

  return (
    <Section
      id={sectionId}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      className={cn(pattern && "overflow-visible", className)}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div className={cn("mb-10", headerClassName)}>
          <ContentGroup className="space-y-3" items={contentItems} />
        </div>

        <div className={cn("grid gap-8", hasSidebar && "lg:grid-cols-5")}>
          {/* Job Listings Sidebar - Mobile: stacked on top, Desktop: sticky right column */}
          {hasSidebar && (
            <div
              className={cn(
                "order-first lg:order-last lg:col-span-2",
                sidebarClassName,
              )}
            >
              <div className={cn("lg:sticky lg:top-8", sidebarStickyClassName)}>
                <div className="py-0 px-0 md:px-6">
                  {(sidebarTitle || sidebarDescription) && (
                    <div className="space-y-4 mb-6 md:mb-8">
                      {sidebarTitle && (
                        <div className="text-base uppercase font-bold opacity-60">
                          {sidebarTitle}
                        </div>
                      )}
                      {sidebarDescription && (
                        <div className="text-sm text-pretty">
                          {sidebarDescription}
                        </div>
                      )}
                    </div>
                  )}
                  {jobListingsContent}
                </div>
              </div>
            </div>
          )}

          {/* Application Form - Takes more space */}
          <div className={cn(hasSidebar && "lg:col-span-3")}>
            <Card className={cardClassName}>
              {(formCardTitle || formCardDescription) && (
                <CardHeader>
                  {formCardTitle && <CardTitle>{formCardTitle}</CardTitle>}
                  {formCardDescription && (
                    <CardDescription>{formCardDescription}</CardDescription>
                  )}
                </CardHeader>
              )}
              <CardContent
                className={cn("pt-6 md:pt-0 p-6", cardContentClassName)}
              >
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
        </div>
      </div>
    </Section>
  );
}
