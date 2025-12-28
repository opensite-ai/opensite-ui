"use client";

import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface CaseStudyImageGridItem {
  image: string;
  logo: string;
  title: string;
  href?: string;
}

export interface CaseStudiesImageGridProps {
  items?: CaseStudyImageGridItem[];
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultItems: CaseStudyImageGridItem[] = [
  {
    image: imagePlaceholders[0],
    logo: blockBrandedIconsAndPlaceholders.vercelWordmarkWhite,
    title: "Discover how our solutions drive business growth",
    href: "#",
  },
  {
    image: imagePlaceholders[1],
    logo: blockBrandedIconsAndPlaceholders.reactWordmarkWhite,
    title: "Learn how our platform enhances business performance",
    href: "#",
  },
  {
    image: imagePlaceholders[2],
    logo: blockBrandedIconsAndPlaceholders.shadcnUiWordmarkWhite,
    title: "Discover how our tools empower your business for the future",
    href: "#",
  },
  {
    image: imagePlaceholders[3],
    logo: blockBrandedIconsAndPlaceholders.tailwindWordmarkWhite,
    title: "Explore how our services can benefit your business",
    href: "#",
  },
  {
    image: imagePlaceholders[4],
    logo: blockBrandedIconsAndPlaceholders.nextjsWordmarkWhite,
    title: "See how our offerings boost your success in business",
    href: "#",
  },
  {
    image: imagePlaceholders[5],
    logo: blockBrandedIconsAndPlaceholders.supabaseWordmarkWhite,
    title: "Learn how our services can elevate your success in business growth",
    href: "#",
  },
];

/**
 * CaseStudiesImageGrid displays case studies in a responsive grid layout with
 * full-bleed background images, company logos, and hover zoom effects.
 *
 * Features a 2-column asymmetric grid where the first and fifth items span 2 rows,
 * creating visual hierarchy. Each card shows a gradient overlay, company logo at top,
 * and case study title at bottom. Ideal for showcasing client success stories,
 * portfolio highlights, or featured projects with strong visual impact.
 *
 * @example
 * ```tsx
 * <CaseStudiesImageGrid
 *   items={[
 *     {
 *       image: "/images/case-1.jpg",
 *       logo: "/logos/client-1.svg",
 *       title: "How we helped TechCorp increase conversions by 200%",
 *       href: "/case-studies/techcorp"
 *     }
 *   ]}
 * />
 * ```
 */
export function CaseStudiesImageGrid({
  items = defaultItems,
  className,
  optixFlowConfig,
}: CaseStudiesImageGridProps) {
  const getGridClass = (index: number) => {
    if (index === 0 || index === 4) {
      return "row-span-2 aspect-square lg:aspect-auto";
    }
    return "aspect-3/2 md:aspect-2/1";
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto grid max-w-2xl gap-6 lg:max-w-5xl lg:grid-cols-2">
          {items.map((item, index) => (
            <Pressable
              key={index}
              href={item.href}
              className={cn(
                "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-md lg:p-10",
                getGridClass(index)
              )}
            >
              <Img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                optixFlowConfig={optixFlowConfig}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10"></div>
              <Img
                src={item.logo}
                alt="Company logo"
                className="isolate h-7 w-fit"
                loading="lazy"
                optixFlowConfig={optixFlowConfig}
              />
              <h2 className="isolate max-w-sm text-lg font-semibold text-white lg:text-xl lg:font-semibold">
                {item.title}
              </h2>
            </Pressable>
          ))}
        </div>
      </div>
    </section>
  );
}
