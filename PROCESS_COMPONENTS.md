```tsx
import { Asterisk, CornerDownRight } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Process1Props {
  className?: string;
}

const Process1 = ({ className }: Process1Props) => {
  const process = [
    {
      step: "01",
      title: "Discover & Research",
      description:
        "We begin by understanding your business goals, target audience, and current challenges. This phase involves research, analysis, and strategic planning to identify opportunities.",
    },
    {
      step: "02",
      title: "Strategy & Planning",
      description:
        "Based on our findings, we develop a comprehensive strategy that aligns with your objectives. This includes defining the approach, timeline, and key milestones for success.",
    },
    {
      step: "03",
      title: "Execute & Develop",
      description:
        "We bring the strategy to life through careful implementation and development. Our team works collaboratively to ensure every detail meets your requirements and standards.",
    },
    {
      step: "04",
      title: "Optimize & Improve",
      description:
        "We continuously monitor performance and gather feedback to refine and improve the solution. This iterative process ensures long-term success and growth.",
    },
  ];

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-20">
          <div className="top-10 col-span-2 h-fit w-fit gap-3 space-y-7 py-8 lg:sticky">
            <div className="relative w-fit text-5xl font-semibold tracking-tight lg:text-7xl">
              {" "}
              <h1 className="w-fit">Our Process</h1>
              <Asterisk className="absolute -top-2 -right-2 size-5 text-orange-500 md:size-10 lg:-right-14" />
            </div>
            <p className="text-base text-foreground/50">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
              amet dolorem eum est voluptatem id repellendus ut laborum
              laboriosam debitis.
            </p>

            <Button
              variant="ghost"
              className="flex items-center justify-start gap-2"
            >
              <CornerDownRight className="text-orange-500" />
              Get in touch
            </Button>
          </div>
          <ul className="relative col-span-4 w-full lg:pl-22">
            {process.map((step, index) => (
              <li
                key={index}
                className="relative flex flex-col justify-between gap-10 border-t py-8 md:flex-row lg:py-10"
              >
                <Illustration className="absolute top-4 right-0" />

                <div className="flex size-12 items-center justify-center bg-muted px-4 py-1 tracking-tighter">
                  0{index + 1}
                </div>
                <div className="">
                  <h3 className="mb-4 text-2xl font-semibold tracking-tighter lg:text-3xl">
                    {step.title}
                  </h3>
                  <p className="text-foreground/50">{step.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Process1 };

const Illustration = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line
        x1="0.607422"
        y1="2.57422"
        x2="21.5762"
        y2="2.57422"
        stroke="#FF0000"
        strokeWidth="4"
      />
      <line
        x1="19.5762"
        y1="19.624"
        x2="19.5762"
        y2="4.57422"
        stroke="#FF0000"
        strokeWidth="4"
      />
    </svg>
  );
};

```

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { CornerDownRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

// Custom hook to get previous value
const usePrevious = <T,>(value: T): T | undefined => {
  const [prev, setPrev] = useState<T | undefined>(undefined);
  const ref = useRef(value);

  useEffect(() => {
    setPrev(ref.current);
    ref.current = value;
  }, [value]);

  return prev;
};

interface Process2Props {
  className?: string;
}

const Process2 = ({ className }: Process2Props) => {
  const process = [
    {
      step: "01",
      title: "Discover & Research",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img11.png",
      description:
        "We begin by understanding your business goals, target audience, and current challenges. This phase involves research, analysis, and strategic planning to identify opportunities.",
    },
    {
      step: "02",
      title: "Strategy & Planning",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img12.png",
      description:
        "Based on our findings, we develop a comprehensive strategy that aligns with your objectives. This includes defining the approach, timeline, and key milestones for success.",
    },
    {
      step: "03",
      title: "Execute & Develop",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img10.png",
      description:
        "We bring the strategy to life through careful implementation and development. Our team works collaboratively to ensure every detail meets your requirements and standards.",
    },
    {
      step: "04",
      title: "Optimize & Improve",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img9.png",
      description:
        "We continuously monitor performance and gather feedback to refine and improve the solution. This iterative process ensures long-term success and growth.",
    },
  ];

  const [active, setActive] = useState<number>(0);
  const previousActive = usePrevious(active);

  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-20">
          <div className="top-10 h-fit w-fit gap-3 space-y-7 py-8 lg:sticky">
            <h1 className="relative w-fit text-5xl font-semibold tracking-tight lg:text-7xl">
              Our Process
            </h1>
            <p className="text-base text-foreground/50">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
              amet dolorem eum est voluptatem id repellendus ut laborum
              laboriosam debitis.
            </p>
            <div className="relative h-90 overflow-hidden border">
              {previousActive !== undefined && (
                <div className="absolute top-0 h-full w-full">
                  <img
                    src={process[previousActive].image}
                    className="h-full w-full object-cover"
                    alt=""
                  />
                </div>
              )}
              <motion.div
                initial={{ clipPath: "inset(100% 100% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                key={active}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                }}
                className="h-full w-full"
              >
                <img
                  src={process[active].image}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </motion.div>
            </div>
            <Button
              variant="ghost"
              className="flex items-center justify-start gap-2"
            >
              <CornerDownRight className="text-orange-500" />
              Get in touch
            </Button>
          </div>
          <ul className="relativew-full lg:pl-22">
            {process.map((step, index) => (
              <ProcessCard
                key={index}
                step={step}
                index={index}
                setActive={setActive}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const ProcessCard = ({
  step,
  index,
  setActive,
}: {
  step: {
    step: string;
    title: string;
    image: string;
    description: string;
  };
  index: number;
  setActive: (index: number) => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  const itemInView = useInView(ref, {
    amount: 0,
    margin: "0px 0px -60% 0px",
  });

  useEffect(() => {
    if (itemInView) {
      setActive(index);
    }
  }, [itemInView, index, setActive]);

  return (
    <li
      ref={ref}
      key={index}
      className="relative flex flex-col justify-between gap-12 border-b py-8 lg:py-16"
    >
      <div className="flex w-fit items-center justify-center px-4 py-1 text-9xl tracking-tighter">
        0{index + 1}
      </div>
      <div>
        <h3 className="mb-4 text-2xl font-semibold tracking-tighter lg:text-3xl">
          {step.title}
        </h3>
        <p className="text-foreground/50">{step.description}</p>
      </div>
    </li>
  );
};

export { Process2 };

```

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { useGoogleFont } from "@/hooks/use-google-font";

interface Process4Props {
  className?: string;
}

const Process4 = ({ className }: Process4Props) => {
  const process = [
    {
      title: "Choose your plan",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img14.png",
    },
    {
      title: "Submit your Request",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img10.png",
    },
    {
      title: "Get your project done",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/guri4/img11.png",
    },
  ];

  const [active, setActive] = useState<number | null>(0);

  useGoogleFont("Antonio");

  return (
    <section
      className={cn("bg-background py-32", className)}
      style={
        {
          "--font-mono": "Antonio",
        } as React.CSSProperties
      }
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-20">
          <div className="top-10 col-span-2 h-fit w-fit gap-3 space-y-7 py-8 lg:sticky">
            <h1 className="text-5xl font-semibold tracking-tight lg:text-7xl">
              {" "}
              Process
              <sup className="align-top font-mono text-lg tracking-tight text-foreground/40">
                0003
              </sup>{" "}
            </h1>
            <p className="text-base text-foreground/50">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
              amet dolorem eum est voluptatem id repellendus ut laborum
              laboriosam debitis.
            </p>
          </div>
          <ul className="relative col-span-4 w-full space-y-10">
            {process.map((step, index) => (
              <li
                onMouseEnter={() => setActive(index)}
                key={index}
                className={cn(
                  "relative mr-20 ml-auto flex w-full max-w-xl cursor-pointer flex-col justify-between gap-10 rounded-3xl bg-background p-10 md:flex-row lg:items-center",
                  index === active ? "bg-background" : "lg:bg-transparent",
                )}
              >
                <AnimatePresence mode="wait">
                  {index === active && (
                    <motion.img
                      key={step.image}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      src={step.image}
                      alt=""
                      className="absolute top-0 right-0 size-30 translate-x-1/4 -translate-y-1/2 rounded-2xl object-cover lg:size-40 lg:translate-x-1/2"
                    />
                  )}
                </AnimatePresence>
                <div className="">
                  <h2 className="mb-4 font-bold tracking-tight lg:text-3xl">
                    Step {index + 1}
                  </h2>
                  <h3 className="mb-4 text-2xl font-semibold tracking-tighter lg:text-xl">
                    {step.title}
                  </h3>
                  <p className="line-clamp-2 text-foreground/50">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Process4 };

```


```tsx
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import {
  ArrowRight,
  CheckCircle2,
  Code,
  FileText,
  Gauge,
  Heart,
  Lightbulb,
  Monitor,
  Rocket,
} from 'lucide-react';

interface TimelineStep {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  timeframe: string;
  highlights: string[];
  color: string;
}

export default function IconTimeline() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const steps: TimelineStep[] = [
    {
      id: 'discovery',
      icon: <Lightbulb className="h-6 w-6" />,
      title: 'Discovery',
      description:
        'Begin with understanding your requirements and project scope through collaborative sessions.',
      timeframe: 'Week 1',
      highlights: [
        'Requirement gathering workshops',
        'User journey mapping',
        'Business process analysis',
        'Technical feasibility assessment',
      ],
      color: 'text-blue-500 border-blue-200 bg-blue-50',
    },
    {
      id: 'planning',
      icon: <FileText className="h-6 w-6" />,
      title: 'Planning',
      description:
        'Create a detailed project roadmap with specific milestones and resource allocation.',
      timeframe: 'Week 2-3',
      highlights: [
        'Architecture planning',
        'Technology stack selection',
        'Sprint planning',
        'Risk assessment',
      ],
      color: 'text-purple-500 border-purple-200 bg-purple-50',
    },
    {
      id: 'design',
      icon: <Monitor className="h-6 w-6" />,
      title: 'Design',
      description:
        'Develop intuitive user interfaces and experiences based on user research and best practices.',
      timeframe: 'Week 4-6',
      highlights: [
        'Wireframe creation',
        'UI/UX prototyping',
        'Design system implementation',
        'Accessibility compliance',
      ],
      color: 'text-pink-500 border-pink-200 bg-pink-50',
    },
    {
      id: 'development',
      icon: <Code className="h-6 w-6" />,
      title: 'Development',
      description:
        'Write clean, maintainable code following industry standards and architectural patterns.',
      timeframe: 'Week 7-14',
      highlights: [
        'Frontend development',
        'Backend API implementation',
        'Database modeling',
        'Continuous integration setup',
      ],
      color: 'text-amber-500 border-amber-200 bg-amber-50',
    },
    {
      id: 'testing',
      icon: <Gauge className="h-6 w-6" />,
      title: 'Testing',
      description:
        'Rigorous quality assurance to ensure the solution meets all functional and performance requirements.',
      timeframe: 'Week 15-16',
      highlights: [
        'Automated unit testing',
        'Integration testing',
        'Performance optimization',
        'User acceptance testing',
      ],
      color: 'text-green-500 border-green-200 bg-green-50',
    },
    {
      id: 'deployment',
      icon: <Rocket className="h-6 w-6" />,
      title: 'Deployment',
      description:
        'Seamless deployment with zero downtime using modern DevOps practices.',
      timeframe: 'Week 17',
      highlights: [
        'Infrastructure provisioning',
        'CI/CD pipeline execution',
        'Database migration',
        'Environment configuration',
      ],
      color: 'text-red-500 border-red-200 bg-red-50',
    },
    {
      id: 'support',
      icon: <Heart className="h-6 w-6" />,
      title: 'Support & Maintenance',
      description:
        'Ongoing technical support, feature enhancements, and proactive monitoring.',
      timeframe: 'Ongoing',
      highlights: [
        '24/7 technical support',
        'Regular security updates',
        'Performance monitoring',
        'Scheduled feature releases',
      ],
      color: 'text-indigo-500 border-indigo-200 bg-indigo-50',
    },
  ];

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Process</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Our proven approach
          </h2>
          <p className="text-muted-foreground max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            We follow a transparent, systematic process to deliver exceptional
            results. Here&apos;s how we turn your vision into reality.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* Timeline Line */}
          <div className="bg-muted absolute top-0 bottom-0 left-[27px] w-[2px]" />

          {/* Timeline Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Step Number with Icon */}
                <div
                  className={cn(
                    'absolute left-0 z-10 flex h-14 w-14 items-center justify-center rounded-full border-2',
                    step.color,
                    activeStep === step.id
                      ? 'ring-primary ring-2 ring-offset-2'
                      : ''
                  )}
                  onClick={() =>
                    setActiveStep(activeStep === step.id ? null : step.id)
                  }
                >
                  {step.icon}
                </div>

                {/* Content Card */}
                <div className="relative ml-20">
                  <div
                    className={cn(
                      'relative rounded-lg border p-6 transition-all',
                      step.color,
                      activeStep === step.id ? 'shadow-md' : 'shadow-sm',
                      'cursor-pointer hover:shadow-md'
                    )}
                    onClick={() =>
                      setActiveStep(activeStep === step.id ? null : step.id)
                    }
                  >
                    {/* Corner Connector */}
                    <div className="bg-muted absolute top-1/2 -left-6 h-[2px] w-6 -translate-y-1/2 transform" />

                    {/* Header Row */}
                    <div className="mb-4 flex items-start justify-between">
                      <div>
                        <h3 className="mb-1 text-xl font-bold">{step.title}</h3>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                      <Badge variant="outline" className="ml-2 flex-shrink-0">
                        {step.timeframe}
                      </Badge>
                    </div>

                    {/* Expanded Content */}
                    {activeStep === step.id && (
                      <div className="animate-in fade-in slide-in-from-top-5 mt-6 space-y-4 duration-300">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          {step.highlights.map((highlight, hIndex) => (
                            <div
                              key={hIndex}
                              className="flex items-start gap-2"
                            >
                              <CheckCircle2 className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Completion Indicator for all but the last item */}
                {index < steps.length - 1 && (
                  <div className="absolute top-14 left-[27px] flex h-[calc(100%-3.5rem)] flex-col items-center justify-evenly">
                    <div className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full" />
                    <div className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full" />
                    <div className="bg-muted-foreground/30 h-1.5 w-1.5 rounded-full" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Project Complete Indicator */}
          <div className="mt-8 flex items-center justify-center">
            <div className="bg-primary/10 text-primary flex items-center rounded-full px-4 py-2 font-medium">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Project Successfully Delivered
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="bg-muted/50 mx-auto max-w-2xl rounded-xl border p-8">
            <h3 className="mb-4 text-2xl font-bold">Ready to get started?</h3>
            <p className="text-muted-foreground mb-6">
              Let us guide you through our proven process and help turn your
              vision into reality. Our expert team is ready to assist you at
              every step.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="group">
                <a href="#">
                  Schedule a consultation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button variant="outline" size="lg">
                View case studies
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

```

```tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function HeroSectionWithFeatureTimeline() {
  const milestones = [
    {
      date: "Q1 2024",
      title: "AI-Powered Code Generation",
      description:
        "Intelligent code suggestions and automated refactoring powered by advanced machine learning models.",
      status: "Released",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="m18.5 5.5-8.5 8.5-4-4" />
          <path d="M18.5 5.5h-4v-4" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      ),
    },
    {
      date: "Q2 2024",
      title: "Real-Time Collaboration",
      description:
        "Multi-user editing, commenting, and version control integration for seamless team workflows.",
      status: "In Progress",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M6 12h12" />
          <path d="M12 6v12" />
        </svg>
      ),
    },
    {
      date: "Q3 2024",
      title: "Advanced Testing Suite",
      description:
        "Automated testing framework with AI-driven test generation and coverage analysis.",
      status: "Planned",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      date: "Q4 2024",
      title: "Enterprise Security Features",
      description:
        "Advanced security controls, audit logging, and compliance reporting for enterprise teams.",
      status: "Planned",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <div className="">
        <div className="relative">
          {/* Background pattern */}
          <div className="absolute inset-0 -z-10 h-full w-full ">
            <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(120,119,198,0.1),transparent)]"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="outline" className="mb-4">
                Roadmap
              </Badge>
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
                Building the future of development
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Our commitment to innovation drives us forward. See what
                we&apos;re building and what&apos;s coming next.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button size="lg">
                  View Full Roadmap
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
                <Button size="lg" variant="outline">
                  Request Feature
                </Button>
              </div>
            </div>

            {/* Timeline */}
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone.date} className="relative">
                    {/* Timeline line */}
                    {index !== milestones.length - 1 && (
                      <div
                        className={`absolute left-6 top-12 h-full w-0.5 ${
                          milestone.status === "Released"
                            ? "bg-primary"
                            : milestone.status === "In Progress"
                            ? "bg-gradient-to-b from-primary to-muted"
                            : "bg-muted"
                        }`}
                      ></div>
                    )}

                    <Card className="relative flex gap-6 p-6 hover:shadow-lg transition-all duration-300">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          milestone.status === "Released"
                            ? "bg-primary/10"
                            : milestone.status === "In Progress"
                            ? "bg-primary/5"
                            : "bg-muted"
                        }`}
                      >
                        {milestone.icon}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            variant={
                              milestone.status === "Released"
                                ? "default"
                                : milestone.status === "In Progress"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {milestone.status}
                          </Badge>
                          <div className="text-sm text-muted-foreground">
                            {milestone.date}
                          </div>
                        </div>
                        <h3 className="font-semibold mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {milestone.description}
                        </p>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Request CTA */}
            <Card className="mt-16 p-8 text-center max-w-2xl mx-auto bg-muted/50">
              <h3 className="font-semibold mb-2">Have a feature in mind?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We&apos;re always looking to improve. Share your ideas and help
                shape our roadmap.
              </p>
              <Button variant="outline" size="lg">
                Submit Feature Request
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

```

```tsx
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const principles = [
  {
    number: '01',
    title: 'Customer-Centric',
    description:
      'We place our customers at the center of everything we do, designing products and services that solve real problems and create lasting value.',
  },
  {
    number: '02',
    title: 'Innovation-Driven',
    description:
      'We continuously explore new ideas and technologies to push boundaries and create better solutions for evolving challenges.',
  },
  {
    number: '03',
    title: 'Quality-Focused',
    description:
      'We are committed to excellence in every aspect of our work, from the products we build to the experiences we create and the support we provide.',
  },
  {
    number: '04',
    title: 'Inclusive by Design',
    description:
      'We embrace diversity of thought, background, and perspective, creating solutions that work for everyone and building teams that reflect the communities we serve.',
  },
];

export default function AboutSectionMissionStatement() {
  return (
    <section className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <div className="space-y-8">
          <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
            Our Mission
          </div>

          <h2 className="text-4xl leading-tight font-bold tracking-tight lg:text-5xl">
            To empower people through technology that&apos;s intuitive,
            accessible, and transformative.
          </h2>

          <p className="text-muted-foreground text-xl">
            We believe technology should serve humanity, not the other way
            around. Our mission drives us to create solutions that enhance
            people&apos;s lives, expand their capabilities, and help them
            achieve their goals.
          </p>

          <div className="pt-2">
            <Button asChild className="group">
              <a href="#" className="inline-flex items-center">
                See our impact
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {principles.map((principle) => (
            <div
              key={principle.number}
              className="hover:bg-accent/50 relative rounded-lg border p-6 transition-colors"
            >
              <div className="text-primary/20 absolute top-4 right-4 text-3xl font-bold">
                {principle.number}
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">{principle.title}</h3>
                <p className="text-muted-foreground">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-accent mt-24 rounded-lg p-8 lg:p-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>
            <p className="text-muted-foreground mb-4">
              We envision a world where technology enhances human potential,
              enabling everyone to achieve more, connect meaningfully, and
              contribute to a better future. We strive to be the company that
              makes this vision a reality through thoughtful innovation and an
              unwavering commitment to our core principles.
            </p>
          </div>
          <div className="flex justify-center lg:col-span-1 lg:justify-end">
            <Button asChild size="lg" variant="outline" className="group">
              <a href="#" className="inline-flex items-center">
                View our strategy
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
import { Card, CardContent } from "@/components/ui/card";

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your business, goals, and challenges through in-depth research and interviews.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Based on our findings, we develop a comprehensive strategy tailored to your specific needs and objectives.",
  },
  {
    number: "03",
    title: "Design",
    description:
      "Our creative team crafts beautiful, functional designs that align with your brand and engage your audience.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Our engineers bring designs to life with clean, efficient code that meets the highest quality standards.",
  },
  {
    number: "05",
    title: "Testing",
    description:
      "We rigorously test all aspects of your product to ensure performance, usability, and security.",
  },
  {
    number: "06",
    title: "Launch & Support",
    description:
      "After launch, we provide ongoing support and optimization to ensure continued success.",
  },
];

export default function AboutSectionProcess() {
  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold">Our Process</h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          We follow a methodical approach to ensure every project delivers
          exceptional results. Here&apos;s how we work with you from concept to
          completion.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((step) => (
          <Card
            key={step.number}
            className="bg-accent/50 relative overflow-hidden border-none p-0"
          >
            <div className="text-primary/10 absolute -top-4 -right-4 text-8xl font-bold">
              {step.number}
            </div>
            <CardContent className="relative z-10 space-y-3 p-6">
              <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium">
                {step.number}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-12 text-center">
        <p className="text-muted-foreground mx-auto max-w-2xl">
          This proven process ensures we deliver high-quality solutions that
          meet your business needs while providing a transparent, collaborative
          experience.
        </p>
      </div>
    </section>
  );
}

```

```tsx
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample services data
const services = [
  {
    id: 1,
    number: '01',
    title: 'Discovery & Strategy',
    description:
      "Every successful project begins with understanding your goals, audience, and current challenges. I'll work with you to develop a clear strategy that aligns with your business objectives.",
    capabilities: [
      'Stakeholder interviews',
      'Competitive analysis',
      'User research',
      'Project roadmapping',
    ],
    link: '#',
  },
  {
    id: 2,
    number: '02',
    title: 'Design & Prototyping',
    description:
      "With a solid strategy in place, I'll create intuitive, user-friendly designs that reflect your brand and meet your users' needs. All designs are tested for usability before development begins.",
    capabilities: [
      'UI/UX design',
      'Wireframing',
      'Interactive prototyping',
      'Design systems',
    ],
    link: '#',
  },
  {
    id: 3,
    number: '03',
    title: 'Development & Testing',
    description:
      "Using modern frameworks and clean code practices, I'll build your digital product with performance, accessibility, and scalability in mind. Thorough testing ensures everything works flawlessly.",
    capabilities: [
      'Front-end development',
      'Back-end development',
      'Performance optimization',
      'Cross-browser testing',
    ],
    link: '#',
  },
  {
    id: 4,
    number: '04',
    title: 'Launch & Optimization',
    description:
      "After launching your product, I'll monitor its performance and gather user feedback to identify opportunities for improvement. Ongoing optimization ensures your product continues to deliver results.",
    capabilities: [
      'Analytics setup',
      'User feedback collection',
      'Performance monitoring',
      'Iterative improvements',
    ],
    link: '#',
  },
];

export default function NumberedProcessStyleServices() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            My Process & Services
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            A structured approach to delivering exceptional results for your
            digital needs
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-16">
            {services.map((service) => (
              <div
                key={service.id}
                className="relative grid grid-cols-1 gap-6 md:grid-cols-7"
              >
                {/* Number and connecting line */}
                <div className="flex items-start justify-center md:col-span-1">
                  <div className="relative">
                    <div className="bg-primary text-primary-foreground flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold">
                      {service.number}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 md:col-span-6">
                  <h3 className="text-2xl font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>

                  {/* Capabilities */}
                  <div className="mt-4">
                    <h4 className="text-muted-foreground mb-3 text-sm font-medium">
                      Capabilities:
                    </h4>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {service.capabilities.map((capability, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className="text-primary text-lg">•</span>
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="ghost" asChild className="group" size="sm">
                    <a
                      href={service.link}
                      className="text-primary flex items-center"
                    >
                      <span className="mr-2">Learn more</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" asChild>
              <a href="#" className="inline-flex items-center gap-2">
                <span>Start your project</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

```
