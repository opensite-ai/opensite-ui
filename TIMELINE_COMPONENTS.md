```tsx
import { CircleArrowOutUpRight, Files, Layout } from "lucide-react";

import { cn } from "@/lib/utils";

interface Timeline1Props {
  className?: string;
}

const Timeline1 = ({ className }: Timeline1Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex flex-col items-center justify-center text-center sm:max-w-xl">
          <div className="flex flex-col items-center">
            <span className="flex size-24 items-center justify-center rounded-full border-2 border-foreground">
              <Files className="size-8" strokeWidth={2} />
            </span>
            <h2 className="my-2 text-3xl font-medium">Data Integration</h2>
            <p className="font-mono text-muted-foreground">
              Connect your existing tools and platforms seamlessly. Our system
              automatically syncs and manages your data across all integrated
              services.
            </p>
          </div>
          <span
            className="my-3 h-36 w-0.5"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #000 10%, rgba(255, 255, 255, 0) 0%)",
              backgroundPosition: "left",
              backgroundSize: "3px 15px",
              backgroundRepeat: "repeat-y",
            }}
          ></span>
          <div className="flex flex-col items-center">
            <span className="flex size-24 items-center justify-center rounded-full border-2 border-foreground">
              <Layout className="size-8" strokeWidth={2} />
            </span>
            <h2 className="my-2 text-3xl font-medium">Custom Configuration</h2>
            <p className="font-mono text-muted-foreground">
              Tailor the platform to your needs with our intuitive interface.
              Create powerful workflows without any technical knowledge
              required.
            </p>
          </div>
          <span
            className="my-3 h-36 w-0.5"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, #000 10%, rgba(255, 255, 255, 0) 0%)",
              backgroundPosition: "left",
              backgroundSize: "3px 15px",
              backgroundRepeat: "repeat-y",
            }}
          ></span>
          <div className="flex flex-col items-center">
            <span className="flex size-24 items-center justify-center rounded-full border-2 border-foreground">
              <CircleArrowOutUpRight className="size-8" strokeWidth={2} />
            </span>
            <h2 className="my-2 text-3xl font-medium">Scale Your Business</h2>
            <p className="font-mono text-muted-foreground">
              Access comprehensive analytics and tools designed to help you
              grow. Monitor performance and make data-driven decisions
              effortlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Timeline1 };

```

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const sections = [
  {
    subTitle: "Smart Dashboard",
    title: "Streamline Your Workflow Process",
    description:
      "Leverage our intuitive interface to streamline your workflow. Access powerful tools and features designed to enhance productivity and efficiency.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
  {
    subTitle: "Team Management",
    title: "Collaborate Seamlessly with Teams",
    description:
      "Enable smooth collaboration across your organization. Share resources efficiently with customizable access controls and permission settings.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
  },
  {
    subTitle: "Advanced Analytics",
    title: "Flexible Configuration Options",
    description:
      "Customize your experience with advanced configuration options. Adapt the platform to your specific needs with our versatile solution.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg",
  },
  {
    subTitle: "Automation Tools",
    title: "Simplified User Experience",
    description:
      "Experience a user-friendly interface designed for efficiency. Our intuitive building blocks make complex tasks simple and accessible.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
  },
];

interface Timeline2Props {
  className?: string;
}

const Timeline2 = ({ className }: Timeline2Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;

      let closestSection = 0;
      let closestDistance = Infinity;

      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionCenter = rect.top + rect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = index;
          }
        }
      });

      setActiveIndex(closestSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-7xl">
        <h1 className="mb-14 max-w-2xl text-4xl font-semibold text-balance md:text-5xl">
          Transform your workflow with our solution
        </h1>
        <div className="flex justify-between gap-20">
          <div className="flex flex-col gap-16 md:w-1/2">
            {sections.map((section, index) => (
              <div
                key={index}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className="flex flex-col gap-4 md:h-[50vh]"
              >
                <div className="block rounded-2xl border bg-muted p-4 md:hidden">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="h-full max-h-full w-full max-w-full rounded-2xl object-cover"
                  />
                </div>
                <p className="text-sm font-semibold text-muted-foreground md:text-base">
                  {section.subTitle}
                </p>
                <h1 className="text-2xl font-semibold md:text-4xl">
                  {section.title}
                </h1>
                <p className="text-muted-foreground">{section.description}</p>
              </div>
            ))}
          </div>
          <div className="sticky top-56 right-0 hidden h-fit w-full items-center justify-center md:flex">
            <img
              src={sections[sections.length - 1].image}
              alt={sections[sections.length - 1].title}
              className="invisible h-full max-h-[550px] w-full max-w-full object-cover"
            />

            {sections.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 flex h-full items-center justify-center rounded-2xl border bg-muted p-4 transition-opacity duration-200",
                  index === activeIndex ? "opacity-100" : "opacity-0",
                )}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full max-h-full w-full max-w-full rounded-2xl border object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Timeline2 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature {
  image: string;
  title: string;
  description: string;
}

interface Timeline3Props {
  className?: string;
  heading: string;
  description: string;
  buttons: {
    primary: {
      text: string;
      url: string;
    };
    secondary: {
      text: string;
      url: string;
    };
  };
  features?: Feature[];
}

const Timeline3 = ({
  className,
  heading = "Experience the difference with us",
  description = "We believe in creating lasting partnerships with our clients, focusing on long-term success through collaborative innovation and dedicated support.",
  buttons = {
    primary: {
      text: "Start Now",
      url: "#",
    },
    secondary: {
      text: "Book a demo",
      url: "#",
    },
  },
  features = [
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
      title: "Dedicated Support",
      description:
        "Expanded operations to 5 new countries, reaching millions of new users.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
      title: "Series B Funding",
      description:
        "Secured $50M in Series B funding to accelerate product development.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
      title: "Product Launch",
      description: "Successfully launched our flagship product to market.",
    },
    {
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-5.svg",
      title: "Company Founded",
      description: "Started with a vision to revolutionize the industry.",
    },
  ],
}: Timeline3Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container max-w-6xl">
        <div className="relative grid gap-16 md:grid-cols-2">
          <div className="top-40 h-fit md:sticky">
            <h2 className="mt-4 mb-6 text-4xl font-semibold md:text-5xl">
              {heading}
            </h2>
            <p className="font-medium text-muted-foreground md:text-xl">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-4 lg:flex-row">
              <Button className="gap-2" size="lg" asChild>
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-12 md:gap-20">
            {features.map((feature, index) => (
              <div key={index} className="rounded-xl border p-2">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="aspect-video w-full rounded-xl border border-dashed object-cover"
                />
                <div className="p-6">
                  <h3 className="mb-1 text-2xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Timeline3 };

```

```tsx
import { Cpu, LayoutList, LocateFixed, Rocket, Users } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

const DATA = [
  {
    title: "Get Organized",
    description:
      "Start strong by syncing your calendars and tools like Google Calendar, Trello, and Slack in one place.",
    icon: LayoutList,
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      alt: "Get Organized",
    },
  },
  {
    title: "Track Progress",
    description:
      "Monitor your performance with real-time dashboards and detailed analytics. Stay ahead with automated reports.",
    icon: LocateFixed,
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
      alt: "Track Progress",
    },
    reverse: true,
  },
  {
    title: "Collaborate Seamlessly",
    description:
      "Empower your team with shared dashboards and instant communication tools. Keep everyone aligned with integrated platforms.",
    icon: Users,
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
      alt: "Collaborate Seamlessly",
    },
  },
  {
    title: "Integrate Seamlessly",
    description:
      "Integrate seamlessly across multiple platforms to enable smooth, automated task handovers.",
    icon: Cpu,
    image: {
      src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
      alt: "Integrate Seamlessly",
    },
    reverse: true,
  },
];

const Timeline4 = () => {
  return (
    <section className="py-32">
      <div className="border-y">
        <div className="container flex flex-col gap-6 border-x py-4 max-lg:border-x lg:py-8">
          <Badge
            variant="outline"
            className="w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
          >
            <Rocket className="size-4" />
            <span>Accelerate</span>
          </Badge>
          <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
            Accelerate your planning journey
          </h2>
          <p className="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
            Take control of your workflow step-by-step with smart tools,
            actionable insights, and seamless collaboration
          </p>
        </div>
      </div>

      <div className="container overflow-hidden border-x pb-40 lg:pt-20 [&>*:last-child]:pb-20 [&>div>div:first-child]:pt-20!">
        {DATA.map((item, index) => (
          <div key={index} className="relative flex">
            <div
              className={`flex w-full justify-center px-1 py-10 text-end md:gap-6 lg:gap-10 ${item?.reverse ? "lg:flex-row-reverse lg:text-start" : ""} `}
            >
              <div className="flex-1 max-lg:hidden">
                <h3 className="text-2xl tracking-[-0.96px]">{item.title}</h3>
                <p
                  className={`mt-2.5 max-w-[300px] tracking-[-0.32px] text-balance text-muted-foreground ${item?.reverse ? "" : "ml-auto"}`}
                >
                  {item.description}
                </p>
              </div>
              <div className="z-[-1] size-fit -translate-y-5 bg-background p-4 max-lg:-translate-x-4">
                <div className="rounded-[10px] border bg-card p-[5px] shadow-md">
                  <div className="size-fit rounded-md border bg-muted p-1">
                    <item.icon className="size-4 shrink-0" />
                  </div>
                </div>
              </div>
              <div className="flex-1 max-lg:-translate-x-4">
                <div className="text-start lg:pointer-events-none lg:hidden">
                  <h3 className="text-2xl tracking-[-0.96px]">{item.title}</h3>
                  <p className="mt-2.5 mb-10 max-w-[300px] tracking-[-0.32px] text-balance text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-start justify-start">
                  <div className={` ${item?.reverse ? "lg:ml-auto" : ""}`}>
                    <div className="px-6 lg:px-10">
                      <DiagonalPattern className="h-6 lg:h-10" />
                    </div>
                    <div className="relative grid grid-cols-[auto_1fr_auto] items-stretch">
                      <DiagonalPattern className="h-full w-6 lg:w-10" />
                      <img
                        src={item.image.src}
                        width={400}
                        height={500}
                        alt={item.image.alt}
                        className="object-contain dark:invert"
                      />
                      <DiagonalPattern className="w-6 lg:w-10" />
                    </div>
                    <div className="px-6 lg:px-10">
                      <DiagonalPattern className="h-6 lg:h-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`absolute z-[-2] h-full w-[3px] translate-x-5 rounded-full lg:left-1/2 lg:-translate-x-1/2 ${index === DATA.length - 1 ? "bg-linear-to-b from-foreground/10 via-foreground/10 to-transparent" : "bg-foreground/10"}`}
            >
              {index == 0 && (
                <div className="h-4 w-[3px] -translate-y-full bg-linear-to-b from-transparent to-foreground/10"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="h-8 w-full border-y md:h-12 lg:h-28">
        <div className="container h-full w-full border-x"></div>
      </div>
    </section>
  );
};

export { Timeline4 };

const DiagonalPattern = ({
  className,
  patternColor = "hsl(var(--foreground))",
  patternOpacity = 0.15,
}: {
  className?: string;
  patternColor?: string;
  patternOpacity?: number;
}) => {
  const svgPattern = `url("data:image/svg+xml,%3Csvg width='7' height='7' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${patternColor}' fill-opacity='${patternOpacity}' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`;

  return (
    <div
      className={cn("h-full w-full border-2 border-dashed", className)}
      style={{
        backgroundImage: svgPattern,
      }}
    />
  );
};

```

```tsx
"use client";

import { Cloud, Sparkles, Users, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface DataItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DATA: DataItem[] = [
  {
    icon: <Cloud strokeWidth={1.5} className="size-12" />,
    title: "AI-Driven Insights",
    description:
      "Leverage advanced AI algorithms to gain actionable insights and make data-driven decisions for your business.",
  },
  {
    icon: <XCircle strokeWidth={1.5} className="size-12" />,
    title: "Error-Free Automation",
    description:
      "Eliminate manual errors with intelligent automation tools that ensure accuracy and consistency across all processes.",
  },
  {
    icon: <Users strokeWidth={1.5} className="size-12" />,
    title: "Seamless Team Collaboration",
    description:
      "Enhance teamwork with AI-powered collaboration tools that enable real-time communication and shared workflows.",
  },
];

interface Timeline5Props {
  className?: string;
}

const Timeline5 = ({ className }: Timeline5Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Fixed Content */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                Unlock{" "}
                <span className="relative inline-block">
                  <span className="text-muted-foreground">AI</span>
                  <Sparkles className="absolute -top-2 -right-4 size-5 fill-yellow-500 stroke-none" />
                </span>
                <br />
                for your existing workflows
              </h2>
              <p className="mt-12 text-base text-muted-foreground">
                Seamlessly integrate AI into your workflows. Automate tasks,
                enhance efficiency, and stay ahead.
              </p>
            </div>
          </div>

          {/* Right Column - Scrollable Cards */}
          <div className="-mt-8 sm:-mt-12">
            {DATA.map((item, index) => (
              <div
                key={index}
                className="relative my-12 overflow-hidden rounded-lg bg-muted px-8 py-16 shadow-none sm:px-12 sm:py-24 lg:px-16 lg:py-32"
              >
                <div className="gap-4 sm:gap-6">
                  <div className="block shrink-0">{item.icon}</div>
                  <div className="absolute top-12 right-12 font-mono text-5xl">
                    0{index + 1}
                  </div>
                  <div className="mt-6">
                    <h4 className="mb-2 text-2xl font-semibold text-primary">
                      {item.title}
                    </h4>
                    <p className="mt-6 text-xs text-muted-foreground sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Timeline5 };

```

```tsx
import { Clock, Cloud, FileCheck, Scale, Users, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";

interface DataItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const DATA: DataItem[] = [
  {
    icon: <Cloud strokeWidth={1.5} className="size-12" />,
    title: "Boost Productivity",
    description:
      "Streamline your workflows and eliminate inefficiencies with our advanced task management tools.",
  },
  {
    icon: <XCircle strokeWidth={1.5} className="size-12" />,
    title: "Minimize Errors",
    description:
      "Automate repetitive tasks to reduce human error and ensure consistent results.",
  },
  {
    icon: <Users strokeWidth={1.5} className="size-12" />,
    title: "Enhance Collaboration",
    description:
      "Improve team communication and collaboration with real-time updates and shared workspaces.",
  },
  {
    icon: <Scale strokeWidth={1.5} className="size-12" />,
    title: "Scale Seamlessly",
    description:
      "Grow your team and projects without hassle, thanks to flexible and scalable solutions.",
  },
  {
    icon: <FileCheck strokeWidth={1.5} className="size-12" />,
    title: "Track Progress",
    description:
      "Stay on top of your goals with detailed progress tracking and actionable insights.",
  },
  {
    icon: <Clock strokeWidth={1.5} className="size-12" />,
    title: "Save Time",
    description:
      "Focus on what matters most by automating time-consuming tasks and processes.",
  },
];

interface Timeline6Props {
  className?: string;
}

const Timeline6 = ({ className }: Timeline6Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Fixed Content */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="max-w-lg">
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
                Our tools make
                <br />
                productivity your
                <br />
                <span className="text-muted-foreground">superpower</span>
              </h2>
            </div>
          </div>

          {/* Right Column - Scrollable Cards */}
          <div className="-mt-8 sm:-mt-12">
            {DATA.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col justify-center overflow-hidden border-b py-8 shadow-none sm:py-12"
              >
                <div className="flex gap-4 sm:gap-6">
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="mb-2 text-2xl font-semibold text-primary sm:text-3xl">
                      {item.title}
                    </h4>
                    <p className="mt-6 text-sm text-muted-foreground sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Timeline6 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Circle } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Timeline7Props {
  className?: string;
}

interface StepProps {
  title: string;
  imageSrc: string;
  description: string;
}

const steps: StepProps[] = [
  {
    title: "Introduction",
    imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    description:
      "Welcome to our step-by-step guide. This introduction will help you get started with the process and understand what to expect.",
  },
  {
    title: "Personal Information",
    imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    description:
      "In this section, we'll collect some basic information about you to personalize your experience and provide better recommendations.",
  },
  {
    title: "Address Details",
    imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    description:
      "Please provide your address details so we can deliver your products to the right location and calculate shipping costs.",
  },
  {
    title: "Review & Submit",
    imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
    description:
      "Take a moment to review all the information you've provided before finalizing your submission. You can go back to any step.",
  },
];

const ProcessBar: React.FC<{
  currentStep: number;
  steps: StepProps[];
}> = ({ currentStep, steps }) => (
  <div className="relative w-full scale-75">
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <React.Fragment key={step.title}>
          <div className="flex flex-col items-center">
            <motion.div
              className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                index <= currentStep
                  ? "bg-neutral-800 text-white"
                  : "bg-gray-200 text-white dark:bg-gray-800 dark:text-gray-600"
              }`}
              animate={{ scale: 1.02 }}
            >
              {index < currentStep ? (
                <Check size={17} />
              ) : (
                <Circle size={17} fill="white" />
              )}
            </motion.div>
          </div>
          {index < steps.length - 1 && (
            <div className="relative grow">
              <div className="absolute -top-1 h-1.5 w-full bg-muted" />
              <motion.div
                className="absolute -top-1 h-1.5 w-full bg-primary"
                initial={{ width: "0%" }}
                animate={{
                  width: index < currentStep ? "100%" : "0%",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const StepperContent: React.FC<{ step: StepProps }> = ({ step }) => {
  return (
    <div className="my-4 flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-muted p-6 text-center">
      <motion.div
        key={step.imageSrc}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex h-[200px] w-[500px] items-center justify-center overflow-hidden"
      >
        <img
          src={step.imageSrc}
          alt={step.title}
          className="w-[500px]"
          onError={(e) => {
            e.currentTarget.src = "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg";
          }}
        />
      </motion.div>
      <p className="mt-6 px-10 text-base leading-snug font-normal tracking-tight text-muted-foreground">
        {step.description}
      </p>
    </div>
  );
};

const NavButtons: React.FC<{
  currentStep: number;
  totalSteps: number;
  handlePrev: () => void;
  handleNext: () => void;
}> = ({ handlePrev, handleNext }) => (
  <div className="flex w-full justify-end gap-3 tracking-tight">
    <Button
      onClick={handlePrev}
      className="flex gap-2 transition-all ease-in-out hover:gap-4"
      variant="secondary"
    >
      <ChevronLeft size={20} />
      Previous
    </Button>

    <Button
      onClick={handleNext}
      className="flex gap-2 transition-all ease-in-out hover:gap-4"
      variant="default"
    >
      Next
      <ChevronRight size={20} />
    </Button>
  </div>
);

const Timeline7: React.FC<Timeline7Props> = ({ className }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container flex max-w-2xl flex-col items-center gap-10 md:gap-0">
        <h1 className="mb-10 text-center text-6xl font-bold tracking-tighter text-foreground">
          Stepper
        </h1>
        <ProcessBar currentStep={currentStep} steps={steps} />
        <StepperContent step={steps[currentStep]} />
        <NavButtons
          handlePrev={handlePrev}
          handleNext={handleNext}
          currentStep={currentStep}
          totalSteps={steps.length}
        />
      </div>
    </section>
  );
};

export { Timeline7 };

```

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type TimelineEntry = {
  date: string;
  items: {
    content: string;
    highlights?: { text: string; position: number }[];
  }[];
};

const timelineData: TimelineEntry[] = [
  {
    date: "March 21, 2025",
    items: [
      {
        content:
          "Launched <strong>AI-powered code generation</strong> in our IDE, allowing developers to generate boilerplate code with natural language prompts.",
      },
      {
        content:
          "Introduced <em>contextual code suggestions</em> that understand project structure and coding patterns for more accurate completions.",
      },
      {
        content:
          "Added <u>automated code refactoring</u> capabilities that suggest and apply improvements to existing codebases.",
      },
    ],
  },
  {
    date: "March 19, 2025",
    items: [
      {
        content:
          "Released <strong>AI-driven debugging assistant</strong> that identifies potential issues and suggests fixes before runtime.",
      },
      {
        content:
          "Implemented <em>smart documentation generation</em> that automatically creates comprehensive docs from code comments and structure.",
      },
      {
        content:
          "Enhanced <u>code review automation</u> with AI-powered analysis of code quality and best practices.",
      },
    ],
  },
  {
    date: "March 17, 2025",
    items: [
      {
        content:
          "Announced <strong>AI pair programming</strong> feature that provides real-time coding assistance and explanations.",
      },
      {
        content:
          "Launched <em>intelligent dependency management</em> that suggests optimal package versions and identifies potential conflicts.",
      },
      {
        content:
          "Introduced <u>automated test generation</u> that creates comprehensive test suites based on code functionality.",
      },
    ],
  },
];

interface Timeline8Props {
  className?: string;
}

const Timeline8 = ({ className }: Timeline8Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <h1 className="mb-10 text-center text-3xl font-bold tracking-tighter text-foreground lg:text-6xl">
          Timeline
        </h1>
        <div className="relative mx-auto max-w-4xl">
          <Separator
            orientation="vertical"
            className="absolute top-4 left-2 bg-muted"
          />
          {timelineData.map((entry, index) => (
            <div key={index} className="relative mb-10 pl-8">
              <div className="absolute top-2 left-0 flex size-5 items-center justify-center rounded-full bg-foreground">
                <div className="size-3 rounded-full bg-background" />
              </div>
              <Badge
                variant="secondary"
                className="mb-4 rounded-xl px-3 py-2 text-sm"
              >
                {entry.date}
              </Badge>

              <Card className="my-5 border-none shadow-none">
                <CardContent className="px-2">
                  <ul className="flex flex-col gap-1">
                    {entry.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 flex-none rounded-full bg-foreground" />
                        <span
                          className="text-md leading-relaxed text-foreground"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Timeline8 };

```

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type TimelineEntry = {
  date: string;
  title: string;
  content: string;
};

const timelineData: TimelineEntry[] = [
  {
    date: "1956",
    title: "The Birth of AI",
    content:
      "The term 'Artificial Intelligence' was coined at the Dartmouth Conference, marking the official beginning of AI as a field. John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon organized this seminal event, setting the stage for decades of research and development.",
  },
  {
    date: "1966-1973",
    title: "Early Optimism and First AI Winter",
    content:
      "The early years saw significant optimism with programs like ELIZA (the first chatbot) and SHRDLU (a natural language understanding system). However, by the early 1970s, funding dried up as researchers faced the limitations of early computing power and the complexity of human intelligence.",
  },
  {
    date: "1980-1987",
    title: "Expert Systems and Revival",
    content:
      "AI experienced a revival with the development of expert systems like MYCIN (for medical diagnosis) and DENDRAL (for chemical analysis). These systems used rule-based approaches to mimic human decision-making in specific domains, leading to renewed interest and funding in AI research.",
  },
  {
    date: "1997",
    title: "Deep Blue Defeats Chess Champion",
    content:
      "IBM's Deep Blue became the first computer system to defeat a reigning world chess champion, Garry Kasparov, in a six-game match. This milestone demonstrated AI's potential to outperform humans in complex strategic games and captured the public's imagination.",
  },
];

interface Timeline9Props {
  className?: string;
}

const Timeline9 = ({ className }: Timeline9Props) => {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <h1 className="mb-10 text-center text-3xl font-bold tracking-tighter text-foreground sm:text-6xl">
          The History of Artificial Intelligence
        </h1>
        <div className="relative mx-auto max-w-4xl">
          <Separator
            orientation="vertical"
            className="absolute top-4 left-2 bg-muted"
          />
          {timelineData.map((entry, index) => (
            <div key={index} className="relative mb-10 pl-8">
              <div className="absolute top-3.5 left-0 flex size-4 items-center justify-center rounded-full bg-foreground" />
              <h4 className="rounded-xl py-2 text-xl font-bold tracking-tight xl:mb-4 xl:px-3">
                {entry.title}
              </h4>

              <h5 className="text-md top-3 -left-34 rounded-xl tracking-tight text-muted-foreground xl:absolute">
                {entry.date}
              </h5>

              <Card className="my-5 border-none shadow-none">
                <CardContent className="px-0 xl:px-2">
                  <div
                    className="prose text-foreground dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: entry.content }}
                  />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Timeline9 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Timeline10Props {
  className?: string;
}

const Timeline10 = ({ className }: Timeline10Props) => {
  const currentPhase = 2;

  const timelinePhases = [
    {
      id: 0,
      date: "January 15, 2024",
      title: "Phase I",
      description:
        "Initial data collection and model architecture design for the AI system.",
    },
    {
      id: 1,
      date: "March 30, 2024",
      title: "Phase II",
      description:
        "Model training and validation with core dataset implementation.",
    },
    {
      id: 2,
      date: "June 15, 2024",
      title: "Phase III",
      description:
        "Integration of advanced features and performance optimization.",
    },
    {
      id: 3,
      date: "September 1, 2024",
      title: "Phase IV",
      description:
        "Final testing, deployment, and continuous improvement system launch.",
    },
  ];

  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container flex flex-col items-center">
        <h1 className="mb-10 text-center text-3xl font-bold tracking-tighter text-foreground sm:text-6xl">
          Timeline
        </h1>
        <Card className="relative w-full border-none shadow-none md:py-16">
          <CardContent className="p-0">
            <div className="relative flex flex-col items-center md:mt-12">
              <Separator className="absolute -top-8 left-0 hidden md:block" />
              {currentPhase && (
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${(currentPhase / timelinePhases.length) * 104}%`,
                  }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  className={cn(
                    "absolute -top-8 left-0 hidden h-0.5 bg-foreground md:block",
                  )}
                />
              )}

              <div className="grid gap-6 md:grid-cols-4">
                {timelinePhases.map((phase, index) => (
                  <div key={phase.id} className="relative space-y-2">
                    <Separator
                      orientation="vertical"
                      className="absolute top-6 left-0 block md:hidden"
                    />
                    {index == 0 && (
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{
                          height: currentPhase * 112,
                        }}
                        transition={{ ease: "easeOut", duration: 0.5 }}
                        className={cn(
                          "absolute left-0 z-10 w-0.5 bg-foreground md:hidden",
                        )}
                      />
                    )}
                    <div className="absolute top-0 -left-[9px] z-10 mb-5 flex size-5 items-center justify-center rounded-full bg-foreground p-1 md:-top-10 md:left-0">
                      <div className="size-full rounded-full bg-background" />
                    </div>

                    <div className="pl-7 md:pl-0">
                      <p className="text-sm text-muted-foreground">
                        {phase.date}
                      </p>
                      <h2 className="text-xl font-bold tracking-tighter text-foreground">
                        {phase.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export { Timeline10 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import { Cpu, FlagIcon, LocateFixed, RocketIcon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Timeline11Props {
  className?: string;
}

const Timeline11 = ({ className }: Timeline11Props) => {
  const currentPhase = 2;
  const timelinePhases = [
    {
      id: 0,
      date: "January 15, 2024",
      title: "Phase I",
      description: "Project initialization and strategic planning begins.",
      icon: RocketIcon,
    },
    {
      id: 1,
      date: "March 10, 2024",
      title: "Phase II",
      description: "Detailed research and preliminary development stage.",
      icon: Cpu,
    },
    {
      id: 2,
      date: "June 5, 2024",
      title: "Phase III",
      description: "Core implementation and major milestones achieved.",
      icon: LocateFixed,
    },
    {
      id: 3,
      date: "September 20, 2024",
      title: "Phase IV",
      description: "Final refinements and project completion.",
      icon: FlagIcon,
    },
  ];

  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container flex flex-col items-center justify-center">
        <h1 className="mb-10 text-center text-3xl font-bold tracking-tighter text-foreground sm:text-6xl">
          Timeline
        </h1>
        <Card className="relative w-full border-none shadow-none md:py-16">
          <CardContent className="relative flex flex-col items-center p-0 md:mt-12">
            <Separator className="absolute -top-8 left-0 hidden md:block" />
            {currentPhase && (
              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width: `${(currentPhase / timelinePhases.length) * 104}%`,
                }}
                transition={{ ease: "easeOut", duration: 0.5 }}
                className={cn(
                  "absolute -top-[33px] left-0 hidden h-0.5 bg-foreground md:block",
                )}
              />
            )}
            <div className="grid gap-6 md:grid-cols-4">
              {timelinePhases.map((phase, index) => {
                const PhaseIcon = phase.icon;
                return (
                  <div key={phase.id} className="relative space-y-2">
                    <Separator
                      orientation="vertical"
                      className="absolute top-6 left-2.5 block md:hidden"
                    />
                    {index == 0 && (
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{
                          height: currentPhase * 125,
                        }}
                        transition={{ ease: "easeOut", duration: 0.5 }}
                        className={cn(
                          "absolute top-22 left-2.5 z-10 w-0.5 bg-foreground md:hidden",
                        )}
                      />
                    )}
                    <div className="absolute top-4 -left-6 z-10 mb-5 flex size-18 items-center justify-center rounded-full bg-background p-1 md:-top-17 md:-left-4">
                      <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background p-[5px]">
                        <div className="flex size-full items-center justify-center rounded-md border border-border bg-muted">
                          <PhaseIcon size={16} />
                        </div>
                      </div>
                    </div>

                    <div className="pl-13 md:pl-0">
                      <p className="mt-10 text-sm text-muted-foreground">
                        {phase.date}
                      </p>
                      <h2 className="text-xl font-bold tracking-tighter text-foreground">
                        {phase.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export { Timeline11 };

```

```tsx
"use client";

import { motion } from "framer-motion";
import { DownloadIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Timeline12Props {
  className?: string;
}

const Timeline12 = ({ className }: Timeline12Props) => {
  const PHASES__DATA = [
    {
      id: "phase1",
      phase: "1",
      title: "Initialize",
      date: "02/03/2025",
      heading: "How to Initialize",
      description:
        "This phase covers the basics of getting started. Learn how to set up, configure, and prepare for the next steps.This phase covers the basics of getting started. Learn how to set up, configure, and prepare for the next steps.",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
      imageAlt: "Phase 1 illustration",
    },
    {
      id: "phase2",
      phase: "2",
      title: "Build",
      date: "21/03/2025",
      heading: "How to Build",
      description:
        "In this phase, focus on structuring and building the core components. Understand best practices for development.In this phase, focus on structuring and building the core components. Understand best practices for development.",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
      imageAlt: "Phase 2 illustration",
    },
    {
      id: "phase3",
      phase: "3",
      title: "Test",
      date: "06/04/2025",
      heading: "How to Test",
      description:
        "Testing ensures quality and reliability. Learn about debugging, fixing issues, and refining the project.Testing ensures quality and reliability. Learn about debugging, fixing issues, and refining the project.",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
      imageAlt: "Phase 3 illustration",
    },
    {
      id: "phase4",
      phase: "4",
      title: "Launch",
      date: "14/04/2025",
      heading: "How to Launch",
      description:
        "The final phase focuses on optimization, deployment, and ensuring everything runs smoothly for release.The final phase focuses on optimization, deployment, and ensuring everything runs smoothly for release.",
      imageSrc: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
      imageAlt: "Phase 4 illustration",
    },
  ];

  return (
    <section className={cn("bg-background", className)}>
      <div className="container flex flex-col items-center justify-center py-32">
        <h1 className="mb-12 text-5xl font-semibold tracking-tighter lg:mb-25 lg:text-7xl">
          Just Four Phases
        </h1>
        <Tabs defaultValue="phase1" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-transparent p-0">
            {PHASES__DATA.map((phase) => (
              <TabsTrigger
                key={phase.id}
                className="text-md rounded-none border-b-2 pb-6 shadow-none! data-[state=active]:border-b-foreground"
                value={phase.id}
              >
                <span className="hidden font-mono text-foreground/40 md:inline">
                  {phase.phase}
                </span>
                {phase.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {PHASES__DATA.map((phase) => (
            <TabsContent
              key={phase.id}
              value={phase.id}
              className="mt-12 grid items-start gap-12 lg:grid-cols-2"
            >
              <div className="col-span-1 flex flex-col gap-2 lg:max-w-lg lg:gap-4">
                <p className="font-mono text-sm font-semibold tracking-tight text-muted-foreground">
                  {phase.date}
                </p>
                <h2 className="text-3xl font-medium tracking-tighter text-foreground md:text-5xl">
                  {phase.heading}
                </h2>
                <p className="text-lg font-normal tracking-tighter text-muted-foreground">
                  {phase.description}
                </p>
                <Button
                  variant="outline"
                  className="mt-8 flex w-fit items-center gap-2 rounded-full border border-border px-4! py-2"
                >
                  <DownloadIcon className="size-4" />
                  <p className="text-md font-medium text-foreground">
                    Click to{" "}
                    <span className="text-foreground/80">Download the app</span>
                  </p>
                </Button>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 100, y: 0 }}
                transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.8 }}
                className="relative z-20 col-span-1"
              >
                <Card className="group h-110 w-full rounded-3xl border border-border bg-background p-2 shadow-none">
                  <CardContent className="size-full rounded-2xl border-2 border-background bg-muted">
                    <img
                      src={phase.imageSrc}
                      className="size-full transition-all ease-in-out group-hover:scale-95"
                      alt={phase.imageAlt}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export { Timeline12 };

```

```tsx
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Timeline13Props {
  className?: string;
}

const Timeline13 = ({ className }: Timeline13Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="flex flex-col">
          <h1 className="mb-2 text-3xl font-semibold md:text-5xl">
            Journey to Product Launch
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Follow the essential steps to bring your innovative idea to market
            and ensure a successful product debut.
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-6 rounded-xl border border-border bg-card p-4 sm:p-8 lg:p-11">
          <div className="contents items-center justify-between sm:flex">
            <h2 className="text-2xl font-semibold tracking-tight">
              Guidance from industry leaders
            </h2>
            <Button className="order-last">Request a demo</Button>
          </div>
          <div className="mt-3 flex gap-4 sm:flex-col">
            <div className="relative">
              <div className="grid h-full w-4 justify-center gap-10 sm:h-4 sm:w-auto sm:grid-cols-3 sm:items-center">
                <div className="absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-ring sm:inset-auto sm:left-auto sm:h-px sm:w-full sm:translate-x-0" />
                <span className="relative top-3 size-2 rounded-full bg-ring sm:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-ring sm:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-ring sm:top-0" />
              </div>
              <div className="animate-timeline-reveal absolute inset-0 grid h-full w-4 justify-center gap-10 sm:h-4 sm:w-auto sm:grid-cols-3 sm:items-center">
                <div className="absolute inset-0 left-1/2 w-px -translate-x-1/2 bg-primary sm:inset-auto sm:left-auto sm:h-px sm:w-full sm:translate-x-0" />
                <span className="relative top-3 size-2 rounded-full bg-primary sm:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-primary sm:top-0" />
                <span className="relative top-3 size-2 rounded-full bg-primary sm:top-0" />
              </div>
            </div>
            <div className="grid gap-10 sm:grid-cols-3">
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex h-8 w-fit items-center gap-px overflow-hidden rounded-md border border-border bg-border text-sm font-medium">
                    <span className="grid h-full place-items-center bg-background px-2">
                      01
                    </span>
                    <span className="grid h-full place-items-center bg-background px-2">
                      Ideation
                    </span>
                  </div>
                  <h3 className="mt-5 font-medium">
                    Brainstorm and validate your concept
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Gather insights from market research, customer interviews,
                    and competitor analysis to refine your product idea.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Progress value={15} className="h-1 flex-1" />
                    <span className="w-8 text-right text-xs text-muted-foreground">
                      15%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">~2 weeks</p>
                </div>
              </div>
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex h-8 w-fit items-center gap-px overflow-hidden rounded-md border border-border bg-border text-sm font-medium">
                    <span className="grid h-full place-items-center bg-background px-2">
                      02
                    </span>
                    <span className="grid h-full place-items-center bg-background px-2">
                      Development
                    </span>
                  </div>
                  <h3 className="mt-5 font-medium">Build your MVP</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Design, prototype, and develop the minimum viable product.
                    Iterate quickly based on early feedback and testing.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Progress value={85} className="h-1 flex-1" />
                    <span className="w-8 text-right text-xs text-muted-foreground">
                      85%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">~6 weeks</p>
                </div>
              </div>
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex h-8 w-fit items-center gap-px overflow-hidden rounded-md border border-border bg-border text-sm font-medium">
                    <span className="grid h-full place-items-center bg-background px-2">
                      03
                    </span>
                    <span className="grid h-full place-items-center bg-background px-2">
                      Launch
                    </span>
                  </div>
                  <h3 className="mt-5 font-medium">Go to market</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Execute your launch plan with marketing campaigns, outreach,
                    and customer support to maximize impact and adoption.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Progress value={100} className="h-1 flex-1" />
                    <span className="w-8 text-right text-xs text-muted-foreground">
                      100%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Launch complete
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
        /* Mobile: Top to bottom animation */
        @keyframes timeline-reveal-mobile {
          from {
            clip-path: inset(0 0 100% 0);
          }
          to {
            clip-path: inset(0% 0 0 0);
          }
        }
        
        /* Desktop: Left to right animation */
        @keyframes timeline-reveal-desktop {
          from {
            clip-path: inset(0 100% 0 0);
          }
          to {
            clip-path: inset(0 0% 0 0);
          }
        }
        
        .animate-timeline-reveal {
          animation: timeline-reveal-mobile 5s linear;
        }
        
        @media (min-width: 640px) {
          .animate-timeline-reveal {
            animation: timeline-reveal-desktop 5s linear;
          }
        }
        `}
      </style>
    </section>
  );
};

export { Timeline13 };

```

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const data = [
  {
    title: "Company Foundation",
    description:
      "Started our journey with a simple idea: make technology accessible to everyone. What began as a small team of three developers in a garage has now become the foundation of our mission to democratize software development.",
    date: "2020",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  {
    title: "First Product Launch",
    description:
      "After months of development, we launched our first product to the public. The response was overwhelming - 10,000 users signed up in the first week, validating our vision and giving us the confidence to scale further.",
    date: "2021",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  {
    title: "Series A Funding",
    description:
      "Secured our Series A round led by prominent VCs who believed in our mission. This funding allowed us to expand our team, invest in R&D, and prepare for international expansion.",
    date: "2022",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  {
    title: "Global Expansion",
    description:
      "Opened offices in London, Tokyo, and São Paulo, marking our transition from a local startup to a global technology company. Our platform now serves over 500,000 users across 50 countries.",
    date: "2023",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
];

interface Timeline14Props {
  className?: string;
}

const Timeline14 = ({ className }: Timeline14Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = itemRefs.current.findIndex(
            (ref) => ref === entry.target,
          );
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    itemRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <h1 className="max-w-4xl text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
          <span className="font-medium">From Startup to Global Platform</span>
          <br />
          <span className="text-muted-foreground"> Our Journey</span>
        </h1>
      </div>
      <div className="relative mt-16 lg:mt-28">
        <div className="sticky top-0 z-10 border-y bg-background py-3.5">
          <div className="container">
            <div className="flex justify-between gap-4 text-2xl md:text-4xl">
              <p className="font-mono text-muted-foreground">
                {String(activeIndex + 1).padStart(2, "0")}
              </p>
              <p className="font-mono">{data[activeIndex]?.date}</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="flex flex-col">
            {data.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={cn(
                  "flex flex-col items-center gap-7 py-14 opacity-50 transition-opacity duration-300 md:flex-row md:gap-10 md:py-20",
                  index === activeIndex && "opacity-100",
                )}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-16/12 rounded-lg border object-cover md:w-1/3 md:max-w-[440px]"
                />
                <div>
                  <h2 className="mb-3 text-2xl font-medium md:mb-4 md:text-4xl">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground md:text-balance">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Timeline14 };

```
