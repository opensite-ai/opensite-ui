"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "../../../lib/utils";
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
import { ContentGroup, ContentGroupItem } from "@/components/ui/content-group";

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
  /** Optional Section ID */
  sectionId?: string;
}

export function FaqProfileSidebar({
  sectionId = "faq-profile-sidebar",
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
  containerClassName = "px-6 sm:px-6 md:px-8 lg:px-8",
  spacing = "lg",
  pattern,
  patternOpacity,
  patternClassName,
  className,
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
                "transition-opacity duration-200",
                "hover:no-underline hover:opacity-75",
                "cursor-pointer",
                accordionTriggerClassName,
              )}
            >
              <div className="font-medium py-1 lg:py-2 text-lg">
                {item.question}
              </div>
            </AccordionTrigger>
            <AccordionContent
              className={cn("mb-1 lg:mb-2", accordionContentClassName)}
            >
              <div className={cn("text-lg")}>{item.answer}</div>
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
      <div
        className={cn(
          "bg-card text-card-foreground",
          "rounded-lg border",
          "p-4 md:p-6",
          profileCardClassName,
        )}
      >
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
                <div
                  className={cn("text-lg font-semibold", profileNameClassName)}
                >
                  {profileName}
                </div>
              ) : (
                profileName
              ))}
            {profileRole &&
              (typeof profileRole === "string" ? (
                <p className={cn("text-sm opacity-75", profileRoleClassName)}>
                  {profileRole}
                </p>
              ) : (
                profileRole
              ))}
          </div>
        </div>
        {profileDescription &&
          (typeof profileDescription === "string" ? (
            <p className={cn("mt-4 text-sm", profileDescriptionClassName)}>
              {profileDescription}
            </p>
          ) : (
            profileDescription
          ))}
        {contactAction && (
          <div
            className={cn(
              "border-t border-border/50",
              "mt-6 pt-6 space-y-4",
              "flex flex-col",
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

  const contentItems = useMemo(() => {
    const items: ContentGroupItem[] = [];

    if (heading) {
      if (typeof heading === "string") {
        items.push({
          _type: "text",
          as: "h2",
          className: cn(
            "mb-3 text-xl font-semibold md:mb-4 lg:text-2xl",
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
          className: cn("text-lg", descriptionClassName),
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
      patternClassName={patternClassName}
      className={cn(pattern && "overflow-visible", className)}
      containerClassName={containerClassName}
    >
      <div className="relative">
        <div
          className={cn(
            "flex flex-col lg:flex-row",
            "items-center lg:items-start",
            "gap-6 lg:gap-16",
            contentWrapperClassName,
          )}
        >
          <div
            className={cn("w-full lg:w-1/3 lg:self-stretch", sidebarClassName)}
          >
            <div className="sticky top-24 space-y-6">
              <ContentGroup items={contentItems} />

              {profileSectionContent}
            </div>
          </div>
          <div className={cn("w-full lg:w-2/3", faqColumnClassName)}>
            {itemsContent}
          </div>
        </div>
      </div>
    </Section>
  );
}
