"use client";

import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import { Separator } from "../../ui/separator";

export interface CaseStudyStatsMetricsStat {
  value: string;
  label: string;
}

export interface CaseStudyStatsMetricsProps {
  breadcrumbs?: { label: string; href?: string }[];
  title?: string;
  subtitle?: string;
  heroImage?: string;
  heroImageAlt?: string;
  stats?: CaseStudyStatsMetricsStat[];
  content?: React.ReactNode;
  companyLogo?: string;
  overview?: string;
  sector?: string;
  solutionLabel?: string;
  solutionIcon?: string;
  ctaLabel?: string;
  ctaHref?: string;
  learnMoreLabel?: string;
  className?: string;
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultBreadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Components" },
];

const defaultStats: CaseStudyStatsMetricsStat[] = [
  { value: "19%", label: "increase in user engagement rate" },
  { value: "28%", label: "growth in customer retention rate" },
  { value: "72%", label: "satisfaction rate among users and customers" },
  { value: ">85%", label: "positive feedback received from users" },
];

const defaultContent = (
  <>
    <h2>How the Tax System Works</h2>
    <p>
      The king, seeing how much happier his subjects were,
      realized the error of his ways and repealed the joke tax.
      Jokester was declared a hero, and the kingdom lived happily
      ever after.
    </p>
    <Alert>
      <DynamicIcon name="lucide/lightbulb" size={16} className="h-4 w-4" />
      <AlertTitle>Royal Decree!</AlertTitle>
      <AlertDescription>
        Remember, all jokes must be registered at the Royal Jest
        Office before telling them
      </AlertDescription>
    </Alert>

    <h2>The People&apos;s Rebellion</h2>
    <p>
      The people of the kingdom, feeling uplifted by the laughter,
      started to tell jokes and puns again, and soon the entire
      kingdom was in on the joke.
    </p>
    <div>
      <table>
        <thead>
          <tr>
            <th>King&apos;s Treasury</th>
            <th>People&apos;s happiness</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Empty</td>
            <td>Overflowing</td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td>Modest</td>
            <td>Satisfied</td>
          </tr>
          <tr className="m-0 border-t p-0 even:bg-muted">
            <td>Full</td>
            <td>Ecstatic</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      The king, seeing how much happier his subjects were,
      realized the error of his ways and repealed the joke tax.
      Jokester was declared a hero, and the kingdom lived happily
      ever after.
    </p>

    <h2>The King&apos;s Plan</h2>
    <p>
      The king thought long and hard, and finally came up with{" "}
      <a href="#">a brilliant plan</a>: he would tax the jokes in
      the kingdom.
    </p>
    <blockquote>
      &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a
      good joke, so it&apos;s only fair that they should pay for
      the privilege.&rdquo;
    </blockquote>
    <p>
      The king&apos;s subjects were not amused. They grumbled and
      complained, but the king was firm:
    </p>
    <ul>
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners : 20 gold coins</li>
    </ul>
    <p>
      As a result, people stopped telling jokes, and the kingdom
      fell into a gloom. But there was one person who refused to
      let the king&apos;s foolishness get him down: a court jester
      named Jokester.
    </p>
  </>
);

/**
 * CaseStudyStatsMetrics displays a case study with prominent performance metrics,
 * breadcrumb navigation, prose content, and a sticky sidebar with company info and CTA.
 *
 * Features a two-column layout with the main content area showing breadcrumbs, title,
 * subtitle, hero image, a grid of key statistics (4 metrics), and rich prose content
 * with headings, paragraphs, blockquotes, lists, tables, and alerts. The sticky sidebar
 * displays company logo, overview text, sector information, a solution badge with icon,
 * and a call-to-action button.
 *
 * Ideal for results-focused case studies that emphasize quantifiable outcomes,
 * customer success stories with measurable impact, or ROI-driven content marketing.
 *
 * @example
 * ```tsx
 * <CaseStudyStatsMetrics
 *   title="Boosting System Reliability by 125% with AI Monitoring"
 *   stats={[
 *     { value: "125%", label: "improvement in system reliability" },
 *     { value: "40%", label: "reduction in downtime" }
 *   ]}
 *   companyLogo="/logos/client.svg"
 *   overview="Enterprise software company"
 *   sector="Technology"
 * />
 * ```
 */
export function CaseStudyStatsMetrics({
  breadcrumbs = defaultBreadcrumbs,
  title = "Boosting System Reliability by 125% with AI Monitoring",
  subtitle = "In a kingdom far away, where laughter once flowed freely, a peculiar tale unfolded about a king who decided to tax the very essence of joy itself - jokes and jest.",
  heroImage = blockBrandedIconsAndPlaceholders.placeholder1,
  heroImageAlt = "Case study hero image",
  stats = defaultStats,
  content = defaultContent,
  companyLogo = blockBrandedIconsAndPlaceholders.fictionalCompanyLogo3,
  overview = "Our client implemented our solution to transform their business operations, resulting in improved efficiency, enhanced customer experience, and significant cost savings across their entire organization.",
  sector = "Technology",
  solutionLabel = "Enterprise",
  solutionIcon = "lucide/git-branch",
  ctaLabel = "Contact us",
  ctaHref = "#",
  learnMoreLabel = "Want to learn more?",
  className,
  optixFlowConfig,
}: CaseStudyStatsMetricsProps) {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb className="mb-6 lg:mb-10">
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem key={index}>
                  {crumb.href ? (
                    <>
                      <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator>/</BreadcrumbSeparator>
                      )}
                    </>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative flex-col gap-10 lg:flex lg:flex-row lg:justify-between">
            <div className="lg:max-w-[692px]">
              <div className="max lg:col-span-2">
                <div>
                  <h1 className="text-3xl font-extrabold text-pretty">
                    {title}
                  </h1>
                  <p className="mt-2 text-lg text-muted-foreground">
                    {subtitle}
                  </p>
                  <Img
                    src={heroImage}
                    alt={heroImageAlt}
                    className="my-8 aspect-video w-full rounded-lg object-cover"
                    loading="lazy"
                    optixFlowConfig={optixFlowConfig}
                  />
                  <div className="mb-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="flex flex-col gap-2">
                        <p className="text-4xl font-semibold sm:text-5xl">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="prose mb-8 max-w-full lg:max-w-prose dark:prose-invert">
                  {content}
                </div>
              </div>
            </div>
            <div className="h-fit lg:sticky lg:top-8 lg:max-w-80">
              <Img
                src={companyLogo}
                alt="Company logo"
                className="mb-8 w-36"
                loading="lazy"
                optixFlowConfig={optixFlowConfig}
              />
              <p className="mb-1.5 text-sm font-semibold">Overview</p>
              <p className="mb-5 text-sm text-muted-foreground">{overview}</p>
              <p className="mb-1.5 text-sm font-semibold">Sector</p>
              <p className="mb-5 text-sm text-muted-foreground">{sector}</p>
              <p className="mb-1.5 text-sm font-semibold">Solution</p>
              <Pressable
                href="#"
                variant="outline"
                size="sm"
                asButton
                className="inline-flex items-center gap-2"
              >
                <DynamicIcon name={solutionIcon} size={16} className="opacity-60" />
                {solutionLabel}
              </Pressable>
              <Separator className="my-5" />
              <p className="mb-3 text-sm font-semibold">{learnMoreLabel}</p>
              <Pressable
                href={ctaHref}
                variant="default"
                size="sm"
                asButton
              >
                {ctaLabel}
              </Pressable>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
