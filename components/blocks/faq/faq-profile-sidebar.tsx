"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn, getTextColor } from "../../../lib/utils";
import { Img, type OptixFlowConfig } from "@page-speed/img";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Pressable } from "../../../lib/Pressable";
import { Section } from "../../ui/section";
import type { SectionBackground, SectionSpacing } from "../../../src/types";
import type { PatternName } from "../../ui/pattern-background";
import type { ActionConfig } from "../../../src/types";

export interface FaqItem {
  id: string;
  question: React.ReactNode;
  answer: React.ReactNode;
}

export interface FaqProfileSidebarProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Description text below heading
   */
  description?: React.ReactNode;
  /**
   * Array of FAQ items
   */
  items?: FaqItem[];
  /**
   * Custom slot for rendering items (overrides items array)
   */
  itemsSlot?: React.ReactNode;
  /**
   * Custom slot for rendering the profile section
   */
  profileSlot?: React.ReactNode;
  /**
   * Profile image URL
   */
  profileImage?: string;
  /**
   * Profile name
   */
  profileName?: React.ReactNode;
  /**
   * Profile role/title
   */
  profileRole?: React.ReactNode;
  /**
   * Profile description text
   */
  profileDescription?: React.ReactNode;
  /**
   * Contact section text
   */
  contactText?: React.ReactNode;
  /**
   * Contact action configuration
   */
  contactAction?: ActionConfig;
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
  /**
   * Additional CSS classes for the pattern overlay
   */
  patternClassName?: string;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the content wrapper
   */
  contentWrapperClassName?: string;
  /**
   * Additional CSS classes for the sidebar
   */
  sidebarClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the profile card
   */
  profileCardClassName?: string;
  /**
   * Additional CSS classes for the profile image
   */
  profileImageClassName?: string;
  /**
   * Additional CSS classes for the profile name
   */
  profileNameClassName?: string;
  /**
   * Additional CSS classes for the profile role
   */
  profileRoleClassName?: string;
  /**
   * Additional CSS classes for the profile description
   */
  profileDescriptionClassName?: string;
  /**
   * Additional CSS classes for the contact section
   */
  contactSectionClassName?: string;
  /**
   * Additional CSS classes for the FAQ column
   */
  faqColumnClassName?: string;
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
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: OptixFlowConfig;
}

export function FaqProfileSidebar({
  heading,
  description,
  items,
  itemsSlot,
  profileSlot,
  profileImage,
  profileName,
  profileRole,
  profileDescription,
  contactText,
  contactAction,
  background,
  spacing = "py-6 md:py-32",
  pattern,
  patternOpacity,
  patternClassName,
  className,
  containerClassName,
  contentWrapperClassName,
  sidebarClassName,
  headingClassName,
  descriptionClassName,
  profileCardClassName,
  profileImageClassName,
  profileNameClassName,
  profileRoleClassName,
  profileDescriptionClassName,
  contactSectionClassName,
  faqColumnClassName,
  accordionClassName,
  accordionItemClassName,
  accordionTriggerClassName,
  accordionContentClassName,
  optixFlowConfig,
}: FaqProfileSidebarProps) {
  const itemsContent = useMemo(() => {
    if (itemsSlot) return itemsSlot;
    if (!items || items.length === 0) return null;

    return (
      <Accordion type="single" collapsible className={accordionClassName}>
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className={accordionItemClassName}
          >
            <AccordionTrigger
              className={cn(
                "transition-opacity duration-200 hover:no-underline hover:opacity-60",
                accordionTriggerClassName,
              )}
            >
              <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                {item.question}
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={cn("sm:mb-1 lg:mb-2", accordionContentClassName)}
            >
              <div className={cn(getTextColor(background, "muted"), "lg:text-lg")}>
                {item.answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }, [
    itemsSlot,
    items,
    accordionClassName,
    accordionItemClassName,
    accordionTriggerClassName,
    accordionContentClassName,
    background,
  ]);

  const profileSectionContent = useMemo(() => {
    if (profileSlot) return profileSlot;

    return (
      <div className={cn("rounded-lg border p-6", profileCardClassName)}>
        <div className="flex items-center gap-4">
          {profileImage && (
            <Img
              src={profileImage}
              alt={typeof profileName === "string" ? profileName : "Profile"}
              className={cn(
                "size-16 rounded-xl object-cover shadow-md",
                profileImageClassName,
              )}
              optixFlowConfig={optixFlowConfig}
            />
          )}
          <div>
            {profileName &&
              (typeof profileName === "string" ? (
                <h3 className={cn("font-semibold", profileNameClassName)}>
                  {profileName}
                </h3>
              ) : (
                <div className={profileNameClassName}>{profileName}</div>
              ))}
            {profileRole &&
              (typeof profileRole === "string" ? (
                <p
                  className={cn(
                    getTextColor(background, "muted"),
                    "text-sm",
                    profileRoleClassName,
                  )}
                >
                  {profileRole}
                </p>
              ) : (
                <div className={profileRoleClassName}>{profileRole}</div>
              ))}
          </div>
        </div>
        {profileDescription &&
          (typeof profileDescription === "string" ? (
            <p
              className={cn(
                getTextColor(background, "muted"),
                "mt-4 text-sm",
                profileDescriptionClassName,
              )}
            >
              {profileDescription}
            </p>
          ) : (
            <div className={profileDescriptionClassName}>
              {profileDescription}
            </div>
          ))}
        {contactAction && (
          <div
            className={cn(
              "mt-6 border-t pt-6 flex flex-col space-y-4",
              contactSectionClassName,
            )}
          >
            {contactText &&
              (typeof contactText === "string" ? (
                <p className="text-sm font-medium">{contactText}</p>
              ) : (
                contactText
              ))}
            <Pressable
              href={contactAction.href}
              onClick={contactAction.onClick}
              variant={contactAction.variant || "outline"}
              size={contactAction.size}
              className={cn("mt-3 w-full", contactAction.className)}
            >
              {contactAction.children || contactAction.label}
            </Pressable>
          </div>
        )}
      </div>
    );
  }, [
    profileSlot,
    profileImage,
    profileName,
    profileRole,
    profileDescription,
    contactText,
    contactAction,
    profileCardClassName,
    profileImageClassName,
    profileNameClassName,
    profileRoleClassName,
    profileDescriptionClassName,
    contactSectionClassName,
    optixFlowConfig,
    background,
  ]);

  return (
    <Section
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
      patternClassName={patternClassName}
      className={className}
    >
      <div className={containerClassName}>
        <div
          className={cn(
            "flex flex-col gap-6 lg:flex-row lg:gap-16",
            contentWrapperClassName,
          )}
        >
          <div className={cn("lg:w-1/3", sidebarClassName)}>
            <div className="sticky top-24 space-y-6">
              <div>
                {heading &&
                  (typeof heading === "string" ? (
                    <h2
                      className={cn(
                        "mb-3 text-xl font-semibold md:mb-4 lg:text-2xl",
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
                        getTextColor(background, "muted"),
                        descriptionClassName,
                      )}
                    >
                      {description}
                    </p>
                  ) : (
                    <div className={descriptionClassName}>{description}</div>
                  ))}
              </div>
              {profileSectionContent}
            </div>
          </div>
          <div className={cn("lg:w-2/3", faqColumnClassName)}>
            {itemsContent}
          </div>
        </div>
      </div>
    </Section>
  );
}
