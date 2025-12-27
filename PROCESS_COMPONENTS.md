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
