"use client";

import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface CaseStudyStatsCardAuthor {
  name: string;
  image: string;
  role: string;
}

export interface CaseStudyStatsCardStat {
  number: string;
  text: string;
}

export interface CaseStudiesStatsCardProps {
  companyLogo?: string;
  companyName?: string;
  stats?: CaseStudyStatsCardStat[];
  author?: CaseStudyStatsCardAuthor;
  title?: string;
  summary?: string;
  href?: string;
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultStats: CaseStudyStatsCardStat[] = [
  {
    number: "45%",
    text: "improvement in onboarding completion",
  },
  {
    number: "61%",
    text: "reduction in time-to-value",
  },
  {
    number: "3x",
    text: "increase in user activation",
  },
];

const defaultAuthor: CaseStudyStatsCardAuthor = {
  name: "Sarah Williams",
  image: blockBrandedIconsAndPlaceholders.avatar1,
  role: "CTO, Opensite AI",
};

/**
 * CaseStudiesStatsCard displays a single case study in a card format with
 * company branding, key metrics, author attribution, and call-to-action.
 *
 * Features a two-column layout within a muted background container. The left
 * column shows company logo, key statistics in a row, and author info with
 * avatar. The right column displays the case study title, summary text, and
 * a "Read Story" button with arrow icon. Ideal for highlighting a featured
 * customer success story with quantifiable results and personal testimonial.
 *
 * @example
 * ```tsx
 * <CaseStudiesStatsCard
 *   companyLogo="/logos/company.svg"
 *   companyName="TechCorp"
 *   stats={[
 *     { number: "45%", text: "improvement in conversions" },
 *     { number: "3x", text: "increase in engagement" }
 *   ]}
 *   author={{
 *     name: "John Doe",
 *     image: "/avatars/john.jpg",
 *     role: "CTO, TechCorp"
 *   }}
 *   title="How We Transformed Our Customer Experience"
 *   summary="Learn how we revamped our onboarding process..."
 *   href="/case-studies/techcorp"
 * />
 * ```
 */
export function CaseStudiesStatsCard({
  companyLogo = blockBrandedIconsAndPlaceholders.fictionalCompanyLogo8,
  companyName = "Opensite AI",
  stats = defaultStats,
  author = defaultAuthor,
  title = "How We Optimized Our Onboarding Flow to Triple User Activation",
  summary = "Learn how we revamped our product onboarding experience using our in-house toolkit and reduced time-to-value by over 60%.",
  href = "#",
  className,
  optixFlowConfig,
}: CaseStudiesStatsCardProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col items-stretch justify-between gap-10 rounded-lg bg-muted p-10 lg:flex-row">
          <div className="flex w-full max-w-[30rem] flex-col gap-10 rounded-lg bg-background p-5">
            <div className="max-w-[4.875rem]">
              <Img
                src={companyLogo}
                alt={companyName}
                className="block size-full object-contain object-center"
                loading="lazy"
                optixFlowConfig={optixFlowConfig}
              />
            </div>
            <div className="flex w-full flex-col gap-8 sm:flex-row">
              {stats.map((item, i) => (
                <div className="flex flex-col gap-1" key={`stats-${i}`}>
                  <div className="text-xl font-semibold">{item.number}</div>
                  <div className="text-sm font-medium text-muted-foreground">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2.5">
              <Avatar className="size-10 rounded-lg border bg-background">
                <AvatarImage src={author.image} alt={author.name} />
                <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-0.5">
                <div className="text-sm leading-normal font-medium">
                  {author.name}
                </div>
                <div className="text-sm leading-normal font-medium text-muted-foreground">
                  {author.role}
                </div>
              </div>
            </div>
          </div>
          <div className="flex max-w-[32rem] flex-col gap-5">
            <h2 className="text-2xl leading-none font-bold md:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className="text-base font-medium text-foreground">{summary}</p>
            <div className="shrink-0">
              <Pressable
                href={href}
                variant="outline"
                size="sm"
                asButton
              >
                Read Story
                <DynamicIcon name="lucide/arrow-right" size={16} />
              </Pressable>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
