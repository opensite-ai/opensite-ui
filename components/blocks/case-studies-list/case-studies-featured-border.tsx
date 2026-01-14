"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import type { OptixFlowConfig } from "../../../src/types";

export interface CaseStudyFeaturedItem {
  /**
   * Company logo image URL
   */
  logo: string;
  /**
   * Company name
   */
  company: React.ReactNode;
  /**
   * Tags/categories text (e.g., "ARTIFICIAL INTELLIGENCE / ENTERPRISE SOLUTIONS")
   */
  tags: React.ReactNode;
  /**
   * Case study title
   */
  title: React.ReactNode;
  /**
   * Case study subtitle
   */
  subtitle: React.ReactNode;
  /**
   * Featured image URL (optional, typically for featured item)
   */
  image?: string;
  /**
   * Link URL for the case study
   */
  href?: string;
  /**
   * CTA label text
   */
  ctaLabel?: React.ReactNode;
}

export interface CaseStudiesFeaturedBorderProps {
  /**
   * Featured case study item (displayed prominently)
   */
  featuredCaseStudy?: CaseStudyFeaturedItem;
  /**
   * Custom slot for rendering featured case study (overrides featuredCaseStudy)
   */
  featuredSlot?: React.ReactNode;
  /**
   * Array of secondary case study items
   */
  caseStudies?: CaseStudyFeaturedItem[];
  /**
   * Custom slot for rendering case studies (overrides caseStudies array)
   */
  caseStudiesSlot?: React.ReactNode;
  /**
   * Additional CSS classes for the section
   */
  className?: string;
  /**
   * Additional CSS classes for the container
   */
  containerClassName?: string;
  /**
   * Additional CSS classes for the outer border wrapper
   */
  borderClassName?: string;
  /**
   * Additional CSS classes for the featured item
   */
  featuredClassName?: string;
  /**
   * Additional CSS classes for the featured item content
   */
  featuredContentClassName?: string;
  /**
   * Additional CSS classes for the featured item image
   */
  featuredImageClassName?: string;
  /**
   * Additional CSS classes for the case studies grid
   */
  gridClassName?: string;
  /**
   * Additional CSS classes for each case study item
   */
  itemClassName?: string;
  /**
   * Additional CSS classes for the logo
   */
  logoClassName?: string;
  /**
   * Additional CSS classes for the tags
   */
  tagsClassName?: string;
  /**
   * Additional CSS classes for the title
   */
  titleClassName?: string;
  /**
   * Additional CSS classes for the subtitle
   */
  subtitleClassName?: string;
  /**
   * Additional CSS classes for the CTA
   */
  ctaClassName?: string;
  /**
   * Additional CSS classes for the dot pattern decorations
   */
  patternClassName?: string;
  /**
   * OptixFlow image optimization configuration
   */
  optixFlowConfig?: OptixFlowConfig;
}

/**
 * CaseStudiesFeaturedBorder displays case studies in a bordered card layout with
 * a prominent featured case study and secondary items below.
 *
 * Features a full-width bordered container with dot pattern decorations on the sides.
 * The featured case study shows company logo, tags, title with subtitle, image preview,
 * and a "Read case study" CTA with arrow icon. Secondary case studies appear in a
 * two-column grid below with similar styling but without images. Hover states include
 * background color transitions. Ideal for highlighting a primary success story while
 * showcasing additional case studies.
 *
 * @example
 * ```tsx
 * <CaseStudiesFeaturedBorder
 *   featuredCaseStudy={{
 *     logo: "/logos/acme.svg",
 *     company: "Acme Corp",
 *     tags: "AI / ENTERPRISE",
 *     title: "Transforming Operations",
 *     subtitle: "How we automated their workflow",
 *     image: "/images/case-featured.jpg",
 *     href: "/case-studies/acme",
 *     ctaLabel: "Read case study"
 *   }}
 *   caseStudies={[
 *     {
 *       logo: "/logos/super.svg",
 *       company: "Super Inc",
 *       tags: "DATA / SOFTWARE",
 *       title: "Data Migration Success",
 *       subtitle: "Moving to the cloud",
 *       href: "/case-studies/super",
 *       ctaLabel: "Read case study"
 *     }
 *   ]}
 * />
 * ```
 */
export function CaseStudiesFeaturedBorder({
  featuredCaseStudy,
  featuredSlot,
  caseStudies,
  caseStudiesSlot,
  className,
  containerClassName,
  borderClassName,
  featuredClassName,
  featuredContentClassName,
  featuredImageClassName,
  gridClassName,
  itemClassName,
  logoClassName,
  tagsClassName,
  titleClassName,
  subtitleClassName,
  ctaClassName,
  patternClassName,
  optixFlowConfig,
}: CaseStudiesFeaturedBorderProps): React.JSX.Element {
  const renderFeatured = () => {
    if (featuredSlot) return featuredSlot;
    if (!featuredCaseStudy) return null;

    return (
      <Pressable
        href={featuredCaseStudy.href}
        className={cn(
          "group grid gap-4 overflow-hidden px-6 transition-colors duration-500 ease-out hover:bg-muted/40 lg:grid-cols-2 xl:px-28",
          featuredClassName
        )}
      >
        <div className={cn("flex flex-col justify-between gap-4 pt-8 md:pt-16 lg:pb-16", featuredContentClassName)}>
          <div className={cn("flex items-center gap-2 text-2xl font-medium", logoClassName)}>
            <Img
              src={featuredCaseStudy.logo}
              alt={typeof featuredCaseStudy.company === "string" ? featuredCaseStudy.company : "Company logo"}
              className="h-9"
              loading="lazy"
              optixFlowConfig={optixFlowConfig}
            />
            {featuredCaseStudy.company}
          </div>
          <div>
            {typeof featuredCaseStudy.tags === "string" ? (
              <span className={cn("text-xs text-muted-foreground sm:text-sm", tagsClassName)}>
                {featuredCaseStudy.tags}
              </span>
            ) : (
              <div className={tagsClassName}>{featuredCaseStudy.tags}</div>
            )}
            <h2 className={cn("mt-4 mb-5 text-2xl font-semibold text-balance sm:text-3xl sm:leading-10", titleClassName)}>
              {featuredCaseStudy.title}
              <span className={cn("font-medium text-primary/50 transition-colors duration-500 ease-out group-hover:text-primary/70", subtitleClassName)}>
                {" "}
                {featuredCaseStudy.subtitle}
              </span>
            </h2>
            <div className={cn("flex items-center gap-2 font-medium", ctaClassName)}>
              {featuredCaseStudy.ctaLabel ?? "Read case study"}
              <DynamicIcon
                name="lucide/move-right"
                size={16}
                className="transition-transform duration-500 ease-out group-hover:translate-x-1"
              />
            </div>
          </div>
        </div>
        {featuredCaseStudy.image && (
          <div className={cn("relative isolate py-16", featuredImageClassName)}>
            <div className="relative isolate h-full border border-border bg-background p-2">
              <div className="h-full overflow-hidden">
                <Img
                  src={featuredCaseStudy.image}
                  alt={typeof featuredCaseStudy.title === "string" ? featuredCaseStudy.title : "Featured case study"}
                  className="aspect-14/9 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
              </div>
            </div>
          </div>
        )}
      </Pressable>
    );
  };

  const renderCaseStudies = () => {
    if (caseStudiesSlot) return caseStudiesSlot;
    if (!caseStudies || caseStudies.length === 0) return null;

    return caseStudies.map((item, idx) => (
      <Pressable
        key={typeof item.company === "string" ? item.company : `case-study-${idx}`}
        href={item.href}
        className={cn(
          "group flex flex-col justify-between gap-12 border-border bg-background px-6 py-8 transition-colors duration-500 ease-out hover:bg-muted/40 md:py-16 lg:pb-16 xl:gap-16",
          idx === 0
            ? "xl:border-l xl:pl-8"
            : "border-t lg:border-t-0 lg:border-l xl:border-r xl:pl-8",
          itemClassName
        )}
      >
        <div className={cn("flex items-center gap-2 text-2xl font-medium", logoClassName)}>
          <Img
            src={item.logo}
            alt={typeof item.company === "string" ? item.company : "Company logo"}
            className="h-9"
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
          {item.company}
        </div>
        <div>
          {typeof item.tags === "string" ? (
            <span className={cn("text-xs text-muted-foreground sm:text-sm", tagsClassName)}>
              {item.tags}
            </span>
          ) : (
            <div className={tagsClassName}>{item.tags}</div>
          )}
          <h2 className={cn("mt-4 mb-5 text-2xl font-semibold text-balance sm:text-3xl sm:leading-10", titleClassName)}>
            {item.title}
            <span className={cn("font-medium text-primary/50 transition-colors duration-500 ease-out group-hover:text-primary/70", subtitleClassName)}>
              {" "}
              {item.subtitle}
            </span>
          </h2>
          <div className={cn("flex items-center gap-2 font-medium", ctaClassName)}>
            {item.ctaLabel ?? "Read case study"}
            <DynamicIcon
              name="lucide/move-right"
              size={16}
              className="transition-transform duration-500 ease-out group-hover:translate-x-1"
            />
          </div>
        </div>
      </Pressable>
    ));
  };

  return (
    <section className={cn("py-32", className)}>
      <div className={cn("container", containerClassName)}>
        <div className={cn("border border-border", borderClassName)}>
          {renderFeatured()}
          <div className="flex border-t border-border">
            <div className={cn("hidden w-28 shrink-0 bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)] bg-size-[10px_10px] opacity-15 xl:block", patternClassName)}></div>
            <div className={cn("grid lg:grid-cols-2", gridClassName)}>
              {renderCaseStudies()}
            </div>
            <div className={cn("hidden w-28 shrink-0 bg-[radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)] bg-size-[10px_10px] opacity-15 xl:block", patternClassName)}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
