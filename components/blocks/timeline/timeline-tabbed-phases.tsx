"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Img } from "@page-speed/img";
import { Pressable } from "../../../lib/Pressable";
import { DynamicIcon } from "../../ui/dynamic-icon";
import { Card, CardContent } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { blockBrandedIconsAndPlaceholders } from "../../../lib/blockBrandedIconsAndPlaceholders";

export interface TimelineTabbedPhase {
  id: string;
  phase: string;
  title: string;
  date: string;
  heading: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export interface TimelineTabbedPhasesProps {
  className?: string;
  heading?: string;
  phases?: TimelineTabbedPhase[];
  downloadButton?: {
    text: string;
    url: string;
  };
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultPhases: TimelineTabbedPhase[] = [
  {
    id: "phase1",
    phase: "1",
    title: "Initialize",
    date: "02/03/2025",
    heading: "How to Initialize",
    description:
      "This phase covers the basics of getting started. Learn how to set up, configure, and prepare for the next steps. This phase covers the basics of getting started. Learn how to set up, configure, and prepare for the next steps.",
    imageSrc: blockBrandedIconsAndPlaceholders.placeholder1,
    imageAlt: "Phase 1 illustration",
  },
  {
    id: "phase2",
    phase: "2",
    title: "Build",
    date: "21/03/2025",
    heading: "How to Build",
    description:
      "In this phase, focus on structuring and building the core components. Understand best practices for development. In this phase, focus on structuring and building the core components. Understand best practices for development.",
    imageSrc: blockBrandedIconsAndPlaceholders.placeholder2,
    imageAlt: "Phase 2 illustration",
  },
  {
    id: "phase3",
    phase: "3",
    title: "Test",
    date: "06/04/2025",
    heading: "How to Test",
    description:
      "Testing ensures quality and reliability. Learn about debugging, fixing issues, and refining the project. Testing ensures quality and reliability. Learn about debugging, fixing issues, and refining the project.",
    imageSrc: blockBrandedIconsAndPlaceholders.placeholder3,
    imageAlt: "Phase 3 illustration",
  },
  {
    id: "phase4",
    phase: "4",
    title: "Launch",
    date: "14/04/2025",
    heading: "How to Launch",
    description:
      "The final phase focuses on optimization, deployment, and ensuring everything runs smoothly for release. The final phase focuses on optimization, deployment, and ensuring everything runs smoothly for release.",
    imageSrc: blockBrandedIconsAndPlaceholders.placeholder4,
    imageAlt: "Phase 4 illustration",
  },
];

export function TimelineTabbedPhases({
  className,
  heading = "Just Four Phases",
  phases = defaultPhases,
  downloadButton = {
    text: "Download the app",
    url: "#",
  },
  optixFlowConfig,
}: TimelineTabbedPhasesProps) {
  return (
    <section className={cn("bg-background", className)}>
      <div className="container flex flex-col items-center justify-center py-32">
        <h1 className="mb-12 text-5xl font-semibold tracking-tighter lg:mb-25 lg:text-7xl">
          {heading}
        </h1>
        <Tabs defaultValue={phases[0]?.id || "phase1"} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-transparent p-0">
            {phases.map((phase) => (
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

          {phases.map((phase) => (
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
                <Pressable
                  href={downloadButton.url}
                  variant="outline"
                  asButton
                  className="mt-8 flex w-fit items-center gap-2 rounded-full border border-border px-4! py-2"
                >
                  <DynamicIcon name="lucide/download" size={16} />
                  <p className="text-md font-medium text-foreground">
                    Click to{" "}
                    <span className="text-foreground/80">
                      {downloadButton.text}
                    </span>
                  </p>
                </Pressable>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 100, y: 0 }}
                transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.8 }}
                className="relative z-20 col-span-1"
              >
                <Card className="group h-110 w-full rounded-3xl border border-border bg-background p-2 shadow-none">
                  <CardContent className="size-full rounded-2xl border-2 border-background bg-muted">
                    <Img
                      src={phase.imageSrc}
                      alt={phase.imageAlt}
                      className="size-full transition-all ease-in-out group-hover:scale-95"
                      optixFlowConfig={optixFlowConfig}
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
}
