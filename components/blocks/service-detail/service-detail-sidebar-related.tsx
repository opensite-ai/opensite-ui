"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface ServiceDetailSidebarRelatedProps {
  className?: string;
  title?: string;
  serviceIcon?: {
    src: string;
    alt: string;
  };
  introDescription?: string;
  stats?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  relatedServices?: Array<{
    icon: string;
    title: string;
    description: string;
    link: string;
  }>;
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

const defaultProps: Partial<ServiceDetailSidebarRelatedProps> = {
  title: "UX/UI Design",
  serviceIcon: {
    src: blockBrandedIconsAndPlaceholders.ux,
    alt: "UX/UI Design",
  },
  introDescription:
    "We believe that great design should be intuitive, accessible, and purposeful for every user who interacts with your product. Our UX/UI design approach focuses on understanding your users' needs, behaviors, and pain points to create interfaces that not only look beautiful but function seamlessly.",
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
  relatedServices: [
    {
      icon: "lucide/droplet",
      title: "Brand Identity",
      description: "Logo design and brand guidelines",
      link: "#",
    },
    {
      icon: "lucide/code",
      title: "Web Development",
      description: "Custom website development",
      link: "#",
    },
    {
      icon: "lucide/smartphone",
      title: "Mobile App Design",
      description: "iOS and Android app interfaces",
      link: "#",
    },
    {
      icon: "lucide/layout",
      title: "Design Systems",
      description: "Scalable component libraries",
      link: "#",
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

export function ServiceDetailSidebarRelated({
  className,
  title = defaultProps.title,
  serviceIcon = defaultProps.serviceIcon,
  introDescription = defaultProps.introDescription,
  stats = defaultProps.stats,
  relatedServices = defaultProps.relatedServices,
  contentSections = defaultProps.contentSections,
  servicesList = defaultProps.servicesList,
  optixFlowConfig,
}: ServiceDetailSidebarRelatedProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-12 space-y-8">
              <div className="flex justify-center lg:justify-start">
                {serviceIcon && (
                  <div className="rounded-lg bg-muted p-4">
                    <Img
                      src={serviceIcon.src}
                      alt={serviceIcon.alt}
                      className="h-12 dark:invert"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
                  {title}
                </h1>
                <p className="text-xl leading-relaxed text-muted-foreground">
                  {introDescription}
                </p>
              </div>
            </div>

            <div className="prose prose-sm max-w-none dark:prose-invert">
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

          <div className="space-y-8 lg:col-span-1">
            <div className="rounded-lg bg-muted/50 p-6">
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

            <div className="rounded-lg bg-muted/50 p-6">
              <h3 className="mb-6 text-lg font-semibold">Related Services</h3>
              <div className="space-y-4">
                {relatedServices?.map((service, index) => (
                  <div key={index} className="group">
                    <Pressable
                      href={service.link}
                      className="block space-y-1 rounded-md p-3 transition-colors hover:bg-background"
                    >
                      <div className="flex items-center gap-2">
                        <DynamicIcon
                          name={service.icon}
                          size={16}
                          className="text-muted-foreground group-hover:text-primary"
                        />
                        <div className="text-sm font-medium group-hover:text-primary">
                          {service.title}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {service.description}
                      </div>
                    </Pressable>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
