```tsx
"use client";

import { CheckCircle2, OctagonX } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

const rows = [
  {
    label: "Onboarding",
    lightbox: "1-2 days",
    freelance: "30 days",
  },
  {
    label: "Price Range",
    lightbox: "10%",
    freelance: "50-60%",
  },
  {
    label: "Quality Score",
    lightbox: "Top 3%",
    freelance: "Varies",
  },
  {
    label: "Verification",
    lightbox: "Multi-step verification process",
    freelance: "Basic check",
    hasIcon: true,
  },
  {
    label: "Adaptability",
    lightbox: "Fully flexible",
    freelance: "Limited",
    hasIcon: true,
  },
  {
    label: "Support",
    lightbox: "24/7 dedicated team",
    freelance: "Limited hours",
    hasIcon: true,
  },
];

interface Compare1Props {
  className?: string;
}

const Compare1 = ({ className }: Compare1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="mb-8 text-3xl font-bold md:mb-12 md:text-5xl">
          Compare us with others.
        </h1>
        <div className="-mr-4 overflow-x-auto">
          <div className="min-w-[672px] overflow-hidden">
            <div className="grid grid-cols-3 [&>:last-child_div]:rounded-b-md [&>div:nth-last-child(-n+3)]:rounded-b-md [&>div:nth-last-child(-n+3)]:border-b-0">
              <div className="p-4"></div>
              <div className="flex items-center rounded-t-md bg-green-100 p-3 md:p-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-7.svg"
                  alt="logo"
                  className="h-7 md:h-8"
                />
              </div>
              <div className="flex items-center rounded-t-md bg-red-100 p-3 md:p-4">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg"
                  alt="logo"
                  className="h-7 md:h-8"
                />
              </div>
              {rows.map((row, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center border-b p-3 text-base font-medium md:p-4 md:text-lg">
                    {row.label}
                  </div>
                  <div className="border-b bg-green-50 p-3 md:p-6">
                    <div className="flex items-center gap-2">
                      {row.hasIcon && (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      )}
                      <span className="text-base md:text-lg">
                        {row.lightbox}
                      </span>
                    </div>
                  </div>
                  <div className="border-b bg-red-50 p-3 md:p-6">
                    <div className="flex items-center gap-2">
                      {row.hasIcon && (
                        <OctagonX className="h-5 w-5 text-red-600" />
                      )}
                      <span className="text-base md:text-lg">
                        {row.freelance}
                      </span>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Compare1 };

```

```tsx
import { CheckCircle2, CircleMinus } from "lucide-react";

import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";

interface Compare2Props {
  className?: string;
}

const Compare2 = ({ className }: Compare2Props) => {
  return (
    <section className={cn("bg-muted/50 py-32", className)}>
      <div className="container">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-semibold md:text-7xl">
            Product A vs. Product B: Making the Right Choice
          </h1>
          <p className="mx-auto max-w-4xl text-muted-foreground md:text-xl">
            Product A isn&apos;t just an alternative to Product B. It offers
            enhanced features and capabilities, making it easier to achieve your
            goals with a modern, intuitive interface designed for today&apos;s
            needs.
          </p>
        </div>
        <div className="mt-28">
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            <div className="rounded-xl border bg-background p-6 shadow">
              <span className="flex items-center justify-center gap-2 font-medium">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                  alt="company logo"
                  className="h-7"
                />
                Product A
              </span>
              <Separator className="my-6" />
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Basic Plan Available
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Unlimited Users
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Advanced Features
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Partner Program
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Live Events
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Community Access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Premium Support
                </li>
              </ul>
            </div>
            <div className="rounded-xl bg-border/40 p-6">
              <span className="flex items-center justify-center gap-2 font-medium">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
                  alt="company logo"
                  className="h-7"
                />
                Product B
              </span>
              <Separator className="my-6" />
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Basic Plan Available
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Unlimited Users
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" />
                  Basic Features
                </li>
                <li className="flex items-center gap-2 text-muted-foreground line-through">
                  <CircleMinus className="h-5 w-5 shrink-0 opacity-50" />
                  Partner Program
                </li>
                <li className="flex items-center gap-2 text-muted-foreground line-through">
                  <CircleMinus className="h-5 w-5 shrink-0 opacity-50" />
                  Live Events
                </li>
                <li className="flex items-center gap-2 text-muted-foreground line-through">
                  <CircleMinus className="h-5 w-5 shrink-0 opacity-50" />
                  Community Access
                </li>
                <li className="flex items-center gap-2 text-muted-foreground line-through">
                  <CircleMinus className="h-5 w-5 shrink-0 opacity-50" />
                  Premium Support
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-4 text-3xl font-semibold">
            Who is Product B suitable for?
          </h2>
          <p className="leading-6 text-muted-foreground md:text-lg">
            Product B is a reliable solution designed for basic needs and
            smaller teams. It provides essential functionality for those getting
            started or requiring fundamental features. While it offers a
            straightforward interface, it may lack some of the advanced
            capabilities needed for scaling operations or handling complex
            workflows.
          </p>
          <h2 className="mt-16 mb-4 text-3xl font-semibold">
            Key Differences and Considerations
          </h2>
          <p className="leading-6 text-muted-foreground md:text-lg">
            When choosing between Product A and Product B, consider your
            long-term needs and growth plans. Product A offers more advanced
            features, better scalability, and premium support options. While
            Product B might be suitable for basic use cases, Product A provides
            a more comprehensive solution for teams looking to expand and
            optimize their workflows.
          </p>
        </div>
      </div>
    </section>
  );
};

export { Compare2 };

```

```tsx
import {
  BadgePercent,
  CheckCircle,
  CircleMinus,
  Code2,
  Headset,
  LineChart,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Compare3Props {
  className?: string;
}

const Compare3 = ({ className }: Compare3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-4">
          <Badge variant="outline">Comparison</Badge>
          <h2 className="mx-auto max-w-2xl text-center text-4xl font-semibold sm:text-5xl">
            See how Acme stacks up against the competition
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-muted-foreground">
            Discover why our customers choose Acme over other document
            management solutions
          </p>
        </div>
        <div className="-mx-7 overflow-x-auto">
          <div className="mt-14 grid min-w-2xl grid-cols-3">
            <div className="border-b border-border p-5"></div>
            <div className="flex flex-col items-center gap-2 rounded-t-2xl border-b border-border bg-muted p-5">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt="Acme logo"
                className="size-8"
              />
              <p className="text-lg font-semibold">Acme</p>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                Built with customer needs in mind
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 border-b border-border p-5">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
                alt="Biz logo"
                className="size-8"
              />
              <p className="text-lg font-semibold">Biz</p>
              <p className="mt-1 text-center text-sm text-muted-foreground">
                A popular alternative solution
              </p>
            </div>
            <div className="flex items-center gap-2 border-b border-border p-5">
              <Users className="size-4 shrink-0" />
              <span className="font-semibold">Team Overview</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-border bg-muted p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-xs text-muted-foreground">
                Comprehensive dashboard
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-border p-5">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-xs text-muted-foreground">
                Basic overview only
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-border p-5">
              <BadgePercent className="size-4 shrink-0" />
              <span className="font-semibold">Custom Branding</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-border bg-muted p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-xs text-muted-foreground">
                Full customization
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-border p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-xs text-muted-foreground">
                Limited options
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-border p-5">
              <Code2 className="size-4 shrink-0" />
              <span className="font-semibold">API Access</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-border bg-muted p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-xs text-muted-foreground">Robust API</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-border p-5">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-xs text-muted-foreground">
                No API available
              </span>
            </div>
            <div className="flex items-center gap-2 border-b border-border p-5">
              <LineChart className="size-4 shrink-0" />
              <span className="font-semibold">Advanced Analytics</span>
              <Badge variant="secondary">Soon</Badge>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-border bg-muted p-5">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-xs text-muted-foreground">
                Coming Q3 2025
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-b border-border p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-xs text-muted-foreground">
                Basic reporting
              </span>
            </div>
            <div className="flex items-center gap-2 border-border p-5">
              <Headset className="size-4 shrink-0" />
              <span className="font-semibold">Customer Support</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-border bg-muted p-5">
              <CheckCircle className="size-5 text-green-600" />
              <span className="text-xs text-muted-foreground">
                24/7 dedicated team
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 p-5">
              <CircleMinus className="size-5 text-red-600" />
              <span className="text-xs text-muted-foreground">
                Email support only
              </span>
            </div>
            <div className="border-border p-5"></div>
            <div className="flex items-center justify-center gap-2 rounded-b-2xl border-border bg-muted p-5">
              <Button className="w-full">Try Acme today</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Compare3 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface DataItem {
  title: string;
  brick: { value: string; unit?: string; desc: string };
  ghost: { value: string; unit?: string; desc: string };
}

interface Compare4Props {
  className?: string;
}

const Compare4 = ({ className }: Compare4Props) => {
  const DATA: DataItem[] = [
    {
      title: "Server Requirements",
      brick: {
        value: "2500",
        unit: "GB",
        desc: "High-performance dedicated servers",
      },
      ghost: {
        value: "250",
        unit: "GB",
        desc: "Cloud-optimized infrastructure",
      },
    },
    {
      title: "Team Size (~)",
      brick: { value: "20", desc: "Full in-house development team" },
      ghost: { value: "5", desc: "Core team with automated workflows" },
    },
    {
      title: "Development Time",
      brick: { value: "48", unit: "w", desc: "Traditional development cycle" },
      ghost: { value: "8", unit: "w", desc: "Rapid deployment framework" },
    },
    {
      title: "Initial Setup",
      brick: {
        value: "$1.2",
        unit: "M",
        desc: "Enterprise infrastructure costs",
      },
      ghost: { value: "$40", unit: "k*", desc: "Pay-as-you-grow model" },
    },
    {
      title: "ROI Timeline",
      brick: { value: "4", unit: "y", desc: "Standard enterprise timeline" },
      ghost: { value: "8", unit: "m", desc: "Accelerated market entry" },
    },
  ];

  return (
    <section className={cn("bg-muted/30 py-32", className)}>
      <div className="container grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-8 lg:grid-cols-12">
        {/* Header */}
        <div className="col-span-4 mb-8 max-w-3xl md:col-span-8 md:mb-12 lg:col-span-10 lg:col-start-2 lg:mb-16">
          <h2 className="mb-4 text-center text-3xl font-bold sm:text-left md:text-4xl lg:text-6xl">
            Compare Cloud vs On-site Infrastructure
          </h2>
        </div>

        {/* Column Headers */}
        <div className="col-span-4 px-4 md:col-span-8 lg:col-span-10 lg:col-start-2">
          <div className="grid grid-cols-4 items-center gap-4 md:grid-cols-8">
            <div className="col-span-4 md:col-span-2"></div>
            <div className="col-span-2 ml-0 md:col-span-3 md:ml-32 lg:ml-40 xl:ml-48 2xl:ml-56">
              <h4 className="text-xs font-bold tracking-wider text-muted-foreground uppercase md:text-sm">
                Traditional
              </h4>
            </div>
            <div className="col-span-2 ml-0 md:col-span-3 md:ml-32 lg:ml-40 xl:ml-48 2xl:ml-56">
              <h4 className="text-xs font-bold tracking-wider uppercase md:text-sm">
                Cloud-Native
              </h4>
            </div>
          </div>
        </div>

        {/* Comparison rows wrapper */}
        <div className="col-span-4 rounded-xl bg-background shadow-sm md:col-span-8 lg:col-span-10 lg:col-start-2">
          {DATA.map((row, index) => (
            <div
              key={index}
              className="group border-t px-4 transition-colors first:rounded-t-xl first:border-t-0 last:rounded-b-xl hover:bg-muted/50"
            >
              <div className="grid grid-cols-4 items-start gap-4 py-6 md:grid-cols-8 md:py-8">
                <h3 className="col-span-4 mt-2 text-base font-bold md:col-span-2 md:text-lg">
                  {row.title}
                </h3>

                {/* Traditional Stat */}
                <div className="col-span-2 flex flex-col md:col-span-3">
                  <div className="ml-0 transition-colors group-hover:text-foreground md:ml-32 lg:ml-40 xl:ml-48 2xl:ml-56">
                    <p className="mb-1 flex items-baseline text-2xl font-bold text-foreground md:mb-2 md:text-5xl">
                      {row.brick.value}
                      {row.brick.unit && (
                        <sup className="ml-0.5 text-xs text-foreground md:text-sm">
                          {row.brick.unit}
                        </sup>
                      )}
                    </p>
                    <p className="text-xs leading-tight text-muted-foreground md:text-sm md:leading-normal">
                      {row.brick.desc}
                    </p>
                  </div>
                </div>

                {/* Cloud-Native Stat */}
                <div className="col-span-2 flex flex-col md:col-span-3">
                  <div className="ml-0 transition-colors group-hover:text-accent-foreground md:ml-32 lg:ml-40 xl:ml-48 2xl:ml-56">
                    <p className="mb-1 flex items-baseline text-2xl font-bold text-foreground md:mb-2 md:text-5xl">
                      {row.ghost.value}
                      {row.ghost.unit && (
                        <sup className="ml-0.5 text-xs text-foreground md:text-sm">
                          {row.ghost.unit}
                        </sup>
                      )}
                    </p>
                    <p className="text-xs leading-tight text-muted-foreground md:text-sm md:leading-normal">
                      {row.ghost.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-2">
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground md:text-sm">
                * Varies based on specific requirements and complexity
              </p>
              <p className="text-xs text-muted-foreground md:text-sm">
                ^ Deployment time may vary depending on integration requirements
              </p>
              <p className="text-xs text-muted-foreground md:text-sm">
                # Additional costs may apply for premium features
              </p>
            </div>
            <div className="flex justify-end">
              <Button className="rounded-full px-8 transition-transform hover:scale-105">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Compare4 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Compare5Props {
  className?: string;
}

const Compare5 = ({ className }: Compare5Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl font-medium sm:text-4xl md:text-5xl lg:text-6xl">
            Old vs New
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground sm:mt-6 sm:text-xl">
            Compare the difference between the orignal and the new way of doing
            things.
          </p>
        </div>
        <div className="relative mt-8 grid gap-6 sm:mt-10 md:mt-12 lg:grid-cols-2 lg:gap-10 xl:gap-14">
          {/* Build for Me Card */}
          <div className="relative h-full">
            <div className="relative aspect-4/5 min-h-[400px] overflow-hidden rounded-2xl bg-accent sm:aspect-[0.9] sm:min-h-[480px] sm:rounded-3xl md:min-h-[520px]">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9jsQcDsxyqA-unsplash.jpg"
                alt="Build for me"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-[40%] bg-linear-to-t from-black via-black/50 to-transparent backdrop-blur-[2px] sm:h-[45%] md:h-[50%]" />
              <div className="absolute bottom-0 w-full space-y-4 p-4 sm:p-6 lg:p-8 xl:p-10">
                <h3 className="text-xl font-semibold text-white sm:text-2xl lg:text-3xl">
                  Option 1
                </h3>
                <p className="mt-2 text-sm text-white/80 sm:text-base">
                  Let our expert team handle everything for you. We'll manage
                  the entire development process from start to finish,
                  delivering a polished solution tailored to your exact
                  specifications.
                </p>
                <Button variant="outline">Get Started</Button>
              </div>
            </div>
          </div>

          {/* Do it Yourself Card */}
          <div className="relative h-full">
            <div className="relative aspect-4/5 min-h-[400px] overflow-hidden rounded-2xl sm:aspect-[0.9] sm:min-h-[480px] sm:rounded-3xl md:min-h-[520px]">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg"
                alt="Do it yourself"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-[40%] bg-linear-to-t from-black via-black/50 to-transparent backdrop-blur-[2px] sm:h-[45%] md:h-[50%]" />
              <div className="absolute bottom-0 w-full space-y-4 p-4 sm:p-6 lg:p-8 xl:p-10">
                <h3 className="text-xl font-semibold text-white sm:text-2xl lg:text-3xl">
                  Option 2
                </h3>
                <p className="mt-2 text-sm text-white/80 sm:text-base">
                  Take control of your project with our comprehensive
                  self-service platform. Access powerful tools and resources to
                  build your solution at your own pace with expert guidance when
                  needed.
                </p>
                <Button variant="outline">Get Started</Button>
              </div>
            </div>
          </div>

          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background px-4 py-2 text-sm font-bold shadow-lg sm:px-6 sm:py-4 sm:text-base lg:px-8 lg:py-6">
            OR
          </span>
        </div>
      </div>
    </section>
  );
};

export { Compare5 };

```

```tsx
"use client";

import { CircleCheck, CircleMinus, CircleX } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Compare6Props {
  className?: string;
}

const Compare6 = ({ className }: Compare6Props) => {
  const comparisonData = {
    features: [
      "Initial cost",
      "Scalability",
      "Performance",
      "Maintenance",
      "Data recovery",
      "Lifespan",
    ],
    models: [
      {
        name: "SSD",
        attributes: [
          { value: "Medium to high", status: "negative" },
          { value: "Limited by size", status: "neutral" },
          { value: "Very fast", status: "positive" },
          { value: "Low maintenance", status: "positive" },
          { value: "Challenging", status: "negative" },
          { value: "5-7 years", status: "neutral" },
        ],
      },
      {
        name: "Cloud Storage",
        attributes: [
          { value: "Pay-as-you-go", status: "positive" },
          { value: "Unlimited scaling", status: "positive" },
          { value: "Depends on connection", status: "neutral" },
          { value: "Managed service", status: "positive" },
          { value: "Provider dependent", status: "neutral" },
          { value: "Indefinite", status: "positive" },
        ],
      },
      {
        name: "NAS",
        attributes: [
          { value: "High upfront", status: "negative" },
          { value: "Expandable", status: "positive" },
          { value: "Network limited", status: "neutral" },
          { value: "Regular upkeep", status: "negative" },
          { value: "Built-in redundancy", status: "positive" },
          { value: "7-10 years", status: "positive" },
        ],
      },
    ],
  };

  const [selectedTab, setSelectedTab] = useState(comparisonData.models[0].name);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Tabs
          defaultValue={comparisonData.models[0].name}
          onValueChange={setSelectedTab}
          className="mb-6 block md:hidden"
        >
          <TabsList className="w-full">
            {comparisonData.models.map((model, idx) => (
              <TabsTrigger key={idx} value={model.name}>
                {model.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="[&>div]:overflow-visible">
          <Table className="table-fixed [&_td]:border [&_th]:border">
            <TableHeader>
              <TableRow>
                <TableHead className="sticky top-0 mb-24 w-1/4 bg-background p-5 text-base font-medium text-primary after:absolute after:right-0 after:-bottom-px after:left-0 after:h-px after:bg-border">
                  Feature
                </TableHead>
                {comparisonData.models.map((model, idx) => (
                  <TableHead
                    key={idx}
                    className={cn(
                      "sticky top-0 mb-24 w-1/4 bg-background p-5 text-center text-base font-medium text-primary after:absolute after:right-0 after:-bottom-px after:left-0 after:h-px after:bg-border md:table-cell",
                      model.name !== selectedTab ? "hidden" : "",
                    )}
                  >
                    {model.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.features.map((feature, rowIdx) => (
                <TableRow key={rowIdx}>
                  <TableCell className="p-5 font-semibold whitespace-normal">
                    {feature}
                  </TableCell>
                  {comparisonData.models.map((model, colIdx) => (
                    <TableCell
                      key={colIdx}
                      className={cn(
                        "p-5 text-center whitespace-normal md:table-cell",
                        model.name !== selectedTab ? "hidden" : "",
                      )}
                    >
                      <div className="flex flex-col items-center gap-1 text-muted-foreground">
                        {model.attributes[rowIdx].status === "positive" && (
                          <span className="flex size-8 items-center justify-center rounded-full border border-green-200 bg-green-100">
                            <CircleCheck className="size-4 text-green-700" />
                          </span>
                        )}
                        {model.attributes[rowIdx].status === "negative" && (
                          <span className="flex size-8 items-center justify-center rounded-full border border-red-200 bg-red-100">
                            <CircleX className="size-4 text-red-700" />
                          </span>
                        )}
                        {model.attributes[rowIdx].status === "neutral" && (
                          <span className="flex size-8 items-center justify-center rounded-full border border-amber-200 bg-amber-100">
                            <CircleMinus className="size-4 text-amber-700" />
                          </span>
                        )}

                        {model.attributes[rowIdx].value}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export { Compare6 };

```

```tsx
import React from "react";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Compare7Props {
  className?: string;
}

const Compare7 = ({ className }: Compare7Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="mb-4 text-center text-4xl font-semibold">Compare Us</h2>
        <p className="mb-8 text-center text-muted-foreground">
          A modern framework for building websites that is better than the
          competition.
        </p>
        <div className="mx-auto max-w-3xl overflow-x-auto">
          <Table className="rounded border text-left shadow-lg">
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead className="bg-muted px-6 py-4 font-semibold">
                  Shadcn
                </TableHead>
                <TableHead className="px-6 py-4 font-semibold">
                  Bootstrap
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-foreground">
              <TableRow>
                <TableCell className="px-6 py-4">Design System</TableCell>
                <TableCell className="bg-muted px-6 py-4">
                  Modern, Utility-first
                </TableCell>
                <TableCell className="px-6 py-4">
                  Classic, Component-based
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="px-6 py-4">Customization</TableCell>
                <TableCell className="bg-muted px-6 py-4">
                  Highly customizable
                </TableCell>
                <TableCell className="px-6 py-4">Limited by default</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="px-6 py-4">Dark Mode</TableCell>
                <TableCell className="bg-muted px-6 py-4">Built-in</TableCell>
                <TableCell className="px-6 py-4">
                  Requires extra setup
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="px-6 py-4">TypeScript Support</TableCell>
                <TableCell className="bg-muted px-6 py-4">
                  First-class
                </TableCell>
                <TableCell className="px-6 py-4">Partial</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="px-6 py-4">Accessibility</TableCell>
                <TableCell className="bg-muted px-6 py-4">
                  Focus on a11y
                </TableCell>
                <TableCell className="px-6 py-4">Basic</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="px-6 py-4">Component Count</TableCell>
                <TableCell className="bg-muted px-6 py-4">30+</TableCell>
                <TableCell className="px-6 py-4">25+</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="px-6 py-4">License</TableCell>
                <TableCell className="bg-muted px-6 py-4">MIT</TableCell>
                <TableCell className="px-6 py-4">MIT</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="px-6 py-4">Premium Components</TableCell>
                <TableCell className="bg-muted px-6 py-4">Available</TableCell>
                <TableCell className="relative px-6 py-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer underline decoration-dotted">
                        Not included
                      </span>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={8} className="max-w-xs">
                      <span className="mb-1 block font-semibold">
                        Premium Only
                      </span>
                      Some advanced components are only available in paid
                      versions or require third-party libraries.
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="px-6 py-4">Figma Kit</TableCell>
                <TableCell className="bg-muted px-6 py-4">Yes</TableCell>
                <TableCell className="relative px-6 py-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="cursor-pointer text-muted-foreground underline decoration-dotted">
                        No
                      </span>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={8} className="max-w-xs">
                      <span className="mb-1 block font-semibold">
                        Figma Kit Unavailable
                      </span>
                      Bootstrap does not provide an official Figma kit, but
                      community kits may exist.
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export { Compare7 };

```

```tsx
import {
  Accessibility,
  BadgeCheck,
  Figma,
  Gem,
  LayoutDashboard,
  ListChecks,
  Moon,
  Settings2,
  Type,
} from "lucide-react";
import { Check, X } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

type Feature = {
  icon: React.ReactNode;
  label: string;
  description: string;
  shadcn: true | false | "partial";
  bootstrap: true | false | "partial";
  tooltip?: { content: React.ReactNode };
};

const features: Feature[] = [
  {
    icon: <LayoutDashboard className="text-gray-500" />,
    label: "Design System",
    description: "Modern, utility-first vs classic, component-based.",
    shadcn: true,
    bootstrap: true,
  },
  {
    icon: <Settings2 className="text-gray-500" />,
    label: "Customization",
    description: "Highly customizable vs limited by default.",
    shadcn: true,
    bootstrap: false,
  },
  {
    icon: <Moon className="text-gray-500" />,
    label: "Dark Mode",
    description: "Built-in dark mode vs requires extra setup.",
    shadcn: true,
    bootstrap: false,
  },
  {
    icon: <Type className="text-gray-500" />,
    label: "TypeScript Support",
    description: "First-class TypeScript support vs partial support.",
    shadcn: true,
    bootstrap: "partial",
  },
  {
    icon: <Accessibility className="text-gray-500" />,
    label: "Accessibility",
    description: "Focus on accessibility (a11y) vs basic support.",
    shadcn: true,
    bootstrap: false,
  },
  {
    icon: <ListChecks className="text-gray-500" />,
    label: "Component Count",
    description: "30+ components vs 25+ components.",
    shadcn: true,
    bootstrap: true,
  },
  {
    icon: <BadgeCheck className="text-gray-500" />,
    label: "License",
    description: "MIT license for both.",
    shadcn: true,
    bootstrap: true,
  },
  {
    icon: <Gem className="text-gray-500" />,
    label: "Premium Components",
    description:
      "Premium components available in Shadcn, not included in Bootstrap.",
    shadcn: true,
    bootstrap: false,
    tooltip: {
      content: (
        <>
          <span className="mb-1 block font-semibold">Premium Only</span>
          Some advanced components are only available in paid versions or
          require third-party libraries.
        </>
      ),
    },
  },
  {
    icon: <Figma className="text-gray-500" />,
    label: "Figma Kit",
    description: "Official Figma kit available for Shadcn, not for Bootstrap.",
    shadcn: true,
    bootstrap: false,
    tooltip: {
      content: (
        <>
          <span className="mb-1 block font-semibold">
            Figma Kit Unavailable
          </span>
          Bootstrap does not provide an official Figma kit, but community kits
          may exist.
        </>
      ),
    },
  },
];

interface Compare8Props {
  className?: string;
}

const Compare8 = ({ className }: Compare8Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="mb-4 text-center text-4xl font-semibold">Compare Us</h2>
        <p className="mb-8 text-center text-muted-foreground">
          A modern framework for building websites that is better than the
          competition.
        </p>
        <div className="mx-auto max-w-4xl divide-y divide-border overflow-x-auto rounded-lg border-border bg-background shadow">
          <div className="hidden rounded-t-lg bg-muted text-left text-base font-semibold text-foreground sm:flex">
            <div className="w-16 px-6 py-4"></div>
            <div className="flex-1 px-6 py-4">Feature</div>
            <div className="w-40 px-6 py-4">Shadcn</div>
            <div className="w-40 px-6 py-4">Bootstrap</div>
          </div>
          {features.map((row) => (
            <div
              key={row.label}
              className="flex flex-col items-start text-left sm:flex-row sm:items-center"
            >
              <div className="flex w-full items-center justify-start px-6 pt-4 sm:w-16 sm:justify-center sm:py-4">
                {row.icon}
                <span className="ml-3 text-base font-medium sm:hidden">
                  {row.label}
                </span>
              </div>
              <div className="w-full flex-1 px-6 pb-2 sm:py-4">
                <div className="hidden font-medium sm:block">{row.label}</div>
                <div className="mt-2 mb-2 text-sm text-muted-foreground sm:mb-0">
                  {row.description}
                </div>
              </div>
              <div className="flex w-full items-center justify-start px-6 pb-2 sm:w-40 sm:justify-center sm:py-4">
                {row.shadcn === true ? (
                  <Check className="size-5 text-green-600" />
                ) : row.shadcn === "partial" ? (
                  <Check className="size-5 text-yellow-500" />
                ) : (
                  <X className="size-5 text-destructive" />
                )}
                <span className="ml-2 text-xs font-medium text-muted-foreground sm:hidden">
                  Shadcn
                </span>
              </div>
              <div className="flex w-full items-center justify-start border-border px-6 pb-4 sm:w-40 sm:justify-center sm:border-0 sm:py-4">
                {row.bootstrap === true ? (
                  <Check className="size-5 text-green-600" />
                ) : row.bootstrap === "partial" ? (
                  <Check className="size-5 text-yellow-500" />
                ) : row.bootstrap === false && row.tooltip ? (
                  <span className="inline-block h-5">—</span>
                ) : (
                  <X className="size-5 text-destructive" />
                )}
                <span className="ml-2 text-xs font-medium text-muted-foreground sm:hidden">
                  Bootstrap
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Compare8 };

```

```tsx
"use client";

import { CheckCircle, Minus, XCircle } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Compare9Props {
  className?: string;
}

const Compare9 = ({ className }: Compare9Props) => {
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  const comparisonData = [
    {
      metric: "Context Window",
      gpt4: { value: "128K tokens", status: "worst" },
      claude: { value: "200K tokens", status: "neutral" },
      gemini: { value: "2M tokens", status: "best" },
    },
    {
      metric: "Response Speed",
      gpt4: { value: "1.2 sec", status: "best" },
      claude: { value: "1.8 sec", status: "neutral" },
      gemini: { value: "2.2 sec", status: "worst" },
    },
    {
      metric: "Code Generation",
      gpt4: { value: "94%", status: "neutral" },
      claude: { value: "95%", status: "best" },
      gemini: { value: "88%", status: "worst" },
    },
    {
      metric: "Reasoning Score",
      gpt4: { value: "91/100", status: "neutral" },
      claude: { value: "92/100", status: "best" },
      gemini: { value: "86/100", status: "worst" },
    },
    {
      metric: "Input Tokens",
      gpt4: { value: "$3.50/1M", status: "worst" },
      claude: { value: "$3.00/1M", status: "neutral" },
      gemini: { value: "$1.25/1M", status: "best" },
    },
    {
      metric: "Output Tokens",
      gpt4: { value: "$14.00/1M", status: "neutral" },
      claude: { value: "$15.00/1M", status: "worst" },
      gemini: { value: "$5.00/1M", status: "best" },
    },
    {
      metric: "Rate Limit",
      gpt4: { value: "50K RPM", status: "neutral" },
      claude: { value: "40K RPM", status: "worst" },
      gemini: { value: "60K RPM", status: "best" },
    },
    {
      metric: "Free Tier",
      gpt4: { value: "Very Limited", status: "worst" },
      claude: { value: "Limited", status: "neutral" },
      gemini: { value: "Generous", status: "best" },
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <div className="relative overflow-hidden p-8">
          <div className="relative overflow-hidden border border-border/50 bg-background/50 backdrop-blur-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50">
                  <TableHead className="font-semibold text-foreground">
                    Metric
                  </TableHead>
                  <TableHead className="text-center font-semibold text-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/openai-icon.svg"
                        alt="OpenAI"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                      GPT-4o
                    </div>
                  </TableHead>
                  <TableHead className="text-center font-semibold text-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/claude-icon.svg"
                        alt="Claude"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                      Claude 3.5
                    </div>
                  </TableHead>
                  <TableHead className="text-center font-semibold text-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/gemini-icon.svg"
                        alt="Gemini"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                      Gemini Pro 1.5
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow
                    key={index}
                    className="border-border/30 transition-colors hover:bg-muted/30"
                  >
                    <TableCell className="py-4 font-medium text-foreground">
                      {row.metric}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "cursor-pointer py-4 text-center font-medium transition-all duration-300",
                        row.gpt4.status === "best"
                          ? "bg-green-50 text-green-600 dark:bg-green-950/20"
                          : row.gpt4.status === "worst"
                            ? "bg-red-50 text-red-600 dark:bg-red-950/20"
                            : "bg-muted/50 text-foreground",
                        hoveredModel === "gpt4" &&
                          "bg-red-50/80 dark:bg-red-950/30",
                      )}
                      onMouseEnter={() => setHoveredModel("gpt4")}
                      onMouseLeave={() => setHoveredModel(null)}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {row.gpt4.status === "best" && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        {row.gpt4.status === "worst" && (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        {row.gpt4.status === "neutral" && (
                          <Minus className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{row.gpt4.value}</span>
                      </div>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "cursor-pointer py-4 text-center font-medium transition-all duration-300",
                        row.claude.status === "best"
                          ? "bg-green-50 text-green-600 dark:bg-green-950/20"
                          : row.claude.status === "worst"
                            ? "bg-red-50 text-red-600 dark:bg-red-950/20"
                            : "bg-muted/50 text-foreground",
                        hoveredModel === "claude" &&
                          "bg-blue-50/80 dark:bg-blue-950/30",
                      )}
                      onMouseEnter={() => setHoveredModel("claude")}
                      onMouseLeave={() => setHoveredModel(null)}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {row.claude.status === "best" && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        {row.claude.status === "worst" && (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        {row.claude.status === "neutral" && (
                          <Minus className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{row.claude.value}</span>
                      </div>
                    </TableCell>
                    <TableCell
                      className={cn(
                        "cursor-pointer py-4 text-center font-medium transition-all duration-300",
                        row.gemini.status === "best"
                          ? "bg-green-50 text-green-600 dark:bg-green-950/20"
                          : row.gemini.status === "worst"
                            ? "bg-red-50 text-red-600 dark:bg-red-950/20"
                            : "bg-muted/50 text-foreground",
                        hoveredModel === "gemini" &&
                          "bg-green-50/80 dark:bg-green-950/30",
                      )}
                      onMouseEnter={() => setHoveredModel("gemini")}
                      onMouseLeave={() => setHoveredModel(null)}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {row.gemini.status === "best" && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        {row.gemini.status === "worst" && (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        {row.gemini.status === "neutral" && (
                          <Minus className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{row.gemini.value}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Technical Analysis Section */}
          <div className="relative mt-8 border border-border/50 bg-muted/20 p-6">
            <div className="relative">
              <h4 className="mb-4 font-mono text-sm font-semibold tracking-wider text-foreground uppercase">
                Technical Analysis
              </h4>
              <div className="space-y-3 font-mono text-xs text-muted-foreground">
                <div className="grid gap-2 md:grid-cols-3">
                  <div
                    className={cn(
                      "rounded border border-border/30 bg-background/50 p-3 transition-all duration-300",
                      hoveredModel === "gpt4" &&
                        "bg-red-50/20 shadow-lg ring-2 ring-red-500/50 dark:bg-red-950/10",
                    )}
                  >
                    <div className="mb-1 font-medium text-foreground">
                      GPT-4o
                    </div>
                    <div className="space-y-1">
                      <div>• Response latency: 1.2s (best)</div>
                      <div>• Code accuracy: 94% (neutral)</div>
                      <div>• Reasoning score: 91/100 (neutral)</div>
                      <div>• Input cost: $3.50/1M tokens (worst)</div>
                      <div>• Rate limit: 50K RPM (neutral)</div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "rounded border border-border/30 bg-background/50 p-3 transition-all duration-300",
                      hoveredModel === "claude" &&
                        "bg-blue-50/20 shadow-lg ring-2 ring-blue-500/50 dark:bg-blue-950/10",
                    )}
                  >
                    <div className="mb-1 font-medium text-foreground">
                      Claude 3.5
                    </div>
                    <div className="space-y-1">
                      <div>• Response latency: 1.8s (neutral)</div>
                      <div>• Code accuracy: 95% (best)</div>
                      <div>• Reasoning score: 92/100 (best)</div>
                      <div>• Input cost: $3.00/1M tokens (neutral)</div>
                      <div>• Rate limit: 40K RPM (worst)</div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "rounded border border-border/30 bg-background/50 p-3 transition-all duration-300",
                      hoveredModel === "gemini" &&
                        "bg-green-50/20 shadow-lg ring-2 ring-green-500/50 dark:bg-green-950/10",
                    )}
                  >
                    <div className="mb-1 font-medium text-foreground">
                      Gemini Pro 1.5
                    </div>
                    <div className="space-y-1">
                      <div>• Context window: 2M tokens (best)</div>
                      <div>• Input cost: $1.25/1M tokens (best)</div>
                      <div>• Output cost: $5.00/1M tokens (best)</div>
                      <div>• Rate limit: 60K RPM (best)</div>
                      <div>• Free tier: Generous (best)</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded border border-border/30 bg-background/50 p-3">
                  <div className="mb-2 font-medium text-foreground">
                    Performance Summary
                  </div>
                  <div className="space-y-1">
                    <div>
                      • GPT-4o: Fastest response times with strong code
                      generation
                    </div>
                    <div>
                      • Claude 3.5: Excellent reasoning capabilities and
                      balanced performance
                    </div>
                    <div>
                      • Gemini Pro 1.5: Best value proposition with competitive
                      pricing
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Compare9 };

```

```tsx
import { X } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";

const legacyFeatures = [
  "One-size-fits-all project tools with generic workflows.",
  "Clunky, overcomplicated, and hard to adopt.",
  "Scattered data stitched together with brittle integrations.",
  "Minimal automation leading to manual reporting.",
  "Slow, risky migrations that disrupt delivery.",
  "Aging tech with limited cloud and mobile support.",
  "High price tags without measurable outcomes.",
  "Surprise fees for training, support, and integrations.",
];

const newFeatures = [
  { emoji: "🧭", text: "Built for modern product and engineering teams." },
  { emoji: "💡", text: "Opinionated defaults with a simple, modern UX." },
  { emoji: "📊", text: "Unified workspace as your single source of truth." },
  { emoji: "⚡", text: "Automation and AI that cut busywork." },
  { emoji: "🧰", text: "Guided, low-risk migrations measured in weeks." },
  { emoji: "☁️", text: "Cloud-native, secure, and always up to date." },
  { emoji: "📈", text: "Improves velocity with a clear, provable ROI." },
  { emoji: "💬", text: "Straightforward, transparent pricing." },
];
interface Compare10Props {
  className?: string;
}

const Compare10 = ({ className }: Compare10Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-6 text-center md:gap-12">
          <h2 className="l:text-7xl text-4xl font-medium md:text-5xl">
            <span className="text-muted-foreground">Why Teams are </span>
            <br /> Moving to Modern Tools
          </h2>
          <p className="text-lg">
            Old tools slow your team down and don&apos;t help you ship faster.{" "}
            <br className="hidden md:block" /> Modern tools help you ship
            faster.
          </p>
        </div>
        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-0">
          <div className="rounded-3xl bg-muted p-6 lg:rounded-r-none lg:p-12">
            <h3 className="text-2xl font-medium">Legacy Features</h3>
            <ul className="mt-9 space-y-3">
              {legacyFeatures.map((feature, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-2">
                    <X className="my-1.5 size-4 shrink-0 text-muted-foreground" />
                    <li className="text-sm">{feature}</li>
                  </div>
                  {idx !== legacyFeatures.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-y p-6 lg:rounded-l-none lg:border-l-0 lg:p-12">
            <h3 className="text-2xl font-medium">New Features</h3>
            <ul className="mt-9 space-y-3">
              {newFeatures.map((feature, idx) => (
                <React.Fragment key={idx}>
                  <li className="flex items-center gap-2 text-sm">
                    <span className="text-lg">{feature.emoji}</span>
                    {feature.text}
                  </li>
                  {idx !== newFeatures.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Compare10 };

```
