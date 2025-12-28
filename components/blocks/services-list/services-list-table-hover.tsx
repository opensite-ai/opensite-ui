"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";

export interface ServicesListTableHoverProps {
  className?: string;
  title?: string;
  description?: string;
  services?: Array<{
    title: string;
    category?: string;
    description: string;
    image?: {
      src: string;
      alt: string;
    };
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
    category: "Development",
    description: "Custom websites and web applications",
    image: { src: imagePlaceholders[0], alt: "Web Development" },
    ctaUrl: "#",
  },
  {
    title: "Mobile Apps",
    category: "Development",
    description: "iOS and Android applications",
    image: { src: imagePlaceholders[1], alt: "Mobile Apps" },
    ctaUrl: "#",
  },
  {
    title: "UI/UX Design",
    category: "Design",
    description: "User-centered design solutions",
    image: { src: imagePlaceholders[2], alt: "UI/UX Design" },
    ctaUrl: "#",
  },
  {
    title: "Brand Identity",
    category: "Design",
    description: "Logo and visual identity design",
    image: { src: imagePlaceholders[3], alt: "Brand Identity" },
    ctaUrl: "#",
  },
  {
    title: "Digital Marketing",
    category: "Marketing",
    description: "SEO and content marketing",
    image: { src: imagePlaceholders[4], alt: "Digital Marketing" },
    ctaUrl: "#",
  },
];

/**
 * ServicesListTableHover - A table-based services layout with cursor-following image preview on hover.
 * Services display as rows with category, title, description, and an arrow indicator.
 * On hover, a preview image appears near the cursor. Ideal for a clean, minimal presentation
 * with interactive image previews that add visual interest without cluttering the layout.
 */
export function ServicesListTableHover({
  className,
  title = "Our Services",
  description = "Hover over any service to see a preview. Click to learn more.",
  services = defaultServices,
  optixFlowConfig,
}: ServicesListTableHoverProps) {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl">
              {description}
            </p>
          </div>

          <div className="relative" onMouseMove={handleMouseMove}>
            {services.map((service, index) => (
              <Pressable
                key={index}
                href={service.ctaUrl}
                className="group flex items-center justify-between border-b border-border py-6 transition-colors hover:bg-muted/50 first:border-t"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center gap-6">
                  {service.category && (
                    <span className="w-24 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {service.category}
                    </span>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
                <DynamicIcon
                  name="lucide/arrow-right"
                  className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                />
              </Pressable>
            ))}

            {hoveredIndex !== null && services[hoveredIndex]?.image && (
              <div
                className="pointer-events-none fixed z-50 hidden lg:block"
                style={{
                  left: mousePosition.x + 20,
                  top: mousePosition.y - 100,
                }}
              >
                <div className="overflow-hidden rounded-lg shadow-2xl">
                  <Img
                    src={services[hoveredIndex].image!.src}
                    alt={services[hoveredIndex].image!.alt}
                    className="h-48 w-64 object-cover"
                    optixFlowConfig={optixFlowConfig}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
