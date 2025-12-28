"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ServicesListStickyImageProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Array<{
    title: string;
    description: string;
    items?: string[];
    image?: {
      src: string;
      alt: string;
    };
    ctaText?: string;
    ctaUrl?: string;
  }>;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultServices = [
  {
    title: "Web Development",
    description:
      "Custom websites and web applications built with modern technologies. We specialize in React, Next.js, and Node.js to create fast, scalable solutions that drive results.",
    items: ["Frontend Development", "Backend Development", "API Integration", "Database Design"],
    image: { src: imagePlaceholders[0], alt: "Web Development" },
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android. We build performant apps that users love using React Native and Flutter.",
    items: ["iOS Development", "Android Development", "Cross-Platform Apps", "App Store Optimization"],
    image: { src: imagePlaceholders[1], alt: "Mobile App Development" },
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    title: "UI/UX Design",
    description:
      "User-centered design solutions that create engaging experiences. From wireframes to high-fidelity prototypes, we design interfaces that convert.",
    items: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    image: { src: imagePlaceholders[2], alt: "UI/UX Design" },
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    title: "Cloud Solutions",
    description:
      "Scalable cloud infrastructure and DevOps services. We help you deploy, manage, and scale your applications with AWS, GCP, and Azure.",
    items: ["Cloud Architecture", "DevOps", "CI/CD Pipelines", "Monitoring"],
    image: { src: imagePlaceholders[3], alt: "Cloud Solutions" },
    ctaText: "Learn More",
    ctaUrl: "#",
  },
];

/**
 * ServicesListStickyImage - A sticky left sidebar layout with image transitions and a scrollable service list on the right.
 * As users scroll through services, the corresponding image appears in the sticky left panel.
 * Each service includes title, description, items list, and CTA. Perfect for detailed service presentations
 * with strong visual support that changes contextually.
 */
export function ServicesListStickyImage({
  className,
  title = "Our Services",
  description = "Comprehensive digital solutions tailored to your business needs.",
  services = defaultServices,
  optixFlowConfig,
}: ServicesListStickyImageProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

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

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  {services.map((service, index) => (
                    service.image && (
                      <Img
                        key={index}
                        src={service.image.src}
                        alt={service.image.alt}
                        className={cn(
                          "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                          activeIndex === index ? "opacity-100" : "opacity-0"
                        )}
                        optixFlowConfig={optixFlowConfig}
                      />
                    )
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={cn(
                    "rounded-xl border p-6 transition-all cursor-pointer",
                    activeIndex === index
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-border hover:border-primary/50"
                  )}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                >
                  {service.image && (
                    <div className="mb-4 lg:hidden">
                      <Img
                        src={service.image.src}
                        alt={service.image.alt}
                        className="aspect-video w-full rounded-lg object-cover"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  {service.items && service.items.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {service.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center gap-2">
                          <DynamicIcon
                            name="lucide/check"
                            className="h-4 w-4 text-primary"
                          />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {service.ctaText && (
                    <Pressable
                      href={service.ctaUrl}
                      className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      {service.ctaText}
                      <DynamicIcon
                        name="lucide/arrow-right"
                        className="ml-1 h-4 w-4"
                      />
                    </Pressable>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
