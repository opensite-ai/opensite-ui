"use client";

import { useState, type ReactNode } from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Img } from "@page-speed/img";

export interface ExpandableCaseStudyItem {
  id: string;
  title: string;
  href: string;
  image: string;
  logo: string;
  company: string;
  badges?: string[];
}

export interface ExpandableCaseStudyCardsProps {
  items?: ExpandableCaseStudyItem[];
  className?: string;
  /** Optional Optix Flow configuration for @page-speed/img */
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultItems: ExpandableCaseStudyItem[] = [
  {
    id: "item-1",
    title: "Case study 1",
    href: "#",
    image:
      "https://toastability-production.s3.amazonaws.com/xlp46pzk3a4d73jgjx4s7xdafwpn",
    logo: "https://cdn.ing/assets/i/r/285986/5ivxh3ivywsmm6uslf3te38r6tg1/logo-dark.png",
    company: "Company Name",
    badges: ["Commercial", "Multiloan"],
  },
  {
    id: "item-2",
    title: "Case study 2",
    href: "#",
    image:
      "https://toastability-production.s3.amazonaws.com/g1iuifb3yzoofo9c7a00koyn6q1t",
    logo: "https://cdn.ing/assets/i/r/285986/5ivxh3ivywsmm6uslf3te38r6tg1/logo-dark.png",
    company: "Company Name",
    badges: ["Enterprise"],
  },
  {
    id: "item-3",
    title: "Case study 3",
    href: "#",
    image:
      "https://toastability-production.s3.amazonaws.com/z9u4sdrj2oq3eds0qyui0nxsus3j",
    logo: "https://cdn.ing/assets/i/r/285986/5ivxh3ivywsmm6uslf3te38r6tg1/logo-dark.png",
    company: "Company Name",
    badges: ["Startup"],
  },
];

/**
 * ExpandableCaseStudyCards displays case study cards that expand on hover.
 *
 * Features a horizontal row of cards where the hovered card expands to 60% width
 * while others shrink to 20%. Each card shows a background image, company logo,
 * badges, and a title with an arrow icon. Ideal for showcasing portfolio items,
 * case studies, or featured projects with visual emphasis on the selected item.
 *
 * @example
 * ```tsx
 * <ExpandableCaseStudyCards
 *   items={[
 *     {
 *       id: "1",
 *       title: "E-commerce Platform Redesign",
 *       href: "/case-studies/ecommerce",
 *       image: "/images/case-1.jpg",
 *       logo: "/logos/client-1.svg",
 *       company: "TechCorp",
 *       badges: ["E-commerce", "UX Design"]
 *     }
 *   ]}
 * />
 * ```
 */
export function ExpandableCaseStudyCards({
  items = defaultItems,
  className,
  optixFlowConfig,
}: ExpandableCaseStudyCardsProps) {
  const [selection, setSelection] = useState(items[0]?.id);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-5 lg:aspect-1336/420 lg:flex-row">
          {items.map((item) => (
            <div
              key={item.id}
              data-state={selection === item.id ? "open" : "closed"}
              className='group max-lg:w-full max-lg:flex-1 max-md:h-[200px] md:max-lg:aspect-1336/420 lg:transform-gpu lg:transition-all lg:data-[state="closed"]:w-[20%] lg:data-[state="closed"]:duration-500 lg:data-[state="open"]:w-[60%] lg:data-[state="open"]:duration-400'
              onMouseEnter={() => {
                setSelection(item.id);
              }}
            >
              <a
                href={item.href}
                className="relative block h-full w-full overflow-hidden rounded-xl bg-primary text-primary-foreground dark:bg-card"
              >
                <div className='absolute -inset-[50%] hidden h-[200%] w-[200%] md:block lg:group-data-[state="closed"]:blur-sm'>
                  <div className="absolute top-[calc(25%+40px)] aspect-square h-[calc(50%+40px)] max-lg:right-[calc(50%+40px)] lg:right-[50%]">
                    <div className="h-full w-full overflow-clip rounded-xl">
                      <Img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover object-center"
                        loading="lazy"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                  </div>
                  <div className="absolute inset-y-[25%] left-[50%] flex aspect-389/420 h-[50%] items-center justify-center max-lg:hidden">
                    <Img
                      src={item.logo}
                      alt={item.company}
                      className="h-8 invert"
                      loading="lazy"
                      optixFlowConfig={optixFlowConfig}
                    />
                  </div>
                  <div className="absolute top-[50%] left-[50%] flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent max-lg:hidden">
                    <DynamicIcon
                      name="lucide/plus"
                      size={32}
                      className="text-accent-foreground"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 hidden h-[50%] bg-linear-to-t from-primary from-50% to-transparent lg:block"></div>
                </div>
                <div className="relative flex flex-col justify-between gap-4 md:absolute md:inset-0 md:max-lg:inset-x-[50%] md:max-lg:w-[50%]">
                  <div className='flex h-20 items-center gap-2 p-4 transition-opacity delay-200 duration-500 lg:group-data-[state="closed"]:opacity-0'>
                    {item.badges?.map((badge, idx) => (
                      <Badge key={idx} variant="secondary">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className='flex flex-col gap-2 p-4 transition-all delay-200 duration-500 lg:group-data-[state="closed"]:translate-y-4 lg:group-data-[state="closed"]:opacity-0'>
                    <div className="lg:hidden">
                      <Img
                        src={item.logo}
                        alt={item.company}
                        className="h-5 invert lg:h-6"
                        loading="lazy"
                        optixFlowConfig={optixFlowConfig}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-base font-medium lg:text-lg">
                        {item.title}
                      </div>
                      <div className="flex size-8 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 lg:size-10">
                        <DynamicIcon name="lucide/arrow-up-right" size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
