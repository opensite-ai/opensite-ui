"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface ServiceDetailStatsHeroProps {
  className?: string;
  title?: string;
  heroImage?: {
    src: string;
    alt: string;
  };
  serviceIcon?: {
    src: string;
    alt: string;
  };
  stats?: Array<{
    icon: string;
    title: string;
    value: string;
    description: string;
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

const defaultProps: Partial<ServiceDetailStatsHeroProps> = {
  title: "UX/UI Design",
  heroImage: {
    src: imagePlaceholders[0],
    alt: "Service hero background",
  },
  serviceIcon: {
    src: blockBrandedIconsAndPlaceholders.ux,
    alt: "UX/UI Design",
  },
  stats: [
    {
      icon: blockBrandedIconsAndPlaceholders.integration1,
      title: "Adobe Creative Suite",
      value: "100%",
      description: "Design proficiency",
    },
    {
      icon: blockBrandedIconsAndPlaceholders.integration2,
      title: "Figma",
      value: "5+",
      description: "Years experience",
    },
    {
      icon: blockBrandedIconsAndPlaceholders.integration3,
      title: "Sketch",
      value: "200+",
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

export function ServiceDetailStatsHero({
  className,
  title = defaultProps.title,
  heroImage = defaultProps.heroImage,
  serviceIcon = defaultProps.serviceIcon,
  stats = defaultProps.stats,
  contentSections = defaultProps.contentSections,
  servicesList = defaultProps.servicesList,
  optixFlowConfig,
}: ServiceDetailStatsHeroProps) {
  return (
    <section className={cn("pb-32", className)}>
      <div className="relative flex min-h-[500px] items-center justify-center py-32">
        <div className="absolute inset-0">
          <Img
            src={heroImage?.src || imagePlaceholders[0]}
            alt={heroImage?.alt || "Service hero background"}
            className="h-full w-full object-cover"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 container text-center">
          <div className="mx-auto flex flex-col items-center space-y-6">
            {serviceIcon && (
              <Img
                src={serviceIcon.src}
                alt={serviceIcon.alt}
                className="w-24"
                optixFlowConfig={optixFlowConfig}
              />
            )}
            <h1 className="text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-muted py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {stats?.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-background p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
                    <Img
                      src={stat.icon}
                      alt={stat.title}
                      className="h-8 w-8 object-contain"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{stat.value}</div>
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
