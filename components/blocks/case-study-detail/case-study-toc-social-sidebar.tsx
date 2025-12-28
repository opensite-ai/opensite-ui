"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { imagePlaceholders, logoPlaceholders } from "../../../lib/mediaPlaceholders";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { Avatar, AvatarImage } from "../../ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../ui/breadcrumb";
import { Separator } from "../../ui/separator";

export interface CaseStudyTocSocialSidebarSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface CaseStudyTocSocialSidebarOutcome {
  text: string;
}

export interface CaseStudyTocSocialSidebarProps {
  breadcrumbs?: { label: string; href?: string }[];
  title?: string;
  heroImage?: string;
  heroImageAlt?: string;
  authorName?: string;
  authorRole?: string;
  authorAvatar?: string;
  companyLogo?: string;
  overview?: string;
  sector?: string;
  teamSize?: string;
  location?: string;
  established?: string;
  funding?: string;
  coreFeatures?: string;
  problem?: string;
  approach?: string;
  outcomes?: CaseStudyTocSocialSidebarOutcome[];
  sections?: CaseStudyTocSocialSidebarSection[];
  socialLinks?: { icon: string; href: string; label: string }[];
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

const defaultSocialLinks = [
  { icon: "simple-icons/linkedin", href: "#", label: "LinkedIn" },
  { icon: "simple-icons/x", href: "#", label: "X" },
  { icon: "simple-icons/facebook", href: "#", label: "Facebook" },
];

const defaultOutcomes: CaseStudyTocSocialSidebarOutcome[] = [
  { text: "A streamlined system that accelerates their growth initiatives" },
  { text: "A customizable CRM that mirrors their data and integrates seamlessly with their tools" },
  { text: "A scalable, collaborative solution that grows alongside their business" },
];

const defaultSections: CaseStudyTocSocialSidebarSection[] = [
  {
    id: "section1",
    title: "The King's Plan",
    content: (
      <>
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
      </>
    ),
  },
  {
    id: "section2",
    title: "The Joke Tax",
    content: (
      <>
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
    ),
  },
  {
    id: "section3",
    title: "Jokester's Revolt",
    content: (
      <>
        <p className="leading-7 not-first:mt-6">
          Jokester began sneaking into the castle in the middle of the
          night and leaving jokes all over the place: under the king's
          pillow, in his soup, even in the royal toilet. The king was
          furious, but he couldn't seem to stop Jokester.
        </p>
        <p className="leading-7 not-first:mt-6">
          And then, one day, the people of the kingdom discovered that
          the jokes left by Jokester were so funny that they couldn't
          help but laugh. And once they started laughing, they
          couldn't stop.
        </p>
      </>
    ),
  },
  {
    id: "section4",
    title: "The People's Rebellion",
    content: (
      <>
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
        <Alert>
          <DynamicIcon name="lucide/lightbulb" size={16} className="h-4 w-4" />
          <AlertTitle>Royal Decree!</AlertTitle>
          <AlertDescription>
            Remember, all jokes must be registered at the Royal Jest
            Office before telling them
          </AlertDescription>
        </Alert>
      </>
    ),
  },
];

/**
 * CaseStudyTocSocialSidebar displays a comprehensive case study with breadcrumb
 * navigation, featured author, sticky sidebar with company details, table of
 * contents navigation, and social sharing links.
 *
 * Features a three-column layout on large screens: left sidebar with company info
 * and social links, center content area with problem/approach/outcomes summary
 * followed by prose sections, and right sidebar with sticky table of contents.
 * The header includes breadcrumbs, large title, and author attribution with avatar.
 * Each content section is tracked via IntersectionObserver for active TOC highlighting.
 *
 * Ideal for in-depth case studies, customer success stories, or detailed articles
 * that benefit from structured navigation and comprehensive company context.
 *
 * @example
 * ```tsx
 * <CaseStudyTocSocialSidebar
 *   title="How this tool helps teams achieve efficient workflows"
 *   authorName="Jane Doe"
 *   authorRole="Senior Product Manager"
 *   companyLogo="/logos/company.svg"
 *   overview="A modern platform designed to simplify workflows"
 *   sector="Technology; Automation"
 *   sections={[
 *     { id: "intro", title: "Introduction", content: <p>...</p> }
 *   ]}
 * />
 * ```
 */
export function CaseStudyTocSocialSidebar({
  breadcrumbs = defaultBreadcrumbs,
  title = "How this tool helps teams achieve efficient workflows",
  heroImage = blockBrandedIconsAndPlaceholders.placeholder1,
  heroImageAlt = "Case study hero image",
  authorName = "Jane Doe",
  authorRole = "Senior Product Manager",
  authorAvatar = blockBrandedIconsAndPlaceholders.avatar1,
  companyLogo = blockBrandedIconsAndPlaceholders.shadcnUiWordmarkWhite,
  overview = "A modern platform designed to simplify workflows, automate processes, and drive innovation at scale. It is the central foundation for product and customer data, on top of which high impact workflows are built.",
  sector = "Technology; Automation",
  teamSize = "10-100",
  location = "San Francisco, California",
  established = "2020",
  funding = "$25m (Series A)",
  coreFeatures = "Dashboards Tools API integration",
  problem = "The team faced difficulties aligning their growth strategy with a rigid data model, causing inefficiencies and limited access to essential customer insights.",
  approach = "Adopted a flexible platform as the central hub for data, enabling the creation of impactful workflows to drive growth.",
  outcomes = defaultOutcomes,
  sections = defaultSections,
  socialLinks = defaultSocialLinks,
  className,
  optixFlowConfig,
}: CaseStudyTocSocialSidebarProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const sectionIds = Object.keys(sectionRefs.current);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    let observer: IntersectionObserver | null = new IntersectionObserver(
      observerCallback,
      {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      },
    );

    sectionIds.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId];
      if (element) {
        observer?.observe(element);
      }
    });

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, [sections]);

  const addSectionRef = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-prose flex-col items-center justify-between gap-10 lg:max-w-none lg:flex-row">
          <div>
            <Breadcrumb>
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
            <h1 className="mt-10 text-5xl font-semibold text-balance lg:text-7xl">
              {title}
            </h1>
            <div className="mt-16">
              <p className="font-medium">Featuring insights from:</p>
              <div className="mt-4 flex items-center gap-4">
                <Avatar className="size-16 rounded-xl border">
                  <AvatarImage src={authorAvatar} alt={authorName} />
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-semibold">{authorName}</p>
                  <p className="text-muted-foreground">{authorRole}</p>
                </div>
              </div>
            </div>
          </div>
          <Img
            src={heroImage}
            alt={heroImageAlt}
            className="max-h-[524px] w-full rounded-xl object-cover lg:w-auto"
            loading="lazy"
            optixFlowConfig={optixFlowConfig}
          />
        </div>
        <div className="relative mt-20 flex flex-col gap-x-6 gap-y-16 lg:flex-row">
          <aside className="mx-auto h-fit max-w-prose lg:sticky lg:top-10 lg:mx-0 lg:w-64 lg:max-w-none">
            <Img
              src={companyLogo}
              alt="Company logo"
              className="h-6 dark:invert"
              loading="lazy"
              optixFlowConfig={optixFlowConfig}
            />
            <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-1">
              <div className="col-span-2 lg:col-span-1">
                <h2 className="font-semibold">Overview</h2>
                <p className="mt-1 text-sm text-muted-foreground">{overview}</p>
              </div>
              <div>
                <h2 className="font-semibold">Sector</h2>
                <p className="mt-1 text-sm text-muted-foreground">{sector}</p>
              </div>
              <div>
                <h2 className="font-semibold">Team size</h2>
                <p className="mt-1 text-sm text-muted-foreground">{teamSize}</p>
              </div>
              <div>
                <h2 className="font-semibold">Location</h2>
                <p className="mt-1 text-sm text-muted-foreground">{location}</p>
              </div>
              <div>
                <h2 className="font-semibold">Established</h2>
                <p className="mt-1 text-sm text-muted-foreground">{established}</p>
              </div>
              <div>
                <h2 className="font-semibold">Funding</h2>
                <p className="mt-1 text-sm text-muted-foreground">{funding}</p>
              </div>
              <div>
                <h2 className="font-semibold">Core features</h2>
                <p className="mt-1 text-sm text-muted-foreground">{coreFeatures}</p>
              </div>
            </div>
            <div className="mt-10 flex flex-col">
              <span className="mb-2 text-sm text-muted-foreground">
                Share this content:
              </span>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <Pressable
                    key={index}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary"
                    aria-label={social.label}
                  >
                    <DynamicIcon name={social.icon} size={20} className="size-5" />
                  </Pressable>
                ))}
              </div>
            </div>
          </aside>
          <div className="flex">
            <div className="mx-auto max-w-prose lg:max-w-4xl lg:px-20">
              <div className="grid gap-x-10 gap-y-7 rounded-3xl border p-6 lg:grid-cols-2 lg:gap-y-10 lg:border-none lg:p-0">
                <div>
                  <h2 className="text-xl font-semibold">Problem</h2>
                  <p className="mt-3 text-muted-foreground">{problem}</p>
                </div>
                <Separator className="w-full lg:hidden" />
                <div>
                  <h2 className="text-xl font-semibold">Approach</h2>
                  <p className="mt-3 text-muted-foreground">{approach}</p>
                </div>
                <div className="border-t pt-10 lg:col-span-2">
                  <h2 className="text-xl font-semibold">Outcomes</h2>
                  <ul className="mt-3 grid gap-x-10 gap-y-3 lg:grid-cols-2">
                    {outcomes.map((outcome, index) => (
                      <li key={index} className="flex gap-3">
                        <DynamicIcon name="lucide/check-circle-2" size={20} className="mt-0.5 size-5 shrink-0" />
                        <p className="font-semibold">{outcome.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-20">
                {sections.map((section) => (
                  <section
                    key={section.id}
                    id={section.id}
                    ref={(ref) => addSectionRef(section.id, ref)}
                    className="prose mb-8 dark:prose-invert"
                  >
                    <h2>{section.title}</h2>
                    {section.content}
                  </section>
                ))}
              </div>
            </div>
            <div className="sticky top-8 hidden h-fit shrink-0 lg:block">
              <span className="flex items-center gap-2 text-sm">
                <DynamicIcon name="lucide/align-left" size={16} className="h-4 w-4" />
                On this page
              </span>
              <nav className="mt-2 text-sm">
                <ul>
                  {sections.map((section) => (
                    <li key={section.id}>
                      <Pressable
                        href={`#${section.id}`}
                        className={cn(
                          "block py-1 transition-colors duration-200",
                          activeSection === section.id
                            ? "font-medium text-primary"
                            : "text-muted-foreground hover:text-primary",
                        )}
                      >
                        {section.title}
                      </Pressable>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
