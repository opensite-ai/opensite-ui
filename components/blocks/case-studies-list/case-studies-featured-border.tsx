"use client";

import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface CaseStudyFeaturedItem {
  logo: string;
  company: string;
  tags: string;
  title: string;
  subtitle: string;
  image?: string;
  href?: string;
}

export interface CaseStudiesFeaturedBorderProps {
  featuredCaseStudy?: CaseStudyFeaturedItem;
  caseStudies?: CaseStudyFeaturedItem[];
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultFeaturedCaseStudy: CaseStudyFeaturedItem = {
  logo: blockBrandedIconsAndPlaceholders.block1,
  company: "Acme",
  tags: "ARTIFICIAL INTELLIGENCE / ENTERPRISE SOLUTIONS",
  title: "Workflow Automation for the Digital Age.",
  subtitle: "How to automate your workflow with AI.",
  image: blockBrandedIconsAndPlaceholders.placeholder1,
  href: "#",
};

const defaultCaseStudies: CaseStudyFeaturedItem[] = [
  {
    logo: blockBrandedIconsAndPlaceholders.block2,
    company: "Super",
    tags: "DATA MIGRATION / SOFTWARE SOLUTIONS",
    title: "Enhance data migration with AI.",
    subtitle: "A data migration platform toward a data-driven future.",
    href: "#",
  },
  {
    logo: blockBrandedIconsAndPlaceholders.block3,
    company: "Advent",
    tags: "ARTIFICIAL INTELLIGENCE / DATA SOLUTIONS",
    title: "Strategic AI for a future-proof business.",
    subtitle: "Mastering AI for more efficient operations.",
    href: "#",
  },
];

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
 *     href: "/case-studies/acme"
 *   }}
 *   caseStudies={[
 *     {
 *       logo: "/logos/super.svg",
 *       company: "Super Inc",
 *       tags: "DATA / SOFTWARE",
 *       title: "Data Migration Success",
 *       subtitle: "Moving to the cloud",
 *       href: "/case-studies/super"
 *     }
 *   ]}
 * />
 * ```
 */
export function CaseStudiesFeaturedBorder({
  featuredCaseStudy = defaultFeaturedCaseStudy,
  caseStudies = defaultCaseStudies,
  className,
  optixFlowConfig,
}: CaseStudiesFeaturedBorderProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="border border-border">
          <Pressable
            href={featuredCaseStudy.href}
            className="group grid gap-4 overflow-hidden px-6 transition-colors duration-500 ease-out hover:bg-muted/40 lg:grid-cols-2 xl:px-28"
          >
            <div className="flex flex-col justify-between gap-4 pt-8 md:pt-16 lg:pb-16">
              <div className="flex items-center gap-2 text-2xl font-medium">
                <Img
                  src={featuredCaseStudy.logo}
                  alt={featuredCaseStudy.company}
                  className="h-9"
                  loading="lazy"
                  optixFlowConfig={optixFlowConfig}
                />
                {featuredCaseStudy.company}
              </div>
              <div>
                <span className="text-xs text-muted-foreground sm:text-sm">
                  {featuredCaseStudy.tags}
                </span>
                <h2 className="mt-4 mb-5 text-2xl font-semibold text-balance sm:text-3xl sm:leading-10">
                  {featuredCaseStudy.title}
                  <span className="font-medium text-primary/50 transition-colors duration-500 ease-out group-hover:text-primary/70">
                    {" "}
                    {featuredCaseStudy.subtitle}
                  </span>
                </h2>
                <div className="flex items-center gap-2 font-medium">
                  Read case study
                  <DynamicIcon
                    name="lucide/move-right"
                    size={16}
                    className="transition-transform duration-500 ease-out group-hover:translate-x-1"
                  />
                </div>
              </div>
            </div>
            {featuredCaseStudy.image && (
              <div className="relative isolate py-16">
                <div className="relative isolate h-full border border-border bg-background p-2">
                  <div className="h-full overflow-hidden">
                    <Img
                      src={featuredCaseStudy.image}
                      alt={featuredCaseStudy.title}
                      className="aspect-[14/9] h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                </div>
              </div>
            )}
          </Pressable>
          <div className="flex border-t border-border">
            <div className="hidden w-28 shrink-0 bg-[radial-gradient(var(--muted-foreground)_1px,transparent_1px)] [background-size:10px_10px] opacity-15 xl:block"></div>
            <div className="grid lg:grid-cols-2">
              {caseStudies.map((item, idx) => (
                <Pressable
                  key={item.company}
                  href={item.href}
                  className={cn(
                    "group flex flex-col justify-between gap-12 border-border bg-background px-6 py-8 transition-colors duration-500 ease-out hover:bg-muted/40 md:py-16 lg:pb-16 xl:gap-16",
                    idx === 0
                      ? "xl:border-l xl:pl-8"
                      : "border-t lg:border-t-0 lg:border-l xl:border-r xl:pl-8"
                  )}
                >
                  <div className="flex items-center gap-2 text-2xl font-medium">
                    <Img
                      src={item.logo}
                      alt={item.company}
                      className="h-9"
                      loading="lazy"
                      optixFlowConfig={optixFlowConfig}
                    />
                    {item.company}
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground sm:text-sm">
                      {item.tags}
                    </span>
                    <h2 className="mt-4 mb-5 text-2xl font-semibold text-balance sm:text-3xl sm:leading-10">
                      {item.title}
                      <span className="font-medium text-primary/50 transition-colors duration-500 ease-out group-hover:text-primary/70">
                        {" "}
                        {item.subtitle}
                      </span>
                    </h2>
                    <div className="flex items-center gap-2 font-medium">
                      Read case study
                      <DynamicIcon
                        name="lucide/move-right"
                        size={16}
                        className="transition-transform duration-500 ease-out group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Pressable>
              ))}
            </div>
            <div className="hidden w-28 shrink-0 bg-[radial-gradient(var(--muted-foreground)_1px,transparent_1px)] [background-size:10px_10px] opacity-15 xl:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
