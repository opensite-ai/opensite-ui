"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface ServiceDetailSidebarStatsProps {
  className?: string;
  title?: string;
  serviceIcon?: {
    src: string;
    alt: string;
  };
  introTitle?: string;
  introDescription?: string;
  services?: Array<{
    icon: string;
    title: string;
  }>;
  stats?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  contentSections?: Array<{
    title: string;
    paragraphs: string[];
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultProps: Partial<ServiceDetailSidebarStatsProps> = {
  title: "UX/UI Design",
  serviceIcon: {
    src: blockBrandedIconsAndPlaceholders.ux,
    alt: "UX/UI Design",
  },
  introTitle: "User-Centered Design That Converts",
  introDescription:
    "We believe that great design should be intuitive, accessible, and purposeful for every user who interacts with your product. Our UX/UI design approach focuses on understanding your users' needs, behaviors, and pain points to create interfaces that not only look beautiful but function seamlessly.",
  services: [
    { icon: "lucide/users", title: "User research and persona development" },
    { icon: "lucide/map", title: "Information architecture and user journey mapping" },
    { icon: "lucide/pen-tool", title: "Wireframing and interactive prototyping" },
    { icon: "lucide/palette", title: "Visual design and brand integration" },
    { icon: "lucide/test-tube", title: "Usability testing and design validation" },
    { icon: "lucide/book-open", title: "Design system creation and documentation" },
  ],
  stats: [
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
  ],
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
};

export function ServiceDetailSidebarStats({
  className,
  title = defaultProps.title,
  serviceIcon = defaultProps.serviceIcon,
  introTitle = defaultProps.introTitle,
  introDescription = defaultProps.introDescription,
  services = defaultProps.services,
  stats = defaultProps.stats,
  contentSections = defaultProps.contentSections,
  optixFlowConfig,
}: ServiceDetailSidebarStatsProps) {
  return (
    <section className={cn("pb-32", className)}>
      <div className="bg-muted py-32">
        <div className="container">
          <div className="flex items-center justify-center gap-4">
            {serviceIcon && (
              <Img
                src={serviceIcon.src}
                alt={serviceIcon.alt}
                className="h-16 dark:invert"
                optixFlowConfig={optixFlowConfig}
              />
            )}
            <h1 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
              {title}
            </h1>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <h2>{introTitle}</h2>
                <p>{introDescription}</p>

                {contentSections?.map((section, sectionIndex) => (
                  <React.Fragment key={sectionIndex}>
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>{paragraph}</p>
                    ))}
                  </React.Fragment>
                ))}

                {services && services.length > 0 && (
                  <>
                    <h2>Our UX/UI Design Services</h2>
                    <div className="space-y-3">
                      {services.map((service, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <DynamicIcon
                            name={service.icon}
                            size={20}
                            className="text-primary"
                          />
                          <span>{service.title}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-lg bg-muted/50 p-6 lg:sticky lg:top-8">
                <h3 className="mb-6 text-lg font-semibold">Our Expertise</h3>
                <div className="space-y-6">
                  {stats?.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                        <Img
                          src={stat.icon}
                          alt={stat.title}
                          className="h-6 w-6 object-contain"
                          optixFlowConfig={optixFlowConfig}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{stat.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {stat.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
