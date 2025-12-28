"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";

export interface ServiceDetailProseMinimalProps {
  className?: string;
  title?: string;
  introTitle?: string;
  introDescription?: string;
  contentSections?: Array<{
    title: string;
    paragraphs: string[];
  }>;
  servicesList?: {
    title: string;
    items: string[];
  };
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultProps: Partial<ServiceDetailProseMinimalProps> = {
  title: "UX/UI Design",
  introTitle: "User-Centered Design That Converts",
  introDescription:
    "We believe that great design should be intuitive, accessible, and purposeful for every user who interacts with your product. Our UX/UI design approach focuses on understanding your users' needs, behaviors, and pain points to create interfaces that not only look beautiful but function seamlessly.",
  contentSections: [
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
  ],
  servicesList: {
    title: "Our UX/UI Design Services",
    items: [
      "User research and persona development",
      "Information architecture and user journey mapping",
      "Wireframing and interactive prototyping",
      "Visual design and brand integration",
      "Usability testing and design validation",
      "Design system creation and documentation",
    ],
  },
};

export function ServiceDetailProseMinimal({
  className,
  title = defaultProps.title,
  introTitle = defaultProps.introTitle,
  introDescription = defaultProps.introDescription,
  contentSections = defaultProps.contentSections,
  servicesList = defaultProps.servicesList,
}: ServiceDetailProseMinimalProps) {
  return (
    <section className={cn("pb-32", className)}>
      <div className="bg-muted py-32">
        <div className="container text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
        </div>
      </div>

      <div className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-8 text-left">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {introTitle}
            </h2>
            <p className="text-xl leading-relaxed text-muted-foreground">
              {introDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container">
          <div className="mx-auto prose prose-sm max-w-3xl dark:prose-invert">
            {contentSections?.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </React.Fragment>
            ))}

            {servicesList && (
              <>
                <h2>{servicesList.title}</h2>
                <ul>
                  {servicesList.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
