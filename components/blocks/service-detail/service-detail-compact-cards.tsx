"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type {
  OptixFlowConfig,
  SectionBackground,
  SectionSpacing,
} from "../../../src/types";

export interface CompactExpertiseItem {
  icon?: string;
  iconSlot?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export interface CompactServiceItem {
  iconName?: string;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
}

export interface CompactRelatedServiceItem {
  image?: string;
  imageAlt?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  href?: string;
  className?: string;
}

export interface CompactContentSection {
  title?: React.ReactNode;
  paragraphs?: React.ReactNode[];
  contentSlot?: React.ReactNode;
  className?: string;
}

export interface ServiceDetailCompactCardsProps {
  title?: React.ReactNode;
  titleClassName?: string;
  serviceIcon?: {
    src: string;
    alt: string;
  };
  serviceIconSlot?: React.ReactNode;
  serviceIconClassName?: string;
  introDescription?: React.ReactNode;
  introDescriptionClassName?: string;
  expertiseTitle?: React.ReactNode;
  expertiseTitleClassName?: string;
  expertise?: CompactExpertiseItem[];
  expertiseSlot?: React.ReactNode;
  expertiseClassName?: string;
  servicesTitle?: React.ReactNode;
  servicesTitleClassName?: string;
  services?: CompactServiceItem[];
  servicesSlot?: React.ReactNode;
  servicesClassName?: string;
  relatedServicesTitle?: React.ReactNode;
  relatedServicesTitleClassName?: string;
  relatedServices?: CompactRelatedServiceItem[];
  relatedServicesSlot?: React.ReactNode;
  relatedServicesClassName?: string;
  contentSections?: CompactContentSection[];
  contentSectionsSlot?: React.ReactNode;
  contentSectionsClassName?: string;
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
  background?: SectionBackground;
  spacing?: SectionSpacing;
  pattern?: PatternName | string;
  patternOpacity?: number;
  optixFlowConfig?: OptixFlowConfig;
}

const defaultExpertise: CompactExpertiseItem[] = [
  {
    icon: blockBrandedIconsAndPlaceholders.integration1,
    title: "Adobe Creative Suite",
    description: "Design proficiency",
  },
  {
    icon: blockBrandedIconsAndPlaceholders.integration2,
    title: "Figma",
    description: "Years experience",
  },
  {
    icon: blockBrandedIconsAndPlaceholders.integration3,
    title: "Sketch",
    description: "Projects completed",
  },
];

const defaultServices: CompactServiceItem[] = [
  { iconName: "lucide/users", title: "User research and persona development" },
  {
    iconName: "lucide/map",
    title: "Information architecture and user journey mapping",
  },
  {
    iconName: "lucide/pen-tool",
    title: "Wireframing and interactive prototyping",
  },
  { iconName: "lucide/palette", title: "Visual design and brand integration" },
  {
    iconName: "lucide/test-tube",
    title: "Usability testing and design validation",
  },
  {
    iconName: "lucide/book-open",
    title: "Design system creation and documentation",
  },
];

const defaultRelatedServices: CompactRelatedServiceItem[] = [
  {
    image: imagePlaceholders[1],
    title: "Brand Identity",
    description: "Logo design and brand guidelines",
    href: "#",
  },
  {
    image: imagePlaceholders[2],
    title: "Web Development",
    description: "Custom website development",
    href: "#",
  },
  {
    image: imagePlaceholders[3],
    title: "Mobile App Design",
    description: "iOS and Android app interfaces",
    href: "#",
  },
  {
    image: imagePlaceholders[4],
    title: "Design Systems",
    description: "Scalable component libraries",
    href: "#",
  },
];

const defaultContentSections: CompactContentSection[] = [
  {
    title: "Creating Meaningful Digital Experiences",
    paragraphs: [
      "We combine user research, information architecture, and visual design to deliver experiences that drive engagement and conversions.",
      "Through comprehensive user research and testing, we validate design decisions with real data. Our iterative design process ensures that every element serves a purpose and contributes to your business goals while providing an exceptional user experience.",
      "We specialize in creating design systems that scale with your business, ensuring consistency across all touchpoints while maintaining flexibility for future growth and evolution.",
      "Our collaborative approach involves stakeholders throughout the design process, from initial wireframes to final prototypes. This ensures alignment between business objectives and user needs, resulting in products that succeed in the market.",
      "Every design decision is backed by research and testing, creating solutions that are not just visually appealing but strategically sound and user-validated.",
    ],
  },
  {
    title: "Strategic Design for Business Success",
    paragraphs: [
      "Our design philosophy centers on creating interfaces that bridge the gap between user needs and business objectives. We understand that great UX/UI design is not just about aesthetics—it's about creating meaningful interactions that drive results.",
      "From initial concept to final implementation, we ensure that every design element contributes to a cohesive user experience that reflects your brand values and supports your business goals. Our designs are optimized for performance, accessibility, and scalability across all devices and platforms.",
    ],
  },
];

export function ServiceDetailCompactCards({
  title = "UX/UI Design",
  titleClassName,
  serviceIcon = {
    src: blockBrandedIconsAndPlaceholders.ux,
    alt: "UX/UI Design",
  },
  serviceIconSlot,
  serviceIconClassName,
  introDescription = "We believe that great design should be intuitive, accessible, and purposeful for every user who interacts with your product. Our UX/UI design approach focuses on understanding your users' needs, behaviors, and pain points to create interfaces that not only look beautiful but function seamlessly.",
  introDescriptionClassName,
  expertiseTitle = "Our Expertise",
  expertiseTitleClassName,
  expertise = defaultExpertise,
  expertiseSlot,
  expertiseClassName,
  servicesTitle = "Our UX/UI Design Services",
  servicesTitleClassName,
  services = defaultServices,
  servicesSlot,
  servicesClassName,
  relatedServicesTitle = "Related Services",
  relatedServicesTitleClassName,
  relatedServices = defaultRelatedServices,
  relatedServicesSlot,
  relatedServicesClassName,
  contentSections = defaultContentSections,
  contentSectionsSlot,
  contentSectionsClassName,
  className,
  containerClassName,
  headerClassName,
  background,
  spacing,
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ServiceDetailCompactCardsProps) {
  const renderServiceIcon = () => {
    if (serviceIconSlot) return serviceIconSlot;
    if (!serviceIcon) return null;

    return (
      <div className={cn("shrink-0 rounded-lg bg-muted p-4", serviceIconClassName)}>
        <Img
          src={serviceIcon.src}
          alt={serviceIcon.alt}
          className="h-12 dark:invert"
          optixFlowConfig={optixFlowConfig}
        />
      </div>
    );
  };

  const renderExpertise = () => {
    if (expertiseSlot) return expertiseSlot;
    if (!expertise || expertise.length === 0) return null;

    return (
      <div className={cn("mb-16", expertiseClassName)}>
        {expertiseTitle && (
          <h2 className={cn("mb-6 text-xl font-semibold", expertiseTitleClassName)}>
            {expertiseTitle}
          </h2>
        )}
        <div className="flex flex-wrap gap-4">
          {expertise.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-3 rounded-lg border bg-background px-4 py-3",
                item.className
              )}
            >
              {item.iconSlot ? (
                item.iconSlot
              ) : item.icon ? (
                <Img
                  src={item.icon}
                  alt={typeof item.title === "string" ? item.title : ""}
                  className="h-6 w-6 object-contain"
                  optixFlowConfig={optixFlowConfig}
                />
              ) : null}
              <div>
                {item.title && (
                  <div className="text-sm font-medium">
                    {typeof item.title === "string" ? item.title : item.title}
                  </div>
                )}
                {item.description && (
                  <div className="text-xs text-muted-foreground">
                    {typeof item.description === "string"
                      ? item.description
                      : item.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContentSections = () => {
    if (contentSectionsSlot) return contentSectionsSlot;
    if (!contentSections || contentSections.length === 0) return null;

    return (
      <div
        className={cn(
          "prose prose-sm mx-auto max-w-none dark:prose-invert",
          contentSectionsClassName
        )}
      >
        {contentSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className={section.className}>
            {section.contentSlot ? (
              section.contentSlot
            ) : (
              <>
                {section.title && (
                  <h2>
                    {typeof section.title === "string"
                      ? section.title
                      : section.title}
                  </h2>
                )}
                {section.paragraphs?.map((paragraph, paragraphIndex) =>
                  typeof paragraph === "string" ? (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ) : (
                    <div key={paragraphIndex}>{paragraph}</div>
                  )
                )}
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <div className={cn("mt-16", servicesClassName)}>
        {servicesTitle && (
          <h2 className={cn("mb-6 text-xl font-semibold", servicesTitleClassName)}>
            {servicesTitle}
          </h2>
        )}
        <div className="grid gap-3 md:grid-cols-2">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center gap-3 rounded-lg border bg-background p-4",
                service.className
              )}
            >
              {service.icon ? (
                service.icon
              ) : service.iconName ? (
                <DynamicIcon
                  name={service.iconName}
                  size={20}
                  className="shrink-0 text-primary"
                />
              ) : null}
              {service.title && (
                <span className="text-sm">
                  {typeof service.title === "string"
                    ? service.title
                    : service.title}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderRelatedServices = () => {
    if (relatedServicesSlot) return relatedServicesSlot;
    if (!relatedServices || relatedServices.length === 0) return null;

    return (
      <div className={cn("mt-16", relatedServicesClassName)}>
        {relatedServicesTitle && (
          <h2
            className={cn("mb-6 text-xl font-semibold", relatedServicesTitleClassName)}
          >
            {relatedServicesTitle}
          </h2>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedServices.map((service, index) => (
            <Pressable
              key={index}
              href={service.href}
              className={cn(
                "group block overflow-hidden rounded-lg border bg-background transition-shadow hover:shadow-lg",
                service.className
              )}
            >
              {service.image && (
                <div className="aspect-4/3 overflow-hidden">
                  <Img
                    src={service.image}
                    alt={
                      service.imageAlt ||
                      (typeof service.title === "string" ? service.title : "")
                    }
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              )}
              <div className="p-3">
                {service.title && (
                  <h3 className="text-sm font-medium group-hover:text-primary">
                    {typeof service.title === "string"
                      ? service.title
                      : service.title}
                  </h3>
                )}
                {service.description && (
                  <p className="text-xs text-muted-foreground">
                    {typeof service.description === "string"
                      ? service.description
                      : service.description}
                  </p>
                )}
              </div>
            </Pressable>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Section
      className={className}
      background={background}
      spacing={spacing}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("mx-auto max-w-4xl", containerClassName)}>
        <div className={cn("mb-16 space-y-8", headerClassName)}>
          <div className="flex items-start gap-6">
            {renderServiceIcon()}
            <div className="space-y-4">
              {title && (
                <h1
                  className={cn(
                    "text-4xl font-medium tracking-tight md:text-5xl",
                    titleClassName
                  )}
                >
                  {typeof title === "string" ? title : title}
                </h1>
              )}
              {introDescription && (
                <p
                  className={cn(
                    "text-xl leading-relaxed text-muted-foreground",
                    introDescriptionClassName
                  )}
                >
                  {typeof introDescription === "string"
                    ? introDescription
                    : introDescription}
                </p>
              )}
            </div>
          </div>
        </div>

        {renderExpertise()}
        {renderContentSections()}
        {renderServices()}
        {renderRelatedServices()}
      </div>
    </Section>
  );
}
