"use client";

import * as React from "react";
import { Img } from "@page-speed/img";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface IndustryService {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export interface IndustriesBadgeListBorderedProps {
  /**
   * Badge text displayed above the heading
   * @default "Industries"
   */
  badge?: string;
  /**
   * Main heading text
   */
  heading?: string;
  /**
   * Array of industry services to display
   */
  services?: IndustryService[];
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Optional Optix Flow configuration for image optimization
   */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

/**
 * IndustriesBadgeListBordered displays a professional industries listing with badge header and bordered rows.
 *
 * Features a badge label above a bold heading, followed by a list of industry services in bordered rows.
 * Each row uses a 12-column grid layout with icon, title, and description that reorders responsively
 * on mobile. Ideal for showcasing service offerings, industry expertise, or capability listings
 * in a clean, scannable format.
 *
 * @example
 * ```tsx
 * <IndustriesBadgeListBordered
 *   badge="Industries"
 *   heading="Transforming industries through innovative technology solutions"
 *   services={[
 *     {
 *       title: "Mining",
 *       description: "Empowering mining operations with advanced automation...",
 *       imageSrc: "/mining-icon.png",
 *       imageAlt: "Mining industry icon"
 *     }
 *   ]}
 * />
 * ```
 */
export function IndustriesBadgeListBordered({
  className,
  badge = "Industries",
  heading = "Transforming industries through innovative technology solutions that drive efficiency, growth, and sustainable operations.",
  services = [
    {
      title: "Mining",
      description:
        "Empowering mining operations with advanced automation systems, real-time monitoring solutions, safety management platforms, and resource optimization technologies that maximize efficiency and ensure sustainable extraction practices.",
      imageSrc: imagePlaceholders[0],
      imageAlt: "Mining industry icon",
    },
    {
      title: "Finance",
      description:
        "Delivering secure, scalable financial technology solutions including digital banking platforms, payment processing systems, risk management tools, and regulatory compliance frameworks that enable financial institutions to innovate and compete effectively.",
      imageSrc: imagePlaceholders[1],
      imageAlt: "Finance industry icon",
    },
    {
      title: "Energy",
      description:
        "Transforming energy operations with smart grid technologies, renewable energy management systems, predictive maintenance solutions, and demand forecasting tools that optimize resource allocation and improve sustainability.",
      imageSrc: imagePlaceholders[2],
      imageAlt: "Energy industry icon",
    },
    {
      title: "Construction",
      description:
        "Streamlining construction projects with project management platforms, BIM integration, real-time collaboration tools, and safety monitoring systems that reduce costs, improve timelines, and enhance on-site productivity.",
      imageSrc: imagePlaceholders[3],
      imageAlt: "Construction industry icon",
    },
  ],
  optixFlowConfig,
}: IndustriesBadgeListBorderedProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        {/* Header Section */}
        <div className="mb-16">
          {badge && (
            <Badge
              variant="outline"
              className="mb-4 rounded-none border-0 bg-muted p-2 text-primary uppercase"
            >
              {badge}
            </Badge>
          )}
          <h2 className="max-w-2xl text-3xl leading-tight font-bold text-balance lg:text-4xl">
            {heading}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="space-y-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="border-b border-border pb-8 first:border-t first:pt-8 last:border-b-0"
            >
              <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-12 md:items-center md:gap-8">
                <div className="order-2 md:order-0 md:col-span-4">
                  <h3 className="text-lg font-semibold text-foreground md:text-xl">
                    {service.title}
                  </h3>
                </div>
                <div className="order-1 md:order-0 md:col-span-2 md:flex md:justify-center">
                  <Img
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    className="h-12 w-12 object-contain md:h-16 md:w-16"
                    loading="lazy"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
                <div className="order-3 md:order-0 md:col-span-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
