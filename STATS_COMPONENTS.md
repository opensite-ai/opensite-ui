```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Stats6Props {
  className?: string;
}

const Stats6 = ({ className }: Stats6Props) => {
  return (
    <section className={cn("bg-accent py-32", className)}>
      <div className="container flex flex-col items-start text-left">
        <div className="mb-12 w-full md:mb-16">
          <h2 className="mb-8 w-full max-w-[24rem] text-3xl font-bold text-pretty sm:text-4xl md:max-w-[30rem] lg:max-w-[37rem] lg:text-5xl">
            Platform Performance Insights
          </h2>
          <div className="flex flex-col justify-start gap-2 sm:flex-row">
            <Button className="w-full sm:w-auto">Get Started</Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 gap-12 sm:w-fit sm:grid-cols-4 lg:gap-16">
          <div className="w-full">
            <div className="mb-2 text-4xl font-semibold sm:text-4xl lg:text-5xl">
              90%
            </div>
            <div className="text-base leading-6 text-muted-foreground lg:text-lg">
              Metric 1
            </div>
          </div>
          <div className="w-full">
            <div className="mb-2 text-4xl font-semibold sm:text-4xl lg:text-5xl">
              200+
            </div>
            <div className="text-base leading-6 text-muted-foreground lg:text-lg">
              Metric 2
            </div>
          </div>
          <div className="w-full">
            <div className="mb-2 text-4xl font-semibold sm:text-4xl lg:text-5xl">
              99%
            </div>
            <div className="text-base leading-6 text-muted-foreground lg:text-lg">
              Metric 3
            </div>
          </div>
          <div className="w-full">
            <div className="mb-2 text-4xl font-semibold sm:text-4xl lg:text-5xl">
              150+
            </div>
            <div className="text-base leading-6 text-muted-foreground lg:text-lg">
              Metric 4
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Stats6 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface Stats8Props {
  className?: string;
  heading?: string;
  description?: string;
  link?: {
    text: string;
    url: string;
  };
  stats?: Array<{
    id: string;
    value: string;
    label: string;
  }>;
}

const Stats8 = ({
  heading = "Platform performance insights",
  description = "Ensuring stability and scalability for all users",
  link = {
    text: "Read the full impact report",
    url: "https://www.shadcnblocks.com",
  },
  stats = [
    {
      id: "stat-1",
      value: "250%+",
      label: "average growth in user engagement",
    },
    {
      id: "stat-2",
      value: "$2.5m",
      label: "annual savings per enterprise partner",
    },
    {
      id: "stat-3",
      value: "200+",
      label: "integrations with top industry platforms",
    },
    {
      id: "stat-4",
      value: "99.9%",
      label: "customer satisfaction over the last year",
    },
  ],
  className,
}: Stats8Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold md:text-4xl">{heading}</h2>
          <p>{description}</p>
          <a
            href={link.url}
            className="flex items-center gap-1 font-bold hover:underline"
          >
            {link.text}
            <ArrowRight className="h-auto w-4" />
          </a>
        </div>
        <div className="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col gap-5">
              <div className="text-6xl font-bold">{stat.value}</div>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Stats8 };

```

```tsx
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Stats9Props {
  className?: string;
}

const Stats9 = ({ className }: Stats9Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
              <Badge
                variant="outline"
                className="flex w-fit items-center gap-1"
              >
                Features
              </Badge>
              <h1 className="mb-5 text-4xl font-semibold text-pretty">
                Transform Your Digital Experience Today Together
              </h1>
              <p className="text-muted-foreground">
                Leverage cutting-edge technology to streamline your workflow and
                unlock new possibilities in the digital landscape.
              </p>
            </div>
            <div className="mt-12 flex justify-center gap-7 lg:justify-start">
              <div className="flex flex-col gap-1.5">
                <p className="text-2xl font-bold text-foreground sm:text-3xl">
                  2.5M +
                </p>
                <p className="text-muted-foreground">Users Served</p>
              </div>
              <Separator orientation="vertical" className="h-auto" />
              <div className="flex flex-col gap-1.5">
                <p className="text-2xl font-bold text-foreground sm:text-3xl">
                  99.9%
                </p>
                <p className="text-muted-foreground">Uptime</p>
              </div>
              <Separator orientation="vertical" className="h-auto" />
              <div className="flex flex-col gap-1.5">
                <p className="text-2xl font-bold text-foreground sm:text-3xl">
                  4.8
                </p>
                <p className="text-muted-foreground">User Score</p>
              </div>
            </div>
          </div>
          <div className="grid gap-2.5 text-left sm:grid-cols-2 sm:text-center lg:text-left">
            <div className="flex items-center gap-5 rounded-lg border border-border bg-muted p-6 sm:flex-col sm:items-start sm:p-7">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg"
                alt="logo"
                className="mx-0 size-12 sm:mx-auto lg:mx-0"
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-foreground sm:text-base">
                  Cloud Integration
                </p>
                <p className="text-sm text-muted-foreground sm:text-base">
                  Seamless cloud solutions for modern business needs
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 rounded-lg border border-border bg-muted p-6 sm:flex-col sm:items-start sm:p-7">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-2.svg"
                alt="logo"
                className="mx-0 size-12 sm:mx-auto lg:mx-0"
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-foreground sm:text-base">
                  24/7 Monitoring
                </p>
                <p className="text-sm text-muted-foreground sm:text-base">
                  Round-the-clock system monitoring and support
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 rounded-lg border border-border bg-muted p-6 sm:flex-col sm:items-start sm:p-7">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-3.svg"
                alt="logo"
                className="mx-0 size-12 sm:mx-auto lg:mx-0"
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-foreground sm:text-base">
                  AI-Powered Tools
                </p>
                <p className="text-sm text-muted-foreground sm:text-base">
                  Advanced machine learning algorithms delivering intelligent
                  insights
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5 rounded-lg border border-border bg-muted p-6 sm:flex-col sm:items-start sm:p-7">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-4.svg"
                alt="logo"
                className="mx-0 size-12 sm:mx-auto lg:mx-0"
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-foreground sm:text-base">
                  Enterprise Security
                </p>
                <p className="text-sm text-muted-foreground sm:text-base">
                  Military-grade encryption and advanced threat protection
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Stats9 };

```

```tsx
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const statsData = [
  {
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
    avatarFallback: "",
    heading: "89%",
    text: "Stop spending on ads with zero conversions",
  },
  {
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
    avatarFallback: "",
    heading: "7 HRS",
    text: "Daily savings on ad management",
  },
  {
    logo: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
    avatar: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
    avatarFallback: "",
    heading: "2,540%",
    text: "Growth in overall client ad investment",
  },
];

interface Stats10Props {
  className?: string;
}

const Stats10 = ({ className }: Stats10Props) => {
  return (
    <section className={cn("py-12 md:py-20", className)}>
      <div className="container max-w-[75rem]">
        <div className="pt-10 pb-10">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {statsData.map(
              ({ logo, avatar, avatarFallback, heading, text }, i) => (
                <a href="#" key={`link${i}`} className="block w-full">
                  <Card className="rounded-3xl border-2 p-10 transition hover:-translate-y-3 hover:border-primary">
                    <CardContent className="block p-0">
                      <div className="flex items-center gap-7">
                        <Avatar className="h-14 w-14 overflow-hidden rounded-full border">
                          <AvatarImage src={avatar} alt="" />
                          <AvatarFallback>{avatarFallback}</AvatarFallback>
                        </Avatar>
                        <img src={logo} alt="" className="h-6" />
                      </div>
                      <div className="mt-6 text-6xl leading-tight font-semibold">
                        {heading}
                      </div>
                      <p className="mb-5 max-w-52 text-lg font-medium">
                        {text}
                      </p>
                    </CardContent>
                  </Card>
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Stats10 };

```

```tsx
import { cn } from "@/lib/utils";

interface Stats11Props {
  className?: string;
}

const Stats11 = ({ className }: Stats11Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative isolate overflow-hidden bg-linear-to-b from-primary/10 to-transparent md:border-x md:border-border">
          <div className="absolute right-0 -left-px -z-20 h-full w-full bg-[linear-gradient(90deg,var(--muted-foreground)_1px,transparent_1px)] [mask-image:linear-gradient(transparent_25%,black_25%,black_75%,transparent_75%)] [background-size:calc(100%/16)_100%] [mask-size:100%_16px] opacity-20 [-webkit-mask-image:linear-gradient(transparent_25%,black_25%,black_75%,transparent_75%)] [-webkit-mask-size:100%_16px]" />

          <div>
            <h2 className="mb-16 max-w-3xl text-3xl leading-10 font-semibold sm:mb-24 md:mx-10">
              Revolutionizing healthcare with AI technology.
              <span className="font-medium text-primary/50">
                {" "}
                Our advanced diagnostic platform helps doctors make accurate
                diagnoses in seconds.
              </span>
            </h2>
            <div className="relative grid max-w-2xl gap-4 border-x border-border pb-32 sm:grid-cols-2 sm:gap-10 sm:pb-44 md:ml-10 md:border-0">
              <div className="absolute inset-0 -top-[1100px] -left-[calc(1000px-22vw)] -z-10 size-[1500px] rounded-full border border-primary bg-background sm:-top-[480%] sm:-left-[185%] sm:size-[2000px] md:-top-[906%] md:-left-[294%] md:size-[3500px] lg:-top-[1186%] lg:-left-[380%] lg:size-[4500px] xl:-top-[1200%] xl:-left-[350%] 2xl:-top-[1196%] 2xl:-left-[345%]"></div>
              <div className="flex flex-col gap-2">
                <span className="flex gap-5 text-3xl font-semibold">
                  <span className="relative -left-px w-px bg-primary/50"></span>
                  1,000,000+
                </span>
                <p className="pl-5 font-medium text-muted-foreground/80">
                  Diagnoses Made
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="flex gap-5 text-3xl font-semibold">
                  <span className="relative -left-px w-px bg-primary/50"></span>
                  95%
                </span>
                <p className="pl-5 font-medium text-muted-foreground/80">
                  Diagnostic Accuracy
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="flex gap-5 text-3xl font-semibold">
                  <span className="relative -left-px w-px bg-primary/50"></span>
                  3,000+
                </span>
                <p className="pl-5 font-medium text-muted-foreground/80">
                  Healthcare Providers
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="flex gap-5 text-3xl font-semibold">
                  <span className="relative -left-px w-px bg-primary/50"></span>
                  2.5s
                </span>
                <p className="pl-5 font-medium text-muted-foreground/80">
                  Latency
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Stats11 };

```

```tsx
"use client";

import NumberFlow from "@number-flow/react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, RefreshCcw } from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const STATS = {
  monthly: {
    TotalRevenue: 12.3,
    TotalUsers: 0.3,
    CompanyGrowth: 300,
    NewCustomers: 100,
    BigCorpClients: 10,
  },
  yearly: {
    TotalRevenue: 105,
    TotalUsers: 50,
    CompanyGrowth: 30,
    NewCustomers: 1.5,
    BigCorpClients: 75,
  },
} as const;

const ZERO_STATS = {
  monthly: {
    TotalRevenue: 0,
    TotalUsers: 0,
    CompanyGrowth: 0,
    NewCustomers: 0,
    BigCorpClients: 0,
  },
  yearly: {
    TotalRevenue: 0,
    TotalUsers: 0,
    CompanyGrowth: 0,
    NewCustomers: 0,
    BigCorpClients: 0,
  },
};

interface Stats12Props {
  className?: string;
}

const Stats12 = ({ className }: Stats12Props) => {
  const [showMonthlyStats, setShowMonthlyStats] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);
  const stats = isInView ? STATS : ZERO_STATS;

  return (
    <section className={cn("py-32", className)}>
      <div className="container flex justify-center">
        <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
          <div className="w-full lg:w-1/3">
            <h1 className="w-full font-calSans text-6xl font-medium">
              We don't just talk we Deliver Results
            </h1>
            <p className="my-4 text-lg tracking-tight text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              perferendis deserunt quis excepturi reiciendis nulla?
            </p>
            <Button
              variant="secondary"
              className="text-md group mt-10 flex w-fit items-center justify-center gap-2 rounded-full px-6 py-1 tracking-tight shadow-none"
            >
              <span>Get Started With Us</span>
              <ArrowRight className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
            </Button>
            <div className="mt-10 lg:w-[115%]">
              <Graph />
            </div>
          </div>
          <div ref={ref} className="flex w-full flex-col items-end lg:w-1/2">
            <h1 className="font-calSans text-8xl leading-0 lg:text-[10rem]">
              <NumberFlow
                value={
                  showMonthlyStats
                    ? stats.monthly.TotalRevenue
                    : stats.yearly.TotalRevenue
                }
                prefix="$"
                suffix="M"
                className="font-calSans"
              />
            </h1>
            <div className="mb-6 flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-17">
              <p>And its just in a year</p>
              <Button
                variant="secondary"
                className="text-md group flex w-fit items-center justify-center gap-2 rounded-full px-6 py-1 tracking-tight shadow-none transition-all duration-300 ease-out active:scale-95"
                onClick={() => setShowMonthlyStats(!showMonthlyStats)}
              >
                <span>Show Monthly Stats</span>
                <RefreshCcw className="size-4 -rotate-45 transition-all ease-out group-hover:ml-3 group-hover:rotate-0" />
              </Button>
            </div>
            <div className="mt-auto mb-10 grid w-full grid-cols-2 gap-14">
              <div className="text-left">
                <h2 className="text-4xl font-medium lg:text-6xl">
                  <NumberFlow
                    value={
                      showMonthlyStats
                        ? stats.monthly.TotalUsers
                        : stats.yearly.TotalUsers
                    }
                    suffix="k+"
                  />
                </h2>
                <p className="text-muted-foreground/70"> Team Members </p>
              </div>
              <div className="text-right">
                <h2 className="text-4xl font-medium lg:text-6xl">
                  <NumberFlow
                    value={
                      showMonthlyStats
                        ? stats.monthly.CompanyGrowth
                        : stats.yearly.CompanyGrowth
                    }
                    suffix="%"
                  />
                </h2>
                <p className="text-muted-foreground/70"> Company Growth </p>
              </div>
              <div className="text-left">
                <h2 className="text-4xl font-medium lg:text-6xl">
                  <NumberFlow
                    value={
                      showMonthlyStats
                        ? stats.monthly.NewCustomers
                        : stats.yearly.NewCustomers
                    }
                    suffix="M"
                  />
                </h2>
                <p className="text-muted-foreground/70"> New Customers </p>
              </div>
              <div className="text-right">
                <h2 className="text-4xl font-medium lg:text-6xl">
                  <NumberFlow
                    value={
                      showMonthlyStats
                        ? stats.monthly.BigCorpClients
                        : stats.yearly.BigCorpClients
                    }
                    prefix="~"
                    suffix="+"
                  />
                </h2>
                <p className="text-muted-foreground/70"> Revenue </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Stats12 };

function Graph() {
  return (
    <div className="wrapper">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 644 388"
        initial={{
          clipPath: "inset(0px 100% 0px 0px)",
        }}
        animate={{
          clipPath: "inset(0px 0% 0px 0px)",
        }}
        transition={{
          duration: 1,
          type: "spring",
          damping: 18,
        }}
      >
        <g clipPath="url(#grad)">
          <path
            d="M1 118.5C1 118.5 83.308 102.999 114.735 89.4998C146.162 76.0008 189.504 87.7868 235.952 77.4998C273.548 69.1718 294.469 62.4938 329.733 46.9998C409.879 11.7848 452.946 30.9998 483.874 22.4998C514.802 13.9998 635.97 0.84884 644 1.49984"
            stroke="#0090FF"
            strokeWidth="2"
          />
          <path
            d="M113.912 89.4888C82.437 102.988 1 118.487 1 118.487V438.477H644V1.49977C635.957 0.849773 514.601 13.9988 483.625 22.4978C452.649 30.9958 409.515 11.7838 329.245 46.9938C293.926 62.4868 272.973 69.1638 235.318 77.4908C188.798 87.7768 145.388 75.9908 113.912 89.4888Z"
            fill="url(#grad)"
          />
        </g>
        <defs>
          <linearGradient
            id="grad"
            x1="321.5"
            y1="0.476773"
            x2="321.5"
            y2="387.477"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#138EED" stopOpacity="0.4" />
            <stop offset="1" stopColor="#058FFB" stopOpacity="0" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}

```

```tsx
"use client";

import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { CirclePercent } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

const css = `
.candy-bg {
    background-color: hsl(0 0% 96%, 2%);
    background-image: linear-gradient(
      135deg,
      hsl(0 0% 96%) 25%,
      transparent 25.5%,
      transparent 50%,
      hsl(0 0% 96%) 50.5%,
      hsl(0 0% 96%) 75%,
      transparent 75.5%,
      transparent
    );
    background-size: 10px 10px;
  }`;

interface Stats13Props {
  className?: string;
}

const Stats13 = ({ className }: Stats13Props) => {
  return (
    <section className={cn("py-32", className)}>
      <style>{css}</style>
      <div className="gradient container">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="lg::text-6xl w-full font-calSans text-5xl font-medium">
            We don't believe in talk we Deliver Results
          </h1>
          <p className="my-4 tracking-tight text-muted-foreground lg:px-15 lg:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
            perferendis deserunt quis excepturi reiciendis nulla?
          </p>
        </div>
        <div className="relative mx-auto mt-20 flex h-112 max-w-4xl items-center justify-center gap-2">
          {[
            { value: 35, label: "competitor 1", delay: 0.2 },
            { value: 25, label: "competitor 2", delay: 0.4 },
            {
              value: 99,
              label: "shadcnblocks",
              className: "bg-sky-400",
              showToolTip: true,
              delay: 0.6,
            },
            { value: 37, label: "competitor 4", delay: 0.8 },
          ].map((props, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                type: "spring",
                damping: 10,
              }}
              className="h-full w-full"
            >
              <BarChart {...props} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Stats13 };

const BarChart = ({
  value,
  label,
  className = "",
  showToolTip = false,
  delay = 0,
}: {
  value: number;
  label: string;
  className?: string;
  showToolTip?: boolean;
  delay?: number;
}) => {
  return (
    <div className="group relative h-full w-full">
      <div className="candy-bg relative h-full w-full overflow-hidden rounded-[40px]">
        <motion.div
          initial={{ opacity: 0, y: 100, height: 0 }}
          animate={{ opacity: 1, y: 0, height: `${value}%` }}
          transition={{ duration: 0.5, type: "spring", damping: 20, delay }}
          className={cn(
            "absolute bottom-0 mt-auto w-full rounded-[40px] bg-primary/80 p-3 text-white",
            className,
          )}
        >
          <div className="relative flex h-15 w-full items-center justify-center gap-2 rounded-full bg-muted/20 tracking-tighter">
            <div className="absolute top-1 left-1 hidden h-13 w-13 items-center justify-center rounded-full bg-muted/20 md:flex">
              <CirclePercent className="size-8" />
            </div>
            <NumberFlow value={value} suffix="%" />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 100, height: 0 }}
        animate={{ opacity: 1, y: 0, height: `${value}%` }}
        transition={{ duration: 0.5, type: "spring", damping: 15, delay }}
        className="absolute bottom-0 w-full"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: showToolTip ? 1 : 0, y: showToolTip ? 0 : 100 }}
          transition={{ duration: 0.5, type: "spring", damping: 15, delay }}
          className="absolute -top-9 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-muted-foreground px-2 py-1 text-white"
        >
          <div className="absolute -bottom-9 left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-muted-foreground transition-all duration-300 ease-in-out" />
          <svg
            className={cn(
              "absolute -bottom-2 left-1/2 -translate-x-1/2",
              className?.includes("bg-sky-400")
                ? "text-sky-400"
                : "text-muted-foreground",
            )}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.83855 8.41381C4.43827 9.45255 5.93756 9.45255 6.53728 8.41381L9.65582 3.01233C10.2555 1.97359 9.50589 0.675159 8.30646 0.675159H2.06937C0.869935 0.675159 0.120287 1.97359 0.720006 3.01233L3.83855 8.41381Z"
              fill="currentColor"
            />
          </svg>
          conversions
        </motion.div>
      </motion.div>
      <p className="mx-auto mt-2 w-fit tracking-tight text-muted-foreground/80">
        {label}
      </p>
    </div>
  );
};

```

```tsx
import React from "react";

import { cn } from "@/lib/utils";

interface Stats19Props {
  className?: string;
}

const Stats19 = ({ className }: Stats19Props) => {
  const stats = [
    {
      number: "80K+",
      description:
        "From 80K+ users reached to 20+ startups supported, these numbers reflect the scale, impact, and consistency of my work.",
    },
    {
      number: "20+",
      description:
        "Startups supported with innovative solutions and strategic guidance to help them scale and succeed in their markets.",
    },
    {
      number: "95%",
      description:
        "Client satisfaction rate achieved through dedicated support, quality deliverables, and long-term partnerships built on trust.",
    },
    {
      number: "150+",
      description:
        "Projects completed across various industries, from web applications to mobile solutions, each tailored to specific business needs.",
    },
    {
      number: "5 Years",
      description:
        "Experience in the industry, continuously learning and adapting to new technologies and market demands to deliver cutting-edge solutions.",
    },
    {
      number: "24/7",
      description:
        "Availability for critical support and maintenance, ensuring your applications run smoothly and any issues are resolved promptly.",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-6">
          <div className="top-10 col-span-2 flex h-fit w-fit items-center gap-3 py-8 lg:sticky">
            <span className="size-3 bg-orange-500" />
            <p className="text-2xl text-foreground/30 uppercase">Milestones</p>
          </div>
          <ul className="col-span-4 w-full">
            {stats.map((stat, index) => (
              <li key={index} className="grid grid-cols-5 border-b py-8">
                <h3 className="col-span-2 text-4xl font-medium">
                  {stat.number}
                </h3>
                <p className="col-span-3">{stat.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Stats19 };

```

```tsx
import { ArrowUpRight, Users, Clock, DollarSign, Target } from "lucide-react";

export default function StatsWithIcons() {
  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold md:text-4xl">
            Our Growth in Numbers
          </h2>
          <p className="mt-3 text-muted-foreground">
            Key metrics that showcase our impact in the market
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Stat Item 1 */}
          <div className="relative overflow-hidden rounded-xl border bg-background p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-muted-foreground">
                  Active Users
                </p>
                <h3 className="mt-4 text-4xl font-bold">120K+</h3>
                <p className="mt-1 flex items-center text-sm text-emerald-500 font-medium">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>18% growth</span>
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Stat Item 2 */}
          <div className="relative overflow-hidden rounded-xl border bg-background p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-muted-foreground">
                  Avg. Session
                </p>
                <h3 className="mt-4 text-4xl font-bold">4:30</h3>
                <p className="mt-1 flex items-center text-sm text-emerald-500 font-medium">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>+2 min</span>
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Stat Item 3 */}
          <div className="relative overflow-hidden rounded-xl border bg-background p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-muted-foreground">Revenue</p>
                <h3 className="mt-4 text-4xl font-bold">$3.2M</h3>
                <p className="mt-1 flex items-center text-sm text-emerald-500 font-medium">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>32% increase</span>
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          {/* Stat Item 4 */}
          <div className="relative overflow-hidden rounded-xl border bg-background p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-muted-foreground">Conversion</p>
                <h3 className="mt-4 text-4xl font-bold">9.5%</h3>
                <p className="mt-1 flex items-center text-sm text-emerald-500 font-medium">
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                  <span>2.1% higher</span>
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```

```tsx
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TimelineStats() {
  // Data for different time periods
  const periods = [
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' },
    { id: 'yearly', label: 'Yearly' },
  ];

  // Stats data organized by time period
  const statsByPeriod = {
    weekly: [
      {
        label: 'New Sign-ups',
        value: '1,284',
        change: 12.3,
        trend: 'up',
        previousLabel: 'Previous week',
      },
      {
        label: 'Active Sessions',
        value: '32,891',
        change: 8.7,
        trend: 'up',
        previousLabel: 'Previous week',
      },
      {
        label: 'Conversion Rate',
        value: '5.2%',
        change: 0.8,
        trend: 'up',
        previousLabel: 'Previous week',
      },
      {
        label: 'Support Tickets',
        value: '187',
        change: -5.3,
        trend: 'down',
        previousLabel: 'Previous week',
        inversePositive: true, // Lower is better
      },
    ],
    monthly: [
      {
        label: 'New Sign-ups',
        value: '5,726',
        change: 15.8,
        trend: 'up',
        previousLabel: 'Previous month',
      },
      {
        label: 'Active Sessions',
        value: '142,308',
        change: 11.2,
        trend: 'up',
        previousLabel: 'Previous month',
      },
      {
        label: 'Conversion Rate',
        value: '6.7%',
        change: 1.4,
        trend: 'up',
        previousLabel: 'Previous month',
      },
      {
        label: 'Support Tickets',
        value: '834',
        change: -3.1,
        trend: 'down',
        previousLabel: 'Previous month',
        inversePositive: true,
      },
    ],
    quarterly: [
      {
        label: 'New Sign-ups',
        value: '18,492',
        change: 32.1,
        trend: 'up',
        previousLabel: 'Previous quarter',
      },
      {
        label: 'Active Sessions',
        value: '487,125',
        change: 24.3,
        trend: 'up',
        previousLabel: 'Previous quarter',
      },
      {
        label: 'Conversion Rate',
        value: '8.3%',
        change: 2.1,
        trend: 'up',
        previousLabel: 'Previous quarter',
      },
      {
        label: 'Support Tickets',
        value: '2,874',
        change: -8.5,
        trend: 'down',
        previousLabel: 'Previous quarter',
        inversePositive: true,
      },
    ],
    yearly: [
      {
        label: 'New Sign-ups',
        value: '76,542',
        change: 65.4,
        trend: 'up',
        previousLabel: 'Previous year',
      },
      {
        label: 'Active Sessions',
        value: '2.1M',
        change: 48.7,
        trend: 'up',
        previousLabel: 'Previous year',
      },
      {
        label: 'Conversion Rate',
        value: '9.2%',
        change: 3.5,
        trend: 'up',
        previousLabel: 'Previous year',
      },
      {
        label: 'Support Tickets',
        value: '12,458',
        change: -12.3,
        trend: 'down',
        previousLabel: 'Previous year',
        inversePositive: true,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col space-y-6">
          <div className="space-y-2 text-center">
            <Badge className="mb-2">Performance Timeline</Badge>
            <h2 className="text-3xl font-bold md:text-4xl">
              Growth Progression
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Track our key metrics over different time periods to see our
              consistent growth and improvements
            </p>
          </div>

          <Tabs defaultValue="monthly" className="mt-8 w-full">
            <div className="mb-8 flex justify-center">
              <TabsList>
                {periods.map((period) => (
                  <TabsTrigger key={period.id} value={period.id}>
                    {period.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {periods.map((period) => (
              <TabsContent key={period.id} value={period.id} className="mt-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {statsByPeriod[period.id as keyof typeof statsByPeriod].map(
                    (stat, index) => (
                      <div
                        key={index}
                        className="bg-card rounded-lg border p-6 transition-shadow hover:shadow-md"
                      >
                        <div className="flex items-start justify-between">
                          <p className="text-lg font-medium">{stat.label}</p>
                          <div className="flex items-center">
                            <Clock className="text-muted-foreground mr-1 h-4 w-4" />
                            <span className="text-muted-foreground text-xs">
                              {period.label}
                            </span>
                          </div>
                        </div>

                        <h3 className="mt-4 text-3xl font-bold">
                          {stat.value}
                        </h3>

                        <div className="mt-2 flex items-center">
                          <div
                            className={cn(
                              'flex items-center rounded-full px-2 py-1 text-xs font-medium',
                              (stat.trend === 'up' && !stat.inversePositive) ||
                                (stat.trend === 'down' && stat.inversePositive)
                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                                : 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
                            )}
                          >
                            {stat.trend === 'up' ? (
                              <ArrowUpRight className="mr-1 h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="mr-1 h-3 w-3" />
                            )}
                            {Math.abs(stat.change)}%
                          </div>
                          <p className="text-muted-foreground ml-2 text-sm">
                            vs {stat.previousLabel}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

```

```tsx
import { Badge } from "@/components/ui/badge";
import { Verified } from "lucide-react";

export default function OneMainWithThreeFollowUps() {
  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
      {/* Grid */}
      <div className="grid items-center lg:grid-cols-12 gap-6 lg:gap-12">
        <div className="lg:col-span-4">
          {/* Stats */}
          <div className="lg:pe-6 xl:pe-12">
            <p className="text-6xl font-bold leading-10">
              92%
              <Badge variant="secondary" className="gap-1">
                <Verified className="size-4 shrink-0" />
                +7% this month
              </Badge>
            </p>
            <p className="mt-2 sm:mt-3 text-muted-foreground">
              of U.S. adults have bought from businesses using Space
            </p>
          </div>
          {/* End Stats */}
        </div>
        {/* End Col */}

        <div className="lg:col-span-8 relative lg:before:absolute lg:before:top-0 lg:before:-start-12 lg:before:w-px lg:before:h-full lg:before:bg-border">
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-3 sm:gap-8">
            {/* Stats */}
            <div>
              <p className="text-3xl font-semibold">99.95%</p>
              <p className="mt-1 text-muted-foreground">in fulfilling orders</p>
            </div>
            {/* End Stats */}

            {/* Stats */}
            <div>
              <p className="text-3xl font-semibold">2,000+</p>
              <p className="mt-1 text-muted-foreground">partner with Acme</p>
            </div>
            {/* End Stats */}

            {/* Stats */}
            <div>
              <p className="text-3xl font-semibold">85%</p>
              <p className="mt-1 text-muted-foreground">this year alone</p>
            </div>
            {/* End Stats */}
          </div>
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
  );
}

```

```tsx
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Activity,
  ArrowRight,
  Award,
  BarChart,
  CalendarDays,
  Users,
} from 'lucide-react';

type Milestone = {
  id: string;
  year: string;
  title: string;
  description: string;
  metric: {
    value: string;
    label: string;
  };
  icon: React.ReactNode;
};

const milestones: Milestone[] = [
  {
    id: 'launch',
    year: '2018',
    title: 'Company Founded',
    description: 'Started with a small team of 5 passionate individuals',
    metric: {
      value: '5',
      label: 'Team Members',
    },
    icon: <CalendarDays className="h-8 w-8" />,
  },
  {
    id: 'first-customers',
    year: '2019',
    title: 'First 100 Customers',
    description: 'Achieved product-market fit and began scaling operations',
    metric: {
      value: '100+',
      label: 'Early Adopters',
    },
    icon: <Users className="h-8 w-8" />,
  },
  {
    id: 'series-a',
    year: '2020',
    title: 'Series A Funding',
    description: 'Secured $8M in funding to accelerate growth and development',
    metric: {
      value: '$8M',
      label: 'Raised',
    },
    icon: <BarChart className="h-8 w-8" />,
  },
  {
    id: 'expansion',
    year: '2021',
    title: 'International Expansion',
    description: 'Expanded to 12 countries across Europe, Asia, and Australia',
    metric: {
      value: '12',
      label: 'Countries',
    },
    icon: <Activity className="h-8 w-8" />,
  },
  {
    id: 'acquisition',
    year: '2022',
    title: 'Strategic Acquisition',
    description: 'Acquired leading analytics provider to enhance our platform',
    metric: {
      value: '2x',
      label: 'Product Growth',
    },
    icon: <Award className="h-8 w-8" />,
  },
  {
    id: 'unicorn',
    year: '2023',
    title: 'Unicorn Status',
    description:
      'Reached $1B valuation with 10,000+ enterprise customers worldwide',
    metric: {
      value: '10K+',
      label: 'Enterprise Clients',
    },
    icon: <Award className="h-8 w-8" />,
  },
];

export default function GrowthTimeline() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <Badge className="mb-4">Our Journey</Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Growing From Startup to Industry Leader
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Track our exponential growth journey from a small startup to
            becoming the market leader.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-24">
          {/* Timeline line */}
          <div className="bg-border absolute top-0 bottom-0 left-0 w-px transform md:left-1/2 md:-translate-x-1/2" />

          {/* Timeline items */}
          <div className="relative space-y-12 md:space-y-24">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className={cn(
                  'flex flex-col gap-8 md:flex-row md:gap-0',
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
              >
                {/* Content */}
                <div className="ml-6 flex flex-col items-start md:ml-0 md:w-1/2 md:px-8">
                  <div className="bg-muted mb-4 inline-flex h-9 w-20 items-center justify-center rounded-full text-sm font-semibold">
                    {milestone.year}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{milestone.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {milestone.description}
                  </p>

                  <div className="bg-background flex items-center gap-4 rounded-lg border p-4 shadow-sm">
                    <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                      {milestone.icon}
                    </div>
                    <div>
                      <div className="text-primary text-3xl font-bold">
                        {milestone.metric.value}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {milestone.metric.label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline point */}
                <div className="absolute left-0 flex -translate-x-1/2 transform items-center justify-center md:left-1/2">
                  <div className="border-background bg-primary h-5 w-5 rounded-full border-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current stats */}
        <div className="bg-muted mt-24 rounded-lg p-8">
          <h3 className="mb-6 text-center text-2xl font-bold">
            Where We Are Today
          </h3>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                $1B+
              </div>
              <p className="text-muted-foreground font-medium">
                Company Valuation
              </p>
            </div>
            <div className="text-center">
              <div className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                180+
              </div>
              <p className="text-muted-foreground font-medium">Team Members</p>
            </div>
            <div className="text-center">
              <div className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                24
              </div>
              <p className="text-muted-foreground font-medium">Countries</p>
            </div>
            <div className="text-center">
              <div className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                12K+
              </div>
              <p className="text-muted-foreground font-medium">
                Global Customers
              </p>
            </div>
          </div>
        </div>

        {/* Future */}
        <div className="mt-16 text-center">
          <h3 className="mb-4 text-2xl font-bold">
            The Future Is Even Brighter
          </h3>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
            We&apos;re just getting started. Our roadmap includes expansion to
            new markets, enhanced product offerings, and continued innovation to
            serve our growing customer base.
          </p>
          <a
            href="#"
            className="text-primary inline-flex items-center font-medium hover:underline"
          >
            View our roadmap
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

```

```tsx
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  DollarSign,
  LineChart,
  PieChart,
  Target,
  Zap,
} from 'lucide-react';

type ImpactStat = {
  id: string;
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  icon: React.ReactNode;
};

const impactStats: ImpactStat[] = [
  {
    id: 'roi',
    value: '437',
    prefix: '',
    suffix: '%',
    label: 'Average ROI',
    description: 'Return on investment for businesses using our platform',
    icon: <LineChart className="text-primary h-8 w-8" />,
  },
  {
    id: 'revenue',
    value: '2.4',
    prefix: '$',
    suffix: 'B+',
    label: 'Revenue Generated',
    description: 'Total revenue generated for our customers',
    icon: <DollarSign className="h-8 w-8 text-emerald-500" />,
  },
  {
    id: 'conversion',
    value: '89',
    suffix: '%',
    label: 'Conversion Increase',
    description: 'Average lift in conversion rates after implementation',
    icon: <PieChart className="h-8 w-8 text-blue-500" />,
  },
  {
    id: 'time',
    value: '60',
    suffix: '%',
    label: 'Time Saved',
    description: 'Average reduction in manual workload for marketing teams',
    icon: <Clock className="h-8 w-8 text-amber-500" />,
  },
  {
    id: 'growth',
    value: '3.7',
    suffix: 'x',
    label: 'Customer Growth',
    description: 'Average growth in customer base year-over-year',
    icon: <Target className="h-8 w-8 text-purple-500" />,
  },
  {
    id: 'efficiency',
    value: '83',
    suffix: '%',
    label: 'Marketing Efficiency',
    description: 'Improvement in marketing efficiency across channels',
    icon: <Zap className="h-8 w-8 text-rose-500" />,
  },
];

export default function ImpactNumbers() {
  return (
    <div className="relative container mx-auto overflow-hidden px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Background gradient */}
      <div className="from-primary/5 to-background pointer-events-none absolute inset-0 bg-gradient-to-br" />

      <div className="relative mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <Badge className="mb-4">Proven Results</Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Transforming Businesses <br className="hidden md:inline" />
            With Real Numbers
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Our platform delivers measurable impact for businesses of all sizes.
            See the difference in black and white.
          </p>
        </div>

        {/* Impact Numbers Grid */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {impactStats.map((stat) => (
            <Card
              key={stat.id}
              className={cn('overflow-hidden p-0', 'bg-card border')}
            >
              <CardContent className="p-6 md:p-8">
                <div className="mb-6">{stat.icon}</div>

                <div className="mb-2 flex items-end">
                  {stat.prefix && (
                    <span className="mr-1 mb-1 text-2xl font-bold">
                      {stat.prefix}
                    </span>
                  )}
                  <h3 className="text-4xl font-bold tracking-tight md:text-5xl">
                    {stat.value}
                  </h3>
                  {stat.suffix && (
                    <span className="mb-1 ml-1 text-2xl font-bold">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                <div className="mb-4 text-xl font-semibold">{stat.label}</div>
                <p className="text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Industry comparison */}
        <div className="bg-muted mb-16 rounded-xl p-8">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="mb-4 text-2xl font-bold">
                How Does This Compare?
              </h3>
              <p className="text-muted-foreground mb-6">
                Our platform delivers results that are 4x better than industry
                averages across all key performance indicators.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-muted-foreground/20 h-2 w-full overflow-hidden rounded-full">
                    <div className="bg-muted-foreground h-full w-[24%]" />
                  </div>
                  <span className="min-w-[60px] text-sm font-medium">
                    Industry
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 h-2 w-full overflow-hidden rounded-full">
                    <div className="bg-primary h-full w-[89%]" />
                  </div>
                  <span className="min-w-[60px] text-sm font-medium">
                    Our Platform
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-center md:border-l md:pl-16 md:text-left">
              <div>
                <div className="text-muted-foreground text-sm">
                  INDUSTRY AVERAGE
                </div>
                <div className="text-3xl font-bold">24%</div>
              </div>
              <div className="flex h-12 items-center justify-center md:justify-start">
                <ArrowUpRight className="text-primary h-8 w-8" />
              </div>
              <div>
                <div className="text-primary text-sm font-medium">
                  OUR PLATFORM
                </div>
                <div className="text-primary text-4xl font-bold">89%</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="mb-6 text-2xl font-bold">
            Ready to See These Results in Your Business?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center gap-2 rounded-md px-8 py-3 text-sm font-medium shadow"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-md border px-8 py-3 text-sm font-medium shadow-sm"
            >
              View Case Studies
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

```

```tsx
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function CircularProgress() {
  const [category, setCategory] = useState('business');

  const categories = [
    { id: 'business', name: 'Business' },
    { id: 'technical', name: 'Technical' },
    { id: 'customer', name: 'Customer' },
  ];

  const statsByCategory = {
    business: [
      {
        label: 'Revenue Growth',
        value: 84,
        suffix: '%',
        info: 'Year over year',
      },
      { label: 'ROI', value: 167, suffix: '%', info: 'Return on investment' },
      {
        label: 'Market Share',
        value: 42,
        suffix: '%',
        info: 'In primary markets',
      },
      { label: 'Profit Margin', value: 23, suffix: '%', info: 'Net margin' },
    ],
    technical: [
      {
        label: 'System Uptime',
        value: 99.97,
        suffix: '%',
        info: 'Last 30 days',
      },
      {
        label: 'Load Time',
        value: 78,
        suffix: '%',
        info: 'Faster than average',
      },
      { label: 'Code Coverage', value: 91, suffix: '%', info: 'Test coverage' },
      {
        label: 'API Performance',
        value: 88,
        suffix: '%',
        info: 'Response time',
      },
    ],
    customer: [
      { label: 'Satisfaction', value: 94, suffix: '%', info: 'Overall rating' },
      { label: 'Retention', value: 87, suffix: '%', info: 'Customer loyalty' },
      { label: 'NPS Score', value: 72, suffix: '', info: 'Net promoter score' },
      {
        label: 'Support Rating',
        value: 96,
        suffix: '%',
        info: 'Issue resolution',
      },
    ],
  };

  // Helper function to determine color based on value
  const getColorClass = (value: number) => {
    if (value >= 90) return 'text-emerald-500';
    if (value >= 75) return 'text-blue-500';
    if (value >= 50) return 'text-amber-500';
    return 'text-rose-500';
  };

  // SVG Circular Progress component
  const CircularProgressIndicator = ({
    value,
    size = 150,
    strokeWidth = 10,
  }: {
    value: number;
    size?: number;
    strokeWidth?: number;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90 transform"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200 dark:text-gray-800"
        />
        {/* Foreground circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(getColorClass(value))}
        />
      </svg>
    );
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            Performance
          </Badge>
          <h2 className="text-3xl font-bold md:text-4xl">
            Key Performance Indicators
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl">
            Visualizing our achievements across all business aspects
          </p>
        </div>

        {/* Mobile Dropdown (visible on small screens) */}
        <div className="mb-8 md:hidden">
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={`select-${cat.id}`} value={cat.id}>
                  {cat.name} Metrics
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tabs for desktop with TabsContent for all views */}
        <Tabs value={category} onValueChange={setCategory} className="w-full">
          {/* Desktop Tabs (hidden on small screens) */}
          <div className="mb-12 hidden justify-center md:flex">
            <TabsList>
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.name} Metrics
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Using TabsContent for all categories */}
          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {statsByCategory[cat.id as keyof typeof statsByCategory].map(
                  (stat, index) => (
                    <div
                      key={index}
                      className="bg-card flex flex-col items-center justify-center rounded-xl border p-6"
                    >
                      <div className="relative mb-4 flex items-center justify-center">
                        <CircularProgressIndicator
                          value={stat.value}
                          size={120} // Smaller on mobile, will scale up with container
                        />
                        <div className="absolute flex flex-col items-center justify-center">
                          <span
                            className={cn(
                              'text-2xl font-bold md:text-3xl',
                              getColorClass(stat.value)
                            )}
                          >
                            {stat.value}
                            {stat.suffix}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-center text-lg font-semibold md:text-xl">
                        {stat.label}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-center text-xs md:text-sm">
                        {stat.info}
                      </p>
                    </div>
                  )
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}

```

```tsx
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function CardGroup() {
  return (
    <>
      {/* Stats */}
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
        <div className="max-w-5xl px-4 xl:px-0 py-10 mx-auto">
          <div className="border rounded-xl">
            <div className="p-4 lg:p-8 rounded-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-y-20 gap-x-12">
                {/* Stats */}
                <div className="relative text-center first:before:hidden before:absolute before:-top-full sm:before:top-1/2 before:start-1/2 sm:before:-start-6 before:w-px before:h-20 before:bg-border before:rotate-[60deg] sm:before:rotate-12 before:transform sm:before:-translate-y-1/2 before:-translate-x-1/2 sm:before:-translate-x-0 before:mt-3.5 sm:before:mt-0">
                  <svg
                    className="shrink-0 size-6 sm:size-8  mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
                    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
                    <path d="m21 3 1 11h-2" />
                    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
                    <path d="M3 4h8" />
                  </svg>
                  <div className="mt-3 sm:mt-5">
                    <h3 className="text-lg sm:text-3xl font-semibold">
                      2,000+
                    </h3>
                    <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                      Acme partners
                    </p>
                  </div>
                </div>
                {/* End Stats */}

                {/* Stats */}
                <div className="relative text-center first:before:hidden before:absolute before:-top-full sm:before:top-1/2 before:start-1/2 sm:before:-start-6 before:w-px before:h-20 before:bg-border before:rotate-[60deg] sm:before:rotate-12 before:transform sm:before:-translate-y-1/2 before:-translate-x-1/2 sm:before:-translate-x-0 before:mt-3.5 sm:before:mt-0">
                  <div className="flex justify-center items-center -space-x-5">
                    <Avatar className="relative z-[2] shrink-0 size-8 border-primary border">
                      <AvatarImage src="https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"></AvatarImage>
                    </Avatar>
                    <Avatar className="relative z-[1] shrink-0 size-8 border-primary border -mt-7">
                      <AvatarImage src="https://images.unsplash.com/photo-1570654639102-bdd95efeca7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"></AvatarImage>
                    </Avatar>{" "}
                    <Avatar className="relative shrink-0 size-8 border-primary border">
                      <AvatarImage src="https://images.unsplash.com/photo-1679412330254-90cb240038c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=320&h=320&q=80"></AvatarImage>
                    </Avatar>
                  </div>
                  <div className="mt-3 sm:mt-5">
                    <h3 className="text-lg sm:text-3xl font-semibold">85%</h3>
                    <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                      Happy customers
                    </p>
                  </div>
                </div>
                {/* End Stats */}

                {/* Stats */}
                <div className="relative text-center first:before:hidden before:absolute before:-top-full sm:before:top-1/2 before:start-1/2 sm:before:-start-6 before:w-px before:h-20 before:bg-border before:rotate-[60deg] sm:before:rotate-12 before:transform sm:before:-translate-y-1/2 before:-translate-x-1/2 sm:before:-translate-x-0 before:mt-3.5 sm:before:mt-0">
                  <svg
                    className="shrink-0 size-6 sm:size-8 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
                    <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
                    <path d="m2 16 6 6" />
                    <circle cx="16" cy="9" r="2.9" />
                    <circle cx="6" cy="5" r="3" />
                  </svg>
                  <div className="mt-3 sm:mt-5">
                    <h3 className="text-lg sm:text-3xl font-semibold">$55M+</h3>
                    <p className="mt-1 text-sm sm:text-base text-muted-foreground">
                      Ads managed yearly
                    </p>
                  </div>
                </div>
                {/* End Stats */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Stats */}
    </>
  );
}

```

```tsx
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Users, FolderOpen, Calendar } from 'lucide-react';

const stats = [
  {
    icon: Calendar,
    value: 15,
    suffix: '+',
    label: 'Years Experience',
    description: 'Over a decade of industry leadership.',
  },
  {
    icon: FolderOpen,
    value: 2500,
    suffix: '+',
    label: 'Projects Completed',
    description: 'Successfully delivered worldwide.',
  },
  {
    icon: Users,
    value: 10000,
    suffix: '+',
    label: 'Happy Clients',
    description: 'From startups to Fortune 500 companies.',
  },
  {
    icon: Trophy,
    value: 150,
    suffix: '+',
    label: 'Industry Awards',
    description: 'Recognized for design and innovation excellence.',
  },
];

export default function AboutSectionAnimatedStats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px]"
      ref={sectionRef}
    >
      <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
        <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
          Our Achievements
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          Milestones That Define Our Journey
        </h2>
        <p className="text-muted-foreground">
          Over the years, we&apos;ve achieved remarkable success by focusing on
          delivering exceptional value to our clients and building lasting
          relationships.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="overflow-hidden border-none p-0 shadow-md"
          >
            <CardContent className="space-y-4 p-8 text-center">
              <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                <stat.icon className="text-primary h-8 w-8" />
              </div>
              <h3 className="flex items-center justify-center">
                <AnimatedCounter
                  value={stat.value}
                  isVisible={isVisible}
                  duration={2000}
                />
                <span className="text-4xl font-bold">{stat.suffix}</span>
              </h3>
              <div>
                <p className="text-lg font-semibold">{stat.label}</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-accent/50 mt-20 rounded-lg p-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-bold">Our Story Continues</h3>
            <p className="text-muted-foreground">
              While we take pride in these achievements, our journey is ongoing.
              We remain dedicated to innovation, quality, and creating
              meaningful impact for our clients and communities worldwide.
            </p>
            <p className="text-muted-foreground mt-4">
              Every day, we strive to exceed expectations and set new standards
              of excellence in everything we do.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="from-primary/20 to-primary/5 rounded-lg bg-gradient-to-br p-6 text-center">
              <p className="text-primary text-lg font-medium">Growing Team</p>
              <p className="text-4xl font-bold">250+</p>
              <p className="text-muted-foreground mt-2 text-sm">
                Talented professionals across the globe
              </p>
            </div>
            <div className="from-primary/20 to-primary/5 rounded-lg bg-gradient-to-br p-6 text-center">
              <p className="text-primary text-lg font-medium">Global Reach</p>
              <p className="text-4xl font-bold">30+</p>
              <p className="text-muted-foreground mt-2 text-sm">
                Countries with active client projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated counter component
interface AnimatedCounterProps {
  value: number;
  isVisible: boolean;
  duration: number;
}

function AnimatedCounter({ value, isVisible, duration }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const stepRef = useRef(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (!isVisible) return;

    const steps = 60;
    const increment = value / steps;
    const intervalTime = duration / steps;

    stepRef.current = 0;
    countRef.current = 0;

    const interval = setInterval(() => {
      stepRef.current += 1;
      const newCount = Math.min(Math.round(stepRef.current * increment), value);

      if (countRef.current !== newCount) {
        countRef.current = newCount;
        setCount(newCount);
      }

      if (stepRef.current >= steps || newCount >= value) {
        clearInterval(interval);
        setCount(value);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isVisible, value, duration]);

  return <span className="text-4xl font-bold">{count}</span>;
}
```