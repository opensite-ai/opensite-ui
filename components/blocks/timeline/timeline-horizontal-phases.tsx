"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import { Card, CardContent } from "../../ui/card";
import { Separator } from "../../ui/separator";

export interface TimelinePhase {
  id: number;
  date: string;
  title: string;
  description: string;
}

export interface TimelineHorizontalPhasesProps {
  className?: string;
  heading?: string;
  currentPhase?: number;
  phases?: TimelinePhase[];
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultPhases: TimelinePhase[] = [
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

export function TimelineHorizontalPhases({
  className,
  heading = "Timeline",
  currentPhase = 2,
  phases = defaultPhases,
}: TimelineHorizontalPhasesProps) {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container flex flex-col items-center">
        <h1 className="mb-10 text-center text-3xl font-bold tracking-tighter text-foreground sm:text-6xl">
          {heading}
        </h1>
        <Card className="relative w-full border-none shadow-none md:py-16">
          <CardContent className="p-0">
            <div className="relative flex flex-col items-center md:mt-12">
              <Separator className="absolute -top-8 left-0 hidden md:block" />
              {currentPhase !== undefined && (
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${(currentPhase / phases.length) * 104}%`,
                  }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  className={cn(
                    "absolute -top-8 left-0 hidden h-0.5 bg-foreground md:block"
                  )}
                />
              )}

              <div className="grid gap-6 md:grid-cols-4">
                {phases.map((phase, index) => (
                  <div key={phase.id} className="relative space-y-2">
                    <Separator
                      orientation="vertical"
                      className="absolute top-6 left-0 block md:hidden"
                    />
                    {index === 0 && (
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{
                          height: currentPhase * 112,
                        }}
                        transition={{ ease: "easeOut", duration: 0.5 }}
                        className={cn(
                          "absolute left-0 z-10 w-0.5 bg-foreground md:hidden"
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
}
