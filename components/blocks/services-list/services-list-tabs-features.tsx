"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ServicesListTabsFeaturesProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Array<{
    id: string;
    title: string;
    description: string;
    features?: string[];
    image?: {
      src: string;
      alt: string;
    };
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultServices = [
  {
    id: "development",
    title: "Development",
    description:
      "Custom web and mobile applications built with modern technologies. We create scalable, performant solutions that drive business results.",
    features: [
      "React & Next.js Applications",
      "Node.js Backend Services",
      "Mobile App Development",
      "API Design & Integration",
    ],
    image: { src: imagePlaceholders[0], alt: "Development" },
  },
  {
    id: "design",
    title: "Design",
    description:
      "User-centered design solutions that create engaging experiences. From research to high-fidelity prototypes, we design interfaces that convert.",
    features: [
      "User Research & Testing",
      "Wireframing & Prototyping",
      "Visual Design",
      "Design Systems",
    ],
    image: { src: imagePlaceholders[1], alt: "Design" },
  },
  {
    id: "marketing",
    title: "Marketing",
    description:
      "Data-driven marketing strategies to grow your online presence. SEO, content marketing, and paid advertising that delivers ROI.",
    features: [
      "SEO Optimization",
      "Content Strategy",
      "Paid Advertising",
      "Analytics & Reporting",
    ],
    image: { src: imagePlaceholders[2], alt: "Marketing" },
  },
  {
    id: "consulting",
    title: "Consulting",
    description:
      "Strategic guidance to help you make informed technology decisions. We help you plan, architect, and execute your digital initiatives.",
    features: [
      "Technology Assessment",
      "Architecture Planning",
      "Team Augmentation",
      "Process Optimization",
    ],
    image: { src: imagePlaceholders[3], alt: "Consulting" },
  },
];

/**
 * ServicesListTabsFeatures - A tabbed services layout with feature lists and images.
 * Users can switch between service categories using tabs, with each tab displaying
 * a description, feature list with check icons, and a corresponding image.
 * Ideal for organizing multiple service categories in a compact, interactive format.
 */
export function ServicesListTabsFeatures({
  className,
  title = "Our Services",
  description = "Explore our comprehensive range of digital services.",
  services = defaultServices,
  optixFlowConfig,
}: ServicesListTabsFeaturesProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl">
              {description}
            </p>
          </div>

          <Tabs defaultValue={services[0]?.id} className="w-full">
            <div className="flex justify-center">
              <TabsList className="grid h-auto w-full max-w-2xl grid-cols-2 gap-2 bg-transparent p-0 md:grid-cols-4">
                {services.map((service) => (
                  <TabsTrigger
                    key={service.id}
                    value={service.id}
                    className="rounded-lg border border-border bg-background px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {service.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id} className="mt-8">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    {service.features && service.features.length > 0 && (
                      <div className="mt-6 space-y-3">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                              <DynamicIcon
                                name="lucide/check"
                                className="h-4 w-4 text-primary"
                              />
                            </div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {service.image && (
                    <div className="overflow-hidden rounded-xl">
                      <Img
                        src={service.image.src}
                        alt={service.image.alt}
                        className="aspect-4/3 w-full object-cover"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
