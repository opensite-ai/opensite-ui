```tsx
import { cn } from "@/lib/utils";

interface CaseStudy8Props {
  className?: string;
}

const CaseStudy8 = ({ className }: CaseStudy8Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container flex flex-col gap-12 lg:flex-row lg:gap-24">
        <article className="mx-auto">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="mb-8 aspect-video w-full max-w-3xl rounded-lg border object-cover"
          />
          <div className="prose dark:prose-invert">
            <h1>How Mercury uses shadcn/ui to build their design system</h1>
            <p>
              Once upon a time, in a far-off land, there was a very lazy king
              who spent all day lounging on his throne. One day, his advisors
              came to him with a problem: the kingdom was running out of money.
            </p>
            <h2>The King&apos;s Plan</h2>
            <p>
              The king thought long and hard, and finally came up with{" "}
              <a href="#">a brilliant plan</a>: he would tax the jokes in the
              kingdom.
            </p>
            <blockquote>
              &ldquo;After all,&rdquo; he said, &ldquo;everyone enjoys a good
              joke, so it&apos;s only fair that they should pay for the
              privilege.&rdquo;
            </blockquote>
            <h3>The Joke Tax</h3>
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
              As a result, people stopped telling jokes, and the kingdom fell
              into a gloom. But there was one person who refused to let the
              king&apos;s foolishness get him down: a court jester named
              Jokester.
            </p>
            <h3>Jokester&apos;s Revolt</h3>
            <p>
              Jokester began sneaking into the castle in the middle of the night
              and leaving jokes all over the place: under the king&apos;s
              pillow, in his soup, even in the royal toilet. The king was
              furious, but he couldn&apos;t seem to stop Jokester.
            </p>
            <p>
              And then, one day, the people of the kingdom discovered that the
              jokes left by Jokester were so funny that they couldn&apos;t help
              but laugh. And once they started laughing, they couldn&apos;t
              stop.
            </p>
            <h3>The People&apos;s Rebellion</h3>
            <p>
              The people of the kingdom, feeling uplifted by the laughter,
              started to tell jokes and puns again, and soon the entire kingdom
              was in on the joke.
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
              The king, seeing how much happier his subjects were, realized the
              error of his ways and repealed the joke tax. Jokester was declared
              a hero, and the kingdom lived happily ever after.
            </p>
            <p>
              The moral of the story is: never underestimate the power of a good
              laugh and always be careful of bad ideas.
            </p>
          </div>
        </article>

        <aside className="lg:max-w-[300px]">
          <div className="flex flex-col items-start rounded-lg border border-border bg-accent py-6 md:py-8">
            <div className="mb-8 px-6">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg"
                alt="placeholder"
                className="max-h-8 w-full"
              />
            </div>
            <div className="mb-5 px-6 last:mb-0">
              <div className="mb-2 text-xs font-semibold">Company</div>
              <div className="overflow-hidden text-xs text-muted-foreground md:text-sm">
                Suspendisse vel euismod sem. Sed sollicitudin augue eu facilisis
                scelerisque. Nullam pharetra tortor ut massa accumsan egestas.
              </div>
            </div>
            <div className="mb-5 px-6 last:mb-0">
              <div className="mb-2 text-xs font-semibold">Industry</div>
              <div className="overflow-hidden text-xs text-muted-foreground md:text-sm">
                Suspendisse volutpat
              </div>
            </div>
            <div className="mb-5 w-full border-t border-border px-6 pt-5 last:mb-0">
              <div className="mb-2 text-xs font-semibold">Location</div>
              <div className="overflow-hidden text-xs text-muted-foreground md:text-sm">
                London, United Kingdom
              </div>
            </div>
            <div className="mb-5 px-6 last:mb-0">
              <div className="mb-2 text-xs font-semibold">Company size</div>
              <div className="overflow-hidden text-xs text-muted-foreground md:text-sm">
                11-50
              </div>
            </div>
            <div className="mb-5 px-6 last:mb-0">
              <div className="mb-2 text-xs font-semibold">Website</div>
              <div className="overflow-hidden text-xs text-muted-foreground md:text-sm">
                <a href="#" className="underline hover:text-foreground">
                  https://example.com/
                </a>
              </div>
            </div>
            <div className="mb-5 px-6 last:mb-0">
              <div className="mb-2 text-xs font-semibold">Topics</div>
              <div className="overflow-hidden text-xs text-muted-foreground md:text-sm">
                Sed sollicitudin augue eu facilisis scelerisque
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export { CaseStudy8 };

```

```tsx
"use client";

import { AlignLeft, CheckCircle2, Lightbulb } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

interface CaseStudy3Props {
  className?: string;
}

const CaseStudy3 = ({ className }: CaseStudy3Props) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const sections = Object.keys(sectionRefs.current);

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

    sections.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId];
      if (element) {
        observer?.observe(element);
      }
    });

    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, []);

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
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>Components</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="mt-10 text-5xl font-semibold text-balance lg:text-7xl">
              How this tool helps teams achieve efficient workflows
            </h1>
            <div className="mt-16">
              <p className="font-medium">Featuring insights from:</p>
              <div className="mt-4 flex items-center gap-4">
                <Avatar className="size-16 rounded-xl border">
                  <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" alt="avatar" />
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-semibold">Jane Doe</p>
                  <p className="text-muted-foreground">
                    Senior Product Manager
                  </p>
                </div>
              </div>
            </div>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="placeholder"
            className="max-h-[524px] w-full rounded-xl object-cover lg:w-auto"
          />
        </div>
        <div className="relative mt-20 flex flex-col gap-x-6 gap-y-16 lg:flex-row">
          <aside className="mx-auto h-fit max-w-prose lg:sticky lg:top-10 lg:mx-0 lg:w-64 lg:max-w-none">
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcn-ui-wordmark.svg"
              alt="logo"
              className="h-6 dark:invert"
            />
            <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-1">
              <div className="col-span-2 lg:col-span-1">
                <h2 className="font-semibold">Overview</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  A modern platform designed to simplify workflows, automate
                  processes, and drive innovation at scale. It is the central
                  foundation for product and customer data, on top of which high
                  impact workflows are built.
                </p>
              </div>
              <div>
                <h2 className="font-semibold">Sector</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Technology; Automation
                </p>
              </div>
              <div>
                <h2 className="font-semibold">Team size</h2>
                <p className="mt-1 text-sm text-muted-foreground">10-100</p>
              </div>
              <div>
                <h2 className="font-semibold">Location</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  San Francisco, California
                </p>
              </div>
              <div>
                <h2 className="font-semibold">Established</h2>
                <p className="mt-1 text-sm text-muted-foreground">2020</p>
              </div>
              <div>
                <h2 className="font-semibold">Funding</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  $25m (Series A)
                </p>
              </div>
              <div>
                <h2 className="font-semibold">Core features</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Dashboards Tools API integration
                </p>
              </div>
            </div>
            <div className="mt-10 flex flex-col">
              <span className="mb-2 text-sm text-muted-foreground">
                Share this content:
              </span>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <FaLinkedin className="size-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <FaTwitter className="size-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <FaFacebook className="size-5" />
                </a>
              </div>
            </div>
          </aside>
          <div className="flex">
            <div className="mx-auto max-w-prose lg:max-w-4xl lg:px-20">
              <div className="grid gap-x-10 gap-y-7 rounded-3xl border p-6 lg:grid-cols-2 lg:gap-y-10 lg:border-none lg:p-0">
                <div>
                  <h2 className="text-xl font-semibold">Problem</h2>
                  <p className="mt-3 text-muted-foreground">
                    The team faced difficulties aligning their growth strategy
                    with a rigid data model, causing inefficiencies and limited
                    access to essential customer insights.
                  </p>
                </div>
                <Separator className="w-full lg:hidden" />
                <div>
                  <h2 className="text-xl font-semibold">Approach</h2>
                  <p className="mt-3 text-muted-foreground">
                    Adopted a flexible platform as the central hub for data,
                    enabling the creation of impactful workflows to drive
                    growth.
                  </p>
                </div>
                <div className="border-t pt-10 lg:col-span-2">
                  <h2 className="text-xl font-semibold">Outcomes</h2>
                  <ul className="mt-3 grid gap-x-10 gap-y-3 lg:grid-cols-2">
                    <li className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                      <p className="font-semibold">
                        A streamlined system that accelerates their growth
                        initiatives
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                      <p className="font-semibold">
                        A customizable CRM that mirrors their data and
                        integrates seamlessly with their tools
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                      <p className="font-semibold">
                        A scalable, collaborative solution that grows alongside
                        their business
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-20">
                <section
                  id="section1"
                  ref={(ref) => addSectionRef("section1", ref)}
                  className="prose mb-8 dark:prose-invert"
                >
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
                </section>
                <section
                  id="section2"
                  ref={(ref) => addSectionRef("section2", ref)}
                  className="prose mb-8 dark:prose-invert"
                >
                  <h2>The Joke Tax</h2>
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
                </section>
                <section
                  id="section3"
                  ref={(ref) => addSectionRef("section3", ref)}
                  className="prose mb-8 dark:prose-invert"
                >
                  <h2>Jokester's Revolt</h2>
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
                </section>

                <section
                  id="section4"
                  ref={(ref) => addSectionRef("section4", ref)}
                  className="prose mb-8 dark:prose-invert"
                >
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
                  <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Royal Decree!</AlertTitle>
                    <AlertDescription>
                      Remember, all jokes must be registered at the Royal Jest
                      Office before telling them
                    </AlertDescription>
                  </Alert>
                </section>
              </div>
            </div>
            <div className="sticky top-8 hidden h-fit shrink-0 lg:block">
              <span className="flex items-center gap-2 text-sm">
                <AlignLeft className="h-4 w-4" />
                On this page
              </span>
              <nav className="mt-2 text-sm">
                <ul>
                  <li>
                    <a
                      href="#section1"
                      className={cn(
                        "block py-1 transition-colors duration-200",
                        activeSection === "section1"
                          ? "font-medium text-primary"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      The King's Plan
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section2"
                      className={cn(
                        "block py-1 transition-colors duration-200",
                        activeSection === "section2"
                          ? "font-medium text-primary"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      The Joke Tax
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section3"
                      className={cn(
                        "block py-1 transition-colors duration-200",
                        activeSection === "section3"
                          ? "font-medium text-primary"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      Jokester's Revolt
                    </a>
                  </li>
                  <li>
                    <a
                      href="#section4"
                      className={cn(
                        "block py-1 transition-colors duration-200",
                        activeSection === "section4"
                          ? "font-medium text-primary"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      The People's Rebellion
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CaseStudy3 };

```

```tsx
import { GitBranch, Lightbulb } from "lucide-react";

import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CaseStudy1Props {
  className?: string;
}

const CaseStudy1 = ({ className }: CaseStudy1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb className="mb-6 lg:mb-10">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Components</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative flex-col gap-10 lg:flex lg:flex-row lg:justify-between">
            <div className="lg:max-w-[692px]">
              <div className="max lg:col-span-2">
                <div>
                  <h1 className="text-3xl font-extrabold text-pretty">
                    Boosting System Reliability by 125% with AI Monitoring
                  </h1>
                  <p className="mt-2 text-lg text-muted-foreground">
                    In a kingdom far away, where laughter once flowed freely, a
                    peculiar tale unfolded about a king who decided to tax the
                    very essence of joy itself - jokes and jest.
                  </p>
                  <img
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
                    alt="placeholder"
                    className="my-8 aspect-video w-full rounded-lg object-cover"
                  />
                  <div className="mb-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
                    <div className="flex flex-col gap-2">
                      <p className="text-4xl font-semibold sm:text-5xl">19%</p>
                      <p className="text-sm text-muted-foreground">
                        increase in user engagement rate
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-4xl font-semibold sm:text-5xl">28%</p>
                      <p className="text-sm text-muted-foreground">
                        growth in customer retention rate
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-4xl font-semibold sm:text-5xl">72%</p>
                      <p className="text-sm text-muted-foreground">
                        satisfaction rate among users and customers
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-4xl font-semibold sm:text-5xl">
                        &gt;85%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        positive feedback received from users
                      </p>
                    </div>
                  </div>
                </div>
                <div className="prose mb-8 max-w-full lg:max-w-prose dark:prose-invert">
                  <h2>How the Tax System Works</h2>
                  <p>
                    The king, seeing how much happier his subjects were,
                    realized the error of his ways and repealed the joke tax.
                    Jokester was declared a hero, and the kingdom lived happily
                    ever after.
                  </p>
                  <Alert>
                    <Lightbulb className="h-4 w-4" />
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
                </div>
              </div>
            </div>
            <div className="h-fit lg:sticky lg:top-8 lg:max-w-80">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg"
                alt="logo"
                className="mb-8 w-36"
              />
              <p className="mb-1.5 text-sm font-semibold">Overview</p>
              <p className="mb-5 text-sm text-muted-foreground">
                Our client implemented our solution to transform their business
                operations, resulting in improved efficiency, enhanced customer
                experience, and significant cost savings across their entire
                organization.
              </p>
              <p className="mb-1.5 text-sm font-semibold">Sector</p>
              <p className="mb-5 text-sm text-muted-foreground">Technology</p>
              <p className="mb-1.5 text-sm font-semibold">Solution</p>
              <Button size="sm" variant="outline">
                <GitBranch className="opacity-60" />
                Enterprise
              </Button>
              <Separator className="my-5" />
              <p className="mb-3 text-sm font-semibold">Want to learn more?</p>
              <Button size="sm">Contact us</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CaseStudy1 };

```
