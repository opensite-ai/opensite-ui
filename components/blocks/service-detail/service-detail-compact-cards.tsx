"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Pressable } from "../../../lib/Pressable";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ServiceDetailCompactCardsProps {
  className?: string;
  title?: string;
  serviceIcon?: {
    src: string;
    alt: string;
  };
  introDescription?: string;
  expertise?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  services?: Array<{
    icon: string;
    title: string;
  }>;
  relatedServices?: Array<{
    image: string;
    title: string;
    description: string;
    link: string;
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

const defaultProps: Partial<ServiceDetailCompactCardsProps> = {
  title: "UX/UI Design",
  serviceIcon: {
    src: blockBrandedIconsAndPlaceholders.ux,
    alt: "UX/UI Design",
  },
  introDescription:
    "We believe that great design should be intuitive, accessible, and purposeful for every user who interacts with your product. Our UX/UI design approach focuses on understanding your users' needs, behaviors, and pain points to create interfaces that not only look beautiful but function seamlessly.",
  expertise: [
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
  services: [
    { icon: "lucide/users", title: "User research and persona development" },
    { icon: "lucide/map", title: "Information architecture and user journey mapping" },
    { icon: "lucide/pen-tool", title: "Wireframing and interactive prototyping" },
    { icon: "lucide/palette", title: "Visual design and brand integration" },
    { icon: "lucide/test-tube", title: "Usability testing and design validation" },
    { icon: "lucide/book-open", title: "Design system creation and documentation" },
  ],
  relatedServices: [
    {
      image: imagePlaceholders[1],
      title: "Brand Identity",
      description: "Logo design and brand guidelines",
      link: "#",
    },
    {
      image: imagePlaceholders[2],
      title: "Web Development",
      description: "Custom website development",
      link: "#",
    },
    {
      image: imagePlaceholders[3],
      title: "Mobile App Design",
      description: "iOS and Android app interfaces",
      link: "#",
    },
    {
      image: imagePlaceholders[4],
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
};

export function ServiceDetailCompactCards({
  className,
  title = defaultProps.title,
  serviceIcon = defaultProps.serviceIcon,
  introDescription = defaultProps.introDescription,
  expertise = defaultProps.expertise,
  services = defaultProps.services,
  relatedServices = defaultProps.relatedServices,
  contentSections = defaultProps.contentSections,
  optixFlowConfig,
}: ServiceDetailCompactCardsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 space-y-8">
            <div className="flex items-start gap-6">
              {serviceIcon && (
                <div className="shrink-0 rounded-lg bg-muted p-4">
                  <Img
                    src={serviceIcon.src}
                    alt={serviceIcon.alt}
                    className="h-12 dark:invert"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              )}
              <div className="space-y-4">
                <h1 className="text-4xl font-medium tracking-tight md:text-5xl">
                  {title}
                </h1>
                <p className="text-xl leading-relaxed text-muted-foreground">
                  {introDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="mb-6 text-xl font-semibold">Our Expertise</h2>
            <div className="flex flex-wrap gap-4">
              {expertise?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg border bg-background px-4 py-3"
                >
                  <Img
                    src={item.icon}
                    alt={item.title}
                    className="h-6 w-6 object-contain"
                    optixFlowConfig={optixFlowConfig}
                  />
                  <div>
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="prose prose-sm mx-auto max-w-none dark:prose-invert">
            {contentSections?.map((section, sectionIndex) => (
              <React.Fragment key={sectionIndex}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}
              </React.Fragment>
            ))}
          </div>

          {services && services.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-xl font-semibold">
                Our UX/UI Design Services
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-lg border bg-background p-4"
                  >
                    <DynamicIcon
                      name={service.icon}
                      size={20}
                      className="shrink-0 text-primary"
                    />
                    <span className="text-sm">{service.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {relatedServices && relatedServices.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-xl font-semibold">Related Services</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {relatedServices.map((service, index) => (
                  <Pressable
                    key={index}
                    href={service.link}
                    className="group block overflow-hidden rounded-lg border bg-background transition-shadow hover:shadow-lg"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <Img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium group-hover:text-primary">
                        {service.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </Pressable>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
