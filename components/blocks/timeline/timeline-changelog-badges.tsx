"use client";

import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { Separator } from "../../ui/separator";

export interface TimelineChangelogItem {
  content: string;
}

export interface TimelineChangelogEntry {
  date: string;
  items: TimelineChangelogItem[];
}

export interface TimelineChangelogBadgesProps {
  className?: string;
  heading?: string;
  entries?: TimelineChangelogEntry[];
  optixFlowConfig?: {
    apiKey: string;
    compression?: number;
  };
}

const defaultEntries: TimelineChangelogEntry[] = [
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

export function TimelineChangelogBadges({
  className,
  heading = "Timeline",
  entries = defaultEntries,
}: TimelineChangelogBadgesProps) {
  return (
    <section className={cn("bg-background py-32", className)}>
      <div className="container">
        <h1 className="mb-10 text-center text-3xl font-bold tracking-tighter text-foreground lg:text-6xl">
          {heading}
        </h1>
        <div className="relative mx-auto max-w-4xl">
          <Separator
            orientation="vertical"
            className="absolute top-4 left-2 bg-muted"
          />
          {entries.map((entry, index) => (
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
}
