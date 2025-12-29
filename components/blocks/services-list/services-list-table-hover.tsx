"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders } from "../../../lib/mediaPlaceholders";
import { Section } from "../../ui/section";
import type { PatternName } from "../../ui/pattern-background";
import type { SectionBackground, SectionSpacing, OptixFlowConfig } from "../../../src/types";

/**
 * Service item configuration for table hover display
 */
export interface ServicesListTableHoverService {
  /**
   * Service title
   */
  title?: React.ReactNode;
  /**
   * Service category
   */
  category?: React.ReactNode;
  /**
   * Service description
   */
  description?: React.ReactNode;
  /**
   * Image configuration
   */
  image?: {
    src: string;
    alt: string;
  };
  /**
   * CTA URL
   */
  ctaUrl?: string;
  /**
   * CTA click handler
   */
  ctaOnClick?: () => void;
  /**
   * Additional CSS classes for the row
   */
  className?: string;
}

export interface ServicesListTableHoverProps {
  /**
   * Main heading content
   */
  heading?: React.ReactNode;
  /**
   * Supporting description content
   */
  description?: React.ReactNode;
  /**
   * Array of service configurations
   */
  services?: ServicesListTableHoverService[];
  /**
   * Custom slot for rendering services (overrides services array)
   */
  servicesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section wrapper
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the header
   */
  headerClassName?: string;
  /**
   * Additional CSS classes for the heading
   */
  headingClassName?: string;
  /**
   * Additional CSS classes for the description
   */
  descriptionClassName?: string;
  /**
   * Additional CSS classes for the table container
   */
  tableClassName?: string;
  /**
   * Additional CSS classes for each row
   */
  rowClassName?: string;
  /**
   * Background style for the section
   */
  background?: SectionBackground;
  /**
   * Vertical spacing for the section
   */
  spacing?: SectionSpacing;
  /**
   * Optional background pattern name or URL
   */
  pattern?: PatternName | string;
  /**
   * Pattern overlay opacity (0-1)
   */
  patternOpacity?: number;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

const defaultServices: ServicesListTableHoverService[] = [
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
 *
 * @example
 * ```tsx
 * <ServicesListTableHover
 *   heading="Our Services"
 *   description="Hover over any service to see a preview."
 *   services={[{ title: "Web Dev", category: "Development", description: "Custom websites" }]}
 *   background="white"
 *   spacing="lg"
 * />
 * ```
 */
export function ServicesListTableHover({
  heading = "Our Services",
  description = "Hover over any service to see a preview. Click to learn more.",
  services = defaultServices,
  servicesSlot,
  className,
  containerClassName,
  headerClassName,
  headingClassName,
  descriptionClassName,
  tableClassName,
  rowClassName,
  background = "white",
  spacing = "lg",
  pattern,
  patternOpacity,
  optixFlowConfig,
}: ServicesListTableHoverProps): React.JSX.Element {
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const renderServices = () => {
    if (servicesSlot) return servicesSlot;
    if (!services || services.length === 0) return null;

    return (
      <>
        {services.map((service, index) => (
          <Pressable
            key={index}
            href={service.ctaUrl}
            onClick={service.ctaOnClick}
            className={cn(
              "group flex items-center justify-between border-b border-border py-6 transition-colors hover:bg-muted/50 first:border-t",
              rowClassName,
              service.className
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center gap-6">
              {service.category && (
                typeof service.category === "string" ? (
                  <span className="w-24 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {service.category}
                  </span>
                ) : (
                  <div className="w-24 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {service.category}
                  </div>
                )
              )}
              <div>
                {service.title && (
                  typeof service.title === "string" ? (
                    <h3 className="text-lg font-semibold group-hover:text-primary">{service.title}</h3>
                  ) : (
                    <div className="text-lg font-semibold group-hover:text-primary">{service.title}</div>
                  )
                )}
                {service.description && (
                  typeof service.description === "string" ? (
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  ) : (
                    <div className="text-sm text-muted-foreground">{service.description}</div>
                  )
                )}
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
      </>
    );
  };

  return (
    <Section
      background={background}
      spacing={spacing}
      className={className}
      pattern={pattern}
      patternOpacity={patternOpacity}
    >
      <div className={cn("mx-auto max-w-4xl space-y-12", containerClassName)}>
        <div className={cn("space-y-4 text-center", headerClassName)}>
          {heading && (
            typeof heading === "string" ? (
              <h2 className={cn("text-3xl font-semibold tracking-tight md:text-4xl", headingClassName)}>
                {heading}
              </h2>
            ) : (
              <div className={headingClassName}>{heading}</div>
            )
          )}
          {description && (
            typeof description === "string" ? (
              <p className={cn("mx-auto max-w-2xl text-lg tracking-tight text-muted-foreground md:text-xl", descriptionClassName)}>
                {description}
              </p>
            ) : (
              <div className={descriptionClassName}>{description}</div>
            )
          )}
        </div>
        <div className={cn("relative", tableClassName)} onMouseMove={handleMouseMove}>
          {renderServices()}
        </div>
      </div>
    </Section>
  );
}
