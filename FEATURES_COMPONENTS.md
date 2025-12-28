```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature1Props {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  buttonPrimary: {
    text: string;
    href: string;
  };
  buttonSecondary: {
    text: string;
    href: string;
  };
  className?: string;
}

const Feature1 = ({
  title = "Blocks built with Shadcn & Tailwind",
  description = "Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  imageSrc = "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  imageAlt = "placeholder hero",
  buttonPrimary = {
    text: "Get Started",
    href: "https://shadcnblocks.com",
  },
  buttonSecondary = {
    text: "Learn More",
    href: "https://shadcnblocks.com",
  },
  className,
}: Feature1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="my-6 mt-0 text-4xl font-semibold text-balance lg:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">
                {description}
              </p>
            )}
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button asChild>
                <a href={buttonPrimary.href} target="_blank">
                  {buttonPrimary.text}
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={buttonSecondary.href} target="_blank">
                  {buttonSecondary.text}
                </a>
              </Button>
            </div>
          </div>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-h-96 w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Feature1 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature2Props {
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  buttonPrimary: {
    text: string;
    href: string;
  };
  buttonSecondary: {
    text: string;
    href: string;
  };
  className?: string;
}

const Feature2 = ({
  title = "Blocks built with Shadcn & Tailwind",
  description = "Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  imageSrc = "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  imageAlt = "placeholder hero",
  buttonPrimary = {
    text: "Get Started",
    href: "https://shadcnblocks.com",
  },
  buttonSecondary = {
    text: "Learn More",
    href: "https://shadcnblocks.com",
  },
  className,
}: Feature2Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-8 md:gap-16 lg:grid-cols-2">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-h-96 w-full rounded-md object-cover"
          />
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2 className="my-6 mt-0 text-4xl font-semibold text-balance lg:text-5xl">
              {title}
            </h2>
            {description && (
              <p className="mb-8 max-w-xl text-muted-foreground lg:text-lg">
                {description}
              </p>
            )}
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button asChild>
                <a href={buttonPrimary.href} target="_blank">
                  {buttonPrimary.text}
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={buttonSecondary.href} target="_blank">
                  {buttonSecondary.text}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature2 };

```

```tsx
import { PersonStanding, Timer, Zap, ZoomIn } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature10Props {
  className?: string;
}

const Feature10 = ({ className }: Feature10Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <p className="mb-4 text-xs text-muted-foreground">Why Us?</p>
        <h2 className="text-3xl font-medium lg:text-4xl">
          A better way to build websites
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          <div className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5">
            <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
              <Timer className="size-5 md:size-6" />
            </span>
            <div>
              <h3 className="font-medium md:mb-2 md:text-xl">
                Performance
                <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sunt beatae
                tenetur.
              </p>
            </div>
          </div>
          <div className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5">
            <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
              <Zap className="size-5 md:size-6" />
            </span>
            <div>
              <h3 className="font-medium md:mb-2 md:text-xl">
                Innovation
                <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sunt beatae
                tenetur.
              </p>
            </div>
          </div>
          <div className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5">
            <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
              <ZoomIn className="size-5 md:size-6" />
            </span>
            <div>
              <h3 className="font-medium md:mb-2 md:text-xl">
                Quality
                <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sunt beatae
                tenetur.
              </p>
            </div>
          </div>
          <div className="relative flex gap-3 rounded-lg border-dashed md:block md:border-l md:p-5">
            <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
              <PersonStanding className="size-5 md:size-6" />
            </span>
            <div>
              <h3 className="font-medium md:mb-2 md:text-xl">
                Accessibility
                <span className="absolute -left-px hidden h-6 w-px bg-primary md:inline-block"></span>
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sunt beatae
                tenetur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature10 };

```

```tsx
import { ChevronRight, CircleCheckBig } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature11Props {
  className?: string;
}

const Feature11 = ({ className }: Feature11Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row">
          <img
            src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
            alt="placeholder"
            className="max-h-96 w-full rounded-lg object-cover md:max-h-[500px] md:w-1/2"
          />
          <div className="lg:p-10">
            <h2 className="text-3xl font-medium text-balance md:text-5xl">
              Built with the latest technology stack
            </h2>
            <p className="mt-1 text-muted-foreground md:mt-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
              alias unde et doloremque dignissimos error temporibus quisquam
              porro ducimus esse quod, a officiis.
            </p>
            <Button variant="outline" className="mt-6">
              Learn more <ChevronRight className="ml-2 size-4" />
            </Button>
            <ul className="mt-10 flex-wrap items-center gap-6 space-y-6 md:flex md:space-y-0">
              <li className="flex items-center gap-3">
                <CircleCheckBig className="size-4" /> Quality
              </li>
              <li className="flex items-center gap-3">
                <CircleCheckBig className="size-4" />
                Multi-purpose
              </li>
              <li className="flex items-center gap-3">
                <CircleCheckBig className="size-4" /> Easy to use
              </li>
              <li className="flex items-center gap-3">
                <CircleCheckBig className="size-4" /> Fast
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature11 };

```

```tsx
"use client";

import {
  ArrowDownToLine,
  ArrowUpDown,
  Code,
  Redo,
  Repeat,
  Scaling,
  Scan,
} from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Progress } from "@/components/ui/progress";

const slides = [
  {
    title: "Integrations",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    icon: <Code className="size-4" />,
  },
  {
    title: "Automation",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    icon: <ArrowUpDown className="size-4" />,
  },
  {
    title: "Customization",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    icon: <Redo className="size-4" />,
  },
  {
    title: "Collaboration",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    icon: <ArrowDownToLine className="size-4" />,
  },
  {
    title: "Security",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    icon: <Repeat className="size-4" />,
  },
  {
    title: "Performance",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    icon: <Scan className="size-4" />,
  },
  {
    title: "Scalability",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore, quae!",
    icon: <Scaling className="size-4" />,
  },
];

interface Feature12Props {
  className?: string;
}

const Feature12 = ({ className }: Feature12Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [progress, setProgress] = useState(Math.floor(100 / slides.length));

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("scroll", ({ scrollProgress }) => {
      setProgress(
        Math.max(1 / slides.length, Math.min(1, scrollProgress())) * 100,
      );
    });
  }, [api]);

  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-7xl">
        <div className="mb-10 flex flex-col items-center gap-6 md:mb-20">
          <Badge variant="outline">Badge</Badge>
          <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
            This is where your features go
          </h2>
        </div>
        <Carousel className="w-full" setApi={setApi}>
          <div className="mb-4 flex justify-between px-1 md:mb-5">
            <p className="font-medium">Rules</p>
            <div className="flex items-center space-x-2">
              <div className="mr-2 hidden items-center gap-3 text-xs text-muted-foreground md:flex">
                <span>01</span>
                <Progress value={progress} className="h-[2px] w-52" />
                <span>0{slides.length}</span>
              </div>
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem
                key={index}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col justify-center p-6">
                      <div className="">
                        <span className="mb-5 flex size-8 items-center justify-center rounded-full bg-accent lg:size-10">
                          {slide.icon}
                        </span>
                        <p className="text-xl font-semibold md:text-2xl lg:text-2xl">
                          {slide.title}
                        </p>
                        <p className="pt-2 text-muted-foreground">
                          {slide.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export { Feature12 };

```

```tsx
import { cn } from "@/lib/utils";

interface Feature {
  id: string;
  heading: string;
  label: string;
  description: string;
  image: string;
  url: string;
}

interface Feature13Props {
  title?: string;
  features?: Feature[];
  className?: string;
}

const Feature13 = ({
  title = "A collection of extra blocks for Shadcn UI & Tailwind",
  features = [
    {
      id: "feature-1",
      heading: "Design System Approved",
      label: "FOR DESIGNERS",
      description:
        "Hundreds of finely crafted components for shadcn/ui available in Figma. Easily modify the design system to your brand.",
      image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
      url: "https://shadcnblocks.com",
    },
    {
      id: "feature-2",
      heading: "Copy-Paste Code Blocks",
      label: "FOR DEVELOPERS",
      description:
        "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
      image: "https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9",
      url: "https://shadcnblocks.com",
    },
    {
      id: "feature-3",
      heading: "Product-First Approach",
      label: "FOR PRODUCT TEAMS",
      description:
        "Components designed with user experience in mind. Every block is tested for usability and optimized for conversion rates.",
      image: "https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0",
      url: "https://shadcnblocks.com",
    },
    {
      id: "feature-4",
      heading: "Marketing-Ready Templates",
      label: "FOR MARKETING",
      description:
        "High-converting landing pages, email templates, and marketing components that drive engagement and boost your campaigns.",
      image: "https://cdn.ing/assets/files/record/286212/65sbovk1iv0fzrcrbm558df4ey8w",
      url: "https://shadcnblocks.com",
    },
  ],
  className,
}: Feature13Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        {title && (
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-4xl font-medium text-pretty lg:text-5xl">
              {title}
            </h2>
          </div>
        )}
        <div className="grid gap-8 lg:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col justify-between rounded-lg bg-muted"
            >
              <div className="flex justify-between gap-10 border-b">
                <div className="flex flex-col justify-between justify-start gap-8 py-6 pl-4 md:gap-14 md:py-10 md:pl-8 lg:justify-normal">
                  <span className="font-mono text-xs text-muted-foreground">
                    {feature.label}
                  </span>
                  <a href={feature.url}>
                    <h3 className="text-2xl transition-all hover:text-primary hover:opacity-80 sm:text-3xl lg:text-4xl">
                      {feature.heading}
                    </h3>
                  </a>
                </div>
                <div className="md:1/3 w-2/5 shrink-0 rounded-r-lg border-l">
                  <a href={feature.url}>
                    <img
                      src={feature.image}
                      alt={feature.heading}
                      className="h-full w-full rounded-t-lg object-cover transition-opacity hover:opacity-80"
                    />
                  </a>
                </div>
              </div>
              <p className="p-4 text-muted-foreground md:p-8">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature13 };

```

```tsx
import { CheckCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature14Props {
  className?: string;
}

const Feature14 = ({ className }: Feature14Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="space-y-10 rounded-lg border py-10 md:px-4">
          <div className="grid rounded-lg border md:grid-cols-2">
            <div className="flex flex-col px-6 py-8 lg:px-8 lg:py-12 xl:px-12 xl:py-20">
              <h3 className="mb-3 text-2xl font-medium sm:mb-5 md:text-3xl lg:text-4xl">
                Secure Payments
              </h3>
              <div className="mb-8 text-sm text-muted-foreground sm:mb-10 md:text-base">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Pariatur modi et recusandae ducimus eligendi eveniet soluta
                reprehenderit nostrum expedita omnis.
              </div>
              <ul className="mt-auto space-y-2 sm:space-y-3">
                <li className="flex gap-x-3">
                  <CheckCircle className="mt-0.5 size-4 shrink-0 sm:mt-1" />
                  <p className="text-sm md:text-base">
                    Secure payment gateway integration with Stripe
                  </p>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircle className="mt-0.5 size-4 shrink-0 sm:mt-1" />
                  <p className="text-sm md:text-base">
                    SSL encryption for secure transactions
                  </p>
                </li>
              </ul>
            </div>
            <div className="relative order-first max-h-80 md:order-last md:max-h-[500px]">
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt="placeholder"
                className="h-full w-full object-cover"
              />
              <span className="absolute top-5 left-5 flex size-6 items-center justify-center rounded-sm bg-primary font-mono text-xs text-primary-foreground md:top-10 md:left-10">
                01
              </span>
            </div>
          </div>
          <div className="grid rounded-lg border md:grid-cols-2">
            <div className="flex flex-col px-6 py-8 lg:px-8 lg:py-12 xl:px-12 xl:py-20">
              <h3 className="mb-3 text-2xl font-medium sm:mb-5 md:text-3xl lg:text-4xl">
                Automated Invoicing
              </h3>
              <div className="mb-8 text-sm text-muted-foreground sm:mb-10 md:text-base">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Pariatur modi et recusandae ducimus eligendi eveniet soluta
                reprehenderit nostrum expedita omnis.
              </div>
              <ul className="mt-auto space-y-2 sm:space-y-3">
                <li className="flex gap-x-3">
                  <CheckCircle className="mt-0.5 size-4 shrink-0 sm:mt-1" />
                  <p className="text-sm md:text-base">
                    Automated invoicing for easy billing
                  </p>
                </li>
              </ul>
            </div>
            <div className="relative order-first max-h-80 md:order-last md:max-h-[500px]">
              <img
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                alt="placeholder"
                className="h-full w-full object-cover"
              />
              <span className="absolute top-5 left-5 flex size-6 items-center justify-center rounded-sm bg-primary font-mono text-xs text-primary-foreground md:top-10 md:left-10">
                02
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature14 };

```

```tsx
import {
  Infinity as InfinityIcon,
  MessagesSquare,
  Zap,
  ZoomIn,
} from "lucide-react";

import { cn } from "@/lib/utils";

const feature = [
  {
    title: "Quality",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo.",
    icon: <ZoomIn className="size-6" />,
  },
  {
    title: "Innovation",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo.",
    icon: <Zap className="size-6" />,
  },
  {
    title: "Customer Support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo.",
    icon: <MessagesSquare className="size-6" />,
  },
  {
    title: "Reliability",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi necessitatibus, culpa at vitae molestias tenetur explicabo.",
    icon: <InfinityIcon className="size-6" />,
  },
];

interface Feature15Props {
  className?: string;
}

const Feature15 = ({ className }: Feature15Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col items-center space-y-4 text-center sm:space-y-6 md:max-w-3xl md:text-center">
            <p className="text-sm text-muted-foreground">WHY WE ARE UNIQUE</p>
            <h2 className="text-3xl font-medium md:text-5xl">
              Bringing the best to you by the best in the industry
            </h2>

            <p className="text-muted-foreground md:max-w-2xl">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi
              necessitatibus, culpa at vitae molestias tenetur explicabo.
              Voluptatum amet architecto suscipit pariatur eligendi repellendus
              mollitia dolore unde sint?
            </p>
          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-2">
          {feature.map((feature, idx) => (
            <div
              className="flex flex-col justify-between rounded-lg bg-accent p-6 md:min-h-[300px] md:p-8"
              key={idx}
            >
              <span className="mb-6 flex size-11 items-center justify-center rounded-full bg-background">
                {feature.icon}
              </span>
              <div>
                <h3 className="text-lg font-medium md:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature15 };

```

```tsx
import { Timer, Zap, ZoomIn } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature16Props {
  className?: string;
}

const Feature16 = ({ className }: Feature16Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <p className="mb-4 text-sm text-muted-foreground lg:text-base">
          OUR VALUES
        </p>
        <h2 className="text-3xl font-medium lg:text-4xl">Why Choose Us?</h2>
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-3">
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Timer className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Performance</h3>
            <p className="leading-7 text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
              beatae tenetur totam aut blanditis ipsa quaerat neque eaque, atque
              doloremque! Eligendi.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <ZoomIn className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Quality</h3>
            <p className="leading-7 text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
              beatae tenetur totam aut blanditis ipsa quaerat neque eaque, atque
              doloremque! Eligendi.
            </p>
          </div>
          <div className="rounded-lg bg-accent p-5">
            <span className="mb-8 flex size-12 items-center justify-center rounded-full bg-background">
              <Zap className="size-6" />
            </span>
            <h3 className="mb-2 text-xl font-medium">Innovation</h3>
            <p className="leading-7 text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt
              beatae tenetur totam aut blanditis ipsa quaerat neque eaque, atque
              doloremque! Eligendi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature16 };

```

```tsx
import {
  BatteryCharging,
  GitPullRequest,
  Layers,
  RadioTower,
  SquareKanban,
  WandSparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Feature {
  heading: string;
  description: string;
  icon: React.ReactNode;
}

interface Feature17Props {
  label?: string;
  title?: string;
  features: Feature[];
  buttonText?: string;
  buttonUrl?: string;
  className?: string;
}

const Feature17 = ({
  label = "Features",
  title = "Fully featured components for Shadcn UI & Tailwind",
  features = [
    {
      heading: "Quality",
      description:
        "Built with attention to detail and best practices. Every component is thoroughly tested and follows modern React patterns for reliability and performance.",
      icon: <GitPullRequest className="size-4 md:size-6" />,
    },
    {
      heading: "Experience",
      description:
        "Crafted with user experience in mind. Each component is designed to be intuitive, accessible, and provide smooth interactions across all devices.",
      icon: <SquareKanban className="size-4 md:size-6" />,
    },
    {
      heading: "Support",
      description:
        "Comprehensive documentation and community support. Get help when you need it with detailed guides, examples, and active community assistance.",
      icon: <RadioTower className="size-4 md:size-6" />,
    },
    {
      heading: "Innovation",
      description:
        "Cutting-edge design patterns and modern web technologies. Stay ahead with the latest trends in UI/UX design and development practices.",
      icon: <WandSparkles className="size-4 md:size-6" />,
    },
    {
      heading: "Results",
      description:
        "Proven track record of successful implementations. These components have been battle-tested in real-world applications and deliver consistent results.",
      icon: <Layers className="size-4 md:size-6" />,
    },
    {
      heading: "Efficiency",
      description:
        "Optimized for performance and developer productivity. Lightweight, fast-loading components that help you build faster without compromising on quality.",
      icon: <BatteryCharging className="size-4 md:size-6" />,
    },
  ],
  buttonText = "More Features",
  buttonUrl = "https://shadcnblocks.com",
  className,
}: Feature17Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        {(label || title) && (
          <div className="mb-12 flex max-w-3xl flex-col gap-4">
            <Badge variant="secondary">{label}</Badge>
            <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
        )}
        <div className="grid gap-12 md:grid-cols-2">
          {features.map((feature, idx) => (
            <div className="flex gap-6 space-y-4 rounded-lg md:block" key={idx}>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                {feature.icon}
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  {feature.heading}
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        {buttonUrl && (
          <div className="mt-16 flex justify-center">
            <Button size="lg" asChild>
              <a href={buttonUrl}>{buttonText}</a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export { Feature17 };

```

```tsx
import {
  Blocks,
  ChevronRight,
  Infinity as InfinityIcon,
  Laptop,
  ListEnd,
  Zap,
  ZoomIn,
} from "lucide-react";

import { cn } from "@/lib/utils";

const features = [
  {
    title: "Quality",
    description:
      "Our UI blocks are designed with quality in mind. We make sure that every block is pixel perfect and visually appealing.",
    icon: <ZoomIn className="size-6" />,
    link: "#",
  },
  {
    title: "Customizable",
    description:
      "You can easily customize our UI blocks to fit your needs. Change colors, fonts, and more with our easy-to-use interface.",
    icon: <Blocks className="size-6" />,
    link: "#",
  },
  {
    title: "Responsive",
    description:
      "Our UI blocks are fully responsive and look great on any device. No matter the screen size, your website will look amazing.",
    icon: <Laptop className="size-6" />,
    link: "#",
  },
  {
    title: "Easy to Use",
    description:
      "Our UI blocks are easy to use and require no coding knowledge. Simply drag and drop the blocks you want and you are good to go.",
    icon: <ListEnd className="size-6" />,
    link: "#",
  },
  {
    title: "Fast",
    description:
      "Our UI blocks are optimized for speed and performance. Your website will load fast and provide a great user experience.",
    icon: <Zap className="size-6" />,
    link: "#",
  },
  {
    title: "Modern",
    description:
      "Our UI blocks are designed with modern trends in mind. Your website will look fresh and up-to-date with our blocks.",
    icon: <InfinityIcon className="size-6" />,
    link: "#",
  },
];

interface Feature18Props {
  className?: string;
}

const Feature18 = ({ className }: Feature18Props) => {
  return (
    <section
      className={cn(
        "relative py-32 before:absolute before:inset-0 before:bg-primary/10 before:[mask-image:url('https://cdn.ing/assets/files/record/286191/mqlb33fzxz9cdth1bx7if0wmpkp1')] before:[mask-size:64px_32px] before:[mask-repeat:repeat]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent to-background"></div>
      <div className="relative container">
        <h2 className="mb-8 max-w-xl text-2xl font-semibold text-balance lg:text-4xl">
          Build your own website with our UI blocks
        </h2>
        <div className="z-30 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col gap-10 rounded-lg border bg-background p-8"
            >
              <div>
                {feature.icon}
                <h3 className="mt-6 mb-2 font-medium">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              <a
                href={feature.link}
                className="flex items-center gap-2 text-sm font-medium"
              >
                Learn more
                <ChevronRight className="w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature18 };

```

```tsx
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const slides = [
  {
    id: 1,
    tabName: "Products",
    title: "Pre-built Components for Rapid Development",
    description:
      "Accelerate your workflow with our library of ready-to-use, fully customizable UI components designed for modern web applications.",
    features: [
      "Cross-platform Integrations",
      "Responsive Components",
      "Accessible Blocks",
      "Customizable Templates",
    ],
    link: "#",
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    id: 2,
    tabName: "Services",
    title: "Expert Solutions for Every Challenge",
    description:
      "Our comprehensive services help you build, scale, and optimize your digital presence with expert guidance every step of the way.",
    features: [
      "Technical Consulting",
      "Implementation Support",
      "Performance Optimization",
      "Ongoing Maintenance",
    ],
    link: "#",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  {
    id: 3,
    tabName: "Company",
    title: "We Build the Future of Web Development",
    description:
      "Founded by industry experts, we're committed to creating tools that empower developers to build better digital experiences faster.",
    features: [
      "Remote-first Culture",
      "Open Source Contributors",
      "Community-driven",
      "Continuous Innovation",
    ],
    link: "#",
    image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
  },
  {
    id: 4,
    tabName: "Portfolio",
    title: "Showcasing Client Success Stories",
    description:
      "Explore our diverse portfolio of successful implementations across industries, from startups to enterprise-level organizations.",
    features: [
      "Case Studies",
      "Implementation Examples",
      "Success Metrics",
      "Client Testimonials",
    ],
    link: "#",
    image: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
  },
  {
    id: 5,
    tabName: "Resources",
    title: "Knowledge to Power Your Development",
    description:
      "Access our comprehensive collection of tutorials, guides, and best practices to help you get the most from our platform.",
    features: [
      "Developer Guides",
      "Video Tutorials",
      "API Documentation",
      "Community Forums",
    ],
    link: "#",
    image: "https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr",
  },
];

interface Feature19Props {
  className?: string;
}

const Feature19 = ({ className }: Feature19Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
          <h2 className="text-center text-3xl font-semibold lg:text-5xl">
            Building Better Digital Experiences
          </h2>
          <p className="text-center text-balance text-muted-foreground lg:text-xl">
            Discover how our platform empowers developers and businesses to
            create exceptional web applications with less code and more
            creativity.
          </p>
        </div>
        <div className="mt-12">
          <Tabs
            defaultValue="1"
            className="mx-auto flex w-fit flex-col items-center gap-8 md:gap-12"
          >
            <TabsList className="flex h-auto gap-x-2 p-2">
              {slides.map((slide) => (
                <TabsTrigger
                  key={slide.id}
                  value={slide.id.toString()}
                  className="text-sm hover:bg-background md:text-base"
                >
                  {slide.tabName}
                </TabsTrigger>
              ))}
            </TabsList>
            {slides.map((slide) => (
              <TabsContent
                value={slide.id.toString()}
                key={slide.id}
                className="max-w-5xl"
              >
                <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
                  <div>
                    <h2 className="mb-4 text-2xl font-semibold lg:text-4xl">
                      {slide.title}
                    </h2>
                    <p className="text-muted-foreground lg:text-xl">
                      {slide.description}
                    </p>
                    <ul className="mt-8 grid grid-cols-1 gap-2 lg:grid-cols-2">
                      {slide.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4" />
                          <span className="font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm" asChild>
                      <a href={slide.link} className="mt-8">
                        Explore {slide.tabName}
                        <ArrowRight className="w-4" />
                      </a>
                    </Button>
                  </div>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="order-first max-h-[400px] w-full rounded-lg object-cover md:order-last"
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature19 };

```

```tsx
import { ChevronRight, SquareDashedMousePointer } from "lucide-react";

import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const utilities = [
  {
    title: "Integrations",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    title: "Apps",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  {
    title: "APIs",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
  },
  {
    title: "Plugins",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
  },
  {
    title: "Extensions",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: "https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr",
  },
  {
    title: "Widgets",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    image: "https://cdn.ing/assets/files/record/286206/qs3jazsupq75q1fgisnonwnohie2",
  },
];

interface Feature20Props {
  className?: string;
}

const Feature20 = ({ className }: Feature20Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-7xl">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <SquareDashedMousePointer className="size-5 text-primary" />
            <p>Utilities</p>
          </div>
          <a href="#" className="hover:text-primary hover:underline">
            Learn more
            <ChevronRight className="ml-2 inline-block size-4" />
          </a>
        </div>
        <Separator className="mt-3 mb-8" />
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <h2 className="text-3xl font-medium md:w-1/2">
            What you can do with our utilities?
          </h2>
          <p className="md:w-1/2">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
            praesent, ad ullam quis cupiditate atque maxime alias eaque
            repellendus perferendis, nemo repudiandae.
          </p>
        </div>
        <div className="mt-11 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {utilities.map((utility, index) => (
            <Card key={index} className="overflow-hidden pt-0">
              <img
                src={utility.image}
                alt={utility.title}
                className="aspect-video w-full object-cover"
              />
              <div className="p-5">
                <p className="mb-1 font-medium">{utility.title}</p>
                <p className="text-muted-foreground">{utility.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature20 };

```

```tsx
import { Sparkles, SquareDashedMousePointer } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Feature21Props {
  className?: string;
}

const Feature21 = ({ className }: Feature21Props) => {
  return (
    <section className={cn("bg-gray-50 py-32 dark:bg-background", className)}>
      <div className="container max-w-7xl">
        <div className="flex items-center gap-2 text-muted-foreground">
          <SquareDashedMousePointer className="size-5" />
          <p className="text-sm">Utilities</p>
        </div>
        <Separator className="mt-3 mb-8" />
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <h2 className="text-3xl font-medium md:w-1/2">
            Utilites for every use case and platform you can think of.
          </h2>
          <p className="md:w-1/2">
            All the tools you need to get the job done. From apps to
            integrations, we have you covered.
          </p>
        </div>
        <div className="mt-11 flex flex-col gap-6 md:flex-row">
          <div className="flex w-full flex-col gap-6">
            <Card className="p-6">
              <p className="mb-1 font-medium">Apps</p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </Card>
            <Card className="overflow-hidden pt-0">
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt="placeholder"
                className="aspect-video w-full object-cover"
              />
              <div className="p-6">
                <p className="mb-1 font-medium">Integrations</p>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Animi laboriosam voluptatibus temporibus doloremque
                  laudantium.
                </p>
              </div>
            </Card>
            <Card className="p-6">
              <p className="mb-1 font-medium">Utilities</p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </Card>
            <Card className="p-6">
              <p className="mb-1 flex items-center gap-2 font-medium">
                Features <Sparkles className="size-4" />
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </Card>
          </div>
          <div className="flex w-full flex-col gap-6">
            <Card className="overflow-hidden pt-0">
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt="placeholder"
                className="aspect-video w-full object-cover"
              />
              <div className="p-6">
                <p className="mb-1 flex items-center gap-2 font-medium">
                  Integrations <Sparkles className="size-4" />
                </p>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Animi laboriosam voluptatibus temporibus doloremque
                  laudantium.
                </p>
              </div>
            </Card>
            <Card className="p-6">
              <p className="mb-1 font-medium">Features</p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </Card>
            <Card className="p-6">
              <p className="mb-1 flex items-center gap-2 font-medium">
                Features <Sparkles className="size-4" />
              </p>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </Card>
            <Card className="border-dashed bg-transparent p-6 shadow-none">
              <div className="mb-1 flex items-center gap-2 font-medium">
                Search
                <Badge variant="outline">Coming soon</Badge>
              </div>
              <p className="text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus doloremque laudantium.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature21 };

```

```tsx
import { Check, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature22Props {
  className?: string;
}

const Feature22 = ({ className }: Feature22Props) => {
  return (
    <section className={cn("py-16 sm:py-24 md:py-32", className)}>
      <div className="container">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-8 md:gap-12 lg:grid-cols-3 lg:gap-16">
          <h2 className="mb-4 text-3xl font-medium sm:col-span-2 sm:text-4xl md:mb-0 lg:col-span-1">
            Build any kind of Website with our Blocks
          </h2>
          <ul className="flex flex-col gap-3 text-muted-foreground sm:gap-4">
            <li className="flex items-center gap-2">
              <Check className="size-4 text-primary" /> Responsive Design and
              Layout
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-primary" /> Clean and Modern Design
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-primary" /> Easy to Customize
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-primary" /> Cross Browser Compatible
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-primary" /> SEO Friendly
            </li>
          </ul>
          <ul className="flex flex-col gap-4 text-muted-foreground">
            <li className="flex items-center gap-2">
              <Check className="size-4 text-primary" /> High Performance and
              Speed
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-primary" /> Clean Code and Well
              Documented
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-primary" /> Fast Loading and Free
              Updates
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-primary" /> 24/7 Support
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-primary" /> Lifetime Access and
              Updates
            </li>
          </ul>
        </div>
        <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 md:mt-20 md:gap-8 lg:grid-cols-3">
          <div className="rounded-lg border">
            <div className="relative p-1">
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt="placeholder"
                className="max-h-96 w-full rounded-t-lg object-cover sm:max-h-72 md:max-h-64"
              />
              <Badge
                variant="outline"
                className="absolute top-5 left-5 bg-primary-foreground"
              >
                Example
              </Badge>
            </div>
            <div>
              <div className="mb-3 px-4 pt-5 sm:px-5 md:px-6 md:pt-6">
                <h3 className="font-medium">Copy and paste Blocks</h3>
                <p className="text-muted-foreground">
                  Easly copy and paste any block you like and use it in your
                  project.
                </p>
              </div>
              <div className="h-px border-t border-dashed"></div>
              <ul className="text-muted-foreground">
                <li className="flex items-start gap-2 px-4 py-3 sm:px-5 md:px-6">
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  Responsive design and layout with clean and modern design
                </li>
                <div className="h-px border-t border-dashed"></div>
                <li className="flex items-start gap-2 px-4 py-3 sm:px-5 md:px-6">
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  Easy to customize with cross browser compatibility
                </li>
                <div className="h-px border-t border-dashed"></div>
                <li className="flex items-start gap-2 px-4 py-3 sm:px-5 md:px-6">
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  SEO friendly with high performance and speed for improved laod
                  times
                </li>
              </ul>
              <div className="h-px border-t border-dashed"></div>
              <a
                href="#"
                className="my-3 flex items-center gap-2 px-4 font-medium sm:my-4 sm:px-5 md:px-6"
              >
                Read more
                <ChevronRight className="mt-0.5 size-4" />
              </a>
            </div>
          </div>

          <div className="rounded-lg border">
            <div className="relative p-1">
              <img
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                alt="placeholder"
                className="max-h-96 w-full rounded-t-lg object-cover sm:max-h-72 md:max-h-64"
              />
              <Badge
                variant="outline"
                className="absolute top-5 left-5 bg-primary-foreground"
              >
                Example
              </Badge>
            </div>
            <div>
              <div className="mb-3 px-4 pt-5 sm:px-5 md:px-6 md:pt-6">
                <h3 className="font-medium">Easy to Customize Blocks</h3>
                <p className="text-muted-foreground">
                  Easly customize any block you like and use it in your project.
                </p>
              </div>
              <div className="h-px border-t border-dashed"></div>
              <ul className="text-muted-foreground">
                <li className="flex items-start gap-2 px-4 py-3 sm:px-5 md:px-6">
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  The blocks are clean and modern with easy to customize
                  features
                </li>
                <div className="h-px border-t border-dashed"></div>
                <li className="flex items-start gap-2 px-4 py-3 sm:px-5 md:px-6">
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  All blocks are SEO friendly with cross browser compatibility
                </li>
                <div className="h-px border-t border-dashed"></div>
                <li className="flex items-start gap-2 px-4 py-3 sm:px-5 md:px-6">
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  Each block is responsive with high performance and speed
                </li>
              </ul>
              <div className="h-px border-t border-dashed"></div>
              <a
                href="#"
                className="my-3 flex items-center gap-2 px-4 font-medium sm:my-4 sm:px-5 md:px-6"
              >
                Read more
                <ChevronRight className="mt-0.5 size-4" />
              </a>
            </div>
          </div>
          <div className="rounded-lg border">
            <div className="relative p-1">
              <img
                src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                alt="placeholder"
                className="max-h-96 w-full rounded-t-lg object-cover sm:max-h-72 md:max-h-64"
              />
              <Badge
                variant="outline"
                className="absolute top-5 left-5 bg-primary-foreground"
              >
                Example
              </Badge>
            </div>
            <div>
              <div className="mb-3 px-4 pt-5 sm:px-5 md:px-6 md:pt-6">
                <h3 className="font-medium">Readymade Blocks for you to use</h3>
                <p className="text-muted-foreground">
                  Easly use any block you like and use it in your project.
                </p>
              </div>
              <div className="h-px border-t border-dashed"></div>
              <ul className="text-muted-foreground">
                <li className="flex items-start gap-2 px-4 py-3 sm:px-5 md:px-6">
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  Prebuilt blocks built with shadcn/ui & TailwindCSS
                </li>
                <div className="h-px border-t border-dashed"></div>
                <li className="flex items-start gap-2 px-4 py-3 sm:px-5 md:px-6">
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  Synced with your project theme and design with easy to
                  customize features
                </li>
                <div className="h-px border-t border-dashed"></div>
                <li className="flex items-start gap-2 px-4 py-3 sm:px-5 md:px-6">
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  Various blocks to choose from with high performance and speed
                </li>
              </ul>
              <div className="h-px border-t border-dashed"></div>
              <a
                href="#"
                className="my-3 flex items-center gap-2 px-4 font-medium sm:my-4 sm:px-5 md:px-6"
              >
                Read more
                <ChevronRight className="mt-0.5 size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature22 };

```

```tsx
import { Blocks, ChartPie, Filter, UsersRound } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature101Props {
  className?: string;
}

const Feature101 = ({ className }: Feature101Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="gap mx-auto flex max-w-xl flex-col justify-center gap-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">Our Capabilities</h1>
          <p className="text-xl text-muted-foreground">
            Discover the full potential of our platform&apos;s advanced
            capabilities
          </p>
        </div>
        <div className="mx-auto mt-20 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col justify-between gap-6 rounded-lg bg-muted/70 p-8 md:col-span-2 lg:row-span-2">
            <div>
              <Blocks className="mb-6 h-auto w-11" strokeWidth={1.5} />
              <h2 className="mb-1 text-2xl font-medium">
                Seamless Integration
              </h2>
              <p className="text-muted-foreground">
                Connect effortlessly with various data sources.
              </p>
            </div>
            <img
              src="https://cdn.ing/assets/files/record/286199/em26dugzamyy0nlbqdqq5r9h0xx8"
              alt="integration feature"
              className="ml-auto max-h-80 w-full rounded-lg object-cover transition-transform duration-300 hover:-translate-y-3 sm:w-11/12"
            />
          </div>
          <div className="flex h-80 flex-col justify-between gap-4 rounded-lg bg-muted/70 p-8">
            <Filter className="mb-6 h-auto w-11" strokeWidth={1.5} />
            <div>
              <h2 className="mb-1 text-2xl font-medium">Data Refinement</h2>
              <p className="text-muted-foreground">
                Ensure clean and reliable data for actionable insights.
              </p>
            </div>
          </div>
          <div className="flex h-80 flex-col justify-between gap-4 rounded-lg bg-muted/70 p-8">
            <ChartPie className="mb-6 h-auto w-11" strokeWidth={1.5} />
            <div>
              <h2 className="mb-1 text-2xl font-medium">Visual Analytics</h2>
              <p className="text-muted-foreground">
                Transform data into impactful visual stories.
              </p>
            </div>
          </div>
          <div className="flex h-80 flex-col justify-between gap-4 rounded-lg bg-muted/70 p-8">
            <UsersRound className="mb-6 h-auto w-11" strokeWidth={1.5} />
            <div>
              <h2 className="mb-1 text-2xl font-medium">Team Collaboration</h2>
              <p className="text-muted-foreground">
                Work together to make informed decisions.
              </p>
            </div>
          </div>
          <div className="flex h-80 flex-col-reverse justify-between gap-4 rounded-lg bg-muted/70 p-8 lg:col-span-2 lg:grid lg:grid-cols-2">
            <div className="lg:self-end">
              <h2 className="mb-1 text-2xl font-medium">Unified Platform</h2>
              <p className="text-muted-foreground">
                Centralize your processes and optimize efficiency.
              </p>
            </div>
            <img
              src="https://cdn.ing/assets/files/record/286199/em26dugzamyy0nlbqdqq5r9h0xx8"
              alt="platform feature"
              className="h-full min-h-0 rounded-lg object-cover transition-transform duration-300 hover:-translate-y-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature101 };

```

```tsx
import { cn } from "@/lib/utils";

interface Feature102Props {
  className?: string;
}

const Feature102 = ({ className }: Feature102Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col justify-center gap-7 md:text-center">
          <h2 className="text-2xl md:text-4xl">Launch with Assurance</h2>
          <p className="text-sm text-muted-foreground md:text-base">
            Simplify your workflow with our tools that provide clear insights,
            minimizing the complexity of managing intricate deployment data.
          </p>
        </div>
        <div className="mx-auto mt-14 flex max-w-5xl flex-col gap-4 lg:px-16">
          <div className="flex flex-col items-center justify-between min-[960px]:flex-row min-[960px]:gap-10">
            <div className="flex gap-4 min-[960px]:max-w-md">
              <div className="flex flex-col items-center justify-between gap-1">
                <span className="h-20 shrink-0"></span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted/50 font-mono text-lg">
                  1
                </span>
                <span className="h-20 w-[3px] shrink-0 bg-linear-to-b from-transparent to-primary opacity-70"></span>
              </div>
              <div className="flex flex-col justify-center gap-5 px-0 min-[960px]:gap-6 min-[960px]:px-4 min-[960px]:py-4">
                <h3 className="text-xl min-[960px]:text-2xl">
                  Monitor Deployments live
                </h3>
                <p className="text-sm text-muted-foreground min-[960px]:text-base">
                  Track your deployments with clarity, seeing updates take place
                  as they happen.
                </p>
              </div>
            </div>
            <img
              src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
              alt="placeholder"
              className="z-10 aspect-video w-full rounded-xl border object-cover min-[960px]:max-h-56 min-[960px]:w-auto"
            />
          </div>
          <div className="flex flex-col items-center justify-between min-[960px]:flex-row min-[960px]:gap-10">
            <div className="flex gap-4 min-[960px]:max-w-md">
              <div className="relative flex flex-col items-center justify-between gap-1">
                <span className="absolute -top-8 mx-auto h-8 w-[3px] shrink-0 bg-primary opacity-70"></span>
                <span className="absolute -bottom-8 mx-auto h-8 w-[3px] shrink-0 bg-primary opacity-70"></span>
                <span className="h-20 w-[3px] shrink-0 bg-primary opacity-70"></span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted/50 font-mono text-lg">
                  2
                </span>
                <span className="h-20 w-[3px] shrink-0 bg-primary opacity-70"></span>
              </div>
              <div className="flex flex-col justify-center gap-5 px-0 min-[960px]:gap-6 min-[960px]:px-4 min-[960px]:py-4">
                <h3 className="text-xl min-[960px]:text-2xl">
                  Immediate Issue Detection
                </h3>

                <p className="text-sm text-muted-foreground min-[960px]:text-base">
                  Spot issues instantly and address them with precise metrics
                  for optimized performance.
                </p>
              </div>
            </div>

            <img
              src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
              alt="placeholder"
              className="z-10 max-h-56 w-full rounded-xl border object-cover min-[960px]:aspect-video min-[960px]:w-auto"
            />
          </div>
          <div className="flex flex-col items-center justify-between min-[960px]:flex-row min-[960px]:gap-10">
            <div className="flex gap-4 min-[960px]:max-w-md">
              <div className="flex flex-col items-center justify-between gap-1">
                <span className="h-20 w-[3px] shrink-0 bg-linear-to-t from-transparent to-primary opacity-70"></span>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-muted/50 font-mono text-lg">
                  3
                </span>
                <span className="h-20 shrink-0"></span>
              </div>
              <div className="flex flex-col justify-center gap-5 px-0 min-[960px]:gap-6 min-[960px]:px-4 min-[960px]:py-4">
                <h3 className="text-xl min-[960px]:text-2xl">
                  Revert to a Stable Version
                </h3>

                <p className="text-sm text-muted-foreground min-[960px]:text-base">
                  With just a few actions, revert to a previous version and
                  restore system health swiftly.
                </p>
              </div>
            </div>
            <img
              src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
              alt="placeholder"
              className="z-10 max-h-56 w-full rounded-xl border object-cover min-[960px]:aspect-video min-[960px]:w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature102 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature103Props {
  className?: string;
}

const Feature103 = ({ className }: Feature103Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-3">
          <Badge variant="outline" className="w-fit">
            CORE CAPABILITIES
          </Badge>
          <h2 className="text-2xl md:text-4xl">Discover our advanced tools</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 hover:border-primary"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-medium">
                Seamless Updates & Reversions
              </h3>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border">
                <ArrowRight className="h-auto w-4" />
              </span>
            </div>
            <p className="text-muted-foreground">
              Gain complete insight into your deployment configurations and live
              performance.
            </p>
          </a>
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 hover:border-primary"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-medium">Effortless Rollbacks</h3>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border">
                <ArrowRight className="h-auto w-4" />
              </span>
            </div>
            <p className="text-muted-foreground">
              Quickly revert to previous versions for smooth recovery.
            </p>
          </a>
          <div className="grid gap-6 md:col-span-2 md:grid-cols-3">
            <a
              href="#"
              className="flex flex-col gap-4 rounded-xl border p-6 hover:border-primary"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-medium">Configuration Insights</h3>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border">
                  <ArrowRight className="h-auto w-4" />
                </span>
              </div>
              <p className="text-muted-foreground">
                Monitor and evaluate your system settings for optimal
                performance.
              </p>
            </a>
            <a
              href="#"
              className="flex flex-col gap-4 rounded-xl border p-6 hover:border-primary"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-medium">Automated Monitoring</h3>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border">
                  <ArrowRight className="h-auto w-4" />
                </span>
              </div>
              <p className="text-muted-foreground">
                Leverage automated tracking to detect issues instantly.
              </p>
            </a>
            <a
              href="#"
              className="flex flex-col gap-4 rounded-xl border p-6 hover:border-primary"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-medium">Performance Metrics</h3>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border">
                  <ArrowRight className="h-auto w-4" />
                </span>
              </div>
              <p className="text-muted-foreground">
                Analyze detailed metrics to fine-tune your application’s
                efficiency.
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature103 };

```

```tsx
import {
  ChartArea,
  ChartNoAxesCombined,
  Layout,
  Medal,
  Monitor,
  Target,
  TrendingUp,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature104Props {
  className?: string;
}

const Feature104 = ({ className }: Feature104Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-2.5 py-1.5 text-sm"
          >
            <Medal className="h-auto w-4" />
            Highlights
          </Badge>
          <h2 className="text-center text-3xl font-semibold lg:text-4xl">
            Unlock Your Workflow Potential
          </h2>
          <p className="text-center text-muted-foreground lg:text-lg">
            Experience the benefits of streamlined processes, designed to
            enhance productivity and success.
          </p>
        </div>
        <div className="gap mt-14 grid gap-2.5 lg:grid-cols-3">
          <div className="flex flex-col gap-2.5">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex size-12 items-center justify-center rounded-md bg-muted">
                  <Target className="h-auto w-6" />
                </span>
                <h3 className="font-medium">Targeted Solutions</h3>
              </div>
              <p className="text-sm text-muted-foreground md:text-base">
                Tailored features designed to tackle specific project challenges
                with precision.
              </p>
            </div>
            <div className="gap flex flex-col gap-3 rounded-lg border p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex size-12 items-center justify-center rounded-md bg-muted">
                  <Layout className="h-auto w-6" />
                </span>
                <h3 className="font-medium">Seamless Integration</h3>
              </div>
              <p className="text-sm text-muted-foreground md:text-base">
                Effortlessly merge new technologies into existing systems to
                maintain continuity and performance.
              </p>
            </div>
            <div className="gap flex flex-col gap-3 rounded-lg border p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex size-12 items-center justify-center rounded-md bg-muted">
                  <ChartArea className="h-auto w-6" />
                </span>
                <h3 className="font-medium">Real-Time Data Insights</h3>
              </div>
              <p className="text-sm text-muted-foreground md:text-base">
                Monitor data in real-time for better decision-making and faster
                adjustments.
              </p>
            </div>
          </div>

          <img
            src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
            alt="placeholder"
            className="hidden h-full rounded-lg object-cover lg:block"
          />
          <div className="flex flex-col gap-2.5">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex size-12 items-center justify-center rounded-md bg-muted">
                  <TrendingUp className="h-auto w-6" />
                </span>
                <h3 className="font-medium">Strategic Growth</h3>
              </div>
              <p className="text-sm text-muted-foreground md:text-base">
                Leverage strategic tools to scale your business and meet
                evolving market demands.
              </p>
            </div>
            <div className="gap flex flex-col gap-3 rounded-lg border p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex size-12 items-center justify-center rounded-md bg-muted">
                  <ChartNoAxesCombined className="h-auto w-6" />
                </span>
                <h3 className="font-medium">Advanced Analytics</h3>
              </div>
              <p className="text-sm text-muted-foreground md:text-base">
                Gain deeper insights through advanced analytics to stay ahead in
                decision-making.
              </p>
            </div>
            <div className="gap flex flex-col gap-3 rounded-lg border p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex size-12 items-center justify-center rounded-md bg-muted">
                  <Monitor className="h-auto w-6" />
                </span>
                <h3 className="font-medium">Unified Control</h3>
              </div>
              <p className="text-sm text-muted-foreground md:text-base">
                Centralize management and control all aspects of your workflow
                from one platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature104 };

```

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import {
  FileSpreadsheet,
  Flag,
  Layout,
  MessagesSquare,
  Settings,
  Target,
  Timer,
  Wand,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature105Props {
  className?: string;
}

const Feature105 = ({ className }: Feature105Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-2.5 py-1.5 text-sm"
          >
            <Flag className="h-auto w-4" />
            Highlights
          </Badge>
          <h2 className="text-center text-3xl font-semibold lg:text-4xl">
            Steps to Achieve Your Goals
          </h2>
          <p className="text-center text-muted-foreground lg:text-lg">
            Discover effective strategies to maximize your potential and enhance
            performance. Our platform is designed to help you achieve your
            goals.
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-7xl">
          <Tabs defaultValue="tab-1">
            <div className="max-w-[100vw-4rem] overflow-x-auto">
              <TabsList className="mx-auto flex w-fit justify-center gap-5 border-b">
                <TabsTrigger
                  value="tab-1"
                  className="group -mb-px flex flex-col items-center gap-1.5 px-1 pb-3.5 data-[state=active]:border-b data-[state=active]:border-primary"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                    <Target className="w-7" />
                  </span>
                  <p className="text-sm text-muted-foreground">Aim</p>
                </TabsTrigger>
                <TabsTrigger
                  value="tab-2"
                  className="group -mb-px flex flex-col items-center gap-1.5 px-1 pb-3.5 data-[state=active]:border-b data-[state=active]:border-primary"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                    <Layout className="w-7" />
                  </span>
                  <p className="text-sm text-muted-foreground">Plans</p>
                </TabsTrigger>
                <TabsTrigger
                  value="tab-3"
                  className="group -mb-px flex flex-col items-center gap-1.5 px-1 pb-3.5 data-[state=active]:border-b data-[state=active]:border-primary"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                    <Wand className="w-7" />
                  </span>
                  <p className="text-sm text-muted-foreground">Execution</p>
                </TabsTrigger>
                <TabsTrigger
                  value="tab-4"
                  className="group -mb-px flex flex-col items-center gap-1.5 px-1 pb-3.5 data-[state=active]:border-b data-[state=active]:border-primary"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                    <FileSpreadsheet className="w-7" />
                  </span>
                  <p className="text-sm text-muted-foreground">Files</p>
                </TabsTrigger>
                <TabsTrigger
                  value="tab-5"
                  className="group -mb-px flex flex-col items-center gap-1.5 px-1 pb-3.5 data-[state=active]:border-b data-[state=active]:border-primary"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                    <Timer className="w-7" />
                  </span>
                  <p className="text-sm text-muted-foreground">Monitor</p>
                </TabsTrigger>
                <TabsTrigger
                  value="tab-6"
                  className="group -mb-px flex flex-col items-center gap-1.5 px-1 pb-3.5 data-[state=active]:border-b data-[state=active]:border-primary"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                    <MessagesSquare className="w-7" />
                  </span>
                  <p className="text-sm text-muted-foreground">Comms</p>
                </TabsTrigger>
                <TabsTrigger
                  value="tab-7"
                  className="group -mb-px flex flex-col items-center gap-1.5 px-1 pb-3.5 data-[state=active]:border-b data-[state=active]:border-primary"
                >
                  <span className="flex size-12 items-center justify-center rounded-md bg-muted transition-colors duration-300 group-data-[state=active]:bg-primary group-data-[state=active]:text-background">
                    <Settings className="w-7" />
                  </span>
                  <p className="text-sm text-muted-foreground">Settings</p>
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="mt-5">
              <TabsContent value="tab-1" className="aspect-video">
                <img
                  src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                  alt="placeholder"
                  className="h-full w-full rounded-xl border object-cover"
                />
              </TabsContent>
              <TabsContent value="tab-2" className="aspect-video">
                <img
                  src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                  alt="placeholder"
                  className="h-full w-full rounded-xl border object-cover"
                />
              </TabsContent>
              <TabsContent value="tab-3" className="aspect-video">
                <img
                  src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                  alt="placeholder"
                  className="h-full w-full rounded-xl border object-cover"
                />
              </TabsContent>
              <TabsContent value="tab-4" className="aspect-video">
                <img
                  src="https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx"
                  alt="placeholder"
                  className="h-full w-full rounded-xl border object-cover"
                />
              </TabsContent>
              <TabsContent value="tab-5" className="aspect-video">
                <img
                  src="https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr"
                  alt="placeholder"
                  className="h-full w-full rounded-xl border object-cover"
                />
              </TabsContent>
              <TabsContent value="tab-6" className="aspect-video">
                <img
                  src="https://cdn.ing/assets/files/record/286206/qs3jazsupq75q1fgisnonwnohie2"
                  alt="placeholder"
                  className="h-full w-full rounded-xl border object-cover"
                />
              </TabsContent>
              <TabsContent value="tab-7" className="aspect-video">
                <img
                  src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                  alt="placeholder"
                  className="h-full w-full rounded-xl border object-cover"
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature105 };

```

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Blocks, ChartPie, ChevronRight, Layout, Target } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    id: 1,
    header: "Task Coordination",
    excerpt:
      "Easily manage and organize tasks to improve your workflow efficiency.",
    icon: <Target className="h-auto w-5" />,
    title: "Master Task Coordination",
    description:
      "Learn to easily manage and organize tasks to improve workflow efficiency. Explore how this simplifies task coordination for better results.",
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    id: 2,
    header: "Team Collaboration",
    excerpt:
      "Boost teamwork with intuitive communication and collaboration tools.",
    icon: <Layout className="h-auto w-5" />,
    title: "Effective Team Collaboration",
    description:
      "Improve team collaboration and communication with intuitive tools. Learn how to streamline teamwork and achieve project success with ease.",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  {
    id: 3,
    header: "Resource Management",
    excerpt:
      "Maximize resource use for greater efficiency and project success.",
    icon: <Blocks className="h-auto w-5" />,
    title: "Efficient Resource Management",
    description:
      "Maximize resource management and efficiency. Discover how to effectively utilize resources for greater productivity and project outcomes.",
    image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
  },
  {
    id: 4,
    header: "System Integration",
    excerpt:
      "Integrate your tools seamlessly for a smoother, more efficient workflow.",
    icon: <ChartPie className="h-auto w-5" />,
    title: "Streamlined System Integration",
    description:
      "Integrate systems and tools seamlessly for smoother workflows. Learn how to improve interoperability for more efficient processes.",
    image: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
  },
];

interface Feature106Props {
  className?: string;
}

const Feature106 = ({ className }: Feature106Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Accordion
          type="multiple"
          className="flex flex-col gap-px overflow-hidden rounded-xl border bg-border lg:hidden"
        >
          {features.map((feature) => (
            <AccordionItem
              key={feature.id}
              value={feature.id.toString()}
              className="border-b-0 bg-muted px-7 py-4 data-[state=open]:bg-background"
            >
              <AccordionTrigger className="group relative items-start text-left hover:no-underline data-[state=active]:bg-background">
                <span className="absolute -top-4 bottom-0 -left-7 h-full w-[3px] bg-primary transition-opacity duration-300 group-data-[state=closed]:opacity-0"></span>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-1.5">
                    {feature.icon}
                    <span className="text-sm font-medium">
                      {feature.header}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feature.excerpt}
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-7 rounded-xl border bg-muted/50 p-5 data-[state=inactive]:hidden">
                <div>
                  <h2 className="mb-2 font-medium">{feature.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
                <img
                  src={feature.image}
                  alt="placeholder"
                  className="aspect-video max-h-[450px] rounded-xl border object-cover"
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <Tabs
          defaultValue="1"
          className="hidden grid-cols-3 gap-px overflow-hidden rounded-xl border bg-border lg:grid"
        >
          <TabsList className="flex flex-col gap-px bg-border">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id.toString()}
                className="group relative flex flex-col gap-2.5 bg-muted px-6 py-9 transition-colors duration-300 data-[state=active]:bg-background xl:py-10"
              >
                <span className="absolute top-0 bottom-0 left-0 h-full w-[3px] bg-primary transition-opacity duration-300 group-data-[state=inactive]:opacity-0"></span>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {feature.icon}
                    <span className="font-medium">{feature.header}</span>
                  </div>
                  <ChevronRight className="h-auto w-4" />
                </div>
                <p className="text-left text-muted-foreground">
                  {feature.excerpt}
                </p>
              </TabsTrigger>
            ))}
          </TabsList>
          {features.map((feature) => (
            <TabsContent
              value={feature.id.toString()}
              key={feature.id}
              className="col-span-2 flex flex-col gap-7 bg-background p-10 data-[state=inactive]:hidden"
            >
              <div>
                <h2 className="mb-2 text-2xl font-medium">{feature.title}</h2>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              <img
                src={feature.image}
                alt="placeholder"
                className="aspect-video max-h-[450px] rounded-xl object-cover"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export { Feature106 };

```

```tsx
import { ArrowRight, GitCompare } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature107Props {
  className?: string;
}

const Feature107 = ({ className }: Feature107Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="gap grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="mx-auto flex flex-col gap-4 md:col-span-2">
            <Badge
              variant="outline"
              className="flex w-fit gap-1 px-2.5 py-1.5 text-sm"
            >
              <GitCompare className="h-auto w-4" />
              Integrations
            </Badge>
            <h2 className="text-3xl font-semibold lg:text-4xl">
              Unlock Synergy, Seamless Integrations with SAP
            </h2>
            <p className="text-muted-foreground">
              Explore SAP seamless integrations with other tools and platforms,
              enhancing productivity and workflow efficiency.
            </p>
          </div>
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 transition-colors duration-300 hover:bg-muted/60"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 shrink-0 place-content-center rounded-md border">
                <img
                  src="https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb"
                  alt="placeholder"
                  className="h-auto w-7"
                />
              </span>
              <span className="flex items-center gap-1 rounded-full border px-3 py-2.5 text-sm">
                Visit Website
                <ArrowRight className="h-auto w-4 shrink-0 transition-all" />
              </span>
            </div>
            <div>
              <h3 className="font-medium md:text-lg">Mail Link</h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Quick connect your mail to preferred platform.
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 transition-colors duration-300 hover:bg-muted/60"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 shrink-0 place-content-center rounded-md border">
                <img
                  src="https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5"
                  alt="placeholder"
                  className="h-auto w-7"
                />
              </span>
              <span className="flex items-center gap-1 rounded-full border px-3 py-2.5 text-sm">
                Visit Website
                <ArrowRight className="h-auto w-4 shrink-0 transition-all" />
              </span>
            </div>
            <div>
              <h3 className="font-medium md:text-lg">Work Hub</h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Sync work details with preferred platform
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 transition-colors duration-300 hover:bg-muted/60"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 shrink-0 place-content-center rounded-md border">
                <img
                  src="https://cdn.ing/assets/files/record/286214/pn9v9zz0de8jgz2mf8o1c11k8gxh"
                  alt="placeholder"
                  className="h-auto w-7"
                />
              </span>
              <span className="flex items-center gap-1 rounded-full border px-3 py-2.5 text-sm">
                Visit Website
                <ArrowRight className="h-auto w-4 shrink-0 transition-all" />
              </span>
            </div>
            <div>
              <h3 className="font-medium md:text-lg">Task Tracker</h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Keep tabs on all your tasks effortlessly.
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 transition-colors duration-300 hover:bg-muted/60"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 shrink-0 place-content-center rounded-md border">
                <img
                  src="https://cdn.ing/assets/files/record/286235/x4po9fpjkd6cdxnfxaqya6emwvea"
                  alt="placeholder"
                  className="h-auto w-7"
                />
              </span>
              <span className="flex items-center gap-1 rounded-full border px-3 py-2.5 text-sm">
                Visit Website
                <ArrowRight className="h-auto w-4 shrink-0 transition-all" />
              </span>
            </div>
            <div>
              <h3 className="font-medium md:text-lg">Team Chat</h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Message teams with the click of a button.
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 transition-colors duration-300 hover:bg-muted/60"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 shrink-0 place-content-center rounded-md border">
                <img
                  src="https://cdn.ing/assets/files/record/286234/bldwkc8wkq6nd3hkdqds9fy5lls9"
                  alt="placeholder"
                  className="h-auto w-7"
                />
              </span>
              <span className="flex items-center gap-1 rounded-full border px-3 py-2.5 text-sm">
                Visit Website
                <ArrowRight className="h-auto w-4 shrink-0 transition-all" />
              </span>
            </div>
            <div>
              <h3 className="font-medium md:text-lg">Project Planner</h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Plan projects from milestones to completion.
              </p>
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col gap-4 rounded-xl border p-6 transition-colors duration-300 hover:bg-muted/60"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 shrink-0 place-content-center rounded-md border">
                <img
                  src="https://cdn.ing/assets/files/record/286233/176g648qa51ou4g3hfnywyldnc7a"
                  alt="placeholder"
                  className="h-auto w-7"
                />
              </span>
              <span className="flex items-center gap-1 rounded-full border px-3 py-2.5 text-sm">
                Visit Website
                <ArrowRight className="h-auto w-4 shrink-0 transition-all" />
              </span>
            </div>
            <div>
              <h3 className="font-medium md:text-lg">Board View</h3>
              <p className="text-sm text-muted-foreground md:text-base">
                View tasks in a board for easy tracking.
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { Feature107 };

```

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Layout, Pointer, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
  className?: string;
}

const Feature108 = ({
  badge = "shadcnblocks.com",
  heading = "A Collection of Components Built With Shadcn & Tailwind",
  description = "Join us to build flawless web solutions.",
  tabs = [
    {
      value: "tab-1",
      icon: <Zap className="h-auto w-4 shrink-0" />,
      label: "Boost Revenue",
      content: {
        badge: "Modern Tactics",
        title: "Make your site a true standout.",
        description:
          "Discover new web trends that help you craft sleek, highly functional sites that drive traffic and convert leads into customers.",
        buttonText: "See Plans",
        imageSrc: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
        imageAlt: "placeholder",
      },
    },
    {
      value: "tab-2",
      icon: <Pointer className="h-auto w-4 shrink-0" />,
      label: "Higher Engagement",
      content: {
        badge: "Expert Features",
        title: "Boost your site with top-tier design.",
        description:
          "Use stellar design to easily engage users and strengthen their loyalty. Create a seamless experience that keeps them coming back for more.",
        buttonText: "See Tools",
        imageSrc: "https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9",
        imageAlt: "placeholder",
      },
    },
    {
      value: "tab-3",
      icon: <Layout className="h-auto w-4 shrink-0" />,
      label: "Stunning Layouts",
      content: {
        badge: "Elite Solutions",
        title: "Build an advanced web experience.",
        description:
          "Lift your brand with modern tech that grabs attention and drives action. Create a digital experience that stands out from the crowd.",
        buttonText: "See Options",
        imageSrc: "https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0",
        imageAlt: "placeholder",
      },
    },
  ],
  className,
}: Feature108Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">{badge}</Badge>
          <h1 className="max-w-2xl text-3xl font-semibold md:text-4xl">
            {heading}
          </h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <TabsList className="container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-8 max-w-7xl rounded-2xl bg-muted/70 p-6 lg:p-16">
            <div className="relative">
              {tabs.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="grid place-items-start gap-20 lg:grid-cols-2 lg:gap-10"
                >
                  <div className="flex flex-col gap-5">
                    <Badge variant="outline" className="w-fit bg-background">
                      {tab.content.badge}
                    </Badge>
                    <h3 className="text-3xl font-semibold lg:text-5xl">
                      {tab.content.title}
                    </h3>
                    <p className="text-muted-foreground lg:text-lg">
                      {tab.content.description}
                    </p>
                    <Button className="mt-2.5 w-fit gap-2" size="lg">
                      {tab.content.buttonText}
                    </Button>
                  </div>
                  <div className="relative h-[300px] w-full lg:h-[400px]">
                    <img
                      src={tab.content.imageSrc}
                      alt={tab.content.imageAlt}
                      className="h-full w-full rounded-xl object-cover"
                      width={600}
                      height={400}
                    />
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { Feature108 };

```

```tsx
import { ChevronRight, Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Feature109Props {
  className?: string;
}

const Feature109 = ({ className }: Feature109Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid place-items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Badge variant="outline" className="w-fit bg-background">
              Modern Tactics
            </Badge>
            <h3 className="text-3xl font-semibold lg:text-5xl">
              Make your site a true standout.
            </h3>
            <p className="text-muted-foreground lg:text-lg">
              Discover new web trends that help you craft sleek, highly
              functional sites that drive traffic and convert leads into
              customers.
            </p>
            <Button className="mt-2.5 w-fit gap-2" size="lg">
              View Features
              <Menu className="h-auto w-4" />
            </Button>
          </div>
          <div className="relative rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1567320743368-9db24e12ebf0?q=80&w=2039&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="rounded-xl object-cover md:aspect-video lg:aspect-auto"
            />
            <div className="absolute top-0 right-0 bottom-0 left-0 rounded-xl bg-linear-to-t from-primary via-transparent to-transparent"></div>
            <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
              <span className="ml-auto flex w-fit items-center gap-2 rounded-full bg-background/30 px-4 py-2.5 text-sm font-semibold backdrop-blur-sm">
                <Avatar className="size-7 rounded-full">
                  <AvatarImage
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                    alt="placeholder"
                  />
                </Avatar>
                Tailored for experts
              </span>
              <div className="flex flex-col gap-5 text-background">
                <h4 className="text-lg font-semibold lg:text-3xl">
                  Elevate your platform to the next level.
                </h4>
                <a href="#" className="flex items-center gap-1 font-medium">
                  Explore all features
                  <ChevronRight className="h-auto w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature109 };

```

```tsx
"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Atom, ChevronRight, ShieldCheck, Star, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

interface Feature110Props {
  className?: string;
}

const Feature110 = ({ className }: Feature110Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
          <Badge variant="outline">High Standards</Badge>
          <h2 className="text-3xl font-semibold md:text-5xl">
            Create, Motivate, and Succeed
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Join the journey to build intricately crafted digital solutions.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-7 md:grid-cols-2">
          <div className="flex flex-col gap-7">
            <div className="rounded-xl border bg-muted p-8 md:p-10">
              <div className="mb-7 flex flex-wrap items-center gap-2.5">
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-background px-2.5 py-1.5 text-sm font-semibold"
                >
                  <Zap className="h-auto w-4" />
                  Fast
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-background px-2.5 py-1.5 text-sm font-semibold"
                >
                  <ShieldCheck className="h-auto w-4" />
                  Solid
                </Badge>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-background px-2.5 py-1.5 text-sm font-semibold"
                >
                  <Atom className="h-auto w-4" />
                  Sleek
                </Badge>
              </div>
              <h3 className="mb-2.5 font-semibold md:text-xl">
                Dynamic Features
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Elevate your website with advanced design tools and interactive
                options.
              </p>
              <a
                href="#"
                className="mt-5 flex items-center gap-1 text-sm font-medium md:text-base"
              >
                View all capabilities
                <ChevronRight className="h-auto w-4" />
              </a>
            </div>
            <div className="rounded-xl border bg-muted pb-8 md:pb-10">
              <div className="p-8 md:p-10">
                <div className="mb-2.5 flex items-center justify-between">
                  <h3 className="font-semibold md:text-xl">Premium Quality</h3>
                  <Badge variant="outline" className="bg-background">
                    Special Access
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground md:text-base">
                  Get the best of both worlds with our high-quality designs.
                </p>
              </div>

              <Carousel
                opts={{
                  loop: true,
                }}
                plugins={[
                  AutoScroll({
                    speed: 0.8,
                  }),
                ]}
                className="relative max-w-[calc(100vw-64px)] overflow-hidden"
              >
                <CarouselContent className="">
                  <CarouselItem className="w-fit basis-auto sm:basis-1/5">
                    <Avatar className="size-14 rounded-full ring-1 ring-input">
                      <AvatarImage
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                        alt="placeholder"
                      />
                    </Avatar>
                  </CarouselItem>
                  <CarouselItem className="w-fit basis-auto sm:basis-1/5">
                    <Avatar className="size-14 rounded-full ring-1 ring-input">
                      <AvatarImage
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp"
                        alt="placeholder"
                      />
                    </Avatar>
                  </CarouselItem>
                  <CarouselItem className="w-fit basis-auto sm:basis-1/5">
                    <Avatar className="size-14 rounded-full ring-1 ring-input">
                      <AvatarImage
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp"
                        alt="placeholder"
                      />
                    </Avatar>
                  </CarouselItem>
                  <CarouselItem className="w-fit basis-auto sm:basis-1/5">
                    <Avatar className="size-14 rounded-full ring-1 ring-input">
                      <AvatarImage
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp"
                        alt="placeholder"
                      />
                    </Avatar>
                  </CarouselItem>
                  <CarouselItem className="w-fit basis-auto sm:basis-1/5">
                    <Avatar className="size-14 rounded-full ring-1 ring-input">
                      <AvatarImage
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp"
                        alt="placeholder"
                      />
                    </Avatar>
                  </CarouselItem>
                  <CarouselItem className="w-fit basis-auto sm:basis-1/5">
                    <Avatar className="size-14 rounded-full ring-1 ring-input">
                      <AvatarImage
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp"
                        alt="placeholder"
                      />
                    </Avatar>
                  </CarouselItem>
                  <CarouselItem className="w-fit basis-auto sm:basis-1/5">
                    <Avatar className="size-14 rounded-full ring-1 ring-input">
                      <AvatarImage
                        src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-7.webp"
                        alt="placeholder"
                      />
                    </Avatar>
                  </CarouselItem>
                </CarouselContent>
                <div className="absolute inset-0 bg-linear-to-r from-muted via-transparent to-muted"></div>
              </Carousel>
            </div>
          </div>
          <div className="flex flex-col gap-7">
            <div className="rounded-xl border bg-muted p-8 md:p-10">
              <div className="mb-2.5 flex items-center gap-1">
                <Star className="h-auto w-5 fill-primary" />
                <Star className="h-auto w-5 fill-primary" />
                <Star className="h-auto w-5 fill-primary" />
                <Star className="h-auto w-5 fill-primary" />
                <Star className="h-auto w-5 fill-primary" />
              </div>
              <p className="mb-7 text-sm text-muted-foreground">
                From 15k+ users
              </p>
              <h3 className="mb-2.5 font-semibold md:text-xl">
                Unmatched Organization
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Discover streamlined features for quick edits and optimal
                results.
              </p>
            </div>
            <div className="rounded-xl border bg-muted p-8 md:p-10">
              <div className="mb-14 flex justify-end">
                <Badge variant="outline" className="bg-background">
                  Exclusive
                </Badge>
              </div>
              <h3 className="mb-2.5 font-semibold md:text-xl">
                Highly Structured
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">
                Check out our versatile template for speedy updates and exports!
              </p>
              <a
                href="#"
                className="mt-5 flex items-center gap-1 text-sm font-medium md:text-base"
              >
                Explore all features
                <ChevronRight className="h-auto w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature110 };

```

```tsx
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature111Props {
  className?: string;
}

const Feature111 = ({ className }: Feature111Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
          <Badge variant="outline">High Standards</Badge>
          <h2 className="text-3xl font-semibold md:text-5xl">
            Create, Motivate, and Succeed
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Join the journey to build intricately crafted digital solutions.
          </p>
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-medium md:text-base"
          >
            View all capabilities
            <ChevronRight className="h-auto w-4" />
          </a>
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-2">
          <div className="-mx-7 rounded-lg bg-muted px-14 pt-7 md:mx-0">
            <div className="mx-auto flex flex-col items-center gap-2.5 text-center md:gap-5">
              <Badge variant="outline" className="bg-background">
                Premium
              </Badge>
              <h2 className="text-lg font-semibold md:text-3xl">
                For Entrepreneurs
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Discover the potential of innovative web design.
              </p>
              <a
                href="#"
                className="flex items-center gap-1 text-sm font-medium md:text-base"
              >
                Sign Up
                <ChevronRight className="h-auto w-4" />
              </a>
              <img
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                alt="placeholder"
                className="mt-5 max-h-[400px] rounded-t-lg"
              />
            </div>
          </div>
          <div className="-mx-7 rounded-lg bg-muted px-14 pt-7 md:mx-0">
            <div className="mx-auto flex flex-col items-center gap-2.5 text-center md:gap-5">
              <Badge variant="outline" className="bg-background">
                Featured
              </Badge>
              <h2 className="text-lg font-semibold md:text-3xl">
                For Businesses
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Build an exceptional digital presence today.
              </p>
              <a
                href="#"
                className="flex items-center gap-1 text-sm font-medium md:text-base"
              >
                Get Started
                <ChevronRight className="h-auto w-4" />
              </a>
              <img
                src="https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9"
                alt="placeholder"
                className="mt-5 max-h-[400px] rounded-t-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature111 };

```

```tsx
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature112Props {
  className?: string;
}

const Feature112 = ({ className }: Feature112Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center">
          <Badge variant="outline">High Standards</Badge>
          <h2 className="text-3xl font-semibold md:text-5xl">
            Create, Motivate, and Succeed
          </h2>
          <p className="text-muted-foreground md:text-lg">
            Join the journey to build intricately crafted digital solutions.
          </p>
          <a
            href="#"
            className="flex items-center gap-1 text-sm font-medium md:text-base"
          >
            View all capabilities
            <ChevronRight className="h-auto w-4" />
          </a>
        </div>
        <div className="mt-20 grid gap-6 md:grid-cols-3 lg:gap-10">
          <div className="flex flex-col rounded-lg border">
            <img
              src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
              alt="placeholder"
              className="aspect-video size-full rounded-t-lg object-cover"
            />
            <div className="p-6">
              <h3 className="mb-2.5 font-semibold md:text-xl">
                Innovative Communication
              </h3>
              <a href="#" className="flex items-center gap-1 text-sm">
                Lear more
                <ChevronRight className="h-auto w-4" />
              </a>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border">
            <img
              src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
              alt="placeholder"
              className="aspect-video size-full rounded-t-lg object-cover"
            />
            <div className="p-6">
              <h3 className="mb-2.5 font-semibold md:text-xl">
                High-Quality Resources
              </h3>
              <a href="#" className="flex items-center gap-1 text-sm">
                Lear more
                <ChevronRight className="h-auto w-4" />
              </a>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border">
            <img
              src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
              alt="placeholder"
              className="aspect-video size-full rounded-t-lg object-cover"
            />
            <div className="p-6">
              <h3 className="mb-2.5 font-semibold md:text-xl">
                Grow Your Audience
              </h3>
              <a href="#" className="flex items-center gap-1 text-sm">
                Lear more
                <ChevronRight className="h-auto w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature112 };

```

```tsx
import { CreditCard, Layout, Menu, Pointer, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Feature113Props {
  className?: string;
}

const Feature113 = ({ className }: Feature113Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div>
        <div className="container flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">Top-notch Craft</Badge>
          <h2 className="text-3xl font-semibold md:text-4xl">Shape tomorrow</h2>
          <p className="text-muted-foreground">
            Join us to build flawless web solutions.
          </p>
        </div>
        <div>
          <Tabs defaultValue="tab-1" className="mt-14">
            <div className="container flex justify-center">
              <TabsList>
                <TabsTrigger value="tab-1" className="flex items-center gap-2">
                  <Zap className="hidden h-auto w-4 shrink-0 sm:block" />
                  Speed
                </TabsTrigger>
                <TabsTrigger value="tab-2" className="flex items-center gap-2">
                  <Pointer className="hidden h-auto w-4 shrink-0 sm:block" />
                  Flexible
                </TabsTrigger>
                <TabsTrigger value="tab-3" className="flex items-center gap-2">
                  <Layout className="hidden h-auto w-4 shrink-0 sm:block" />
                  Advanced
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="container mt-10 max-w-7xl rounded-2xl bg-muted/70 p-8 md:mt-14 lg:p-16">
              <TabsContent
                value="tab-1"
                className="mt-0 grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    Modern Tactics
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-5xl">
                    Make your site a true standout.
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    Discover new web trends that help you craft sleek, highly
                    functional sites that drive traffic and convert leads into
                    customers.
                  </p>
                  <Button className="mt-2.5 w-fit gap-2" size="lg">
                    See Plans
                    <CreditCard className="h-auto w-4" />
                  </Button>
                </div>
                <img
                  src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                  alt="placeholder"
                  className="max-h-96 rounded-xl"
                />
              </TabsContent>
              <TabsContent
                value="tab-2"
                className="mt-0 grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    Expert Features
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-5xl">
                    Boost your site with top-tier design.
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    Use stellar design to easily engage users and strengthen
                    their loyalty. Create a seamless experience that keeps them
                    coming back for more.
                  </p>
                  <Button className="mt-2.5 w-fit gap-2" size="lg">
                    See Tools
                    <Menu className="h-auto w-4" />
                  </Button>
                </div>
                <img
                  src="https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9"
                  alt="placeholder"
                  className="max-h-96 rounded-xl"
                />
              </TabsContent>
              <TabsContent
                value="tab-3"
                className="mt-0 grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    Elite Solutions
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-5xl">
                    Build an advanced web experience.
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    Lift your brand with modern tech that grabs attention and
                    drives action. Create a digital experience that stands out
                    from the crowd.
                  </p>
                  <Button className="mt-2.5 w-fit gap-2" size="lg">
                    See Options
                    <Zap className="h-auto w-4" />
                  </Button>
                </div>
                <img
                  src="https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0"
                  alt="placeholder"
                  className="max-h-96 rounded-xl"
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature113 };

```

```tsx
"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import {
  Globe,
  MessagesSquare,
  MoveRight,
  PanelsTopLeft,
  PenTool,
  ScissorsLineDashed,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const features = [
  {
    title: "Pixel-Perfect",
    description: "Begin our journey to build  outstanding websites.",
    icon: <ScissorsLineDashed className="h-auto w-8 md:w-12" />,
  },
  {
    title: "SEO Optimized",
    description: "We ensure that your website ranks high on Google.",
    icon: <Globe className="h-auto w-8 md:w-12" />,
  },
  {
    title: "Responsive",
    description: "Our websites look great on any device.",
    icon: <PanelsTopLeft className="h-auto w-8 md:w-12" />,
  },
  {
    title: "Customizable",
    description: "We can tailor your website to your needs.",
    icon: <PenTool className="h-auto w-8 md:w-12" />,
  },
  {
    title: "Fast Loading",
    description: "We ensure that your website loads quickly.",
    icon: <Zap className="h-auto w-8 md:w-12" />,
  },
  {
    title: "Secure",
    description: "We take security seriously. Your data is safe with us.",
    icon: <ShieldCheck className="h-auto w-8 md:w-12" />,
  },
  {
    title: "24/7 Support",
    description: "We are always here to help you. Reach out to us.",
    icon: <MessagesSquare className="h-auto w-8 md:w-12" />,
  },
  {
    title: "User-Friendly",
    description: "We make sure that your website is easy to use.",
    icon: <Users className="h-auto w-8 md:w-12" />,
  },
];

interface Feature114Props {
  className?: string;
}

const Feature114 = ({ className }: Feature114Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-20 md:grid-cols-2">
          <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
            <span className="inline-flex items-center -space-x-4">
              <Avatar className="size-11 border lg:size-16">
                <AvatarImage
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                  alt="placeholder"
                />
              </Avatar>
              <Avatar className="size-11 border lg:size-16">
                <AvatarImage
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp"
                  alt="placeholder"
                />
              </Avatar>
              <Avatar className="size-11 border lg:size-16">
                <AvatarImage
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp"
                  alt="placeholder"
                />
              </Avatar>
            </span>
            <h1 className="text-3xl font-semibold md:text-5xl">
              Explore New Frontiers in Digital Innovation with Us
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Join our journey to craft highly optimized web experiences.
            </p>
            <Button size="lg" className="w-fit gap-2">
              View Features <MoveRight className="h-auto w-5" />
            </Button>
            <div className="grid grid-cols-2 justify-between gap-4 pt-10 text-left md:gap-20">
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-semibold md:text-5xl">85%</h2>
                <p className="text-muted-foreground md:text-lg">
                  Conversion boost
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-semibold md:text-5xl">25k+</h2>
                <p className="text-muted-foreground md:text-lg">
                  Happy Customers
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:gap-7 lg:grid-cols-2">
            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
              plugins={[
                AutoScroll({
                  speed: 0.7,
                }),
              ]}
              orientation="vertical"
              className="pointer-events-none relative lg:hidden"
            >
              <CarouselContent className="max-h-[600px]">
                {features.map((feature, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col rounded-xl border p-5 md:p-7">
                      {feature.icon}
                      <h3 className="mt-5 mb-2.5 font-semibold md:text-xl">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background"></div>
            </Carousel>
            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
              plugins={[
                AutoScroll({
                  speed: 0.7,
                }),
              ]}
              orientation="vertical"
              className="pointer-events-none relative hidden lg:block"
            >
              <CarouselContent className="max-h-[600px]">
                {features
                  .slice(0, features.length / 2)
                  .map((feature, index) => (
                    <CarouselItem key={index}>
                      <div className="flex flex-col rounded-xl border p-4 md:p-7">
                        {feature.icon}
                        <h3 className="mt-5 mb-2.5 font-semibold md:text-xl">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground md:text-base">
                          {feature.description}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background"></div>
            </Carousel>
            <Carousel
              opts={{
                loop: true,
                align: "start",
              }}
              plugins={[
                AutoScroll({
                  speed: 0.7,
                }),
              ]}
              orientation="vertical"
              className="pointer-events-none relative hidden lg:block"
            >
              <CarouselContent className="max-h-[600px]">
                {features.slice(features.length / 2).map((feature, index) => (
                  <CarouselItem key={index}>
                    <div className="flex flex-col rounded-xl border p-4 md:p-7">
                      {feature.icon}
                      <h3 className="mt-5 mb-2.5 font-semibold md:text-xl">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground md:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background"></div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature114 };

```

```tsx
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Feature115Props {
  className?: string;
}

const Feature115 = ({ className }: Feature115Props) => {
  // Define features data for mapping
  const features = [
    {
      title: "Interface",
      category: "Category",
      image: {
        src: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
        alt: "User-Friendly Interface",
      },
    },
    {
      title: "Analytics",
      category: "Category",
      image: {
        src: "https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9",
        alt: "Advanced Analytics",
      },
    },
    {
      title: "Integration",
      category: "Category",
      image: {
        src: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
        alt: "Seamless Integration",
      },
    },
    {
      title: "Customizable",
      category: "Category",
      image: {
        src: "https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9",
        alt: "Customizable Features",
      },
    },
    {
      title: "Support",
      category: "Category",
      image: {
        src: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
        alt: "Reliable Support",
      },
    },
    {
      title: "Security",
      category: "Category",
      image: {
        src: "https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9",
        alt: "Secure Data Management",
      },
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <Badge variant="outline">Exceptional Software</Badge>
          <h1 className="text-3xl font-semibold md:text-5xl">Key Features</h1>
          <p className="max-w-2xl text-muted-foreground md:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quaerat
            odit sunt eaque ex, natus vel maxime tenetur odio? Nemo.
          </p>
        </div>
        <div className="mx-auto mt-20 grid max-w-7xl gap-7 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-none bg-muted/60">
              <CardHeader className="text-center">
                <CardTitle className="text-lg font-semibold md:text-2xl">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground md:text-lg">
                  {feature.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-7 pb-7">
                <img
                  src={feature.image.src}
                  alt={feature.image.alt}
                  className="w-full rounded-xl object-cover"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature115 };

```

```tsx
import { Atom, ChevronRight, Settings, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature116Props {
  className?: string;
}

const Feature116 = ({ className }: Feature116Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="mb-4 text-center text-4xl font-semibold">
          Dynamic Layouts
        </h1>
        <p className="text-center text-muted-foreground">
          Adapt the box to suit any purpose
        </p>
        <div className="grid grid-cols-1 gap-y-5 pt-14 xl:grid-cols-3 xl:grid-rows-2 xl:gap-x-5 xl:gap-y-0">
          <a
            href="#"
            className="group relative col-span-2 row-span-3 overflow-hidden rounded-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1653288973812-81d1951b8127?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="h-full max-h-[580px] w-full rounded-xl object-cover object-center"
            />
            <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-20 rounded-xl bg-linear-to-t from-primary to-transparent transition-transform duration-300 group-hover:translate-y-0"></div>
            <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
              <span className="ml-auto flex w-fit items-center gap-1 p-2.5 text-sm font-semibold text-background">
                <Atom className="h-auto w-6" />
                Sustainability Focus
              </span>
              <div className="flex flex-col gap-5 text-background">
                <h4 className="text-2xl font-semibold lg:text-3xl">
                  Build stunning websites with ease
                </h4>
                <p className="flex items-center gap-1 font-medium">
                  Get started today
                  <ChevronRight className="h-auto w-4" />
                </p>
              </div>
            </div>
          </a>
          <div className="grid gap-y-5 xl:row-span-2">
            <a href="#" className="group relative overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1647715360138-33fb6fe68539?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="placeholder"
                className="h-full max-h-44 w-full rounded-xl object-cover object-center"
              />
              <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-10 rounded-xl bg-linear-to-t from-primary to-transparent opacity-80 transition-transform duration-300 group-hover:translate-y-0"></div>
              <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
                <span className="ml-auto flex w-fit items-center gap-1 p-2.5 text-sm font-semibold text-background">
                  <Settings className="h-auto w-6" />
                  Options
                </span>
                <div className="flex flex-col gap-5 text-background">
                  <h4 className="text-2xl font-semibold lg:text-3xl">
                    Explore now
                  </h4>
                  <p className="flex items-center gap-1 font-medium">
                    Explore all features
                    <ChevronRight className="h-auto w-4" />
                  </p>
                </div>
              </div>
            </a>
            <a
              href="#"
              className="group relative row-span-2 overflow-hidden rounded-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1563952532949-3d1a874ad614?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="placeholder"
                className="h-full max-h-96 w-full rounded-xl object-cover object-center"
              />
              <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-20 rounded-xl bg-linear-to-t from-primary to-transparent transition-transform duration-300 group-hover:translate-y-0"></div>
              <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
                <span className="ml-auto flex w-fit items-center gap-1 p-2.5 text-sm font-semibold text-background">
                  <Zap className="h-auto w-6 fill-background" />
                  Latest Collection
                </span>
                <div className="flex flex-col gap-5 text-background">
                  <h4 className="text-2xl font-semibold lg:text-3xl">
                    Redefine your industry leadership.
                  </h4>
                  <p className="flex items-center gap-1 font-medium">
                    Shop now
                    <ChevronRight className="h-auto w-4" />
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature116 };

```

```tsx
import { ChevronRight, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface Feature117Props {
  className?: string;
}

const Feature117 = ({ className }: Feature117Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="mb-4 text-center text-4xl font-semibold">
          Versatile Designs
        </h1>
        <p className="text-center text-muted-foreground">
          Personalize the box to fit your requirements
        </p>
        <div className="grid gap-5 pt-14 xl:grid-cols-3">
          <a href="#" className="group relative overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1563952532949-3d1a874ad614?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="h-full max-h-[450px] w-full rounded-xl object-cover object-center"
            />
            <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-20 rounded-xl bg-linear-to-t from-primary to-transparent transition-transform duration-300 group-hover:translate-y-0"></div>
            <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
              <span className="ml-auto flex w-fit items-center gap-1 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-background">
                <Zap className="h-auto w-6 fill-background" />
                Advanced tools
              </span>
              <div className="flex flex-col gap-5 text-background">
                <h4 className="text-2xl font-semibold lg:text-3xl">
                  Transform your website into a market leader.
                </h4>
                <p className="flex items-center gap-1 font-medium">
                  Explore all features
                  <ChevronRight className="h-auto w-4" />
                </p>
              </div>
            </div>
          </a>
          <a href="#" className="group relative overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1653288973812-81d1951b8127?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="h-full max-h-[450px] w-full rounded-xl object-cover object-center"
            />
            <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-20 rounded-xl bg-linear-to-t from-primary to-transparent transition-transform duration-300 group-hover:translate-y-0"></div>
            <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
              <span className="ml-auto flex w-fit items-center gap-2 rounded-full bg-background/30 px-4 py-2.5 text-sm font-semibold backdrop-blur-sm">
                <Avatar className="size-7 rounded-full">
                  <AvatarImage
                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp"
                    alt="placeholder"
                  />
                </Avatar>
                Tailored for experts
              </span>
              <div className="flex flex-col gap-5 text-background">
                <h4 className="text-2xl font-semibold lg:text-3xl">
                  Elevate your platform to the next level.
                </h4>
                <p className="flex items-center gap-1 font-medium">
                  Explore all features
                  <ChevronRight className="h-auto w-4" />
                </p>
              </div>
            </div>
          </a>
          <a href="#" className="group relative overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1647715360138-33fb6fe68539?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="placeholder"
              className="h-full max-h-[450px] w-full rounded-xl object-cover object-center"
            />
            <div className="absolute top-0 right-0 bottom-0 left-0 translate-y-20 rounded-xl bg-linear-to-t from-primary to-transparent transition-transform duration-300 group-hover:translate-y-0"></div>
            <div className="absolute top-0 flex h-full w-full flex-col justify-between p-7">
              <span className="ml-auto flex w-fit items-center gap-1 p-2.5 text-sm font-semibold text-background">
                <Zap className="h-auto w-6 fill-background" />
                Latest Collection
              </span>
              <div className="flex flex-col gap-5 text-background">
                <h4 className="text-2xl font-semibold lg:text-3xl">
                  Redefine your industry leadership.
                </h4>
                <p className="flex items-center gap-1 font-medium">
                  Explore all features
                  <ChevronRight className="h-auto w-4" />
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { Feature117 };

```

```tsx
import {
  CheckCircle2,
  LucideGitGraph,
  MessageSquare,
  Star,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature118Props {
  className?: string;
}

const Feature118 = ({ className }: Feature118Props) => {
  return (
    <section className={cn("bg-muted/60 py-32", className)}>
      <div className="container">
        <div className="flex flex-col gap-10">
          <div className="mx-auto flex max-w-xl flex-col gap-2.5 text-center">
            <h1 className="text-4xl font-semibold md:text-5xl">
              Key Features That Save You Time
            </h1>
            <p className="text-muted-foreground">
              Explore tools specifically built to enhance your workflow and
              boost efficiency.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-3 lg:gap-12">
            <div className="col-span-2 grid gap-7 rounded-lg bg-background p-7 md:grid-cols-2">
              <div className="flex h-full flex-col justify-between gap-3">
                <div>
                  <span className="flex size-14 items-center justify-center rounded-full bg-muted">
                    <LucideGitGraph className="h-auto w-5" />
                  </span>
                  <h2 className="mt-5 text-xl font-semibold lg:text-3xl">
                    Generate detailed reports with just a few clicks
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  Use our powerful tools to simplify reporting and make
                  data-driven decisions faster.
                </p>
              </div>
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt="placeholder"
                className="aspect-video h-full w-full rounded-xl object-cover md:aspect-auto"
              />
            </div>
            <div className="rounded-lg bg-background p-7">
              <div className="flex h-full flex-col justify-between gap-6">
                <div>
                  <span className="flex size-14 items-center justify-center rounded-full bg-muted">
                    <Zap className="h-auto w-5" />
                  </span>
                  <h2 className="mt-5 text-xl font-semibold lg:text-3xl">
                    Seamless collaboration with your team
                  </h2>
                </div>
                <ul className="flex flex-col gap-5">
                  <li className="flex gap-2">
                    <CheckCircle2 className="shrink-0" />
                    Real-time collaboration
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="shrink-0" />
                    Immediate feedback
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="shrink-0" />
                    Assign tasks effortlessly
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="grid items-center gap-12 rounded-lg bg-background p-7 md:p-10 lg:grid-cols-3">
            <h2 className="text-xl font-semibold lg:text-3xl">
              Generate detailed reports with just a few clicks
            </h2>
            <div className="flex items-center gap-5">
              <span className="text-4xl font-semibold md:text-5xl">99%</span>
              <p className="text-muted-foreground">
                Track and analyze business metrics efficiently
              </p>
            </div>
            <div className="flex items-center gap-5">
              <span className="text-4xl font-semibold md:text-5xl">5.0</span>
              <div className="flex flex-col gap-2">
                <div className="flex gap-1">
                  <Star className="fill-primary" />
                  <Star className="fill-primary" />
                  <Star className="fill-primary" />
                  <Star className="fill-primary" />
                  <Star className="fill-primary" />
                </div>
                <p className="text-muted-foreground">
                  Rated as the top-performing platform
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <MessageSquare className="h-auto w-4" />
            <p className="text-center">
              Need more info? Reach out to our team.
            </p>
            <a href="#" className="underline">
              Let&apos;s chat
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature118 };

```

```tsx
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature119Props {
  className?: string;
}

const Feature119 = ({ className }: Feature119Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col items-center gap-2.5">
            <Badge variant="outline">Your path to success</Badge>
            <h2 className="text-center text-4xl md:text-5xl">
              Get Started with Ease
            </h2>
          </div>
          <div className="grid gap-7 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
            <div className="flex gap-4">
              <span className="text-md flex size-11 shrink-0 items-center justify-center rounded-full bg-muted font-mono">
                01
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">Create an Account</h3>
                <p className="text-muted-foreground">
                  Sign up quickly and choose the best plan for your needs.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-md flex size-11 shrink-0 items-center justify-center rounded-full bg-muted font-mono">
                02
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">Set Up Integrations</h3>
                <p className="text-muted-foreground">
                  Easily connect your tools and start gathering insights.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-md flex size-11 shrink-0 items-center justify-center rounded-full bg-muted font-mono">
                03
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="text-xl font-semibold">
                  Collaborate Effortlessly
                </h3>
                <p className="text-muted-foreground">
                  Invite your team and begin working together instantly.
                </p>
              </div>
            </div>
          </div>
          <img
            src="https://cdn.ing/assets/files/record/286207/ce9ss2hob7uml3u1mn8kjvsx93ts"
            alt="placeholder"
            className="aspect-video w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Feature119 };

```

```tsx
import { cn } from "@/lib/utils";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Feature120Props {
  className?: string;
}

const Feature120 = ({ className }: Feature120Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-10 md:gap-20 lg:grid-cols-2">
          <div className="flex flex-col gap-2.5 py-8">
            <h1 className="text-4xl font-bold lg:text-5xl">
              Empower your business with the best tools
            </h1>
            <p className="text-muted-foreground">
              Explore our cutting-edge tools that help streamline processes and
              maximize efficiency.
            </p>
            <div className="flex flex-col gap-6 py-10 sm:flex-row sm:gap-16">
              <div className="flex gap-4 leading-5">
                <Avatar className="size-9 rounded-full ring-1 ring-input">
                  <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp" alt="avatar" />
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Emily Watson</p>
                  <p className="text-muted-foreground">CEO, Visionary Tech</p>
                </div>
              </div>
              <div className="flex gap-4 leading-5">
                <Avatar className="size-9 rounded-full ring-1 ring-input">
                  <AvatarImage src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp" alt="avatar" />
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium">Michael Lee</p>
                  <p className="text-muted-foreground">CTO, Visionary Tech</p>
                </div>
              </div>
            </div>
            <Button className="w-fit">Start your free trial</Button>
          </div>
          <img
            src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
            alt="placeholder"
            className="h-full max-h-[420px] w-full rounded-xl object-cover"
          />
        </div>
        <Separator className="my-12" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="mb-2 text-4xl font-semibold md:text-6xl">20+</h2>
            <p className="text-muted-foreground">
              Years of delivering excellence
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-4xl font-semibold md:text-6xl">100+</h2>
            <p className="text-muted-foreground">
              Countries where our services are available
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-4xl font-semibold md:text-6xl">25</h2>
            <p className="text-muted-foreground">
              Prestigious awards for innovation
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-4xl font-semibold md:text-6xl">&gt;30k</h2>
            <p className="text-muted-foreground">
              Thriving businesses using our platform
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature120 };

```

```tsx
"use client";

import {
  ArrowRight,
  Blocks,
  Fingerprint,
  LayoutPanelTop,
  MessageCircleMore,
  Users,
} from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface DataBlockProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Feature122Props {
  className?: string;
}

const Feature122 = ({ className }: Feature122Props) => {
  return (
    <section className={cn("container py-40", className)}>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-3">
        <DataBlock
          title="Communication"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          icon={
            <MessageCircleMore
              className="size-10 text-primary/90 md:size-12"
              strokeWidth={1.5}
            />
          }
        />
        <DataBlock
          title="Integrations"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          icon={
            <Blocks
              className="size-10 text-primary/90 md:size-12"
              strokeWidth={1.5}
            />
          }
        />
        <DataBlock
          title="Collaboration"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          icon={
            <Users
              className="size-10 text-primary/90 md:size-12"
              strokeWidth={1.5}
            />
          }
        />
        <DataBlock
          title="Customization"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          icon={
            <LayoutPanelTop
              className="size-10 text-primary/90 md:size-12"
              strokeWidth={1.5}
            />
          }
        />
        <DataBlock
          title="Security"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          icon={
            <Fingerprint
              className="size-10 text-primary/90 md:size-12"
              strokeWidth={1.5}
            />
          }
        />
        <div className="flex w-full grow flex-col gap-6 rounded-lg bg-accent/80 p-6 transition-all hover:bg-accent md:col-span-2 md:col-start-2 md:row-span-2 md:row-start-2 lg:p-10">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <h3 className="max-w-[85%] text-xl font-bold tracking-tight md:max-w-[60%] lg:text-3xl">
              Powerful Features
            </h3>
            <Button className="w-full sm:w-auto" size="lg">
              Get Started
            </Button>
          </div>
          <img
            src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
            alt="placeholder"
            className="aspect-square h-full w-full rounded-lg object-cover md:aspect-[3]"
          />
        </div>
      </div>
    </section>
  );
};

export { Feature122 };

const DataBlock: React.FC<DataBlockProps> = ({ title, description, icon }) => {
  const [isBlockHover, setBlockHover] = useState<boolean>(false);

  return (
    <a
      href="#"
      className="flex w-full cursor-pointer flex-col rounded-lg bg-accent/80 p-6 transition-all hover:bg-accent lg:p-8"
      onMouseOver={() => setBlockHover(true)}
      onMouseOut={() => setBlockHover(false)}
    >
      <h3
        className={`mb-3 w-fit border-b border-solid border-transparent text-lg font-bold tracking-tight transition lg:text-xl ${isBlockHover && "border-primary/80!"}`}
      >
        {title}
      </h3>
      <p className="mb-5 text-sm text-muted-foreground/90 lg:text-base">
        {description}
      </p>
      <div className="mt-auto flex items-end justify-between">
        <div>{icon}</div>
        <ArrowRight
          className={`size-5 h-fit text-primary/80 transition-all ${isBlockHover && "translate-x-1.5 transform"}`}
          strokeWidth={1.5}
        />
      </div>
    </a>
  );
};

```

```tsx
"use client";

import { MoveRight } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface ITabData {
  id: number;
  title: string;
  imageSrc: string;
  description: string;
}

const tabsData: ITabData[] = [
  {
    id: 1,
    title: "Performance",
    imageSrc: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
  {
    id: 2,
    title: "Innovation",
    imageSrc: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
  {
    id: 3,
    title: "Quality",
    imageSrc: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
  {
    id: 4,
    title: "Accessibility",
    imageSrc: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
  {
    id: 5,
    title: "Affordability",
    imageSrc: "https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
  {
    id: 6,
    title: "Customer Support",
    imageSrc: "https://cdn.ing/assets/files/record/286206/qs3jazsupq75q1fgisnonwnohie2",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
];

interface Feature126Props {
  className?: string;
}

const Feature126 = ({ className }: Feature126Props) => {
  const [activeTabId, setActiveTabId] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<string>(tabsData[0].imageSrc);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <span className="text-sm text-muted-foreground uppercase">
          Build with blocks
        </span>
        <h2 className="mt-4 mb-5 text-3xl font-extrabold">Our Core Features</h2>
        <div className="mb-20 flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-8">
          <a
            href="#"
            className="group flex items-center gap-2 text-muted-foreground hover:cursor-pointer"
          >
            All blocks examples
            <span className="transform transition-transform duration-300 group-hover:translate-x-2">
              <MoveRight className="size-4" />
            </span>
          </a>
          <a
            href="#"
            className="group flex items-center gap-2 text-muted-foreground hover:cursor-pointer"
          >
            All features examples
            <span className="transform transition-transform duration-300 group-hover:translate-x-2">
              <MoveRight className="size-4" />
            </span>
          </a>
        </div>

        <div className="mb-12 flex w-full items-center justify-between gap-28">
          <div className="w-full md:max-w-[400px]">
            <Accordion type="single" className="w-full" defaultValue="item-1">
              {tabsData.map((tab) => (
                <AccordionItem
                  key={tab.id}
                  value={`item-${tab.id}`}
                  className={`border-t-2 border-b-0 px-2 transition hover:bg-accent ${tab.id === activeTabId && "border-foreground"}`}
                >
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(tab.imageSrc);
                      setActiveTabId(tab.id);
                    }}
                    className="cursor-pointer py-5 no-underline! transition"
                  >
                    <h6
                      className={`text-xl font-semibold text-muted-foreground ${tab.id === activeTabId ? "text-black" : "text-muted-foreground"}`}
                    >
                      {tab.title}
                    </h6>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mt-3 text-muted-foreground">
                      {tab.description}
                    </p>
                    <div className="mt-4 md:hidden">
                      <img
                        src={tab.imageSrc}
                        alt="placeholder"
                        className="h-full max-h-80 w-full rounded-md object-cover"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative m-auto hidden w-[calc(100%-100px)] max-w-[1266px] overflow-hidden md:block">
            <div className="absolute right-0 bottom-0 left-0 z-2 h-[100px] bg-[linear-gradient(to_top,white_0%,rgba(255,255,255,0)_100%)]"></div>
            <img
              src={activeImage}
              alt="placeholder"
              className="max-h-[490px] w-full rounded-md object-cover transition-opacity duration-300"
            />
          </div>
        </div>

        <Button variant="outline">View all</Button>
      </div>
    </section>
  );
};

export { Feature126 };

```

```tsx
"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  {
    id: 1,
    tabName: "Slack",
    tabDescription:
      "Communicate with your team, share updates, project discussions all in one place",
    link: "#",
    image: "https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb",
  },
  {
    id: 2,
    tabName: "Google Drive",
    tabDescription: "Store, access, and collaborate on files with ease",
    link: "#",
    image: "https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5",
  },
  {
    id: 3,
    tabName: "Dropbox",
    tabDescription: "A reliable solution for file storage and sharing",
    link: "#",
    image: "https://cdn.ing/assets/files/record/286214/pn9v9zz0de8jgz2mf8o1c11k8gxh",
  },
  {
    id: 4,
    tabName: "Github",
    tabDescription:
      "Manage your code repositories and collaborate on development projects",
    link: "#",
    image: "https://cdn.ing/assets/files/record/286235/x4po9fpjkd6cdxnfxaqya6emwvea",
  },
];

interface Feature129Props {
  className?: string;
}

const Feature129 = ({ className }: Feature129Props) => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
          <h2 className="mb-4 text-center text-4xl font-semibold md:text-5xl">
            Unify Your flow with Integrations
          </h2>
          <p className="text-center text-lg text-muted-foreground md:text-xl">
            Streamline your processes and enhance productivity by connecting all
            your favorite apps into one unified platform.
          </p>
        </div>
        <div className="mt-12">
          <Tabs
            defaultValue="1"
            className="mx-auto flex w-full flex-col items-center gap-8"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="flex h-auto flex-wrap rounded-full p-1">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id.toString()}
                  className={`rounded-full border border-solid border-transparent px-4 py-2 text-sm font-semibold transition ${activeTab === tab.id.toString() ? "border border-solid border-border shadow-sm" : ""}`}
                >
                  {tab.tabName}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((tab) => (
              <TabsContent
                value={tab.id.toString()}
                key={tab.id}
                className="mt-0 w-full overflow-hidden rounded-2xl bg-accent px-14 pt-6 md:px-20 md:pt-8"
              >
                <div className="flex flex-col justify-between">
                  <div className="mb-8 flex flex-col items-center justify-center gap-2 md:flex-row">
                    <p className="text-sm">{tab.tabDescription}</p>
                    <a
                      href={tab.link}
                      className="font-sm border-b-2 border-solid border-border font-semibold whitespace-nowrap"
                    >
                      Learn more
                    </a>
                  </div>

                  <div className="shadow- flex w-full items-center justify-center rounded-t-2xl bg-background">
                    <img
                      src={tab.image}
                      alt={tab.tabName}
                      className="order-first w-full max-w-52 object-contain px-4 py-8 md:order-last md:max-w-64"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature129 };

```

```tsx
"use client";

import { Code, MessageCircle, Text } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature130Props {
  className?: string;
}

const Feature130 = ({ className }: Feature130Props) => {
  return (
    <section className={cn("container py-32", className)}>
      <h2 className="text-2xl font-semibold md:text-4xl">
        Various integrations to help you grow your business
      </h2>
      <div className="mt-12 mb-6 flex flex-col gap-6 xl:flex-row">
        <div className="flex w-full flex-col justify-between overflow-hidden rounded-2xl border bg-card px-12 pt-12 text-card-foreground shadow-sm">
          <div className="mb-12 flex flex-col gap-3">
            <Code className="size-6" />
            <h4 className="text-xl font-semibold">Copy paste components</h4>
            <p className="text-base font-normal text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
              laboriosam voluptatibus temporibus doloremque laudantium.
            </p>
          </div>
          <img
            src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
            alt="placeholder"
            className="max-h-52 w-full rounded-t-md object-cover shadow-[0_0_10px_rgb(0,0,0,0.2)]"
          />
        </div>
        <div className="w-full overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm">
          <div className="pr-12 pl-12 xl:pl-0">
            <img
              src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
              alt="placeholder"
              className="max-h-48 w-full rounded-br-md object-cover shadow-[0_0_10px_rgb(0,0,0,0.2)]"
            />
          </div>
          <div className="flex flex-col gap-3 p-12">
            <Text className="size-6" />
            <h4 className="text-xl font-semibold">100% customizable</h4>
            <p className="text-base font-normal text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
              laboriosam voluptatibus temporibus doloremque laudantium.
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm md:flex-row">
        <div className="flex w-full flex-col p-12 md:gap-3">
          <MessageCircle className="size-6" />
          <h4 className="text-xl font-semibold">24/7 support</h4>
          <p className="text-base font-normal text-muted-foreground">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
            laboriosam voluptatibus temporibus doloremque laudantium.
          </p>
        </div>
        <div className="w-full pl-12 md:pt-12">
          <img
            src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
            alt="placeholder"
            className="max-h-96 w-full rounded-tl-md object-cover shadow-[0_0_10px_rgb(0,0,0,0.2)]"
          />
        </div>
      </div>
    </section>
  );
};

export { Feature130 };

```

```tsx
"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ITabData {
  id: number;
  title: string;
  imageSrc: string;
  description: string;
}

const tabsData: ITabData[] = [
  {
    id: 1,
    title: "Performance",
    imageSrc: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
  {
    id: 2,
    title: "Innovation",
    imageSrc: "https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
  {
    id: 3,
    title: "Quality",
    imageSrc: "https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
];

interface Feature131Props {
  className?: string;
}

const Feature131 = ({ className }: Feature131Props) => {
  const [activeTabId, setActiveTabId] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(tabsData[0].imageSrc);

  return (
    <section className={cn("py-16 md:py-24 lg:py-32", className)}>
      <div className="container">
        <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row lg:gap-16">
          <div className="w-full md:max-w-[400px]">
            <h2 className="mb-8 text-3xl font-semibold tracking-tight md:mb-12 md:text-4xl">
              Our Core Features
            </h2>
            <Accordion
              type="single"
              defaultValue="item-1"
              className="w-full"
              onValueChange={(value) => {
                const id = parseInt(value.split("-")[1]);
                setActiveTabId(id);
                setActiveImage(
                  tabsData.find((tab) => tab.id === id)?.imageSrc ||
                    tabsData[0].imageSrc,
                );
              }}
            >
              {tabsData.map((tab) => (
                <AccordionItem
                  key={tab.id}
                  value={`item-${tab.id}`}
                  className={`border-t-2 border-b-0 px-2 transition-all duration-300 ${
                    tab.id === activeTabId
                      ? "border-primary bg-accent/40"
                      : "border-muted hover:bg-accent/20"
                  }`}
                >
                  <AccordionTrigger className="cursor-pointer py-5 no-underline! transition-all">
                    <h6
                      className={`text-xl font-semibold transition-colors duration-300 ${
                        tab.id === activeTabId
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      {tab.title}
                    </h6>
                  </AccordionTrigger>
                  <AccordionContent className="animate-accordion-down">
                    <p className="mt-3 leading-relaxed text-muted-foreground">
                      {tab.description}
                    </p>
                    <div className="mt-6 md:hidden">
                      <img
                        src={tab.imageSrc}
                        alt={tab.title}
                        className="h-full max-h-80 w-full rounded-md object-cover transition-transform duration-300"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative hidden w-full overflow-hidden rounded-md bg-accent/30 md:block">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 to-transparent"></div>
            <div className="pt-12 pl-12">
              <img
                src={activeImage}
                alt="Feature illustration"
                className="max-h-[490px] w-full rounded-tl-md object-cover transition-all duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature131 };

```

```tsx
"use client";

import { cn } from "@/lib/utils";
const itemsData = [
  {
    id: 1,
    title: "Performance",
    imageSrc: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
  {
    id: 2,
    title: "Innovation",
    imageSrc: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
  {
    id: 3,
    title: "Quality",
    imageSrc: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
  {
    id: 4,
    title: "Accessibility",
    imageSrc: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!",
  },
];

interface Feature132Props {
  className?: string;
}

const Feature132 = ({ className }: Feature132Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="mb-6 text-center text-5xl font-semibold">
          Welcome to Our Website
        </h2>
        <p className="m-auto max-w-3xl text-center text-xl text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
          doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur.
          Explicabo.
        </p>
        <a
          className="mx-auto mt-8 block w-fit rounded-full border-2 border-muted bg-background px-6 py-4 text-sm font-semibold transition hover:border-muted-foreground"
          href="#"
        >
          Get Started
        </a>
        <div className="mx-auto mt-16 flex flex-col gap-6 md:flex-row">
          {itemsData.map((item) => (
            <a className="block" href="#" key={item.id}>
              <img
                src={item.imageSrc}
                alt="placeholder"
                className="mb-6 h-full max-h-72 w-full rounded-2xl object-cover transition hover:brightness-90 lg:max-h-96"
              />
              <h6 className="mb-3 text-lg font-semibold">{item.title}</h6>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature132 };

```

```tsx
"use client";

import { Code, MessageCircle, Text } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature133Props {
  className?: string;
}

const Feature133 = ({ className }: Feature133Props) => {
  return (
    <section className={cn("container py-32", className)}>
      <h2 className="text-2xl font-semibold md:text-4xl">
        Various integrations to help you grow your business
      </h2>

      <div className="mt-12 flex flex-col gap-6 md:flex-row">
        <div className="flex w-full flex-col justify-between overflow-hidden rounded-2xl border bg-card px-12 pt-12 text-card-foreground shadow-sm">
          <div className="mb-12 flex flex-col gap-3">
            <Code className="size-6" />
            <h4 className="text-xl font-semibold">Copy paste components</h4>
            <p className="text-base font-normal text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
              laboriosam voluptatibus temporibus doloremque laudantium.
            </p>
          </div>
          <img
            src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
            alt="placeholder"
            className="max-h-52 w-full rounded-t-md object-cover shadow-lg"
          />
        </div>
        <div className="flex w-full flex-col gap-6">
          <div className="w-full overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col gap-3 p-12">
              <Text className="size-6" />
              <h4 className="text-xl font-semibold">100% customizable</h4>
              <p className="text-base font-normal text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm md:flex-row">
            <div className="flex w-full flex-col p-12 md:gap-3">
              <MessageCircle className="size-6" />
              <h4 className="text-xl font-semibold">24/7 support</h4>
              <p className="text-base font-normal text-muted-foreground">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi
                laboriosam voluptatibus temporibus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature133 };

```

```tsx
import { ArrowRight, Flame } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature134Props {
  className?: string;
}

const Feature134 = ({ className }: Feature134Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
          <Badge
            variant="outline"
            className="flex items-center gap-1 px-2.5 py-1.5 text-sm"
          >
            <Flame className="h-auto w-4" />
            Key Highlights
          </Badge>
          <h2 className="text-center text-3xl font-semibold lg:text-4xl">
            Enhance Your Workflow
          </h2>
          <p className="text-center text-muted-foreground lg:text-lg">
            Discover powerful tools to increase efficiency, simplify tasks, and
            reach your goals faster.
          </p>
        </div>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <a href="#" className="flex flex-col rounded-lg border">
            <div className="flex justify-between p-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-medium md:text-lg">
                  Easy Event Scheduling
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  Plan effortlessly with integrated scheduling for smooth
                  collaboration.
                </p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border">
                <ArrowRight className="h-auto w-4 -rotate-45" />
              </span>
            </div>
            <div className="rounded-lg p-1">
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt="placeholder"
                className="size-full max-h-72 rounded-lg border object-cover"
              />
            </div>
          </a>
          <a
            href="#"
            className="flex flex-col justify-between rounded-lg border lg:col-span-2"
          >
            <div className="flex justify-between p-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-medium md:text-lg">Unified Messaging</h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  Keep everyone connected with seamless communication tools.
                </p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border">
                <ArrowRight className="h-auto w-4 -rotate-45" />
              </span>
            </div>
            <div className="rounded-lg p-1">
              <img
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                alt="placeholder"
                className="h-full max-h-72 w-full rounded-lg border object-cover"
              />
            </div>
          </a>
          <a href="#" className="flex flex-col rounded-lg border">
            <div className="flex justify-between p-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-medium md:text-lg">Smart Alerts</h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  Get timely updates to stay organized and ahead.
                </p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border">
                <ArrowRight className="h-auto w-4 -rotate-45" />
              </span>
            </div>
            <div className="rounded-lg p-1">
              <img
                src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                alt="placeholder"
                className="size-full max-h-72 rounded-lg border object-cover"
              />
            </div>
          </a>
          <a href="#" className="flex flex-col rounded-lg border">
            <div className="flex justify-between p-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-medium md:text-lg">Fast Feedback Cycles</h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  Speed up progress with quick input and decisions.
                </p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border">
                <ArrowRight className="h-auto w-4 -rotate-45" />
              </span>
            </div>
            <div className="rounded-lg p-1">
              <img
                src="https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx"
                alt="placeholder"
                className="size-full max-h-72 rounded-lg border object-cover"
              />
            </div>
          </a>
          <a href="#" className="flex flex-col rounded-lg border">
            <div className="flex justify-between p-6">
              <div className="flex flex-col gap-1">
                <h3 className="font-medium md:text-lg">File Sharing</h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  Share and retrieve important documents with ease.
                </p>
              </div>
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border">
                <ArrowRight className="h-auto w-4 -rotate-45" />
              </span>
            </div>
            <div className="rounded-lg p-1">
              <img
                src="https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr"
                alt="placeholder"
                className="size-full max-h-72 rounded-lg border object-cover"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export { Feature134 };

```

```tsx
import type { LucideIcon } from "lucide-react";
import {
  Calendar,
  Check,
  Infinity as InfinityIcon,
  ListChecks,
  MessagesSquare,
  Star,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Highlight {
  icon: LucideIcon;
  text: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface Feature135Props {
  className?: string;
}

const Feature135 = ({ className }: Feature135Props) => {
  const highlights: Highlight[] = [
    {
      icon: Check,
      text: "User-Friendly Interface for Easy Navigation",
    },
    {
      icon: Check,
      text: "Real-time Collaboration for Smooth Teamwork",
    },
    {
      icon: Check,
      text: "Powerful Insights for Informed Decisions",
    },
    {
      icon: Check,
      text: "Strong Data Protection for Secure Operations",
    },
  ];

  const features: Feature[] = [
    {
      icon: Calendar,
      title: "Task Management Simplified",
      description:
        "Keep track of tasks, assign priorities, and monitor progress easily to stay organized and on schedule.",
    },
    {
      icon: MessagesSquare,
      title: "Unified Messaging System",
      description:
        "Communicate efficiently with an intuitive messaging system that supports teams of all sizes and locations.",
    },
    {
      icon: InfinityIcon,
      title: "Effortless Data Sync",
      description:
        "Synchronize data across multiple devices and platforms for a smooth workflow experience for all users.",
    },
    {
      icon: Users,
      title: "Team Member Management",
      description:
        "Add and manage team members with ease, ensuring smooth onboarding and collaboration processes.",
    },
    {
      icon: ListChecks,
      title: "Stay on Track with Deadlines",
      description:
        "Set reminders and deadlines to keep your team aligned and focused on key goals and objectives.",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="relative grid gap-10 lg:grid-cols-2">
          <div className="top-10 mx-auto flex h-fit max-w-3xl flex-col items-center gap-4 lg:sticky lg:items-start">
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-2.5 py-1.5 text-sm"
            >
              <Star className="h-auto w-4" />
              Key Highlights
            </Badge>
            <h2 className="text-center text-3xl font-semibold lg:text-left lg:text-4xl">
              Empower Your Workflow with Core Features
            </h2>
            <p className="text-center text-muted-foreground lg:text-left lg:text-lg">
              Maximize your productivity with essential features designed for
              seamless operations.
            </p>
            <div className="mt-6 flex flex-col gap-4">
              {highlights.map((highlight, index) => {
                return (
                  <div
                    key={`highlight-${index}`}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-auto w-4" />
                    <span className="text-muted-foreground">
                      {highlight.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={`feature-${index}`}
                  className="gap flex flex-col gap-3 rounded-lg border p-7"
                >
                  <div className="flex flex-col items-center gap-2.5 lg:flex-row">
                    <span className="flex size-12 items-center justify-center rounded-md bg-muted">
                      <Icon className="h-auto w-6" />
                    </span>
                    <h3 className="text-lg font-medium">{feature.title}</h3>
                  </div>
                  <p className="text-center text-sm text-muted-foreground md:text-base lg:text-left">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature135 };

```

```tsx
import { Calendar, Target, Trophy, Users } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Feature136Props {
  className?: string;
}

const Feature136 = ({ className }: Feature136Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid place-content-center gap-10 lg:grid-cols-2">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 lg:items-start">
            <Badge
              variant="outline"
              className="flex items-center gap-1 px-2.5 py-1.5 text-sm"
            >
              <Trophy className="h-auto w-4" />
              Key Aspects
            </Badge>
            <h2 className="text-center text-3xl font-semibold lg:text-left lg:text-4xl">
              Boost Productivity with Core Tools
            </h2>
            <p className="text-center text-muted-foreground lg:text-left lg:text-lg">
              Our platform offers dynamic tools for project management, helping
              teams work smarter and achieve success with ease. We focus on
              delivering user-friendly solutions that enhance collaboration and
              streamline operations.
            </p>

            <div className="mt-9 flex w-full flex-col justify-center gap-6 md:flex-row lg:justify-start">
              <div className="flex justify-between gap-6">
                <div className="mx-auto">
                  <p className="mb-1.5 text-3xl font-bold">4.2M+</p>
                  <p className="text-muted-foreground">Installs</p>
                </div>
                <Separator orientation="vertical" className="h-auto" />
                <div className="mx-auto">
                  <p className="mb-1.5 text-3xl font-bold">221k+</p>
                  <p className="text-muted-foreground">Users Active</p>
                </div>
              </div>
              <Separator
                orientation="vertical"
                className="hidden h-auto md:block"
              />
              <Separator orientation="horizontal" className="block md:hidden" />
              <div className="flex justify-between gap-6">
                <div className="mx-auto">
                  <p className="mb-1.5 text-3xl font-bold">4.9</p>
                  <p className="text-muted-foreground">User Rating</p>
                </div>
                <Separator orientation="vertical" className="h-auto" />
                <div className="mx-auto">
                  <p className="mb-1.5 text-3xl font-bold">40+</p>
                  <p className="text-muted-foreground">Countries</p>
                </div>
              </div>
            </div>
          </div>
          <img
            src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
            alt="placeholder"
            className="ml-auto max-h-[450px] w-full rounded-xl object-cover"
          />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6">
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                <Calendar className="h-auto w-6" />
                <h3 className="text-center text-lg font-medium lg:text-left">
                  Why Select Us?
                </h3>
              </div>
              <p className="text-center text-sm text-muted-foreground md:text-base lg:text-left">
                We provide a full set of management tools, including ways to
                collaborate easily.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6">
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                <Target className="h-auto w-6" />
                <h3 className="text-center text-lg font-medium lg:text-left">
                  Our Purpose
                </h3>
              </div>
              <p className="text-center text-sm text-muted-foreground md:text-base lg:text-left">
                Our goal is to simplify workflows and help teams achieve more
                with ease.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="gap flex flex-col gap-3 rounded-lg border p-6">
              <div className="flex flex-col items-center gap-2 lg:flex-row">
                <Users className="h-auto w-6" />
                <h3 className="text-center text-lg font-medium lg:text-left">
                  About Us
                </h3>
              </div>
              <p className="text-center text-sm text-muted-foreground md:text-base lg:text-left">
                Our team is dedicated to offering high-quality solutions with
                passion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature136 };

```

```tsx
"use client";

import { Infinity as InfinityIcon, Laptop, Zap, ZoomIn } from "lucide-react";

import { cn } from "@/lib/utils";

const items1 = [
  {
    title: "Team Spirit",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    imgSrc: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  {
    title: "Innovation",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    imgSrc: "https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9",
  },
  {
    title: "Quality",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    imgSrc: "https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0",
  },
  {
    title: "Integrity",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    imgSrc: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
];

const items2 = [
  {
    title: "Support",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat",
    icon: <InfinityIcon className="size-8" />,
  },
  {
    title: "Efficiency",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat",
    icon: <Laptop className="size-8" />,
  },
  {
    title: "Results",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat",
    icon: <Zap className="size-8" />,
  },
  {
    title: "Experience",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat",
    icon: <ZoomIn className="size-8" />,
  },
];

interface Feature137Props {
  className?: string;
}

const Feature137 = ({ className }: Feature137Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="text-4xl font-semibold">Our Values and Principles</h2>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {items1.map((item) => (
            <div
              className="overflow-hidden rounded-2xl bg-muted pb-8"
              key={item.title}
            >
              <img
                src={item.imgSrc}
                alt="placeholder"
                className="h-40 w-full object-cover"
              />
              <p className="mt-8 mb-4 px-10 text-2xl font-semibold">
                {item.title}
              </p>
              <p className="px-10 text-base text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          {items2.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col items-center justify-between gap-4 rounded-2xl p-8 sm:flex-row sm:gap-10 ${index % 2 !== 0 ? "bg-muted" : ""}`}
            >
              <div className="flex w-full gap-4">
                {item.icon}
                <p className="text-base font-semibold">{item.title}</p>
              </div>
              <p className="w-full text-base text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature137 };

```

```tsx
"use client";

import { MoveRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature138Props {
  className?: string;
}

const Feature138 = ({ className }: Feature138Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="text-4xl font-semibold">
          Built by the best and brightest
        </h2>
        <p className="mt-3 text-xl font-medium text-muted-foreground">
          Lorem ipsum dolor, sit amet
        </p>

        <div className="mt-16 flex flex-col overflow-hidden rounded-2xl bg-muted md:flex-row">
          <div className="flex w-full items-center bg-muted md:w-1/2">
            <img
              src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
              alt="placeholder"
              className="max-h-64 w-full object-cover"
            />
          </div>
          <div className="flex w-full flex-col justify-center gap-6 px-8 py-7 md:w-1/2 md:px-12 md:py-10">
            <h6 className="text-lg font-semibold md:text-2xl">
              Proven methodologies
            </h6>

            <div className="h-px w-full bg-muted-foreground" />

            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              architecto atque consequuntur perferendis ratione dolorem vitae,
              doloribus facere.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium hover:underline"
            >
              <span>Learn more</span>
              <MoveRight strokeWidth={2} className="ml-2 size-4" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col overflow-hidden rounded-2xl bg-muted md:flex-row">
          <div className="flex w-full flex-col justify-center gap-6 px-8 py-7 md:w-1/2 md:px-12 md:py-10">
            <h6 className="text-lg font-semibold md:text-2xl">
              Technologies to scale
            </h6>

            <div className="h-px w-full bg-muted-foreground" />

            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              architecto atque consequuntur perferendis ratione dolorem vitae,
              doloribus facere.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium hover:underline"
            >
              <span>Learn more</span>
              <MoveRight strokeWidth={2} className="ml-2 size-4" />
            </a>
          </div>
          <div className="flex w-full items-center bg-muted md:w-1/2">
            <img
              src="https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9"
              alt="placeholder"
              className="max-h-64 w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col overflow-hidden rounded-2xl bg-muted md:flex-row">
          <div className="flex w-full items-center bg-muted md:w-1/2">
            <img
              src="https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0"
              alt="placeholder"
              className="max-h-64 w-full object-cover"
            />
          </div>
          <div className="flex w-full flex-col justify-center gap-6 px-8 py-7 md:w-1/2 md:px-12 md:py-10">
            <h6 className="text-lg font-semibold md:text-2xl">
              A culture of innovation
            </h6>

            <div className="h-px w-full bg-muted-foreground" />

            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              architecto atque consequuntur perferendis ratione dolorem vitae,
              doloribus facere.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium hover:underline"
            >
              <span>Learn more</span>
              <MoveRight strokeWidth={2} className="ml-2 size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature138 };

```

```tsx
"use client";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const items = [
  {
    title: "Slack",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    number: 400,
  },
  {
    title: "Google Drive",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    number: 4000,
  },
  {
    title: "Dropbox",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    number: 7000,
  },
  {
    title: "Github",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    number: 850,
  },
];

interface Feature139Props {
  className?: string;
}

const Feature139 = ({ className }: Feature139Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="rounded-lg border bg-card p-10 shadow-sm">
          <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full max-w-md">
              <Badge
                variant="outline"
                className="px-3 py-2 text-muted-foreground"
              >
                The badge
              </Badge>
              <h2 className="my-5 text-2xl font-medium lg:text-4xl">
                Build your own website with our UI blocks
              </h2>
              <p className="text-sm text-muted-foreground lg:text-base">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Pariatur modi et recusandae ducimus eligendi eveniet soluta
                reprehenderit nostrum expedita omnis.
              </p>
            </div>
            <div className="w-full max-w-lg">
              <img
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                alt="placeholder"
                className="max-h-[420px] w-full rounded-lg object-cover"
              />
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 justify-between gap-12 sm:grid-cols-2 md:grid-cols-4">
            {items.map((item) => (
              <div key={item.title}>
                <p className="text-4xl text-muted-foreground">{item.number}+</p>
                <h6 className="text-5 mt-5 mb-3 font-semibold">{item.title}</h6>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature139 };

```

```tsx
"use client";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const items = [
  {
    title: "Built for artists and designers",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima doloribus illum, labore quis facilis molestias!",
    imgSrc: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  {
    title: "Built for coders and developers",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima doloribus illum, labore quis facilis molestias!",
    imgSrc: "https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9",
  },
  {
    title: "Build your own website with our UI blocks",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima doloribus illum, labore quis facilis molestias!",
    imgSrc: "https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0",
  },
];

interface Feature140Props {
  className?: string;
}

const Feature140 = ({ className }: Feature140Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Carousel className="relative w-full">
          <CarouselContent className="ease-in">
            {items.map((item) => (
              <CarouselItem key={item.title}>
                <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-muted py-20 pl-8 md:flex-row md:pl-16">
                  <div className="w-full pr-2 md:max-w-xs md:pr-0">
                    <h2 className="mb-6 text-xl font-medium sm:text-2xl md:text-5xl">
                      {item.title}
                    </h2>
                    <p className="text-sm text-muted-foreground md:text-base">
                      {item.description}
                    </p>
                  </div>
                  <div className="w-full max-w-2xl">
                    <img
                      src={item.imgSrc}
                      alt="placeholder"
                      className="h-80 max-h-[560px] w-full rounded-l-2xl object-cover md:h-full"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-16 left-16 md:bottom-11">
            <CarouselPrevious className="size-14" />
          </div>
          <div className="absolute right-16 bottom-16 md:bottom-11">
            <CarouselNext className="size-14" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export { Feature140 };

```

```tsx
"use client";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Feature144Props {
  className?: string;
}

const Feature144 = ({ className }: Feature144Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="text-center text-4xl">
          Build your website with UI blocks
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-2xl text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
          doloremque mollitia fugiat
        </p>

        <Card className="mt-20 flex flex-col gap-6 p-6 md:flex-row md:gap-8 md:p-8">
          <div className="flex w-full flex-col justify-between">
            <h6 className="text-xl md:text-3xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </h6>
            <Badge
              variant="outline"
              className="mt-4 w-fit bg-muted px-4 py-3 md:text-base"
            >
              Build website with UI blocks
            </Badge>
          </div>
          <div className="w-full">
            <img
              src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
              alt="placeholder"
              className="max-h-80 w-full rounded-lg object-cover"
            />
          </div>
        </Card>

        <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:gap-8">
          <Card className="flex w-full flex-col gap-6 p-6 md:gap-8 md:p-8">
            <div className="w-full">
              <img
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                alt="placeholder"
                className="max-h-80 w-full rounded-lg object-cover"
              />
            </div>

            <div className="flex w-full flex-col justify-between">
              <h6 className="text-xl md:text-3xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </h6>
              <Badge
                variant="outline"
                className="mt-10 w-fit bg-muted px-4 py-3 md:text-base"
              >
                Build website with UI blocks
              </Badge>
            </div>
          </Card>
          <Card className="flex w-full flex-col gap-6 p-6 md:gap-8 md:p-8">
            <div className="w-full">
              <img
                src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                alt="placeholder"
                className="max-h-80 w-full rounded-lg object-cover"
              />
            </div>

            <div className="flex w-full flex-col justify-between">
              <h6 className="text-xl md:text-3xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </h6>
              <Badge
                variant="outline"
                className="mt-10 w-fit bg-muted px-4 py-3 md:text-base"
              >
                Build website with UI blocks
              </Badge>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export { Feature144 };

```

```tsx
"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ITabData {
  id: number;
  title: string;
  imageSrc: string[];
  description: string;
}

const tabsData: ITabData[] = [
  {
    id: 1,
    title: "Title 1",
    imageSrc: [
      "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
      "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
      "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
    ],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam repellat officiis culpa, quis veniam incidunt illum vitae saepe dolore doloremque magni exercitationem aut facere eos quam odit et voluptatum dolorem?",
  },
  {
    id: 2,
    title: "Title 2",
    imageSrc: [
      "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
      "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
      "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
    ],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam repellat officiis culpa, quis veniam incidunt illum vitae saepe dolore doloremque magni exercitationem aut facere eos quam odit et voluptatum dolorem?",
  },
  {
    id: 3,
    title: "Title 3",
    imageSrc: [
      "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
      "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
      "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
    ],
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam repellat officiis culpa, quis veniam incidunt illum vitae saepe dolore doloremque magni exercitationem aut facere eos quam odit et voluptatum dolorem?",
  },
];

interface Feature145Props {
  className?: string;
}

const Feature145 = ({ className }: Feature145Props) => {
  const [activeTabId, setActiveTabId] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<string[]>(
    tabsData[0].imageSrc,
  );

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="m-auto mb-24 max-w-xl">
          <h2 className="mb-6 text-center text-3xl font-semibold lg:text-5xl">
            <span className="text-muted-foreground">Build</span> your website
            with UI blocks.
          </h2>
          <p className="m-auto max-w-3xl text-center text-lg lg:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro et,
            ipsa numquam asperiores tempora voluptatibus officia culpa eaque
            odit.
          </p>
          <a
            className="mx-auto mt-8 block w-fit rounded-full border-2 border-muted bg-background px-6 py-4 text-sm font-semibold transition hover:border-muted-foreground"
            href="#"
          >
            Get Started
          </a>
        </div>
        <div className="mb-12 flex w-full items-start justify-between gap-28">
          <div className="w-full md:w-1/2">
            <Accordion type="single" className="w-full" defaultValue="item-1">
              {tabsData.map((tab) => (
                <AccordionItem
                  key={tab.id}
                  value={`item-${tab.id}`}
                  className={`border-t-2 border-b-0 px-2 transition hover:bg-accent ${tab.id === activeTabId && "border-foreground"}`}
                >
                  <AccordionTrigger
                    onClick={() => {
                      setActiveImage(tab.imageSrc);
                      setActiveTabId(tab.id);
                    }}
                    className="cursor-pointer py-5 no-underline! transition"
                  >
                    <h6
                      className={`text-xl font-semibold ${tab.id === activeTabId ? "text-black" : "text-muted-foreground"}`}
                    >
                      {tab.title}
                    </h6>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mt-3 text-muted-foreground">
                      {tab.description}
                    </p>
                    <div className="mt-4 md:hidden">
                      <img
                        src={tab.imageSrc[0]}
                        alt="placeholder"
                        className="h-full max-h-80 w-full rounded-md object-cover"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative m-auto hidden w-1/2 overflow-hidden rounded-xl bg-muted-foreground/5 px-10 py-12 before:absolute before:inset-0 before:z-[-1] before:bg-primary/50 before:[mask-image:url('https://cdn.ing/assets/files/record/286192/7ig0cku8aqbboiza8nuk6hw0nnsr')] before:[mask-size:15px] before:[mask-repeat:repeat] md:block">
            <div className="flex min-h-96 w-full items-center justify-center px-3">
              <img
                src={activeImage[0]}
                alt="placeholder"
                className="aspect-[1.2] w-1/2 rounded-md object-cover pl-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature145 };

```

```tsx
"use client";

import { cn } from "@/lib/utils";
interface Feature146Props {
  className?: string;
}

const Feature146 = ({ className }: Feature146Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-24 flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="text-3xl font-medium md:w-1/2 lg:w-3/5 lg:text-center lg:text-5xl">
            <h1 className="text-muted-foreground">Proven methodologies.</h1>
            <h1>A culture of innovation.</h1>
          </div>
          <div className="text-left text-lg font-medium md:w-1/2 lg:w-2/5 lg:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            fuga error voluptates ut sint obcaecati reiciendis iure voluptatum
            quia.
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative flex w-full flex-col border border-solid border-muted-foreground/30 md:w-1/2 lg:w-full">
            <div className="relative flex flex-col lg:flex-row">
              <div className="absolute top-0 left-[-50px] h-[1px] w-12 border-b-[1px] border-dashed border-b-muted-foreground/30" />
              <div className="absolute top-[-50px] left-0 h-12 w-[1px] border-r-[1px] border-dashed border-r-muted-foreground/30" />
              <div className="absolute top-0 right-[-50px] h-[1px] w-12 border-b-[1px] border-dashed border-b-muted-foreground/30" />
              <div className="absolute top-[-50px] right-0 h-12 w-[1px] border-r-[1px] border-dashed border-r-muted-foreground/30" />
              <div className="flex flex-col justify-between gap-8 border-b border-solid border-muted-foreground/30 p-10 lg:w-2/5 lg:border-r lg:border-b-0">
                <div>
                  <h2 className="font-semibold">Lorem ipsum dolor sit amet</h2>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </p>
                </div>

                <img
                  src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                  alt="placeholder"
                  className="aspect-[1.45] h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between gap-8 p-10 lg:w-3/5">
                <div>
                  <h2 className="font-semibold">Lorem ipsum dolor sit amet</h2>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </p>
                </div>

                <img
                  src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                  alt="placeholder"
                  className="aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]"
                />
              </div>
            </div>
            <div className="relative border-t border-solid border-muted-foreground/30">
              <div className="absolute bottom-0 left-[-50px] h-[1px] w-12 border-b-[1px] border-dashed border-b-muted-foreground/30" />
              <div className="absolute bottom-[-50px] left-0 h-12 w-[1px] border-r-[1px] border-dashed border-r-muted-foreground/30" />
              <div className="absolute right-[-50px] bottom-0 h-[1px] w-12 border-b-[1px] border-dashed border-b-muted-foreground/30" />
              <div className="absolute right-0 bottom-[-50px] h-12 w-[1px] border-r-[1px] border-dashed border-r-muted-foreground/30" />
              <div className="flex flex-col gap-8 p-10 lg:flex-row lg:items-center">
                <div className="lg:w-1/3">
                  <h2 className="font-semibold">Lorem ipsum dolor sit amet</h2>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </p>
                </div>

                <img
                  src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                  alt="placeholder"
                  className="aspect-[1.7] h-full w-full object-cover lg:w-2/3"
                />
              </div>
            </div>
            <img
              src="https://cdn.ing/assets/files/record/286193/9yfqwdbnqaipbp7fsb3wbzzmq472"
              alt="cross"
              className="absolute top-[-4px] left-[-6px] w-3"
            />
            <img
              src="https://cdn.ing/assets/files/record/286193/9yfqwdbnqaipbp7fsb3wbzzmq472"
              alt="cross"
              className="absolute top-[-4px] right-[-6px] w-3"
            />
            <img
              src="https://cdn.ing/assets/files/record/286193/9yfqwdbnqaipbp7fsb3wbzzmq472"
              alt="cross"
              className="absolute bottom-[-8px] left-[-6px] w-3"
            />
            <img
              src="https://cdn.ing/assets/files/record/286193/9yfqwdbnqaipbp7fsb3wbzzmq472"
              alt="cross"
              className="absolute right-[-6px] bottom-[-8px] w-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature146 };

```

```tsx
"use client";

import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/card";

const integrations = [
  {
    title: "Outreach",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb",
  },
  {
    title: "Typeform",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5",
  },
  {
    title: "Slack",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://cdn.ing/assets/files/record/286214/pn9v9zz0de8jgz2mf8o1c11k8gxh",
  },
  {
    title: "Mailchimp",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://cdn.ing/assets/files/record/286235/x4po9fpjkd6cdxnfxaqya6emwvea",
  },
  {
    title: "Mixmax",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://cdn.ing/assets/files/record/286234/bldwkc8wkq6nd3hkdqds9fy5lls9",
  },
  {
    title: "Webhooks",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://cdn.ing/assets/files/record/286233/176g648qa51ou4g3hfnywyldnc7a",
  },
];

interface Feature147Props {
  className?: string;
}

const Feature147 = ({ className }: Feature147Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-24 flex flex-col items-center justify-between gap-6 lg:flex-row lg:gap-x-12">
          <div className="w-full text-center text-3xl font-medium lg:w-1/2 lg:text-left lg:text-5xl">
            <span className="text-muted-foreground">Built</span> with the latest
            technology stack
          </div>
          <div className="w-full text-center text-lg font-medium lg:w-1/2 lg:text-left lg:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            fuga error voluptates ut sint.
          </div>
        </div>
        <ul className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration, index) => (
            <li key={index}>
              <Card className="p-6">
                <img
                  src={integration.image}
                  alt={integration.title}
                  className="w-14"
                />
                <h3 className="mt-4 mb-1 text-lg font-medium">
                  {integration.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {integration.description}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export { Feature147 };

```

```tsx
"use client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const utilities = [
  {
    title: "Pass deals to Customer Success",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    title: "Closed-won deal notification",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  {
    title: "Closed won deal Slack message",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
  },
  {
    title: "Won and lost deal summary",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
  },
  {
    title: "Customer renewal date autofill",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr",
  },
  {
    title: "Stay on top of customer churn",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, corporis!",
    image: "https://cdn.ing/assets/files/record/286206/qs3jazsupq75q1fgisnonwnohie2",
  },
];

interface Feature148Props {
  className?: string;
}

const Feature148 = ({ className }: Feature148Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="m-auto mb-24 max-w-xl text-center">
          <h2 className="mb-6 text-3xl font-semibold lg:text-5xl">
            Build faster to go further.
          </h2>
          <p className="m-auto max-w-3xl text-lg lg:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <Button asChild className="mt-8 rounded-xl" size="lg">
            <a href="#">See templates library</a>
          </Button>
        </div>
        <div className="mt-11 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {utilities.map((utility, index) => (
            <Card key={index} className="border-0 pt-0">
              <img
                src={utility.image}
                alt={utility.title}
                className="aspect-video w-full rounded-t-xl object-cover"
              />
              <div className="p-5">
                <p className="mb-1 font-medium">{utility.title}</p>
                <p className="text-muted-foreground">{utility.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature148 };

```

```tsx
"use client";

import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const integrations = [
  {
    title: "CRM Solutions for Your Business",
    description:
      "Streamline your customer relationships and boost productivity with our powerful CRM software.",
    image:
      "https://images.unsplash.com/photo-1647715360138-33fb6fe68539?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonTitle: "Learn More",
  },
  {
    title: "Empowering Customer Engagement",
    description:
      "Engage with your customers like never before and drive sales with our intuitive CRM tools.",
    image:
      "https://images.unsplash.com/photo-1563952532949-3d1a874ad614?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    buttonTitle: "Get Started",
  },
];

interface Feature150Props {
  className?: string;
}

const Feature150 = ({ className }: Feature150Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="grid min-h-[400px] grid-cols-1 gap-1 lg:grid-cols-2">
        {integrations.map((item, index) => (
          <a
            key={index}
            className={`relative flex ${index === 0 ? "lg:justify-center" : "lg:justify-start"} group cursor-pointer items-center justify-start bg-muted-foreground/10 p-10`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute top-0 left-0 z-[-1] h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />

            <div className="flex max-w-sm flex-col items-start justify-center gap-10">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl text-black duration-500 group-hover:text-white">
                  {item.title}
                </h1>
                <p className="text-lg text-black duration-500 group-hover:text-white">
                  {item.description}
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-full transition-all duration-300 outline-none group-hover:bg-transparent group-hover:text-white"
              >
                {item.buttonTitle} <ArrowUpRight strokeWidth="1" />
              </Button>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export { Feature150 };

```

```tsx
"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const integrations = [
  {
    id: "1",
    image: "https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb",
    title: "Modern Development Workflow",
    description:
      "Streamline your development process with integrated tools for code review, continuous integration, and automated testing. Built for modern engineering teams.",
  },
  {
    id: "2",
    image: "https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5",
    title: "Component-Driven Architecture",
    description:
      "Build scalable applications with reusable components. Our component system helps maintain consistency while reducing development time and technical debt.",
  },
  {
    id: "3",
    image: "https://cdn.ing/assets/files/record/286214/pn9v9zz0de8jgz2mf8o1c11k8gxh",
    title: "Real-Time Collaboration",
    description:
      "Work together seamlessly with built-in version control, live previews, and collaborative editing features. Perfect for distributed teams and pair programming.",
  },
];

interface Feature156Props {
  className?: string;
}

const Feature156 = ({ className }: Feature156Props) => {
  const [cardNumber, setCardNumber] = useState(0);

  return (
    <section
      className={cn("relative overflow-hidden py-24 lg:py-32", className)}
    >
      {/* Grid Pattern with Radial Mask */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:2rem_2rem]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,transparent,white)]" />
      </div>

      <div className="relative container">
        <div className="mb-16 flex flex-col items-center gap-8">
          <h1 className="max-w-3xl text-center text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Build better software with shadcn/ui blocks
          </h1>
        </div>
        <Tabs defaultValue={cardNumber.toString()} className="space-y-16">
          <div className="relative flex h-[480px] items-center justify-center overflow-hidden rounded-2xl bg-muted backdrop-blur-sm">
            {integrations.map((item, index) => (
              <TabsContent
                value={index.toString()}
                key={index}
                className="absolute inset-0 h-full w-full"
              >
                <div className="flex h-full w-full items-center justify-center p-8">
                  <img
                    src={item.image}
                    alt={`${item.title} visualization`}
                    className="h-auto max-h-full w-auto max-w-full object-contain"
                  />
                </div>
              </TabsContent>
            ))}
          </div>
          <TabsList className="grid h-full w-full grid-cols-1 gap-8 bg-transparent p-0 lg:grid-cols-3 lg:gap-14">
            {integrations.map((item, index) => (
              <TabsTrigger
                value={index.toString()}
                key={index}
                className="group flex flex-col items-start rounded-xl border border-muted bg-background/50 p-8 shadow-sm transition-all hover:bg-muted/50 hover:shadow-md data-[state=active]:border-primary/20 data-[state=active]:bg-muted/50 data-[state=active]:shadow-md"
                onClick={() => setCardNumber(index)}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-mono text-primary group-hover:bg-primary/20 group-data-[state=active]:bg-primary/20">
                  {index + 1}
                </div>
                <h3 className="mb-3 text-xl font-semibold tracking-tight text-foreground/90 group-hover:text-foreground group-data-[state=active]:text-foreground">
                  {item.title}
                </h3>
                <p className="text-start text-sm text-pretty text-muted-foreground/80 group-hover:text-muted-foreground group-data-[state=active]:text-muted-foreground">
                  {item.description}
                </p>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </section>
  );
};

export { Feature156 };

```

```tsx
"use client";

import { cn } from "@/lib/utils";
const integrations = [
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9jsQcDsxyqA-unsplash.jpg",
    title: "Indigo Technology",
    description:
      "Enhance teamwork with our real-time collaboration tools that keep your team connected and productive.",
  },
  {
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg",
    title: "Rapid Financial",
    description:
      "Leverage powerful analytics to make informed decisions and drive your business forward.",
  },
];

interface Feature157Props {
  className?: string;
}

const Feature157 = ({ className }: Feature157Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h4 className="mb-4 text-center text-muted-foreground/50">Services</h4>
        <h1 className="mx-auto mb-12 max-w-3xl text-center text-4xl font-semibold sm:text-5xl lg:text-[56px]">
          Our customers get results and save time
        </h1>
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          {integrations.map((item, index) => (
            <a
              key={index}
              className="relative flex-auto basis-1 transition-opacity delay-150 duration-300 hover:opacity-80"
              href="#"
            >
              <img
                src={item.image}
                alt="logo"
                className="mb-6 aspect-[1.5] w-full rounded-2xl object-cover"
              />
              <div className="mb-2 text-2xl font-semibold">{item.title}</div>
              <div>{item.description}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature157 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

const integrations = [
  {
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
    text: "Our innovative budgeting tool helps users track their expenses and savings effortlessly, ensuring they stay on top of their financial goals.",
  },
  {
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
    text: "With our investment platform, users can easily manage their portfolios and make informed decisions to grow their wealth over time.",
  },
  {
    image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
    text: "Our secure payment solutions provide a seamless experience for both individuals and businesses, making transactions quick and reliable.",
  },
];

interface Feature158Props {
  className?: string;
}

const Feature158 = ({ className }: Feature158Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-12 flex flex-col items-center">
          <h4 className="mb-4 text-muted-foreground/50">
            Welcome to FinTech Innovations
          </h4>
          <h1 className="mb-6 text-center text-4xl font-semibold sm:text-5xl lg:text-[56px]">
            Transforming Finance for Everyone
          </h1>
          <h3 className="text-center text-xl">
            Discover how our solutions empower individuals and businesses to
            manage their finances effectively.
          </h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="mb-16 flex flex-col items-center justify-between gap-12 md:flex-row">
            {integrations.map((item, index) => (
              <div key={index}>
                <img
                  src={item.image}
                  alt="logo"
                  className="mb-8 aspect-[1.6] w-full rounded-2xl border border-dashed object-cover"
                />
                <p className="text-center text-sm">{item.text}</p>
              </div>
            ))}
          </div>
          <Button>View More</Button>
        </div>
      </div>
    </section>
  );
};

export { Feature158 };

```

```tsx
"use client";

import { Code, GitBranch, List, WandSparkles } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const integrations = [
  {
    image:
      "https://images.unsplash.com/photo-1653288973812-81d1951b8127?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    logo: <Code strokeWidth={1} className="h-5 w-5" />,
    title: "Build",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas laboriosam, tempore amet esse",
  },
  {
    image:
      "https://images.unsplash.com/photo-1572733438515-8f143a854f72?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    logo: <GitBranch strokeWidth={1} className="h-5 w-5" />,
    title: "Refine",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas laboriosam, tempore amet esse",
  },
  {
    image:
      "https://images.unsplash.com/photo-1546414701-81cc6963c67f?q=80&w=2144&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    logo: <List strokeWidth={1} className="h-5 w-5" />,
    title: "Work",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas laboriosam, tempore amet esse",
  },
  {
    image:
      "https://images.unsplash.com/photo-1623496258831-091279081ac5?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    logo: <WandSparkles strokeWidth={1} className="h-5 w-5" />,
    title: "Report",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas laboriosam, tempore amet esse",
  },
];

interface Feature160Props {
  className?: string;
}

const Feature160 = ({ className }: Feature160Props) => {
  const [cardNumber, setCardNumber] = useState(0);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-20 max-w-lg">
          <h1 className="mb-4 text-6xl font-bold lg:text-[52px]">
            A CRM created to be your own.
          </h1>
          <h3 className="text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
            cupiditate commodi vitae nostrum facilis qui?
          </h3>
        </div>
        <Tabs
          className="border-opacity-100 rounded-3xl border border-gray-200 px-5 pt-4 sm:px-10 sm:pt-9"
          defaultValue="0"
        >
          <TabsList className="mb-14 grid h-full grid-cols-1 gap-x-8 gap-y-6 bg-transparent p-0 md:grid-cols-2 lg:grid-cols-4">
            {integrations.map((item, index) => (
              <TabsTrigger
                key={index}
                value={index.toString()}
                onClick={() => setCardNumber(index)}
                className={`${index === cardNumber ? "opacity-100" : "opacity-50"} block cursor-pointer border-0 text-left whitespace-normal transition-all duration-500 hover:opacity-80 data-[state=active]:shadow-none`}
              >
                <div className="mb-2 flex items-center gap-2">
                  {item.logo}
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                </div>
                <p className="text-base font-medium">{item.description}</p>
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="rounded-t-[28px] p-1 pb-0">
            {integrations.map((item, index) => (
              <TabsContent value={index.toString()} key={index} className="m-0">
                <img
                  src={item.image}
                  alt="logo"
                  className="max-h-[400px] w-full rounded-t-[28px] object-cover object-bottom transition-all duration-500"
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { Feature160 };

```

```tsx
"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const integrations = [
  {
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
    title: "Sales efficiency",
  },
  {
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
    title: "Revenue metrics",
  },
  {
    image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
    title: "PLG monitoring",
  },
];

interface Feature164Props {
  className?: string;
}

const Feature164 = ({ className }: Feature164Props) => {
  const [cardNumber, setCardNumber] = useState(0);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <Tabs className="p-3 lg:w-1/2" defaultValue="0">
            <div className="mb-8">
              {integrations.map((item, index) => (
                <TabsContent key={index} value={index.toString()}>
                  <img
                    src={item.image}
                    className="aspect-[1] rounded-3xl object-cover"
                    alt={integrations[cardNumber].title}
                  />
                </TabsContent>
              ))}
            </div>
            <TabsList className="flex h-full items-center justify-center gap-2 bg-transparent p-0">
              {integrations.map((item, index) => (
                <TabsTrigger
                  key={index}
                  value={index.toString()}
                  className={`rounded-xl border px-3 py-2 ${index === cardNumber && "border-black bg-gray-50"} text-xs hover:border-black sm:text-base`}
                  onClick={() => setCardNumber(index)}
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="flex flex-col items-end justify-center p-3 lg:w-1/2">
            <div className="max-w-md">
              <h1 className="mb-4 text-3xl font-semibold sm:text-5xl">
                <span className="text-muted-foreground/50">
                  Real-time data.
                </span>{" "}
                Dynamic reporting.
              </h1>
              <p className="mb-6 text-xl">
                Quickly create reports to get deeper insights into your data
                with Attio’s powerful reporting suite.
              </p>
              <Button>Learn more</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature164 };

```

```tsx
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface Feature166Props {
  title: string;
  description: string;
  feature1: Feature;
  feature2: Feature;
  feature3: Feature;
  feature4: Feature;
  className?: string;
}

const Feature166 = ({
  title = "Blocks built with Shadcn & Tailwind",
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  feature1 = {
    title: "UI/UX Design",
    description:
      "Creating intuitive user experiences with modern interface design principles and user-centered methodologies.",
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  feature2 = {
    title: "Responsive Development",
    description:
      "Building websites that look and function perfectly across all devices and screen sizes.",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  feature3 = {
    title: "Brand Integration",
    description:
      "Seamlessly incorporating your brand identity into every aspect of your website's design.",
    image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
  },
  feature4 = {
    title: "Performance Optimization",
    description:
      "Ensuring fast loading times and smooth performance through optimized code and assets.",
    image: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
  },
  className,
}: Feature166Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mb-24 flex flex-col items-center gap-6">
          <h1 className="text-center text-3xl font-semibold lg:max-w-3xl lg:text-5xl">
            {title}
          </h1>
          <p className="text-center text-lg font-medium text-muted-foreground md:max-w-4xl lg:text-xl">
            {description}
          </p>
        </div>
        <div className="relative flex justify-center">
          <div className="border-muted2 relative flex w-full flex-col border md:w-1/2 lg:w-full">
            <div className="relative flex flex-col lg:flex-row">
              <div className="border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:w-3/5 lg:border-r lg:border-b-0">
                <h2 className="text-xl font-semibold">{feature1.title}</h2>
                <p className="text-muted-foreground">{feature1.description}</p>
                <img
                  src={feature1.image}
                  alt={feature1.title}
                  className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]"
                />
              </div>
              <div className="flex flex-col justify-between p-10 lg:w-2/5">
                <h2 className="text-xl font-semibold">{feature2.title}</h2>
                <p className="text-muted-foreground">{feature2.description}</p>
                <img
                  src={feature2.image}
                  alt={feature2.title}
                  className="mt-8 aspect-[1.45] h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="border-muted2 relative flex flex-col border-t border-solid lg:flex-row">
              <div className="border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:w-2/5 lg:border-r lg:border-b-0">
                <h2 className="text-xl font-semibold">{feature3.title}</h2>
                <p className="text-muted-foreground">{feature3.description}</p>
                <img
                  src={feature3.image}
                  alt={feature3.title}
                  className="mt-8 aspect-[1.45] h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between p-10 lg:w-3/5">
                <h2 className="text-xl font-semibold">{feature4.title}</h2>
                <p className="text-muted-foreground">{feature4.description}</p>
                <img
                  src={feature4.image}
                  alt={feature4.title}
                  className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature166 };

```

```tsx
import {
  CalendarClock,
  ChartNoAxesCombined,
  PocketKnife,
  SquarePen,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FEATURES_DATA = [
  {
    title: "Smart Task Management",
    description:
      "Create, prioritize, and delegate tasks effortlessly. AI helps you identify what matters most with smart recommendations and automated workflows.",
    icon: SquarePen,
    image: "https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb",
  },
  {
    title: "Automated Scheduling",
    description:
      "Let AI find the best time slots for meetings, reminders, and tasks based on your calendar and working habits. Stay organized without the hassle.",
    icon: CalendarClock,
    image: "https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5",
  },
  {
    title: "Personalized Insights",
    description:
      "Track your productivity with AI-powered insights. Get weekly summaries and actionable tips to improve your workflow and manage workloads better.",
    icon: ChartNoAxesCombined,
    image: "https://cdn.ing/assets/files/record/286214/pn9v9zz0de8jgz2mf8o1c11k8gxh",
  },
];
interface Feature167Props {
  className?: string;
}

const Feature167 = ({ className }: Feature167Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="border-y">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <Badge
            variant="outline"
            className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
          >
            <PocketKnife className="size-4" />
            <span>Features</span>
          </Badge>

          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Smart productivity with AI
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            Unlock smarter productivity with features that help you manage
            tasks, time, and focus—seamlessly.
          </p>
        </div>
      </div>

      <div className="container border-x px-0">
        <Tabs
          defaultValue={FEATURES_DATA[0].title}
          className="flex flex-col items-stretch gap-0 divide-y rounded-none lg:flex-row lg:divide-x lg:divide-y-0"
        >
          <TabsList className="flex h-auto w-full flex-col rounded-none border-b bg-transparent p-0 lg:w-1/3 lg:border-r lg:border-b-0">
            {FEATURES_DATA.map((item, index, array) => (
              <TabsTrigger
                key={item.title}
                value={item.title}
                className={`group relative flex w-full rounded-none px-4 py-4 text-start whitespace-normal data-[state=active]:shadow-none lg:px-6 lg:py-5 ${
                  index !== array.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="absolute bottom-[-1px] left-0 z-10 h-[2px] w-0 bg-linear-to-r from-blue-600 via-sky-300 to-transparent transition-all duration-300 group-data-[state=active]:w-1/2" />
                <div className="flex w-full flex-col">
                  <div className="flex items-center gap-1.5">
                    <item.icon className="size-4" />
                    <h3 className="text-lg tracking-[-0.36px]">{item.title}</h3>
                  </div>
                  <p className="mt-2.5 text-sm tracking-[-0.32px] text-muted-foreground lg:text-base">
                    {item.description}
                  </p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="relative flex-1">
            <div className="h-[300px] lg:h-[400px]">
              {FEATURES_DATA.map((item, index) => (
                <TabsContent
                  key={index}
                  value={item.title}
                  className="absolute inset-0 m-0 rounded-none p-6 transition-all duration-500 data-[state=inactive]:pointer-events-none data-[state=inactive]:opacity-0 lg:p-12"
                >
                  <div className="flex h-full items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={400}
                      className="h-full w-full bg-muted object-contain p-6 lg:p-12 dark:invert"
                    />
                  </div>
                </TabsContent>
              ))}
            </div>
          </div>
        </Tabs>
      </div>

      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};

export { Feature167 };

```

```tsx
import { PocketKnife } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const DATA = [
  {
    title: "Unified Scheduling",
    description:
      "Keep all your appointments and events in sync with seamless cross-platform calendar connectivity.",
    icon: "CircleHelp",
    image: "https://cdn.ing/assets/files/record/286209/4nowqz6c7v6vhzldvh9qdnhmkrwb",
  },
  {
    title: "Insightful Performance",
    description:
      "Get clear, real-time analytics tracking your progress, key milestones, focus hours, and completed tasks.",
    icon: "Volume2",
    image: "https://cdn.ing/assets/files/record/286208/nay46vdmppxuznd7eg5jnnf4qjv5",
  },
  {
    title: "Effortless Tool Integrations",
    description:
      "Link your favorite apps and services to streamline work without switching between platforms.",
    icon: "Lightbulb",
    image: "https://cdn.ing/assets/files/record/286214/pn9v9zz0de8jgz2mf8o1c11k8gxh",
  },
];
interface Feature168Props {
  className?: string;
}

const Feature168 = ({ className }: Feature168Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="border-y">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <Badge
            variant="outline"
            className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
          >
            <PocketKnife className="size-4" />
            <span>Features</span>
          </Badge>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Smart productivity with AI
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            Unlock smarter productivity with features that help you manage
            tasks, time, and focus—seamlessly.
          </p>
        </div>
      </div>
      <div className="container border-x lg:px-0!">
        <div className="items-center">
          <div className="grid flex-1 bg-border max-lg:divide-y max-lg:border-x lg:grid-cols-3 lg:gap-px">
            {DATA.map((item, index) => (
              <div
                key={index}
                className="relative isolate flex flex-col bg-background pt-5 text-start lg:pt-20"
              >
                <div className="flex-1 border-b border-border">
                  <h3 className="mt-2 px-4 text-lg font-semibold tracking-tight lg:px-8">
                    {item.title}
                  </h3>
                  <p className="px-4 pt-2 pb-6 text-muted-foreground lg:px-8">
                    {item.description}
                  </p>
                </div>
                <div className="bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="p-12 dark:invert"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};

export { Feature168 };

```

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { CircleHelp, Eye, Lightbulb, Volume2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const DATA = [
  {
    title: "Unified Scheduling",
    description:
      "Keep all your appointments and events in sync with seamless cross-platform calendar connectivity.",
    icon: CircleHelp,
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    title: "Insightful Performance",
    description:
      "Get clear, real-time analytics tracking your progress, key milestones, focus hours, and completed tasks.",
    icon: Volume2,
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  {
    title: "Effortless Tool Integrations",
    description:
      "Link your favorite apps and services to streamline work without switching between platforms.",
    icon: Lightbulb,
    image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
  },
];

interface Feature169Props {
  className?: string;
}

const Feature169 = ({ className }: Feature169Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="border-y">
        <div className="container flex flex-col gap-6 py-4 max-md:mx-0 max-md:max-w-none md:mx-8 md:mx-auto md:border-x lg:py-8">
          <Badge variant="outline">
            <Eye className="size-4" />
            <span>Optimize</span>
          </Badge>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Optimize every aspect of your day
          </h2>
          <p className="max-w-[600px] text-muted-foreground">
            Achieve seamless productivity with intelligent scheduling,
            insightful analytics, and effortless integrations.
          </p>
        </div>
      </div>
      <div className="container overflow-hidden px-0 max-md:mx-0 max-md:max-w-none md:mx-8 md:mx-auto md:border-x">
        <Tabs defaultValue={DATA[0].title}>
          <TabsList className="relative grid gap-px border-b bg-border md:grid-cols-3">
            {DATA.map((item) => (
              <TabsTrigger
                key={item.title}
                value={item.title}
                className="group relative bg-background p-6 text-left data-[state=inactive]:opacity-60 lg:p-8"
              >
                <div className="flex items-center gap-2 text-lg font-medium tracking-tight lg:text-xl">
                  <span className="grid size-6 place-items-center rounded-full bg-muted">
                    <item.icon className="size-4" />
                  </span>
                  {item.title}
                </div>
                <p className="mt-2.5 text-sm text-muted-foreground lg:text-base">
                  {item.description}
                </p>
                <span className="absolute -top-1 -left-1 hidden size-2 rounded-full border border-border bg-background md:block" />
                <span className="absolute -bottom-1 -left-1 z-10 hidden size-2 rounded-full border border-border bg-background md:block" />
                <div className="absolute -bottom-px left-0 h-px w-0 bg-linear-to-r from-blue-600 via-sky-300 to-transparent transition-all duration-300 group-data-[state=active]:w-full" />
              </TabsTrigger>
            ))}
            <span className="absolute -right-1 -bottom-1 hidden size-2 rounded-full border border-border bg-background lg:block" />
            <span className="absolute -top-1 -right-1 size-2 rounded-full border border-border bg-background" />
          </TabsList>
          {DATA.map((item) => (
            <TabsContent
              key={item.title}
              value={item.title}
              className="p-6 lg:p-10"
            >
              <img
                src={item.image}
                alt={item.title}
                className="aspect-video h-full w-full rounded-sm border border-border object-cover"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <div className="h-8 w-full border-y md:h-12 lg:h-[112px]">
        <div className="container size-full md:border-x"></div>
      </div>
    </section>
  );
};

export { Feature169 };

```

```tsx
import type { LucideIcon } from "lucide-react";
import { Blend, ChartNoAxesColumn, CircleDot, Diamond } from "lucide-react";

import { cn } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type FeatureContent = {
  title: string;
  description: string;
  image: string;
  className?: string;
};

const FEATURES: Array<{
  title: string;
  description: string;
  content: FeatureContent;
  icon: LucideIcon;
}> = [
  {
    title: "Tailored workflows",
    description: "Track progress across custom issue flows for your team.",
    content: {
      title: "Track progress across custom issue flows for your team.",
      description: `Simple, robust, and blazingly fast. Mainline is designed with developer ergonomics in mind. It's the first issue tracker your team will actually enjoy using.`,
      image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
    },
    icon: CircleDot,
  },
  {
    title: "Cross-team projects",
    description: "Collaborate across teams and departments.",
    content: {
      title: "Collaborate across teams and departments.",
      description:
        "Simple, robust, and blazingly fast. Mainline is designed with developer ergonomics in mind. It's the first issue tracker your team will actually enjoy using.",
      image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
    },
    icon: Blend,
  },
  {
    title: "Milestones",
    description: "Break projects down into concrete phases.",
    content: {
      title: "Break projects down into concrete phases.",
      description:
        "Simple, robust, and blazingly fast. Mainline is designed with developer ergonomics in mind. It's the first issue tracker your team will actually enjoy using.",
      image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
    },
    icon: Diamond,
  },
  {
    title: "Progress insights",
    description: "Track scope, velocity, and progress over time.",
    content: {
      title: "Track scope, velocity, and progress over time.",
      description:
        "Simple, robust, and blazingly fast. Mainline is designed with developer ergonomics in mind. It's the first issue tracker your team will actually enjoy using.",
      image: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
    },
    icon: ChartNoAxesColumn,
  },
];

interface Feature175Props {
  className?: string;
}

const Feature175 = ({ className }: Feature175Props) => {
  return (
    <section className={cn("py-32 dark:bg-[#2F332E]", className)}>
      <div className="container">
        <div className="flex gap-3 max-md:flex-col">
          <h2 className="flex-1 text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl">
            Streamline your resource allocation and execution
          </h2>
          <p className="flex-1 self-end text-lg font-medium text-muted-foreground">
            Streamline is built on the habits that make the best product teams
            successful: staying focused, moving quickly, and always aiming for
            high-quality work.
          </p>
        </div>

        <Tabs
          defaultValue={FEATURES[0].title}
          orientation="vertical"
          className="border-muted2 mt-8 grid grid-cols-1 gap-4 rounded-xl border p-4 md:mt-12 lg:mt-20 lg:grid-cols-4"
        >
          <TabsList className="flex h-auto flex-col justify-start rounded-xl bg-muted p-1.5">
            {FEATURES.map((feature) => (
              <TabsTrigger
                key={feature.title}
                value={feature.title}
                className="w-full justify-start rounded-lg px-4 py-3 text-start whitespace-normal text-gray-700 transition-colors duration-300 data-[state=active]:text-black data-[state=active]:shadow-xl lg:px-6 lg:py-4 dark:text-gray-300 dark:data-[state=active]:text-white"
              >
                <div>
                  <feature.icon className="size-7 md:size-8 lg:size-9" />
                  <h3 className="mt-3 font-semibold">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {FEATURES.map((feature) => (
            <TabsContent
              className={cn(
                "col-span-1 m-0 overflow-hidden rounded-xl bg-background lg:col-span-3",
                feature.content.className,
              )}
              key={feature.title}
              value={feature.title}
            >
              <div className="max-w-2xl pb-4 text-balance">
                <h4 className="inline font-semibold">
                  {feature.content.title}{" "}
                </h4>
                <span className="mt-2 font-medium text-pretty text-muted-foreground">
                  {feature.content.description}
                </span>
              </div>
              <img
                src={feature.content.image}
                alt={feature.title}
                className="h-[420px] w-full rounded-lg object-cover lg:h-[512px] lg:flex-1"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export { Feature175 };

```

```tsx
"use client";
import { ChevronUp, Flag, Pyramid, Users, Workflow, Zap } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FEATURES = [
  {
    title: "Tailored workflows",
    description: "Custom issue flows",
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
    icon: <Workflow />,
  },
  {
    title: "Cross-team projects",
    description: "Team collaboration",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
    icon: <Users />,
  },
  {
    title: "Milestones",
    description: "Concrete phases",
    image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
    icon: <Flag />,
  },
];

interface Feature184Props {
  className?: string;
}

const Feature184 = ({ className }: Feature184Props) => {
  const [activeTab, setActiveTab] = useState(FEATURES[0].title);

  return (
    <section className={cn("py-20 md:py-32", className)}>
      <div className="container mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8">
        {/* Center the heading */}
        <div className="mb-12 max-w-3xl text-center">
          <h2 className="text-2xl leading-tight font-semibold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            Explore our features
          </h2>
        </div>

        {/* Content Section */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative h-[300px] overflow-hidden rounded-xl sm:h-[420px]">
            <img
              src={FEATURES.find((f) => f.title === activeTab)?.image}
              alt={activeTab}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="relative flex flex-col justify-between">
            <Tabs
              defaultValue={FEATURES[0].title}
              onValueChange={(value) => setActiveTab(value)}
              className="h-full w-full"
            >
              <TabsList className="flex h-full flex-col gap-4 rounded-xl border-none bg-transparent p-0">
                {FEATURES.map((feature) => (
                  <TabsTrigger
                    key={feature.title}
                    value={feature.title}
                    className={cn(
                      "group flex h-full w-full flex-col items-start rounded-xl p-6 text-left transition-all",
                      "border border-border/50 bg-card hover:border-primary/50",
                      "data-[state=active]:border-primary data-[state=active]:bg-primary/95 data-[state=active]:shadow-lg",
                      "relative",
                      "data-[state=active]:scale-[1.02]",
                      "data-[state=active]:z-20",
                    )}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div
                          className={cn(
                            "rounded-lg bg-muted p-4 transition-colors",
                            "group-data-[state=active]:bg-background",
                          )}
                        >
                          {feature.icon}
                        </div>
                        <div className="flex flex-col gap-2">
                          <h3
                            className={cn(
                              "text-xl font-medium",
                              "group-data-[state=active]:text-primary-foreground",
                            )}
                          >
                            {feature.title}
                          </h3>
                          <span
                            className={cn(
                              "text-sm text-muted-foreground transition-colors",
                              "group-data-[state=active]:text-primary-foreground/90",
                            )}
                          >
                            {feature.description}
                          </span>
                        </div>
                      </div>
                      <div className="pl-8">
                        <ChevronUp
                          className={cn(
                            "size-5 text-muted-foreground transition-all duration-300",
                            "group-data-[state=active]:rotate-180 group-data-[state=active]:text-primary-foreground",
                          )}
                        />
                      </div>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Buttons row */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button className="w-full sm:w-auto">
            <Zap className="mr-2 size-4" /> Get Started
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Pyramid className="mr-2 size-4" /> Register Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Feature184 };

```

```tsx
"use client";

import { Database, LockKeyhole, Sparkles } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DataItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const DATA: DataItem[] = [
  {
    id: "feature-1",
    title: "Innovative Solutions",
    description: "Discover cutting-edge tools to revolutionize your workflow.",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
    icon: <Sparkles className="h-6 w-6 text-white" />,
  },
  {
    id: "feature-2",
    title: "Data Management",
    description: "Efficiently organize and manage your data with ease.",
    image: "https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9",
    icon: <Database className="h-6 w-6 text-white" />,
  },
  {
    id: "feature-3",
    title: "Advanced Security",
    description: "Protect your assets with state-of-the-art security features.",
    image: "https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0",
    icon: <LockKeyhole className="h-6 w-6 text-white" />,
  },
];

interface Feature186Props {
  className?: string;
}

const Feature186 = ({ className }: Feature186Props) => {
  const [selection, setSelection] = useState(DATA[0].id);

  return (
    <section className={cn("relative py-16 md:py-32", className)}>
      <div
        className="absolute top-0 right-0 left-0 z-0 h-[800px] w-screen [mask-image:radial-gradient(ellipse_at_center,white_20%,transparent_70%)] bg-repeat opacity-30"
        style={{
          backgroundImage: "url('https://cdn.ing/assets/files/record/286194/vgs88ugpvyhxu13wqgy0acvae6re')",
          backgroundSize: "60px",
        }}
      />
      <div className="relative z-10 container">
        <div>
          <h2 className="text-4xl font-medium sm:text-5xl lg:text-6xl">
            Our Key Features
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Unlock the full potential of your projects with our powerful and
            intuitive features.
          </p>

          {/* Tabs */}
          <div className="mt-4 lg:mt-8">
            <Tabs value={selection} onValueChange={setSelection}>
              <div className="relative">
                <div className="overflow-auto">
                  {/* TabsTrigger Container Aligned Left */}
                  <div className="mb-6 flex min-w-fit flex-col items-start lg:mb-8">
                    <TabsList className="gap-4 bg-transparent">
                      {DATA.map((feature) => (
                        <TabsTrigger key={feature.id} value={feature.id}>
                          {feature.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--background))_0%,transparent_10%,transparent_90%,hsl(var(--background))_100%)] md:hidden" />
                </div>
              </div>

              {/* TabsContent */}
              <div className="relative w-full overflow-hidden">
                {DATA.map((feature) => (
                  <TabsContent
                    key={feature.id}
                    value={feature.id}
                    className="relative z-20"
                  >
                    <div className="aspect-3/2 w-full rounded-lg bg-accent p-6 md:p-14 md:px-24">
                      <div className="mx-auto max-w-full md:mx-0 md:max-w-md">
                        <div className="flex size-12 items-center justify-center rounded-full bg-black">
                          {feature.icon}
                        </div>
                        <div className="my-4 md:my-8">
                          <h1 className="text-lg font-bold sm:text-xl lg:text-2xl">
                            {feature.title}
                          </h1>
                          <span className="text-base text-muted-foreground sm:text-lg lg:text-xl">
                            {feature.description}
                          </span>
                        </div>
                      </div>
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="mt-4 h-full w-full rounded-lg object-cover object-center md:mt-0"
                      />
                    </div>
                  </TabsContent>
                ))}
              </div>

              {/* Mobile Navigation Dots */}
              <div className="flex justify-center py-3 md:hidden">
                {DATA.map((feature) => (
                  <Button
                    key={feature.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelection(feature.id);
                    }}
                  >
                    <div
                      className={`size-2 rounded-full ${
                        feature.id === selection ? "bg-primary" : "bg-input"
                      }`}
                    />
                  </Button>
                ))}
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature186 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature188Props {
  className?: string;
}

const Feature188 = ({ className }: Feature188Props) => {
  const resources = [
    {
      title: "Explore ready-to-use templates",
      description:
        "Choose from hundreds of pre-designed templates tailored to your needs",
      href: "#",
      imageSrc: "https://cdn.ing/assets/files/record/286207/ce9ss2hob7uml3u1mn8kjvsx93ts",
    },
    {
      title: "Discover the power of No Code",
      description:
        "Understand how no-code platforms are revolutionizing software development",
      href: "#",
      imageSrc: "https://cdn.ing/assets/files/record/286207/ce9ss2hob7uml3u1mn8kjvsx93ts",
    },
    {
      title: "Connect with a certified expert",
      description:
        "Get professional help from our network of certified experts",
      href: "#",
      imageSrc: "https://cdn.ing/assets/files/record/286207/ce9ss2hob7uml3u1mn8kjvsx93ts",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h2 className="text-center text-4xl font-medium sm:text-5xl lg:text-6xl">
          Kickstart your journey with us
        </h2>

        <div className="mx-auto mt-12 max-w-5xl rounded-2xl border">
          {resources.map((resource, index) => (
            <div
              key={index}
              className={`${index !== resources.length - 1 ? "border-b" : ""}`}
            >
              <a
                href={resource.href}
                className="flex flex-col p-4 md:flex-row md:items-center md:justify-between lg:p-6"
              >
                <div className="flex items-center">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted p-2 lg:h-14 lg:w-14">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-semibold lg:text-xl">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground lg:text-lg">
                      {resource.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 shrink-0 md:mt-0 md:w-60">
                  <div className="aspect-w-16 aspect-h-9 rounded-lg bg-muted">
                    <img
                      src={resource.imageSrc}
                      alt={resource.title}
                      className="h-full w-full rounded-md object-cover"
                    />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature188 };

```

```tsx
"use client";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature189Props {
  className?: string;
}

const Feature189 = ({ className }: Feature189Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative mb-8 lg:mb-0">
            {/* Middle Image */}
            <div className="relative -top-12 z-10 mx-auto w-[50%] sm:w-[35%]">
              <img
                alt="Placeholder 2"
                src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                className="h-[200px] rounded-lg object-cover shadow-lg sm:h-[300px]"
              />
            </div>
            {/* Left Image */}
            <div className="absolute top-8 left-0 z-0 w-[50%] -rotate-12 sm:w-[35%]">
              <img
                alt="Placeholder 1"
                src="https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8"
                className="h-[200px] rounded-lg object-cover shadow-lg sm:h-[300px]"
              />
            </div>
            {/* Right Image */}
            <div className="absolute top-8 right-0 z-20 w-[50%] rotate-12 sm:w-[35%]">
              <img
                alt="Placeholder 3"
                src="https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4"
                className="h-[200px] rounded-lg object-cover shadow-lg sm:h-[300px]"
              />
            </div>
          </div>

          {/* Right Side: Content Section */}
          <div className="max-w-xl max-lg:mx-auto lg:ml-auto">
            <h2 className="text-2xl font-medium text-black sm:text-3xl md:text-4xl lg:max-w-[80%]">
              Transform your business with our tools
            </h2>

            {/* List of Features */}
            <div className="mt-6 grid gap-6 sm:mt-10 sm:gap-10">
              {/* Feature 1 */}
              <div className="flex items-start gap-4">
                <div>
                  <p className="font-semibold text-black">Boost productivity</p>
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    Automate repetitive tasks and streamline your workflow to
                    focus on what truly matters.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4">
                <div>
                  <p className="font-semibold text-black">
                    Real-time collaboration
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    Work seamlessly with your team, no matter where they are,
                    with real-time updates and communication.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4">
                <div>
                  <p className="font-semibold text-black">Advanced analytics</p>
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    Gain insights into your performance with powerful analytics
                    and data-driven decision-making tools.
                  </p>
                </div>
              </div>
            </div>

            {/* Button */}
            <Button
              variant="secondary"
              className="mt-6 flex items-center gap-1 sm:mt-10"
            >
              Learn more
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature189 };

```

```tsx
import { Calendar } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface DataItem {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
}

const DATA: DataItem[] = [
  {
    id: 1,
    number: "01",
    title: "Streamline your workflow",
    description:
      "Automate repetitive tasks and focus on what truly matters for your business growth.",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  {
    id: 2,
    number: "02",
    title: "Collaborate seamlessly",
    description:
      "Work together with your team in real-time, no matter where you are.",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  {
    id: 3,
    number: "03",
    title: "Scale effortlessly",
    description:
      "Our tools grow with your business, ensuring you’re always ready for the next step.",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
];

interface Feature191Props {
  className?: string;
}

const Feature191 = ({ className }: Feature191Props) => {
  return (
    <section className={cn("bg-accent py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center pb-4 text-center">
          <div>
            <span className="my-3 mb-4 flex items-center justify-center">
              <Badge variant="outline" className="bg-background px-3 py-1">
                <Calendar className="mr-2 h-4 w-4" />
                <p className="text-xs text-black">Why choose us?</p>
              </Badge>
            </span>
          </div>
          <h1 className="pb-3 text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
            Empower your business with our solutions
          </h1>
          <p className="max-w-md text-sm text-muted-foreground lg:max-w-2xl lg:text-lg">
            Discover how our tools can transform your workflow and help you
            achieve your goals faster.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-4 grid grid-cols-1 gap-4 px-4 sm:px-6 md:grid-cols-2 md:px-8 lg:grid-cols-3 lg:px-12">
          {DATA.map((feature) => (
            <div
              key={feature.id}
              className="grid grid-cols-1 rounded-2xl border bg-background shadow-sm"
            >
              <div className="p-6">
                <Badge className="rounded-sm bg-muted-foreground py-2 font-mono">
                  {feature.number}
                </Badge>
                <p className="text-md my-4 font-semibold">{feature.title}</p>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              <div className="mt-auto flex min-h-[200px] justify-center rounded-b-2xl">
                <div className="h-[200px] w-full">
                  <img
                    src={feature.image}
                    alt="placeholder"
                    className="h-full w-full rounded-b-2xl object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature191 };

```

```tsx
import { Check, ChevronRight } from "lucide-react";
import { type SVGProps, useId } from "react";

import { Button } from "@/components/ui/button";

export function Feature195() {
  return (
    <section className="py-32 text-background md:container md:max-w-5xl">
      <div className="relative isolate container grid items-center overflow-hidden bg-linear-to-r from-primary to-primary/75 py-8 max-lg:gap-10 max-md:gap-6 md:rounded-3xl lg:grid-cols-2 lg:px-8">
        <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_left,black_50%,transparent_100%)]">
          <PlusSigns className="h-full w-full text-background/[0.05]" />
        </div>
        <div className="border-background/20 lg:border-e lg:py-16 lg:pr-20">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Launch today
          </h2>
          <p className="mt-3 text-sm font-medium text-background/70">
            In the past, new financial companies had to rely on expensive
            middleware that linked them to outdated sponsor bank systems,
            restricting their potential. Our API solves this today.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 max-md:hidden">
            <Button size="lg" variant="secondary" className="group" asChild>
              <a href="/signup">
                Start for free
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button size="lg" className="group bg-secondary-foreground" asChild>
              <a href="/">
                Get a demo
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
          </div>
        </div>

        <div className="space-y-6 lg:py-10 lg:pl-20">
          <div>
            <h3 className="text-3xl font-semibold text-background md:text-4xl lg:text-5xl">
              $29.99
            </h3>
            <p className="mt-1 text-xl font-medium text-background/70">
              per user per month
            </p>
          </div>
          <ul className="space-y-3 text-sm text-background/70">
            <li className="flex items-center gap-2">
              <Check className="size-4" />
              All free plan features and...
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4" />
              Mainline AI
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4" />
              Unlimited teams
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-4 md:hidden">
            <Button size="lg" variant="secondary" className="group w-full">
              <a href="/signup" className="flex items-center gap-2">
                Start building for free
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button size="lg" className="group w-full bg-secondary-foreground">
              <a href="/" className="flex items-center gap-2">
                Get a demo
                <ChevronRight className="ml-1 size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PlusSignsProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const PlusSigns = ({ className, ...props }: PlusSignsProps) => {
  const GAP = 16;
  const STROKE_WIDTH = 1;
  const PLUS_SIZE = 6;
  const id = useId();
  const patternId = `plus-pattern-${id}`;

  return (
    <svg width={GAP * 2} height={GAP * 2} className={className} {...props}>
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={GAP}
          height={GAP}
          patternUnits="userSpaceOnUse"
        >
          <line
            x1={GAP / 2}
            y1={(GAP - PLUS_SIZE) / 2}
            x2={GAP / 2}
            y2={(GAP + PLUS_SIZE) / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
          <line
            x1={(GAP - PLUS_SIZE) / 2}
            y1={GAP / 2}
            x2={(GAP + PLUS_SIZE) / 2}
            y2={GAP / 2}
            stroke="currentColor"
            strokeWidth={STROKE_WIDTH}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
};

```

```tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";

const features = [
  {
    title: "AI-Powered Analytics",
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    title: "Cloud Integration",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  {
    title: "Real-time Monitoring",
    image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
  },
  {
    title: "Data Visualization",
    image: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
  },
  {
    title: "Automated Workflows",
    image: "https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr",
  },
  {
    title: "Team Collaboration",
    image: "https://cdn.ing/assets/files/record/286206/qs3jazsupq75q1fgisnonwnohie2",
  },
  {
    title: "API Integration",
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    title: "Custom Dashboards",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  {
    title: "Security Features",
    image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
  },
  {
    title: "Performance Metrics",
    image: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
  },
  {
    title: "Machine Learning Models",
    image: "https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr",
  },
  {
    title: "Data Encryption",
    image: "https://cdn.ing/assets/files/record/286206/qs3jazsupq75q1fgisnonwnohie2",
  },
  {
    title: "Automated Testing",
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    title: "CI/CD Pipeline",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  {
    title: "Version Control",
    image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
  },
  {
    title: "Code Analysis",
    image: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
  },
  {
    title: "Database Management",
    image: "https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr",
  },
  {
    title: "Load Balancing",
    image: "https://cdn.ing/assets/files/record/286206/qs3jazsupq75q1fgisnonwnohie2",
  },
  {
    title: "Container Orchestration",
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    title: "Microservices",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  {
    title: "Edge Computing",
    image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
  },
  {
    title: "Serverless Functions",
    image: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
  },
  {
    title: "DevOps Tools",
    image: "https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr",
  },
  {
    title: "Infrastructure as Code",
    image: "https://cdn.ing/assets/files/record/286206/qs3jazsupq75q1fgisnonwnohie2",
  },
  {
    title: "Authentication Services",
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
  {
    title: "Message Queues",
    image: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
  },
  {
    title: "Service Discovery",
    image: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
  },
  {
    title: "API Gateway",
    image: "https://cdn.ing/assets/files/record/286204/7rhj7uvcnozjm6c2q4txtptfcmpx",
  },
  {
    title: "Caching Solutions",
    image: "https://cdn.ing/assets/files/record/286205/e0az5aimgxvqa11grxzaok7fbsvr",
  },
  {
    title: "Event Streaming",
    image: "https://cdn.ing/assets/files/record/286206/qs3jazsupq75q1fgisnonwnohie2",
  },
  {
    title: "GraphQL Support",
    image: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
  },
];

interface Feature199Props {
  className?: string;
}

const Feature199 = ({ className }: Feature199Props) => {
  const [activeFeature, setActiveFeature] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const items = container.getElementsByClassName("feature-item");
      const containerMiddle = window.innerHeight * 0.6;

      let closestItem = null;
      let closestDistance = Infinity;

      Array.from(items).forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - containerMiddle);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestItem = index;
        }
      });

      if (closestItem !== null) {
        setActiveFeature(closestItem);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="mb-10 text-4xl font-bold md:text-5xl lg:mb-20 lg:text-6xl">
          Discover Our Powerful Features
        </h1>
        <div className="relative gap-6 pb-72 md:grid md:grid-cols-5 md:pb-0">
          <div className="col-span-3 pb-4" ref={containerRef}>
            <Separator />
            {features.map((feature, index) => (
              <React.Fragment key={index}>
                <div
                  className="feature-item py-3"
                  onMouseEnter={() => !isMobile && setActiveFeature(index)}
                >
                  <div className="flex items-center gap-7 md:gap-16 lg:gap-28">
                    <span
                      className={cn(
                        "invisible size-2.5 shrink-0 rounded-full bg-primary md:size-3",
                        activeFeature === index && "visible",
                      )}
                    ></span>
                    <h2
                      className={cn(
                        "text-[clamp(1.65rem,3vw,2.15rem)] font-bold text-muted-foreground",
                        activeFeature === index && "text-primary",
                      )}
                    >
                      {feature.title}
                    </h2>
                  </div>
                </div>
                <Separator />
              </React.Fragment>
            ))}
          </div>
          <div className="sticky bottom-3 left-3 col-span-2 h-72 w-fit border md:top-20 md:h-fit">
            <img
              src={features[activeFeature].image}
              alt={features[activeFeature].title}
              className="h-72 md:h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature199 };

```

```tsx
import { cn } from "@/lib/utils";

import { ScrollableTabsList } from "@/components/shadcnblocks/scrollable-tabslist";
import { ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Feature205Props {
  className?: string;
}

const Feature205 = ({ className }: Feature205Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <Tabs
          defaultValue="efficiency"
          className="grid grid-cols-1 gap-8 rounded-4xl border border-border p-4 lg:grid-cols-2 lg:p-8 xl:gap-20"
        >
          <div className="flex flex-col-reverse justify-between gap-8 lg:flex-col">
            <div>
              <TabsContent
                value="efficiency"
                className="flex animate-in flex-col gap-6 duration-300 fade-in"
              >
                <span className="text-xs text-muted-foreground uppercase">
                  Efficiency
                </span>
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-medium">
                    Streamline. Automate. Focus.
                  </h2>
                  <p className="text-muted-foreground">
                    Our AI-powered workspace eliminates repetitive tasks and
                    centralizes your workflow. Spend time on what matters.
                  </p>
                </div>
              </TabsContent>
              <TabsContent
                value="collaboration"
                className="flex animate-in flex-col gap-6 duration-300 fade-in"
              >
                <span className="text-xs text-muted-foreground uppercase">
                  Collaboration
                </span>
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-medium">
                    Connect. Create. Collaborate.
                  </h2>
                  <p className="text-muted-foreground">
                    Real-time editing and seamless sharing keep your team in
                    sync. Communication tools built right into your workspace.
                  </p>
                </div>
              </TabsContent>
              <TabsContent
                value="insights"
                className="flex animate-in flex-col gap-6 duration-300 fade-in"
              >
                <span className="text-xs text-muted-foreground uppercase">
                  Insights
                </span>
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-medium">
                    Track. Analyze. Optimize.
                  </h2>
                  <p className="text-muted-foreground">
                    Our analytics dashboard visualizes productivity patterns and
                    identifies bottlenecks and areas for improvement.
                  </p>
                </div>
              </TabsContent>
            </div>
            <ScrollableTabsList>
              <TabsList className="mx-auto h-12 rounded-full p-2 lg:mx-0">
                <TabsTrigger
                  value="efficiency"
                  className="h-full rounded-full px-4 py-2"
                >
                  Efficiency
                </TabsTrigger>
                <TabsTrigger
                  value="collaboration"
                  className="h-full rounded-full px-4 py-2"
                >
                  Collaboration
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="h-full rounded-full px-4 py-2"
                >
                  Insights
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" className="h-2" />
            </ScrollableTabsList>
          </div>
          <div>
            <TabsContent
              value="efficiency"
              className="animate-in duration-300 fade-in"
            >
              <div className="relative">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-hCb3lIB8L8E-unsplash.jpg"
                  alt="placeholder"
                  className="h-[440px] w-full rounded-3xl object-cover lg:h-[540px]"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 flex flex-col justify-center gap-8 p-6 text-background">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">40%</p>
                    <p className="font-medium">less time on admin tasks</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">$720</p>
                    <p className="font-medium">saved per employee monthly</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="collaboration"
              className="animate-in duration-300 fade-in"
            >
              <div className="relative">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-MChSQHxGZrQ-unsplash.jpg"
                  alt="placeholder"
                  className="h-[440px] w-full rounded-3xl object-cover lg:h-[540px]"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 flex flex-col justify-center gap-8 p-6 text-background">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">3x</p>
                    <p className="font-medium">faster project completion</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">87%</p>
                    <p className="font-medium">increase in team engagement</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="insights"
              className="animate-in duration-300 fade-in"
            >
              <div className="relative">
                <img
                  src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-AkftcHujUmk-unsplash.jpg"
                  alt="placeholder"
                  className="h-[440px] w-full rounded-3xl object-cover lg:h-[540px]"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 flex flex-col justify-center gap-8 p-6 text-background">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">65%</p>
                    <p className="font-medium">better resource allocation</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-4xl font-medium lg:text-5xl">28%</p>
                    <p className="font-medium">increased productivity</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { Feature205 };

```

```tsx
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature206Props {
  className?: string;
}

const Feature206 = ({ className }: Feature206Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col items-center gap-6 text-center">
          <Badge variant="outline" className="rounded-full">
            Solutions
          </Badge>
          <h2 className="text-4xl font-medium md:text-5xl">
            Transform Your Experience
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Discover innovative solutions to elevate your journey. From basics
            to advanced features, experience excellence at each level.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-ee1-cRqJQtA-unsplash.jpg"
            alt="placeholder"
            className="aspect-square size-full rounded-2xl object-cover md:order-1 xl:order-1"
          />
          <div className="flex flex-col justify-between gap-20 rounded-2xl bg-muted/50 p-12 md:order-2 md:gap-32 xl:order-2">
            <h3 className="text-2xl">Smart Solutions</h3>
            <div className="">
              <p className="mb-8 text-muted-foreground">
                Experience groundbreaking capabilities that redefine
                possibilities and unlock through innovation.
              </p>
              <a href="#" className="text-sm underline">
                More Information
              </a>
            </div>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-Ych4LcKFA5E-unsplash.jpg"
            alt="placeholder"
            className="aspect-square size-full rounded-2xl object-cover md:order-4 xl:order-3"
          />
          <div className="flex flex-col justify-between gap-20 rounded-2xl bg-[#d1efef] p-12 md:order-3 md:gap-32 xl:order-4">
            <h3 className="text-2xl text-white">Advanced Analytics</h3>
            <div className="">
              <p className="mb-8 text-white/80">
                Take control of your journey with powerful tools and insights.
                Achieve goals with personalized solutions.
              </p>
              <a href="#" className="text-sm text-white/80 underline">
                More Information
              </a>
            </div>
          </div>

          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-8FIN2qa2vQM-unsplash.jpg"
            alt="placeholder"
            className="aspect-square size-full rounded-2xl object-cover md:order-5 xl:order-6"
          />
          <div className="flex flex-col justify-between gap-20 rounded-2xl bg-[#d1efef] p-12 md:order-6 md:gap-32 xl:order-5">
            <h3 className="text-2xl">Custom Integration</h3>
            <div className="">
              <p className="mb-8 text-muted-foreground">
                Enhance your experience with advanced capabilities. Discover new
                possibilities for growth and success.
              </p>
              <a href="#" className="text-sm underline">
                More Information
              </a>
            </div>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-ZXLGP2Qh3Mo-unsplash.jpg"
            alt="placeholder"
            className="aspect-square size-full rounded-2xl object-cover md:order-8"
          />
          <div className="flex flex-col justify-between gap-20 rounded-2xl bg-muted/50 p-12 md:order-7 md:gap-32">
            <h3 className="text-2xl">Expert Support</h3>
            <div className="">
              <p className="mb-8 text-muted-foreground">
                Access insights and recommendations tailored to your needs.
                Navigate your path with confidence.
              </p>
              <a href="#" className="text-sm underline">
                More Information
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature206 };

```

```tsx
"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
const images = [
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-uR__S5GX8Io-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-fyEcdETa5mc-unsplash.jpg",
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/simone-hutsch-9jsQcDsxyqA-unsplash.jpg",
];

interface Feature209Props {
  className?: string;
}

const Feature209 = ({ className }: Feature209Props) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <section className={cn("border-border py-32", className)}>
      <div className="border-y">
        <div className="relative container overflow-hidden">
          <div className="border-x border-border">
            <div className="flex h-full flex-col-reverse xl:flex-row">
              <div className="flex items-center bg-background p-8 xl:w-1/2">
                <div className="flex h-fit flex-col gap-6 py-16 pr-16">
                  <h2 className="text-4xl font-medium tracking-tight text-balance">
                    Explore our Featured Collection
                  </h2>
                  <div className="flex gap-4">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        className={cn(
                          "max-h-24 max-w-32 rounded-md border border-transparent p-1 shadow-sm transition-all duration-150",
                          selectedImage === image &&
                            "border border-foreground/10 shadow-md",
                        )}
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          src={image}
                          alt="placeholder"
                          className="size-full rounded-md object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  <p className="font-medium text-muted-foreground">
                    The featured collection provides a sleek gallery-focused
                    experience with customizable album layouts, client
                    testimonials section, and intuitive image organization for
                    professionals.
                  </p>
                  <div className="flex gap-4 font-medium">
                    <Button variant="outline" asChild>
                      <a href="#" className="group flex items-center gap-1">
                        View Collection
                        <ChevronRight className="mt-0.5 size-4 transition-all duration-150 group-hover:translate-x-0.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              <Separator
                orientation="vertical"
                className="hidden self-stretch data-[orientation=vertical]:h-auto xl:block"
              />
              <div className="relative size-full p-8 md:p-16">
                <div className="relative h-[300px] sm:h-[540px]">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="placeholder"
                      className={cn(
                        "absolute inset-0 h-[300px] w-full origin-center scale-[1.05] rounded-lg object-cover opacity-0 shadow-lg transition-none sm:h-[540px]",
                        selectedImage === image &&
                          "scale-100 opacity-100 transition-all duration-500 ease-out",
                      )}
                    />
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full bg-[url('https://cdn.ing/assets/files/record/286195/65efaknsw8kcpf9o3c2gybytsl5b')] [background-size:4px_4px] bg-repeat opacity-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature209 };

```

```tsx
"use client";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Eye, ScanFace, Users, View } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type imageType = {
  src: string;
  alt?: string;
};

type variantType = "1" | "2" | "3" | "4";

interface list {
  icon: LucideIcon;
  title: string;
  tabName: string;
  summary: string;
  imageComponent: variantType;
  images: Array<imageType>;
  link?: {
    name: string;
    href: string;
  };
}
const TAB_LIST: Array<list> = [
  {
    icon: ScanFace,
    title: "Focus on Active Speaker",
    tabName: "Center Active Speaker",
    summary:
      "Keep the speaker front and center—perfect for social media clips. No cropping, no resizing—just one click!",
    imageComponent: "1",
    images: [
      {
        src: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
        alt: "",
      },
    ],
  },
  {
    icon: Eye,
    title: "Maintain eye contact",
    tabName: "Eye Contact",
    summary:
      "Feel free to read from your script—our app will adjust your gaze, ensuring the viewer sees you looking directly into the camera, even if you weren't.",
    imageComponent: "2",
    link: {
      name: "Learn more",
      href: "",
    },
    images: [
      {
        src: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
        alt: "",
      },
      {
        src: "https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9",
        alt: "",
      },
      {
        src: "https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0",
        alt: "",
      },
      {
        src: "https://cdn.ing/assets/files/record/286212/65sbovk1iv0fzrcrbm558df4ey8w",
        alt: "",
      },
    ],
  },
  {
    icon: View,
    title: "Green Screen",
    tabName: "Green Screen",
    summary:
      "Skip the messy home studio and green screen setup—our app smartly removes your background, allowing you to replace it with any image or video you choose.",
    imageComponent: "3",
    link: {
      name: "Learn more",
      href: "",
    },
    images: [
      {
        src: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
        alt: "",
      },
    ],
  },
  {
    icon: Users,
    title: "Automatic multicam",
    tabName: "Automatic multicam",
    summary:
      "Simply upload your multicam video files, and let our app cut to the speaker automatically. One more time-consuming task, done with just a click.",
    imageComponent: "4",
    link: {
      name: "Learn more",
      href: "",
    },
    images: [
      {
        src: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
        alt: "",
      },
      {
        src: "https://cdn.ing/assets/files/record/286210/jdwpoe6le13i7l4hn0er8ay9t5n9",
        alt: "",
      },
      {
        src: "https://cdn.ing/assets/files/record/286211/1d12hqfn5zpsfloai89gqq98kht0",
        alt: "",
      },
    ],
  },
];

interface ImagesProps {
  images: Array<imageType>;
  variant?: variantType;
}

const Images = ({ images, variant = "1" }: ImagesProps) => {
  const positions = [
    {
      top: "12%",
      right: "36%",
      rotate: "2.6deg",
    },
    {
      top: "12%",
      right: "70%",
      rotate: "-2.4deg",
    },
    {
      bottom: "16%",
      right: "35%",
      rotate: "1.6deg",
    },
    {
      bottom: "15%",
      right: "2%",
      rotate: "-1.5deg",
    },
  ];

  switch (variant) {
    case "1":
      return (
        <div className="ml-auto aspect-[0.930372149] h-full max-h-[38.75rem] overflow-hidden rounded-tl-[0.5rem] rounded-bl-[0.5rem]">
          <img
            className="block size-full object-cover object-center"
            src={images[0].src}
            alt={images[0].alt}
          />
        </div>
      );
    case "2":
      return (
        <div className="size-full pr-4">
          <div className="relative ml-auto aspect-[0.930372149] h-full max-h-[38.75rem] overflow-hidden rounded-[0.625rem]">
            {images.map((img, i) => (
              <div
                style={{ ...positions[i] }}
                className="absolute aspect-[0.845360825] w-[30%] overflow-hidden rounded-[0.5rem] shadow-md"
                key={`img-${variant}-${i}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="block size-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      );
    case "3":
      return (
        <div className="relative ml-auto aspect-[0.930372149] h-full max-h-[38.75rem] overflow-hidden rounded-[0.625rem]">
          <div className="absolute top-1/2 left-[5%] aspect-[1.586206897] w-[120%] -translate-y-1/2 overflow-hidden rounded-2xl shadow-xl xl:right-[-22%]">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="block size-full object-cover object-center"
            />
          </div>
        </div>
      );

    default:
      return (
        <div className="ml-auto aspect-[0.930372149] h-full max-h-[38.75rem] overflow-hidden pl-4 xl:pl-0">
          <div className="grid size-full grid-cols-2 grid-rows-2 gap-[3%]">
            <div className="col-start-1 col-end-2 row-start-1 row-end-2 overflow-hidden rounded-[0.625rem]">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="block size-full object-cover object-center"
              />
            </div>
            <div className="col-start-1 col-end-2 row-start-2 row-end-3 overflow-hidden rounded-[0.625rem]">
              <img
                src={images[1].src}
                alt={images[1].alt}
                className="block size-full object-cover object-center"
              />
            </div>
            <div className="col-start-2 col-end-3 row-start-1 row-end-3 overflow-hidden rounded-tl-[0.625rem] rounded-bl-[0.625rem]">
              <img
                src={images[2].src}
                alt={images[2].alt}
                className="block size-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      );
  }
};

interface Feature211Props {
  className?: string;
}

const Feature211 = ({ className }: Feature211Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="rounded-xl bg-muted py-11">
          <Tabs
            defaultValue={TAB_LIST[0].tabName}
            className="flex-col-reverse gap-10 xl:h-[43.75rem]"
          >
            <TabsList className="mx-auto flex h-auto w-[calc(100%-32px)] justify-start overflow-auto bg-muted lg:w-max lg:items-center lg:justify-center lg:overflow-hidden lg:rounded-full">
              {TAB_LIST.map((tab) => (
                <TabsTrigger
                  className="shrink-0 rounded-full px-4 py-2 text-sm leading-tight font-medium"
                  key={`trigger-${tab.tabName}`}
                  value={tab.tabName}
                >
                  {tab.tabName}
                </TabsTrigger>
              ))}
            </TabsList>
            {TAB_LIST.map((tab) => (
              <TabsContent
                value={tab.tabName}
                className="grid w-full grid-cols-1 items-center gap-8 xl:grid-cols-[37.5rem_1fr]"
                key={`content-${tab.tabName}`}
              >
                <div className="flex flex-col gap-4 px-8 xl:pl-18">
                  <div className="flex size-8 rounded-lg bg-primary text-primary-foreground">
                    <tab.icon className="m-auto size-4" />
                  </div>
                  <h2 className="font-serif text-5xl xl:text-7xl">
                    {tab.title}
                  </h2>
                  <p className="mt-4 text-xl text-foreground">{tab.summary}</p>
                  <div>
                    {tab.link && (
                      <Button asChild size="lg" className="w-full md:w-fit">
                        <a href={tab.link.href}>
                          {tab.link.name}
                          <ArrowRight />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="h-full w-full justify-self-end pl-4 md:pl-0">
                  <Images variant={tab.imageComponent} images={tab.images} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature211 };

```

```tsx
import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface list {
  title: string;
  value: string;
  summary: string;
  image: {
    src: string;
    alt: string;
  };
}

const LIST: Array<list> = [
  {
    title: "Edit your video simply by editing the text.",
    value: "1",
    summary:
      "transcribes your recordings automatically. To edit the video, just edit the transcript—hit delete to cut parts and copy-paste to rearrange segments. It’s that easy.",
    image: {
      src: "https://cdn.ing/assets/files/record/286200/io0rg4wv8jd2o792q4uouxg4d5k8",
      alt: "",
    },
  },
  {
    title: "Crystal-clear audio delivered at lightning speed.",
    value: "2",
    summary:
      "Eliminate filler words, close awkward pauses, and make it sound like a professional studio recording—all with our AI and just a click or two.",
    image: {
      src: "https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u",
      alt: "",
    },
  },
  {
    title: "No need to remember your lines—or tidy up your space.",
    value: "3",
    summary:
      "Keep your gaze fixed on the camera, even if you were reading your script the entire time. Use AI green screen to swap out your messy background for a more professional one.",
    image: {
      src: "https://cdn.ing/assets/files/record/286203/itwrx0hqshkompfxvikdmj77xoh4",
      alt: "",
    },
  },
];
interface Feature213Props {
  className?: string;
}

const Feature213 = ({ className }: Feature213Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <div className="mx-auto mb-8 flex max-w-[52.5rem] flex-col items-center justify-between gap-6 md:mb-20">
          <h2 className="text-center text-5xl text-foreground lg:text-7xl">
            Speed up production without sacrificing quality
          </h2>
        </div>
        <div>
          <Tabs defaultValue={LIST[0].value} className="gap-14 xl:flex-row">
            <TabsList className="h-fit w-fit flex-col gap-2.5 bg-transparent p-0">
              {LIST.map((item, i) => (
                <TabsTrigger
                  className="flex-col items-start rounded-[0.75rem] p-5 text-left whitespace-normal data-[state=active]:bg-muted xl:max-w-[34.0625rem]"
                  key={`tab-trigger-${i}`}
                  value={item.value}
                >
                  <div className="leading-normal font-bold">{item.title}</div>
                  <div className="leading-normal text-muted-foreground">
                    {item.summary}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            {LIST.map((item, i) => (
              <TabsContent
                className="w-full"
                key={`tab-content-${i}`}
                value={item.value}
              >
                <AspectRatio
                  ratio={16 / 9}
                  className="overflow-hidden rounded-[0.75rem]"
                >
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    className="block size-full object-cover object-center"
                  />
                </AspectRatio>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export { Feature213 };

```

```tsx
import { Eye, Keyboard, LucideIcon, Volume2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Item {
  title: string;
  summary: string;
  icon: LucideIcon;
}

const FEATURES: Array<Item> = [
  {
    title: "Keyboard Navigation",
    summary:
      "Ensure all interactive elements are accessible via keyboard alone, allowing users with motor impairments to navigate easily and efficiently without a mouse.",
    icon: Keyboard,
  },
  {
    title: "Screen Reader Friendly",
    summary:
      "Use semantic HTML and proper ARIA labels to help screen readers convey structure and meaning clearly to users with visual impairments.",
    icon: Volume2,
  },
  {
    title: "Color Contrast Check",
    summary:
      "Maintain strong color contrast between text and background to support users with low vision and improve readability across different lighting conditions.",
    icon: Eye,
  },
];

const FeatureItem = ({ title, summary, icon: Icon }: Item) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Icon className="size-7 stroke-muted-foreground" />
      <div className="max-w-xs text-center text-xl font-semibold">{title}</div>
      <div className="max-w-lg text-center text-base text-muted-foreground">
        {summary}
      </div>
    </div>
  );
};

interface Feature217Props {
  className?: string;
}

const Feature217 = ({ className }: Feature217Props) => {
  return (
    <section className={cn("", className)}>
      <div
        className="relative bg-cover bg-center bg-no-repeat py-10 after:absolute after:inset-0 after:z-10 after:block after:size-full after:bg-black/40 after:content-[''] md:py-16 xl:px-6 xl:py-28"
        style={{
          backgroundImage:
            "url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/futuristic-device-design-qcufu.png')",
        }}
      >
        <div className="relative z-20 container">
          <div className="grid items-start justify-start gap-14 xl:grid-cols-2 xl:items-center xl:justify-center">
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl tracking-tight text-white md:text-7xl">
                Incredible AI-powered video editing
              </h2>
              <div className="text-lg font-medium tracking-tight text-white">
                Accessibility ensures digital content is usable by all,
                including people with disabilities, by following inclusive
                design practices and meeting standards like WCAG for equal user
                experience.
              </div>
            </div>
            <div className="flex items-center justify-end">
              <div className="max-w-xl xl:w-full">
                <AspectRatio
                  ratio={0.80239521}
                  className="w-full overflow-hidden rounded-xl shadow-xl"
                >
                  <img
                    src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                    alt=""
                    className="block size-full object-cover object-center"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="grid items-start gap-16 py-20 lg:grid-cols-3">
          {FEATURES.map((item) => (
            <FeatureItem key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature217 };

```

```tsx
import { Eye, Keyboard, LucideIcon, Volume2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Item {
  title: string;
  summary: string;
  icon: LucideIcon;
}

const FEATURES: Array<Item> = [
  {
    title: "Keyboard Navigation",
    summary:
      "Ensure all interactive elements are accessible via keyboard alone, allowing users with motor impairments to navigate easily and efficiently without a mouse.",
    icon: Keyboard,
  },
  {
    title: "Screen Reader Friendly",
    summary:
      "Use semantic HTML and proper ARIA labels to help screen readers convey structure and meaning clearly to users with visual impairments.",
    icon: Volume2,
  },
  {
    title: "Color Contrast Check",
    summary:
      "Maintain strong color contrast between text and background to support users with low vision and improve readability across different lighting conditions.",
    icon: Eye,
  },
];

const FeatureItem = ({ title, summary, icon: Icon }: Item) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Icon className="size-7 stroke-muted-foreground" />
      <div className="max-w-xs text-center text-xl font-semibold">{title}</div>
      <div className="max-w-lg text-center text-base text-muted-foreground">
        {summary}
      </div>
    </div>
  );
};

interface Feature217aProps {
  className?: string;
}

const Feature217a = ({ className }: Feature217aProps) => {
  return (
    <section className={cn("", className)}>
      <div
        className="relative bg-cover bg-center bg-no-repeat py-10 after:absolute after:inset-0 after:z-10 after:block after:size-full after:bg-black/40 after:content-[''] md:py-16 xl:px-6 xl:py-28"
        style={{
          backgroundImage:
            "url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/futuristic-device-design-qcufu.png')",
        }}
      >
        <div className="relative z-20 container">
          <div className="flex flex-col items-center justify-center gap-12 text-center">
            <div className="flex max-w-4xl flex-col gap-5">
              <h2 className="text-2xl tracking-tight text-white md:text-7xl">
                Incredible AI-powered video editing
              </h2>
              <div className="text-lg font-medium tracking-tight text-white">
                Accessibility ensures digital content is usable by all,
                including people with disabilities, by following inclusive
                design practices and meeting standards like WCAG for equal user
                experience.
              </div>
            </div>
            <div className="max-w-xl">
              <AspectRatio
                ratio={0.80239521}
                className="w-full overflow-hidden rounded-xl shadow-xl"
              >
                <img
                  src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                  alt=""
                  className="block size-full object-cover object-center"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="grid items-start gap-8 py-20 lg:grid-cols-3">
          {FEATURES.map((item) => (
            <FeatureItem key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature217a };

```

```tsx
import { Eye, Keyboard, LucideIcon, Volume2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface Item {
  title: string;
  summary: string;
  icon: LucideIcon;
}

const FEATURES: Array<Item> = [
  {
    title: "Keyboard Navigation",
    summary:
      "Ensure all interactive elements are accessible via keyboard alone, allowing users with motor impairments to navigate easily and efficiently without a mouse.",
    icon: Keyboard,
  },
  {
    title: "Screen Reader Friendly",
    summary:
      "Use semantic HTML and proper ARIA labels to help screen readers convey structure and meaning clearly to users with visual impairments.",
    icon: Volume2,
  },
  {
    title: "Color Contrast Check",
    summary:
      "Maintain strong color contrast between text and background to support users with low vision and improve readability across different lighting conditions.",
    icon: Eye,
  },
];

interface Feature217bProps {
  className?: string;
}

const Feature217b = ({ className }: Feature217bProps) => {
  return (
    <section className={cn("", className)}>
      <div
        className="relative bg-cover bg-center bg-no-repeat py-20 after:absolute after:inset-0 after:z-10 after:block after:size-full after:bg-black/50 after:content-[''] md:py-24 xl:py-32"
        style={{
          backgroundImage:
            "url('https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/futuristic-device-design-qcufu.png')",
        }}
      >
        <div className="relative z-20 container">
          <div className="flex flex-col gap-16">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="mb-6 text-2xl tracking-tight text-white md:text-7xl">
                Incredible AI-powered video editing
              </h2>
              <div className="text-lg font-medium tracking-tight text-white">
                Accessibility ensures digital content is usable by all,
                including people with disabilities, by following inclusive
                design practices and meeting standards like WCAG for equal user
                experience.
              </div>
            </div>

            <div className="grid items-stretch gap-8 lg:grid-cols-3">
              {FEATURES.map((item) => (
                <div
                  key={item.title}
                  className="flex h-full flex-col items-center justify-center gap-4 rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
                >
                  <item.icon className="size-8 stroke-white" />
                  <div className="max-w-sm text-center text-xl font-medium text-white">
                    {item.title}
                  </div>
                  <div className="max-w-sm text-center text-sm text-white/70">
                    {item.summary}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature217b };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

interface Feature218Props {
  className?: string;
}

const Feature218 = ({ className }: Feature218Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="border-b">
        <div className="container flex w-full flex-col gap-6">
          <h2 className="font-serif text-5xl leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl">
            Go Pro, Build Better
          </h2>
          <div className="grid w-full gap-4 xl:grid-cols-[.33fr_.66fr]">
            <div className="flex flex-col gap-11">
              <div className="text-xl leading-[1.6] text-muted-foreground">
                Take your designs to the next level with Pro! Get access to
                premium UI blocks, advanced customization options, and new
                updates regularly.
              </div>
              <div>
                <Button asChild size="lg" className="w-full md:w-fit">
                  <a href="#">
                    Go Pro
                    <ArrowRight />
                  </a>
                </Button>
              </div>
            </div>
            <div className="pt-10 xl:pt-20">
              <div className="relative ml-auto w-full max-w-[50rem] after:absolute after:top-0 after:right-0 after:z-20 after:block after:h-full after:w-1/3 after:rounded-tr-2xl after:bg-linear-90 after:from-transparent after:to-background after:content-['']">
                <AspectRatio
                  ratio={1.932}
                  className="w-full overflow-hidden rounded-tl-2xl rounded-tr-2xl"
                >
                  <img
                    src="https://cdn.ing/assets/files/record/286201/l8f27khqrs9eumdi9r0ihvbe886u"
                    alt=""
                    className="block size-full object-cover object-[50%_0%]"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature218 };

```

```tsx
import type { LucideIcon } from "lucide-react";
import { AudioLines, AudioWaveform } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";

type image = {
  src: string;
  alt: string;
};

type imageVariant = "1" | "2" | "3";

interface Item {
  title: string;
  summary: string;
  number?: string;
  images: Array<image>;
  Icon?: LucideIcon;
  variant: imageVariant;
}

interface CardImageProps {
  variant: imageVariant;
  images: Array<image>;
  Icon?: LucideIcon;
}

const LIST: Array<Item> = [
  {
    title: "Seamless File Upload",
    summary:
      "Effortlessly upload your files with our intuitive drag-and-drop interface. Supports all major file formats.",
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-Kj2tYAl4HZg-unsplash.jpg",
        alt: "Upload interface",
      },
    ],
    Icon: AudioWaveform,
    variant: "1",
  },
  {
    title: "Secure and Fast",
    summary:
      "Experience lightning-fast uploads with top-notch security to keep your data safe and private.",
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/ivan-bandura-3QqzCTIfUJI-unsplash.jpg",
        alt: "Secure upload",
      },
    ],
    variant: "2",
  },
  {
    title: "Manage Your Files",
    summary:
      "Organize and manage your uploaded files with ease. Access them anytime, anywhere.",
    images: [
      {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/vasilis-karkalas-qOaeVSKyhhE-unsplash.jpg",
        alt: "File management",
      },
    ],
    Icon: AudioLines,
    variant: "3",
  },
];

const CardImage = ({ variant, images, Icon }: CardImageProps) => {
  switch (variant) {
    case "1":
      return (
        <div className="absolute right-[30%] bottom-[3.75rem]">
          <div className="aspect-[1.645714286] w-[25rem]">
            <div className="flex size-full items-center -space-x-[10%]">
              <div className="w-full shrink-0">
                <AspectRatio
                  className="overflow-hidden rounded-2xl"
                  ratio={1.558095238}
                >
                  <img
                    src={images[0].src}
                    alt={images[0].alt}
                    className="block size-full object-cover object-center"
                  />
                </AspectRatio>
              </div>
              <div className="w-[16%] shrink-0">
                <AspectRatio
                  className="w-full overflow-hidden rounded-lg shadow"
                  ratio={1}
                >
                  <div className="flex size-full bg-background">
                    {Icon && (
                      <Icon className="m-auto size-[65%] stroke-muted-foreground/80 stroke-1" />
                    )}
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      );
    case "2":
      return (
        <div className="absolute right-1/6 -bottom-[5%]">
          <div className="aspect-video w-[31.25rem] overflow-hidden rounded-2xl shadow-2xl sm:w-[42.5rem]">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="block size-full object-cover object-center"
            />
          </div>
        </div>
      );
    default:
      return (
        <div className="absolute right-1/6 -bottom-[5%]">
          <div className="relative aspect-[1.195592287] w-[21.25rem] sm:w-[25rem]">
            <div className="absolute bottom-0 aspect-[1.287833828] w-full overflow-hidden rounded-2xl">
              <img
                src={images[0].src}
                alt={images[0].alt}
                className="block size-full object-cover object-center"
              />
            </div>
            <div className="absolute top-0 right-0 flex aspect-square w-[20%] translate-x-1/2 overflow-hidden rounded-lg bg-background shadow">
              {Icon && (
                <Icon className="m-auto size-[65%] stroke-muted-foreground/80 stroke-1" />
              )}
            </div>
          </div>
        </div>
      );
  }
};

const Card = ({ title, summary, images, Icon, number, variant }: Item) => {
  const numberBorderColor = "var(--muted-foreground)";
  return (
    <div
      className="relative flex h-full min-h-[39.375rem] w-full max-w-[34rem] flex-col justify-between gap-4 overflow-hidden rounded-[0.75rem] bg-muted"
      style={{ backgroundImage: "url('https://cdn.ing/assets/i/r/286196/6kl0rqnd6mjk8j7e525fo8fo0vkc/p6.webp')" }}
    >
      <div className="flex w-full flex-col gap-4 p-10 pr-[3.75rem] pb-0 md:p-[3.75rem]">
        <h3 className="text-2xl leading-none">{title}</h3>
        <p className="text-xl leading-normal">{summary}</p>
      </div>
      <div className="relative size-full min-h-[21.875rem]">
        <CardImage images={images} Icon={Icon} variant={variant} />
      </div>
      <div
        className="absolute top-5 right-5 size-fit text-7xl leading-none font-light text-muted opacity-25"
        style={{
          textShadow: `
            2px 0 ${numberBorderColor}, -2px 0 ${numberBorderColor}, 
            0 2px ${numberBorderColor}, 0 -2px ${numberBorderColor},
            1px 1px ${numberBorderColor}, -1px -1px ${numberBorderColor}, 
            1px -1px ${numberBorderColor}, -1px 1px ${numberBorderColor}
          `,
        }}
      >
        {number}
      </div>
    </div>
  );
};

interface Feature219Props {
  className?: string;
}

const Feature219 = ({ className }: Feature219Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid items-center justify-center gap-6 xl:grid-cols-3">
          {LIST.map((item, i) => (
            <Card number={`${++i}`} {...item} key={`card-feature219-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Feature219 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

const stats = [
  {
    number: "52%",
    text: "boost in user retention",
  },
  {
    number: "40%",
    text: "decrease in development time",
  },
  {
    number: "2.5x",
    text: "increase in feature adoption",
  },
];

interface Feature220Props {
  className?: string;
}

const Feature220 = ({ className }: Feature220Props) => {
  return (
    <section
      className={cn(
        "bg-muted bg-[url('https://cdn.ing/assets/files/record/286189/arez6gd2s7isn9i1o6c7sexdq7bl')] bg-[length:3.125rem_3.125rem] bg-repeat py-20",
        className,
      )}
    >
      <div className="container flex flex-wrap-reverse gap-12 lg:grid lg:grid-cols-[1fr_1.5fr] lg:gap-[7.5rem]">
        <div className="flex flex-col justify-between gap-20">
          <div className="mt-10 flex flex-col gap-5">
            <h2 className="text-4xl leading-none font-semibold tracking-tight md:text-5xl">
              Build Stunning Interfaces Faster Than Ever Before
            </h2>
            <p className="text-lg leading-[1.4] font-medium text-muted-foreground md:text-xl">
              Drag, drop, and customize ready-made components to speed up your
              workflow and create polished UIs in no time.
            </p>
            <div>
              <Button size="lg" className="px-8 py-6 text-lg">
                Start Building
                <ArrowRight />
              </Button>
            </div>
          </div>
          <div>
            <div className="group flex w-full max-w-[30rem] flex-col gap-10 rounded-[.5rem] bg-background p-5 transition-shadow hover:shadow-[0_0_2px_theme('colors.gray.300')]">
              <div className="flex w-full flex-col gap-8 sm:flex-row">
                {stats.map((item, i) => (
                  <div
                    className="flex flex-col gap-1"
                    key={`stats-use-case-${i}`}
                  >
                    <div className="text-xl font-semibold">{item.number}</div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[46.5rem]">
          <AspectRatio
            ratio={0.873239437}
            className="overflow-hidden rounded-2xl"
          >
            <video
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-8.mp4"
              className="block size-full object-cover object-center"
              loop
              autoPlay
              muted
              controls={false}
            />
          </AspectRatio>
        </div>
      </div>
    </section>
  );
};

export { Feature220 };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  {
    number: "52%",
    text: "boost in user retention",
  },
  {
    number: "40%",
    text: "decrease in development time",
  },
  {
    number: "2.5x",
    text: "increase in feature adoption",
  },
];

interface Feature220aProps {
  className?: string;
}

const Feature220a = ({ className }: Feature220aProps) => {
  return (
    <section
      className={cn(
        "bg-muted bg-[url('https://cdn.ing/assets/files/record/286189/arez6gd2s7isn9i1o6c7sexdq7bl')] bg-[length:3.125rem_3.125rem] bg-repeat py-24",
        className,
      )}
    >
      <div className="container max-w-5xl">
        {/* Main Content */}
        <div className="mb-16 text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            ⚡ Supercharge Your Workflow
          </Badge>
          <h2 className="leading-tighter mb-6 text-5xl font-semibold tracking-tight lg:text-6xl">
            Ship Beautiful UIs
            <span className="block text-primary">In Record Time</span>
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed font-medium text-muted-foreground">
            Transform your development process with pre-built components that
            adapt to your design system and accelerate your time-to-market.
          </p>
          <Button size="lg" className="px-8 py-6 text-lg">
            Start Building
            <ArrowRight />
          </Button>
        </div>

        {/* Video Section */}
        <div className="mb-16">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-3xl">
            <video
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-8.mp4"
              className="block size-full object-cover object-center"
              loop
              autoPlay
              muted
              controls={false}
            />
          </AspectRatio>
        </div>

        {/* Stats */}
        <div className="rounded-2xl bg-card p-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((item, i) => (
              <div className="text-center" key={`stats-${i}`}>
                <div className="mb-2 text-4xl font-bold text-primary">
                  {item.number}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature220a };

```

```tsx
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

const stats = [
  {
    number: "52%",
    text: "boost in user retention",
  },
  {
    number: "40%",
    text: "decrease in development time",
  },
  {
    number: "2.5x",
    text: "increase in feature adoption",
  },
];

interface Feature220bProps {
  className?: string;
}

const Feature220b = ({ className }: Feature220bProps) => {
  return (
    <section
      className={cn(
        "bg-muted bg-[url('https://cdn.ing/assets/files/record/286189/arez6gd2s7isn9i1o6c7sexdq7bl')] bg-[length:3.125rem_3.125rem] bg-repeat py-20",
        className,
      )}
    >
      <div className="container">
        {/* Stats First */}
        <div className="mb-20 flex flex-wrap justify-center gap-12">
          {stats.map((item, i) => (
            <div key={`stats-${i}`} className="min-w-[12rem] text-center">
              <div className="mb-2 text-4xl font-semibold md:text-5xl">
                {item.number}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {item.text}
              </div>
            </div>
          ))}
        </div>

        {/* Content and Video Grid */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Video Left */}
          <div className="order-2 lg:order-1">
            <AspectRatio
              ratio={0.873239437}
              className="overflow-hidden rounded-2xl"
            >
              <video
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/video-8.mp4"
                className="block size-full object-cover object-center"
                loop
                autoPlay
                muted
                controls={false}
              />
            </AspectRatio>
          </div>

          {/* Content Right */}
          <div className="order-1 space-y-6 lg:order-2">
            <h2 className="text-4xl leading-none font-semibold tracking-tight md:text-5xl">
              Build Stunning Interfaces Faster Than Ever Before
            </h2>
            <p className="text-lg leading-[1.4] font-medium text-muted-foreground md:text-xl">
              Drag, drop, and customize ready-made components to speed up your
              workflow and create polished UIs in no time.
            </p>
            <div className="pt-4">
              <Button size="lg" className="px-8 py-6 text-lg">
                Start Building
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature220b };

```

```tsx
import {
  BookOpenIcon,
  MessagesSquareIcon,
  Settings2Icon,
  TabletSmartphoneIcon,
} from "lucide-react";

export default function IconSectionCircleIconsCentreAligned() {
  return (
    <>
      {/* Icon Blocks */}
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-12">
          {/* Icon Block */}
          <div className="text-center">
            <div className="flex justify-center items-center w-12 h-12 bg-primary border rounded-full mx-auto">
              <TabletSmartphoneIcon className="flex-shrink-0 w-5 h-5 text-primary-foreground" />
            </div>
            <div className="mt-3">
              <h3 className="text-lg font-semibold ">Responsive</h3>
              <p className="mt-1 text-muted-foreground">
                Responsive, and mobile-first project on the web
              </p>
            </div>
          </div>
          {/* End Icon Block */}
          {/* Icon Block */}
          <div className="text-center">
            <div className="flex justify-center items-center w-12 h-12 bg-primary border rounded-full mx-auto">
              <Settings2Icon className="flex-shrink-0 w-5 h-5 text-primary-foreground" />
            </div>
            <div className="mt-3">
              <h3 className="text-lg font-semibold ">Customizable</h3>
              <p className="mt-1 text-muted-foreground">
                Components are easily customized and extendable
              </p>
            </div>
          </div>
          {/* End Icon Block */}
          {/* Icon Block */}
          <div className="text-center">
            <div className="flex justify-center items-center w-12 h-12 bg-primary border rounded-full mx-auto">
              <BookOpenIcon className="flex-shrink-0 w-5 h-5 text-primary-foreground" />
            </div>
            <div className="mt-3">
              <h3 className="text-lg font-semibold ">Documentation</h3>
              <p className="mt-1 text-muted-foreground">
                Every component and plugin is well documented
              </p>
            </div>
          </div>
          {/* End Icon Block */}
          {/* Icon Block */}
          <div className="text-center">
            <div className="flex justify-center items-center w-12 h-12 bg-primary border rounded-full mx-auto">
              <MessagesSquareIcon className="flex-shrink-0 w-5 h-5 text-primary-foreground" />
            </div>
            <div className="mt-3">
              <h3 className="text-lg font-semibold ">24/7 Support</h3>
              <p className="mt-1 text-muted-foreground">
                Contact us 24 hours a day, 7 days a week
              </p>
            </div>
          </div>
          {/* End Icon Block */}
        </div>
      </div>
      {/* End Icon Blocks */}
    </>
  );
}

```

```tsx
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  ArrowRight,
  BrainCircuit,
  Blocks,
  Fingerprint,
  MessageSquare,
  Merge,
  Server,
  Shield,
  ShieldCheck,
  Zap,
  Globe,
  CloudCog,
  Webhook,
  LineChart,
  Layers,
  Cpu,
  Users,
  Bot,
  Wand2,
  Code,
  Database,
  Settings,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';

interface FeatureIcon {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  benefit: string;
  category: string;
}

export default function FeatureIconTabs() {
  const [activeTab, setActiveTab] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const featureIcons: FeatureIcon[] = [
    {
      id: 'ai-powered',
      icon: <BrainCircuit className="text-primary h-10 w-10" />,
      title: 'AI-Powered Analysis',
      description:
        'Leverage machine learning to automatically analyze large datasets and identify patterns.',
      benefit: 'Save countless hours on manual data processing',
      category: 'intelligence',
    },
    {
      id: 'advanced-security',
      icon: <ShieldCheck className="h-10 w-10 text-red-500" />,
      title: 'Advanced Security',
      description:
        'Enterprise-grade security with role-based access control and encryption at rest.',
      benefit: 'Protect sensitive information with military-grade protocols',
      category: 'security',
    },
    {
      id: 'real-time-collab',
      icon: <Users className="h-10 w-10 text-blue-500" />,
      title: 'Real-time Collaboration',
      description:
        'Work together with your team simultaneously on shared projects with live updates.',
      benefit: 'Boost team productivity with seamless coordination',
      category: 'collaboration',
    },
    {
      id: 'instant-deploy',
      icon: <Zap className="h-10 w-10 text-yellow-500" />,
      title: 'Instant Deployment',
      description:
        'One-click deployment to any environment with automatic rollback capabilities.',
      benefit: 'Go from development to production in seconds',
      category: 'performance',
    },
    {
      id: 'custom-workflows',
      icon: <Webhook className="h-10 w-10 text-green-500" />,
      title: 'Custom Workflows',
      description:
        'Build automated workflows with our visual editor to streamline your processes.',
      benefit: 'Automate repetitive tasks without coding knowledge',
      category: 'customization',
    },
    {
      id: 'smart-integrations',
      icon: <Merge className="h-10 w-10 text-indigo-500" />,
      title: 'Smart Integrations',
      description:
        'Connect with 200+ apps and services through our intelligent API platform.',
      benefit: 'Create a unified ecosystem of all your business tools',
      category: 'integration',
    },
    {
      id: 'global-cdn',
      icon: <Globe className="h-10 w-10 text-cyan-500" />,
      title: 'Global CDN',
      description:
        'Deliver content with blazing speed through our global content delivery network.',
      benefit: 'Provide fast experiences to users worldwide',
      category: 'performance',
    },
    {
      id: 'cloud-processing',
      icon: <CloudCog className="h-10 w-10 text-sky-500" />,
      title: 'Cloud Processing',
      description:
        'Offload intensive computing tasks to our scalable cloud infrastructure.',
      benefit: 'Handle massive workloads without hardware limitations',
      category: 'performance',
    },
    {
      id: 'predictive-analytics',
      icon: <LineChart className="h-10 w-10 text-violet-500" />,
      title: 'Predictive Analytics',
      description:
        'Anticipate trends and behaviors with forward-looking analytical models.',
      benefit: 'Make data-driven decisions before issues arise',
      category: 'intelligence',
    },
    {
      id: 'multi-tenancy',
      icon: <Layers className="h-10 w-10 text-rose-500" />,
      title: 'Multi-tenancy',
      description:
        'Isolate customer data while maintaining a single application instance.',
      benefit: 'Scale your SaaS business with optimal resource usage',
      category: 'architecture',
    },
    {
      id: 'edge-computing',
      icon: <Cpu className="h-10 w-10 text-amber-500" />,
      title: 'Edge Computing',
      description:
        'Process data closer to the source for reduced latency and bandwidth usage.',
      benefit: 'Achieve near real-time processing for critical operations',
      category: 'performance',
    },
    {
      id: 'biometric-auth',
      icon: <Fingerprint className="h-10 w-10 text-emerald-500" />,
      title: 'Biometric Authentication',
      description:
        'Secure access using fingerprint, face recognition, and other biometric methods.',
      benefit: 'Balance security and convenience for your users',
      category: 'security',
    },
    {
      id: 'chatbots',
      icon: <Bot className="h-10 w-10 text-pink-500" />,
      title: 'Intelligent Chatbots',
      description:
        'Deploy conversational AI to handle customer inquiries and support requests.',
      benefit: 'Provide 24/7 support without expanding your team',
      category: 'intelligence',
    },
    {
      id: 'low-code',
      icon: <Wand2 className="h-10 w-10 text-orange-500" />,
      title: 'Low-Code Builder',
      description:
        'Create custom features and extensions with minimal coding required.',
      benefit: 'Empower non-technical teams to build solutions',
      category: 'customization',
    },
    {
      id: 'api-management',
      icon: <Code className="h-10 w-10 text-neutral-500" />,
      title: 'API Management',
      description:
        'Comprehensive tools to create, publish, maintain, and secure your APIs.',
      benefit: 'Control and monitor all your API endpoints from one place',
      category: 'integration',
    },
    {
      id: 'data-warehouse',
      icon: <Database className="h-10 w-10 text-purple-500" />,
      title: 'Data Warehouse',
      description:
        'Centralized repository optimized for analysis of data from disparate sources.',
      benefit: 'Transform raw data into actionable business intelligence',
      category: 'architecture',
    },
    {
      id: 'advanced-config',
      icon: <Settings className="h-10 w-10 text-slate-500" />,
      title: 'Advanced Configuration',
      description:
        'Granular controls for customizing every aspect of the platform to your needs.',
      benefit: 'Create a perfectly tailored solution for your business',
      category: 'customization',
    },
    {
      id: 'adaptive-ai',
      icon: <SlidersHorizontal className="h-10 w-10 text-teal-500" />,
      title: 'Adaptive AI',
      description:
        'Self-learning systems that adapt to your specific business patterns over time.',
      benefit: 'Get increasingly accurate insights as you use the platform',
      category: 'intelligence',
    },
  ];

  const categories = [
    {
      value: 'all',
      label: 'All Features',
      icon: <Blocks className="h-4 w-4" />,
    },
    {
      value: 'intelligence',
      label: 'Intelligence',
      icon: <BrainCircuit className="h-4 w-4" />,
    },
    {
      value: 'security',
      label: 'Security',
      icon: <Shield className="h-4 w-4" />,
    },
    {
      value: 'performance',
      label: 'Performance',
      icon: <Zap className="h-4 w-4" />,
    },
    {
      value: 'collaboration',
      label: 'Collaboration',
      icon: <Users className="h-4 w-4" />,
    },
    {
      value: 'customization',
      label: 'Customization',
      icon: <SlidersHorizontal className="h-4 w-4" />,
    },
    {
      value: 'integration',
      label: 'Integration',
      icon: <Webhook className="h-4 w-4" />,
    },
    {
      value: 'architecture',
      label: 'Architecture',
      icon: <Server className="h-4 w-4" />,
    },
  ];

  const filteredFeatures =
    activeTab === 'all'
      ? featureIcons
      : featureIcons.filter((feature) => feature.category === activeTab);

  const activeCategory = categories.find((cat) => cat.value === activeTab);

  return (
    <section className="bg-background w-full py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-8 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Powerful Features for Modern Teams
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-lg">
            Discover the tools and capabilities that make our platform the
            choice of leading organizations
          </p>
        </div>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Dropdown for small screens */}
          <div className="mb-8 flex justify-center lg:hidden">
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex w-full max-w-[300px] items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {activeCategory?.icon}
                    <span>{activeCategory?.label}</span>
                  </div>
                  <ChevronDown className="text-muted-foreground ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[300px]">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category.value}
                    className="flex items-center gap-2"
                    onClick={() => {
                      setActiveTab(category.value);
                      setDropdownOpen(false);
                    }}
                  >
                    {category.icon}
                    <span>{category.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Tabs for medium and larger screens */}
          <div className="mb-8 hidden justify-center lg:flex">
            <TabsList className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-8">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="flex items-center gap-2"
                >
                  {category.icon}
                  <span className="hidden md:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="space-y-4">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {filteredFeatures.map((feature) => (
                <Card
                  key={feature.id}
                  className="group overflow-hidden p-0 transition-all hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="bg-primary/5 flex h-16 w-16 items-center justify-center rounded-full">
                        {feature.icon}
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground mt-2">
                          {feature.description}
                        </p>
                      </div>

                      <div className="border-border border-t pt-4">
                        <p className="text-primary text-sm font-medium">
                          <span className="font-bold">Key benefit:</span>{' '}
                          {feature.benefit}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredFeatures.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">
                  No features found in this category.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" className="group" asChild>
            <a href="#">
              Get started with all features
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#">
              Schedule a demo
              <MessageSquare className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

```

```tsx
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CloudUpload,
  Code2,
  Database,
  Laptop,
  LayoutDashboard,
  LineChart,
  MessagesSquare,
  Shield,
  Sparkles,
} from 'lucide-react';

interface FeatureSlide {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  image: string;
  imageAlt: string;
}

export default function IconFeatureCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const features: FeatureSlide[] = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Advanced Security',
      description:
        'Our platform implements enterprise-grade encryption, multi-factor authentication, and regular security audits to keep your data safe and protected.',
      color: 'bg-blue-500 text-white',
      image:
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1970&auto=format&fit=crop',
      imageAlt: 'Security dashboard with encryption metrics',
    },
    {
      icon: <BrainCircuit className="h-6 w-6" />,
      title: 'AI-Powered Insights',
      description:
        'Leverage machine learning algorithms that analyze your data to provide actionable insights and recommendations for optimizing performance.',
      color: 'bg-purple-500 text-white',
      image:
        'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1974&auto=format&fit=crop',
      imageAlt: 'AI analytics visualization',
    },
    {
      icon: <LayoutDashboard className="h-6 w-6" />,
      title: 'Customizable Dashboard',
      description:
        'Build your perfect workspace with drag-and-drop widgets, personalized views, and tailored reports that focus on what matters to you.',
      color: 'bg-teal-500 text-white',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      imageAlt: 'Customizable dashboard interface',
    },
    {
      icon: <CloudUpload className="h-6 w-6" />,
      title: 'Seamless Cloud Integration',
      description:
        'Connect with your favorite cloud services for file storage, sharing, and collaboration with just a few clicks.',
      color: 'bg-amber-500 text-white',
      image:
        'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop',
      imageAlt: 'Cloud service integration diagram',
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: 'Real-time Analytics',
      description:
        'Monitor performance metrics in real-time with interactive charts and reports that update automatically as new data comes in.',
      color: 'bg-green-500 text-white',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      imageAlt: 'Real-time analytics dashboard',
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: 'Smart Automation',
      description:
        'Create powerful workflows that automate repetitive tasks and processes, saving time and reducing human error.',
      color: 'bg-rose-500 text-white',
      image:
        'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070&auto=format&fit=crop',
      imageAlt: 'Workflow automation interface',
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, autoplay, isAnimating]);

  // Handle next slide
  const nextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % features.length);

    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Handle previous slide
  const prevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + features.length) % features.length);

    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Get previous, current, and next slide indices
  const getSlideIndex = (offset: number) => {
    return (currentSlide + offset + features.length) % features.length;
  };

  // Handle dot navigation
  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;

    setIsAnimating(true);
    setCurrentSlide(index);

    // Reset animation flag after transition completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Pause autoplay when user interacts
  const handleUserInteraction = () => {
    setAutoplay(false);

    // Resume autoplay after some inactivity
    const resumeTimeout = setTimeout(() => {
      setAutoplay(true);
    }, 10000);

    return () => clearTimeout(resumeTimeout);
  };

  return (
    <section className="bg-background w-full overflow-hidden py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Discover our powerful tools
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore our key features designed to enhance productivity and
            streamline your workflow.
          </p>
        </div>

        {/* Feature Carousel */}
        <div
          className="relative mt-16"
          onClick={handleUserInteraction}
          onMouseEnter={handleUserInteraction}
        >
          <div className="relative h-[500px] w-full md:h-[600px]">
            {/* Slides */}
            {[-1, 0, 1].map((offset) => {
              const slideIndex = getSlideIndex(offset);
              const slide = features[slideIndex];

              return (
                <div
                  key={slideIndex}
                  className={cn(
                    'pointer-events-none absolute top-0 h-full w-full opacity-0 transition-all duration-500 ease-in-out',
                    offset === 0 && 'pointer-events-auto opacity-100',
                    offset === -1 && '-translate-x-full transform',
                    offset === 1 && 'translate-x-full transform'
                  )}
                >
                  <div className="grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-2">
                    {/* Feature Info */}
                    <div className="flex flex-col space-y-6 text-left">
                      <div
                        className={cn(
                          'flex h-16 w-16 items-center justify-center rounded-2xl',
                          slide.color
                        )}
                      >
                        {slide.icon}
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold">{slide.title}</h3>
                        <p className="text-muted-foreground">
                          {slide.description}
                        </p>

                        <div className="flex flex-wrap gap-3 pt-4">
                          <Button asChild className="group">
                            <a href="#">
                              Learn more
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </a>
                          </Button>
                          <Button variant="outline">See demo</Button>
                        </div>
                      </div>
                    </div>

                    {/* Feature Image */}
                    <div className="relative h-full max-h-[350px] overflow-hidden rounded-xl shadow-lg md:max-h-none">
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={offset === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                disabled={isAnimating}
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Previous slide</span>
              </Button>

              <div className="flex items-center space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      'h-2 w-2 rounded-full transition-all',
                      currentSlide === index
                        ? 'bg-primary w-6'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToSlide(index);
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                disabled={isAnimating}
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Next slide</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Features Preview */}
        <div className="mt-24">
          <h3 className="mb-8 text-center text-xl font-bold">
            More powerful features
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Laptop className="h-5 w-5" />,
                title: 'Cross-platform Support',
                description:
                  'Access your work from any device with our responsive web app and native applications.',
              },
              {
                icon: <MessagesSquare className="h-5 w-5" />,
                title: 'Team Communication',
                description:
                  'Integrated messaging and commenting system to keep discussions organized and accessible.',
              },
              {
                icon: <Database className="h-5 w-5" />,
                title: 'Reliable Infrastructure',
                description:
                  'Built on enterprise-grade servers with 99.9% uptime guarantee and automated backups.',
              },
              {
                icon: <Code2 className="h-5 w-5" />,
                title: 'Developer API',
                description:
                  'Full access to our API to create custom integrations and extend functionality.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg border p-6 transition-all duration-200 hover:shadow-sm"
              >
                <div className="bg-primary/10 text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-full">
                  {feature.icon}
                </div>
                <h4 className="mb-2 text-base font-medium">{feature.title}</h4>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Button size="lg" asChild>
            <a href="#">
              Explore all features
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

```

```tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Rocket,
  Cloud,
  Code,
} from "lucide-react";

const features = [
  {
    title: "AI-Powered Automation",
    description:
      "Automate repetitive tasks with advanced machine learning algorithms.",
    icon: Sparkles,
    badge: "New",
  },
  {
    title: "Lightning Fast",
    description: "Optimized for speed with sub-millisecond response times.",
    icon: Zap,
  },
  {
    title: "Enterprise Security",
    description: "Bank-grade security with end-to-end encryption.",
    icon: Shield,
  },
  {
    title: "Scalable Infrastructure",
    description: "Built to scale with your needs, from startup to enterprise.",
    icon: Rocket,
  },
  {
    title: "Cloud Native",
    description: "Deploy anywhere with our cloud-native architecture.",
    icon: Cloud,
  },
  {
    title: "Developer First",
    description: "Built by developers, for developers with great DX.",
    icon: Code,
  },
];

export default function FeatureSectionCardGrid() {
  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Features that set us apart
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Everything you need to build modern applications at scale. Built for
          developers, designed for growth.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="relative overflow-hidden p-0">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="bg-primary/10 rounded-lg p-3">
                  <feature.icon className="text-primary size-6" />
                </div>
                {feature.badge && (
                  <Badge variant="secondary" className="absolute top-4 right-4">
                    {feature.badge}
                  </Badge>
                )}
              </div>
              <div className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size={"sm"}
                  className="mt-4 font-semibold"
                >
                  Learn more <ArrowRight className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button size="lg" className="gap-2">
          Get Started Now <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}

```

```tsx
import { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowRight,
  BarChart3,
  Clock,
  LucideIcon,
  Percent,
  Rocket,
  TimerReset,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

import { cn } from '@/lib/utils';

interface Stat {
  id: string;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  icon: LucideIcon;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
}

interface FeatureCategory {
  id: string;
  title: string;
  description: string;
  metrics: {
    title: string;
    description: string;
    stats: Stat[];
  };
  testimonial?: {
    quote: string;
    author: string;
    company: string;
    image: string;
  };
  image: string;
  color: string;
}

const featureCategories: FeatureCategory[] = [
  {
    id: 'performance',
    title: 'Performance Optimization',
    description:
      'Our platform is built for speed and efficiency, delivering exceptional performance metrics that drive business growth.',
    metrics: {
      title: 'Performance Impact',
      description:
        'Customers experience significant performance improvements after implementation:',
      stats: [
        {
          id: 'speed',
          value: 10,
          label: 'Faster Load Times',
          suffix: 'x',
          icon: Zap,
          change: {
            value: 15,
            trend: 'up',
          },
        },
        {
          id: 'response',
          value: 50,
          label: 'Response Time Reduction',
          suffix: '%',
          icon: Clock,
          change: {
            value: 12,
            trend: 'up',
          },
        },
        {
          id: 'uptime',
          value: 99.99,
          label: 'System Uptime',
          suffix: '%',
          icon: TimerReset,
        },
        {
          id: 'scalability',
          value: 5,
          label: 'Scalability Improvement',
          suffix: 'x',
          icon: TrendingUp,
          change: {
            value: 20,
            trend: 'up',
          },
        },
      ],
    },
    testimonial: {
      quote:
        'Since implementing the platform, our page load times decreased by 70% and user retention improved dramatically.',
      author: 'Sarah Johnson',
      company: 'TechCorp CTO',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    color: 'blue',
  },
  {
    id: 'roi',
    title: 'Return on Investment',
    description:
      'Our platform delivers measurable business impact with proven ROI across various operational metrics.',
    metrics: {
      title: 'Business Impact',
      description:
        'Average metrics reported by customers after 6 months of implementation:',
      stats: [
        {
          id: 'conversion',
          value: 40,
          label: 'Conversion Rate Increase',
          suffix: '%',
          icon: Percent,
          change: {
            value: 8,
            trend: 'up',
          },
        },
        {
          id: 'costs',
          value: 30,
          label: 'Operational Cost Reduction',
          suffix: '%',
          icon: TrendingUp,
          change: {
            value: 5,
            trend: 'up',
          },
        },
        {
          id: 'revenue',
          value: 25,
          label: 'Revenue Growth',
          suffix: '%',
          icon: BarChart3,
          change: {
            value: 10,
            trend: 'up',
          },
        },
        {
          id: 'productivity',
          value: 60,
          label: 'Team Productivity Boost',
          suffix: '%',
          icon: Rocket,
          change: {
            value: 12,
            trend: 'up',
          },
        },
      ],
    },
    testimonial: {
      quote:
        "We've seen a 40% increase in conversions and 30% reduction in operational costs since deploying this solution.",
      author: 'Michael Chen',
      company: 'GrowthMetrics CEO',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    image:
      'https://images.unsplash.com/photo-1553484771-689277e6fa16?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    color: 'green',
  },
  {
    id: 'adoption',
    title: 'User Adoption',
    description:
      'Our intuitive platform drives exceptional user adoption rates with minimal onboarding friction.',
    metrics: {
      title: 'Adoption Metrics',
      description:
        'Customer adoption statistics compared to industry averages:',
      stats: [
        {
          id: 'onboarding',
          value: 85,
          label: 'Completed Onboarding',
          suffix: '%',
          icon: Users,
          change: {
            value: 15,
            trend: 'up',
          },
        },
        {
          id: 'retention',
          value: 95,
          label: 'User Retention Rate',
          suffix: '%',
          icon: Users,
          change: {
            value: 23,
            trend: 'up',
          },
        },
        {
          id: 'engagement',
          value: 3.5,
          label: 'Daily User Sessions',
          prefix: '',
          icon: Clock,
          change: {
            value: 30,
            trend: 'up',
          },
        },
        {
          id: 'referral',
          value: 40,
          label: 'User Referral Rate',
          suffix: '%',
          icon: Users,
          change: {
            value: 18,
            trend: 'up',
          },
        },
      ],
    },
    testimonial: {
      quote:
        "The platform's intuitive design led to a 95% adoption rate within our organization, far exceeding our expectations.",
      author: 'Emily Rodriguez',
      company: 'InnovateCorp Director',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    color: 'purple',
  },
];

export default function FeatureStats() {
  const [activeCategory, setActiveCategory] = useState(featureCategories[0].id);
  const [animatedStats, setAnimatedStats] = useState<{ [key: string]: number }>(
    {}
  );
  const [inViewport, setInViewport] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const currentCategory =
    featureCategories.find((category) => category.id === activeCategory) ||
    featureCategories[0];

  // Animate stats when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInViewport(true);
        }
      },
      { threshold: 0.1 }
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

  // Animate the stats when category changes or comes into viewport
  useEffect(() => {
    if (!inViewport) return;

    // Reset animation values
    const initialValues: { [key: string]: number } = {};
    currentCategory.metrics.stats.forEach((stat) => {
      initialValues[stat.id] = 0;
    });
    setAnimatedStats(initialValues);

    // Animate to target values
    const animationDuration = 1500; // 1.5 seconds
    const frameDuration = 16; // ~60fps
    const totalFrames = Math.round(animationDuration / frameDuration);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const updatedValues: { [key: string]: number } = {};

      currentCategory.metrics.stats.forEach((stat) => {
        // Easing function for smoother animation
        const easeOutQuad = (t: number) => t * (2 - t);
        const easedProgress = easeOutQuad(progress);

        updatedValues[stat.id] = Number(
          (easedProgress * stat.value).toFixed(stat.value % 1 === 0 ? 0 : 2)
        );
      });

      setAnimatedStats(updatedValues);

      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [currentCategory, inViewport]);

  // Handle dropdown change
  const handleSelectChange = (value: string) => {
    setActiveCategory(value);
  };

  return (
    <section
      ref={sectionRef}
      className="container mx-auto space-y-12 px-4 py-24 md:px-6 2xl:max-w-[1400px]"
    >
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Measurable Impact
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          See the real-world impact our features have on businesses like yours
        </p>
      </div>

      {/* Mobile Dropdown (visible on small screens) */}
      <div className="mb-6 w-full md:hidden">
        <Select value={activeCategory} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select feature category" />
          </SelectTrigger>
          <SelectContent>
            {featureCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs
        defaultValue={activeCategory}
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="w-full"
      >
        {/* Desktop Tabs (hidden on small screens) */}
        <div className="hidden justify-center md:flex">
          <TabsList className="mx-auto">
            {featureCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="px-6"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {featureCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-8">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-2xl font-bold">{category.title}</h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-medium">
                    {category.metrics.title}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {category.metrics.description}
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {category.metrics.stats.map((stat) => (
                      <Card key={stat.id} className="overflow-hidden p-0">
                        <CardContent className="p-6">
                          <div className="mb-2 flex items-center justify-between">
                            <div
                              className={`rounded-md p-2 bg-${category.color}-100 text-${category.color}-600 dark:bg-${category.color}-950 dark:text-${category.color}-400`}
                            >
                              <stat.icon className="h-5 w-5" />
                            </div>
                            {stat.change && (
                              <div
                                className={cn(
                                  'flex items-center rounded-full px-2 py-1 text-xs font-medium',
                                  stat.change.trend === 'up'
                                    ? 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400'
                                    : 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400'
                                )}
                              >
                                {stat.change.trend === 'up' ? '+' : '-'}
                                {stat.change.value}%
                                <TrendingUp
                                  className={cn(
                                    'ml-1 h-3 w-3',
                                    stat.change.trend === 'down' && 'rotate-180'
                                  )}
                                />
                              </div>
                            )}
                          </div>
                          <div className="mt-4 mb-1">
                            <span className="text-3xl font-bold tabular-nums">
                              {stat.prefix}
                              {animatedStats[stat.id]?.toLocaleString() || 0}
                              {stat.suffix}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {stat.label}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {category.testimonial && (
                  <div
                    className={`rounded-xl border-l-4 p-6 border-${category.color}-500 bg-${category.color}-50 dark:bg-${category.color}-950/20`}
                  >
                    <div className="space-y-4">
                      <p className="text-muted-foreground italic">
                        &ldquo;{category.testimonial.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <img
                            src={category.testimonial.image}
                            alt={category.testimonial.author}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">
                            {category.testimonial.author}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {category.testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={category.image}
                  alt={category.title}
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-tl from-${category.color}-500/20 via-transparent to-transparent`}
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="from-muted/80 via-muted to-muted/80 relative mt-16 rounded-xl bg-gradient-to-r p-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div className="max-w-lg space-y-2">
            <h3 className="text-2xl font-bold">Ready to see the impact?</h3>
            <p className="text-muted-foreground">
              Book a demo to see how our platform can deliver measurable results
              for your business.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row md:items-center">
            <Button variant="outline" asChild>
              <a href="#">Explore case studies</a>
            </Button>
            <Button asChild>
              <a href="#">
                Schedule a demo <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

```

```tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowRight,
  Check,
  Code2,
  LineChart,
  LucideIcon,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Users,
  Wand2,
  Zap,
} from 'lucide-react';

import { cn } from '@/lib/utils';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  benefits: string[];
  image: string;
  imageAlt: string;
  status: 'New' | 'Popular' | 'Coming Soon' | null;
}

const features: Feature[] = [
  {
    id: 'analytics',
    title: 'Advanced Analytics',
    description:
      'Gain deep insights into your data with our comprehensive analytics suite.',
    icon: LineChart,
    benefits: [
      'Real-time reporting and dashboards',
      'Custom metrics and KPIs',
      'Data visualization tools',
      'Export capabilities',
      'Predictive analysis',
    ],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Analytics dashboard with charts and graphs',
    status: 'Popular',
  },
  {
    id: 'security',
    title: 'Enterprise Security',
    description:
      'Keep your data secure with our industry-leading security features.',
    icon: ShieldCheck,
    benefits: [
      'End-to-end encryption',
      'Two-factor authentication',
      'Role-based access control',
      'Security audit logs',
      'Compliance with industry standards',
    ],
    image:
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Security interface showing protection features',
    status: null,
  },
  {
    id: 'automation',
    title: 'Workflow Automation',
    description:
      'Automate repetitive tasks and streamline your business processes.',
    icon: RefreshCw,
    benefits: [
      'Visual workflow builder',
      'Trigger-based automations',
      'Integration with third-party services',
      'Scheduled tasks and reminders',
      'Custom automation rules',
    ],
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Automation workflow diagram',
    status: 'New',
  },
  {
    id: 'collaboration',
    title: 'Team Collaboration',
    description:
      'Work together seamlessly with tools designed for modern teams.',
    icon: Users,
    benefits: [
      'Real-time document editing',
      'Team chat and messaging',
      'Project management tools',
      'Task assignments and tracking',
      'Version history and control',
    ],
    image:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Team collaborating around a table with laptops',
    status: null,
  },
  {
    id: 'ai',
    title: 'AI Assistant',
    description:
      'Leverage artificial intelligence to boost productivity and gain insights.',
    icon: Wand2,
    benefits: [
      'Smart content generation',
      'Data pattern recognition',
      'Automated recommendations',
      'Conversational interface',
      'Learning from your usage patterns',
    ],
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'AI visualization showing machine learning capabilities',
    status: 'Coming Soon',
  },
  {
    id: 'api',
    title: 'Developer API',
    description: 'Build custom integrations and extend platform functionality.',
    icon: Code2,
    benefits: [
      'Comprehensive documentation',
      'RESTful API endpoints',
      'Webhooks for real-time events',
      'SDKs for popular languages',
      'API request monitoring',
    ],
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Developer writing code on multiple screens',
    status: null,
  },
  {
    id: 'customization',
    title: 'Advanced Customization',
    description:
      'Tailor the platform to your specific needs with extensive customization options.',
    icon: Settings,
    benefits: [
      'Custom fields and attributes',
      'Branding and white-labeling',
      'Layout and design options',
      'Workflow customization',
      'Module-based architecture',
    ],
    image:
      'https://images.unsplash.com/photo-1607706189992-eae578626c86?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Customization interface with design options',
    status: null,
  },
];

export default function FeatureAccordion() {
  const [expandedFeature, setExpandedFeature] = useState<string>('analytics');
  const [hoveredBenefit, setHoveredBenefit] = useState<string | null>(null);

  const activeFeature =
    features.find((f) => f.id === expandedFeature) || features[0];

  return (
    <section className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="mb-16 space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Comprehensive Features
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Explore our powerful tools and capabilities designed to help your
          business grow
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-2">
          <Accordion
            type="single"
            value={expandedFeature}
            onValueChange={setExpandedFeature}
            collapsible
            className="w-full"
          >
            {features.map((feature) => (
              <AccordionItem
                key={feature.id}
                value={feature.id}
                className={cn(
                  'mb-3 rounded-lg border px-2',
                  expandedFeature === feature.id
                    ? 'border-primary shadow-sm'
                    : 'border-border'
                )}
              >
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div
                      className={cn(
                        'flex-shrink-0 rounded-md p-2',
                        expandedFeature === feature.id
                          ? 'bg-primary/10'
                          : 'bg-muted'
                      )}
                    >
                      <feature.icon
                        className={cn(
                          'h-5 w-5',
                          expandedFeature === feature.id
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        )}
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{feature.title}</h3>
                        {feature.status && (
                          <span
                            className={cn(
                              'rounded-full px-2 py-0.5 text-xs',
                              feature.status === 'New'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : feature.status === 'Popular'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                  : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                            )}
                          >
                            {feature.status}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground line-clamp-1 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pr-4 pb-4 pl-12">
                  <p className="text-muted-foreground mb-3">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2 text-sm"
                        onMouseEnter={() => setHoveredBenefit(benefit)}
                        onMouseLeave={() => setHoveredBenefit(null)}
                      >
                        <div
                          className={cn(
                            'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full',
                            hoveredBenefit === benefit
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-primary/10 text-primary'
                          )}
                        >
                          <Check className="h-3 w-3" />
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-6">
            <Button asChild size="lg" className="w-full">
              <a href="#">
                Explore all features <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="relative lg:col-span-3">
          <div className="sticky top-24">
            <div className="from-muted/50 to-muted rounded-2xl bg-gradient-to-br p-6 lg:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-background rounded-full p-2">
                    <activeFeature.icon className="text-primary h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {activeFeature.title}
                  </h3>
                </div>
                {activeFeature.status && (
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-xs',
                      activeFeature.status === 'New'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : activeFeature.status === 'Popular'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                    )}
                  >
                    {activeFeature.status}
                  </span>
                )}
              </div>

              <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-lg">
                <img
                  src={activeFeature.image}
                  alt={activeFeature.imageAlt}
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {activeFeature.description}
                </p>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {activeFeature.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-2">
                      <div className="bg-primary/10 text-primary mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Button variant="outline" asChild>
                    <a href="#">Learn more about {activeFeature.title}</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/50 mt-24 rounded-xl p-8 lg:p-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">
              Ready to experience all features?
            </h3>
            <p className="text-muted-foreground">
              Start your free trial today. No credit card required.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" asChild>
              <a href="#">
                <Search className="mr-2 h-4 w-4" />
                Schedule a demo
              </a>
            </Button>
            <Button asChild>
              <a href="#">
                <Zap className="mr-2 h-4 w-4" />
                Start free trial
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

```
